(()=>{
  const SUPABASE_URL='https://qdehfgjifhtczkrpuadl.supabase.co';
  const SUPABASE_KEY='sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp';
  const shown=new Set();
  let db=null,user=null,state=null,presenceTimer=null;

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

  function styles(){
    if(document.getElementById('jnxPointsStyles'))return;
    const s=document.createElement('style');s.id='jnxPointsStyles';s.textContent=`
      #jnxPointsModal{position:fixed;inset:0;z-index:42000;display:none;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;background:rgba(0,0,0,.66);backdrop-filter:blur(7px)}
      #jnxPointsModal.open{display:flex}
      #jnxPointsBox{position:relative;width:min(620px,94vw);max-height:min(84dvh,760px);overflow-y:auto;padding:26px;border:1px solid rgba(255,255,255,.12);border-radius:22px;background:#171526;color:#fff;box-sizing:border-box}
      #jnxPointsClose{position:absolute;right:14px;top:12px;width:36px;height:36px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:22px;cursor:pointer}
      .jnxPointsHead{padding-right:46px}.jnxPointsHead h2{margin:0;font-size:25px}.jnxPointsTotal{margin-top:8px;font-size:14px;color:#aaa}.jnxPointsTotal b{font-size:26px;color:#fff;margin-right:4px}
      .jnxPointsList{display:grid;gap:10px;margin-top:20px}.jnxPointsTask{padding:14px;border:1px solid rgba(255,255,255,.1);border-radius:15px;background:rgba(255,255,255,.045)}
      .jnxPointsTaskTop{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.jnxPointsTaskTitle{font-weight:700;font-size:14px}.jnxPointsReward{font-size:12px;color:#d5c7ff;white-space:nowrap}
      .jnxPointsProgress{margin-top:9px;height:7px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden}.jnxPointsProgress>span{display:block;height:100%;border-radius:inherit;background:#8b72d9}
      .jnxPointsBottom{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:9px;font-size:11px;color:#888}.jnxPointsClaim{border:0;border-radius:9px;padding:7px 11px;background:#fff;color:#171526;font-weight:700;cursor:pointer}.jnxPointsClaim:disabled{opacity:.45;cursor:default}
      #jnxPointsToasts{position:fixed;right:16px;top:16px;z-index:46000;width:min(340px,calc(100vw - 24px));display:grid;gap:10px;pointer-events:none}
      .jnxPointsToast{pointer-events:auto;padding:14px;border:1px solid rgba(255,255,255,.14);border-radius:15px;background:rgba(24,21,39,.97);color:#fff;box-shadow:0 12px 38px rgba(0,0,0,.3);animation:jnxPointIn .2s ease-out}.jnxPointsToastTitle{font-size:14px;font-weight:800}.jnxPointsToastText{margin-top:5px;font-size:12px;color:#aaa}.jnxPointsToastActions{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}.jnxPointsToastDismiss,.jnxPointsToastClaim{border:0;border-radius:9px;padding:7px 10px;cursor:pointer;font-weight:700}.jnxPointsToastDismiss{background:rgba(255,255,255,.08);color:#bbb}.jnxPointsToastClaim{background:#fff;color:#171526}
      @keyframes jnxPointIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
      html.jnxLight #jnxPointsBox{background:#fff;color:#242130;border-color:rgba(100,75,180,.2)}html.jnxLight .jnxPointsTask{background:#f8f6ff;border-color:rgba(100,75,180,.18)}html.jnxLight .jnxPointsTotal{color:#716a80}html.jnxLight .jnxPointsTotal b{color:#242130}html.jnxLight #jnxPointsClose{background:#eee9fa;color:#31274f;border-color:rgba(100,75,180,.28)}html.jnxLight .jnxPointsToast{background:#fff;color:#242130;border-color:rgba(100,75,180,.22)}html.jnxLight .jnxPointsToastText{color:#716a80}
      @media(max-width:600px){#jnxPointsModal{padding:8px}#jnxPointsBox{width:100%;max-height:90dvh;padding:22px 16px;border-radius:19px}#jnxPointsToasts{top:10px;right:10px;left:10px;width:auto}.jnxPointsToast{padding:12px}}
    `;document.head.appendChild(s);
  }

  function buildUI(){
    styles();
    if(!document.getElementById('jnxPointsToasts')){const t=document.createElement('div');t.id='jnxPointsToasts';document.body.appendChild(t);}
    if(!document.getElementById('jnxPointsModal')){
      const modal=document.createElement('div');modal.id='jnxPointsModal';modal.innerHTML=`<section id="jnxPointsBox"><button id="jnxPointsClose" aria-label="关闭">×</button><div class="jnxPointsHead"><h2>⭐ 积分中心</h2><div class="jnxPointsTotal">总积分 <b id="jnxPointsTotal">0</b></div></div><div class="jnxPointsList" id="jnxPointsList"></div></section>`;document.body.appendChild(modal);
      const close=()=>modal.classList.remove('open');document.getElementById('jnxPointsClose').onclick=close;modal.addEventListener('click',e=>{if(e.target===modal)close()});
    }
    addMenuEntry();
  }

  function addMenuEntry(attempt=0){
    const menu=document.querySelector('.jnxMenu');
    if(!menu){if(attempt<30)setTimeout(()=>addMenuEntry(attempt+1),200);return;}
    if(menu.querySelector('[data-a="points"]'))return;
    const b=document.createElement('button');b.className='jnxItem';b.dataset.a='points';b.textContent='⭐ 积分中心';b.addEventListener('click',e=>{e.stopPropagation();openCenter();menu.classList.remove('open')});menu.appendChild(b);
  }

  function progressText(t){return t.claimed?'已领取':t.complete?'已完成 · 待领取':`${t.progress}/${t.goal}`}

  function render(){
    if(!state)return;
    const total=document.getElementById('jnxPointsTotal');if(total)total.textContent=state.total_points??0;
    const list=document.getElementById('jnxPointsList');if(!list)return;
    list.innerHTML=(state.tasks||[]).map(t=>{const pct=Math.max(0,Math.min(100,(Number(t.progress||0)/Math.max(1,Number(t.goal||1)))*100));return `<article class="jnxPointsTask"><div class="jnxPointsTaskTop"><div class="jnxPointsTaskTitle">${t.title}</div><div class="jnxPointsReward">+${t.reward} 积分</div></div><div class="jnxPointsProgress"><span style="width:${pct}%"></span></div><div class="jnxPointsBottom"><span>${progressText(t)}</span><button class="jnxPointsClaim" data-task="${t.key}" ${(!t.complete||t.claimed)?'disabled':''}>${t.claimed?'已领取':'领取'}</button></div></article>`}).join('');
    list.querySelectorAll('.jnxPointsClaim:not(:disabled)').forEach(b=>b.addEventListener('click',()=>claim(b.dataset.task,b)));
  }

  async function refresh({toast=true}={}){
    if(!user||!db)return;
    const r=await db.rpc('get_points_center');if(r.error){console.error('Points center error',r.error);return;}
    state=r.data;render();
    if(toast)for(const task of state.tasks||[]){if(task.complete&&!task.claimed&&!shown.has(task.key)){shown.add(task.key);showToast(task);}}
  }

  async function claim(taskKey,button){
    if(button)button.disabled=true;
    const r=await db.rpc('claim_daily_points',{p_task_key:taskKey});
    if(r.error){console.error('Claim points error',r.error);if(button)button.disabled=false;return;}
    document.querySelectorAll(`.jnxPointsToast[data-task="${taskKey}"]`).forEach(x=>x.remove());
    await refresh({toast:false});
  }

  function showToast(task){
    const root=document.getElementById('jnxPointsToasts');if(!root)return;
    const card=document.createElement('div');card.className='jnxPointsToast';card.dataset.task=task.key;card.innerHTML=`<div class="jnxPointsToastTitle">🎉 每日任务完成</div><div class="jnxPointsToastText">${task.title} · 可领取 +${task.reward} 积分</div><div class="jnxPointsToastActions"><button class="jnxPointsToastDismiss">稍后</button><button class="jnxPointsToastClaim">领取 +${task.reward}</button></div>`;
    card.querySelector('.jnxPointsToastDismiss').onclick=()=>card.remove();card.querySelector('.jnxPointsToastClaim').onclick=()=>claim(task.key,card.querySelector('.jnxPointsToastClaim'));root.appendChild(card);
  }

  async function pingPresence(){
    if(!user||!db||document.visibilityState!=='visible')return;
    const r=await db.rpc('points_presence_ping');if(r.error){console.error('Presence points error',r.error);return;}await refresh();
  }

  function openCenter(){document.getElementById('jnxPointsModal')?.classList.add('open');refresh({toast:false});}
  window.__jnxOpenPointsCenter=openCenter;
  window.__jnxRefreshPoints=()=>refresh();

  function bindProgressEvents(){
    document.addEventListener('click',e=>{
      if(e.target.closest?.('#wfTap')||e.target.closest?.('#jnxChatSend')||e.target.closest?.('#jnxPrivateSend'))setTimeout(()=>refresh(),900);
    },true);
    document.addEventListener('keydown',e=>{
      if(e.key==='Enter'&&!e.shiftKey&&(e.target?.id==='jnxChatInput'||e.target?.id==='jnxPrivateInput'))setTimeout(()=>refresh(),900);
    },true);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')pingPresence()});
  }

  async function start(){
    try{await waitForSupabase();}catch(e){console.error(e);return;}
    db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);buildUI();bindProgressEvents();
    const a=await db.auth.getUser();user=a.data?.user||null;
    if(user){await pingPresence();await refresh();presenceTimer=setInterval(pingPresence,60000);}
    db.auth.onAuthStateChange(async(_event,session)=>{
      user=session?.user||null;shown.clear();
      if(presenceTimer){clearInterval(presenceTimer);presenceTimer=null;}
      if(user){await pingPresence();await refresh();presenceTimer=setInterval(pingPresence,60000);}else{state=null;render();}
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
