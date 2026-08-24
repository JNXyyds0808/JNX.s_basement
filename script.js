(function () {
  const style = document.createElement("style");
  style.textContent = `
    .activity-list { width: 100%; max-width: 800px; }
    .activity-card { padding: 22px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .activity-card h3 { color: #fff !important; font-size: 22px; margin-bottom: 8px; }
    .activity-card p { color: #aaa !important; font-size: 16px; line-height: 1.7; margin: 0 0 8px; }
    .activity-card small { color: #666 !important; font-size: 12px; }
    .activity-more-button { margin-top: 24px; padding: 11px 18px; border: 1px solid rgba(255,255,255,0.14); border-radius: 22px; background: rgba(255,255,255,0.04); color: #fff; cursor: pointer; font-size: 14px; transition: 0.25s; backdrop-filter: blur(10px); }
    .activity-more-button:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
    .all-updates-modal { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: 0.25s; z-index: 200; }
    .all-updates-modal.active { opacity: 1; visibility: visible; }
    .all-updates-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); }
    .all-updates-box { position: relative; z-index: 2; width: min(720px, 90%); max-height: 80vh; overflow-y: auto; padding: 32px; border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; background: rgba(18,16,30,0.94); backdrop-filter: blur(25px); box-shadow: 0 25px 70px rgba(0,0,0,0.5); }
    .all-updates-close { position: absolute; top: 16px; right: 18px; border: none; background: transparent; color: #888; font-size: 28px; cursor: pointer; }
    .all-updates-title { color: #fff !important; margin-bottom: 8px; }
    .all-updates-subtitle { color: #888 !important; margin-bottom: 22px; }
    .all-update-card { padding: 18px 0; border-top: 1px solid rgba(255,255,255,0.08); }
    .all-update-card h3 { color: #fff !important; margin-bottom: 8px; }
    .all-update-card p { color: #aaa !important; line-height: 1.7; }
    .all-update-card small { display: block; margin-top: 10px; color: #666 !important; }

    .jnx-chat-button { display:none; border:0; background:transparent; color:inherit; cursor:pointer; font:inherit; padding:8px 10px; }
    .jnx-chat-button.active { display:inline-block; }
    .jnx-chat-modal { position:fixed; inset:0; z-index:300; display:flex; align-items:center; justify-content:center; opacity:0; visibility:hidden; transition:.2s; }
    .jnx-chat-modal.active { opacity:1; visibility:visible; }
    .jnx-chat-overlay { position:absolute; inset:0; background:rgba(0,0,0,.72); backdrop-filter:blur(8px); }
    .jnx-chat-box { position:relative; z-index:2; width:min(760px,92vw); height:min(720px,86vh); display:flex; flex-direction:column; background:rgba(18,16,30,.97); border:1px solid rgba(255,255,255,.12); border-radius:24px; overflow:hidden; box-shadow:0 25px 80px rgba(0,0,0,.55); }
    .jnx-chat-header { display:flex; align-items:center; justify-content:space-between; padding:20px 22px; border-bottom:1px solid rgba(255,255,255,.08); }
    .jnx-chat-header h2 { color:#fff; margin:0; font-size:22px; }
    .jnx-chat-header p { color:#888; margin:5px 0 0; font-size:13px; }
    .jnx-chat-close { border:0; background:transparent; color:#888; font-size:28px; cursor:pointer; }
    .jnx-chat-messages { flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:12px; }
    .jnx-chat-message { max-width:78%; padding:11px 14px; border-radius:16px; background:rgba(255,255,255,.07); align-self:flex-start; }
    .jnx-chat-message.mine { align-self:flex-end; background:rgba(255,255,255,.13); }
    .jnx-chat-name { color:#aaa; font-size:12px; margin-bottom:4px; }
    .jnx-chat-message.mine .jnx-chat-name { color:#ddd; }
    .jnx-chat-content { color:#fff; font-size:15px; line-height:1.55; white-space:pre-wrap; word-break:break-word; }
    .jnx-chat-time { color:#666; font-size:10px; margin-top:5px; }
    .jnx-chat-empty { color:#777; text-align:center; margin:auto; }
    .jnx-chat-footer { display:flex; gap:10px; padding:15px; border-top:1px solid rgba(255,255,255,.08); }
    .jnx-chat-input { flex:1; min-width:0; resize:none; height:46px; max-height:120px; padding:12px 14px; border:1px solid rgba(255,255,255,.12); border-radius:14px; background:rgba(255,255,255,.05); color:#fff; outline:none; font:inherit; }
    .jnx-chat-send { border:0; border-radius:14px; padding:0 18px; background:#fff; color:#111; font-weight:600; cursor:pointer; }
    .jnx-chat-send:disabled { opacity:.5; cursor:default; }
    @media (max-width:600px) { .jnx-chat-box { width:96vw; height:90vh; border-radius:18px; } .jnx-chat-message { max-width:88%; } .jnx-chat-footer { padding:10px; } }
  `;
  document.head.appendChild(style);

  function addChatUI() {
    if (document.getElementById("jnxChatModal")) return;

    const navRight = document.querySelector(".nav-links");
    if (navRight) {
      const button = document.createElement("button");
      button.id = "jnxChatButton";
      button.className = "jnx-chat-button";
      button.setAttribute("data-en", "Chat");
      button.setAttribute("data-zh", "群聊");
      button.textContent = "群聊";
      navRight.appendChild(button);
    }

    const modal = document.createElement("div");
    modal.id = "jnxChatModal";
    modal.className = "jnx-chat-modal";
    modal.innerHTML = `
      <div class="jnx-chat-overlay" id="jnxChatOverlay"></div>
      <div class="jnx-chat-box">
        <div class="jnx-chat-header">
          <div><h2>JNX Community</h2><p>所有登录用户都可以在这里聊天</p></div>
          <button class="jnx-chat-close" id="jnxChatClose">×</button>
        </div>
        <div class="jnx-chat-messages" id="jnxChatMessages"><div class="jnx-chat-empty">加载中...</div></div>
        <div class="jnx-chat-footer">
          <textarea class="jnx-chat-input" id="jnxChatInput" maxlength="1000" placeholder="输入消息..." rows="1"></textarea>
          <button class="jnx-chat-send" id="jnxChatSend">发送</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  function waitForSupabase(timeout = 15000) {
    return new Promise((resolve, reject) => {
      const started = Date.now();
      const timer = setInterval(() => {
        if (window.supabase?.createClient) {
          clearInterval(timer);
          resolve();
        } else if (Date.now() - started > timeout) {
          clearInterval(timer);
          reject(new Error("Supabase library not ready"));
        }
      }, 50);
    });
  }

  async function initChat() {
    addChatUI();
    await waitForSupabase();

    const db = window.supabase.createClient(
      "https://qdehfgjifhtczkrpuadl.supabase.co",
      "sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp"
    );

    const button = document.getElementById("jnxChatButton");
    const modal = document.getElementById("jnxChatModal");
    const close = document.getElementById("jnxChatClose");
    const overlay = document.getElementById("jnxChatOverlay");
    const messagesBox = document.getElementById("jnxChatMessages");
    const input = document.getElementById("jnxChatInput");
    const send = document.getElementById("jnxChatSend");
    let currentUser = null;

    function openChat() { modal.classList.add("active"); loadMessages(); setTimeout(() => input.focus(), 100); }
    function closeChat() { modal.classList.remove("active"); }

    function renderMessages(rows) {
      messagesBox.innerHTML = "";
      if (!rows.length) {
        messagesBox.innerHTML = '<div class="jnx-chat-empty">还没有消息，成为第一个发言的人吧。</div>';
        return;
      }
      rows.forEach(row => {
        const item = document.createElement("div");
        item.className = "jnx-chat-message" + (row.user_id === currentUser?.id ? " mine" : "");
        const name = document.createElement("div");
        name.className = "jnx-chat-name";
        name.textContent = row.display_name || "JNX User";
        const content = document.createElement("div");
        content.className = "jnx-chat-content";
        content.textContent = row.content;
        const time = document.createElement("div");
        time.className = "jnx-chat-time";
        time.textContent = row.created_at ? new Date(row.created_at).toLocaleString("zh-CN") : "";
        item.append(name, content, time);
        messagesBox.appendChild(item);
      });
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    async function loadMessages() {
      if (!currentUser) return;
      messagesBox.innerHTML = '<div class="jnx-chat-empty">加载中...</div>';
      const result = await db.from("chat_messages").select("id,user_id,display_name,content,created_at").order("created_at", { ascending: true }).limit(200);
      if (result.error) {
        console.error("Chat load error:", result.error);
        messagesBox.innerHTML = '<div class="jnx-chat-empty">聊天暂时无法加载。</div>';
        return;
      }
      renderMessages(result.data || []);
    }

    async function sendMessage() {
      const content = input.value.trim();
      if (!currentUser || !content || send.disabled) return;
      send.disabled = true;
      const profile = await db.from("profiles").select("display_name,username").eq("id", currentUser.id).maybeSingle();
      const displayName = profile.data?.display_name || profile.data?.username || currentUser.user_metadata?.username || "JNX User";
      const result = await db.from("chat_messages").insert({ user_id: currentUser.id, display_name: displayName, content }).select("id,user_id,display_name,content,created_at").single();
      send.disabled = false;
      if (result.error) {
        console.error("Chat send error:", result.error);
        alert("消息发送失败：" + result.error.message);
        return;
      }
      input.value = "";
      input.style.height = "46px";
      if (!document.getElementById("jnx-chat-local-" + result.data.id)) {
        const rows = await db.from("chat_messages").select("id,user_id,display_name,content,created_at").order("created_at", { ascending: true }).limit(200);
        renderMessages(rows.data || []);
      }
    }

    button?.addEventListener("click", openChat);
    close?.addEventListener("click", closeChat);
    overlay?.addEventListener("click", closeChat);
    send?.addEventListener("click", sendMessage);
    input?.addEventListener("keydown", event => {
      if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); }
    });
    input?.addEventListener("input", () => { input.style.height = "46px"; input.style.height = Math.min(input.scrollHeight, 120) + "px"; });

    db.auth.onAuthStateChange(async (_event, session) => {
      currentUser = session?.user || null;
      button?.classList.toggle("active", !!currentUser);
      if (!currentUser) closeChat();
    });

    const auth = await db.auth.getUser();
    currentUser = auth.data?.user || null;
    button?.classList.toggle("active", !!currentUser);

    db.channel("jnx-community-chat")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, payload => {
        if (!currentUser || !modal.classList.contains("active")) return;
        loadMessages();
      })
      .subscribe((status, error) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") console.error("Chat realtime error:", status, error);
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initChat().catch(error => console.error("JNX chat initialization failed:", error));
  });

  document.write('<script src="script-core.js">' + '<' + '/script>');
})();
