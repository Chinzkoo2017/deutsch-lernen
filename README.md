# Deutsch Lernen — B1 → B2

Хичээлийн самбар, дасгалын номын агуулгаар хийсэн герман хэл сурах вэб. 3D багштай.

## Нээх
- **Хамгийн хялбар:** `index.html` дээр давхар дарна (Chrome / Edge). Интернэт хэрэгтэй (3D багш, фонт CDN-ээс ачаална).
- **Өөрийн 3D загвар ашиглах үед:** `start-server.bat` ажиллуулаад браузерт `http://localhost:8000` нээнэ.
  (Python суусан байх ёстой. Эсвэл VS Code-ийн *Live Server* өргөтгөл.)

## Бүтэц
```
index.html          — хуудасны бүтэц
css/style.css       — дизайн (өнгө, фонт, layout)
js/config.js        — тохиргоо: нэр, өдрийн зорилго, 3D багшийн загвар
js/data.js          — ҮГС, ДҮРЭМ, ДАСГАЛ (шинэ хичээл энд нэмнэ)
js/app.js           — програм: дасгал шалгах, карт, тоглоом, XP
js/teacher.js       — 3D багш (Three.js)
assets/             — багшийн .glb загвар энд
usefull-images/     — хичээлийн зургууд (эх сурвалж)
```

## Юу байгаа вэ
- **Grammatik** — 18 сэдэв (Vergangenheiten, stehen/stellen, N-Deklination, Plural, dass, zu, ob, W-Satz, anstatt, weil/da, obwohl, wenn/als, während, nachdem, bevor, damit/um…zu, so dass/ohne, indem). Сэдэв бүр дүрэм + хүснэгт + дасгалтай.
- **Übungen** — дасгалын номын Übung 1, 2: монгол өгүүлбэрийг Präsens / Präteritum / Perfekt гурван цагаар бичиж шалгуулна.
- **Starke Verben** — 124 дүрмийн бус үйл үг, эгшгийн загвараар 13 бүлэг: хүснэгт (нууж шалгах горимтой), бүлгээр дуудаж сонсох, 3 хэлбэр бичих дасгал (SRS), карт.
- **Wortschatz** — 215 үг: 3D эргэдэг карт (Лейтнерийн давталт), Quiz, Tippen, Hören.
- **Spiele** — Artikel-Regen, Verb-Blitz, haben oder sein?, Satzbau, Memory.
- **Fehlerheft** — алдсан бүх даалгавар хадгалагдаж, давтана.
- **Fortschritt** — XP, түвшин, streak, тэмдэг, тохиргоо (дуу хоолой, хурд).

Ахиц браузерын localStorage-д хадгалагдана (тухайн компьютер, браузерт).

## Шинэ хичээл нэмэх
`js/data.js` доторх `LESSONS` массивт нэг объект нэмнэ. Даалгаврын төрлүүд:
```js
mc('Ich ___ die Vase auf den Tisch.', ['stelle', 'stehe'], 'stelle', 'Тайлбар')   // сонголт
inp('kaufen → Partizip II', 'gekauft', 'Тайлбар')                                 // бичих (олон зөв хариулт бол массив)
tiles('Монгол утга', 'Ich weiß, dass er krank ist.')                               // үг эрэмбэлэх
T('Монгол өгүүлбэр', ['үг', 'сануулга'], 'Präsens', 'Präteritum', 'Perfekt')      // 3 цаг (WORKBOOK-д)
```
Шинэ үг: `VOCAB` массивт `N('der','Wecker','сэрүүлэг','die Wecker',['ue1'])` эсвэл `V('stellen','тавих','stellte','hat gestellt')`.

## Багшийн 3D дүрийг солих
1. Багшийн дүрийг **.glb** болгож экспортлоно (Blender, Ready Player Me, Mixamo, Meshy, Tripo…).
   Анимэйшн клипүүдийг `Idle`, `Talk`, `Happy`, `Sad`, `Wave`, `Think` гэж нэрлэвэл автоматаар холбогдоно.
   Ам хөдлөх morph target (`mouthOpen`, `jawOpen`, `viseme_aa`) байвал ярихад ам хөдөлнө.
2. Файлаа `assets/teacher.glb` гэж хадгална.
3. `js/config.js` дотор: `modelUrl: 'assets/teacher.glb'`. Нэрийг `name: '...'` гэж сольж болно.
4. `start-server.bat`-аар нээнэ. Загвар ачаалагдахгүй бол процедур дүр автоматаар гарч ирнэ.
