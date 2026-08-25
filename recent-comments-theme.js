(()=>{
  const URL='https://qdehfgjifhtczkrpuadl.supabase.co';
  const KEY='sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp';
  let db=null, user=null;

  function loadDb(){
    if(window.supabase){db=window.supabase.createClient(URL,KEY);return Promise.resolve();}
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      s.onload=()=>{db=window.supabase.createClient(URL,KEY);resolve()};
      s.onerror=reject;
      document.head.appendChild(s);
    });
  }

  function injectStyle(){
    if(document.getElementById('jnxEnhancementStyle'))return;
    const s=document.createElement('style');s.id='jnxEnhancementStyle';
    s.textContent=`
      #jnxComments{margin-top:28px;padding-top:22px;border-top:1px solid rgba(255,255,255,.12)}
      #jnxComments h3{margin:0 0 14px;font-size:18px;color:inherit}
      #jnxCommentList{display:flex;flex-direction:column;gap:10px;max-height:310px;overflow:auto;padding-right:4px;overscroll-behavior:contain}
      .jnxComment{padding:11px 13px;border:1px solid rgba(160,125,255,.22);border-radius:13px;background:rgba(255,255,255,.035)}
      .jnxCommentMeta{font-size:11px;color:#999;margin-bottom:5px}.jnxCommentText{font-size:14px;line-height:1.45;white-space:pre-wrap;word-break:break-word}
      #jnxCommentForm{display:flex;gap:8px;margin-top:12px}#jnxCommentInput{flex:1;min-width:0;resize:none;min-height:42px;max-height:100px;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:inherit;box-sizing:border-box;font:inherit}#jnxCommentSend{border:0;border-radius:12px;padding:0 16px;background:#8f6cff;color:white;font:inherit;font-weight:700}#jnxCommentHint{font-size:12px;color:#999;margin-top:8px}
      html.jnxLight,html.jnxLight body,html.jnxLight #home{background:#f5f3fb!important;color:#242130!important}html.jnxLight .jnxCard{background:#fff!important;color:#242130!important}html.jnxLight .jnxDesc{color:#6e687d!important}html.jnxLight .jnxMenu,html.jnxLight .jnxWindow{background:#fff!important;color:#242130!important;border-color:rgba(100,75,180,.2)!important}html.jnxLight .jnxMenuBtn{background:#fff!important;color:#242130!important;border-color:rgba(100,75,180,.2)!important}html.jnxLight .jnxComment{background:#f8f6ff;border-color:rgba(100,75,180,.18)}html.jnxLight #jnxCommentInput{background:#fff;color:#242130;border-color:rgba(100,75,180,.2)}html.jnxLight .jnxItem{color:#242130!important}
      @media(max-width:600px){#jnxCommentForm{align-items:stretch}#jnxCommentSend{padding:0 13px}#jnxCommentList{max-height:260px}}
    `;document.head.appendChild(s);
  }

  function applyTheme(theme){
    document.documentElement.classList.toggle('jnxLight',theme==='light');
    localStorage.setItem('jnx-theme',theme);
    const d=document.getElementById('darkModeButton'),l=document.getElementById('lightModeButton');
    if(d)d.classList.toggle('active',theme==='dark');
    if(l)l.classList.toggle('active',theme==='light');
  }

  function setupTheme(){
    applyTheme(localStorage.getItem('jnx-theme')||'dark');
    document.getElementById('darkModeButton')?.addEventListener('click',()=>applyTheme('dark'));
    document.getElementById('lightModeButton')?.addEventListener('click',()=>applyTheme('light'));
  }

  async function getUser(){
    if(!db)return null;
    const r=await db.auth.getUser();user=r.data?.user||null;return user;
  }

  function commentsBox(){
    const win=document.querySelector('.jnxWindow');
    if(!win||document.getElementById('jnxComments'))return;
    const box=document.createElement('div');box.id='jnxComments';
    box.innerHTML='<h3>评论区</h3><div id="jnxCommentList"><div class="jnxCommentHint">加载中…</div></div><div id="jnxCommentForm"><textarea id="jnxCommentInput" maxlength="500" placeholder="写下你的评论…"></textarea><button id="jnxCommentSend">发送</button></div><div id="jnxCommentHint"></div>';
    win.querySelector('.jnxContent')?.appendChild(box);
    document.getElementById('jnxCommentSend').onclick=postComment;
  }

  async function loadComments(){
    if(!db)return;
    const list=document.getElementById('jnxCommentList');if(!list)return;
    const activity=await db.from('site_updates').select('id').order('created_at',{ascending:false}).limit(1).maybeSingle();
    const activityId=activity.data?.id;if(!activityId){list.innerHTML='<div class="jnxCommentHint">暂无动态。</div>';return;}
    const r=await db.from('recent_activity_comments').select('username,content,created_at').eq('activity_id',activityId).order('created_at',{ascending:true});
    if(r.error){list.innerHTML='<div class="jnxCommentHint">评论暂时无法加载。</div>';return;}
    list.innerHTML=r.data?.length?r.data.map(x=>`<div class="jnxComment"><div class="jnxCommentMeta">${escapeHtml(x.username)} · ${new Date(x.created_at).toLocaleString()}</div><div class="jnxCommentText">${escapeHtml(x.content)}</div></div>`).join(''):'<div class="jnxCommentHint">还没有评论，来留下第一条吧。</div>';
    list.scrollTop=list.scrollHeight;
  }

  function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

  async function postComment(){
    const input=document.getElementById('jnxCommentInput'),hint=document.getElementById('jnxCommentHint');
    if(!input||!db)return;
    user=await getUser();
    if(!user){hint.textContent='请先登录后发表评论。';return;}
    const content=input.value.trim();if(!content){hint.textContent='评论不能为空。';return;}
    const a=await db.from('site_updates').select('id').order('created_at',{ascending:false}).limit(1).maybeSingle();
    const activityId=a.data?.id;if(!activityId){hint.textContent='目前没有可评论的动态。';return;}
    const p=await db.from('profiles').select('username').eq('id',user.id).maybeSingle();
    const username=p.data?.username||user.user_metadata?.username||'JNX User';
    const r=await db.from('recent_activity_comments').insert({activity_id:activityId,user_id:user.id,username,content});
    if(r.error){console.error(r.error);hint.textContent='发送失败，请稍后再试。';return;}
    input.value='';hint.textContent='';await loadComments();
  }

  async function init(){
    injectStyle();setupTheme();
    try{await loadDb();await getUser();commentsBox();await loadComments();
      const overlay=document.querySelector('.jnxOverlay');
      if(overlay)new MutationObserver(()=>{if(overlay.classList.contains('open')){commentsBox();loadComments()}}).observe(overlay,{attributes:true,attributeFilter:['class']});
      db.auth.onAuthStateChange((_e,u)=>{user=u;loadComments()});
    }catch(e){console.error('JNX enhancements',e)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
