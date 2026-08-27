(function () {
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
  }

  function boot() {
    addAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
