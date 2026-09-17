(() => {
  function loadHelper(src, attr) {
    if (document.querySelector(`script[${attr}]`)) return;
    const s = document.createElement("script");
    s.src = src;
    s.setAttribute(attr, "1");
    document.body.appendChild(s);
  }

  function loadGameHub() {
    loadHelper("game-hub.js?v=2", "data-jnx-game-hub");
    loadHelper("navigation-back.js?v=1", "data-jnx-navigation-back");
  }

  function openGameHub() {
    if (window.__jnxOpenGameHub) {
      window.__jnxOpenGameHub();
      return;
    }
    loadGameHub();
    let tries = 0;
    const timer = setInterval(() => {
      if (window.__jnxOpenGameHub) {
        clearInterval(timer);
        window.__jnxOpenGameHub();
      } else if (++tries >= 30) clearInterval(timer);
    }, 100);
  }

  function init() {
    loadGameHub();
    const card = [...document.querySelectorAll(".jnxCard")].find(
      (el) => el.dataset.a === "chat",
    );
    if (!card) {
      setTimeout(init, 200);
      return;
    }
    if (card.dataset.unreadReady) return;
    card.dataset.unreadReady = "1";
    card.style.position = "relative";
    let badge = document.getElementById("jnxHomeChatUnreadBadge");
    if (!badge) {
      badge = document.createElement("span");
      badge.id = "jnxHomeChatUnreadBadge";
      badge.style.cssText =
        "display:none;position:absolute;top:10px;right:10px;min-width:18px;height:18px;padding:0 5px;box-sizing:border-box;border-radius:999px;background:#e53935;color:#fff;font:700 11px/18px Arial,sans-serif;text-align:center;z-index:30;pointer-events:none;box-shadow:0 1px 5px rgba(0,0,0,.25)";
      card.appendChild(badge);
    }
    const update = () => {
      const old = document.getElementById("jnxPrivateUnreadBadge");
      if (!old) {
        badge.style.display = "none";
        return;
      }
      const n = parseInt(old.textContent, 10) || 0;
      badge.textContent = n > 99 ? "99+" : String(n);
      badge.style.display = n > 0 ? "block" : "none";
    };
    window.__jnxUpdateHomeChatUnread = update;
    update();
    setInterval(update, 1000);
  }

  document.addEventListener(
    "click",
    (event) => {
      const gameEntry = event.target.closest(
        '.jnxCard[data-a="woodfish"], .jnxItem[data-a="woodfish"]',
      );
      if (!gameEntry) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openGameHub();
    },
    true,
  );

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
