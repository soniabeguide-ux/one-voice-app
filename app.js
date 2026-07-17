// ============================================================
// One Voice — logique finale de l'application
// ============================================================

const LANGUAGES = [
  { code: "fr", label: "Français", native: "Français" },
  { code: "en", label: "Anglais", native: "English" },
];

const ICONS = {
  heartOutline: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-4.5-9.5-9C.5 8 2 4.5 5.5 4c2-.3 3.7.7 4.5 2.2C10.8 4.7 12.5 3.7 14.5 4 18 4.5 19.5 8 17.5 12 15 16.5 12 21 12 21z"/></svg>`,
  heartFilled: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-4.5-9.5-9C.5 8 2 4.5 5.5 4c2-.3 3.7.7 4.5 2.2C10.8 4.7 12.5 3.7 14.5 4 18 4.5 19.5 8 17.5 12 15 16.5 12 21 12 21z"/></svg>`,
  playlist: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>`,
  video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3"/></svg>`,
  headphones: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="7" rx="1.5"/><rect x="17" y="14" width="5" height="7" rx="1.5"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1s-.7 1-.9 1.1c-.2.1-.3.2-.6 0-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"/><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.2-1.5 1.6-1.5h1.7V3.7C15.9 3.6 14.9 3.5 13.7 3.5c-2.5 0-4.2 1.5-4.2 4.3v2.1H6.8v3.1h2.7v8h4z"/></svg>`,
  xTwitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.6 10.4L20.3 3h-1.6l-5.8 6.4L8.3 3H3l7 9.9L3 21h1.6l6.1-6.8L15.7 21H21l-7.4-10.6zm-2.2 2.4l-.7-1L5 4.2h2.4l4.5 6.4.7 1 5.9 8.3h-2.4l-4.7-6.5z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3L18.6 20c-.2 1-.9 1.2-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9L18 6.7c.4-.4-.1-.6-.6-.2L6.3 13.3l-4.8-1.5c-1-.3-1-1 .2-1.5L20.6 3.2c.8-.3 1.6.2 1.3 1.1z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2"/></svg>`,
};

const state = {
  viewStack: [],
  currentView: "onboarding-welcome",
  langTab: "fr",
  searchTheme: null,
  searchPreacherId: null,
  searchYear: null,
  searchMonth: null,
  currentMessage: null,
  playerMode: "video",
  languageReturnView: "home",
  selectedOnboardingLang: null,
  playlistDraftSelection: new Set(),
};

function allMessages() {
  return PREACHERS.flatMap((p) => p.messages.map((m) => ({ ...m, preacherId: p.id })))
    .filter((m) => new Date(m.publishedAt) >= new Date(CONTENT_CUTOFF));
}
function getPreacher(id) { return PREACHERS.find((p) => p.id === id); }
function getMessageById(id) { return allMessages().find((m) => m.id === id); }
function thumbUrl(videoId) { return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }
function initials(name) {
  return name.replace(/^(Dr|Apôtre|Apostle|Pastor|Évangéliste|Evangéliste)\s+/i, "")
    .split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}
function escapeHtml(str) { const d = document.createElement("div"); d.textContent = str || ""; return d.innerHTML; }
function computeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bonjour";
  if (h < 18) return "Bon après-midi";
  return "Bonsoir";
}

const LS = { onboarded: "ov:onboarded", language: "ov:language", favorites: "ov:favorites", playlists: "ov:playlists", history: "ov:history", theme: "ov:theme-mode" };
function readJSON(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function writeJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

function getFavorites() { return readJSON(LS.favorites, []); }
function isFavorite(messageId) { return getFavorites().some((f) => f.messageId === messageId); }
function toggleFavorite(messageId) {
  const favs = getFavorites();
  const idx = favs.findIndex((f) => f.messageId === messageId);
  if (idx >= 0) favs.splice(idx, 1); else favs.push({ messageId });
  writeJSON(LS.favorites, favs);
}
function getPlaylists() { return readJSON(LS.playlists, []); }
function savePlaylists(list) { writeJSON(LS.playlists, list); }
function createPlaylist(name, messageIds) {
  const list = getPlaylists();
  list.unshift({ id: "pl-" + Date.now(), name, messageIds: [...messageIds] });
  savePlaylists(list);
}
function getHistory() { return readJSON(LS.history, []); }
function recordHistory(messageId) {
  let h = getHistory().filter((id) => id !== messageId);
  h.unshift(messageId);
  writeJSON(LS.history, h.slice(0, 30));
}

const ONBOARDING_VIEWS = new Set(["onboarding-language", "onboarding-welcome"]);
function updateChromeVisibility(name) {
  const hideChrome = ONBOARDING_VIEWS.has(name) && state.languageReturnView !== "profile";
  document.getElementById("bottomNav").style.display = hideChrome ? "none" : "";
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) sidebar.style.display = hideChrome ? "none" : "";
}

function showView(name, { push = true } = {}) {
  if (push && state.currentView) state.viewStack.push(state.currentView);
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  const el = document.getElementById("view-" + name);
  if (el) el.classList.add("active");
  state.currentView = name;
  document.querySelectorAll("#bottomNav button, #sideNav button").forEach((b) => b.classList.toggle("active", b.dataset.nav === name));
  updateChromeVisibility(name);
  window.scrollTo(0, 0);
  RENDERERS[name] && RENDERERS[name]();
}
function navigate(name) { showView(name); }
function goBackTo(target) {
  if (target === "prev") { showView(state.viewStack.pop() || "home", { push: false }); }
  else { state.viewStack = []; showView(target, { push: false }); }
}
function resetToTab(name) { state.viewStack = []; showView(name, { push: false }); }

function renderHome() {
  document.getElementById("greetingText").textContent = computeGreeting();
  const msgs = allMessages().sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  if (msgs.length === 0) {
    document.getElementById("homeFeatured").innerHTML = `<div class="empty-state">Aucun message disponible depuis le 1er juin 2026 pour le moment.</div>`;
    document.getElementById("homeRail").innerHTML = "";
    document.getElementById("homeThemeChips").innerHTML = "";
    document.getElementById("homeSeries").innerHTML = "";
    renderHomePreacherTabs();
    return;
  }

  const featured = msgs[0];
  const recent = msgs.slice(1, 9);
  const fp = getPreacher(featured.preacherId);

  document.getElementById("homeFeatured").innerHTML = `
    <div class="section-title">À la une</div>
    <div class="featured" data-mid="${featured.id}">
      <img src="${thumbUrl(featured.videoId)}" alt="" />
      <div class="scrim">
        <span class="tag-pill">${escapeHtml(featured.theme)}</span>
        <div class="title">${escapeHtml(featured.title)}</div>
        <div class="meta">${escapeHtml(fp.name)}</div>
      </div>
    </div>`;
  document.querySelector("#homeFeatured .featured").addEventListener("click", () => openPlayer(featured));

  document.getElementById("homeRail").innerHTML = recent.map((m) => {
    const p = getPreacher(m.preacherId);
    return `<div class="rail-item" data-mid="${m.id}">
      <img src="${thumbUrl(m.videoId)}" alt="" loading="lazy" />
      <div class="title">${escapeHtml(m.title)}</div>
      <div class="preacher">${escapeHtml(p.name)}</div>
    </div>`;
  }).join("");
  document.querySelectorAll("#homeRail .rail-item").forEach((el) => el.addEventListener("click", () => openPlayer(getMessageById(el.dataset.mid))));

  document.getElementById("homeThemeChips").innerHTML = THEMES.map((t) => `<button class="chip" data-theme="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join("");
  document.querySelectorAll("#homeThemeChips .chip").forEach((btn) => btn.addEventListener("click", () => {
    state.searchTheme = btn.dataset.theme; state.searchPreacherId = null; navigate("search");
  }));

  document.getElementById("homeSeries").innerHTML = SERIES.map((s) => {
    const p = getPreacher(s.preacherId);
    const episodes = getSeriesMessages(s.id);
    return `<div class="series-row" data-sid="${s.id}">
      <img class="cover" src="${episodes[0] ? thumbUrl(episodes[0].videoId) : ""}" alt="" />
      <div><div class="title">${escapeHtml(s.title)}</div><div class="meta">${escapeHtml(p.name)} · ${episodes.length} épisode${episodes.length > 1 ? "s" : ""}</div></div>
    </div>`;
  }).join("");
  document.querySelectorAll("#homeSeries .series-row").forEach((el) => el.addEventListener("click", () => openSeries(el.dataset.sid)));

  renderHomePreacherTabs();
}
function renderHomePreacherTabs() {
  document.getElementById("tabFr").classList.toggle("active", state.langTab === "fr");
  document.getElementById("tabEn").classList.toggle("active", state.langTab === "en");
  const list = PREACHERS.filter((p) => p.language === state.langTab);
  document.getElementById("homePreacherList").innerHTML = list.map((p) => `
    <div class="p-row" data-pid="${p.id}">
      <div class="avatar">${initials(p.name)}</div>
      <div><div class="name">${escapeHtml(p.name)}</div><div class="min">${escapeHtml(p.ministry)}</div></div>
    </div>`).join("");
  document.querySelectorAll("#homePreacherList .p-row").forEach((el) => el.addEventListener("click", () => openPreacher(el.dataset.pid)));
}

function renderSearch() {
  document.getElementById("searchInput2").value = "";
  document.getElementById("filterThemeChips").innerHTML = THEMES.map(
    (t) => `<button class="chip ${state.searchTheme === t ? "active" : ""}" data-theme="${escapeHtml(t)}">${escapeHtml(t)}</button>`
  ).join("");
  document.querySelectorAll("#filterThemeChips .chip").forEach((btn) => btn.addEventListener("click", () => {
    state.searchTheme = state.searchTheme === btn.dataset.theme ? null : btn.dataset.theme; renderSearch();
  }));

  document.getElementById("filterPreacherRow").innerHTML = PREACHERS.map((p) => `
    <div class="avatar-filter ${state.searchPreacherId === p.id ? "active" : ""}" data-pid="${p.id}">
      <div class="avatar">${initials(p.name)}</div>
      <div class="label">${escapeHtml(p.name.split(" ").slice(-1)[0])}</div>
    </div>`).join("");
  document.querySelectorAll("#filterPreacherRow .avatar-filter").forEach((el) => el.addEventListener("click", () => {
    state.searchPreacherId = state.searchPreacherId === el.dataset.pid ? null : el.dataset.pid; renderSearch();
  }));

  // Filtres Année / Mois — calculés à partir des messages réellement disponibles (>= 1er juin 2026)
  const dates = allMessages().map((m) => new Date(m.publishedAt));
  const years = [...new Set(dates.map((d) => d.getFullYear()))].sort((a, b) => a - b);
  const MONTH_NAMES = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const monthsAvailable = [...new Set(
    dates.filter((d) => !state.searchYear || d.getFullYear() === state.searchYear).map((d) => d.getMonth())
  )].sort((a, b) => a - b);

  document.getElementById("filterYearChips").innerHTML = years.map(
    (y) => `<button class="chip ${state.searchYear === y ? "active" : ""}" data-year="${y}">${y}</button>`
  ).join("") || `<span class="empty-state" style="padding:0">Aucune année disponible</span>`;
  document.querySelectorAll("#filterYearChips .chip").forEach((btn) => btn.addEventListener("click", () => {
    const y = parseInt(btn.dataset.year, 10);
    state.searchYear = state.searchYear === y ? null : y;
    state.searchMonth = null; // on réinitialise le mois quand l'année change
    renderSearch();
  }));

  document.getElementById("filterMonthChips").innerHTML = monthsAvailable.map(
    (m) => `<button class="chip ${state.searchMonth === m ? "active" : ""}" data-month="${m}">${MONTH_NAMES[m]}</button>`
  ).join("") || `<span class="empty-state" style="padding:0">Aucun mois disponible</span>`;
  document.querySelectorAll("#filterMonthChips .chip").forEach((btn) => btn.addEventListener("click", () => {
    const m = parseInt(btn.dataset.month, 10);
    state.searchMonth = state.searchMonth === m ? null : m;
    renderSearch();
  }));

  runSearch();
  document.getElementById("searchInput2").addEventListener("input", runSearch);
}
function runSearch() {
  const query = (document.getElementById("searchInput2").value || "").trim().toLowerCase();
  let results = allMessages();
  if (state.searchTheme) results = results.filter((m) => m.theme === state.searchTheme);
  if (state.searchPreacherId) results = results.filter((m) => m.preacherId === state.searchPreacherId);
  if (state.searchYear) results = results.filter((m) => new Date(m.publishedAt).getFullYear() === state.searchYear);
  if (state.searchMonth !== null && state.searchMonth !== undefined) results = results.filter((m) => new Date(m.publishedAt).getMonth() === state.searchMonth);
  if (query) {
    results = results.filter((m) => {
      const p = getPreacher(m.preacherId);
      return m.title.toLowerCase().includes(query) || p.name.toLowerCase().includes(query) || m.theme.toLowerCase().includes(query);
    });
  }
  // Ordre chronologique (du plus ancien au plus récent), comme demandé
  results.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));

  document.getElementById("searchResultsTitle").textContent = `Résultats (${results.length})`;
  document.getElementById("searchResults").innerHTML = results.map((m) => messageRowHTML(m)).join("") || `<div class="empty-state">Aucun résultat pour ces critères.</div>`;
  bindMessageRows(document.getElementById("searchResults"));
}

function messageRowHTML(m, { checkbox = false } = {}) {
  const p = getPreacher(m.preacherId);
  return `<div class="message-row" data-mid="${m.id}">
    ${checkbox ? `<div class="checkbox" data-check="${m.id}"></div>` : ""}
    <img class="thumb" src="${thumbUrl(m.videoId)}" alt="" loading="lazy" />
    <div class="info"><div class="title">${escapeHtml(m.title)}</div><div class="meta">${escapeHtml(p.name)} · ${escapeHtml(m.theme)}</div></div>
    ${!checkbox ? `<button class="fav-btn" data-fav="${m.id}">${isFavorite(m.id) ? ICONS.heartFilled : ICONS.heartOutline}</button>` : ""}
  </div>`;
}
function bindMessageRows(container) {
  container.querySelectorAll(".message-row").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest(".fav-btn") || e.target.closest("[data-check]")) return;
      openPlayer(getMessageById(row.dataset.mid));
    });
  });
  container.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.fav);
      btn.innerHTML = isFavorite(btn.dataset.fav) ? ICONS.heartFilled : ICONS.heartOutline;
      if (state.currentView === "favorites") renderFavorites();
    });
  });
}

let currentPreacherId = null;
function openPreacher(id) { currentPreacherId = id; navigate("preacher"); }
function renderPreacher() {
  const p = getPreacher(currentPreacherId);
  if (!p) return;
  document.getElementById("preacherAvatar").textContent = initials(p.name);
  document.getElementById("preacherName").textContent = p.name;
  document.getElementById("preacherMeta").textContent = `${p.country} · ${p.ministry}`;
  document.getElementById("preacherBio").textContent = p.bio;
  const link = document.getElementById("preacherChannelLink");
  link.href = p.channelUrl;
  link.textContent = `Voir "${p.channelName}" sur YouTube ↗`;

  // Séries recommandées par ce prédicateur
  const preacherSeries = SERIES.filter((s) => s.preacherId === p.id);
  const seriesTitle = document.getElementById("preacherSeriesTitle");
  const seriesContainer = document.getElementById("preacherSeries");
  if (preacherSeries.length) {
    seriesTitle.style.display = "";
    seriesTitle.textContent = `Séries recommandées par ${p.name}`;
    seriesContainer.innerHTML = preacherSeries.map((s) => {
      const episodes = getSeriesMessages(s.id);
      const covers = episodes.slice(0, 4).map((ep) => `<img src="${thumbUrl(ep.videoId)}" alt="" />`).join("");
      return `<div class="series-rec-card" data-sid="${s.id}">
        <div class="covers">${covers}</div>
        <div class="info">
          <span class="badge">✦ Choisi par le prédicateur</span>
          <div class="name">${escapeHtml(s.title)}</div>
          <div class="count">${episodes.length} message${episodes.length > 1 ? "s" : ""} sélectionné${episodes.length > 1 ? "s" : ""}</div>
        </div>
      </div>`;
    }).join("");
    seriesContainer.querySelectorAll(".series-rec-card").forEach((el) => el.addEventListener("click", () => openSeries(el.dataset.sid)));
  } else {
    seriesTitle.style.display = "none";
    seriesContainer.innerHTML = "";
  }

  const available = p.messages.filter((m) => new Date(m.publishedAt) >= new Date(CONTENT_CUTOFF));
  document.getElementById("preacherMessagesTitle").textContent = `Ses messages (${available.length})`;
  const sorted = [...available].sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
  const container = document.getElementById("preacherMessages");
  container.innerHTML = sorted.length
    ? sorted.map((m) => messageRowHTML({ ...m, preacherId: p.id })).join("")
    : `<div class="empty-state">Aucun message disponible depuis le 1er juin 2026 pour le moment.</div>`;
  bindMessageRows(container);
}

let ytPlayer = null, ytApiReady = false, progressInterval = null;
window.onYouTubeIframeAPIReady = function () { ytApiReady = true; };
(function loadYT() { const tag = document.createElement("script"); tag.src = "https://www.youtube.com/iframe_api"; document.head.appendChild(tag); })();

function openPlayer(message) {
  if (!message) return;
  state.currentMessage = message;
  navigate("player");
  history.replaceState(null, "", `?m=${message.id}`);
}

function renderPlayer() {
  const m = state.currentMessage;
  if (!m) return;
  const p = getPreacher(m.preacherId);

  document.getElementById("playerTitle").textContent = m.title;
  document.getElementById("playerTitle").onclick = () => openPreacher(m.preacherId);
  document.getElementById("playerPreacher").textContent = p.name;
  document.getElementById("playerPreacher").onclick = () => openPreacher(m.preacherId);

  const favBtn = document.getElementById("playerFav");
  function refreshFav() {
    favBtn.classList.toggle("active", isFavorite(m.id));
    favBtn.innerHTML = (isFavorite(m.id) ? ICONS.heartFilled : ICONS.heartOutline) + "<span>Favori</span>";
  }
  refreshFav();
  favBtn.onclick = () => { toggleFavorite(m.id); refreshFav(); };

  const plBtn = document.getElementById("playerAddPlaylist");
  plBtn.innerHTML = ICONS.playlist + "<span>Playlist</span>";
  plBtn.onclick = () => quickAddToPlaylist(m.id);

  const modeToggle = document.getElementById("modeToggle");
  modeToggle.innerHTML = `
    <button class="mode-btn" data-mode="video">${ICONS.video}Vidéo</button>
    <button class="mode-btn" data-mode="audio">${ICONS.headphones}Audio</button>`;
  modeToggle.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === state.playerMode);
    btn.onclick = () => {
      state.playerMode = btn.dataset.mode;
      applyPlayerMode();
      modeToggle.querySelectorAll(".mode-btn").forEach((b) => b.classList.toggle("active", b.dataset.mode === state.playerMode));
      document.getElementById("bgNote").textContent = state.playerMode === "audio"
        ? "Mode audio : la vidéo est masquée, seul le son est diffusé. La lecture s'interrompt si l'écran se verrouille (limite YouTube sur mobile)."
        : "Contenu vidéo YouTube — la lecture s'interrompt si l'écran se verrouille.";
    };
  });

  const cover = document.getElementById("playerCover");
  if (!document.getElementById("ytPlayerTarget")) cover.innerHTML = `<div id="ytPlayerTarget"></div><img id="coverFallback" src="${thumbUrl(m.videoId)}" alt="" style="display:none" />`;
  document.getElementById("coverFallback").src = thumbUrl(m.videoId);
  applyPlayerMode();
  document.getElementById("bgNote").textContent = state.playerMode === "audio"
    ? "Mode audio : la vidéo est masquée, seul le son est diffusé. La lecture s'interrompt si l'écran se verrouille (limite YouTube sur mobile)."
    : "Contenu vidéo YouTube — la lecture s'interrompt si l'écran se verrouille.";

  const rateRow = document.getElementById("rateRow");
  rateRow.innerHTML = [0.75, 1, 1.25, 1.5].map((r) => `<button class="rate-chip ${r === 1 ? "active" : ""}" data-rate="${r}">${r}×</button>`).join("");
  rateRow.querySelectorAll(".rate-chip").forEach((btn) => btn.addEventListener("click", () => {
    const rate = parseFloat(btn.dataset.rate);
    ytPlayer && ytPlayer.setPlaybackRate(rate);
    rateRow.querySelectorAll(".rate-chip").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }));

  document.getElementById("playPause").onclick = () => {
    if (!ytPlayer) return;
    ytPlayer.getPlayerState() === 1 ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
  };
  document.getElementById("skipBack").onclick = () => ytPlayer && ytPlayer.seekTo(Math.max(0, ytPlayer.getCurrentTime() - 15), true);
  document.getElementById("skipFwd").onclick = () => ytPlayer && ytPlayer.seekTo(ytPlayer.getCurrentTime() + 15, true);
  document.getElementById("scrubTrack").onclick = (e) => {
    if (!ytPlayer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    ytPlayer.seekTo(ytPlayer.getDuration() * ((e.clientX - rect.left) / rect.width), true);
  };

  renderShareRow(m, p);

  function startPlayback() {
    recordHistory(m.id);
    if (progressInterval) clearInterval(progressInterval);
    progressInterval = setInterval(() => {
      if (!ytPlayer || typeof ytPlayer.getDuration !== "function") return;
      const dur = ytPlayer.getDuration() || 0, cur = ytPlayer.getCurrentTime() || 0;
      document.getElementById("scrubFill").style.width = dur ? `${(cur / dur) * 100}%` : "0%";
      document.getElementById("timeElapsed").textContent = formatSeconds(cur);
      document.getElementById("timeTotal").textContent = formatSeconds(dur);
      document.getElementById("playPause").innerHTML = ytPlayer.getPlayerState() === 1
        ? '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l15 8-15 8z"/></svg>';
    }, 500);
  }

  if (!ytApiReady || typeof YT === "undefined") { setTimeout(renderPlayer, 200); return; }

  if (!ytPlayer) {
    ytPlayer = new YT.Player("ytPlayerTarget", {
      videoId: m.videoId,
      playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1 },
      events: { onReady: (e) => { e.target.playVideo(); startPlayback(); } },
    });
  } else {
    ytPlayer.loadVideoById(m.videoId);
    startPlayback();
  }
}

function applyPlayerMode() {
  const cover = document.getElementById("playerCover");
  const fallback = document.getElementById("coverFallback");
  cover.classList.toggle("audio-mode", state.playerMode === "audio");
  if (fallback) fallback.style.display = state.playerMode === "audio" ? "block" : "none";
}

function formatSeconds(s) { s = Math.floor(s || 0); return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`; }

function quickAddToPlaylist(messageId) {
  const playlists = getPlaylists();
  const names = playlists.map((p, i) => `${i + 1}. ${p.name}`).join("\n");
  const choice = prompt((names ? names + "\n\n" : "") + "Tape le numéro d'une playlist existante, ou un nouveau nom pour en créer une :");
  if (!choice) return;
  const asIndex = parseInt(choice, 10);
  if (!isNaN(asIndex) && playlists[asIndex - 1]) {
    const pl = playlists[asIndex - 1];
    if (!pl.messageIds.includes(messageId)) pl.messageIds.push(messageId);
    savePlaylists(playlists);
  } else {
    createPlaylist(choice.trim(), [messageId]);
  }
}

function shareUrlFor(message) {
  const url = new URL(window.location.href);
  url.search = `?m=${message.id}`;
  return url.toString();
}
function shareTextFor(message, preacher) {
  return `"${message.title}" — ${preacher.name}. Retrouve ce message sur l'application One Voice disponible gratuitement.`;
}
function renderShareRow(message, preacher) {
  const url = shareUrlFor(message);
  const text = shareTextFor(message, preacher);
  const row = document.getElementById("shareRow");

  const links = [
    { icon: ICONS.whatsapp, href: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}` },
    { icon: ICONS.facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}` },
    { icon: ICONS.xTwitter, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
    { icon: ICONS.telegram, href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` },
  ];

  row.innerHTML = links.map((l) => `<a class="share-btn" href="${l.href}" target="_blank" rel="noopener" title="Partager">${l.icon}</a>`).join("")
    + `<button class="share-btn" id="shareCopyBtn" title="Copier le lien">${ICONS.link}</button>`;

  document.getElementById("shareCopyBtn").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(`${text} ${url}`); showToast("Lien copié !"); }
    catch { showToast("Impossible de copier — copie manuellement l'adresse."); }
  });
}
function showToast(text) {
  const toast = document.getElementById("shareToast");
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

let currentSeriesId = null;
function openSeries(id) { currentSeriesId = id; navigate("series"); }
function renderSeries() {
  const s = SERIES.find((x) => x.id === currentSeriesId);
  if (!s) return;
  const p = getPreacher(s.preacherId);
  const episodes = getSeriesMessages(s.id);
  document.getElementById("seriesCover").src = episodes[0] ? thumbUrl(episodes[0].videoId) : "";
  document.getElementById("seriesTheme").textContent = s.theme;
  document.getElementById("seriesTitle").textContent = s.title;
  document.getElementById("seriesPreacher").textContent = p.name;
  document.getElementById("seriesDescription").textContent = s.description;
  document.getElementById("seriesEpisodes").innerHTML = episodes.map((ep, i) => `
    <div class="episode-row" data-mid="${ep.id}">
      <div class="ep-number">E${ep.episodeNumber || i + 1}</div>
      <div class="info"><div class="title">${escapeHtml(ep.title)}</div></div>
    </div>`).join("");
  document.querySelectorAll("#seriesEpisodes .episode-row").forEach((el) => el.addEventListener("click", () => openPlayer(getMessageById(el.dataset.mid))));
}

function renderPlaylists() {
  const list = getPlaylists();
  const container = document.getElementById("playlistsList");
  container.innerHTML = list.length ? list.map((pl) => `
    <div class="playlist-card" data-plid="${pl.id}">
      <div class="cover"></div>
      <div><div class="title">${escapeHtml(pl.name)}</div><div class="count">${pl.messageIds.length} message${pl.messageIds.length > 1 ? "s" : ""}</div></div>
    </div>`).join("") : `<div class="empty-state">Aucune playlist pour l'instant.</div>`;
  container.querySelectorAll(".playlist-card").forEach((el) => el.addEventListener("click", () => openPlaylistDetail(el.dataset.plid)));
}
let currentPlaylistId = null;
function openPlaylistDetail(id) { currentPlaylistId = id; navigate("playlist-detail"); }
function renderPlaylistDetail() {
  const pl = getPlaylists().find((p) => p.id === currentPlaylistId);
  if (!pl) return;
  document.getElementById("playlistDetailTitle").textContent = pl.name;
  const msgs = pl.messageIds.map(getMessageById).filter(Boolean);
  const container = document.getElementById("playlistDetailMessages");
  container.innerHTML = msgs.map((m) => messageRowHTML(m)).join("") || `<div class="empty-state">Playlist vide.</div>`;
  bindMessageRows(container);
}
function renderPlaylistCreate() {
  state.playlistDraftSelection = new Set();
  document.getElementById("playlistNameInput").value = "";
  updatePlaylistCreateUI();
  const container = document.getElementById("playlistMessageChecklist");
  container.innerHTML = allMessages().map((m) => messageRowHTML(m, { checkbox: true })).join("");
  container.querySelectorAll(".message-row").forEach((row) => row.addEventListener("click", () => {
    const id = row.dataset.mid;
    state.playlistDraftSelection.has(id) ? state.playlistDraftSelection.delete(id) : state.playlistDraftSelection.add(id);
    row.querySelector("[data-check]").classList.toggle("checked", state.playlistDraftSelection.has(id));
    updatePlaylistCreateUI();
  }));
  document.getElementById("playlistNameInput").oninput = updatePlaylistCreateUI;
}
function updatePlaylistCreateUI() {
  const count = state.playlistDraftSelection.size;
  document.getElementById("playlistSelectedCount").textContent = `${count} message${count > 1 ? "s" : ""} sélectionné${count > 1 ? "s" : ""}`;
  const name = document.getElementById("playlistNameInput").value.trim();
  document.getElementById("btnConfirmCreatePlaylist").disabled = !(name && count > 0);
}

function renderFavorites() {
  const favs = getFavorites().map((f) => getMessageById(f.messageId)).filter(Boolean);
  const container = document.getElementById("favoritesList");
  container.innerHTML = favs.length ? favs.map((m) => messageRowHTML(m)).join("") : `<div class="empty-state">Appuie sur le cœur d'un message pour l'ajouter ici.</div>`;
  bindMessageRows(container);
}

function renderProfile() {
  document.getElementById("statFavorites").textContent = getFavorites().length;
  document.getElementById("statPlaylists").textContent = getPlaylists().length;
  document.getElementById("statHistory").textContent = getHistory().length;
  const lang = localStorage.getItem(LS.language) || "fr";
  const langObj = LANGUAGES.find((l) => l.code === lang);
  document.getElementById("profileLanguageValue").textContent = langObj ? langObj.label : "Français";
  if (!document.getElementById("profileSince").textContent) document.getElementById("profileSince").textContent = `Membre depuis ${new Date().getFullYear()}`;
  const hist = getHistory().map(getMessageById).filter(Boolean);
  const container = document.getElementById("historyList");
  container.innerHTML = hist.length ? hist.map((m) => messageRowHTML(m)).join("") : `<div class="empty-state">Aucune écoute récente.</div>`;
  bindMessageRows(container);
}

function renderOnboardingLanguage() {
  document.getElementById("langRadioList").innerHTML = LANGUAGES.map((l) => `
    <div class="lang-radio-row" data-code="${l.code}">
      <div class="left"><div class="radio-dot ${state.selectedOnboardingLang === l.code ? "checked" : ""}"></div><span>${l.label}</span></div>
      <span class="lang-native">${l.native}</span>
    </div>`).join("");
  document.querySelectorAll("#langRadioList .lang-radio-row").forEach((row) => row.addEventListener("click", () => {
    state.selectedOnboardingLang = row.dataset.code;
    renderOnboardingLanguage();
    document.getElementById("btnLanguageContinue").disabled = false;
  }));
  document.getElementById("btnLanguageContinue").disabled = !state.selectedOnboardingLang;
}

function applyScheme(scheme) { document.body.setAttribute("data-scheme", scheme); refreshToggleButtons(); }
function refreshToggleButtons() {
  const scheme = document.body.getAttribute("data-scheme");
  const mode = localStorage.getItem(LS.theme) || "auto";
  const label = mode === "auto" ? "Auto" : scheme === "dusk" ? "Nuit" : "Jour";
  ["themeToggle", "themeToggle2"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = (scheme === "dusk" ? ICONS.moon : ICONS.sun) + `<span>${label}</span>`;
  });
}
function computeAutoScheme(lat, lng) {
  try {
    const times = SunCalc.getTimes(new Date(), lat, lng);
    const now = new Date();
    return now >= times.sunrise && now < times.sunset ? "matin" : "dusk";
  } catch { const h = new Date().getHours(); return h >= 7 && h < 20 ? "matin" : "dusk"; }
}
function refreshTheme() {
  const mode = localStorage.getItem(LS.theme) || "auto";
  if (mode !== "auto") { applyScheme(mode === "dusk" ? "dusk" : "matin"); return; }
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => applyScheme(computeAutoScheme(pos.coords.latitude, pos.coords.longitude)),
      () => applyScheme(computeAutoScheme(null, null)),
      { timeout: 5000, maximumAge: 15 * 60 * 1000 }
    );
  } else applyScheme(computeAutoScheme(null, null));
}
function setupThemeToggle(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  let timer;
  btn.addEventListener("click", () => {
    const next = document.body.getAttribute("data-scheme") === "dusk" ? "matin" : "dusk";
    localStorage.setItem(LS.theme, next);
    refreshTheme();
  });
  btn.addEventListener("mousedown", () => { timer = setTimeout(() => { localStorage.setItem(LS.theme, "auto"); refreshTheme(); }, 600); });
  ["mouseup", "mouseleave", "touchend"].forEach((evt) => btn.addEventListener(evt, () => clearTimeout(timer)));
}

const RENDERERS = {
  home: renderHome, search: renderSearch, preacher: renderPreacher, player: renderPlayer, series: renderSeries,
  playlists: renderPlaylists, "playlist-create": renderPlaylistCreate, "playlist-detail": renderPlaylistDetail,
  favorites: renderFavorites, profile: renderProfile, "onboarding-language": renderOnboardingLanguage,
};

function init() {
  refreshTheme();
  setupThemeToggle("themeToggle");
  setupThemeToggle("themeToggle2");
  setInterval(() => { if ((localStorage.getItem(LS.theme) || "auto") === "auto") refreshTheme(); }, 15 * 60 * 1000);
  setInterval(() => { if (state.currentView === "home") document.getElementById("greetingText").textContent = computeGreeting(); }, 5 * 60 * 1000);

  document.getElementById("btnStart").addEventListener("click", () => {
    localStorage.setItem(LS.onboarded, "true");
    resetToTab("home");
    if (state.pendingSharedMessageId) { openPlayer(getMessageById(state.pendingSharedMessageId)); state.pendingSharedMessageId = null; }
  });
  document.getElementById("btnLanguageContinue").addEventListener("click", () => {
    localStorage.setItem(LS.language, state.selectedOnboardingLang);
    if (state.languageReturnView === "profile") {
      resetToTab("profile");
    } else {
      navigate("onboarding-welcome");
    }
  });

  document.querySelectorAll("#bottomNav button, #sideNav button").forEach((btn) => btn.addEventListener("click", () => resetToTab(btn.dataset.nav)));
  document.querySelectorAll("[data-back]").forEach((btn) => btn.addEventListener("click", () => goBackTo(btn.dataset.back)));

  document.getElementById("tabFr").addEventListener("click", () => { state.langTab = "fr"; renderHomePreacherTabs(); });
  document.getElementById("tabEn").addEventListener("click", () => { state.langTab = "en"; renderHomePreacherTabs(); });
  document.getElementById("searchInput").addEventListener("focus", () => navigate("search"));

  document.getElementById("menuPlaylists").addEventListener("click", () => navigate("playlists"));
  document.getElementById("menuLanguage").addEventListener("click", () => { state.languageReturnView = "profile"; navigate("onboarding-language"); });
  document.getElementById("menuAbout").addEventListener("click", () => navigate("about"));

  document.getElementById("btnCreatePlaylist").addEventListener("click", () => navigate("playlist-create"));
  document.getElementById("btnConfirmCreatePlaylist").addEventListener("click", () => {
    const name = document.getElementById("playlistNameInput").value.trim();
    if (!name || state.playlistDraftSelection.size === 0) return;
    createPlaylist(name, Array.from(state.playlistDraftSelection));
    goBackTo("playlists");
    renderPlaylists();
  });

  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
  setupInstallPrompt();
  loadRemoteMessages();

  const params = new URLSearchParams(window.location.search);
  const sharedId = params.get("m");
  const sharedMessage = sharedId && getMessageById(sharedId);
  const hasLanguage = !!localStorage.getItem(LS.language);
  const hasOnboarded = localStorage.getItem(LS.onboarded) === "true";

  if (hasLanguage && hasOnboarded) {
    resetToTab("home");
    if (sharedMessage) openPlayer(sharedMessage);
  } else if (hasLanguage) {
    if (sharedMessage) state.pendingSharedMessageId = sharedMessage.id;
    initialShowView("onboarding-welcome");
  } else {
    if (sharedMessage) state.pendingSharedMessageId = sharedMessage.id;
    initialShowView("onboarding-language");
  }
}

// Affiche la toute première vue au chargement de l'app (sans passer par
// la pile de navigation) et exécute bien son rendu — contrairement à un
// simple changement de `state.currentView`, qui ne suffit pas.
function initialShowView(name) {
  state.currentView = name;
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  const el = document.getElementById("view-" + name);
  if (el) el.classList.add("active");
  updateChromeVisibility(name);
  RENDERERS[name] && RENDERERS[name]();
}

// ============================================================
// POP-UP D'INSTALLATION PWA
// ============================================================
let deferredInstallPrompt = null;
function isIos() { return /iphone|ipad|ipod/i.test(navigator.userAgent); }
function isInStandaloneMode() { return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true; }

function setupInstallPrompt() {
  const popup = document.getElementById("installPrompt");
  const closeBtn = document.getElementById("installClose");
  const actionBtn = document.getElementById("installAction");
  const titleEl = document.getElementById("installTitle");
  const bodyEl = document.getElementById("installBody");

  if (isInStandaloneMode() || localStorage.getItem("ov:install-dismissed") === "true") return;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    showInstallPopup();
  });

  if (isIos()) {
    // iOS/Safari : Apple ne permet pas de déclencher l'installation par script.
    // On affiche des instructions claires pour "Sur l'écran d'accueil".
    titleEl.textContent = "Installer One Voice";
    bodyEl.textContent = "Appuie sur le bouton Partager de Safari, puis choisis \"Sur l'écran d'accueil\" pour installer One Voice.";
    actionBtn.textContent = "J'ai compris";
    actionBtn.onclick = () => hideInstallPopup(true);
    setTimeout(showInstallPopup, 2000);
  }

  closeBtn.addEventListener("click", () => hideInstallPopup(true));

  function showInstallPopup() { popup.classList.remove("hidden"); }
  window._showInstallPopup = showInstallPopup;

  actionBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    hideInstallPopup(false);
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    if (choice.outcome !== "accepted") localStorage.removeItem("ov:install-dismissed");
  });
}
function hideInstallPopup(remember) {
  document.getElementById("installPrompt").classList.add("hidden");
  if (remember) localStorage.setItem("ov:install-dismissed", "true");
}

// ============================================================
// CONTENU DYNAMIQUE (ingestion quotidienne, si le backend est déployé)
// ============================================================
async function loadRemoteMessages() {
  // 1) messages.json — produit par le script de rattrapage (API YouTube).
  //    C'est la source la plus complète : elle remplace le contenu statique
  //    de data.js pour les prédicateurs qu'elle couvre.
  try {
    const res = await fetch("messages.json", { cache: "no-cache" });
    if (res.ok) {
      const backfilled = await res.json();
      if (Array.isArray(backfilled) && backfilled.length) {
        const covered = new Set(backfilled.map((m) => m.preacherId));
        PREACHERS.forEach((p) => { if (covered.has(p.id)) p.messages = []; });
        backfilled.forEach((m) => {
          const p = getPreacher(m.preacherId);
          if (p && !p.messages.some((x) => x.videoId === m.videoId)) p.messages.push(m);
        });
      }
    }
  } catch {
    // Pas de messages.json : on garde le contenu statique de data.js
  }

  // 2) Fonction planifiée Netlify — ajoute les nouvelles vidéos du jour
  try {
    const res = await fetch("/.netlify/functions/get-messages");
    if (res.ok) {
      const remote = await res.json();
      if (Array.isArray(remote)) {
        remote.forEach((rm) => {
          const p = getPreacher(rm.preacherId);
          if (p && !p.messages.some((m) => m.videoId === rm.videoId)) p.messages.push(rm);
        });
      }
    }
  } catch {
    // Backend non déployé : l'app fonctionne avec ce qui est déjà chargé
  }

  if (state.currentView === "home") renderHome();
  if (state.currentView === "search") renderSearch();
}

document.addEventListener("DOMContentLoaded", init);
