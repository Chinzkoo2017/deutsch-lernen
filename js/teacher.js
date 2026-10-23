/* =========================================================
   Deutsch Lernen — 3D багш (Three.js)
   - APP_CONFIG.teacher.modelUrl өгсөн бол .glb загварыг ачаална
   - Үгүй бол процедураар бүтээсэн хөөрхөн багшийн дүр
   API: Teacher.react(mood), Teacher.setTalking(bool), Teacher.talkFor(ms)
   mood: 'happy' | 'sad' | 'wave' | 'think' | 'talk'
   ========================================================= */
(function () {
  'use strict';
  const CFG = (window.APP_CONFIG || {}).teacher || {};
  const host = document.getElementById('teacher-stage');
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ачаалагдахаас өмнө ирсэн дуудлагыг хадгална
  let pendingMood = null, pendingTalk = 0;
  const api = {
    ready: false,
    react(m) { pendingMood = m; },
    setTalking(b) { pendingTalk = b ? 1 : 0; },
    talkFor(ms) { pendingTalk = ms; }
  };
  window.Teacher = api;
  if (!host) return;

  function fallback() {
    const d = document.createElement('div');
    d.className = 'fallback';
    d.innerHTML = `<svg width="150" height="170" viewBox="0 0 150 170" aria-hidden="true">
      <ellipse cx="75" cy="160" rx="46" ry="6" fill="#000" opacity=".35"/>
      <path d="M35 160 Q40 105 75 100 Q110 105 115 160Z" fill="#c8463b"/>
      <circle cx="75" cy="62" r="38" fill="#f2c9a5"/>
      <path d="M37 60 Q40 18 75 20 Q112 18 113 60 Q105 38 75 36 Q48 38 37 60Z" fill="#3b2a22"/>
      <circle cx="75" cy="18" r="13" fill="#3b2a22"/>
      <circle cx="62" cy="64" r="9" fill="none" stroke="#e9c25b" stroke-width="2.5"/><circle cx="88" cy="64" r="9" fill="none" stroke="#e9c25b" stroke-width="2.5"/>
      <circle cx="62" cy="64" r="3.5" fill="#1a1a1a"/><circle cx="88" cy="64" r="3.5" fill="#1a1a1a"/>
      <path d="M66 80 Q75 88 84 80" stroke="#7a2e26" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
    host.appendChild(d);
  }

  function webglOK() {
    try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; }
  }

  async function init() {
    if (!webglOK()) return fallback();
    let THREE;
    try { THREE = await import('three'); } catch (e) { console.warn('Three.js ачаалагдсангүй', e); return fallback(); }

    /* ---------- Үзэгдэл ---------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.insertBefore(renderer.domElement, host.firstChild);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
    camera.position.set(0, 1.4, 6.6);
    camera.lookAt(0, 1.28, 0);

    scene.add(new THREE.HemisphereLight(0xfff4e0, 0x2a2a35, 1.35));
    const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(2.5, 4, 3.5); scene.add(key);
    const rim = new THREE.DirectionalLight(0xe9c25b, 1.1); rim.position.set(-3, 2.5, -2.5); scene.add(rim);

    // Тоон (toon) гэрэлтүүлгийн градиент
    const gradData = new Uint8Array([110, 110, 110, 255, 185, 185, 185, 255, 255, 255, 255, 255]);
    const grad = new THREE.DataTexture(gradData, 3, 1, THREE.RGBAFormat);
    grad.minFilter = grad.magFilter = THREE.NearestFilter; grad.needsUpdate = true;
    const M = (c, extra) => new THREE.MeshToonMaterial(Object.assign({ color: c, gradientMap: grad }, extra || {}));

    // Сүүдэр
    const shCanvas = document.createElement('canvas'); shCanvas.width = shCanvas.height = 128;
    const sx = shCanvas.getContext('2d'); const g = sx.createRadialGradient(64, 64, 4, 64, 64, 62);
    g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)'); sx.fillStyle = g; sx.fillRect(0, 0, 128, 128);
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shCanvas), transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.002; scene.add(shadow);

    const root = new THREE.Group(); scene.add(root);

    /* ---------- Процедур багш ---------- */
    const P = {}; // хөдөлгөөнт хэсгүүд
    function buildProcedural() {
      const SKIN = 0xf2c9a5, HAIR = 0x3b2a22, CARDI = 0xc8463b, SKIRT = 0x2c3550, GOLD = 0xe9c25b, DARK = 0x1a1a1a;
      const body = new THREE.Group(); root.add(body); P.body = body;

      // Хормой
      const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.6, 0.72, 40), M(SKIRT)); skirt.position.y = 0.42; body.add(skirt);
      // Гутал
      [-0.17, 0.17].forEach(x => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.07, 0.18, 16), M(0x2a2420)); leg.position.set(x, 0.1, 0.02); body.add(leg);
        const shoe = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 14), M(0x6b2b24)); shoe.scale.set(1, 0.55, 1.5); shoe.position.set(x, 0.04, 0.08); body.add(shoe);
      });
      // Их бие (кардиган)
      const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.33, 0.42, 8, 24), M(CARDI)); torso.position.y = 1.0; torso.scale.set(1, 1, 0.82); body.add(torso); P.torso = torso;
      // Цагаан цамцны V хэсэг
      const collar = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.045, 10, 28), M(0xf4f1ea)); collar.position.set(0, 1.33, 0.02); collar.rotation.x = Math.PI / 2 - 0.25; collar.scale.set(1, 0.85, 1); body.add(collar);
      // Товч
      [1.08, 0.94, 0.8].forEach(y => { const b = new THREE.Mesh(new THREE.SphereGeometry(0.025, 10, 8), M(GOLD)); b.position.set(0, y, 0.275); body.add(b); });
      // Хүзүү
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.14, 16), M(SKIN)); neck.position.y = 1.38; body.add(neck);

      // Толгой
      const head = new THREE.Group(); head.position.y = 1.78; body.add(head); P.head = head;
      const skull = new THREE.Mesh(new THREE.SphereGeometry(0.46, 40, 32), M(SKIN)); skull.scale.set(1, 0.96, 0.95); head.add(skull);
      // Чих
      [-1, 1].forEach(s => { const ear = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 12), M(SKIN)); ear.position.set(s * 0.45, -0.02, -0.02); ear.scale.set(0.6, 1, 0.8); head.add(ear); });
      // Үс
      const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.49, 40, 32, 0, Math.PI * 2, 0, Math.PI * 0.56), M(HAIR));
      hairCap.rotation.x = -0.42; hairCap.position.set(0, 0.03, -0.03); head.add(hairCap);
      const back = new THREE.Mesh(new THREE.SphereGeometry(0.47, 32, 24), M(HAIR)); back.position.set(0, -0.04, -0.1); back.scale.set(1.02, 1, 0.9); head.add(back);
      const bun = new THREE.Mesh(new THREE.SphereGeometry(0.19, 24, 18), M(HAIR)); bun.position.set(0, 0.42, -0.2); head.add(bun); P.bun = bun;
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.03, 10, 24), M(GOLD)); band.position.set(0, 0.32, -0.15); band.rotation.x = -0.9; head.add(band);
      // Хацрын үс (хоёр тал)
      [-1, 1].forEach(s => { const lock = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.22, 6, 12), M(HAIR)); lock.position.set(s * 0.4, -0.08, 0.1); lock.rotation.z = s * 0.15; head.add(lock); });
      // Нүд
      const eyes = new THREE.Group(); eyes.position.set(0, 0.02, 0.4); head.add(eyes); P.eyes = eyes;
      P.eyeL = new THREE.Group(); P.eyeR = new THREE.Group();
      [[P.eyeL, -0.155], [P.eyeR, 0.155]].forEach(([grp, x]) => {
        grp.position.x = x; eyes.add(grp);
        const ball = new THREE.Mesh(new THREE.SphereGeometry(0.062, 20, 16), new THREE.MeshBasicMaterial({ color: DARK })); ball.scale.set(0.9, 1.15, 0.5); grp.add(ball);
        const hl = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })); hl.position.set(0.02, 0.028, 0.03); grp.add(hl);
      });
      // Нүдний шил
      const glassMat = M(GOLD);
      [-0.155, 0.155].forEach(x => { const rimM = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.014, 10, 32), glassMat); rimM.position.set(x, 0.02, 0.43); head.add(rimM); });
      const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.1, 8), glassMat); bridge.rotation.z = Math.PI / 2; bridge.position.set(0, 0.04, 0.44); head.add(bridge);
      [-1, 1].forEach(s => { const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.36, 6), glassMat); arm.rotation.x = Math.PI / 2; arm.position.set(s * 0.26, 0.03, 0.27); arm.rotation.y = s * 0.25; head.add(arm); });
      // Хөмсөг
      P.browL = new THREE.Mesh(new THREE.CapsuleGeometry(0.016, 0.09, 4, 8), M(HAIR)); P.browL.rotation.z = Math.PI / 2; P.browL.position.set(-0.155, 0.17, 0.42); head.add(P.browL);
      P.browR = P.browL.clone(); P.browR.position.x = 0.155; head.add(P.browR);
      // Хамар, хацар
      const nose = new THREE.Mesh(new THREE.SphereGeometry(0.035, 14, 10), M(0xe8b590)); nose.position.set(0, -0.06, 0.45); head.add(nose);
      const blushMat = new THREE.MeshBasicMaterial({ color: 0xf08a7a, transparent: true, opacity: 0.45, depthWrite: false });
      [-1, 1].forEach(s => { const c = new THREE.Mesh(new THREE.CircleGeometry(0.065, 20), blushMat); c.position.set(s * 0.27, -0.1, 0.372); c.rotation.y = s * 0.55; head.add(c); });
      // Ам
      const mouth = new THREE.Group(); mouth.position.set(0, -0.17, 0.42); head.add(mouth); P.mouth = mouth;
      P.smile = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.013, 8, 20, Math.PI), new THREE.MeshBasicMaterial({ color: 0x7a2e26 }));
      P.smile.rotation.z = Math.PI; mouth.add(P.smile);
      P.open = new THREE.Mesh(new THREE.SphereGeometry(0.055, 20, 14), new THREE.MeshBasicMaterial({ color: 0x5a1f1a }));
      P.open.scale.set(1.15, 0.2, 0.4); P.open.visible = false; mouth.add(P.open);

      // Гар
      function arm(side) {
        const pivot = new THREE.Group(); pivot.position.set(side * 0.38, 1.24, 0); body.add(pivot);
        const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.4, 6, 14), M(CARDI)); upper.position.y = -0.27; pivot.add(upper);
        const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.092, 0.05, 14), M(0xf4f1ea)); cuff.position.y = -0.5; pivot.add(cuff);
        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 12), M(SKIN)); hand.position.y = -0.58; pivot.add(hand);
        pivot.rotation.z = side * 0.12;
        return { pivot, hand };
      }
      P.armL = arm(-1); P.armR = arm(1);
      // Заагч саваа (баруун гарт)
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.016, 0.55, 8), M(0x8a5a32)); stick.position.set(0.02, -0.66, 0.18); stick.rotation.x = 1.25; P.armR.pivot.add(stick);
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 8), M(GOLD)); tip.position.set(0.02, -0.75, 0.43); P.armR.pivot.add(tip);
      // Ном (зүүн гарт) — Schwarz-Rot-Gold хавтас
      const book = new THREE.Group(); book.position.set(0.04, -0.62, 0.14); book.rotation.set(0.2, 0.3, 0.1); P.armL.pivot.add(book);
      const cover = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.36, 0.06), M(0x1f1f22)); book.add(cover);
      [[0.06, 0xd4553f], [-0.04, GOLD]].forEach(([y, c]) => { const s = new THREE.Mesh(new THREE.BoxGeometry(0.285, 0.05, 0.062), M(c)); s.position.y = y; book.add(s); });
      const pages = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.34, 0.05), M(0xf4f1ea)); pages.position.set(0.012, 0, 0); book.add(pages);
    }

    /* ---------- GLB загвар ---------- */
    let mixer = null, actions = {}, current = null, mouthTargets = [];
    async function loadGLB(url) {
      const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
      const gltf = await new Promise((res, rej) => new GLTFLoader().load(url, res, undefined, rej));
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const s = (CFG.modelHeight || 2.1) / (size.y || 1);
      model.scale.setScalar(s);
      box.setFromObject(model);
      const c = box.getCenter(new THREE.Vector3());
      model.position.x -= c.x; model.position.z -= c.z; model.position.y -= box.min.y;
      model.rotation.y = CFG.modelRotationY || 0;
      root.add(model);
      model.traverse(o => {
        if (o.isMesh && o.morphTargetDictionary) {
          const names = Object.keys(o.morphTargetDictionary);
          const want = CFG.mouthMorph ? [CFG.mouthMorph] : ['mouthOpen', 'jawOpen', 'viseme_aa', 'MouthOpen', 'A', 'aa'];
          const hit = names.find(n => want.includes(n)) || names.find(n => /mouth.?open|jaw.?open|viseme_aa/i.test(n));
          if (hit) mouthTargets.push({ mesh: o, idx: o.morphTargetDictionary[hit] });
        }
      });
      if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        const clips = CFG.clips || {};
        Object.entries(clips).forEach(([mood, name]) => {
          const clip = gltf.animations.find(a => a.name === name) || gltf.animations.find(a => a.name.toLowerCase().includes(mood));
          if (clip) actions[mood] = mixer.clipAction(clip);
        });
        if (!actions.idle) actions.idle = mixer.clipAction(gltf.animations[0]);
        current = actions.idle; current.play();
        mixer.addEventListener('finished', () => fadeTo('idle'));
      }
      return true;
    }
    function fadeTo(mood) {
      const a = actions[mood]; if (!a || a === current) return;
      a.reset();
      if (mood !== 'idle' && mood !== 'talk') { a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; }
      a.fadeIn(0.25).play();
      if (current) current.fadeOut(0.25);
      current = a;
    }

    let usingGLB = false;
    if (CFG.modelUrl) {
      try { usingGLB = await loadGLB(CFG.modelUrl); }
      catch (e) { console.warn('Багшийн GLB загвар ачаалагдсангүй — процедур дүр ашиглана.', e); }
    }
    if (!usingGLB) buildProcedural();

    /* ---------- Эффектүүд: оч, аадар үүл, гэгээн туяа, хөлс ---------- */
    const headTop = usingGLB ? (CFG.modelHeight || 2.1) : 2.28;
    const fx = new THREE.Group(); scene.add(fx);
    const sparkGeo = new THREE.OctahedronGeometry(0.045);
    let sparks = [];
    function burst(colors, n) {
      for (let i = 0; i < n; i++) {
        const m = new THREE.Mesh(sparkGeo, new THREE.MeshBasicMaterial({ color: colors[i % colors.length], transparent: true }));
        m.position.set((Math.random() - .5) * 0.5, headTop - 0.25 + Math.random() * 0.3, 0.25);
        const a = Math.random() * Math.PI * 2;
        m.userData = { v: new THREE.Vector3(Math.cos(a) * (0.6 + Math.random() * 0.9), 1.1 + Math.random() * 1.5, (Math.random() - .3) * 0.6), life: 1.3 };
        fx.add(m); sparks.push(m);
      }
    }
    const cloud = new THREE.Group(); cloud.position.set(0, headTop + 0.36, 0.05); cloud.scale.setScalar(0.85); cloud.visible = false; fx.add(cloud);
    const cMat = new THREE.MeshToonMaterial({ color: 0x4a4d57, gradientMap: grad, transparent: true, opacity: 0 });
    [[0, 0, .22], [-.24, -.05, .17], [.24, -.04, .18], [-.1, .11, .16], [.13, .1, .15]].forEach(([x, y, r]) => {
      const sp = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), cMat); sp.position.set(x, y, 0); cloud.add(sp);
    });
    const bolt = new THREE.Group(); const bMat = new THREE.MeshBasicMaterial({ color: 0xffd84a });
    [[0.04, -0.27, -0.4], [-0.03, -0.41, 0.45], [0.035, -0.55, -0.4]].forEach(([x, y, rz]) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.17, 0.02), bMat); b.position.set(x, y, 0.08); b.rotation.z = rz; bolt.add(b);
    });
    cloud.add(bolt);
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.025, 10, 40), new THREE.MeshBasicMaterial({ color: 0xffe08a, transparent: true, opacity: 0 }));
    halo.rotation.x = Math.PI / 2; halo.position.set(0, headTop + 0.2, 0); fx.add(halo);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.8, 3.4, 32, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xfff1c0, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
    beam.position.set(0, headTop + 0.4, -0.15); fx.add(beam);
    const sweat = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 10), new THREE.MeshBasicMaterial({ color: 0x8fd3ff, transparent: true, opacity: 0 }));
    sweat.scale.set(0.8, 1.25, 0.8); fx.add(sweat);
    function flashStage(cls) { host.classList.remove('flash-ok', 'flash-bad'); void host.offsetWidth; host.classList.add(cls); }
    const GOOD = ['happy', 'clap', 'cheer'], BAD = ['scold', 'pray', 'facepalm', 'despair', 'sad'];

    /* ---------- Төлөв ---------- */
    let mood = 'idle', moodT = 0, moodDur = 0;
    let talking = false, talkUntil = 0;
    let blinkT = 2 + Math.random() * 3, blinkPhase = 0;
    const look = { x: 0, y: 0, tx: 0, ty: 0 };

    api.react = m => {
      if (!m || m === 'talk') return;
      mood = m; moodT = 0;
      moodDur = { happy: 1.4, clap: 1.7, cheer: 2.1, sad: 1.3, wave: 1.8, think: 2.4, scold: 2.2, pray: 2.6, facepalm: 2.0, despair: 2.3 }[m] || 1.2;
      if (m === 'happy') burst([0xe9c25b, 0xfff1c0], 10);
      if (m === 'clap') burst([0xe9c25b, 0xffffff], 18);
      if (m === 'cheer') { burst([0xe9c25b, 0xd4553f, 0xffffff, 0x67c58f], 34); setTimeout(() => burst([0xe9c25b, 0xffffff], 20), 700); }
      if (GOOD.includes(m)) flashStage('flash-ok');
      if (BAD.includes(m)) flashStage('flash-bad');
      if (usingGLB) {
        const alias = { clap: 'happy', cheer: 'happy', scold: 'sad', pray: 'sad', facepalm: 'sad', despair: 'sad' };
        fadeTo(actions[m] ? m : alias[m] || m);
      }
    };
    api.setTalking = b => { talking = !!b; if (!b) talkUntil = 0; if (usingGLB && actions.talk && b) fadeTo('talk'); if (usingGLB && !b && current === actions.talk) fadeTo('idle'); };
    api.talkFor = ms => { talkUntil = performance.now() + ms; };
    api.ready = true;
    if (pendingMood) api.react(pendingMood);
    if (pendingTalk === 1) api.setTalking(true); else if (pendingTalk > 1) api.talkFor(pendingTalk);

    window.addEventListener('pointermove', e => {
      const r = host.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height * 0.35;
      look.tx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.5)));
      look.ty = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.5)));
    }, { passive: true });

    function resize() {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Нарийн (жижиг) дэлгэцэд илүү ойртуулна
      camera.position.z = w / h < 0.8 ? 7.8 : w / h > 1.3 ? 5.8 : 6.6;
      camera.lookAt(0, 1.28, 0);
      camera.updateProjectionMatrix();
    }
    new ResizeObserver(resize).observe(host);
    resize();

    const clock = new THREE.Clock();
    const lerp = (a, b, t) => a + (b - a) * t;
    const amp = reduce ? 0.3 : 1;

    function animate() {
      requestAnimationFrame(animate);
      if (document.hidden) return;
      const dt = Math.min(0.05, clock.getDelta());
      const t = clock.elapsedTime;
      look.x = lerp(look.x, look.tx, 0.06); look.y = lerp(look.y, look.ty, 0.06);
      const isTalking = talking || performance.now() < talkUntil;

      // --- Эффект шинэчлэх ---
      sparks = sparks.filter(m => {
        m.userData.life -= dt;
        m.userData.v.y -= 3.2 * dt;
        m.position.addScaledVector(m.userData.v, dt);
        m.rotation.x += dt * 6; m.rotation.y += dt * 4;
        m.material.opacity = Math.max(0, m.userData.life / 1.3);
        if (m.userData.life <= 0) { fx.remove(m); m.material.dispose(); return false; }
        return true;
      });
      const kk = mood !== 'idle' ? Math.sin(Math.min(1, moodT / Math.max(moodDur, 0.01)) * Math.PI) : 0;
      const stormy = mood === 'scold' || mood === 'despair';
      cMat.opacity = lerp(cMat.opacity, stormy ? Math.min(1, kk * 1.6) : 0, 0.15);
      cloud.visible = cMat.opacity > 0.02;
      cloud.position.y = headTop + 0.36 + Math.sin(t * 3) * 0.03;
      cloud.position.x = Math.sin(t * 1.7) * 0.06;
      bolt.visible = stormy && kk > 0.3 && Math.sin(t * 23) > 0.55;
      const holy = mood === 'pray' ? Math.min(1, kk * 1.5) : 0;
      halo.material.opacity = lerp(halo.material.opacity, holy, 0.12);
      beam.material.opacity = lerp(beam.material.opacity, holy * 0.22, 0.1);
      halo.position.y = headTop + 0.2 + Math.sin(t * 2.4) * 0.03;
      const sweaty = (mood === 'facepalm' || mood === 'despair') ? kk : 0;
      sweat.material.opacity = lerp(sweat.material.opacity, sweaty, 0.2);
      sweat.position.set(0.4, headTop - 0.32 - ((moodT * 0.25) % 0.25), 0.28);

      if (usingGLB) {
        mixer && mixer.update(dt);
        root.rotation.y = look.x * 0.35;
        if (mood !== 'idle') { moodT += dt; if (moodT > moodDur) mood = 'idle'; }
        if (!actions[mood] && GOOD.includes(mood)) root.position.y = Math.abs(Math.sin(moodT * 7)) * 0.15 * (1 - moodT / moodDur);
        else root.position.y = 0;
        const open = isTalking ? 0.35 + 0.65 * Math.abs(Math.sin(t * 13) * Math.sin(t * 7.3)) : 0;
        mouthTargets.forEach(m => { m.mesh.morphTargetInfluences[m.idx] = lerp(m.mesh.morphTargetInfluences[m.idx], open, 0.4); });
        renderer.render(scene, camera);
        return;
      }

      // --- Процедур анимэйшн ---
      if (mood !== 'idle') { moodT += dt; if (moodT > moodDur) { mood = 'idle'; } }
      const k = mood !== 'idle' ? Math.sin(Math.min(1, moodT / moodDur) * Math.PI) : 0; // 0→1→0

      // Амьсгал, найгах
      P.torso.scale.y = 1 + Math.sin(t * 2.1) * 0.015 * amp;
      root.rotation.y = look.x * 0.3 + Math.sin(t * 0.5) * 0.04 * amp;
      root.position.y = 0;
      P.body.rotation.z = Math.sin(t * 0.9) * 0.015 * amp;

      // Толгой хулганыг дагана
      let hx = look.y * 0.22, hy = look.x * 0.45, hz = Math.sin(t * 0.7) * 0.03 * amp;
      // Гарын суурь байрлал
      let lz = -0.12 + Math.sin(t * 1.3) * 0.02 * amp, rz = 0.12 - Math.sin(t * 1.3 + 1) * 0.02 * amp, lx = 0, rx = 0;
      let browY = 0.17, browTilt = 0, smileFlip = false;

      if (mood === 'happy') {
        root.position.y = Math.abs(Math.sin(moodT * 8.5)) * 0.16 * (1 - moodT / moodDur) * amp;
        lz = lerp(lz, -2.5, k); rz = lerp(rz, 2.5, k);
        browY = 0.17 + 0.03 * k; hx -= 0.12 * k;
      } else if (mood === 'sad') {
        hy += Math.sin(moodT * 16) * 0.28 * (1 - moodT / moodDur) * amp;
        hx += 0.12 * k; browTilt = 0.35 * k; smileFlip = k > 0.2;
        lz = lerp(lz, -0.05, k); rz = lerp(rz, 0.05, k);
      } else if (mood === 'wave') {
        rz = lerp(rz, 2.6, Math.min(1, k * 1.6)) + Math.sin(moodT * 11) * 0.3 * k * amp;
        hz += 0.12 * k; browY = 0.17 + 0.02 * k;
      } else if (mood === 'think') {
        rx = -1.9 * k; rz = lerp(rz, -0.5, k);
        hz -= 0.16 * k; hx -= 0.1 * k; hy -= 0.25 * k; browTilt = -0.2 * k;
      } else if (mood === 'clap') {
        // Алга ташина
        const osc = (Math.sin(moodT * 22) * 0.5 + 0.5) * 0.25 * k;
        lx = rx = -1.25 * k;
        lz = lerp(lz, 0.58, k) - osc; rz = lerp(rz, -0.58, k) + osc;
        root.position.y = Math.abs(Math.sin(moodT * 11)) * 0.05 * k * amp;
        browY = 0.17 + 0.03 * k; hx -= 0.1 * k;
      } else if (mood === 'cheer') {
        // Үсэрч, эргэлдэж баярлана
        root.position.y = Math.abs(Math.sin(moodT * 9)) * 0.24 * (1 - moodT / moodDur) * amp;
        root.rotation.y += (moodT / moodDur) * Math.PI * 2 * amp;
        lz = lerp(lz, -2.6, k) + Math.sin(moodT * 16) * 0.15 * k; rz = lerp(rz, 2.6, k) - Math.sin(moodT * 16) * 0.15 * k;
        browY = 0.17 + 0.035 * k; hx -= 0.15 * k;
      } else if (mood === 'scold') {
        // Долоовор хуруугаараа сүрдүүлж загнана, нөгөө гар нь ташаандаа
        rx = -2.05 * k; rz = lerp(rz, -0.2, k) + Math.sin(moodT * 14) * 0.22 * k * amp;
        lz = lerp(lz, -0.8, k); lx = 0.55 * k;
        hy += Math.sin(moodT * 10) * 0.12 * k * amp; hx -= 0.05 * k;
        browTilt = -0.5 * k; browY = 0.17 - 0.02 * k; smileFlip = true;
      } else if (mood === 'pray') {
        // Хоёр гараа нийлүүлж, тэнгэр өөд харж залбирна
        lx = rx = -1.35 * k;
        lz = lerp(lz, 0.64, k); rz = lerp(rz, -0.64, k);
        hx = lerp(hx, -0.42, k); hy *= 1 - k; hz = Math.sin(moodT * 3) * 0.05 * k;
        root.position.y = Math.sin(moodT * 5) * 0.02 * k;
        browTilt = 0.4 * k; browY = 0.17 + 0.02 * k; smileFlip = true;
      } else if (mood === 'facepalm') {
        // Гараараа нүүрээ таглана
        rx = -2.3 * k; rz = lerp(rz, -0.45, k);
        hx = lerp(hx, 0.3, k); hz -= 0.12 * k; hy *= 1 - k;
        lz = lerp(lz, -0.02, k);
        browTilt = 0.3 * k; smileFlip = true;
      } else if (mood === 'despair') {
        // Хоёр гараа өргөж «Яагаад?!» гэж цөхөрнө
        lz = lerp(lz, -2.75, k) + Math.sin(moodT * 18) * 0.12 * k * amp;
        rz = lerp(rz, 2.75, k) - Math.sin(moodT * 18) * 0.12 * k * amp;
        lx = rx = -0.35 * k;
        hx = lerp(hx, -0.38, k); hy += Math.sin(moodT * 12) * 0.2 * k * amp;
        browTilt = 0.5 * k; browY = 0.17 + 0.03 * k; smileFlip = true;
      }
      P.head.rotation.set(lerp(P.head.rotation.x, hx, 0.18), lerp(P.head.rotation.y, hy, 0.18), lerp(P.head.rotation.z, hz, 0.18));
      P.armL.pivot.rotation.z = lerp(P.armL.pivot.rotation.z, lz, 0.2);
      P.armR.pivot.rotation.z = lerp(P.armR.pivot.rotation.z, rz, 0.2);
      P.armL.pivot.rotation.x = lerp(P.armL.pivot.rotation.x, lx, 0.2);
      P.armR.pivot.rotation.x = lerp(P.armR.pivot.rotation.x, rx, 0.2);
      P.browL.position.y = P.browR.position.y = lerp(P.browL.position.y, browY, 0.2);
      P.browL.rotation.z = Math.PI / 2 - browTilt; P.browR.rotation.z = Math.PI / 2 + browTilt;

      // Нүд анивчих
      blinkT -= dt;
      if (blinkT <= 0) { blinkPhase = 0.14; blinkT = 2.2 + Math.random() * 3.5; }
      let ey = 1;
      if (blinkPhase > 0) { blinkPhase -= dt; ey = 0.12; }
      if (GOOD.includes(mood) && k > 0.3) ey = Math.min(ey, 0.35); // инээхэд нүд нарийсна
      if ((mood === 'pray' || mood === 'facepalm') && k > 0.3) ey = 0.1; // нүдээ аньна
      if (mood === 'despair' && k > 0.3) ey = 1.35; // нүд томорно
      P.eyeL.scale.y = P.eyeR.scale.y = lerp(P.eyeL.scale.y, ey, 0.5);
      P.eyes.position.x = look.x * 0.025; P.eyes.position.y = 0.02 - look.y * 0.015;

      // Ам
      if (isTalking) {
        P.open.visible = true; P.smile.visible = false;
        const o = 0.25 + 0.95 * Math.abs(Math.sin(t * 13) * Math.sin(t * 7.3 + 1));
        P.open.scale.y = lerp(P.open.scale.y, o, 0.5);
      } else {
        P.open.visible = (GOOD.includes(mood) || mood === 'despair') && k > 0.25; P.open.scale.y = mood === 'despair' ? 1.3 : 0.7;
        P.smile.visible = !P.open.visible;
        P.smile.rotation.z = smileFlip ? 0 : Math.PI;
        P.smile.position.y = smileFlip ? -0.04 : 0;
      }
      P.bun.position.y = 0.42 + Math.abs(root.position.y) * 0.2;
      renderer.render(scene, camera);
    }
    animate();
  }

  init();
})();
