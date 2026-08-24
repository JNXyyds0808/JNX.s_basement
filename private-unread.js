(function () {
  const SUPABASE_URL = "https://qdehfgjifhtczkrpuadl.supabase.co";
  const SUPABASE_KEY = "sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp";

  function init() {
    if (!window.supabase?.createClient) return;
    const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    let user = null;
    let refreshTimer = null;

    function getButton() {
      return document.getElementById("jnxChatButton");
    }

    function getBadge() {
      let badge = document.getElementById("jnxPrivateUnreadBadge");
      const button = getButton();
      if (!button) return null;
      if (!badge) {
        badge = document.createElement("span");
        badge.id = "jnxPrivateUnreadBadge";
        badge.style.cssText = [
          "display:none",
          "position:absolute",
          "top:-7px",
          "right:-7px",
          "min-width:18px",
          "height:18px",
          "padding:0 5px",
          "box-sizing:border-box",
          "border-radius:999px",
          "background:#e53935",
          "color:#fff",
          "font:700 11px/18px Arial,sans-serif",
          "text-align:center",
          "z-index:20",
          "pointer-events:none"
        ].join(";");
        const position = getComputedStyle(button).position;
        if (position === "static") button.style.position = "relative";
        button.appendChild(badge);
      }
      return badge;
    }

    function setBadge(count) {
      const badge = getBadge();
      if (!badge) return;
      const n = Number(count) || 0;
      badge.textContent = n > 99 ? "99+" : String(n);
      badge.style.display = n > 0 ? "block" : "none";
    }

    async function refresh() {
      if (!user) {
        setBadge(0);
        return;
      }

      const members = await db
        .from("private_conversation_members")
        .select("conversation_id")
        .eq("user_id", user.id);

      if (members.error) return;

      let total = 0;
      for (const m of members.data || []) {
        const read = await db
          .from("private_message_reads")
          .select("last_read_message_id")
          .eq("conversation_id", m.conversation_id)
          .eq("user_id", user.id)
          .maybeSingle();

        if (read.error) continue;

        const last = read.data?.last_read_message_id || 0;
        const q = await db
          .from("private_messages")
          .select("id", { count: "exact", head: true })
          .eq("conversation_id", m.conversation_id)
          .neq("sender_id", user.id)
          .gt("id", last);

        if (!q.error) total += q.count || 0;
      }

      setBadge(total);
    }

    window.__jnxRefreshPrivateUnread = refresh;
    window.__jnxMarkPrivateRead = async function (conversationId, messageId) {
      if (!user || !conversationId || !messageId) return;
      await db.from("private_message_reads").upsert(
        {
          conversation_id: conversationId,
          user_id: user.id,
          last_read_message_id: messageId,
          updated_at: new Date().toISOString()
        },
        { onConflict: "conversation_id,user_id" }
      );
      await refresh();
    };

    db.auth.getUser().then(({ data }) => {
      user = data?.user || null;
      refresh();
    });

    db.auth.onAuthStateChange((_event, session) => {
      user = session?.user || null;
      refresh();
    });

    db.channel("jnx-private-unread")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "private_messages"
      }, payload => {
        if (user && payload.new?.sender_id !== user.id) refresh();
      })
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "private_message_reads"
      }, payload => {
        if (user && payload.new?.user_id === user.id) refresh();
      })
      .subscribe();

    refreshTimer = setInterval(refresh, 15000);
  }

  if (window.supabase?.createClient) init();
  else window.addEventListener("load", init, { once: true });
})();
