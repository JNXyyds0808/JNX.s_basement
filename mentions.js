(function () {
  const SUPABASE_URL = "https://qdehfgjifhtczkrpuadl.supabase.co";
  const SUPABASE_KEY = "sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp";

  function loadSupabase() {
    return new Promise((resolve, reject) => {
      if (window.supabase?.createClient) return resolve();
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      s.onload = resolve;
      s.onerror = () => reject(new Error("Supabase library failed to load."));
      document.head.appendChild(s);
    });
  }

  function getMentionedUsernames(text) {
    const found = [];
    const regex = /@([a-zA-Z0-9_.-]{3,20})\b/g;
    let match;
    while ((match = regex.exec(text || ""))) {
      const username = match[1].toLowerCase();
      if (!found.includes(username)) found.push(username);
    }
    return found;
  }

  function getChatButton() {
    return document.getElementById("jnxChatButton");
  }

  function ensureBadge() {
    const button = getChatButton();
    if (!button) return null;
    let badge = document.getElementById("jnxMentionBadge");
    if (!badge) {
      badge = document.createElement("span");
      badge.id = "jnxMentionBadge";
      badge.textContent = "0";
      badge.style.cssText = "position:absolute;top:-4px;right:-4px;min-width:17px;height:17px;padding:0 4px;border-radius:999px;background:#ff3b30;color:#fff;font:700 10px/17px Arial,sans-serif;text-align:center;box-sizing:border-box;box-shadow:0 0 0 2px rgba(18,16,30,.95);display:none;z-index:5;";
      if (getComputedStyle(button).position === "static") button.style.position = "relative";
      button.appendChild(badge);
    }
    return badge;
  }

  async function init() {
    try { await loadSupabase(); } catch (e) { console.error(e); return; }
    const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    let currentUser = null;

    async function refreshBadge() {
      if (!currentUser) return;
      const result = await db.from("chat_mentions").select("id", { count: "exact", head: true }).eq("mentioned_user_id", currentUser.id).eq("is_read", false);
      if (result.error) { console.error("Mention badge error:", result.error); return; }
      const badge = ensureBadge();
      if (!badge) return;
      const count = result.count || 0;
      badge.textContent = count > 99 ? "99+" : String(count);
      badge.style.display = count > 0 ? "block" : "none";
    }

    async function markMentionsRead() {
      if (!currentUser) return;
      const result = await db.from("chat_mentions").update({ is_read: true }).eq("mentioned_user_id", currentUser.id).eq("is_read", false);
      if (result.error) console.error("Mention read error:", result.error);
      await refreshBadge();
    }

    async function processMessage(message) {
      if (!currentUser || !message || message.user_id === currentUser.id) return;
      const usernames = getMentionedUsernames(message.content);
      if (!usernames.length) return;
      const profiles = await db.from("profiles").select("id,username").in("username", usernames);
      if (profiles.error) { console.error("Mention profile lookup error:", profiles.error); return; }
      const rows = (profiles.data || [])
        .filter(p => p.id && p.id !== message.user_id && p.id !== currentUser.id)
        .map(p => ({ message_id: message.id, mentioned_user_id: p.id, mentioned_by_user_id: message.user_id }));
      if (!rows.length) return;
      const insert = await db.from("chat_mentions").insert(rows);
      if (insert.error && insert.error.code !== "23505") console.error("Mention insert error:", insert.error);
    }

    async function getUser() {
      const result = await db.auth.getUser();
      currentUser = result.data?.user || null;
      await refreshBadge();
    }

    await getUser();

    document.addEventListener("click", async event => {
      const button = event.target.closest?.("#jnxChatButton");
      if (button && currentUser) setTimeout(markMentionsRead, 400);
    });

    db.auth.onAuthStateChange(async (_event, session) => {
      currentUser = session?.user || null;
      await refreshBadge();
    });

    db.channel("jnx-mentions")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, async payload => {
        await processMessage(payload.new);
        await refreshBadge();
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_mentions", filter: "mentioned_user_id=eq." + (currentUser?.id || "00000000-0000-0000-0000-000000000000") }, async () => {
        await refreshBadge();
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "chat_mentions" }, async () => {
        await refreshBadge();
      })
      .subscribe();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
