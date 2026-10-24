/* =========================================================
   Deutsch Lernen — бүртгэл ба нэвтрэлт
   - APP_CONFIG.firebase тохируулсан бол: Firebase (үүлэн бүртгэл).
     Хүн бүр өөрийн имэйл, нууц үгээр нэвтэрч, ахиц нь аль ч
     төхөөрөмжөөс нээгдэнэ. «Klasse» жагсаалт бүх ангийнхныг харуулна.
   - Тохируулаагүй бол: энэ төхөөрөмж дээрх локал бүртгэл.
   ========================================================= */
(function () {
  'use strict';
  const CFG = window.APP_CONFIG || {};
  const FB = CFG.firebase;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { } }
  };

  const A = window.DL_AUTH = { mode: FB && FB.apiKey ? 'cloud' : 'local', user: null, logout() { }, leaderboard: async () => [] };

  /* ---------- Нэвтрэх дэлгэц ---------- */
  let regMode = false;
  const box = document.createElement('div');
  box.className = 'auth'; box.id = 'auth'; box.hidden = true;
  document.body.appendChild(box);
  function drawForm(msg) {
    box.innerHTML = `<div class="auth-card">
      <div class="brand" style="padding:0"><div class="brand-mark"><div class="flag"><i></i><i></i><i></i></div></div><div class="brand-text"><b>Deutsch Lernen</b><span>B1 → B2</span></div></div>
      <h1 class="h-sec" style="margin-top:6px">${regMode ? 'Шинээр бүртгүүлэх' : 'Нэвтрэх'}</h1>
      <form id="auth-form" novalidate>
        ${regMode ? `<label class="label" for="a-name">Нэр</label><input class="field" id="a-name" data-nokb autocomplete="name" required maxlength="40" placeholder="Жишээ: Болд">` : ''}
        <label class="label" for="a-email">Имэйл</label>
        <input class="field" id="a-email" data-nokb type="email" autocomplete="email" inputmode="email" required placeholder="name@example.com">
        <label class="label" for="a-pass">Нууц үг</label>
        <input class="field" id="a-pass" data-nokb type="password" autocomplete="${regMode ? 'new-password' : 'current-password'}" required minlength="6" placeholder="${regMode ? 'Хамгийн багадаа 6 тэмдэгт' : ''}">
        <div class="auth-err" id="a-err" ${msg ? '' : 'hidden'}>${esc(msg || '')}</div>
        <button class="btn primary" type="submit" id="a-submit">${regMode ? 'Бүртгүүлэх' : 'Нэвтрэх'}</button>
      </form>
      <div class="auth-links">
        <button type="button" class="link-btn" id="a-toggle">${regMode ? 'Бүртгэлтэй юу? Нэвтрэх' : 'Шинээр бүртгүүлэх'}</button>
        ${!regMode && A.mode === 'cloud' ? '<button type="button" class="link-btn" id="a-forgot">Нууц үгээ мартсан уу?</button>' : ''}
      </div>
      <p class="muted auth-note">${A.mode === 'cloud' ? 'Willkommen! Нэг бүртгэлээр утас, компьютерийн алинаас нь ч нэвтэрч болно.' : 'Бүртгэл зөвхөн энэ төхөөрөмж, энэ браузер дээр хадгалагдана.'}</p>
    </div>`;
    box.querySelector('#a-toggle').onclick = () => { regMode = !regMode; drawForm(); };
    const fg = box.querySelector('#a-forgot'); if (fg) fg.onclick = forgot;
    box.querySelector('#auth-form').onsubmit = submit;
  }
  function showLogin(msg) { drawForm(msg); box.hidden = false; document.body.classList.add('auth-open'); }
  function hideLogin() { box.hidden = true; document.body.classList.remove('auth-open'); }
  function err(m) { const e = box.querySelector('#a-err'); if (e) { e.hidden = false; e.textContent = m; } const b = box.querySelector('#a-submit'); if (b) b.disabled = false; }
  function readForm() {
    const name = regMode ? box.querySelector('#a-name').value.trim() : '';
    const email = box.querySelector('#a-email').value.trim().toLowerCase();
    const pass = box.querySelector('#a-pass').value;
    if (regMode && !name) return err('Нэрээ бичнэ үү.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err('Имэйл хаяг буруу байна.');
    if (pass.length < 6) return err('Нууц үг хамгийн багадаа 6 тэмдэгт байна.');
    return { name, email, pass };
  }
  let handlers = null;
  async function submit(e) {
    e.preventDefault();
    const f = readForm(); if (!f) return;
    box.querySelector('#a-submit').disabled = true;
    try { regMode ? await handlers.register(f) : await handlers.login(f); }
    catch (x) { err(explain(x)); }
  }
  async function forgot() {
    const email = box.querySelector('#a-email').value.trim();
    if (!email) return err('Эхлээд имэйлээ бичээд дахин дарна уу.');
    try { await handlers.reset(email); err('Нууц үг сэргээх холбоосыг ' + email + ' руу илгээлээ. Имэйлээ шалгаарай.'); }
    catch (x) { err(explain(x)); }
  }
  function explain(x) {
    const c = (x && x.code) || '';
    const M = {
      'auth/invalid-email': 'Имэйл хаяг буруу байна.',
      'auth/email-already-in-use': 'Энэ имэйлээр аль хэдийн бүртгүүлсэн байна. Нэвтэрнэ үү.',
      'auth/weak-password': 'Нууц үг хэт сул байна (6+ тэмдэгт).',
      'auth/invalid-credential': 'Имэйл эсвэл нууц үг буруу байна.',
      'auth/wrong-password': 'Нууц үг буруу байна.',
      'auth/user-not-found': 'Ийм имэйлтэй бүртгэл алга. Шинээр бүртгүүлнэ үү.',
      'auth/too-many-requests': 'Хэт олон оролдлого. Түр хүлээгээд дахин оролдоно уу.',
      'auth/network-request-failed': 'Интернэт холболтоо шалгана уу.',
      'auth/operation-not-allowed': 'Firebase дээр Email/Password нэвтрэлт идэвхжээгүй байна.',
      'auth/unauthorized-domain': 'Энэ домэйн Firebase-д зөвшөөрөгдөөгүй байна (Authorized domains-д нэмнэ).'
    };
    return M[c] || (x && x.message) || 'Алдаа гарлаа.';
  }

  /* ---------- Локал бүртгэл (энэ төхөөрөмж) ---------- */
  async function hash(pass, salt) {
    const data = salt + '|' + pass;
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      let h = 2166136261; for (let i = 0; i < data.length; i++) { h ^= data.charCodeAt(i); h = Math.imul(h, 16777619); } return 'f' + (h >>> 0).toString(16);
    }
  }
  function localAccounts() { try { return JSON.parse(ls.get('dl-accounts') || '[]'); } catch (e) { return []; } }
  function startLocal() {
    A.mode = 'local';
    const boot = acc => { hideLogin(); A.user = acc; window.DL_boot({ id: acc.id, name: acc.name, email: acc.email }); };
    handlers = {
      async register(f) {
        const list = localAccounts();
        if (list.some(a => a.email === f.email)) throw { code: 'auth/email-already-in-use' };
        const salt = Math.random().toString(36).slice(2);
        const acc = { id: 'u' + Date.now().toString(36), name: f.name, email: f.email, salt, hash: await hash(f.pass, salt) };
        list.push(acc); ls.set('dl-accounts', JSON.stringify(list)); ls.set('dl-session', acc.id);
        boot(acc);
      },
      async login(f) {
        const acc = localAccounts().find(a => a.email === f.email);
        if (!acc) throw { code: 'auth/user-not-found' };
        if (await hash(f.pass, acc.salt) !== acc.hash) throw { code: 'auth/wrong-password' };
        ls.set('dl-session', acc.id); boot(acc);
      },
      async reset() { throw { message: 'Локал бүртгэлд нууц үг сэргээх боломжгүй.' }; }
    };
    A.logout = () => { ls.del('dl-session'); location.reload(); };
    A.leaderboard = async () => localAccounts().map(a => {
      let st = {}; try { st = JSON.parse(ls.get('deutsch-lernen-v1:' + a.id) || '{}'); } catch (e) { }
      const words = Object.values(st.srs || {}).filter(r => r.box >= 3).length;
      return { id: a.id, name: a.name, xp: st.xp || 0, streak: st.streak || 0, words };
    }).sort((x, y) => y.xp - x.xp);
    const sid = ls.get('dl-session');
    const acc = sid && localAccounts().find(a => a.id === sid);
    if (acc) boot(acc); else showLogin();
  }

  /* ---------- Үүлэн бүртгэл (Firebase) ---------- */
  async function startCloud() {
    const v = '10.12.2', base = `https://www.gstatic.com/firebasejs/${v}/`;
    let M;
    try {
      const [app, auth, fs] = await Promise.all([import(base + 'firebase-app.js'), import(base + 'firebase-auth.js'), import(base + 'firebase-firestore.js')]);
      M = Object.assign({}, app, auth, fs);
    } catch (e) {
      console.warn('Firebase ачаалагдсангүй — локал бүртгэл ашиглана', e);
      return startLocal();
    }
    const app = M.initializeApp(FB);
    const auth = M.getAuth(app);
    const db = M.getFirestore(app);
    let pendingName = null, booted = false, timer = 0;
    handlers = {
      async register(f) {
        pendingName = f.name;
        const cred = await M.createUserWithEmailAndPassword(auth, f.email, f.pass);
        await M.updateProfile(cred.user, { displayName: f.name });
        await M.setDoc(M.doc(db, 'users', cred.user.uid), { name: f.name, xp: 0, level: 1, streak: 0, words: 0, createdAt: M.serverTimestamp(), updatedAt: M.serverTimestamp() });
      },
      async login(f) { await M.signInWithEmailAndPassword(auth, f.email, f.pass); },
      async reset(email) { await M.sendPasswordResetEmail(auth, email); }
    };
    A.logout = async () => { await M.signOut(auth); location.reload(); };
    A.leaderboard = async () => {
      const snap = await M.getDocs(M.query(M.collection(db, 'users'), M.orderBy('xp', 'desc'), M.limit(60)));
      return snap.docs.map(d => Object.assign({ id: d.id }, d.data()));
    };
    M.onAuthStateChanged(auth, async user => {
      if (!user) { if (!booted) showLogin(); return; }
      if (booted) return;
      booted = true;
      const name = user.displayName || pendingName || user.email.split('@')[0];
      let state = null;
      try {
        const snap = await M.getDoc(M.doc(db, 'progress', user.uid));
        if (snap.exists()) state = JSON.parse(snap.data().state || 'null');
      } catch (e) { console.warn('Ахиц уншиж чадсангүй', e); }
      hideLogin();
      A.user = { id: user.uid, name, email: user.email };
      window.DL_boot({
        id: user.uid, name, email: user.email, state,
        onSave(S, summary) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            M.setDoc(M.doc(db, 'progress', user.uid), { state: JSON.stringify(S), updatedAt: M.serverTimestamp() }).catch(e => console.warn(e));
            M.setDoc(M.doc(db, 'users', user.uid), Object.assign({}, summary, { name, updatedAt: M.serverTimestamp() }), { merge: true }).catch(e => console.warn(e));
          }, 2500);
        }
      });
    });
  }

  if (A.mode === 'cloud') startCloud(); else startLocal();
})();
