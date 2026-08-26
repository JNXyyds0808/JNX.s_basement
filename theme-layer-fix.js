(()=>{
  const css=document.createElement('style');
  css.id='jnxThemeLayerFix';
  css.textContent=`
    html.jnxLight #home main h1,html.jnxLight #home main h1 span{color:#31274f!important}
    html.jnxLight .jnxCard,html.jnxLight .jnxCard .jnxIcon,html.jnxLight .jnxCard .jnxTitle{color:#242130!important;background:#fff!important}
    html.jnxLight .jnxCard .jnxDesc{color:#6e687d!important}
    html.jnxLight .jnxWindow{background:#fff!important;color:#242130!important;border-color:rgba(100,75,180,.2)!important}
    html.jnxLight .jnxWindow *{color:inherit}
    html.jnxLight .jnxClose{background:#eee9fa!important;color:#31274f!important;border-color:rgba(100,75,180,.28)!important}
    html.jnxLight .jnxMenu,html.jnxLight .jnxMenuBtn{background:#fff!important;color:#242130!important;border-color:rgba(100,75,180,.2)!important}
    html.jnxLight .jnxItem{color:#242130!important}
    html.jnxLight .jnxComment{background:#f8f6ff!important;color:#242130!important}
    html.jnxLight .jnxCommentMeta,html.jnxLight #jnxCommentHint{color:#716a80!important}
    html.jnxLight #jnxCommentInput{background:#fff!important;color:#242130!important;border-color:rgba(100,75,180,.2)!important}
    html.jnxLight .login-modal .login-box,html.jnxLight .profile-modal .profile-box,html.jnxLight .settings-modal .settings-box,html.jnxLight .woodfish-modal,html.jnxLight .woodfish-modal .woodfish-box,html.jnxLight .chat-modal,html.jnxLight .chat-modal .chat-box,html.jnxLight [class*="modal-box"],html.jnxLight [class*="modal-content"]{background:#fff!important;color:#242130!important;border-color:rgba(100,75,180,.2)!important}
    html.jnxLight [id*="Modal"] input,html.jnxLight [id*="Modal"] textarea,html.jnxLight [id*="Modal"] select{background:#fff!important;color:#242130!important;border-color:rgba(100,75,180,.22)!important}
    html.jnxLight [id*="Modal"] button{color:#31274f}
    html.jnxLight .login-close,html.jnxLight .profile-close,html.jnxLight .settings-close,html.jnxLight [class*="modal-close"]{background:#eee9fa!important;color:#31274f!important;border-color:rgba(100,75,180,.28)!important}
    #allUpdatesModal{position:fixed!important;inset:0!important;z-index:30000!important}
    #allUpdatesModal.active{display:block!important}
    #allUpdatesModal .all-updates-overlay{position:fixed!important;inset:0!important;z-index:30000!important}
    #allUpdatesModal .all-updates-box{position:fixed!important;z-index:30001!important}
    html.jnxLight #allUpdatesModal .all-updates-box{background:#fff!important;color:#242130!important;border-color:rgba(100,75,180,.2)!important}
    html.jnxLight #allUpdatesModal .all-updates-title,html.jnxLight #allUpdatesModal .all-updates-subtitle,html.jnxLight #allUpdatesModal .all-update-card{color:#242130!important}
    html.jnxLight #allUpdatesModal .all-update-card{background:#f8f6ff!important;border-color:rgba(100,75,180,.18)!important}
    html.jnxLight #allUpdatesModal .all-updates-close{background:#eee9fa!important;color:#31274f!important;border-color:rgba(100,75,180,.28)!important}
    .jnxModalPromoted{z-index:40000!important}
    @media(min-width:601px) and (max-width:1100px){.jnxGrid{margin-top:34px!important;gap:12px!important}.jnxCard{min-height:82px!important;padding:14px!important}.jnxIcon{font-size:22px!important;margin-bottom:6px!important}.jnxTitle{font-size:14px!important}.jnxDesc{font-size:11px!important}}
  `;
  document.head.appendChild(css);
  function promote(){
    document.querySelectorAll('.jnxWindow [class*="modal"],.jnxWindow [id*="Modal"],.jnxWindow [id*="modal"]').forEach(el=>{
      if(el.parentElement!==document.body)document.body.appendChild(el);
      el.classList.add('jnxModalPromoted');
    });
    const all=document.getElementById('allUpdatesModal');
    if(all&&all.parentElement!==document.body)document.body.appendChild(all);
  }
  function loadScriptOnce(src,attr){
    if(document.querySelector(`script[${attr}]`))return;
    const s=document.createElement('script');
    s.src=src;
    s.setAttribute(attr,'1');
    document.body.appendChild(s);
  }
  function init(){
    promote();
    loadScriptOnce('site-changelog.js?v=1','data-jnx-changelog-loader');
    loadScriptOnce('profile-enhancement.js?v=1','data-jnx-profile-enhancement-loader');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
