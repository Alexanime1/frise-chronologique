/* ═══════════════════════════════════════
   FRISE CHRONOLOGIQUE — script.js
   ═══════════════════════════════════════ */

/* ── Categories ── */
const CATS = {
  politique: { c:'#4f6ef7', bg:'rgba(79,110,247,.13)',  l:'Politique',     e:'🏛' },
  science:   { c:'#16c47a', bg:'rgba(22,196,122,.13)',  l:'Science & Tech', e:'🔬' },
  art:       { c:'#f0742a', bg:'rgba(240,116,42,.13)',  l:'Art & Culture',  e:'🎨' },
  guerre:    { c:'#f03060', bg:'rgba(240,48,96,.13)',   l:'Guerre',         e:'⚔️' },
  autre:     { c:'#a855f7', bg:'rgba(168,85,247,.13)',  l:'Autre',          e:'✦'  },
};

/* ── Eras ── */
const ERAS = [
  { key:'prehist', name:'Préhistoire',    from:-300000, to:-3200, color:'#e07820', desc:'Des origines à l\'écriture' },
  { key:'antiq',   name:'Antiquité',      from:-3200,   to:476,   color:'#d4a020', desc:'Des premières cités à Rome' },
  { key:'moyen',   name:'Moyen Âge',      from:476,     to:1492,  color:'#4f6ef7', desc:'De la chute de Rome aux Grandes Découvertes' },
  { key:'mod',     name:'Époque Moderne', from:1492,    to:1789,  color:'#16c47a', desc:'Découvertes, Renaissance, Lumières' },
  { key:'contemp', name:'XIXᵉ siècle',    from:1789,    to:1900,  color:'#f03060', desc:'Révolutions, industrialisation, nations' },
  { key:'xx',      name:'XXᵉ siècle',     from:1900,    to:2000,  color:'#a855f7', desc:'Guerres mondiales, progrès, décolonisation' },
  { key:'xxi',     name:'XXIᵉ siècle',    from:2000,    to:2030,  color:'#06b6d4', desc:'Numérique, mondialisation, défis actuels' },
];

/* ── Events (yearEnd = same as year means single point) ── */
const DEFAULTS = [
  /* PRÉHISTOIRE */
  { id:1,   year:-300000, yearEnd:-300000, title:"Maîtrise du feu",              desc:"L'Homo erectus apprend à contrôler et produire le feu, révolutionnant alimentation et protection contre les prédateurs.",           cat:'science',  img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Campfire_at_dawn.jpg/640px-Campfire_at_dawn.jpg' },
  { id:2,   year:-40000,  yearEnd:-10000,  title:"Art pariétal",                  desc:"Période des grandes peintures rupestres : Chauvet (~37 000 av. J.-C.), Lascaux (~17 000 av. J.-C.), Altamira. Représentations d'animaux, de mains et de scènes de chasse.",  cat:'art',       img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lascaux_painting.jpg/640px-Lascaux_painting.jpg' },
  { id:3,   year:-10000,  yearEnd:-4000,   title:"Révolution néolithique",         desc:"Naissance de l'agriculture, de l'élevage et de la sédentarisation. Les hommes passent d'une vie nomade de chasseurs-cueilleurs à des sociétés agricoles organisées.",         cat:'science',  img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Newgrange.jpg/640px-Newgrange.jpg' },
  { id:4,   year:-5000,   yearEnd:-1500,   title:"Mégalithes & dolmens",           desc:"Construction de Stonehenge, des alignements de Carnac et de nombreuses structures mégalithiques en Europe. Lieux de culte et d'observation astronomique.",                    cat:'autre',    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_30.jpg/640px-Stonehenge2007_07_30.jpg' },
  /* ANTIQUITÉ */
  { id:5,   year:-3200,   yearEnd:-3200,   title:"Invention de l'écriture",        desc:"Les Sumériens de Mésopotamie inventent l'écriture cunéiforme, principalement pour tenir des registres commerciaux. En Égypte, les hiéroglyphes apparaissent quasi simultanément.",  cat:'science',  img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Cuneiform_tablet-_administrative_account_of_barley_distribution_with_cylinder_seal_impression.jpg/640px-Cuneiform_tablet-_administrative_account_of_barley_distribution_with_cylinder_seal_impression.jpg' },
  { id:6,   year:-2700,   yearEnd:-2560,   title:"Pyramides de Gizeh",             desc:"Construction des pyramides de Khéops, Khéphren et Mykérinos en Égypte. La Grande Pyramide de Khéops est l'une des Sept Merveilles du monde antique.",                      cat:'art',       img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/640px-Kheops-Pyramid.jpg' },
  { id:7,   year:-776,    yearEnd:-776,    title:"Premiers Jeux Olympiques",       desc:"Jeux panhelléniques organisés à Olympie en Grèce en l'honneur de Zeus. Les athlètes viennent de toute la Grèce et une trêve sacrée est observée.",                            cat:'autre',    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Ancient_Olympic_Stadium%2C_Olympia%2C_Greece.jpg/640px-Ancient_Olympic_Stadium%2C_Olympia%2C_Greece.jpg' },
  { id:8,   year:-753,    yearEnd:-753,    title:"Fondation de Rome",              desc:"Selon la tradition, Romulus fonde la ville de Rome sur le Palatin. La cité deviendra la capitale d'un empire couvrant tout le bassin méditerranéen.",                           cat:'politique', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/640px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg' },
  { id:9,   year:-490,    yearEnd:-479,    title:"Guerres médiques",               desc:"Conflits entre la Grèce et l'Empire perse. La victoire de Marathon (490) et de Salamine (480) préservent l'indépendance grecque et permettent l'essor de la démocratie athénienne.", cat:'guerre',   img:'' },
  { id:10,  year:-469,    yearEnd:-399,    title:"Vie de Socrate",                 desc:"Le père de la philosophie occidentale développe la méthode dialectique (maïeutique). Condamné à mort par Athènes, il choisit de boire la ciguë plutôt que de renier ses idées.", cat:'art',       img:'' },
  { id:11,  year:-356,    yearEnd:-323,    title:"Alexandre le Grand",             desc:"Conquête d'un empire s'étendant de la Grèce jusqu'à l'Inde. Alexandre diffuse la culture hellénique (hellénisme) dans tout le Proche-Orient et l'Asie centrale.",            cat:'guerre',   img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/AlexanderTheGreat_Bust.jpg/480px-AlexanderTheGreat_Bust.jpg' },
  { id:12,  year:-264,    yearEnd:-146,    title:"Guerres Puniques",               desc:"Trois guerres entre Rome et Carthage pour la domination de la Méditerranée. Hannibal franchit les Alpes avec ses éléphants. Carthage est finalement rasée.",                    cat:'guerre',   img:'' },
  { id:13,  year:-44,     yearEnd:-44,     title:"Assassinat de Jules César",      desc:"Jules César, dictateur de Rome, est poignardé au Sénat lors des Ides de Mars par Brutus, Cassius et d'autres sénateurs. Sa mort plonge Rome dans une guerre civile.",         cat:'politique', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Vincenzo_Camuccini_-_La_morte_di_Cesare.jpg/640px-Vincenzo_Camuccini_-_La_morte_di_Cesare.jpg' },
  { id:14,  year:-27,     yearEnd:14,      title:"Auguste, premier Empereur",      desc:"Octave Auguste instaure le Principat et devient le premier Empereur romain. Son règne de 41 ans marque le début du Haut-Empire et d'une longue période de paix (Pax Romana).", cat:'politique', img:'' },
  { id:15,  year:0,       yearEnd:0,       title:"Naissance de Jésus-Christ",      desc:"Naissance de Jésus de Nazareth en Judée. Il sera à l'origine du christianisme, qui deviendra la religion dominante de l'Empire romain puis de l'Europe.",                     cat:'autre',    img:'' },
  { id:16,  year:79,      yearEnd:79,      title:"Éruption du Vésuve",             desc:"L'éruption du Vésuve ensevelit les villes de Pompéi et Herculanum sous des cendres et des coulées pyroclastiques, préservant une image figée de la vie romaine au Ier siècle.", cat:'autre',    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/View_of_Pompeii_and_Mount_Vesuvius.jpg/640px-View_of_Pompeii_and_Mount_Vesuvius.jpg' },
  { id:17,  year:313,     yearEnd:313,     title:"Édit de Milan",                  desc:"L'Édit de Milan, signé par Constantin et Licinius, accorde la liberté de culte dans l'Empire romain et marque la fin des persécutions des chrétiens.",                         cat:'politique', img:'' },
  { id:18,  year:476,     yearEnd:476,     title:"Chute de l'Empire romain d'Occident", desc:"Romulus Augustule est déposé par Odoacre. Fin de l'Antiquité et début du Moyen Âge en Occident. L'Empire romain d'Orient (Byzance) survit jusqu'en 1453.",              cat:'guerre',   img:'' },
  /* MOYEN ÂGE */
  { id:19,  year:622,     yearEnd:622,     title:"Hégire de Mahomet",              desc:"Mahomet fuit La Mecque pour Médine avec ses fidèles (hégire). Cet événement marque le début du calendrier islamique et la structuration de la communauté musulmane.",           cat:'autre',    img:'' },
  { id:20,  year:732,     yearEnd:732,     title:"Bataille de Poitiers",           desc:"Charles Martel stoppe l'avancée des armées arabo-berbères à Poitiers. Cette victoire est souvent présentée comme ayant sauvé l'Europe de l'islamisation.",                    cat:'guerre',   img:'' },
  { id:21,  year:800,     yearEnd:800,     title:"Couronnement de Charlemagne",    desc:"Le pape Léon III couronne Charlemagne « Empereur des Romains » à Rome. Son empire unifie une grande partie de l'Europe de l'Ouest et favorise la renaissance carolingienne.",  cat:'politique', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Charlemagne_denier_Mayence_812_814.jpg/480px-Charlemagne_denier_Mayence_812_814.jpg' },
  { id:22,  year:1066,    yearEnd:1066,    title:"Conquête normande de l'Angleterre", desc:"Guillaume le Conquérant bat le roi Harold II à la bataille de Hastings. Il transforme profondément la société anglaise, y introduit la langue franco-normande.",          cat:'guerre',   img:'' },
  { id:23,  year:1095,    yearEnd:1099,    title:"Première Croisade",              desc:"Le pape Urbain II lance l'appel à la croisade au concile de Clermont. Les croisés prennent Jérusalem en 1099 et fondent les États latins d'Orient.",                          cat:'guerre',   img:'' },
  { id:24,  year:1215,    yearEnd:1215,    title:"Magna Carta",                    desc:"Les barons anglais contraignent le roi Jean sans Terre à signer la Grande Charte, limitant le pouvoir royal et posant les bases de l'État de droit en Angleterre.",              cat:'politique', img:'' },
  { id:25,  year:1347,    yearEnd:1353,    title:"La Peste Noire",                 desc:"La grande épidémie de peste bubonique venue d'Asie ravage l'Europe. On estime qu'elle tue entre un tiers et la moitié de la population européenne en quelques années.",         cat:'autre',    img:'' },
  { id:26,  year:1431,    yearEnd:1431,    title:"Jeanne d'Arc brûlée vive",       desc:"Jeanne d'Arc, qui avait mené les armées françaises à la victoire d'Orléans (1429), est brûlée vive à Rouen après un procès politique à charge organisé par les Anglais.",     cat:'guerre',   img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Joan_of_arc_miniature_graded.jpg/480px-Joan_of_arc_miniature_graded.jpg' },
  { id:27,  year:1453,    yearEnd:1453,    title:"Chute de Constantinople",        desc:"Le sultan ottoman Mehmed II prend Constantinople après un long siège. C'est la fin de l'Empire romain d'Orient (Byzance) et le début d'une ère ottomane.",                     cat:'guerre',   img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Jean-Joseph_Benjamin-Constant_-_The_Entry_of_Mahomet_II_into_Constantinople.jpg/640px-Jean-Joseph_Benjamin-Constant_-_The_Entry_of_Mahomet_II_into_Constantinople.jpg' },
  /* ÉPOQUE MODERNE */
  { id:28,  year:1440,    yearEnd:1450,    title:"Gutenberg & l'imprimerie",       desc:"Johannes Gutenberg invente la presse à caractères mobiles. La Bible de Gutenberg est le premier livre imprimé en Europe. Cette invention révolutionne la diffusion du savoir.",  cat:'science',  img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/480px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg' },
  { id:29,  year:1492,    yearEnd:1492,    title:"Christophe Colomb en Amérique",  desc:"Christophe Colomb, mandaté par les Rois Catholiques d'Espagne, atteint les Bahamas le 12 octobre. Il ouvre la voie à la colonisation européenne des Amériques.",              cat:'politique', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sebastiano_del_Piombo_004.jpg/480px-Sebastiano_del_Piombo_004.jpg' },
  { id:30,  year:1503,    yearEnd:1506,    title:"La Joconde de Léonard de Vinci", desc:"Léonard de Vinci peint le portrait de Lisa Gherardini, épouse de Francesco del Giocondo. La Mona Lisa est aujourd'hui le tableau le plus célèbre du monde, au Louvre.",       cat:'art',       img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/402px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg' },
  { id:31,  year:1508,    yearEnd:1512,    title:"Plafond de la Chapelle Sixtine", desc:"Michel-Ange peint le plafond de la Chapelle Sixtine au Vatican sur commande du pape Jules II. La Création d'Adam en est le panneau le plus célèbre.",                         cat:'art',       img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/640px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg' },
  { id:32,  year:1517,    yearEnd:1517,    title:"Réforme protestante",            desc:"Martin Luther affiche ses 95 thèses à Wittenberg, dénonçant les abus de l'Église catholique. Il déclenche une révolution religieuse qui divise durablement la chrétienté occidentale.", cat:'politique', img:'' },
  { id:33,  year:1543,    yearEnd:1543,    title:"Copernic — système héliocentrique", desc:"Nicolas Copernic publie De revolutionibus orbium coelestium, affirmant que la Terre tourne autour du Soleil. Il ébranle la cosmologie géocentrique d'Aristote et de l'Église.", cat:'science',  img:'' },
  { id:34,  year:1572,    yearEnd:1572,    title:"Nuit de la Saint-Barthélemy",    desc:"Dans la nuit du 23 au 24 août, des milliers de protestants (huguenots) sont massacrés à Paris et en province sur ordre de Charles IX, à l'instigation de Catherine de Médicis.", cat:'guerre',   img:'' },
  { id:35,  year:1610,    yearEnd:1610,    title:"Galilée et le télescope",        desc:"Galilée utilise un télescope perfectionné pour observer les lunes de Jupiter, les phases de Vénus et les montagnes de la Lune, confirmant le modèle copernicien.",               cat:'science',  img:'' },
  { id:36,  year:1687,    yearEnd:1687,    title:"Principia de Newton",            desc:"Isaac Newton publie ses Philosophiae Naturalis Principia Mathematica, exposant les lois de la mécanique et de la gravitation universelle. L'une des œuvres scientifiques les plus influentes.", cat:'science',  img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Portrait_of_Sir_Isaac_Newton%2C_1689.jpg/480px-Portrait_of_Sir_Isaac_Newton%2C_1689.jpg' },
  { id:37,  year:1759,    yearEnd:1759,    title:"Candide de Voltaire",            desc:"Voltaire publie Candide ou l'Optimisme, conte philosophique satirique dénonçant le fanatisme religieux, la guerre et l'intolérance. Chef-d'œuvre des Lumières françaises.",       cat:'art',       img:'' },
  { id:38,  year:1776,    yearEnd:1776,    title:"Indépendance américaine",        desc:"Les treize colonies britanniques d'Amérique du Nord déclarent leur indépendance. Thomas Jefferson rédige la Déclaration, affirmant que tous les hommes sont créés égaux.",      cat:'politique', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/United_States_Declaration_of_Independence.jpg/617px-United_States_Declaration_of_Independence.jpg' },
  /* XIXe SIÈCLE */
  { id:39,  year:1789,    yearEnd:1799,    title:"Révolution française",           desc:"De la prise de la Bastille (14 juillet 1789) à la Déclaration des droits de l'homme, puis la Terreur et le Directoire. La monarchie abolie, la République proclamée.",            cat:'politique', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg/600px-Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg' },
  { id:40,  year:1804,    yearEnd:1815,    title:"Napoléon Ier, Empereur",         desc:"Bonaparte se couronne Empereur des Français. Ses campagnes militaires reconfigurent l'Europe. Il diffuse le Code civil napoléonien et réorganise les institutions françaises.",   cat:'politique', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/480px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg' },
  { id:41,  year:1804,    yearEnd:1804,    title:"3ᵉ Symphonie de Beethoven",     desc:"L'Héroïque de Beethoven, initialement dédiée à Napoléon, marque le basculement vers le romantisme musical. Son ampleur et sa complexité ouvrent une nouvelle ère en musique.",  cat:'art',       img:'' },
  { id:42,  year:1815,    yearEnd:1815,    title:"Bataille de Waterloo",           desc:"Napoléon est définitivement vaincu par la coalition européenne (Wellington, Blücher) à Waterloo en Belgique. Il est exilé à Sainte-Hélène où il mourra en 1821.",                 cat:'guerre',   img:'' },
  { id:43,  year:1829,    yearEnd:1850,    title:"Essor du chemin de fer",         desc:"La locomotive Rocket de Stephenson inaugure le premier service de passagers Liverpool-Manchester (1830). L'Europe est bientôt couverte de voies ferrées, transformant l'économie.", cat:'science',  img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Stephenson_Rocket.png/640px-Stephenson_Rocket.png' },
  { id:44,  year:1848,    yearEnd:1849,    title:"Printemps des Peuples",          desc:"Vague de révolutions libérales et nationales qui balaient l'Europe : France, Autriche, Prusse, Italie, Hongrie. Ces révolutions réclament des constitutions et des droits civiques.", cat:'politique', img:'' },
  { id:45,  year:1859,    yearEnd:1859,    title:"Darwin — L'Origine des espèces", desc:"Charles Darwin publie sa théorie de l'évolution par sélection naturelle. Elle révolutionne la biologie et remet en question la vision créationniste de l'humanité.",             cat:'science',  img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Charles_Darwin_by_Julia_Margaret_Cameron_3.jpg/480px-Charles_Darwin_by_Julia_Margaret_Cameron_3.jpg' },
  { id:46,  year:1861,    yearEnd:1865,    title:"Guerre de Sécession américaine", desc:"Conflit entre les États du Nord (Union) et du Sud (Confédération) sur l'esclavage. La victoire du Nord permet l'abolition de l'esclavage par le 13ᵉ amendement.",             cat:'guerre',   img:'' },
  { id:47,  year:1871,    yearEnd:1871,    title:"Commune de Paris",               desc:"Après la défaite face à la Prusse, Paris se soulève. La Commune révolutionnaire gouverne 72 jours avant d'être écrasée dans le sang lors de la « Semaine sanglante ».",           cat:'politique', img:'' },
  { id:48,  year:1879,    yearEnd:1879,    title:"Edison invente l'ampoule",       desc:"Thomas Edison met au point la première ampoule à incandescence pratique et durable. Il crée aussi le premier réseau électrique public à New York en 1882.",                        cat:'science',  img:'' },
  { id:49,  year:1885,    yearEnd:1885,    title:"Première automobile",            desc:"Karl Benz construit la Motorwagen, considérée comme le premier véritable automobile à moteur à essence. Elle atteint 16 km/h et transforme la mobilité humaine.",                 cat:'science',  img:'' },
  { id:50,  year:1889,    yearEnd:1889,    title:"Tour Eiffel inaugurée",          desc:"Gustave Eiffel construit sa tour de fer pour l'Exposition universelle de Paris. D'abord décriée par les artistes, elle devient le symbole de Paris et de la France.",             cat:'art',       img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camille_Pissarro%2C_1900_-_Le_Louvre_et_la_Seine_vus_du_Pont-Neuf.jpg/640px-Camille_Pissarro%2C_1900_-_Le_Louvre_et_la_Seine_vus_du_Pont-Neuf.jpg' },
  { id:51,  year:1895,    yearEnd:1895,    title:"Cinéma des frères Lumière",      desc:"Auguste et Louis Lumière organisent la première projection publique payante du cinématographe le 28 décembre au Grand Café de Paris. L'Arrivée d'un train en gare de La Ciotat figure au programme.", cat:'art',    img:'' },
  /* XXe SIÈCLE */
  { id:52,  year:1903,    yearEnd:1903,    title:"Premier vol motorisé",           desc:"Orville et Wilbur Wright réalisent le premier vol en avion à Kitty Hawk (Caroline du Nord) : 12 secondes, 37 mètres. Ils ouvrent l'ère de l'aviation qui transforme le monde.",  cat:'science',  img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Flyjumper.jpg/640px-Flyjumper.jpg' },
  { id:53,  year:1905,    yearEnd:1905,    title:"Théorie de la relativité",       desc:"Albert Einstein publie ses quatre articles fondamentaux, dont la relativité restreinte et E=mc². À 26 ans, il révolutionne notre compréhension de l'espace, du temps et de l'énergie.",  cat:'science',  img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/480px-Albert_Einstein_Head.jpg' },
  { id:54,  year:1914,    yearEnd:1918,    title:"Première Guerre mondiale",       desc:"Déclenchée par l'assassinat de François-Ferdinand à Sarajevo. Guerre des tranchées, gaz de combat, 18 à 20 millions de morts. L'armistice est signé le 11 novembre 1918.",        cat:'guerre',   img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Australian_troops_at_Gallipoli.jpg/640px-Australian_troops_at_Gallipoli.jpg' },
  { id:55,  year:1917,    yearEnd:1917,    title:"Révolution russe",               desc:"En février, le Tsar Nicolas II abdique. En octobre, les bolchéviques de Lénine prennent le pouvoir. Naît l'URSS, premier État communiste de l'Histoire.",                         cat:'politique', img:'' },
  { id:56,  year:1929,    yearEnd:1932,    title:"Grande Dépression",              desc:"Le krach boursier du jeudi noir (24 octobre 1929) à Wall Street déclenche la pire crise économique mondiale du XXᵉ siècle. Le chômage explose dans les pays industrialisés.",      cat:'autre',    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Lange-MigrantMother02.jpg/480px-Lange-MigrantMother02.jpg' },
  { id:57,  year:1933,    yearEnd:1945,    title:"Régime nazi en Allemagne",       desc:"Adolf Hitler prend le pouvoir en Allemagne en 1933. Le régime national-socialiste instaure une dictature, une politique antisémite et déclenche la Seconde Guerre mondiale.",    cat:'guerre',   img:'' },
  { id:58,  year:1939,    yearEnd:1945,    title:"Seconde Guerre mondiale",        desc:"Conflit mondial le plus meurtrier de l'Histoire : 70 à 85 millions de morts, Shoah, bombes atomiques sur Hiroshima et Nagasaki, débarquements alliés, Résistance.",               cat:'guerre',   img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Einheit.jpg/640px-Einheit.jpg' },
  { id:59,  year:1944,    yearEnd:1944,    title:"Débarquement en Normandie",      desc:"Le 6 juin, Jour J, les Alliés débarquent sur les plages de Normandie. Plus de 150 000 soldats alliés participent à l'opération Overlord, ouvrant un second front décisif.",       cat:'guerre',   img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/640px-Into_the_Jaws_of_Death_23-0455M_edit.jpg' },
  { id:60,  year:1947,    yearEnd:1947,    title:"Indépendance de l'Inde",         desc:"L'Inde accède à l'indépendance le 15 août sous la conduite de Gandhi et Nehru, mettant fin à deux siècles de colonisation britannique. La partition crée aussi le Pakistan.",    cat:'politique', img:'' },
  { id:61,  year:1948,    yearEnd:1948,    title:"Déclaration universelle des droits de l'homme", desc:"L'ONU adopte la Déclaration universelle des droits de l'homme le 10 décembre. Ce texte fondateur proclame les droits inaliénables de tout être humain.",       cat:'politique', img:'' },
  { id:62,  year:1953,    yearEnd:1953,    title:"ADN — la double hélice",         desc:"James Watson et Francis Crick, s'appuyant sur les travaux de Rosalind Franklin, décrivent la structure en double hélice de l'ADN. Naissance de la biologie moléculaire moderne.", cat:'science',  img:'' },
  { id:63,  year:1957,    yearEnd:1957,    title:"Spoutnik dans l'espace",         desc:"L'URSS lance le premier satellite artificiel de l'histoire le 4 octobre. Le bip-bip de Spoutnik marque le début de la conquête spatiale et de la course à l'espace.",            cat:'science',  img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sputnik_asm.jpg/640px-Sputnik_asm.jpg' },
  { id:64,  year:1963,    yearEnd:1963,    title:"Assassinat de JFK",              desc:"Le président John F. Kennedy est assassiné à Dallas le 22 novembre. Lee Harvey Oswald est arrêté puis tué par Jack Ruby. L'affaire reste entourée de mystère.",                  cat:'politique', img:'' },
  { id:65,  year:1969,    yearEnd:1969,    title:"Premiers pas sur la Lune",       desc:"Apollo 11 : Neil Armstrong est le premier homme à marcher sur la Lune le 21 juillet. Buzz Aldrin le suit. Michael Collins les attend en orbite. 600 millions de téléspectateurs.",  cat:'science',  img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/480px-Aldrin_Apollo_11_original.jpg' },
  { id:66,  year:1979,    yearEnd:1979,    title:"Révolution iranienne",           desc:"L'Ayatollah Khomeini renverse le Shah d'Iran et instaure la République islamique. Cet événement redessine la géopolitique du Moyen-Orient pour des décennies.",                  cat:'politique', img:'' },
  { id:67,  year:1989,    yearEnd:1989,    title:"Chute du mur de Berlin",         desc:"Le 9 novembre, le mur de Berlin s'ouvre. Symbole de la Guerre froide depuis 1961, sa chute annonce la réunification allemande et la fin de l'URSS.",                             cat:'politique', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/De_muur_van_Berlijn.jpg/640px-De_muur_van_Berlijn.jpg' },
  { id:68,  year:1991,    yearEnd:1991,    title:"Dissolution de l'URSS",          desc:"Gorbatchev démissionne le 25 décembre. L'Union soviétique se dissout en 15 États indépendants. Fin officielle de la Guerre froide et de l'ordre bipolaire mondial.",              cat:'politique', img:'' },
  /* XXIe SIÈCLE */
  { id:69,  year:2001,    yearEnd:2001,    title:"Attentats du 11 septembre",      desc:"Al-Qaïda détourne quatre avions. Les tours du World Trade Center s'effondrent. 2977 morts. Les attentats déclenchent la « guerre contre le terrorisme » et transforment la géopolitique mondiale.", cat:'guerre', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/September_11_photo_montage.jpg/480px-September_11_photo_montage.jpg' },
  { id:70,  year:2004,    yearEnd:2004,    title:"Naissance de Facebook",          desc:"Mark Zuckerberg lance TheFacebook depuis sa chambre à Harvard. En 20 ans, le réseau social atteint plus de 3 milliards d'utilisateurs et bouleverse les interactions sociales.", cat:'science',  img:'' },
  { id:71,  year:2007,    yearEnd:2007,    title:"Premier iPhone",                 desc:"Steve Jobs présente l'iPhone le 9 janvier. Il combine téléphone, iPod et internet en un seul appareil. Cette révolution redéfinit le marché mobile et nos usages numériques.",   cat:'science',  img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/IPhone_1st_Gen.svg/480px-IPhone_1st_Gen.svg.png' },
  { id:72,  year:2008,    yearEnd:2009,    title:"Crise financière mondiale",       desc:"La faillite de Lehman Brothers en septembre 2008 déclenche la pire crise économique mondiale depuis 1929. Des plans de sauvetage massifs sont adoptés dans le monde entier.",    cat:'autre',    img:'' },
  { id:73,  year:2010,    yearEnd:2012,    title:"Printemps arabe",                desc:"Vague de soulèvements populaires qui renversent des régimes autoritaires en Tunisie, Égypte, Libye. D'autres conflits éclatent en Syrie et au Yémen, aux conséquences durables.", cat:'politique', img:'' },
  { id:74,  year:2015,    yearEnd:2015,    title:"Accord de Paris sur le climat",  desc:"195 pays s'engagent à limiter le réchauffement climatique à moins de 2°C lors de la COP21. Premier accord universel et juridiquement contraignant sur le changement climatique.", cat:'autre',    img:'' },
  { id:75,  year:2019,    yearEnd:2022,    title:"Pandémie de Covid-19",           desc:"Le SARS-CoV-2, apparu à Wuhan fin 2019, provoque une pandémie mondiale. Confinements, vaccins à grande vitesse, 7 millions de morts officiels, économies déstabilisées.",        cat:'autre',    img:'' },
  { id:76,  year:2022,    yearEnd:2022,    title:"Invasion russe de l'Ukraine",    desc:"La Russie envahit l'Ukraine le 24 février. Plus grand conflit armé en Europe depuis 1945. Des millions de réfugiés, destructions massives, crise énergétique et alimentaire mondiale.", cat:'guerre', img:'' },
  { id:77,  year:2023,    yearEnd:2023,    title:"Essor de l'IA générative",       desc:"ChatGPT, Midjourney, Claude, Gemini… L'IA générative devient grand public en 2023. Elle transforme création, travail et éducation à une vitesse sans précédent dans l'histoire technologique.", cat:'science', img:'' },
];

const SK = 'frise_v5';
function loadEv() { try { const s = localStorage.getItem(SK); return s ? JSON.parse(s) : DEFAULTS; } catch { return DEFAULTS; } }
function saveToStorage() { try { localStorage.setItem(SK, JSON.stringify(events)); } catch(e) {} }

let events = loadEv();
let nextId = Math.max(...events.map(e => e.id), 0) + 1;
let scale = 1, offsetX = 0, svgW = 900;
const H = 340, AY = 175;
let editId = null, activeId = null, highlightId = null;
let currentEra = null;
let dragging = false, dsx = 0, dsox = 0;
let hiddenCats = new Set();
let pendingImg = '';
let imgMode = 'upload'; // 'upload' or 'url'

const svgEl = document.getElementById('tl-svg');
const wrap   = document.getElementById('tl-wrap');
const tipEl  = document.getElementById('tip');
const cpop   = document.getElementById('cpop');

/* ── Date display helper ── */
function fmtYear(y) { return y < 0 ? Math.abs(y) + ' av. J.-C.' : String(y); }
function fmtRange(y, ye) {
  if (!ye || ye === y) return fmtYear(y);
  return fmtYear(y) + ' – ' + fmtYear(ye);
}
function eventMidYear(ev) { return ev.yearEnd && ev.yearEnd !== ev.year ? (ev.year + ev.yearEnd) / 2 : ev.year; }

/* ── Era strip ── */
function buildEraStrip() {
  const strip = document.getElementById('era-strip');
  strip.innerHTML = ERAS.map(era => {
    const count = events.filter(e => eventMidYear(e) >= era.from && eventMidYear(e) < era.to && !hiddenCats.has(e.cat)).length;
    const active = currentEra && currentEra.key === era.key;
    const fromStr = era.from < 0 ? Math.abs(era.from) + ' av. J.-C.' : era.from;
    const toStr = era.to < 0 ? Math.abs(era.to) + ' av. J.-C.' : era.to;
    return `<div class="era-card${active ? ' active' : ''}" style="--era-color:${era.color}" onclick="selectEra('${era.key}')">
      <div class="ec-dot" style="background:${era.color}"></div>
      <div class="ec-name">${era.name}</div>
      <div class="ec-range">${fromStr} → ${toStr}</div>
      <div class="ec-count">${count} événement${count > 1 ? 's' : ''}</div>
      <span class="ec-arrow">→</span>
    </div>`;
  }).join('');
}

function selectEra(key) {
  currentEra = ERAS.find(e => e.key === key);
  buildEraStrip();
  document.getElementById('era-hint').style.display = 'none';
  const outer = document.getElementById('tl-outer');
  outer.classList.add('show');
  document.getElementById('tl-dot').style.background = currentEra.color;
  document.getElementById('tl-era-name').textContent =
    currentEra.name + ' (' +
    (currentEra.from < 0 ? Math.abs(currentEra.from) + ' av. J.-C.' : currentEra.from) + ' – ' +
    (currentEra.to < 0 ? Math.abs(currentEra.to) + ' av. J.-C.' : currentEra.to) + ')';
  setTimeout(resetView, 60);
  outer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeEra() {
  currentEra = null;
  buildEraStrip();
  document.getElementById('tl-outer').classList.remove('show');
  document.getElementById('era-hint').style.display = 'block';
}

/* ── Era events ── */
function eraEvents() {
  if (!currentEra) return [];
  return events.filter(e => eventMidYear(e) >= currentEra.from && eventMidYear(e) < currentEra.to && !hiddenCats.has(e.cat));
}

/* ── Scale / range ── */
function getRange() {
  const ev = eraEvents();
  if (!currentEra) return { minY: 0, maxY: 2024 };
  const pad = (currentEra.to - currentEra.from) * 0.05;
  const allYears = ev.flatMap(e => [e.year, e.yearEnd || e.year]);
  return {
    minY: Math.min(currentEra.from, ...(allYears.length ? allYears : [currentEra.from])) - pad,
    maxY: Math.max(currentEra.to,   ...(allYears.length ? allYears : [currentEra.to]))   + pad,
  };
}
function yearToX(y) { const { minY } = getRange(); return 80 + (y - minY) * scale + offsetX; }
function defScale() { const { minY, maxY } = getRange(); return Math.max(.001, (svgW - 160) / (maxY - minY || 1)); }
function resetView() { scale = defScale(); offsetX = 0; render(); updZoom(); }
function zoom(d) { scale *= d > 0 ? 1.5 : 1 / 1.5; render(); updZoom(); }
function updZoom() {
  const p = Math.round(scale / defScale() * 100) + '%';
  document.getElementById('zlbl').textContent = p;
  document.getElementById('zlbl2').textContent = p;
}
function tickIv() {
  const yv = svgW / scale;
  for (const iv of [1,2,5,10,25,50,100,200,500,1000,2000,5000,10000,50000,100000])
    if (svgW / (yv / iv) > 75) return iv;
  return 100000;
}

/* ── Render ── */
function render() {
  svgW = wrap.clientWidth || 900;
  svgEl.setAttribute('width', svgW);
  svgEl.setAttribute('height', H);
  if (!currentEra) { svgEl.innerHTML = ''; return; }

  const { minY } = getRange();
  const iv = tickIv();
  const st = Math.ceil((minY - iv * 2) / iv) * iv;
  const en = st + Math.ceil(svgW / scale / iv + 4) * iv;
  let h = '';

  /* Background gradient */
  h += `<defs><linearGradient id="bg-g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${currentEra.color}" stop-opacity=".07"/>
    <stop offset="100%" stop-color="${currentEra.color}" stop-opacity=".01"/>
  </linearGradient></defs>`;
  h += `<rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bg-g)"/>`;

  /* Vertical grid */
  for (let y = st; y <= en; y += iv) {
    const x = yearToX(y); if (x < -5 || x > svgW + 5) continue;
    h += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="var(--paper3)" stroke-width=".5" opacity=".8"/>`;
  }

  /* Axis */
  h += `<line x1="0" y1="${AY}" x2="${svgW}" y2="${AY}" stroke="${currentEra.color}" stroke-width="2" opacity=".35"/>`;

  /* Ticks + year labels */
  for (let y = st; y <= en; y += iv) {
    const x = yearToX(y); if (x < -5 || x > svgW + 5) continue;
    h += `<circle cx="${x}" cy="${AY}" r="3" fill="${currentEra.color}" opacity=".45"/>`;
    const lbl = y < 0 ? Math.abs(y) + ' av.' : y === 0 ? '0' : y;
    h += `<text x="${x}" y="${AY + 24}" text-anchor="middle" font-size="10" fill="var(--ink3)" font-family="'DM Sans',sans-serif">${lbl}</text>`;
  }

  /* Place events — collision avoidance */
  const visible = eraEvents().sort((a, b) => a.year - b.year);
  const placed = [];
  const rowLastX = {};
  visible.forEach((ev, i) => {
    const mx = yearToX(eventMidYear(ev));
    const candidates = [];
    for (let r = 1; r <= 6; r++) { candidates.push(-r, r); }
    let row = i % 2 === 0 ? -1 : 1;
    for (const r of candidates) {
      const last = rowLastX[r] || -9999;
      if (mx - last > 105) { row = r; break; }
    }
    rowLastX[row] = mx;
    placed.push({ ...ev, row, mx });
  });

  /* Draw spans first (period bars under everything) */
  placed.forEach(ev => {
    const isPeriod = ev.yearEnd && ev.yearEnd !== ev.year;
    if (!isPeriod) return;
    const x1 = Math.max(0, yearToX(ev.year));
    const x2 = Math.min(svgW, yearToX(ev.yearEnd));
    if (x2 < 0 || x1 > svgW) return;
    const cat = CATS[ev.cat] || CATS.autre;
    const c = cat.c;
    const above = ev.row < 0;
    const depth = Math.abs(ev.row);
    const stemLen = 48 + depth * 36;
    const barY = above ? AY - stemLen - 10 : AY + stemLen + 4;
    /* semi-transparent bar spanning the period */
    h += `<rect x="${x1}" y="${barY}" width="${Math.max(1, x2 - x1)}" height="7" rx="3.5" fill="${c}" opacity=".2"/>`;
    /* endpoint dots */
    if (x1 >= 0) h += `<line x1="${x1}" y1="${AY}" x2="${x1}" y2="${barY + 3}" stroke="${c}" stroke-width=".8" opacity=".3"/>`;
    if (x2 <= svgW) h += `<line x1="${x2}" y1="${AY}" x2="${x2}" y2="${barY + 3}" stroke="${c}" stroke-width=".8" opacity=".3"/>`;
  });

  /* Stems + dots */
  placed.forEach(ev => {
    const mx = ev.mx; if (mx < -80 || mx > svgW + 80) return;
    const cat = CATS[ev.cat] || CATS.autre;
    const c = cat.c;
    const above = ev.row < 0;
    const depth = Math.abs(ev.row);
    const stemLen = 48 + depth * 36;
    const labelY = above ? AY - stemLen : AY + stemLen;
    const bh = ev.img ? 62 : 42;
    const by = above ? labelY - bh : labelY;

    h += `<circle cx="${mx}" cy="${AY}" r="6.5" fill="${c}" opacity=".18" data-id="${ev.id}"/>`;
    h += `<circle cx="${mx}" cy="${AY}" r="${activeId === ev.id ? 5.5 : 4}" fill="${c}" stroke="var(--paper2)" stroke-width="1.5" style="cursor:pointer" data-id="${ev.id}"/>`;
    h += `<line x1="${mx}" y1="${AY + (above ? -5 : 5)}" x2="${mx}" y2="${above ? by + bh : by}" stroke="${c}" stroke-width="1" stroke-dasharray="2 3" opacity=".4"/>`;
  });

  /* Cards */
  placed.forEach(ev => {
    const mx = ev.mx; if (mx < -80 || mx > svgW + 80) return;
    const cat = CATS[ev.cat] || CATS.autre;
    const c = cat.c;
    const above = ev.row < 0;
    const depth = Math.abs(ev.row);
    const stemLen = 48 + depth * 36;
    const labelY = above ? AY - stemLen : AY + stemLen;
    const label = ev.title.length > 25 ? ev.title.slice(0, 24) + '…' : ev.title;
    const bw = Math.min(label.length * 7.2 + 32, 195);
    const bh = ev.img ? 62 : 42;
    const bx = Math.max(4, Math.min(mx - bw / 2, svgW - bw - 4));
    const by = above ? labelY - bh : labelY;
    const isActive = ev.id === activeId;
    const isHL = ev.id === highlightId;
    const isPeriod = ev.yearEnd && ev.yearEnd !== ev.year;

    if (isActive || isHL)
      h += `<rect x="${bx - 5}" y="${by - 5}" width="${bw + 10}" height="${bh + 10}" rx="13" fill="${c}" opacity="${isHL ? .22 : .14}"/>`;

    h += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="var(--paper)" stroke="${c}" stroke-width="${isActive ? 1.75 : .8}" style="cursor:pointer" data-id="${ev.id}"/>`;
    /* colored top bar */
    h += `<rect x="${bx}" y="${by}" width="${bw}" height="5" rx="5" fill="${c}" opacity=".8" style="pointer-events:none"/>`;
    h += `<rect x="${bx}" y="${by + 3}" width="${bw}" height="3" fill="${c}" opacity=".8" style="pointer-events:none"/>`;
    /* period indicator dot */
    if (isPeriod)
      h += `<rect x="${bx + bw - 14}" y="${by + 9}" width="8" height="8" rx="2" fill="${c}" opacity=".35" style="pointer-events:none"/>`;

    if (ev.img) {
      h += `<image href="${ev.img}" x="${bx + 5}" y="${by + 9}" width="46" height="${bh - 14}" preserveAspectRatio="xMidYMid slice" data-id="${ev.id}" style="cursor:pointer" clip-path="inset(0 0 0 0 round 6px)"/>`;
      h += `<text x="${bx + 58}" y="${by + 23}" font-size="11.5" font-weight="500" fill="${c}" font-family="'Playfair Display',serif" style="cursor:pointer" data-id="${ev.id}">${label}</text>`;
      h += `<text x="${bx + 58}" y="${by + 38}" font-size="9.5" fill="${c}" opacity=".65" font-family="'DM Sans',sans-serif" data-id="${ev.id}" style="cursor:pointer">${fmtRange(ev.year, ev.yearEnd)}</text>`;
    } else {
      h += `<text x="${bx + 10}" y="${by + 22}" font-size="11.5" font-weight="500" fill="${c}" font-family="'Playfair Display',serif" style="cursor:pointer" data-id="${ev.id}">${label}</text>`;
      h += `<text x="${bx + 10}" y="${by + 35}" font-size="9.5" fill="${c}" opacity=".65" font-family="'DM Sans',sans-serif" data-id="${ev.id}" style="cursor:pointer">${fmtRange(ev.year, ev.yearEnd)}</text>`;
    }
  });

  svgEl.innerHTML = h;
  svgEl.querySelectorAll('[data-id]').forEach(el => {
    const id = parseInt(el.dataset.id);
    el.addEventListener('click', e => { e.stopPropagation(); openCard(id, e); });
    el.addEventListener('mousemove', e => showTip(e, id));
    el.addEventListener('mouseleave', () => { tipEl.style.display = 'none'; });
  });
  renderLegend();
  buildEraStrip();
}

/* ── Tooltip ── */
function showTip(e, id) {
  const ev = events.find(x => x.id === id); if (!ev) return;
  const cat = CATS[ev.cat] || CATS.autre;
  tipEl.style.display = 'block';
  tipEl.style.left = (e.clientX + 18) + 'px';
  tipEl.style.top  = (e.clientY - 24) + 'px';
  tipEl.innerHTML = `<strong>${ev.title}</strong>
    <div class="ty" style="color:${cat.c}">${fmtRange(ev.year, ev.yearEnd)} · ${cat.e} ${cat.l}</div>
    ${ev.desc ? `<div class="td">${ev.desc.slice(0, 100)}${ev.desc.length > 100 ? '…' : ''}</div>` : ''}`;
}

/* ── Card popup ── */
function openCard(id, e) {
  const ev = events.find(x => x.id === id); if (!ev) return;
  const cat = CATS[ev.cat] || CATS.autre;
  const isPeriod = ev.yearEnd && ev.yearEnd !== ev.year;

  document.getElementById('cp-img-w').innerHTML = ev.img
    ? `<img class="cp-img" src="${ev.img}" alt="${ev.title}" onerror="this.parentNode.innerHTML=''"/>`
    : '';

  const st = document.getElementById('cp-stripe');
  st.style.height = ev.img ? '0' : '5px';
  st.style.background = ev.img ? 'none' : `linear-gradient(90deg,${cat.c},${cat.c}88)`;

  const ce = document.getElementById('cp-cat');
  ce.textContent = `${cat.e} ${cat.l}`; ce.style.background = cat.bg; ce.style.color = cat.c;
  document.getElementById('cp-dates').innerHTML = isPeriod
    ? `<strong style="color:${cat.c}">${fmtYear(ev.year)}</strong><br>→ ${fmtYear(ev.yearEnd)}`
    : fmtYear(ev.year);
  document.getElementById('cp-title').textContent = ev.title;

  /* Period bar */
  const pbw = document.getElementById('cp-period-bar-wrap');
  if (isPeriod && currentEra) {
    const span = ev.yearEnd - ev.year;
    const eraSpan = currentEra.to - currentEra.from;
    const pct = Math.min(100, Math.round(span / eraSpan * 100));
    pbw.style.display = 'block';
    document.getElementById('cp-period-label').textContent = `Durée : ${span} an${span > 1 ? 's' : ''} (${pct}% de l'époque)`;
    document.getElementById('cp-period-fill').style.width = pct + '%';
    document.getElementById('cp-period-fill').style.background = cat.c;
  } else {
    pbw.style.display = 'none';
  }

  document.getElementById('cp-desc').textContent = ev.desc || 'Aucune description.';
  const eb = document.getElementById('cp-edit');
  eb.onclick = () => { closeCard(); openEdit(id); };
  eb.style.background = `linear-gradient(135deg,${cat.c},${cat.c}cc)`; eb.style.color = '#fff';

  cpop.style.display = 'block';
  const vw = window.innerWidth, vh = window.innerHeight, pw = 350, ph = 450;
  cpop.style.left = Math.min(e.clientX + 16, vw - pw - 10) + 'px';
  cpop.style.top  = Math.min(e.clientY - 60, vh - ph - 10) + 'px';
  activeId = id; render();
}
function closeCard() { cpop.style.display = 'none'; activeId = null; render(); }
document.addEventListener('click', e => {
  if (!cpop.contains(e.target) && !e.target.dataset.id) closeCard();
});

/* ── Legend ── */
function renderLegend() {
  document.getElementById('legend').innerHTML = Object.entries(CATS).map(([k, v]) => {
    const on = !hiddenCats.has(k);
    return `<div class="leg-item" style="background:${on ? v.bg : 'var(--paper2)'};color:${on ? v.c : 'var(--ink3)'};border-color:${on ? v.c : 'var(--paper4)'};opacity:${on ? 1 : .5}" onclick="toggleCat('${k}')">${v.e} ${v.l}</div>`;
  }).join('');
}
function toggleCat(k) { hiddenCats.has(k) ? hiddenCats.delete(k) : hiddenCats.add(k); render(); buildEraStrip(); }

/* ── Search ── */
function hl(str, q) {
  if (!q) return str;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return String(str).replace(re, '<mark>$1</mark>');
}
function onSearch(q) {
  document.getElementById('scl').classList.toggle('on', q.length > 0);
  const res = document.getElementById('sres');
  if (!q.trim()) { res.classList.remove('open'); highlightId = null; render(); return; }
  const ql = q.toLowerCase(), yn = parseInt(q);
  const matched = events.filter(ev => {
    const yr = String(Math.abs(ev.year));
    return ev.title.toLowerCase().includes(ql) ||
           (ev.desc || '').toLowerCase().includes(ql) ||
           (CATS[ev.cat] ? CATS[ev.cat].l.toLowerCase().includes(ql) : false) ||
           yr.includes(q) ||
           (!isNaN(yn) && Math.abs(ev.year - yn) < 30);
  }).sort((a, b) => !isNaN(yn) ? Math.abs(a.year - yn) - Math.abs(b.year - yn) : a.year - b.year);

  if (!matched.length) {
    res.innerHTML = `<div class="sr-empty">Aucun résultat pour « ${q} »</div>`;
    res.classList.add('open'); return;
  }
  res.innerHTML = matched.slice(0, 10).map(ev => {
    const cat = CATS[ev.cat] || CATS.autre;
    const descMatch = (ev.desc || '').toLowerCase().includes(ql);
    let descSnippet = '';
    if (descMatch) {
      const idx = (ev.desc || '').toLowerCase().indexOf(ql);
      const start = Math.max(0, idx - 30);
      const snippet = (start > 0 ? '…' : '') + (ev.desc || '').slice(start, idx + ql.length + 50) + '…';
      descSnippet = `<div class="sri-desc">${hl(snippet, q)}</div>`;
    }
    return `<div class="sri" onclick="goToEv(${ev.id})">
      <div class="sri-dot" style="background:${cat.c}"></div>
      <div style="min-width:0">
        <div class="sri-title">${hl(ev.title, q)}</div>
        <div class="sri-meta">${fmtRange(ev.year, ev.yearEnd)} · ${cat.e} ${cat.l}</div>
        ${descSnippet}
      </div>
    </div>`;
  }).join('');
  res.classList.add('open');
}

function clearSearch() {
  document.getElementById('si').value = '';
  document.getElementById('sres').classList.remove('open');
  document.getElementById('scl').classList.remove('on');
  highlightId = null; render();
}

function goToEv(id) {
  const ev = events.find(e => e.id === id); if (!ev) return;
  document.getElementById('sres').classList.remove('open');
  const era = ERAS.find(er => eventMidYear(ev) >= er.from && eventMidYear(ev) < er.to);
  if (era && (!currentEra || currentEra.key !== era.key)) selectEra(era.key);
  highlightId = id;
  setTimeout(() => {
    const { minY } = getRange();
    scale = defScale() * 5;
    offsetX = (svgW / 2) - 80 - (eventMidYear(ev) - minY) * scale;
    render(); updZoom();
    setTimeout(() => { highlightId = null; render(); }, 2500);
  }, 180);
}

/* ── Image handling ── */
function switchImgTab(mode) {
  imgMode = mode;
  document.querySelectorAll('.img-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
  document.querySelectorAll('.img-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === mode));
}

function handleImg(input) {
  const file = input.files[0]; if (!file) return;
  if (file.size > 5 * 1024 * 1024) { alert('Image trop lourde (max ~5 Mo)'); return; }
  const r = new FileReader();
  r.onload = e => {
    pendingImg = e.target.result;
    document.getElementById('ipr').style.display = 'block';
    document.getElementById('iprel').src = pendingImg;
    document.getElementById('imgz').style.display = 'none';
  };
  r.readAsDataURL(file);
}

function applyImgUrl() {
  const url = document.getElementById('f-img-url').value.trim();
  if (!url) return;
  pendingImg = url;
  document.getElementById('ipr').style.display = 'block';
  document.getElementById('iprel').src = url;
  document.getElementById('imgz').style.display = 'none';
}

function removeImg() {
  pendingImg = '';
  document.getElementById('ipr').style.display = 'none';
  document.getElementById('iprel').src = '';
  document.getElementById('imgz').style.display = 'block';
  document.getElementById('fi').value = '';
  const urlInput = document.getElementById('f-img-url');
  if (urlInput) urlInput.value = '';
}

/* ── Cat picker ── */
function buildCatPick(sel) {
  document.getElementById('cpick').innerHTML = Object.entries(CATS).map(([k, v]) =>
    `<div class="csw${k === sel ? ' sel' : ''}" style="background:${v.bg};color:${v.c};border-color:${k === sel ? v.c : 'transparent'}" onclick="pickCat('${k}',this)">${v.e} ${v.l}</div>`
  ).join('');
  document.getElementById('fc').value = sel || 'autre';
}
function pickCat(k, el) {
  document.getElementById('fc').value = k;
  document.querySelectorAll('.csw').forEach(s => { s.classList.remove('sel'); s.style.borderColor = 'transparent'; });
  el.classList.add('sel'); el.style.borderColor = CATS[k].c;
}

/* ── Modal ── */
function openAdd() {
  editId = null; pendingImg = '';
  document.getElementById('mtitle').textContent = 'Nouvel événement';
  document.getElementById('ft').value = '';
  document.getElementById('fy').value = currentEra ? Math.round((currentEra.from + currentEra.to) / 2) : new Date().getFullYear();
  document.getElementById('fye').value = '';
  document.getElementById('fd').value = '';
  removeImg(); buildCatPick('autre');
  document.getElementById('bdel').style.display = 'none';
  document.getElementById('mbg').classList.add('open');
  setTimeout(() => document.getElementById('ft').focus(), 60);
}
function openEdit(id) {
  const ev = events.find(e => e.id === id); if (!ev) return;
  editId = id; pendingImg = ev.img || '';
  document.getElementById('mtitle').textContent = "Modifier l'événement";
  document.getElementById('ft').value = ev.title;
  document.getElementById('fy').value = ev.year;
  document.getElementById('fye').value = ev.yearEnd && ev.yearEnd !== ev.year ? ev.yearEnd : '';
  document.getElementById('fd').value = ev.desc || '';
  buildCatPick(ev.cat);
  if (ev.img) {
    document.getElementById('ipr').style.display = 'block';
    document.getElementById('iprel').src = ev.img;
    document.getElementById('imgz').style.display = 'none';
  } else removeImg();
  document.getElementById('bdel').style.display = 'inline-block';
  document.getElementById('mbg').classList.add('open');
}
function closeMod() { document.getElementById('mbg').classList.remove('open'); }

function saveEv() {
  const title = document.getElementById('ft').value.trim();
  const year  = parseInt(document.getElementById('fy').value);
  const yearEndRaw = document.getElementById('fye').value.trim();
  const yearEnd = yearEndRaw !== '' ? parseInt(yearEndRaw) : year;
  const fi = document.getElementById('ft');
  if (!title || isNaN(year)) { fi.style.borderColor = '#f03060'; fi.focus(); return; }
  fi.style.borderColor = '';
  const desc = document.getElementById('fd').value.trim();
  const cat  = document.getElementById('fc').value;
  if (editId) {
    Object.assign(events.find(e => e.id === editId), { title, year, yearEnd, desc, cat, img: pendingImg });
  } else {
    events.push({ id: nextId++, title, year, yearEnd, desc, cat, img: pendingImg });
  }
  saveToStorage(); closeMod();
  const era = ERAS.find(er => Math.round((year + yearEnd) / 2) >= er.from && Math.round((year + yearEnd) / 2) < er.to);
  if (era && (!currentEra || currentEra.key !== era.key)) selectEra(era.key);
  else { render(); updZoom(); }
}

function deleteEv() {
  if (!editId || !confirm('Supprimer cet événement définitivement ?')) return;
  events = events.filter(e => e.id !== editId);
  saveToStorage(); closeMod(); render(); updZoom();
}
document.getElementById('mbg').addEventListener('click', e => { if (e.target === e.currentTarget) closeMod(); });

/* ── Drag ── */
wrap.addEventListener('mousedown', e => {
  if (e.target.dataset.id) return;
  dragging = true; dsx = e.clientX; dsox = offsetX; wrap.classList.add('dragging');
});
window.addEventListener('mousemove', e => { if (!dragging) return; offsetX = dsox + (e.clientX - dsx); render(); });
window.addEventListener('mouseup', () => { dragging = false; wrap.classList.remove('dragging'); });

/* ── Wheel zoom ── */
wrap.addEventListener('wheel', e => {
  e.preventDefault();
  const f = e.deltaY < 0 ? 1.18 : 1 / 1.18;
  const mx = e.clientX - wrap.getBoundingClientRect().left;
  const { minY } = getRange();
  const yam = (mx - 80 - offsetX) / scale + minY;
  scale *= f; offsetX = mx - 80 - (yam - minY) * scale;
  render(); updZoom();
}, { passive: false });

/* ── Touch ── */
let ltx = null, ltd = null;
wrap.addEventListener('touchstart', e => {
  ltx = e.touches[0].clientX;
  if (e.touches.length === 2) ltd = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
}, { passive: true });
wrap.addEventListener('touchmove', e => {
  if (e.touches.length === 2 && ltd) {
    const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    scale *= d / ltd; ltd = d; render(); updZoom();
  } else if (ltx) {
    offsetX += e.touches[0].clientX - ltx; ltx = e.touches[0].clientX; render();
  }
}, { passive: true });
wrap.addEventListener('touchend', () => { ltx = null; ltd = null; });

/* ── Keyboard ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeMod(); closeCard(); clearSearch(); }
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); document.getElementById('si').focus(); }
});
document.addEventListener('click', e => {
  if (!document.getElementById('sres').contains(e.target) && e.target !== document.getElementById('si'))
    document.getElementById('sres').classList.remove('open');
});
window.addEventListener('resize', () => { if (currentEra) render(); });

/* ── Init ── */
renderLegend();
buildEraStrip();
