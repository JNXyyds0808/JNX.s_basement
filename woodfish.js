(function(){
  const SUPABASE_URL='https://qdehfgjifhtczkrpuadl.supabase.co';
  const SUPABASE_KEY='sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp';
  function init(){
    if(!window.supabase?.createClient)return;
    const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
    if(document.getElementById('jnxWoodfish'))return;
    const style=document.createElement('style');
    style.textContent=`#jnxWoodfish{max-width:520px;margin:24px auto;padding:22px;border-radius:22px;background:var(--card-bg,#fff);box-shadow:0 8px 30px rgba(0,0,0,.08);text-align:center}#jnxWoodfish h2{margin:0 0 16px}.wf-stats{display:flex;gap:10px;margin:14px 0}.wf-stat{flex:1;padding:10px;border-radius:14px;background:rgba(128,128,128,.1)}.wf-num{display:block;font-size:24px;font-weight:700}.wf-label{font-size:12px;opacity:.65}.wf-tap{width:150px;height:150px;border-radius:50%;border:0;background:#d8a15d;box-shadow:0 8px 0 #a87338,0 14px 25px rgba(0,0,0,.16);font-size:52px;cursor:pointer;touch-action:manipulation;user-select:none}.wf-tap:active{transform:translateY(6px);box-shadow:0 2px 0 #a87338,0 7px 15px rgba(0,0,0,.12)}.wf-rank{margin-top:20px;text-align:left}.wf-row{display:flex;justify-content:space-between;padding:9px 10px;border-radius:10px}.wf-row:nth-child(1){background:rgba(255,215,0,.18)}.wf-row:nth-child(2){background:rgba(180,180,180,.15)}.wf-row:nth-child(3){background:rgba(180,120,60,.12)}@media(max-width:600px){#jnxWoodfish{margin:16px 10px;padding:16px}.wf-stats{gap:6px}.wf-stat{padding:8px 4px}.wf-num{font-size:20px}.wf-label{font-size:11px}.wf-tap{width:130px;height:130px;font-size:46px}}`;
    document.head.appendChild(style);
    const box=document.createElement('section');box.id='jnxWoodfish';
    box.innerHTML='<h2>🪵 功德木鱼</h2><div class="wf-stats"><div class="wf-stat"><span id="wfToday" class="wf-num">0</span><span class="wf-label">今日总量</span></div><div class="wf-stat"><span id="wfMine" class="wf-num">0</span><span class="wf-label">我今天</span></div><div class="wf-stat"><span id="wfForever" class="wf-num">0</span><span class="wf-label">我的永久总量</span></div></div><button class="wf-tap" id="wfTap" aria-label="敲木鱼">🪵</button><div class="wf-rank"><h3>🏆 今日排行榜</h3><div id="wfRank">加载中…</div></div>';
    const target=document.querySelector('#home .page-content, #home main, #home')||document.body;target.appendChild(box);
    const today=()=>new Date().toISOString().slice(0,10);
    async function load(){
      const {data:{user}}=await db.auth.getUser();
      if(!user){box.style.display='none';return}
      box.style.display='block';
      const d=today();
      const mine=await db.from('woodfish_daily').select('count').eq('user_id',user.id).eq('day',d).maybeSingle();
      const total=await db.from('woodfish_totals').select('count').eq('user_id',user.id).maybeSingle();
      const sum=await db.from('woodfish_daily').select('count').eq('day',d);
      document.getElementById('wfMine').textContent=mine.data?.count||0;document.getElementById('wfForever').textContent=total.data?.count||0;
      document.getElementById('wfToday').textContent=(sum.data||[]).reduce((a,r)=>a+Number(r.count||0),0);
      const rank=await db.from('woodfish_daily').select('user_id,count').eq('day',d).order('count',{ascending:false}).limit(10);
      const ids=(rank.data||[]).map(x=>x.user_id);let names={};if(ids.length){const p=await db.from('profiles').select('id,username,display_name').in('id',ids);(p.data||[]).forEach(x=>names[x.id]=x.display_name||x.username)}
      document.getElementById('wfRank').innerHTML=(rank.data||[]).map((r,i)=>`<div class="wf-row"><span>${i+1}. ${names[r.user_id]||'用户'}</span><b>${r.count}</b></div>`).join('')||'<div style="opacity:.6">今天还没有人敲木鱼</div>';
    }
    document.getElementById('wfTap').addEventListener('click',async()=>{const {data:{user}}=await db.auth.getUser();if(!user)return;const button=document.getElementById('wfTap');button.disabled=true;try{await db.rpc('tap_woodfish');await load()}finally{button.disabled=false}});
    db.auth.onAuthStateChange(()=>load());load();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
