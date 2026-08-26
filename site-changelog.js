(()=>{
  const entries=[
    {date:'2026-08-25',title:'个人主页升级',text:'升级 Profile：加入头像、Display Name、用户名和个性签名展示；Settings 新增头像上传与个性签名编辑，并加入后台上次在线时间记录。'},
    {date:'2026-08-25',title:'iPad 首页布局调整',text:'针对 iPad 首页继续优化布局，撤回过度压缩卡片的方案，改为让首页标题尽量保持单行显示，为六张功能卡片留出更多空间。'},
    {date:'2026-08-25',title:'网站稳定性修复',text:'修复首页逐渐无法点击甚至浏览器卡住的问题，移除高频全页面 DOM 监听，让首页、聊天和私信未读功能更加稳定。'},
    {date:'2026-08-25',title:'私信未读提示',text:'恢复首页聊天卡片的未读红点，并将未读数量同步调整为约 3 秒一次。私信消息本身仍使用实时推送。'},
    {date:'2026-08-25',title:'网站更新日志',text:'加入网站更新日志入口，用来记录 JNX 的重要功能更新和修复。'},
    {date:'2026-08-24',title:'首页 Dashboard',text:'重新整理首页功能卡片、左侧功能菜单，以及最近在做什么入口。'},
    {date:'2026-08-24',title:'深浅色模式',text:'加入深浅色切换，并针对手机、iPad 和电脑端调整界面颜色与弹窗显示。'},
    {date:'2026-08-24',title:'最近在做什么',text:'加入动态展示、查看全部动态以及评论区功能。'}
  ];
  function init(){
    if(document.getElementById('jnxChangelogButton'))return;
    const style=document.createElement('style');
    style.textContent=`
      #jnxChangelogButton{position:fixed;right:18px;bottom:18px;z-index:6000;width:46px;height:46px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(20,18,32,.9);color:#fff;font-size:20px;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.15)}
      #jnxChangelogButton:hover{transform:translateY(-1px)}
      #jnxChangelogModal{position:fixed;inset:0;z-index:32000;display:none;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;background:rgba(0,0,0,.62);backdrop-filter:blur(6px)}
      #jnxChangelogModal.open{display:flex}
      #jnxChangelogBox{position:relative;width:min(680px,94vw);max-height:min(82dvh,760px);overflow-y:auto;padding:28px;border:1px solid rgba(255,255,255,.12);border-radius:22px;background:#171526;color:#fff;box-sizing:border-box;overscroll-behavior:contain}
      #jnxChangelogClose{position:absolute;right:14px;top:12px;width:36px;height:36px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:22px;cursor:pointer}
      #jnxChangelogBox h2{margin:0 44px 6px 0;font-size:26px}#jnxChangelogBox>p{margin:0 0 22px;color:#aaa;font-size:13px}
      .jnxLogEntry{padding:15px 16px;margin-bottom:12px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(255,255,255,.045)}
      .jnxLogEntry h3{margin:0 0 7px;font-size:16px}.jnxLogEntry p{margin:0 0 8px;line-height:1.6;font-size:13px}.jnxLogEntry small{color:#999;font-size:11px}
      html.jnxLight #jnxChangelogButton{background:#fff;color:#31274f;border-color:rgba(100,75,180,.22)}
      html.jnxLight #jnxChangelogBox{background:#fff;color:#242130;border-color:rgba(100,75,180,.2)}
      html.jnxLight #jnxChangelogBox>p,html.jnxLight .jnxLogEntry small{color:#716a80}
      html.jnxLight .jnxLogEntry{background:#f8f6ff;border-color:rgba(100,75,180,.18)}
      html.jnxLight #jnxChangelogClose{background:#eee9fa;color:#31274f;border-color:rgba(100,75,180,.28)}
      @media(min-width:601px) and (max-width:1100px){
        .jnxGrid{margin-top:34px!important;gap:12px!important}
        .jnxCard{min-height:82px!important;padding:14px!important}
        .jnxIcon{font-size:22px!important;margin-bottom:6px!important}
        .jnxTitle{font-size:14px!important}.jnxDesc{font-size:11px!important}
      }
      @media(max-width:600px){#jnxChangelogButton{right:12px;bottom:12px;width:44px;height:44px}#jnxChangelogModal{padding:8px}#jnxChangelogBox{width:100%;max-height:90dvh;padding:22px 16px;border-radius:19px}}
    `;
    document.head.appendChild(style);
    const button=document.createElement('button');button.id='jnxChangelogButton';button.textContent='📋';button.title='网站更新日志';button.setAttribute('aria-label','网站更新日志');
    const modal=document.createElement('div');modal.id='jnxChangelogModal';
    const box=document.createElement('section');box.id='jnxChangelogBox';
    const close=document.createElement('button');close.id='jnxChangelogClose';close.textContent='×';
    box.innerHTML='<h2>网站更新日志</h2><p>这里记录 JNX 网站之前做过的重要更新。</p><div id="jnxChangelogList"></div>';
    box.appendChild(close);modal.appendChild(box);document.body.appendChild(button);document.body.appendChild(modal);
    const list=box.querySelector('#jnxChangelogList');
    list.innerHTML=entries.map(e=>`<article class="jnxLogEntry"><h3>${e.title}</h3><p>${e.text}</p><small>${e.date}</small></article>`).join('');
    const closeModal=()=>modal.classList.remove('open');button.onclick=()=>modal.classList.add('open');close.onclick=closeModal;modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
