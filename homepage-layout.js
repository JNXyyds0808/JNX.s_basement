(function(){
  function init(){
    if(document.documentElement.dataset.jnxHomepageLayout==='2')return;
    document.documentElement.dataset.jnxHomepageLayout='2';
    const style=document.createElement('style');
    style.textContent=`
      html,body{height:100%;min-height:100%;margin:0;background:#11101b!important;color:#fff!important;overflow:hidden!important;overscroll-behavior:none!important}
      body{touch-action:none;background:#11101b!important}
      #home{height:100dvh!important;min-height:100dvh!important;max-height:100dvh!important;overflow:hidden!important;display:flex!important;flex-direction:column!important;background:#11101b!important}
      #home main{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;box-sizing:border-box;padding-top:clamp(28px,7vh,72px)!important;padding-bottom:20px!important}
      #home main h1{margin-bottom:0!important}
      #home main>p{display:none!important}
      #about,#stuff,#recent{display:none!important}
      #jnxRecentLauncher{margin-top:34px!important;width:min(620px,calc(100% - 32px));padding:18px 22px;border:1px solid rgba(133,133,255,.3);border-radius:18px;background:rgba(133,133,255,.12);color:#fff;text-align:left;font:inherit;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.14)}
      #jnxRecentOverlay{position:fixed;inset:0;z-index:10000;display:none;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;background:rgba(0,0,0,.62);overflow:hidden}
      #jnxRecentOverlay.active{display:flex}
      #jnxRecentWindow{position:relative;width:min(760px,94vw);height:min(82dvh,760px);overflow:auto;box-sizing:border-box;padding:28px;border:1px solid rgba(133,133,255,.32);border-radius:24px;background:#171526;color:#fff;box-shadow:0 20px 70px rgba(0,0,0,.5)}
      #jnxRecentWindow h2{margin:0 0 8px;color:#fff}
      #jnxRecentWindow .section-description{color:#c9c9df}
      #jnxRecentClose{position:absolute;right:14px;top:12px;width:36px;height:36px;border:1px solid rgba(255,255,255,.14);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:21px;cursor:pointer}
      #jnxRecentContent{margin-top:22px}
      @media(min-width:601px){#home main{padding-left:28px!important;padding-right:28px!important}#jnxRecentLauncher{margin-top:30px!important}}
      @media(max-width:600px){html,body{height:100dvh!important;background:#11101b!important;color:#fff!important;overflow:hidden!important}#home{height:100dvh!important;background:#11101b!important}#home main{padding:24px 0 16px!important}#jnxRecentLauncher{margin-top:22px!important;width:calc(100% - 28px);padding:15px 17px}#jnxRecentOverlay{padding:10px}#jnxRecentWindow{width:100%;height:88dvh;padding:20px 16px;border-radius:20px;overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y}}
    `;
    document.head.appendChild(style);
    const recent=document.getElementById('recent');
    const main=document.querySelector('#home main');
    const title=main?.querySelector('h1');
    if(!recent||!main||!title)return;
    const launcher=document.createElement('button');
    launcher.id='jnxRecentLauncher';
    launcher.innerHTML='<strong>最近在做什么</strong><span>点击查看 JNX 最近正在做的事情 →</span>';
    title.insertAdjacentElement('afterend',launcher);
    const overlay=document.createElement('div');
    overlay.id='jnxRecentOverlay';
    overlay.innerHTML='<section id="jnxRecentWindow"><button id="jnxRecentClose" aria-label="关闭">×</button><div id="jnxRecentContent"></div></section>';
    document.body.appendChild(overlay);
    const content=document.getElementById('jnxRecentContent');
    const sectionInner=recent.querySelector('.section-inner');
    if(sectionInner)content.appendChild(sectionInner);
    launcher.addEventListener('click',()=>overlay.classList.add('active'));
    document.getElementById('jnxRecentClose').addEventListener('click',()=>overlay.classList.remove('active'));
    overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.classList.remove('active')});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')overlay.classList.remove('active')});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
