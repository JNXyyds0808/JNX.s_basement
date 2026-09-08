document.addEventListener('DOMContentLoaded', async () => {
  const SUPABASE_URL = 'https://qdehfgjifhtczkrpuadl.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_ChrvUYG2OES6q2kCpkBJcA_uaAmfOVp';
  const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const authGate = document.getElementById('authGate');
  const archiveApp = document.getElementById('archiveApp');
  const accountName = document.getElementById('accountName');
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

  const fmtDate = value => {
    if (!value) return '日期待补';
    const [y,m,d] = value.split('-');
    return `${y}/${Number(m)}/${Number(d)}`;
  };

  const normalize = value => (value || '').toString().toLowerCase();

  const getUserLabel = user =>
    user?.user_metadata?.display_name ||
    user?.user_metadata?.username ||
    user?.email?.split('@')[0] ||
    'JNX User';

  const showLoggedOut = () => {
    authGate.hidden = false;
    archiveApp.hidden = true;
    accountName.textContent = '';
  };

  const showLoggedIn = async user => {
    authGate.hidden = true;
    archiveApp.hidden = false;
    accountName.textContent = getUserLabel(user);
    await loadArchive();
  };

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

  function render() {
    const q = normalize(searchInput.value.trim());
    const year = yearFilter.value;
    const series = seriesFilter.value;

    const filtered = records.filter(record => {
      if (year && !record.published_date?.startsWith(year)) return false;
      if (!matchesSeries(record, series)) return false;
      if (!q) return true;
      const haystack = [
        record.title,
        record.location,
        record.content,
        record.content_type,
        record.series_name,
        record.preserve_level,
        ...(record.keywords || [])
      ].map(normalize).join('\n');
      return haystack.includes(q);
    });

    resultCount.textContent = `共 ${filtered.length} 篇`;
    emptyState.hidden = filtered.length !== 0;
    articleList.innerHTML = filtered.map(record => {
      const number = record.series_number ? `#${String(record.series_number).padStart(3,'0')}` : '非编号';
      const chips = (record.keywords || []).slice(0,4).map(k=>`<span class="chip">${escapeHtml(k)}</span>`).join('');
      const snippet = (record.content || '').replace(/\s+/g,' ').trim();
      return `
        <button class="article-card" type="button" data-id="${record.id}">
          <div class="article-top">
            <span>${escapeHtml(fmtDate(record.published_date))} · ${escapeHtml(number)}</span>
            <span class="preserve">${escapeHtml(record.preserve_level || '')}</span>
          </div>
          <h2>${escapeHtml(record.title)}</h2>
          ${record.location ? `<div class="article-location">📍 ${escapeHtml(record.location)}</div>` : ''}
          <div class="article-snippet">${escapeHtml(snippet)}</div>
          <div class="chips">${chips}</div>
        </button>`;
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

  articleList.addEventListener('click', event => {
    const card = event.target.closest('.article-card');
    if (!card) return;
    const record = records.find(r => String(r.id) === card.dataset.id);
    if (record) openRecord(record);
  });

  [searchInput, yearFilter, seriesFilter].forEach(el => el.addEventListener(el === searchInput ? 'input' : 'change', render));
  clearFilters.addEventListener('click', () => {
    searchInput.value = '';
    yearFilter.value = '';
    seriesFilter.value = '';
    render();
  });
  closeDialog.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  const { data: { user } } = await db.auth.getUser();
  if (user) await showLoggedIn(user);
  else showLoggedOut();

  db.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) await showLoggedIn(session.user);
    else showLoggedOut();
  });
});
