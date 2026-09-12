(() => {
  const css = document.createElement("style");
  css.id = "jnxThemeLayerFix";
  css.textContent = `
html.jnxLight #home main h1,
html.jnxLight #home main h1 span {
  color: #31274f !important;
}
html.jnxLight .jnxCard,
html.jnxLight .jnxCard .jnxIcon,
html.jnxLight .jnxCard .jnxTitle {
  color: #242130 !important;
  background: #fff !important;
}
html.jnxLight .jnxCard .jnxDesc {
  color: #6e687d !important;
}
html.jnxLight .jnxWindow {
  background: #fff !important;
  color: #242130 !important;
  border-color: rgba(100, 75, 180, 0.2) !important;
}
html.jnxLight .jnxWindow * {
  color: inherit;
}
html.jnxLight .jnxClose {
  background: #eee9fa !important;
  color: #31274f !important;
  border-color: rgba(100, 75, 180, 0.28) !important;
}
html.jnxLight .jnxMenu,
html.jnxLight .jnxMenuBtn {
  background: #fff !important;
  color: #242130 !important;
  border-color: rgba(100, 75, 180, 0.2) !important;
}
html.jnxLight .jnxItem {
  color: #242130 !important;
}
html.jnxLight .jnxComment {
  background: #f8f6ff !important;
  color: #242130 !important;
}
html.jnxLight .jnxCommentMeta,
html.jnxLight #jnxCommentHint {
  color: #716a80 !important;
}
html.jnxLight #jnxCommentInput {
  background: #fff !important;
  color: #242130 !important;
  border-color: rgba(100, 75, 180, 0.2) !important;
}
html.jnxLight .login-modal .login-box,
html.jnxLight .profile-modal .profile-box,
html.jnxLight .settings-modal .settings-box,
html.jnxLight .woodfish-modal,
html.jnxLight .woodfish-modal .woodfish-box,
html.jnxLight .chat-modal,
html.jnxLight .chat-modal .chat-box,
html.jnxLight [class*="modal-box"],
html.jnxLight [class*="modal-content"] {
  background: #fff !important;
  color: #242130 !important;
  border-color: rgba(100, 75, 180, 0.2) !important;
}
html.jnxLight [id*="Modal"] input,
html.jnxLight [id*="Modal"] textarea,
html.jnxLight [id*="Modal"] select {
  background: #fff !important;
  color: #242130 !important;
  border-color: rgba(100, 75, 180, 0.22) !important;
}
html.jnxLight [id*="Modal"] button {
  color: #31274f;
}
html.jnxLight .login-close,
html.jnxLight .profile-close,
html.jnxLight .settings-close,
html.jnxLight [class*="modal-close"] {
  background: #eee9fa !important;
  color: #31274f !important;
  border-color: rgba(100, 75, 180, 0.28) !important;
}
#allUpdatesModal {
  position: fixed !important;
  inset: 0 !important;
  z-index: 30000 !important;
}
#allUpdatesModal.active {
  display: block !important;
}
#allUpdatesModal .all-updates-overlay {
  position: fixed !important;
  inset: 0 !important;
  z-index: 30000 !important;
}
#allUpdatesModal .all-updates-box {
  position: fixed !important;
  z-index: 30001 !important;
}
html.jnxLight #allUpdatesModal .all-updates-box {
  background: #fff !important;
  color: #242130 !important;
  border-color: rgba(100, 75, 180, 0.2) !important;
}
html.jnxLight #allUpdatesModal .all-updates-title,
html.jnxLight #allUpdatesModal .all-updates-subtitle,
html.jnxLight #allUpdatesModal .all-update-card {
  color: #242130 !important;
}
html.jnxLight #allUpdatesModal .all-update-card {
  background: #f8f6ff !important;
  border-color: rgba(100, 75, 180, 0.18) !important;
}
html.jnxLight #allUpdatesModal .all-updates-close {
  background: #eee9fa !important;
  color: #31274f !important;
  border-color: rgba(100, 75, 180, 0.28) !important;
}
.jnxModalPromoted {
  z-index: 40000 !important;
}
#settingsModal .settings-box {
  max-height: 88vh !important;
  overflow: auto !important;
}

@media (min-width: 601px) and (max-width: 1100px) {
  #home main {
    width: 100% !important;
    max-width: none !important;
    transform: translateY(-20px) !important;
  }
  #home main .small-text {
    margin-bottom: 8px !important;
    font-size: 10px !important;
    letter-spacing: 2px !important;
  }
  #home main h1 {
    width: 100% !important;
    max-width: none !important;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    justify-content: center !important;
    align-items: baseline !important;
    gap: 0.16em !important;
    white-space: nowrap !important;
    line-height: 0.95 !important;
    margin-bottom: 12px !important;
  }
  #home main h1 span {
    display: inline !important;
    flex: 0 0 auto !important;
    white-space: nowrap !important;
  }
  .jnxGrid {
    margin-top: 16px !important;
    gap: 10px !important;
  }
  .jnxCard {
    min-height: 72px !important;
    padding: 11px 13px !important;
    border-radius: 14px !important;
  }
  .jnxIcon {
    font-size: 19px !important;
    margin-bottom: 4px !important;
  }
  .jnxTitle {
    font-size: 13px !important;
    line-height: 1.15 !important;
  }
  .jnxDesc {
    font-size: 10px !important;
    line-height: 1.25 !important;
    margin-top: 3px !important;
  }
}

@media (min-width: 900px) and (max-width: 1100px) and (orientation: landscape) {
  #home main {
    transform: translateY(-26px) !important;
  }
  #home main h1 {
    margin-bottom: 10px !important;
  }
  .jnxGrid {
    margin-top: 12px !important;
    gap: 9px !important;
  }
  .jnxCard {
    min-height: 68px !important;
    padding: 10px 12px !important;
  }
}
`;
  document.head.appendChild(css);

  function forceTabletTitle() {
    const title = document.querySelector("#home main h1");
    if (!title || window.innerWidth < 601 || window.innerWidth > 1100) return;
    title.style.setProperty("display", "flex", "important");
    title.style.setProperty("flex-direction", "row", "important");
    title.style.setProperty("flex-wrap", "nowrap", "important");
    title.style.setProperty("white-space", "nowrap", "important");
    title.style.setProperty("width", "100%", "important");
    title.style.setProperty("max-width", "none", "important");
    title.style.setProperty("justify-content", "center", "important");
    title.querySelectorAll("span").forEach((span) => {
      span.style.setProperty("display", "inline", "important");
      span.style.setProperty("white-space", "nowrap", "important");
      span.style.setProperty("flex", "0 0 auto", "important");
    });
  }

  function promote() {
    document
      .querySelectorAll(
        '.jnxWindow [class*="modal"],.jnxWindow [id*="Modal"],.jnxWindow [id*="modal"]',
      )
      .forEach((el) => {
        if (el.parentElement !== document.body) document.body.appendChild(el);
        el.classList.add("jnxModalPromoted");
      });
    const all = document.getElementById("allUpdatesModal");
    if (all && all.parentElement !== document.body)
      document.body.appendChild(all);
  }

  function loadScriptOnce(src, attr) {
    if (document.querySelector(`script[${attr}]`)) return;
    const s = document.createElement("script");
    s.src = src;
    s.setAttribute(attr, "1");
    document.body.appendChild(s);
  }

  function init() {
    forceTabletTitle();
    promote();
    loadScriptOnce("site-changelog.js?v=2", "data-jnx-changelog-loader");
    loadScriptOnce(
      "profile-enhancement.js?v=2",
      "data-jnx-profile-enhancement-loader",
    );
    loadScriptOnce("points-system.js?v=1", "data-jnx-points-loader");
    loadScriptOnce("points-shop.js?v=1", "data-jnx-points-shop-loader");
    loadScriptOnce(
      "admin-notifications.js?v=1",
      "data-jnx-admin-notifications-loader",
    );
  }

  window.addEventListener("resize", forceTabletTitle);
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
