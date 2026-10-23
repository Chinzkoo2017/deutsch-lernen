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
    ['werfen', 'wirft', 'warf', 'hat geworfen', 'шидэх', 'e-a-o'],
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

  // Үгсийн сантай нэгтгэнэ (карт, SRS-д ашиглана)
  IRREG.forEach(v => {
    const w = VOCAB.find(x => x.type === 'verb' && x.de === v.inf);
    if (w) { w.tags.push('irr'); w.er = v.er; }
    else { const nv = V(v.inf, v.mn, v.prat, v.perf, ['irr']); nv.er = v.er; VOCAB.push(nv); }
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
          'Die Feuerwehr rettet alle Bewohner des Hochhauses.', 'Die Feuerwehr rettete alle Bewohner des Hochhauses.', 'Die Feuerwehr hat alle Bewohner des Hochhauses gerettet.'),
        T('Ах зураг зурж байна.', ['der Bruder', 'zeichnen', 'das Bild'], 'Der Bruder zeichnet ein Bild.', 'Der Bruder zeichnete ein Bild.', 'Der Bruder hat ein Bild gezeichnet.'),
        T('Эмээ төмс чанаж байна.', ['die Oma', 'kochen', 'die Kartoffel'], 'Die Oma kocht Kartoffeln.', 'Die Oma kochte Kartoffeln.', 'Die Oma hat Kartoffeln gekocht.'),
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
        T('Хулгайч бүсгүйн гар цүнхийг хулгайлж байна.', ['der Dieb', 'stehlen', 'die Handtasche', 'die Frau'],
          'Der Dieb stiehlt die Handtasche der Frau.', 'Der Dieb stahl die Handtasche der Frau.', 'Der Dieb hat die Handtasche der Frau gestohlen.'),
        T('Эмээ цамц индүүдэж байна.', ['die Oma', 'bügeln', 'das Hemd'],
          ['Die Oma bügelt das Hemd.', 'Die Oma bügelt ein Hemd.'], ['Die Oma bügelte das Hemd.', 'Die Oma bügelte ein Hemd.'], ['Die Oma hat das Hemd gebügelt.', 'Die Oma hat ein Hemd gebügelt.']),
        T('Ээж цагаан ноосон цамцыг угааж байна.', ['die Mutter', 'waschen', 'weiß', 'der Pullover'],
          'Die Mutter wäscht den weißen Pullover.', 'Die Mutter wusch den weißen Pullover.', 'Die Mutter hat den weißen Pullover gewaschen.'),
        T('Нагац эгч шөл хийж байна.', ['die Tante', 'kochen', 'die Suppe'],
          ['Die Tante kocht Suppe.', 'Die Tante kocht eine Suppe.', 'Die Tante kocht die Suppe.'],
          ['Die Tante kochte Suppe.', 'Die Tante kochte eine Suppe.', 'Die Tante kochte die Suppe.'],
          ['Die Tante hat Suppe gekocht.', 'Die Tante hat eine Suppe gekocht.', 'Die Tante hat die Suppe gekocht.']),
        T('Хүү муурыг хооллож байна.', ['der Sohn', 'füttern', 'die Katze'], 'Der Sohn füttert die Katze.', 'Der Sohn fütterte die Katze.', 'Der Sohn hat die Katze gefüttert.')
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
        'Partizip II: сул үйл үг <b>ge-…-t</b> (gekauft), хүчтэй <b>ge-…-en</b> (geholfen). Салдаг угтвар: <b>ein·ge·kauft, an·ge·kommen</b>. Be-, ver-, er-, ent-, zer- угтвартай болон <b>-ieren</b>-ээр төгссөн үйл үгэнд <b>ge- нэмэхгүй</b>: verkauft, bekommen, korrigiert.'
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

  window.DL_DATA = { IRREG, IRREG_GROUPS, VOCAB, VERBFORMS, HABENSEIN, WORKBOOK, LESSONS, PRAISE, CONSOLE, TIPS };
})();
