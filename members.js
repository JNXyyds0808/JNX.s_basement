(()=>{
  const SUPABASE_URL='https://qdehfgjifhtczkrpuadl.supabase.co';
  const SUPABASE_KEY='sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp';
  let db=null,currentUser=null,currentMember=null;

  function waitForSupabase(){
    return new Promise(resolve=>{
      if(window.supabase?.createClient)return resolve();
      const timer=setInterval(()=>{if(window.supabase?.createClient){clearInterval(timer);resolve()}},100);
      setTimeout(()=>{clearInterval(timer);resolve()},10000);
    });
  }

  function addStyles(){
    if(document.getElementById('jnxMembersStyles'))return;
    const s=document.createElement('style');s.id='jnxMembersStyles';s.textContent=`
      #jnxMembersModal,#jnxMemberProfileModal{position:fixed;inset:0;z-index:36000;display:none;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;background:rgba(0,0,0,.66);backdrop-filter:blur(7px)}
      #jnxMembersModal.open,#jnxMemberProfileModal.open{display:flex}
      .jnx-members-box,.jnx-member-profile-box{position:relative;width:min(660px,94vw);max-height:min(84dvh,760px);overflow:auto;padding:26px;border:1px solid rgba(255,255,255,.12);border-radius:22px;background:#171526;color:#fff;box-sizing:border-box}
      .jnx-members-close,.jnx-member-profile-close{position:absolute;right:14px;top:12px;width:36px;height:36px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:22px;cursor:pointer}
      .jnx-members-box h2{margin:0 44px 6px 0}.jnx-members-sub{margin:0 0 18px;color:#8c8796;font-size:13px}
      #jnxMembersList{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
      .jnx-member-card{display:flex;align-items:center;gap:11px;padding:12px;border:1px solid rgba(255,255,255,.09);border-radius:14px;background:rgba(255,255,255,.045);color:#fff;text-align:left;cursor:pointer}
      .jnx-member-card:hover{background:rgba(255,255,255,.075)}
      .jnx-member-avatar{width:42px;height:42px;flex:0 0 42px;border-radius:50%;display:flex;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(135deg,#836bd0,#c5b5ff);background-size:cover;background-position:center;font-weight:800}
      .jnx-member-name{font-weight:750;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.jnx-member-user{font-size:11px;color:#777184;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .jnx-member-profile-box{text-align:center;width:min(400px,92vw)}
      #jnxMemberProfileAvatar{width:92px;height:92px;margin:4px auto 14px;border-radius:50%;display:flex;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(135deg,#836bd0,#c5b5ff);background-size:cover;background-position:center;font-size:32px;font-weight:800}
      #jnxMemberProfileName{font-size:24px;font-weight:800}#jnxMemberProfileUsername{font-size:13px;color:#817b8d;margin-top:5px}
      #jnxMemberPresence{font-size:12px;margin-top:10px;color:#8e8798}
      #jnxMemberProfileBio{margin:15px auto 0;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.05);font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-word;color:#c5c0ce}
      #jnxMemberChat{width:100%;margin-top:16px;padding:11px;border:0;border-radius:12px;background:#7d63c8;color:#fff;font-weight:800;cursor:pointer}
      html.jnxLight .jnx-members-box,html.jnxLight .jnx-member-profile-box{background:#fff;color:#242130;border-color:rgba(100,75,180,.2)}
      html.jnxLight .jnx-member-card{background:#f8f6ff;color:#242130;border-color:rgba(100,75,180,.16)}
      html.jnxLight #jnxMemberProfileBio{background:#f7f4ff;color:#5f596b}
      html.jnxLight .jnx-members-close,html.jnxLight .jnx-member-profile-close{background:#eee9fa;color:#31274f;border-color:rgba(100,75,180,.28)}
      @media(max-width:600px){#jnxMembersList{grid-template-columns:1fr}.jnx-members-box,.jnx-member-profile-box{width:100%;max-height:90dvh;padding:22px 16px;border-radius:19px}}
    `;document.head.appendChild(s);
  }

  function ensureUI(){
    if(document.getElementById('jnxMembersModal'))return;
    const members=document.createElement('div');members.id='jnxMembersModal';members.innerHTML=`<section class="jnx-members-box"><button class="jnx-members-close">×</button><h2>成员</h2><p class="jnx-members-sub">JNX Community 成员</p><div id="jnxMembersList">加载中…</div></section>`;
    const profile=document.createElement('div');profile.id='jnxMemberProfileModal';profile.innerHTML=`<section class="jnx-member-profile-box"><button class="jnx-member-profile-close">×</button><div id="jnxMemberProfileAvatar">J</div><div id="jnxMemberProfileName">JNX User</div><div id="jnxMemberProfileUsername"></div><div id="jnxMemberPresence"></div><div id="jnxMemberProfileBio">还没有个性签名</div><button id="jnxMemberChat">Chat</button></section>`;
    document.body.append(members,profile);
    members.querySelector('.jnx-members-close').onclick=()=>members.classList.remove('open');
    profile.querySelector('.jnx-member-profile-close').onclick=()=>profile.classList.remove('open');
    members.onclick=e=>{if(e.target===members)members.classList.remove('open')};
    profile.onclick=e=>{if(e.target===profile)profile.classList.remove('open')};
    document.getElementById('jnxMemberChat').onclick=()=>{if(currentMember)openPrivateFromExistingChat(currentMember)};
  }

  function avatarInitial(p){return (p.display_name||p.username||'J').trim().charAt(0).toUpperCase()||'J'}
  function presenceText(p){
    if(!p.last_seen_at)return '⚪ 暂无在线记录';
    const ms=Date.now()-new Date(p.last_seen_at).getTime();
    if(ms<3*60*1000)return '🟢 在线';
    const mins=Math.max(1,Math.floor(ms/60000));
    if(mins<60)return `⚪ 离线 · ${mins} 分钟前在线`;
    const hrs=Math.floor(mins/60);if(hrs<24)return `⚪ 离线 · ${hrs} 小时前在线`;
    return `⚪ 离线 · ${Math.floor(hrs/24)} 天前在线`;
  }

  async function loadMembers(){
    const list=document.getElementById('jnxMembersList');if(!list)return;
    list.textContent='加载中…';
    const r=await db.from('profiles').select('id,username,display_name,bio,avatar_url,last_seen_at').order('username',{ascending:true});
    if(r.error){console.error(r.error);list.textContent='成员列表暂时无法加载。';return;}
    const rows=r.data||[];list.innerHTML='';
    rows.forEach(p=>{
      const b=document.createElement('button');b.className='jnx-member-card';b.type='button';
      const a=document.createElement('span');a.className='jnx-member-avatar';
      if(p.avatar_url){a.style.backgroundImage=`url("${p.avatar_url}")`;a.textContent=''}else a.textContent=avatarInitial(p);
      const info=document.createElement('span');info.style.minWidth='0';
      const n=document.createElement('div');n.className='jnx-member-name';n.textContent=p.display_name||p.username||'JNX User';
      const u=document.createElement('div');u.className='jnx-member-user';u.textContent='@'+(p.username||'user');
      info.append(n,u);b.append(a,info);b.onclick=()=>openMemberProfile(p);list.appendChild(b);
    });
  }

  async function loadMemberByUsername(username){
    if(!username)return;
    const r=await db.from('profiles').select('id,username,display_name,bio,avatar_url,last_seen_at').eq('username',username).maybeSingle();
    if(!r.error&&r.data)openMemberProfile(r.data);
  }

  function openMemberProfile(p){
    currentMember=p;ensureUI();
    const a=document.getElementById('jnxMemberProfileAvatar');
    if(p.avatar_url){a.style.backgroundImage=`url("${p.avatar_url}")`;a.textContent=''}else{a.style.backgroundImage='';a.textContent=avatarInitial(p)}
    document.getElementById('jnxMemberProfileName').textContent=p.display_name||p.username||'JNX User';
    document.getElementById('jnxMemberProfileUsername').textContent='@'+(p.username||'user');
    document.getElementById('jnxMemberPresence').textContent=presenceText(p);
    document.getElementById('jnxMemberProfileBio').textContent=(p.bio||'').trim()||'还没有个性签名';
    document.getElementById('jnxMemberChat').style.display=p.id===currentUser?.id?'none':'block';
    document.getElementById('jnxMembersModal').classList.remove('open');
    document.getElementById('jnxMemberProfileModal').classList.add('open');
  }

  async function openPrivateFromExistingChat(p){
    document.getElementById('jnxMemberProfileModal').classList.remove('open');
    const chatButton=document.getElementById('jnxChatButton');
    if(!chatButton)return;
    chatButton.click();
    let tries=0;
    const timer=setInterval(()=>{
      tries++;
      const buttons=[...document.querySelectorAll('.jnx-chat-user')];
      const target=buttons.find(b=>(b.querySelector('.jnx-chat-user-username')?.textContent||'').replace(/^@/,'')===p.username);
      if(target){
        clearInterval(timer);
        window.__jnxAllowDirectPrivateClick=true;
        target.click();
        setTimeout(()=>{window.__jnxAllowDirectPrivateClick=false;document.getElementById('jnxChatModal')?.classList.remove('active')},50);
      }else if(tries>30){clearInterval(timer);}
    },100);
  }

  function interceptChatMemberClicks(){
    window.addEventListener('click',event=>{
      if(window.__jnxAllowDirectPrivateClick)return;
      const b=event.target.closest?.('.jnx-chat-user');if(!b)return;
      event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
      const username=(b.querySelector('.jnx-chat-user-username')?.textContent||'').replace(/^@/,'').trim();
      document.getElementById('jnxChatModal')?.classList.remove('active');
      document.body.classList.remove('jnx-chat-locked');
      loadMemberByUsername(username);
    },true);
  }

  async function init(){
    await waitForSupabase();if(!window.supabase?.createClient)return;
    db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);addStyles();ensureUI();interceptChatMemberClicks();
    const auth=await db.auth.getUser();currentUser=auth.data?.user||null;
    db.auth.onAuthStateChange((_e,s)=>{currentUser=s?.user||null});
    window.__jnxOpenMembers=async()=>{document.getElementById('jnxMembersModal').classList.add('open');await loadMembers()};
    window.__jnxOpenMemberProfile=loadMemberByUsername;
    document.addEventListener('jnx-open-members',()=>window.__jnxOpenMembers());
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
