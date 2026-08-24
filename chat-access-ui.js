(function(){
  function init(){
    const button=document.getElementById("jnxChatButton");
    if(!button||document.getElementById("jnxChatLoginNotice"))return;
    const notice=document.createElement("div");
    notice.id="jnxChatLoginNotice";
    notice.style.cssText="margin:8px auto 0;text-align:center;font-size:12px;line-height:1.5;color:#999;";
    notice.textContent="🔒 登录后才可查看聊天";
    button.insertAdjacentElement("afterend",notice);
    function update(session){
      const loggedIn=!!session?.user;
      notice.textContent=loggedIn?"聊天已开放":"🔒 登录后才可查看聊天";
      button.style.opacity=loggedIn?"1":".65";
      button.setAttribute("aria-disabled",loggedIn?"false":"true");
    }
    function bind(){
      if(!window.supabase?.createClient)return false;
      const client=window.supabase.createClient("https://qdehfgjifhtczkrpuadl.supabase.co","sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp");
      client.auth.getSession().then(({data})=>update(data?.session||null));
      client.auth.onAuthStateChange((_event,session)=>update(session));
      button.addEventListener("click",function(event){
        client.auth.getSession().then(({data})=>{
          if(!data?.session){event.preventDefault();event.stopImmediatePropagation();notice.textContent="🔒 请先登录后查看聊天";setTimeout(()=>{notice.textContent="🔒 登录后才可查看聊天";},2200);}
        });
      },true);
      return true;
    }
    if(!bind())window.addEventListener("load",bind,{once:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
