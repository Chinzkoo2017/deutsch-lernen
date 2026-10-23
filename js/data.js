/* =========================================================
   Deutsch Lernen — хичээлийн өгөгдөл
   Эх сурвалж: хичээлийн самбар + дасгалын ном (Übung 1, 2,
   Inhaltsverzeichnis). Шинэ үг, дасгал нэмэхдээ энд нэмнэ.
   ========================================================= */
(function () {
  /* ---------- Үгсийн сан ---------- */
  const N = (art, de, mn, pl, tags) => ({ type: 'noun', art, de, mn, pl, tags: tags || [] });
  const V = (de, mn, prat, perf, tags) => ({ type: 'verb', de, mn, prat, perf, tags: tags || [] });
  const A = (de, mn, tags) => ({ type: 'adj', de, mn, tags: tags || [] });

  const VOCAB = [
    // Übung 1 — нэр үг
    N('der', 'Wecker', 'сэрүүлэг', 'die Wecker', ['ue1']),
    N('die', 'Putzfrau', 'цэвэрлэгч бүсгүй', 'die Putzfrauen', ['ue1']),
    N('der', 'Fußboden', 'шал', 'die Fußböden', ['ue1']),
    N('das', 'Büro', 'контор, албан тасалгаа', 'die Büros', ['ue1']),
    N('die', 'Oma', 'эмээ', 'die Omas', ['ue1']),
    N('das', 'Brot', 'талх', 'die Brote', ['ue1']),
    N('die', 'Brille', 'нүдний шил', 'die Brillen', ['ue1']),
    N('die', 'Tante', 'нагац эгч', 'die Tanten', ['ue1', 'ue2']),
    N('die', 'Blume', 'цэцэг', 'die Blumen', ['ue1']),
    N('der', 'Bruder', 'ах', 'die Brüder', ['ue1', 'ue2']),
    N('das', 'Holz', 'мод (түлээ)', 'die Hölzer', ['ue1']),
    N('die', 'Feuerwehr', 'гал команд', 'die Feuerwehren', ['ue1']),
    N('der', 'Bewohner', 'оршин суугч', 'die Bewohner', ['ue1']),
    N('das', 'Hochhaus', 'өндөр байшин', 'die Hochhäuser', ['ue1']),
    N('das', 'Bild', 'зураг', 'die Bilder', ['ue1']),
    N('die', 'Kartoffel', 'төмс', 'die Kartoffeln', ['ue1']),
    N('der', 'Lehrer', 'багш', 'die Lehrer', ['ue1']),
    N('der', 'Fehler', 'алдаа', 'die Fehler', ['ue1']),
    N('der', 'Text', 'өгүүллэг, текст', 'die Texte', ['ue1']),
    N('der', 'Mechaniker', 'механикч', 'die Mechaniker', ['ue1']),
    N('der', 'Lenker', 'залуур', 'die Lenker', ['ue1']),
    N('das', 'Fahrrad', 'унадаг дугуй', 'die Fahrräder', ['ue1', 'tafel']),
    N('der', 'Brief', 'захиа', 'die Briefe', ['ue1', 'ue2', 'tafel']),
    N('der', 'Sohn', 'хүү (өөрийн төрсөн)', 'die Söhne', ['ue1', 'ue2', 'tafel']),
    N('der', 'Apfel', 'алим', 'die Äpfel', ['ue1']),
    N('der', 'Tee', 'цай', 'die Tees', ['ue1']),
    N('die', 'Tür', 'хаалга', 'die Türen', ['ue1', 'tafel']),
    N('das', 'Badezimmer', 'банны өрөө', 'die Badezimmer', ['ue1']),
    N('der', 'Dieb', 'хулгайч', 'die Diebe', ['ue1']),
    N('die', 'Handtasche', 'гар цүнх', 'die Handtaschen', ['ue1']),
    N('die', 'Frau', 'бүсгүй, эмэгтэй', 'die Frauen', ['ue1']),
    N('das', 'Hemd', 'цамц', 'die Hemden', ['ue1']),
    N('der', 'Pullover', 'ноосон цамц', 'die Pullover', ['ue1']),
    N('die', 'Suppe', 'шөл', 'die Suppen', ['ue1']),
    N('die', 'Katze', 'муур', 'die Katzen', ['ue1']),
    // Übung 2
    N('der', 'Mann', 'эрэгтэй хүн, нөхөр', 'die Männer', ['ue2']),
    N('das', 'Rote Kreuz', 'Улаан загалмай', null, ['ue2']),
    N('der', 'Spender', 'хандивлагч', 'die Spender', ['ue2']),
    N('das', 'Geld', 'мөнгө', 'die Gelder', ['ue2']),
    N('die', 'Großeltern', 'эмээ өвөө хоёр', '(зөвхөн олон тоо)', ['ue2', 'plural']),
    N('die', 'Postkarte', 'ил захидал', 'die Postkarten', ['ue2']),
    // Самбар
    N('der', 'Mantel', 'пальто', 'die Mäntel', ['tafel']),
    N('der', 'Stuhl', 'сандал', 'die Stühle', ['tafel']),
    N('das', 'Bett', 'ор', 'die Betten', ['tafel']),
    N('der', 'Zug', 'галт тэрэг', 'die Züge', ['tafel']),
    N('der', 'Supermarkt', 'супермаркет', 'die Supermärkte', ['tafel']),
    N('der', 'Opa', 'өвөө', 'die Opas', ['tafel']),
    N('die', 'Mutter', 'ээж', 'die Mütter', ['tafel']),
    N('die', 'Eltern', 'эцэг эх', '(зөвхөн олон тоо)', ['tafel', 'plural']),
    // N-Deklination
    N('der', 'Student', 'оюутан', 'die Studenten', ['ndekl', 'tafel']),
    N('der', 'Dozent', 'багш (их сургуулийн)', 'die Dozenten', ['ndekl']),
    N('der', 'Patient', 'өвчтөн', 'die Patienten', ['ndekl']),
    N('der', 'Präsident', 'ерөнхийлөгч', 'die Präsidenten', ['ndekl']),
    N('der', 'Jurist', 'хуульч', 'die Juristen', ['ndekl']),
    N('der', 'Polizist', 'цагдаа', 'die Polizisten', ['ndekl']),
    N('der', 'Tourist', 'жуулчин', 'die Touristen', ['ndekl']),
    N('der', 'Junge', 'хөвгүүн', 'die Jungen', ['ndekl']),
    N('der', 'Kollege', 'хамт ажилтан', 'die Kollegen', ['ndekl']),
    N('der', 'Zeuge', 'гэрч', 'die Zeugen', ['ndekl']),
    N('der', 'Name', 'нэр', 'die Namen', ['ndekl']),
    N('der', 'Löwe', 'арслан', 'die Löwen', ['ndekl']),
    N('der', 'Hase', 'туулай', 'die Hasen', ['ndekl']),
    N('der', 'Welpe', 'гөлөг', 'die Welpen', ['ndekl']),
    N('der', 'Mongole', 'монгол хүн (эр)', 'die Mongolen', ['ndekl']),
    N('der', 'Mensch', 'хүн', 'die Menschen', ['ndekl']),
    N('der', 'Nachbar', 'хөрш', 'die Nachbarn', ['ndekl']),
    N('der', 'Herr', 'ноён', 'die Herren', ['ndekl']),
    N('der', 'Bär', 'баавгай', 'die Bären', ['ndekl']),
    // Үйл үг
    V('stellen', 'тавих (босоо)', 'stellte', 'hat gestellt', ['ue1', 'tafel']),
    V('wischen', 'арчих', 'wischte', 'hat gewischt', ['ue1']),
    V('schneiden', 'огтлох, хэрчих, тайрах', 'schnitt', 'hat geschnitten', ['ue1', 'tafel']),
    V('tragen', 'өргөх, өмсөх, зүүх', 'trug', 'hat getragen', ['ue1']),
    V('gießen', 'услах', 'goss', 'hat gegossen', ['ue1']),
    V('spalten', 'хагалах, цуулах', 'spaltete', 'hat gespalten', ['ue1']),
    V('retten', 'аврах', 'rettete', 'hat gerettet', ['ue1']),
    V('zeichnen', 'зурах', 'zeichnete', 'hat gezeichnet', ['ue1']),
    V('korrigieren', 'засах (алдаа)', 'korrigierte', 'hat korrigiert', ['ue1']),
    V('reparieren', 'засах (эвдрэл)', 'reparierte', 'hat repariert', ['ue1']),
    V('schreiben', 'бичих', 'schrieb', 'hat geschrieben', ['ue1', 'ue2']),
    V('essen', 'хоол идэх', 'aß', 'hat gegessen', ['ue1']),
    V('trinken', 'уух', 'trank', 'hat getrunken', ['ue1']),
    V('schließen', 'хаах', 'schloss', 'hat geschlossen', ['ue1']),
    V('stehlen', 'хулгайлах', 'stahl', 'hat gestohlen', ['ue1']),
    V('bügeln', 'индүүдэх', 'bügelte', 'hat gebügelt', ['ue1']),
    V('waschen', 'угаах', 'wusch', 'hat gewaschen', ['ue1']),
    V('kochen', 'хоол хийх, чанах', 'kochte', 'hat gekocht', ['ue1']),
    V('füttern', 'хооллох (амьтан)', 'fütterte', 'hat gefüttert', ['ue1']),
    V('glauben', 'итгэх', 'glaubte', 'hat geglaubt', ['ue2']),
    V('danken', 'талархах', 'dankte', 'hat gedankt', ['ue2']),
    V('geben', 'өгөх', 'gab', 'hat gegeben', ['ue2']),
    V('fehlen', 'дутагдах, санагдах', 'fehlte', 'hat gefehlt', ['ue2']),
    V('schicken', 'илгээх', 'schickte', 'hat geschickt', ['ue2']),
    V('kaufen', 'худалдаж авах', 'kaufte', 'hat gekauft', ['ue2', 'tafel']),
    V('reisen', 'аялах', 'reiste', 'ist gereist', ['tafel']),
    V('helfen', 'туслах (+Dativ)', 'half', 'hat geholfen', ['tafel']),
    V('kommen', 'ирэх', 'kam', 'ist gekommen', ['tafel']),
    V('einkaufen', 'дэлгүүр хэсэх', 'kaufte ein', 'hat eingekauft', ['tafel']),
    V('verkaufen', 'зарах', 'verkaufte', 'hat verkauft', ['tafel']),
    V('ankommen', 'хүрч ирэх', 'kam an', 'ist angekommen', ['tafel']),
    V('bekommen', 'хүлээн авах', 'bekam', 'hat bekommen', ['tafel']),
    V('stehen', 'зогсох, байх (босоо)', 'stand', 'hat gestanden', ['tafel']),
    V('liegen', 'хэвтэх, байх (хэвтээ)', 'lag', 'hat gelegen', ['tafel']),
    V('legen', 'тавих (хэвтээ)', 'legte', 'hat gelegt', ['tafel']),
    V('sitzen', 'суух (байрлал)', 'saß', 'hat gesessen', ['tafel']),
    V('setzen', 'суулгах; sich setzen — суух', 'setzte', 'hat gesetzt', ['tafel']),
    V('hängen', 'өлгөөтэй байх (hing) / өлгөх (hängte)', 'hing / hängte', 'hat gehangen / hat gehängt', ['tafel']),
    V('antworten', 'хариулах (+Dativ)', 'antwortete', 'hat geantwortet', ['tafel']),
    V('warten', 'хүлээх', 'wartete', 'hat gewartet', ['tafel']),
    A('weiß', 'цагаан', ['ue1'])
  ];
  /* ---------- Дүрмийн бус (хүчтэй) үйл үг ----------
     [Infinitiv, er/sie/es (Präsens), Präteritum, Perfekt, монгол, бүлэг] */
  const IRREG_GROUPS = [
    { k: 'sonder', p: 'Хамгийн чухал', mn: 'sein, haben, werden, gehen… — өдөр бүр хэрэглэнэ, эхэлж цээжил.' },
    { k: 'modal', p: 'Modalverben', mn: 'Präteritum-д умлаут алга болно: können → konnte, müssen → musste.' },
    { k: 'ei-ie', p: 'ei → ie → ie', mn: 'schreiben – schrieb – geschrieben' },
    { k: 'ei-i', p: 'ei → i → i', mn: 'Гийгүүлэгч давхардана: schneiden – schnitt – geschnitten' },
    { k: 'ie-o', p: 'ie → o → o', mn: 'fliegen – flog – geflogen' },
    { k: 'i-a-u', p: 'i → a → u', mn: 'trinken – trank – getrunken' },
    { k: 'i-a-o', p: 'i → a → o', mn: 'beginnen – begann – begonnen' },
    { k: 'e-a-o', p: 'e → a → o', mn: 'er/sie хэлбэрт e → i(e): sprechen → er spricht' },
    { k: 'e-a-e', p: 'e → a → e', mn: 'er/sie хэлбэрт e → i(e): sehen → er sieht' },
    { k: 'a-u-a', p: 'a → u → a', mn: 'er/sie хэлбэрт a → ä: fahren → er fährt' },
    { k: 'a-ie-a', p: '… → ie → …', mn: 'Präteritum-д ie (i) гарч, Partizip нь Infinitiv руу буцна: schlafen – schlief – geschlafen' },
    { k: 'misch', p: 'Mischverben', mn: 'Сул үйл үг шиг -te, гэхдээ эгшиг солигдоно: denken – dachte – gedacht' },
    { k: 'praefix', p: 'Угтвартай', mn: 'Үндсэн үйл үгийнхээ хэлбэрийг дагана: verstehen ← stehen, anfangen ← fangen' }
  ];
  const IRREG = [
    ['sein', 'ist', 'war', 'ist gewesen', 'байх', 'sonder'],
    ['haben', 'hat', 'hatte', 'hat gehabt', 'байх (эзэмших)', 'sonder'],
    ['werden', 'wird', 'wurde', 'ist geworden', 'болох', 'sonder'],
    ['gehen', 'geht', 'ging', 'ist gegangen', 'явах (явганаар)', 'sonder'],
    ['kommen', 'kommt', 'kam', 'ist gekommen', 'ирэх', 'sonder'],
    ['stehen', 'steht', 'stand', 'hat gestanden', 'зогсох', 'sonder'],
    ['tun', 'tut', 'tat', 'hat getan', 'хийх', 'sonder'],
    ['liegen', 'liegt', 'lag', 'hat gelegen', 'хэвтэх', 'sonder'],
    ['sitzen', 'sitzt', 'saß', 'hat gesessen', 'суух', 'sonder'],
    ['bitten', 'bittet', 'bat', 'hat gebeten', 'гуйх', 'sonder'],
    ['hängen', 'hängt', 'hing', 'hat gehangen', 'өлгөөтэй байх', 'sonder'],
    ['können', 'kann', 'konnte', 'hat gekonnt', 'чадах', 'modal'],
    ['müssen', 'muss', 'musste', 'hat gemusst', 'ёстой', 'modal'],
    ['dürfen', 'darf', 'durfte', 'hat gedurft', 'болох (зөвшөөрөл)', 'modal'],
    ['wollen', 'will', 'wollte', 'hat gewollt', 'хүсэх', 'modal'],
    ['mögen', 'mag', 'mochte', 'hat gemocht', 'дуртай байх', 'modal'],
    ['bleiben', 'bleibt', 'blieb', 'ist geblieben', 'үлдэх', 'ei-ie'],
    ['leihen', 'leiht', 'lieh', 'hat geliehen', 'зээлэх, зээлдүүлэх', 'ei-ie'],
    ['scheinen', 'scheint', 'schien', 'hat geschienen', 'гэрэлтэх; …мэт санагдах', 'ei-ie'],
    ['schreiben', 'schreibt', 'schrieb', 'hat geschrieben', 'бичих', 'ei-ie'],
    ['schreien', 'schreit', 'schrie', 'hat geschrien', 'хашгирах', 'ei-ie'],
    ['schweigen', 'schweigt', 'schwieg', 'hat geschwiegen', 'дуугүй байх', 'ei-ie'],
    ['steigen', 'steigt', 'stieg', 'ist gestiegen', 'авирах, өсөх', 'ei-ie'],
    ['treiben', 'treibt', 'trieb', 'hat getrieben', 'хөөх; (спорт) хичээллэх', 'ei-ie'],
    ['verzeihen', 'verzeiht', 'verzieh', 'hat verziehen', 'уучлах', 'ei-ie'],
    ['entscheiden', 'entscheidet', 'entschied', 'hat entschieden', 'шийдэх', 'ei-ie'],
    ['beweisen', 'beweist', 'bewies', 'hat bewiesen', 'нотлох', 'ei-ie'],
    ['beißen', 'beißt', 'biss', 'hat gebissen', 'хазах', 'ei-i'],
    ['greifen', 'greift', 'griff', 'hat gegriffen', 'шүүрэх, барих', 'ei-i'],
    ['leiden', 'leidet', 'litt', 'hat gelitten', 'зовох', 'ei-i'],
    ['pfeifen', 'pfeift', 'pfiff', 'hat gepfiffen', 'исгэрэх', 'ei-i'],
    ['reiten', 'reitet', 'ritt', 'ist geritten', 'морь унах', 'ei-i'],
    ['schneiden', 'schneidet', 'schnitt', 'hat geschnitten', 'огтлох, хэрчих', 'ei-i'],
    ['streiten', 'streitet', 'stritt', 'hat gestritten', 'маргалдах', 'ei-i'],
    ['vergleichen', 'vergleicht', 'verglich', 'hat verglichen', 'харьцуулах', 'ei-i'],
    ['bieten', 'bietet', 'bot', 'hat geboten', 'санал болгох', 'ie-o'],
    ['verbieten', 'verbietet', 'verbot', 'hat verboten', 'хориглох', 'ie-o'],
    ['fliegen', 'fliegt', 'flog', 'ist geflogen', 'нисэх', 'ie-o'],
    ['fliehen', 'flieht', 'floh', 'ist geflohen', 'зугтах', 'ie-o'],
    ['fließen', 'fließt', 'floss', 'ist geflossen', 'урсах', 'ie-o'],
    ['frieren', 'friert', 'fror', 'hat gefroren', 'даарах', 'ie-o'],
    ['genießen', 'genießt', 'genoss', 'hat genossen', 'таашаах', 'ie-o'],
    ['gießen', 'gießt', 'goss', 'hat gegossen', 'услах', 'ie-o'],
    ['riechen', 'riecht', 'roch', 'hat gerochen', 'үнэрлэх, үнэртэх', 'ie-o'],
    ['schieben', 'schiebt', 'schob', 'hat geschoben', 'түлхэх', 'ie-o'],
    ['schießen', 'schießt', 'schoss', 'hat geschossen', 'буудах', 'ie-o'],
    ['schließen', 'schließt', 'schloss', 'hat geschlossen', 'хаах', 'ie-o'],
    ['verlieren', 'verliert', 'verlor', 'hat verloren', 'алдах, гээх', 'ie-o'],
    ['wiegen', 'wiegt', 'wog', 'hat gewogen', 'жинлэх, жинтэй байх', 'ie-o'],
    ['ziehen', 'zieht', 'zog', 'hat gezogen', 'татах', 'ie-o'],
    ['lügen', 'lügt', 'log', 'hat gelogen', 'худал хэлэх', 'ie-o'],
    ['binden', 'bindet', 'band', 'hat gebunden', 'уях', 'i-a-u'],
    ['finden', 'findet', 'fand', 'hat gefunden', 'олох; бодох', 'i-a-u'],
    ['gelingen', 'gelingt', 'gelang', 'ist gelungen', 'бүтэх, амжих', 'i-a-u'],
    ['klingen', 'klingt', 'klang', 'hat geklungen', 'сонсогдох', 'i-a-u'],
    ['singen', 'singt', 'sang', 'hat gesungen', 'дуулах', 'i-a-u'],
    ['sinken', 'sinkt', 'sank', 'ist gesunken', 'живэх, буурах', 'i-a-u'],
    ['springen', 'springt', 'sprang', 'ist gesprungen', 'үсрэх', 'i-a-u'],
    ['trinken', 'trinkt', 'trank', 'hat getrunken', 'уух', 'i-a-u'],
    ['verschwinden', 'verschwindet', 'verschwand', 'ist verschwunden', 'алга болох', 'i-a-u'],
    ['zwingen', 'zwingt', 'zwang', 'hat gezwungen', 'албадах', 'i-a-u'],
    ['beginnen', 'beginnt', 'begann', 'hat begonnen', 'эхлэх', 'i-a-o'],
    ['gewinnen', 'gewinnt', 'gewann', 'hat gewonnen', 'ялах, хожих', 'i-a-o'],
    ['schwimmen', 'schwimmt', 'schwamm', 'ist geschwommen', 'сэлэх', 'i-a-o'],
    ['brechen', 'bricht', 'brach', 'hat gebrochen', 'хугалах', 'e-a-o'],
    ['empfehlen', 'empfiehlt', 'empfahl', 'hat empfohlen', 'зөвлөх', 'e-a-o'],
    ['gelten', 'gilt', 'galt', 'hat gegolten', 'хүчинтэй байх', 'e-a-o'],
    ['helfen', 'hilft', 'half', 'hat geholfen', 'туслах', 'e-a-o'],
    ['nehmen', 'nimmt', 'nahm', 'hat genommen', 'авах', 'e-a-o'],
    ['sprechen', 'spricht', 'sprach', 'hat gesprochen', 'ярих', 'e-a-o'],
    ['stehlen', 'stiehlt', 'stahl', 'hat gestohlen', 'хулгайлах', 'e-a-o'],
    ['sterben', 'stirbt', 'starb', 'ist gestorben', 'нас барах', 'e-a-o'],
    ['treffen', 'trifft', 'traf', 'hat getroffen', 'уулзах; онох', 'e-a-o'],
    ['werfen', 'wirft', 'warf', 'hat geworfen', 'шидэх, хаях', 'e-a-o'],
    ['befehlen', 'befiehlt', 'befahl', 'hat befohlen', 'тушаах', 'e-a-o'],
    ['gebären', 'gebärt', 'gebar', 'hat geboren', 'төрөх, төрүүлэх', 'e-a-o'],
    ['sich bewerben', 'bewirbt sich', 'bewarb sich', 'hat sich beworben', 'ажилд өргөдөл гаргах', 'e-a-o'],
    ['erschrecken', 'erschrickt', 'erschrak', 'ist erschrocken', 'цочих, айх', 'e-a-o'],
    ['essen', 'isst', 'aß', 'hat gegessen', 'идэх', 'e-a-e'],
    ['geben', 'gibt', 'gab', 'hat gegeben', 'өгөх', 'e-a-e'],
    ['geschehen', 'geschieht', 'geschah', 'ist geschehen', 'тохиолдох', 'e-a-e'],
    ['lesen', 'liest', 'las', 'hat gelesen', 'унших', 'e-a-e'],
    ['messen', 'misst', 'maß', 'hat gemessen', 'хэмжих', 'e-a-e'],
    ['sehen', 'sieht', 'sah', 'hat gesehen', 'харах', 'e-a-e'],
    ['treten', 'tritt', 'trat', 'ist getreten', 'орох; гишгэх', 'e-a-e'],
    ['vergessen', 'vergisst', 'vergaß', 'hat vergessen', 'мартах', 'e-a-e'],
    ['fahren', 'fährt', 'fuhr', 'ist gefahren', '(унаагаар) явах', 'a-u-a'],
    ['laden', 'lädt', 'lud', 'hat geladen', 'ачих; цэнэглэх', 'a-u-a'],
    ['schlagen', 'schlägt', 'schlug', 'hat geschlagen', 'цохих', 'a-u-a'],
    ['tragen', 'trägt', 'trug', 'hat getragen', 'өмсөх, зүүх, зөөх', 'a-u-a'],
    ['wachsen', 'wächst', 'wuchs', 'ist gewachsen', 'ургах, өсөх', 'a-u-a'],
    ['waschen', 'wäscht', 'wusch', 'hat gewaschen', 'угаах', 'a-u-a'],
    ['fallen', 'fällt', 'fiel', 'ist gefallen', 'унах', 'a-ie-a'],
    ['gefallen', 'gefällt', 'gefiel', 'hat gefallen', 'таалагдах', 'a-ie-a'],
    ['halten', 'hält', 'hielt', 'hat gehalten', 'барих; зогсох', 'a-ie-a'],
    ['lassen', 'lässt', 'ließ', 'hat gelassen', 'орхих; зөвшөөрөх', 'a-ie-a'],
    ['raten', 'rät', 'riet', 'hat geraten', 'зөвлөх; таах', 'a-ie-a'],
    ['schlafen', 'schläft', 'schlief', 'hat geschlafen', 'унтах', 'a-ie-a'],
    ['fangen', 'fängt', 'fing', 'hat gefangen', 'барьж авах', 'a-ie-a'],
    ['laufen', 'läuft', 'lief', 'ist gelaufen', 'гүйх, алхах', 'a-ie-a'],
    ['rufen', 'ruft', 'rief', 'hat gerufen', 'дуудах', 'a-ie-a'],
    ['heißen', 'heißt', 'hieß', 'hat geheißen', 'нэртэй байх', 'a-ie-a'],
    ['bringen', 'bringt', 'brachte', 'hat gebracht', 'авчрах', 'misch'],
    ['denken', 'denkt', 'dachte', 'hat gedacht', 'бодох', 'misch'],
    ['kennen', 'kennt', 'kannte', 'hat gekannt', 'таних', 'misch'],
    ['nennen', 'nennt', 'nannte', 'hat genannt', 'нэрлэх', 'misch'],
    ['rennen', 'rennt', 'rannte', 'ist gerannt', 'хурдан гүйх', 'misch'],
    ['brennen', 'brennt', 'brannte', 'hat gebrannt', 'шатах', 'misch'],
    ['wissen', 'weiß', 'wusste', 'hat gewusst', 'мэдэх', 'misch'],
    ['verstehen', 'versteht', 'verstand', 'hat verstanden', 'ойлгох', 'praefix'],
    ['aufstehen', 'steht auf', 'stand auf', 'ist aufgestanden', 'босох', 'praefix'],
    ['bekommen', 'bekommt', 'bekam', 'hat bekommen', 'хүлээн авах', 'praefix'],
    ['ankommen', 'kommt an', 'kam an', 'ist angekommen', 'хүрч ирэх', 'praefix'],
    ['anfangen', 'fängt an', 'fing an', 'hat angefangen', 'эхлэх', 'praefix'],
    ['anrufen', 'ruft an', 'rief an', 'hat angerufen', 'утасдах', 'praefix'],
    ['einladen', 'lädt ein', 'lud ein', 'hat eingeladen', 'урих', 'praefix'],
    ['einschlafen', 'schläft ein', 'schlief ein', 'ist eingeschlafen', 'унтаж орох', 'praefix'],
    ['aussehen', 'sieht aus', 'sah aus', 'hat ausgesehen', 'харагдах', 'praefix'],
    ['fernsehen', 'sieht fern', 'sah fern', 'hat ferngesehen', 'зурагт үзэх', 'praefix'],
    ['vorschlagen', 'schlägt vor', 'schlug vor', 'hat vorgeschlagen', 'санал болгох', 'praefix'],
    ['umziehen', 'zieht um', 'zog um', 'ist umgezogen', 'нүүх', 'praefix'],
    ['beschreiben', 'beschreibt', 'beschrieb', 'hat beschrieben', 'тайлбарлах', 'praefix'],
    ['unterschreiben', 'unterschreibt', 'unterschrieb', 'hat unterschrieben', 'гарын үсэг зурах', 'praefix'],
    ['erfahren', 'erfährt', 'erfuhr', 'hat erfahren', 'мэдэж авах', 'praefix'],
    ['verlassen', 'verlässt', 'verließ', 'hat verlassen', 'орхиж явах', 'praefix'],
    ['erhalten', 'erhält', 'erhielt', 'hat erhalten', 'хүлээн авах', 'praefix']
  ].map(([inf, er, prat, perf, mn, g]) => ({ inf, er, prat, perf, mn, g }));

  /* Хичээлийн жагсаалт (Hausaufgabe) — 1-р хичээл, хуудас 1 ба 2.
     Утга нь хичээл дээр өгсөн орчуулгаар. */
  const KLASSE = {
    1: { fahren: 'унаагаар явах', gehen: 'явган явах', kommen: 'ирэх', laufen: 'гүйх, алхах', fliegen: 'нисэх', fliehen: 'зугтах, оргох',
      nehmen: 'авах', sehen: 'үзэх, харах', lesen: 'унших', schreiben: 'бичих', sprechen: 'ярих, ярилцах', steigen: 'өсөх, авирч гарах',
      streiten: 'хэрэлдэх', schlafen: 'унтах', schneiden: 'огтлох, хайчлах, зүсэх', essen: 'идэх', trinken: 'уух', sitzen: 'суух',
      stehen: 'зогсох, байх', liegen: 'хэвтэх, байх', hängen: 'өлгөөтэй байх', ziehen: 'татах, нүүх', beginnen: 'эхлэх',
      bleiben: 'үлдэх, байх', bringen: 'авчрах, хүргэх', kennen: 'таних', treffen: 'уулзах' },
    2: { helfen: 'туслах', tragen: 'өргөх, үүрэх, өмсөх, зүүх', geben: 'өгөх', schwimmen: 'сэлэх', rennen: 'уралдах, гүйх',
      springen: 'үсрэх, харайх', rufen: 'дуудах', laden: 'ачих, цэнэглэх', lassen: 'орхих', waschen: 'угаах', wachsen: 'ургах',
      fangen: 'барих', fallen: 'унах', sterben: 'үхэх, нас барах', 'gebären': 'төрөх', denken: 'бодох', haben: 'байх', sein: 'байх',
      halten: 'тогтоож барих', schließen: 'хаах', schlagen: 'зодох, цохих', befehlen: 'тушаах', empfehlen: 'зөвлөх',
      werfen: 'шидэх, хаях', wissen: 'мэдэх', vergessen: 'мартах', verlieren: 'алдах, гээх', stehlen: 'хулгайлах' }
  };
  /* Цээжлэх дүрслэл (хичээлийн тэмдэглэлээс) */
  const MNEMO = {
    schreiben: 'schrieb — үзэгнээс «шрийб!» хэмээн бэх цацрав', steigen: 'stieg — оргилд гараад стейк идэв',
    bleiben: 'blieb — «блийб» дуугарах хуучин утас ганцаар үлдэв', streiten: 'stritt — гудамжинд (street) хэрэлдэв',
    schneiden: 'schnitt — хайчаар Schnitzel зүсэв', trinken: 'trank — бүтэн танк шар айраг уугаад betrunken болов',
    springen: 'sprang — пүрш дээр «спранг!»', beginnen: 'begonnen — «Гонг!» цохиулж эхлэв', schwimmen: 'schwamm — Schwamm (хөвөн) хөвж өнгөрөв',
    fliegen: 'flog — далавчин дээр туг (flag)', fliehen: 'floh — Floh (бөөс) үсрэн зугтав', ziehen: 'zog — галын цогийг татаж гаргав',
    verlieren: 'verlor — Лорд титмээ алдав', schließen: 'schloss — Schloss (цайз) хаалгаа хаав',
    nehmen: 'nahm/genommen — нохой «Намайг ав!» гээд номоо зуугаад ирэв', sprechen: 'sprach — амнаас Sprache (хэл) урсав',
    helfen: 'half — хагас (half) талхаа өгч тусалсан', sterben: 'starb — од (star) унаж бөхөв', werfen: 'warf — дайнд (war) чулуу шидэв',
    treffen: 'traf — трафикт гацаж байхдаа найзтайгаа уулзав', befehlen: 'befohlen — хаан унагад (Fohlen) тушаав',
    empfehlen: 'empfohlen — эмч унагад (Fohlen) зөвлөв', gebären: 'gebar/geboren — Bär (баавгай) бамбарууш төрүүлэв (born)',
    stehlen: 'stahl — хулгайч ган (Stahl) сейф эвдэв', sehen: 'sah — сахалтай хүн рүү харав', lesen: 'las — лаа асаагаад уншив',
    geben: 'gab — «Гав!» хаалга тогшоод бэлэг өгөв', essen: 'aß — асар их идэв', vergessen: 'vergaß — газаа (Gas) унтраахаа мартав',
    schlafen: 'schlief — «шлийф…» хурхирав', laufen: 'lief — life бол гүйлт', rufen: 'rief — хад (reef) дээрээс дуудав',
    fallen: 'fiel — унахдаа өвдөлт мэдрэв (feel)', halten: 'hielt — өсгий (heel)-өөс барьж тогтов', lassen: 'ließ — нохойн оосор (leash) тавиад орхив',
    fangen: 'fing — загасыг сэрвээ (fin)-нээс барив', hängen: 'hing — хаалганы нугас (hinge) дээр өлгөөтэй',
    fahren: 'fuhr — фургоноор явав', tragen: 'trug — truck ачаа зөөв', schlagen: 'schlug — эмгэн хумс (slug) цохив',
    laden: 'lud — тэргэн дээр луу ачив', waschen: 'wusch — угаалгын машин «вуш-вуш»', wachsen: 'wuchs — модны оройд шаазгай «вукс!»',
    bringen: 'brachte — бугуйвч (bracelet) авчрав', denken: 'dachte — даага унаад бодлогошров', kennen: 'kannte — Кантыг таних уу',
    rennen: 'rannte — ранчо дээр морь уралдав', wissen: 'wusste — «вусс…» шивнэв', haben: 'hatte — надад малгай (hat) бий',
    gehen: 'ging — gang гудамжаар алхав', kommen: 'kam — Kamel ирлээ', stehen: 'stand — тайз (stand) дээр зогсов',
    sitzen: 'saß — үнээ саахаар суув', liegen: 'lag — лагтай газар хэвтэв', sein: 'war — энд дайн (war) байсан'
  };
  IRREG.forEach(v => {
    [1, 2].forEach(n => { if (KLASSE[n][v.inf]) { v.s = n; v.mn = KLASSE[n][v.inf]; v.so = Object.keys(KLASSE[n]).indexOf(v.inf); } });
    if (MNEMO[v.inf]) v.mnemo = MNEMO[v.inf];
  });

  // Үгсийн сантай нэгтгэнэ (карт, SRS-д ашиглана)
  IRREG.forEach(v => {
    const w = VOCAB.find(x => x.type === 'verb' && x.de === v.inf);
    const extra = v.s ? ['s' + v.s] : [];
    if (w) { w.tags.push('irr', ...extra); w.er = v.er; w.mnemo = v.mnemo; if (v.s) w.mn = v.mn; }
    else { const nv = V(v.inf, v.mn, v.prat, v.perf, ['irr', ...extra]); nv.er = v.er; nv.mnemo = v.mnemo; VOCAB.push(nv); }
  });

  VOCAB.forEach((w, i) => {
    w.id = (w.art ? w.art + ' ' : '') + w.de;
    w.idx = i;
  });
  IRREG.forEach(v => { v.wid = v.inf; });

  /* ---------- Хүчтэй/сул үйл үгийн 3 хэлбэр (Verb-Blitz) ---------- */
  const VERBFORMS = VOCAB.filter(w => w.type === 'verb' && !w.prat.includes('/'))
    .map(w => ({ inf: w.de, prat: w.prat, part: w.perf.replace(/^(hat|ist) /, ''), aux: w.perf.split(' ')[0], mn: w.mn }));

  /* ---------- haben oder sein? ---------- */
  const HABENSEIN = [
    { s: 'Der Zug ___ um 3 Uhr aus München angekommen.', a: 'sein', why: 'ankommen — байрлал өөрчлөгдөх хөдөлгөөн → sein' },
    { s: 'Peter ___ sein Fahrrad verkauft.', a: 'haben', why: 'verkaufen + Akk. объект (sein Fahrrad) → haben' },
    { s: 'Ich ___ einen Brief von meinem Opa bekommen.', a: 'haben', why: 'bekommen нь kommen биш! Akk. объекттой → haben' },
    { s: 'Der Bruder ___ nach Rom gereist.', a: 'sein', why: 'reisen — нэг газраас нөгөө рүү → sein' },
    { s: 'Dr. Garcia ___ meinem Opa geholfen.', a: 'haben', why: 'helfen — хөдөлгөөн биш → haben' },
    { s: 'Herr Stein ___ um 3 Uhr gekommen.', a: 'sein', why: 'kommen → sein' },
    { s: 'Susanna ___ im Supermarkt eingekauft.', a: 'haben', why: 'einkaufen — хөдөлгөөн биш → haben' },
    { s: 'Meine Mutter ___ einen Mantel gekauft.', a: 'haben', why: 'Akk. объект (einen Mantel) → haben' },
    { s: 'Ich ___ mich auf den Stuhl gesetzt.', a: 'haben', why: 'sich setzen — транзитив (mich = Akk.) → haben' },
    { s: 'Ich ___ in das Bett gegangen.', a: 'sein', why: 'gehen → sein' },
    { s: 'Das Kind ___ schnell eingeschlafen.', a: 'sein', why: 'einschlafen — төлөв өөрчлөгдөх → sein' },
    { s: 'Wir ___ den ganzen Tag zu Hause geblieben.', a: 'sein', why: 'bleiben — онцгой тохиолдол → sein' },
    { s: 'Er ___ gestern sehr krank gewesen.', a: 'sein', why: 'sein → ist gewesen' },
    { s: 'Sie ___ Ärztin geworden.', a: 'sein', why: 'werden → ist geworden' },
    { s: 'Was ___ passiert?', a: 'sein', why: 'passieren → ist passiert' },
    { s: 'Ich ___ heute früh aufgestanden.', a: 'sein', why: 'aufstehen — төлөв өөрчлөгдөх → sein' },
    { s: 'Wir ___ nach Berlin geflogen.', a: 'sein', why: 'fliegen (хаашаа) → sein' },
    { s: 'Er ___ zwei Stunden geschlafen.', a: 'haben', why: 'schlafen — төлөв өөрчлөгдөхгүй → haben' },
    { s: 'Die Oma ___ das Brot geschnitten.', a: 'haben', why: 'Akk. объект (das Brot) → haben' },
    { s: 'Die Feuerwehr ___ alle Bewohner gerettet.', a: 'haben', why: 'Akk. объект → haben' },
    { s: 'Der Dieb ___ die Handtasche gestohlen.', a: 'haben', why: 'Akk. объект → haben' },
    { s: 'Ich ___ das Bild an die Wand gehängt.', a: 'haben', why: 'hängen (transitiv) → haben' },
    { s: 'Das Buch ___ auf dem Tisch gelegen.', a: 'haben', why: 'liegen → hat gelegen (Өмнөд Германд: ist gelegen)' },
    { s: 'Wir ___ im See geschwommen.', a: 'sein', why: 'schwimmen (хөдөлгөөн) → ist geschwommen' },
    { s: 'Der Student ___ dem Professor geantwortet.', a: 'haben', why: 'antworten → hat geantwortet' },
    { s: 'Er ___ sehr schnell gelaufen.', a: 'sein', why: 'laufen → ist gelaufen' }
  ];

  /* ---------- Дасгалын номын даалгавар (3 цагаар) ---------- */
  const T = (mn, hints, p, pr, pf) => ({ type: 'tense3', mn, hints, p: [].concat(p), pr: [].concat(pr), pf: [].concat(pf) });
  const WORKBOOK = [
    {
      id: 'ue1', title: 'Übung 1', mn: 'Монгол өгүүлбэрийг Präsens · Präteritum · Perfekt гурван цагаар герман хэлээр бич.', page: 'Seite 2',
      items: [
        T('Би сэрүүлэг тавьж байна.', ['stellen', 'der Wecker'], 'Ich stelle den Wecker.', 'Ich stellte den Wecker.', 'Ich habe den Wecker gestellt.'),
        T('Цэвэрлэгч бүсгүй контоорын шал арчиж байна.', ['die Putzfrau', 'wischen', 'der Fußboden', 'das Büro'],
          ['Die Putzfrau wischt den Fußboden des Büros.', 'Die Putzfrau wischt den Fußboden im Büro.'],
          ['Die Putzfrau wischte den Fußboden des Büros.', 'Die Putzfrau wischte den Fußboden im Büro.'],
          ['Die Putzfrau hat den Fußboden des Büros gewischt.', 'Die Putzfrau hat den Fußboden im Büro gewischt.']),
        T('Эмээ талх зүсэж байна.', ['die Oma', 'schneiden', 'das Brot'], 'Die Oma schneidet das Brot.', 'Die Oma schnitt das Brot.', 'Die Oma hat das Brot geschnitten.'),
        T('Сузанна эмээгийнхээ нүдний шилийг зүүж байна.', ['tragen', 'die Brille', 'die Oma'], 'Susanna trägt die Brille ihrer Oma.', 'Susanna trug die Brille ihrer Oma.', 'Susanna hat die Brille ihrer Oma getragen.'),
        T('Нагац эгч цэцгийг услаж байна.', ['die Tante', 'gießen', 'die Blumen'], 'Die Tante gießt die Blumen.', 'Die Tante goss die Blumen.', 'Die Tante hat die Blumen gegossen.'),
        T('Ах мод хагалж байна.', ['der Bruder', 'spalten', 'das Holz'], 'Der Bruder spaltet das Holz.', 'Der Bruder spaltete das Holz.', ['Der Bruder hat das Holz gespalten.', 'Der Bruder hat das Holz gespaltet.']),
        T('Гал команд өндөр байшингийн бүх оршин суугчдыг аварч байна.', ['die Feuerwehr', 'retten', 'der Bewohner', 'das Hochhaus'],
          ['Die Feuerwehr rettet alle Bewohner des Hochhauses.', 'Die Feuerwehrleute retten alle Bewohner des Hochhauses.'],
          ['Die Feuerwehr rettete alle Bewohner des Hochhauses.', 'Die Feuerwehrleute retteten alle Bewohner des Hochhauses.'],
          ['Die Feuerwehr hat alle Bewohner des Hochhauses gerettet.', 'Die Feuerwehrleute haben alle Bewohner des Hochhauses gerettet.']),
        T('Ах зураг зурж байна.', ['der Bruder', 'zeichnen', 'das Bild'], 'Der Bruder zeichnet ein Bild.', 'Der Bruder zeichnete ein Bild.', 'Der Bruder hat ein Bild gezeichnet.'),
        T('Ээж маань төмс хэрчиж байна.', ['die Mutter', 'schneiden', 'die Kartoffel'],
          ['Meine Mutter schneidet die Kartoffeln.', 'Meine Mutter schneidet Kartoffeln.'], ['Meine Mutter schnitt die Kartoffeln.', 'Meine Mutter schnitt Kartoffeln.'], ['Meine Mutter hat die Kartoffeln geschnitten.', 'Meine Mutter hat Kartoffeln geschnitten.']),
        T('Багш өгүүллэгийн алдааг засаж байна.', ['der Lehrer', 'korrigieren', 'der Fehler', 'der Text'],
          ['Der Lehrer korrigiert die Fehler im Text.', 'Der Lehrer korrigiert die Fehler des Textes.', 'Der Lehrer korrigiert den Fehler im Text.'],
          ['Der Lehrer korrigierte die Fehler im Text.', 'Der Lehrer korrigierte die Fehler des Textes.', 'Der Lehrer korrigierte den Fehler im Text.'],
          ['Der Lehrer hat die Fehler im Text korrigiert.', 'Der Lehrer hat die Fehler des Textes korrigiert.', 'Der Lehrer hat den Fehler im Text korrigiert.']),
        T('Механикч унадаг дугуйн залуурыг засаж байна.', ['der Mechaniker', 'reparieren', 'der Lenker', 'das Fahrrad'],
          ['Der Mechaniker repariert den Lenker des Fahrrads.', 'Der Mechaniker repariert den Lenker des Fahrrades.'],
          ['Der Mechaniker reparierte den Lenker des Fahrrads.', 'Der Mechaniker reparierte den Lenker des Fahrrades.'],
          ['Der Mechaniker hat den Lenker des Fahrrads repariert.', 'Der Mechaniker hat den Lenker des Fahrrades repariert.']),
        T('Хүү алим идэж байна.', ['der Sohn', 'essen', 'der Apfel'], 'Der Sohn isst einen Apfel.', 'Der Sohn aß einen Apfel.', 'Der Sohn hat einen Apfel gegessen.'),
        T('Хүү цай ууж байна.', ['der Sohn', 'trinken', 'der Tee'], 'Der Sohn trinkt Tee.', 'Der Sohn trank Tee.', 'Der Sohn hat Tee getrunken.'),
        T('Би банны өрөөний хаалгыг хааж байна.', ['schließen', 'die Tür', 'das Badezimmer'],
          ['Ich schließe die Tür des Badezimmers.', 'Ich schließe die Badezimmertür.'],
          ['Ich schloss die Tür des Badezimmers.', 'Ich schloss die Badezimmertür.'],
          ['Ich habe die Tür des Badezimmers geschlossen.', 'Ich habe die Badezimmertür geschlossen.']),
        T('Нэг хулгайч нэгэн бүсгүйн гар цүнхийг хулгайлж байна.', ['der Dieb', 'stehlen', 'die Handtasche', 'die Frau'],
          ['Ein Dieb stiehlt die Handtasche einer Frau.', 'Der Dieb stiehlt die Handtasche der Frau.'],
          ['Ein Dieb stahl die Handtasche einer Frau.', 'Der Dieb stahl die Handtasche der Frau.'],
          ['Ein Dieb hat die Handtasche einer Frau gestohlen.', 'Der Dieb hat die Handtasche der Frau gestohlen.']),
        T('Би өвөөгийнхөө цамцыг индүүдэж байна.', ['bügeln', 'das Hemd', 'der Opa'],
          ['Ich bügle das Hemd meines Opas.', 'Ich bügele das Hemd meines Opas.', 'Ich bügle Opas Hemd.'], ['Ich bügelte das Hemd meines Opas.', 'Ich bügelte Opas Hemd.'], ['Ich habe das Hemd meines Opas gebügelt.', 'Ich habe Opas Hemd gebügelt.']),
        T('Би аавынхаа цагаан ноосон цамцыг угааж байна.', ['waschen', 'weiß', 'der Pullover', 'der Vater'],
          ['Ich wasche den weißen Pullover meines Vaters.', 'Ich wasche Papas weißen Pullover.'], ['Ich wusch den weißen Pullover meines Vaters.', 'Ich wusch Papas weißen Pullover.'], ['Ich habe den weißen Pullover meines Vaters gewaschen.', 'Ich habe Papas weißen Pullover gewaschen.']),
        T('Нагац эгч шөл хийж байна.', ['die Tante', 'kochen', 'die Suppe'],
          ['Die Tante kocht Suppe.', 'Die Tante kocht eine Suppe.', 'Die Tante kocht die Suppe.'],
          ['Die Tante kochte Suppe.', 'Die Tante kochte eine Suppe.', 'Die Tante kochte die Suppe.'],
          ['Die Tante hat Suppe gekocht.', 'Die Tante hat eine Suppe gekocht.', 'Die Tante hat die Suppe gekocht.']),
        T('Хүү маань муураа хооллож байна.', ['der Sohn', 'füttern', 'die Katze'],
          ['Mein Sohn füttert seine Katze.', 'Mein Sohn füttert die Katze.'], ['Mein Sohn fütterte seine Katze.', 'Mein Sohn fütterte die Katze.'], ['Mein Sohn hat seine Katze gefüttert.', 'Mein Sohn hat die Katze gefüttert.'])
      ]
    },
    {
      id: 'ue2', title: 'Übung 2', mn: 'Dativ объекттой өгүүлбэрүүд — гурван цагаар бич.', page: 'Seite 5',
      items: [
        T('Томас нагац эгчдээ захиа бичиж байна.', ['Thomas', 'schreiben', 'die Tante', 'der Brief'],
          'Thomas schreibt seiner Tante einen Brief.', 'Thomas schrieb seiner Tante einen Brief.', 'Thomas hat seiner Tante einen Brief geschrieben.'),
        T('Би тэр эрэгтэйд итгэж байна.', ['glauben', 'der Mann'], 'Ich glaube dem Mann.', 'Ich glaubte dem Mann.', 'Ich habe dem Mann geglaubt.'),
        T('Улаан загалмай хандивлагчдад талархаж байна.', ['das Rote Kreuz', 'danken', 'der Spender'],
          'Das Rote Kreuz dankt den Spendern.', 'Das Rote Kreuz dankte den Spendern.', 'Das Rote Kreuz hat den Spendern gedankt.'),
        T('Аав хүүдээ мөнгө өгч байна.', ['der Vater', 'geben', 'der Sohn', 'das Geld'],
          ['Der Vater gibt seinem Sohn Geld.', 'Der Vater gibt dem Sohn Geld.'], ['Der Vater gab seinem Sohn Geld.', 'Der Vater gab dem Sohn Geld.'], ['Der Vater hat seinem Sohn Geld gegeben.', 'Der Vater hat dem Sohn Geld gegeben.']),
        T('Би эмээ өвөө хоёроо санаж байна. (fehlen)', ['fehlen', 'die Großeltern'],
          ['Mir fehlen die Großeltern.', 'Die Großeltern fehlen mir.', 'Mir fehlen meine Großeltern.', 'Meine Großeltern fehlen mir.'],
          ['Mir fehlten die Großeltern.', 'Die Großeltern fehlten mir.', 'Mir fehlten meine Großeltern.', 'Meine Großeltern fehlten mir.'],
          ['Die Großeltern haben mir gefehlt.', 'Mir haben die Großeltern gefehlt.', 'Meine Großeltern haben mir gefehlt.', 'Mir haben meine Großeltern gefehlt.']),
        T('Би ахдаа ил захидал илгээж байна.', ['schicken', 'der Bruder', 'die Postkarte'],
          ['Ich schicke meinem Bruder eine Postkarte.', 'Ich schicke dem Bruder eine Postkarte.'], ['Ich schickte meinem Bruder eine Postkarte.', 'Ich schickte dem Bruder eine Postkarte.'], ['Ich habe meinem Bruder eine Postkarte geschickt.', 'Ich habe dem Bruder eine Postkarte geschickt.']),
        T('Би ээждээ цэцэг худалдаж авч байна.', ['kaufen', 'die Mutter', 'die Blumen'],
          'Ich kaufe meiner Mutter Blumen.', 'Ich kaufte meiner Mutter Blumen.', 'Ich habe meiner Mutter Blumen gekauft.')
      ]
    }
  ];

  /* ---------- Курсийн бусад дасгал (Übung 3–27) ----------
     Тэмдэглэл: Übung 1 (1–7) нь номын яг өгүүлбэр. Бусад нь номын
     сэдэв, хичээлийн үйл үгээр зохиосон бичгийн дасгал. Номын жинхэнэ
     хуудсыг авбал энэ өгүүлбэрүүдийг сольж болно. */
  const Wr = (task, prompt, answers, hints, explain) => ({ type: 'write', task, prompt, answers: [].concat(answers), hints: hints || [], explain });
  const Mc = (q, options, answer, explain) => ({ type: 'mc', q, options, answer, explain });
  const In = (q, answers, explain) => ({ type: 'input', q, answers: [].concat(answers), explain });
  const ue = (id, title, page, mn, items, made = true) => ({ id, title, page, mn, items, made });
  const J = 'Хоёр өгүүлбэрийг нийлүүлж бич';
  const TR = 'Герман хэлээр бич';
  WORKBOOK.forEach(u => { u.made = u.id !== 'ue1'; });
  WORKBOOK.push(
    ue('ue3', 'Übung 3', 'Seite 7', 'Хөдөлгөөний үйл үг (ихэнх нь sein-тэй!) — гурван цагаар бич.', [
      T('Би автобусаар ажилдаа явж байна.', ['fahren', 'der Bus', 'die Arbeit'], 'Ich fahre mit dem Bus zur Arbeit.', 'Ich fuhr mit dem Bus zur Arbeit.', 'Ich bin mit dem Bus zur Arbeit gefahren.'),
      T('Хүүхдүүд сургууль руугаа алхаж байна.', ['das Kind', 'gehen', 'die Schule'], ['Die Kinder gehen zur Schule.', 'Die Kinder gehen in die Schule.'], ['Die Kinder gingen zur Schule.', 'Die Kinder gingen in die Schule.'], ['Die Kinder sind zur Schule gegangen.', 'Die Kinder sind in die Schule gegangen.']),
      T('Ах маань Берлинээс ирж байна.', ['der Bruder', 'kommen'], 'Mein Bruder kommt aus Berlin.', 'Mein Bruder kam aus Berlin.', 'Mein Bruder ist aus Berlin gekommen.'),
      T('Нохой цэцэрлэгт хүрээлэнд гүйж байна.', ['der Hund', 'laufen', 'der Park'], 'Der Hund läuft im Park.', 'Der Hund lief im Park.', 'Der Hund ist im Park gelaufen.'),
      T('Бид Улаанбаатар руу нисч байна.', ['fliegen'], 'Wir fliegen nach Ulaanbaatar.', 'Wir flogen nach Ulaanbaatar.', 'Wir sind nach Ulaanbaatar geflogen.'),
      T('Хулгайч цагдаагаас зугтаж байна.', ['der Dieb', 'fliehen', 'die Polizei'], 'Der Dieb flieht vor der Polizei.', 'Der Dieb floh vor der Polizei.', 'Der Dieb ist vor der Polizei geflohen.'),
      T('Тэр (эмэгтэй) уул руу авирч байна.', ['steigen', 'der Berg'], 'Sie steigt auf den Berg.', 'Sie stieg auf den Berg.', 'Sie ist auf den Berg gestiegen.')
    ]),
    ue('ue4', 'Übung 4', 'Seite 9', 'Хуудас 1-ийн үйл үгс — гурван цагаар бич.', [
      T('Би номын сангаас ном авч байна.', ['nehmen', 'das Buch', 'die Bibliothek'], 'Ich nehme ein Buch aus der Bibliothek.', 'Ich nahm ein Buch aus der Bibliothek.', 'Ich habe ein Buch aus der Bibliothek genommen.'),
      T('Бид кино үзэж байна.', ['sehen', 'der Film'], 'Wir sehen einen Film.', 'Wir sahen einen Film.', 'Wir haben einen Film gesehen.'),
      T('Ээж маань сонин уншиж байна.', ['die Mutter', 'lesen', 'die Zeitung'], 'Meine Mutter liest die Zeitung.', 'Meine Mutter las die Zeitung.', 'Meine Mutter hat die Zeitung gelesen.'),
      T('Багш оюутантай ярилцаж байна.', ['der Lehrer', 'sprechen', 'der Student'], 'Der Lehrer spricht mit dem Studenten.', 'Der Lehrer sprach mit dem Studenten.', 'Der Lehrer hat mit dem Studenten gesprochen.'),
      T('Хоёр хөрш хэрэлдэж байна.', ['der Nachbar', 'streiten'], ['Die zwei Nachbarn streiten.', 'Zwei Nachbarn streiten.'], ['Die zwei Nachbarn stritten.', 'Zwei Nachbarn stritten.'], ['Die zwei Nachbarn haben gestritten.', 'Zwei Nachbarn haben gestritten.']),
      T('Хүүхэд найман цаг унтаж байна.', ['das Kind', 'schlafen', 'die Stunde'], 'Das Kind schläft acht Stunden.', 'Das Kind schlief acht Stunden.', 'Das Kind hat acht Stunden geschlafen.'),
      T('Тэр (эр) захиа бичиж байна.', ['schreiben', 'der Brief'], 'Er schreibt einen Brief.', 'Er schrieb einen Brief.', 'Er hat einen Brief geschrieben.')
    ]),
    ue('ue5', 'Übung 5', 'Seite 14', 'Байрлалын ба өдөр тутмын үйл үг — гурван цагаар бич.', [
      T('Бид пицца идэж байна.', ['essen', 'die Pizza'], ['Wir essen Pizza.', 'Wir essen eine Pizza.'], ['Wir aßen Pizza.', 'Wir aßen eine Pizza.'], ['Wir haben Pizza gegessen.', 'Wir haben eine Pizza gegessen.']),
      T('Тэр (эр) кофе ууж байна.', ['trinken', 'der Kaffee'], ['Er trinkt Kaffee.', 'Er trinkt einen Kaffee.'], ['Er trank Kaffee.', 'Er trank einen Kaffee.'], ['Er hat Kaffee getrunken.', 'Er hat einen Kaffee getrunken.']),
      T('Эмээ сандал дээр сууж байна.', ['die Oma', 'sitzen', 'der Stuhl'], 'Die Oma sitzt auf dem Stuhl.', 'Die Oma saß auf dem Stuhl.', 'Die Oma hat auf dem Stuhl gesessen.'),
      T('Машин гаражид байна (зогсож).', ['das Auto', 'stehen', 'die Garage'], 'Das Auto steht in der Garage.', 'Das Auto stand in der Garage.', 'Das Auto hat in der Garage gestanden.'),
      T('Ном ширээн дээр байна (хэвтэж).', ['das Buch', 'liegen', 'der Tisch'], 'Das Buch liegt auf dem Tisch.', 'Das Buch lag auf dem Tisch.', 'Das Buch hat auf dem Tisch gelegen.'),
      T('Зураг хананд өлгөөтэй байна.', ['das Bild', 'hängen', 'die Wand'], 'Das Bild hängt an der Wand.', 'Das Bild hing an der Wand.', 'Das Bild hat an der Wand gehangen.'),
      T('Хичээл найман цагт эхэлж байна.', ['der Unterricht', 'beginnen'], ['Der Unterricht beginnt um acht Uhr.', 'Der Unterricht beginnt um 8 Uhr.'], ['Der Unterricht begann um acht Uhr.', 'Der Unterricht begann um 8 Uhr.'], ['Der Unterricht hat um acht Uhr begonnen.', 'Der Unterricht hat um 8 Uhr begonnen.'])
    ]),
    ue('ue6', 'Übung 6', 'Seite 16', 'bleiben, bringen, kennen, treffen, helfen, tragen, schwimmen — гурван цагаар бич.', [
      T('Би гэртээ үлдэж байна.', ['bleiben'], 'Ich bleibe zu Hause.', 'Ich blieb zu Hause.', 'Ich bin zu Hause geblieben.'),
      T('Шуудан зөөгч захиа авчирч байна.', ['der Postbote', 'bringen', 'der Brief'], ['Der Postbote bringt einen Brief.', 'Der Postbote bringt den Brief.'], ['Der Postbote brachte einen Brief.', 'Der Postbote brachte den Brief.'], ['Der Postbote hat einen Brief gebracht.', 'Der Postbote hat den Brief gebracht.']),
      T('Би түүнийг (эр) сайн таньдаг.', ['kennen'], 'Ich kenne ihn gut.', 'Ich kannte ihn gut.', 'Ich habe ihn gut gekannt.'),
      T('Бид кафед найзуудтайгаа уулзаж байна.', ['treffen', 'der Freund', 'das Café'], 'Wir treffen unsere Freunde im Café.', 'Wir trafen unsere Freunde im Café.', 'Wir haben unsere Freunde im Café getroffen.'),
      T('Хүү ээждээ тусалж байна.', ['der Sohn', 'helfen', 'die Mutter'], 'Der Sohn hilft seiner Mutter.', 'Der Sohn half seiner Mutter.', 'Der Sohn hat seiner Mutter geholfen.'),
      T('Аав хүнд цүнх үүрч байна.', ['der Vater', 'tragen', 'schwer', 'die Tasche'], 'Der Vater trägt eine schwere Tasche.', 'Der Vater trug eine schwere Tasche.', 'Der Vater hat eine schwere Tasche getragen.'),
      T('Хүүхдүүд нууранд сэлж байна.', ['das Kind', 'schwimmen', 'der See'], 'Die Kinder schwimmen im See.', 'Die Kinder schwammen im See.', 'Die Kinder sind im See geschwommen.')
    ]),
    ue('ue7', 'Übung 7', 'Seite 22', 'Хуудас 2-ын үйл үгс — гурван цагаар бич.', [
      T('Тамирчин хурдан гүйж байна.', ['der Sportler', 'rennen', 'schnell'], 'Der Sportler rennt schnell.', 'Der Sportler rannte schnell.', 'Der Sportler ist schnell gerannt.'),
      T('Муур ширээн дээр үсэрч байна.', ['die Katze', 'springen', 'der Tisch'], 'Die Katze springt auf den Tisch.', 'Die Katze sprang auf den Tisch.', 'Die Katze ist auf den Tisch gesprungen.'),
      T('Ээж хүүхдүүдээ дуудаж байна.', ['die Mutter', 'rufen', 'das Kind'], 'Die Mutter ruft ihre Kinder.', 'Die Mutter rief ihre Kinder.', 'Die Mutter hat ihre Kinder gerufen.'),
      T('Би утсаа цэнэглэж байна.', ['laden', 'das Handy'], ['Ich lade mein Handy.', 'Ich lade mein Handy auf.'], ['Ich lud mein Handy.', 'Ich lud mein Handy auf.'], ['Ich habe mein Handy geladen.', 'Ich habe mein Handy aufgeladen.']),
      T('Цэцэрлэгт мод ургаж байна.', ['der Garten', 'wachsen', 'der Baum'], ['Im Garten wächst ein Baum.', 'Ein Baum wächst im Garten.'], ['Im Garten wuchs ein Baum.', 'Ein Baum wuchs im Garten.'], ['Im Garten ist ein Baum gewachsen.', 'Ein Baum ist im Garten gewachsen.']),
      T('Навчнууд модноос унаж байна.', ['das Blatt', 'fallen', 'der Baum'], 'Die Blätter fallen vom Baum.', 'Die Blätter fielen vom Baum.', 'Die Blätter sind vom Baum gefallen.'),
      T('Хөвгүүн бөмбөг барьж байна.', ['der Junge', 'fangen', 'der Ball'], 'Der Junge fängt den Ball.', 'Der Junge fing den Ball.', 'Der Junge hat den Ball gefangen.')
    ]),
    ue('ue8', 'Übung 8', 'Seite 25', 'Давталт: хуудас 2-ын үйл үг, Präteritum-ийн төгсгөл, Genitiv — хичээл дээр гарсан алдаанууд.', [
      T('Эмч надад энэ эмийг зөвлөж байна.', ['der Arzt', 'empfehlen', 'das Medikament'], 'Der Arzt empfiehlt mir dieses Medikament.', 'Der Arzt empfahl mir dieses Medikament.', 'Der Arzt hat mir dieses Medikament empfohlen.'),
      T('Би түлхүүрээ гээж байна.', ['verlieren', 'der Schlüssel'], 'Ich verliere meinen Schlüssel.', 'Ich verlor meinen Schlüssel.', 'Ich habe meinen Schlüssel verloren.'),
      T('Би хариултыг мэдэж байна.', ['wissen', 'die Antwort'], 'Ich weiß die Antwort.', 'Ich wusste die Antwort.', 'Ich habe die Antwort gewusst.'),
      T('Тэр (эм) миний нэрийг мартаж байна.', ['vergessen', 'der Name'], 'Sie vergisst meinen Namen.', 'Sie vergaß meinen Namen.', 'Sie hat meinen Namen vergessen.'),
      In('sitzen · du → Präteritum', ['saßt', 'du saßt'], 'ß/s/z-ээр төгсвөл du хэлбэрт зөвхөн -t: du saßt (saßst биш).'),
      In('sitzen · ihr → Präteritum', ['saßt', 'ihr saßt'], 'ihr хэлбэр -t: ihr saßt (saßen биш).'),
      In('gehen · du → Präteritum', ['gingst', 'du gingst'], 'Präteritum-ийн төгсгөл: -, -st, -, -en, -t, -en.'),
      In('lesen · du → Präteritum', ['last', 'du last'], 'las + st → last (s давхардахгүй).'),
      In('essen · ihr → Präteritum', ['aßt', 'ihr aßt'], 'aß + t → aßt.'),
      Mc('Сузанна эмээгийнхээ нүдний шилийг зүүж байна: Susanna trägt ___.', ['die Brille ihrer Oma', 'ihrer Omas Brille', 'die Brille seiner Oma'], 'die Brille ihrer Oma', '«ihrer Omas Brille» буруу. Зөв: die Brille ihrer Oma эсвэл Omas Brille.'),
      Mc('Die Feuerwehr ___ alle Bewohner des Hochhauses.', ['rettet', 'retten'], 'rettet', 'die Feuerwehr — ганц тоо → rettet.'),
      Mc('Die Feuerwehr rettet alle ___ des Hochhauses.', ['Bewohner', 'Bewohnern'], 'Bewohner', 'Akkusativ олон тоо → Bewohner. -n зөвхөн Dativ олон тоонд.'),
      Mc('Mein Sohn füttert ___ Katze.', ['seine', 'ihre'], 'seine', 'Эзэмшигч (mein Sohn) эр хүйс → seine.'),
      Mc('schneiden → Partizip II', ['geschnitten', 'geschneidet'], 'geschnitten', 'schneiden – schnitt – geschnitten (geschneidet буруу).')
    ]),
    ue('ue9', 'Übung 9', 'Seite 29', 'Der dass-Satz — бичих дасгал.', [
      Wr('Ich finde, dass … гэж эхлүүл', 'Der Kurs ist sehr gut.', 'Ich finde, dass der Kurs sehr gut ist.'),
      Wr('Ich weiß, dass … гэж эхлүүл', 'Sie kommt heute nicht.', 'Ich weiß, dass sie heute nicht kommt.'),
      Wr('Es freut mich, dass … гэж эхлүүл', 'Er hat die Prüfung bestanden.', 'Es freut mich, dass er die Prüfung bestanden hat.'),
      Wr('Ich hoffe, dass … гэж эхлүүл', 'Wir können morgen schwimmen gehen.', 'Ich hoffe, dass wir morgen schwimmen gehen können.'),
      Wr(TR, 'Чамайг ирсэнд би баяртай байна.', ['Ich freue mich, dass du gekommen bist.', 'Es freut mich, dass du gekommen bist.'], ['sich freuen', 'kommen']),
      Wr(TR, 'Германд амьдрах хэцүү гэж тэр (эр) хэлж байна.', ['Er sagt, dass das Leben in Deutschland schwer ist.', 'Er sagt, dass es schwer ist, in Deutschland zu leben.'], ['sagen', 'das Leben', 'schwer']),
      Wr(TR, 'Чи өдөр бүр герман хэл давтах нь чухал.', ['Es ist wichtig, dass du jeden Tag Deutsch übst.', 'Es ist wichtig, dass du jeden Tag Deutsch lernst.', 'Es ist wichtig, dass du jeden Tag Deutsch wiederholst.'], ['wichtig', 'üben']),
      Wr(TR, 'Тэр (эр) маргааш ирнэ гэдгийг би мэдээгүй.', ['Ich wusste nicht, dass er morgen kommt.', 'Ich habe nicht gewusst, dass er morgen kommt.'], ['wissen', 'morgen'])
    ]),
    ue('ue10', 'Übung 10', 'Seite 31', 'Infinitiv mit zu — хоёр өгүүлбэрийг нийлүүл.', [
      Wr(J, 'Ich habe keine Lust. Ich räume auf.', ['Ich habe keine Lust aufzuräumen.', 'Ich habe keine Lust, aufzuräumen.']),
      Wr(J, 'Er versucht es. Er kommt pünktlich.', 'Er versucht, pünktlich zu kommen.'),
      Wr(J, 'Es ist schwer. Man lernt Deutsch.', 'Es ist schwer, Deutsch zu lernen.'),
      Wr(J, 'Vergiss nicht! Du kaufst Brot.', ['Vergiss nicht, Brot zu kaufen!', 'Vergiss nicht, Brot zu kaufen.']),
      Wr(J, 'Wir haben vor. Wir fahren nach Hamburg.', 'Wir haben vor, nach Hamburg zu fahren.'),
      Wr(J, 'Sie fängt an. Sie arbeitet.', ['Sie fängt an zu arbeiten.', 'Sie fängt an, zu arbeiten.'])
    ]),
    ue('ue11', 'Übung 11', 'Seite 33', 'dass-Satz → zu + Infinitiv болгож хувирга.', [
      Wr('zu + Infinitiv болго', 'Ich hoffe, dass ich bald eine Arbeit finde.', 'Ich hoffe, bald eine Arbeit zu finden.'),
      Wr('zu + Infinitiv болго', 'Er verspricht, dass er pünktlich kommt.', 'Er verspricht, pünktlich zu kommen.'),
      Wr('zu + Infinitiv болго', 'Ich freue mich, dass ich dich sehe.', 'Ich freue mich, dich zu sehen.'),
      Wr('zu + Infinitiv болго', 'Wir beschließen, dass wir umziehen.', ['Wir beschließen umzuziehen.', 'Wir beschließen, umzuziehen.'], [], 'Салдаг үйл үг: um-zu-ziehen.'),
      Wr('zu + Infinitiv болго', 'Es ist verboten, dass man hier raucht.', 'Es ist verboten, hier zu rauchen.'),
      Wr('zu + Infinitiv болго (B2)', 'Sie glaubt, dass sie alles richtig gemacht hat.', 'Sie glaubt, alles richtig gemacht zu haben.', [], 'Өнгөрсөн үйлдэл: Partizip II + zu haben/sein.')
    ]),
    ue('ue12', 'Übung 12', 'Seite 35', 'Infinitiv mit zu — орчуулах.', [
      Wr(TR, 'Би чам руу утасдахаа мартсан.', 'Ich habe vergessen, dich anzurufen.', ['vergessen', 'anrufen']),
      Wr(TR, 'Надад кино үзэх цаг алга.', ['Ich habe keine Zeit, einen Film zu sehen.', 'Ich habe keine Zeit, den Film zu sehen.', 'Ich habe keine Zeit, ins Kino zu gehen.'], ['die Zeit', 'sehen']),
      Wr(TR, 'Тэр (эм) тамхиа хаяхыг хичээж байна.', 'Sie versucht, mit dem Rauchen aufzuhören.', ['versuchen', 'aufhören', 'das Rauchen']),
      Wr(TR, 'Германд ажиллах бол миний мөрөөдөл.', ['Es ist mein Traum, in Deutschland zu arbeiten.', 'Mein Traum ist es, in Deutschland zu arbeiten.'], ['der Traum', 'arbeiten']),
      Wr(TR, 'Бид маргааш эрт босохоор төлөвлөж байна.', 'Wir haben vor, morgen früh aufzustehen.', ['vorhaben', 'aufstehen']),
      Wr(TR, 'Түүнтэй (эр) уулзах сайхан байна.', ['Es ist schön, ihn zu treffen.', 'Es ist schön, ihn zu sehen.'], ['schön', 'treffen'])
    ]),
    ue('ue13', 'Übung 13', 'Seite 35', 'Der ob-Satz — шууд бус асуулт.', [
      Wr('Ich frage mich, … гэж үргэлжлүүл', 'Kommt er heute?', 'Ich frage mich, ob er heute kommt.'),
      Wr('Wissen Sie, …? гэж үргэлжлүүл', 'Ist das Museum am Montag geöffnet?', 'Wissen Sie, ob das Museum am Montag geöffnet ist?'),
      Wr('Ich weiß nicht, … гэж үргэлжлүүл', 'Hat sie die E-Mail bekommen?', 'Ich weiß nicht, ob sie die E-Mail bekommen hat.'),
      Wr('Darf ich fragen, …? гэж үргэлжлүүл', 'Kann ich mit Karte bezahlen?', 'Darf ich fragen, ob ich mit Karte bezahlen kann?'),
      Wr(TR, 'Тэр (эр) завтай эсэхийг би мэдэхгүй.', 'Ich weiß nicht, ob er Zeit hat.', ['wissen', 'die Zeit']),
      Wr(TR, 'Галт тэрэг цагтаа ирэх эсэхийг би асууж байна.', ['Ich frage, ob der Zug pünktlich ankommt.', 'Ich frage, ob der Zug pünktlich kommt.'], ['fragen', 'der Zug', 'pünktlich'])
    ]),
    ue('ue14', 'Übung 14', 'Seite 37', 'Der W-Satz — шууд бус W-асуулт.', [
      Wr('Können Sie mir sagen, …? гэж үргэлжлүүл', 'Wann fährt der Bus?', 'Können Sie mir sagen, wann der Bus fährt?'),
      Wr('Ich weiß nicht, … гэж үргэлжлүүл', 'Wo wohnt deine Schwester?', 'Ich weiß nicht, wo deine Schwester wohnt.'),
      Wr('Weißt du, …? гэж үргэлжлүүл', 'Wie viel kostet das Ticket?', 'Weißt du, wie viel das Ticket kostet?'),
      Wr('Ich verstehe nicht, … гэж үргэлжлүүл', 'Warum ist er so müde?', 'Ich verstehe nicht, warum er so müde ist.'),
      Wr('Niemand weiß, … гэж үргэлжлүүл', 'Wer hat das Fenster geöffnet?', 'Niemand weiß, wer das Fenster geöffnet hat.'),
      Wr(TR, 'Банк хэдэн цагт хаадгийг надад хэлж өгөөч? (эелдэг)', ['Können Sie mir sagen, wann die Bank schließt?', 'Können Sie mir sagen, um wie viel Uhr die Bank schließt?', 'Könnten Sie mir sagen, wann die Bank schließt?'], ['die Bank', 'schließen'])
    ]),
    ue('ue15', 'Übung 15', 'Seite 38', 'anstatt dass · anstatt … zu', [
      Wr(J + ' (anstatt … zu)', 'Er sieht fern. Er sollte lernen.', 'Er sieht fern, anstatt zu lernen.'),
      Wr(J + ' (anstatt … zu)', 'Sie fährt mit dem Auto. Sie könnte zu Fuß gehen.', 'Sie fährt mit dem Auto, anstatt zu Fuß zu gehen.'),
      Wr(J + ' (anstatt … zu)', 'Mein Bruder schläft. Er sollte mir helfen.', 'Mein Bruder schläft, anstatt mir zu helfen.'),
      Wr(J + ' (anstatt dass)', 'Ich koche selbst. Mein Mann kocht nicht.', 'Ich koche selbst, anstatt dass mein Mann kocht.'),
      Wr(TR, 'Тэр (эр) ажилдаа явахын оронд гэртээ үлдсэн.', ['Er ist zu Hause geblieben, anstatt zur Arbeit zu gehen.', 'Er blieb zu Hause, anstatt zur Arbeit zu gehen.', 'Anstatt zur Arbeit zu gehen, ist er zu Hause geblieben.'], ['bleiben', 'die Arbeit']),
      Wr(TR, 'Утсаар тоглохын оронд ном унш!', ['Lies ein Buch, anstatt mit dem Handy zu spielen!', 'Lies ein Buch, statt mit dem Handy zu spielen!'], ['lesen', 'das Handy', 'spielen'])
    ]),
    ue('ue16', 'Übung 16', 'Seite 41', 'weil · da — шалтгаан.', [
      Wr(J + ' (weil)', 'Ich gehe nicht zur Arbeit. Ich bin krank.', 'Ich gehe nicht zur Arbeit, weil ich krank bin.'),
      Wr(J + ' (Da …, эхэнд)', 'Es regnet. Wir bleiben zu Hause.', 'Da es regnet, bleiben wir zu Hause.'),
      Wr(J + ' (weil)', 'Er lernt Deutsch. Er will in Deutschland studieren.', 'Er lernt Deutsch, weil er in Deutschland studieren will.'),
      Wr(J + ' (Weil …, эхэнд)', 'Sie hat den Bus verpasst. Sie ist zu spät gekommen.', 'Weil sie den Bus verpasst hat, ist sie zu spät gekommen.'),
      Wr(J + ' (Da …, эхэнд)', 'Der Laden war geschlossen. Ich konnte nichts kaufen.', 'Da der Laden geschlossen war, konnte ich nichts kaufen.'),
      Wr(TR, 'Би ядарсан учраас эрт унтсан.', ['Ich bin früh schlafen gegangen, weil ich müde war.', 'Weil ich müde war, bin ich früh schlafen gegangen.', 'Da ich müde war, bin ich früh schlafen gegangen.', 'Ich bin früh ins Bett gegangen, weil ich müde war.', 'Weil ich müde war, bin ich früh ins Bett gegangen.', 'Ich ging früh schlafen, weil ich müde war.'], ['müde', 'schlafen gehen']),
      Wr(TR, 'Цаг агаар сайхан байгаа учраас бид зугаалж байна.', ['Wir gehen spazieren, weil das Wetter schön ist.', 'Weil das Wetter schön ist, gehen wir spazieren.', 'Da das Wetter schön ist, gehen wir spazieren.'], ['das Wetter', 'spazieren gehen']),
      Wr(TR, 'Ажил хайж байгаа учраас би герман хэл сурч байна.', ['Ich lerne Deutsch, weil ich eine Arbeit suche.', 'Ich lerne Deutsch, weil ich Arbeit suche.', 'Weil ich eine Arbeit suche, lerne ich Deutsch.', 'Da ich eine Arbeit suche, lerne ich Deutsch.'], ['die Arbeit', 'suchen'])
    ]),
    ue('ue17', 'Übung 17', 'Seite 43', 'obwohl · obschon · obgleich · trotzdem', [
      Wr(J + ' (Obwohl …, эхэнд)', 'Er ist müde. Er arbeitet weiter.', 'Obwohl er müde ist, arbeitet er weiter.'),
      Wr(J + ' (obwohl)', 'Sie hat wenig Geld. Sie kauft ein teures Handy.', 'Sie kauft ein teures Handy, obwohl sie wenig Geld hat.'),
      Wr(J + ' (obwohl)', 'Es schneit. Die Kinder spielen draußen.', 'Die Kinder spielen draußen, obwohl es schneit.'),
      Wr(J + ' (Obwohl …, эхэнд)', 'Ich habe viel gelernt. Ich habe die Prüfung nicht bestanden.', 'Obwohl ich viel gelernt habe, habe ich die Prüfung nicht bestanden.'),
      Wr(J + ' (trotzdem)', 'Es regnet. Wir gehen spazieren.', ['Es regnet, trotzdem gehen wir spazieren.', 'Es regnet. Trotzdem gehen wir spazieren.'], [], 'trotzdem + үйл үг шууд.'),
      Wr(TR, 'Хүйтэн байсан ч тэр (эр) куртикгүй гарсан.', ['Obwohl es kalt war, ging er ohne Jacke raus.', 'Obwohl es kalt war, ist er ohne Jacke rausgegangen.', 'Er ging ohne Jacke raus, obwohl es kalt war.', 'Obwohl es kalt war, ging er ohne Jacke hinaus.'], ['kalt', 'die Jacke', 'rausgehen'])
    ]),
    ue('ue18', 'Übung 18', 'Seite 45', 'wenn · als', [
      Wr(J + ' (Als …, эхэнд)', 'Ich war klein. Ich wohnte auf dem Land.', 'Als ich klein war, wohnte ich auf dem Land.'),
      Wr(J + ' (Wenn …, эхэнд)', 'Ich habe Zeit. Ich besuche dich.', 'Wenn ich Zeit habe, besuche ich dich.'),
      Wr(J + ' (Als …, эхэнд)', 'Er kam nach Hause. Das Essen war schon kalt.', 'Als er nach Hause kam, war das Essen schon kalt.'),
      Wr(J + ' (Immer wenn …, эхэнд)', 'Es regnete. Wir blieben zu Hause.', 'Immer wenn es regnete, blieben wir zu Hause.'),
      Wr(TR, 'Би Германд ирэхдээ гучин настай байсан.', 'Als ich nach Deutschland kam, war ich dreißig Jahre alt.', ['kommen', 'alt']),
      Wr(TR, 'Улаанбаатарт ирэхээрээ над руу залгаарай.', ['Wenn du nach Ulaanbaatar kommst, ruf mich an!', 'Ruf mich an, wenn du nach Ulaanbaatar kommst!'], ['kommen', 'anrufen'])
    ]),
    ue('ue19', 'Übung 19', 'Seite 47', 'während · solange', [
      Wr(J + ' (Während …, эхэнд)', 'Ich koche. Mein Sohn macht Hausaufgaben.', 'Während ich koche, macht mein Sohn Hausaufgaben.'),
      Wr(J + ' (Solange …, эхэнд)', 'Du bist krank. Du darfst nicht arbeiten.', 'Solange du krank bist, darfst du nicht arbeiten.'),
      Wr(J + ' (während)', 'Er telefoniert. Er fährt Auto.', 'Er telefoniert, während er Auto fährt.'),
      Wr(J + ' (solange)', 'Ich warte hier. Du kaufst ein.', 'Ich warte hier, solange du einkaufst.'),
      Wr('während + Genitiv ашигла', 'der Urlaub · Ich habe viel gelesen.', 'Während des Urlaubs habe ich viel gelesen.'),
      Wr(TR, 'Хүүхдүүд унтаж байх зуур бид кино үзсэн.', ['Während die Kinder schliefen, haben wir einen Film gesehen.', 'Während die Kinder schliefen, sahen wir einen Film.', 'Wir haben einen Film gesehen, während die Kinder schliefen.'], ['schlafen', 'der Film'])
    ]),
    ue('ue20', 'Übung 20', 'Seite 49', 'nachdem · sobald — цагийн дараалал!', [
      Wr(J + ' (Nachdem …, эхэнд)', 'Er hatte gegessen. Er ging spazieren.', 'Nachdem er gegessen hatte, ging er spazieren.'),
      Wr(J + ' (Nachdem …, эхэнд)', 'Ich habe die Arbeit beendet. Ich gehe nach Hause.', 'Nachdem ich die Arbeit beendet habe, gehe ich nach Hause.'),
      Wr(J + ' (Nachdem …, Plusquamperfekt)', 'Sie kam an. Sie rief ihre Mutter an.', 'Nachdem sie angekommen war, rief sie ihre Mutter an.'),
      Wr(J + ' (Nachdem …, Plusquamperfekt)', 'Wir frühstückten. Wir fuhren los.', 'Nachdem wir gefrühstückt hatten, fuhren wir los.'),
      Wr(J + ' (Sobald …, эхэнд)', 'Ich bekomme die Nachricht. Ich schreibe dir.', 'Sobald ich die Nachricht bekomme, schreibe ich dir.'),
      Wr(TR, 'Би гэртээ ирмэгцээ чам руу залгана.', ['Sobald ich zu Hause bin, rufe ich dich an.', 'Ich rufe dich an, sobald ich zu Hause bin.'], ['zu Hause', 'anrufen'])
    ]),
    ue('ue21', 'Übung 21', 'Seite 52', 'bevor · ehe', [
      Wr(J + ' (bevor)', 'Ich frühstücke. Danach gehe ich zur Arbeit.', 'Ich frühstücke, bevor ich zur Arbeit gehe.'),
      Wr(J + ' (bevor)', 'Wasch dir die Hände! Du isst.', ['Wasch dir die Hände, bevor du isst!', 'Wasch dir die Hände, bevor du isst.']),
      Wr(J + ' (Bevor …, эхэнд)', 'Er lernte Deutsch. Dann ging er nach Deutschland.', 'Bevor er nach Deutschland ging, lernte er Deutsch.'),
      Wr(J + ' (bevor)', 'Ruf mich an! Du kommst.', ['Ruf mich an, bevor du kommst!', 'Ruf mich an, bevor du kommst.']),
      Wr(TR, 'Унтахаасаа өмнө би ном уншдаг.', ['Bevor ich schlafe, lese ich ein Buch.', 'Ich lese ein Buch, bevor ich schlafe.', 'Bevor ich schlafen gehe, lese ich ein Buch.', 'Ich lese ein Buch, bevor ich schlafen gehe.'], ['schlafen', 'lesen']),
      Wr(TR, 'Ажлын ярилцлагад орохоосоо өмнө тэр (эр) их сандарсан.', ['Bevor er zum Vorstellungsgespräch ging, war er sehr nervös.', 'Er war sehr nervös, bevor er zum Vorstellungsgespräch ging.'], ['das Vorstellungsgespräch', 'nervös'])
    ]),
    ue('ue22', 'Übung 22', 'Seite 54', 'damit — субьект өөр (wollen/sollen-ийг хас!).', [
      Wr(J + ' (damit)', 'Ich gebe dir mein Handy. Du kannst deine Mutter anrufen.', 'Ich gebe dir mein Handy, damit du deine Mutter anrufen kannst.'),
      Wr(J + ' (damit)', 'Die Lehrerin spricht langsam. Die Schüler sollen sie verstehen.', 'Die Lehrerin spricht langsam, damit die Schüler sie verstehen.'),
      Wr(J + ' (damit)', 'Wir kaufen ein Auto. Die Kinder sollen nicht mit dem Bus fahren.', 'Wir kaufen ein Auto, damit die Kinder nicht mit dem Bus fahren.'),
      Wr(J + ' (damit)', 'Ich schreibe die Wörter auf. Ich will sie nicht vergessen.', 'Ich schreibe die Wörter auf, damit ich sie nicht vergesse.'),
      Wr(J + ' (damit)', 'Mach das Fenster zu! Es soll nicht kalt werden.', ['Mach das Fenster zu, damit es nicht kalt wird!', 'Mach das Fenster zu, damit es nicht kalt wird.']),
      Wr(TR, 'Хүү нь сайн сургуульд сураасай гэж эцэг эх нь Германд нүүсэн.', ['Die Eltern sind nach Deutschland gezogen, damit ihr Sohn eine gute Schule besucht.', 'Die Eltern sind nach Deutschland gezogen, damit ihr Sohn auf eine gute Schule geht.'], ['die Eltern', 'ziehen', 'besuchen'])
    ]),
    ue('ue23', 'Übung 23', 'Seite 55', 'um … zu — субьект ижил.', [
      Wr(J + ' (um … zu)', 'Ich lerne Deutsch. Ich will in Deutschland arbeiten.', 'Ich lerne Deutsch, um in Deutschland zu arbeiten.'),
      Wr(J + ' (um … zu)', 'Er geht in den Supermarkt. Er will Milch kaufen.', 'Er geht in den Supermarkt, um Milch zu kaufen.'),
      Wr(J + ' (um … zu)', 'Sie spart Geld. Sie will eine Reise machen.', 'Sie spart Geld, um eine Reise zu machen.'),
      Wr(J + ' (um … zu)', 'Wir stehen früh auf. Wir wollen den Zug nicht verpassen.', 'Wir stehen früh auf, um den Zug nicht zu verpassen.'),
      Wr(J + ' (um … zu)', 'Ich rufe an. Ich will einen Termin vereinbaren.', 'Ich rufe an, um einen Termin zu vereinbaren.'),
      Wr(TR, 'Би ажил олохын тулд B2 шалгалт өгнө.', ['Ich mache die B2-Prüfung, um eine Arbeit zu finden.', 'Ich mache die B2-Prüfung, um Arbeit zu finden.', 'Um eine Arbeit zu finden, mache ich die B2-Prüfung.'], ['die Prüfung', 'finden'])
    ]),
    ue('ue24', 'Übung 24', 'Seite 55', 'damit уу, um … zu юу? — сонгож, бич.', [
      Mc('Ich lerne viel, ___ ich die Prüfung bestehe.', ['damit', 'um'], 'damit', 'Nebensatz-д субьект + хувиргасан үйл үг байгаа → damit.'),
      Mc('Er joggt jeden Tag, ___ fit zu bleiben.', ['um', 'damit'], 'um'),
      Mc('Ich erkläre es dir noch einmal, ___ du es verstehst.', ['damit', 'um'], 'damit', 'Субьект өөр (ich / du) → damit.'),
      Mc('Sie nimmt ein Taxi, ___ pünktlich zu sein.', ['um', 'damit'], 'um'),
      Wr(J, 'Wir sprechen leise. Das Baby soll schlafen.', 'Wir sprechen leise, damit das Baby schläft.'),
      Wr(J, 'Er trainiert hart. Er will die Meisterschaft gewinnen.', 'Er trainiert hart, um die Meisterschaft zu gewinnen.')
    ]),
    ue('ue25', 'Übung 25', 'Seite 56', 'so dass · so …, dass', [
      Wr(J + ' (so dass)', 'Es regnete stark. Die Straßen waren nass.', ['Es regnete stark, so dass die Straßen nass waren.', 'Es regnete stark, sodass die Straßen nass waren.']),
      Wr(J + ' (so …, dass)', 'Er war sehr müde. Er schlief sofort ein.', 'Er war so müde, dass er sofort einschlief.'),
      Wr(J + ' (so …, dass)', 'Der Kaffee ist sehr heiß. Ich kann ihn nicht trinken.', 'Der Kaffee ist so heiß, dass ich ihn nicht trinken kann.'),
      Wr(J + ' (so dass)', 'Sie hat viel gelernt. Sie hat die Prüfung bestanden.', ['Sie hat viel gelernt, so dass sie die Prüfung bestanden hat.', 'Sie hat viel gelernt, sodass sie die Prüfung bestanden hat.']),
      Wr(TR, 'Би их ядарсан тул шууд унтчихсан.', ['Ich war so müde, dass ich sofort eingeschlafen bin.', 'Ich war so müde, dass ich sofort einschlief.', 'Ich war sehr müde, so dass ich sofort eingeschlafen bin.'], ['müde', 'einschlafen']),
      Wr(TR, 'Тэр (эр) маш хурдан ярьдаг тул би ойлгодоггүй.', ['Er spricht so schnell, dass ich ihn nicht verstehe.', 'Er spricht so schnell, dass ich nichts verstehe.'], ['sprechen', 'schnell', 'verstehen'])
    ]),
    ue('ue26', 'Übung 26', 'Seite 57', 'ohne dass · ohne … zu', [
      Wr(J + ' (ohne … zu)', 'Er ging weg. Er sagte nichts.', 'Er ging weg, ohne etwas zu sagen.', [], 'nichts → ohne etwas zu sagen.'),
      Wr(J + ' (ohne … zu)', 'Sie nahm mein Buch. Sie fragte mich nicht.', 'Sie nahm mein Buch, ohne mich zu fragen.'),
      Wr(J + ' (ohne dass)', 'Er verließ das Haus. Niemand bemerkte es.', 'Er verließ das Haus, ohne dass es jemand bemerkte.'),
      Wr(J + ' (ohne … zu)', 'Ich habe den Test geschrieben. Ich habe nicht gelernt.', 'Ich habe den Test geschrieben, ohne zu lernen.'),
      Wr(J + ' (ohne dass)', 'Die Kinder spielten. Die Eltern wussten es nicht.', 'Die Kinder spielten, ohne dass die Eltern es wussten.'),
      Wr(TR, 'Тэр (эр) баяртай гэлгүй явсан.', ['Er ist gegangen, ohne Tschüss zu sagen.', 'Er ging, ohne Tschüss zu sagen.', 'Er ist gegangen, ohne sich zu verabschieden.', 'Er ging, ohne sich zu verabschieden.'], ['gehen', 'sich verabschieden'])
    ]),
    ue('ue27', 'Übung 27', 'Seite 59', 'indem · dadurch, dass', [
      Wr(J + ' (indem)', 'Man lernt eine Sprache. Man spricht viel.', 'Man lernt eine Sprache, indem man viel spricht.'),
      Wr(J + ' (indem)', 'Er hält sich fit. Er fährt jeden Tag Fahrrad.', 'Er hält sich fit, indem er jeden Tag Fahrrad fährt.'),
      Wr(J + ' (dadurch, dass)', 'Sie spart Geld. Sie kocht zu Hause.', ['Sie spart Geld dadurch, dass sie zu Hause kocht.', 'Sie spart dadurch Geld, dass sie zu Hause kocht.']),
      Wr('indem ашиглан хариул', 'Wie hast du die Wohnung gefunden? — Ich habe im Internet gesucht.', 'Ich habe die Wohnung gefunden, indem ich im Internet gesucht habe.'),
      Wr(J + ' (indem)', 'Man kann Energie sparen. Man schaltet das Licht aus.', 'Man kann Energie sparen, indem man das Licht ausschaltet.'),
      Wr(TR, 'Би үгсээ өдөр бүр давтаж цээжилдэг.', ['Ich lerne die Wörter, indem ich sie jeden Tag wiederhole.', 'Ich lerne Wörter, indem ich sie jeden Tag wiederhole.'], ['lernen', 'wiederholen'])
    ])
  );
  WORKBOOK.find(u => u.id === 'ue1').page = 'Seite 2';
  WORKBOOK.find(u => u.id === 'ue2').page = 'Seite 5';

  /* Курсийн дараалал — Inhaltsverzeichnis */
  const COURSE = [
    { nr: 1, title: 'Die Vergangenheiten', lesson: 'vergangenheit', ues: ['ue1', 'ue2', 'ue3', 'ue4', 'ue5', 'ue6', 'ue7', 'ue8'] },
    { nr: 2, title: 'Der dass-Satz', lesson: 'dass', ues: ['ue9'] },
    { nr: 3, title: 'Der Infinitiv-zu Satz', lesson: 'infinitivzu', ues: ['ue10', 'ue11', 'ue12'] },
    { nr: 4, title: 'Der ob-Satz', lesson: 'ob', ues: ['ue13'] },
    { nr: 5, title: 'Der W-Satz', lesson: 'wsatz', ues: ['ue14'] },
    { nr: 6, title: 'Modale Nebensätze mit „anstatt dass“ und „anstatt … zu“', lesson: 'anstatt', ues: ['ue15'] },
    { nr: 7, title: 'Kausale Nebensätze mit „weil“ und „da“', lesson: 'weil', ues: ['ue16'] },
    { nr: 8, title: 'Konzessive Nebensätze mit „obwohl, obschon, obgleich“', lesson: 'obwohl', ues: ['ue17'] },
    { nr: 9, title: 'Temporale Nebensätze mit „wenn“ und „als“', lesson: 'wennals', ues: ['ue18'] },
    { nr: 10, title: 'Temporale Nebensätze mit „während“ und „solange“', lesson: 'waehrend', ues: ['ue19'] },
    { nr: 11, title: 'Temporale Nebensätze mit „nachdem“ und „sobald“', lesson: 'nachdem', ues: ['ue20'] },
    { nr: 12, title: 'Temporale Nebensätze mit „bevor“ und „ehe“', lesson: 'bevor', ues: ['ue21'] },
    { nr: 13, title: 'Finale Nebensätze mit „damit“ und „um … zu“', lesson: 'damit', ues: ['ue22', 'ue23', 'ue24'] },
    { nr: 14, title: 'Konsekutive Nebensätze mit „so dass“, „ohne dass“ und „ohne … zu“', lesson: 'sodass', ues: ['ue25', 'ue26'] },
    { nr: 15, title: 'Modale Nebensätze mit „indem“ und „dadurch, dass“', lesson: 'indem', ues: ['ue27'] }
  ];

  /* ---------- Дүрмийн хичээлүүд ---------- */
  const mc = (q, options, answer, explain) => ({ type: 'mc', q, options, answer, explain });
  const inp = (q, answers, explain, hint) => ({ type: 'input', q, answers: [].concat(answers), explain, hint });
  const tiles = (q, answer, explain) => ({ type: 'tiles', q, answer, explain });

  const LESSONS = [
    {
      id: 'vergangenheit', chapter: '1', title: 'Die Vergangenheiten', mn: 'Өнгөрсөн цаг: Präteritum ба Perfekt', source: 'Самбар · Übung 1–8',
      intro: { de: 'Heute wiederholen wir die Vergangenheit!', mn: 'Өнөөдөр өнгөрсөн цагаа давтъя!' },
      rules: [
        'Герман хэлэнд өнгөрсөн цагийн хоёр гол хэлбэр бий: <b>Präteritum</b> (бичгийн хэл, түүх, мэдээ) ба <b>Perfekt</b> (ярианы хэл).',
        '<b>Perfekt = haben / sein + Partizip II</b>. Partizip II өгүүлбэрийн хамгийн төгсгөлд очно.',
        '<b>Transitiv</b> үйл үг (Akkusativ объект авдаг) → үргэлж <b>haben</b>. <b>Intransitiv</b> үйл үг: байрлал эсвэл төлөв өөрчлөгдөх бол <b>sein</b> (gehen, kommen, reisen, ankommen, einschlafen), бусад нь <b>haben</b>.',
        'Анхаар: <b>bekommen</b> нь kommen-тэй төстэй ч Akkusativ объект авдаг тул <b>haben</b>: <i>Ich habe einen Brief bekommen.</i>',
        'Partizip II: сул үйл үг <b>ge-…-t</b> (gekauft), хүчтэй <b>ge-…-en</b> (geholfen). Салдаг угтвар: <b>ein·ge·kauft, an·ge·kommen</b>. Be-, ver-, er-, ent-, zer- угтвартай болон <b>-ieren</b>-ээр төгссөн үйл үгэнд <b>ge- нэмэхгүй</b>: verkauft, bekommen, korrigiert.',
        '<b>Präteritum-ийн төгсгөл:</b> -, -st, -, -en, -t, -en. ich ба er хэлбэр төгсгөлгүй, ижил. ß/s/z-ээр төгсвөл du-д зөвхөн <b>-t</b>: ich saß, <b>du saßt</b>, er saß, wir saßen, <b>ihr saßt</b>, sie saßen.',
        '<b>Genitiv:</b> die Brille <b>ihrer Oma</b> ✓ · <b>Omas</b> Brille ✓ · <s>ihrer Omas Brille</s> ✗. Нэрийн өмнөх -s Genitiv артикльгүй: Opas Hemd ✓, <s>meines Opas Hemd</s> ✗. Стандарт: das Hemd meines Opas.',
        '<b>Эзэмшлийн төлөөний үг</b> эзэмшигчийн хүйсийг дагана: er → <b>seine</b> Katze, sie → <b>ihre</b> Katze. Монгол «-аа» (өөрийн) → эзэмшигчийнхээ хүйсээр.',
        '<b>Тоо, тийн ялгал:</b> die Feuerwehr = ганц тоо → <b>rettet</b>. Akkusativ олон тоо: alle <b>Bewohner</b> (-n зөвхөн Dativ олон тоонд: mit allen Bewohnern). Язгуур -t-ээр төгсвөл: er rett<b>e</b>t, rett<b>e</b>te.'
      ],
      table: {
        head: ['Präsens', 'Präteritum', 'Perfekt'],
        rows: [
          ['Meine Mutter kauft einen Mantel.', 'Meine Mutter kaufte einen Mantel.', 'Meine Mutter hat einen Mantel gekauft.'],
          ['Der Bruder reist nach Rom.', 'Der Bruder reiste nach Rom.', 'Der Bruder ist nach Rom gereist.'],
          ['Dr. Garcia hilft meinem Opa.', 'Dr. Garcia half meinem Opa.', 'Dr. Garcia hat meinem Opa geholfen.'],
          ['Herr Stein kommt um 3 Uhr.', 'Herr Stein kam um 3 Uhr.', 'Herr Stein ist um 3 Uhr gekommen.'],
          ['Susanna kauft in dem Supermarkt ein.', 'Susanna kaufte in dem Supermarkt ein.', 'Susanna hat in dem Supermarkt eingekauft.'],
          ['Peter verkauft sein Fahrrad.', 'Peter verkaufte sein Fahrrad.', 'Peter hat sein Fahrrad verkauft.'],
          ['Der Zug kommt um 3 Uhr aus München an.', 'Der Zug kam um 3 Uhr aus München an.', 'Der Zug ist um 3 Uhr aus München angekommen.'],
          ['Ich bekomme einen Brief von meinem Opa.', 'Ich bekam einen Brief von meinem Opa.', 'Ich habe einen Brief von meinem Opa bekommen.']
        ]
      },
      items: [
        mc('Der Zug ___ um 3 Uhr aus München angekommen.', ['ist', 'hat'], 'ist', 'ankommen — байрлал өөрчлөгдөж байна → sein.'),
        mc('Peter ___ sein Fahrrad verkauft.', ['hat', 'ist'], 'hat', 'verkaufen нь Akk. объект авдаг (sein Fahrrad) → haben.'),
        mc('Ich ___ einen Brief von meinem Opa bekommen.', ['habe', 'bin'], 'habe', 'bekommen ≠ kommen. Akk. объекттой тул haben.'),
        mc('Dr. Garcia ___ meinem Opa geholfen.', ['hat', 'ist'], 'hat', 'helfen — хөдөлгөөн биш → haben.'),
        inp('kaufen → Partizip II', 'gekauft', 'Сул үйл үг: ge- + kauf + -t.'),
        inp('korrigieren → Partizip II', 'korrigiert', '-ieren үйл үгэнд ge- нэмэхгүй.'),
        mc('verkaufen → Partizip II', ['verkauft', 'geverkauft', 'verkaufen'], 'verkauft', 'ver- угтвар салдаггүй → ge- байхгүй.'),
        inp('Herr Stein kommt um 3 Uhr. → Präteritum', 'Herr Stein kam um 3 Uhr.', 'kommen – kam – ist gekommen.'),
        inp('Meine Mutter kauft einen Mantel. → Präteritum', 'Meine Mutter kaufte einen Mantel.', 'kaufen – kaufte – hat gekauft.'),
        inp('Susanna kauft im Supermarkt ein. → Perfekt', ['Susanna hat im Supermarkt eingekauft.', 'Susanna hat in dem Supermarkt eingekauft.'], 'Салдаг үйл үг: ein-ge-kauft.'),
        inp('Der Bruder reist nach Rom. → Perfekt', 'Der Bruder ist nach Rom gereist.', 'reisen → sein + gereist.')
      ]
    },
    {
      id: 'positionsverben', chapter: '1+', title: 'stehen / stellen · liegen / legen', mn: 'Wo? ба Wohin? — байрлалын үйл үг', source: 'Самбар',
      intro: { de: 'Wo oder wohin? Das ist hier die Frage!', mn: 'Хаана уу, хаашаа юу? Гол асуулт энэ!' },
      rules: [
        '<b>Wo? (Хаана?) → Dativ</b>. Байрлалыг заана. Эдгээр үйл үг <b>intransitiv</b> ба <b>хүчтэй</b>: stehen – stand – gestanden, liegen – lag – gelegen, hängen – hing – gehangen, sitzen – saß – gesessen.',
        '<b>Wohin? (Хаашаа?) → Akkusativ</b>. Ямар нэг юмыг байрлуулах үйлдэл. Эдгээр үйл үг <b>transitiv</b> ба <b>сул</b>: stellen – stellte – gestellt, legen – legte – gelegt, hängen – hängte – gehängt, (sich) setzen – setzte – gesetzt.',
        'Транзитив үйл үг Akk. объект шаарддаг. Объект нь өөрөө бол <b>sich</b>: <i>Ich setze mich auf den Stuhl.</i>',
        'Verben → <b>transitiv</b> → Akk. Obj → <b>haben</b>. <b>Intransitiv</b> → haben эсвэл sein.'
      ],
      table: {
        head: ['Wo? (Dativ)', 'Wohin? (Akkusativ)', 'sich (Akkusativ)'],
        rows: [
          ['Ich sitze auf dem Stuhl.', 'Ich setze meinen Sohn auf den Stuhl.', 'Ich setze mich auf den Stuhl.'],
          ['Ich liege in dem Bett.', 'Ich lege meinen Sohn in das Bett.', 'Ich lege mich in das Bett.'],
          ['Die Vase steht auf dem Tisch.', 'Ich stelle die Vase auf den Tisch.', '—'],
          ['Das Bild hängt an der Wand.', 'Ich hänge das Bild an die Wand.', '—']
        ]
      },
      items: [
        mc('Ich ___ die Vase auf den Tisch.', ['stelle', 'stehe'], 'stelle', 'Wohin? + Akk. объект (die Vase) → stellen.'),
        mc('Die Vase ___ auf dem Tisch.', ['steht', 'stellt'], 'steht', 'Wo? → Dativ (dem Tisch) → stehen.'),
        mc('Ich sitze auf ___ Stuhl.', ['dem', 'den'], 'dem', 'sitzen → Wo? → Dativ.'),
        mc('Ich setze mich auf ___ Stuhl.', ['den', 'dem'], 'den', 'sich setzen → Wohin? → Akkusativ.'),
        mc('Ich lege meinen Sohn in ___ Bett.', ['das', 'dem'], 'das', 'legen → Wohin? → Akkusativ (das Bett).'),
        mc('Das Bild hat lange an der Wand ___.', ['gehangen', 'gehängt'], 'gehangen', 'Wo? → хүчтэй hängen: hing – gehangen.'),
        mc('Ich habe das Bild an die Wand ___.', ['gehängt', 'gehangen'], 'gehängt', 'Wohin? → сул hängen: hängte – gehängt.'),
        mc('Gestern ___ das Buch auf dem Tisch.', ['lag', 'legte'], 'lag', 'Wo? → liegen – lag – gelegen.'),
        inp('sitzen → Partizip II', 'gesessen', 'sitzen – saß – gesessen.'),
        inp('legen → Präteritum', 'legte', 'Сул үйл үг: legen – legte – gelegt.'),
        tiles('Ich setze meinen Sohn auf den Stuhl.', 'Ich setze meinen Sohn auf den Stuhl.', 'Akk. объект + auf + Akk.')
      ]
    },
    {
      id: 'ndeklination', chapter: '+', title: 'N-Deklination', mn: 'Эр хүйсийн -(e)n залгавартай нэр үг', source: 'Самбар',
      intro: { de: 'Der Student, den Studenten, dem Studenten!', mn: 'N-Deklination-ийг хамт сурцгаая!' },
      rules: [
        'Зарим <b>эр хүйсийн</b> нэр үг Nominativ-оос бусад бүх тялд (Akk., Dat., Gen.) <b>-(e)n</b> залгавар авдаг.',
        '<b>-ent:</b> der Student, der Agent, der Dozent, der Patient, der Präsident',
        '<b>-ist:</b> der Jurist, der Polizist, der Terrorist, der Artist, der Tourist',
        '<b>-e:</b> der Junge, der Kollege, der Zeuge, der Name, der Löwe, der Hase, der Welpe · үндэстэн: der Mongole, der Russe, der Türke, der Portugiese',
        '<b>Бусад:</b> der Mensch, der Nachbar, der Herr (→ <b>Herrn</b>), der Bär',
        'Олон тоо нь мөн <b>-(e)n</b>: die Studenten, die Kollegen.'
      ],
      table: {
        head: ['Тялал', 'Жишээ'],
        rows: [
          ['Nominativ (Subj.)', 'Der Student antwortet dem Professor.'],
          ['Akkusativ (Obj.)', 'Ich kenne den neuen Studenten.'],
          ['Dativ (Obj.)', 'Der Professor antwortet dem Studenten.'],
          ['Genitiv', 'Die Eltern des neuen Studenten warten vor der Tür.']
        ]
      },
      items: [
        inp('Ich kenne den neuen ___. (Student)', 'Studenten', 'Akkusativ → -en.'),
        inp('Der Professor antwortet dem ___. (Student)', 'Studenten', 'Dativ → -en.'),
        inp('Die Eltern des neuen ___ warten vor der Tür. (Student)', 'Studenten', 'Genitiv → -en (-s нэмэхгүй!).'),
        mc('Der ___ antwortet dem Professor.', ['Student', 'Studenten'], 'Student', 'Nominativ (субьект) → залгаваргүй.'),
        inp('Wir helfen unserem ___. (Nachbar)', 'Nachbarn', 'Dativ → Nachbar + n.'),
        inp('Ich frage den ___ nach dem Weg. (Polizist)', 'Polizisten', 'Akkusativ → -en.'),
        inp('Kennst du ___ Stein? (Herr)', 'Herrn', 'Herr → Herrn (ганц тоонд -n).'),
        inp('Im Zoo sehen wir einen ___. (Löwe)', 'Löwen', 'Akkusativ → Löwe + n.'),
        inp('Das ist das Auto des ___. (Präsident)', 'Präsidenten', 'Genitiv → -en.'),
        mc('Аль нь N-Deklination-д ордог вэ?', ['der Kollege', 'der Tisch', 'der Lehrer', 'der Wecker'], 'der Kollege', '-e-ээр төгссөн эр хүйсийн амьд биет → N-Deklination.'),
        mc('Аль нь N-Deklination-д ордог вэ?', ['der Tourist', 'der Text', 'der Fehler', 'der Apfel'], 'der Tourist', '-ist → N-Deklination.')
      ]
    },
    {
      id: 'plural', chapter: '+', title: 'Pluralbildung mit -(e)n', mn: 'Олон тоо: -(e)n залгавар', source: 'Самбар',
      intro: { de: 'Ein Wort, viele Wörter!', mn: 'Олон тоо үүсгэх дүрэм!' },
      rules: [
        '<b>a.</b> Дараах дагавараар төгссөн (бараг бүгд <b>эм хүйс</b>) нэр үг олон тоондоо <b>-en / -n</b> авна:',
        '<b>-keit, -heit, -schaft, -ei, -ie, -ung, -ur, -ine, -ik, -ion, -tät, -thek</b>',
        '<b>-ie</b> ба <b>-ine</b> нь зөвхөн <b>-n</b>: die Familie → die Familien, die Maschine → die Maschinen.',
        '<b>b.</b> N-Deklination-ий эр хүйсийн нэр үг: der Student → die Studenten.'
      ],
      table: {
        head: ['Дагавар', 'Ганц тоо', 'Олон тоо'],
        rows: [
          ['-keit', 'die Möglichkeit', 'die Möglichkeiten'], ['-heit', 'die Freiheit', 'die Freiheiten'],
          ['-schaft', 'die Mannschaft', 'die Mannschaften'], ['-ei', 'die Bäckerei', 'die Bäckereien'],
          ['-ie', 'die Familie', 'die Familien'], ['-ung', 'die Zeitung', 'die Zeitungen'],
          ['-ur', 'die Figur', 'die Figuren'], ['-ine', 'die Maschine', 'die Maschinen'],
          ['-ik', 'die Republik', 'die Republiken'], ['-ion', 'die Nation', 'die Nationen'],
          ['-tät', 'die Universität', 'die Universitäten'], ['-thek', 'die Bibliothek', 'die Bibliotheken']
        ]
      },
      items: [
        inp('die Freiheit → die ___', 'Freiheiten', '-heit → -en.'),
        inp('die Zeitung → die ___', 'Zeitungen', '-ung → -en.'),
        inp('die Bäckerei → die ___', 'Bäckereien', '-ei → -en.'),
        inp('die Universität → die ___', 'Universitäten', '-tät → -en.'),
        inp('die Bibliothek → die ___', 'Bibliotheken', '-thek → -en.'),
        inp('die Nation → die ___', 'Nationen', '-ion → -en.'),
        inp('die Maschine → die ___', 'Maschinen', '-ine → зөвхөн -n.'),
        inp('die Familie → die ___', 'Familien', '-ie → зөвхөн -n.'),
        inp('die Mannschaft → die ___', 'Mannschaften', '-schaft → -en.'),
        inp('die Möglichkeit → die ___', 'Möglichkeiten', '-keit → -en.'),
        inp('der Kollege → die ___', 'Kollegen', 'N-Deklination → -n.')
      ]
    },
    {
      id: 'dass', chapter: '2', title: 'Der dass-Satz', mn: '«…гэдгийг» — dass холбоос', source: 'Übung 9',
      intro: { de: 'Ich weiß, dass du fleißig bist!', mn: 'Чамайг хичээнгүй гэдгийг би мэднэ!' },
      rules: [
        '<b>dass</b> нь «…гэдгийг, …гэж» гэсэн утгатай Nebensatz үүсгэнэ. Үндсэн өгүүлбэр ба dass-ын хооронд <b>таслал</b> тавина.',
        'Nebensatz-д хувиргагдсан <b>үйл үг төгсгөлд</b> очно: <i>Ich weiß, dass er krank <b>ist</b>.</i>',
        'Нийлмэл цаг: туслах үйл үг хамгийн сүүлд — <i>…, dass er gekommen <b>ist</b>.</i> Модал: <i>…, dass er kommen <b>kann</b>.</i>',
        'Салдаг үйл үг дахин нийлнэ: <i>…, dass der Zug pünktlich <b>ankommt</b>.</i>',
        'Түгээмэл: wissen, glauben, denken, hoffen, sagen, finden, sich freuen, Es ist wichtig, dass…'
      ],
      examples: [
        { de: 'Ich glaube, dass der Kurs morgen beginnt.', mn: 'Курс маргааш эхэлнэ гэж би бодож байна.' },
        { de: 'Es ist wichtig, dass du jeden Tag übst.', mn: 'Чи өдөр бүр дасгал хийх нь чухал.' },
        { de: 'Er sagt, dass er keine Zeit hat.', mn: 'Тэр завгүй байгаа гэж хэлж байна.' }
      ],
      items: [
        tiles('Би түүнийг өнөөдөр өвчтэй байгааг мэдэж байна.', 'Ich weiß, dass er heute krank ist.'),
        inp('Er kommt morgen. → Ich hoffe, dass …', 'Ich hoffe, dass er morgen kommt.', 'Үйл үг (kommt) төгсгөлд.'),
        inp('Der Zug kommt pünktlich an. → Ich glaube, dass …', 'Ich glaube, dass der Zug pünktlich ankommt.', 'Салдаг үйл үг нийлнэ: ankommt.'),
        inp('Sie hat die Prüfung bestanden. → Ich freue mich, dass …', 'Ich freue mich, dass sie die Prüfung bestanden hat.', 'Туслах үйл үг (hat) хамгийн сүүлд.'),
        mc('Es ist wichtig, dass du jeden Tag ___.', ['übst', 'übst du', 'zu üben'], 'übst', 'dass-Satz → үйл үг төгсгөлд.'),
        tiles('Тэр завгүй гэж хэлж байна.', 'Er sagt, dass er keine Zeit hat.'),
        inp('Du kannst gut Deutsch sprechen. → Ich finde, dass …', 'Ich finde, dass du gut Deutsch sprechen kannst.', 'Модал үйл үг (kannst) төгсгөлд.')
      ]
    },
    {
      id: 'infinitivzu', chapter: '3', title: 'Der Infinitiv mit zu', mn: 'zu + Infinitiv бүтэц', source: 'Übung 10–12',
      intro: { de: 'Es macht Spaß, Deutsch zu lernen!', mn: 'Герман хэл сурах хөгжилтэй!' },
      rules: [
        'Nebensatz-ын субьект үндсэн өгүүлбэрийнхтэй <b>ижил</b> (эсвэл ерөнхий «man») бол dass-ын оронд <b>zu + Infinitiv</b> хэрэглэж болно.',
        '<i>Ich hoffe, dass ich die Prüfung bestehe.</i> → <i>Ich hoffe, die Prüfung <b>zu bestehen</b>.</i>',
        'Салдаг үйл үг: zu нь дунд нь орно — <b>an·zu·rufen, ein·zu·kaufen, auf·zu·stehen</b>.',
        'Түгээмэл: Lust haben, Zeit haben, versuchen, vergessen, anfangen, aufhören, vorhaben, Es ist wichtig / schwer / schön …',
        '<b>Модал үйл үгтэй zu хэрэглэхгүй:</b> <i>Ich kann gut schwimmen.</i>'
      ],
      examples: [
        { de: 'Ich habe vergessen, dich anzurufen.', mn: 'Би чам руу залгахаа мартчихсан.' },
        { de: 'Hast du Lust, ins Kino zu gehen?', mn: 'Кинонд явах хүсэл байна уу?' }
      ],
      items: [
        inp('Ich habe vergessen, dich ___. (anrufen)', 'anzurufen', 'Салдаг үйл үг: an-zu-rufen.'),
        inp('Es ist schwer, Deutsch ___. (lernen)', 'zu lernen'),
        inp('Er versucht, pünktlich ___. (sein)', 'zu sein'),
        inp('Hast du Lust, ins Kino ___? (gehen)', 'zu gehen'),
        inp('Wir haben vor, im Sommer nach Berlin ___. (fahren)', 'zu fahren'),
        inp('Ich habe keine Zeit, ___. (einkaufen)', 'einzukaufen', 'ein-zu-kaufen.'),
        mc('Ich hoffe, dass ich die Prüfung bestehe. = Ich hoffe, …', ['die Prüfung zu bestehen', 'die Prüfung bestehen zu', 'zu die Prüfung bestehen'], 'die Prüfung zu bestehen', 'zu + Infinitiv хамгийн төгсгөлд.'),
        mc('Ich kann gut ___.', ['schwimmen', 'zu schwimmen'], 'schwimmen', 'Модал үйл үг (können)-тэй zu хэрэглэхгүй.'),
        tiles('Тэр тамхиа хаяхыг хичээж байна.', 'Er versucht, mit dem Rauchen aufzuhören.')
      ]
    },
    {
      id: 'ob', chapter: '4', title: 'Der ob-Satz', mn: '«…эсэхийг» — шууд бус асуулт', source: 'Übung 13',
      intro: { de: 'Ich weiß nicht, ob du schon bereit bist!', mn: 'Чи бэлэн үү, үгүй юу — шалгая!' },
      rules: [
        '<b>Тийм/үгүй</b> гэж хариулдаг асуултыг шууд бус болгоход <b>ob</b> («…эсэхийг») хэрэглэнэ.',
        '<i>Kommt er morgen?</i> → <i>Ich weiß nicht, <b>ob</b> er morgen <b>kommt</b>.</i>',
        'Үйл үг төгсгөлд. Үндсэн өгүүлбэр асуулт бол төгсгөлд <b>?</b>: <i>Weißt du, ob …?</i>',
        'W-асуулт (wann, wo…) бол ob биш, тэр асуух үгээ хэрэглэнэ.'
      ],
      examples: [
        { de: 'Weißt du, ob der Supermarkt heute geöffnet hat?', mn: 'Супермаркет өнөөдөр онгорхой эсэхийг мэдэх үү?' },
        { de: 'Sie fragt, ob ich Zeit habe.', mn: 'Тэр намайг завтай эсэхийг асууж байна.' }
      ],
      items: [
        inp('Kommt er morgen? → Ich weiß nicht, ob …', 'Ich weiß nicht, ob er morgen kommt.'),
        inp('Hat der Supermarkt heute geöffnet? → Weißt du, ob …?', 'Weißt du, ob der Supermarkt heute geöffnet hat?'),
        tiles('Тэр намайг завтай эсэхийг асууж байна.', 'Sie fragt, ob ich Zeit habe.'),
        mc('Ich weiß nicht, ___ er kommt. (тийм/үгүй)', ['ob', 'dass', 'wenn'], 'ob', 'Тийм/үгүй асуулт → ob.'),
        inp('Kann ich hier parken? → Darf ich fragen, ob …?', 'Darf ich fragen, ob ich hier parken kann?'),
        mc('Er fragt, ___ der Zug ankommt. (хэзээ?)', ['wann', 'ob', 'dass'], 'wann', 'W-асуулт → асуух үгээ хэрэглэнэ.')
      ]
    },
    {
      id: 'wsatz', chapter: '5', title: 'Der W-Satz', mn: 'W-асуух үгтэй шууд бус асуулт', source: 'Übung 14',
      intro: { de: 'Wer, wie, was, wo, wann, warum?', mn: 'Хэн, яаж, юу, хаана, хэзээ, яагаад?' },
      rules: [
        'W-асуулт (wer, was, wo, wann, wie, warum, wie viel…)-ыг шууд бус болгоход асуух үг холбоос болно.',
        '<i>Wo ist der Bahnhof?</i> → <i>Können Sie mir sagen, <b>wo</b> der Bahnhof <b>ist</b>?</i>',
        'Үйл үг <b>төгсгөлд</b>. Эелдэг асуухад их хэрэгтэй (B2 шалгалтын яриа хэсэг!).'
      ],
      examples: [
        { de: 'Ich weiß nicht, wann der Kurs beginnt.', mn: 'Курс хэзээ эхлэхийг би мэдэхгүй.' },
        { de: 'Er fragt mich, warum ich Deutsch lerne.', mn: 'Тэр надаас яагаад герман хэл сурдгийг асууж байна.' }
      ],
      items: [
        inp('Wo ist der Bahnhof? → Können Sie mir sagen, …?', 'Können Sie mir sagen, wo der Bahnhof ist?'),
        inp('Wann beginnt der Kurs? → Ich weiß nicht, …', 'Ich weiß nicht, wann der Kurs beginnt.'),
        inp('Warum lernst du Deutsch? → Er fragt mich, …', 'Er fragt mich, warum ich Deutsch lerne.', 'du → ich болж өөрчлөгдөнө.'),
        tiles('Талх хэд үнэтэйг мэдэх үү?', 'Weißt du, wie viel das Brot kostet?'),
        inp('Was hat er gesagt? → Ich habe nicht verstanden, …', 'Ich habe nicht verstanden, was er gesagt hat.'),
        mc('Kannst du mir sagen, wie spät ___?', ['es ist', 'ist es'], 'es ist', 'Шууд бус асуулт → үйл үг төгсгөлд.')
      ]
    },
    {
      id: 'anstatt', chapter: '6', title: 'anstatt dass · anstatt … zu', mn: '«…хийхийн оронд»', source: 'Übung 15',
      intro: { de: 'Anstatt fernzusehen, lernen wir jetzt!', mn: 'Зурагт үзэхийн оронд одоо сурцгаая!' },
      rules: [
        '<b>anstatt dass</b> / <b>anstatt … zu</b> — «…хийхийн оронд». Хүлээгдэж буй үйлдлийн оронд өөр үйлдэл хийгдэв.',
        'Субьект <b>ижил</b> → ихэвчлэн <b>anstatt … zu</b>: <i>Er sieht fern, anstatt zu lernen.</i>',
        'Субьект <b>өөр</b> → зөвхөн <b>anstatt dass</b>: <i>Anstatt dass er mir hilft, sieht er fern.</i>',
        'Ярианы хэлэнд <b>statt</b> гэж богиносгоно.'
      ],
      examples: [
        { de: 'Sie nimmt das Auto, anstatt mit dem Fahrrad zu fahren.', mn: 'Тэр дугуйгаар явахын оронд машинаа авна.' }
      ],
      items: [
        inp('Er spielt Computerspiele, anstatt ___. (lernen)', 'zu lernen'),
        inp('Sie nimmt das Auto, anstatt mit dem Fahrrad ___. (fahren)', 'zu fahren'),
        tiles('Тэр надад туслахын оронд зурагт үзэж байна.', 'Anstatt dass er mir hilft, sieht er fern.'),
        mc('Ich koche selbst, anstatt ___ ich ins Restaurant gehe.', ['dass', 'zu', 'um'], 'dass', 'Nebensatz-д субьект (ich) байгаа тул anstatt dass.'),
        inp('Anstatt ins Bett ___, sieht er fern. (gehen)', 'zu gehen'),
        mc('Er bleibt zu Hause, anstatt zur Arbeit ___.', ['zu gehen', 'geht', 'gehen'], 'zu gehen')
      ]
    },
    {
      id: 'weil', chapter: '7', title: 'weil · da', mn: 'Шалтгаан заасан Nebensatz', source: 'Übung 16',
      intro: { de: 'Ich lerne Deutsch, weil ich die B2-Prüfung bestehen will!', mn: 'B2 шалгалтаа өгөхийн тулд!' },
      rules: [
        '<b>weil / da</b> — «…учраас». Үйл үг <b>төгсгөлд</b>.',
        '<b>weil</b> — ихэвчлэн үндсэн өгүүлбэрийн <b>дараа</b>, шинэ мэдээлэл өгнө. «Warum?» асуултад хариулна.',
        '<b>da</b> — ихэвчлэн өгүүлбэрийн <b>эхэнд</b>, сонсогчид мэдэгдэж буй шалтгаан.',
        'Nebensatz эхэнд байвал үндсэн өгүүлбэр <b>үйл үгээр</b> эхэлнэ: <i>Da es regnet, <b>bleiben</b> wir zu Hause.</i>',
        '<b>denn</b> бол Hauptsatz холбоос — үйл үг 2-р байранд: <i>…, denn ich <b>möchte</b> in Deutschland arbeiten.</i>'
      ],
      examples: [
        { de: 'Er kommt zu spät, weil der Bus Verspätung hatte.', mn: 'Автобус хоцорсон учраас тэр хоцорч байна.' },
        { de: 'Da ich krank bin, bleibe ich zu Hause.', mn: 'Өвчтэй байгаа учраас би гэртээ байна.' }
      ],
      items: [
        inp('Ich bleibe zu Hause. Ich bin krank. (weil)', 'Ich bleibe zu Hause, weil ich krank bin.'),
        inp('Da es regnet, ___ wir zu Hause. (bleiben)', 'bleiben', 'Nebensatz эхэнд → үндсэн өгүүлбэр үйл үгээр эхэлнэ.'),
        tiles('Автобус хоцорсон учраас тэр хоцорч байна.', 'Er kommt zu spät, weil der Bus Verspätung hatte.'),
        mc('Ich lerne Deutsch, ___ ich in Deutschland arbeiten möchte.', ['weil', 'denn'], 'weil', 'Үйл үг төгсгөлд → weil.'),
        mc('Ich lerne Deutsch, ___ ich möchte in Deutschland arbeiten.', ['denn', 'weil'], 'denn', 'Үйл үг 2-р байранд → denn.'),
        inp('Sie ist müde. Sie hat schlecht geschlafen. (weil)', 'Sie ist müde, weil sie schlecht geschlafen hat.')
      ]
    },
    {
      id: 'obwohl', chapter: '8', title: 'obwohl · obschon · obgleich', mn: '«…хэдий ч» — эсрэг утга', source: 'Übung 17',
      intro: { de: 'Obwohl es schwer ist, schaffen wir das!', mn: 'Хэцүү ч гэсэн бид чадна!' },
      rules: [
        '<b>obwohl / obschon / obgleich</b> — «…хэдий ч». Утга нэг, obschon ба obgleich нь илүү бичгийн хэл.',
        'Үйл үг <b>төгсгөлд</b>: <i>Er geht spazieren, obwohl es <b>regnet</b>.</i>',
        '<b>trotzdem</b> — Hauptsatz-д орох наречие, ард нь үйл үг: <i>Es regnet, trotzdem <b>geht</b> er spazieren.</i>'
      ],
      examples: [
        { de: 'Obwohl ich wenig Zeit habe, helfe ich dir.', mn: 'Завгүй ч гэсэн би чамд тусална.' }
      ],
      items: [
        inp('Er geht spazieren. Es regnet. (obwohl)', 'Er geht spazieren, obwohl es regnet.'),
        inp('Obwohl sie müde ___, arbeitet sie weiter. (sein)', 'ist'),
        mc('Es regnet, ___ geht er spazieren.', ['trotzdem', 'obwohl'], 'trotzdem', 'Ард нь үйл үг (geht) шууд ирж байна → trotzdem.'),
        mc('___ er viel gelernt hat, hat er die Prüfung nicht bestanden.', ['Obwohl', 'Trotzdem', 'Weil'], 'Obwohl'),
        tiles('Завгүй ч гэсэн би чамд тусална.', 'Obwohl ich wenig Zeit habe, helfe ich dir.'),
        inp('Sie kauft das Kleid. Es ist teuer. (obwohl)', 'Sie kauft das Kleid, obwohl es teuer ist.')
      ]
    },
    {
      id: 'wennals', chapter: '9', title: 'wenn · als', mn: 'Цаг заасан Nebensatz (1)', source: 'Übung 18',
      intro: { de: 'Als ich jung war … und wenn ich Zeit habe …', mn: 'als уу, wenn үү?' },
      rules: [
        '<b>als</b> — <b>өнгөрсөнд нэг удаа</b> болсон үйл явдал эсвэл өнгөрсөн нэг үе: <i>Als ich ein Kind war, …</i>',
        '<b>wenn</b> — <b>давтагдсан</b> үйлдэл (immer wenn, jedes Mal wenn) эсвэл <b>одоо/ирээдүй</b>: <i>Wenn ich nach Deutschland komme, …</i>',
        'Үйл үг төгсгөлд. Nebensatz эхэнд байвал үндсэн өгүүлбэр үйл үгээр эхэлнэ.'
      ],
      examples: [
        { de: 'Als ich 18 war, zog ich nach Prag.', mn: '18 настай байхдаа би Праг руу нүүсэн.' },
        { de: 'Immer wenn ich Zeit hatte, besuchte ich meine Oma.', mn: 'Завтай болгондоо эмээ дээрээ очдог байсан.' }
      ],
      items: [
        mc('___ ich ein Kind war, wohnte ich in Ulaanbaatar.', ['Als', 'Wenn'], 'Als', 'Өнгөрсөн нэг үе → als.'),
        mc('Immer ___ ich Zeit hatte, besuchte ich meine Oma.', ['wenn', 'als'], 'wenn', 'Давтагдсан → wenn.'),
        mc('___ ich nach Deutschland komme, rufe ich dich an.', ['Wenn', 'Als'], 'Wenn', 'Ирээдүй → wenn.'),
        mc('___ wir gestern ankamen, regnete es.', ['Als', 'Wenn'], 'Als', 'Өнгөрсөнд нэг удаа → als.'),
        mc('Jedes Mal, ___ er kommt, bringt er Blumen mit.', ['wenn', 'als'], 'wenn'),
        inp('Ich war 18. Ich zog nach Prag. (als)', 'Als ich 18 war, zog ich nach Prag.')
      ]
    },
    {
      id: 'waehrend', chapter: '10', title: 'während · solange', mn: 'Цаг заасан Nebensatz (2)', source: 'Übung 19',
      intro: { de: 'Während du lernst, helfe ich dir.', mn: 'Чамайг сурах зуур би туслая.' },
      rules: [
        '<b>während</b> — «…байх зуур». Хоёр үйлдэл <b>зэрэг</b> явагдана.',
        '<b>solange</b> — «…л бол, …тэр хугацаанд». Хоёр үйлдлийн <b>үргэлжлэх хугацаа</b> ижил, нөхцөл шиг.',
        'Анхаар: <b>während + Genitiv</b> нь угтвар үг: <i>während des Unterrichts</i>.'
      ],
      examples: [
        { de: 'Während die Kinder schlafen, lese ich ein Buch.', mn: 'Хүүхдүүд унтаж байх зуур би ном уншина.' },
        { de: 'Solange du Fieber hast, musst du im Bett bleiben.', mn: 'Халуураад байгаа л бол орондоо хэвт.' }
      ],
      items: [
        mc('___ ich koche, hört mein Mann Musik.', ['Während', 'Solange'], 'Während', 'Зэрэг явагдах хоёр үйлдэл.'),
        mc('___ du Fieber hast, musst du im Bett bleiben.', ['Solange', 'Während'], 'Solange', 'Нөхцөл + ижил хугацаа.'),
        tiles('Хүүхдүүд унтаж байх зуур би ном уншина.', 'Während die Kinder schlafen, lese ich ein Buch.'),
        inp('Sie telefoniert. Sie fährt Auto. (während)', 'Sie telefoniert, während sie Auto fährt.'),
        mc('Ich bleibe hier, ___ du mich brauchst.', ['solange', 'während'], 'solange'),
        mc('Während ___ Unterrichts ist das Handy aus.', ['des', 'dem', 'den'], 'des', 'während (угтвар) + Genitiv.')
      ]
    },
    {
      id: 'nachdem', chapter: '11', title: 'nachdem · sobald', mn: 'Цаг заасан Nebensatz (3)', source: 'Übung 20',
      intro: { de: 'Nachdem wir das gelernt haben, machen wir ein Spiel!', mn: 'Үүнийг сурсны дараа тоглоом тоглоно!' },
      rules: [
        '<b>nachdem</b> — «…сны дараа». <b>Цагийн дараалал</b> чухал: Nebensatz-ын үйлдэл түрүүлж болсон.',
        'Nebensatz: <b>Plusquamperfekt</b> → Hauptsatz: <b>Präteritum</b>. <i>Nachdem er gegessen <b>hatte</b>, <b>ging</b> er spazieren.</i>',
        'Nebensatz: <b>Perfekt</b> → Hauptsatz: <b>Präsens</b>. <i>Nachdem ich gegessen <b>habe</b>, <b>gehe</b> ich spazieren.</i>',
        '<b>sobald</b> — «…мөц, …хойно шууд». Ихэвчлэн Präsens: <i>Sobald ich zu Hause bin, rufe ich dich an.</i>'
      ],
      examples: [
        { de: 'Nachdem sie angekommen war, rief sie ihre Mutter an.', mn: 'Хүрч ирснийхээ дараа тэр ээж рүүгээ залгасан.' }
      ],
      items: [
        mc('Nachdem er gegessen ___, ging er spazieren.', ['hatte', 'hat', 'ist'], 'hatte', 'Hauptsatz Präteritum → Nebensatz Plusquamperfekt.'),
        mc('Nachdem ich die Hausaufgaben gemacht habe, ___ ich fern.', ['sehe', 'sah'], 'sehe', 'Perfekt → Präsens.'),
        inp('Sobald ich zu Hause ___, rufe ich dich an. (sein)', 'bin'),
        tiles('Хүрч ирснийхээ дараа тэр ээж рүүгээ залгасан.', 'Nachdem sie angekommen war, rief sie ihre Mutter an.'),
        mc('Nachdem er nach Hause gekommen ___, schlief er sofort ein.', ['war', 'hatte'], 'war', 'kommen → sein → war gekommen.'),
        inp('Ich bekomme das Geld. Ich kaufe ein Fahrrad. (sobald, эхэнд)', 'Sobald ich das Geld bekomme, kaufe ich ein Fahrrad.')
      ]
    },
    {
      id: 'bevor', chapter: '12', title: 'bevor · ehe', mn: '«…хийхээс өмнө»', source: 'Übung 21',
      intro: { de: 'Bevor wir anfangen, trinken wir einen Tee.', mn: 'Эхлэхээсээ өмнө цай ууя.' },
      rules: [
        '<b>bevor / ehe</b> — «…хийхээс өмнө». Nebensatz-ын үйлдэл <b>хойно</b> болно.',
        '<b>ehe</b> нь утга адил, илүү бичгийн хэл.',
        'Ихэвчлэн хоёр өгүүлбэр <b>ижил цагтай</b>: <i>Bevor er nach Deutschland ging, lernte er Deutsch.</i>'
      ],
      examples: [
        { de: 'Bevor wir essen, waschen wir die Hände.', mn: 'Хоол идэхээсээ өмнө бид гараа угаана.' }
      ],
      items: [
        inp('Ich putze die Zähne. Danach gehe ich ins Bett. (bevor)', 'Ich putze die Zähne, bevor ich ins Bett gehe.'),
        mc('___ du gehst, schließ bitte die Tür.', ['Bevor', 'Nachdem'], 'Bevor', '«Явахаасаа өмнө хаалгаа хаа».'),
        tiles('Хоол идэхээсээ өмнө бид гараа угаана.', 'Bevor wir essen, waschen wir die Hände.'),
        mc('ehe = ?', ['bevor', 'nachdem', 'während'], 'bevor'),
        inp('Bevor er nach Deutschland ___, lernte er Deutsch. (gehen, Präteritum)', 'ging'),
        mc('Хоол идэхээсээ өмнө гараа угаа: Wasch dir die Hände, ___ du isst.', ['bevor', 'nachdem', 'sobald'], 'bevor')
      ]
    },
    {
      id: 'damit', chapter: '13', title: 'damit · um … zu', mn: 'Зорилго заасан Nebensatz', source: 'Übung 22–24',
      intro: { de: 'Wir üben, um die B2-Prüfung zu bestehen!', mn: 'B2 шалгалт өгөхийн тулд дасгал хийцгээе!' },
      rules: [
        '<b>damit / um … zu</b> — «…хийхийн тулд». «Wozu?» асуултад хариулна.',
        'Субьект <b>ижил</b> → <b>um … zu</b> (damit ч болно): <i>Ich lerne Deutsch, <b>um</b> in Deutschland <b>zu studieren</b>.</i>',
        'Субьект <b>өөр</b> → зөвхөн <b>damit</b>: <i>Ich spreche langsam, <b>damit</b> du mich <b>verstehst</b>.</i>',
        'damit-Satz-д <b>wollen, sollen, möchten</b> хэрэглэхгүй — зорилго аль хэдийн илэрхийлэгдсэн.'
      ],
      examples: [
        { de: 'Er spart Geld, um ein Auto zu kaufen.', mn: 'Тэр машин авахын тулд мөнгө хуримтлуулж байна.' },
        { de: 'Die Mutter kocht, damit die Kinder etwas essen.', mn: 'Хүүхдүүд хоол идээсэй гэж ээж хоол хийж байна.' }
      ],
      items: [
        inp('Ich lerne Deutsch. Ich will in Deutschland studieren. (um … zu)', 'Ich lerne Deutsch, um in Deutschland zu studieren.'),
        inp('Ich spreche langsam. Du sollst mich verstehen. (damit)', 'Ich spreche langsam, damit du mich verstehst.', 'sollen-ийг хасна.'),
        mc('Die Mutter kocht, ___ die Kinder etwas essen.', ['damit', 'um'], 'damit', 'Субьект өөр → damit.'),
        mc('Er spart Geld, ___ ein Auto zu kaufen.', ['um', 'damit'], 'um'),
        inp('Sie steht früh auf, um pünktlich ___. (sein)', 'zu sein'),
        tiles('Бид хөл бөмбөг тоглохоор цэцэрлэгт хүрээлэн рүү явж байна.', 'Wir gehen in den Park, um Fußball zu spielen.'),
        inp('Er ruft an, um einen Termin ___. (vereinbaren)', 'zu vereinbaren')
      ]
    },
    {
      id: 'sodass', chapter: '14', title: 'so dass · ohne dass · ohne … zu', mn: 'Үр дүн ба «…хийлгүйгээр»', source: 'Übung 25–26',
      intro: { de: 'Wir lernen so viel, dass wir alles schaffen!', mn: 'Бүгдийг давтал их сурна!' },
      rules: [
        '<b>so dass / sodass</b> — үр дүн, «…тул, ингээд». <i>Es regnete stark, so dass wir zu Hause blieben.</i>',
        '<b>so + адъектив …, dass</b>: <i>Er war <b>so</b> müde, <b>dass</b> er sofort einschlief.</i>',
        '<b>ohne dass / ohne … zu</b> — «…хийлгүйгээр». Субьект ижил → <b>ohne … zu</b>, өөр → <b>ohne dass</b>.'
      ],
      examples: [
        { de: 'Er ging, ohne etwas zu sagen.', mn: 'Тэр юу ч хэлэлгүй явсан.' },
        { de: 'Die Kinder spielten, ohne dass die Eltern es merkten.', mn: 'Эцэг эх нь анзааралгүй хүүхдүүд тоглосон.' }
      ],
      items: [
        inp('Es regnete stark. Wir blieben zu Hause. (so dass)', ['Es regnete stark, so dass wir zu Hause blieben.', 'Es regnete stark, sodass wir zu Hause blieben.']),
        mc('Er war ___ müde, dass er sofort einschlief.', ['so', 'sehr', 'zu'], 'so'),
        inp('Er ging. Er sagte nichts. (ohne … zu)', 'Er ging, ohne etwas zu sagen.', 'nichts → ohne etwas zu sagen.'),
        mc('Sie nahm mein Buch, ___ mich zu fragen.', ['ohne', 'anstatt', 'um'], 'ohne'),
        tiles('Хэн ч анзааралгүйгээр тэр байшингаас гарсан.', 'Er hat das Haus verlassen, ohne dass es jemand bemerkte.'),
        mc('Die Kinder spielten, ohne dass die Eltern es ___.', ['merkten', 'zu merken'], 'merkten', 'Субьект өөр → ohne dass + үйл үг төгсгөлд.')
      ]
    },
    {
      id: 'indem', chapter: '15', title: 'indem · dadurch, dass', mn: 'Арга хэрэгсэл: «…замаар»', source: 'Übung 27',
      intro: { de: 'Man lernt Wörter, indem man sie jeden Tag wiederholt!', mn: 'Үгсээ өдөр бүр давтаж цээжилнэ!' },
      rules: [
        '<b>indem</b> — «…замаар, …хийснээр». «Wie?» (Яаж?) асуултад хариулна.',
        '<b>dadurch, dass</b> — утга адил; <b>dadurch</b> үндсэн өгүүлбэрт, <b>dass</b> Nebensatz-ыг эхлүүлнэ: <i>Sie hat das Problem dadurch gelöst, dass sie den Chef angerufen hat.</i>',
        'Үйл үг төгсгөлд.'
      ],
      examples: [
        { de: 'Er verbessert sein Deutsch, indem er viel liest.', mn: 'Тэр их уншиж герман хэлээ сайжруулж байна.' }
      ],
      items: [
        inp('Man lernt Wörter. Man wiederholt sie jeden Tag. (indem)', 'Man lernt Wörter, indem man sie jeden Tag wiederholt.'),
        tiles('Тэр их уншиж герман хэлээ сайжруулж байна.', 'Er verbessert sein Deutsch, indem er viel liest.'),
        mc('Wie hast du abgenommen? – ___ ich jeden Tag Sport gemacht habe.', ['Indem', 'Damit', 'Obwohl'], 'Indem', '«Яаж?» → indem.'),
        inp('Sie hat das Problem dadurch gelöst, ___ sie den Chef angerufen hat.', 'dass'),
        mc('Dadurch, dass er früh losging, …', ['erreichte er den Zug.', 'er erreichte den Zug.'], 'erreichte er den Zug.', 'Nebensatz эхэнд → үндсэн өгүүлбэр үйл үгээр эхэлнэ.'),
        inp('Man spart Energie. Man schaltet das Licht aus. (indem)', 'Man spart Energie, indem man das Licht ausschaltet.')
      ]
    }
  ];

  /* ---------- Багшийн хэллэгүүд ---------- */
  const PRAISE = [
    { de: 'Super gemacht!', mn: 'Гайхалтай!' }, { de: 'Sehr gut!', mn: 'Маш сайн!' },
    { de: 'Genau richtig!', mn: 'Яг зөв!' }, { de: 'Ausgezeichnet!', mn: 'Онц!' },
    { de: 'Weiter so!', mn: 'Ингээд үргэлжлүүл!' }, { de: 'Toll!', mn: 'Гоё байна!' },
    { de: 'Perfekt!', mn: 'Төгс!' }, { de: 'Prima!', mn: 'Сайхан!' }
  ];
  const CONSOLE = [
    { de: 'Fast! Schau noch einmal.', mn: 'Бараг! Дахиад нэг хар.' },
    { de: 'Kein Problem. Aus Fehlern lernt man.', mn: 'Зүгээр. Алдаанаасаа суралцдаг.' },
    { de: 'Nicht ganz. Lies die Erklärung.', mn: 'Яг биш. Тайлбарыг уншаарай.' },
    { de: 'Das ist schwer, aber du schaffst das!', mn: 'Хэцүү ч чи чадна!' }
  ];
  /* Багшийн сэтгэл хөдлөл: магтаал (дараалсан зөв хариултаар хүчтэй болно) */
  const PRAISE_BIG = [
    { de: 'Bravo! Ich bin so stolz auf dich!', mn: 'Браво! Чамаар бахархаж байна!' },
    { de: 'Fantastisch! Wie ein Muttersprachler!', mn: 'Гайхамшигтай! Яг л уугуул хүн шиг!' },
    { de: 'Wunderbar! Das ist B2-Niveau!', mn: 'Гоё! Энэ чинь B2 түвшин!' },
    { de: 'Genial! Du bist ein Star!', mn: 'Суут! Чи бол од!' },
    { de: 'Ich könnte weinen vor Freude!', mn: 'Баярласандаа уйлмаар байна!' }
  ];
  /* Загнах: 1 = зөөлөн, 2 = бурханд залбирах, 3 = цөхрөнгөө барах */
  const SCOLD = {
    1: [
      { de: 'Nein, nein, nein!', mn: 'Үгүй, үгүй, үгүй!' },
      { de: 'Konzentration, bitte!', mn: 'Анхаарлаа төвлөрүүл!' },
      { de: 'Das tut mir in den Ohren weh!', mn: 'Чих минь өвдөж байна!' },
      { de: 'Wie oft habe ich das schon erklärt?', mn: 'Би үүнийг хэдэн удаа тайлбарласан бэ?' },
      { de: 'Ach du lieber Himmel!', mn: 'Ай тэнгэр минь!' }
    ],
    2: [
      { de: 'Oh Jesus, Maria und Josef!', mn: 'Есүс, Мариа, Иосеф минь ээ!' },
      { de: 'Lieber Buddha, gib mir Geduld!', mn: 'Бурхан Будда минь, надад тэвчээр өгөөч!' },
      { de: 'Allmächtiger! Hilf mir!', mn: 'Хүчит бурхан минь! Туслаач!' },
      { de: 'Um Gottes willen!', mn: 'Бурхны минь хайраар!' },
      { de: 'Heiliger Strohsack!', mn: 'Ариун сүрлэн шуудай минь! (Герман хараал)' },
      { de: 'Herr, schmeiß Hirn vom Himmel!', mn: 'Бурхан минь, тэнгэрээс тархи шидээч!' }
    ],
    3: [
      { de: 'Mein Gott! Das gibt es doch nicht!', mn: 'Бурхан минь! Ийм юм байх гэж!' },
      { de: 'Oh Buddha, Jesus und alle Heiligen! Warum?!', mn: 'Будда, Есүс, бүх гэгээнтнүүд ээ! Яагаад?!' },
      { de: 'Ich gebe auf! Nein, ich gebe nicht auf. Noch einmal!', mn: 'Би бууж өглөө! Үгүй ээ, өгөхгүй. Дахиад!' },
      { de: 'Himmel, Herrgott, Sakrament!', mn: 'Тэнгэр, бурхан, ариун ёслол минь! (Баварь хараал)' }
    ]
  };
  const TIPS = [
    { de: 'Lerne Nomen immer mit Artikel!', mn: 'Нэр үгийг үргэлж артикльтай нь цээжил!' },
    { de: 'Verb am Ende — im Nebensatz!', mn: 'Nebensatz-д үйл үг төгсгөлд очно!' },
    { de: 'Wo? Dativ. Wohin? Akkusativ.', mn: 'Хаана? — Dativ. Хаашаа? — Akkusativ.' },
    { de: 'bekommen ist nicht kommen!', mn: 'bekommen = хүлээн авах, kommen биш!' },
    { de: 'Zehn Minuten jeden Tag sind besser als zwei Stunden am Sonntag.', mn: 'Ням гаригт 2 цаг сурахаас өдөр бүр 10 минут дээр.' },
    { de: 'Sprich laut! Dein Mund muss Deutsch lernen.', mn: 'Чанга дуудаж хэл! Ам чинь ч бас герман хэл сурах ёстой.' },
    { de: 'Die Wörter auf -ung, -heit, -keit sind immer feminin.', mn: '-ung, -heit, -keit дагавартай үг үргэлж die.' },
    { de: 'Für B2: Lies jeden Tag einen kurzen Zeitungsartikel.', mn: 'B2-д: өдөр бүр нэг богино мэдээ унш.' }
  ];

  window.DL_DATA = { PRAISE_BIG, SCOLD, COURSE, IRREG, IRREG_GROUPS, VOCAB, VERBFORMS, HABENSEIN, WORKBOOK, LESSONS, PRAISE, CONSOLE, TIPS };
})();
