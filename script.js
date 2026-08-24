(function () {
  const style = document.createElement("style");
  style.textContent = `
    .activity-list {
      width: 100%;
      max-width: 800px;
    }

    .activity-card {
      padding: 22px 0;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    .activity-card h3 {
      color: #fff !important;
      font-size: 22px;
      margin-bottom: 8px;
    }

    .activity-card p {
      color: #aaa !important;
      font-size: 16px;
      line-height: 1.7;
      margin: 0 0 8px;
    }

    .activity-card small {
      color: #666 !important;
      font-size: 12px;
    }

    .activity-more-button {
      margin-top: 24px;
      padding: 11px 18px;
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 22px;
      background: rgba(255,255,255,0.04);
      color: #fff;
      cursor: pointer;
      font-size: 14px;
      transition: 0.25s;
      backdrop-filter: blur(10px);
    }

    .activity-more-button:hover {
      background: rgba(255,255,255,0.1);
      transform: translateY(-2px);
    }

    .all-updates-modal {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: 0.25s;
      z-index: 200;
    }

    .all-updates-modal.active {
      opacity: 1;
      visibility: visible;
    }

    .all-updates-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(8px);
    }

    .all-updates-box {
      position: relative;
      z-index: 2;
      width: min(720px, 90%);
      max-height: 80vh;
      overflow-y: auto;
      padding: 32px;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 24px;
      background: rgba(18,16,30,0.94);
      backdrop-filter: blur(25px);
      box-shadow: 0 25px 70px rgba(0,0,0,0.5);
    }

    .all-updates-close {
      position: absolute;
      top: 16px;
      right: 18px;
      border: none;
      background: transparent;
      color: #888;
      font-size: 28px;
      cursor: pointer;
    }

    .all-updates-title {
      color: #fff !important;
      margin-bottom: 8px;
    }

    .all-updates-subtitle {
      color: #888 !important;
      margin-bottom: 22px;
    }

    .all-update-card {
      padding: 18px 0;
      border-top: 1px solid rgba(255,255,255,0.08);
    }

    .all-update-card h3 {
      color: #fff !important;
      margin-bottom: 8px;
    }

    .all-update-card p {
      color: #aaa !important;
      line-height: 1.7;
    }

    .all-update-card small {
      display: block;
      margin-top: 10px;
      color: #666 !important;
    }
  `;
  document.head.appendChild(style);

  document.write('<script src="script-core.js"><\\/script>');
})();
