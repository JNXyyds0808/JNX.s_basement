(function(){
  const SUPABASE_URL='https://qdehfgjifhtczkrpuadl.supabase.co';
  const SUPABASE_KEY='sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp';
  const PAT_IMAGE='fe31af823d2d7b25d31003b300a0afbecd5f084914cd19-Qgon8B_fw658.png';
  let started=false;
  function init(){
    if(started)return;
    if(!window.supabase?.createClient){setTimeout(init,300);return;}
    started=true;
    const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
    if(document.getElementById('jnxWoodfish'))return;
    const style=document.createElement('style');
    style.textContent=`@media(max-width:600px){html,body{overflow-y:auto!important;overflow-x:hidden!important;height:auto!important;min-height:100%!important}.page{overflow:visible!important;min-height:100vh!important;height:auto!important}#home{overflow:visible!important}}#jnxGameLauncher{margin:18px auto 0;display:block;width:min(520px,calc(100% - 28px));padding:15px 18px;border:1px solid rgba(133,133,255,.35);border-radius:16px;background:rgba(133,133,255,.14);color:#fff;font:inherit;cursor:pointer;box-shadow:0 7px 24px rgba(0,0,0,.16);text-align:left}#jnxGameLauncher:hover{background:rgba(133,133,255,.22);border-color:rgba(150,150,255,.55)}#jnxGameLauncher span{font-weight:700;color:#fff}#jnxGameLauncher small{color:#c7c7e8}#jnxGameOverlay{display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.58);align-items:center;justify-content:center;padding:18px;box-sizing:border-box}#jnxGameOverlay.active{display:flex}#jnxWoodfish{position:relative;width:min(520px,100%);max-height:min(90vh,760px);overflow:auto;padding:22px;border:1px solid rgba(133,133,255,.35);border-radius:22px;background:#171526;color:#fff;box-shadow:0 18px 60px rgba(0,0,0,.5);text-align:center;box-sizing:border-box}#jnxWoodfish h2{margin:0 0 16px;color:#fff}.wf-close{position:absolute;right:12px;top:10px;width:34px;height:34px;border:1px solid rgba(255,255,255,.14);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:20px;cursor:pointer}.wf-headpat-toggle{position:absolute;right:52px;top:10px;padding:7px 10px;border:1px solid rgba(255,255,255,.14);border-radius:10px;background:rgba(255,255,255,.08);color:#fff;font-size:12px;cursor:pointer}.wf-headpat-toggle.active{background:rgba(133,133,255,.28);border-color:rgba(150,150,255,.55)}.wf-stats{display:flex;gap:10px;margin:14px 0}.wf-stat{flex:1;padding:11px 8px;border:1px solid rgba(133,133,255,.22);border-radius:14px;background:rgba(133,133,255,.10)}.wf-num{display:block;font-size:24px;font-weight:800;color:#fff}.wf-label{font-size:12px;color:#c9c9df}.wf-tap{width:150px;height:150px;border-radius:50%;border:2px solid rgba(255,255,255,.25);background:#c58a4d;color:#fff;box-shadow:0 8px 0 #80532b,0 14px 25px rgba(0,0,0,.28);font-size:52px;cursor:pointer;touch-action:manipulation;user-select:none;overflow:hidden;padding:0}.wf-tap:active{transform:translateY(6px);box-shadow:0 2px 0 #80532b,0 7px 15px rgba(0,0,0,.2)}.wf-tap img{width:100%;height:100%;display:none;object-fit:cover;border-radius:50%}.wf-tap.headpat img{display:block}.wf-tap.headpat .wf-default-icon{display:none}.wf-default-icon{display:inline}.wf-rank{margin-top:20px;text-align:left}.wf-rank h3{color:#fff}.wf-row{display:flex;justify-content:space-between;padding:10px;border:1px solid rgba(255,255,255,.06);border-radius:10px;margin-top:5px;background:rgba(255,255,255,.045);color:#fff}.wf-row:nth-child(1){background:rgba(255,215,0,.16)}.wf-row:nth-child(2){background:rgba(180,180,180,.12)}.wf-row:nth-child(3){background:rgba(180,120,60,.14)}@media(max-width:600px){#jnxGameOverlay{padding:10px}#jnxWoodfish{padding:16px;max-height:92vh}.wf-stats{gap:6px}.wf-stat{padding:9px 4px}.wf-num{font-size:20px}.wf-label{font-size:11px}.wf-tap{width:130px;height:130px;font-size:46px}.wf-headpat-toggle{right:48px;top:10px;padding:6px 8px;font-size:11px}}`;
    document.head.appendChild(style);
    const launcher=document.createElement('button');launcher.id='jnxGameLauncher';launcher.innerHTML='🎮 <span>小游戏</span><br><small>点击进入功德木鱼</small>';
    const overlay=document.createElement('div');overlay.id='jnxGameOverlay';
    overlay.innerHTML='<section id="jnxWoodfish"><button class="wf-close" id="wfClose" aria-label="关闭">×</button><button class="wf-headpat-toggle" id="wfHeadpat" type="button">摸头模式：关闭</button><h2>🪵 功德木鱼</h2><div class="wf-stats"><div class="wf-stat"><span id="wfToday" class="wf-num">0</span><span class="wf-label">今日总量</span></div><div class="wf-stat"><span id="wfMine" class="wf-num">0</span><span class="wf-label">我今天</span></div><div class="wf-stat"><span id="wfForever" class="wf-num">0</span><span class="wf-label">我的永久总量</span></div></div><button class="wf-tap" id="wfTap" aria-label="敲木鱼"><span class="wf-default-icon">🪵</span><img id="wfHeadpatImage" src="${PAT_IMAGE}" alt="摸头模式"></button><div class="wf-rank"><h3>🏆 今日排行榜</h3><div id="wfRank">加载中…</div></div></section>';
    const main=document.querySelector('#home main');
    if(main) main.appendChild(launcher); else document.body.appendChild(launcher);
    document.body.appendChild(overlay);
    function newYorkDate(){
      const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
      const get=t=>parts.find(p=>p.type===t)?.value;
      return `${get('year')}-${get('month')}-${get('day')}`;
    }
    async function load(){
      const {data:{user}}=await db.auth.getUser();
      if(!user){launcher.style.display='none';overlay.classList.remove('active');return}
      launcher.style.display='block';
      const d=newYorkDate();
      const mine=await db.from('woodfish_daily').select('count').eq('user_id',user.id).eq('day',d).maybeSingle();
      const total=await db.from('woodfish_totals').select('count').eq('user_id',user.id).maybeSingle();
      const sum=await db.from('woodfish_daily').select('count').eq('day',d);
      document.getElementById('wfMine').textContent=mine.data?.count||0;document.getElementById('wfForever').textContent=total.data?.count||0;
      document.getElementById('wfToday').textContent=(sum.data||[]).reduce((a,r)=>a+Number(r.count||0),0);
      const rank=await db.from('woodfish_daily').select('user_id,count').eq('day',d).order('count',{ascending:false}).limit(10);
      const ids=(rank.data||[]).map(x=>x.user_id);let names={};if(ids.length){const p=await db.from('profiles').select('id,username,display_name').in('id',ids);(p.data||[]).forEach(x=>names[x.id]=x.display_name||x.username)}
      document.getElementById('wfRank').innerHTML=(rank.data||[]).map((r,i)=>`<div class="wf-row"><span>${i+1}. ${names[r.user_id]||'用户'}</span><b>${r.count}</b></div>`).join('')||'<div style="opacity:.7;color:#c9c9df">今天还没有人敲木鱼</div>';
    }
    launcher.addEventListener('click',async()=>{overlay.classList.add('active');await load()});
    document.getElementById('wfClose').addEventListener('click',()=>overlay.classList.remove('active'));
    overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.classList.remove('active')});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')overlay.classList.remove('active')});
    const headpatButton=document.getElementById('wfHeadpat');
    const tapButton=document.getElementById('wfTap');
    const headpatImage=document.getElementById('wfHeadpatImage');
    let headpatMode=localStorage.getItem('jnxWoodfishHeadpatMode')==='1';
    function renderHeadpat(){
      tapButton.classList.toggle('headpat',headpatMode);
      headpatButton.classList.toggle('active',headpatMode);
      headpatButton.textContent=`摸头模式：${headpatMode?'开启':'关闭'}`;
      headpatImage.style.display=headpatMode?'block':'none';
    }
    headpatButton.addEventListener('click',()=>{headpatMode=!headpatMode;localStorage.setItem('jnxWoodfishHeadpatMode',headpatMode?'1':'0');renderHeadpat()});
    renderHeadpat();
    tapButton.addEventListener('click',async()=>{const {data:{user}}=await db.auth.getUser();if(!user)return;tapButton.disabled=true;try{await db.rpc('tap_woodfish');await load()}finally{tapButton.disabled=false}});
    db.auth.onAuthStateChange(()=>load());load();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
