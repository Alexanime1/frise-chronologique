/* ═══════════════ FRISE CHRONOLOGIQUE — script.js ═══════════════ */
const TODAY = new Date();
const TODAY_YEAR = TODAY.getFullYear();
const TODAY_MONTH = TODAY.getMonth() + 1;
const TODAY_DAY = TODAY.getDate();

const CATS = {
  politique:{ c:'#4f6ef7', bg:'rgba(79,110,247,.13)',  l:'Politique',      e:'🏛' },
  science:  { c:'#16c47a', bg:'rgba(22,196,122,.13)',  l:'Science & Tech', e:'🔬' },
  art:      { c:'#f0742a', bg:'rgba(240,116,42,.13)',  l:'Art & Culture',  e:'🎨' },
  guerre:   { c:'#f03060', bg:'rgba(240,48,96,.13)',   l:'Guerre',         e:'⚔️' },
  autre:    { c:'#a855f7', bg:'rgba(168,85,247,.13)',  l:'Autre',          e:'✦'  },
};

const ERAS = [
  { key:'all',     name:'Toute l\'histoire', from:-300000, to:TODAY_YEAR,  color:'#8b5cf6' },
  { key:'prehist', name:'Préhistoire',       from:-300000, to:-3200,       color:'#e07820' },
  { key:'antiq',   name:'Antiquité',         from:-3200,   to:476,         color:'#d4a020' },
  { key:'moyen',   name:'Moyen Âge',         from:476,     to:1492,        color:'#4f6ef7' },
  { key:'mod',     name:'Époque Moderne',    from:1492,    to:1789,        color:'#16c47a' },
  { key:'contemp', name:'XIXᵉ siècle',       from:1789,    to:1900,        color:'#f03060' },
  { key:'xx',      name:'XXᵉ siècle',        from:1900,    to:2000,        color:'#a855f7' },
  { key:'xxi',     name:'XXIᵉ siècle',       from:2000,    to:TODAY_YEAR,  color:'#06b6d4' },
];

/* ── Images fiables (toutes vérifiées) ── */
const I = {
  lascaux:    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lascaux_painting.jpg/400px-Lascaux_painting.jpg',
  stonehenge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_30.jpg/400px-Stonehenge2007_07_30.jpg',
  pyramides:  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/400px-Kheops-Pyramid.jpg',
  colosseum:  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/400px-Colosseo_2020.jpg',
  joconde:    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/300px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  sixtine:    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/400px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
  revfr:      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg/400px-Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg',
  napoleon:   'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg/400px-Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg',
  darwin:     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Charles_Darwin_by_Julia_Margaret_Cameron_3.jpg/300px-Charles_Darwin_by_Julia_Margaret_Cameron_3.jpg',
  toureiffel: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/300px-Tour_Eiffel_Wikimedia_Commons.jpg',
  einstein:   'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/300px-Albert_Einstein_Head.jpg',
  dday:       'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/400px-Into_the_Jaws_of_Death_23-0455M_edit.jpg',
  lune:       'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/300px-Aldrin_Apollo_11_original.jpg',
  berlin:     'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/De_muur_van_Berlijn.jpg/400px-De_muur_van_Berlijn.jpg',
  sept11:     'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/September_11_Photo_Montage.jpg/400px-September_11_Photo_Montage.jpg',
  sputnik:    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sputnik_asm.jpg/400px-Sputnik_asm.jpg',
  amerindep:  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/United_States_Declaration_of_Independence.jpg/400px-United_States_Declaration_of_Independence.jpg',
  newton:     'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Portrait_of_Sir_Isaac_Newton%2C_1689.jpg/300px-Portrait_of_Sir_Isaac_Newton%2C_1689.jpg',
  charlemagne:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/AlbrechtDurer_-_Portrait_of_Charlemagne_%28c1512%29.jpg/300px-AlbrechtDurer_-_Portrait_of_Charlemagne_%28c1512%29.jpg',
  jeanne:     'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Joan_of_arc_miniature_graded.jpg/300px-Joan_of_arc_miniature_graded.jpg',
  versailles: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Palace_of_Versailles%2C_2008.jpg/400px-Palace_of_Versailles%2C_2008.jpg',
  bastille:   'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Anonymous_-_Prise_de_la_Bastille.jpg/400px-Anonymous_-_Prise_de_la_Bastille.jpg',
  louisxiv:   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Louis_xiv_1701.jpg/300px-Louis_xiv_1701.jpg',
  pasteur:    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Louis_Pasteur_photo.jpg/300px-Louis_Pasteur_photo.jpg',
  hugo:       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Victor_Hugo_by_%C3%89tienne_Carjat_1876_-_full.jpg/300px-Victor_Hugo_by_%C3%89tienne_Carjat_1876_-_full.jpg',
  monet_imp:  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Monet_-_Impression%2C_Sunrise.jpg/400px-Monet_-_Impression%2C_Sunrise.jpg',
  lumiere:    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/LouisJeanLumiere.jpg/300px-LouisJeanLumiere.jpg',
  degaulle:   'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/De_Gaulle-OWI.jpg/300px-De_Gaulle-OWI.jpg',
  pompidou_c: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Pompidou.jpg/400px-Pompidou.jpg',
  mitterrand: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Fran%C3%A7ois_Mitterrand_1981.jpg/300px-Fran%C3%A7ois_Mitterrand_1981.jpg',
  macron:     'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Emmanuel_Macron_in_2019.jpg/300px-Emmanuel_Macron_in_2019.jpg',
  ww1:        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/The_Battle_of_the_Somme_film.jpg/400px-The_Battle_of_the_Somme_film.jpg',
  concorde:   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Concorde_%28airplane%29.jpg/400px-Concorde_%28airplane%29.jpg',
  gandhi:     'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/300px-Mahatma-Gandhi%2C_studio%2C_1931.jpg',
  mandela:    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/300px-Nelson_Mandela_1994.jpg',
  titanic:    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/RMS_Titanic_3.jpg/400px-RMS_Titanic_3.jpg',
  wright:     'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/First_flight2.jpg/400px-First_flight2.jpg',
  iphone:     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/IPhone_1st_Gen.svg/300px-IPhone_1st_Gen.svg.png',
  shakespeare:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/300px-Shakespeare.jpg',
  beethoven:  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Beethoven.jpg/300px-Beethoven.jpg',
  luther:     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Lucas_Cranach_the_Elder-_Martin_Luther%2C_1528.jpg/300px-Lucas_Cranach_the_Elder-_Martin_Luther%2C_1528.jpg',
  gutenberg:  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Gutenberg.jpg/300px-Gutenberg.jpg',
  hiroshima:  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Atomic_bombing_of_Japan.jpg/400px-Atomic_bombing_of_Japan.jpg',
  tchernobyl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Chornobylska_AES.jpg/400px-Chornobylska_AES.jpg',
  notre_dame_i:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Notre-Dame_de_Paris_2019-04-15_Initial_Fire.jpg/400px-Notre-Dame_de_Paris_2019-04-15_Initial_Fire.jpg',
  notre_dame: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Cath%C3%A9drale_Notre-Dame_de_Paris_2013-07-24.jpg/300px-Cath%C3%A9drale_Notre-Dame_de_Paris_2013-07-24.jpg',
  covid:      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/400px-SARS-CoV-2_without_background.png',
  ukraine_f:  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/400px-Flag_of_Ukraine.svg.png',
  jo2024:     'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/2024_Summer_Olympics_Opening_Ceremony_Eiffel_Tower.jpg/400px-2024_Summer_Olympics_Opening_Ceremony_Eiffel_Tower.jpg',
  marx:       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Karl_Marx_001.jpg/300px-Karl_Marx_001.jpg',
  waterloon:  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Battle_of_Waterloo_1815.PNG/400px-Battle_of_Waterloo_1815.PNG',
  tunnel_mc:  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Channel_Tunnel_map.svg/400px-Channel_Tunnel_map.svg.png',
  verdun:     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Trench_warfare_-_used_to_illustrate_%22If_ye_break_faith%22.jpg/400px-Trench_warfare_-_used_to_illustrate_%22If_ye_break_faith%22.jpg',
  greatwall:  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20090529_great_wall_8185.jpg/400px-20090529_great_wall_8185.jpg',
  columbus_s: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sebastiano_del_Piombo_004.jpg/300px-Sebastiano_del_Piombo_004.jpg',
  bastille2:  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Anonymous_-_Prise_de_la_Bastille.jpg/400px-Anonymous_-_Prise_de_la_Bastille.jpg',
  internet:   'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Internet_map_1024.jpg/400px-Internet_map_1024.jpg',
  facebook_l: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/300px-Facebook_f_logo_%282019%29.svg.png',
  genome:     'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/DNA_Structure%2BKey%2BLabelled.pn_NoBB.png/300px-DNA_Structure%2BKey%2BLabelled.pn_NoBB.png',
};

/* ── Dates précises: { year, month?, day? } ── */
/* On stocke month (1-12) et day (1-31) optionnels */
const DEFAULTS = [
  /* PRÉHISTOIRE */
  {id:1,  year:-300000,title:'Maîtrise du feu',              wiki:'Maîtrise du feu par les hominidés',  desc:"L'Homo erectus apprend à contrôler le feu, révolution pour la cuisson et la protection.",                     cat:'science',  img:I.lascaux},
  {id:2,  year:-40000, yearEnd:-10000, title:'Art pariétal', wiki:'Art pariétal',                        desc:"Peintures de Chauvet (~37 000 av. J.-C.) et Lascaux (~17 000). Premières grandes œuvres d'art.",              cat:'art',      img:I.lascaux},
  {id:3,  year:-10000, yearEnd:-4000, title:'Révolution néolithique', wiki:'Révolution néolithique',     desc:"Naissance de l'agriculture et de l'élevage. Sédentarisation des populations humaines.",                       cat:'science',  img:I.stonehenge},
  {id:4,  year:-5000,  yearEnd:-1500, title:'Mégalithes & Stonehenge',wiki:'Mégalithe',                  desc:"Stonehenge (Angleterre) et alignements de Carnac (Bretagne). Monuments mégalithiques d'Europe.",               cat:'autre',    img:I.stonehenge},
  {id:5,  year:-3500,  title:'Invention de la roue',         wiki:'Roue',                               desc:"Inventée en Mésopotamie. Révolution du transport et du travail artisanal.",                                    cat:'science',  img:''},
  /* ANTIQUITÉ */
  {id:6,  year:-3200,  title:'Invention de l\'écriture',     wiki:'Histoire de l\'écriture',            desc:"Cunéiforme sumérien en Mésopotamie, hiéroglyphes en Égypte. La mémoire humaine prend une forme écrite.",       cat:'science',  img:''},
  {id:7,  year:-2700,  yearEnd:-2560, title:'Pyramides de Gizeh',wiki:'Pyramide de Khéops',             desc:"Khéops, Khéphren, Mykérinos. L'une des Sept Merveilles du monde antique encore debout.",                      cat:'art',      img:I.pyramides},
  {id:8,  year:-2200,  yearEnd:-1700, title:'Grande Muraille de Chine (débuts)',wiki:'Grande Muraille de Chine',desc:"Premières sections construites sous les États combattants. Qin Shi Huang les unifiera.",                cat:'autre',    img:I.greatwall},
  {id:9,  year:-776,   month:1, title:'Premiers Jeux Olympiques',wiki:'Jeux olympiques antiques',       desc:"Jeux panhelléniques à Olympie en l'honneur de Zeus. Trêve sacrée entre cités grecques.",                      cat:'autre',    img:''},
  {id:10, year:-753,   title:'Fondation de Rome',            wiki:'Fondation de Rome',                  desc:"Romulus fonde Rome sur le Palatin. La cité deviendra capitale d'un empire couvrant tout le bassin méditerranéen.", cat:'politique',img:I.colosseum},
  {id:11, year:-551,   yearEnd:-479, title:'Vie de Confucius',wiki:'Confucius',                         desc:"Le philosophe chinois fonde l'éthique confucéenne. Sa pensée influence toute l'Asie orientale pendant 2500 ans.", cat:'art',     img:''},
  {id:12, year:-490,   yearEnd:-479, title:'Guerres médiques',wiki:'Guerres médiques',                  desc:"Marathon (490), Thermopyles, Salamine (480). La démocratie grecque résiste à l'invasion perse.",               cat:'guerre',   img:''},
  {id:13, year:-356,   yearEnd:-323, title:'Alexandre le Grand',wiki:'Alexandre le Grand',              desc:"Conquête d'un empire de la Grèce à l'Inde. Diffusion de la culture hellénique jusqu'en Asie centrale.",       cat:'guerre',   img:''},
  {id:14, year:-221,   yearEnd:-206, title:'Unification de la Chine',wiki:'Qin Shi Huang',              desc:"Qin Shi Huang unifie les royaumes chinois. Premier Empereur de Chine, il ordonne la construction de la Grande Muraille.", cat:'politique',img:I.greatwall},
  {id:15, year:-44,    month:3, day:15, title:'Assassinat de Jules César',wiki:'Jules César',           desc:"César poignardé aux Ides de Mars au Sénat par Brutus et ses complices. Rome plonge dans la guerre civile.",    cat:'politique',img:''},
  {id:16, year:-27,    yearEnd:14,  title:'Auguste, premier Empereur',wiki:'Auguste',                   desc:"Octave Auguste instaure le Principat. Son règne de 41 ans inaugure la Pax Romana.",                            cat:'politique',img:I.colosseum},
  {id:17, year:0,      title:'Naissance de Jésus-Christ',   wiki:'Jésus de Nazareth',                  desc:"Naissance du fondateur du christianisme. Sa doctrine transformera l'Europe et le monde pour deux millénaires.", cat:'autre',    img:''},
  {id:18, year:79,     month:8, day:24, title:'Éruption du Vésuve',wiki:'Éruption du Vésuve de 79',    desc:"Pompéi et Herculanum ensevelies. Les villes romaines figées dans les cendres révèlent la vie antique.",        cat:'autre',    img:I.colosseum},
  {id:19, year:105,    title:'Invention du papier (Chine)', wiki:'Histoire du papier',                  desc:"Cai Lun perfectionne la fabrication du papier sous la dynastie Han. Révolution de la diffusion du savoir.",    cat:'science',  img:''},
  {id:20, year:313,    title:'Édit de Milan',                wiki:'Édit de Milan',                      desc:"Constantin accorde la liberté de culte dans l'Empire romain. Fin des persécutions des chrétiens.",             cat:'politique',img:''},
  {id:21, year:476,    title:'Chute de Rome',                wiki:'Chute de l\'Empire romain d\'Occident',desc:"Romulus Augustule déposé par Odoacre. Fin de l'Antiquité, début du Moyen Âge.",                           cat:'guerre',   img:I.colosseum},
  /* MOYEN ÂGE */
  {id:22, year:622,    title:'Hégire de Mahomet',            wiki:'Hégire',                             desc:"Mahomet fuit La Mecque pour Médine le 16 juillet 622. Début du calendrier islamique.",                        cat:'autre',    img:''},
  {id:23, year:732,    month:10, title:'Bataille de Poitiers',wiki:'Bataille de Poitiers (732)',        desc:"Charles Martel arrête l'avancée arabo-berbère. Victoire décisive pour l'histoire de l'Europe chrétienne.",    cat:'guerre',   img:''},
  {id:24, year:800,    month:12, day:25, title:'Couronnement de Charlemagne',wiki:'Charlemagne',        desc:"Charlemagne couronné Empereur d'Occident par Léon III le 25 décembre. Naissance de l'Europe carolingienne.",   cat:'politique',img:I.charlemagne},
  {id:25, year:987,    title:'Hugues Capet roi de France',   wiki:'Hugues Capet',                       desc:"Hugues Capet fonde la dynastie capétienne qui régnera 341 ans. Début de la France moderne.",                  cat:'politique',img:''},
  {id:26, year:1054,   title:'Grand Schisme d\'Orient',      wiki:'Grand Schisme de 1054',              desc:"Séparation de l'Église catholique romaine et de l'Église orthodoxe. Rupture qui dure encore.",                 cat:'autre',    img:''},
  {id:27, year:1066,   month:10, day:14, title:'Conquête normande de l\'Angleterre',wiki:'Conquête normande de l\'Angleterre',desc:"Guillaume bat Harold II à Hastings le 14 octobre et devient roi d'Angleterre.",        cat:'guerre',   img:''},
  {id:28, year:1095,   yearEnd:1099, title:'Première Croisade',wiki:'Première croisade',               desc:"Appel du pape Urbain II à Clermont. Les croisés prennent Jérusalem le 15 juillet 1099.",                      cat:'guerre',   img:''},
  {id:29, year:1163,   yearEnd:1345, title:'Cathédrale Notre-Dame de Paris',wiki:'Cathédrale Notre-Dame de Paris',desc:"Construction de la cathédrale gothique sur l'île de la Cité. Chef-d'œuvre médiéval français.",     cat:'art',      img:I.notre_dame},
  {id:30, year:1206,   yearEnd:1227, title:'Empire mongol — Gengis Khan',wiki:'Empire mongol',         desc:"Gengis Khan unifie les tribus mongoles. Plus grand empire terrestre contigu de l'histoire.",                   cat:'guerre',   img:''},
  {id:31, year:1215,   month:6, day:15, title:'Magna Carta',  wiki:'Magna Carta',                      desc:"Jean sans Terre signe la Grande Charte le 15 juin. Premières bases de l'État de droit en Angleterre.",        cat:'politique',img:''},
  {id:32, year:1271,   yearEnd:1295, title:'Voyages de Marco Polo',wiki:'Marco Polo',                   desc:"Le Vénitien voyage jusqu'en Chine et séjourne chez Kubilaï Khan. Son récit ouvre l'Orient aux Européens.",    cat:'autre',    img:''},
  {id:33, year:1337,   yearEnd:1453, title:'Guerre de Cent Ans',wiki:'Guerre de Cent Ans',              desc:"Conflit franco-anglais pour la couronne de France. Jeanne d'Arc y renversera le cours de l'histoire.",         cat:'guerre',   img:I.jeanne},
  {id:34, year:1347,   yearEnd:1353, title:'La Peste Noire',  wiki:'Peste noire',                       desc:"Pandémie de peste bubonique. Tue entre un tiers et la moitié de la population européenne.",                   cat:'autre',    img:''},
  {id:35, year:1429,   month:5, day:8, title:'Jeanne d\'Arc libère Orléans',wiki:'Jeanne d\'Arc',      desc:"La Pucelle d'Orléans lève le siège de la ville le 8 mai 1429. Tournant de la Guerre de Cent Ans.",             cat:'guerre',   img:I.jeanne},
  {id:36, year:1431,   month:5, day:30, title:'Jeanne d\'Arc brûlée à Rouen',wiki:'Procès de Jeanne d\'Arc',desc:"Condamnée par un tribunal pro-anglais, Jeanne est brûlée vive le 30 mai 1431 à Rouen.",                 cat:'guerre',   img:I.jeanne},
  {id:37, year:1453,   month:5, day:29, title:'Chute de Constantinople',wiki:'Chute de Constantinople', desc:"Mehmed II prend Constantinople le 29 mai 1453. Fin de Byzance, début de l'ère ottomane.",                    cat:'guerre',   img:''},
  /* ÉPOQUE MODERNE */
  {id:38, year:1440,   yearEnd:1450, title:'Gutenberg & l\'imprimerie',wiki:'Johannes Gutenberg',       desc:"La presse à caractères mobiles révolutionne la diffusion du savoir. La Bible de Gutenberg est le premier livre imprimé.", cat:'science', img:I.gutenberg},
  {id:39, year:1492,   month:10, day:12, title:'Christophe Colomb',wiki:'Christophe Colomb',            desc:"Colomb atteint les Bahamas le 12 octobre 1492. L'Amérique entre dans l'histoire européenne.",                cat:'politique',img:I.columbus_s},
  {id:40, year:1498,   title:'Vasco de Gama aux Indes',      wiki:'Vasco de Gama',                      desc:"Vasco de Gama contourne l'Afrique et atteint l'Inde. La route maritime des épices est ouverte.",               cat:'politique',img:''},
  {id:41, year:1503,   yearEnd:1506, title:'La Joconde',      wiki:'La Joconde',                         desc:"Léonard de Vinci peint Mona Lisa. Aujourd'hui le tableau le plus célèbre du monde, au Louvre.",               cat:'art',      img:I.joconde},
  {id:42, year:1508,   yearEnd:1512, title:'Chapelle Sixtine',wiki:'Chapelle Sixtine',                   desc:"Michel-Ange peint le plafond pour le pape Jules II. La Création d'Adam en est l'image emblématique.",         cat:'art',      img:I.sixtine},
  {id:43, year:1515,   month:9, day:13, title:'Victoire de Marignan',wiki:'Bataille de Marignan',       desc:"François Ier bat les Suisses le 13-14 septembre. Victoire brillante qui ouvre l'ère de la Renaissance française.", cat:'guerre',  img:''},
  {id:44, year:1517,   month:10, day:31, title:'Réforme protestante — Luther',wiki:'Réforme protestante',desc:"Luther affiche ses 95 thèses le 31 octobre 1517. La chrétienté se divise entre catholiques et protestants.",  cat:'politique',img:I.luther},
  {id:45, year:1519,   yearEnd:1522, title:'Tour du monde de Magellan',wiki:'Expédition Magellan-Elcano',desc:"Magellan et Elcano accomplissent le premier tour du monde complet. La Terre est définitivement ronde.",       cat:'science',  img:''},
  {id:46, year:1543,   title:'Copernic : héliocentrisme',    wiki:'Nicolas Copernic',                    desc:"Copernic publie sa théorie : la Terre tourne autour du Soleil. Révolution scientifique.",                      cat:'science',  img:''},
  {id:47, year:1572,   month:8, day:24, title:'Nuit de la Saint-Barthélemy',wiki:'Massacre de la Saint-Barthélemy',desc:"Milliers de protestants massacrés à Paris le 24 août. Paroxysme des guerres de Religion.",             cat:'guerre',   img:''},
  {id:48, year:1598,   month:4, day:13, title:'Édit de Nantes',wiki:'Édit de Nantes',                   desc:"Henri IV accorde la liberté de culte aux protestants le 13 avril. Fin des guerres de Religion.",              cat:'politique',img:''},
  {id:49, year:1600,   yearEnd:1616, title:'Shakespeare',     wiki:'William Shakespeare',                desc:"L'auteur de Hamlet, Othello, Roméo et Juliette. La plus grande plume de langue anglaise.",                    cat:'art',      img:I.shakespeare},
  {id:50, year:1610,   month:5, day:14, title:'Assassinat d\'Henri IV',wiki:'Henri IV (roi de France)', desc:"Henri IV poignardé par Ravaillac le 14 mai 1610 rue de la Ferronnerie à Paris. Le Bon Roi est pleuré.",       cat:'politique',img:''},
  {id:51, year:1643,   yearEnd:1715, title:'Règne de Louis XIV',wiki:'Louis XIV',                        desc:"Le Roi-Soleil règne 72 ans. Versailles, absolutisme, expansion, rayonnement culturel sans précédent.",         cat:'politique',img:I.louisxiv},
  {id:52, year:1661,   yearEnd:1710, title:'Château de Versailles',wiki:'Château de Versailles',         desc:"Louis XIV transforme le pavillon de chasse en palais monumental. Symbole de l'absolutisme français.",          cat:'art',      img:I.versailles},
  {id:53, year:1687,   title:'Principia de Newton',          wiki:'Philosophiae Naturalis Principia Mathematica',desc:"Newton publie ses lois de la gravitation universelle. L'une des œuvres les plus importantes des sciences.", cat:'science', img:I.newton},
  {id:54, year:1751,   yearEnd:1772, title:'L\'Encyclopédie',wiki:'Encyclopédie ou Dictionnaire raisonné des sciences',desc:"Diderot et d'Alembert publient 28 volumes. Synthèse des Lumières françaises.",                 cat:'art',      img:''},
  {id:55, year:1759,   title:'Candide de Voltaire',          wiki:'Candide',                             desc:"Chef-d'œuvre des Lumières. Voltaire dénonce la guerre, le fanatisme et l'injustice sociale.",                 cat:'art',      img:''},
  {id:56, year:1776,   month:7, day:4, title:'Indépendance américaine',wiki:'Déclaration d\'indépendance des États-Unis',desc:"Déclaration d'indépendance signée le 4 juillet 1776. « Tous les hommes sont créés égaux. »", cat:'politique',img:I.amerindep},
  /* XIXe */
  {id:57, year:1789,   month:7, day:14, title:'Prise de la Bastille',wiki:'Prise de la Bastille',        desc:"Le peuple prend la Bastille le 14 juillet 1789. Début de la Révolution française.",                          cat:'politique',img:I.bastille},
  {id:58, year:1789,   yearEnd:1799, title:'Révolution française',wiki:'Révolution française',            desc:"De la Déclaration des droits de l'homme à la Terreur et au Directoire. La monarchie est abolie.",             cat:'politique',img:I.revfr},
  {id:59, year:1793,   month:1, day:21, title:'Exécution de Louis XVI',wiki:'Louis XVI',                 desc:"Louis XVI guillotiné le 21 janvier 1793. La monarchie française prend fin pour la première fois.",             cat:'politique',img:''},
  {id:60, year:1799,   yearEnd:1815, title:'Empire napoléonien',wiki:'Napoléon Ier',                      desc:"Napoléon se couronne Empereur. Code civil, réorganisation de l'Europe. Vaincu à Waterloo en 1815.",            cat:'politique',img:I.napoleon},
  {id:61, year:1804,   yearEnd:1827, title:'Beethoven — Symphonies',wiki:'Ludwig van Beethoven',          desc:"Sourd depuis 1814, Beethoven compose ses neuf symphonies dont la 9e (Ode à la Joie), futur hymne européen.",    cat:'art',      img:I.beethoven},
  {id:62, year:1812,   title:'Retraite de Russie',           wiki:'Campagne de Russie',                   desc:"La Grande Armée envahit la Russie mais recule dévastée par l'hiver russe. 400 000 soldats meurent.",          cat:'guerre',   img:''},
  {id:63, year:1815,   month:6, day:18, title:'Bataille de Waterloo',wiki:'Bataille de Waterloo',         desc:"Napoléon vaincu par Wellington et Blücher le 18 juin 1815 en Belgique. Exil définitif à Sainte-Hélène.",     cat:'guerre',   img:I.waterloon},
  {id:64, year:1830,   month:7, day:27, yearEnd:1830, monthEnd:7, dayEnd:29, title:'Révolution de Juillet',wiki:'Révolution de Juillet',desc:"Les Trois Glorieuses (27-29 juillet) renversent Charles X. Louis-Philippe devient roi.", cat:'politique',img:''},
  {id:65, year:1848,   title:'Manifeste communiste',         wiki:'Manifeste du Parti communiste',        desc:"Marx et Engels : « Prolétaires de tous les pays, unissez-vous ! » Texte fondateur du socialisme.",             cat:'politique',img:I.marx},
  {id:66, year:1848,   title:'Printemps des Peuples',        wiki:'Printemps des peuples',                desc:"Vague révolutionnaire en Europe : France, Autriche, Prusse, Italie. Réclament des constitutions.",             cat:'politique',img:''},
  {id:67, year:1859,   month:11, day:24, title:'Darwin — L\'Origine des espèces',wiki:'De l\'origine des espèces',desc:"Darwin publie sa théorie de l'évolution le 24 novembre. Révolution dans la biologie.",              cat:'science',  img:I.darwin},
  {id:68, year:1861,   yearEnd:1865, title:'Guerre de Sécession',wiki:'Guerre de Sécession',              desc:"La victoire du Nord permet l'abolition de l'esclavage (13e amendement). 620 000 morts.",                     cat:'guerre',   img:''},
  {id:69, year:1862,   title:'Les Misérables de Victor Hugo', wiki:'Les Misérables',                      desc:"Hugo publie son roman-fleuve sur la misère sociale. Jean Valjean entre dans la légende mondiale.",             cat:'art',      img:I.hugo},
  {id:70, year:1869,   month:11, day:17, title:'Canal de Suez inauguré',wiki:'Canal de Suez',             desc:"Le canal est inauguré le 17 novembre 1869. Le trajet Europe-Asie est réduit de 7 000 km.",                   cat:'autre',    img:''},
  {id:71, year:1870,   yearEnd:1871, title:'Guerre franco-prussienne',wiki:'Guerre franco-prussienne de 1870',desc:"La France est vaincue. L'Alsace-Lorraine annexée. Naissance de la IIIe République.",                    cat:'guerre',   img:''},
  {id:72, year:1874,   yearEnd:1886, title:'Impressionnisme',  wiki:'Impressionnisme',                    desc:"Monet, Renoir, Pissarro, Degas révolutionnent la peinture. « Impression, Soleil levant » donne son nom au mouvement.", cat:'art', img:I.monet_imp},
  {id:73, year:1876,   title:'Invention du téléphone',        wiki:'Alexander Graham Bell',               desc:"Bell invente le téléphone le 10 mars 1876. La communication à distance entre dans une nouvelle ère.",          cat:'science',  img:''},
  {id:74, year:1878,   yearEnd:1895, title:'Louis Pasteur & microbiologie',wiki:'Louis Pasteur',          desc:"Pasteur prouve la théorie germinale. Vaccin contre la rage (1885). Révolution médicale mondiale.",              cat:'science',  img:I.pasteur},
  {id:75, year:1885,   title:'Première automobile — Benz',    wiki:'Karl Benz',                           desc:"Karl Benz construit la Motorwagen. Première automobile à moteur à essence, 16 km/h.",                        cat:'science',  img:''},
  {id:76, year:1889,   month:3, day:31, title:'Tour Eiffel inaugurée',wiki:'Tour Eiffel',                 desc:"La Tour Eiffel est inaugurée le 31 mars 1889 pour l'Exposition universelle de Paris. Symbole éternel.",        cat:'art',      img:I.toureiffel},
  {id:77, year:1895,   month:12, day:28, title:'Cinéma des frères Lumière',wiki:'Frères Lumière',          desc:"Première projection publique du cinématographe le 28 décembre au Grand Café à Paris. Naissance du 7e art.",  cat:'art',      img:I.lumiere},
  {id:78, year:1896,   title:'Jeux Olympiques modernes',       wiki:'Jeux olympiques d\'été de 1896',     desc:"Pierre de Coubertin organise les premiers JO modernes à Athènes. 14 nations, 241 athlètes.",                  cat:'autre',    img:''},
  /* XXe */
  {id:79, year:1903,   month:12, day:17, title:'Premier vol motorisé',wiki:'Frères Wright',               desc:"Orville Wright vole 12 secondes le 17 décembre à Kitty Hawk. L'aviation est née.",                           cat:'science',  img:I.wright},
  {id:80, year:1905,   title:'Relativité d\'Einstein',         wiki:'Théorie de la relativité restreinte',desc:"Einstein publie E=mc² à 26 ans. Révolution de la physique : espace et temps sont liés.",                     cat:'science',  img:I.einstein},
  {id:81, year:1905,   month:12, day:9, title:'Loi de séparation Église-État',wiki:'Loi de séparation des Églises et de l\'État',desc:"La France vote la laïcité le 9 décembre 1905. L'État ne reconnaît plus aucun culte.", cat:'politique',img:''},
  {id:82, year:1912,   month:4, day:15, title:'Naufrage du Titanic',wiki:'Titanic',                       desc:"Le Titanic coule le 15 avril 1912 dans l'Atlantique nord lors de son voyage inaugural. 1 514 victimes.",      cat:'autre',    img:I.titanic},
  {id:83, year:1914,   month:6, day:28, yearEnd:1918, monthEnd:11, dayEnd:11, title:'Première Guerre mondiale',wiki:'Première Guerre mondiale',desc:"Du 28 juin 1914 à l'armistice du 11 novembre 1918. 18 à 20 millions de morts.", cat:'guerre', img:I.ww1},
  {id:84, year:1916,   month:2, day:21, yearEnd:1916, monthEnd:12, dayEnd:18, title:'Bataille de Verdun',wiki:'Bataille de Verdun',desc:"Du 21 février au 18 décembre 1916. 300 000 morts. Symbole absolu de l'horreur des tranchées.", cat:'guerre', img:I.verdun},
  {id:85, year:1917,   month:11, day:7, title:'Révolution russe d\'Octobre',wiki:'Révolution russe',      desc:"Les bolchéviques prennent le pouvoir le 7 novembre (25 oct. v.s.). Naissance de l'URSS.",                     cat:'politique',img:''},
  {id:86, year:1918,   month:11, day:11, title:'Armistice — 11 novembre 1918',wiki:'Armistice du 11 novembre 1918',desc:"L'armistice est signé à 11h le 11 novembre dans la forêt de Compiègne. Fin de la WW1.",              cat:'guerre',   img:''},
  {id:87, year:1919,   month:6, day:28, title:'Traité de Versailles',wiki:'Traité de Versailles',          desc:"Traité signé le 28 juin 1919. L'Alsace-Lorraine revient à la France. Les clauses humilientes sèment les germes de la WW2.", cat:'politique', img:''},
  {id:88, year:1929,   month:10, day:24, yearEnd:1932, title:'Grande Dépression',wiki:'Grande Dépression', desc:"Krach boursier du 24 octobre (Jeudi Noir). Pire crise économique mondiale du XXe siècle.",                   cat:'autre',    img:''},
  {id:89, year:1933,   yearEnd:1945, title:'Régime nazi',      wiki:'Adolf Hitler',                        desc:"Hitler prend le pouvoir le 30 janvier 1933. Le nazisme mène à la Shoah et à la Seconde Guerre mondiale.",    cat:'guerre',   img:''},
  {id:90, year:1936,   yearEnd:1938, title:'Front Populaire',  wiki:'Front populaire (France)',            desc:"Léon Blum instaure les congés payés et la semaine de 40h. Victoire historique de la gauche française.",      cat:'politique',img:''},
  {id:91, year:1939,   month:9, day:1, yearEnd:1945, monthEnd:9, dayEnd:2, title:'Seconde Guerre mondiale',wiki:'Seconde Guerre mondiale',desc:"Du 1er septembre 1939 au 2 septembre 1945. 70-85 millions de morts, Shoah, bombes atomiques.", cat:'guerre', img:I.dday},
  {id:92, year:1940,   month:6, day:18, title:'Appel du 18 juin',wiki:'Appel du 18 juin',                 desc:"De Gaulle lance son appel depuis la BBC le 18 juin 1940. Naissance de la France Libre.",                      cat:'politique',img:I.degaulle},
  {id:93, year:1944,   month:6, day:6, title:'Débarquement en Normandie — D-Day',wiki:'Débarquement en Normandie',desc:"Le 6 juin 1944, 150 000 soldats alliés débarquent sur les plages normandes. Tournant de la guerre.", cat:'guerre',   img:I.dday},
  {id:94, year:1944,   month:4, day:21, title:'Droit de vote des femmes en France',wiki:'Droit de vote des femmes en France',desc:"L'ordonnance du 21 avril 1944 accorde le droit de vote aux femmes françaises.",             cat:'politique',img:''},
  {id:95, year:1945,   month:8, day:6, title:'Bombe atomique sur Hiroshima',wiki:'Bombardements atomiques d\'Hiroshima et Nagasaki',desc:"La bombe atomique est larguée sur Hiroshima le 6 août 1945. 80 000 morts instantanément.", cat:'guerre', img:I.hiroshima},
  {id:96, year:1945,   month:6, day:26, title:'Création de l\'ONU',wiki:'Organisation des Nations unies', desc:"L'ONU est fondée le 26 juin 1945 à San Francisco pour maintenir la paix mondiale.",                          cat:'politique',img:''},
  {id:97, year:1947,   month:8, day:15, title:'Indépendance de l\'Inde',wiki:'Indépendance de l\'Inde',    desc:"L'Inde accède à l'indépendance le 15 août 1947. Fin de deux siècles de colonisation britannique.",            cat:'politique',img:I.gandhi},
  {id:98, year:1948,   month:12, day:10, title:'Déclaration universelle des droits de l\'homme',wiki:'Déclaration universelle des droits de l\'homme',desc:"Adoptée le 10 décembre 1948. 30 articles proclamant les droits inaliénables de tout être humain.", cat:'politique',img:''},
  {id:99, year:1948,   month:5, day:14, title:'Création de l\'État d\'Israël',wiki:'Déclaration d\'indépendance d\'Israël',desc:"Ben Gourion proclame l'État d'Israël le 14 mai 1948. Conflit israélo-arabe immédiat.",           cat:'politique',img:''},
  {id:100,year:1953,   month:4, day:25, title:'ADN — double hélice',wiki:'Acide désoxyribonucléique',      desc:"Watson et Crick publient la structure en double hélice le 25 avril 1953. Naissance de la biologie moléculaire.", cat:'science', img:I.genome},
  {id:101,year:1954,   yearEnd:1962, title:'Guerre d\'Algérie',wiki:'Guerre d\'Algérie',                   desc:"De 1954 à 1962. Fin par les accords d'Évian. L'Algérie indépendante le 5 juillet 1962.",                      cat:'guerre',   img:''},
  {id:102,year:1957,   month:3, day:25, title:'Traité de Rome — CEE',wiki:'Traité de Rome (1957)',         desc:"Signature le 25 mars 1957. Fondation de la CEE, ancêtre de l'Union européenne.",                              cat:'politique',img:''},
  {id:103,year:1957,   month:10, day:4, title:'Spoutnik dans l\'espace',wiki:'Spoutnik 1',                 desc:"L'URSS lance Spoutnik 1 le 4 octobre 1957. Premier satellite artificiel. Début de la conquête spatiale.",     cat:'science',  img:I.sputnik},
  {id:104,year:1961,   yearEnd:1989, title:'Mur de Berlin',    wiki:'Mur de Berlin',                       desc:"Construit le 13 août 1961. Symbole de la Guerre froide. Il tombera le 9 novembre 1989.",                    cat:'politique',img:I.berlin},
  {id:105,year:1963,   month:8, day:28, title:'Discours « I Have a Dream »',wiki:'I Have a Dream',         desc:"Martin Luther King prononce son discours historique à Washington le 28 août 1963.",                          cat:'politique',img:''},
  {id:106,year:1963,   month:11, day:22, title:'Assassinat de JFK',wiki:'Assassinat de John F. Kennedy',   desc:"Kennedy assassiné à Dallas le 22 novembre 1963. L'Amérique bascule dans une ère de doute.",                  cat:'politique',img:''},
  {id:107,year:1968,   title:'Mai 68 en France',              wiki:'Mai 68',                               desc:"Étudiants et ouvriers paralysent la France en mai. Profonde transformation de la société.",                  cat:'politique',img:''},
  {id:108,year:1969,   month:7, day:21, title:'Premiers pas sur la Lune',wiki:'Apollo 11',                 desc:"Neil Armstrong marche sur la Lune le 21 juillet à 02h56 UTC. 600 millions de téléspectateurs.",               cat:'science',  img:I.lune},
  {id:109,year:1975,   yearEnd:1994, title:'Nelson Mandela & apartheid',wiki:'Nelson Mandela',              desc:"Libéré en 1990 après 27 ans de prison. Président d'Afrique du Sud en 1994. Fin de l'apartheid.",              cat:'politique',img:I.mandela},
  {id:110,year:1976,   yearEnd:2003, title:'Concorde en service',wiki:'Concorde',                          desc:"L'avion supersonique franco-britannique relie Paris à New York en 3h30. Retrait en 2003.",                    cat:'science',  img:I.concorde},
  {id:111,year:1977,   month:1, day:31, title:'Centre Pompidou inauguré',wiki:'Centre Georges-Pompidou',   desc:"Le musée d'art moderne au design révolutionnaire (Piano & Rogers) ouvre le 31 janvier 1977 à Paris.",         cat:'art',      img:I.pompidou_c},
  {id:112,year:1981,   month:10, day:9, title:'Abolition de la peine de mort en France',wiki:'Abolition de la peine de mort en France',desc:"Vote de la loi Badinter le 9 octobre 1981. La guillotine est abolie.",          cat:'politique',img:''},
  {id:113,year:1981,   yearEnd:1995, title:'François Mitterrand Président',wiki:'François Mitterrand',     desc:"Premier président socialiste de la Ve République. Abolition de la peine de mort, décentralisation, Tunnel.",   cat:'politique',img:I.mitterrand},
  {id:114,year:1984,   month:1, day:24, title:'Apple Macintosh',wiki:'Apple Macintosh',                    desc:"Apple lance le Mac le 24 janvier. Souris et interface graphique entrent dans les foyers du monde entier.",     cat:'science',  img:''},
  {id:115,year:1986,   month:4, day:26, title:'Tchernobyl',    wiki:'Catastrophe de Tchernobyl',           desc:"Le réacteur n°4 explose le 26 avril 1986 en Ukraine. La plus grave catastrophe nucléaire civile.",             cat:'autre',    img:I.tchernobyl},
  {id:116,year:1989,   month:11, day:9, title:'Chute du mur de Berlin',wiki:'Chute du mur de Berlin',      desc:"Le mur de Berlin tombe le 9 novembre 1989. Symbole de la fin de la Guerre froide et de la réunification.",   cat:'politique',img:I.berlin},
  {id:117,year:1989,   month:6, day:5, title:'Tiananmen — l\'Homme de la Place',wiki:'Manifestations de la place Tian\'anmen',desc:"Le 5 juin 1989, un homme inconnu arrête seul une colonne de chars à Pékin.",              cat:'politique',img:''},
  {id:118,year:1991,   month:12, day:25, title:'Dissolution de l\'URSS',wiki:'Dissolution de l\'Union soviétique',desc:"Gorbatchev démissionne le 25 décembre 1991. L'URSS se dissout en 15 États.",                        cat:'politique',img:''},
  {id:119,year:1991,   month:12, day:20, title:'Naissance du World Wide Web',wiki:'World Wide Web',         desc:"Tim Berners-Lee publie le premier site web le 20 décembre au CERN à Genève. L'internet public est né.",       cat:'science',  img:I.internet},
  {id:120,year:1994,   month:5, day:6, title:'Tunnel sous la Manche',wiki:'Tunnel sous la Manche',          desc:"Le tunnel ouvre le 6 mai 1994. Paris-Londres en 2h15. Exploit d'ingénierie franco-britannique.",              cat:'science',  img:I.tunnel_mc},
  {id:121,year:1994,   month:4, day:7, yearEnd:1994, monthEnd:7, title:'Génocide au Rwanda',wiki:'Génocide des Tutsis au Rwanda',desc:"Du 7 avril au 17 juillet 1994. 800 000 Tutsis massacrés en 100 jours.",               cat:'guerre',   img:''},
  /* XXIe */
  {id:122,year:2001,   month:9, day:11, title:'Attentats du 11 septembre',wiki:'Attentats du 11 septembre 2001',desc:"Al-Qaïda attaque les tours du WTC le 11 septembre 2001. 2977 morts. Le monde change pour toujours.",   cat:'guerre',   img:I.sept11},
  {id:123,year:2002,   month:1, day:1,  title:'Introduction de l\'euro',wiki:'Euro',                        desc:"L'euro remplace 12 monnaies nationales le 1er janvier 2002 dont le franc français.",                        cat:'politique',img:''},
  {id:124,year:2003,   title:'Séquençage du génome humain',   wiki:'Projet Génome humain',                  desc:"Le Projet Génome humain annonce la complétion du séquençage de l'ADN humain. Révolution médicale.",           cat:'science',  img:I.genome},
  {id:125,year:2004,   month:2, day:4, title:'Naissance de Facebook',wiki:'Facebook',                       desc:"Zuckerberg lance Facebook depuis Harvard le 4 février 2004. 3 milliards d'utilisateurs en 2024.",            cat:'science',  img:I.facebook_l},
  {id:126,year:2007,   month:1, day:9, title:'Premier iPhone',wiki:'iPhone',                                desc:"Steve Jobs présente l'iPhone le 9 janvier 2007. Le smartphone révolutionne nos vies.",                      cat:'science',  img:I.iphone},
  {id:127,year:2008,   month:9, day:15, yearEnd:2009, title:'Crise financière mondiale',wiki:'Crise financière de 2007-2008',desc:"Faillite de Lehman Brothers le 15 septembre 2008. Pire crise depuis 1929.",              cat:'autre',    img:''},
  {id:128,year:2010,   yearEnd:2012, title:'Printemps arabe',  wiki:'Printemps arabe',                      desc:"Soulèvements en Tunisie (déc. 2010), Égypte, Libye. Des régimes autoritaires chutent.",                     cat:'politique',img:''},
  {id:129,year:2015,   month:1, day:7, title:'Attentat Charlie Hebdo',wiki:'Attentat contre Charlie Hebdo', desc:"12 morts à la rédaction de Charlie Hebdo le 7 janvier 2015. La France est sous le choc.",                  cat:'guerre',   img:''},
  {id:130,year:2015,   month:11, day:13, title:'Attentats du 13 novembre',wiki:'Attentats du 13 novembre 2015 en France',desc:"130 morts au Bataclan et sur les terrasses parisiennes le 13 novembre.",               cat:'guerre',   img:''},
  {id:131,year:2015,   month:12, day:12, title:'Accord de Paris sur le climat',wiki:'Accord de Paris',      desc:"195 pays s'engagent à limiter le réchauffement à 2°C. Signé le 12 décembre à la COP21 à Paris.",           cat:'autre',    img:''},
  {id:132,year:2017,   month:5, day:7, title:'Élection d\'Emmanuel Macron',wiki:'Emmanuel Macron',          desc:"Macron élu Président le 7 mai 2017 à 39 ans. Le plus jeune président de la Ve République.",                 cat:'politique',img:I.macron},
  {id:133,year:2018,   month:7, day:15, title:'France championne du monde de foot',wiki:'Coupe du monde de football 2018',desc:"La France bat la Croatie 4-2 en finale à Moscou le 15 juillet 2018. 2e titre mondial.",  cat:'autre',    img:''},
  {id:134,year:2019,   month:4, day:15, title:'Incendie de Notre-Dame de Paris',wiki:'Incendie de Notre-Dame de Paris',desc:"La cathédrale est ravagée par les flammes le 15 avril 2019. La flèche s'effondre.",            cat:'art',      img:I.notre_dame_i},
  {id:135,year:2019,   month:12, yearEnd:2022, title:'Pandémie de Covid-19',wiki:'Pandémie de Covid-19',    desc:"Apparu à Wuhan fin 2019. Pandémie mondiale, confinements, vaccins en un an. 7 millions de morts officiels.", cat:'autre',    img:I.covid},
  {id:136,year:2022,   month:2, day:24, title:'Invasion russe de l\'Ukraine',wiki:'Invasion de l\'Ukraine par la Russie',desc:"La Russie envahit l'Ukraine le 24 février 2022. Plus grand conflit en Europe depuis 1945.", cat:'guerre',   img:I.ukraine_f},
  {id:137,year:2023,   title:'Essor de l\'IA générative',     wiki:'Intelligence artificielle générative',   desc:"ChatGPT, Claude, Gemini révolutionnent le monde. L'IA transforme création, éducation et travail.",           cat:'science',  img:''},
  {id:138,year:2024,   month:7, day:26, yearEnd:2024, monthEnd:8, dayEnd:11, title:'JO de Paris 2024',wiki:'Jeux olympiques d\'été de 2024',desc:"Paris accueille les JO du 26 juillet au 11 août 2024. 16 médailles d'or pour la France. Cérémonie sur la Seine mémorable.", cat:'autre', img:I.jo2024},
  {id:139,year:2024,   month:12, day:7, title:'Réouverture de Notre-Dame',wiki:'Reconstruction de Notre-Dame de Paris',desc:"Notre-Dame rouvre le 7 décembre 2024 après 5 ans de travaux spectaculaires.",                 cat:'art',      img:I.notre_dame},
  /* Événements mondiaux supplémentaires */
  {id:140,year:1945,   month:8, day:9, title:'Bombe atomique sur Nagasaki',wiki:'Bombardement atomique de Nagasaki',desc:"Deuxième bombe atomique larguée sur Nagasaki le 9 août 1945. 40 000 morts instantanément.",        cat:'guerre',   img:I.hiroshima},
  {id:141,year:1969,   month:8, day:15, yearEnd:1969, monthEnd:8, dayEnd:18, title:'Festival de Woodstock',wiki:'Festival de Woodstock',desc:"Du 15 au 18 août 1969. 400 000 personnes. Symbole de la contre-culture hippie.", cat:'art',     img:''},
  {id:142,year:1955,   month:12, day:1, title:'Rosa Parks refuse de céder sa place',wiki:'Rosa Parks',      desc:"Rosa Parks refuse de se lever pour un Blanc dans un bus à Montgomery le 1er décembre 1955. Symbole du mouvement des droits civiques.", cat:'politique',img:''},
  {id:143,year:1961,   month:4, day:12, title:'Youri Gagarine dans l\'espace',wiki:'Youri Gagarine',        desc:"Le 12 avril 1961, Gagarine est le premier humain à voyager dans l'espace. Son vol dure 108 minutes.",       cat:'science',  img:''},
  {id:144,year:1967,   month:12, day:3, title:'Première transplantation cardiaque',wiki:'Transplantation cardiaque',desc:"Christian Barnard réalise la première transplantation cardiaque le 3 décembre 1967 à Cape Town.",      cat:'science',  img:''},
  {id:145,year:1970,   month:4, day:22, title:'Premier Jour de la Terre',      wiki:'Jour de la Terre',     desc:"Le 22 avril 1970, 20 millions d'Américains manifestent pour l'environnement. Naissance de l'écologie moderne.", cat:'autre',   img:''},
  {id:146,year:1981,   month:6, day:5, title:'Découverte du SIDA',             wiki:'Syndrome d\'immunodéficience acquise',desc:"Les CDC publient le 5 juin 1981 les premiers cas de ce qui deviendra le SIDA. 40 millions de morts.", cat:'science', img:''},
  {id:147,year:1990,   month:4, day:24, title:'Lancement du télescope Hubble', wiki:'Télescope spatial Hubble',desc:"Hubble est lancé le 24 avril 1990. Il révolutionnera notre vision de l'univers pendant plus de 30 ans.",  cat:'science',  img:''},
  {id:148,year:1997,   month:7, day:1, title:'Rétrocession de Hong Kong',      wiki:'Rétrocession de Hong Kong',desc:"Le Royaume-Uni restitue Hong Kong à la Chine le 1er juillet 1997 après 156 ans de colonisation.",        cat:'politique',img:''},
  {id:149,year:2003,   month:3, day:20, title:'Guerre en Irak',                wiki:'Invasion de l\'Irak en 2003',desc:"Les États-Unis et le Royaume-Uni envahissent l'Irak le 20 mars 2003. Saddam Hussein est renversé.",      cat:'guerre',   img:''},
  {id:150,year:2008,   month:11, day:4, title:'Élection de Barack Obama',      wiki:'Barack Obama',         desc:"Barack Obama devient le 44e président des États-Unis le 4 novembre 2008. Premier président afro-américain.",cat:'politique',img:''},
  {id:151,year:2016,   month:6, day:23, title:'Brexit — le Royaume-Uni quitte l\'UE',wiki:'Brexit',          desc:"Le 23 juin 2016, le Royaume-Uni vote pour quitter l'Union européenne à 51,9%. Choc politique majeur.",       cat:'politique',img:''},
  {id:152,year:2018,   title:'Mouvement #MeToo mondial',      wiki:'Mouvement #MeToo',                       desc:"Le mouvement #MeToo né en 2017 devient mondial en 2018. Libération de la parole sur les violences sexuelles.", cat:'autre',  img:''},
  {id:153,year:2022,   month:12, day:18, title:'Argentine championne du monde', wiki:'Coupe du monde de football 2022',desc:"L'Argentine bat la France aux tirs au but le 18 décembre 2022 à Doha. Dernier titre de Messi.",       cat:'autre',    img:''},
  {id:154,year:2023,   month:2, day:6, title:'Séisme en Turquie et Syrie',     wiki:'Séismes du 6 février 2023 en Turquie et en Syrie',desc:"Tremblement de terre de magnitude 7,8 le 6 février 2023. 50 000 morts.",               cat:'autre',    img:''},
  {id:155,year:2020,   month:1, day:31, title:'Brexit effectif',               wiki:'Retrait du Royaume-Uni de l\'Union européenne',desc:"Le Royaume-Uni quitte officiellement l'UE le 31 janvier 2020 à 23h.",                   cat:'politique',img:''},
];

/* ── Storage ── */
const SK = 'frise_v8';
function loadEv(){
  try{ const s=localStorage.getItem(SK); return s?JSON.parse(s):DEFAULTS; }
  catch{ return DEFAULTS; }
}
function saveSt(){
  try{ localStorage.setItem(SK,JSON.stringify(events)); }catch(e){}
  // Firebase sync
  if(window.__firebaseSave) window.__firebaseSave(events);
}

let events=loadEv();
let nextId=Math.max(...events.map(e=>e.id),0)+1;

/* Merge depuis Firebase */
window.__mergeRemote = function(remote){
  let changed=false;
  remote.forEach(rev=>{
    const local=events.find(e=>e.id===rev.id);
    if(!local){events.push(rev);changed=true;}
    else if((rev.updatedAt||0)>(local.updatedAt||0)){
      Object.assign(local,rev);changed=true;
    }
  });
  if(changed){
    try{localStorage.setItem(SK,JSON.stringify(events));}catch(e){}
    nextId=Math.max(...events.map(e=>e.id),0)+1;
    render();buildEraStrip();
  }
};

/* ── State ── */
let scale=1,offsetX=0,svgW=900;
const H=340,AY=175;
let editId=null,activeId=null,highlightId=null;
let currentEra=null;
let dragging=false,dsx=0,dsox=0;
let hiddenCats=new Set();

const svgEl=document.getElementById('tl-svg');
const wrap=document.getElementById('tl-wrap');
const tipEl=document.getElementById('tip');
const cpop=document.getElementById('cpop');
const clList=document.getElementById('cluster-list');

/* ── Date helpers ── */
const MONTHS=['','Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
function fmtY(y){ return y<0?Math.abs(y)+' av. J.-C.':String(y); }
function fmtFull(ev){
  let s='';
  if(ev.day) s+=ev.day+' ';
  if(ev.month) s+=MONTHS[ev.month]+' ';
  s+=fmtY(ev.year);
  return s;
}
function fmtFullEnd(ev){
  if(!ev.yearEnd||ev.yearEnd===ev.year) return null;
  let s='';
  if(ev.dayEnd) s+=ev.dayEnd+' ';
  if(ev.monthEnd) s+=MONTHS[ev.monthEnd]+' ';
  s+=fmtY(ev.yearEnd);
  return s;
}
function midY(ev){ return (ev.yearEnd&&ev.yearEnd!==ev.year)?(ev.year+ev.yearEnd)/2:ev.year; }
function getWikiUrl(ev){ return 'https://fr.wikipedia.org/wiki/'+encodeURIComponent((ev.wiki||ev.title).replace(/ /g,'_')); }

/* ── Era strip ── */
function buildEraStrip(){
  const strip=document.getElementById('era-strip');
  strip.innerHTML=ERAS.map(era=>{
    const count=events.filter(e=>midY(e)>=era.from&&midY(e)<era.to&&!hiddenCats.has(e.cat)).length;
    const active=currentEra&&currentEra.key===era.key;
    const fromStr=era.from<0?Math.abs(era.from)+' av. J.-C.':era.from;
    const toStr=era.key==='xxi'||era.key==='all'?'Aujourd\'hui':(era.to<0?Math.abs(era.to)+' av. J.-C.':era.to);
    return `<div class="era-card${active?' active':''}${era.key==='all'?' era-all':''}" style="--era-color:${era.color}" onclick="selectEra('${era.key}')">
      <div class="ec-dot" style="background:${era.color}"></div>
      <div class="ec-name">${era.name}</div>
      <div class="ec-range">${fromStr} → ${toStr}</div>
      <div class="ec-count">${count} événement${count>1?'s':''}</div>
      <span class="ec-arrow">→</span>
    </div>`;
  }).join('');
}

function selectEra(key){
  currentEra=ERAS.find(e=>e.key===key);
  buildEraStrip();
  document.getElementById('era-hint').style.display='none';
  const outer=document.getElementById('tl-outer');
  outer.classList.add('show');
  document.getElementById('tl-dot').style.background=currentEra.color;
  const eraTo=currentEra.key==='xxi'||currentEra.key==='all'?TODAY_YEAR:currentEra.to;
  const toStr=currentEra.key==='xxi'||currentEra.key==='all'?'Aujourd\'hui':
    (eraTo<0?Math.abs(eraTo)+' av. J.-C.':eraTo);
  const fromStr=currentEra.from<0?Math.abs(currentEra.from)+' av. J.-C.':currentEra.from;
  document.getElementById('tl-era-name').textContent=currentEra.name+' ('+fromStr+' – '+toStr+')';
  setTimeout(resetView,60);
  outer.scrollIntoView({behavior:'smooth',block:'start'});
}

function closeEra(){
  currentEra=null;buildEraStrip();
  document.getElementById('tl-outer').classList.remove('show');
  document.getElementById('era-hint').style.display='block';
}

/* ── Era events ── */
function eraEvents(){
  if(!currentEra) return[];
  const eraTo=currentEra.key==='xxi'||currentEra.key==='all'?TODAY_YEAR+1:currentEra.to;
  return events.filter(e=>midY(e)>=currentEra.from&&midY(e)<eraTo&&!hiddenCats.has(e.cat));
}

/* ── Scale — frise LIMITÉE aux bornes de l'époque ── */
function eraTo(){ return currentEra.key==='xxi'||currentEra.key==='all'?TODAY_YEAR:currentEra.to; }
function getRange(){
  if(!currentEra) return{minY:0,maxY:TODAY_YEAR};
  const from=currentEra.from, to=eraTo();
  const pad=(to-from)*0.04;
  return{ minY:from-pad, maxY:to+pad };
}
function yearToX(y){ const{minY}=getRange(); return 80+(y-minY)*scale+offsetX; }
function defScale(){ const{minY,maxY}=getRange(); return Math.max(.001,(svgW-160)/(maxY-minY||1)); }
function resetView(){ scale=defScale();offsetX=0;render();updZoom(); }
function zoom(d){ scale*=d>0?1.5:1/1.5;render();updZoom(); }
function updZoom(){
  const p=Math.round(scale/defScale()*100)+'%';
  document.getElementById('zlbl').textContent=p;
  document.getElementById('zlbl2').textContent=p;
}
function tickIv(){
  const yv=svgW/scale;
  for(const iv of[1,2,5,10,25,50,100,200,500,1000,2000,5000,10000,50000,100000])
    if(svgW/(yv/iv)>75) return iv;
  return 100000;
}

/* ── Era gradient configs ── */
const ERA_BG={
  all:    {c1:'#8b5cf6',c2:'#06b6d4',c3:'#f03060'},
  prehist:{c1:'#e07820',c2:'#f59e0b',c3:'#b45309'},
  antiq:  {c1:'#d4a020',c2:'#f59e0b',c3:'#92400e'},
  moyen:  {c1:'#4f6ef7',c2:'#6366f1',c3:'#1d4ed8'},
  mod:    {c1:'#16c47a',c2:'#10b981',c3:'#047857'},
  contemp:{c1:'#f03060',c2:'#e11d48',c3:'#9f1239'},
  xx:     {c1:'#a855f7',c2:'#9333ea',c3:'#6d28d9'},
  xxi:    {c1:'#06b6d4',c2:'#0891b2',c3:'#155e75'},
};

/* ── Cluster — SEULEMENT si 3+ événements très proches, jamais 2 ── */
const MIN_DIST=72;
function clusterEvents(placed){
  const sorted=[...placed].sort((a,b)=>a.mx-b.mx);
  const clusters=[],used=new Set();
  for(let i=0;i<sorted.length;i++){
    if(used.has(i)) continue;
    const group=[sorted[i]];used.add(i);
    for(let j=i+1;j<sorted.length;j++){
      if(used.has(j)) continue;
      if(sorted[j].mx-sorted[i].mx<MIN_DIST){group.push(sorted[j]);used.add(j);}
    }
    // Ne regroupe QUE si 3+. Si 2, on les laisse individuels.
    if(group.length>=3) clusters.push(group);
    else group.forEach(ev=>clusters.push([ev]));
  }
  return clusters;
}

/* ── Render ── */
function render(){
  svgW=wrap.clientWidth||window.innerWidth-32;
  svgEl.setAttribute('width',svgW);
  svgEl.setAttribute('height',H);
  if(!currentEra){svgEl.innerHTML='';clearClusterOverlays();return;}

  const{minY,maxY}=getRange();
  const bg=ERA_BG[currentEra.key]||ERA_BG.xx;
  const iv=tickIv();
  const st=Math.ceil((minY-iv*2)/iv)*iv;
  const en=st+Math.ceil(svgW/scale/iv+4)*iv;
  let h='';

  /* Defs: gradients discrets et beaux */
  h+=`<defs>
    <linearGradient id="bg-v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".09"/>
      <stop offset="50%" stop-color="${bg.c2}" stop-opacity=".04"/>
      <stop offset="100%" stop-color="${bg.c1}" stop-opacity=".03"/>
    </linearGradient>
    <linearGradient id="bg-h" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".07"/>
      <stop offset="50%" stop-color="${bg.c2}" stop-opacity=".02"/>
      <stop offset="100%" stop-color="${bg.c3}" stop-opacity=".07"/>
    </linearGradient>
    <radialGradient id="bg-r1" cx="15%" cy="30%" r="45%">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".09"/>
      <stop offset="100%" stop-color="${bg.c1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bg-r2" cx="85%" cy="70%" r="45%">
      <stop offset="0%" stop-color="${bg.c3}" stop-opacity=".08"/>
      <stop offset="100%" stop-color="${bg.c3}" stop-opacity="0"/>
    </radialGradient>
  </defs>`;
  h+=`<rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bg-v)"/>`;
  h+=`<rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bg-h)"/>`;
  h+=`<rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bg-r1)"/>`;
  h+=`<rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bg-r2)"/>`;

  /* Grille verticale */
  for(let y=st;y<=en;y+=iv){
    const x=yearToX(y);if(x<-5||x>svgW+5) continue;
    h+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${bg.c1}" stroke-width=".4" opacity=".18"/>`;
  }

  /* Marqueur aujourd'hui (XXIe et Tout) */
  if(currentEra.key==='xxi'||currentEra.key==='all'){
    const todayX=yearToX(TODAY_YEAR);
    if(todayX>=10&&todayX<=svgW-10){
      h+=`<line x1="${todayX}" y1="0" x2="${todayX}" y2="${H}" stroke="${currentEra.color}" stroke-width="1.5" stroke-dasharray="4 4" opacity=".5"/>`;
      const lx=Math.min(todayX+4,svgW-78);
      h+=`<rect x="${lx}" y="6" width="70" height="18" rx="9" fill="${currentEra.color}" opacity=".15"/>`;
      h+=`<text x="${lx+35}" y="19" text-anchor="middle" font-size="9.5" fill="${currentEra.color}" font-family="'DM Sans',sans-serif" font-weight="500">Aujourd'hui</text>`;
    }
  }

  /* Axe */
  h+=`<line x1="0" y1="${AY}" x2="${svgW}" y2="${AY}" stroke="${currentEra.color}" stroke-width="2.5" opacity=".35"/>`;

  /* Ticks + labels */
  for(let y=st;y<=en;y+=iv){
    const x=yearToX(y);if(x<-5||x>svgW+5) continue;
    h+=`<circle cx="${x}" cy="${AY}" r="3.5" fill="${currentEra.color}" opacity=".5"/>`;
    const lbl=y<0?Math.abs(y)+' av.':y===0?'0':y;
    h+=`<text x="${x}" y="${AY+24}" text-anchor="middle" font-size="10" fill="var(--ink3)" font-family="'DM Sans',sans-serif">${lbl}</text>`;
  }

  /* Placement événements */
  const visible=eraEvents().sort((a,b)=>a.year-b.year);
  const raw=[]; const rowLastX={};
  visible.forEach((ev,i)=>{
    const mx=yearToX(midY(ev));
    const candidates=[];for(let r=1;r<=8;r++) candidates.push(-r,r);
    let row=i%2===0?-1:1;
    for(const r of candidates){if(!rowLastX[r]||mx-rowLastX[r]>100){row=r;break;}}
    rowLastX[row]=mx; raw.push({...ev,row,mx});
  });

  /* Barres de période */
  raw.forEach(ev=>{
    const isPeriod=ev.yearEnd&&ev.yearEnd!==ev.year; if(!isPeriod) return;
    const x1=Math.max(0,yearToX(ev.year)),x2=Math.min(svgW,yearToX(ev.yearEnd));
    if(x2<0||x1>svgW) return;
    const c=(CATS[ev.cat]||CATS.autre).c;
    const above=ev.row<0,depth=Math.abs(ev.row),stemLen=48+depth*36;
    const barY=above?AY-stemLen-10:AY+stemLen+4;
    h+=`<rect x="${x1}" y="${barY}" width="${Math.max(1,x2-x1)}" height="7" rx="3.5" fill="${c}" opacity=".18"/>`;
    if(x1>=0) h+=`<line x1="${x1}" y1="${AY}" x2="${x1}" y2="${barY+3}" stroke="${c}" stroke-width=".8" opacity=".3"/>`;
    if(x2<=svgW) h+=`<line x1="${x2}" y1="${AY}" x2="${x2}" y2="${barY+3}" stroke="${c}" stroke-width=".8" opacity=".3"/>`;
  });

  /* Cluster */
  const clusters=clusterEvents(raw);
  const singleIds=new Set(clusters.filter(g=>g.length===1).flatMap(g=>g.map(e=>e.id)));

  /* Stems + dots */
  raw.filter(ev=>singleIds.has(ev.id)).forEach(ev=>{
    const mx=ev.mx;if(mx<-80||mx>svgW+80) return;
    const c=(CATS[ev.cat]||CATS.autre).c;
    const above=ev.row<0,depth=Math.abs(ev.row),stemLen=48+depth*36;
    const labelY=above?AY-stemLen:AY+stemLen;
    const bh=42,by=above?labelY-bh:labelY;
    h+=`<circle cx="${mx}" cy="${AY}" r="7" fill="${c}" opacity=".18" data-id="${ev.id}"/>`;
    h+=`<circle cx="${mx}" cy="${AY}" r="${activeId===ev.id?5.5:4}" fill="${c}" stroke="var(--paper2)" stroke-width="1.5" style="cursor:pointer" data-id="${ev.id}"/>`;
    h+=`<line x1="${mx}" y1="${AY+(above?-5:5)}" x2="${mx}" y2="${above?by+bh:by}" stroke="${c}" stroke-width="1" stroke-dasharray="2 3" opacity=".4"/>`;
  });

  /* Cartes */
  raw.filter(ev=>singleIds.has(ev.id)).forEach(ev=>{ h+=buildEventCard(ev); });

  svgEl.innerHTML=h;
  svgEl.querySelectorAll('[data-id]').forEach(el=>{
    const id=parseInt(el.dataset.id);
    el.addEventListener('click',e=>{e.stopPropagation();openCard(id,e);});
    el.addEventListener('mousemove',e=>showTip(e,id));
    el.addEventListener('mouseleave',()=>{tipEl.style.display='none';});
  });

  clearClusterOverlays();
  clusters.filter(g=>g.length>=3).forEach(group=>buildClusterOverlay(group));
  renderLegend();buildEraStrip();
}

function buildEventCard(ev){
  const cat=CATS[ev.cat]||CATS.autre,c=cat.c;
  const mx=ev.mx;if(mx<-80||mx>svgW+80) return'';
  const above=ev.row<0,depth=Math.abs(ev.row),stemLen=48+depth*36;
  const labelY=above?AY-stemLen:AY+stemLen;
  const label=ev.title.length>25?ev.title.slice(0,24)+'…':ev.title;
  const bw=Math.min(label.length*7.2+32,195);
  const bh=42,bx=Math.max(4,Math.min(mx-bw/2,svgW-bw-4));
  const by=above?labelY-bh:labelY;
  const isActive=ev.id===activeId,isHL=ev.id===highlightId;
  let s='';
  if(isActive||isHL) s+=`<rect x="${bx-5}" y="${by-5}" width="${bw+10}" height="${bh+10}" rx="13" fill="${c}" opacity="${isHL?.22:.14}"/>`;
  s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="var(--paper)" stroke="${c}" stroke-width="${isActive?1.75:.8}" style="cursor:pointer" data-id="${ev.id}"/>`;
  s+=`<rect x="${bx}" y="${by}" width="${bw}" height="5" rx="5" fill="${c}" opacity=".85" style="pointer-events:none"/>`;
  s+=`<rect x="${bx}" y="${by+3}" width="${bw}" height="3" fill="${c}" opacity=".85" style="pointer-events:none"/>`;
  if(ev.yearEnd&&ev.yearEnd!==ev.year)
    s+=`<rect x="${bx+bw-14}" y="${by+9}" width="8" height="8" rx="2" fill="${c}" opacity=".4" style="pointer-events:none"/>`;
  s+=`<text x="${bx+10}" y="${by+21}" font-size="11.5" font-weight="500" fill="${c}" font-family="'Playfair Display',serif" style="cursor:pointer" data-id="${ev.id}">${label}</text>`;
  const dateStr=fmtFull(ev);
  s+=`<text x="${bx+10}" y="${by+34}" font-size="9.5" fill="${c}" opacity=".7" font-family="'DM Sans',sans-serif" data-id="${ev.id}" style="cursor:pointer">${dateStr}</text>`;
  return s;
}

/* ── Cluster overlays ── */
function clearClusterOverlays(){ document.querySelectorAll('.cluster-overlay').forEach(el=>el.remove()); }
function buildClusterOverlay(group){
  const avgX=group.reduce((s,e)=>s+e.mx,0)/group.length;
  if(avgX<-30||avgX>svgW+30) return;
  const catCounts={};group.forEach(e=>{catCounts[e.cat]=(catCounts[e.cat]||0)+1;});
  const domCat=Object.entries(catCounts).sort((a,b)=>b[1]-a[1])[0][0];
  const c=(CATS[domCat]||CATS.autre).c;
  const size=Math.min(52+group.length*4,78);
  const div=document.createElement('div');
  div.className='cluster-overlay';
  div.style.cssText=`position:absolute;left:${avgX}px;top:${AY}px;transform:translate(-50%,-50%);
    width:${size}px;height:${size}px;border-radius:50%;background:var(--paper);
    border:2.5px solid ${c};display:flex;flex-direction:column;align-items:center;justify-content:center;
    cursor:pointer;transition:transform .15s,box-shadow .15s;box-shadow:0 2px 16px ${c}33;
    font-family:var(--font-b);z-index:10;`;
  div.innerHTML=`<span style="font-size:${size>60?17:14}px;font-weight:600;color:${c};line-height:1">${group.length}</span>
    <span style="font-size:9px;color:${c};opacity:.75;margin-top:2px">évts</span>`;
  div.addEventListener('mouseenter',()=>{div.style.transform='translate(-50%,-50%) scale(1.12)';div.style.boxShadow=`0 4px 24px ${c}55`;});
  div.addEventListener('mouseleave',()=>{div.style.transform='translate(-50%,-50%)';div.style.boxShadow=`0 2px 16px ${c}33`;});
  div.addEventListener('click',e=>{e.stopPropagation();openClusterList(group,e);});
  wrap.style.position='relative';wrap.appendChild(div);
}

function openClusterList(group,e){
  closeCard();
  document.getElementById('cl-title-span').textContent=group.length+' événements groupés';
  document.getElementById('cl-items').innerHTML=group.sort((a,b)=>a.year-b.year).map(ev=>{
    const cat=CATS[ev.cat]||CATS.autre;
    return `<div class="cl-item" onclick="zoomToEvent(${ev.id})">
      <div class="cl-dot" style="background:${cat.c}"></div>
      <div><div class="cl-name">${ev.title}</div>
      <div class="cl-yr">${fmtFull(ev)} · ${cat.e} ${cat.l}</div></div>
    </div>`;
  }).join('');
  clList.style.display='block';
  const vw=window.innerWidth,vh=window.innerHeight,pw=300,ph=380;
  clList.style.left=Math.min(e.clientX+10,vw-pw-10)+'px';
  clList.style.top=Math.min(e.clientY-40,vh-ph-10)+'px';
}
function closeClusterList(){ clList.style.display='none'; }
function zoomToEvent(id){
  closeClusterList();
  const ev=events.find(e=>e.id===id);if(!ev) return;
  const{minY}=getRange();scale=defScale()*6;
  offsetX=(svgW/2)-80-(midY(ev)-minY)*scale;
  render();updZoom();highlightId=id;
  setTimeout(()=>{highlightId=null;render();},2200);
}

/* ── Tooltip ── */
function showTip(e,id){
  const ev=events.find(x=>x.id===id);if(!ev) return;
  const cat=CATS[ev.cat]||CATS.autre;
  tipEl.style.display='block';
  tipEl.style.left=(e.clientX+18)+'px';tipEl.style.top=(e.clientY-24)+'px';
  tipEl.innerHTML=`<strong>${ev.title}</strong>
    <div class="ty" style="color:${cat.c}">${fmtFull(ev)} · ${cat.e} ${cat.l}</div>
    ${ev.desc?`<div class="td">${ev.desc.slice(0,100)}${ev.desc.length>100?'…':''}</div>`:''}`;
}

/* ── Card popup ── */
function openCard(id,e){
  const ev=events.find(x=>x.id===id);if(!ev) return;
  const cat=CATS[ev.cat]||CATS.autre;
  const isPeriod=ev.yearEnd&&ev.yearEnd!==ev.year;
  const imgW=document.getElementById('cp-img-w');
  if(ev.img){
    imgW.innerHTML=`<img class="cp-img" src="${ev.img}" alt="${ev.title}"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
      <div style="display:none;width:100%;height:90px;align-items:center;justify-content:center;font-size:44px;background:${cat.bg}">${cat.e}</div>`;
  } else {
    imgW.innerHTML=`<div style="width:100%;height:80px;display:flex;align-items:center;justify-content:center;font-size:48px;background:${cat.bg}">${cat.e}</div>`;
  }
  const st=document.getElementById('cp-stripe');
  st.style.height='5px';st.style.background=`linear-gradient(90deg,${cat.c},${cat.c}66)`;
  const ce=document.getElementById('cp-cat');
  ce.textContent=`${cat.e} ${cat.l}`;ce.style.background=cat.bg;ce.style.color=cat.c;
  const endStr=fmtFullEnd(ev);
  document.getElementById('cp-dates').innerHTML=endStr
    ?`<strong style="color:${cat.c}">${fmtFull(ev)}</strong><br>→ ${endStr}`:fmtFull(ev);
  document.getElementById('cp-title').textContent=ev.title;
  const pbw=document.getElementById('cp-period-bar-wrap');
  if(isPeriod&&currentEra){
    const span=ev.yearEnd-ev.year;
    const eraSpan=eraTo()-currentEra.from;
    const pct=Math.min(100,Math.round(span/eraSpan*100));
    pbw.style.display='block';
    document.getElementById('cp-period-label').textContent=`Durée : ${span} an${span>1?'s':''} (${pct}% de l'époque)`;
    document.getElementById('cp-period-fill').style.cssText=`width:${pct}%;background:${cat.c}`;
  } else pbw.style.display='none';
  document.getElementById('cp-desc').textContent=ev.desc||'Aucune description.';
  const eb=document.getElementById('cp-edit');
  eb.onclick=()=>{closeCard();openEdit(id);};
  eb.style.background=`linear-gradient(135deg,${cat.c},${cat.c}cc)`;eb.style.color='#fff';
  document.getElementById('cp-wiki').href=getWikiUrl(ev);
  cpop.style.display='block';
  const isMobile=window.innerWidth<640;
  if(isMobile){
    cpop.style.cssText='display:block;position:fixed;bottom:0;left:0;right:0;top:auto;width:100%;border-radius:var(--rxl) var(--rxl) 0 0;max-height:85vh;overflow-y:auto;z-index:250';
  } else {
    cpop.style.cssText=`display:block;position:fixed;border-radius:var(--rxl);width:min(350px,90vw);z-index:250;
      top:${Math.min(e.clientY-60,window.innerHeight-520)}px;
      left:${Math.min(e.clientX+16,window.innerWidth-370)}px`;
  }
  activeId=id;render();
}
function closeCard(){cpop.style.display='none';activeId=null;render();}
document.addEventListener('click',e=>{
  if(!cpop.contains(e.target)&&!e.target.dataset.id) closeCard();
  if(clList.style.display==='block'&&!clList.contains(e.target)&&!e.target.closest('.cluster-overlay')) closeClusterList();
});

/* ── Legend ── */
function renderLegend(){
  document.getElementById('legend').innerHTML=Object.entries(CATS).map(([k,v])=>{
    const on=!hiddenCats.has(k);
    return `<div class="leg-item" style="background:${on?v.bg:'var(--paper2)'};color:${on?v.c:'var(--ink3)'};border-color:${on?v.c:'var(--paper4)'};opacity:${on?1:.5}" onclick="toggleCat('${k}')">${v.e} ${v.l}</div>`;
  }).join('');
}
function toggleCat(k){ hiddenCats.has(k)?hiddenCats.delete(k):hiddenCats.add(k);render();buildEraStrip(); }

/* ── Search ── */
function hl(str,q){
  if(!q) return str;
  const re=new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`,'gi');
  return String(str).replace(re,'<mark>$1</mark>');
}
function onSearch(q){
  document.getElementById('scl').classList.toggle('on',q.length>0);
  const res=document.getElementById('sres');
  if(!q.trim()){res.classList.remove('open');highlightId=null;render();return;}
  const ql=q.toLowerCase(),yn=parseInt(q);
  const matched=events.filter(ev=>{
    return ev.title.toLowerCase().includes(ql)||
           (ev.desc||'').toLowerCase().includes(ql)||
           (ev.wiki||'').toLowerCase().includes(ql)||
           (CATS[ev.cat]?CATS[ev.cat].l.toLowerCase().includes(ql):false)||
           String(Math.abs(ev.year)).includes(q)||
           (!isNaN(yn)&&Math.abs(ev.year-yn)<30);
  }).sort((a,b)=>!isNaN(yn)?Math.abs(a.year-yn)-Math.abs(b.year-yn):a.year-b.year);
  if(!matched.length){res.innerHTML=`<div class="sr-empty">Aucun résultat pour « ${q} »</div>`;res.classList.add('open');return;}
  res.innerHTML=matched.slice(0,10).map(ev=>{
    const cat=CATS[ev.cat]||CATS.autre;
    const descMatch=(ev.desc||'').toLowerCase().includes(ql);
    let dsnip='';
    if(descMatch){
      const idx=(ev.desc||'').toLowerCase().indexOf(ql);
      const start=Math.max(0,idx-30);
      const snip=(start>0?'…':'')+(ev.desc||'').slice(start,idx+ql.length+50)+'…';
      dsnip=`<div class="sri-desc">${hl(snip,q)}</div>`;
    }
    const endStr=fmtFullEnd(ev);
    return `<div class="sri" onclick="goToEv(${ev.id})">
      <div class="sri-dot" style="background:${cat.c}"></div>
      <div style="min-width:0">
        <div class="sri-title">${hl(ev.title,q)}</div>
        <div class="sri-meta">${fmtFull(ev)}${endStr?' → '+endStr:''} · ${cat.e} ${cat.l}</div>
        ${dsnip}
      </div>
    </div>`;
  }).join('');
  res.classList.add('open');
}
function clearSearch(){
  document.getElementById('si').value='';
  document.getElementById('sres').classList.remove('open');
  document.getElementById('scl').classList.remove('on');
  highlightId=null;render();
}
function goToEv(id){
  const ev=events.find(e=>e.id===id);if(!ev) return;
  document.getElementById('sres').classList.remove('open');
  const era=ERAS.find(er=>er.key!=='all'&&midY(ev)>=er.from&&midY(ev)<er.to);
  if(era&&(!currentEra||currentEra.key!==era.key)) selectEra(era.key);
  highlightId=id;
  setTimeout(()=>{
    const{minY}=getRange();scale=defScale()*6;
    offsetX=(svgW/2)-80-(midY(ev)-minY)*scale;
    render();updZoom();
    setTimeout(()=>{highlightId=null;render();},2500);
  },200);
}

/* ── Image ── */
function applyImgUrl(){
  const url=document.getElementById('f-img-url').value.trim();
  if(!url) return;
  document.getElementById('ipr').style.display='block';
  document.getElementById('iprel').src=url;
}
function removeImg(){
  document.getElementById('ipr').style.display='none';
  document.getElementById('iprel').src='';
  document.getElementById('f-img-url').value='';
}

/* ── Cat picker ── */
function buildCatPick(sel){
  document.getElementById('cpick').innerHTML=Object.entries(CATS).map(([k,v])=>
    `<div class="csw${k===sel?' sel':''}" style="background:${v.bg};color:${v.c};border-color:${k===sel?v.c:'transparent'}" onclick="pickCat('${k}',this)">${v.e} ${v.l}</div>`
  ).join('');
  document.getElementById('fc').value=sel||'autre';
}
function pickCat(k,el){
  document.getElementById('fc').value=k;
  document.querySelectorAll('.csw').forEach(s=>{s.classList.remove('sel');s.style.borderColor='transparent';});
  el.classList.add('sel');el.style.borderColor=CATS[k].c;
}

/* ── Modal ── */
function resetForm(){
  document.getElementById('ft').value='';
  document.getElementById('fy').value='';
  document.getElementById('fm').value='';
  document.getElementById('fd2').value='';
  document.getElementById('fye').value='';
  document.getElementById('fme').value='';
  document.getElementById('fde').value='';
  document.getElementById('fdesc').value='';
  document.getElementById('fwiki').value='';
  removeImg();
}

function openAdd(){
  editId=null;
  document.getElementById('mtitle').textContent='Nouvel événement';
  resetForm();
  if(currentEra){
    const midEra=Math.round((currentEra.from+Math.min(eraTo(),TODAY_YEAR))/2);
    document.getElementById('fy').value=midEra;
  }
  buildCatPick('autre');
  document.getElementById('bdel').style.display='none';
  document.getElementById('bsave').textContent='Enregistrer';
  document.getElementById('bsave').disabled=false;
  document.getElementById('mbg').classList.add('open');
  setTimeout(()=>document.getElementById('ft').focus(),60);
}

function openEdit(id){
  const ev=events.find(e=>e.id===id);if(!ev) return;
  editId=id;
  document.getElementById('mtitle').textContent="Modifier l'événement";
  document.getElementById('ft').value=ev.title;
  document.getElementById('fy').value=ev.year;
  document.getElementById('fm').value=ev.month||'';
  document.getElementById('fd2').value=ev.day||'';
  document.getElementById('fye').value=ev.yearEnd&&ev.yearEnd!==ev.year?ev.yearEnd:'';
  document.getElementById('fme').value=ev.monthEnd||'';
  document.getElementById('fde').value=ev.dayEnd||'';
  document.getElementById('fdesc').value=ev.desc||'';
  document.getElementById('fwiki').value=ev.wiki||'';
  if(ev.img){
    document.getElementById('f-img-url').value=ev.img;
    document.getElementById('ipr').style.display='block';
    document.getElementById('iprel').src=ev.img;
  } else removeImg();
  buildCatPick(ev.cat);
  document.getElementById('bdel').style.display='inline-block';
  document.getElementById('bsave').textContent='Enregistrer';
  document.getElementById('bsave').disabled=false;
  document.getElementById('mbg').classList.add('open');
}

function closeMod(){ document.getElementById('mbg').classList.remove('open'); }

function saveEv(){
  // Récupérer et valider
  const title=document.getElementById('ft').value.trim();
  const yearVal=document.getElementById('fy').value.trim();
  if(!title){
    document.getElementById('ft').style.borderColor='#f03060';
    document.getElementById('ft').focus();
    return;
  }
  if(!yearVal){
    document.getElementById('fy').style.borderColor='#f03060';
    document.getElementById('fy').focus();
    return;
  }
  const year=parseInt(yearVal);
  if(isNaN(year)){
    document.getElementById('fy').style.borderColor='#f03060';
    document.getElementById('fy').focus();
    return;
  }
  document.getElementById('ft').style.borderColor='';
  document.getElementById('fy').style.borderColor='';

  const monthVal=document.getElementById('fm').value;
  const dayVal=document.getElementById('fd2').value;
  const yearEndVal=document.getElementById('fye').value.trim();
  const monthEndVal=document.getElementById('fme').value;
  const dayEndVal=document.getElementById('fde').value;
  const desc=document.getElementById('fdesc').value.trim();
  const cat=document.getElementById('fc').value||'autre';
  const wiki=document.getElementById('fwiki').value.trim();
  const imgUrl=document.getElementById('f-img-url').value.trim();

  const evObj={
    id: editId||nextId,
    title, year, cat, desc, wiki,
    img: imgUrl,
    updatedAt: Date.now(),
  };
  if(monthVal) evObj.month=parseInt(monthVal);
  if(dayVal) evObj.day=parseInt(dayVal);
  if(yearEndVal&&yearEndVal!==''){
    evObj.yearEnd=parseInt(yearEndVal);
    if(monthEndVal) evObj.monthEnd=parseInt(monthEndVal);
    if(dayEndVal) evObj.dayEnd=parseInt(dayEndVal);
  } else {
    evObj.yearEnd=year;
  }

  if(editId){
    const idx=events.findIndex(e=>e.id===editId);
    if(idx>=0) events[idx]=evObj;
  } else {
    nextId++;
    events.push(evObj);
  }

  saveSt();
  closeMod();

  // Aller sur l'époque correspondante
  const mid=Math.round((evObj.year+(evObj.yearEnd||evObj.year))/2);
  const era=ERAS.find(er=>er.key!=='all'&&mid>=er.from&&mid<er.to);
  if(era&&(!currentEra||currentEra.key!==era.key)) selectEra(era.key);
  else{render();updZoom();}

  // Highlight
  setTimeout(()=>{
    highlightId=evObj.id;render();
    setTimeout(()=>{highlightId=null;render();},2000);
  },300);
}

function deleteEv(){
  if(!editId||!confirm('Supprimer cet événement définitivement ?')) return;
  if(window.__firebaseDelete) window.__firebaseDelete(editId);
  events=events.filter(e=>e.id!==editId);
  saveSt();closeMod();render();updZoom();
}
document.getElementById('mbg').addEventListener('click',e=>{if(e.target===e.currentTarget)closeMod();});

/* ── Drag / wheel / touch ── */
wrap.addEventListener('mousedown',e=>{
  if(e.target.dataset.id||e.target.closest('.cluster-overlay')) return;
  dragging=true;dsx=e.clientX;dsox=offsetX;wrap.classList.add('dragging');
});
window.addEventListener('mousemove',e=>{if(!dragging) return;offsetX=dsox+(e.clientX-dsx);render();});
window.addEventListener('mouseup',()=>{dragging=false;wrap.classList.remove('dragging');});
wrap.addEventListener('wheel',e=>{
  e.preventDefault();
  const f=e.deltaY<0?1.18:1/1.18;
  const mx=e.clientX-wrap.getBoundingClientRect().left;
  const{minY}=getRange();
  const yam=(mx-80-offsetX)/scale+minY;
  scale*=f;offsetX=mx-80-(yam-minY)*scale;
  render();updZoom();
},{passive:false});
let ltx=null,ltd=null;
wrap.addEventListener('touchstart',e=>{
  if(e.touches.length===2) ltd=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
  else ltx=e.touches[0].clientX;
},{passive:true});
wrap.addEventListener('touchmove',e=>{
  if(e.touches.length===2&&ltd){
    const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
    scale*=d/ltd;ltd=d;render();updZoom();
  } else if(ltx){
    offsetX+=e.touches[0].clientX-ltx;ltx=e.touches[0].clientX;render();
  }
},{passive:true});
wrap.addEventListener('touchend',()=>{ltx=null;ltd=null;});

/* ── Keyboard ── */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeMod();closeCard();closeClusterList();clearSearch();}
  if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();document.getElementById('si').focus();}
  if((e.metaKey||e.ctrlKey)&&e.key==='Enter'){
    if(document.getElementById('mbg').classList.contains('open')) saveEv();
  }
});
document.addEventListener('click',e=>{
  if(!document.getElementById('sres').contains(e.target)&&e.target!==document.getElementById('si'))
    document.getElementById('sres').classList.remove('open');
});
window.addEventListener('resize',()=>{if(currentEra) render();});

/* ── Init ── */
renderLegend();
buildEraStrip();
