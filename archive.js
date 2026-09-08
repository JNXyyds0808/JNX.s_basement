document.addEventListener('DOMContentLoaded', async () => {
  const SUPABASE_URL = 'https://qdehfgjifhtczkrpuadl.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp';
  const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const authGate = document.getElementById('authGate');
  const archiveApp = document.getElementById('archiveApp');
  const accountName = document.getElementById('accountName');
  const loginUsername = document.getElementById('archiveLoginUsername');
  const loginPassword = document.getElementById('archiveLoginPassword');
  const loginButton = document.getElementById('archiveLoginButton');
  const loginStatus = document.getElementById('archiveLoginStatus');
  const searchInput = document.getElementById('searchInput');
  const yearFilter = document.getElementById('yearFilter');
  const seriesFilter = document.getElementById('seriesFilter');
  const clearFilters = document.getElementById('clearFilters');
  const resultCount = document.getElementById('resultCount');
  const articleList = document.getElementById('articleList');
  const emptyState = document.getElementById('emptyState');
  const dialog = document.getElementById('articleDialog');
  const closeDialog = document.getElementById('closeDialog');
  const readerMeta = document.getElementById('readerMeta');
  const readerTitle = document.getElementById('readerTitle');
  const readerTags = document.getElementById('readerTags');
  const readerContent = document.getElementById('readerContent');
  const readerNotesWrap = document.getElementById('readerNotesWrap');
  const readerNotes = document.getElementById('readerNotes');

  let records = [];
  let loadedForUserId = null;

  const fmtDate = value => {
    if (!value) return '日期待补';
    const [y,m,d] = value.split('-');
    return `${y}/${Number(m)}/${Number(d)}`;
  };

  const normalize = value => (value || '').toString().toLowerCase().trim();
  const usernameToEmail = username => `${username.toLowerCase().trim()}@jnx.local`;
  const getUserLabel = user => user?.user_metadata?.display_name || user?.user_metadata?.username || user?.email?.split('@')[0] || 'JNX User';

  function showLoggedOut() {
    authGate.hidden = false;
    archiveApp.hidden = true;
    accountName.textContent = '';
    loadedForUserId = null;
  }

  async function showLoggedIn(user) {
    authGate.hidden = true;
    archiveApp.hidden = false;
    accountName.textContent = getUserLabel(user);
    if (loadedForUserId !== user.id) {
      loadedForUserId = user.id;
      await loadArchive();
    }
  }

  async function loadArchive() {
    resultCount.textContent = '正在读取档案…';
    const { data, error } = await db
      .from('wentao_writing_archive')
      .select('id,published_date,series_name,series_number,title,location,content,content_type,keywords,preserve_level,notes,source')
      .order('published_date', { ascending: false, nullsFirst: false })
      .order('id', { ascending: false });

    if (error) {
      console.error(error);
      resultCount.textContent = '读取失败';
      articleList.innerHTML = '<div class="empty-state">无法读取档案，请确认账号权限后重试。</div>';
      return;
    }

    records = data || [];
    const years = [...new Set(records.map(r => r.published_date?.slice(0,4)).filter(Boolean))].sort((a,b)=>b.localeCompare(a));
    yearFilter.innerHTML = '<option value="">全部年份</option>' + years.map(y=>`<option value="${y}">${y}</option>`).join('');
    render();
  }

  function matchesSeries(record, filter) {
    if (!filter) return true;
    if (filter === '寻味之旅') return (record.series_name || '').startsWith('寻味之旅');
    return record.series_name === filter;
  }

  function getSearchTerms(raw) {
    const clean = normalize(raw);
    if (!clean) return [];
    return clean.split(/\s+/).filter(Boolean);
  }

  function scoreTerm(record, term) {
    const title = normalize(record.title);
    const location = normalize(record.location);
    const keywords = (record.keywords || []).map(normalize);
    const content = normalize(record.content);

    let metaScore = 0;
    let bodyScore = 0;

    // Highest-priority fields: title, location, keywords.
    if (title === term) metaScore += 1200;
    else if (title.startsWith(term)) metaScore += 1000;
    else if (title.includes(term)) metaScore += 850;

    if (location === term) metaScore += 1100;
    else if (location.startsWith(term)) metaScore += 950;
    else if (location.includes(term)) metaScore += 800;

    if (keywords.some(k => k === term)) metaScore += 1100;
    else if (keywords.some(k => k.startsWith(term))) metaScore += 950;
    else if (keywords.some(k => k.includes(term))) metaScore += 800;

    // Body is searchable, but deliberately much weaker.
    if (content.includes(term)) bodyScore += 40;

    return {
      matched: metaScore > 0 || bodyScore > 0,
      metaScore,
      bodyScore
    };
  }

  function scoreRecord(record, terms) {
    if (!terms.length) return { matched: true, tier: 0, score: 0 };

    let totalMeta = 0;
    let totalBody = 0;
    let metadataTerms = 0;

    for (const term of terms) {
      const part = scoreTerm(record, term);
      // Every word typed by the user must appear somewhere in the record.
      if (!part.matched) return { matched: false, tier: 99, score: 0 };
      if (part.metaScore > 0) metadataTerms += 1;
      totalMeta += part.metaScore;
      totalBody += part.bodyScore;
    }

    // Tier 0: every search term appears in title/location/keywords.
    // Tier 1: at least one term appears in title/location/keywords.
    // Tier 2: body-only match. This guarantees metadata matches come first.
    const tier = metadataTerms === terms.length ? 0 : metadataTerms > 0 ? 1 : 2;
    return {
      matched: true,
      tier,
      score: totalMeta + totalBody
    };
  }

  function render() {
    const terms = getSearchTerms(searchInput.value);
    const year = yearFilter.value;
    const series = seriesFilter.value;

    const filtered = records
      .map((record, originalIndex) => {
        const search = scoreRecord(record, terms);
        return { record, originalIndex, ...search };
      })
      .filter(item => {
        const record = item.record;
        if (year && !record.published_date?.startsWith(year)) return false;
        if (!matchesSeries(record, series)) return false;
        return item.matched;
      })
      .sort((a, b) => {
        if (terms.length) {
          if (a.tier !== b.tier) return a.tier - b.tier;
          if (a.score !== b.score) return b.score - a.score;
        }
        // Preserve the original newest-to-oldest database order as tie-breaker.
        return a.originalIndex - b.originalIndex;
      })
      .map(item => item.record);

    resultCount.textContent = `共 ${filtered.length} 篇`;
    emptyState.hidden = filtered.length !== 0;
    articleList.innerHTML = filtered.map(record => {
      const number = record.series_number ? `#${String(record.series_number).padStart(3,'0')}` : '非编号';
      const chips = (record.keywords || []).slice(0,4).map(k=>`<span class="chip">${escapeHtml(k)}</span>`).join('');
      const snippet = (record.content || '').replace(/\s+/g,' ').trim();
      return `<button class="article-card" type="button" data-id="${record.id}"><div class="article-top"><span>${escapeHtml(fmtDate(record.published_date))} · ${escapeHtml(number)}</span><span class="preserve">${escapeHtml(record.preserve_level || '')}</span></div><h2>${escapeHtml(record.title)}</h2>${record.location ? `<div class="article-location">📍 ${escapeHtml(record.location)}</div>` : ''}<div class="article-snippet">${escapeHtml(snippet)}</div><div class="chips">${chips}</div></button>`;
    }).join('');
  }

  function openRecord(record) {
    const number = record.series_number ? `#${String(record.series_number).padStart(3,'0')}` : '非编号';
    readerMeta.textContent = [fmtDate(record.published_date), number, record.series_name, record.location].filter(Boolean).join(' · ');
    readerTitle.textContent = record.title;
    readerTags.innerHTML = (record.keywords || []).map(k=>`<span class="chip">${escapeHtml(k)}</span>`).join('');
    readerContent.textContent = record.content || '';
    if (record.notes) {
      readerNotesWrap.hidden = false;
      readerNotes.textContent = record.notes;
    } else {
      readerNotesWrap.hidden = true;
      readerNotes.textContent = '';
    }
    dialog.showModal();
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  async function tryExistingSession() {
    const { data: sessionData } = await db.auth.getSession();
    if (sessionData?.session?.user) {
      await showLoggedIn(sessionData.session.user);
      return true;
    }
    const { data: userData } = await db.auth.getUser();
    if (userData?.user) {
      await showLoggedIn(userData.user);
      return true;
    }
    showLoggedOut();
    return false;
  }

  async function loginHere() {
    const username = loginUsername.value.trim();
    const password = loginPassword.value;
    if (!username || !password) {
      loginStatus.textContent = '请输入用户名和密码。';
      return;
    }
    loginButton.disabled = true;
    loginStatus.textContent = '正在登录…';
    const { data, error } = await db.auth.signInWithPassword({ email: usernameToEmail(username), password });
    loginButton.disabled = false;
    if (error) {
      console.error(error);
      loginStatus.textContent = '用户名或密码不正确。';
      return;
    }
    loginStatus.textContent = '';
    if (data?.user) await showLoggedIn(data.user);
  }

  articleList.addEventListener('click', event => {
    const card = event.target.closest('.article-card');
    if (!card) return;
    const record = records.find(r => String(r.id) === card.dataset.id);
    if (record) openRecord(record);
  });

  searchInput.addEventListener('input', render);
  yearFilter.addEventListener('change', render);
  seriesFilter.addEventListener('change', render);
  clearFilters.addEventListener('click', () => {
    searchInput.value = '';
    yearFilter.value = '';
    seriesFilter.value = '';
    render();
  });
  closeDialog.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  loginButton.addEventListener('click', loginHere);
  loginPassword.addEventListener('keydown', e => { if (e.key === 'Enter') loginHere(); });

  await tryExistingSession();
  db.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) await showLoggedIn(session.user);
    else showLoggedOut();
  });
});
