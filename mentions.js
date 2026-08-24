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
      badge.style.cssText =
        "position:absolute;top:-4px;right:-4px;min-width:17px;height:17px;padding:0 4px;border-radius:999px;background:#ff3b30;color:#fff;font:700 10px/17px Arial,sans-serif;text-align:center;box-sizing:border-box;box-shadow:0 0 0 2px rgba(18,16,30,.95);display:none;z-index:5;";

      if (getComputedStyle(button).position === "static") {
        button.style.position = "relative";
      }

      button.appendChild(badge);
    }

    return badge;
  }

  async function init() {
    try {
      await loadSupabase();
    } catch (error) {
      console.error(error);
      return;
    }

    const db = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );

    let currentUser = null;

    async function refreshBadge() {
      if (!currentUser) return;

      const result = await db
        .from("chat_mentions")
        .select("id", { count: "exact", head: true })
        .eq("mentioned_user_id", currentUser.id)
        .eq("is_read", false);

      if (result.error) {
        console.error("Mention badge error:", result.error);
        return;
      }

      const badge = ensureBadge();
      if (!badge) return;

      const count = result.count || 0;
      badge.textContent = count > 99 ? "99+" : String(count);
      badge.style.display = count > 0 ? "block" : "none";
    }

    async function markMentionsRead() {
      if (!currentUser) return;

      const result = await db
        .from("chat_mentions")
        .update({ is_read: true })
        .eq("mentioned_user_id", currentUser.id)
        .eq("is_read", false);

      if (result.error) {
        console.error("Mention read error:", result.error);
      }

      await refreshBadge();
    }

    async function getUser() {
      const result = await db.auth.getUser();
      currentUser = result.data?.user || null;
      await refreshBadge();
    }

    await getUser();

    document.addEventListener("click", event => {
      const button = event.target.closest?.("#jnxChatButton");
      if (button && currentUser) {
        setTimeout(markMentionsRead, 400);
      }
    });

    db.auth.onAuthStateChange(async (_event, session) => {
      currentUser = session?.user || null;
      await refreshBadge();
    });

    db.channel("jnx-mentions")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_mentions"
        },
        async payload => {
          if (
            currentUser &&
            payload.new?.mentioned_user_id === currentUser.id
          ) {
            await refreshBadge();
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chat_mentions"
        },
        async payload => {
          if (
            currentUser &&
            payload.new?.mentioned_user_id === currentUser.id
          ) {
            await refreshBadge();
          }
        }
      )
      .subscribe();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
