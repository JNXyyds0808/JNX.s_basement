(() => {
  let memberOrigin = "members";
  let privateReturnUsername = "";

  const openMembers = () => {
    if (window.__jnxOpenMembers) window.__jnxOpenMembers();
  };
  const openChat = () => document.getElementById("jnxChatButton")?.click();
  const openMember = (username) => {
    if (username && window.__jnxOpenMemberProfile)
      window.__jnxOpenMemberProfile(username);
    else openMembers();
  };

  document.addEventListener(
    "click",
    (event) => {
      const memberCard = event.target.closest?.(".jnx-member-card");
      if (memberCard) memberOrigin = "members";

      const chatMember = event.target.closest?.(".jnx-chat-user");
      if (chatMember && !window.__jnxAllowDirectPrivateClick) memberOrigin = "chat";

      const memberChat = event.target.closest?.("#jnxMemberChat");
      if (memberChat) {
        privateReturnUsername = (
          document.getElementById("jnxMemberProfileUsername")?.textContent || ""
        )
          .replace(/^@/, "")
          .trim();
      }

      const memberClose = event.target.closest?.(".jnx-member-profile-close");
      if (memberClose) {
        event.preventDefault();
        event.stopImmediatePropagation();
        document.getElementById("jnxMemberProfileModal")?.classList.remove("open");
        setTimeout(() => (memberOrigin === "chat" ? openChat() : openMembers()), 0);
        return;
      }

      const privateClose = event.target.closest?.("#jnxPrivateClose");
      if (privateClose && privateReturnUsername) {
        const username = privateReturnUsername;
        privateReturnUsername = "";
        setTimeout(() => openMember(username), 0);
      }
    },
    true,
  );
})();
