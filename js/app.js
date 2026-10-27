/* =========================================================
   Deutsch Lernen — үндсэн програм
   ========================================================= */
(function () {
  'use strict';
  const D = window.DL_DATA;
  const CFG = window.APP_CONFIG;

  /* ---------------- Туслах функцууд ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const sample = (a, n) => shuffle(a).slice(0, n);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const pad = n => String(n).padStart(2, '0');
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const addDays = (k, n) => { const [y, m, d] = k.split('-').map(Number); const dt = new Date(y, m - 1, d + n); return dayKey(dt); };
  const today = () => dayKey();
  const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Дүрс тэмдэг ---------------- */
  const P = {
    home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
    book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7M8 11h7',
    pencil: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
    cards: 'M5 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM7 3h12a2 2 0 0 1 2 2v12',
    game: 'M2 13a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v1a4 4 0 0 1-7 2.6l-.6-.6H9.6l-.6.6A4 4 0 0 1 2 14zM6 12h4M8 10v4M15 11h.01M18 13h.01',
    alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
    chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
    flame: 'M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 2-5 5-5 8 0 4 3 7 7 7z',
    bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
    speaker: 'M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14',
    mute: 'M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6',
    check: 'M20 6 9 17l-5-5',
    x: 'M18 6 6 18M6 6l12 12',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    back: 'M19 12H5M11 18l-6-6 6-6',
    refresh: 'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5',
    trophy: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3',
    minimize: 'M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7',
    maximize: 'M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7',
    shuffle: 'M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5',
    keyboard: 'M2 6h20v12H2zM6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10',
    target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    rain: 'M8 19v2M12 19v2M16 19v2M20 16.6A5 5 0 0 0 18 7h-1.3A8 8 0 1 0 4 15.3',
    puzzle: 'M4 7h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    swap: 'M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
    sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
    bulb: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z',
    layers: 'M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
  };
  const icon = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n] || ''}"/></svg>`;
  const starSvg = on => `<svg viewBox="0 0 24 24" class="${on ? '' : 'off'}" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.8 1.2 6.9L12 17.8 5.8 21 7 14.1 2 9.3l6.9-1z"/></svg>`;
  const heartSvg = on => `<svg viewBox="0 0 24 24" class="${on ? '' : 'off'}" fill="currentColor" aria-hidden="true"><path d="M12 21s-7-4.4-9.3-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.3 6c-2.3 4.6-9.3 9-9.3 9z"/></svg>`;

  /* ---------------- Хадгалалт ---------------- */
  const KEY0 = 'deutsch-lernen-v1';
  let KEY = KEY0;
  let USER = { id: 'local', name: CFG.userName || 'Lernende' };
  const DEFAULTS = {
    xp: 0, streak: 0, lastDay: null, daily: {}, srs: {}, lessons: {}, workbook: {}, mistakes: [], badges: [], games: {},
    stats: { answered: 0, correct: 0, bestCombo: 0 },
    settings: { voice: true, rate: 0.92, voiceName: '', mini: false, cardDir: 'de' }
  };
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        return Object.assign({}, DEFAULTS, s, { stats: Object.assign({}, DEFAULTS.stats, s.stats), settings: Object.assign({}, DEFAULTS.settings, s.settings) });
      }
    } catch (e) { /* хадгалах боломжгүй */ }
    return JSON.parse(JSON.stringify(DEFAULTS));
  }
  let S = null;
  let saveHook = null;
  function save() {
    if (!S) return;
    S.updatedAt = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
    if (saveHook) saveHook(S, { name: USER.name, xp: S.xp, level: levelOf(S.xp), streak: currentStreak(), lastDay: S.lastDay, words: learnedCount(), verbs: D.IRREG.filter(v => ((S.srs[v.wid] || {}).box || 0) >= 3).length });
  }

  /* ---------------- Түвшин ба XP ---------------- */
  const levelOf = xp => Math.floor((1 + Math.sqrt(1 + xp / 12.5)) / 2);
  const xpForLevel = L => 50 * L * (L - 1);
  const TITLES = ['Anfänger', 'Entdecker', 'Lernende', 'Fortgeschritten', 'Profi', 'B2-Kandidat', 'Sprachtalent', 'Meister', 'Großmeister'];
  const titleOf = L => TITLES[Math.min(TITLES.length - 1, L - 1)];
  function currentStreak() {
    if (!S.lastDay) return 0;
    if (S.lastDay === today() || S.lastDay === addDays(today(), -1)) return S.streak;
    return 0;
  }
  function addXP(n, anchor) {
    if (n <= 0) return;
    const before = levelOf(S.xp);
    const t = today();
    const goalBefore = (S.daily[t] || 0) >= CFG.dailyGoalXP;
    if (S.lastDay !== t) {
      S.streak = S.lastDay === addDays(t, -1) ? S.streak + 1 : 1;
      S.lastDay = t;
    }
    S.xp += n;
    S.daily[t] = (S.daily[t] || 0) + n;
    save();
    floatXP(n, anchor);
    const after = levelOf(S.xp);
    if (after > before) {
      toast(`Level ${after} · ${titleOf(after)}!`);
      confetti();
      teacherSay(`Level ${after}! Glückwunsch!`, `${after}-р түвшинд хүрлээ! Баяр хүргэе!`, 'happy');
    }
    if (!goalBefore && S.daily[t] >= CFG.dailyGoalXP) {
      toast('Өдрийн зорилго биеллээ!');
      confetti();
    }
    checkBadges();
    refreshChrome();
  }
  function floatXP(n, anchor) {
    const el = document.createElement('div');
    el.className = 'xp-float';
    el.textContent = `+${n} XP`;
    let x = innerWidth / 2, y = innerHeight / 2;
    if (anchor && anchor.getBoundingClientRect) { const r = anchor.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top; }
    el.style.left = (x - 30) + 'px'; el.style.top = (y - 10) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  /* ---------------- Тэмдэгүүд (badges) ---------------- */
  const learnedCount = () => Object.values(S.srs).filter(r => r.box >= 3).length;
  const lessonsPassed = () => D.LESSONS.filter(l => (S.lessons[l.id] || {}).best >= 80).length;
  const BADGES = [
    { id: 'first', name: 'Erster Schritt', mn: 'Анхны зөв хариулт', icon: 'check', test: () => S.stats.correct >= 1 },
    { id: 'combo10', name: 'Zehn am Stück', mn: 'Дараалан 10 зөв', icon: 'bolt', test: () => S.stats.bestCombo >= 10 },
    { id: 'streak3', name: 'Drei Tage', mn: '3 өдөр дараалан', icon: 'flame', test: () => currentStreak() >= 3 },
    { id: 'streak7', name: 'Eine Woche', mn: '7 өдөр дараалан', icon: 'flame', test: () => currentStreak() >= 7 },
    { id: 'words25', name: 'Wortsammler', mn: '25 үг цээжилсэн', icon: 'cards', test: () => learnedCount() >= 25 },
    { id: 'words60', name: 'Wortschatz-Profi', mn: '60 үг цээжилсэн', icon: 'layers', test: () => learnedCount() >= 60 },
    { id: 'gram5', name: 'Grammatik-Fan', mn: '5 дүрмийг 80%+', icon: 'book', test: () => lessonsPassed() >= 5 },
    { id: 'gramAll', name: 'Grammatik-Meister', mn: 'Бүх дүрмийг 80%+', icon: 'trophy', test: () => lessonsPassed() >= D.LESSONS.length },
    { id: 'ue1', name: 'Fleißig', mn: 'Übung 1-ийг дуусгасан', icon: 'pencil', test: () => !!(S.workbook.ue1 && S.workbook.ue1.full) },
    { id: 'rain30', name: 'Artikel-König', mn: 'Artikel-Regen 30+ оноо', icon: 'rain', test: () => ((S.games.artikel || {}).best || 0) >= 30 },
    { id: 'memory', name: 'Gutes Gedächtnis', mn: 'Memory-г 10 нүүдэлд', icon: 'grid', test: () => { const b = (S.games.memory || {}).best; return b != null && b <= 10; } },
    { id: 'verbs50', name: 'Verben-Meister', mn: '50 дүрмийн бус үйл үг цээжилсэн', icon: 'bolt', test: () => D.IRREG.filter(v => (S.srs[v.wid] || {}).box >= 3).length >= 50 },
    { id: 'xp1000', name: 'Tausend XP', mn: '1000 XP цуглуулсан', icon: 'star', test: () => S.xp >= 1000 }
  ];
  function checkBadges() {
    BADGES.forEach(b => {
      if (!S.badges.includes(b.id) && b.test()) {
        S.badges.push(b.id); save();
        toast(`Шинэ тэмдэг: ${b.name}`);
        setTimeout(() => teacherSay(`Neues Abzeichen: ${b.name}!`, b.mn + ' — тэмдэг авлаа!', 'happy'), 400);
      }
    });
  }

  /* ---------------- Дуу (герман TTS) ---------------- */
  let deVoices = [];
  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    deVoices = speechSynthesis.getVoices().filter(v => /^de/i.test(v.lang));
  }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function chooseVoice() {
    if (!deVoices.length) return null;
    if (S.settings.voiceName) { const v = deVoices.find(v => v.name === S.settings.voiceName); if (v) return v; }
    return deVoices.find(v => /natural|neural|online/i.test(v.name) && /female|katja|amala|seraphina|anna|vicki|marlene/i.test(v.name))
      || deVoices.find(v => /google/i.test(v.name)) || deVoices.find(v => /katja|anna|vicki|marlene|hedda/i.test(v.name)) || deVoices[0];
  }
  function speak(text, opt = {}) {
    if (!('speechSynthesis' in window) || !text) { opt.onend && opt.onend(); return false; }
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'de-DE';
      const v = chooseVoice(); if (v) u.voice = v;
      u.rate = opt.rate || S.settings.rate;
      u.pitch = 1.05;
      u.onstart = () => { T()?.setTalking(true); opt.onstart && opt.onstart(); };
      u.onend = u.onerror = () => { T()?.setTalking(false); opt.onend && opt.onend(); };
      speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }

  /* ---------------- Багш ---------------- */
  const T = () => window.Teacher;
  let bubbleTimer = 0;
  function teacherSay(de, mn, mood = 'talk', speakIt) {
    const b = $('#bubble');
    if (!b) return;
    const nb = b.cloneNode(false);
    const HAPPY = ['happy', 'clap', 'cheer'], SAD = ['sad', 'scold', 'pray', 'facepalm', 'despair'];
    nb.className = 'bubble' + (HAPPY.includes(mood) ? ' mood-happy' : SAD.includes(mood) ? ' mood-sad' : '') + (mood === 'pray' ? ' mood-pray' : '');
    nb.innerHTML = `<div class="bde">${esc(de)}</div>${mn ? `<div class="bmn">${esc(mn)}</div>` : ''}`;
    b.replaceWith(nb);
    if (mood && mood !== 'talk') T()?.react(mood);
    const doSpeak = speakIt === undefined ? false : speakIt;
    if (doSpeak && S.settings.voice) speak(de);
    else T()?.talkFor(Math.min(2600, 500 + de.length * 55));
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => { const cur = $('#bubble'); if (cur) cur.classList.add('quiet'); }, 7000);
  }
  window.DL_teacherSay = teacherSay;

  /* Багшийн сэтгэл хөдлөл: дараалсан зөв → улам их баярлана,
     дараалсан буруу → загнана → бурхадад залбирна → цөхөрнө */
  let okRun = 0, badRun = 0;
  function teacherReact(ok, answerText) {
    if (ok) {
      okRun++; badRun = 0;
      const mood = okRun >= 5 ? 'cheer' : okRun >= 3 ? 'clap' : 'happy';
      const p = okRun >= 5 ? pick(D.PRAISE_BIG) : okRun >= 3 ? pick(D.PRAISE_BIG.concat(D.PRAISE)) : pick(D.PRAISE);
      teacherSay(p.de, okRun >= 3 ? `${p.mn} (дараалан ${okRun} зөв!)` : p.mn, mood, false);
      if (S.settings.voice) speak(okRun >= 3 || !answerText ? p.de : answerText);
    } else {
      badRun++; okRun = 0;
      const lvl = Math.min(3, badRun);
      const mood = lvl === 1 ? pick(['scold', 'facepalm']) : lvl === 2 ? 'pray' : pick(['despair', 'pray']);
      const p = pick(D.SCOLD[lvl]);
      teacherSay(p.de, p.mn, mood, false);
      if (S.settings.voice) speak(p.de, { onend: () => { if (answerText) setTimeout(() => speak(answerText), 250); } });
    }
  }

  /* ---------------- Toast / confetti ---------------- */
  function toast(msg) {
    const host = $('#toasts');
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    host.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, 2600);
  }
  function confetti() {
    if (reduceMotion) return;
    const c = $('#confetti'); const ctx = c.getContext('2d');
    const dpr = Math.min(2, devicePixelRatio || 1);
    c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.scale(dpr, dpr);
    const cols = ['#e9c25b', '#d4553f', '#ecebe6', '#67c58f', '#6ea8ec'];
    const parts = Array.from({ length: 140 }, () => ({
      x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .35,
      vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4, r: Math.random() * Math.PI,
      vr: (Math.random() - .5) * .4, w: 6 + Math.random() * 6, h: 3 + Math.random() * 4, c: pick(cols)
    }));
    const start = performance.now();
    (function frame(now) {
      const t = now - start;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      parts.forEach(p => {
        p.vy += .38; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
        ctx.globalAlpha = Math.max(0, 1 - t / 2200); ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      });
      if (t < 2200) requestAnimationFrame(frame); else ctx.clearRect(0, 0, innerWidth, innerHeight);
    })(start);
  }

  /* ---------------- ASCII арын дэвсгэр ---------------- */
  const Ascii = (function () {
    const c = $('#ascii-bg'); if (!c) return { setWords() { } };
    const ctx = c.getContext('2d');
    const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß0123456789#*+=/<>abcdefghijklmnopqrstuvwxyzäöü';
    const CW = 9, CHH = 14;
    let cols = 0, rows = 0, mask = [], chars = [], words = ['DEUTSCH', 'LERNEN'], dpr = 1;
    const css = getComputedStyle(document.documentElement);
    const colDim = css.getPropertyValue('--ascii').trim() || '#2a2a2d';
    const colHot = css.getPropertyValue('--ascii-hot').trim() || '#4a4a4f';
    function buildMask() {
      const W = Math.ceil(innerWidth / 3), H = Math.ceil(innerHeight / 3);
      const off = document.createElement('canvas'); off.width = W; off.height = H;
      const o = off.getContext('2d');
      o.fillStyle = '#fff'; o.textAlign = 'center'; o.textBaseline = 'middle';
      const n = words.length;
      const bandH = H / n;
      words.forEach((w, i) => {
        let size = bandH * .78;
        o.font = `900 ${size}px Geologica, Arial Black, sans-serif`;
        const mw = o.measureText(w).width;
        if (mw > W * .94) size *= (W * .94) / mw;
        o.font = `900 ${size}px Geologica, Arial Black, sans-serif`;
        o.fillText(w, W / 2, bandH * (i + .5));
      });
      const data = o.getImageData(0, 0, W, H).data;
      mask = new Array(cols * rows);
      for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
        const x = Math.min(W - 1, Math.floor((q * CW + CW / 2) / 3)), y = Math.min(H - 1, Math.floor((r * CHH + CHH / 2) / 3));
        mask[r * cols + q] = data[(y * W + x) * 4 + 3] > 120;
      }
    }
    function drawCell(i) {
      const q = i % cols, r = (i / cols) | 0;
      ctx.clearRect(q * CW, r * CHH, CW, CHH);
      const ch = chars[i]; if (!ch) return;
      ctx.fillStyle = mask[i] ? colHot : colDim;
      ctx.globalAlpha = mask[i] ? .55 + Math.random() * .45 : .6;
      ctx.fillText(ch, q * CW, r * CHH + 11);
    }
    function fill(i) { chars[i] = mask[i] ? pick(CH) : (Math.random() < .045 ? pick(CH) : ''); }
    function resize() {
      dpr = Math.min(2, devicePixelRatio || 1);
      c.width = innerWidth * dpr; c.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '11px "IBM Plex Mono", Consolas, monospace';
      cols = Math.ceil(innerWidth / CW); rows = Math.ceil(innerHeight / CHH);
      buildMask();
      chars = new Array(cols * rows);
      for (let i = 0; i < chars.length; i++) { fill(i); drawCell(i); }
    }
    let wipeRow = -1;
    function setWords(w) {
      if (w.join() === words.join()) return;
      words = w; buildMask();
      if (reduceMotion) { for (let i = 0; i < chars.length; i++) { fill(i); drawCell(i); } return; }
      wipeRow = 0;
    }
    function tick() {
      if (wipeRow >= 0) {
        for (let k = 0; k < 4 && wipeRow < rows; k++, wipeRow++) for (let q = 0; q < cols; q++) { const i = wipeRow * cols + q; fill(i); drawCell(i); }
        if (wipeRow >= rows) wipeRow = -1;
      }
      const n = Math.floor(chars.length * .012);
      for (let k = 0; k < n; k++) { const i = (Math.random() * chars.length) | 0; fill(i); drawCell(i); }
    }
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(resize);
    resize();
    if (!reduceMotion) setInterval(() => { if (!document.hidden) tick(); }, 90);
    return { setWords };
  })();

  /* ---------------- Шалгах логик ---------------- */
  function norm(s) {
    return String(s).toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[.,!?;:"„“”'’«»()…\-–—]/g, ' ')
      .replace(/\bso dass\b/g, 'sodass')
      .replace(/\s+/g, ' ').trim();
  }
  function lev(a, b) {
    const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, i) => i), cur = new Array(n + 1);
    for (let i = 1; i <= m; i++) {
      cur[0] = i;
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      [prev, cur] = [cur, prev];
    }
    return prev[n];
  }
  function judge(user, answers) {
    const u = norm(user);
    if (!u) return { ok: false, empty: true, expected: answers[0] };
    let best = { d: Infinity, a: answers[0] };
    for (const a of answers) {
      const n = norm(a);
      if (n === u) return { ok: true, expected: a };
      const d = lev(u, n); if (d < best.d) best = { d, a };
    }
    const len = norm(best.a).length;
    const tol = len >= 14 ? Math.max(1, Math.floor(len / 18)) : 0;
    if (best.d <= tol) return { ok: true, typo: true, expected: best.a };
    return { ok: false, expected: best.a };
  }
  function diffHTML(expected, user) {
    const uw = new Set(norm(user).split(' '));
    return expected.split(' ').map(w => uw.has(norm(w)) ? esc(w) : `<ins>${esc(w)}</ins>`).join(' ');
  }
  const gapify = q => esc(q).replace(/___/g, '<span class="gap">?</span>');

  /* ---------------- Үгсийн сангийн SRS ---------------- */
  const INTERVALS = [0, 1, 2, 4, 8, 16];
  const W = D.VOCAB;
  const wordById = id => W.find(w => w.id === id);
  function srsRate(id, grade) {
    const r = S.srs[id] || { box: 0, due: today(), seen: 0 };
    r.seen++;
    if (grade === 1) { r.box = 1; r.due = today(); }
    else if (grade === 2) { r.box = Math.max(1, r.box); r.due = addDays(today(), 1); }
    else { r.box = Math.min(5, r.box + 1); r.due = addDays(today(), INTERVALS[r.box]); }
    S.srs[id] = r; save();
  }
  const dueWords = () => W.filter(w => S.srs[w.id] && S.srs[w.id].due <= today());
  const newWords = () => W.filter(w => !S.srs[w.id]);
  const wordLabel = w => w.art ? `${w.art} ${w.de}` : w.de;
  const artHTML = w => w.art ? `<span class="art art-${w.art === 'die' && w.tags.includes('plural') ? 'die' : w.art}">${w.art}</span> ${esc(w.de)}` : esc(w.de);
  const wordExtra = w => w.type === 'noun' ? (w.pl ? `Pl. ${w.pl}` : '') : w.type === 'verb' ? `${w.prat} · ${w.perf}` : 'Adjektiv';
  const sayBtn = text => `<button class="say" data-say="${esc(text)}" title="Сонсох" aria-label="Сонсох">${icon('speaker')}</button>`;

  /* ---------------- Чиглүүлэгч (router) ---------------- */
  const NAV = [
    { r: 'home', i: 'home', t: 'Start' },
    { r: 'unterricht', i: 'clock', t: 'Unterricht', s: 'Хичээл' },
    { r: 'grammatik', i: 'book', t: 'Grammatik', s: 'Regeln' },
    { r: 'starke', i: 'bolt', t: 'Starke Verben', s: 'Verben' },
    { r: 'uebungen', i: 'pencil', t: 'Kurs · Übungen', s: 'Kurs' },
    { r: 'wortschatz', i: 'cards', t: 'Wortschatz', s: 'Wörter' },
    { r: 'spiele', i: 'game', t: 'Spiele' },
    { r: 'fehler', i: 'alert', t: 'Fehlerheft' },
    { r: 'klasse', i: 'trophy', t: 'Klasse', s: 'Анги' },
    { r: 'fortschritt', i: 'chart', t: 'Fortschritt', s: 'Profil' }
  ];
  const ASCII_WORDS = {
    home: ['DEUTSCH', 'LERNEN', 'B2'], grammatik: ['GRAMMATIK'], lesson: ['REGEL'], uebungen: ['KURS'], workbook: ['SCHREIBEN'], mix: ['MIX'],
    wortschatz: ['WÖRTER'], karten: ['KARTEN'], quiz: ['QUIZ'], tippen: ['TIPPEN'], hoeren: ['HÖREN'],
    spiele: ['SPIELE'], artikel: ['DER', 'DIE', 'DAS'], verben: ['VERBEN'], habensein: ['HABEN', 'SEIN'], satzbau: ['SATZ'], memory: ['MEMORY'],
    fehler: ['FEHLER'], fortschritt: ['B2'], klasse: ['KLASSE'], unterricht: ['HEUTE'], stunde: ['HEUTE'],
    starke: ['STARKE', 'VERBEN'], vgruppe: ['MUSTER'], vdrill: ['STAMM', 'FORMEN']
  };
  let disposers = [];
  let onDisposeGlobal = null;
  const onDispose = fn => disposers.push(fn);
  let keyHandler = null;
  document.addEventListener('keydown', e => {
    if (!keyHandler) return;
    keyHandler(e);
  });
  function setKeys(fn) { keyHandler = fn; onDispose(() => { if (keyHandler === fn) keyHandler = null; }); }
  function parseHash() {
    const h = decodeURIComponent(location.hash.slice(1)) || 'home';
    const i = h.indexOf('-');
    return i > 0 ? [h.slice(0, i), h.slice(i + 1)] : [h, null];
  }
  function go(h) { if (location.hash === '#' + h) render(); else location.hash = h; }
  function render() {
    if (!S) return;
    disposers.forEach(f => { try { f(); } catch (e) { } }); disposers = [];
    if (onDisposeGlobal) onDisposeGlobal();
    keyHandler = null;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const [r, arg] = parseHash();
    const fn = VIEWS[r] || VIEWS.home;
    const view = $('#view');
    view.innerHTML = '';
    fn(view, arg);
    const navKey = { lesson: 'grammatik', workbook: 'uebungen', mix: 'uebungen', karten: 'wortschatz', quiz: 'wortschatz', tippen: 'wortschatz', hoeren: 'wortschatz', artikel: 'spiele', verben: 'spiele', habensein: 'spiele', satzbau: 'spiele', memory: 'spiele', vgruppe: 'starke', vdrill: 'starke', stunde: 'unterricht' }[r] || r;
    $$('#nav a, #bottom-nav a').forEach(a => a.classList.toggle('active', a.dataset.r === navKey));
    Ascii.setWords(ASCII_WORDS[r] || ASCII_WORDS.home);
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render);

  /* ---------------- Хүрээ (nav, stats) ---------------- */
  function buildChrome() {
    $('#nav').innerHTML = NAV.map(n => `<a href="#${n.r}" data-r="${n.r}">${icon(n.i)}<span>${n.t}</span>${n.r === 'fehler' ? '<span class="count" id="mcount" hidden></span>' : ''}</a>`).join('');
    $('#bottom-nav').innerHTML = NAV.filter(n => !['fehler', 'grammatik', 'unterricht'].includes(n.r)).map(n => `<a href="#${n.r}" data-r="${n.r}">${icon(n.i)}<span>${n.s || n.t}</span></a>`).join('');
    $('#t-name').textContent = CFG.teacher.name;
    $('#t-role').textContent = CFG.teacher.role;
    const vb = $('#t-voice'), mb = $('#t-mini');
    const syncTools = () => {
      vb.innerHTML = icon(S.settings.voice ? 'speaker' : 'mute');
      vb.classList.toggle('on', S.settings.voice);
      mb.innerHTML = icon(S.settings.mini ? 'maximize' : 'minimize');
      $('#teacher-col').classList.toggle('mini', S.settings.mini);
    };
    vb.addEventListener('click', e => { e.stopPropagation(); S.settings.voice = !S.settings.voice; save(); syncTools(); toast(S.settings.voice ? 'Багшийн дуу асаалаа' : 'Багшийн дуу унтраалаа'); });
    mb.addEventListener('click', e => { e.stopPropagation(); S.settings.mini = !S.settings.mini; save(); syncTools(); });
    syncTools();
    $('#teacher-stage').addEventListener('click', () => {
      const tip = pick(D.TIPS);
      teacherSay(tip.de, tip.mn, 'think', true);
    });
    refreshChrome();
  }
  function refreshChrome() {
    const L = levelOf(S.xp);
    const pct = Math.round(100 * (S.xp - xpForLevel(L)) / (xpForLevel(L + 1) - xpForLevel(L)));
    $('#side-stats').innerHTML = `
      <div class="row"><span class="user-chip"><b>${esc(USER.name)}</b></span><button class="link-btn" id="side-logout">Гарах</button></div>
      <div class="row"><span>Level ${L}</span><b>${titleOf(L)}</b></div>
      <div class="progress"><i style="width:${pct}%"></i></div>
      <div class="row"><span>XP</span><b>${S.xp}</b></div>
      <div class="row"><span>Streak</span><b>${currentStreak()} өдөр</b></div>
      <div class="row"><span>Өнөөдөр</span><b>${S.daily[today()] || 0}/${CFG.dailyGoalXP}</b></div>`;
    const lo = $('#side-logout'); if (lo) lo.onclick = () => window.DL_AUTH && window.DL_AUTH.logout();
    const mc = $('#mcount');
    if (mc) { mc.hidden = !S.mistakes.length; mc.textContent = S.mistakes.length; }
    $$('[data-live-xp]').forEach(el => el.textContent = S.xp);
    $$('[data-live-level]').forEach(el => el.style.width = pct + '%');
    $$('[data-live-streak]').forEach(el => el.textContent = currentStreak());
  }
  function topbar(crumb, back) {
    const L = levelOf(S.xp);
    const pct = Math.round(100 * (S.xp - xpForLevel(L)) / (xpForLevel(L + 1) - xpForLevel(L)));
    return `<div class="topbar">
      ${back ? `<a class="icon-btn" href="#${back}" title="Буцах" aria-label="Буцах">${icon('back')}</a>` : ''}
      <span class="crumb">${crumb}</span><span class="spacer"></span>
      <span class="chip-stat streak" title="Дараалсан өдөр">${icon('flame')}<b data-live-streak>${currentStreak()}</b></span>
      <a class="chip-stat xp" href="#fortschritt" title="Нийт XP — ахиц харах" style="color:inherit;text-decoration:none">${icon('bolt')}<b data-live-xp>${S.xp}</b><span class="levelbar"><i data-live-level style="width:${pct}%"></i></span></a>
    </div>`;
  }

  /* ---------------- Дасгалын хөдөлгүүр ---------------- */
  function runSession(host, items, opts = {}) {
    let i = 0, score = 0, combo = 0, wrongItems = [];
    const total = items.length;
    host.innerHTML = `<div class="session">
      <div class="session-top">
        <button class="icon-btn" data-quit title="Дасгалаас гарах" aria-label="Дасгалаас гарах">${icon('x')}</button>
        <div class="progress" id="sess-prog"><i style="width:0%"></i></div>
        <div class="combo" id="combo"></div>
      </div>
      <div id="qhost"></div></div>`;
    $('[data-quit]', host).addEventListener('click', () => opts.onQuit ? opts.onQuit() : render());
    const qhost = $('#qhost', host);
    let state = null; // {phase:'answer'|'feedback', check, next}

    setKeys(e => {
      if (!state) return;
      const tag = (e.target.tagName || '').toLowerCase();
      if (e.key === 'Enter') {
        e.preventDefault();
        if (state.phase === 'answer' && state.check) state.check();
        else if (state.phase === 'feedback') nextQ();
        return;
      }
      if (state.phase === 'answer' && state.keys && tag !== 'input') state.keys(e);
    });

    function setProgress() {
      $('#sess-prog i', host).style.width = (100 * i / total) + '%';
      const c = $('#combo', host);
      c.textContent = combo >= 2 ? `combo ×${combo}` : '';
      if (combo >= 2) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
    }
    function nextQ() { i++; if (i >= total) finish(); else show(); }
    function show() {
      setProgress();
      const it = items[i];
      const card = document.createElement('div');
      card.className = 'qcard';
      qhost.innerHTML = ''; qhost.appendChild(card);
      const R = RENDER[it.type](card, it);
      const actions = document.createElement('div');
      actions.className = 'q-actions';
      actions.innerHTML = `<span class="kbd-hint">${it.type === 'mc' || it.type === 'listen' ? '1–4 товчоор сонгоно' : 'Enter — шалгах'}</span>
        <div class="row-flex">${R.hint ? `<button class="btn small ghost" data-hint>${icon('bulb')} Сануулга</button>` : ''}
        ${R.auto ? '' : `<button class="btn primary" data-check>Шалгах</button>`}</div>`;
      card.appendChild(actions);
      let usedHint = false;
      const hintBtn = $('[data-hint]', actions);
      if (hintBtn) hintBtn.addEventListener('click', () => { usedHint = true; R.hint(); });
      const check = () => {
        const res = R.check();
        if (!res) return;
        state.phase = 'feedback';
        grade(it, res, card, actions, usedHint);
      };
      const ck = $('[data-check]', actions);
      if (ck) ck.addEventListener('click', check);
      if (R.auto) R.onPick = check;
      state = { phase: 'answer', check: R.auto ? null : check, keys: R.keys };
      setTimeout(() => { const f = $('input', card); if (f && matchMedia('(pointer:fine)').matches) f.focus(); }, 60);
    }
    function grade(it, res, card, actions, usedHint) {
      const frac = res.frac != null ? res.frac : (res.ok ? 1 : 0);
      score += frac;
      S.stats.answered++;
      if (res.ok) {
        S.stats.correct++; combo++;
        S.stats.bestCombo = Math.max(S.stats.bestCombo, combo);
        let xp = res.typo || usedHint ? 6 : 10;
        if (combo >= 3) xp += 2 * Math.min(combo - 2, 5);
        if (it.type === 'tense3' || it.type === 'steps') xp = Math.round(xp * 1.8);
        if (it.type === 'vforms') xp = Math.round(xp * 1.5);
        addXP(xp, card);
        if (opts.mode === 'mistakes') removeMistake(it);
      } else {
        combo = 0;
        if (frac > 0) { addXP(Math.round(frac * 12), card); }
        card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
        wrongItems.push(it);
        res.wrongParts ? res.wrongParts.forEach(p => addMistake(p, opts.topic)) : addMistake(it, opts.topic, res.user);
      }
      opts.onAnswer && opts.onAnswer(it, res.ok);
      save(); setProgress();
      // Багшийн хариу
      teacherReact(res.ok, res.sayAnswer);
      const fb = document.createElement('div');
      fb.className = 'feedback ' + (res.ok ? 'ok' : 'bad');
      fb.innerHTML = `<div class="fh">${icon(res.ok ? 'check' : 'x')} ${res.ok ? (res.typo ? 'Зөв! Бичлэгээ анхаараарай' : pick(['Зөв!', 'Яг зөв!', 'Сайн байна!'])) : (frac > 0 ? `Хагас зөв (${res.parts ? res.parts.join('/') : Math.round(frac * 3) + '/3'})` : 'Буруу')}</div>
        ${res.feedbackHTML || ''}
        ${it.explain ? `<div class="ex">${esc(it.explain)}</div>` : ''}`;
      card.insertBefore(fb, actions);
      if (!res.ok && res.allowOverride) {
        const ob = document.createElement('button');
        ob.className = 'btn small ghost'; ob.style.justifySelf = 'start';
        ob.textContent = 'Миний хариулт ч зөв — тооцох';
        ob.addEventListener('click', () => {
          ob.remove();
          score += 1 - frac; S.stats.correct++;
          removeMistake(it); wrongItems = wrongItems.filter(x => x !== it);
          fb.className = 'feedback ok';
          $('.fh', fb).innerHTML = `${icon('check')} Зөвд тооцлоо`;
          addXP(6, card); save();
          okRun = 0; badRun = 0;
          teacherSay('Na gut, das lasse ich gelten!', 'За за, үүнийг зөвд тооцъё!', 'happy', true);
        });
        fb.appendChild(ob);
      }
      actions.innerHTML = `<span class="kbd-hint">Enter — дараах</span><button class="btn primary" data-next>${i + 1 >= total ? 'Дуусгах' : 'Дараах'} ${icon('arrow')}</button>`;
      $('[data-next]', actions).addEventListener('click', nextQ);
      if (matchMedia('(pointer:fine)').matches) $('[data-next]', actions).focus({ preventScroll: true });
    }
    function finish() {
      state = null;
      const tilesRepeat = items.every(x => x.type === 'tiles') ? [] : tilesFromItems(items);
      const pct = Math.round(100 * score / total);
      const stars = pct >= 90 ? 3 : pct >= 75 ? 2 : pct >= 50 ? 1 : 0;
      let bonus = 10 + (pct >= 80 ? 20 : 0) + (pct === 100 ? 20 : 0);
      addXP(bonus, $('#sess-prog', host));
      opts.onFinish && opts.onFinish(pct);
      if (stars >= 2) confetti();
      const msg = pct === 100 ? { de: 'Fantastisch! Alles richtig!', mn: 'Гайхалтай! Бүгд зөв!' } : pct >= 80 ? { de: 'Sehr gut gemacht!', mn: 'Маш сайн хийлээ!' } : pct >= 50 ? { de: 'Gut! Noch ein bisschen üben.', mn: 'Сайн! Жаахан дахиад давтъя.' } : { de: 'Nicht aufgeben! Wir üben zusammen.', mn: 'Бүү бууж өг! Хамтдаа давтъя.' };
      teacherSay(msg.de, msg.mn, pct >= 50 ? 'happy' : 'think', true);
      host.innerHTML = `<div class="panel result">
        <div class="label">${esc(opts.title || 'Дасгал')} · дууслаа</div>
        <div class="stars">${[1, 2, 3].map(n => starSvg(n <= stars)).join('')}</div>
        <div class="big">${pct}%</div>
        <div class="muted">${Math.round(score * 10) / 10} / ${total} зөв · +${bonus} XP урамшуулал</div>
        <div class="row-flex" style="justify-content:center">
          <button class="btn primary" data-again>${icon('refresh')} Дахин</button>
          ${tilesRepeat.length ? `<button class="btn" data-tiles>${icon('puzzle')} Үг байрлуулж давтах (${tilesRepeat.length})</button>` : ''}
          ${wrongItems.length ? `<button class="btn" data-wrong>${icon('alert')} Алдсанаа давтах (${wrongItems.length})</button>` : ''}
          ${opts.next ? `<a class="btn gold" href="#${opts.next.href}">${esc(opts.next.label)} ${icon('arrow')}</a>` : ''}
          <button class="btn ghost" data-done>Буцах</button>
        </div></div>`;
      $('[data-again]', host).addEventListener('click', () => runSession(host, opts.reshuffle ? shuffle(items) : items, opts));
      const tb = $('[data-tiles]', host);
      if (tb) tb.addEventListener('click', () => runSession(host, shuffle(tilesRepeat), Object.assign({}, opts, { title: (opts.title || 'Дасгал') + ' · үг байрлуулах', onFinish: null, next: null })));
      const wb = $('[data-wrong]', host);
      if (wb) wb.addEventListener('click', () => runSession(host, wrongItems.slice(), Object.assign({}, opts, { title: 'Алдаа давтах' })));
      $('[data-done]', host).addEventListener('click', () => opts.onQuit ? opts.onQuit() : render());
    }
    show();
  }

  /* ---- Даалгаврын төрлүүд ---- */
  let lastField = null;
  function umlautBar() {
    return `<div class="umlauts" aria-label="Тусгай үсэг">${['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map(c => `<button type="button" data-uml="${c}">${c}</button>`).join('')}</div>`;
  }
  document.addEventListener('focusin', e => { if (e.target.matches && e.target.matches('input.field, textarea.field')) lastField = e.target; });
  document.addEventListener('mousedown', e => { if (e.target.closest && e.target.closest('[data-uml]')) e.preventDefault(); });
  document.addEventListener('click', e => {
    const u = e.target.closest && e.target.closest('[data-uml]');
    if (u && lastField && document.body.contains(lastField)) {
      const f = lastField, s = f.selectionStart ?? f.value.length, en = f.selectionEnd ?? f.value.length;
      f.value = f.value.slice(0, s) + u.dataset.uml + f.value.slice(en);
      f.focus(); f.setSelectionRange(s + 1, s + 1);
      return;
    }
    const say = e.target.closest && e.target.closest('[data-say]');
    if (say) { e.preventDefault(); speak(say.dataset.say); return; }
    const g = e.target.closest && e.target.closest('[data-go]');
    if (g) { e.preventDefault(); go(g.dataset.go); }
  });

  /* Сануулгын чип: 'deutsch|монгол' эсвэл үгсийн сангаас хайна */
  function bookHTML(it, typed) {
    if (!it.book) return '';
    const same = typed && it.book.length === 1 && norm(typed) === norm(it.book[0]);
    if (same) return `<div class="lsg">${icon('book')} Номын Lösung-тэй яг ижил!</div>`;
    return `<div class="lsg"><span class="lsg-l">${icon('book')} Lösung (ном${it.nr ? ' #' + it.nr : ''})</span>${it.book.map(b => `<span class="lsg-s">${esc(b)} ${sayBtn(b)}</span>`).join('')}</div>`;
  }
  function hintChip(h) {
    let de = h, mn = '';
    if (h.includes('|')) [de, mn] = h.split('|');
    else { const w = W.find(x => wordLabel(x) === h || x.de === h); mn = w ? w.mn : ''; }
    const label = mn || de;
    return `<button type="button" class="hint-chip" data-hw="${esc(de)}" data-mn="${esc(label)}">${esc(label)}</button>`;
  }
  const RENDER = {
    mc(card, it) {
      const opts = shuffle(it.options);
      card.insertAdjacentHTML('afterbegin', `<div class="label">${esc(it.label || 'Зөв хариултыг сонго')}</div>
        <div class="q">${gapify(it.q)}</div>
        <div class="options">${opts.map((o, k) => `<button class="opt" data-o="${esc(o)}"><kbd>${k + 1}</kbd><span>${esc(o)}</span></button>`).join('')}</div>`);
      const R = { auto: true, picked: null };
      const choose = btn => {
        if (R.picked) return;
        R.picked = btn.dataset.o;
        $$('.opt', card).forEach(b => {
          b.disabled = true;
          if (b.dataset.o === it.answer) b.classList.add('correct');
          else if (b === btn) b.classList.add('wrong'); else b.classList.add('dim');
        });
        R.onPick && R.onPick();
      };
      $$('.opt', card).forEach(b => b.addEventListener('click', () => choose(b)));
      R.keys = e => { const n = parseInt(e.key, 10); const b = $$('.opt', card)[n - 1]; if (b) choose(b); };
      R.check = () => {
        const ok = R.picked === it.answer;
        const cyr = s => /[а-яөүё]/i.test(s);
        let say = null;
        if (!it.noSpeak) {
          if (it.q.includes('___') && !cyr(it.q)) say = it.q.replace('___', it.answer);
          else if (!cyr(it.answer)) say = it.answer;
        }
        return { ok, user: R.picked, sayAnswer: say, feedbackHTML: ok ? '' : `<div class="ans">Зөв: ${esc(it.answer)}</div>` };
      };
      return R;
    },
    listen(card, it) {
      card.insertAdjacentHTML('afterbegin', `<div class="label">Сонсоод утгыг нь сонго</div>
        <div class="row-flex"><button class="btn gold" data-play>${icon('speaker')} Дахин сонсох</button><span class="muted">${esc(it.sub || '')}</span></div>
        <div class="options">${shuffle(it.options).map((o, k) => `<button class="opt" data-o="${esc(o)}"><kbd>${k + 1}</kbd><span>${esc(o)}</span></button>`).join('')}</div>`);
      const play = () => speak(it.audio, { rate: .85 });
      $('[data-play]', card).addEventListener('click', play);
      setTimeout(play, 250);
      const R = { auto: true, picked: null };
      const choose = btn => {
        if (R.picked) return; R.picked = btn.dataset.o;
        $$('.opt', card).forEach(b => { b.disabled = true; if (b.dataset.o === it.answer) b.classList.add('correct'); else if (b === btn) b.classList.add('wrong'); else b.classList.add('dim'); });
        R.onPick && R.onPick();
      };
      $$('.opt', card).forEach(b => b.addEventListener('click', () => choose(b)));
      R.keys = e => { if (e.key === ' ') { e.preventDefault(); play(); return; } const b = $$('.opt', card)[parseInt(e.key, 10) - 1]; if (b) choose(b); };
      R.check = () => ({ ok: R.picked === it.answer, user: R.picked, sayAnswer: it.audio, feedbackHTML: `<div class="ans">${esc(it.audio)} — ${esc(it.answer)}</div>` });
      return R;
    },
    input(card, it) {
      card.insertAdjacentHTML('afterbegin', `<div class="label">${esc(it.label || 'Бичиж хариул')}</div>
        <div class="q">${gapify(it.q)}</div>
        <input class="field" id="ans-${Date.now()}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Хариултаа бич…">
        ${umlautBar()}`);
      const f = $('input', card);
      let hintLevel = 0;
      return {
        hint() {
          hintLevel++;
          const a = it.answers[0];
          const shown = a.split(' ').map(w => w.slice(0, Math.min(w.length, hintLevel)) + '·'.repeat(Math.max(0, w.length - hintLevel))).join(' ');
          f.placeholder = shown;
          f.focus();
        },
        check() {
          if (!f.value.trim()) { f.focus(); f.classList.add('bad'); setTimeout(() => f.classList.remove('bad'), 400); return null; }
          const r = judge(f.value, it.answers);
          f.readOnly = true;
          f.classList.add(r.ok ? 'ok' : 'bad');
          const isSentence = /[a-zäöüß]/i.test(r.expected) && !/[а-яөү]/i.test(r.expected);
          const full = it.q.includes('___') && r.expected.split(' ').length <= 3 ? it.q.replace(/\s*\(.*?\)\s*$/, '').replace('___', r.expected) : r.expected;
          return {
            ok: r.ok, typo: r.typo, user: f.value,
            sayAnswer: isSentence ? full : null,
            feedbackHTML: r.ok && !r.typo ? '' : `<div class="ans diff">${r.ok ? 'Зөв бичлэг: ' : 'Зөв хариулт: '}${diffHTML(r.expected, f.value)}</div>`
          };
        }
      };
    },
    tiles(card, it) {
      const words = it.answer.replace(/[.,!?;:„“"]/g, '').split(' ').filter(Boolean);
      let pool = words.concat(it.distract || []).map(w => ({ w, used: false }));
      for (let n = 0; n < 5; n++) { pool = shuffle(pool); if (pool.map(p => p.w).join(' ') !== words.join(' ')) break; }
      let line = []; let done = false;
      card.insertAdjacentHTML('afterbegin', `<div class="label">${esc(it.label || 'Үгсийг зөв дараалалд оруул')}</div>
        <div class="q q-mn">${esc(it.q)}</div>
        ${it.sub ? `<div class="pill gold" style="justify-self:start">${esc(it.sub)}</div>` : ''}
        <div class="answer-line" aria-label="Таны өгүүлбэр"></div>
        <div class="bank"></div>
        <div class="muted" style="font-size:12.5px">Дарж эсвэл чирж оруулна. Буцаахдаа дээрх үг дээр дар. ${it.distract && it.distract.length ? 'Анхаар: илүү үг байгаа!' : ''}</div>`);
      const lineEl = $('.answer-line', card), bankEl = $('.bank', card);
      const draw = () => {
        lineEl.innerHTML = line.length ? line.map(pi => `<button type="button" class="wtile" data-pi="${pi}" data-in="1">${esc(pool[pi].w)}</button>`).join('') : '<span class="line-ph">Энд үгсээ байрлуул…</span>';
        bankEl.innerHTML = pool.map((p, pi) => `<button type="button" class="wtile ${p.used ? 'used' : ''}" data-pi="${pi}">${esc(p.w)}</button>`).join('');
      };
      const toggle = (pi, inLine) => {
        if (done) return;
        if (inLine) { line = line.filter(x => x !== pi); pool[pi].used = false; }
        else if (!pool[pi].used) { line.push(pi); pool[pi].used = true; }
        draw();
      };
      // Чирж оруулах (хулгана ба хуруу)
      let drag = null;
      const insertIndex = (x, y) => {
        const tiles = $$('.wtile:not(.dragging)', lineEl);
        let idx = 0;
        tiles.forEach(t => { const r = t.getBoundingClientRect(); if (r.bottom < y || (r.top <= y && r.left + r.width / 2 < x)) idx++; });
        return idx;
      };
      const overLine = (x, y) => { const r = lineEl.getBoundingClientRect(); return x >= r.left - 10 && x <= r.right + 10 && y >= r.top - 24 && y <= r.bottom + 24; };
      card.addEventListener('pointerdown', e => {
        const t = e.target.closest('.wtile');
        if (!t || done || t.classList.contains('used') || !card.contains(t)) return;
        drag = { pi: +t.dataset.pi, inLine: !!t.dataset.in, el: t, x0: e.clientX, y0: e.clientY, moving: false, ghost: null, mark: null };
        t.setPointerCapture(e.pointerId);
      });
      card.addEventListener('pointermove', e => {
        if (!drag) return;
        if (!drag.moving && Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 7) return;
        if (!drag.moving) {
          drag.moving = true;
          const r = drag.el.getBoundingClientRect();
          drag.ghost = drag.el.cloneNode(true); drag.ghost.className = 'wtile ghost';
          drag.ghost.style.width = r.width + 'px';
          document.body.appendChild(drag.ghost);
          drag.el.classList.add('dragging');
          drag.mark = document.createElement('span'); drag.mark.className = 'drop-mark';
        }
        drag.ghost.style.left = (e.clientX - drag.ghost.offsetWidth / 2) + 'px';
        drag.ghost.style.top = (e.clientY - 22) + 'px';
        if (overLine(e.clientX, e.clientY)) {
          const idx = insertIndex(e.clientX, e.clientY);
          const tiles = $$('.wtile:not(.dragging)', lineEl);
          const ph = $('.line-ph', lineEl); if (ph) ph.remove();
          if (tiles[idx]) lineEl.insertBefore(drag.mark, tiles[idx]); else lineEl.appendChild(drag.mark);
        } else if (drag.mark.parentNode) drag.mark.remove();
      });
      const endDrag = e => {
        if (!drag) return;
        const d = drag; drag = null;
        if (!d.moving) { toggle(d.pi, d.inLine); return; }
        d.ghost.remove();
        if (overLine(e.clientX, e.clientY)) {
          const idx = insertIndex(e.clientX, e.clientY);
          if (d.inLine) line = line.filter(x => x !== d.pi);
          line.splice(Math.min(idx, line.length), 0, d.pi);
          pool[d.pi].used = true;
        } else if (d.inLine) { line = line.filter(x => x !== d.pi); pool[d.pi].used = false; }
        draw();
      };
      card.addEventListener('pointerup', endDrag);
      card.addEventListener('pointercancel', () => { if (drag && drag.ghost) drag.ghost.remove(); drag = null; draw(); });
      draw();
      return {
        keys(e) { if (e.key === 'Backspace' && line.length && !done) { const pi = line.pop(); pool[pi].used = false; draw(); } },
        check() {
          if (!line.length) { toast('Үгсээ байрлуулаарай'); return null; }
          done = true;
          const user = line.map(pi => pool[pi].w).join(' ');
          const ok = norm(user) === norm(it.answer);
          $$('.wtile', bankEl).forEach(b => b.disabled = true);
          lineEl.classList.add(ok ? 'ok' : 'bad');
          return { ok, user, sayAnswer: it.answer, feedbackHTML: ok ? `<div class="ans">${esc(it.answer)} ${sayBtn(it.answer)}</div>` : `<div class="ans diff">Зөв: ${diffHTML(it.answer, user)} ${sayBtn(it.answer)}</div>` };
        }
      };
    },
    write(card, it) {
      const isMn = /[а-яөүё]/i.test(it.prompt);
      card.insertAdjacentHTML('afterbegin', `<div class="label">${esc(it.task)}</div>
        <div class="q ${isMn ? 'q-mn' : ''}">${esc(it.prompt)}</div>
        ${it.hints.length ? `<div class="hints">${it.hints.map(h => { return hintChip(h); }).join('')}</div>` : ''}
        <textarea class="field write-field" rows="2" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Герман өгүүлбэрээ бич…"></textarea>
        ${umlautBar()}`);
      $$('.hint-chip', card).forEach(c => c.addEventListener('click', () => {
        const show = !c.classList.contains('revealed');
        c.classList.toggle('revealed', show);
        c.textContent = show ? c.dataset.hw : c.dataset.mn;
        if (show) speak(c.dataset.hw);
      }));
      const f = $('textarea', card);
      let words = 0;
      return {
        hint() {
          const a = it.answers[0].split(' ');
          words = Math.min(a.length - 1, words + 2);
          f.placeholder = a.slice(0, words).join(' ') + ' …';
          f.focus();
        },
        check() {
          if (!f.value.trim()) { f.focus(); return null; }
          const r = judge(f.value, it.answers);
          f.readOnly = true; f.classList.add(r.ok ? 'ok' : 'bad');
          const others = it.answers.filter(a => a !== r.expected);
          return {
            ok: r.ok, typo: r.typo, user: f.value, sayAnswer: r.expected, allowOverride: true,
            feedbackHTML: (r.ok && !r.typo ? '' : `<div class="ans diff">${r.ok ? 'Зөв бичлэг: ' : 'Жишиг хариулт: '}${diffHTML(r.expected, f.value)} ${sayBtn(r.expected)}</div>`)
              + (!r.ok && others.length ? `<div class="ex">Өөр зөв хувилбар: ${others.slice(0, 2).map(esc).join(' · ')}</div>` : '')
              + bookHTML(it, f.value)
          };
        }
      };
    },
    steps(card, it) {
      const rows = it.rows;
      card.insertAdjacentHTML('afterbegin', `<div class="label">${rows.map(r => esc(r.l)).join(rows.length === 3 ? ' → ' : ' · ')}</div>
        <div class="q q-mn">${esc(it.mn)}</div>
        ${it.hints && it.hints.length ? `<div class="hints">${it.hints.map(h => { return hintChip(h); }).join('')}</div>` : ''}
        <div class="tense-rows">${rows.map((r, k) => `<div class="tense-row"><span class="tl">${esc(r.l)}</span><input class="field" data-t="${k}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${esc(r.ph || (k === 0 ? 'Гол өгүүлбэр…' : k === 1 ? 'Туслах өгүүлбэр…' : (it.conj === 'ob' ? '…, ob …' : '…, dass …')))}"><div class="fb" data-fb="${k}"></div></div>`).join('')}</div>
        ${umlautBar()}`);
      $$('.hint-chip', card).forEach(c => c.addEventListener('click', () => {
        const show = !c.classList.contains('revealed');
        c.classList.toggle('revealed', show); c.textContent = show ? c.dataset.hw : c.dataset.mn;
        if (show) speak(c.dataset.hw);
      }));
      const fields = $$('input[data-t]', card);
      fields.forEach((f, k) => f.addEventListener('keydown', e => {
        if (e.key === 'Enter' && k < fields.length - 1 && !f.readOnly) { e.preventDefault(); e.stopPropagation(); fields[k + 1].focus(); }
      }));
      return {
        hint() { $$('.hint-chip', card).forEach(c => { if (!c.classList.contains('revealed')) c.click(); }); fields[0].placeholder = rows[0].a[0].split(' ').slice(0, 2).join(' ') + ' …'; },
        check() {
          if (fields.every(f => !f.value.trim())) { fields[0].focus(); return null; }
          let good = 0; const wrongParts = [];
          rows.forEach((r, k) => {
            const f = fields[k], res = judge(f.value, r.a);
            f.readOnly = true; f.classList.add(res.ok ? 'ok' : 'bad');
            if (res.ok) good++; else wrongParts.push({ type: 'input', label: r.l, q: `${it.mn} → ${r.l}`, answers: r.a });
            $(`[data-fb="${k}"]`, card).innerHTML = res.ok && !res.typo ? '' : `<span class="diff">${res.ok ? 'Бичлэг: ' : ''}${diffHTML(res.expected, f.value)}</span> ${sayBtn(res.expected)}`;
          });
          return { allowOverride: true, ok: good === rows.length, frac: good / rows.length, parts: [good, rows.length], wrongParts: good === rows.length ? null : wrongParts, sayAnswer: rows[rows.length - 1].a[0], feedbackHTML: bookHTML(it, fields[fields.length - 1].value) };
        }
      };
    },
    vforms(card, it) {
      const vb = it.v;
      const grp = D.IRREG_GROUPS.find(g => g.k === vb.g);
      const rows = [['er', 'er/sie/es', 'er …'], ['prat', 'Präteritum', 'er …'], ['perf', 'Perfekt', 'er hat / ist …']];
      card.insertAdjacentHTML('afterbegin', `<div class="label">Stammformen · гурван хэлбэр</div>
        <div class="row-flex" style="gap:10px"><div class="q" style="font-size:clamp(28px,4vw,38px)">${esc(vb.inf)}</div>${sayBtn(vb.inf)}</div>
        <div class="sub-mn" style="margin-top:-12px">${esc(vb.mn)}</div>
        <div class="vhint muted" hidden style="font-size:14px">Загвар: <b>${esc(grp ? grp.p : '')}</b> — ${esc(grp ? grp.mn : '')}</div>
        <div class="tense-rows">${rows.map(([k, n, ph]) => `<div class="tense-row"><span class="tl">${n}</span><input class="field" data-t="${k}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${ph}"><div class="fb" data-fb="${k}"></div></div>`).join('')}</div>
        ${umlautBar()}`);
      const fields = $$('input[data-t]', card);
      fields.forEach((f, k) => f.addEventListener('keydown', e => {
        if (e.key === 'Enter' && k < 2 && !f.readOnly) { e.preventDefault(); e.stopPropagation(); fields[k + 1].focus(); }
      }));
      const strip = s => s.trim().replace(/^(er|sie|es)\s+/i, '');
      return {
        hint() { $('.vhint', card).hidden = false; },
        check() {
          if (fields.every(f => !f.value.trim())) { fields[0].focus(); return null; }
          let good = 0;
          rows.forEach(([k], idx) => {
            const f = fields[idx];
            const r = judge(strip(f.value), [vb[k]]);
            f.readOnly = true; f.classList.add(r.ok ? 'ok' : 'bad');
            if (r.ok) good++;
            $(`[data-fb="${k}"]`, card).innerHTML = r.ok ? '' : `<span class="diff">${diffHTML(vb[k], strip(f.value))}</span>`;
          });
          return {
            ok: good === 3, frac: good / 3, parts: [good, 3],
            sayAnswer: `${vb.inf}. ${vb.prat}. ${vb.perf}.`,
            feedbackHTML: `<div class="ans">${esc(vb.inf)} – ${esc(vb.er)} – ${esc(vb.prat)} – ${esc(vb.perf)} ${sayBtn(`${vb.inf}. ${vb.er}. ${vb.prat}. ${vb.perf}.`)}</div>${vb.mnemo ? `<div class="ex">Санах: ${esc(vb.mnemo)}</div>` : ''}`
          };
        }
      };
    },
    tense3(card, it) {
      const tenses = [['p', 'Präsens'], ['pr', 'Präteritum'], ['pf', 'Perfekt']];
      card.insertAdjacentHTML('afterbegin', `<div class="label">Гурван цагаар орчуул</div>
        <div class="q q-mn">${esc(it.mn)}</div>
        <div class="hints">${it.hints.map(h => { return hintChip(h); }).join('')}</div>
        <div class="tense-rows">${tenses.map(([k, n]) => `<div class="tense-row"><span class="tl">${n}</span><input class="field" data-t="${k}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${n}…"><div class="fb" data-fb="${k}"></div></div>`).join('')}</div>
        ${umlautBar()}`);
      $$('.hint-chip', card).forEach(c => c.addEventListener('click', () => {
        const show = !c.classList.contains('revealed');
        c.classList.toggle('revealed', show);
        c.textContent = show ? c.dataset.hw : (c.dataset.mn || c.dataset.hw);
        if (show) speak(c.dataset.hw);
      }));
      const fields = $$('input[data-t]', card);
      fields.forEach((f, k) => f.addEventListener('keydown', e => {
        if (e.key === 'Enter' && k < 2 && !fields[k + 1].readOnly && !f.readOnly) { e.preventDefault(); e.stopPropagation(); fields[k + 1].focus(); }
      }));
      return {
        hint() { $$('.hint-chip', card).forEach(c => { if (!c.classList.contains('revealed')) c.click(); }); },
        check() {
          if (fields.every(f => !f.value.trim())) { fields[0].focus(); return null; }
          let good = 0; const wrongParts = []; let say = null;
          tenses.forEach(([k, n], idx) => {
            const f = fields[idx];
            const r = judge(f.value, it[k]);
            f.readOnly = true; f.classList.add(r.ok ? 'ok' : 'bad');
            if (r.ok) good++;
            else { wrongParts.push({ type: 'input', label: n, q: `${it.mn} → ${n}`, answers: it[k] }); if (!say) say = r.expected; }
            $(`[data-fb="${k}"]`, card).innerHTML = r.ok && !r.typo ? '' : `<span class="diff">${r.ok ? 'Бичлэг: ' : ''}${diffHTML(r.expected, f.value)}</span> ${sayBtn(r.expected)}`;
          });
          return { ok: good === 3, frac: good / 3, wrongParts: good === 3 ? null : wrongParts, sayAnswer: say || it.pf[0], feedbackHTML: '' };
        }
      };
    }
  };

  function addMistake(it, topic, user) {
    const key = it.type + '|' + (it.q || it.mn);
    if (S.mistakes.some(m => m.key === key)) return;
    S.mistakes.unshift({ key, item: it, topic: topic || '', user: user || '', ts: Date.now() });
    S.mistakes = S.mistakes.slice(0, 150);
    save(); refreshChrome();
  }
  function removeMistake(it) {
    const key = it.type + '|' + (it.q || it.mn);
    S.mistakes = S.mistakes.filter(m => m.key !== key);
    save(); refreshChrome();
  }

  /* ================= ХУУДСУУД ================= */
  const VIEWS = {};

  /* ---------- Нүүр ---------- */
  VIEWS.home = function (v) {
    const hr = new Date().getHours();
    const greet = hr < 11 ? 'Guten Morgen' : hr < 18 ? 'Guten Tag' : 'Guten Abend';
    const t = today(), done = S.daily[t] || 0, goal = CFG.dailyGoalXP;
    const C = 2 * Math.PI * 54, off = C * (1 - Math.min(1, done / goal));
    const L = levelOf(S.xp);
    const due = dueWords().length, fresh = newWords().length;
    const nu = nextUebung(), cp = courseProgress();
    const days = Array.from({ length: 7 }, (_, k) => addDays(t, k - 6));
    const max = Math.max(goal, ...days.map(d => S.daily[d] || 0));
    const wd = ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'];
    const seed = Number(t.replace(/-/g, ''));
    const wotd = W[seed % W.length];
    v.innerHTML = `${topbar('Startseite')}
      <section class="panel hero">
        <div class="greet">
          <div class="label">${greet}</div>
          <h1 class="h-hero">Hallo, ${esc(USER.name)}!</h1>
          <p class="sub-mn" style="margin:0">Өнөөдөр B2 руу дахин нэг алхам. Дүрэм, үг, тоглоом — аль нь эхлэх вэ?</p>
          <div class="row-flex" style="margin-top:6px">
            <a class="btn primary" href="#workbook-${nu.u.id}">${icon('arrow')} Үргэлжлүүлэх: ${esc(nu.u.title)} · Kapitel ${nu.c.nr}</a>
            <a class="btn" href="#karten">${icon('cards')} Карт давтах${due ? ` (${due})` : ''}</a>
          </div>
        </div>
        <div class="ring" title="Өдрийн зорилго">
          <svg viewBox="0 0 120 120"><circle class="ring-bg" cx="60" cy="60" r="54" fill="none" stroke-width="10"/><circle class="ring-fg" cx="60" cy="60" r="54" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${off}"/></svg>
          <div class="ring-txt"><b>${done}</b><span>/ ${goal} XP</span></div>
        </div>
      </section>
      ${D.UNTERRICHT.length ? (() => { const u = D.UNTERRICHT[D.UNTERRICHT.length - 1]; return `<a class="tile" href="#stunde-${u.date}" style="flex-direction:row;align-items:center;gap:16px"><span class="tile-ico">${icon('clock')}</span><span style="display:grid;gap:2px;min-width:0"><span class="label">Сүүлийн хичээл · ${u.date.split('-').reverse().join('.')}</span><span class="h-card">${esc(u.title)}</span><span class="muted" style="font-size:13px">Хичээлээ давтах — ${u.lessons.length} дүрэм, ${u.ues.length} дасгал</span></span><span style="margin-left:auto">${icon('arrow')}</span></a>`; })() : ''}
      <div class="stats4">
        <div class="stat"><span class="label">Level</span><b>${L}</b><span class="muted" style="font-size:13px">${titleOf(L)}</span></div>
        <div class="stat"><span class="label">XP</span><b>${S.xp}</b><span class="muted" style="font-size:13px">нийт</span></div>
        <div class="stat"><span class="label">Streak</span><b>${currentStreak()}</b><span class="muted" style="font-size:13px">өдөр дараалан</span></div>
        <div class="stat"><span class="label">Цээжилсэн</span><b>${learnedCount()}</b><span class="muted" style="font-size:13px">/ ${W.length} үг</span></div>
      </div>
      <div class="grid c2">
        <a class="tile" href="#starke"><span class="tile-ico">${icon('bolt')}</span><span class="h-card">Starke Verben</span><span class="muted">${D.IRREG.length} дүрмийн бус үйл үг — 3 хэлбэрийг нь хурдан цээжил</span>
          <span class="tile-foot"><span class="progress ok"><i style="width:${Math.round(100 * irrMastered() / D.IRREG.length)}%"></i></span>${irrMastered()}/${D.IRREG.length}</span></a>
        <a class="tile" href="#uebungen"><span class="tile-ico">${icon('pencil')}</span><span class="h-card">Kurs</span><span class="muted">Inhaltsverzeichnis-ийн дарааллаар 27 бичгийн дасгал. Дараагийн: ${esc(nu.u.title)}</span>
          <span class="tile-foot"><span class="progress ok"><i style="width:${Math.round(100 * cp.done / cp.total)}%"></i></span>${cp.done}/${cp.total}</span></a>
        <a class="tile" href="#karten"><span class="tile-ico">${icon('cards')}</span><span class="h-card">Karteikarten</span><span class="muted">${due ? `${due} үг давтах цаг болсон` : `${fresh} шинэ үг хүлээж байна`}</span>
          <span class="tile-foot">${icon('clock')} ~${Math.max(2, Math.round((due || 10) * .25))} мин</span></a>
        <a class="tile" href="#artikel"><span class="tile-ico">${icon('rain')}</span><span class="h-card">Artikel-Regen</span><span class="muted">der, die, das — бороо шиг унах үгсийг барь!</span>
          <span class="tile-foot">${icon('trophy')} Рекорд: ${(S.games.artikel || {}).best || 0}</span></a>
      </div>
      <div class="grid c2">
        <section class="panel">
          <div class="row-flex" style="justify-content:space-between"><h2 class="h-sec">Энэ долоо хоног</h2><span class="pill gold">${days.filter(d => (S.daily[d] || 0) >= goal).length}/7 зорилго</span></div>
          <div class="week" style="margin-top:18px">${days.map(d => { const val = S.daily[d] || 0; const [y, m, dd] = d.split('-').map(Number); const wdi = new Date(y, m - 1, dd).getDay(); return `<div class="bar ${d === t ? 'today' : ''} ${val >= goal ? 'hit' : ''}"><em>${val || ''}</em><i style="height:${Math.round(100 * val / max)}%"></i><span>${wd[wdi]}</span></div>`; }).join('')}</div>
        </section>
        <section class="panel">
          <div class="label">Өдрийн үг · Wort des Tages</div>
          <div class="wotd" style="margin-top:12px"><span class="word">${artHTML(wotd)}</span>${sayBtn(wordLabel(wotd))}</div>
          <p class="sub-mn" style="margin:6px 0 0">${esc(wotd.mn)}</p>
          <p class="mono muted" style="margin:6px 0 0;font-size:13px">${esc(wordExtra(wotd))}</p>
        </section>
      </div>
      ${S.mistakes.length ? `<a class="tile" href="#fehler" style="flex-direction:row;align-items:center"><span class="tile-ico">${icon('alert')}</span><span style="display:grid"><span class="h-card">Fehlerheft</span><span class="muted">${S.mistakes.length} алдаа давтахыг хүлээж байна</span></span><span style="margin-left:auto">${icon('arrow')}</span></a>` : ''}`;
    requestAnimationFrame(() => { const r = $('.ring-fg', v); if (r) setTimeout(() => r.style.strokeDashoffset = r.dataset.off, 80); });
  };

  /* ---------- Дүрэм ---------- */
  VIEWS.grammatik = function (v) {
    v.innerHTML = `${topbar('Grammatik')}
      <div class="lesson-head"><h1 class="h-hero">Grammatik</h1><p class="sub-mn" style="margin:0">Самбар дээрх хичээл ба дасгалын номын (Inhaltsverzeichnis) бүх сэдэв. Сэдэв бүр тайлбар, хүснэгт, интерактив дасгалтай.</p></div>
      <div class="row-flex"><span class="pill gold">${lessonsPassed()}/${D.LESSONS.length} сэдэв 80%+</span><a class="btn small" href="#mix">${icon('shuffle')} Холимог дасгал</a></div>
      <div class="grid c2">${D.LESSONS.map(l => {
        const b = (S.lessons[l.id] || {}).best;
        return `<a class="tile ${b >= 80 ? 'done' : ''}" href="#lesson-${l.id}">
          <span class="nr">Kapitel ${esc(l.chapter)} · ${esc(l.source)}</span>
          <span class="h-card">${esc(l.title)}</span>
          <span class="muted">${esc(l.mn)}</span>
          <span class="tile-foot"><span class="progress ${b >= 80 ? 'ok' : ''}"><i style="width:${b || 0}%"></i></span>${b != null ? b + '%' : l.items.length + ' даалгавар'}</span>
        </a>`;
      }).join('')}</div>`;
  };

  VIEWS.lesson = function (v, id) {
    const l = D.LESSONS.find(x => x.id === id);
    if (!l) return VIEWS.grammatik(v);
    const b = (S.lessons[l.id] || {}).best;
    v.innerHTML = `${topbar('Grammatik · Kapitel ' + esc(l.chapter), 'grammatik')}
      <div class="lesson-head">
        <div class="row-flex"><span class="pill gold">Kapitel ${esc(l.chapter)}</span><span class="pill">${esc(l.source)}</span>${b != null ? `<span class="pill ${b >= 80 ? 'ok' : ''}">Шилдэг: ${b}%</span>` : ''}</div>
        <h1 class="h-hero">${esc(l.title)}</h1>
        <p class="sub-mn" style="margin:0">${esc(l.mn)}</p>
      </div>
      <section class="panel"><div class="label" style="margin-bottom:14px">Дүрэм · Regel</div>
        <div class="rules">${l.rules.map((r, k) => `<div class="rule"><span class="dot">${k + 1}</span><div>${r}</div></div>`).join('')}</div>
      </section>
      ${l.table ? `<section class="panel tight"><div class="label" style="margin:4px 4px 12px">Жишээ хүснэгт · самбараас</div><div class="table-wrap"><table class="gt"><thead><tr>${l.table.head.map(hh => `<th>${esc(hh)}</th>`).join('')}</tr></thead><tbody>${l.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}${/[a-zäöü]/i.test(c) && c.length > 3 && c !== '—' && !/^(Nominativ|Akkusativ|Dativ|Genitiv|-)/.test(c) ? sayBtn(c) : ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>` : ''}
      ${l.examples ? `<section class="examples">${l.examples.map(e => `<div class="example">${sayBtn(e.de)}<div><div class="de">${esc(e.de)}</div><div class="mn">${esc(e.mn)}</div></div></div>`).join('')}</section>` : ''}
      <section id="lesson-practice" class="panel" style="display:grid;gap:14px">
        <div class="row-flex" style="justify-content:space-between"><div><div class="label">Дасгал · Übung</div><div class="h-sec" style="margin-top:6px">${l.items.length} даалгавар</div></div>
        <div class="row-flex"><button class="btn gold" id="start-lesson">${icon('arrow')} Дасгал эхлэх</button>${tilesFromItems(l.items).length ? `<button class="btn" id="tiles-lesson">${icon('puzzle')} Үг байрлуулах (${tilesFromItems(l.items).length})</button>` : ''}</div></div>
        <p class="muted" style="margin:0">Сонголт, бичих, өгүүлбэр зохиох даалгаврууд холилдоно. 80%-иас дээш авбал сэдэв «давсан» болно.</p>
      </section>`;
    teacherSay(l.intro.de, l.intro.mn, 'wave', false);
    $('#start-lesson', v).addEventListener('click', () => {
      const host = $('#lesson-practice', v);
      host.className = '';
      runSession(host, shuffle(l.items), {
        title: l.title, topic: l.title, reshuffle: true,
        onFinish: pct => { const r = S.lessons[l.id] || { best: 0, times: 0 }; r.best = Math.max(r.best || 0, pct); r.times++; S.lessons[l.id] = r; save(); checkBadges(); },
        onQuit: () => render()
      });
      host.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
    const tl = $('#tiles-lesson', v);
    if (tl) tl.addEventListener('click', () => {
      const host = $('#lesson-practice', v);
      host.className = '';
      runSession(host, shuffle(tilesFromItems(l.items)), { title: l.title + ' · үг байрлуулах', topic: l.title, onQuit: () => render() });
      host.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  };

  VIEWS.mix = function (v) {
    v.innerHTML = `${topbar('Grammatik · Mix', 'grammatik')}<div class="lesson-head"><h1 class="h-hero">Холимог дасгал</h1><p class="sub-mn" style="margin:0">Бүх сэдвээс санамсаргүй 12 даалгавар — шалгалтын бэлтгэл шиг.</p></div><div id="mix-host"></div>`;
    const all = D.LESSONS.flatMap(l => l.items.map(it => Object.assign({}, it, { label: l.title })));
    runSession($('#mix-host', v), sample(all, 12), { title: 'Холимог', topic: 'Mix', onQuit: () => go('grammatik') });
  };

  /* ---------- Үг байрлуулах дасгал (бичгийн дасгалаас үүсгэнэ) ---------- */
  const SWAP = { hat: 'ist', ist: 'hat', habe: 'bin', bin: 'habe', haben: 'sind', sind: 'haben', dass: 'ob', ob: 'dass', weil: 'denn', als: 'wenn', wenn: 'als', um: 'damit', damit: 'um', den: 'dem', dem: 'den', der: 'die', die: 'der', das: 'dem', seine: 'ihre', ihre: 'seine', zu: 'um', war: 'hatte', hatte: 'war' };
  function distractors(answer) {
    const ws = answer.replace(/[.,!?]/g, '').split(' ');
    const out = [];
    ws.forEach(w => { const sw = SWAP[w.toLowerCase()]; if (sw && !ws.map(x => x.toLowerCase()).includes(sw) && !out.includes(sw) && out.length < 2) out.push(/^[A-ZÄÖÜ]/.test(w) ? sw[0].toUpperCase() + sw.slice(1) : sw); });
    // хүчтэй үйл үгийн буруу Partizip (geschneidet гэх мэт)
    D.IRREG.forEach(v => {
      if (out.length >= 3) return;
      const part = v.perf.split(' ').pop();
      if (ws.includes(part) && /^ge/.test(part)) { const stem = v.inf.replace(/e?n$/, ''); const wrong = 'ge' + stem + 't'; if (wrong !== part) out.push(wrong); }
    });
    return out.slice(0, 3);
  }
  function tilesFromItems(items) {
    const TN = { p: 'Präsens', pr: 'Präteritum', pf: 'Perfekt' };
    const out = [];
    items.forEach(it => {
      if (it.type === 'tense3') {
        const k = pick(['p', 'pr', 'pf']);
        out.push({ type: 'tiles', q: it.mn, sub: TN[k], answer: it[k][0], distract: distractors(it[k][0]) });
      } else if (it.type === 'write') {
        out.push({ type: 'tiles', q: it.prompt, sub: it.task, label: /[а-яөүё]/i.test(it.prompt) ? 'Герман өгүүлбэрийг үгсээс угсар' : 'Нийлүүлсэн өгүүлбэрийг угсар', answer: it.answers[0], distract: distractors(it.answers[0]) });
      } else if (it.type === 'steps') {
        const r = it.conj === 'zu' ? pick(it.rows) : it.rows[it.rows.length - 1];
        const a = r.a[0];
        out.push({ type: 'tiles', q: it.mn, sub: r.l, answer: a, distract: distractors(a) });
      } else if (it.type === 'input' && /[а-яөүё]/i.test(it.q) && it.answers[0].split(' ').length > 2) {
        out.push({ type: 'tiles', q: it.q, sub: it.label, answer: it.answers[0], distract: distractors(it.answers[0]) });
      } else if (it.type === 'tiles') out.push(it);
    });
    return out;
  }

  /* ---------- Курс (Inhaltsverzeichnis-ийн дарааллаар) ---------- */
  const WB = id => D.WORKBOOK.find(u => u.id === id);
  const courseOrder = () => D.COURSE.flatMap(c => c.ues.map(id => ({ u: WB(id), c })));
  function nextUebung() {
    const all = courseOrder();
    return all.find(x => !((S.workbook[x.u.id] || {}).best >= 80)) || all[0];
  }
  function afterUebung(id) {
    const all = courseOrder(); const k = all.findIndex(x => x.u.id === id);
    return all[k + 1] || null;
  }
  function courseProgress() {
    const all = courseOrder();
    return { done: all.filter(x => (S.workbook[x.u.id] || {}).best >= 80).length, total: all.length };
  }
  VIEWS.uebungen = function (v) {
    const nx = nextUebung(), cp = courseProgress();
    v.innerHTML = `${topbar('Kurs')}
      <div class="lesson-head"><h1 class="h-hero">Kurs</h1>
        <p class="sub-mn" style="margin:0">Дасгалын номын Inhaltsverzeichnis-ийн дарааллаар. Kapitel бүрт эхлээд дүрмээ уншаад, дараа нь бичгийн дасгалаа хий. 80%-иас дээш авбал дасгал «давсан» болно.</p></div>
      <section class="panel" style="display:grid;gap:14px">
        <div class="row-flex" style="justify-content:space-between;align-items:flex-end">
          <div style="display:grid;gap:4px"><div class="label">Курсийн явц</div><div class="h-hero" style="font-size:40px">${cp.done}<span class="muted" style="font-size:18px;font-weight:500"> / ${cp.total} Übung</span></div></div>
          <div class="row-flex"><a class="btn gold" href="#workbook-${nx.u.id}">${icon('pencil')} Дараагийн: ${esc(nx.u.title)} · ${esc(nx.u.page)}</a><a class="btn" href="#workbook-${nx.u.id}~tiles">${icon('puzzle')} Үг байрлуулах</a></div>
        </div>
        <div class="progress ok"><i style="width:${Math.round(100 * cp.done / cp.total)}%"></i></div>
        <p class="muted" style="margin:0;font-size:13px"><span class="pill gold">номоос</span> — дасгалын номын яг өгүүлбэр. <span class="pill">зохиосон</span> — тухайн сэдэв ба хичээлийн үйл үгээр зохиосон дасгал. Номын хуудсыг зураг авч өгвөл жинхэнэ дасгалаар сольж болно.</p>
      </section>
      ${D.COURSE.map(c => `<section class="panel kap">
        <div class="row-flex" style="justify-content:space-between;align-items:flex-start">
          <div style="display:grid;gap:4px;min-width:0;flex:1"><div class="label">Kapitel ${c.nr}</div><h2 class="h-sec">${esc(c.title)}</h2></div>
          <a class="btn small" href="#lesson-${c.lesson}">${icon('book')} Дүрэм</a>
        </div>
        <div class="ue-list">${c.ues.map(id => {
          const u = WB(id), r = S.workbook[id] || {};
          return `<a class="ue-row ${r.best >= 80 ? 'done' : ''} ${nx.u.id === id ? 'next' : ''}" href="#workbook-${id}">
            <span class="ue-t"><b>${esc(u.title)}</b> <span class="muted mono" style="font-size:12px">${esc(u.page)} · ${u.items.length}</span><span class="ue-mn">${esc(u.mn)}</span></span>
            <span class="row-flex" style="gap:6px;flex-wrap:nowrap">${(D.WORDLISTS || {})[id] ? `<span class="pill" role="link" tabindex="0" data-words="${id}" title="Энэ дасгалын үгс">${icon('cards')} Үгс</span>` : ''}<span class="pill ${u.made ? '' : 'gold'}">${u.made ? (u.src || 'зохиосон') : 'номоос'}</span></span>
            <span class="progress ok"><i style="width:${r.best || 0}%"></i></span>
            <span class="mono muted ue-pct">${r.best != null ? r.best + '%' : '—'}</span></a>`;
        }).join('')}</div>
      </section>`).join('')}`;
    $$('[data-words]', v).forEach(p => p.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); location.hash = 'workbook-' + p.dataset.words + '~words'; }));
  };
  VIEWS.workbook = function (v, arg) {
    const [id, n] = String(arg || '').split('~');
    const u = WB(id);
    if (!u) return VIEWS.uebungen(v);
    const chap = D.COURSE.find(c => c.ues.includes(id));
    const tilesMode = n === 'tiles', wordsMode = n === 'words';
    const WL = (D.WORDLISTS || {})[id];
    let items = n && !tilesMode ? sample(u.items, Number(n)) : u.items.slice();
    if (tilesMode) items = tilesFromItems(items);
    const nxt = afterUebung(id);
    v.innerHTML = `${topbar((chap ? 'Kapitel ' + chap.nr + ' · ' : '') + u.title + ' · ' + u.page, 'uebungen')}
      <div class="lesson-head">
        <div class="row-flex"><span class="pill ${u.made ? '' : 'gold'}">${u.made ? (u.src || 'зохиосон дасгал') : 'номын дасгал'}</span>${chap ? `<a class="pill" href="#lesson-${chap.lesson}" style="text-decoration:none">${icon('book')} ${esc(chap.title)}</a>` : ''}</div>
        <h1 class="h-hero">${esc(u.title)}</h1><p class="sub-mn" style="margin:0">${esc(u.mn)}</p>
        <div class="seg" style="justify-self:start"><a class="${tilesMode || n ? '' : 'on'}" href="#workbook-${id}">${icon('pencil')} Бичих</a><a class="${tilesMode ? 'on' : ''}" href="#workbook-${id}~tiles">${icon('puzzle')} Үг байрлуулах</a>${WL ? `<a class="${wordsMode ? 'on' : ''}" href="#workbook-${id}~words">${icon('cards')} Үгс (${WL.length})</a>` : ''}${u.items.length > 12 ? `<a class="${n === '10' ? 'on' : ''}" href="#workbook-${id}~10">${icon('shuffle')} 10 санамсаргүй</a>` : ''}</div></div><div id="wb-host"></div>`;
    if (u.lsg) $('.lesson-head .row-flex', v).insertAdjacentHTML('beforeend', `<span class="pill gold">${icon('book')} ${esc(u.lsg)}</span>`);
    if (wordsMode && WL) return wordsView($('#wb-host', v), u, WL);
    if (tilesMode && !items.length) { $('#wb-host', v).innerHTML = `<div class="panel empty">Энэ дасгалд үг байрлуулах хувилбар алга. Бичих горимоор хийгээрэй.</div>`; return; }
    teacherSay('Schreiben, schreiben, schreiben! Los geht es!', 'Бич, бич, бич! Эхэлцгээе!', 'wave', false);
    runSession($('#wb-host', v), items, {
      title: u.title, topic: u.title,
      next: nxt ? { href: 'workbook-' + nxt.u.id, label: 'Дараагийн: ' + nxt.u.title } : null,
      onFinish: pct => { if (tilesMode) { save(); return; } const r = S.workbook[u.id] || {}; r.best = Math.max(r.best || 0, pct); if (!n) r.full = true; S.workbook[u.id] = r; save(); checkBadges(); },
      onQuit: () => go('uebungen')
    });
  };

  /* Дасгалын үгсийн жагсаалт: харах, сонсох, нууж цээжлэх, шалгах */
  function wordsView(host, u, WL) {
    let hide = '';
    const draw = () => {
      host.innerHTML = `<section class="panel tight" style="display:grid;gap:14px">
        <div class="row-flex" style="justify-content:space-between">
          <div class="seg" id="wv-mode">${[['', 'Бүгд'], ['mn', 'Монголыг нуух'], ['de', 'Германыг нуух']].map(([k, t]) => `<button data-m="${k}" class="${hide === k ? 'on' : ''}">${t}</button>`).join('')}</div>
          <div class="row-flex" style="gap:8px"><button class="btn small" id="wv-say">${icon('speaker')} Бүгдийг сонсох</button><button class="btn small primary" id="wv-test">${icon('target')} Үгээ шалгах</button></div>
        </div>
        <p class="muted" style="margin:0;font-size:13px">${esc(u.title)} дасгалын өгүүлбэрүүдэд хэрэглэгдэх ${WL.length} үг. Нуусан үг дээр дарвал харагдана. # — аль өгүүлбэрт гарахыг заана.</p>
        <div class="wlist ${hide ? 'vt-hide-' + hide : ''}">${WL.map(w => `<div class="witem wv"><div><div class="wde" data-h="de">${esc(w.de)}</div><div class="wsub">${typeof w.src === 'number' ? '#' + w.src : 'ном'}</div></div><div class="wmn" data-h="mn">${esc(w.mn)}</div><div class="row-flex" style="gap:8px">${sayBtn(w.de)}</div></div>`).join('')}</div>
      </section>`;
      $$('#wv-mode button', host).forEach(b => b.addEventListener('click', () => { hide = b.dataset.m; draw(); }));
      $$('.wv [data-h]', host).forEach(el => el.addEventListener('click', () => el.classList.toggle('peek')));
      $('#wv-say', host).addEventListener('click', () => { let k = 0; const nx = () => { if (k < WL.length && location.hash.endsWith('~words')) { speak(WL[k++].de); setTimeout(nx, 1800); } }; nx(); });
      $('#wv-test', host).addEventListener('click', () => {
        const pool = sample(WL, Math.min(12, WL.length));
        const items = pool.map((w, k) => k % 2 ? ({ type: 'input', label: 'Герман үгийг бич', q: w.mn, answers: [w.de], explain: u.title + (typeof w.src === 'number' ? ' · #' + w.src : '') })
          : ({ type: 'mc', label: 'Монгол утгыг сонго', q: w.de, options: shuffle([w.mn].concat(sample(WL.filter(x => x !== w), 3).map(x => x.mn))), answer: w.mn }));
        runSession(host, items, { title: u.title + ' · Үгс', topic: u.title + ' үгс', onQuit: draw, next: { href: 'workbook-' + u.id, label: 'Дасгал руу' } });
      });
    };
    draw();
  }

  /* ---------- Үгсийн сан ---------- */
  let vocabFilter = 'all', vocabQuery = '';
  VIEWS.wortschatz = function (v) {
    const boxes = [0, 1, 2, 3, 4, 5].map(b => W.filter(w => (S.srs[w.id] ? S.srs[w.id].box : 0) === b).length);
    const mb = Math.max(1, ...boxes);
    v.innerHTML = `${topbar('Wortschatz')}
      <div class="lesson-head"><h1 class="h-hero">Wortschatz</h1><p class="sub-mn" style="margin:0">${W.length} үг — дасгалын ном (Übung 1, 2) ба самбараас. Картууд Лейтнерийн хайрцгийн аргаар давтагдана: мэдэх тусам хойш тавигдана.</p></div>
      <section class="panel">
        <div class="row-flex" style="justify-content:space-between;align-items:flex-end">
          <div style="display:grid;gap:6px"><div class="label">Өнөөдөр давтах</div><div class="h-hero" style="font-size:36px">${dueWords().length} <span class="muted" style="font-size:16px;font-weight:500">үг · ${newWords().length} шинэ</span></div></div>
          <div style="flex:1;min-width:200px;max-width:320px"><div class="boxes">${boxes.map((c, k) => `<div><i style="height:${Math.round(100 * c / mb)}%"></i><span>${k === 0 ? 'шинэ' : k}</span></div>`).join('')}</div></div>
        </div>
      </section>
      <div class="modes">
        <a class="tile" href="#karten"><span class="tile-ico">${icon('cards')}</span><span class="h-card">Karteikarten</span><span class="muted">Эргэдэг 3D карт</span></a>
        <a class="tile" href="#quiz"><span class="tile-ico">${icon('target')}</span><span class="h-card">Quiz</span><span class="muted">4 сонголттой</span></a>
        <a class="tile" href="#tippen"><span class="tile-ico">${icon('keyboard')}</span><span class="h-card">Tippen</span><span class="muted">Артикльтай нь бич</span></a>
        <a class="tile" href="#hoeren"><span class="tile-ico">${icon('speaker')}</span><span class="h-card">Hören</span><span class="muted">Сонсоод таа</span></a>
      </div>
      ${Object.keys(D.WORDLISTS || {}).length ? `<section class="panel tight" style="display:grid;gap:10px"><div class="label">Дасгал бүрийн үгс</div><div class="wb-words">${Object.keys(D.WORDLISTS).map(id => `<a class="btn small" href="#workbook-${id}~words">${icon('cards')} ${esc(WB(id).title)} · ${D.WORDLISTS[id].length}</a>`).join('')}</div></section>` : ''}
      <section class="panel tight" style="display:grid;gap:14px">
        <div class="search"><input class="field" id="vq" placeholder="Хайх: Wecker, сэрүүлэг…" value="${esc(vocabQuery)}">
          <div class="seg" id="vf">${[['all', 'Бүгд'], ['noun', 'Nomen'], ['verb', 'Verben'], ['ndekl', 'N-Dekl.'], ['ue1', 'Übung 1'], ['ue2', 'Übung 2']].map(([k, t]) => `<button data-f="${k}" class="${vocabFilter === k ? 'on' : ''}">${t}</button>`).join('')}</div></div>
        <div class="wlist" id="wl"></div>
      </section>`;
    const draw = () => {
      const q = norm(vocabQuery);
      const list = W.filter(w => (vocabFilter === 'all' || w.type === vocabFilter || w.tags.includes(vocabFilter)) && (!q || norm(wordLabel(w) + ' ' + w.mn).includes(q)));
      $('#wl', v).innerHTML = list.length ? list.map(w => {
        const box = S.srs[w.id] ? S.srs[w.id].box : 0;
        return `<div class="witem"><div><div class="wde">${artHTML(w)}</div><div class="wsub">${esc(wordExtra(w))}</div></div><div class="wmn">${esc(w.mn)}</div>
          <div class="row-flex" style="gap:8px"><span class="lvl-dots" title="Хайрцаг ${box}/5">${[1, 2, 3, 4, 5].map(k => `<i class="${k <= box ? 'on' : ''}"></i>`).join('')}</span>${sayBtn(wordLabel(w))}</div></div>`;
      }).join('') : `<div class="empty">Ийм үг олдсонгүй.</div>`;
    };
    $('#vq', v).addEventListener('input', e => { vocabQuery = e.target.value; draw(); });
    $$('#vf button', v).forEach(b => b.addEventListener('click', () => { vocabFilter = b.dataset.f; $$('#vf button', v).forEach(x => x.classList.toggle('on', x === b)); draw(); }));
    draw();
  };

  VIEWS.karten = function (v, tag) {
    const inTag = w => !tag || w.tags.includes(tag);
    let queue = dueWords().filter(inTag).sort((a, b) => S.srs[a.id].due.localeCompare(S.srs[b.id].due)).slice(0, 20);
    if (queue.length < 12) queue = queue.concat(newWords().filter(inTag).slice(0, Math.min(tag ? 12 : 8, 12 - queue.length)));
    if (!queue.length) queue = sample(W.filter(inTag), 10);
    queue = shuffle(queue);
    let idx = 0, flipped = false, known = 0;
    const dir = () => S.settings.cardDir;
    v.innerHTML = `${topbar(tag ? 'Starke Verben · Karteikarten' : 'Wortschatz · Karteikarten', tag ? 'starke' : 'wortschatz')}
      <div class="row-flex" style="justify-content:space-between">
        <h1 class="h-sec">Karteikarten</h1>
        <div class="seg" id="dir"><button data-d="de" class="${dir() === 'de' ? 'on' : ''}">DE → MN</button><button data-d="mn" class="${dir() === 'mn' ? 'on' : ''}">MN → DE</button></div>
      </div>
      <div class="session-top"><div class="progress"><i id="kp" style="width:0%"></i></div><span class="mono muted" id="kc"></span></div>
      <div class="flash-wrap"><div class="flash" id="flash" tabindex="0" aria-label="Карт — эргүүлэх"></div></div>
      <div class="rate" id="rate" hidden>
        <button class="btn r1" data-r="1">Мэдэхгүй<small>1 · дахин</small></button>
        <button class="btn" data-r="2">Бараг<small>2 · маргааш</small></button>
        <button class="btn r3" data-r="3">Мэднэ<small>3 · хойшлуул</small></button>
      </div>
      <p class="muted" style="text-align:center;margin:0" id="khint">Карт дээр дарж (эсвэл Space) эргүүлнэ.</p>`;
    const flash = $('#flash', v), rate = $('#rate', v);
    function draw() {
      const w = queue[idx];
      flipped = false; flash.classList.remove('flipped'); rate.hidden = true;
      $('#kp', v).style.width = (100 * idx / queue.length) + '%';
      $('#kc', v).textContent = `${idx + 1} / ${queue.length}`;
      const deFace = `<span class="corner pill">${w.type === 'noun' ? 'Nomen' : w.type === 'verb' ? 'Verb' : 'Adjektiv'}</span><span class="corner-r">${sayBtn(wordLabel(w))}</span><div class="fword">${artHTML(w)}</div><div class="fextra">${esc(wordExtra(w))}</div>`;
      const mnFace = `<span class="corner pill">Монгол</span><div class="fmn">${esc(w.mn)}</div>`;
      const mnem = w.mnemo ? `<div class="fextra" style="font-family:var(--font-body);font-style:italic;max-width:440px;margin:0 auto">${esc(w.mnemo)}</div>` : '';
      const front = dir() === 'de' ? deFace : mnFace, back = (dir() === 'de' ? `${mnFace}<div class="fextra">${esc(wordLabel(w))}</div>` : deFace) + mnem;
      flash.innerHTML = `<div class="face front">${front}</div><div class="face back">${back}</div>`;
      if (dir() === 'de' && S.settings.voice) setTimeout(() => speak(wordLabel(w)), 200);
    }
    function flip() {
      if (idx >= queue.length) return;
      flipped = !flipped; flash.classList.toggle('flipped', flipped);
      if (flipped) { rate.hidden = false; if (dir() === 'mn') speak(wordLabel(queue[idx])); }
    }
    function rateIt(g) {
      if (!flipped || idx >= queue.length) return;
      const w = queue[idx];
      srsRate(w.id, g);
      addXP(g === 3 ? 4 : g === 2 ? 2 : 1, rate);
      if (g === 3) known++;
      if (g === 1) queue.push(w);
      if (g === 3 && Math.random() < .3) { const p = pick(D.PRAISE); teacherSay(p.de, p.mn, 'happy'); }
      idx++;
      if (idx >= queue.length) return done();
      draw();
    }
    function done() {
      checkBadges();
      teacherSay('Karten fertig! Super!', 'Картууд дууслаа! Гайхалтай!', 'happy', true);
      confetti();
      v.querySelector('.flash-wrap').outerHTML = `<div class="panel result"><div class="label">Karteikarten · дууслаа</div><div class="big">${known}</div><div class="muted">үгийг «мэднэ» гэж үнэллээ · нийт цээжилсэн: ${learnedCount()}</div>
        <div class="row-flex" style="justify-content:center"><a class="btn primary" data-go="karten${tag ? '-' + tag : ''}" href="#karten${tag ? '-' + tag : ''}">${icon('refresh')} Дахин</a><a class="btn" href="#quiz">Quiz</a><a class="btn ghost" href="#wortschatz">Буцах</a></div></div>`;
      rate.remove(); $('#khint', v).remove();
      $('#kp', v).style.width = '100%';
    }
    flash.addEventListener('click', e => { if (e.target.closest('[data-say]')) return; flip(); });
    $$('#rate button', v).forEach(b => b.addEventListener('click', () => rateIt(Number(b.dataset.r))));
    $$('#dir button', v).forEach(b => b.addEventListener('click', () => { S.settings.cardDir = b.dataset.d; save(); $$('#dir button', v).forEach(x => x.classList.toggle('on', x === b)); draw(); }));
    setKeys(e => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
      else if (['1', '2', '3'].includes(e.key)) rateIt(Number(e.key));
    });
    draw();
  };

  function vocabPool(n) {
    const due = dueWords(); const rest = shuffle(W.filter(w => !due.includes(w)));
    return shuffle(due.slice(0, n).concat(rest).slice(0, n));
  }
  function distract(w, field, n = 3) {
    const pool = W.filter(x => x !== w && x.type === w.type && x[field] !== w[field]);
    return sample(pool, n).map(x => field === 'label' ? wordLabel(x) : x[field]);
  }
  const vocabOnAnswer = (it, ok) => { if (it.wid) srsRate(it.wid, ok ? 3 : 1); };
  VIEWS.quiz = function (v) {
    v.innerHTML = `${topbar('Wortschatz · Quiz', 'wortschatz')}<h1 class="h-sec">Quiz</h1><div id="qz"></div>`;
    const items = vocabPool(10).map(w => Math.random() < .5
      ? { type: 'mc', wid: w.id, label: 'Утгыг нь сонго', q: wordLabel(w), options: [w.mn, ...distract(w, 'mn')], answer: w.mn, noSpeak: true, explain: wordExtra(w) }
      : { type: 'mc', wid: w.id, label: 'Герман үгийг сонго', q: w.mn, options: [wordLabel(w), ...distract(w, 'label')], answer: wordLabel(w), explain: wordExtra(w) });
    runSession($('#qz', v), items, { title: 'Wortschatz-Quiz', topic: 'Wortschatz', onAnswer: vocabOnAnswer, onQuit: () => go('wortschatz') });
  };
  VIEWS.tippen = function (v) {
    v.innerHTML = `${topbar('Wortschatz · Tippen', 'wortschatz')}<h1 class="h-sec">Tippen</h1><p class="muted" style="margin:0">Нэр үгийг артикльтай нь бич (жишээ: der Wecker). Үйл үгийг Infinitiv хэлбэрээр.</p><div id="tp"></div>`;
    const items = vocabPool(10).map(w => ({ type: 'input', wid: w.id, label: w.type === 'noun' ? 'Артикльтай нь бич' : 'Герман үгийг бич', q: w.mn, answers: [wordLabel(w)], explain: wordExtra(w) }));
    runSession($('#tp', v), items, { title: 'Tippen', topic: 'Wortschatz', onAnswer: vocabOnAnswer, onQuit: () => go('wortschatz') });
  };
  VIEWS.hoeren = function (v) {
    v.innerHTML = `${topbar('Wortschatz · Hören', 'wortschatz')}<h1 class="h-sec">Hören</h1><p class="muted" style="margin:0">Багш үгийг дуудна — утгыг нь сонго. Space — дахин сонсох.</p><div id="hr"></div>`;
    if (!('speechSynthesis' in window)) { $('#hr', v).innerHTML = `<div class="panel empty">Энэ браузер дуу унших (speech synthesis) боломжгүй байна. Chrome эсвэл Edge-ээр нээгээрэй.</div>`; return; }
    const items = vocabPool(8).map(w => ({ type: 'listen', wid: w.id, audio: wordLabel(w), options: [w.mn, ...distract(w, 'mn')], answer: w.mn }));
    runSession($('#hr', v), items, { title: 'Hören', topic: 'Wortschatz', onAnswer: vocabOnAnswer, onQuit: () => go('wortschatz') });
  };

  /* ---------- Дүрмийн бус үйл үг (Starke Verben) ---------- */
  const SEITE = { seite1: { p: 'Хуудас 1 · хичээлийн жагсаалт', mn: 'fahren, gehen, kommen … treffen — 27 үйл үг' }, seite2: { p: 'Хуудас 2 · хичээлийн жагсаалт', mn: 'helfen, tragen, geben … stehlen — 28 үйл үг' } };
  const irrFilter = key => key === 'seite1' || key === 'seite2' ? D.IRREG.filter(x => x.s === (key === 'seite1' ? 1 : 2)).sort((a, b) => a.so - b.so) : D.IRREG.filter(x => x.g === key);
  const irrGroupInfo = key => SEITE[key] || D.IRREG_GROUPS.find(x => x.k === key);
  function irrMastered(list) { return (list || D.IRREG).filter(x => ((S.srs[x.wid] || {}).box || 0) >= 3).length; }
  const auxHTML = perf => esc(perf).replace(/^ist /, '<span class="aux-sein">ist</span> ');
  function irrTable(list, opts = {}) {
    return `<div class="row-flex" style="justify-content:space-between">
        <div class="seg" data-hidectl>${[['none', 'Бүгдийг харах'], ['forms', 'Хэлбэрийг нуух'], ['de', 'Германыг нуух']].map(([k, t]) => `<button data-h="${k}" class="${k === 'none' ? 'on' : ''}">${t}</button>`).join('')}</div>
        ${opts.search ? `<input class="field" data-vsearch placeholder="Хайх: schreiben, бичих…" style="max-width:240px;padding:9px 14px;font-size:14px">` : ''}
      </div>
      <p class="muted" data-hidetip hidden style="margin:0;font-size:13px">Нуусан нүдэн дээр дарж шалгана. Эхлээд толгойдоо хэлээд дараа нь нээ!</p>
      <div class="table-wrap"><table class="gt vt"><thead><tr><th>Infinitiv</th><th>er/sie/es</th><th>Präteritum</th><th>Perfekt</th><th>Монгол</th><th></th></tr></thead>
      <tbody>${list.map((x, k) => {
        const box = (S.srs[x.wid] || {}).box || 0;
        return `<tr data-k="${k}" data-s="${esc(norm(x.inf + ' ' + x.mn + ' ' + x.prat + ' ' + x.perf))}">
          <td class="d"><b>${esc(x.inf)}</b> <span class="lvl-dots" title="Хайрцаг ${box}/5">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= box ? 'on' : ''}"></i>`).join('')}</span></td>
          <td class="d f">${esc(x.er)}</td><td class="d f">${esc(x.prat)}</td><td class="d f">${auxHTML(x.perf)}</td>
          <td class="m">${esc(x.mn)}${x.mnemo ? `<div class="mnemo">${esc(x.mnemo)}</div>` : ''}</td><td>${sayBtn(`${x.inf}. ${x.prat}. ${x.perf}.`)}</td></tr>`;
      }).join('')}</tbody></table></div>`;
  }
  function wireIrrTable(root) {
    const table = $('table.vt', root);
    $$('[data-hidectl] button', root).forEach(b => b.addEventListener('click', () => {
      $$('[data-hidectl] button', root).forEach(x => x.classList.toggle('on', x === b));
      table.classList.toggle('hide-forms', b.dataset.h === 'forms');
      table.classList.toggle('hide-de', b.dataset.h === 'de');
      $$('td.rev', table).forEach(td => td.classList.remove('rev'));
      $('[data-hidetip]', root).hidden = b.dataset.h === 'none';
    }));
    table.addEventListener('click', e => {
      const td = e.target.closest('td.d');
      if (!td || !(table.classList.contains('hide-forms') || table.classList.contains('hide-de'))) return;
      td.classList.toggle('rev');
      if (td.classList.contains('rev')) speak(td.textContent.trim());
    });
    const s = $('[data-vsearch]', root);
    if (s) s.addEventListener('input', () => { const q = norm(s.value); $$('tbody tr', table).forEach(tr => tr.hidden = !!q && !tr.dataset.s.includes(q)); });
  }

  VIEWS.starke = function (v) {
    const I = D.IRREG, m = irrMastered();
    const due = I.filter(x => S.srs[x.wid] && S.srs[x.wid].due <= today()).length;
    v.innerHTML = `${topbar('Starke Verben')}
      <div class="lesson-head"><h1 class="h-hero">Starke Verben</h1>
        <p class="sub-mn" style="margin:0">${I.length} дүрмийн бус үйл үг — эгшгийн өөрчлөлтийн <b>загвараар</b> бүлэглэсэн. Нэг загварыг мэдвэл тэр бүлгийн бүх үгийг хамт цээжилнэ.</p></div>
      <section class="panel" style="display:grid;gap:16px">
        <div class="row-flex" style="justify-content:space-between;align-items:flex-end">
          <div style="display:grid;gap:4px"><div class="label">Цээжилсэн</div><div class="h-hero" style="font-size:40px">${m}<span class="muted" style="font-size:18px;font-weight:500"> / ${I.length}</span></div></div>
          <span class="pill gold">${due ? due + ' үг давтах цаг болсон' : 'Өнөөдрийн давталт хоосон'}</span>
        </div>
        <div class="progress ok"><i style="width:${Math.round(100 * m / I.length)}%"></i></div>
        <div class="row-flex">
          <a class="btn gold" href="#vdrill">${icon('keyboard')} Өдрийн 12 — Stammformen</a>
          <a class="btn" href="#karten-irr">${icon('cards')} Карт</a>
          <a class="btn" href="#verben">${icon('clock')} Verb-Blitz</a>
        </div>
      </section>
      <section class="panel" style="display:grid;gap:14px">
        <div class="label">Хичээлийн жагсаалт · ойрын хугацаанд цээжлэх</div>
        <h2 class="h-sec">${I.filter(x => x.s).length} үйл үг — санах дүрслэлтэй</h2>
        <div class="grid c2">${[1, 2].map(n => {
          const list = I.filter(x => x.s === n), gm = irrMastered(list);
          return `<div class="tile" style="gap:12px">
            <span class="nr">Хуудас ${n} · ${list.length} үйл үг</span>
            <span class="muted">${list.slice().sort((a, b) => a.so - b.so).slice(0, 9).map(x => esc(x.inf)).join(', ')} …</span>
            <span class="tile-foot"><span class="progress ok"><i style="width:${Math.round(100 * gm / list.length)}%"></i></span>${gm}/${list.length}</span>
            <div class="row-flex" style="gap:8px"><a class="btn small gold" href="#vdrill-seite${n}">Бичиж давтах</a><a class="btn small" href="#vgruppe-seite${n}">Хүснэгт · сонсох</a><a class="btn small" href="#karten-s${n}">Карт</a></div>
          </div>`;
        }).join('')}</div>
      </section>
      <h2 class="h-sec">Загвараар цээжлэх</h2>
      <div class="grid c2">${D.IRREG_GROUPS.map(g => {
        const list = I.filter(x => x.g === g.k), gm = irrMastered(list);
        return `<a class="tile ${gm === list.length ? 'done' : ''}" href="#vgruppe-${g.k}">
          <span class="nr">${list.length} үйл үг</span>
          <span class="h-card">${esc(g.p)}</span>
          <span class="muted">${esc(g.mn)}</span>
          <span class="tile-foot"><span class="progress ok"><i style="width:${Math.round(100 * gm / list.length)}%"></i></span>${gm}/${list.length}</span></a>`;
      }).join('')}</div>
      <section class="panel tight" style="display:grid;gap:14px" id="irr-all"><div class="label" style="margin:4px 4px 0">Бүх жагсаалт</div>${irrTable(I, { search: true })}</section>`;
    wireIrrTable($('#irr-all', v));
    teacherSay('Starke Verben muss man auswendig lernen!', 'Хүчтэй үйл үгсийг цээжлэх л ёстой. Загвараар нь сурвал хурдан!', 'wave', false);
  };

  VIEWS.vgruppe = function (v, key) {
    const g = irrGroupInfo(key);
    if (!g) return VIEWS.starke(v);
    const list = irrFilter(key);
    v.innerHTML = `${topbar('Starke Verben · ' + esc(g.p), 'starke')}
      <div class="lesson-head"><span class="pill gold" style="justify-self:start">${list.length} үйл үг</span><h1 class="h-hero">${esc(g.p)}</h1><p class="sub-mn" style="margin:0">${esc(g.mn)}</p></div>
      <div class="row-flex">
        <a class="btn gold" href="#vdrill-${key}">${icon('keyboard')} Энэ бүлгийг давтах</a>
        <button class="btn" id="playall">${icon('speaker')} Дуудаж сонсох</button>
      </div>
      <p class="muted" style="margin:0;font-size:14px">«Дуудаж сонсох» нь бүх үгийг <i>schreiben – schrieb – geschrieben</i> гэж дараалан уншина. Хамт чангаар давтаж хэлбэл хамгийн хурдан тогтоно.</p>
      <section class="panel tight" style="display:grid;gap:14px" id="grp">${irrTable(list)}</section>`;
    wireIrrTable($('#grp', v));
    let playing = false;
    const btn = $('#playall', v);
    const stop = () => { playing = false; btn.innerHTML = `${icon('speaker')} Дуудаж сонсох`; $$('tr.playing', v).forEach(r => r.classList.remove('playing')); if ('speechSynthesis' in window) speechSynthesis.cancel(); };
    btn.addEventListener('click', () => {
      if (playing) return stop();
      if (!('speechSynthesis' in window)) { toast('Энэ браузер дуу уншихгүй байна'); return; }
      playing = true; btn.innerHTML = `${icon('x')} Зогсоох`;
      let k = 0;
      const rows = $$('tbody tr', v);
      const next = () => {
        if (!playing) return;
        if (k >= list.length) return stop();
        rows.forEach(r => r.classList.remove('playing'));
        rows[k].classList.add('playing');
        rows[k].scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
        const x = list[k++];
        speak(`${x.inf}. ${x.prat}. ${x.perf}.`, { rate: Math.min(S.settings.rate, .88), onend: () => setTimeout(next, 700) });
      };
      next();
    });
    onDispose(() => { playing = false; });
  };

  VIEWS.vdrill = function (v, key) {
    const I = D.IRREG;
    let list;
    if (key) list = shuffle(irrFilter(key));
    else {
      const due = shuffle(I.filter(x => S.srs[x.wid] && S.srs[x.wid].due <= today()));
      list = due.slice(0, 12);
      if (list.length < 12) list = list.concat(I.filter(x => !S.srs[x.wid]).slice(0, 12 - list.length));
      if (list.length < 12) list = list.concat(sample(I.filter(x => !list.includes(x)), 12 - list.length));
      list = shuffle(list);
    }
    const g = key && irrGroupInfo(key);
    v.innerHTML = `${topbar('Starke Verben · Stammformen', key ? 'vgruppe-' + key : 'starke')}
      <div class="lesson-head"><h1 class="h-sec">${g ? esc(g.p) : 'Өдрийн 12'}</h1><p class="muted" style="margin:0">er/sie/es хэлбэр, Präteritum, Perfekt (haben/sein-тэй нь) бич. Enter дарвал дараагийн нүд рүү шилжинэ. Сануулга нь эгшгийн загварыг харуулна.</p></div>
      <div id="vd"></div>`;
    runSession($('#vd', v), list.map(x => ({ type: 'vforms', q: x.inf + ' → Stammformen', v: x, wid: x.wid })), {
      title: 'Stammformen', topic: 'Starke Verben', reshuffle: true, onAnswer: vocabOnAnswer,
      onQuit: () => go(key ? 'vgruppe-' + key : 'starke')
    });
  };

  /* ---------- Тоглоомууд ---------- */
  VIEWS.spiele = function (v) {
    const g = id => (S.games[id] || {}).best;
    const GAMES = [
      { id: 'artikel', i: 'rain', t: 'Artikel-Regen', mn: 'Унаж буй үгийн артиклийг der / die / das товчоор барь. Хурд нэмэгдэнэ!', rec: g('artikel') != null ? `Рекорд: ${g('artikel')}` : 'Шинэ' },
      { id: 'verben', i: 'clock', t: 'Verb-Blitz', mn: '60 секундэд аль болох олон Präteritum / Partizip II хэлбэрийг таа.', rec: g('verben') != null ? `Рекорд: ${g('verben')}` : 'Шинэ' },
      { id: 'habensein', i: 'swap', t: 'haben oder sein?', mn: 'Perfekt-ийн туслах үйл үгийг сонго: ← haben · sein →', rec: g('habensein') != null ? `Рекорд: ${g('habensein')}/12` : 'Шинэ' },
      { id: 'satzbau', i: 'puzzle', t: 'Satzbau', mn: 'Nebensatz-ын үгсийг зөв дараалалд оруул — үйл үг төгсгөлд!', rec: 'Өгүүлбэр зохиох' },
      { id: 'memory', i: 'grid', t: 'Memory', mn: 'Герман үг ба монгол утгын хосыг ол.', rec: g('memory') != null ? `Шилдэг: ${g('memory')} нүүдэл` : 'Шинэ' }
    ];
    v.innerHTML = `${topbar('Spiele')}
      <div class="lesson-head"><h1 class="h-hero">Spiele</h1><p class="sub-mn" style="margin:0">Тоглоод сур. Бүх тоглоом XP өгнө, рекордоо эвдээрэй.</p></div>
      <div class="grid c2">${GAMES.map(x => `<a class="tile" href="#${x.id}"><span class="tile-ico">${icon(x.i)}</span><span class="h-card">${x.t}</span><span class="muted">${x.mn}</span><span class="tile-foot">${icon('trophy')} ${x.rec}</span></a>`).join('')}</div>`;
  };
  function setBest(id, val, lowerIsBetter) {
    const r = S.games[id] || {};
    const isNew = r.best == null || (lowerIsBetter ? val < r.best : val > r.best);
    if (isNew) r.best = val;
    r.plays = (r.plays || 0) + 1;
    S.games[id] = r; save(); checkBadges();
    return isNew;
  }

  VIEWS.artikel = function (v) {
    const nouns = W.filter(w => w.type === 'noun' && !w.tags.includes('plural'));
    v.innerHTML = `${topbar('Spiele · Artikel-Regen', 'spiele')}
      <div class="row-flex" style="justify-content:space-between"><h1 class="h-sec">Artikel-Regen</h1><span class="pill gold">Рекорд: ${(S.games.artikel || {}).best || 0}</span></div>
      <div class="game-area" id="ga">
        <div class="game-hud"><span>Оноо <b id="gs">0</b></span><span class="hearts" id="gh"></span></div>
        <div class="ground"></div>
        <div class="overlay" id="go"><div class="h-sec">der · die · das</div><p class="muted" style="margin:0;max-width:340px">Хамгийн доор буй (шар хүрээтэй) үгийн артиклийг сонго. Газарт унавал амь хасагдана.<br>Товч: <b>1</b> der · <b>2</b> die · <b>3</b> das</p><button class="btn gold" id="gstart">${icon('arrow')} Эхлэх</button></div>
      </div>
      <div class="art-btns"><button class="btn b-der" data-a="der">der</button><button class="btn b-die" data-a="die">die</button><button class="btn b-das" data-a="das">das</button></div>`;
    const area = $('#ga', v), ov = $('#go', v);
    let fallers = [], score = 0, lives = 3, running = false, last = 0, spawnT = 0, raf = 0, bag = [];
    const hearts = () => $('#gh', v).innerHTML = [1, 2, 3].map(k => heartSvg(k <= lives)).join('');
    hearts();
    const nextWord = () => { if (!bag.length) bag = shuffle(nouns); return bag.pop(); };
    function spawn() {
      const w = nextWord();
      const el = document.createElement('div');
      el.className = 'faller'; el.textContent = w.de;
      el.style.left = (18 + Math.random() * 64) + '%';
      area.appendChild(el);
      fallers.push({ el, w, y: -40, speed: 34 + score * 2.6 + Math.random() * 10 });
    }
    function target() { return fallers.reduce((a, f) => (!a || f.y > a.y ? f : a), null); }
    function loop(ts) {
      if (!running) return;
      const dt = Math.min(.05, (ts - last) / 1000); last = ts;
      spawnT -= dt;
      if (spawnT <= 0 || !fallers.length) { spawn(); spawnT = Math.max(1.05, 2.7 - score * .07); }
      const H = area.clientHeight;
      fallers.forEach(f => { f.y += f.speed * dt; f.el.style.top = f.y + 'px'; });
      const tg = target(); fallers.forEach(f => f.el.classList.toggle('target', f === tg));
      const missed = fallers.filter(f => f.y > H - 52);
      missed.forEach(f => { remove(f, true); lose(f.w); });
      raf = requestAnimationFrame(loop);
    }
    function remove(f, burstArt) {
      fallers = fallers.filter(x => x !== f);
      if (burstArt) { f.el.textContent = `${f.w.art} ${f.w.de}`; f.el.classList.add('hit-' + f.w.art, 'burst'); setTimeout(() => f.el.remove(), 460); }
      else f.el.remove();
    }
    function lose(w) {
      lives--; hearts();
      teacherReact(false, `${w.art} ${w.de}`);
      if (lives <= 0) end();
    }
    function answer(a) {
      if (!running) return;
      const f = target(); if (!f) return;
      if (f.w.art === a) {
        score++; $('#gs', v).textContent = score;
        remove(f, true);
        if (score % 5 === 0) teacherReact(true);
      } else { remove(f, true); lose(f.w); }
    }
    function start() {
      fallers.forEach(f => f.el.remove()); fallers = []; score = 0; lives = 3; hearts(); $('#gs', v).textContent = 0;
      ov.hidden = true; running = true; spawnT = 0; last = performance.now(); raf = requestAnimationFrame(loop);
    }
    function end() {
      running = false; cancelAnimationFrame(raf);
      const isNew = setBest('artikel', score);
      if (score > 0) addXP(score * 2, area);
      if (isNew && score > 0) confetti();
      teacherSay(isNew && score > 0 ? 'Neuer Rekord!' : 'Gut gespielt!', `${score} оноо${isNew && score > 0 ? ' — шинэ рекорд!' : ''}`, 'happy', true);
      ov.hidden = false;
      ov.innerHTML = `<div class="label">Тоглоом дууслаа</div><div class="big mono" style="font-size:54px">${score}</div><div class="muted">${isNew && score > 0 ? 'Шинэ рекорд!' : 'Рекорд: ' + ((S.games.artikel || {}).best || 0)} · +${score * 2} XP</div><button class="btn gold" id="gstart">${icon('refresh')} Дахин тоглох</button>`;
      $('#gstart', v).addEventListener('click', start);
    }
    $('#gstart', v).addEventListener('click', start);
    $$('.art-btns button', v).forEach(b => b.addEventListener('click', () => answer(b.dataset.a)));
    setKeys(e => {
      const m = { '1': 'der', '2': 'die', '3': 'das', ArrowLeft: 'der', ArrowDown: 'die', ArrowRight: 'das' }[e.key];
      if (m) { e.preventDefault(); answer(m); }
      else if (e.key === 'Enter' && !running) start();
    });
    onDispose(() => { running = false; cancelAnimationFrame(raf); });
  };

  VIEWS.verben = function (v) {
    const VF = D.VERBFORMS;
    v.innerHTML = `${topbar('Spiele · Verb-Blitz', 'spiele')}
      <div class="row-flex" style="justify-content:space-between"><h1 class="h-sec">Verb-Blitz</h1><span class="pill gold">Рекорд: ${(S.games.verben || {}).best || 0}</span></div>
      <div class="timer" id="vt"><i style="width:100%"></i></div>
      <div id="vb" class="panel" style="display:grid;gap:18px;text-align:center;justify-items:center">
        <div class="h-sec">60 секунд!</div><p class="muted" style="margin:0">Үйл үгийн Präteritum эсвэл Partizip II хэлбэрийг сонго. 1–4 товч ажиллана.</p>
        <button class="btn gold" id="vstart">${icon('arrow')} Эхлэх</button></div>`;
    const box = $('#vb', v), tbar = $('#vt', v);
    let score = 0, timeLeft = 60, iv = 0, running = false, cur = null, lock = false;
    function forms(vf, kind) {
      const stem = vf.inf.replace(/e?n$/, '');
      const correct = kind === 'prat' ? vf.prat : vf.part;
      const cands = kind === 'prat'
        ? [stem + 'te', stem + 'ete', vf.part, ...sample(VF.filter(x => x !== vf), 3).map(x => x.prat)]
        : ['ge' + stem + 't', 'ge' + stem + 'en', vf.prat, ...sample(VF.filter(x => x !== vf), 3).map(x => x.part)];
      const uniq = [...new Set(cands)].filter(c => c !== correct && c !== vf.inf);
      return { correct, options: shuffle([correct, ...uniq.slice(0, 3)]) };
    }
    function q() {
      const vf = pick(VF), kind = Math.random() < .5 ? 'prat' : 'part';
      const f = forms(vf, kind);
      cur = { vf, kind, ...f }; lock = false;
      box.innerHTML = `<div class="label">${kind === 'prat' ? 'Präteritum' : 'Partizip II'} · оноо ${score}</div>
        <div class="q" style="font-size:34px">${esc(vf.inf)}</div><div class="muted">${esc(vf.mn)}</div>
        <div class="options" style="width:100%">${f.options.map((o, k) => `<button class="opt" data-o="${esc(o)}"><kbd>${k + 1}</kbd><span>${esc(o)}</span></button>`).join('')}</div>`;
      $$('.opt', box).forEach(b => b.addEventListener('click', () => ans(b)));
    }
    function ans(b) {
      if (!running || lock) return; lock = true;
      const ok = b.dataset.o === cur.correct;
      $$('.opt', box).forEach(x => { if (x.dataset.o === cur.correct) x.classList.add('correct'); else if (x === b) x.classList.add('wrong'); else x.classList.add('dim'); });
      if (ok) { score++; if (score % 4 === 0) teacherReact(true); } else teacherReact(false, `${cur.vf.inf}, ${cur.vf.prat}, ${cur.vf.aux} ${cur.vf.part}`);
      setTimeout(() => running && q(), ok ? 380 : 1100);
    }
    function start() {
      score = 0; timeLeft = 60; running = true; q();
      clearInterval(iv);
      iv = setInterval(() => {
        timeLeft -= .25;
        tbar.firstElementChild.style.width = (100 * timeLeft / 60) + '%';
        tbar.classList.toggle('low', timeLeft <= 10);
        if (timeLeft <= 0) end();
      }, 250);
    }
    function end() {
      running = false; clearInterval(iv);
      const isNew = setBest('verben', score);
      if (score > 0) addXP(score * 3, box);
      if (isNew && score > 0) confetti();
      teacherSay(isNew && score > 0 ? 'Neuer Rekord! Blitzschnell!' : 'Zeit ist um!', `${score} зөв хариулт`, 'happy', true);
      box.innerHTML = `<div class="label">Хугацаа дууслаа</div><div class="big mono" style="font-size:54px">${score}</div><div class="muted">${isNew && score > 0 ? 'Шинэ рекорд!' : 'Рекорд: ' + ((S.games.verben || {}).best || 0)} · +${score * 3} XP</div><button class="btn gold" id="vstart">${icon('refresh')} Дахин</button>`;
      $('#vstart', v).addEventListener('click', start);
    }
    $('#vstart', v).addEventListener('click', start);
    setKeys(e => { const b = $$('.opt', box)[parseInt(e.key, 10) - 1]; if (b) ans(b); else if (e.key === 'Enter' && !running) start(); });
    onDispose(() => { running = false; clearInterval(iv); });
  };

  VIEWS.habensein = function (v) {
    const rounds = sample(D.HABENSEIN, 12);
    let k = 0, score = 0, lock = false;
    v.innerHTML = `${topbar('Spiele · haben oder sein?', 'spiele')}
      <div class="row-flex" style="justify-content:space-between"><h1 class="h-sec">haben oder sein?</h1><span class="mono muted" id="hc"></span></div>
      <div class="progress"><i id="hp" style="width:0%"></i></div>
      <div id="hs" style="display:grid;gap:14px"></div>
      <div class="grid c2"><button class="btn" data-h="haben" style="padding:18px;font-size:18px">${icon('back')} haben</button><button class="btn" data-h="sein" style="padding:18px;font-size:18px">sein ${icon('arrow')}</button></div>
      <p class="muted" style="text-align:center;margin:0">← / → сум, эсвэл картыг шударч болно.</p>`;
    const host = $('#hs', v);
    function draw() {
      lock = false;
      $('#hp', v).style.width = (100 * k / rounds.length) + '%';
      $('#hc', v).textContent = `${score} / ${k}`;
      const r = rounds[k];
      host.innerHTML = `<div class="swipe-card" id="sc">${gapify(r.s)}</div><div id="hw"></div>`;
      const card = $('#sc', host);
      let sx = null, dx = 0;
      card.addEventListener('pointerdown', e => { sx = e.clientX; card.setPointerCapture(e.pointerId); card.style.transition = 'none'; });
      card.addEventListener('pointermove', e => { if (sx == null) return; dx = e.clientX - sx; card.style.transform = `translateX(${dx}px) rotate(${dx / 20}deg)`; });
      card.addEventListener('pointerup', () => { card.style.transition = ''; if (Math.abs(dx) > 80) answer(dx < 0 ? 'haben' : 'sein'); else card.style.transform = ''; sx = null; dx = 0; });
    }
    function answer(a) {
      if (lock || k >= rounds.length) return; lock = true;
      const r = rounds[k], ok = a === r.a;
      const card = $('#sc', host);
      card.classList.add(a === 'haben' ? 'go-left' : 'go-right');
      const subj = /^Ich\b/.test(r.s) ? 0 : /^Wir\b/.test(r.s) ? 1 : 2;
      const aux = (r.a === 'haben' ? ['habe', 'haben', 'hat'] : ['bin', 'sind', 'ist'])[subj];
      const full = r.s.replace('___', aux);
      if (ok) { score++; addXP(4, card); } else addMistake({ type: 'mc', q: r.s, options: ['haben', 'sein'], answer: r.a, explain: r.why }, 'haben/sein');
      $('#hw', host).innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}"><div class="fh">${icon(ok ? 'check' : 'x')} ${ok ? 'Зөв!' : 'Буруу — ' + r.a}</div><div class="ans">${esc(full)} ${sayBtn(full)}</div><div class="ex">${esc(r.why)}</div></div>`;
      teacherReact(ok, full);
      setTimeout(() => { k++; if (k >= rounds.length) end(); else draw(); }, ok ? 1100 : 2200);
    }
    function end() {
      const isNew = setBest('habensein', score);
      addXP(10, host);
      if (score >= 10) confetti();
      teacherSay(score >= 10 ? 'Hervorragend!' : 'Gut! Weiter üben!', `${score}/12 зөв`, 'happy', true);
      $('#hp', v).style.width = '100%';
      host.innerHTML = `<div class="panel result"><div class="label">haben oder sein · дууслаа</div><div class="big">${score}/12</div><div class="muted">${isNew ? 'Шинэ рекорд!' : 'Рекорд: ' + S.games.habensein.best}</div><div class="row-flex" style="justify-content:center"><a class="btn primary" href="#habensein" data-go="habensein">${icon('refresh')} Дахин</a><a class="btn ghost" href="#spiele">Буцах</a></div></div>`;
    }
    $$('[data-h]', v).forEach(b => b.addEventListener('click', () => answer(b.dataset.h)));
    setKeys(e => { if (e.key === 'ArrowLeft' || e.key === 'h') answer('haben'); if (e.key === 'ArrowRight' || e.key === 's') answer('sein'); });
    draw();
  };

  VIEWS.satzbau = function (v) {
    const fromLessons = D.LESSONS.flatMap(l => l.items.filter(it => it.type === 'tiles'));
    const fromWB = D.WORKBOOK.flatMap(u => u.items.map(it => ({ type: 'tiles', q: it.mn + ' (Perfekt)', answer: it.pf[0] })));
    v.innerHTML = `${topbar('Spiele · Satzbau', 'spiele')}<h1 class="h-sec">Satzbau</h1><p class="muted" style="margin:0">Үгс дээр дарж өгүүлбэр зохио. Буцаах бол дээрх үгэн дээр дар (эсвэл Backspace).</p><div id="sb"></div>`;
    runSession($('#sb', v), sample(fromLessons, 5).concat(sample(fromWB, 3)), { title: 'Satzbau', topic: 'Satzbau', onQuit: () => go('spiele') });
  };

  VIEWS.memory = function (v) {
    const words = sample(W.filter(w => w.mn.length < 26), 6);
    const cards = shuffle(words.flatMap(w => [{ w, side: 'de', text: wordLabel(w) }, { w, side: 'mn', text: w.mn }]));
    let open = [], moves = 0, matched = 0, lock = false;
    v.innerHTML = `${topbar('Spiele · Memory', 'spiele')}
      <div class="row-flex" style="justify-content:space-between"><h1 class="h-sec">Memory</h1><span class="pill">Нүүдэл: <b id="mm">0</b></span></div>
      <div class="memory" id="mem">${cards.map((c, k) => `<button class="mcard" data-k="${k}" aria-label="Карт ${k + 1}"><div class="inner"><div class="f">?</div><div class="b">${c.side === 'de' && c.w.art ? `<span><span class="art art-${c.w.art}">${c.w.art}</span> ${esc(c.w.de)}</span>` : esc(c.text)}</div></div></button>`).join('')}</div>`;
    $$('.mcard', v).forEach(btn => btn.addEventListener('click', () => {
      if (lock) return;
      const k = Number(btn.dataset.k), c = cards[k];
      if (btn.classList.contains('open') || btn.classList.contains('matched')) return;
      btn.classList.add('open'); open.push({ btn, c });
      if (c.side === 'de') speak(c.text);
      if (open.length === 2) {
        moves++; $('#mm', v).textContent = moves;
        const [a, b] = open;
        if (a.c.w === b.c.w) {
          a.btn.classList.add('matched'); b.btn.classList.add('matched'); open = []; matched++;
          if (matched === words.length) setTimeout(end, 500);
        } else {
          lock = true;
          setTimeout(() => { a.btn.classList.remove('open'); b.btn.classList.remove('open'); open = []; lock = false; }, 900);
        }
      }
    }));
    function end() {
      const isNew = setBest('memory', moves, true);
      const xp = Math.max(10, 40 - (moves - 6) * 3);
      addXP(xp, $('#mem', v));
      confetti();
      teacherSay(moves <= 10 ? 'Was für ein Gedächtnis!' : 'Geschafft!', `${moves} нүүдлээр дууслаа`, 'happy', true);
      $('#mem', v).insertAdjacentHTML('afterend', `<div class="panel result"><div class="label">Memory · дууслаа</div><div class="big">${moves}</div><div class="muted">нүүдэл · ${isNew ? 'шинэ рекорд!' : 'шилдэг: ' + S.games.memory.best} · +${xp} XP</div><div class="row-flex" style="justify-content:center"><a class="btn primary" href="#memory" data-go="memory">${icon('refresh')} Дахин</a><a class="btn ghost" href="#spiele">Буцах</a></div></div>`);
    }
  };

  /* ---------- Алдааны дэвтэр ---------- */
  VIEWS.fehler = function (v) {
    v.innerHTML = `${topbar('Fehlerheft')}
      <div class="lesson-head"><h1 class="h-hero">Fehlerheft</h1><p class="sub-mn" style="margin:0">Буруу хариулсан бүх даалгавар энд хадгалагдана. Давтаад зөв хариулбал жагсаалтаас хасагдана.</p></div>
      <div id="fh"></div>`;
    const host = $('#fh', v);
    if (!S.mistakes.length) {
      host.innerHTML = `<div class="panel empty">${icon('check')}<div class="h-card">Алдаа алга!</div><div>Дасгал хийхэд гарсан алдаанууд энд цугларна.</div><a class="btn primary" href="#grammatik">Дүрэм рүү</a></div>`;
      return;
    }
    host.innerHTML = `<div class="row-flex"><button class="btn gold" id="fstart">${icon('refresh')} Бүгдийг давтах (${Math.min(15, S.mistakes.length)})</button>${tilesFromItems(S.mistakes.map(m => m.item)).length ? `<button class="btn" id="ftiles">${icon('puzzle')} Үг байрлуулж давтах</button>` : ''}<button class="btn ghost" id="fclear">Цэвэрлэх</button></div>
      <section class="panel tight" style="margin-top:16px;padding:0">${S.mistakes.map(m => {
        const it = m.item;
        const ans = it.answer || (it.answers && it.answers[0]) || (it.pf && it.pf[0]) || (it.rows && it.rows[it.rows.length - 1].a[0]) || (it.v ? `${it.v.inf} – ${it.v.er} – ${it.v.prat} – ${it.v.perf}` : '');
        return `<div class="mistake"><span class="label">${esc(m.topic || '')}</span><div>${gapify(it.q || it.mn)}</div>${m.user ? `<div class="mu">${esc(m.user)}</div>` : ''}<div class="mc">${esc(ans)} ${/[a-zäöüß]/i.test(ans) ? sayBtn(ans) : ''}</div></div>`;
      }).join('')}</section>`;
    const ft = $('#ftiles', v);
    if (ft) ft.addEventListener('click', () => runSession(host, shuffle(tilesFromItems(S.mistakes.map(m => m.item))).slice(0, 12), { title: 'Fehlerheft · үг байрлуулах', topic: 'Fehlerheft', onQuit: () => render() }));
    $('#fstart', v).addEventListener('click', () => {
      runSession(host, S.mistakes.slice(0, 15).map(m => m.item), { title: 'Fehlerheft', topic: 'Fehlerheft', mode: 'mistakes', onQuit: () => render() });
    });
    $('#fclear', v).addEventListener('click', e => {
      const b = e.currentTarget;
      if (b.dataset.sure) { S.mistakes = []; save(); refreshChrome(); render(); }
      else { b.dataset.sure = '1'; b.textContent = 'Итгэлтэй байна уу? Дахин дар'; setTimeout(() => { if (b.isConnected) { delete b.dataset.sure; b.textContent = 'Цэвэрлэх'; } }, 3000); }
    });
  };

  /* ---------- Ахиц ба тохиргоо ---------- */
  VIEWS.fortschritt = function (v) {
    const L = levelOf(S.xp), lo = xpForLevel(L), hi = xpForLevel(L + 1);
    const acc = S.stats.answered ? Math.round(100 * S.stats.correct / S.stats.answered) : 0;
    const t = today();
    const days = Array.from({ length: 14 }, (_, k) => addDays(t, k - 13));
    const max = Math.max(CFG.dailyGoalXP, ...days.map(d => S.daily[d] || 0));
    v.innerHTML = `${topbar('Fortschritt')}
      <section class="panel hero">
        <div class="greet"><div class="label">Level ${L}</div><h1 class="h-hero">${titleOf(L)}</h1>
          <div class="row-flex"><div class="progress" style="max-width:360px"><i style="width:${Math.round(100 * (S.xp - lo) / (hi - lo))}%"></i></div><span class="mono muted">${S.xp - lo} / ${hi - lo} XP</span></div>
          <p class="sub-mn" style="margin:0">Дараагийн түвшин: ${titleOf(L + 1)}</p></div>
      </section>
      <div class="stats4">
        <div class="stat"><span class="label">Нарийвчлал</span><b>${acc}%</b></div>
        <div class="stat"><span class="label">Хариулт</span><b>${S.stats.answered}</b></div>
        <div class="stat"><span class="label">Шилдэг combo</span><b>${S.stats.bestCombo}</b></div>
        <div class="stat"><span class="label">Цээжилсэн үг</span><b>${learnedCount()}</b></div>
      </div>
      <section class="panel"><h2 class="h-sec">Сүүлийн 14 хоног</h2>
        <div class="week" style="grid-template-columns:repeat(14,1fr);margin-top:18px">${days.map(d => { const val = S.daily[d] || 0; return `<div class="bar ${d === t ? 'today' : ''} ${val >= CFG.dailyGoalXP ? 'hit' : ''}"><em>${val || ''}</em><i style="height:${Math.round(100 * val / max)}%"></i><span>${d.slice(8)}</span></div>`; }).join('')}</div>
      </section>
      <section class="panel"><h2 class="h-sec" style="margin-bottom:16px">Тэмдэгүүд · ${S.badges.length}/${BADGES.length}</h2>
        <div class="badges">${BADGES.map(b => `<div class="badge ${S.badges.includes(b.id) ? 'got' : ''}"><span class="bi">${icon(b.icon)}</span><b>${b.name}</b><small>${b.mn}</small></div>`).join('')}</div>
      </section>
      <section class="panel"><h2 class="h-sec" style="margin-bottom:16px">Дүрмийн сэдвүүд</h2>
        <div style="display:grid;gap:10px">${D.LESSONS.map(l => { const b = (S.lessons[l.id] || {}).best; return `<a href="#lesson-${l.id}" style="display:grid;grid-template-columns:minmax(0,1fr) 120px 44px;gap:12px;align-items:center;color:inherit;text-decoration:none"><span>${esc(l.title)}</span><span class="progress ${b >= 80 ? 'ok' : ''}"><i style="width:${b || 0}%"></i></span><span class="mono muted" style="text-align:right">${b != null ? b + '%' : '—'}</span></a>`; }).join('')}</div>
      </section>
      <section class="panel"><h2 class="h-sec" style="margin-bottom:16px">Тохиргоо</h2>
        <div class="settings">
          <div class="setting"><div><b>Багшийн дуу хоолой</b><div class="muted" style="font-size:13px">Багш хариултыг герман хэлээр чангаар уншина</div></div><button class="switch ${S.settings.voice ? 'on' : ''}" id="sv" aria-label="Багшийн дуу"></button></div>
          <div class="setting"><div><b>Унших хурд</b><div class="muted" style="font-size:13px" id="rv">${S.settings.rate.toFixed(2)}×</div></div><input type="range" id="sr" min="0.6" max="1.2" step="0.02" value="${S.settings.rate}"></div>
          <div class="setting"><div><b>Герман хоолой</b><div class="muted" style="font-size:13px">Компьютерт суусан de-DE хоолойнууд</div></div><select class="field" id="sel-voice"></select></div>
          <div class="setting"><div><b>Дэлгэцийн герман гар</b><div class="muted" style="font-size:13px">Утасны гарын «санал болгох үг», автомат засварыг бүрэн хаана. QWERTZ + ä ö ü ß</div></div><button class="switch ${kbEnabled() ? 'on' : ''}" id="skb" aria-label="Дэлгэцийн гар"></button></div>
          <div class="setting"><div><b>Бүртгэл</b><div class="muted" style="font-size:13px">${esc(USER.name)}${USER.email ? ' · ' + esc(USER.email) : ''} · ${window.DL_AUTH && window.DL_AUTH.mode === 'cloud' ? 'үүлэнд хадгалагдана' : 'энэ төхөөрөмж дээр'}</div></div><button class="btn small ghost" id="logout">Гарах</button></div>
          <div class="setting"><div><b>Ахицыг тэглэх</b><div class="muted" style="font-size:13px">XP, үг, рекорд бүгд устана</div></div><button class="btn small ghost" id="reset">Тэглэх</button></div>
        </div>
      </section>`;
    $('#sv', v).addEventListener('click', e => { S.settings.voice = !S.settings.voice; save(); e.currentTarget.classList.toggle('on', S.settings.voice); buildToolsSync(); });
    $('#skb', v).addEventListener('click', e => { S.settings.kb = !kbEnabled(); save(); e.currentTarget.classList.toggle('on', S.settings.kb); });
    $('#logout', v).addEventListener('click', () => window.DL_AUTH && window.DL_AUTH.logout());
    $('#sr', v).addEventListener('input', e => { S.settings.rate = Number(e.target.value); $('#rv', v).textContent = S.settings.rate.toFixed(2) + '×'; save(); });
    $('#sr', v).addEventListener('change', () => speak('Guten Tag! Ich bin deine Lehrerin.'));
    const sel = $('#sel-voice', v);
    const fillVoices = () => {
      loadVoices();
      sel.innerHTML = `<option value="">Автомат</option>` + deVoices.map(x => `<option value="${esc(x.name)}" ${x.name === S.settings.voiceName ? 'selected' : ''}>${esc(x.name)}</option>`).join('');
      if (!deVoices.length) sel.innerHTML = `<option value="">Герман хоолой олдсонгүй</option>`;
    };
    fillVoices(); setTimeout(fillVoices, 600);
    sel.addEventListener('change', () => { S.settings.voiceName = sel.value; save(); speak('Hallo! So klinge ich.'); });
    $('#reset', v).addEventListener('click', e => {
      const b = e.currentTarget;
      if (b.dataset.sure) { const keep = S.settings; S = JSON.parse(JSON.stringify(DEFAULTS)); S.settings = keep; save(); refreshChrome(); render(); toast('Ахиц тэглэгдлээ'); }
      else { b.dataset.sure = '1'; b.textContent = 'Итгэлтэй юу? Дахин дар'; setTimeout(() => { if (b.isConnected) { delete b.dataset.sure; b.textContent = 'Тэглэх'; } }, 3000); }
    });
  };
  function buildToolsSync() {
    const vb = $('#t-voice'); if (!vb) return;
    vb.innerHTML = icon(S.settings.voice ? 'speaker' : 'mute');
    vb.classList.toggle('on', S.settings.voice);
  }

  /* ---------- Хичээлийн өдрийн тэмдэглэл ---------- */
  const fmtDate = d => d.split('-').reverse().join('.');
  VIEWS.unterricht = function (v) {
    v.innerHTML = `${topbar('Unterricht')}
      <div class="lesson-head"><h1 class="h-hero">Unterricht</h1><p class="sub-mn" style="margin:0">Анги дээр үзсэн хичээл бүр — товч тэмдэглэл, засвар, тухайн өдрийн дасгал.</p></div>
      <div class="grid">${D.UNTERRICHT.slice().reverse().map(u => `<a class="tile" href="#stunde-${u.date}">
        <span class="nr">${fmtDate(u.date)}</span><span class="h-card">${esc(u.title)}</span>
        <span class="muted">${esc(u.points[0])}</span>
        <span class="tile-foot">${u.lessons.length} дүрэм · ${u.ues.length} дасгал</span></a>`).join('')}</div>`;
  };
  VIEWS.stunde = function (v, date) {
    const u = D.UNTERRICHT.find(x => x.date === date) || D.UNTERRICHT[D.UNTERRICHT.length - 1];
    if (!u) return VIEWS.unterricht(v);
    const lessons = u.lessons.map(id => D.LESSONS.find(l => l.id === id)).filter(Boolean);
    const ues = u.ues.map(id => D.WORKBOOK.find(x => x.id === id)).filter(Boolean);
    v.innerHTML = `${topbar('Unterricht · ' + fmtDate(u.date), 'unterricht')}
      <div class="lesson-head"><span class="pill gold" style="justify-self:start">${fmtDate(u.date)}</span><h1 class="h-hero">${esc(u.title)}</h1></div>
      <section class="panel"><div class="label" style="margin-bottom:14px">Гол санаа</div>
        <div class="rules">${u.points.map((p, k) => `<div class="rule"><span class="dot">${k + 1}</span><div>${esc(p)}</div></div>`).join('')}</div></section>
      ${u.fixes && u.fixes.length ? `<section class="panel"><div class="label" style="margin-bottom:12px">Тэмдэглэлийн засвар</div>
        <div style="display:grid;gap:10px">${u.fixes.map(([a, b]) => `<div class="row-flex" style="gap:10px"><span class="mu" style="color:var(--bad);text-decoration:line-through">${esc(a)}</span>${icon('arrow')}<b style="color:var(--ok)">${esc(b)}</b>${sayBtn(b)}</div>`).join('')}</div></section>` : ''}
      <section class="panel" style="display:grid;gap:12px"><div class="label">Энэ хичээлийг давтах</div>
        <div class="row-flex"><button class="btn gold" id="stunde-mix">${icon('shuffle')} Холимог дасгал (12)</button><button class="btn" id="stunde-tiles">${icon('puzzle')} Монгол → герман үг байрлуулах</button></div>
        <div class="grid c2">
          ${lessons.map(l => `<a class="tile" href="#lesson-${l.id}"><span class="nr">Дүрэм</span><span class="h-card">${esc(l.title)}</span><span class="muted">${esc(l.mn)}</span></a>`).join('')}
          ${ues.map(x => `<a class="tile" href="#workbook-${x.id}"><span class="nr">Дасгал · ${esc(x.page)}</span><span class="h-card">${esc(x.title)}</span><span class="muted">${esc(x.mn)}</span></a>`).join('')}
        </div></section>
      <div id="stunde-host"></div>`;
    $('#stunde-mix', v).addEventListener('click', () => {
      const pool = lessons.flatMap(l => l.items).concat(ues.flatMap(x => x.items.filter(it => it.type === 'steps')));
      const host = $('#stunde-host', v);
      runSession(host, sample(pool, Math.min(12, pool.length)), { title: u.title, topic: 'Unterricht ' + fmtDate(u.date), onQuit: () => render() });
      host.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    $('#stunde-tiles', v).addEventListener('click', () => {
      const pool = tilesFromItems(ues.flatMap(x => x.items).concat(lessons.flatMap(l => l.items)));
      const host = $('#stunde-host', v);
      runSession(host, sample(pool, Math.min(12, pool.length)), { title: u.title + ' · үг байрлуулах', topic: 'Unterricht ' + fmtDate(u.date), onQuit: () => render() });
      host.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  };

  /* ---------- Анги (жагсаалт) ---------- */
  VIEWS.klasse = function (v) {
    v.innerHTML = `${topbar('Klasse')}
      <div class="lesson-head"><h1 class="h-hero">Klasse</h1><p class="sub-mn" style="margin:0">Ангийнхны XP, streak, цээжилсэн үг. Хамтдаа өрсөлдөөд B2 руу!</p></div>
      <section class="panel tight" id="lb"><div class="empty">Ачаалж байна…</div></section>`;
    const host = $('#lb', v);
    const A = window.DL_AUTH;
    if (!A) { host.innerHTML = `<div class="empty">Бүртгэлийн систем ачаалагдсангүй.</div>`; return; }
    A.leaderboard().then(rows => {
      if (!host.isConnected) return;
      if (!rows.length) { host.innerHTML = `<div class="empty">Одоогоор хэн ч алга.</div>`; return; }
      host.innerHTML = `${A.mode !== 'cloud' ? `<p class="muted" style="margin:6px 8px 14px;font-size:13px">Энэ төхөөрөмж дээр бүртгүүлсэн хүмүүс л харагдана. Ангийнхан бүгд нэг жагсаалтад харагдахын тулд үүлэн бүртгэл (Firebase) тохируулна — README-д заавар бий.</p>` : ''}
        <div class="lb">${rows.map((r, k) => `<div class="lb-row ${r.id === USER.id ? 'me' : ''}">
          <span class="lb-rank mono">${k + 1}</span>
          <span class="lb-name"><b>${esc(r.name || '—')}</b><span class="muted">Level ${levelOf(r.xp || 0)} · ${titleOf(levelOf(r.xp || 0))}</span></span>
          <span class="lb-stat" title="Streak">${icon('flame')} ${r.streak || 0}</span>
          <span class="lb-stat" title="Цээжилсэн үг">${icon('cards')} ${r.words || 0}</span>
          <span class="lb-xp mono">${r.xp || 0} XP</span></div>`).join('')}</div>`;
    }).catch(err => { host.innerHTML = `<div class="empty">Жагсаалт ачаалж чадсангүй: ${esc(err.message || err)}</div>`; });
  };

  /* ---------------- Дэлгэцийн герман гар ----------------
     Утасны системийн гарыг (санал болгох үг, автомат засвартай)
     огт гаргахгүйн тулд inputmode="none" болгож, өөрийн гарыг харуулна. */
  function kbEnabled() { return S && S.settings.kb != null ? S.settings.kb : matchMedia('(pointer: coarse)').matches; }
  const KB = (function () {
    const L = {
      abc: [['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'], ['⇧', 'y', 'x', 'c', 'v', 'b', 'n', 'm', 'ß', '⌫'], ['123', ',', ' ', '.', '⏎']],
      num: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], ['-', '/', ':', ';', '(', ')', '„', '“', '!', '?'], ['abc', '"', "'", '–', '…', '⌫'], ['abc', ',', ' ', '.', '⏎']]
    };
    const el = document.createElement('div');
    el.className = 'kb'; el.id = 'dl-kb'; el.hidden = true; el.setAttribute('aria-label', 'Герман гар');
    document.body.appendChild(el);
    let layout = 'abc', shift = false, target = null;
    function draw() {
      el.innerHTML = `<div class="kb-top"><span class="muted">Герман гар</span><button type="button" class="kb-sys" data-k="sys">Системийн гар</button><button type="button" class="kb-sys" data-k="hide">Хаах</button></div>` +
        L[layout].map(r => `<div class="kb-row">${r.map(k => `<button type="button" class="kb-key ${k === ' ' ? 'space' : ''} ${['⇧', '⌫', '123', 'abc', '⏎'].includes(k) ? 'fn' : ''} ${k === '⇧' && shift ? 'on' : ''}" data-k="${esc(k)}">${k === ' ' ? 'Leerzeichen' : esc(shift && k.length === 1 && layout === 'abc' ? (k === 'ß' ? 'ẞ' : k.toUpperCase()) : k)}</button>`).join('')}</div>`).join('');
    }
    function insert(text) {
      if (!target) return;
      const f = target, a = f.selectionStart ?? f.value.length, b = f.selectionEnd ?? f.value.length;
      f.value = f.value.slice(0, a) + text + f.value.slice(b);
      f.setSelectionRange(a + text.length, a + text.length);
      f.dispatchEvent(new Event('input', { bubbles: true }));
    }
    el.addEventListener('pointerdown', e => e.preventDefault());
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-k]'); if (!b || !target) return;
      const k = b.dataset.k;
      if (k === 'hide') { target.blur(); hide(); return; }
      if (k === 'sys') { S.settings.kb = false; save(); const t = target; hide(); t.removeAttribute('inputmode'); t.blur(); setTimeout(() => t.focus(), 50); toast('Системийн гар руу шилжлээ (Тохиргооноос буцааж асаана)'); return; }
      if (k === '⇧') { shift = !shift; draw(); return; }
      if (k === '123') { layout = 'num'; draw(); return; }
      if (k === 'abc') { layout = 'abc'; draw(); return; }
      if (k === '⌫') {
        const f = target, a = f.selectionStart ?? f.value.length, z = f.selectionEnd ?? f.value.length;
        if (a !== z) { f.value = f.value.slice(0, a) + f.value.slice(z); f.setSelectionRange(a, a); }
        else if (a > 0) { f.value = f.value.slice(0, a - 1) + f.value.slice(a); f.setSelectionRange(a - 1, a - 1); }
        return;
      }
      if (k === '⏎') { target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })); return; }
      let ch = k;
      if (shift && layout === 'abc' && k.length === 1) { ch = k === 'ß' ? 'ẞ' : k.toUpperCase(); shift = false; draw(); }
      insert(ch);
      if (/[.!?]/.test(ch)) { shift = true; draw(); }
    });
    function show(f) {
      target = f; layout = 'abc';
      shift = !f.value.trim();
      draw(); el.hidden = false; document.body.classList.add('kb-open');
      setTimeout(() => f.scrollIntoView({ block: 'center', behavior: 'smooth' }), 60);
    }
    function hide() { el.hidden = true; target = null; document.body.classList.remove('kb-open'); }
    const isField = t => t && t.matches && t.matches('input.field:not([data-nokb]), textarea.field:not([data-nokb])') && !t.readOnly;
    document.addEventListener('pointerdown', e => { if (isField(e.target) && kbEnabled()) e.target.setAttribute('inputmode', 'none'); }, true);
    document.addEventListener('focusin', e => {
      if (isField(e.target) && kbEnabled()) { e.target.setAttribute('inputmode', 'none'); show(e.target); }
      else if (!el.contains(e.target)) hide();
    });
    document.addEventListener('focusout', () => setTimeout(() => { const a = document.activeElement; if (!isField(a) && !el.contains(a)) hide(); }, 120));
    return { hide };
  })();
  onDisposeGlobal = () => KB.hide();

  /* ---------------- Эхлүүлэх (нэвтэрсний дараа) ---------------- */
  window.DL_boot = function (user) {
    USER = user;
    KEY = KEY0 + ':' + user.id;
    // Анхны (бүртгэлгүй үеийн) ахицыг эхний бүртгэлд шилжүүлнэ
    try {
      if (!localStorage.getItem(KEY) && localStorage.getItem(KEY0) && !localStorage.getItem('dl-migrated')) {
        localStorage.setItem(KEY, localStorage.getItem(KEY0)); localStorage.setItem('dl-migrated', user.id);
      }
    } catch (e) { }
    const local = load();
    const remote = user.state ? Object.assign(JSON.parse(JSON.stringify(DEFAULTS)), user.state, { stats: Object.assign({}, DEFAULTS.stats, user.state.stats), settings: Object.assign({}, DEFAULTS.settings, user.state.settings) }) : null;
    S = remote && (remote.updatedAt || 0) >= (local.updatedAt || 0) ? remote : local;
    saveHook = user.onSave || null;
    buildChrome();
    render();
    save();
    setTimeout(() => {
      const hr = new Date().getHours();
      const g = hr < 11 ? 'Guten Morgen' : hr < 18 ? 'Guten Tag' : 'Guten Abend';
      teacherSay(`${g}, ${user.name}! Bereit?`, 'Өнөөдөр юу сурах вэ? Над дээр дарвал зөвлөгөө өгнө.', 'wave', false);
    }, 900);
  };
})();
