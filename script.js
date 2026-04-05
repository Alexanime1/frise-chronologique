/* ═══ FRISE CHRONOLOGIQUE — script.js ═══ */
const TODAY=new Date(), TODAY_Y=TODAY.getFullYear(), TODAY_M=TODAY.getMonth()+1, TODAY_D=TODAY.getDate();

const CATS={
  politique:{c:'#4f6ef7',bg:'rgba(79,110,247,.13)',l:'Politique',e:'🏛'},
  science:  {c:'#16c47a',bg:'rgba(22,196,122,.13)',l:'Science',e:'🔬'},
  art:      {c:'#f0742a',bg:'rgba(240,116,42,.13)',l:'Art & Culture',e:'🎨'},
  guerre:   {c:'#f03060',bg:'rgba(240,48,96,.13)',l:'Guerre',e:'⚔️'},
  autre:    {c:'#a855f7',bg:'rgba(168,85,247,.13)',l:'Autre',e:'✦'},
};

const ERAS=[
  {key:'all',    name:'Toute l\'histoire',from:-300000,to:TODAY_Y,color:'#8b5cf6'},
  {key:'prehist',name:'Préhistoire',      from:-300000,to:-3200,  color:'#e07820'},
  {key:'antiq',  name:'Antiquité',        from:-3200,  to:476,    color:'#d4a020'},
  {key:'moyen',  name:'Moyen Âge',        from:476,    to:1492,   color:'#4f6ef7'},
  {key:'mod',    name:'Époque Moderne',   from:1492,   to:1789,   color:'#16c47a'},
  {key:'contemp',name:'XIXᵉ siècle',      from:1789,   to:1900,   color:'#f03060'},
  {key:'xx',     name:'XXᵉ siècle',       from:1900,   to:2000,   color:'#a855f7'},
  {key:'xxi',    name:'XXIᵉ siècle',      from:2000,   to:TODAY_Y,color:'#06b6d4'},
];

/* Images: chargées via <img> HTML standard, jamais via SVG <image> */
const I={
  lascaux:  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lascaux_painting.jpg/400px-Lascaux_painting.jpg',
  stone:    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_30.jpg/400px-Stonehenge2007_07_30.jpg',
  pyr:      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/400px-Kheops-Pyramid.jpg',
  colo:     'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/400px-Colosseo_2020.jpg',
  joc:      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/300px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  six:      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/400px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
  revfr:    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg/400px-Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg',
  nap:      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg/400px-Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg',
  darwin:   'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Charles_Darwin_by_Julia_Margaret_Cameron_3.jpg/300px-Charles_Darwin_by_Julia_Margaret_Cameron_3.jpg',
  eiffel:   'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/300px-Tour_Eiffel_Wikimedia_Commons.jpg',
  eins:     'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/300px-Albert_Einstein_Head.jpg',
  dday:     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/400px-Into_the_Jaws_of_Death_23-0455M_edit.jpg',
  lune:     'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/300px-Aldrin_Apollo_11_original.jpg',
  berlin:   'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/De_muur_van_Berlijn.jpg/400px-De_muur_van_Berlijn.jpg',
  s11:      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/September_11_Photo_Montage.jpg/400px-September_11_Photo_Montage.jpg',
  sput:     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sputnik_asm.jpg/400px-Sputnik_asm.jpg',
  usind:    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/United_States_Declaration_of_Independence.jpg/400px-United_States_Declaration_of_Independence.jpg',
  newt:     'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Portrait_of_Sir_Isaac_Newton%2C_1689.jpg/300px-Portrait_of_Sir_Isaac_Newton%2C_1689.jpg',
  char:     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/AlbrechtDurer_-_Portrait_of_Charlemagne_%28c1512%29.jpg/300px-AlbrechtDurer_-_Portrait_of_Charlemagne_%28c1512%29.jpg',
  jeanne:   'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Joan_of_arc_miniature_graded.jpg/300px-Joan_of_arc_miniature_graded.jpg',
  vers:     'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Palace_of_Versailles%2C_2008.jpg/400px-Palace_of_Versailles%2C_2008.jpg',
  bast:     'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Anonymous_-_Prise_de_la_Bastille.jpg/400px-Anonymous_-_Prise_de_la_Bastille.jpg',
  l14:      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Louis_xiv_1701.jpg/300px-Louis_xiv_1701.jpg',
  past:     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Louis_Pasteur_photo.jpg/300px-Louis_Pasteur_photo.jpg',
  hugo:     'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Victor_Hugo_by_%C3%89tienne_Carjat_1876_-_full.jpg/300px-Victor_Hugo_by_%C3%89tienne_Carjat_1876_-_full.jpg',
  impr:     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Monet_-_Impression%2C_Sunrise.jpg/400px-Monet_-_Impression%2C_Sunrise.jpg',
  lum:      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/LouisJeanLumiere.jpg/300px-LouisJeanLumiere.jpg',
  gaul:     'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/De_Gaulle-OWI.jpg/300px-De_Gaulle-OWI.jpg',
  pomp:     'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Pompidou.jpg/400px-Pompidou.jpg',
  mitt:     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Fran%C3%A7ois_Mitterrand_1981.jpg/300px-Fran%C3%A7ois_Mitterrand_1981.jpg',
  mac:      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Emmanuel_Macron_in_2019.jpg/300px-Emmanuel_Macron_in_2019.jpg',
  ww1:      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/The_Battle_of_the_Somme_film.jpg/400px-The_Battle_of_the_Somme_film.jpg',
  corde:    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Concorde_%28airplane%29.jpg/400px-Concorde_%28airplane%29.jpg',
  gandhi:   'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/300px-Mahatma-Gandhi%2C_studio%2C_1931.jpg',
  mand:     'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/300px-Nelson_Mandela_1994.jpg',
  titan:    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/RMS_Titanic_3.jpg/400px-RMS_Titanic_3.jpg',
  wright:   'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/First_flight2.jpg/400px-First_flight2.jpg',
  iphone:   'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/IPhone_1st_Gen.svg/300px-IPhone_1st_Gen.svg.png',
  shak:     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/300px-Shakespeare.jpg',
  beet:     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Beethoven.jpg/300px-Beethoven.jpg',
  luth:     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Lucas_Cranach_the_Elder-_Martin_Luther%2C_1528.jpg/300px-Lucas_Cranach_the_Elder-_Martin_Luther%2C_1528.jpg',
  gut:      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Gutenberg.jpg/300px-Gutenberg.jpg',
  hiro:     'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Atomic_bombing_of_Japan.jpg/400px-Atomic_bombing_of_Japan.jpg',
  chern:    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Chornobylska_AES.jpg/400px-Chornobylska_AES.jpg',
  ndfire:   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Notre-Dame_de_Paris_2019-04-15_Initial_Fire.jpg/400px-Notre-Dame_de_Paris_2019-04-15_Initial_Fire.jpg',
  nd:       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Cath%C3%A9drale_Notre-Dame_de_Paris_2013-07-24.jpg/300px-Cath%C3%A9drale_Notre-Dame_de_Paris_2013-07-24.jpg',
  covid:    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/400px-SARS-CoV-2_without_background.png',
  ukr:      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/400px-Flag_of_Ukraine.svg.png',
  jo24:     'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/2024_Summer_Olympics_Opening_Ceremony_Eiffel_Tower.jpg/400px-2024_Summer_Olympics_Opening_Ceremony_Eiffel_Tower.jpg',
  marx:     'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Karl_Marx_001.jpg/300px-Karl_Marx_001.jpg',
  water:    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Battle_of_Waterloo_1815.PNG/400px-Battle_of_Waterloo_1815.PNG',
  tunnel:   'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Channel_Tunnel_map.svg/400px-Channel_Tunnel_map.svg.png',
  verdun:   'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Trench_warfare_-_used_to_illustrate_%22If_ye_break_faith%22.jpg/400px-Trench_warfare_-_used_to_illustrate_%22If_ye_break_faith%22.jpg',
  wall:     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20090529_great_wall_8185.jpg/400px-20090529_great_wall_8185.jpg',
  colomb:   'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sebastiano_del_Piombo_004.jpg/300px-Sebastiano_del_Piombo_004.jpg',
  www:      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Internet_map_1024.jpg/400px-Internet_map_1024.jpg',
  fb:       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/300px-Facebook_f_logo_%282019%29.svg.png',
  dna:      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/DNA_Structure%2BKey%2BLabelled.pn_NoBB.png/300px-DNA_Structure%2BKey%2BLabelled.pn_NoBB.png',
  hubble:   'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/400px-HST-SM4.jpeg',
  gag:      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Yuri_Gagarin_%281961%29_-_Restoration.jpg/300px-Yuri_Gagarin_%281961%29_-_Restoration.jpg',
  wstock:   'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Joan_Baez_Bob_Dylan.jpg/400px-Joan_Baez_Bob_Dylan.jpg',
  obama:    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/300px-President_Barack_Obama.jpg',
  bell:     'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Alexander_Graham_Bell_telephone_1876.jpg/300px-Alexander_Graham_Bell_telephone_1876.jpg',
};

const DEFAULTS=[
  /* ── PRÉHISTOIRE ── */
  {id:1,  y:-300000,title:'Maîtrise du feu',wiki:'Maîtrise du feu par les hominidés',desc:"L'Homo erectus contrôle le feu. Révolution pour la cuisine, le chauffage et la protection.",cat:'science',img:I.lascaux},
  {id:2,  y:-40000,ye:-10000,title:'Art pariétal',wiki:'Art pariétal',desc:"Peintures de Chauvet (~37 000 av. J.-C.) et Lascaux (~17 000). Premières œuvres d'art connues.",cat:'art',img:I.lascaux},
  {id:3,  y:-10000,ye:-4000,title:'Révolution néolithique',wiki:'Révolution néolithique',desc:"Agriculture, élevage, sédentarisation. Les humains cessent d'être chasseurs-cueilleurs.",cat:'science',img:I.stone},
  {id:4,  y:-5000,ye:-1500,title:'Mégalithes & Stonehenge',wiki:'Mégalithe',desc:"Stonehenge (Angleterre), alignements de Carnac (Bretagne). Monuments astronomiques européens.",cat:'autre',img:I.stone},
  {id:5,  y:-3500,title:'Invention de la roue',wiki:'Roue',desc:"Inventée en Mésopotamie. Révolution du transport et de l'artisanat.",cat:'science',img:''},
  /* ── ANTIQUITÉ ── */
  {id:6,  y:-3200,title:'Invention de l\'écriture',wiki:'Histoire de l\'écriture',desc:"Cunéiforme sumérien et hiéroglyphes égyptiens. La mémoire humaine prend une forme écrite.",cat:'science',img:''},
  {id:7,  y:-2700,ye:-2560,title:'Pyramides de Gizeh',wiki:'Pyramide de Khéops',desc:"Khéops, Khéphren, Mykérinos. Seule des Sept Merveilles encore debout.",cat:'art',img:I.pyr},
  {id:8,  y:-2200,ye:-1700,title:'Grande Muraille de Chine',wiki:'Grande Muraille de Chine',desc:"Premières sections construites sous les États combattants. Qin Shi Huang les unifiera.",cat:'autre',img:I.wall},
  {id:9,  y:-776,m:1,title:'Premiers Jeux Olympiques',wiki:'Jeux olympiques antiques',desc:"Jeux panhelléniques à Olympie. Trêve sacrée entre cités grecques en l'honneur de Zeus.",cat:'autre',img:''},
  {id:10, y:-753,title:'Fondation de Rome',wiki:'Fondation de Rome',desc:"Romulus fonde Rome sur le Palatin. La cité deviendra capitale d'un empire méditerranéen.",cat:'politique',img:I.colo},
  {id:11, y:-551,ye:-479,title:'Confucius',wiki:'Confucius',desc:"Le philosophe chinois fonde l'éthique confucéenne. Sa pensée influence toute l'Asie pendant 2500 ans.",cat:'art',img:''},
  {id:12, y:-490,ye:-479,title:'Guerres médiques',wiki:'Guerres médiques',desc:"Marathon (490), Salamine (480). La démocratie grecque résiste à l'invasion perse.",cat:'guerre',img:''},
  {id:13, y:-356,ye:-323,title:'Alexandre le Grand',wiki:'Alexandre le Grand',desc:"Conquête de la Grèce à l'Inde. Diffusion de la culture hellénique en Asie centrale.",cat:'guerre',img:''},
  {id:14, y:-221,ye:-206,title:'Unification de la Chine',wiki:'Qin Shi Huang',desc:"Qin Shi Huang unifie les royaumes chinois. Premier Empereur, il ordonne la Grande Muraille.",cat:'politique',img:I.wall},
  {id:15, y:-44,m:3,d:15,title:'Assassinat de Jules César',wiki:'Jules César',desc:"César poignardé aux Ides de Mars au Sénat par Brutus et ses complices. Rome entre en guerre civile.",cat:'politique',img:''},
  {id:16, y:-27,ye:14,title:'Auguste, premier Empereur',wiki:'Auguste',desc:"Octave Auguste instaure le Principat. Son règne de 41 ans inaugure la Pax Romana.",cat:'politique',img:I.colo},
  {id:17, y:0,title:'Naissance de Jésus-Christ',wiki:'Jésus de Nazareth',desc:"Naissance du fondateur du christianisme en Judée. Sa doctrine transformera l'Europe deux millénaires.",cat:'autre',img:''},
  {id:18, y:79,m:8,d:24,title:'Éruption du Vésuve',wiki:'Éruption du Vésuve de 79',desc:"Pompéi et Herculanum ensevelies. Les villes romaines figées révèlent la vie antique.",cat:'autre',img:I.colo},
  {id:19, y:105,title:'Invention du papier (Chine)',wiki:'Histoire du papier',desc:"Cai Lun perfectionne le papier sous la dynastie Han. Révolution de la diffusion du savoir.",cat:'science',img:''},
  {id:20, y:313,title:'Édit de Milan',wiki:'Édit de Milan',desc:"Constantin accorde la liberté de culte. Fin des persécutions des chrétiens dans l'Empire romain.",cat:'politique',img:''},
  {id:21, y:476,title:'Chute de Rome',wiki:'Chute de l\'Empire romain d\'Occident',desc:"Romulus Augustule déposé par Odoacre. Fin de l'Antiquité, début du Moyen Âge.",cat:'guerre',img:I.colo},
  /* ── MOYEN ÂGE ── */
  {id:22, y:622,title:'Hégire de Mahomet',wiki:'Hégire',desc:"Mahomet fuit La Mecque pour Médine le 16 juillet 622. Naissance du calendrier islamique.",cat:'autre',img:''},
  {id:23, y:732,m:10,title:'Bataille de Poitiers',wiki:'Bataille de Poitiers (732)',desc:"Charles Martel arrête l'avancée arabo-berbère en Occident.",cat:'guerre',img:''},
  {id:24, y:800,m:12,d:25,title:'Couronnement de Charlemagne',wiki:'Charlemagne',desc:"Charlemagne couronné Empereur d'Occident le 25 décembre par le pape Léon III à Rome.",cat:'politique',img:I.char},
  {id:25, y:987,title:'Hugues Capet roi de France',wiki:'Hugues Capet',desc:"Hugues Capet fonde la dynastie capétienne qui régnera 341 ans. Début de la France moderne.",cat:'politique',img:''},
  {id:26, y:1054,title:'Grand Schisme d\'Orient',wiki:'Grand Schisme de 1054',desc:"Séparation de l'Église catholique et de l'Église orthodoxe. Rupture qui dure encore aujourd'hui.",cat:'autre',img:''},
  {id:27, y:1066,m:10,d:14,title:'Conquête normande de l\'Angleterre',wiki:'Conquête normande de l\'Angleterre',desc:"Guillaume bat Harold II à Hastings le 14 octobre. Il devient roi d'Angleterre.",cat:'guerre',img:''},
  {id:28, y:1095,ye:1099,title:'Première Croisade',wiki:'Première croisade',desc:"Appel du pape Urbain II à Clermont. Les croisés prennent Jérusalem le 15 juillet 1099.",cat:'guerre',img:''},
  {id:29, y:1163,ye:1345,title:'Cathédrale Notre-Dame de Paris',wiki:'Cathédrale Notre-Dame de Paris',desc:"Construction de la cathédrale gothique sur l'île de la Cité. Chef-d'œuvre médiéval.",cat:'art',img:I.nd},
  {id:30, y:1206,ye:1227,title:'Empire mongol — Gengis Khan',wiki:'Empire mongol',desc:"Gengis Khan unifie les tribus. Plus grand empire terrestre contigu de l'histoire.",cat:'guerre',img:''},
  {id:31, y:1215,m:6,d:15,title:'Magna Carta',wiki:'Magna Carta',desc:"Jean sans Terre signe la Grande Charte le 15 juin. Premières bases de l'État de droit.",cat:'politique',img:''},
  {id:32, y:1271,ye:1295,title:'Voyages de Marco Polo',wiki:'Marco Polo',desc:"Le Vénitien voyage jusqu'en Chine et séjourne à la cour de Kubilaï Khan.",cat:'autre',img:''},
  {id:33, y:1337,ye:1453,title:'Guerre de Cent Ans',wiki:'Guerre de Cent Ans',desc:"Conflit franco-anglais pour la couronne de France. Jeanne d'Arc y renversera le cours de l'histoire.",cat:'guerre',img:I.jeanne},
  {id:34, y:1347,ye:1353,title:'La Peste Noire',wiki:'Peste noire',desc:"Pandémie de peste bubonique. Tue entre un tiers et la moitié de la population européenne.",cat:'autre',img:''},
  {id:35, y:1429,m:5,d:8,title:'Jeanne d\'Arc libère Orléans',wiki:'Jeanne d\'Arc',desc:"La Pucelle d'Orléans lève le siège le 8 mai 1429. Tournant de la Guerre de Cent Ans.",cat:'guerre',img:I.jeanne},
  {id:36, y:1431,m:5,d:30,title:'Jeanne d\'Arc brûlée à Rouen',wiki:'Procès de Jeanne d\'Arc',desc:"Condamnée par un tribunal pro-anglais, Jeanne est brûlée vive le 30 mai 1431.",cat:'guerre',img:I.jeanne},
  {id:37, y:1453,m:5,d:29,title:'Chute de Constantinople',wiki:'Chute de Constantinople',desc:"Mehmed II prend Constantinople le 29 mai. Fin de Byzance, début de l'ère ottomane.",cat:'guerre',img:''},
  /* ── ÉPOQUE MODERNE ── */
  {id:38, y:1440,ye:1450,title:'Gutenberg & l\'imprimerie',wiki:'Johannes Gutenberg',desc:"La presse à caractères mobiles révolutionne la diffusion du savoir en Europe.",cat:'science',img:I.gut},
  {id:39, y:1492,m:10,d:12,title:'Christophe Colomb',wiki:'Christophe Colomb',desc:"Colomb atteint les Bahamas le 12 octobre. L'Amérique entre dans l'histoire européenne.",cat:'politique',img:I.colomb},
  {id:40, y:1498,title:'Vasco de Gama aux Indes',wiki:'Vasco de Gama',desc:"Vasco de Gama contourne l'Afrique et atteint l'Inde. La route maritime des épices est ouverte.",cat:'politique',img:''},
  {id:41, y:1503,ye:1506,title:'La Joconde',wiki:'La Joconde',desc:"Léonard de Vinci peint Mona Lisa. Aujourd'hui le tableau le plus célèbre du monde au Louvre.",cat:'art',img:I.joc},
  {id:42, y:1508,ye:1512,title:'Chapelle Sixtine',wiki:'Chapelle Sixtine',desc:"Michel-Ange peint le plafond sur commande du pape Jules II. La Création d'Adam en est l'image emblématique.",cat:'art',img:I.six},
  {id:43, y:1515,m:9,d:13,title:'Victoire de Marignan',wiki:'Bataille de Marignan',desc:"François Ier bat les Suisses le 13 septembre. Victoire brillante, début de la Renaissance française.",cat:'guerre',img:''},
  {id:44, y:1517,m:10,d:31,title:'Réforme protestante — Luther',wiki:'Réforme protestante',desc:"Luther affiche ses 95 thèses le 31 octobre 1517. La chrétienté se divise entre catholiques et protestants.",cat:'politique',img:I.luth},
  {id:45, y:1519,ye:1522,title:'Tour du monde de Magellan',wiki:'Expédition Magellan-Elcano',desc:"Magellan et Elcano accomplissent le premier tour du monde complet. La Terre est définitivement ronde.",cat:'science',img:''},
  {id:46, y:1543,title:'Copernic : héliocentrisme',wiki:'Nicolas Copernic',desc:"Copernic publie sa théorie : la Terre tourne autour du Soleil. Révolution scientifique.",cat:'science',img:''},
  {id:47, y:1572,m:8,d:24,title:'Nuit de la Saint-Barthélemy',wiki:'Massacre de la Saint-Barthélemy',desc:"Milliers de protestants massacrés à Paris le 24 août. Paroxysme des guerres de Religion.",cat:'guerre',img:''},
  {id:48, y:1598,m:4,d:13,title:'Édit de Nantes',wiki:'Édit de Nantes',desc:"Henri IV accorde la liberté de culte aux protestants le 13 avril. Fin des guerres de Religion.",cat:'politique',img:''},
  {id:49, y:1600,ye:1616,title:'Shakespeare',wiki:'William Shakespeare',desc:"L'auteur de Hamlet, Othello et Roméo et Juliette. Plus grande plume de langue anglaise.",cat:'art',img:I.shak},
  {id:50, y:1610,m:5,d:14,title:'Assassinat d\'Henri IV',wiki:'Henri IV (roi de France)',desc:"Henri IV poignardé par Ravaillac le 14 mai 1610 rue de la Ferronnerie à Paris.",cat:'politique',img:''},
  {id:51, y:1643,ye:1715,title:'Règne de Louis XIV',wiki:'Louis XIV',desc:"Le Roi-Soleil règne 72 ans. Versailles, absolutisme, rayonnement culturel sans précédent.",cat:'politique',img:I.l14},
  {id:52, y:1661,ye:1710,title:'Château de Versailles',wiki:'Château de Versailles',desc:"Louis XIV transforme le pavillon de chasse en palais monumental. Symbole de l'absolutisme.",cat:'art',img:I.vers},
  {id:53, y:1687,title:'Principia de Newton',wiki:'Philosophiae Naturalis Principia Mathematica',desc:"Newton publie ses lois de la gravitation universelle. Une des œuvres scientifiques les plus importantes.",cat:'science',img:I.newt},
  {id:54, y:1751,ye:1772,title:'L\'Encyclopédie',wiki:'Encyclopédie',desc:"Diderot et d'Alembert publient 28 volumes. Synthèse des Lumières françaises.",cat:'art',img:''},
  {id:55, y:1759,title:'Candide de Voltaire',wiki:'Candide',desc:"Chef-d'œuvre des Lumières. Voltaire dénonce la guerre, le fanatisme et l'injustice sociale.",cat:'art',img:''},
  {id:56, y:1776,m:7,d:4,title:'Indépendance américaine',wiki:'Déclaration d\'indépendance des États-Unis',desc:"Déclaration signée le 4 juillet 1776. « Tous les hommes sont créés égaux. »",cat:'politique',img:I.usind},
  /* ── XIXe ── */
  {id:57, y:1789,m:7,d:14,title:'Prise de la Bastille',wiki:'Prise de la Bastille',desc:"Le peuple prend la Bastille le 14 juillet 1789. Symbole de la Révolution française.",cat:'politique',img:I.bast},
  {id:58, y:1789,ye:1799,title:'Révolution française',wiki:'Révolution française',desc:"De la Déclaration des droits de l'homme à la Terreur. La monarchie est abolie, la République proclamée.",cat:'politique',img:I.revfr},
  {id:59, y:1793,m:1,d:21,title:'Exécution de Louis XVI',wiki:'Louis XVI',desc:"Louis XVI guillotiné le 21 janvier 1793. La monarchie française prend fin pour la première fois.",cat:'politique',img:''},
  {id:60, y:1799,ye:1815,title:'Empire napoléonien',wiki:'Napoléon Ier',desc:"Napoléon se couronne Empereur. Code civil, réorganisation de l'Europe. Vaincu à Waterloo en 1815.",cat:'politique',img:I.nap},
  {id:61, y:1804,ye:1827,title:'Beethoven — Symphonies',wiki:'Ludwig van Beethoven',desc:"Sourd depuis 1814, Beethoven compose ses neuf symphonies dont la 9e avec l'Ode à la Joie.",cat:'art',img:I.beet},
  {id:62, y:1812,title:'Retraite de Russie',wiki:'Campagne de Russie',desc:"La Grande Armée envahit la Russie mais recule dévastée par l'hiver. 400 000 soldats meurent.",cat:'guerre',img:''},
  {id:63, y:1815,m:6,d:18,title:'Bataille de Waterloo',wiki:'Bataille de Waterloo',desc:"Napoléon vaincu par Wellington le 18 juin. Exil définitif à Sainte-Hélène.",cat:'guerre',img:I.water},
  {id:64, y:1830,m:7,d:27,ye:1830,me:7,de:29,title:'Révolution de Juillet',wiki:'Révolution de Juillet',desc:"Les Trois Glorieuses (27-29 juillet) renversent Charles X. Louis-Philippe devient roi.",cat:'politique',img:''},
  {id:65, y:1848,title:'Manifeste communiste',wiki:'Manifeste du Parti communiste',desc:"Marx et Engels : « Prolétaires de tous les pays, unissez-vous ! » Texte fondateur du socialisme.",cat:'politique',img:I.marx},
  {id:66, y:1848,title:'Printemps des Peuples',wiki:'Printemps des peuples',desc:"Vague révolutionnaire en Europe : France, Autriche, Prusse, Italie, Hongrie.",cat:'politique',img:''},
  {id:67, y:1859,m:11,d:24,title:'Darwin — L\'Origine des espèces',wiki:'De l\'origine des espèces',desc:"Darwin publie sa théorie de l'évolution le 24 novembre. Révolution dans la biologie.",cat:'science',img:I.darwin},
  {id:68, y:1861,ye:1865,title:'Guerre de Sécession',wiki:'Guerre de Sécession',desc:"La victoire du Nord permet l'abolition de l'esclavage (13e amendement). 620 000 morts.",cat:'guerre',img:''},
  {id:69, y:1862,title:'Les Misérables — Victor Hugo',wiki:'Les Misérables',desc:"Hugo publie son roman-fleuve sur la misère sociale. Jean Valjean entre dans la légende mondiale.",cat:'art',img:I.hugo},
  {id:70, y:1869,m:11,d:17,title:'Canal de Suez inauguré',wiki:'Canal de Suez',desc:"Inauguré le 17 novembre 1869. Le trajet Europe-Asie est réduit de 7 000 km.",cat:'autre',img:''},
  {id:71, y:1870,ye:1871,title:'Guerre franco-prussienne',wiki:'Guerre franco-prussienne de 1870',desc:"La France est vaincue. L'Alsace-Lorraine annexée. Naissance de la IIIe République.",cat:'guerre',img:''},
  {id:72, y:1874,ye:1886,title:'Impressionnisme',wiki:'Impressionnisme',desc:"Monet, Renoir, Pissarro, Degas révolutionnent la peinture. « Impression, Soleil levant » donne son nom.",cat:'art',img:I.impr},
  {id:73, y:1876,m:3,d:10,title:'Invention du téléphone',wiki:'Alexander Graham Bell',desc:"Bell invente le téléphone le 10 mars 1876. La communication à distance entre dans une nouvelle ère.",cat:'science',img:I.bell},
  {id:74, y:1878,ye:1895,title:'Louis Pasteur & microbiologie',wiki:'Louis Pasteur',desc:"Pasteur prouve la théorie germinale. Vaccin contre la rage (1885). Révolution médicale mondiale.",cat:'science',img:I.past},
  {id:75, y:1885,title:'Première automobile — Benz',wiki:'Karl Benz',desc:"Karl Benz construit la Motorwagen. Première automobile à moteur à essence, 16 km/h.",cat:'science',img:''},
  {id:76, y:1889,m:3,d:31,title:'Tour Eiffel inaugurée',wiki:'Tour Eiffel',desc:"La Tour Eiffel inaugurée le 31 mars 1889 pour l'Exposition universelle. Symbole de Paris.",cat:'art',img:I.eiffel},
  {id:77, y:1895,m:12,d:28,title:'Cinéma des frères Lumière',wiki:'Frères Lumière',desc:"Première projection publique du cinématographe le 28 décembre au Grand Café à Paris.",cat:'art',img:I.lum},
  {id:78, y:1896,title:'Jeux Olympiques modernes',wiki:'Jeux olympiques d\'été de 1896',desc:"Pierre de Coubertin organise les premiers JO modernes à Athènes. 14 nations, 241 athlètes.",cat:'autre',img:''},
  {id:79, y:1894,ye:1906,title:'Affaire Dreyfus',wiki:'Affaire Dreyfus',desc:"Dreyfus faussement accusé de trahison divise la France. L'affaire révèle un antisémitisme profond.",cat:'politique',img:''},
  /* ── XXe ── */
  {id:80, y:1903,m:12,d:17,title:'Premier vol motorisé',wiki:'Frères Wright',desc:"Orville Wright vole 12 secondes le 17 décembre à Kitty Hawk. L'aviation est née.",cat:'science',img:I.wright},
  {id:81, y:1905,title:'Relativité d\'Einstein',wiki:'Théorie de la relativité restreinte',desc:"Einstein publie E=mc² à 26 ans. Révolution de la physique : espace et temps sont liés.",cat:'science',img:I.eins},
  {id:82, y:1905,m:12,d:9,title:'Loi de séparation Église-État',wiki:'Loi de séparation des Églises et de l\'État',desc:"La France vote la laïcité le 9 décembre 1905. L'État ne reconnaît plus aucun culte.",cat:'politique',img:''},
  {id:83, y:1912,m:4,d:15,title:'Naufrage du Titanic',wiki:'Titanic',desc:"Le Titanic coule le 15 avril 1912. 1 514 victimes lors de son voyage inaugural dans l'Atlantique.",cat:'autre',img:I.titan},
  {id:84, y:1914,m:6,d:28,ye:1918,me:11,de:11,title:'Première Guerre mondiale',wiki:'Première Guerre mondiale',desc:"Du 28 juin 1914 à l'armistice du 11 novembre 1918. 18 à 20 millions de morts.",cat:'guerre',img:I.ww1},
  {id:85, y:1916,m:2,d:21,ye:1916,me:12,de:18,title:'Bataille de Verdun',wiki:'Bataille de Verdun',desc:"Du 21 février au 18 décembre 1916. 300 000 morts. Symbole de l'horreur des tranchées.",cat:'guerre',img:I.verdun},
  {id:86, y:1917,m:11,d:7,title:'Révolution russe d\'Octobre',wiki:'Révolution russe',desc:"Les bolchéviques prennent le pouvoir le 7 novembre. Naissance de l'URSS, premier État communiste.",cat:'politique',img:''},
  {id:87, y:1918,m:11,d:11,title:'Armistice — 11 novembre 1918',wiki:'Armistice du 11 novembre 1918',desc:"L'armistice est signé à 11h le 11 novembre dans la forêt de Compiègne. Fin de la WW1.",cat:'guerre',img:''},
  {id:88, y:1929,m:10,d:24,ye:1932,title:'Grande Dépression',wiki:'Grande Dépression',desc:"Krach boursier du 24 octobre (Jeudi Noir). Pire crise économique mondiale du XXe siècle.",cat:'autre',img:''},
  {id:89, y:1933,ye:1945,title:'Régime nazi',wiki:'Adolf Hitler',desc:"Hitler prend le pouvoir le 30 janvier 1933. Le nazisme mène à la Shoah et à la Seconde Guerre mondiale.",cat:'guerre',img:''},
  {id:90, y:1936,ye:1938,title:'Front Populaire',wiki:'Front populaire (France)',desc:"Léon Blum instaure les congés payés et la semaine de 40h. Victoire historique de la gauche.",cat:'politique',img:''},
  {id:91, y:1939,m:9,d:1,ye:1945,me:9,de:2,title:'Seconde Guerre mondiale',wiki:'Seconde Guerre mondiale',desc:"Du 1er septembre 1939 au 2 septembre 1945. 70-85 millions de morts, Shoah, bombes atomiques.",cat:'guerre',img:I.dday},
  {id:92, y:1940,m:6,d:18,title:'Appel du 18 juin',wiki:'Appel du 18 juin',desc:"De Gaulle lance son appel depuis la BBC le 18 juin 1940. Naissance de la France Libre.",cat:'politique',img:I.gaul},
  {id:93, y:1944,m:6,d:6,title:'Débarquement en Normandie — D-Day',wiki:'Débarquement en Normandie',desc:"Le 6 juin 1944, 150 000 soldats alliés débarquent sur les plages normandes. Tournant de la guerre.",cat:'guerre',img:I.dday},
  {id:94, y:1944,m:4,d:21,title:'Droit de vote des femmes en France',wiki:'Droit de vote des femmes en France',desc:"L'ordonnance du 21 avril 1944 accorde le droit de vote aux femmes françaises.",cat:'politique',img:''},
  {id:95, y:1945,m:8,d:6,title:'Bombe atomique sur Hiroshima',wiki:'Bombardements atomiques d\'Hiroshima et Nagasaki',desc:"La bombe atomique est larguée sur Hiroshima le 6 août 1945. 80 000 morts instantanément.",cat:'guerre',img:I.hiro},
  {id:96, y:1945,m:8,d:9,title:'Bombe atomique sur Nagasaki',wiki:'Bombardement atomique de Nagasaki',desc:"Deuxième bombe larguée sur Nagasaki le 9 août 1945. 40 000 morts. Le Japon capitule.",cat:'guerre',img:I.hiro},
  {id:97, y:1945,m:6,d:26,title:'Création de l\'ONU',wiki:'Organisation des Nations unies',desc:"L'ONU est fondée le 26 juin 1945 à San Francisco pour maintenir la paix mondiale.",cat:'politique',img:''},
  {id:98, y:1947,m:8,d:15,title:'Indépendance de l\'Inde',wiki:'Indépendance de l\'Inde',desc:"L'Inde accède à l'indépendance le 15 août 1947. Fin de deux siècles de colonisation britannique.",cat:'politique',img:I.gandhi},
  {id:99, y:1948,m:12,d:10,title:'Déclaration universelle des droits de l\'homme',wiki:'Déclaration universelle des droits de l\'homme',desc:"Adoptée le 10 décembre 1948. 30 articles proclamant les droits inaliénables de tout être humain.",cat:'politique',img:''},
  {id:100,y:1948,m:5,d:14,title:'Création de l\'État d\'Israël',wiki:'Déclaration d\'indépendance d\'Israël',desc:"Ben Gourion proclame l'État d'Israël le 14 mai 1948. Conflit israélo-arabe immédiat.",cat:'politique',img:''},
  {id:101,y:1950,ye:1953,title:'Guerre de Corée',wiki:'Guerre de Corée',desc:"Premier conflit de la Guerre froide. La Corée est définitivement divisée en deux États.",cat:'guerre',img:''},
  {id:102,y:1953,m:4,d:25,title:'ADN — double hélice',wiki:'Acide désoxyribonucléique',desc:"Watson et Crick publient la structure en double hélice le 25 avril 1953. Naissance de la biologie moléculaire.",cat:'science',img:I.dna},
  {id:103,y:1954,ye:1962,title:'Guerre d\'Algérie',wiki:'Guerre d\'Algérie',desc:"De 1954 à 1962. Fin par les accords d'Évian. L'Algérie indépendante le 5 juillet 1962.",cat:'guerre',img:''},
  {id:104,y:1955,m:12,d:1,title:'Rosa Parks refuse de céder sa place',wiki:'Rosa Parks',desc:"Rosa Parks refuse de se lever pour un Blanc à Montgomery le 1er décembre 1955. Symbole des droits civiques.",cat:'politique',img:''},
  {id:105,y:1957,m:3,d:25,title:'Traité de Rome — CEE',wiki:'Traité de Rome (1957)',desc:"Signature le 25 mars 1957. Fondation de la CEE, ancêtre de l'Union européenne.",cat:'politique',img:''},
  {id:106,y:1957,m:10,d:4,title:'Spoutnik dans l\'espace',wiki:'Spoutnik 1',desc:"L'URSS lance Spoutnik 1 le 4 octobre 1957. Premier satellite artificiel. Début de la conquête spatiale.",cat:'science',img:I.sput},
  {id:107,y:1961,m:4,d:12,title:'Gagarine dans l\'espace',wiki:'Youri Gagarine',desc:"Le 12 avril 1961, Gagarine est le premier humain dans l'espace. Son vol dure 108 minutes.",cat:'science',img:I.gag},
  {id:108,y:1961,ye:1989,title:'Mur de Berlin',wiki:'Mur de Berlin',desc:"Construit le 13 août 1961. Symbole de la Guerre froide. Il tombera le 9 novembre 1989.",cat:'politique',img:I.berlin},
  {id:109,y:1963,m:8,d:28,title:'Discours « I Have a Dream »',wiki:'I Have a Dream',desc:"Martin Luther King prononce son discours historique à Washington le 28 août 1963.",cat:'politique',img:''},
  {id:110,y:1963,m:11,d:22,title:'Assassinat de JFK',wiki:'Assassinat de John F. Kennedy',desc:"Kennedy assassiné à Dallas le 22 novembre 1963. L'Amérique bascule dans une ère de doute.",cat:'politique',img:''},
  {id:111,y:1967,m:12,d:3,title:'Première transplantation cardiaque',wiki:'Transplantation cardiaque',desc:"Christian Barnard réalise la première transplantation cardiaque le 3 décembre 1967 à Cape Town.",cat:'science',img:''},
  {id:112,y:1968,title:'Mai 68 en France',wiki:'Mai 68',desc:"Étudiants et ouvriers paralysent la France en mai. Profonde transformation de la société française.",cat:'politique',img:''},
  {id:113,y:1969,m:7,d:21,title:'Premiers pas sur la Lune',wiki:'Apollo 11',desc:"Neil Armstrong marche sur la Lune le 21 juillet à 02h56 UTC. 600 millions de téléspectateurs.",cat:'science',img:I.lune},
  {id:114,y:1969,m:8,d:15,ye:1969,me:8,de:18,title:'Festival de Woodstock',wiki:'Festival de Woodstock',desc:"Du 15 au 18 août 1969. 400 000 personnes. Symbole de la contre-culture hippie.",cat:'art',img:I.wstock},
  {id:115,y:1970,m:4,d:22,title:'Premier Jour de la Terre',wiki:'Jour de la Terre',desc:"Le 22 avril 1970, 20 millions d'Américains manifestent pour l'environnement. Naissance de l'écologie.",cat:'autre',img:''},
  {id:116,y:1975,ye:1994,title:'Nelson Mandela & apartheid',wiki:'Nelson Mandela',desc:"Libéré en 1990 après 27 ans de prison. Président d'Afrique du Sud en 1994. Fin de l'apartheid.",cat:'politique',img:I.mand},
  {id:117,y:1976,ye:2003,title:'Concorde en service',wiki:'Concorde',desc:"L'avion supersonique franco-britannique relie Paris à New York en 3h30. Retrait en 2003.",cat:'science',img:I.corde},
  {id:118,y:1977,m:1,d:31,title:'Centre Pompidou inauguré',wiki:'Centre Georges-Pompidou',desc:"Le musée d'art moderne au design révolutionnaire (Piano & Rogers) ouvre le 31 janvier 1977.",cat:'art',img:I.pomp},
  {id:119,y:1981,m:10,d:9,title:'Abolition de la peine de mort en France',wiki:'Abolition de la peine de mort en France',desc:"Vote de la loi Badinter le 9 octobre 1981. La guillotine est abolie en France.",cat:'politique',img:''},
  {id:120,y:1981,ye:1995,title:'François Mitterrand Président',wiki:'François Mitterrand',desc:"Premier président socialiste de la Ve République. Abolition de la peine de mort, Tunnel sous la Manche.",cat:'politique',img:I.mitt},
  {id:121,y:1984,m:1,d:24,title:'Apple Macintosh',wiki:'Apple Macintosh',desc:"Apple lance le Mac le 24 janvier 1984. Souris et interface graphique entrent dans les foyers.",cat:'science',img:''},
  {id:122,y:1986,m:4,d:26,title:'Tchernobyl',wiki:'Catastrophe de Tchernobyl',desc:"Le réacteur n°4 explose le 26 avril 1986. La plus grave catastrophe nucléaire civile de l'histoire.",cat:'autre',img:I.chern},
  {id:123,y:1989,m:11,d:9,title:'Chute du mur de Berlin',wiki:'Chute du mur de Berlin',desc:"Le mur de Berlin tombe le 9 novembre 1989. Symbole de la fin de la Guerre froide.",cat:'politique',img:I.berlin},
  {id:124,y:1989,m:6,d:5,title:'Tiananmen — l\'Homme de la Place',wiki:'Manifestations de la place Tian\'anmen',desc:"Le 5 juin 1989, un homme inconnu arrête seul une colonne de chars à Pékin.",cat:'politique',img:''},
  {id:125,y:1990,m:4,d:24,title:'Lancement du télescope Hubble',wiki:'Télescope spatial Hubble',desc:"Hubble est lancé le 24 avril 1990. Il révolutionnera notre vision de l'univers pendant 30 ans.",cat:'science',img:I.hubble},
  {id:126,y:1991,m:12,d:25,title:'Dissolution de l\'URSS',wiki:'Dissolution de l\'Union soviétique',desc:"Gorbatchev démissionne le 25 décembre 1991. L'URSS se dissout en 15 États.",cat:'politique',img:''},
  {id:127,y:1991,m:12,d:20,title:'Naissance du World Wide Web',wiki:'World Wide Web',desc:"Tim Berners-Lee publie le premier site web le 20 décembre 1991 au CERN à Genève.",cat:'science',img:I.www},
  {id:128,y:1994,m:5,d:6,title:'Tunnel sous la Manche',wiki:'Tunnel sous la Manche',desc:"Le tunnel ouvre le 6 mai 1994. Paris-Londres en 2h15. Exploit d'ingénierie franco-britannique.",cat:'science',img:I.tunnel},
  {id:129,y:1994,m:4,d:7,ye:1994,me:7,title:'Génocide au Rwanda',wiki:'Génocide des Tutsis au Rwanda',desc:"Du 7 avril au 17 juillet 1994. 800 000 Tutsis massacrés en 100 jours.",cat:'guerre',img:''},
  {id:130,y:1995,m:7,d:11,title:'Massacre de Srebrenica',wiki:'Massacre de Srebrenica',desc:"Les forces serbes de Bosnie massacrent 8 000 Bosniaques musulmans le 11 juillet 1995.",cat:'guerre',img:''},
  {id:131,y:1997,m:7,d:1,title:'Rétrocession de Hong Kong',wiki:'Rétrocession de Hong Kong',desc:"Le Royaume-Uni restitue Hong Kong à la Chine le 1er juillet 1997 après 156 ans de colonisation.",cat:'politique',img:''},
  /* ── XXIe ── */
  {id:132,y:2001,m:9,d:11,title:'Attentats du 11 septembre',wiki:'Attentats du 11 septembre 2001',desc:"Al-Qaïda attaque les tours du WTC le 11 septembre 2001. 2977 morts. Le monde change pour toujours.",cat:'guerre',img:I.s11},
  {id:133,y:2002,m:1,d:1,title:'Introduction de l\'euro',wiki:'Euro',desc:"L'euro remplace 12 monnaies nationales le 1er janvier 2002 dont le franc français.",cat:'politique',img:''},
  {id:134,y:2003,title:'Séquençage du génome humain',wiki:'Projet Génome humain',desc:"Le Projet Génome humain annonce la complétion du séquençage de l'ADN humain. Révolution médicale.",cat:'science',img:I.dna},
  {id:135,y:2004,m:2,d:4,title:'Naissance de Facebook',wiki:'Facebook',desc:"Zuckerberg lance Facebook depuis Harvard le 4 février 2004. 3 milliards d'utilisateurs en 2024.",cat:'science',img:I.fb},
  {id:136,y:2005,m:3,d:5,title:'YouTube fondé',wiki:'YouTube',desc:"YouTube est fondé le 14 février 2005 (mise en ligne le 23 avril). La vidéo en ligne est révolutionnée.",cat:'science',img:''},
  {id:137,y:2007,m:1,d:9,title:'Premier iPhone',wiki:'iPhone',desc:"Steve Jobs présente l'iPhone le 9 janvier 2007. Le smartphone révolutionne nos vies.",cat:'science',img:I.iphone},
  {id:138,y:2008,m:9,d:15,ye:2009,title:'Crise financière mondiale',wiki:'Crise financière de 2007-2008',desc:"Faillite de Lehman Brothers le 15 septembre 2008. Pire crise depuis 1929.",cat:'autre',img:''},
  {id:139,y:2008,m:11,d:4,title:'Élection de Barack Obama',wiki:'Barack Obama',desc:"Barack Obama devient le 44e président le 4 novembre 2008. Premier président afro-américain.",cat:'politique',img:I.obama},
  {id:140,y:2010,ye:2012,title:'Printemps arabe',wiki:'Printemps arabe',desc:"Soulèvements en Tunisie (déc. 2010), Égypte, Libye. Des régimes autoritaires chutent.",cat:'politique',img:''},
  {id:141,y:2011,m:5,d:2,title:'Mort de Ben Laden',wiki:'Mort d\'Oussama ben Laden',desc:"Oussama Ben Laden est tué par les forces spéciales américaines au Pakistan le 2 mai 2011.",cat:'guerre',img:''},
  {id:142,y:2015,m:1,d:7,title:'Attentat Charlie Hebdo',wiki:'Attentat contre Charlie Hebdo',desc:"12 morts à la rédaction de Charlie Hebdo le 7 janvier 2015. La France sous le choc.",cat:'guerre',img:''},
  {id:143,y:2015,m:11,d:13,title:'Attentats du 13 novembre',wiki:'Attentats du 13 novembre 2015 en France',desc:"130 morts au Bataclan et sur les terrasses parisiennes le 13 novembre 2015.",cat:'guerre',img:''},
  {id:144,y:2015,m:12,d:12,title:'Accord de Paris sur le climat',wiki:'Accord de Paris',desc:"195 pays s'engagent à limiter le réchauffement à 2°C. Signé le 12 décembre à la COP21.",cat:'autre',img:''},
  {id:145,y:2016,m:6,d:23,title:'Brexit — vote référendaire',wiki:'Brexit',desc:"Le Royaume-Uni vote pour quitter l'Union européenne à 51,9% le 23 juin 2016.",cat:'politique',img:''},
  {id:146,y:2017,m:5,d:7,title:'Élection d\'Emmanuel Macron',wiki:'Emmanuel Macron',desc:"Macron élu Président le 7 mai 2017 à 39 ans. Le plus jeune président de la Ve République.",cat:'politique',img:I.mac},
  {id:147,y:2018,m:7,d:15,title:'France championne du monde',wiki:'Coupe du monde de football 2018',desc:"La France bat la Croatie 4-2 en finale à Moscou le 15 juillet 2018. 2e titre mondial.",cat:'autre',img:''},
  {id:148,y:2019,m:4,d:15,title:'Incendie de Notre-Dame de Paris',wiki:'Incendie de Notre-Dame de Paris',desc:"La cathédrale ravagée le 15 avril 2019. La flèche s'effondre. Élan de solidarité mondial.",cat:'art',img:I.ndfire},
  {id:149,y:2019,m:12,ye:2022,title:'Pandémie de Covid-19',wiki:'Pandémie de Covid-19',desc:"Apparu à Wuhan fin 2019. Confinements mondiaux, vaccins en un an. 7 millions de morts officiels.",cat:'autre',img:I.covid},
  {id:150,y:2020,m:1,d:31,title:'Brexit effectif',wiki:'Retrait du Royaume-Uni de l\'Union européenne',desc:"Le Royaume-Uni quitte officiellement l'UE le 31 janvier 2020 à 23h.",cat:'politique',img:''},
  {id:151,y:2022,m:2,d:24,title:'Invasion russe de l\'Ukraine',wiki:'Invasion de l\'Ukraine par la Russie',desc:"La Russie envahit l'Ukraine le 24 février 2022. Plus grand conflit en Europe depuis 1945.",cat:'guerre',img:I.ukr},
  {id:152,y:2022,m:12,d:18,title:'Argentine championne du monde',wiki:'Coupe du monde de football 2022',desc:"L'Argentine bat la France aux tirs au but le 18 décembre 2022 à Doha. Dernier titre de Messi.",cat:'autre',img:''},
  {id:153,y:2023,title:'Essor de l\'IA générative',wiki:'Intelligence artificielle générative',desc:"ChatGPT, Claude, Gemini révolutionnent le monde. L'IA transforme création, éducation et travail.",cat:'science',img:''},
  {id:154,y:2024,m:7,d:26,ye:2024,me:8,de:11,title:'JO de Paris 2024',wiki:'Jeux olympiques d\'été de 2024',desc:"Paris accueille les JO du 26 juillet au 11 août 2024. 16 médailles d'or pour la France.",cat:'autre',img:I.jo24},
  {id:155,y:2024,m:12,d:7,title:'Réouverture de Notre-Dame',wiki:'Reconstruction de Notre-Dame de Paris',desc:"Notre-Dame rouvre le 7 décembre 2024 après 5 ans de travaux spectaculaires.",cat:'art',img:I.nd},
  {id:156,y:2023,m:2,d:6,title:'Séisme Turquie-Syrie',wiki:'Séismes du 6 février 2023 en Turquie et en Syrie',desc:"Magnitude 7,8 le 6 février 2023. Plus de 50 000 morts en Turquie et en Syrie.",cat:'autre',img:''},
  {id:157,y:2003,m:3,d:20,title:'Guerre en Irak',wiki:'Invasion de l\'Irak en 2003',desc:"Les États-Unis et le Royaume-Uni envahissent l'Irak le 20 mars 2003. Saddam Hussein renversé.",cat:'guerre',img:''},
  {id:158,y:2011,m:3,d:11,title:'Fukushima',wiki:'Accident nucléaire de Fukushima',desc:"Séisme et tsunami au Japon le 11 mars 2011. Catastrophe nucléaire à Fukushima, 19 000 morts.",cat:'autre',img:''},
  {id:159,y:2010,m:1,d:12,title:'Séisme en Haïti',wiki:'Séisme de 2010 en Haïti',desc:"Séisme de magnitude 7,0 le 12 janvier 2010. Plus de 200 000 morts. Haïti dévastée.",cat:'autre',img:''},
  {id:160,y:1981,m:6,d:5,title:'Découverte du SIDA',wiki:'Syndrome d\'immunodéficience acquise',desc:"Les CDC publient le 5 juin 1981 les premiers cas de ce qui deviendra le SIDA. 40 millions de morts.",cat:'science',img:''},
  {id:161,y:1977,m:9,d:5,title:'Voyager 1 lancé',wiki:'Voyager 1',desc:"Voyager 1 est lancé le 5 septembre 1977. Il est aujourd'hui l'objet humain le plus lointain dans l'espace.",cat:'science',img:''},
  {id:162,y:1998,m:11,d:20,ye:2011,title:'Construction de l\'ISS',wiki:'Station spatiale internationale',desc:"La Station spatiale internationale est construite entre 1998 et 2011. Symbole de la coopération internationale.",cat:'science',img:''},
  {id:163,y:2014,m:12,d:17,title:'Dégel diplomatique USA-Cuba',wiki:'Dégel des relations entre les États-Unis et Cuba',desc:"Obama et Raúl Castro annoncent la normalisation des relations diplomatiques le 17 décembre 2014.",cat:'politique',img:''},
  {id:164,y:2018,title:'Mouvement #MeToo mondial',wiki:'Mouvement #MeToo',desc:"Le mouvement #MeToo né en 2017 devient mondial en 2018. Libération de la parole sur les violences sexuelles.",cat:'autre',img:''},
];

/* ── Storage & Firebase sync ── */
const SK='frise_v9';
function loadEv(){try{const s=localStorage.getItem(SK);return s?JSON.parse(s):DEFAULTS;}catch{return DEFAULTS;}}
function saveSt(){
  try{localStorage.setItem(SK,JSON.stringify(events));}catch(e){}
  if(window.__firebaseSave)window.__firebaseSave(events);
}
let events=loadEv();
let nextId=Math.max(...events.map(e=>e.id),0)+1;

window.__mergeRemote=function(remote){
  let changed=false;
  remote.forEach(r=>{
    const loc=events.find(e=>e.id===r.id);
    if(!loc){events.push(r);changed=true;}
    else if((r.updatedAt||0)>(loc.updatedAt||0)){Object.assign(loc,r);changed=true;}
  });
  if(changed){try{localStorage.setItem(SK,JSON.stringify(events));}catch(e){}nextId=Math.max(...events.map(e=>e.id),0)+1;render();buildEraStrip();}
};

/* ── State ── */
let scale=1,offsetX=0,svgW=900;
const H=340,AY=175;
let editId=null,activeId=null,hlId=null;
let currentEra=null;
let dragging=false,dsx=0,dsox=0;
let hiddenCats=new Set();

const svgEl=document.getElementById('tl-svg');
const wrap=document.getElementById('tl-wrap');
const tipEl=document.getElementById('tip');
const cpop=document.getElementById('cpop');
const clList=document.getElementById('cluster-list');

/* ── Date helpers ── */
const MN=['','Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
function fmtY(y){return y<0?Math.abs(y)+' av. J.-C.':String(y);}
function fmtDate(ev){
  let s='';
  if(ev.d)s+=ev.d+' ';
  if(ev.m)s+=MN[ev.m]+' ';
  s+=fmtY(ev.y);
  return s;
}
function fmtDateEnd(ev){
  if(!ev.ye||ev.ye===ev.y)return null;
  let s='';
  if(ev.de)s+=ev.de+' ';
  if(ev.me)s+=MN[ev.me]+' ';
  s+=fmtY(ev.ye);
  return s;
}
function midY(ev){return(ev.ye&&ev.ye!==ev.y)?(ev.y+ev.ye)/2:ev.y;}
function wikiUrl(ev){return'https://fr.wikipedia.org/wiki/'+encodeURIComponent((ev.wiki||ev.title).replace(/ /g,'_'));}

/* ── Era strip ── */
function buildEraStrip(){
  document.getElementById('era-strip').innerHTML=ERAS.map(era=>{
    const eraTo=era.key==='xxi'||era.key==='all'?TODAY_Y:era.to;
    const count=events.filter(e=>midY(e)>=era.from&&midY(e)<eraTo&&!hiddenCats.has(e.cat)).length;
    const active=currentEra&&currentEra.key===era.key;
    const fromS=era.from<0?Math.abs(era.from)+' av. J.-C.':era.from;
    const toS=era.key==='xxi'||era.key==='all'?'Aujourd\'hui':(era.to<0?Math.abs(era.to)+' av. J.-C.':era.to);
    return`<div class="era-card${active?' active':''}${era.key==='all'?' era-all':''}" style="--era-color:${era.color}" onclick="selectEra('${era.key}')">
      <div class="ec-dot" style="background:${era.color}"></div>
      <div class="ec-name">${era.name}</div>
      <div class="ec-range">${fromS} → ${toS}</div>
      <div class="ec-count">${count} événement${count>1?'s':''}</div>
    </div>`;
  }).join('');
}

function selectEra(key){
  currentEra=ERAS.find(e=>e.key===key);
  buildEraStrip();
  document.getElementById('era-hint').style.display='none';
  document.getElementById('tl-outer').classList.add('show');
  document.getElementById('tl-dot').style.background=currentEra.color;
  const eraTo=key==='xxi'||key==='all'?TODAY_Y:currentEra.to;
  const toS=key==='xxi'||key==='all'?'Aujourd\'hui':(eraTo<0?Math.abs(eraTo)+' av. J.-C.':eraTo);
  const fromS=currentEra.from<0?Math.abs(currentEra.from)+' av. J.-C.':currentEra.from;
  document.getElementById('tl-era-name').textContent=currentEra.name+' ('+fromS+' – '+toS+')';
  setTimeout(resetView,60);
  document.getElementById('tl-outer').scrollIntoView({behavior:'smooth',block:'start'});
}

function closeEra(){
  currentEra=null;buildEraStrip();
  document.getElementById('tl-outer').classList.remove('show');
  document.getElementById('era-hint').style.display='block';
}

/* ── Era events & range ── */
function eraTo(){return currentEra.key==='xxi'||currentEra.key==='all'?TODAY_Y:currentEra.to;}
function eraEvents(){
  if(!currentEra)return[];
  const to=eraTo();
  return events.filter(e=>midY(e)>=currentEra.from&&midY(e)<to&&!hiddenCats.has(e.cat));
}
function getRange(){
  if(!currentEra)return{minY:0,maxY:TODAY_Y};
  const from=currentEra.from,to=eraTo();
  const pad=(to-from)*0.04;
  return{minY:from-pad,maxY:to+pad};
}
function yearToX(y){const{minY}=getRange();return 80+(y-minY)*scale+offsetX;}
function defScale(){const{minY,maxY}=getRange();return Math.max(.001,(svgW-160)/(maxY-minY||1));}
function resetView(){scale=defScale();offsetX=0;render();updZoom();}
function zoom(d){scale*=d>0?1.5:1/1.5;render();updZoom();}
function updZoom(){
  const p=Math.round(scale/defScale()*100)+'%';
  document.getElementById('zlbl').textContent=p;
  document.getElementById('zlbl2').textContent=p;
}

/* ── Tick interval — adaptatif années/mois/jours ── */
function getTickMode(){
  const yvSpan=svgW/scale;
  if(yvSpan<=3)return'days';
  if(yvSpan<=60)return'months';
  return'years';
}
function tickIv(){
  const mode=getTickMode();
  if(mode==='days'){
    const dvSpan=svgW/(scale/365.25);
    for(const iv of[1,2,5,7,10,15])if(svgW/dvSpan*iv>60)return iv;
    return 30;
  }
  if(mode==='months'){
    const mvSpan=svgW/(scale/12);
    for(const iv of[1,2,3,6])if(svgW/mvSpan*iv>55)return iv;
    return 12;
  }
  const yvSpan=svgW/scale;
  for(const iv of[1,2,5,10,25,50,100,200,500,1000,2000,5000,10000,50000,100000])
    if(svgW/yvSpan*iv>65)return iv;
  return 100000;
}

function yearFrac(y,m,d){return y+(m?((m-1)/12+(d?d/365:0)):0);}

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

/* ── Cluster: regroupe 3+ seulement ── */
const MIN_DIST=70;
function clusterEv(placed){
  const sorted=[...placed].sort((a,b)=>a.px-b.px);
  const clusters=[],used=new Set();
  for(let i=0;i<sorted.length;i++){
    if(used.has(i))continue;
    const grp=[sorted[i]];used.add(i);
    for(let j=i+1;j<sorted.length;j++){
      if(used.has(j))continue;
      if(sorted[j].px-sorted[i].px<MIN_DIST){grp.push(sorted[j]);used.add(j);}
    }
    if(grp.length>=3)clusters.push(grp);
    else grp.forEach(ev=>clusters.push([ev]));
  }
  return clusters;
}

/* ── Render ── */
function render(){
  svgW=wrap.clientWidth||window.innerWidth-20;
  svgEl.setAttribute('width',svgW);svgEl.setAttribute('height',H);
  if(!currentEra){svgEl.innerHTML='';clearClusters();return;}
  const{minY,maxY}=getRange();
  const bg=ERA_BG[currentEra.key]||ERA_BG.xx;
  const mode=getTickMode();
  const iv=tickIv();
  let h='';

  /* Fond dégradé discret */
  h+=`<defs>
    <linearGradient id="bgv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".09"/>
      <stop offset="55%" stop-color="${bg.c2}" stop-opacity=".04"/>
      <stop offset="100%" stop-color="${bg.c1}" stop-opacity=".03"/>
    </linearGradient>
    <linearGradient id="bgh" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".06"/>
      <stop offset="100%" stop-color="${bg.c3}" stop-opacity=".06"/>
    </linearGradient>
    <radialGradient id="bgr1" cx="12%" cy="28%" r="42%">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".08"/>
      <stop offset="100%" stop-color="${bg.c1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bgr2" cx="88%" cy="72%" r="42%">
      <stop offset="0%" stop-color="${bg.c3}" stop-opacity=".07"/>
      <stop offset="100%" stop-color="${bg.c3}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bgv)"/>
  <rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bgh)"/>
  <rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bgr1)"/>
  <rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bgr2)"/>`;

  /* Ticks selon le mode */
  if(mode==='years'){
    const st=Math.ceil((minY-iv*2)/iv)*iv;
    const en=st+Math.ceil(svgW/scale/iv+4)*iv;
    for(let y=st;y<=en;y+=iv){
      const x=yearToX(y);if(x<-5||x>svgW+5)continue;
      h+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${bg.c1}" stroke-width=".4" opacity=".18"/>`;
      h+=`<circle cx="${x}" cy="${AY}" r="3" fill="${currentEra.color}" opacity=".45"/>`;
      const lbl=y<0?Math.abs(y)+' av.':y===0?'0':y;
      h+=`<text x="${x}" y="${AY+23}" text-anchor="middle" font-size="10" fill="var(--ink3)" font-family="'DM Sans',sans-serif">${lbl}</text>`;
    }
  } else if(mode==='months'){
    const startY=Math.max(Math.floor(minY),currentEra.from<0?currentEra.from:-9999);
    const endY=Math.min(Math.ceil(maxY),eraTo());
    for(let y=startY;y<=endY;y++){
      for(let m=1;m<=12;m+=iv){
        const yfrac=yearFrac(y,m,1);
        if(yfrac<minY||yfrac>maxY)continue;
        const x=yearToX(yfrac);if(x<-5||x>svgW+5)continue;
        const isMaj=m===1;
        h+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${bg.c1}" stroke-width="${isMaj?.7:.3}" opacity="${isMaj?.3:.12}"/>`;
        h+=`<circle cx="${x}" cy="${AY}" r="${isMaj?3.5:2}" fill="${currentEra.color}" opacity="${isMaj?.5:.3}"/>`;
        const lbl=isMaj?y:MN[m];
        h+=`<text x="${x}" y="${AY+23}" text-anchor="middle" font-size="${isMaj?10:9}" fill="var(--ink3)" font-family="'DM Sans',sans-serif" font-weight="${isMaj?'500':'400'}">${lbl}</text>`;
      }
    }
  } else {
    const startY=Math.max(Math.floor(minY),currentEra.from);
    const endY=Math.min(Math.ceil(maxY),eraTo());
    for(let y=startY;y<=endY;y++){
      for(let m=1;m<=12;m++){
        for(let dd=1;dd<=31;dd+=iv){
          if(dd>28&&[2].includes(m))continue;
          if(dd>30&&[4,6,9,11].includes(m))continue;
          const yfrac=yearFrac(y,m,dd);
          if(yfrac<minY||yfrac>maxY)continue;
          const x=yearToX(yfrac);if(x<-5||x>svgW+5)continue;
          const isFirst=dd===1;const isFM=isFirst&&m===1;
          h+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${bg.c1}" stroke-width="${isFM?.8:isFirst?.4:.2}" opacity="${isFM?.35:isFirst?.2:.1}"/>`;
          h+=`<circle cx="${x}" cy="${AY}" r="${isFM?3.5:isFirst?2.5:1.5}" fill="${currentEra.color}" opacity="${isFM?.5:isFirst?.35:.2}"/>`;
          const lbl=isFM?y:isFirst?MN[m]:dd;
          h+=`<text x="${x}" y="${AY+23}" text-anchor="middle" font-size="${isFM?10:isFirst?9.5:9}" fill="var(--ink3)" font-family="'DM Sans',sans-serif">${lbl}</text>`;
        }
      }
    }
  }

  /* Axe */
  h+=`<line x1="0" y1="${AY}" x2="${svgW}" y2="${AY}" stroke="${currentEra.color}" stroke-width="2.5" opacity=".35"/>`;

  /* Marqueur aujourd'hui */
  if(currentEra.key==='xxi'||currentEra.key==='all'){
    const tx=yearToX(yearFrac(TODAY_Y,TODAY_M,TODAY_D));
    if(tx>=10&&tx<=svgW-10){
      h+=`<line x1="${tx}" y1="0" x2="${tx}" y2="${H}" stroke="${currentEra.color}" stroke-width="1.5" stroke-dasharray="4 4" opacity=".5"/>`;
      const lx=Math.min(tx+4,svgW-74);
      h+=`<rect x="${lx}" y="6" width="68" height="17" rx="8" fill="${currentEra.color}" opacity=".14"/>`;
      h+=`<text x="${lx+34}" y="18" text-anchor="middle" font-size="9.5" fill="${currentEra.color}" font-family="'DM Sans',sans-serif" font-weight="500">Aujourd'hui</text>`;
    }
  }

  /* Placement des événements */
  const visible=eraEvents().sort((a,b)=>a.y-b.y);
  const raw=[];const rowLast={};
  visible.forEach((ev,i)=>{
    const px=yearToX(yearFrac(ev.y,ev.m,ev.d));
    const candidates=[];for(let r=1;r<=8;r++)candidates.push(-r,r);
    let row=i%2===0?-1:1;
    for(const r of candidates){if(!rowLast[r]||px-rowLast[r]>95){row=r;break;}}
    rowLast[row]=px;raw.push({...ev,row,px});
  });

  /* Barres de période */
  raw.forEach(ev=>{
    if(!ev.ye||ev.ye===ev.y)return;
    const x1=Math.max(0,yearToX(ev.y));
    const x2=Math.min(svgW,yearToX(ev.ye));
    if(x2<0||x1>svgW)return;
    const c=(CATS[ev.cat]||CATS.autre).c;
    const above=ev.row<0,depth=Math.abs(ev.row);
    const barY=above?AY-(48+depth*36)-10:AY+(48+depth*36)+4;
    h+=`<rect x="${x1}" y="${barY}" width="${Math.max(1,x2-x1)}" height="6" rx="3" fill="${c}" opacity=".17"/>`;
    if(x1>=0)h+=`<line x1="${x1}" y1="${AY}" x2="${x1}" y2="${barY+3}" stroke="${c}" stroke-width=".7" opacity=".28"/>`;
    if(x2<=svgW)h+=`<line x1="${x2}" y1="${AY}" x2="${x2}" y2="${barY+3}" stroke="${c}" stroke-width=".7" opacity=".28"/>`;
  });

  /* Cluster (3+ seulement) */
  const clusters=clusterEv(raw);
  const singles=new Set(clusters.filter(g=>g.length===1).flatMap(g=>g.map(e=>e.id)));

  /* Stems + dots */
  raw.filter(ev=>singles.has(ev.id)).forEach(ev=>{
    const px=ev.px;if(px<-80||px>svgW+80)return;
    const c=(CATS[ev.cat]||CATS.autre).c;
    const above=ev.row<0,depth=Math.abs(ev.row),sl=48+depth*36;
    const lY=above?AY-sl:AY+sl;
    const by=above?lY-42:lY;
    h+=`<circle cx="${px}" cy="${AY}" r="7" fill="${c}" opacity=".17" data-id="${ev.id}"/>`;
    h+=`<circle cx="${px}" cy="${AY}" r="${activeId===ev.id?5.5:4}" fill="${c}" stroke="var(--paper2)" stroke-width="1.5" style="cursor:pointer" data-id="${ev.id}"/>`;
    h+=`<line x1="${px}" y1="${AY+(above?-5:5)}" x2="${px}" y2="${above?by+42:by}" stroke="${c}" stroke-width="1" stroke-dasharray="2 3" opacity=".38"/>`;
  });

  /* Cartes */
  raw.filter(ev=>singles.has(ev.id)).forEach(ev=>{h+=buildCard(ev);});

  svgEl.innerHTML=h;
  svgEl.querySelectorAll('[data-id]').forEach(el=>{
    const id=parseInt(el.dataset.id);
    el.addEventListener('click',e=>{e.stopPropagation();openCard(id,e);});
    el.addEventListener('mousemove',e=>showTip(e,id));
    el.addEventListener('mouseleave',()=>{tipEl.style.display='none';});
  });

  clearClusters();
  clusters.filter(g=>g.length>=3).forEach(g=>buildClusterOv(g));
  renderLegend();buildEraStrip();
}

function buildCard(ev){
  const cat=CATS[ev.cat]||CATS.autre,c=cat.c;
  const px=ev.px;if(px<-80||px>svgW+80)return'';
  const above=ev.row<0,depth=Math.abs(ev.row),sl=48+depth*36;
  const lY=above?AY-sl:AY+sl;
  const label=ev.title.length>25?ev.title.slice(0,24)+'…':ev.title;
  const bw=Math.min(label.length*7.2+30,192);
  const bh=42,bx=Math.max(4,Math.min(px-bw/2,svgW-bw-4));
  const by=above?lY-bh:lY;
  const isActive=ev.id===activeId,isHL=ev.id===hlId;
  let s='';
  if(isActive||isHL)s+=`<rect x="${bx-5}" y="${by-5}" width="${bw+10}" height="${bh+10}" rx="13" fill="${c}" opacity="${isHL?.2:.13}"/>`;
  s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="var(--paper)" stroke="${c}" stroke-width="${isActive?1.75:.75}" style="cursor:pointer" data-id="${ev.id}"/>`;
  s+=`<rect x="${bx}" y="${by}" width="${bw}" height="5" rx="5" fill="${c}" opacity=".85" style="pointer-events:none"/>`;
  s+=`<rect x="${bx}" y="${by+3}" width="${bw}" height="3" fill="${c}" opacity=".85" style="pointer-events:none"/>`;
  if(ev.ye&&ev.ye!==ev.y)s+=`<rect x="${bx+bw-13}" y="${by+9}" width="7" height="7" rx="2" fill="${c}" opacity=".38" style="pointer-events:none"/>`;
  s+=`<text x="${bx+9}" y="${by+20}" font-size="11.5" font-weight="500" fill="${c}" font-family="'Playfair Display',serif" style="cursor:pointer" data-id="${ev.id}">${label}</text>`;
  s+=`<text x="${bx+9}" y="${by+33}" font-size="9.5" fill="${c}" opacity=".68" font-family="'DM Sans',sans-serif" data-id="${ev.id}" style="cursor:pointer">${fmtDate(ev)}</text>`;
  return s;
}

/* ── Cluster overlays HTML ── */
function clearClusters(){document.querySelectorAll('.cluster-ov').forEach(e=>e.remove());}
function buildClusterOv(grp){
  const avgX=grp.reduce((s,e)=>s+e.px,0)/grp.length;
  if(avgX<-30||avgX>svgW+30)return;
  const catC={};grp.forEach(e=>{catC[e.cat]=(catC[e.cat]||0)+1;});
  const dc=Object.entries(catC).sort((a,b)=>b[1]-a[1])[0][0];
  const c=(CATS[dc]||CATS.autre).c;
  const sz=Math.min(50+grp.length*4,76);
  const div=document.createElement('div');
  div.className='cluster-ov';
  div.style.cssText=`position:absolute;left:${avgX}px;top:${AY}px;transform:translate(-50%,-50%);
    width:${sz}px;height:${sz}px;border-radius:50%;background:var(--paper);
    border:2.5px solid ${c};display:flex;flex-direction:column;align-items:center;justify-content:center;
    cursor:pointer;transition:transform .15s;box-shadow:0 2px 14px ${c}30;font-family:var(--fb);z-index:10`;
  div.innerHTML=`<span style="font-size:${sz>60?16:13}px;font-weight:600;color:${c};line-height:1">${grp.length}</span>
    <span style="font-size:9px;color:${c};opacity:.7;margin-top:2px">évts</span>`;
  div.addEventListener('touchstart',()=>{},{passive:true});
  div.addEventListener('click',e=>{e.stopPropagation();openClusterList(grp,e);});
  div.addEventListener('mouseenter',()=>div.style.transform='translate(-50%,-50%) scale(1.1)');
  div.addEventListener('mouseleave',()=>div.style.transform='translate(-50%,-50%)');
  wrap.style.position='relative';wrap.appendChild(div);
}

/* ── Cluster list ── */
function openClusterList(grp,e){
  closeCard();
  document.getElementById('cl-title-span').textContent=grp.length+' événements groupés';
  document.getElementById('cl-items').innerHTML=grp.sort((a,b)=>a.y-b.y).map(ev=>{
    const cat=CATS[ev.cat]||CATS.autre;
    return`<div class="cl-item" onclick="zoomToEv(${ev.id})">
      <div class="cl-dot" style="background:${cat.c}"></div>
      <div><div class="cl-name">${ev.title}</div>
      <div class="cl-yr">${fmtDate(ev)} · ${cat.e} ${cat.l}</div></div>
    </div>`;
  }).join('');
  clList.style.display='block';
  if(window.innerWidth<640){
    clList.style.cssText='display:block;position:fixed;bottom:0;left:0;right:0;top:auto;width:100%;border-radius:var(--rxl) var(--rxl) 0 0;z-index:260';
  } else {
    const vw=window.innerWidth,vh=window.innerHeight;
    clList.style.cssText=`display:block;position:fixed;z-index:260;width:300px;left:${Math.min(e.clientX+10,vw-310)}px;top:${Math.min(e.clientY-40,vh-380)}px`;
  }
}
function closeClusterList(){clList.style.display='none';}
function zoomToEv(id){
  closeClusterList();
  const ev=events.find(e=>e.id===id);if(!ev)return;
  const{minY}=getRange();scale=defScale()*7;
  offsetX=(svgW/2)-80-(yearFrac(ev.y,ev.m,ev.d)-minY)*scale;
  render();updZoom();hlId=id;
  setTimeout(()=>{hlId=null;render();},2200);
}

/* ── Tooltip ── */
function showTip(e,id){
  const ev=events.find(x=>x.id===id);if(!ev)return;
  const cat=CATS[ev.cat]||CATS.autre;
  tipEl.style.display='block';
  tipEl.style.left=(e.clientX+16)+'px';tipEl.style.top=(e.clientY-22)+'px';
  tipEl.innerHTML=`<strong>${ev.title}</strong>
    <div class="ty" style="color:${cat.c}">${fmtDate(ev)} · ${cat.e} ${cat.l}</div>
    ${ev.desc?`<div class="td">${ev.desc.slice(0,100)}${ev.desc.length>100?'…':''}</div>`:''}`;
}

/* ── Card popup (images via <img> HTML ─ jamais SVG) ── */
function openCard(id,e){
  const ev=events.find(x=>x.id===id);if(!ev)return;
  const cat=CATS[ev.cat]||CATS.autre;
  const endS=fmtDateEnd(ev);

  /* Image dans <img> HTML standard → pas de restriction CORS */
  document.getElementById('cp-img-w').innerHTML=ev.img
    ?`<img class="cp-img" src="${ev.img}" alt="${ev.title}" loading="lazy"
        onerror="this.parentNode.innerHTML='<div style=\\'width:100%;height:80px;display:flex;align-items:center;justify-content:center;font-size:42px;background:${cat.bg}\\'>${cat.e}</div>'">`
    :`<div style="width:100%;height:72px;display:flex;align-items:center;justify-content:center;font-size:42px;background:${cat.bg}">${cat.e}</div>`;

  document.getElementById('cp-stripe').style.cssText=`height:5px;background:linear-gradient(90deg,${cat.c},${cat.c}66)`;
  const ce=document.getElementById('cp-cat');
  ce.textContent=`${cat.e} ${cat.l}`;ce.style.background=cat.bg;ce.style.color=cat.c;
  document.getElementById('cp-dates').innerHTML=endS
    ?`<strong style="color:${cat.c}">${fmtDate(ev)}</strong><br>→ ${endS}`:fmtDate(ev);
  document.getElementById('cp-title').textContent=ev.title;

  const pbw=document.getElementById('cp-period-wrap');
  if(ev.ye&&ev.ye!==ev.y&&currentEra){
    const span=ev.ye-ev.y,eraSpan=eraTo()-currentEra.from;
    const pct=Math.min(100,Math.round(span/eraSpan*100));
    pbw.style.display='block';
    document.getElementById('cp-period-label').textContent=`Durée : ${span} an${span>1?'s':''} (${pct}% de l'époque)`;
    document.getElementById('cp-period-fill').style.cssText=`width:${pct}%;background:${cat.c}`;
  } else pbw.style.display='none';

  document.getElementById('cp-desc').textContent=ev.desc||'Aucune description.';
  const eb=document.getElementById('cp-edit');
  eb.onclick=()=>{closeCard();openEdit(id);};
  eb.style.background=`linear-gradient(135deg,${cat.c},${cat.c}bb)`;eb.style.color='#fff';
  document.getElementById('cp-wiki').href=wikiUrl(ev);

  cpop.style.display='block';
  if(window.innerWidth<640){
    cpop.style.cssText='display:block;position:fixed;bottom:0;left:0;right:0;top:auto;width:100%;border-radius:24px 24px 0 0;max-height:88vh;overflow-y:auto;z-index:250';
  } else {
    const vw=window.innerWidth,vh=window.innerHeight;
    cpop.style.cssText=`display:block;position:fixed;border-radius:var(--rxl);width:min(350px,90vw);z-index:250;
      top:${Math.min(e.clientY-60,vh-520)}px;left:${Math.min(e.clientX+16,vw-366)}px`;
  }
  activeId=id;render();
}
function closeCard(){cpop.style.display='none';activeId=null;render();}
document.addEventListener('click',e=>{
  if(!cpop.contains(e.target)&&!e.target.dataset.id)closeCard();
  if(clList.style.display!=='none'&&!clList.contains(e.target)&&!e.target.closest('.cluster-ov'))closeClusterList();
});

/* ── Legend ── */
function renderLegend(){
  document.getElementById('legend').innerHTML=Object.entries(CATS).map(([k,v])=>{
    const on=!hiddenCats.has(k);
    return`<div class="leg-item" style="background:${on?v.bg:'var(--paper2)'};color:${on?v.c:'var(--ink3)'};border-color:${on?v.c:'var(--paper4)'};opacity:${on?1:.45}" onclick="toggleCat('${k}')">${v.e} ${v.l}</div>`;
  }).join('');
}
function toggleCat(k){hiddenCats.has(k)?hiddenCats.delete(k):hiddenCats.add(k);render();buildEraStrip();}

/* ── Search ── */
function hl(str,q){
  if(!q)return str;
  return String(str).replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`,'gi'),'<mark>$1</mark>');
}
function onSearch(q){
  document.getElementById('scl').classList.toggle('on',q.length>0);
  const res=document.getElementById('sres');
  if(!q.trim()){res.classList.remove('open');hlId=null;render();return;}
  const ql=q.toLowerCase(),yn=parseInt(q);
  const matched=events.filter(ev=>
    ev.title.toLowerCase().includes(ql)||(ev.desc||'').toLowerCase().includes(ql)||
    (ev.wiki||'').toLowerCase().includes(ql)||(CATS[ev.cat]?CATS[ev.cat].l.toLowerCase().includes(ql):false)||
    String(Math.abs(ev.y)).includes(q)||(!isNaN(yn)&&Math.abs(ev.y-yn)<30)
  ).sort((a,b)=>!isNaN(yn)?Math.abs(a.y-yn)-Math.abs(b.y-yn):a.y-b.y);
  if(!matched.length){res.innerHTML=`<div class="sr-empty">Aucun résultat pour « ${q} »</div>`;res.classList.add('open');return;}
  res.innerHTML=matched.slice(0,10).map(ev=>{
    const cat=CATS[ev.cat]||CATS.autre;
    const dm=(ev.desc||'').toLowerCase().includes(ql);
    let ds='';
    if(dm){const i=(ev.desc||'').toLowerCase().indexOf(ql);const s=Math.max(0,i-30);ds=`<div class="sri-desc">${hl((s>0?'…':''+(ev.desc||'').slice(s,i+ql.length+50)+'…'),q)}</div>`;}
    const endS=fmtDateEnd(ev);
    return`<div class="sri" onclick="goToEv(${ev.id})">
      <div class="sri-dot" style="background:${cat.c}"></div>
      <div style="min-width:0">
        <div class="sri-title">${hl(ev.title,q)}</div>
        <div class="sri-meta">${fmtDate(ev)}${endS?' → '+endS:''} · ${cat.e} ${cat.l}</div>
        ${ds}
      </div>
    </div>`;
  }).join('');
  res.classList.add('open');
}
function clearSearch(){
  document.getElementById('si').value='';
  document.getElementById('sres').classList.remove('open');
  document.getElementById('scl').classList.remove('on');
  hlId=null;render();
}
function goToEv(id){
  const ev=events.find(e=>e.id===id);if(!ev)return;
  document.getElementById('sres').classList.remove('open');
  const era=ERAS.find(er=>er.key!=='all'&&midY(ev)>=er.from&&midY(ev)<(er.key==='xxi'?TODAY_Y:er.to));
  if(era&&(!currentEra||currentEra.key!==era.key))selectEra(era.key);
  hlId=id;
  setTimeout(()=>{
    const{minY}=getRange();scale=defScale()*7;
    offsetX=(svgW/2)-80-(yearFrac(ev.y,ev.m,ev.d)-minY)*scale;
    render();updZoom();
    setTimeout(()=>{hlId=null;render();},2500);
  },200);
}

/* ── Image ── */
function applyImgUrl(){
  const url=document.getElementById('f-img-url').value.trim();
  if(!url)return;
  document.getElementById('ipr').style.display='block';
  document.getElementById('iprel').src=url;
  document.getElementById('iprel').onerror=()=>{document.getElementById('iprel').alt='URL invalide';};
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
  ['ft','fy','fm','fd2','fye','fme','fde','fdesc','fwiki','f-img-url'].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.value='';
  });
  removeImg();
}
function openAdd(){
  editId=null;resetForm();
  document.getElementById('mtitle').textContent='Nouvel événement';
  if(currentEra){const mid=Math.round((currentEra.from+Math.min(eraTo(),TODAY_Y))/2);document.getElementById('fy').value=mid;}
  buildCatPick('autre');
  document.getElementById('bdel').style.display='none';
  document.getElementById('mbg').classList.add('open');
  setTimeout(()=>document.getElementById('ft').focus(),80);
}
function openEdit(id){
  const ev=events.find(e=>e.id===id);if(!ev)return;
  editId=id;resetForm();
  document.getElementById('mtitle').textContent="Modifier l'événement";
  document.getElementById('ft').value=ev.title||'';
  document.getElementById('fy').value=ev.y||'';
  document.getElementById('fm').value=ev.m||'';
  document.getElementById('fd2').value=ev.d||'';
  document.getElementById('fye').value=(ev.ye&&ev.ye!==ev.y)?ev.ye:'';
  document.getElementById('fme').value=ev.me||'';
  document.getElementById('fde').value=ev.de||'';
  document.getElementById('fdesc').value=ev.desc||'';
  document.getElementById('fwiki').value=ev.wiki||'';
  if(ev.img){document.getElementById('f-img-url').value=ev.img;document.getElementById('ipr').style.display='block';document.getElementById('iprel').src=ev.img;}
  buildCatPick(ev.cat||'autre');
  document.getElementById('bdel').style.display='inline-block';
  document.getElementById('mbg').classList.add('open');
}
function closeMod(){document.getElementById('mbg').classList.remove('open');}

function saveEv(){
  const title=(document.getElementById('ft').value||'').trim();
  const yv=(document.getElementById('fy').value||'').trim();
  if(!title){document.getElementById('ft').style.borderColor='#f03060';document.getElementById('ft').focus();return;}
  if(!yv){document.getElementById('fy').style.borderColor='#f03060';document.getElementById('fy').focus();return;}
  const y=parseInt(yv);
  if(isNaN(y)){document.getElementById('fy').style.borderColor='#f03060';document.getElementById('fy').focus();return;}
  document.getElementById('ft').style.borderColor='';
  document.getElementById('fy').style.borderColor='';
  const mRaw=document.getElementById('fm').value;const m=mRaw?parseInt(mRaw):undefined;
  const dRaw=document.getElementById('fd2').value;const d=dRaw?parseInt(dRaw):undefined;
  const yeRaw=(document.getElementById('fye').value||'').trim();const ye=yeRaw?parseInt(yeRaw):y;
  const meRaw=document.getElementById('fme').value;const me=meRaw?parseInt(meRaw):undefined;
  const deRaw=document.getElementById('fde').value;const de=deRaw?parseInt(deRaw):undefined;
  const desc=document.getElementById('fdesc').value.trim();
  const cat=document.getElementById('fc').value||'autre';
  const wiki=document.getElementById('fwiki').value.trim();
  const img=document.getElementById('f-img-url').value.trim();
  const obj={id:editId||nextId,title,y,ye,cat,desc,wiki,img,updatedAt:Date.now()};
  if(m)obj.m=m;if(d)obj.d=d;if(me)obj.me=me;if(de)obj.de=de;
  if(editId){const i=events.findIndex(e=>e.id===editId);if(i>=0)events[i]=obj;}
  else{nextId++;events.push(obj);}
  saveSt();closeMod();
  const mid=Math.round((y+ye)/2);
  const era=ERAS.find(er=>er.key!=='all'&&mid>=er.from&&mid<(er.key==='xxi'?TODAY_Y:er.to));
  if(era&&(!currentEra||currentEra.key!==era.key))selectEra(era.key);
  else{render();updZoom();}
  setTimeout(()=>{hlId=obj.id;render();setTimeout(()=>{hlId=null;render();},2000);},300);
}
function deleteEv(){
  if(!editId||!confirm('Supprimer cet événement ?'))return;
  if(window.__firebaseDelete)window.__firebaseDelete(editId);
  events=events.filter(e=>e.id!==editId);
  saveSt();closeMod();render();updZoom();
}
document.getElementById('mbg').addEventListener('click',e=>{if(e.target===e.currentTarget)closeMod();});

/* ── Mobile navigation ── */
function panLeft(){offsetX+=svgW*0.35;render();}
function panRight(){offsetX-=svgW*0.35;render();}

/* ── Drag / wheel / touch ── */
wrap.addEventListener('mousedown',e=>{
  if(e.target.dataset.id||e.target.closest('.cluster-ov'))return;
  dragging=true;dsx=e.clientX;dsox=offsetX;wrap.classList.add('dragging');
});
window.addEventListener('mousemove',e=>{if(!dragging)return;offsetX=dsox+(e.clientX-dsx);render();});
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
let ltx=null,ltd=null,lastTapTime=0,lastTapId=null;
wrap.addEventListener('touchstart',e=>{
  if(e.touches.length===2){ltd=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);ltx=null;}
  else{ltx=e.touches[0].clientX;ltd=null;}
},{passive:true});
wrap.addEventListener('touchmove',e=>{
  if(e.touches.length===2&&ltd){
    const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
    const cx=(e.touches[0].clientX+e.touches[1].clientX)/2-wrap.getBoundingClientRect().left;
    const{minY}=getRange();const yam=(cx-80-offsetX)/scale+minY;
    scale*=d/ltd;ltd=d;offsetX=cx-80-(yam-minY)*scale;render();updZoom();
  } else if(ltx&&e.touches.length===1){
    offsetX+=e.touches[0].clientX-ltx;ltx=e.touches[0].clientX;render();
  }
},{passive:true});
wrap.addEventListener('touchend',()=>{ltx=null;ltd=null;});

/* ── Keyboard ── */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeMod();closeCard();closeClusterList();clearSearch();}
  if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();document.getElementById('si').focus();}
  if((e.metaKey||e.ctrlKey)&&e.key==='Enter'&&document.getElementById('mbg').classList.contains('open'))saveEv();
});
document.addEventListener('click',e=>{
  if(!document.getElementById('sres').contains(e.target)&&e.target!==document.getElementById('si'))
    document.getElementById('sres').classList.remove('open');
});
window.addEventListener('resize',()=>{if(currentEra)render();});

/* ── Init ── */
renderLegend();
buildEraStrip();
