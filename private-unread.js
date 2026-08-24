(function () {
  const SUPABASE_URL = "https://qdehfgjifhtczkrpuadl.supabase.co";
  const SUPABASE_KEY = "sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp";

  function init() {
    if (!window.supabase?.createClient) return;
    const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    let user = null;
    let initialized = false;

    function getButton() { return document.getElementById("jnxChatButton"); }
    function getTotalBadge() {
      const button = getButton(); if (!button) return null;
      let badge = document.getElementById("jnxPrivateUnreadBadge");
      if (!badge) {
        badge = document.createElement("span");
        badge.id = "jnxPrivateUnreadBadge";
        badge.style.cssText = "display:none;position:absolute;top:-7px;right:-7px;min-width:18px;height:18px;padding:0 5px;box-sizing:border-box;border-radius:999px;background:#e53935;color:#fff;font:700 11px/18px Arial,sans-serif;text-align:center;z-index:20;pointer-events:none";
        if (getComputedStyle(button).position === "static") button.style.position = "relative";
        button.appendChild(badge);
      }
      return badge;
    }
    function setTotalBadge(count) {
      const badge = getTotalBadge(); if (!badge) return;
      const n = Number(count) || 0;
      badge.textContent = n > 99 ? "99+" : String(n);
      badge.style.display = n > 0 ? "block" : "none";
    }
    function ensureUserBadge(button) {
      let badge = button.querySelector(".jnx-private-user-badge");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "jnx-private-user-badge";
        badge.style.cssText = "display:none;margin-left:8px;flex:0 0 auto;min-width:17px;height:17px;padding:0 4px;box-sizing:border-box;border-radius:999px;background:#e53935;color:#fff;font:700 10px/17px Arial,sans-serif;text-align:center;vertical-align:middle;transform:none";
        button.appendChild(badge);
      }
      return badge;
    }
    function setUserBadge(button, count) {
      const badge = ensureUserBadge(button);
      const n = Number(count) || 0;
      badge.textContent = n > 99 ? "99+" : String(n);
      badge.style.display = n > 0 ? "inline-block" : "none";
    }

    async function latestId(conversationId) {
      const r = await db.from("private_messages").select("id").eq("conversation_id", conversationId).order("id", { ascending:false }).limit(1).maybeSingle();
      return r.error ? null : (r.data?.id || null);
    }
    async function markRead(conversationId, messageId) {
      if (!user || !conversationId || !messageId) return;
      await db.from("private_message_reads").upsert({ conversation_id:conversationId, user_id:user.id, last_read_message_id:messageId, updated_at:new Date().toISOString() }, { onConflict:"conversation_id,user_id" });
    }
    async function initializeReadPositions() {
      if (!user || initialized) return;
      const members = await db.from("private_conversation_members").select("conversation_id").eq("user_id",user.id);
      if (members.error) return;
      for (const m of members.data || []) {
        const r = await db.from("private_message_reads").select("last_read_message_id").eq("conversation_id",m.conversation_id).eq("user_id",user.id).maybeSingle();
        if (r.error || r.data) continue;
        const id = await latestId(m.conversation_id);
        if (id) await markRead(m.conversation_id,id);
      }
      initialized = true;
    }
    async function getConversationWith(otherId) {
      if (!user || !otherId || otherId === user.id) return null;
      const mine = await db.from("private_conversation_members").select("conversation_id").eq("user_id",user.id);
      if (mine.error) return null;
      for (const row of mine.data || []) {
        const other = await db.from("private_conversation_members").select("conversation_id").eq("conversation_id",row.conversation_id).eq("user_id",otherId).maybeSingle();
        if (!other.error && other.data) return row.conversation_id;
      }
      return null;
    }
    async function unreadForConversation(conversationId) {
      if (!user || !conversationId) return 0;
      const r = await db.from("private_message_reads").select("last_read_message_id").eq("conversation_id",conversationId).eq("user_id",user.id).maybeSingle();
      if (r.error) return 0;
      const last = r.data?.last_read_message_id || 0;
      const q = await db.from("private_messages").select("id",{count:"exact",head:true}).eq("conversation_id",conversationId).neq("sender_id",user.id).gt("id",last);
      return q.error ? 0 : (q.count || 0);
    }

    async function refresh() {
      if (!user) { setTotalBadge(0); return; }
      await initializeReadPositions();
      const members = await db.from("private_conversation_members").select("conversation_id").eq("user_id",user.id);
      if (members.error) return;
      let total = 0;
      for (const m of members.data || []) total += await unreadForConversation(m.conversation_id);
      setTotalBadge(total);
      await refreshUserBadges();
    }

    async function refreshUserBadges() {
      if (!user) return;
      const buttons = Array.from(document.querySelectorAll(".jnx-chat-user"));
      for (const button of buttons) {
        const username = (button.querySelector(".jnx-chat-user-username")?.textContent || "").replace(/^@/,"").trim();
        if (!username) continue;
        const profile = await db.from("profiles").select("id").eq("username",username).maybeSingle();
        if (profile.error || !profile.data) { setUserBadge(button,0); continue; }
        const conversationId = await getConversationWith(profile.data.id);
        const count = await unreadForConversation(conversationId);
        setUserBadge(button,count);
      }
    }

    async function markUserReadByButton(button) {
      if (!user || !button) return;
      const username = (button.querySelector(".jnx-chat-user-username")?.textContent || "").replace(/^@/,"").trim();
      if (!username) return;
      const profile = await db.from("profiles").select("id").eq("username",username).maybeSingle();
      if (profile.error || !profile.data) return;
      const conversationId = await getConversationWith(profile.data.id);
      if (!conversationId) return;
      const id = await latestId(conversationId);
      if (id) await markRead(conversationId,id);
      setUserBadge(button,0);
      await refresh();
    }

    window.__jnxRefreshPrivateUnread = refresh;
    window.__jnxMarkPrivateRead = async function(conversationId,messageId){ await markRead(conversationId,messageId); await refresh(); };

    db.auth.getUser().then(async ({data})=>{ user=data?.user||null; initialized=false; await refresh(); });
    db.auth.onAuthStateChange(async (_event,session)=>{ user=session?.user||null; initialized=false; await refresh(); });

    document.addEventListener("click", event => {
      const button = event.target.closest?.(".jnx-chat-user");
      if (button && user) setTimeout(() => markUserReadByButton(button), 500);
    }, true);

    const observer = new MutationObserver(() => {
      const modal = document.getElementById("jnxPrivateModal");
      if (modal?.classList.contains("active")) setTimeout(refresh,300);
      const chatModal = document.getElementById("jnxChatModal");
      if (chatModal?.classList.contains("active")) setTimeout(refreshUserBadges,500);
    });
    observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["class"]});

    db.channel("jnx-private-unread")
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"private_messages"},async payload=>{
        if (user && payload.new?.sender_id !== user.id) await refresh();
      })
      .on("postgres_changes",{event:"UPDATE",schema:"public",table:"private_message_reads"},payload=>{ if(user&&payload.new?.user_id===user.id) refresh(); })
      .subscribe();

    setInterval(refresh,15000);
  }
  if (window.supabase?.createClient) init(); else window.addEventListener("load",init,{once:true});
})();
