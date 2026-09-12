// Optional homepage modules. The theme layer is loaded once by index.html.
(() => {
  for (const src of [
    "recent-comments-theme.js?v=3",
    "homepage-chat-unread.js?v=1",
    "members.js?v=1",
  ]) {
    const script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
  }
})();
(() => {
  function init() {
    if (document.documentElement.dataset.jnxDash) return;
    const home = document.querySelector("#home"),
      main = home?.querySelector("main"),
      title = main?.querySelector("h1"),
      recent = document.querySelector("#recent");
    if (!home || !main || !title || !recent) {
      setTimeout(init, 150);
      return;
    }
    document.documentElement.dataset.jnxDash = "1";
    const css = document.createElement("style");
    css.textContent = `
html,
body,
#home {
  margin: 0 !important;
  width: 100% !important;
  height: 100dvh !important;
  min-height: 100dvh !important;
  max-height: 100dvh !important;
  background: #11101b !important;
  color: #fff !important;
  overflow: hidden !important;
  overscroll-behavior: none !important;
}
body {
  touch-action: none !important;
}
#home {
  display: flex !important;
  flex-direction: column !important;
}
#home .nav-links,
#home main > .small-text,
#home main > .description,
#home .buttons,
#home .scroll,
#about,
#stuff,
#recent,
#jnxGameLauncher {
  display: none !important;
}
#home main {
  flex: 1 !important;
  min-height: 0 !important;
  height: auto !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: flex-start !important;
  box-sizing: border-box !important;
  padding: clamp(28px, 6vh, 64px) 24px 24px !important;
}
#home main h1 {
  margin: 0 !important;
  color: #fff !important;
}
.jnxGrid {
  width: min(760px, 100%);
  margin-top: clamp(34px, 7vh, 70px);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.jnxCard {
  min-height: 92px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.055);
  color: #fff;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
  font: inherit;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.jnxCard:nth-child(1) {
  border-color: rgba(160, 125, 255, 0.58);
}
.jnxCard:nth-child(2) {
  border-color: rgba(255, 190, 92, 0.58);
}
.jnxCard:nth-child(3) {
  border-color: rgba(91, 190, 255, 0.58);
}
.jnxCard:nth-child(4) {
  border-color: rgba(104, 220, 165, 0.58);
}
.jnxCard:nth-child(5) {
  border-color: rgba(255, 120, 175, 0.58);
}
.jnxCard:nth-child(6) {
  border-color: rgba(185, 155, 255, 0.58);
}
.jnxCard:nth-child(1):hover {
  box-shadow: 0 0 20px rgba(160, 125, 255, 0.12);
}
.jnxCard:nth-child(2):hover {
  box-shadow: 0 0 20px rgba(255, 190, 92, 0.12);
}
.jnxCard:nth-child(3):hover {
  box-shadow: 0 0 20px rgba(91, 190, 255, 0.12);
}
.jnxCard:nth-child(4):hover {
  box-shadow: 0 0 20px rgba(104, 220, 165, 0.12);
}
.jnxCard:nth-child(5):hover {
  box-shadow: 0 0 20px rgba(255, 120, 175, 0.12);
}
.jnxCard:nth-child(6):hover {
  box-shadow: 0 0 20px rgba(185, 155, 255, 0.12);
}
.jnxCard:hover {
  background: rgba(255, 255, 255, 0.075);
  transform: translateY(-1px);
}
.jnxIcon {
  display: block;
  font-size: 25px;
  margin-bottom: 8px;
}
.jnxTitle {
  display: block;
  font-weight: 700;
  font-size: 16px;
}
.jnxDesc {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #999;
}
.jnxMenuBtn {
  position: fixed;
  left: 18px;
  bottom: 18px;
  z-index: 5000;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  background: rgba(20, 18, 32, 0.9);
  color: #fff;
  font-size: 23px;
}
.jnxMenu {
  position: fixed;
  left: 18px;
  bottom: 72px;
  z-index: 5001;
  width: 220px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: #161423;
  display: none;
}
.jnxMenu.open {
  display: block;
}
.jnxItem {
  width: 100%;
  padding: 11px 12px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #fff;
  text-align: left;
  font: inherit;
}
.jnxOverlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.66);
}
.jnxOverlay.open {
  display: flex;
}
.jnxWindow {
  position: relative;
  width: min(860px, 94vw);
  height: min(86dvh, 800px);
  overflow-y: auto;
  padding: 30px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  background: #171526;
  color: #fff;
  overscroll-behavior: contain;
  touch-action: pan-y;
}
.jnxClose {
  position: absolute;
  right: 14px;
  top: 12px;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 21px;
}
@media (min-width: 601px) and (max-width: 1100px) {
  #home main {
    width: 100% !important;
    max-width: none !important;
    padding-top: clamp(20px, 4vh, 38px) !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
  #home main h1 {
    width: 100% !important;
    max-width: none !important;
    white-space: nowrap !important;
    word-break: normal !important;
    overflow: visible !important;
    text-align: center !important;
    font-size: clamp(42px, 6.4vw, 64px) !important;
    line-height: 1 !important;
  }
  .jnxGrid {
    margin-top: clamp(24px, 4.5vh, 42px) !important;
  }
}
@media (max-width: 600px) {
  #home main {
    padding: 22px 14px 18px !important;
  }
  .jnxGrid {
    width: 100%;
    margin-top: 30px;
    gap: 10px;
  }
  .jnxCard {
    min-height: 82px;
    padding: 14px;
    border-radius: 15px;
  }
  .jnxIcon {
    font-size: 22px;
    margin-bottom: 6px;
  }
  .jnxTitle {
    font-size: 14px;
  }
  .jnxDesc {
    font-size: 11px;
  }
  .jnxMenuBtn {
    left: 12px;
    bottom: 12px;
  }
  .jnxMenu {
    left: 12px;
    bottom: 66px;
    width: 205px;
  }
  .jnxOverlay {
    padding: 8px;
  }
  .jnxWindow {
    width: 100%;
    height: 90dvh;
    padding: 20px 16px;
    border-radius: 19px;
  }
}
`;
    document.head.appendChild(css);
    const grid = document.createElement("div");
    grid.className = "jnxGrid";
    [
      ["📝", "最近在做什么", "查看最新动态", "recent"],
      ["🎮", "小游戏", "功德木鱼", "woodfish"],
      ["💬", "群聊", "JNX Community", "chat"],
      ["👤", "我的资料", "查看 Profile", "profile"],
      ["⚙️", "设置", "账号与外观设置", "settings"],
      ["📚", "写作档案", "蒋文涛文章档案", "archive"],
    ].forEach((c) => {
      const b = document.createElement("button");
      b.className = "jnxCard";
      b.dataset.a = c[3];
      b.innerHTML = `<span class="jnxIcon">${c[0]}</span><span class="jnxTitle">${c[1]}</span><span class="jnxDesc">${c[2]}</span>`;
      grid.appendChild(b);
    });
    main.appendChild(grid);
    const menuButton = document.createElement("button");
    menuButton.className = "jnxMenuBtn";
    menuButton.textContent = "☰";
    document.body.appendChild(menuButton);
    const menu = document.createElement("div");
    menu.className = "jnxMenu";
    menu.innerHTML =
      '<button class="jnxItem" data-a="recent">📝 最近在做什么</button><button class="jnxItem" data-a="archive">📚 写作档案</button><button class="jnxItem" data-a="woodfish">🎮 小游戏</button><button class="jnxItem" data-a="chat">💬 群聊</button><button class="jnxItem" data-a="members">👥 成员</button><button class="jnxItem" data-a="profile">👤 我的资料</button><button class="jnxItem" data-a="settings">⚙️ 设置</button>';
    document.body.appendChild(menu);
    const overlay = document.createElement("div");
    overlay.className = "jnxOverlay";
    overlay.innerHTML =
      '<section class="jnxWindow"><button class="jnxClose">×</button><div class="jnxContent"></div></section>';
    document.body.appendChild(overlay);
    const c = overlay.querySelector(".jnxContent"),
      sectionInner = recent.querySelector(".section-inner");
    if (sectionInner) c.appendChild(sectionInner);
    const go = (a) => {
      if (a === "recent") overlay.classList.add("open");
      else if (a === "archive") location.href = "archive.html";
      else if (a === "menu") menu.classList.toggle("open");
      else if (a === "members") {
        if (window.__jnxOpenMembers) window.__jnxOpenMembers();
        else document.dispatchEvent(new Event("jnx-open-members"));
        menu.classList.remove("open");
      } else {
        const id = {
            woodfish: "jnxGameLauncher",
            chat: "jnxChatButton",
            profile: "profileButton",
            settings: "settingsButton",
          }[a],
          e = id && document.getElementById(id);
        if (e) e.click();
        menu.classList.remove("open");
      }
    };
    grid.onclick = (e) => {
      const b = e.target.closest(".jnxCard");
      if (b) go(b.dataset.a);
    };
    menuButton.onclick = () => menu.classList.toggle("open");
    menu.onclick = (e) => {
      const b = e.target.closest(".jnxItem");
      if (b) go(b.dataset.a);
    };
    overlay.querySelector(".jnxClose").onclick = () =>
      overlay.classList.remove("open");
  }
  init();
})();
