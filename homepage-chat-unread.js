(()=>{
  function init(){
    const card=[...document.querySelectorAll('.jnxCard')].find(el=>el.dataset.a==='chat');
    if(!card){setTimeout(init,200);return;}
    if(card.dataset.unreadReady)return;
    card.dataset.unreadReady='1';
    card.style.position='relative';
    let badge=document.getElementById('jnxHomeChatUnreadBadge');
    if(!badge){
      badge=document.createElement('span');
      badge.id='jnxHomeChatUnreadBadge';
      badge.style.cssText='display:none;position:absolute;top:10px;right:10px;min-width:18px;height:18px;padding:0 5px;box-sizing:border-box;border-radius:999px;background:#e53935;color:#fff;font:700 11px/18px Arial,sans-serif;text-align:center;z-index:30;pointer-events:none;box-shadow:0 1px 5px rgba(0,0,0,.25)';
      card.appendChild(badge);
    }
    const update=()=>{
      const old=document.getElementById('jnxPrivateUnreadBadge');
      if(!old){badge.style.display='none';return;}
      const n=parseInt(old.textContent,10)||0;
      badge.textContent=n>99?'99+':String(n);
      badge.style.display=n>0?'block':'none';
    };
    window.__jnxUpdateHomeChatUnread=update;
    update();
    setInterval(update,1000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
