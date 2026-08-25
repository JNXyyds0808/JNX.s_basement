(function(){
  function apply(){
    if(document.documentElement.dataset.jnxDashboardApplied==='true')return true;
    const home=document.getElementById('home');
    const main=home&&home.querySelector('main');
    const title=main&&main.querySelector('h1');
    const recent=document.getElementById('recent');
    if(!home||!main||!title||!recent)return false;
    document.documentElement.dataset.jnxDashboardApplied='true';

    const style=document.createElement('style');
    style.id='jnxDashboardStyle';
    style.textContent=`
      html,body{width:100%;height:100%;margin:0;background:#11101b!important;color:#fff!important;overflow:hidden!important;overscroll-behavior:none!important}
      body{touch-action:none!important}
      #home{width:100%;height:100dvh!important;min-height:100dvh!important;max-height:100dvh!important;overflow:hidden!important;background:#11101b!important;color:#fff!important;display:flex!important;flex-direction:column!important}
      #home nav{flex-shrink:0!important}
      #home .nav-links{display:none!important}
      #home main{flex:1!important;min-height:0!important;height:auto!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start!important;box-sizing:border-box!important;padding:clamp(28px,6vh,64px) 24px 24px!important;overflow:hidden!important}
      #home main>.small-text,#home main>.description,#home .buttons,#home .scroll{display:none!important}
      #home main h1{margin:0!important;color:#fff!important;flex-shrink:0!important}
      .jnx-dashboard-subtitle{margin:8px 0 0;color:#aaa;font-size:14px;text-align:center;display:block}
      #jnxDashboardGrid{width:min(760px,100%);margin-top:clamp(34px,7vh,70px);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;flex:0 1 auto}
      .jnx-dashboard-card{min-height:92px;padding:18px;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:rgba(255,255,255,.055);color:#fff;text-align:left;cursor:pointer;box-sizing:border-box;transition:transform .18s ease,background .18s ease,border-color .18s ease;touch-action:manipulation;font:inherit}
      .jnx-dashboard-card:hover{transform:translateY(-2px);background:rgba(255,255,255,.09);border-color:rgba(160,145,255,.38)}
      .jnx-dashboard-card:active{transform:scale(.98)}
      .jnx-dashboard-icon{display:block;font-size:25px;margin-bottom:8px}
      .jnx-dashboard-title{display:block;font-weight:700;font-size:16px;color:#fff}
      .jnx-dashboard-desc{display:block;margin-top:4px;font-size:12px;color:#999}
      #jnxDashboardMenuButton{position:fixed;left:18px;bottom:18px;z-index:5000;width:46px;height:46px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(20,18,32,.9);backdrop-filter:blur(12px);color:#fff;font-size:23px;cursor:pointer}
      #jnxDashboardMenu{position:fixed;left:18px;bottom:72px;z-index:5001;width:220px;padding:8px;border:1px solid rgba(255,255,255,.12);border-radius:16px;background:rgba(22,20,35,.97);box-shadow:0 18px 50px rgba(0,0,0,.45);display:none}
      #jnxDashboardMenu.active{display:block}
      .jnx-dashboard-menu-item{width:100%;padding:11px 12px;border:0;border-radius:10px;background:transparent;color:#fff;text-align:left;cursor:pointer;font:inherit}
      .jnx-dashboard-menu-item:hover{background:rgba(255,255,255,.08)}
      #jnxRecentOverlay{position:fixed!important;inset:0!important;z-index:10000!important;display:none;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;background:rgba(0,0,0,.66);overflow:hidden!important}
      #jnxRecentOverlay.active{display:flex!important}
      #jnxRecentWindow{position:relative;width:min(860px,94vw);height:min(86dvh,800px);overflow-y:auto;box-sizing:border-box;padding:30px;border:1px solid rgba(255,255,255,.12);border-radius:24px;background:#171526;color:#fff;box-shadow:0 24px 80px rgba(0,0,0,.55);overscroll-behavior:contain;touch-action:pan-y}
      #jnxRecentWindow h2{color:#fff;margin:0 0 8px}
      #jnxRecentWindow .section-description{color:#aaa}
      #jnxRecentClose{position:absolute;right:14px;top:12px;width:36px;height:36px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:21px;cursor:pointer}
      #jnxRecentContent{margin-top:22px}
      #about,#stuff,#recent{display:none!important}
      @media(min-width:601px){#jnxDashboardGrid{grid-template-columns:repeat(2,minmax(280px,1fr))}}
      @media(max-width:600px){
        html,body,#home{height:100dvh!important;background:#11101b!important;color:#fff!important;overflow:hidden!important}
        #home main{padding:22px 14px 18px!important}
        #jnxDashboardGrid{width:100%;margin-top:30px;gap:10px}
        .jnx-dashboard-card{min-height:82px;padding:14px;border-radius:15px}
        .jnx-dashboard-icon{font-size:22px;margin-bottom:6px}
        .jnx-dashboard-title{font-size:14px}
        .jnx-dashboard-desc{font-size:11px}
        #jnxDashboardMenuButton{left:12px;bottom:12px}
        #jnxDashboardMenu{left:12px;bottom:66px;width:205px}
        #jnxRecentOverlay{padding:8px}
        #jnxRecentWindow{width:100%;height:90dvh;padding:20px 16px;border-radius:19px}
      }
    `;
    document.head.appendChild(style);

    const subtitle=document.createElement('div');
    subtitle.className='jnx-dashboard-subtitle';
    subtitle.textContent='JNX 的小角落';
    title.insertAdjacentElement('afterend',subtitle);

    const grid=document.createElement('div');
    grid.id='jnxDashboardGrid';
    const cards=[
      ['📝','最近在做什么','查看最新动态','recent'],
      ['🎮','小游戏','功德木鱼','woodfish'],
      ['💬','群聊','JNX Community','chat'],
      ['👤','我的资料','查看 Profile','profile'],
      ['⚙️','设置','账号与外观设置','settings'],
      ['✨','全部功能','打开功能菜单','menu']
    ];
    cards.forEach(c=>{
      const b=document.createElement('button');
      b.className='jnx-dashboard-card';
      b.dataset.action=c[3];
      b.innerHTML='<span class="jnx-dashboard-icon">'+c[0]+'</span><span class="jnx-dashboard-title">'+c[1]+'</span><span class="jnx-dashboard-desc">'+c[2]+'</span>';
      grid.appendChild(b);
    });
    main.appendChild(grid);

    const menuButton=document.createElement('button');
    menuButton.id='jnxDashboardMenuButton';
    menuButton.textContent='☰';
    menuButton.setAttribute('aria-label','全部功能');
    document.body.appendChild(menuButton);
    const menu=document.createElement('div');
    menu.id='jnxDashboardMenu';
    menu.innerHTML='<button class="jnx-dashboard-menu-item" data-menu="recent">📝 最近在做什么</button><button class="jnx-dashboard-menu-item" data-menu="woodfish">🎮 小游戏</button><button class="jnx-dashboard-menu-item" data-menu="chat">💬 群聊</button><button class="jnx-dashboard-menu-item" data-menu="profile">👤 我的资料</button><button class="jnx-dashboard-menu-item" data-menu="settings">⚙️ 设置</button>';
    document.body.appendChild(menu);

    const overlay=document.createElement('div');
    overlay.id='jnxRecentOverlay';
    overlay.innerHTML='<section id="jnxRecentWindow"><button id="jnxRecentClose" aria-label="关闭">×</button><div id="jnxRecentContent"></div></section>';
    document.body.appendChild(overlay);
    const content=document.getElementById('jnxRecentContent');
    const sectionInner=recent.querySelector('.section-inner');
    if(sectionInner)content.appendChild(sectionInner);

    function openRecent(){overlay.classList.add('active');menu.classList.remove('active')}
    function clickExisting(id){const el=document.getElementById(id);if(el){el.click();menu.classList.remove('active');return true}return false}
    function action(a){
      if(a==='recent')return openRecent();
      if(a==='woodfish')return clickExisting('jnxGameLauncher');
      if(a==='chat')return clickExisting('jnxChatButton');
      if(a==='profile')return clickExisting('profileButton');
      if(a==='settings')return clickExisting('settingsButton');
      if(a==='menu')return menu.classList.toggle('active');
    }
    grid.addEventListener('click',e=>{const card=e.target.closest('.jnx-dashboard-card');if(card)action(card.dataset.action)});
    menuButton.addEventListener('click',()=>menu.classList.toggle('active'));
    menu.addEventListener('click',e=>{const item=e.target.closest('.jnx-dashboard-menu-item');if(item)action(item.dataset.menu)});
    document.getElementById('jnxRecentClose').addEventListener('click',()=>overlay.classList.remove('active'));
    overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.classList.remove('active')});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){overlay.classList.remove('active');menu.classList.remove('active')}});
    return true;
  }
  function wait(){if(apply())return;setTimeout(wait,100)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait,{once:true});else wait();
})();
