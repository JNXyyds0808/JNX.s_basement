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

    function applyStyles(){
      if(document.getElementById('jnxProfileEnhancementStyles'))return;
      const style=document.createElement('style');
      style.id='jnxProfileEnhancementStyles';
      style.textContent=`
        #profileModal .profile-box{width:min(390px,92vw)!important;max-height:86vh!important;overflow:auto!important;text-align:center!important}
        #profileModal .profile-box>h2,#profileModal .profile-box>.profile-subtitle,#profileModal .profile-info{display:none!important}
        #profileModal #profileAvatar{width:88px!important;height:88px!important;margin:6px auto 14px!important;font-size:32px!important;background-size:cover!important;background-position:center!important}
        #profileAvatar.jnx-has-avatar{color:transparent!important}
        #jnxProfilePublicInfo{display:block;text-align:center;padding:0 8px 6px}
        #jnxProfilePublicName{font-size:23px;font-weight:800;line-height:1.2;color:inherit}
        #jnxProfilePublicUsername{margin-top:5px;font-size:13px;color:#8e879c}
        #jnxProfileBioDisplay{margin:16px auto 0;max-width:310px;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.05);font-size:13px;line-height:1.6;text-align:center;white-space:pre-wrap;word-break:break-word;color:#c2bdcc}
        #jnxProfileBioDisplay.jnx-empty{color:#777184;font-style:italic}
        #jnxSettingsProfile{margin:18px 0 4px;padding-top:16px;border-top:1px solid rgba(128,105,190,.18)}
        .jnx-settings-profile-title{font-size:14px;font-weight:700;margin-bottom:12px}
        .jnx-settings-avatar-row{display:flex;align-items:center;gap:12px;margin-bottom:14px}
        #jnxSettingsAvatarPreview{width:54px;height:54px;flex:0 0 54px;border-radius:50%;display:flex;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(135deg,#8b72d9,#c7b7ff);color:#fff;font:700 22px/1 Arial,sans-serif;background-size:cover;background-position:center}
        #jnxSettingsAvatarPreview.jnx-has-avatar{color:transparent}
        .jnx-settings-avatar-button{display:inline-flex;align-items:center;justify-content:center;padding:8px 12px;border-radius:10px;border:1px solid rgba(128,105,190,.24);background:rgba(128,105,190,.1);cursor:pointer;font-size:12px}
        .jnx-settings-field{margin-top:12px}
        .jnx-settings-field label{display:block;font-size:12px;margin-bottom:6px;opacity:.78}
        #jnxSettingsBio{width:100%;min-height:72px;resize:vertical;box-sizing:border-box;padding:10px 11px;border-radius:11px;border:1px solid rgba(128,105,190,.22);background:rgba(255,255,255,.04);color:inherit;font:inherit;outline:none}
        #jnxSettingsSaveProfile{width:100%;margin-top:10px;padding:9px 12px;border:0;border-radius:10px;background:#7d63c8;color:#fff;font-weight:700;cursor:pointer}
        #jnxSettingsProfileHint{min-height:16px;margin-top:6px;text-align:center;font-size:11px;opacity:.72}
        html.jnxLight #jnxProfileBioDisplay{background:#f7f4ff;color:#5f596b}
        html.jnxLight #jnxProfilePublicUsername{color:#746d80}
        html.jnxLight #jnxSettingsProfile{border-color:rgba(100,75,180,.18)}
        html.jnxLight #jnxSettingsBio{background:#fff;color:#242130;border-color:rgba(100,75,180,.22)}
        html.jnxLight .jnx-settings-avatar-button{background:#f4efff;color:#31274f;border-color:rgba(100,75,180,.22)}
        @media(max-width:600px){
          #profileModal .profile-box{max-height:82vh!important}
          #profileModal #profileAvatar{width:78px!important;height:78px!important}
          #jnxProfilePublicName{font-size:21px}
          #jnxProfileBioDisplay{font-size:12px}
        }
      `;
      document.head.appendChild(style);
    }

    function fallback(name){return (name||'J').trim().charAt(0).toUpperCase()||'J'}

    function injectProfileDisplay(){
      const box=document.querySelector('#profileModal .profile-box');
      if(!box)return;
      document.getElementById('jnxProfileEnhancement')?.remove();
      let info=document.getElementById('jnxProfilePublicInfo');
      if(!info){
        info=document.createElement('div');
        info.id='jnxProfilePublicInfo';
        info.innerHTML='<div id="jnxProfilePublicName"></div><div id="jnxProfilePublicUsername"></div><div id="jnxProfileBioDisplay"></div>';
        const avatar=document.getElementById('profileAvatar');
        if(avatar)avatar.insertAdjacentElement('afterend',info);else box.appendChild(info);
      }
    }

    function injectSettingsEditor(){
      const box=document.querySelector('#settingsModal .settings-box')||document.querySelector('#settingsModal [class*="settings-box"]');
      if(!box||document.getElementById('jnxSettingsProfile'))return;
      const section=document.createElement('div');
      section.id='jnxSettingsProfile';
      section.innerHTML=`<div class="jnx-settings-profile-title">个人资料</div><div class="jnx-settings-avatar-row"><div id="jnxSettingsAvatarPreview">J</div><div><label class="jnx-settings-avatar-button" for="jnxSettingsAvatarInput">更换头像</label><input id="jnxSettingsAvatarInput" type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden></div></div><div class="jnx-settings-field"><label for="jnxSettingsBio">个性签名 / 自我介绍</label><textarea id="jnxSettingsBio" maxlength="300" placeholder="写一点关于自己的话……"></textarea></div><button id="jnxSettingsSaveProfile" type="button">保存个人资料</button><div id="jnxSettingsProfileHint"></div>`;
      const buttons=box.querySelector('.settings-buttons');
      if(buttons)buttons.insertAdjacentElement('beforebegin',section);else box.appendChild(section);
      document.getElementById('jnxSettingsAvatarInput')?.addEventListener('change',uploadAvatar);
      document.getElementById('jnxSettingsSaveProfile')?.addEventListener('click',saveBio);
    }

    function render(){
      if(!profile)return;
      injectProfileDisplay();
      injectSettingsEditor();
      const name=profile.display_name||profile.username||'JNX User';
      const username=profile.username||'';
      const avatar=document.getElementById('profileAvatar');
      if(avatar){
        if(profile.avatar_url){avatar.style.backgroundImage=`url("${profile.avatar_url}")`;avatar.classList.add('jnx-has-avatar');avatar.textContent='';}
        else{avatar.style.backgroundImage='';avatar.classList.remove('jnx-has-avatar');avatar.textContent=fallback(name);}
      }
      const n=document.getElementById('jnxProfilePublicName');if(n)n.textContent=name;
      const u=document.getElementById('jnxProfilePublicUsername');if(u)u.textContent=username?`@${username}`:'';
      const b=document.getElementById('jnxProfileBioDisplay');if(b){const text=(profile.bio||'').trim();b.textContent=text||'还没有个性签名';b.classList.toggle('jnx-empty',!text);}
      const preview=document.getElementById('jnxSettingsAvatarPreview');
      if(preview){
        if(profile.avatar_url){preview.style.backgroundImage=`url("${profile.avatar_url}")`;preview.classList.add('jnx-has-avatar');preview.textContent='';}
        else{preview.style.backgroundImage='';preview.classList.remove('jnx-has-avatar');preview.textContent=fallback(name);}
      }
      const bioInput=document.getElementById('jnxSettingsBio');if(bioInput)bioInput.value=profile.bio||'';
    }

    async function loadProfile(){
      const auth=await db.auth.getUser();
      user=auth.data?.user||null;
      if(!user){profile=null;return;}
      const result=await db.from('profiles').select('id,username,display_name,bio,avatar_url,last_seen_at').eq('id',user.id).maybeSingle();
      if(result.error){console.error('Profile enhancement load error',result.error);return;}
      profile=result.data||null;
      render();
    }

    async function heartbeat(){
      if(!user)return;
      const now=new Date().toISOString();
      const result=await db.from('profiles').update({last_seen_at:now}).eq('id',user.id);
      if(result.error)console.error('last_seen update error',result.error);
      else if(profile)profile.last_seen_at=now;
    }

    async function saveBio(){
      if(!user)return;
      const input=document.getElementById('jnxSettingsBio');
      const hint=document.getElementById('jnxSettingsProfileHint');
      const bio=(input?.value||'').trim();
      const result=await db.from('profiles').update({bio}).eq('id',user.id);
      if(result.error){if(hint)hint.textContent='保存失败，请稍后再试';console.error(result.error);return;}
      if(profile)profile.bio=bio;
      render();
      if(hint){hint.textContent='已保存 ✓';setTimeout(()=>{if(hint)hint.textContent=''},1800);}
    }

    async function uploadAvatar(event){
      if(!user)return;
      const file=event.target.files?.[0];
      if(!file)return;
      if(file.size>5*1024*1024){alert('头像不能超过 5 MB');return;}
      if(!/^image\/(png|jpeg|webp|gif)$/i.test(file.type)){alert('请选择 PNG、JPG、WebP 或 GIF 图片');return;}
      const ext=file.type==='image/jpeg'?'jpg':file.type.split('/')[1].toLowerCase();
      const path=`${user.id}/avatar.${ext}`;
      const upload=await db.storage.from('avatars').upload(path,file,{upsert:true,contentType:file.type,cacheControl:'60'});
      if(upload.error){console.error('Avatar upload error',upload.error);alert('头像上传失败');return;}
      const pub=db.storage.from('avatars').getPublicUrl(path);
      let url=pub.data?.publicUrl;
      if(!url)return;
      url+=`?v=${Date.now()}`;
      const save=await db.from('profiles').update({avatar_url:url}).eq('id',user.id);
      if(save.error){console.error('Avatar profile save error',save.error);return;}
      if(profile)profile.avatar_url=url;
      render();
    }

    function start(){
      applyStyles();
      injectProfileDisplay();
      injectSettingsEditor();
      loadProfile().then(heartbeat);
      setInterval(heartbeat,60000);
      document.getElementById('profileButton')?.addEventListener('click',()=>setTimeout(render,30));
      document.getElementById('settingsButton')?.addEventListener('click',()=>setTimeout(()=>{injectSettingsEditor();render()},30));
      db.auth.onAuthStateChange(async()=>{await loadProfile();await heartbeat();});
    }

    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  }

  if(window.supabase?.createClient)init();else window.addEventListener('load',init,{once:true});
})();
