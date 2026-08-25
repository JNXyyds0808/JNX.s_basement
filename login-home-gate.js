(function () {
  function initHomeGate() {
    const home = document.getElementById('home');
    if (!home || document.getElementById('jnxLoginGate')) return;

    const main = home.querySelector('main');
    if (!main) return;

    const gate = document.createElement('section');
    gate.id = 'jnxLoginGate';
    gate.innerHTML = `
      <div class="jnx-login-gate-card">
        <div class="jnx-login-gate-icon">🔒</div>
        <h2>更多内容，登录后查看</h2>
        <p>登录 JNX 后即可查看完整首页内容。</p>
        <button type="button" id="jnxLoginGateButton">登录 / 注册</button>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #jnxLoginGate { display:none; min-height:55vh; align-items:center; justify-content:center; padding:40px 20px; box-sizing:border-box; }
      #jnxLoginGate.active { display:flex; }
      .jnx-login-gate-card { width:min(460px,100%); padding:34px 24px; text-align:center; border:1px solid rgba(133,133,255,.25); border-radius:22px; background:rgba(133,133,255,.09); box-shadow:0 12px 40px rgba(0,0,0,.12); }
      .jnx-login-gate-icon { font-size:42px; margin-bottom:12px; }
      .jnx-login-gate-card h2 { margin:0 0 10px; font-size:24px; }
      .jnx-login-gate-card p { margin:0 0 22px; opacity:.72; }
      #jnxLoginGateButton { border:0; border-radius:12px; padding:11px 22px; background:#7777d9; color:#fff; font:inherit; cursor:pointer; }
    `;
    document.head.appendChild(style);

    const originalChildren = Array.from(main.children);
    originalChildren.forEach(el => { el.dataset.jnxProtected = '1'; });
    main.appendChild(gate);

    function showLoggedOut() {
      originalChildren.forEach(el => { el.style.display = 'none'; });
      gate.classList.add('active');
      const btn = document.getElementById('jnxLoginGateButton');
      if (btn && !btn.dataset.bound) {
        btn.dataset.bound = '1';
        btn.addEventListener('click', () => {
          document.querySelector('.login-link')?.click();
        });
      }
    }

    function showLoggedIn() {
      originalChildren.forEach(el => { el.style.display = ''; });
      gate.classList.remove('active');
    }

    function check() {
      if (!window.supabase?.createClient) {
        setTimeout(check, 300);
        return;
      }
      const url = 'https://qdehfgjifhtczkrpuadl.supabase.co';
      const key = 'sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp';
      const db = window.supabase.createClient(url, key);
      db.auth.getUser().then(({ data }) => {
        if (data.user) showLoggedIn();
        else showLoggedOut();
      });
      db.auth.onAuthStateChange((_event, session) => {
        if (session?.user) showLoggedIn();
        else showLoggedOut();
      });
    }

    check();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHomeGate, { once:true });
  else initHomeGate();
})();
