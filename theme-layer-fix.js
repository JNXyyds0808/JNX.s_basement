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

    /* Light theme for the five existing feature windows/modals */
    html.jnxLight .login-modal .login-box,
    html.jnxLight .profile-modal .profile-box,
    html.jnxLight .settings-modal .settings-box,
    html.jnxLight .woodfish-modal,
    html.jnxLight .woodfish-modal .woodfish-box,
    html.jnxLight .chat-modal,
    html.jnxLight .chat-modal .chat-box,
    html.jnxLight [id*="Modal"] .login-box,
    html.jnxLight [id*="Modal"] .profile-box,
    html.jnxLight [id*="Modal"] .settings-box,
    html.jnxLight [id*="Modal"] .woodfish-box,
    html.jnxLight [id*="Modal"] .chat-box,
    html.jnxLight [class*="modal-box"],
    html.jnxLight [class*="modal-content"]{
      background:#fff!important;color:#242130!important;border-color:rgba(100,75,180,.2)!important;
    }
    html.jnxLight [id*="Modal"] input,
    html.jnxLight [id*="Modal"] textarea,
    html.jnxLight [id*="Modal"] select{
      background:#fff!important;color:#242130!important;border-color:rgba(100,75,180,.22)!important;
    }
    html.jnxLight [id*="Modal"] button{color:#31274f}
    html.jnxLight .login-close,html.jnxLight .profile-close,html.jnxLight .settings-close,html.jnxLight [class*="modal-close"]{
      background:#eee9fa!important;color:#31274f!important;border-color:rgba(100,75,180,.28)!important;
    }

    /* All-updates must sit above the current JNX window */
    #allUpdatesModal{position:fixed!important;inset:0!important;z-index:30000!important}
    #allUpdatesModal.active{display:block!important}
    #allUpdatesModal .all-updates-overlay{position:fixed!important;inset:0!important;z-index:30000!important}
    #allUpdatesModal .all-updates-box{position:fixed!important;z-index:30001!important}
    html.jnxLight #allUpdatesModal .all-updates-box{background:#fff!important;color:#242130!important;border-color:rgba(100,75,180,.2)!important}
    html.jnxLight #allUpdatesModal .all-updates-title,html.jnxLight #allUpdatesModal .all-updates-subtitle,html.jnxLight #allUpdatesModal .all-update-card{color:#242130!important}
    html.jnxLight #allUpdatesModal .all-update-card{background:#f8f6ff!important;border-color:rgba(100,75,180,.18)!important}
    html.jnxLight #allUpdatesModal .all-updates-close{background:#eee9fa!important;color:#31274f!important;border-color:rgba(100,75,180,.28)!important}
    .jnxModalPromoted{z-index:40000!important}
  `;
  document.head.appendChild(css);

  function promote(){
    document.querySelectorAll('.jnxWindow [class*="modal"],.jnxWindow [id*="Modal"],.jnxWindow [id*="modal"]').forEach(el=>{
      if(el.parentElement!==document.body){document.body.appendChild(el)}
      el.classList.add('jnxModalPromoted');
    });
    const all=document.getElementById('allUpdatesModal');
    if(all&&all.parentElement!==document.body)document.body.appendChild(all);
  }

  function init(){
    promote();
    new MutationObserver(promote).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
