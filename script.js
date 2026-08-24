document.addEventListener("DOMContentLoaded", async function () {

  /* =====================================================
     JNX + SUPABASE
  ====================================================== */

  const SUPABASE_URL =
    "https://qdehfgjifhtczkrpuadl.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp";


  /* =====================================================
     LOAD SUPABASE
  ====================================================== */

  function loadSupabase() {

    return new Promise(function (resolve, reject) {

      if (window.supabase) {
        resolve();
        return;
      }

      const script =
        document.createElement("script");

      script.src =
        "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

      script.onload = resolve;

      script.onerror = function () {
        reject(
          new Error(
            "Supabase library failed to load."
          )
        );
      };

      document.head.appendChild(script);

    });

  }


  try {

    await loadSupabase();

  } catch (error) {

    console.error(error);

    alert("JNX 无法连接到服务器。");

    return;

  }


  /* =====================================================
     SUPABASE CLIENT
  ====================================================== */

  const db =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );


  console.log("JNX Supabase loaded");


  /* =====================================================
     LANGUAGE
  ====================================================== */

  let language = "zh";


  const languageBtn =
    document.getElementById("languageBtn");


  function updateLanguage() {

    document
      .querySelectorAll("[data-en][data-zh]")
      .forEach(function (element) {

        element.textContent =
          element.getAttribute(
            "data-" + language
          );

      });


    if (languageBtn) {

      languageBtn.textContent =
        language === "zh"
          ? "English"
          : "中文";

    }


    const settingsChinese =
      document.getElementById(
        "settingsChinese"
      );

    const settingsEnglish =
      document.getElementById(
        "settingsEnglish"
      );


    if (settingsChinese) {

      settingsChinese.classList.toggle(
        "active",
        language === "zh"
      );

    }


    if (settingsEnglish) {

      settingsEnglish.classList.toggle(
        "active",
        language === "en"
      );

    }

  }


  if (languageBtn) {

    languageBtn.onclick =
      function () {

        language =
          language === "zh"
            ? "en"
            : "zh";

        updateLanguage();

        updateAccountUI();

        loadSiteUpdates();

      };

  }



  /* =====================================================
     LOGIN ELEMENTS
  ===================================================== */

  const loginModal =
    document.getElementById("loginModal");

  const loginClose =
    document.getElementById("loginClose");

  const loginOverlay =
    document.getElementById("loginOverlay");

  const loginLinks =
    document.querySelectorAll(".login-link");

  const loginUsername =
    document.getElementById("loginUsername");

  const loginPassword =
    document.getElementById("loginPassword");

  const loginButton =
    document.getElementById("loginButton");



  /* =====================================================
     REGISTER
  ===================================================== */

  const registerModal =
    document.getElementById("registerModal");

  const registerClose =
    document.getElementById("registerClose");

  const registerOverlay =
    document.getElementById("registerOverlay");

  const registerLink =
    document.getElementById("registerLink");

  const backToLogin =
    document.getElementById("backToLogin");

  const registerUsername =
    document.getElementById("registerUsername");

  const registerPassword =
    document.getElementById("registerPassword");

  const registerConfirmPassword =
    document.getElementById(
      "registerConfirmPassword"
    );

  const registerButton =
    document.getElementById("registerButton");



  /* =====================================================
     USER MENU
  ===================================================== */

  const userMenuButton =
    document.getElementById(
      "userMenuButton"
    );

  const userMenu =
    document.getElementById("userMenu");

  const userMenuName =
    document.getElementById("userMenuName");

  const welcomeUser =
    document.getElementById("welcomeUser");

  const logoutButton =
    document.getElementById("logoutButton");

  const profileButton =
    document.getElementById("profileButton");

  const settingsButton =
    document.getElementById("settingsButton");



  /* =====================================================
     PROFILE
  ===================================================== */

  const profileModal =
    document.getElementById("profileModal");

  const profileOverlay =
    document.getElementById("profileOverlay");

  const profileClose =
    document.getElementById("profileClose");

  const profileUsername =
    document.getElementById("profileUsername");

  const profileDisplayName =
    document.getElementById(
      "profileDisplayName"
    );

  const profileAvatar =
    document.getElementById("profileAvatar");



  /* =====================================================
     SETTINGS
  ===================================================== */

  const settingsModal =
    document.getElementById("settingsModal");

  const settingsOverlay =
    document.getElementById(
      "settingsOverlay"
    );

  const settingsClose =
    document.getElementById("settingsClose");

  const settingsCancel =
    document.getElementById(
      "settingsCancel"
    );

  const settingsSave =
    document.getElementById("settingsSave");

  const displayNameInput =
    document.getElementById(
      "displayNameInput"
    );

  const settingsUsername =
    document.getElementById(
      "settingsUsername"
    );

  const settingsChinese =
    document.getElementById(
      "settingsChinese"
    );

  const settingsEnglish =
    document.getElementById(
      "settingsEnglish"
    );



  /* =====================================================
     ACCOUNT SETTINGS
  ===================================================== */

  const changeUsernameButton =
    document.getElementById(
      "changeUsernameButton"
    );

  const changePasswordButton =
    document.getElementById(
      "changePasswordButton"
    );

  const deleteAccountButton =
    document.getElementById(
      "deleteAccountButton"
    );



  /* =====================================================
     USERNAME MODAL
  ===================================================== */

  const usernameModal =
    document.getElementById(
      "usernameModal"
    );

  const usernameOverlay =
    document.getElementById(
      "usernameOverlay"
    );

  const usernameClose =
    document.getElementById(
      "usernameClose"
    );

  const newUsername =
    document.getElementById(
      "newUsername"
    );

  const saveUsernameButton =
    document.getElementById(
      "saveUsernameButton"
    );



  /* =====================================================
     PASSWORD MODAL
  ===================================================== */

  const passwordModal =
    document.getElementById(
      "passwordModal"
    );

  const passwordOverlay =
    document.getElementById(
      "passwordOverlay"
    );

  const passwordClose =
    document.getElementById(
      "passwordClose"
    );

  const oldPassword =
    document.getElementById(
      "oldPassword"
    );

  const newPassword =
    document.getElementById(
      "newPassword"
    );

  const confirmNewPassword =
    document.getElementById(
      "confirmNewPassword"
    );

  const savePasswordButton =
    document.getElementById(
      "savePasswordButton"
    );



  /* =====================================================
     DARK / LIGHT
  ===================================================== */

  const darkModeButton =
    document.getElementById(
      "darkModeButton"
    );

  const lightModeButton =
    document.getElementById(
      "lightModeButton"
    );



  /* =====================================================
     RECENT ACTIVITY
  ===================================================== */

  const activityList =
    document.getElementById(
      "activityList"
    );

  const activityLoading =
    document.getElementById(
      "activityLoading"
    );

  const adminEditButton =
    document.getElementById(
      "adminEditButton"
    );

  const adminActivityModal =
    document.getElementById(
      "adminActivityModal"
    );

  const adminActivityOverlay =
    document.getElementById(
      "adminActivityOverlay"
    );

  const adminActivityClose =
    document.getElementById(
      "adminActivityClose"
    );

  const adminActivityCancel =
    document.getElementById(
      "adminActivityCancel"
    );

  const adminActivitySave =
    document.getElementById(
      "adminActivitySave"
    );

  const activityTitleInput =
    document.getElementById(
      "activityTitleInput"
    );

  const activityContentInput =
    document.getElementById(
      "activityContentInput"
    );



  /* =====================================================
     CURRENT USER
  ===================================================== */

  let currentUser = null;

  let currentProfile = null;

  let currentActivity = null;



  /* =====================================================
     ADMIN
  ===================================================== */

  function isAdmin() {

    if (!currentUser) {
      return false;
    }


    const username =
      currentUser.user_metadata?.username
        ?.toLowerCase()
        ?.trim();


    return username === "jnxyyds";

  }



  /* =====================================================
     USERNAME → EMAIL
  ===================================================== */

  function usernameToEmail(username) {

    return (
      username
        .toLowerCase()
        .trim() +
      "@jnx.local"
    );

  }



  /* =====================================================
     USERNAME VALIDATION
  ===================================================== */

  function validUsername(username) {

    return /^[a-zA-Z0-9_.-]{3,20}$/.test(
      username
    );

  }



  /* =====================================================
     MODALS
  ===================================================== */

  function openLogin() {
    loginModal?.classList.add("active");
  }


  function closeLogin() {
    loginModal?.classList.remove("active");
  }


  function openRegister() {
    registerModal?.classList.add("active");
  }


  function closeRegister() {
    registerModal?.classList.remove("active");
  }


  function openProfile() {
    profileModal?.classList.add("active");
  }


  function closeProfile() {
    profileModal?.classList.remove("active");
  }


  function openSettings() {
    settingsModal?.classList.add("active");
  }


  function closeSettings() {
    settingsModal?.classList.remove("active");
  }


  function openUsernameModal() {
    usernameModal?.classList.add("active");
  }


  function closeUsernameModal() {
    usernameModal?.classList.remove("active");
  }


  function openPasswordModal() {
    passwordModal?.classList.add("active");
  }


  function closePasswordModal() {
    passwordModal?.classList.remove("active");
  }


  function openAdminActivity() {
    adminActivityModal?.classList.add("active");
  }


  function closeAdminActivity() {
    adminActivityModal?.classList.remove("active");
  }



  /* =====================================================
     LOGIN LINKS
  ===================================================== */

  loginLinks.forEach(function (link) {

    link.onclick =
      function (event) {

        event.preventDefault();

        openLogin();

      };

  });


  loginClose?.addEventListener(
    "click",
    closeLogin
  );


  loginOverlay?.addEventListener(
    "click",
    closeLogin
  );



  /* =====================================================
     REGISTER NAVIGATION
  ===================================================== */

  registerLink?.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      closeLogin();

      openRegister();

    }
  );


  registerClose?.addEventListener(
    "click",
    closeRegister
  );


  registerOverlay?.addEventListener(
    "click",
    closeRegister
  );


  backToLogin?.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      closeRegister();

      openLogin();

    }
  );



  /* =====================================================
     LOAD PROFILE
  ===================================================== */

  async function loadProfile(user) {

    if (!user) {

      currentProfile = null;

      return null;

    }


    const result =
      await db
        .from("profiles")
        .select(
          "id, username, display_name"
        )
        .eq("id", user.id)
        .maybeSingle();


    if (result.error) {

      console.error(
        "Profile loading error:",
        result.error
      );

      currentProfile = null;

      return null;

    }


    currentProfile =
      result.data || null;


    return currentProfile;

  }



  /* =====================================================
     UPDATE PROFILE UI
  ===================================================== */

  function updateProfileUI() {

    if (!currentProfile) {
      return;
    }


    const username =
      currentProfile.username ||
      currentUser?.user_metadata?.username ||
      "";


    const displayName =
      currentProfile.display_name ||
      username ||
      "JNX User";


    if (profileUsername) {

      profileUsername.textContent =
        username;

    }


    if (profileDisplayName) {

      profileDisplayName.textContent =
        displayName;

    }


    if (profileAvatar) {

      profileAvatar.textContent =
        displayName
          .charAt(0)
          .toUpperCase();

    }


    if (settingsUsername) {

      settingsUsername.textContent =
        username;

    }


    if (displayNameInput) {

      displayNameInput.value =
        displayName;

    }


    if (userMenuName) {

      userMenuName.textContent =
        displayName;

    }


    if (welcomeUser) {

      welcomeUser.style.display =
        "block";

      welcomeUser.textContent =
        language === "zh"
          ? "你好，" + displayName
          : "Hi, " + displayName;

    }

  }



  /* =====================================================
     ADMIN BUTTON UI
  ===================================================== */

  function updateAdminUI() {

    if (!adminEditButton) {
      return;
    }


    if (isAdmin()) {

      adminEditButton.style.display =
        "inline-flex";

    } else {

      adminEditButton.style.display =
        "none";

    }

  }



  /* =====================================================
     ACCOUNT UI
  ===================================================== */

  async function updateAccountUI() {

    const result =
      await db.auth.getUser();


    if (result.error) {

      console.error(
        "Auth error:",
        result.error
      );

      return;

    }


    currentUser =
      result.data.user || null;


    if (!currentUser) {

      currentProfile = null;


      userMenuButton &&
        (userMenuButton.style.display =
          "none");


      welcomeUser &&
        (welcomeUser.style.display =
          "none");


      logoutButton &&
        (logoutButton.style.display =
          "none");


      loginLinks.forEach(
        function (link) {

          link.style.display =
            "inline";

        }
      );


      updateAdminUI();

      return;

    }


    await loadProfile(
      currentUser
    );


    updateProfileUI();


    userMenuButton &&
      (userMenuButton.style.display =
        "flex");


    logoutButton &&
      (logoutButton.style.display =
        "block");


    loginLinks.forEach(
      function (link) {

        link.style.display =
          "none";

      }
    );


    updateAdminUI();

  }



  /* =====================================================
     REGISTER
  ===================================================== */

  registerButton?.addEventListener(
    "click",
    async function () {

      const username =
        registerUsername.value
          .trim()
          .toLowerCase();


      const password =
        registerPassword.value;


      const confirmPassword =
        registerConfirmPassword.value;


      if (!username) {

        alert(
          language === "zh"
            ? "请输入用户名。"
            : "Please enter a username."
        );

        return;

      }


      if (!validUsername(username)) {

        alert(
          language === "zh"
            ? "用户名需要 3-20 个字符，只能使用字母、数字、下划线、点或横线。"
            : "Username must be 3-20 characters."
        );

        return;

      }


      if (password.length < 6) {

        alert(
          language === "zh"
            ? "密码至少需要 6 个字符。"
            : "Password must be at least 6 characters."
        );

        return;

      }


      if (
        password !==
        confirmPassword
      ) {

        alert(
          language === "zh"
            ? "两次密码不一致。"
            : "Passwords do not match."
        );

        return;

      }


      registerButton.disabled =
        true;


      registerButton.textContent =
        language === "zh"
          ? "创建中..."
          : "Creating...";


      const signup =
        await db.auth.signUp({

          email:
            usernameToEmail(
              username
            ),

          password:
            password,

          options: {

            data: {

              username:
                username,

              display_name:
                username

            }

          }

        });


      registerButton.disabled =
        false;


      registerButton.textContent =
        language === "zh"
          ? "创建账号"
          : "Create account";


      if (signup.error) {

        console.error(
          "Signup error:",
          signup.error
        );

        alert(
          signup.error.message
        );

        return;

      }


      registerUsername.value =
        "";

      registerPassword.value =
        "";

      registerConfirmPassword.value =
        "";


      closeRegister();


      alert(
        language === "zh"
          ? "注册成功！"
          : "Account created!"
      );


      openLogin();


      if (loginUsername) {

        loginUsername.value =
          username;

      }

    }
  );



  /* =====================================================
     LOGIN
  ===================================================== */

  loginButton?.addEventListener(
    "click",
    async function () {

      const username =
        loginUsername.value
          .trim()
          .toLowerCase();


      const password =
        loginPassword.value;


      if (!username || !password) {

        alert(
          language === "zh"
            ? "请输入用户名和密码。"
            : "Please enter username and password."
        );

        return;

      }


      if (!validUsername(username)) {

        alert(
          language === "zh"
            ? "用户名格式不正确。"
            : "Invalid username."
        );

        return;

      }


      loginButton.disabled =
        true;


      loginButton.textContent =
        language === "zh"
          ? "登录中..."
          : "Logging in...";


      const login =
        await db.auth.signInWithPassword({

          email:
            usernameToEmail(
              username
            ),

          password:
            password

        });


      loginButton.disabled =
        false;


      loginButton.textContent =
        language === "zh"
          ? "登录"
          : "Log in";


      if (login.error) {

        console.error(
          "Login error:",
          login.error
        );

        alert(
          language === "zh"
            ? "用户名或密码错误。"
            : "Incorrect username or password."
        );

        return;

      }


      loginPassword.value =
        "";


      closeLogin();


      await updateAccountUI();


      await loadSiteUpdates();


      alert(
        language === "zh"
          ? "登录成功！"
          : "Login successful!"
      );

    }
  );



  /* =====================================================
     USER MENU
  ===================================================== */

  userMenuButton?.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      userMenu?.classList.toggle(
        "active"
      );

      userMenuButton.classList.toggle(
        "active"
      );

    }
  );


  document.addEventListener(
    "click",
    function () {

      userMenu?.classList.remove(
        "active"
      );

      userMenuButton?.classList.remove(
        "active"
      );

    }
  );



  /* =====================================================
     PROFILE
  ===================================================== */

  profileButton?.addEventListener(
    "click",
    async function (event) {

      event.stopPropagation();

      await updateAccountUI();

      openProfile();

    }
  );


  profileClose?.addEventListener(
    "click",
    closeProfile
  );


  profileOverlay?.addEventListener(
    "click",
    closeProfile
  );



  /* =====================================================
     SETTINGS
  ===================================================== */

  settingsButton?.addEventListener(
    "click",
    async function (event) {

      event.stopPropagation();

      await updateAccountUI();

      openSettings();

    }
  );


  settingsClose?.addEventListener(
    "click",
    closeSettings
  );


  settingsOverlay?.addEventListener(
    "click",
    closeSettings
  );


  settingsCancel?.addEventListener(
    "click",
    closeSettings
  );



  /* =====================================================
     SETTINGS LANGUAGE
  ===================================================== */

  settingsChinese?.addEventListener(
    "click",
    function () {

      language = "zh";

      updateLanguage();

      updateAccountUI();

      loadSiteUpdates();

    }
  );


  settingsEnglish?.addEventListener(
    "click",
    function () {

      language = "en";

      updateLanguage();

      updateAccountUI();

      loadSiteUpdates();

    }
  );



  /* =====================================================
     SAVE DISPLAY NAME
  ===================================================== */

  async function saveDisplayName() {

    if (!currentUser) {

      alert(
        language === "zh"
          ? "请先登录。"
          : "Please log in first."
      );

      return;

    }


    const newName =
      displayNameInput.value.trim();


    if (!newName) {

      alert(
        language === "zh"
          ? "Display Name 不能为空。"
          : "Display Name cannot be empty."
      );

      return;

    }


    if (newName.length > 30) {

      alert(
        language === "zh"
          ? "Display Name 最多 30 个字符。"
          : "Display Name can be up to 30 characters."
      );

      return;

    }


    settingsSave.disabled =
      true;


    settingsSave.textContent =
      language === "zh"
        ? "保存中..."
        : "Saving...";


    const update =
      await db
        .from("profiles")
        .update({

          display_name:
            newName

        })
        .eq(
          "id",
          currentUser.id
        )
        .select(
          "id, username, display_name"
        );


    settingsSave.disabled =
      false;


    settingsSave.textContent =
      language === "zh"
        ? "保存更改"
        : "Save Changes";


    if (update.error) {

      console.error(
        update.error
      );

      alert(
        language === "zh"
          ? "保存失败：" +
            update.error.message
          : "Save failed: " +
            update.error.message
      );

      return;

    }


    if (
      !update.data ||
      update.data.length === 0
    ) {

      alert(
        language === "zh"
          ? "没有更新任何数据。"
          : "No profile was updated."
      );

      return;

    }


    currentProfile =
      update.data[0];


    updateProfileUI();

    closeSettings();


    alert(
      language === "zh"
        ? "Display Name 保存成功！"
        : "Display Name saved!"
    );

  }


  settingsSave?.addEventListener(
    "click",
    saveDisplayName
  );


/* =====================================================
   RECENT ACTIVITY
===================================================== */

async function loadSiteUpdates() {

  if (!activityList) {
    return;
  }


  if (activityLoading) {

    activityLoading.style.display =
      "block";

  }


  const result =
    await db
      .from("site_updates")
      .select(
        "id, title, content, updated_at"
      )
      .order(
        "updated_at",
        {
          ascending: false
        }
      );


  if (activityLoading) {

    activityLoading.style.display =
      "none";

  }


  if (result.error) {

    console.error(
      "Site updates error:",
      result.error
    );

    activityList.innerHTML = "";

    const errorElement =
      document.createElement("p");

    errorElement.textContent =
      language === "zh"
        ? "动态暂时无法加载。"
        : "Updates could not be loaded.";

    activityList.appendChild(
      errorElement
    );

    return;

  }


  activityList.innerHTML = "";


  const updates =
    result.data || [];


  /* =====================================================
     没有动态
  ===================================================== */

  if (updates.length === 0) {

    const empty =
      document.createElement("p");

    empty.textContent =
      language === "zh"
        ? "暂时还没有动态。"
        : "No updates yet.";

    activityList.appendChild(
      empty
    );

    currentActivity = null;

    return;

  }


  /* =====================================================
     保存最新动态
  ===================================================== */

  currentActivity =
    updates[0];


  /* =====================================================
     只显示最新三条
  ===================================================== */

  const recentUpdates =
    updates.slice(0, 3);


  recentUpdates.forEach(
    function (item) {

      const card =
        document.createElement(
          "article"
        );

      card.className =
        "activity-card";


      const title =
        document.createElement(
          "h3"
        );

      title.textContent =
        item.title || "";


      const content =
        document.createElement(
          "p"
        );

      content.textContent =
        item.content || "";


      const date =
        document.createElement(
          "small"
        );


      if (item.updated_at) {

        const dateObject =
          new Date(
            item.updated_at
          );


        date.textContent =
          language === "zh"
            ? "更新于 " +
              dateObject.toLocaleString(
                "zh-CN"
              )
            : "Updated " +
              dateObject.toLocaleString(
                "en-US"
              );

      }


      card.appendChild(
        title
      );

      card.appendChild(
        content
      );

      card.appendChild(
        date
      );


      activityList.appendChild(
        card
      );

    }
  );


  /* =====================================================
     查看全部动态按钮
  ===================================================== */

  if (updates.length > 3) {

    const viewAllButton =
      document.createElement(
        "button"
      );

    viewAllButton.className =
      "view-all-updates-button";


    viewAllButton.textContent =
      language === "zh"
        ? "查看全部动态 →"
        : "View all updates →";


    viewAllButton.addEventListener(
      "click",
      function () {

        openAllUpdatesModal(
          updates
        );

      }
    );


    activityList.appendChild(
      viewAllButton
    );

  }

}



/* =====================================================
   ALL UPDATES MODAL
===================================================== */

function openAllUpdatesModal(
  updates
) {

  let modal =
    document.getElementById(
      "allUpdatesModal"
    );


  /* =====================================================
     第一次打开时创建 Modal
  ===================================================== */

  if (!modal) {

    modal =
      document.createElement(
        "div"
      );

    modal.id =
      "allUpdatesModal";

    modal.className =
      "all-updates-modal";


    const overlay =
      document.createElement(
        "div"
      );

    overlay.className =
      "all-updates-overlay";


    const box =
      document.createElement(
        "div"
      );

    box.className =
      "all-updates-box";


    const close =
      document.createElement(
        "button"
      );

    close.className =
      "all-updates-close";

    close.textContent =
      "×";


    close.addEventListener(
      "click",
      function () {

        closeAllUpdatesModal();

      }
    );


    overlay.addEventListener(
      "click",
      function () {

        closeAllUpdatesModal();

      }
    );


    const title =
      document.createElement(
        "h2"
      );

    title.className =
      "all-updates-title";


    const subtitle =
      document.createElement(
        "p"
      );

    subtitle.className =
      "all-updates-subtitle";


    const list =
      document.createElement(
        "div"
      );

    list.className =
      "all-updates-list";

    list.id =
      "allUpdatesList";


    box.appendChild(
      close
    );

    box.appendChild(
      title
    );

    box.appendChild(
      subtitle
    );

    box.appendChild(
      list
    );


    modal.appendChild(
      overlay
    );

    modal.appendChild(
      box
    );


    document.body.appendChild(
      modal
    );

  }


  const title =
    modal.querySelector(
      ".all-updates-title"
    );


  const subtitle =
    modal.querySelector(
      ".all-updates-subtitle"
    );


  const list =
    document.getElementById(
      "allUpdatesList"
    );


  title.textContent =
    language === "zh"
      ? "全部动态"
      : "All Updates";


  subtitle.textContent =
    language === "zh"
      ? "JNX 的所有历史动态"
      : "All updates from JNX";


  list.innerHTML = "";


  /* =====================================================
     显示所有历史动态
  ===================================================== */

  updates.forEach(
    function (item) {

      const card =
        document.createElement(
          "article"
        );

      card.className =
        "all-update-card";


      const cardTitle =
        document.createElement(
          "h3"
        );

      cardTitle.textContent =
        item.title || "";


      const cardContent =
        document.createElement(
          "p"
        );

      cardContent.textContent =
        item.content || "";


      const cardDate =
        document.createElement(
          "small"
        );


      if (item.updated_at) {

        const dateObject =
          new Date(
            item.updated_at
          );


        cardDate.textContent =
          language === "zh"
            ? "更新于 " +
              dateObject.toLocaleString(
                "zh-CN"
              )
            : "Updated " +
              dateObject.toLocaleString(
                "en-US"
              );

      }


      card.appendChild(
        cardTitle
      );

      card.appendChild(
        cardContent
      );

      card.appendChild(
        cardDate
      );


      list.appendChild(
        card
      );

    }
  );


  modal.classList.add(
    "active"
  );

}



/* =====================================================
   CLOSE ALL UPDATES
===================================================== */

function closeAllUpdatesModal() {

  const modal =
    document.getElementById(
      "allUpdatesModal"
    );


  if (modal) {

    modal.classList.remove(
      "active"
    );

  }

}


  /* =====================================================
     ADMIN EDIT BUTTON
  ===================================================== */

  adminEditButton?.addEventListener(
    "click",
    async function (event) {

      event.stopPropagation();


      if (!isAdmin()) {

        alert(
          language === "zh"
            ? "你没有管理员权限。"
            : "You are not an administrator."
        );

        return;

      }


      await loadSiteUpdates();


      if (currentActivity) {

        if (activityTitleInput) {

          activityTitleInput.value =
            currentActivity.content || "";

        }


        if (activityContentInput) {

          activityContentInput.value =
            currentActivity.content_zh || "";

        }

      } else {

        if (activityTitleInput) {

          activityTitleInput.value =
            "";

        }


        if (activityContentInput) {

          activityContentInput.value =
            "";

        }

      }


      openAdminActivity();

    }
  );



  /* =====================================================
     ADMIN MODAL CLOSE
  ===================================================== */

  adminActivityClose?.addEventListener(
    "click",
    closeAdminActivity
  );


  adminActivityOverlay?.addEventListener(
    "click",
    closeAdminActivity
  );


  adminActivityCancel?.addEventListener(
    "click",
    closeAdminActivity
  );



  /* =====================================================
     ADMIN SAVE UPDATE
  ===================================================== */

  adminActivitySave?.addEventListener(
    "click",
    async function () {

      if (!isAdmin()) {

        alert(
          language === "zh"
            ? "你没有管理员权限。"
            : "You are not an administrator."
        );

        return;

      }


      const title =
        activityTitleInput
          ? activityTitleInput.value.trim()
          : "";


      const content =
        activityContentInput
          ? activityContentInput.value.trim()
          : "";


      if (!title) {

        alert(
          language === "zh"
            ? "请输入标题。"
            : "Please enter a title."
        );

        return;

      }


      if (!content) {

        alert(
          language === "zh"
            ? "请输入动态内容。"
            : "Please enter some content."
        );

        return;

      }


      adminActivitySave.disabled =
        true;


      adminActivitySave.textContent =
        language === "zh"
          ? "保存中..."
          : "Saving...";


      let result;


      /* =========================================
         EXISTING UPDATE
         content = TITLE
         content_zh = CONTENT
      ========================================= */

      if (currentActivity) {

        result =
          await db
            .from("site_updates")
            .update({

              content:
                title,

              content_zh:
                content,

              updated_at:
                new Date().toISOString()

            })
            .eq(
              "id",
              currentActivity.id
            )
            .select();


      }


      /* =========================================
         FIRST UPDATE
      ========================================= */

      else {

        result =
          await db
            .from("site_updates")
            .insert({

              content:
                title,

              content_zh:
                content,

              updated_at:
                new Date().toISOString()

            })
            .select();

      }


      adminActivitySave.disabled =
        false;


      adminActivitySave.textContent =
        language === "zh"
          ? "保存"
          : "Save";


      if (result.error) {

        console.error(
          "Update save error:",
          result.error
        );


        alert(
          language === "zh"
            ? "保存失败：" +
              result.error.message
            : "Save failed: " +
              result.error.message
        );

        return;

      }


      closeAdminActivity();


      await loadSiteUpdates();


      alert(
        language === "zh"
          ? "动态保存成功！"
          : "Update saved!"
      );

    }
  );



  /* =====================================================
     DARK MODE
  ===================================================== */

  darkModeButton?.addEventListener(
    "click",
    function () {

      document.body.classList.add(
        "dark-mode"
      );

      localStorage.setItem(
        "jnx-theme",
        "dark"
      );

    }
  );


  lightModeButton?.addEventListener(
    "click",
    function () {

      document.body.classList.remove(
        "dark-mode"
      );

      localStorage.setItem(
        "jnx-theme",
        "light"
      );

    }
  );


  const savedTheme =
    localStorage.getItem(
      "jnx-theme"
    );


  if (savedTheme === "dark") {

    document.body.classList.add(
      "dark-mode"
    );

  }



  /* =====================================================
     CHANGE USERNAME
  ===================================================== */

  changeUsernameButton?.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      openUsernameModal();

    }
  );


  usernameClose?.addEventListener(
    "click",
    closeUsernameModal
  );


  usernameOverlay?.addEventListener(
    "click",
    closeUsernameModal
  );



  /* =====================================================
     CHANGE PASSWORD
  ===================================================== */

  changePasswordButton?.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      openPasswordModal();

    }
  );


  passwordClose?.addEventListener(
    "click",
    closePasswordModal
  );


  passwordOverlay?.addEventListener(
    "click",
    closePasswordModal
  );



  /* =====================================================
     SAVE PASSWORD
  ===================================================== */

  savePasswordButton?.addEventListener(
    "click",
    async function () {

      if (!currentUser) {

        alert(
          language === "zh"
            ? "请先登录。"
            : "Please log in first."
        );

        return;

      }


      const password =
        newPassword.value;


      const confirm =
        confirmNewPassword.value;


      if (password.length < 6) {

        alert(
          language === "zh"
            ? "新密码至少需要 6 个字符。"
            : "New password must be at least 6 characters."
        );

        return;

      }


      if (password !== confirm) {

        alert(
          language === "zh"
            ? "两次密码不一致。"
            : "Passwords do not match."
        );

        return;

      }


      const result =
        await db.auth.updateUser({

          password:
            password

        });


      if (result.error) {

        alert(
          language === "zh"
            ? "修改密码失败：" +
              result.error.message
            : "Password change failed: " +
              result.error.message
        );

        return;

      }


      oldPassword.value = "";

      newPassword.value = "";

      confirmNewPassword.value = "";


      closePasswordModal();


      alert(
        language === "zh"
          ? "密码修改成功！"
          : "Password changed successfully!"
      );

    }
  );



  /* =====================================================
     DELETE ACCOUNT
  ===================================================== */

  deleteAccountButton?.addEventListener(
    "click",
    async function () {

      const confirmed =
        confirm(
          language === "zh"
            ? "确定要删除账号吗？这个操作需要进一步处理。"
            : "Are you sure you want to delete your account?"
        );


      if (!confirmed) {
        return;
      }


      alert(
        language === "zh"
          ? "为了安全起见，账号删除功能暂时需要通过服务器端处理。"
          : "For security, account deletion currently requires server-side handling."
      );

    }
  );



  /* =====================================================
     LOGOUT
  ===================================================== */

  logoutButton?.addEventListener(
    "click",
    async function (event) {

      event.stopPropagation();


      const result =
        await db.auth.signOut();


      if (result.error) {

        console.error(
          result.error
        );

        alert(
          language === "zh"
            ? "退出登录失败：" +
              result.error.message
            : "Logout failed: " +
              result.error.message
        );

        return;

      }


      currentUser = null;

      currentProfile = null;

      currentActivity = null;


      closeProfile();

      closeSettings();

      closeUsernameModal();

      closePasswordModal();

      closeAdminActivity();


      userMenu?.classList.remove(
        "active"
      );


      userMenuButton?.classList.remove(
        "active"
      );


      await updateAccountUI();


      await loadSiteUpdates();


      alert(
        language === "zh"
          ? "你已经退出登录。"
          : "You have been logged out."
      );

    }
  );



  /* =====================================================
     AUTH STATE
  ===================================================== */

  db.auth.onAuthStateChange(
    async function (
      event,
      session
    ) {

      console.log(
        "Auth event:",
        event
      );


      currentUser =
        session
          ? session.user
          : null;


      if (session) {

        await loadProfile(
          session.user
        );

      } else {

        currentProfile =
          null;

      }


      await updateAccountUI();

    }
  );



  /* =====================================================
     ESC
  ===================================================== */

  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {

        closeLogin();

        closeRegister();

        closeProfile();

        closeSettings();

        closeUsernameModal();

        closePasswordModal();

        closeAdminActivity();

      }

    }
  );



  /* =====================================================
     START
  ===================================================== */

  updateLanguage();

  await updateAccountUI();

  await loadSiteUpdates();


  console.log(
    "JNX script initialized successfully."
  );

});
