(()=>{
  const SUPABASE_URL='https://qdehfgjifhtczkrpuadl.supabase.co';
  const SUPABASE_KEY='sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp';
  let db=null,user=null,channel=null,state={unread:0,notifications:[]};

  function waitForSupabase(timeout=12000){
    return new Promise((resolve,reject)=>{
      if(window.supabase?.createClient)return resolve();
      const start=Date.now();
      const timer=setInterval(()=>{
        if(window.supabase?.createClient){clearInterval(timer);resolve();}
        else if(Date.now()-start>timeout){clearInterval(timer);reject(new Error('Supabase not ready'));}
      },100);
    });
  }

  function addStyles(){
    if(document.getElementById('jnxAdminNotifyStyles'))return;
    const s=document.createElement('style');s.id='jnxAdminNotifyStyles';s.textContent=`
      #jnxAdminNotifyButton{position:fixed;right:74px;bottom:18px;z-index:260;width:46px;height:46px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(20,18,32,.9);color:#fff;font-size:20px;cursor:pointer;display:none}
      #jnxAdminNotifyBadge{position:absolute;right:-5px;top:-5px;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:#ff3b30;color:#fff;font:700 10px/18px Arial;text-align:center;box-sizing:border-box;display:none}
      #jnxAdminNotifyModal{position:fixed;inset:0;z-index:44000;display:none;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;background:rgba(0,0,0,.66);backdrop-filter:blur(7px)}
      #jnxAdminNotifyModal.open{display:flex}
      #jnxAdminNotifyBox{position:relative;width:min(620px,94vw);max-height:min(84dvh,760px);overflow-y:auto;padding:26px;border:1px solid rgba(255,255,255,.12);border-radius:22px;background:#171526;color:#fff;box-sizing:border-box}
      #jnxAdminNotifyClose{position:absolute;right:14px;top:12px;width:36px;height:36px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:22px;cursor:pointer}
      #jnxAdminNotifyBox h2{margin:0 42px 6px 0;font-size:24px}.jnxNotifySub{color:#999;font-size:12px;margin-bottom:18px}.jnxNotifyList{display:grid;gap:10px}.jnxNotifyItem{padding:14px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(255,255,255,.045)}.jnxNotifyItem.unread{border-color:rgba(139,114,217,.55)}.jnxNotifyTitle{font-weight:800;font-size:14px}.jnxNotifyMessage{margin-top:5px;font-size:13px;line-height:1.5}.jnxNotifyTime{margin-top:7px;color:#777;font-size:10px}.jnxNotifyEmpty{padding:28px;text-align:center;color:#777}
      #jnxAdminNotifyToasts{position:fixed;right:16px;top:16px;z-index:47000;width:min(350px,calc(100vw - 24px));display:grid;gap:10px;pointer-events:none}.jnxAdminNotifyToast{pointer-events:auto;padding:14px;border:1px solid rgba(255,255,255,.14);border-radius:15px;background:rgba(24,21,39,.97);color:#fff;box-shadow:0 12px 38px rgba(0,0,0,.3);animation:jnxAdminNotifyIn .2s ease-out}.jnxAdminNotifyToast b{display:block;font-size:14px}.jnxAdminNotifyToast span{display:block;margin-top:5px;color:#aaa;font-size:12px}.jnxAdminNotifyToast button{margin-top:10px;border:0;border-radius:9px;padding:7px 10px;background:#fff;color:#171526;font-weight:700;cursor:pointer}
      @keyframes jnxAdminNotifyIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
      html.jnxLight #jnxAdminNotifyButton{background:#fff;color:#31274f;border-color:rgba(100,75,180,.22)}html.jnxLight #jnxAdminNotifyBox,html.jnxLight .jnxAdminNotifyToast{background:#fff;color:#242130;border-color:rgba(100,75,180,.2)}html.jnxLight .jnxNotifyItem{background:#f8f6ff;border-color:rgba(100,75,180,.18)}html.jnxLight #jnxAdminNotifyClose{background:#eee9fa;color:#31274f;border-color:rgba(100,75,180,.28)}html.jnxLight .jnxAdminNotifyToast span{color:#716a80}
      @media(max-width:600px){#jnxAdminNotifyButton{right:64px;bottom:12px;width:44px;height:44px}#jnxAdminNotifyModal{padding:8px}#jnxAdminNotifyBox{width:100%;max-height:90dvh;padding:22px 16px;border-radius:19px}#jnxAdminNotifyToasts{top:10px;right:10px;left:10px;width:auto}}
    `;document.head.appendChild(s);
  }

  function buildUI(){
    addStyles();
    if(!document.getElementById('jnxAdminNotifyButton')){
      const b=document.createElement('button');b.id='jnxAdminNotifyButton';b.type='button';b.innerHTML='🔔<span id="jnxAdminNotifyBadge">0</span>';b.title='管理员通知';document.body.appendChild(b);
      const modal=document.createElement('div');modal.id='jnxAdminNotifyModal';modal.innerHTML='<section id="jnxAdminNotifyBox"><button id="jnxAdminNotifyClose">×</button><h2>🔔 管理员通知</h2><div class="jnxNotifySub">积分商店购买记录</div><div class="jnxNotifyList" id="jnxAdminNotifyList"></div></section>';document.body.appendChild(modal);
      const toasts=document.createElement('div');toasts.id='jnxAdminNotifyToasts';document.body.appendChild(toasts);
      const close=()=>modal.classList.remove('open');document.getElementById('jnxAdminNotifyClose').onclick=close;modal.addEventListener('click',e=>{if(e.target===modal)close()});b.onclick=async()=>{modal.classList.add('open');await markRead();};
    }
  }

  function render(){
    const button=document.getElementById('jnxAdminNotifyButton');if(!button)return;
    const isAdmin=!!user&&state!==null;button.style.display=isAdmin?'block':'none';
    const badge=document.getElementById('jnxAdminNotifyBadge');const unread=Number(state?.unread||0);badge.textContent=unread>99?'99+':String(unread);badge.style.display=unread>0?'block':'none';
    const list=document.getElementById('jnxAdminNotifyList');if(!list)return;
    const rows=state?.notifications||[];list.innerHTML=rows.length?rows.map(n=>`<article class="jnxNotifyItem ${n.is_read?'':'unread'}"><div class="jnxNotifyTitle">${esc(n.title)}</div><div class="jnxNotifyMessage">${esc(n.message)}</div><div class="jnxNotifyTime">${new Date(n.created_at).toLocaleString('zh-CN')}</div></article>`).join(''):'<div class="jnxNotifyEmpty">暂无通知</div>';
  }

  function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

  async function refresh(){
    if(!db||!user)return false;
    const r=await db.rpc('get_admin_notifications',{p_limit:40});
    if(r.error){state=null;render();return false;}
    state=r.data;render();return true;
  }

  async function markRead(){
    if(!db||!user||state===null)return;
    await db.rpc('mark_admin_notifications_read');
    await refresh();
  }

  function toast(row){
    const root=document.getElementById('jnxAdminNotifyToasts');if(!root)return;
    const card=document.createElement('div');card.className='jnxAdminNotifyToast';card.innerHTML=`<b>🛍️ 有人兑换了商品</b><span>${esc(row.message||'新的积分商店购买')}</span><button type="button">查看通知</button>`;card.querySelector('button').onclick=()=>{document.getElementById('jnxAdminNotifyModal')?.classList.add('open');markRead();card.remove();};root.appendChild(card);setTimeout(()=>card.remove(),12000);
  }

  async function subscribe(){
    if(channel){db.removeChannel(channel);channel=null;}
    if(!user||state===null)return;
    channel=db.channel('jnx-admin-purchase-notifications').on('postgres_changes',{event:'INSERT',schema:'public',table:'admin_notifications'},async payload=>{toast(payload.new||{});await refresh();}).subscribe();
  }

  async function start(){
    try{await waitForSupabase();}catch(e){console.error(e);return;}
    db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);buildUI();
    const a=await db.auth.getUser();user=a.data?.user||null;if(user){await refresh();await subscribe();}
    db.auth.onAuthStateChange(async(_event,session)=>{user=session?.user||null;state={unread:0,notifications:[]};if(channel){db.removeChannel(channel);channel=null;}if(user){await refresh();await subscribe();}else{state=null;render();}});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
