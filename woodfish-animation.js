(function () {
  const HEADPAT_IMAGE = './fe31af823d2d7b25d31003b300a0afbecd5f084914cd19-Qgon8B_fw658.png';

  function addAnimation() {
    if (document.getElementById('jnxWoodfishMeritStyle')) return;
    const style = document.createElement('style');
    style.id = 'jnxWoodfishMeritStyle';
    style.textContent = `
      .jnx-woodfish-merit {
        position: absolute;
        left: 50%;
        top: 42%;
        z-index: 20;
        pointer-events: none;
        color: #f5cf63;
        font-size: 24px;
        font-weight: 800;
        line-height: 1;
        white-space: nowrap;
        text-shadow: 0 2px 8px rgba(0,0,0,.45);
        transform: translate(-50%, -50%) scale(.7);
        animation: jnxWoodfishMeritFloat .8s ease-out forwards;
      }
      @keyframes jnxWoodfishMeritFloat {
        0% { opacity: 0; transform: translate(-50%, -20%) scale(.7); }
        15% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
        100% { opacity: 0; transform: translate(-50%, -180%) scale(1); }
      }
      .wf-tap { position: relative !important; }
      .jnx-headpat-toggle {
        position: absolute;
        top: 14px;
        right: 14px;
        z-index: 100;
        border: 1px solid rgba(255,255,255,.16);
        border-radius: 999px;
        padding: 7px 11px;
        background: rgba(255,255,255,.08);
        color: inherit;
        font-size: 12px;
        cursor: pointer;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }
      .jnx-headpat-toggle.active { background: rgba(245,207,99,.18); }
      .jnx-headpat-image {
        position: absolute !important;
        left: 50% !important;
        top: 50% !important;
        width: 62% !important;
        height: 62% !important;
        object-fit: contain !important;
        transform: translate(-50%, -50%) !important;
        z-index: 5 !important;
        border-radius: 18px;
        pointer-events: none;
        display: none;
      }
      .jnx-headpat-mode .jnx-headpat-image { display: block; }
      .jnx-headpat-mode > *:not(.jnx-headpat-image) { }
    `;
    document.head.appendChild(style);

    document.addEventListener('click', function (event) {
      const tap = event.target.closest && event.target.closest('#wfTap');
      if (!tap || tap.disabled) return;
      const merit = document.createElement('span');
      merit.className = 'jnx-woodfish-merit';
      merit.textContent = '+1 功德';
      tap.appendChild(merit);
      setTimeout(() => merit.remove(), 850);
    }, true);

    initHeadpatMode();
  }

  function initHeadpatMode() {
    const tap = document.getElementById('wfTap');
    if (!tap || tap.dataset.headpatReady) return;
    tap.dataset.headpatReady = '1';

    const windowEl = tap.closest('.jnxWindow') || tap.parentElement;
    if (!windowEl) return;
    if (getComputedStyle(windowEl).position === 'static') windowEl.style.position = 'relative';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'jnx-headpat-toggle';
    toggle.textContent = '摸头模式：关闭';
    toggle.setAttribute('aria-pressed', 'false');

    const image = document.createElement('img');
    image.className = 'jnx-headpat-image';
    image.alt = '摸头模式';
    image.src = HEADPAT_IMAGE;

    tap.appendChild(image);
    windowEl.appendChild(toggle);

    let enabled = localStorage.getItem('jnxHeadpatMode') === '1';
    const apply = () => {
      windowEl.classList.toggle('jnx-headpat-mode', enabled);
      toggle.classList.toggle('active', enabled);
      toggle.textContent = enabled ? '摸头模式：开启' : '摸头模式：关闭';
      toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    };

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      enabled = !enabled;
      localStorage.setItem('jnxHeadpatMode', enabled ? '1' : '0');
      apply();
    });

    image.addEventListener('error', () => {
      console.warn('[JNX] Headpat image failed to load:', HEADPAT_IMAGE);
    });

    apply();
  }

  function boot() {
    addAnimation();
    if (!document.getElementById('wfTap')) {
      const observer = new MutationObserver(() => {
        if (document.getElementById('wfTap')) {
          observer.disconnect();
          initHeadpatMode();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 5000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
