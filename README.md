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
- **Kurs** — Inhaltsverzeichnis-ийн дарааллаар 15 Kapitel, 27 Übung (≈190 бичгийн даалгавар): 3 цагаар орчуулах, өгүүлбэр нийлүүлэх, орчуулах. «номоос» = номын яг өгүүлбэр, «зохиосон» = сэдвээр зохиосон (номын хуудсыг авбал солино). Чөлөөт орчуулгад «Миний хариулт ч зөв» товчоор өөрөө тооцож болно.
- **Starke Verben** — хичээлийн 55 үйл үг (хуудас 1, 2) санах дүрслэлтэй + нийт 126 дүрмийн бус үйл үг, эгшгийн загвараар 13 бүлэг: хүснэгт (нууж шалгах горимтой), бүлгээр дуудаж сонсох, 3 хэлбэр бичих дасгал (SRS), карт.
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
   Анимэйшн клипүүдийг `Idle`, `Talk`, `Happy`, `Sad`, `Wave`, `Think`, `Clap`, `Cheer`, `Scold`, `Pray`, `Facepalm`, `Despair` гэж нэрлэвэл автоматаар холбогдоно (байхгүй нь Happy/Sad руу шилжинэ).
   Ам хөдлөх morph target (`mouthOpen`, `jawOpen`, `viseme_aa`) байвал ярихад ам хөдөлнө.
2. Файлаа `assets/teacher.glb` гэж хадгална.
3. `js/config.js` дотор: `modelUrl: 'assets/teacher.glb'`. Нэрийг `name: '...'` гэж сольж болно.
4. `start-server.bat`-аар нээнэ. Загвар ачаалагдахгүй бол процедур дүр автоматаар гарч ирнэ.

## Багшийн сэтгэл хөдлөл
Зөв хариулт дараалах тусам: баярлана → алга ташина → үсэрч эргэлдэнэ (алтан оч цацарна).
Буруу хариулт дараалах тусам: загнана / нүүрээ таглана (дээр нь аадар үүл) → бурханд залбирна (гэгээн туяа) → «Яагаад?!» гэж цөхөрнө.
Хэллэгүүд нь `js/data.js` доторх `PRAISE_BIG`, `SCOLD`-д — багшийнхаа жинхэнэ үгсээр сольж болно.

## Бүртгэл (ангийнхан тус бүр өөрийн бүртгэлтэй)
Сайт нээгдэхэд нэвтрэх цонх гарна: **Нэр, Имэйл, Нууц үг**-ээр бүртгүүлнэ. Хүн бүрийн ахиц (XP, карт, алдаа, рекорд) тусдаа.

- `js/config.js` дотор `firebase: null` байхад бүртгэл **зөвхөн тухайн төхөөрөмж дээр** хадгалагдана.
- Ангийнхан **аль ч төхөөрөмжөөс** нэвтэрч, «Klasse» жагсаалтад бүгд харагдахын тулд Firebase (үнэгүй) тохируулна:

1. https://console.firebase.google.com → **Add project** → нэр: `deutsch-lernen` (Analytics хэрэггүй).
2. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save**.
3. **Authentication → Settings → Authorized domains → Add domain** → `chinzkoo2017.github.io`.
4. **Build → Firestore Database → Create database** → байршил `eur3 (europe-west)` → *Production mode*.
5. **Firestore → Rules** таб дээр доорхыг хуулж **Publish**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{db}/documents {
       match /users/{uid} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.uid == uid;
       }
       match /progress/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
6. **Project settings (⚙) → Your apps → Web (</>)** → апп нэр өгөөд бүртгэнэ → гарч ирсэн `firebaseConfig`-ийг хуулна.
7. `js/config.js`-д `firebase: { apiKey: '…', authDomain: '…', projectId: '…', appId: '…' },` гэж тавина (эсвэл Claude-д явуулбал тавиад push хийнэ).

`users` цуглуулгад зөвхөн нэр, XP, streak, цээжилсэн үгийн тоо хадгалагдана — имэйл бусдад харагдахгүй. Нууц үгийг Firebase өөрөө хамгаална.

## Утасны гар
Утсан дээр бичих талбарт дарахад **дэлгэцийн герман гар** (QWERTZ + ä ö ü ß) гарна — системийн гар, түүний «санал болгох үг», автомат засвар огт гарахгүй. Хүсвэл гар дээрх «Системийн гар» эсвэл Profil → Тохиргооноос сольж болно.
