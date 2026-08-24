(function () {
  const SUPABASE_URL = "https://qdehfgjifhtczkrpuadl.supabase.co";
  const SUPABASE_KEY = "sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp";

  function init() {
    if (!window.supabase?.createClient) return;
    const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    let user = null;

    function getBadge() {
      return document.getElementById("jnxMentionBadge");
    }

    async function refresh() {
      if (!user) return;
      const members = await db.from("private_conversation_members").select("conversation_id").eq("user_id", user.id);
      if (members.error) return;
      let total = 0;
      for (const m of members.data || []) {
        const read = await db.from("private_message_reads").select("last_read_message_id").eq("conversation_id", m.conversation_id).eq("user_id", user.id).maybeSingle();
        const last = read.data?.last_read_message_id || 0;
        const q = await db.from("private_messages").select("id", { count: "exact", head: true }).eq("conversation_id", m.conversation_id).neq("sender_id", user.id).gt("id", last);
        if (!q.error) total += q.count || 0;
      }
      const badge = getBadge();
      if (!badge) return;
      badge.dataset.privateCount = String(total);
      const mentionCount = parseInt(badge.dataset.mentionCount || "0", 10) || 0;
      const combined = mentionCount + total;
      badge.textContent = combined > 99 ? "99+" : String(combined);
      badge.style.display = combined > 0 ? "block" : "none";
    }

    window.__jnxRefreshPrivateUnread = refresh;
    window.__jnxMarkPrivateRead = async function (conversationId, messageId) {
      if (!user || !conversationId || !messageId) return;
      await db.from("private_message_reads").upsert({ conversation_id: conversationId, user_id: user.id, last_read_message_id: messageId, updated_at: new Date().toISOString() }, { onConflict: "conversation_id,user_id" });
      await refresh();
    };

    db.auth.getUser().then(({ data }) => { user = data?.user || null; refresh(); });
    db.auth.onAuthStateChange((_event, session) => { user = session?.user || null; refresh(); });
    db.channel("jnx-private-unread").on("postgres_changes", { event: "INSERT", schema: "public", table: "private_messages" }, payload => { if (user && payload.new?.sender_id !== user.id) refresh(); }).on("postgres_changes", { event: "UPDATE", schema: "public", table: "private_message_reads" }, payload => { if (user && payload.new?.user_id === user.id) refresh(); }).subscribe();
    setInterval(refresh, 15000);
  }

  if (window.supabase?.createClient) init();
  else window.addEventListener("load", init, { once: true });
})();
