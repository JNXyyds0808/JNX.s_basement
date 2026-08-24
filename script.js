(function () {
  const style = document.createElement("style");
  style.textContent = `
    .activity-list { width: 100%; max-width: 800px; }
    .activity-card { padding: 22px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .activity-card h3 { color:#fff !important; font-size:22px; margin-bottom:8px; }
    .activity-card p { color:#aaa !important; font-size:16px; line-height:1.7; margin:0 0 8px; }
    .activity-card small { color:#666 !important; font-size:12px; }
    .activity-more-button { margin-top:24px; padding:11px 18px; border:1px solid rgba(255,255,255,.14); border-radius:22px; background:rgba(255,255,255,.04); color:#fff; cursor:pointer; font-size:14px; transition:.25s; backdrop-filter:blur(10px); }
    .activity-more-button:hover { background:rgba(255,255,255,.1); transform:translateY(-2px); }
    .all-updates-modal { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; opacity:0; visibility:hidden; transition:.25s; z-index:200; }
    .all-updates-modal.active { opacity:1; visibility:visible; }
    .all-updates-overlay { position:absolute; inset:0; background:rgba(0,0,0,.7); backdrop-filter:blur(8px); }
    .all-updates-box { position:relative; z-index:2; width:min(720px,90%); max-height:80vh; overflow-y:auto; padding:32px; border:1px solid rgba(255,255,255,.12); border-radius:24px; background:rgba(18,16,30,.94); backdrop-filter:blur(25px); box-shadow:0 25px 70px rgba(0,0,0,.5); }
    .all-updates-close { position:absolute; top:16px; right:18px; border:0; background:transparent; color:#888; font-size:28px; cursor:pointer; }
    .all-updates-title { color:#fff !important; margin-bottom:8px; }
    .all-updates-subtitle { color:#888 !important; margin-bottom:22px; }
    .all-update-card { padding:18px 0; border-top:1px solid rgba(255,255,255,.08); }
    .all-update-card h3 { color:#fff !important; margin-bottom:8px; }
    .all-update-card p { color:#aaa !important; line-height:1.7; }
    .all-update-card small { display:block; margin-top:10px; color:#666 !important; }

    .jnx-chat-button { display:none; border:0; background:transparent; color:inherit; cursor:pointer; font:inherit; padding:8px 10px; }
    .jnx-chat-button.active { display:inline-block; }
    .jnx-chat-modal { position:fixed; inset:0; z-index:300; display:flex; align-items:center; justify-content:center; opacity:0; visibility:hidden; transition:.2s; }
    .jnx-chat-modal.active { opacity:1; visibility:visible; }
    .jnx-chat-overlay { position:absolute; inset:0; background:rgba(0,0,0,.72); backdrop-filter:blur(8px); }
    .jnx-chat-box { position:relative; z-index:2; width:min(820px,94vw); height:min(720px,88vh); display:flex; flex-direction:column; background:rgba(18,16,30,.97); border:1px solid rgba(255,255,255,.12); border-radius:24px; overflow:hidden; box-shadow:0 25px 80px rgba(0,0,0,.55); }
    .jnx-chat-header { display:flex; align-items:center; justify-content:space-between; padding:20px 22px; border-bottom:1px solid rgba(255,255,255,.08); flex-shrink:0; }
    .jnx-chat-header h2 { color:#fff; margin:0; font-size:22px; }
    .jnx-chat-header p { color:#888; margin:5px 0 0; font-size:13px; }
    .jnx-chat-close { border:0; background:transparent; color:#888; font-size:28px; cursor:pointer; }
    .jnx-chat-layout { flex:1; min-height:0; display:flex; }
    .jnx-chat-users { width:230px; flex-shrink:0; border-right:1px solid rgba(255,255,255,.08); overflow-y:auto; padding:12px; }
    .jnx-chat-users-title { color:#777; font-size:11px; letter-spacing:2px; padding:8px 10px 12px; }
    .jnx-chat-user { width:100%; display:flex; align-items:center; gap:10px; padding:10px; border:0; border-radius:12px; background:transparent; color:#fff; text-align:left; cursor:pointer; }
    .jnx-chat-user:hover { background:rgba(255,255,255,.07); }
    .jnx-chat-avatar { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; background:rgba(130,110,255,.18); color:#fff; font-weight:700; }
    .jnx-chat-user-name { min-width:0; }
    .jnx-chat-user-display { color:#fff; font-size:14px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .jnx-chat-user-username { color:#666; font-size:11px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .jnx-chat-users-empty { color:#666; font-size:13px; padding:10px; line-height:1.6; }
    .jnx-chat-main { flex:1; min-width:0; min-height:0; display:flex; flex-direction:column; }
    .jnx-chat-messages { flex:1; min-height:0; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:12px; -webkit-overflow-scrolling:touch; }
    .jnx-chat-message { max-width:78%; padding:11px 14px; border-radius:16px; background:rgba(255,255,255,.07); align-self:flex-start; }
    .jnx-chat-message.mine { align-self:flex-end; background:rgba(255,255,255,.13); }
    .jnx-chat-name { color:#aaa; font-size:12px; margin-bottom:4px; }
    .jnx-chat-message.mine .jnx-chat-name { color:#ddd; }
    .jnx-chat-content { color:#fff; font-size:15px; line-height:1.55; white-space:pre-wrap; word-break:break-word; }
    .jnx-chat-time { color:#666; font-size:10px; margin-top:5px; }
    .jnx-chat-empty { color:#777; text-align:center; margin:auto; }
    .jnx-chat-footer { display:flex; gap:10px; padding:15px; padding-bottom:max(15px, env(safe-area-inset-bottom)); border-top:1px solid rgba(255,255,255,.08); flex-shrink:0; background:rgba(18,16,30,.98); position:relative; z-index:3; }
    .jnx-chat-input { flex:1; min-width:0; resize:none; height:46px; max-height:120px; padding:12px 14px; border:1px solid rgba(255,255,255,.12); border-radius:14px; background:rgba(255,255,255,.05); color:#fff; outline:none; font:inherit; font-size:16px; -webkit-appearance:none; appearance:none; }
    .jnx-chat-send { border:0; border-radius:14px; padding:0 18px; min-height:46px; background:#fff; color:#111; font-weight:600; cursor:pointer; flex-shrink:0; }
    .jnx-chat-send:disabled { opacity:.5; cursor:default; }
    @media (max-width:600px) {
      .jnx-chat-modal { align-items:flex-end; }
      .jnx-chat-box { width:100vw; max-width:100vw; height:100dvh; max-height:100dvh; height:-webkit-fill-available; min-height:0; border-radius:18px 18px 0 0; }
      .jnx-chat-layout { flex-direction:column; min-height:0; }
      .jnx-chat-users { width:100%; max-height:150px; min-height:0; border-right:0; border-bottom:1px solid rgba(255,255,255,.08); display:flex; flex-wrap:wrap; gap:4px; overflow-y:auto; flex-shrink:0; }
      .jnx-chat-users-title { width:100%; flex-shrink:0; }
      .jnx-chat-user { width:calc(50% - 2px); }
      .jnx-chat-main { min-height:0; flex:1; }
      .jnx-chat-messages { padding:14px; }
      .jnx-chat-message { max-width:88%; }
      .jnx-chat-footer { padding:8px 10px; padding-bottom:max(8px, env(safe-area-inset-bottom)); gap:8px; }
      .jnx-chat-input { height:44px; min-height:44px; }
      .jnx-chat-send { min-height:44px; padding:0 15px; }
    }
  `;
  document.head.appendChild(style);

  function addChatUI() {
    if (document.getElementById("jnxChatModal")) return;
    const navLinks = document.querySelector(".nav-links");
    if (navLinks) {
      const button = document.createElement("button");
      button.id = "jnxChatButton";
      button.className = "jnx-chat-button";
      button.setAttribute("data-en", "Chat");
      button.setAttribute("data-zh", "群聊");
      button.textContent = "群聊";
      navLinks.appendChild(button);
    }
    const modal = document.createElement("div");
    modal.id = "jnxChatModal";
    modal.className = "jnx-chat-modal";
    modal.innerHTML = `
      <div class="jnx-chat-overlay" id="jnxChatOverlay"></div>
      <div class="jnx-chat-box">
        <div class="jnx-chat-header">
          <div><h2>JNX Community</h2><p>总群聊 · 登录用户可聊天</p></div>
          <button class="jnx-chat-close" id="jnxChatClose">×</button>
        </div>
        <div class="jnx-chat-layout">
          <aside class="jnx-chat-users">
            <div class="jnx-chat-users-title">JNX USERS</div>
            <div id="jnxChatUsers" class="jnx-chat-users-empty">加载用户中...</div>
          </aside>
          <div class="jnx-chat-main">
            <div class="jnx-chat-messages" id="jnxChatMessages"><div class="jnx-chat-empty">加载中...</div></div>
            <div class="jnx-chat-footer">
              <textarea class="jnx-chat-input" id="jnxChatInput" maxlength="1000" placeholder="输入消息..." rows="1"></textarea>
              <button class="jnx-chat-send" id="jnxChatSend">发送</button>
            </div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  function waitForSupabase(timeout = 15000) {
    return new Promise((resolve, reject) => {
      const started = Date.now();
      const timer = setInterval(() => {
        if (window.supabase?.createClient) { clearInterval(timer); resolve(); }
        else if (Date.now() - started > timeout) { clearInterval(timer); reject(new Error("Supabase library not ready")); }
      }, 50);
    });
  }

  async function initChat() {
    addChatUI();
    await waitForSupabase();
    const db = window.supabase.createClient("https://qdehfgjifhtczkrpuadl.supabase.co", "sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp");
    const button = document.getElementById("jnxChatButton");
    const modal = document.getElementById("jnxChatModal");
    const close = document.getElementById("jnxChatClose");
    const overlay = document.getElementById("jnxChatOverlay");
    const usersBox = document.getElementById("jnxChatUsers");
    const messagesBox = document.getElementById("jnxChatMessages");
    const input = document.getElementById("jnxChatInput");
    const send = document.getElementById("jnxChatSend");
    let currentUser = null;

    function openChat() { modal.classList.add("active"); loadUsers(); loadMessages(); setTimeout(() => input.focus(), 100); }
    function closeChat() { modal.classList.remove("active"); }

    async function loadUsers() {
      if (!currentUser) return;
      usersBox.innerHTML = '<div class="jnx-chat-users-empty">加载用户中...</div>';
      const result = await db.from("profiles").select("id,username,display_name").order("username", { ascending:true });
      if (result.error) { console.error("User list error:", result.error); usersBox.innerHTML = '<div class="jnx-chat-users-empty">用户列表暂时无法加载。</div>'; return; }
      const users = (result.data || []).filter(user => user.id !== currentUser.id);
      usersBox.innerHTML = "";
      if (!users.length) { usersBox.innerHTML = '<div class="jnx-chat-users-empty">暂时还没有其他用户。</div>'; return; }
      users.forEach(user => {
        const button = document.createElement("button");
        button.className = "jnx-chat-user";
        const avatar = document.createElement("span"); avatar.className = "jnx-chat-avatar"; avatar.textContent = (user.display_name || user.username || "J").charAt(0).toUpperCase();
        const name = document.createElement("span"); name.className = "jnx-chat-user-name";
        const display = document.createElement("span"); display.className = "jnx-chat-user-display"; display.textContent = user.display_name || user.username || "JNX User";
        const username = document.createElement("span"); username.className = "jnx-chat-user-username"; username.textContent = "@" + (user.username || "user");
        name.append(display, username); button.append(avatar, name);
        button.addEventListener("click", () => alert("私人聊天功能正在开发中。现在这里显示的是 JNX 用户列表。"));
        usersBox.appendChild(button);
      });
    }

    function renderMessages(rows) {
      messagesBox.innerHTML = "";
      if (!rows.length) { messagesBox.innerHTML = '<div class="jnx-chat-empty">还没有消息，成为第一个发言的人吧。</div>'; return; }
      rows.forEach(row => {
        const item = document.createElement("div"); item.className = "jnx-chat-message" + (row.user_id === currentUser?.id ? " mine" : "");
        const name = document.createElement("div"); name.className = "jnx-chat-name"; name.textContent = row.display_name || "JNX User";
        const content = document.createElement("div"); content.className = "jnx-chat-content"; content.textContent = row.content;
        const time = document.createElement("div"); time.className = "jnx-chat-time"; time.textContent = row.created_at ? new Date(row.created_at).toLocaleString("zh-CN") : "";
        item.append(name, content, time); messagesBox.appendChild(item);
      });
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    async function loadMessages() {
      if (!currentUser) return;
      messagesBox.innerHTML = '<div class="jnx-chat-empty">加载中...</div>';
      const result = await db.from("chat_messages").select("id,user_id,display_name,content,created_at").order("created_at", { ascending:true }).limit(200);
      if (result.error) { console.error("Chat load error:", result.error); messagesBox.innerHTML = '<div class="jnx-chat-empty">聊天暂时无法加载。</div>'; return; }
      renderMessages(result.data || []);
    }

    async function sendMessage() {
      const content = input.value.trim(); if (!currentUser || !content || send.disabled) return;
      send.disabled = true;
      const profile = await db.from("profiles").select("display_name,username").eq("id", currentUser.id).maybeSingle();
      const displayName = profile.data?.display_name || profile.data?.username || currentUser.user_metadata?.username || "JNX User";
      const result = await db.from("chat_messages").insert({ user_id:currentUser.id, display_name:displayName, content }).select("id,user_id,display_name,content,created_at").single();
      send.disabled = false;
      if (result.error) { console.error("Chat send error:", result.error); alert("消息发送失败：" + result.error.message); return; }
      input.value = ""; input.style.height = "46px";
      loadMessages();
    }

    button?.addEventListener("click", openChat); close?.addEventListener("click", closeChat); overlay?.addEventListener("click", closeChat); send?.addEventListener("click", sendMessage);
    input?.addEventListener("keydown", event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } });
    input?.addEventListener("input", () => { input.style.height="46px"; input.style.height=Math.min(input.scrollHeight,120)+"px"; });
    db.auth.onAuthStateChange(async (_event, session) => { currentUser=session?.user||null; button?.classList.toggle("active",!!currentUser); if (!currentUser) closeChat(); });
    const auth = await db.auth.getUser(); currentUser=auth.data?.user||null; button?.classList.toggle("active",!!currentUser);
    db.channel("jnx-community-chat").on("postgres_changes", {event:"INSERT",schema:"public",table:"chat_messages"}, () => { if (currentUser && modal.classList.contains("active")) loadMessages(); }).subscribe((status,error) => { if(status==="CHANNEL_ERROR"||status==="TIMED_OUT") console.error("Chat realtime error:",status,error); });
  }

  document.addEventListener("DOMContentLoaded", function () { initChat().catch(error => console.error("JNX chat initialization failed:", error)); });
  document.write('<script src="script-core.js">' + '<' + '/script>');
})();
