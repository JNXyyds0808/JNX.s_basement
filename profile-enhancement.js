(()=>{
  const SUPABASE_URL='https://qdehfgjifhtczkrpuadl.supabase.co';
  const SUPABASE_KEY='sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp';

  function init(){
    if(!window.supabase?.createClient)return;
    if(window.__jnxProfileEnhancementReady)return;
    window.__jnxProfileEnhancementReady=true;

    const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
    let user=null;
    let profile=null;
    let heartTimer=null;

    const modal=()=>document.getElementById('profileModal');
    const box=()=>modal()?.querySelector('.profile-box') || modal()?.querySelector('[class*="profile-box"]') || modal();

    function injectUI(){
      const root=box();
      if(!root || document.getElementById('jnxProfileEnhancement'))return;
      const wrap=document.createElement('div');
      wrap.id='jnxProfileEnhancement';
      wrap.innerHTML=`
        <div class="jnx-profile-avatar-wrap">
          <div id="jnxProfileAvatarLarge" class="jnx-profile-avatar-large"></div>
          <label class="jnx-profile-avatar-upload" for="jnxProfileAvatarInput">更换头像</label>
          <input id="jnxProfileAvatarInput" type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden>
        </div>
        <div class="jnx-profile-presence" id="jnxProfilePresence"></div>
        <label class="jnx-profile-bio-label" for="jnxProfileBioInput">个性签名 / 自我介绍</label>
        <textarea id="jnxProfileBioInput" maxlength="300" rows="3" placeholder="写一点关于自己的话……"></textarea>
        <button id="jnxProfileSave" type="button">保存资料</button>
        <div id="jnxProfileSaveHint" class="jnx-profile-save-hint"></div>
      `;
      const anchor=root.querySelector('#profileAvatar') || root.firstElementChild;
      if(anchor?.parentElement)anchor.parentElement.insertAdjacentElement('afterend',wrap);else root.appendChild(wrap);

      document.getElementById('jnxProfileAvatarInput')?.addEventListener('change',handleAvatarUpload);
      document.getElementById('jnxProfileSave')?.addEventListener('click',saveBio);
    }

    function applyStyles(){
      if(document.getElementById('jnxProfileEnhancementStyles'))return;
      const style=document.createElement('style');
      style.id='jnxProfileEnhancementStyles';
      style.textContent=`
        #jnxProfileEnhancement{margin-top:14px;padding-top:14px;border-top:1px solid rgba(128,105,190,.16)}
        .jnx-profile-avatar-wrap{text-align:center;margin-bottom:10px}
        .jnx-profile-avatar-large{width:76px;height:76px;margin:0 auto 7px;border-radius:50%;display:flex;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(135deg,#8b72d9,#c7b7ff);color:#fff;font:700 30px/1 Arial,sans-serif;background-size:cover;background-position:center}
        .jnx-profile-avatar-large.has-image{font-size:0}
        .jnx-profile-avatar-upload{display:inline-block;font-size:11px;cursor:pointer;opacity:.78}
        .jnx-profile-presence{font-size:12px;margin:7px 0 12px;text-align:center}
        .jnx-profile-bio-label{display:block;font-size:12px;margin-bottom:5px;opacity:.78}
        #jnxProfileBioInput{width:100%;box-sizing:border-box;resize:vertical;min-height:72px;padding:9px 10px;border-radius:10px;border:1px solid rgba(128,105,190,.2);background:rgba(255,255,255,.04);color:inherit;font:inherit;outline:none}
        #jnxProfileSave{margin-top:9px;width:100%;border:0;border-radius:10px;padding:9px 12px;cursor:pointer;background:#7d63c8;color:#fff;font-weight:700}
        .jnx-profile-save-hint{font-size:11px;text-align:center;min-height:16px;margin-top:6px;opacity:.72}
        html.jnxLight #jnxProfileEnhancement{border-color:rgba(100,75,180,.18)}
        html.jnxLight #jnxProfileBioInput{background:#fff;color:#242130;border-color:rgba(100,75,180,.22)}
        html.jnxLight .jnx-profile-avatar-upload,html.jnxLight .jnx-profile-bio-label,html.jnxLight .jnx-profile-save-hint{color:#5f596b}
      `;
      document.head.appendChild(style);
    }

    function avatarFallback(name){
      return (name||'J').trim().charAt(0).toUpperCase() || 'J';
    }

    function renderProfile(){
      if(!profile)return;
      const name=profile.display_name||profile.username||'JNX User';
      const avatar=document.getElementById('jnxProfileAvatarLarge');
      if(avatar){
        if(profile.avatar_url){avatar.style.backgroundImage=`url("${profile.avatar_url}")`;avatar.classList.add('has-image');avatar.textContent='';}
        else {avatar.style.backgroundImage='';avatar.classList.remove('has-image');avatar.textContent=avatarFallback(name);}
      }
      const bio=document.getElementById('jnxProfileBioInput');
      if(bio)bio.value=profile.bio||'';
      renderPresence();
    }

    function renderPresence(){
      const el=document.getElementById('jnxProfilePresence');
      if(!el||!profile)return;
      const seen=profile.last_seen_at?new Date(profile.last_seen_at):null;
      const online=seen && (Date.now()-seen.getTime()<3*60*1000);
      if(online){el.textContent='🟢 在线';return;}
      if(!seen){el.textContent='⚪ 暂无在线记录';return;}
      const mins=Math.max(1,Math.floor((Date.now()-seen.getTime())/60000));
      el.textContent=mins<60?`⚪ 离线 · 上次在线 ${mins} 分钟前`:`⚪ 离线 · 上次在线 ${Math.floor(mins/60)} 小时前`;
    }

    async function loadProfile(){
      const r=await db.auth.getUser();
      user=r.data?.user||null;
      if(!user)return;
      const p=await db.from('profiles').select('id,username,display_name,bio,avatar_url,last_seen_at').eq('id',user.id).maybeSingle();
      if(p.error){console.error('Profile enhancement load error',p.error);return;}
      profile=p.data||null;
      injectUI();
      renderProfile();
    }

    async function heartbeat(){
      if(!user)return;
      const now=new Date().toISOString();
      const r=await db.from('profiles').update({last_seen_at:now}).eq('id',user.id);
      if(r.error)console.error('last_seen update error',r.error);
      if(profile)profile.last_seen_at=now;
      renderPresence();
    }

    async function saveBio(){
      if(!user)return;
      const input=document.getElementById('jnxProfileBioInput');
      const hint=document.getElementById('jnxProfileSaveHint');
      const bio=(input?.value||'').trim();
      const r=await db.from('profiles').update({bio}).eq('id',user.id);
      if(r.error){if(hint)hint.textContent='保存失败，请稍后再试';console.error(r.error);return;}
      if(profile)profile.bio=bio;
      if(hint){hint.textContent='已保存 ✓';setTimeout(()=>{if(hint)hint.textContent=''},1800)}
    }

    async function handleAvatarUpload(event){
      if(!user)return;
      const file=event.target.files?.[0];
      if(!file)return;
      if(file.size>5*1024*1024){alert('头像不能超过 5 MB');return;}
      const ext=(file.name.split('.').pop()||'png').toLowerCase();
      const path=`${user.id}/avatar.${ext}`;
      const up=await db.storage.from('avatars').upload(path,file,{upsert:true,contentType:file.type||`image/${ext}`});
      if(up.error){console.error('Avatar upload error',up.error);alert('头像上传失败');return;}
      const pub=db.storage.from('avatars').getPublicUrl(path);
      const url=pub.data?.publicUrl;
      if(!url)return;
      const save=await db.from('profiles').update({avatar_url:url}).eq('id',user.id);
      if(save.error){console.error('Avatar profile save error',save.error);return;}
      if(profile)profile.avatar_url=url;
      renderProfile();
    }

    function start(){
      applyStyles();
      loadProfile().then(heartbeat);
      heartTimer=setInterval(heartbeat,60000);
      setInterval(renderPresence,30000);
      document.getElementById('profileButton')?.addEventListener('click',()=>setTimeout(()=>{injectUI();renderProfile()},50));
      window.addEventListener('beforeunload',()=>{if(user)db.from('profiles').update({last_seen_at:new Date().toISOString()}).eq('id',user.id)});
      db.auth.onAuthStateChange(async()=>{await loadProfile();await heartbeat()});
    }

    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  }

  if(window.supabase?.createClient)init();
  else window.addEventListener('load',init,{once:true});
})();
