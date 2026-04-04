/* ═══════════════ FRISE CHRONOLOGIQUE — script.js ═══════════════ */

/* ── Date du jour comme année de fin du XXIe siècle ── */
const TODAY_YEAR = new Date().getFullYear();

/* ── Categories ── */
const CATS = {
  politique:{ c:'#4f6ef7', bg:'rgba(79,110,247,.13)',  l:'Politique',      e:'🏛' },
  science:  { c:'#16c47a', bg:'rgba(22,196,122,.13)',  l:'Science & Tech', e:'🔬' },
  art:      { c:'#f0742a', bg:'rgba(240,116,42,.13)',  l:'Art & Culture',  e:'🎨' },
  guerre:   { c:'#f03060', bg:'rgba(240,48,96,.13)',   l:'Guerre',         e:'⚔️' },
  autre:    { c:'#a855f7', bg:'rgba(168,85,247,.13)',  l:'Autre',          e:'✦'  },
};

/* ── Eras ── */
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

/* ── Image proxy: tous les imports via Wikipedia API qui ne bloque pas le CORS ── */
// On utilise des URLs Wikipedia en format direct qui fonctionnent dans les <img> HTML
// (pas dans SVG <image>). Les images SVG seront remplacées par des cartes HTML overlay.
function wImg(file, w=320) {
  // Encode correctement le nom de fichier Wikipedia
  const encoded = encodeURIComponent(file.replace(/ /g, '_'));
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${encoded.charAt(0).toLowerCase()}/${encoded.slice(0,2).toLowerCase()}/${encoded}/${w}px-${encoded}`;
}
// Pour les fichiers dont on connait le hash manuellement (format thumb Wikimedia)
function wImgH(hash1, hash2, file, w=320) {
  const encoded = encodeURIComponent(file.replace(/ /g, '_'));
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash1}/${hash2}/${encoded}/${w}px-${encoded}`;
}

/* ── Images fiables avec chemin complet testé ── */
const I = {
  lascaux:    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lascaux_painting.jpg/320px-Lascaux_painting.jpg',
  stonehenge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_30.jpg/320px-Stonehenge2007_07_30.jpg',
  pyramides:  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/320px-Kheops-Pyramid.jpg',
  joconde:    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  sixtine:    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/320px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
  revfr:      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg/320px-Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg',
  napoleon:   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/240px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg',
  darwin:     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Charles_Darwin_by_Julia_Margaret_Cameron_3.jpg/240px-Charles_Darwin_by_Julia_Margaret_Cameron_3.jpg',
  toureiffel: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/240px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg',
  einstein:   'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/240px-Albert_Einstein_Head.jpg',
  dday:       'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/320px-Into_the_Jaws_of_Death_23-0455M_edit.jpg',
  lune:       'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/240px-Aldrin_Apollo_11_original.jpg',
  berlin:     'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/De_muur_van_Berlijn.jpg/320px-De_muur_van_Berlijn.jpg',
  sept11:     'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/September_11_Photo_Montage.jpg/320px-September_11_Photo_Montage.jpg',
  sputnik:    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sputnik_asm.jpg/320px-Sputnik_asm.jpg',
  amerindep:  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/United_States_Declaration_of_Independence.jpg/320px-United_States_Declaration_of_Independence.jpg',
  newton:     'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Portrait_of_Sir_Isaac_Newton%2C_1689.jpg/240px-Portrait_of_Sir_Isaac_Newton%2C_1689.jpg',
  charlemagne:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/AlbrechtDurer_-_Portrait_of_Charlemagne_%28c1512%29.jpg/240px-AlbrechtDurer_-_Portrait_of_Charlemagne_%28c1512%29.jpg',
  jeanne:     'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Joan_of_arc_miniature_graded.jpg/240px-Joan_of_arc_miniature_graded.jpg',
  versailles: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Palace_of_Versailles%2C_formal_gardens.jpg/320px-Palace_of_Versailles%2C_formal_gardens.jpg',
  bastille:   'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Anonymous_-_Prise_de_la_Bastille.jpg/320px-Anonymous_-_Prise_de_la_Bastille.jpg',
  louisxiv:   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Louis_xiv_1701.jpg/240px-Louis_xiv_1701.jpg',
  pasteur:    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Louis_Pasteur_photo.jpg/240px-Louis_Pasteur_photo.jpg',
  hugo:       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Victor_Hugo_by_Étienne_Carjat_1876_-_full.jpg/240px-Victor_Hugo_by_Étienne_Carjat_1876_-_full.jpg',
  monet:      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/240px-Claude_Monet_1899_Nadar_crop.jpg',
  lumiere:    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/LouisJeanLumiere.jpg/240px-LouisJeanLumiere.jpg',
  degaulle:   'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/De_Gaulle-OWI.jpg/240px-De_Gaulle-OWI.jpg',
  pompidou:   'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Centre_Pompidou_2019.jpg/320px-Centre_Pompidou_2019.jpg',
  mitterrand: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Fran%C3%A7ois_Mitterrand_1981.jpg/240px-Fran%C3%A7ois_Mitterrand_1981.jpg',
  macron:     'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Emmanuel_Macron_in_2019.jpg/240px-Emmanuel_Macron_in_2019.jpg',
  ww1fr:      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/The_Battle_of_the_Somme_film.jpg/320px-The_Battle_of_the_Somme_film.jpg',
  concorde:   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Concorde_%28airplane%29.jpg/320px-Concorde_%28airplane%29.jpg',
};

/* ── Dataset ── */
const DEFAULTS = [
  /* ── PRÉHISTOIRE ── */
  {id:1,  year:-300000,yearEnd:-300000,title:'Maîtrise du feu',              wiki:'Maîtrise du feu par les hominidés',     desc:"L'Homo erectus apprend à contrôler le feu. Révolution pour la cuisson et la protection.",                              cat:'science',   img:I.lascaux},
  {id:2,  year:-40000, yearEnd:-10000, title:'Art pariétal',                  wiki:'Art pariétal',                          desc:"Peintures de Chauvet (~37 000 av. J.-C.) et Lascaux (~17 000). Premières œuvres d'art connues.",                         cat:'art',       img:I.lascaux},
  {id:3,  year:-10000, yearEnd:-4000,  title:'Révolution néolithique',        wiki:'Révolution néolithique',                desc:"Naissance de l'agriculture et de l'élevage. Sédentarisation des populations humaines.",                                  cat:'science',   img:''},
  {id:4,  year:-5000,  yearEnd:-1500,  title:'Mégalithes & dolmens',          wiki:'Mégalithe',                             desc:"Stonehenge, alignements de Carnac (Bretagne). Structures mégalithiques à travers l'Europe.",                             cat:'autre',     img:I.stonehenge},
  {id:5,  year:-3500,  yearEnd:-3000,  title:'Invention de la roue',          wiki:'Roue',                                  desc:"Inventée en Mésopotamie, d'abord pour le potier puis pour les véhicules à traction animale.",                             cat:'science',   img:''},
  /* ── ANTIQUITÉ ── */
  {id:6,  year:-3200,  yearEnd:-3200,  title:'Invention de l\'écriture',      wiki:'Histoire de l\'écriture',               desc:"Les Sumériens inventent le cunéiforme. En Égypte naissent les hiéroglyphes.",                                            cat:'science',   img:''},
  {id:7,  year:-2700,  yearEnd:-2560,  title:'Pyramides de Gizeh',            wiki:'Pyramide de Khéops',                    desc:"Khéops, Khéphren, Mykérinos. L'une des Sept Merveilles du monde antique.",                                               cat:'art',       img:I.pyramides},
  {id:8,  year:-776,   yearEnd:-776,   title:'Premiers Jeux Olympiques',      wiki:'Jeux olympiques antiques',              desc:"Jeux panhelléniques à Olympie en l'honneur de Zeus.",                                                                    cat:'autre',     img:''},
  {id:9,  year:-753,   yearEnd:-753,   title:'Fondation de Rome',             wiki:'Fondation de Rome',                     desc:"Romulus fonde Rome sur le Palatin, future capitale d'un empire mondial.",                                                  cat:'politique', img:''},
  {id:10, year:-490,   yearEnd:-479,   title:'Guerres médiques',              wiki:'Guerres médiques',                      desc:"Marathon, Thermopyles, Salamine. La Grèce résiste à l'invasion perse.",                                                   cat:'guerre',    img:''},
  {id:11, year:-44,    yearEnd:-44,    title:'Assassinat de Jules César',     wiki:'Jules César',                           desc:"Poignardé aux Ides de Mars par Brutus et Cassius. Rome plonge dans la guerre civile.",                                     cat:'politique', img:''},
  {id:12, year:0,      yearEnd:0,      title:'Naissance de Jésus-Christ',     wiki:'Jésus de Nazareth',                     desc:"Naissance du fondateur du christianisme, future religion dominante de l'Europe.",                                         cat:'autre',     img:''},
  {id:13, year:476,    yearEnd:476,    title:'Chute de l\'Empire romain',     wiki:'Chute de l\'Empire romain d\'Occident', desc:"Romulus Augustule déposé par Odoacre. Fin de l'Antiquité, début du Moyen Âge.",                                           cat:'guerre',    img:''},
  /* ── MOYEN ÂGE ── */
  {id:14, year:732,    yearEnd:732,    title:'Bataille de Poitiers',          wiki:'Bataille de Poitiers (732)',             desc:"Charles Martel arrête l'avancée arabo-berbère en Occident.",                                                             cat:'guerre',    img:''},
  {id:15, year:800,    yearEnd:800,    title:'Couronnement de Charlemagne',   wiki:'Charlemagne',                           desc:"Charlemagne couronné Empereur d'Occident par le pape Léon III. Naissance de l'Europe carolingienne.",                     cat:'politique', img:I.charlemagne},
  {id:16, year:987,    yearEnd:987,    title:'Hugues Capet roi de France',    wiki:'Hugues Capet',                          desc:"Hugues Capet fonde la dynastie capétienne qui règnera sur la France pendant 341 ans.",                                       cat:'politique', img:''},
  {id:17, year:1066,   yearEnd:1066,   title:'Guillaume le Conquérant',       wiki:'Conquête normande de l\'Angleterre',    desc:"Le duc de Normandie bat Harold à Hastings et devient roi d'Angleterre.",                                                   cat:'guerre',    img:''},
  {id:18, year:1095,   yearEnd:1099,   title:'Première Croisade',             wiki:'Première croisade',                     desc:"Appel du pape Urbain II au concile de Clermont. Prise de Jérusalem en 1099.",                                              cat:'guerre',    img:''},
  {id:19, year:1163,   yearEnd:1345,   title:'Construction de Notre-Dame de Paris', wiki:'Cathédrale Notre-Dame de Paris', desc:"La cathédrale gothique de Paris est construite sur l'île de la Cité. Chef-d'œuvre de l'architecture médiévale française.", cat:'art',       img:''},
  {id:20, year:1215,   yearEnd:1215,   title:'Magna Carta',                   wiki:'Magna Carta',                           desc:"Jean sans Terre signe la Grande Charte, limitant le pouvoir royal anglais.",                                              cat:'politique', img:''},
  {id:21, year:1226,   yearEnd:1270,   title:'Règne de Saint Louis',          wiki:'Louis IX de France',                    desc:"Louis IX (Saint Louis) mène une politique de justice et de paix. Il mourra lors de la 8e croisade à Tunis.",               cat:'politique', img:''},
  {id:22, year:1337,   yearEnd:1453,   title:'Guerre de Cent Ans',            wiki:'Guerre de Cent Ans',                    desc:"Conflit franco-anglais pour la couronne de France. Jeanne d'Arc renverse le cours de la guerre.",                          cat:'guerre',    img:''},
  {id:23, year:1347,   yearEnd:1353,   title:'La Peste Noire en France',      wiki:'Peste noire',                           desc:"La pandémie de peste bubonique tue un tiers de la population européenne, dont la moitié en France.",                       cat:'autre',     img:''},
  {id:24, year:1429,   yearEnd:1429,   title:'Jeanne d\'Arc libère Orléans',  wiki:'Jeanne d\'Arc',                         desc:"La Pucelle d'Orléans lève le siège de la ville et redonne espoir au camp français.",                                       cat:'guerre',    img:I.jeanne},
  {id:25, year:1431,   yearEnd:1431,   title:'Jeanne d\'Arc brûlée à Rouen',  wiki:'Procès de Jeanne d\'Arc',               desc:"Condamnée par un tribunal ecclésiastique pro-anglais, Jeanne est brûlée vive le 30 mai.",                                  cat:'guerre',    img:I.jeanne},
  {id:26, year:1453,   yearEnd:1453,   title:'Chute de Constantinople',       wiki:'Chute de Constantinople',               desc:"Mehmed II prend Constantinople. Fin de Byzance. De nombreux savants fuient vers l'Occident.",                             cat:'guerre',    img:''},
  /* ── ÉPOQUE MODERNE ── */
  {id:27, year:1440,   yearEnd:1450,   title:'Gutenberg & l\'imprimerie',     wiki:'Johannes Gutenberg',                    desc:"La presse à caractères mobiles révolutionne la diffusion du savoir en Europe.",                                            cat:'science',   img:''},
  {id:28, year:1492,   yearEnd:1492,   title:'Christophe Colomb',             wiki:'Christophe Colomb',                     desc:"Colomb atteint les Bahamas. L'Amérique entre dans l'histoire européenne.",                                                  cat:'politique', img:''},
  {id:29, year:1494,   yearEnd:1494,   title:'Charles VIII envahit l\'Italie',wiki:'Guerres d\'Italie',                     desc:"Charles VIII de France lance les guerres d'Italie, début de la Renaissance française.",                                    cat:'guerre',    img:''},
  {id:30, year:1503,   yearEnd:1506,   title:'La Joconde',                    wiki:'La Joconde',                            desc:"Léonard de Vinci peint la Mona Lisa, aujourd'hui au Louvre. Icône de la Renaissance.",                                    cat:'art',       img:I.joconde},
  {id:31, year:1508,   yearEnd:1512,   title:'Chapelle Sixtine',              wiki:'Chapelle Sixtine',                      desc:"Michel-Ange peint le plafond de la Chapelle Sixtine pour Jules II.",                                                       cat:'art',       img:I.sixtine},
  {id:32, year:1515,   yearEnd:1515,   title:'Victoire de Marignan',          wiki:'Bataille de Marignan',                  desc:"François Ier bat les Suisses. Victoire éclatante qui ouvre une ère de gloire pour la France.",                             cat:'guerre',    img:''},
  {id:33, year:1519,   yearEnd:1547,   title:'François Ier & la Renaissance', wiki:'François Ier (roi de France)',          desc:"Le roi mécène attire Léonard de Vinci à Amboise, construit Chambord, fonde le Collège de France.",                        cat:'art',       img:''},
  {id:34, year:1572,   yearEnd:1572,   title:'Nuit de la Saint-Barthélemy',   wiki:'Massacre de la Saint-Barthélemy',       desc:"Des milliers de protestants massacrés sur ordre de Charles IX. Épisode tragique des guerres de Religion.",                 cat:'guerre',    img:''},
  {id:35, year:1598,   yearEnd:1598,   title:'Édit de Nantes',                wiki:'Édit de Nantes',                        desc:"Henri IV accorde la liberté de culte aux protestants. Fin des guerres de Religion en France.",                             cat:'politique', img:''},
  {id:36, year:1610,   yearEnd:1610,   title:'Assassinat d\'Henri IV',        wiki:'Henri IV (roi de France)',              desc:"Le Bon Roi Henri IV est poignardé par Ravaillac rue de la Ferronnerie à Paris.",                                            cat:'politique', img:''},
  {id:37, year:1623,   yearEnd:1662,   title:'Blaise Pascal',                 wiki:'Blaise Pascal',                         desc:"Mathématicien, physicien et philosophe français. Inventeur de la première calculatrice mécanique (1642).",                   cat:'science',   img:''},
  {id:38, year:1635,   yearEnd:1635,   title:'Fondation de l\'Académie française', wiki:'Académie française',              desc:"Le cardinal Richelieu fonde l'Académie française, gardienne de la langue française.",                                       cat:'art',       img:''},
  {id:39, year:1643,   yearEnd:1715,   title:'Règne de Louis XIV',            wiki:'Louis XIV',                             desc:"Le Roi-Soleil règne 72 ans. Versailles, absolutisme, guerres et splendeur culturelle.",                                      cat:'politique', img:I.louisxiv},
  {id:40, year:1661,   yearEnd:1710,   title:'Château de Versailles',         wiki:'Château de Versailles',                 desc:"Louis XIV fait transformer le pavillon de chasse en un palais monumental, symbole de l'absolutisme français.",               cat:'art',       img:I.versailles},
  {id:41, year:1685,   yearEnd:1685,   title:'Révocation de l\'Édit de Nantes',wiki:'Révocation de l\'édit de Nantes',     desc:"Louis XIV révoque l'Édit de Nantes, forçant 200 000 protestants à fuir la France.",                                        cat:'politique', img:''},
  {id:42, year:1751,   yearEnd:1772,   title:'L\'Encyclopédie',               wiki:'Encyclopédie ou Dictionnaire raisonné des sciences', desc:"Diderot et d'Alembert publient l'Encyclopédie, synthèse des Lumières françaises.",         cat:'art',       img:''},
  {id:43, year:1759,   yearEnd:1759,   title:'Candide de Voltaire',           wiki:'Candide',                               desc:"Chef-d'œuvre satirique des Lumières dénonçant la guerre, le fanatisme et l'injustice.",                                     cat:'art',       img:''},
  {id:44, year:1762,   yearEnd:1762,   title:'Du Contrat social',             wiki:'Du contrat social',                     desc:"Rousseau pose les bases de la souveraineté populaire et de la démocratie moderne.",                                          cat:'art',       img:''},
  {id:45, year:1778,   yearEnd:1778,   title:'Mort de Voltaire et Rousseau',  wiki:'Voltaire',                              desc:"Voltaire et Rousseau meurent tous les deux en 1778, emportant avec eux le siècle des Lumières.",                           cat:'art',       img:''},
  /* ── XIXe SIÈCLE ── */
  {id:46, year:1789,   yearEnd:1789,   title:'Prise de la Bastille',          wiki:'Prise de la Bastille',                  desc:"Le 14 juillet 1789, le peuple de Paris prend d'assaut la forteresse. Début de la Révolution française.",                   cat:'politique', img:I.bastille},
  {id:47, year:1789,   yearEnd:1799,   title:'Révolution française',          wiki:'Révolution française',                  desc:"De la Déclaration des droits de l'homme à la Terreur et au Directoire. La monarchie est abolie.",                           cat:'politique', img:I.revfr},
  {id:48, year:1792,   yearEnd:1792,   title:'Première République française', wiki:'Première République (France)',          desc:"La Convention nationale proclame la Première République le 21 septembre 1792 après la victoire de Valmy.",                  cat:'politique', img:''},
  {id:49, year:1793,   yearEnd:1793,   title:'Exécution de Louis XVI',        wiki:'Louis XVI',                             desc:"Le roi Louis XVI est guillotiné le 21 janvier 1793. La monarchie française prend fin provisoirement.",                       cat:'politique', img:''},
  {id:50, year:1804,   yearEnd:1815,   title:'Empire napoléonien',            wiki:'Napoléon Ier',                          desc:"Napoléon couronne Empereur. Code civil, réorganisation de l'Europe, campagnes jusqu'en Russie.",                             cat:'politique', img:I.napoleon},
  {id:51, year:1812,   yearEnd:1812,   title:'Retraite de Russie',            wiki:'Campagne de Russie',                    desc:"La Grande Armée envahit la Russie mais recule dévastée par l'hiver. 400 000 soldats meurent.",                              cat:'guerre',    img:''},
  {id:52, year:1815,   yearEnd:1815,   title:'Bataille de Waterloo',          wiki:'Bataille de Waterloo',                  desc:"Napoléon vaincu par Wellington et Blücher. Exil définitif à Sainte-Hélène.",                                               cat:'guerre',    img:''},
  {id:53, year:1821,   yearEnd:1821,   title:'Mort de Napoléon',              wiki:'Mort de Napoléon Ier',                  desc:"Napoléon Bonaparte meurt à Sainte-Hélène le 5 mai. Son corps sera rapatrié aux Invalides en 1840.",                        cat:'politique', img:''},
  {id:54, year:1830,   yearEnd:1830,   title:'Révolution de Juillet',         wiki:'Révolution de Juillet',                 desc:"Les Trois Glorieuses (27-29 juillet) renversent Charles X. Louis-Philippe d'Orléans devient roi.",                          cat:'politique', img:''},
  {id:55, year:1848,   yearEnd:1848,   title:'Révolution de 1848 en France',  wiki:'Révolution française de 1848',          desc:"Louis-Philippe abdique, la Seconde République est proclamée. Suffrage universel masculin instauré.",                        cat:'politique', img:''},
  {id:56, year:1848,   yearEnd:1870,   title:'Second Empire de Napoléon III', wiki:'Second Empire',                         desc:"Napoléon III modernise la France : Haussmann transforme Paris, essor industriel, grands travaux.",                           cat:'politique', img:''},
  {id:57, year:1857,   yearEnd:1857,   title:'Madame Bovary de Flaubert',     wiki:'Madame Bovary',                         desc:"Chef-d'œuvre du réalisme français. Flaubert est d'abord poursuivi pour outrage aux mœurs.",                                  cat:'art',       img:''},
  {id:58, year:1862,   yearEnd:1862,   title:'Les Misérables de Victor Hugo',  wiki:'Les Misérables',                       desc:"Victor Hugo publie son roman fleuve sur la misère sociale et la rédemption. Succès mondial immédiat.",                        cat:'art',       img:I.hugo},
  {id:59, year:1870,   yearEnd:1871,   title:'Guerre franco-prussienne',      wiki:'Guerre franco-prussienne de 1870',      desc:"La France est écrasée. Paris est assiégé. Alsace-Lorraine annexée. Début de la IIIe République.",                          cat:'guerre',    img:''},
  {id:60, year:1871,   yearEnd:1871,   title:'Commune de Paris',              wiki:'Commune de Paris',                      desc:"Paris se soulève. La Commune révolutionnaire gouverne 72 jours avant d'être écrasée dans le sang.",                        cat:'politique', img:''},
  {id:61, year:1874,   yearEnd:1886,   title:'Naissance de l\'Impressionnisme',wiki:'Impressionnisme',                      desc:"Monet, Renoir, Degas, Pissarro exposent ensemble. Révolution dans l'histoire de la peinture.",                              cat:'art',       img:I.monet},
  {id:62, year:1878,   yearEnd:1895,   title:'Louis Pasteur & la microbiologie',wiki:'Louis Pasteur',                       desc:"Pasteur prouve la théorie germinale des maladies. Vaccin contre la rage (1885). Révolution médicale.",                      cat:'science',   img:I.pasteur},
  {id:63, year:1889,   yearEnd:1889,   title:'Tour Eiffel inaugurée',         wiki:'Tour Eiffel',                           desc:"Gustave Eiffel construit sa tour pour l'Exposition universelle. Symbole de Paris et de la France.",                          cat:'art',       img:I.toureiffel},
  {id:64, year:1895,   yearEnd:1895,   title:'Cinéma des frères Lumière',     wiki:'Frères Lumière',                        desc:"Première projection publique du cinématographe le 28 décembre au Grand Café à Paris.",                                       cat:'art',       img:I.lumiere},
  {id:65, year:1894,   yearEnd:1906,   title:'Affaire Dreyfus',               wiki:'Affaire Dreyfus',                        desc:"Le capitaine Dreyfus, faussement accusé de trahison, divise la France entre dreyfusards et antidreyfusards.",               cat:'politique', img:''},
  /* ── XXe SIÈCLE ── */
  {id:66, year:1905,   yearEnd:1905,   title:'Loi de séparation Église-État', wiki:'Loi de séparation des Églises et de l\'État', desc:"La France vote la laïcité : l'État ne reconnaît plus aucun culte. Fondement de la République laïque.", cat:'politique', img:''},
  {id:67, year:1905,   yearEnd:1905,   title:'Relativité d\'Einstein',        wiki:'Théorie de la relativité restreinte',    desc:"Einstein publie E=mc² et révolutionne la physique à 26 ans.",                                                             cat:'science',   img:I.einstein},
  {id:68, year:1914,   yearEnd:1918,   title:'Première Guerre mondiale',      wiki:'Première Guerre mondiale',               desc:"La France perd 1,4 million de soldats. Verdun, la Marne, les tranchées. Victoire alliée le 11 novembre.",                  cat:'guerre',    img:I.ww1fr},
  {id:69, year:1916,   yearEnd:1916,   title:'Bataille de Verdun',            wiki:'Bataille de Verdun',                     desc:"10 mois de combat, 300 000 morts. Symbole du sacrifice et de la résistance française.",                                    cat:'guerre',    img:I.ww1fr},
  {id:70, year:1919,   yearEnd:1919,   title:'Traité de Versailles',          wiki:'Traité de Versailles',                   desc:"Fin officielle de la WW1. L'Alsace-Lorraine est rendue à la France. Germes de la WW2.",                                   cat:'politique', img:''},
  {id:71, year:1936,   yearEnd:1938,   title:'Front Populaire',               wiki:'Front populaire (France)',               desc:"Léon Blum instaure les congés payés, la semaine de 40h. Victoire historique de la gauche.",                                cat:'politique', img:''},
  {id:72, year:1939,   yearEnd:1945,   title:'Seconde Guerre mondiale',       wiki:'Seconde Guerre mondiale',                desc:"70 à 85 millions de morts. La France est occupée (1940-1944). Shoah. Victoire alliée en 1945.",                            cat:'guerre',    img:I.dday},
  {id:73, year:1940,   yearEnd:1940,   title:'Appel du 18 juin – De Gaulle',  wiki:'Appel du 18 juin',                       desc:"De Gaulle lance son appel depuis Londres sur la BBC. Naissance de la France Libre.",                                        cat:'politique', img:I.degaulle},
  {id:74, year:1944,   yearEnd:1944,   title:'Libération de Paris',           wiki:'Libération de Paris',                    desc:"Paris est libéré le 25 août 1944. De Gaulle descend les Champs-Élysées en triomphateur.",                                  cat:'guerre',    img:I.degaulle},
  {id:75, year:1944,   yearEnd:1944,   title:'Droit de vote des femmes',      wiki:'Droit de vote des femmes en France',     desc:"L'ordonnance du 21 avril 1944 accorde le droit de vote aux femmes françaises.",                                            cat:'politique', img:''},
  {id:76, year:1946,   yearEnd:1958,   title:'IVe République française',      wiki:'Quatrième République',                   desc:"Régime parlementaire instable (22 gouvernements). Guerre d'Indochine, naissance de la Communauté européenne.",             cat:'politique', img:''},
  {id:77, year:1954,   yearEnd:1954,   title:'Défaite de Diên Biên Phu',      wiki:'Bataille de Diên Biên Phu',             desc:"L'armée française est vaincue au Vietnam. Fin de la guerre d'Indochine, début de la guerre du Vietnam.",                   cat:'guerre',    img:''},
  {id:78, year:1954,   yearEnd:1962,   title:'Guerre d\'Algérie',             wiki:'Guerre d\'Algérie',                      desc:"Conflit douloureux pour l'indépendance algérienne. 1,5 million de soldats français mobilisés.",                            cat:'guerre',    img:''},
  {id:79, year:1957,   yearEnd:1957,   title:'Traité de Rome – CEE',          wiki:'Traité de Rome (1957)',                  desc:"Fondation de la Communauté économique européenne (CEE). Début de la construction européenne.",                             cat:'politique', img:''},
  {id:80, year:1958,   yearEnd:1969,   title:'Ve République & De Gaulle',     wiki:'Charles de Gaulle',                      desc:"De Gaulle fonde la Ve République. Présidentialisme, politique de grandeur, indépendance nucléaire.",                      cat:'politique', img:I.degaulle},
  {id:81, year:1962,   yearEnd:1962,   title:'Indépendance de l\'Algérie',    wiki:'Indépendance de l\'Algérie',             desc:"Les accords d'Évian mettent fin à la guerre. L'Algérie devient indépendante le 5 juillet.",                               cat:'politique', img:''},
  {id:82, year:1968,   yearEnd:1968,   title:'Mai 68',                        wiki:'Mai 68',                                 desc:"Étudiants et ouvriers paralysent la France. De Gaulle dissout l'Assemblée et gagne les élections.",                        cat:'politique', img:''},
  {id:83, year:1969,   yearEnd:1969,   title:'Premiers pas sur la Lune',      wiki:'Apollo 11',                              desc:"Neil Armstrong marche sur la Lune le 21 juillet. 600 millions de téléspectateurs.",                                        cat:'science',   img:I.lune},
  {id:84, year:1969,   yearEnd:1969,   title:'Démission de De Gaulle',        wiki:'Démission de Charles de Gaulle',         desc:"De Gaulle démissionne après la défaite au référendum. Pompidou lui succède.",                                              cat:'politique', img:I.degaulle},
  {id:85, year:1976,   yearEnd:2003,   title:'Concorde en service',           wiki:'Concorde',                               desc:"L'avion supersonique franco-britannique relie Paris à New York en 3h30. Retrait en 2003.",                                  cat:'science',   img:I.concorde},
  {id:86, year:1977,   yearEnd:1977,   title:'Centre Pompidou inauguré',      wiki:'Centre Georges-Pompidou',                desc:"Le musée d'art moderne parisien au design révolutionnaire ouvre ses portes.",                                              cat:'art',       img:I.pompidou},
  {id:87, year:1981,   yearEnd:1995,   title:'Mitterrand Président',          wiki:'François Mitterrand',                    desc:"Premier président socialiste de la Ve République. Abolition de la peine de mort, décentralisation, Tunnel sous la Manche.", cat:'politique', img:I.mitterrand},
  {id:88, year:1981,   yearEnd:1981,   title:'Abolition de la peine de mort', wiki:'Abolition de la peine de mort en France',desc:"Robert Badinter et François Mitterrand abolissent la guillotine. La France rejoint les démocraties abolitionnistes.",     cat:'politique', img:''},
  {id:89, year:1986,   yearEnd:1986,   title:'Catastrophe de Tchernobyl',     wiki:'Catastrophe de Tchernobyl',              desc:"Le réacteur n°4 explose en Ukraine. Le plus grave accident nucléaire civil de l'histoire.",                                 cat:'autre',     img:''},
  {id:90, year:1989,   yearEnd:1989,   title:'Chute du mur de Berlin',        wiki:'Chute du mur de Berlin',                 desc:"Le mur de Berlin tombe le 9 novembre. Fin symbolique de la Guerre froide.",                                               cat:'politique', img:I.berlin},
  {id:91, year:1991,   yearEnd:1991,   title:'Fin de l\'URSS',                wiki:'Dissolution de l\'Union soviétique',     desc:"L'URSS se dissout le 25 décembre. Fin de la bipolarité mondiale.",                                                        cat:'politique', img:''},
  {id:92, year:1993,   yearEnd:1993,   title:'Traité de Maastricht',          wiki:'Traité de Maastricht',                   desc:"Création de l'Union européenne. La monnaie unique (euro) est programmée.",                                                 cat:'politique', img:''},
  {id:93, year:1994,   yearEnd:1994,   title:'Tunnel sous la Manche',         wiki:'Tunnel sous la Manche',                  desc:"Le tunnel ferroviaire reliant Coquelles (France) à Folkestone (UK) ouvre le 6 mai.",                                       cat:'science',   img:''},
  /* ── XXIe SIÈCLE ── */
  {id:94, year:2001,   yearEnd:2001,   title:'Attentats du 11 septembre',     wiki:'Attentats du 11 septembre 2001',         desc:"Al-Qaïda attaque les tours du WTC. 2977 morts. Début de la guerre mondiale contre le terrorisme.",                       cat:'guerre',    img:I.sept11},
  {id:95, year:2002,   yearEnd:2002,   title:'Introduction de l\'euro',       wiki:'Euro',                                   desc:"L'euro remplace le franc français. 12 pays adoptent la monnaie unique européenne.",                                         cat:'politique', img:''},
  {id:96, year:2004,   yearEnd:2004,   title:'Naissance de Facebook',         wiki:'Facebook',                               desc:"Zuckerberg lance son réseau social depuis Harvard. 3 milliards d'utilisateurs en 2024.",                                   cat:'science',   img:''},
  {id:97, year:2005,   yearEnd:2005,   title:'Non français au référendum européen',wiki:'Référendum français sur la Constitution européenne', desc:"La France vote Non à 55% au projet de Constitution européenne, choc politique majeur.", cat:'politique', img:''},
  {id:98, year:2007,   yearEnd:2022,   title:'Présidence Sarkozy → Macron',   wiki:'Nicolas Sarkozy',                        desc:"Sarkozy (2007), Hollande (2012), Macron (2017, 2022) se succèdent à l'Élysée.",                                            cat:'politique', img:I.macron},
  {id:99, year:2007,   yearEnd:2007,   title:'Premier iPhone',                wiki:'iPhone',                                 desc:"Apple révolutionne la téléphonie mobile. Steve Jobs présente le premier smartphone moderne.",                               cat:'science',   img:''},
  {id:100,year:2008,   yearEnd:2009,   title:'Crise financière mondiale',      wiki:'Crise financière de 2007-2008',          desc:"La faillite de Lehman Brothers déclenche la pire crise depuis 1929.",                                                      cat:'autre',     img:''},
  {id:101,year:2015,   yearEnd:2015,   title:'Attentats de Paris (Charlie Hebdo)',wiki:'Attentat contre Charlie Hebdo',       desc:"12 morts à la rédaction de Charlie Hebdo le 7 janvier. La France est sous le choc.",                                     cat:'guerre',    img:''},
  {id:102,year:2015,   yearEnd:2015,   title:'Attentats du 13 novembre 2015',  wiki:'Attentats du 13 novembre 2015 en France',desc:"130 morts au Bataclan et sur les terrasses parisiennes. La France décrète l'état d'urgence.",                          cat:'guerre',    img:''},
  {id:103,year:2015,   yearEnd:2015,   title:'Accord de Paris sur le climat',  wiki:'Accord de Paris',                        desc:"195 pays s'engagent à limiter le réchauffement à 2°C lors de la COP21 à Paris.",                                         cat:'autre',     img:''},
  {id:104,year:2017,   yearEnd:2017,   title:'Élection d\'Emmanuel Macron',    wiki:'Emmanuel Macron',                        desc:"Macron, 39 ans, devient le plus jeune président de la Ve République, battant Marine Le Pen au 2e tour.",                  cat:'politique', img:I.macron},
  {id:105,year:2018,   yearEnd:2018,   title:'Victoire de la France – Coupe du Monde',wiki:'Coupe du monde de football 2018',desc:"La France remporte sa 2e Coupe du Monde en Russie, battant la Croatie 4-2 en finale.",                                 cat:'autre',     img:''},
  {id:106,year:2019,   yearEnd:2019,   title:'Incendie de Notre-Dame de Paris',wiki:'Incendie de Notre-Dame de Paris',        desc:"La cathédrale est partiellement détruite le 15 avril. Sa flèche s'effondre. Vaste élan de solidarité mondial.",           cat:'art',       img:''},
  {id:107,year:2019,   yearEnd:2022,   title:'Pandémie de Covid-19',           wiki:'Pandémie de Covid-19',                   desc:"Le virus paralyse le monde. La France subit plusieurs confinements. Plus de 160 000 morts en France.",                   cat:'autre',     img:''},
  {id:108,year:2022,   yearEnd:2022,   title:'Invasion russe de l\'Ukraine',   wiki:'Invasion de l\'Ukraine par la Russie',   desc:"La Russie envahit l'Ukraine le 24 février. Plus grand conflit en Europe depuis 1945.",                                   cat:'guerre',    img:''},
  {id:109,year:2024,   yearEnd:2024,   title:'Réouverture de Notre-Dame',      wiki:'Reconstruction de Notre-Dame de Paris',  desc:"La cathédrale de Paris rouvre le 7 décembre 2024 après 5 ans de travaux spectaculaires.",                                cat:'art',       img:''},
  {id:110,year:2024,   yearEnd:2024,   title:'Jeux Olympiques de Paris 2024',  wiki:'Jeux olympiques d\'été de 2024',         desc:"Paris accueille les JO du 26 juillet au 11 août. La France remporte 16 médailles d'or.",                                cat:'autre',     img:''},
];

/* ── Storage ── */
const SK = 'frise_v6';
function loadEv() { try { const s=localStorage.getItem(SK); return s ? JSON.parse(s) : DEFAULTS; } catch { return DEFAULTS; } }
function saveSt() { try { localStorage.setItem(SK, JSON.stringify(events)); } catch(e) {} }

let events = loadEv();
let nextId = Math.max(...events.map(e=>e.id), 0) + 1;
let scale=1, offsetX=0, svgW=900;
const H=340, AY=175;
let editId=null, activeId=null, highlightId=null;
let currentEra=null;
let dragging=false, dsx=0, dsox=0;
let hiddenCats=new Set();
let pendingImg='';

const svgEl = document.getElementById('tl-svg');
const wrap   = document.getElementById('tl-wrap');
const tipEl  = document.getElementById('tip');
const cpop   = document.getElementById('cpop');
const clList = document.getElementById('cluster-list');

/* ── Helpers ── */
function fmtY(y) { return y<0 ? Math.abs(y)+' av. J.-C.' : String(y); }
function fmtRange(y, ye) { return (!ye||ye===y) ? fmtY(y) : fmtY(y)+' – '+fmtY(ye); }
function midY(ev) { return (ev.yearEnd&&ev.yearEnd!==ev.year) ? (ev.year+ev.yearEnd)/2 : ev.year; }
function getWikiUrl(ev) { return 'https://fr.wikipedia.org/wiki/'+encodeURIComponent((ev.wiki||ev.title).replace(/ /g,'_')); }

/* ── Era strip ── */
function buildEraStrip() {
  const strip = document.getElementById('era-strip');
  strip.innerHTML = ERAS.map(era => {
    const count = events.filter(e => midY(e)>=era.from && midY(e)<era.to && !hiddenCats.has(e.cat)).length;
    const active = currentEra && currentEra.key===era.key;
    const fromStr = era.from<0 ? Math.abs(era.from)+' av. J.-C.' : era.from;
    const toStr   = era.key==='xxi' ? 'aujourd\'hui' : (era.to<0 ? Math.abs(era.to)+' av. J.-C.' : era.to);
    const isAll   = era.key==='all';
    return `<div class="era-card${active?' active':''}${isAll?' era-all':''}" style="--era-color:${era.color}" onclick="selectEra('${era.key}')">
      <div class="ec-dot" style="background:${era.color}"></div>
      <div class="ec-name">${era.name}</div>
      <div class="ec-range">${fromStr} → ${toStr}</div>
      <div class="ec-count">${count} événement${count>1?'s':''}</div>
      <span class="ec-arrow">→</span>
    </div>`;
  }).join('');
}

function selectEra(key) {
  currentEra = ERAS.find(e=>e.key===key);
  // Update 'all' era end to today
  if (key==='all') currentEra = {...currentEra, to:TODAY_YEAR};
  buildEraStrip();
  document.getElementById('era-hint').style.display='none';
  const outer = document.getElementById('tl-outer');
  outer.classList.add('show');
  document.getElementById('tl-dot').style.background = currentEra.color;
  const toLabel = key==='xxi'||key==='all' ? 'aujourd\'hui' :
    (currentEra.to<0 ? Math.abs(currentEra.to)+' av. J.-C.' : currentEra.to);
  document.getElementById('tl-era-name').textContent =
    currentEra.name+' ('+
    (currentEra.from<0 ? Math.abs(currentEra.from)+' av. J.-C.' : currentEra.from)+' – '+
    toLabel+')';
  setTimeout(resetView, 60);
  outer.scrollIntoView({ behavior:'smooth', block:'start' });
}

function closeEra() {
  currentEra=null; buildEraStrip();
  document.getElementById('tl-outer').classList.remove('show');
  document.getElementById('era-hint').style.display='block';
}

/* ── Era events ── */
function eraEvents() {
  if (!currentEra) return [];
  return events.filter(e => midY(e)>=currentEra.from && midY(e)<currentEra.to && !hiddenCats.has(e.cat));
}

/* ── Scale ── */
function getRange() {
  const ev=eraEvents();
  if (!currentEra) return {minY:0,maxY:TODAY_YEAR};
  const to = currentEra.key==='xxi'||currentEra.key==='all' ? TODAY_YEAR : currentEra.to;
  const pad = (to-currentEra.from)*0.05;
  const allY = ev.flatMap(e=>[e.year,e.yearEnd||e.year]);
  return {
    minY: Math.min(currentEra.from,...(allY.length?allY:[currentEra.from]))-pad,
    maxY: Math.max(to,...(allY.length?allY:[to]))+pad,
  };
}
function yearToX(y) { const {minY}=getRange(); return 80+(y-minY)*scale+offsetX; }
function defScale() { const {minY,maxY}=getRange(); return Math.max(.001,(svgW-160)/(maxY-minY||1)); }
function resetView() { scale=defScale(); offsetX=0; render(); updZoom(); }
function zoom(d) { scale*=d>0?1.5:1/1.5; render(); updZoom(); }
function updZoom() {
  const p=Math.round(scale/defScale()*100)+'%';
  document.getElementById('zlbl').textContent=p;
  document.getElementById('zlbl2').textContent=p;
}
function tickIv() {
  const yv=svgW/scale;
  for (const iv of [1,2,5,10,25,50,100,200,500,1000,2000,5000,10000,50000,100000])
    if (svgW/(yv/iv)>75) return iv;
  return 100000;
}

/* ── Cluster ── */
const MIN_DIST=72;
function clusterEvents(placed) {
  const sorted=[...placed].sort((a,b)=>a.mx-b.mx);
  const clusters=[], used=new Set();
  for (let i=0;i<sorted.length;i++) {
    if(used.has(i)) continue;
    const group=[sorted[i]]; used.add(i);
    for (let j=i+1;j<sorted.length;j++) {
      if(used.has(j)) continue;
      if(sorted[j].mx-sorted[i].mx<MIN_DIST){group.push(sorted[j]);used.add(j);}
    }
    clusters.push(group);
  }
  return clusters;
}

/* ── Era background colors per epoch ── */
const ERA_GRADIENTS = {
  all:     [['#8b5cf6','#06b6d4'],['#f03060','#4f6ef7'],['#e07820','#16c47a']],
  prehist: [['#e07820','#f59e0b'],['#d97706','#b45309']],
  antiq:   [['#d4a020','#f59e0b'],['#b45309','#92400e']],
  moyen:   [['#4f6ef7','#6366f1'],['#3b82f6','#1d4ed8']],
  mod:     [['#16c47a','#10b981'],['#059669','#047857']],
  contemp: [['#f03060','#e11d48'],['#be123c','#9f1239']],
  xx:      [['#a855f7','#9333ea'],['#7c3aed','#6d28d9']],
  xxi:     [['#06b6d4','#0891b2'],['#0e7490','#155e75']],
};

/* ── Build SVG background with beautiful colored bands ── */
function buildBackground(h, minY, maxY, eraColor) {
  // Multi-color diagonal gradient bands
  const grads = ERA_GRADIENTS[currentEra.key] || ERA_GRADIENTS.xx;

  // Base gradient - top to bottom
  h += `<defs>
    <linearGradient id="bg-main" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${grads[0][0]}" stop-opacity=".10"/>
      <stop offset="50%" stop-color="${grads[0][1]}" stop-opacity=".05"/>
      <stop offset="100%" stop-color="${grads[0][0]}" stop-opacity=".03"/>
    </linearGradient>
    <linearGradient id="bg-diag" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${grads[0][0]}" stop-opacity=".08"/>
      <stop offset="40%" stop-color="${grads[0][1]}" stop-opacity=".04"/>
      <stop offset="100%" stop-color="${grads[grads.length>1?1:0][1]}" stop-opacity=".09"/>
    </linearGradient>
  </defs>`;
  h += `<rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bg-main)"/>`;
  h += `<rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bg-diag)"/>`;

  // Decorative colored arc shapes at corners
  h += `<ellipse cx="0" cy="0" rx="${svgW*0.25}" ry="${H*0.6}" fill="${grads[0][0]}" opacity=".06"/>`;
  h += `<ellipse cx="${svgW}" cy="${H}" rx="${svgW*0.22}" ry="${H*0.5}" fill="${grads[grads.length>1?1:0][1]}" opacity=".06"/>`;

  // Subtle diagonal color wash
  h += `<rect x="0" y="0" width="${svgW}" height="${H}" fill="${eraColor}" opacity=".03"/>`;

  // Highlight band above axis
  h += `<rect x="0" y="${AY-H*0.35}" width="${svgW}" height="${H*0.35}" fill="${eraColor}" opacity=".025"/>`;

  return h;
}

/* ── Render ── */
function render() {
  svgW = wrap.clientWidth||900;
  svgEl.setAttribute('width', svgW);
  svgEl.setAttribute('height', H);
  if (!currentEra) { svgEl.innerHTML=''; clearClusterOverlays(); return; }

  const {minY,maxY}=getRange();
  const iv=tickIv();
  const st=Math.ceil((minY-iv*2)/iv)*iv;
  const en=st+Math.ceil(svgW/scale/iv+4)*iv;
  let h='';

  h = buildBackground(h, minY, maxY, currentEra.color);

  /* Vertical grid */
  for (let y=st;y<=en;y+=iv) {
    const x=yearToX(y); if(x<-5||x>svgW+5) continue;
    h+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${currentEra.color}" stroke-width=".4" opacity=".2"/>`;
  }

  /* "Today" marker */
  const todayX = yearToX(TODAY_YEAR);
  if (todayX>=0 && todayX<=svgW) {
    h+=`<line x1="${todayX}" y1="0" x2="${todayX}" y2="${H}" stroke="${currentEra.color}" stroke-width="1.5" stroke-dasharray="4 4" opacity=".5"/>`;
    h+=`<rect x="${todayX+4}" y="6" width="62" height="18" rx="9" fill="${currentEra.color}" opacity=".18"/>`;
    h+=`<text x="${todayX+35}" y="18" text-anchor="middle" font-size="10" fill="${currentEra.color}" font-family="'DM Sans',sans-serif" font-weight="500">Aujourd'hui</text>`;
  }

  /* Axis */
  h+=`<line x1="0" y1="${AY}" x2="${svgW}" y2="${AY}" stroke="${currentEra.color}" stroke-width="2.5" opacity=".4"/>`;

  /* Ticks + labels */
  for (let y=st;y<=en;y+=iv) {
    const x=yearToX(y); if(x<-5||x>svgW+5) continue;
    h+=`<circle cx="${x}" cy="${AY}" r="3.5" fill="${currentEra.color}" opacity=".5"/>`;
    const lbl=y<0?Math.abs(y)+' av.':y===0?'0':y;
    h+=`<text x="${x}" y="${AY+24}" text-anchor="middle" font-size="10" fill="var(--ink3)" font-family="'DM Sans',sans-serif">${lbl}</text>`;
  }

  /* Place events */
  const visible=eraEvents().sort((a,b)=>a.year-b.year);
  const raw=[];
  const rowLastX={};
  visible.forEach((ev,i)=>{
    const mx=yearToX(midY(ev));
    const candidates=[]; for(let r=1;r<=6;r++) candidates.push(-r,r);
    let row=i%2===0?-1:1;
    for(const r of candidates){if(!rowLastX[r]||mx-rowLastX[r]>105){row=r;break;}}
    rowLastX[row]=mx;
    raw.push({...ev,row,mx});
  });

  /* Period spans */
  raw.forEach(ev=>{
    const isPeriod=ev.yearEnd&&ev.yearEnd!==ev.year;
    if(!isPeriod) return;
    const x1=Math.max(0,yearToX(ev.year)); const x2=Math.min(svgW,yearToX(ev.yearEnd));
    if(x2<0||x1>svgW) return;
    const c=(CATS[ev.cat]||CATS.autre).c;
    const above=ev.row<0; const depth=Math.abs(ev.row); const stemLen=48+depth*36;
    const barY=above?AY-stemLen-10:AY+stemLen+4;
    h+=`<rect x="${x1}" y="${barY}" width="${Math.max(1,x2-x1)}" height="7" rx="3.5" fill="${c}" opacity=".18"/>`;
    if(x1>=0) h+=`<line x1="${x1}" y1="${AY}" x2="${x1}" y2="${barY+3}" stroke="${c}" stroke-width=".8" opacity=".3"/>`;
    if(x2<=svgW) h+=`<line x1="${x2}" y1="${AY}" x2="${x2}" y2="${barY+3}" stroke="${c}" stroke-width=".8" opacity=".3"/>`;
  });

  /* Cluster */
  const clusters=clusterEvents(raw);
  const singleIds=new Set(clusters.filter(g=>g.length===1).flatMap(g=>g.map(e=>e.id)));

  /* Single events: stems + dots */
  raw.filter(ev=>singleIds.has(ev.id)).forEach(ev=>{
    const mx=ev.mx; if(mx<-80||mx>svgW+80) return;
    const c=(CATS[ev.cat]||CATS.autre).c;
    const above=ev.row<0; const depth=Math.abs(ev.row); const stemLen=48+depth*36;
    const labelY=above?AY-stemLen:AY+stemLen;
    const bh=42;
    const by=above?labelY-bh:labelY;
    h+=`<circle cx="${mx}" cy="${AY}" r="7" fill="${c}" opacity=".18" data-id="${ev.id}"/>`;
    h+=`<circle cx="${mx}" cy="${AY}" r="${activeId===ev.id?5.5:4}" fill="${c}" stroke="var(--paper2)" stroke-width="1.5" style="cursor:pointer" data-id="${ev.id}"/>`;
    h+=`<line x1="${mx}" y1="${AY+(above?-5:5)}" x2="${mx}" y2="${above?by+bh:by}" stroke="${c}" stroke-width="1" stroke-dasharray="2 3" opacity=".4"/>`;
  });

  /* Single events: cards */
  raw.filter(ev=>singleIds.has(ev.id)).forEach(ev=>{
    h+=buildEventCard(ev);
  });

  svgEl.innerHTML=h;
  svgEl.querySelectorAll('[data-id]').forEach(el=>{
    const id=parseInt(el.dataset.id);
    el.addEventListener('click',e=>{e.stopPropagation();openCard(id,e);});
    el.addEventListener('mousemove',e=>showTip(e,id));
    el.addEventListener('mouseleave',()=>{tipEl.style.display='none';});
  });

  clearClusterOverlays();
  clusters.filter(g=>g.length>1).forEach(group=>buildClusterOverlay(group));
  renderLegend(); buildEraStrip();
}

/* ── Build event card SVG string ── */
function buildEventCard(ev) {
  const cat=CATS[ev.cat]||CATS.autre; const c=cat.c;
  const mx=ev.mx; if(mx<-80||mx>svgW+80) return '';
  const above=ev.row<0; const depth=Math.abs(ev.row); const stemLen=48+depth*36;
  const labelY=above?AY-stemLen:AY+stemLen;
  const label=ev.title.length>25?ev.title.slice(0,24)+'…':ev.title;
  const bw=Math.min(label.length*7.2+32, 195);
  const bh=42;
  const bx=Math.max(4,Math.min(mx-bw/2,svgW-bw-4));
  const by=above?labelY-bh:labelY;
  const isActive=ev.id===activeId; const isHL=ev.id===highlightId;
  let s='';
  if(isActive||isHL)
    s+=`<rect x="${bx-5}" y="${by-5}" width="${bw+10}" height="${bh+10}" rx="13" fill="${c}" opacity="${isHL?.22:.14}"/>`;
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
function clearClusterOverlays() { document.querySelectorAll('.cluster-overlay').forEach(el=>el.remove()); }
function buildClusterOverlay(group) {
  const avgX=group.reduce((s,e)=>s+e.mx,0)/group.length;
  if(avgX<-30||avgX>svgW+30) return;
  const catCounts={};
  group.forEach(e=>{catCounts[e.cat]=(catCounts[e.cat]||0)+1;});
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
  wrap.style.position='relative'; wrap.appendChild(div);
}

/* ── Cluster list ── */
function openClusterList(group,e) {
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
function closeClusterList(){clList.style.display='none';}
function zoomToEvent(id){
  closeClusterList();
  const ev=events.find(e=>e.id===id); if(!ev) return;
  const{minY}=getRange(); scale=defScale()*6;
  offsetX=(svgW/2)-80-(midY(ev)-minY)*scale;
  render();updZoom();highlightId=id;
  setTimeout(()=>{highlightId=null;render();},2200);
}

/* ── Tooltip ── */
function showTip(e,id){
  const ev=events.find(x=>x.id===id); if(!ev) return;
  const cat=CATS[ev.cat]||CATS.autre;
  tipEl.style.display='block';
  tipEl.style.left=(e.clientX+18)+'px';tipEl.style.top=(e.clientY-24)+'px';
  tipEl.innerHTML=`<strong>${ev.title}</strong>
    <div class="ty" style="color:${cat.c}">${fmtRange(ev.year,ev.yearEnd)} · ${cat.e} ${cat.l}</div>
    ${ev.desc?`<div class="td">${ev.desc.slice(0,100)}${ev.desc.length>100?'…':''}</div>`:''}`;
}

/* ── Card popup (HTML, not SVG — images toujours fonctionnelles) ── */
function openCard(id,e){
  const ev=events.find(x=>x.id===id); if(!ev) return;
  const cat=CATS[ev.cat]||CATS.autre;
  const isPeriod=ev.yearEnd&&ev.yearEnd!==ev.year;

  // Image via URL dans un <img> HTML standard
  const imgW=document.getElementById('cp-img-w');
  if(ev.img){
    imgW.innerHTML=`<img class="cp-img" src="${ev.img}" alt="${ev.title}"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
    /><div style="display:none;width:100%;height:90px;align-items:center;justify-content:center;font-size:40px;background:var(--paper3)">${cat.e}</div>`;
  } else {
    imgW.innerHTML=`<div style="width:100%;height:80px;display:flex;align-items:center;justify-content:center;font-size:44px;background:linear-gradient(135deg,${cat.bg},transparent)">${cat.e}</div>`;
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
  const vw=window.innerWidth,vh=window.innerHeight,pw=350,ph=500;
  cpop.style.left=Math.min(e.clientX+16,vw-pw-10)+'px';
  cpop.style.top=Math.min(e.clientY-60,vh-ph-10)+'px';
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
function toggleCat(k){hiddenCats.has(k)?hiddenCats.delete(k):hiddenCats.add(k);render();buildEraStrip();}

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
  const ev=events.find(e=>e.id===id); if(!ev) return;
  document.getElementById('sres').classList.remove('open');
  const era=ERAS.find(er=>midY(ev)>=er.from&&midY(ev)<er.to&&er.key!=='all');
  if(era&&(!currentEra||currentEra.key!==era.key)) selectEra(era.key);
  highlightId=id;
  setTimeout(()=>{
    const{minY}=getRange(); scale=defScale()*6;
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
  const ev=events.find(e=>e.id===id); if(!ev) return;
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
function closeMod(){document.getElementById('mbg').classList.remove('open');}
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
  const mid=Math.round((year+yearEnd)/2);
  const era=ERAS.find(er=>er.key!=='all'&&mid>=er.from&&mid<er.to);
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
  if(e.touches.length===2&&ltd){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);scale*=d/ltd;ltd=d;render();updZoom();}
  else if(ltx){offsetX+=e.touches[0].clientX-ltx;ltx=e.touches[0].clientX;render();}
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
