/* =========================================================
   Deutsch Lernen — тохиргоо
   Багшийн 3D дүрийг солихдоо зөвхөн энэ файлыг засна.
   ========================================================= */
window.APP_CONFIG = {
  userName: 'Chinzorig',
  dailyGoalXP: 120,          // өдрийн зорилго (XP)

  teacher: {
    name: 'Frau Sonne',
    role: 'Deutschlehrerin',

    /* ---- Өөрийн 3D загвар оруулах ----
       1) Багшийн дүрийг .glb (glTF binary) форматаар экспортлоно
          (Blender, Ready Player Me, Mixamo, Meshy гэх мэт).
       2) Файлаа  assets/teacher.glb  гэж хадгална.
       3) Доорх modelUrl-ийг 'assets/teacher.glb' болгоно.
       4) Хуудсыг локал сервероор нээнэ (start-server.bat) —
          file:// -ээр шууд нээхэд браузер .glb ачаалахыг хориглодог.
       Загвар ачаалагдахгүй бол автоматаар энэ хөөрхөн
       процедур дүр рүү буцна. */
    modelUrl: null,            // жишээ: 'assets/teacher.glb'
    modelHeight: 2.1,          // загварыг энэ өндөрт автоматаар томруулна
    modelRotationY: 0,         // загвар хойшоо харсан бол Math.PI

    /* GLB доторх анимэйшн клипийн нэрс (байхгүй бол алгасна) */
    clips: {
      idle: 'Idle',
      talk: 'Talk',
      happy: 'Happy',
      sad: 'Sad',
      wave: 'Wave',
      think: 'Think'
    },
    /* Ам хөдөлгөх morph target-ийн нэр (null бол автоматаар хайна:
       mouthOpen, jawOpen, viseme_aa ...) */
    mouthMorph: null
  }
};
