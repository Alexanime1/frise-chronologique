/* ═══════════════ FRISE CHRONOLOGIQUE — script.js ═══════════════ */
const TODAY_YEAR = new Date().getFullYear();

const CATS = {
  politique:{ c:'#4f6ef7', bg:'rgba(79,110,247,.13)',  l:'Politique',      e:'🏛' },
  science:  { c:'#16c47a', bg:'rgba(22,196,122,.13)',  l:'Science & Tech', e:'🔬' },
  art:      { c:'#f0742a', bg:'rgba(240,116,42,.13)',  l:'Art & Culture',  e:'🎨' },
  guerre:   { c:'#f03060', bg:'rgba(240,48,96,.13)',   l:'Guerre',         e:'⚔️' },
  autre:    { c:'#a855f7', bg:'rgba(168,85,247,.13)',  l:'Autre',          e:'✦'  },
};

const ERAS = [
  { key:'all',     name:'Toute l\'histoire', from:-300000, to:TODAY_YEAR, color:'#8b5cf6' },
  { key:'prehist', name:'Préhistoire',       from:-300000, to:-3200,      color:'#e07820' },
  { key:'antiq',   name:'Antiquité',         from:-3200,   to:476,        color:'#d4a020' },
  { key:'moyen',   name:'Moyen Âge',         from:476,     to:1492,       color:'#4f6ef7' },
  { key:'mod',     name:'Époque Moderne',    from:1492,    to:1789,       color:'#16c47a' },
  { key:'contemp', name:'XIXᵉ siècle',       from:1789,    to:1900,       color:'#f03060' },
  { key:'xx',      name:'XXᵉ siècle',        from:1900,    to:2000,       color:'#a855f7' },
  { key:'xxi',     name:'XXIᵉ siècle',       from:2000,    to:TODAY_YEAR, color:'#06b6d4' },
];

/* Images — URLs Wikimedia directes dans balises <img> HTML (pas SVG) */
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
  monet:      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/300px-Claude_Monet_1899_Nadar_crop.jpg',
  lumiere:    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/LouisJeanLumiere.jpg/300px-LouisJeanLumiere.jpg',
  degaulle:   'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/De_Gaulle-OWI.jpg/300px-De_Gaulle-OWI.jpg',
  pompidou_c: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Pompidou.jpg/400px-Pompidou.jpg',
  mitterrand: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Fran%C3%A7ois_Mitterrand_1981.jpg/300px-Fran%C3%A7ois_Mitterrand_1981.jpg',
  macron:     'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Emmanuel_Macron_in_2019.jpg/300px-Emmanuel_Macron_in_2019.jpg',
  ww1:        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/The_Battle_of_the_Somme_film.jpg/400px-The_Battle_of_the_Somme_film.jpg',
  concorde:   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Concorde_%28airplane%29.jpg/400px-Concorde_%28airplane%29.jpg',
  greatwall:  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20090529_great_wall_8185.jpg/400px-20090529_great_wall_8185.jpg',
  gandhi:     'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/300px-Mahatma-Gandhi%2C_studio%2C_1931.jpg',
  mandela:    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/300px-Nelson_Mandela_1994.jpg',
  titanic:    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/RMS_Titanic_3.jpg/400px-RMS_Titanic_3.jpg',
  wright:     'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/First_flight2.jpg/400px-First_flight2.jpg',
  iphone:     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/IPhone_1st_Gen.svg/300px-IPhone_1st_Gen.svg.png',
  facebook:   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/300px-Facebook_f_logo_%282019%29.svg.png',
  genome:     'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/DNA_Structure%2BKey%2BLabelled.pn_NoBB.png/300px-DNA_Structure%2BKey%2BLabelled.pn_NoBB.png',
  chine_mur:  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20090529_great_wall_8185.jpg/400px-20090529_great_wall_8185.jpg',
  shakespeare:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/300px-Shakespeare.jpg',
  beethoven:  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Beethoven.jpg/300px-Beethoven.jpg',
  magellan:   'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mapa_Mundi_-_Amerigo_Vespucci_1472-1519.jpg/400px-Mapa_Mundi_-_Amerigo_Vespucci_1472-1519.jpg',
  verdun:     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Trench_warfare_-_used_to_illustrate_%22If_ye_break_faith%22.jpg/400px-Trench_warfare_-_used_to_illustrate_%22If_ye_break_faith%22.jpg',
  luther:     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Lucas_Cranach_the_Elder-_Martin_Luther%2C_1528.jpg/300px-Lucas_Cranach_the_Elder-_Martin_Luther%2C_1528.jpg',
  gutenberg:  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Gutenberg.jpg/300px-Gutenberg.jpg',
  aztec:      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Aztec_Empire_c_1519.png/400px-Aztec_Empire_c_1519.png',
  einstein2:  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/300px-Albert_Einstein_Head.jpg',
  internet:   'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Internet_map_1024.jpg/400px-Internet_map_1024.jpg',
  hiroshima:  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Atomic_bombing_of_Japan.jpg/400px-Atomic_bombing_of_Japan.jpg',
  waterloon:  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Battle_of_Waterloo_1815.PNG/400px-Battle_of_Waterloo_1815.PNG',
  marx:       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Karl_Marx_001.jpg/300px-Karl_Marx_001.jpg',
  impressionism: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Monet_-_Impression%2C_Sunrise.jpg/400px-Monet_-_Impression%2C_Sunrise.jpg',
  vietnam:    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/The_Terror_of_War.jpg/400px-The_Terror_of_War.jpg',
  tchernobyl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Chornobylska_AES.jpg/400px-Chornobylska_AES.jpg',
  tunnel:     'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Channel_Tunnel_map.svg/400px-Channel_Tunnel_map.svg.png',
  notre_dame_incendie: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Notre-Dame_de_Paris_2019-04-15_Initial_Fire.jpg/400px-Notre-Dame_de_Paris_2019-04-15_Initial_Fire.jpg',
  covid:      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/400px-SARS-CoV-2_without_background.png',
  ukraine:    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/400px-Flag_of_Ukraine.svg.png',
  jo2024:     'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/2024_Summer_Olympics_Opening_Ceremony_Eiffel_Tower.jpg/400px-2024_Summer_Olympics_Opening_Ceremony_Eiffel_Tower.jpg',
  notre_dame: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Cath%C3%A9drale_Notre-Dame_de_Paris_2013-07-24.jpg/300px-Cath%C3%A9drale_Notre-Dame_de_Paris_2013-07-24.jpg',
  marc_aurele:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/MSR-ra-1-b.jpg/300px-MSR-ra-1-b.jpg',
};

const DEFAULTS = [
  /* ── PRÉHISTOIRE ── */
  {id:1,  year:-300000,yearEnd:-300000,title:'Maîtrise du feu',                wiki:'Maîtrise du feu par les hominidés',    desc:"L'Homo erectus apprend à contrôler le feu, révolution pour la cuisson, la chaleur et la protection contre les prédateurs.",cat:'science',  img:I.lascaux},
  {id:2,  year:-40000, yearEnd:-10000, title:'Art pariétal',                    wiki:'Art pariétal',                         desc:"Peintures de Chauvet (~37 000 av. J.-C.) et Lascaux (~17 000 av. J.-C.). Premières œuvres d'art connues de l'humanité.",   cat:'art',      img:I.lascaux},
  {id:3,  year:-10000, yearEnd:-4000,  title:'Révolution néolithique',          wiki:'Révolution néolithique',               desc:"Naissance de l'agriculture et de l'élevage. Sédentarisation des populations humaines dans le Croissant fertile.",           cat:'science',  img:I.stonehenge},
  {id:4,  year:-5000,  yearEnd:-1500,  title:'Mégalithes & Stonehenge',         wiki:'Mégalithe',                            desc:"Stonehenge (Angleterre) et alignements de Carnac (Bretagne). Monuments astronomiques mégalithiques à travers l'Europe.",    cat:'autre',    img:I.stonehenge},
  {id:5,  year:-3500,  yearEnd:-3000,  title:'Invention de la roue',            wiki:'Roue',                                 desc:"Inventée en Mésopotamie, d'abord pour le potier puis adaptée aux véhicules. Révolution du transport humain.",                 cat:'science',  img:''},
  /* ── ANTIQUITÉ ── */
  {id:6,  year:-3200,  yearEnd:-3200,  title:'Invention de l\'écriture',        wiki:'Histoire de l\'écriture',              desc:"Les Sumériens inventent le cunéiforme en Mésopotamie. L'Égypte développe simultanément ses hiéroglyphes.",                    cat:'science',  img:''},
  {id:7,  year:-2700,  yearEnd:-2560,  title:'Pyramides de Gizeh',              wiki:'Pyramide de Khéops',                   desc:"Les pyramides de Khéops, Khéphren et Mykérinos sont construites. L'une des Sept Merveilles du monde antique.",                cat:'art',      img:I.pyramides},
  {id:8,  year:-2200,  yearEnd:-1700,  title:'Grande Muraille de Chine (débuts)',wiki:'Grande Muraille de Chine',            desc:"Les premières sections de la Grande Muraille sont construites sous les états combattants. Qin Shi Huang les unifiera.",         cat:'autre',    img:I.greatwall},
  {id:9,  year:-776,   yearEnd:-776,   title:'Premiers Jeux Olympiques',        wiki:'Jeux olympiques antiques',             desc:"Jeux panhelléniques à Olympie en l'honneur de Zeus. Une trêve sacrée suspend les conflits entre cités grecques.",              cat:'autre',    img:''},
  {id:10, year:-753,   yearEnd:-753,   title:'Fondation de Rome',               wiki:'Fondation de Rome',                    desc:"Romulus fonde Rome sur le Palatin selon la légende. La cité deviendra la capitale d'un empire couvrant tout le bassin méditerranéen.", cat:'politique', img:I.colosseum},
  {id:11, year:-551,   yearEnd:-479,   title:'Confucius',                       wiki:'Confucius',                            desc:"Le philosophe chinois enseigne l'éthique, la piété filiale et la gouvernance vertueuse. Sa pensée influence toute l'Asie orientale.", cat:'art',    img:''},
  {id:12, year:-490,   yearEnd:-479,   title:'Guerres médiques',                wiki:'Guerres médiques',                     desc:"Marathon (490), Thermopyles, Salamine (480). La Grèce résiste à l'invasion perse de Darius puis Xerxès.",                    cat:'guerre',   img:''},
  {id:13, year:-356,   yearEnd:-323,   title:'Alexandre le Grand',              wiki:'Alexandre le Grand',                   desc:"Conquête d'un empire de la Grèce à l'Inde. Alexandre diffuse la culture hellénique jusqu'en Asie centrale et en Égypte.",   cat:'guerre',   img:''},
  {id:14, year:-221,   yearEnd:-206,   title:'Unification de la Chine',         wiki:'Qin Shi Huang',                        desc:"Qin Shi Huang unifie les royaumes chinois et devient le premier Empereur de Chine. Il ordonne la construction de la Grande Muraille.", cat:'politique', img:I.greatwall},
  {id:15, year:-44,    yearEnd:-44,    title:'Assassinat de Jules César',       wiki:'Jules César',                          desc:"César est poignardé aux Ides de Mars au Sénat par Brutus, Cassius et leurs complices. Rome plonge dans la guerre civile.",    cat:'politique', img:''},
  {id:16, year:-27,    yearEnd:14,     title:'Auguste, premier Empereur romain',wiki:'Auguste',                              desc:"Octave Auguste devient le premier Empereur romain. Son règne de 41 ans inaugure la Pax Romana, deux siècles de paix relative.",   cat:'politique', img:I.colosseum},
  {id:17, year:0,      yearEnd:0,      title:'Naissance de Jésus-Christ',       wiki:'Jésus de Nazareth',                    desc:"Naissance du fondateur du christianisme en Judée. Sa doctrine révolutionnera l'Europe et le monde pour deux millénaires.",     cat:'autre',    img:''},
  {id:18, year:79,     yearEnd:79,     title:'Éruption du Vésuve — Pompéi',     wiki:'Éruption du Vésuve de 79',             desc:"Le Vésuve ensevelit Pompéi et Herculanum. Les cités romaines figées sous les cendres nous livrent un instantané de la vie antique.", cat:'autre',  img:I.colosseum},
  {id:19, year:105,    yearEnd:105,    title:'Invention du papier (Chine)',      wiki:'Histoire du papier',                   desc:"Cai Lun perfectionne la fabrication du papier en Chine sous la dynastie Han. Une révolution pour la diffusion du savoir.",       cat:'science',  img:''},
  {id:20, year:313,    yearEnd:313,    title:'Édit de Milan',                   wiki:'Édit de Milan',                        desc:"Constantin accorde la liberté de culte dans l'Empire romain. Fin des persécutions des chrétiens, début de la christianisation.", cat:'politique', img:''},
  {id:21, year:476,    yearEnd:476,    title:'Chute de l\'Empire romain d\'Occident',wiki:'Chute de l\'Empire romain d\'Occident',desc:"Romulus Augustule déposé par Odoacre. Fin de l'Antiquité, début du Moyen Âge. Byzance survit jusqu'en 1453.",           cat:'guerre',   img:I.colosseum},
  /* ── MOYEN ÂGE ── */
  {id:22, year:622,    yearEnd:622,    title:'Hégire de Mahomet',               wiki:'Hégire',                               desc:"Mahomet fuit La Mecque pour Médine. Naissance du calendrier islamique et structuration de la communauté musulmane.",           cat:'autre',    img:''},
  {id:23, year:732,    yearEnd:732,    title:'Bataille de Poitiers',            wiki:'Bataille de Poitiers (732)',            desc:"Charles Martel stoppe l'avancée arabo-berbère en Occident. Cette victoire est décisive pour l'histoire de l'Europe chrétienne.", cat:'guerre', img:''},
  {id:24, year:800,    yearEnd:800,    title:'Couronnement de Charlemagne',     wiki:'Charlemagne',                          desc:"Charlemagne est couronné Empereur d'Occident par le pape Léon III à Rome. Naissance de l'Europe carolingienne.",              cat:'politique', img:I.charlemagne},
  {id:25, year:987,    yearEnd:987,    title:'Hugues Capet roi de France',      wiki:'Hugues Capet',                         desc:"Hugues Capet fonde la dynastie capétienne qui régnera sur la France pendant 341 ans sans interruption.",                        cat:'politique', img:''},
  {id:26, year:1054,   yearEnd:1054,   title:'Grand Schisme d\'Orient',         wiki:'Grand Schisme de 1054',                desc:"La chrétienté se divise en Église catholique romaine et Église orthodoxe, une rupture qui dure encore aujourd'hui.",             cat:'autre',    img:''},
  {id:27, year:1066,   yearEnd:1066,   title:'Guillaume le Conquérant',         wiki:'Conquête normande de l\'Angleterre',   desc:"Le duc de Normandie bat Harold II à Hastings et devient roi d'Angleterre. Transformation profonde de la société anglaise.",    cat:'guerre',   img:''},
  {id:28, year:1095,   yearEnd:1099,   title:'Première Croisade',               wiki:'Première croisade',                    desc:"Appel du pape Urbain II au concile de Clermont. Les croisés prennent Jérusalem en 1099 et fondent les États latins d'Orient.",  cat:'guerre',   img:''},
  {id:29, year:1163,   yearEnd:1345,   title:'Cathédrale Notre-Dame de Paris',  wiki:'Cathédrale Notre-Dame de Paris',       desc:"Construction de la cathédrale gothique sur l'île de la Cité. Chef-d'œuvre de l'architecture médiévale française.",            cat:'art',      img:I.notre_dame},
  {id:30, year:1206,   yearEnd:1227,   title:'Empire mongol de Gengis Khan',    wiki:'Empire mongol',                        desc:"Gengis Khan unifie les tribus mongoles et conquiert un empire immense de la Chine à la Perse. Plus grand empire terrestre de l'histoire.", cat:'guerre', img:''},
  {id:31, year:1215,   yearEnd:1215,   title:'Magna Carta',                     wiki:'Magna Carta',                          desc:"Jean sans Terre signe la Grande Charte, limitant le pouvoir royal anglais. Premières bases de l'État de droit en Angleterre.",   cat:'politique', img:''},
  {id:32, year:1226,   yearEnd:1270,   title:'Règne de Saint Louis',            wiki:'Louis IX de France',                   desc:"Louis IX, roi juste et pieux, mène deux croisades. Il mourra à Tunis en 1270 et sera canonisé en 1297.",                      cat:'politique', img:''},
  {id:33, year:1271,   yearEnd:1295,   title:'Voyages de Marco Polo',           wiki:'Marco Polo',                           desc:"Le Vénitien voyage jusqu'en Chine et séjourne à la cour de Kubilaï Khan. Son récit ouvre l'Orient aux Européens.",            cat:'autre',    img:''},
  {id:34, year:1337,   yearEnd:1453,   title:'Guerre de Cent Ans',              wiki:'Guerre de Cent Ans',                   desc:"Conflit franco-anglais pour la couronne de France. Jeanne d'Arc y renversera le cours de l'histoire.",                          cat:'guerre',   img:I.jeanne},
  {id:35, year:1347,   yearEnd:1353,   title:'La Peste Noire',                  wiki:'Peste noire',                          desc:"Pandémie de peste bubonique venue d'Asie. Elle tue entre un tiers et la moitié de la population européenne.",                   cat:'autre',    img:''},
  {id:36, year:1429,   yearEnd:1431,   title:'Jeanne d\'Arc',                   wiki:'Jeanne d\'Arc',                        desc:"La Pucelle d'Orléans lève le siège d'Orléans (1429) avant d'être capturée et brûlée vive à Rouen le 30 mai 1431.",           cat:'guerre',   img:I.jeanne},
  {id:37, year:1453,   yearEnd:1453,   title:'Chute de Constantinople',         wiki:'Chute de Constantinople',              desc:"Mehmed II prend Constantinople. Fin de l'Empire romain d'Orient (Byzance) et début de l'ère ottomane au Moyen-Orient.",        cat:'guerre',   img:''},
  /* ── ÉPOQUE MODERNE ── */
  {id:38, year:1440,   yearEnd:1450,   title:'Gutenberg & l\'imprimerie',       wiki:'Johannes Gutenberg',                   desc:"La presse à caractères mobiles de Gutenberg révolutionne la diffusion du savoir en Europe. La Bible de Gutenberg est le premier livre imprimé.", cat:'science', img:I.gutenberg},
  {id:39, year:1492,   yearEnd:1492,   title:'Christophe Colomb en Amérique',   wiki:'Christophe Colomb',                    desc:"Colomb atteint les Bahamas le 12 octobre. L'Amérique entre dans l'histoire européenne. Début de la colonisation.",              cat:'politique', img:''},
  {id:40, year:1498,   yearEnd:1498,   title:'Vasco de Gama aux Indes',         wiki:'Vasco de Gama',                        desc:"Vasco de Gama contourne l'Afrique et atteint l'Inde par la mer. La route maritime des épices est ouverte.",                     cat:'politique', img:''},
  {id:41, year:1503,   yearEnd:1506,   title:'La Joconde de Léonard de Vinci',  wiki:'La Joconde',                           desc:"Léonard de Vinci peint le portrait de Mona Lisa. Aujourd'hui le tableau le plus célèbre du monde, exposé au Louvre.",          cat:'art',      img:I.joconde},
  {id:42, year:1508,   yearEnd:1512,   title:'Chapelle Sixtine — Michel-Ange',  wiki:'Chapelle Sixtine',                     desc:"Michel-Ange peint le plafond de la Chapelle Sixtine sur commande du pape Jules II. La Création d'Adam en est l'image emblématique.", cat:'art',  img:I.sixtine},
  {id:43, year:1515,   yearEnd:1515,   title:'Victoire de Marignan',            wiki:'Bataille de Marignan',                 desc:"François Ier bat les Suisses en Italie. Victoire brillante qui ouvre une ère de gloire culturelle pour la France.",              cat:'guerre',   img:''},
  {id:44, year:1516,   yearEnd:1516,   title:'L\'Utopie de Thomas More',        wiki:'Utopie (More)',                        desc:"Thomas More publie Utopie, première vision littéraire d'une société idéale. Fondement de la pensée politique humaniste.",       cat:'art',      img:''},
  {id:45, year:1517,   yearEnd:1517,   title:'Réforme protestante — Luther',    wiki:'Réforme protestante',                  desc:"Luther affiche ses 95 thèses à Wittenberg. La chrétienté se divise entre catholiques et protestants.",                         cat:'politique', img:I.luther},
  {id:46, year:1519,   yearEnd:1522,   title:'Tour du monde de Magellan',       wiki:'Expédition Magellan-Elcano',           desc:"Magellan et Elcano accomplissent le premier tour du monde complet. La Terre est définitivement ronde.",                          cat:'science',  img:I.magellan},
  {id:47, year:1543,   yearEnd:1543,   title:'Copernic : héliocentrisme',       wiki:'Nicolas Copernic',                     desc:"Copernic publie sa théorie : la Terre tourne autour du Soleil. Révolution scientifique qui ébranle l'Église.",                  cat:'science',  img:''},
  {id:48, year:1572,   yearEnd:1572,   title:'Nuit de la Saint-Barthélemy',     wiki:'Massacre de la Saint-Barthélemy',      desc:"Des milliers de protestants massacrés à Paris sur ordre de Charles IX. Paroxysme des guerres de Religion françaises.",           cat:'guerre',   img:''},
  {id:49, year:1598,   yearEnd:1598,   title:'Édit de Nantes',                  wiki:'Édit de Nantes',                       desc:"Henri IV accorde la liberté de culte aux protestants. Fin des guerres de Religion. Premier édit de tolérance religieuse.",      cat:'politique', img:''},
  {id:50, year:1600,   yearEnd:1616,   title:'Shakespeare',                     wiki:'William Shakespeare',                  desc:"L'auteur de Hamlet, Othello, Roméo et Juliette domine la littérature élisabéthaine. Plus grande plume de langue anglaise.",    cat:'art',      img:I.shakespeare},
  {id:51, year:1602,   yearEnd:1602,   title:'Compagnie des Indes orientales',  wiki:'Compagnie néerlandaise des Indes orientales',desc:"La VOC néerlandaise est fondée. Première société par actions de l'histoire, pionnier du capitalisme moderne.",         cat:'autre',    img:''},
  {id:52, year:1610,   yearEnd:1610,   title:'Assassinat d\'Henri IV',          wiki:'Henri IV (roi de France)',             desc:"Henri IV est poignardé par Ravaillac rue de la Ferronnerie à Paris. Le Bon Roi est pleuré par tout le peuple.",               cat:'politique', img:''},
  {id:53, year:1637,   yearEnd:1637,   title:'Descartes — Le Discours de la méthode',wiki:'Discours de la méthode',         desc:"Descartes publie son Discours, fondant la philosophie moderne sur le doute méthodique. « Je pense donc je suis. »",            cat:'art',      img:''},
  {id:54, year:1643,   yearEnd:1715,   title:'Règne de Louis XIV',              wiki:'Louis XIV',                            desc:"Le Roi-Soleil règne 72 ans. Versailles, absolutisme, expansion territoriale, rayonnement culturel sans précédent.",              cat:'politique', img:I.louisxiv},
  {id:55, year:1661,   yearEnd:1710,   title:'Château de Versailles',           wiki:'Château de Versailles',                desc:"Louis XIV transforme le pavillon de chasse en palais monumental. Symbole absolu de l'absolutisme et de la grandeur française.",  cat:'art',      img:I.versailles},
  {id:56, year:1687,   yearEnd:1687,   title:'Principia de Newton',             wiki:'Philosophiae Naturalis Principia Mathematica',desc:"Newton publie ses lois de la gravitation. L'une des œuvres les plus importantes de l'histoire des sciences.",          cat:'science',  img:I.newton},
  {id:57, year:1751,   yearEnd:1772,   title:'L\'Encyclopédie de Diderot',      wiki:'Encyclopédie ou Dictionnaire raisonné des sciences',desc:"Diderot et d'Alembert publient 28 volumes qui synthétisent toutes les connaissances humaines. Flambeau des Lumières.", cat:'art',    img:''},
  {id:58, year:1759,   yearEnd:1759,   title:'Candide de Voltaire',             wiki:'Candide',                              desc:"Chef-d'œuvre satirique des Lumières. Voltaire y dénonce la guerre, le fanatisme religieux et l'injustice sociale.",            cat:'art',      img:''},
  {id:59, year:1762,   yearEnd:1762,   title:'Du Contrat social — Rousseau',    wiki:'Du contrat social',                    desc:"Rousseau pose les bases de la souveraineté populaire et de la démocratie moderne.",                                             cat:'art',      img:''},
  {id:60, year:1776,   yearEnd:1776,   title:'Indépendance américaine',         wiki:'Déclaration d\'indépendance des États-Unis',desc:"Les treize colonies déclarent leur indépendance du Royaume-Uni. Jefferson rédige que tous les hommes sont créés égaux.",  cat:'politique', img:I.amerindep},
  /* ── XIXe SIÈCLE ── */
  {id:61, year:1789,   yearEnd:1789,   title:'Prise de la Bastille',            wiki:'Prise de la Bastille',                 desc:"Le 14 juillet 1789, le peuple de Paris s'empare de la forteresse. Début symbolique de la Révolution française.",               cat:'politique', img:I.bastille},
  {id:62, year:1789,   yearEnd:1799,   title:'Révolution française',            wiki:'Révolution française',                 desc:"De la Déclaration des droits de l'homme à la Terreur et au Directoire. La monarchie est abolie, la République proclamée.",    cat:'politique', img:I.revfr},
  {id:63, year:1793,   yearEnd:1793,   title:'Exécution de Louis XVI',          wiki:'Louis XVI',                            desc:"Le roi Louis XVI est guillotiné le 21 janvier. La monarchie française prend fin pour la première fois de son histoire.",          cat:'politique', img:''},
  {id:64, year:1799,   yearEnd:1815,   title:'Empire napoléonien',              wiki:'Napoléon Ier',                         desc:"Napoléon se couronne Empereur. Code civil, réorganisation de l'Europe. Il sera finalement vaincu à Waterloo en 1815.",           cat:'politique', img:I.napoleon},
  {id:65, year:1804,   yearEnd:1827,   title:'Beethoven — Symphonies',          wiki:'Ludwig van Beethoven',                 desc:"Sourd depuis 1814, Beethoven compose ses neuf symphonies dont la Neuvième (Ode à la Joie) qui deviendra l'hymne européen.",      cat:'art',      img:I.beethoven},
  {id:66, year:1812,   yearEnd:1812,   title:'Retraite de Russie',              wiki:'Campagne de Russie',                   desc:"La Grande Armée envahit la Russie mais recule dévastée par l'hiver. 400 000 soldats français meurent en Russie.",               cat:'guerre',   img:''},
  {id:67, year:1815,   yearEnd:1815,   title:'Bataille de Waterloo',            wiki:'Bataille de Waterloo',                 desc:"Napoléon vaincu par Wellington et Blücher en Belgique. Exil à Sainte-Hélène. Redécoupage de l'Europe au Congrès de Vienne.",    cat:'guerre',   img:I.waterloon},
  {id:68, year:1830,   yearEnd:1830,   title:'Révolution de Juillet en France', wiki:'Révolution de Juillet',                desc:"Les Trois Glorieuses renversent Charles X. Louis-Philippe d'Orléans devient le « Roi des Français ».",                          cat:'politique', img:''},
  {id:69, year:1830,   yearEnd:1848,   title:'Romantisme littéraire',           wiki:'Romantisme',                           desc:"Hugo, Balzac, Stendhal, Flaubert : le XIXe siècle est l'âge d'or du roman français.",                                          cat:'art',      img:I.hugo},
  {id:70, year:1848,   yearEnd:1848,   title:'Manifeste communiste — Marx',     wiki:'Manifeste du Parti communiste',        desc:"Marx et Engels publient le Manifeste : « Prolétaires de tous les pays, unissez-vous ! » Texte fondateur du socialisme.",       cat:'politique', img:I.marx},
  {id:71, year:1848,   yearEnd:1848,   title:'Printemps des Peuples',           wiki:'Printemps des peuples',                desc:"Vague révolutionnaire en Europe : France, Autriche, Prusse, Italie, Hongrie. Réclamations démocratiques et nationales.",        cat:'politique', img:''},
  {id:72, year:1859,   yearEnd:1859,   title:'Darwin — L\'Origine des espèces', wiki:'De l\'origine des espèces',            desc:"Darwin publie sa théorie de l'évolution par sélection naturelle. Révolution dans la biologie et la vision de l'humanité.",     cat:'science',  img:I.darwin},
  {id:73, year:1861,   yearEnd:1865,   title:'Guerre de Sécession américaine',  wiki:'Guerre de Sécession',                  desc:"La victoire du Nord permet l'abolition de l'esclavage par le 13e amendement de la Constitution américaine.",                     cat:'guerre',   img:''},
  {id:74, year:1862,   yearEnd:1862,   title:'Les Misérables de Victor Hugo',   wiki:'Les Misérables',                       desc:"Hugo publie son roman-fleuve sur la misère sociale. Jean Valjean, Cosette et Gavroche entrent dans la légende.",                 cat:'art',      img:I.hugo},
  {id:75, year:1867,   yearEnd:1867,   title:'Abolition de l\'esclavage au Brésil',wiki:'Lei Áurea',                        desc:"Le Brésil est l'un des derniers pays à abolir l'esclavage. La Lei Áurea de 1888 met fin à cette pratique.",                      cat:'politique', img:''},
  {id:76, year:1869,   yearEnd:1869,   title:'Canal de Suez inauguré',          wiki:'Canal de Suez',                        desc:"Le canal reliant Méditerranée et mer Rouge réduit le trajet Europe-Asie de 7 000 km. Révolution du commerce maritime.",          cat:'autre',    img:''},
  {id:77, year:1870,   yearEnd:1871,   title:'Guerre franco-prussienne',        wiki:'Guerre franco-prussienne de 1870',     desc:"La France est vaincue. L'Alsace-Lorraine est annexée par l'Allemagne. La Commune de Paris s'embrase.",                         cat:'guerre',   img:''},
  {id:78, year:1874,   yearEnd:1886,   title:'Impressionnisme',                 wiki:'Impressionnisme',                      desc:"Monet, Renoir, Pissarro, Degas révolutionnent la peinture. « Impression, Soleil levant » de Monet donne son nom au mouvement.",  cat:'art',      img:I.impressionism},
  {id:79, year:1876,   yearEnd:1876,   title:'Invention du téléphone — Bell',   wiki:'Alexander Graham Bell',               desc:"Alexander Graham Bell invente le téléphone. La communication à distance entre dans une nouvelle ère.",                          cat:'science',  img:''},
  {id:80, year:1878,   yearEnd:1895,   title:'Louis Pasteur & microbiologie',   wiki:'Louis Pasteur',                        desc:"Pasteur prouve la théorie germinale des maladies. Vaccin contre la rage (1885). Il révolutionne la médecine mondiale.",          cat:'science',  img:I.pasteur},
  {id:81, year:1885,   yearEnd:1885,   title:'Première automobile — Benz',      wiki:'Karl Benz',                            desc:"Karl Benz construit la Motorwagen, considérée comme la première automobile à moteur à essence. Elle atteint 16 km/h.",          cat:'science',  img:''},
  {id:82, year:1889,   yearEnd:1889,   title:'Tour Eiffel inaugurée',           wiki:'Tour Eiffel',                          desc:"Gustave Eiffel construit sa tour de fer pour l'Exposition universelle de Paris. D'abord décriée, elle devient le symbole de Paris.", cat:'art',    img:I.toureiffel},
  {id:83, year:1894,   yearEnd:1906,   title:'Affaire Dreyfus',                 wiki:'Affaire Dreyfus',                      desc:"Dreyfus, faussement accusé de trahison, divise la France. L'affaire révèle un antisémitisme profond et polarise la société.",     cat:'politique', img:''},
  {id:84, year:1895,   yearEnd:1895,   title:'Cinéma des frères Lumière',       wiki:'Frères Lumière',                       desc:"Première projection publique du cinématographe le 28 décembre au Grand Café de Paris. Naissance du 7e art.",                     cat:'art',      img:I.lumiere},
  {id:85, year:1896,   yearEnd:1896,   title:'Jeux Olympiques modernes — Athènes',wiki:'Jeux olympiques d\'été de 1896',    desc:"Le baron Pierre de Coubertin organise les premiers JO modernes à Athènes. 14 nations, 241 athlètes.",                           cat:'autre',    img:''},
  /* ── XXe SIÈCLE ── */
  {id:86, year:1903,   yearEnd:1903,   title:'Premier vol motorisé — Wright',   wiki:'Frères Wright',                        desc:"Orville Wright vole 12 secondes et 37 mètres à Kitty Hawk. L'aviation est née.",                                               cat:'science',  img:I.wright},
  {id:87, year:1905,   yearEnd:1905,   title:'Théorie de la relativité',        wiki:'Théorie de la relativité restreinte',  desc:"Einstein publie E=mc² et révolutionne la physique à 26 ans. Espace et temps ne seront plus jamais les mêmes.",                  cat:'science',  img:I.einstein},
  {id:88, year:1905,   yearEnd:1905,   title:'Loi de séparation Église-État',   wiki:'Loi de séparation des Églises et de l\'État',desc:"La France vote la laïcité : l'État ne reconnaît et ne finance plus aucun culte.",                                   cat:'politique', img:''},
  {id:89, year:1912,   yearEnd:1912,   title:'Naufrage du Titanic',             wiki:'Titanic',                              desc:"Le paquebot RMS Titanic coule dans l'Atlantique nord lors de son voyage inaugural. 1 514 victimes.",                          cat:'autre',    img:I.titanic},
  {id:90, year:1914,   yearEnd:1918,   title:'Première Guerre mondiale',        wiki:'Première Guerre mondiale',             desc:"18 à 20 millions de morts. La France perd 1,4 million de soldats. La carte du monde est redessinée.",                          cat:'guerre',   img:I.ww1},
  {id:91, year:1916,   yearEnd:1916,   title:'Bataille de Verdun',              wiki:'Bataille de Verdun',                   desc:"10 mois de combat, 300 000 morts français et allemands. Symbole absolu de l'horreur de la guerre des tranchées.",              cat:'guerre',   img:I.verdun},
  {id:92, year:1917,   yearEnd:1917,   title:'Révolution russe — Lénine',       wiki:'Révolution russe',                     desc:"En octobre, les bolchéviques prennent le pouvoir. Naissance de l'URSS, premier État communiste de l'histoire.",                cat:'politique', img:''},
  {id:93, year:1918,   yearEnd:1918,   title:'Armistice du 11 novembre',        wiki:'Armistice du 11 novembre 1918',        desc:"Fin de la Première Guerre mondiale. La signature à Rethondes met fin à quatre ans de conflit.",                               cat:'guerre',   img:''},
  {id:94, year:1919,   yearEnd:1919,   title:'Traité de Versailles',            wiki:'Traité de Versailles',                 desc:"Fin officielle de la WW1. L'Alsace-Lorraine retrouve la France. Des clauses humiliantes pour l'Allemagne sèment les germes de la WW2.", cat:'politique', img:''},
  {id:95, year:1920,   yearEnd:1920,   title:'Création de la Société des Nations',wiki:'Société des Nations',               desc:"La SDN, ancêtre de l'ONU, est fondée à Genève. Premier organisme international de maintien de la paix, elle échouera.",           cat:'politique', img:''},
  {id:96, year:1922,   yearEnd:1922,   title:'Toutânkhamon — Howard Carter',    wiki:'Toutânkhamon',                         desc:"Howard Carter découvre la tombe intacte du pharaon dans la Vallée des Rois. Engouement mondial pour l'égyptologie.",           cat:'art',      img:''},
  {id:97, year:1929,   yearEnd:1932,   title:'Grande Dépression',               wiki:'Grande Dépression',                    desc:"Le krach du 24 octobre 1929 à Wall Street déclenche la pire crise économique mondiale. Le chômage explose partout.",           cat:'autre',    img:''},
  {id:98, year:1933,   yearEnd:1945,   title:'Régime nazi — Hitler au pouvoir', wiki:'Adolf Hitler',                         desc:"Hitler prend le pouvoir en Allemagne. Le nazisme mène à la Shoah (6 millions de Juifs) et à la Seconde Guerre mondiale.",     cat:'guerre',   img:''},
  {id:99, year:1936,   yearEnd:1938,   title:'Front Populaire en France',       wiki:'Front populaire (France)',             desc:"Léon Blum instaure les congés payés et la semaine de 40h. Victoire historique de la gauche française.",                       cat:'politique', img:''},
  {id:100,year:1939,   yearEnd:1945,   title:'Seconde Guerre mondiale',         wiki:'Seconde Guerre mondiale',              desc:"70 à 85 millions de morts, Shoah, bombes atomiques. La France est occupée (1940-1944). Victoire alliée en 1945.",             cat:'guerre',   img:I.dday},
  {id:101,year:1940,   yearEnd:1940,   title:'Appel du 18 juin — De Gaulle',    wiki:'Appel du 18 juin',                     desc:"De Gaulle lance son appel depuis Londres sur la BBC. Naissance de la France Libre qui continuera le combat.",                  cat:'politique', img:I.degaulle},
  {id:102,year:1944,   yearEnd:1944,   title:'Débarquement en Normandie — D-Day',wiki:'Débarquement en Normandie',          desc:"Le 6 juin, 150 000 soldats alliés débarquent sur les plages normandes. Tournant décisif de la guerre à l'Ouest.",              cat:'guerre',   img:I.dday},
  {id:103,year:1944,   yearEnd:1944,   title:'Droit de vote des femmes en France',wiki:'Droit de vote des femmes en France',desc:"L'ordonnance du 21 avril 1944 accorde enfin le droit de vote aux femmes françaises.",                                        cat:'politique', img:''},
  {id:104,year:1945,   yearEnd:1945,   title:'Bombes atomiques sur le Japon',   wiki:'Bombardements atomiques d\'Hiroshima et Nagasaki',desc:"Les États-Unis larguent deux bombes atomiques sur Hiroshima (6 août) et Nagasaki (9 août). 200 000 morts.",       cat:'guerre',   img:I.hiroshima},
  {id:105,year:1945,   yearEnd:1945,   title:'Création de l\'ONU',              wiki:'Organisation des Nations unies',       desc:"L'ONU est fondée à San Francisco le 26 juin pour maintenir la paix mondiale après les horreurs de la WW2.",                   cat:'politique', img:''},
  {id:106,year:1947,   yearEnd:1947,   title:'Indépendance de l\'Inde — Gandhi',wiki:'Indépendance de l\'Inde',             desc:"L'Inde accède à l'indépendance sous la conduite de Gandhi et Nehru. Fin de deux siècles de colonisation britannique.",        cat:'politique', img:I.gandhi},
  {id:107,year:1948,   yearEnd:1948,   title:'Déclaration universelle des droits de l\'homme',wiki:'Déclaration universelle des droits de l\'homme',desc:"L'ONU adopte la DUDH le 10 décembre. 30 articles proclamant les droits inaliénables de tout être humain.", cat:'politique', img:''},
  {id:108,year:1948,   yearEnd:1948,   title:'Création de l\'État d\'Israël',   wiki:'Déclaration d\'indépendance d\'Israël',desc:"Ben Gourion proclame l'État d'Israël. Le lendemain, les États arabes voisins déclenchent la première guerre israélo-arabe.",  cat:'politique', img:''},
  {id:109,year:1950,   yearEnd:1953,   title:'Guerre de Corée',                 wiki:'Guerre de Corée',                      desc:"Premier conflit de la Guerre froide. La Corée est définitivement divisée en deux États aux idéologies opposées.",               cat:'guerre',   img:''},
  {id:110,year:1953,   yearEnd:1953,   title:'ADN — double hélice',             wiki:'Acide désoxyribonucléique',            desc:"Watson et Crick, s'appuyant sur Rosalind Franklin, décrivent la structure en double hélice de l'ADN. Naissance de la biologie moléculaire.", cat:'science', img:I.genome},
  {id:111,year:1954,   yearEnd:1962,   title:'Guerre d\'Algérie',               wiki:'Guerre d\'Algérie',                    desc:"Conflit douloureux pour l'indépendance algérienne. 1,5 million de soldats français mobilisés. Fin par les accords d'Évian.",    cat:'guerre',   img:''},
  {id:112,year:1957,   yearEnd:1957,   title:'Traité de Rome — CEE',            wiki:'Traité de Rome (1957)',                desc:"Fondation de la Communauté économique européenne. Premier pas vers l'Union européenne de 27 nations.",                          cat:'politique', img:''},
  {id:113,year:1957,   yearEnd:1957,   title:'Spoutnik dans l\'espace',         wiki:'Spoutnik 1',                           desc:"L'URSS lance le premier satellite artificiel le 4 octobre. Le bip de Spoutnik marque le début de la conquête spatiale.",         cat:'science',  img:I.sputnik},
  {id:114,year:1960,   yearEnd:1960,   title:'Année de l\'Afrique',             wiki:'Décolonisation de l\'Afrique',         desc:"17 pays africains accèdent à l'indépendance en 1960. La décolonisation transforme définitivement la carte du monde.",          cat:'politique', img:''},
  {id:115,year:1961,   yearEnd:1991,   title:'Mur de Berlin',                   wiki:'Mur de Berlin',                        desc:"Le mur est érigé le 13 août 1961, divisant Berlin en deux. Il tombera le 9 novembre 1989, symbole de la fin de la Guerre froide.", cat:'politique', img:I.berlin},
  {id:116,year:1963,   yearEnd:1963,   title:'Discours « I Have a Dream »',     wiki:'I Have a Dream',                       desc:"Martin Luther King prononce son discours historique à Washington. Il galvanise le mouvement pour les droits civiques.",         cat:'politique', img:''},
  {id:117,year:1963,   yearEnd:1963,   title:'Assassinat de JFK',               wiki:'Assassinat de John F. Kennedy',        desc:"Le président Kennedy est assassiné à Dallas le 22 novembre. L'Amérique bascule dans une ère de doute.",                       cat:'politique', img:''},
  {id:118,year:1968,   yearEnd:1968,   title:'Mai 68 en France',                wiki:'Mai 68',                               desc:"Étudiants et ouvriers paralysent la France. De Gaulle dissout l'Assemblée et remporte les élections. La société s'est transformée.", cat:'politique', img:''},
  {id:119,year:1969,   yearEnd:1969,   title:'Premiers pas sur la Lune',        wiki:'Apollo 11',                            desc:"Neil Armstrong : « Un petit pas pour l'homme, un bond de géant pour l'humanité. » 600 millions de téléspectateurs.",           cat:'science',  img:I.lune},
  {id:120,year:1970,   yearEnd:1975,   title:'Guerre du Vietnam — fin',         wiki:'Guerre du Viêt Nam',                   desc:"Les États-Unis se retirent du Vietnam. Première défaite militaire américaine. 3 millions de morts, trauma national.",          cat:'guerre',   img:I.vietnam},
  {id:121,year:1975,   yearEnd:1994,   title:'Nelson Mandela — apartheid',      wiki:'Nelson Mandela',                       desc:"Mandela est libéré en 1990 après 27 ans de prison. Il devient président d'Afrique du Sud en 1994. Fin de l'apartheid.",         cat:'politique', img:I.mandela},
  {id:122,year:1976,   yearEnd:2003,   title:'Concorde en service',             wiki:'Concorde',                             desc:"L'avion supersonique franco-britannique relie Paris à New York en 3h30. Retrait en 2003 après l'accident du 25 juillet 2000.",  cat:'science',  img:I.concorde},
  {id:123,year:1977,   yearEnd:1977,   title:'Centre Pompidou inauguré',        wiki:'Centre Georges-Pompidou',              desc:"Le musée d'art moderne au design révolutionnaire (Piano et Rogers) ouvre ses portes à Paris.",                                 cat:'art',      img:I.pompidou_c},
  {id:124,year:1981,   yearEnd:1995,   title:'François Mitterrand Président',   wiki:'François Mitterrand',                  desc:"Premier président socialiste de la Ve République. Abolition de la peine de mort, décentralisation, Tunnel sous la Manche.",    cat:'politique', img:I.mitterrand},
  {id:125,year:1981,   yearEnd:1981,   title:'Abolition de la peine de mort',   wiki:'Abolition de la peine de mort en France',desc:"Robert Badinter et Mitterrand abolissent la guillotine. La France rejoint les démocraties abolitionnistes d'Europe.",      cat:'politique', img:''},
  {id:126,year:1984,   yearEnd:1984,   title:'Mac & révolution informatique',   wiki:'Apple Macintosh',                      desc:"Apple lance le Macintosh le 22 janvier. La souris et l'interface graphique entrent dans les foyers du monde entier.",            cat:'science',  img:''},
  {id:127,year:1985,   yearEnd:1985,   title:'Concert Live Aid',                wiki:'Live Aid',                             desc:"Freddie Mercury et le monde entier se mobilisent pour l'Éthiopie. Première grande mobilisation humanitaire télévisée.",          cat:'art',      img:''},
  {id:128,year:1986,   yearEnd:1986,   title:'Tchernobyl',                      wiki:'Catastrophe de Tchernobyl',            desc:"Le réacteur n°4 de la centrale ukrainienne explose. La plus grave catastrophe nucléaire civile de l'histoire.",                cat:'autre',    img:I.tchernobyl},
  {id:129,year:1989,   yearEnd:1989,   title:'Chute du mur de Berlin',          wiki:'Chute du mur de Berlin',               desc:"Le mur de Berlin tombe le 9 novembre. Symbole de la fin de la Guerre froide et de la réunification de l'Europe.",             cat:'politique', img:I.berlin},
  {id:130,year:1989,   yearEnd:1989,   title:'Place Tiananmen',                 wiki:'Manifestations de la place Tian\'anmen',desc:"La répression des manifestants pro-démocratie à Pékin choque le monde. La photo du «Homme de Tiananmen» est iconique.",    cat:'politique', img:''},
  {id:131,year:1991,   yearEnd:1991,   title:'Dissolution de l\'URSS',          wiki:'Dissolution de l\'Union soviétique',   desc:"Gorbatchev démissionne le 25 décembre. L'URSS se dissout en 15 États. Fin officielle de la Guerre froide.",                  cat:'politique', img:''},
  {id:132,year:1991,   yearEnd:1991,   title:'Naissance du World Wide Web',     wiki:'World Wide Web',                       desc:"Tim Berners-Lee crée le Web au CERN à Genève. Le premier site web de l'histoire est publié le 20 décembre.",                  cat:'science',  img:I.internet},
  {id:133,year:1993,   yearEnd:1993,   title:'Traité de Maastricht',            wiki:'Traité de Maastricht',                 desc:"Création de l'Union européenne. L'euro est programmé pour 2002. La citoyenneté européenne est instaurée.",                     cat:'politique', img:''},
  {id:134,year:1994,   yearEnd:1994,   title:'Génocide au Rwanda',              wiki:'Génocide des Tutsis au Rwanda',        desc:"En 100 jours, entre 500 000 et 800 000 Tutsis sont massacrés. L'inaction de la communauté internationale est dénoncée.",      cat:'guerre',   img:''},
  {id:135,year:1994,   yearEnd:1994,   title:'Tunnel sous la Manche',           wiki:'Tunnel sous la Manche',                desc:"Le tunnel ferroviaire reliant la France au Royaume-Uni ouvre le 6 mai. Paris-Londres en 2h15.",                                cat:'science',  img:I.tunnel},
  /* ── XXIe SIÈCLE ── */
  {id:136,year:2001,   yearEnd:2001,   title:'Attentats du 11 septembre',       wiki:'Attentats du 11 septembre 2001',       desc:"Al-Qaïda détourne quatre avions. Les tours du WTC s'effondrent. 2977 morts. Le monde change pour toujours.",                 cat:'guerre',   img:I.sept11},
  {id:137,year:2002,   yearEnd:2002,   title:'Introduction de l\'euro',         wiki:'Euro',                                 desc:"L'euro remplace 12 monnaies nationales européennes dont le franc français. Révolution monétaire sans précédent.",             cat:'politique', img:''},
  {id:138,year:2003,   yearEnd:2003,   title:'Séquençage du génome humain',     wiki:'Projet Génome humain',                 desc:"Le Projet Génome humain annonce le séquençage complet de l'ADN humain. Révolution pour la médecine personnalisée.",          cat:'science',  img:I.genome},
  {id:139,year:2004,   yearEnd:2004,   title:'Naissance de Facebook',           wiki:'Facebook',                             desc:"Zuckerberg lance son réseau social depuis Harvard. Il atteindra 3 milliards d'utilisateurs en 2023.",                         cat:'science',  img:I.facebook},
  {id:140,year:2005,   yearEnd:2005,   title:'YouTube — révolution vidéo',      wiki:'YouTube',                              desc:"YouTube est fondé. En un an, des millions de vidéos sont partagées. La diffusion de contenu est révolutionnée.",             cat:'science',  img:''},
  {id:141,year:2007,   yearEnd:2007,   title:'Premier iPhone — Apple',          wiki:'iPhone',                               desc:"Steve Jobs présente l'iPhone le 9 janvier. Le smartphone révolutionne nos vies et tue les téléphones à clavier.",            cat:'science',  img:I.iphone},
  {id:142,year:2008,   yearEnd:2009,   title:'Crise financière mondiale',       wiki:'Crise financière de 2007-2008',        desc:"La faillite de Lehman Brothers déclenche la plus grave crise économique mondiale depuis 1929.",                               cat:'autre',    img:''},
  {id:143,year:2010,   yearEnd:2012,   title:'Printemps arabe',                 wiki:'Printemps arabe',                      desc:"Soulèvements en Tunisie, Égypte, Libye, Syrie. Des régimes autoritaires chutent, d'autres s'accrochent dans la violence.",    cat:'politique', img:''},
  {id:144,year:2015,   yearEnd:2015,   title:'Attentats à Paris — Charlie Hebdo',wiki:'Attentat contre Charlie Hebdo',       desc:"12 morts à Charlie Hebdo le 7 janvier, puis 130 morts au Bataclan le 13 novembre. La France face au terrorisme islamiste.",   cat:'guerre',   img:''},
  {id:145,year:2015,   yearEnd:2015,   title:'Accord de Paris sur le climat',   wiki:'Accord de Paris',                      desc:"195 pays s'engagent à limiter le réchauffement à 2°C lors de la COP21. Premier accord universel sur le climat.",             cat:'autre',    img:''},
  {id:146,year:2017,   yearEnd:2017,   title:'Élection d\'Emmanuel Macron',     wiki:'Emmanuel Macron',                      desc:"Macron, 39 ans, devient le plus jeune président de la Ve République. Il bat Marine Le Pen avec 66% des voix.",                cat:'politique', img:I.macron},
  {id:147,year:2018,   yearEnd:2018,   title:'France championne du monde de football',wiki:'Coupe du monde de football 2018',desc:"La France bat la Croatie 4-2 en finale à Moscou. 2e titre mondial pour les Bleus après 1998.",                            cat:'autre',    img:''},
  {id:148,year:2019,   yearEnd:2019,   title:'Incendie de Notre-Dame de Paris', wiki:'Incendie de Notre-Dame de Paris',      desc:"La cathédrale est ravagée le 15 avril. La flèche s'effondre. Un élan de solidarité mondial se lève pour la reconstruire.",    cat:'art',      img:I.notre_dame_incendie},
  {id:149,year:2019,   yearEnd:2022,   title:'Pandémie de Covid-19',            wiki:'Pandémie de Covid-19',                 desc:"Le SARS-CoV-2 paralyse la planète. Confinements mondiaux, vaccins en un an, plus de 7 millions de morts officiels.",          cat:'autre',    img:I.covid},
  {id:150,year:2022,   yearEnd:2022,   title:'Invasion russe de l\'Ukraine',    wiki:'Invasion de l\'Ukraine par la Russie', desc:"La Russie envahit l'Ukraine le 24 février. Plus grand conflit armé en Europe depuis 1945. Crise humanitaire massive.",         cat:'guerre',   img:I.ukraine},
  {id:151,year:2022,   yearEnd:2022,   title:'James Webb — nouvelles frontières',wiki:'Télescope spatial James-Webb',         desc:"La NASA publie les premières images. Des galaxies à 13 milliards d'années-lumière, les plus lointaines jamais observées.",      cat:'science',  img:''},
  {id:152,year:2023,   yearEnd:2023,   title:'IA générative — ChatGPT & Claude',wiki:'Intelligence artificielle générative', desc:"ChatGPT, Claude, Gemini révolutionnent le monde numérique. L'IA transforme création, éducation et travail à une vitesse record.",cat:'science',  img:''},
  {id:153,year:2024,   yearEnd:2024,   title:'JO de Paris 2024',                wiki:'Jeux olympiques d\'été de 2024',       desc:"Paris accueille les JO du 26 juillet au 11 août. La France décroche 16 médailles d'or. Cérémonie sur la Seine mémorable.",   cat:'autre',    img:I.jo2024},
  {id:154,year:2024,   yearEnd:2024,   title:'Réouverture de Notre-Dame de Paris',wiki:'Reconstruction de Notre-Dame de Paris',desc:"La cathédrale rouvre le 7 décembre 2024 après 5 ans de travaux. La flèche restaurée domine à nouveau le ciel de Paris.",  cat:'art',      img:I.notre_dame},
];

/* ── Storage ── */
const SK = 'frise_v7';
function loadEv(){ try{ const s=localStorage.getItem(SK); return s?JSON.parse(s):DEFAULTS; }catch{ return DEFAULTS; } }
function saveSt(){ try{ localStorage.setItem(SK,JSON.stringify(events)); }catch(e){} }

let events=loadEv();
let nextId=Math.max(...events.map(e=>e.id),0)+1;
let scale=1,offsetX=0,svgW=900;
const H=340,AY=175;
let editId=null,activeId=null,highlightId=null;
let currentEra=null;
let dragging=false,dsx=0,dsox=0;
let hiddenCats=new Set();
let pendingImg='';

const svgEl=document.getElementById('tl-svg');
const wrap=document.getElementById('tl-wrap');
const tipEl=document.getElementById('tip');
const cpop=document.getElementById('cpop');
const clList=document.getElementById('cluster-list');

/* ── Helpers ── */
function fmtY(y){ return y<0?Math.abs(y)+' av. J.-C.':String(y); }
function fmtRange(y,ye){ return (!ye||ye===y)?fmtY(y):fmtY(y)+' – '+fmtY(ye); }
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
  if(key==='all') currentEra={...currentEra,to:TODAY_YEAR};
  buildEraStrip();
  document.getElementById('era-hint').style.display='none';
  const outer=document.getElementById('tl-outer');
  outer.classList.add('show');
  document.getElementById('tl-dot').style.background=currentEra.color;
  const toLabel=(key==='xxi'||key==='all')?'Aujourd\'hui':
    (currentEra.to<0?Math.abs(currentEra.to)+' av. J.-C.':currentEra.to);
  document.getElementById('tl-era-name').textContent=
    currentEra.name+' ('+(currentEra.from<0?Math.abs(currentEra.from)+' av. J.-C.':currentEra.from)+' – '+toLabel+')';
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
  return events.filter(e=>midY(e)>=currentEra.from&&midY(e)<currentEra.to&&!hiddenCats.has(e.cat));
}

/* ── Scale ── */
function getRange(){
  const ev=eraEvents();
  if(!currentEra) return{minY:0,maxY:TODAY_YEAR};
  const to=currentEra.key==='xxi'||currentEra.key==='all'?TODAY_YEAR:currentEra.to;
  const pad=(to-currentEra.from)*0.05;
  const allY=ev.flatMap(e=>[e.year,e.yearEnd||e.year]);
  return{
    minY:Math.min(currentEra.from,...(allY.length?allY:[currentEra.from]))-pad,
    maxY:Math.max(to,...(allY.length?allY:[to]))+pad,
  };
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

/* ── Era gradient configs (for beautiful backgrounds) ── */
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

/* ── Cluster ── */
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
    clusters.push(group);
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

  /* SVG defs: gradients discrets */
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
    <radialGradient id="bg-r1" cx="15%" cy="30%" r="40%">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".09"/>
      <stop offset="100%" stop-color="${bg.c1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bg-r2" cx="85%" cy="70%" r="40%">
      <stop offset="0%" stop-color="${bg.c3}" stop-opacity=".08"/>
      <stop offset="100%" stop-color="${bg.c3}" stop-opacity="0"/>
    </radialGradient>
  </defs>`;

  /* Fond coloré discret en couches */
  h+=`<rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bg-v)"/>`;
  h+=`<rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bg-h)"/>`;
  h+=`<rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bg-r1)"/>`;
  h+=`<rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bg-r2)"/>`;

  /* Grille verticale légère */
  for(let y=st;y<=en;y+=iv){
    const x=yearToX(y);if(x<-5||x>svgW+5) continue;
    h+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${bg.c1}" stroke-width=".4" opacity=".18"/>`;
  }

  /* Marqueur "Aujourd'hui" */
  const todayX=yearToX(TODAY_YEAR);
  if(todayX>=0&&todayX<=svgW){
    h+=`<line x1="${todayX}" y1="0" x2="${todayX}" y2="${H}" stroke="${currentEra.color}" stroke-width="1.5" stroke-dasharray="4 4" opacity=".45"/>`;
    h+=`<rect x="${Math.min(todayX+4,svgW-80)}" y="6" width="72" height="18" rx="9" fill="${currentEra.color}" opacity=".15"/>`;
    h+=`<text x="${Math.min(todayX+40,svgW-44)}" y="19" text-anchor="middle" font-size="10" fill="${currentEra.color}" font-family="'DM Sans',sans-serif" font-weight="500">Aujourd'hui</text>`;
  }

  /* Axe principal */
  h+=`<line x1="0" y1="${AY}" x2="${svgW}" y2="${AY}" stroke="${currentEra.color}" stroke-width="2.5" opacity=".35"/>`;

  /* Ticks + labels */
  for(let y=st;y<=en;y+=iv){
    const x=yearToX(y);if(x<-5||x>svgW+5) continue;
    h+=`<circle cx="${x}" cy="${AY}" r="3.5" fill="${currentEra.color}" opacity=".5"/>`;
    const lbl=y<0?Math.abs(y)+' av.':y===0?'0':y;
    h+=`<text x="${x}" y="${AY+24}" text-anchor="middle" font-size="10" fill="var(--ink3)" font-family="'DM Sans',sans-serif">${lbl}</text>`;
  }

  /* Placement des événements */
  const visible=eraEvents().sort((a,b)=>a.year-b.year);
  const raw=[]; const rowLastX={};
  visible.forEach((ev,i)=>{
    const mx=yearToX(midY(ev));
    const candidates=[];for(let r=1;r<=6;r++) candidates.push(-r,r);
    let row=i%2===0?-1:1;
    for(const r of candidates){if(!rowLastX[r]||mx-rowLastX[r]>105){row=r;break;}}
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

  /* Stems + dots (événements simples) */
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

  /* Cartes événements */
  raw.filter(ev=>singleIds.has(ev.id)).forEach(ev=>{ h+=buildEventCard(ev); });

  svgEl.innerHTML=h;
  svgEl.querySelectorAll('[data-id]').forEach(el=>{
    const id=parseInt(el.dataset.id);
    el.addEventListener('click',e=>{e.stopPropagation();openCard(id,e);});
    el.addEventListener('mousemove',e=>showTip(e,id));
    el.addEventListener('mouseleave',()=>{tipEl.style.display='none';});
  });

  clearClusterOverlays();
  clusters.filter(g=>g.length>1).forEach(group=>buildClusterOverlay(group));
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
  s+=`<text x="${bx+10}" y="${by+34}" font-size="9.5" fill="${c}" opacity=".7" font-family="'DM Sans',sans-serif" data-id="${ev.id}" style="cursor:pointer">${fmtRange(ev.year,ev.yearEnd)}</text>`;
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

/* ── Cluster list ── */
function openClusterList(group,e){
  closeCard();
  document.getElementById('cl-title-span').textContent=group.length+' événements groupés';
  document.getElementById('cl-items').innerHTML=group.sort((a,b)=>a.year-b.year).map(ev=>{
    const cat=CATS[ev.cat]||CATS.autre;
    return `<div class="cl-item" onclick="zoomToEvent(${ev.id})">
      <div class="cl-dot" style="background:${cat.c}"></div>
      <div><div class="cl-name">${ev.title}</div>
      <div class="cl-yr">${fmtRange(ev.year,ev.yearEnd)} · ${cat.e} ${cat.l}</div></div>
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
    <div class="ty" style="color:${cat.c}">${fmtRange(ev.year,ev.yearEnd)} · ${cat.e} ${cat.l}</div>
    ${ev.desc?`<div class="td">${ev.desc.slice(0,100)}${ev.desc.length>100?'…':''}</div>`:''}`;
}

/* ── Card popup (HTML — images dans <img> standard, toujours fonctionnelles) ── */
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
  document.getElementById('cp-dates').innerHTML=isPeriod
    ?`<strong style="color:${cat.c}">${fmtY(ev.year)}</strong><br>→ ${fmtY(ev.yearEnd)}`:fmtY(ev.year);
  document.getElementById('cp-title').textContent=ev.title;
  const pbw=document.getElementById('cp-period-bar-wrap');
  if(isPeriod&&currentEra){
    const span=ev.yearEnd-ev.year;
    const eraSpan=(currentEra.key==='xxi'||currentEra.key==='all'?TODAY_YEAR:currentEra.to)-currentEra.from;
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
  /* Position adaptée mobile */
  const isMobile=window.innerWidth<640;
  if(isMobile){
    cpop.style.position='fixed';cpop.style.bottom='0';cpop.style.left='0';
    cpop.style.right='0';cpop.style.top='auto';cpop.style.width='100%';
    cpop.style.borderRadius='var(--rxl) var(--rxl) 0 0';cpop.style.maxHeight='85vh';cpop.style.overflowY='auto';
  } else {
    cpop.style.position='fixed';cpop.style.bottom='';cpop.style.right='';cpop.style.borderRadius='var(--rxl)';
    cpop.style.top=Math.min(e.clientY-60,window.innerHeight-520)+'px';
    cpop.style.left=Math.min(e.clientX+16,window.innerWidth-370)+'px';
    cpop.style.width='min(350px,90vw)';cpop.style.maxHeight='';cpop.style.overflowY='';
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
    return `<div class="sri" onclick="goToEv(${ev.id})">
      <div class="sri-dot" style="background:${cat.c}"></div>
      <div style="min-width:0">
        <div class="sri-title">${hl(ev.title,q)}</div>
        <div class="sri-meta">${fmtRange(ev.year,ev.yearEnd)} · ${cat.e} ${cat.l}</div>
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
  },180);
}

/* ── Image ── */
function switchImgTab(mode){
  document.querySelectorAll('.img-tab').forEach(t=>t.classList.toggle('active',t.dataset.mode===mode));
  document.querySelectorAll('.img-panel').forEach(p=>p.classList.toggle('active',p.dataset.panel===mode));
}
function handleImg(input){
  const file=input.files[0];if(!file) return;
  if(file.size>5*1024*1024){alert('Image trop lourde (max 5 Mo)');return;}
  const r=new FileReader();
  r.onload=e=>{pendingImg=e.target.result;showImgPreview(pendingImg);};
  r.readAsDataURL(file);
}
function applyImgUrl(){
  const url=document.getElementById('f-img-url').value.trim();
  if(!url) return;
  pendingImg=url;showImgPreview(url);
}
function showImgPreview(src){
  document.getElementById('ipr').style.display='block';
  document.getElementById('iprel').src=src;
  document.getElementById('imgz').style.display='none';
}
function removeImg(){
  pendingImg='';
  document.getElementById('ipr').style.display='none';
  document.getElementById('iprel').src='';
  document.getElementById('imgz').style.display='block';
  document.getElementById('fi').value='';
  const u=document.getElementById('f-img-url');if(u) u.value='';
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
function openAdd(){
  editId=null;pendingImg='';
  document.getElementById('mtitle').textContent='Nouvel événement';
  document.getElementById('ft').value='';
  document.getElementById('fy').value=currentEra?Math.round((currentEra.from+Math.min(currentEra.to,TODAY_YEAR))/2):new Date().getFullYear();
  document.getElementById('fye').value='';
  document.getElementById('fd').value='';
  document.getElementById('fwiki').value='';
  removeImg();buildCatPick('autre');
  document.getElementById('bdel').style.display='none';
  document.getElementById('mbg').classList.add('open');
  setTimeout(()=>document.getElementById('ft').focus(),60);
}
function openEdit(id){
  const ev=events.find(e=>e.id===id);if(!ev) return;
  editId=id;pendingImg=ev.img||'';
  document.getElementById('mtitle').textContent="Modifier l'événement";
  document.getElementById('ft').value=ev.title;
  document.getElementById('fy').value=ev.year;
  document.getElementById('fye').value=ev.yearEnd&&ev.yearEnd!==ev.year?ev.yearEnd:'';
  document.getElementById('fd').value=ev.desc||'';
  document.getElementById('fwiki').value=ev.wiki||'';
  buildCatPick(ev.cat);
  if(ev.img) showImgPreview(ev.img); else removeImg();
  document.getElementById('bdel').style.display='inline-block';
  document.getElementById('mbg').classList.add('open');
}
function closeMod(){ document.getElementById('mbg').classList.remove('open'); }
function saveEv(){
  const title=document.getElementById('ft').value.trim();
  const year=parseInt(document.getElementById('fy').value);
  const yearEndRaw=document.getElementById('fye').value.trim();
  const yearEnd=yearEndRaw!==''?parseInt(yearEndRaw):year;
  const fi=document.getElementById('ft');
  if(!title||isNaN(year)){fi.style.borderColor='#f03060';fi.focus();return;}
  fi.style.borderColor='';
  const desc=document.getElementById('fd').value.trim();
  const cat=document.getElementById('fc').value;
  const wiki=document.getElementById('fwiki').value.trim();
  if(editId) Object.assign(events.find(e=>e.id===editId),{title,year,yearEnd,desc,cat,img:pendingImg,wiki});
  else events.push({id:nextId++,title,year,yearEnd,desc,cat,img:pendingImg,wiki});
  saveSt();closeMod();
  const mid2=Math.round((year+yearEnd)/2);
  const era=ERAS.find(er=>er.key!=='all'&&mid2>=er.from&&mid2<er.to);
  if(era&&(!currentEra||currentEra.key!==era.key)) selectEra(era.key);
  else{render();updZoom();}
}
function deleteEv(){
  if(!editId||!confirm('Supprimer cet événement définitivement ?')) return;
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
  ltx=e.touches[0].clientX;
  if(e.touches.length===2) ltd=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
},{passive:true});
wrap.addEventListener('touchmove',e=>{
  if(e.touches.length===2&&ltd){
    const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
    scale*=d/ltd;ltd=d;render();updZoom();
  } else if(ltx){offsetX+=e.touches[0].clientX-ltx;ltx=e.touches[0].clientX;render();}
},{passive:true});
wrap.addEventListener('touchend',()=>{ltx=null;ltd=null;});

/* ── Keyboard ── */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeMod();closeCard();closeClusterList();clearSearch();}
  if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();document.getElementById('si').focus();}
});
document.addEventListener('click',e=>{
  if(!document.getElementById('sres').contains(e.target)&&e.target!==document.getElementById('si'))
    document.getElementById('sres').classList.remove('open');
});
window.addEventListener('resize',()=>{if(currentEra) render();});

/* ── Init ── */
renderLegend();
buildEraStrip();
