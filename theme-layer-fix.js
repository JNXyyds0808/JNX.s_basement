(()=>{
const css=document.createElement('style');css.id='jnxThemeLayerFix';css.textContent=`
html.jnxLight #home main h1,html.jnxLight #home main h1 span{color:#31274f!important}
html.jnxLight .jnxCard,html.jnxLight .jnxCard .jnxIcon,html.jnxLight .jnxCard .jnxTitle{color:#242130!important;background:#fff!important}
html.jnxLight .jnxCard .jnxDesc{color:#6e687d!important}
html.jnxLight .jnxWindow{background:#fff!important;color:#242130!important}
html.jnxLight .jnxWindow *{color:inherit}
html.jnxLight .jnxClose{background:#eee9fa!important;color:#31274f!important;border-color:rgba(100,75,180,.28)!important}
html.jnxLight .jnxMenu,html.jnxLight .jnxMenuBtn{background:#fff!important;color:#242130!important}
html.jnxLight .jnxItem{color:#242130!important}
html.jnxLight .jnxComment{background:#f8f6ff!important;color:#242130!important}
html.jnxLight .jnxCommentMeta,html.jnxLight #jnxCommentHint{color:#716a80!important}
html.jnxLight #jnxCommentInput{background:#fff!important;color:#242130!important}
.jnxModalPromoted{z-index:20000!important}
`;
document.head.appendChild(css);
function promote(){document.querySelectorAll('.jnxWindow .profile-modal,.jnxWindow .login-modal,.jnxWindow [role="dialog"]').forEach(el=>{document.body.appendChild(el);el.classList.add('jnxModalPromoted')})}
function init(){promote();new MutationObserver(promote).observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
