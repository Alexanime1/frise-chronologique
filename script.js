/* ═══ FRISE CHRONOLOGIQUE — script.js ═══ */
const TODAY = new Date();
const TODAY_Y = TODAY.getFullYear();
const TODAY_M = TODAY.getMonth() + 1;
const TODAY_D = TODAY.getDate();

let CATS = {
  politique: { c:'#4f6ef7', bg:'rgba(79,110,247,.13)',  l:'Politique',    e:'🏛' },
  science:   { c:'#16c47a', bg:'rgba(22,196,122,.13)',  l:'Science',      e:'🔬' },
  art:       { c:'#f0742a', bg:'rgba(240,116,42,.13)',  l:'Art & Culture',e:'🎨' },
  guerre:    { c:'#f03060', bg:'rgba(240,48,96,.13)',   l:'Guerre',       e:'⚔️' },
  sport:     { c:'#f59e0b', bg:'rgba(245,158,11,.13)',  l:'Sport',        e:'🏆' },
  autre:     { c:'#a855f7', bg:'rgba(168,85,247,.13)',  l:'Autre',        e:'✦'  },
};

const ERAS = [
  { key:'all',    name:"Toute l'histoire", from:-300000, to:TODAY_Y, color:'#8b5cf6' },
  { key:'prehist',name:'Préhistoire',      from:-300000, to:-3200,   color:'#e07820' },
  { key:'antiq',  name:'Antiquité',        from:-3200,   to:476,     color:'#d4a020' },
  { key:'moyen',  name:'Moyen Âge',        from:476,     to:1492,    color:'#4f6ef7' },
  { key:'mod',    name:'Époque Moderne',   from:1492,    to:1789,    color:'#16c47a' },
  { key:'contemp',name:'XIXᵉ siècle',      from:1789,    to:1900,    color:'#f03060' },
  { key:'xx',     name:'XXᵉ siècle',       from:1900,    to:2000,    color:'#a855f7' },
  { key:'xxi',    name:'XXIᵉ siècle',      from:2000,    to:TODAY_Y, color:'#06b6d4' },
];

const ERA_BG = {
  all:    { c1:'#8b5cf6', c3:'#f03060' },
  prehist:{ c1:'#e07820', c3:'#b45309' },
  antiq:  { c1:'#d4a020', c3:'#92400e' },
  moyen:  { c1:'#4f6ef7', c3:'#1d4ed8' },
  mod:    { c1:'#16c47a', c3:'#047857' },
  contemp:{ c1:'#f03060', c3:'#9f1239' },
  xx:     { c1:'#a855f7', c3:'#6d28d9' },
  xxi:    { c1:'#06b6d4', c3:'#155e75' },
};

const CONTINENTS = {
  'Europe':        ['France','Allemagne','Royaume-Uni','Italie','Espagne','Grèce','Russie','Belgique','Pays-Bas','Portugal','Pologne','Autriche','Suisse','Suède','Norvège','Danemark','Rome','Athènes','Paris','Berlin','Byzance','Constantinople'],
  'Asie':          ['Chine','Japon','Inde','Corée','Vietnam','Iraq','Iran','Perse','Mésopotamie','Syrie','Turquie','Afghanistan','Pakistan','Mongolie','Cambodge'],
  'Amériques':     ['États-Unis','Amérique','Brésil','Argentine','Cuba','Mexique','Canada','Colombie','Haïti','Chili','Pérou','Incas','Aztèques','Mayas'],
  'Afrique':       ['Égypte','Algérie','Rwanda','Maroc','Tunisie','Afrique du Sud','Mali','Éthiopie','Libye','Soudan','Congo','Mozambique','Zimbabwe'],
  'Moyen-Orient':  ['Israël','Palestine','Arabie','Arabie Saoudite','Irak','Iran','Syrie','Liban','Jordanie','Yémen','Koweït','Turquie','Ottoman','Suez'],
  'Océanie':       ['Australie','Nouvelle-Zélande','Polynésie','Pacifique'],
  'Monde entier':  ['Monde','mondial','universel','ONU','international','Europe','Occident','Alliés'],
};

/* ═══════════════════════════════════════════════
   PATCH LIEUX — injecte automatiquement un lieu
   sur chaque événement qui n'en a pas encore.
   ═══════════════════════════════════════════════ */
const __LP = {
  1:"Olduvai Gorge, Tanzanie",2:"Grotte de Lascaux, Montignac, France",
  3:"Croissant Fertile, Moyen-Orient",4:"Stonehenge, Wiltshire, Angleterre",
  5:"Mésopotamie (Irak actuel)",6:"Sumer, Mésopotamie (Irak actuel)",
  7:"Pyramides de Gizeh, Égypte",8:"Grande Muraille de Chine, Pékin",
  9:"Olympie, Grèce",10:"Colline du Palatin, Rome, Italie",
  11:"Lu (province du Shandong), Chine",12:"Marathon, Grèce",
  13:"De Macédoine à Babylone (Irak actuel)",14:"Xi'an (Xianyang), Chine",
  15:"Théâtre de Pompée, Rome, Italie",16:"Rome, Italie",
  17:"Bethléem, Palestine",18:"Pompéi, Campanie, Italie",
  19:"Chine (cour des Han)",20:"Milan, Italie",
  21:"Ravenne, Italie",22:"Médine, Arabie Saoudite",
  23:"Poitiers, France",24:"Basilique Saint-Pierre, Rome, Italie",
  25:"Noyon, Oise, France",26:"Constantinople (Istanbul), Turquie",
  27:"Hastings, East Sussex, Angleterre",
  28:"Clermont-Ferrand, France → Jérusalem",
  29:"Cathédrale Notre-Dame, Île de la Cité, Paris, France",
  30:"Karakoroum, Mongolie",31:"Runnymede, Surrey, Angleterre",
  32:"Venise → Pékin, Chine",33:"France et Angleterre",
  34:"Europe (Asie centrale → Europe de l'Ouest)",
  35:"Orléans, France",36:"Vieux-Marché, Rouen, France",
  37:"Constantinople (Istanbul), Turquie",38:"Mayence (Mainz), Allemagne",
  39:"Guanahani, Bahamas",40:"Cap Comorin → Calicut, Inde",
  41:"Musée du Louvre, Paris, France",
  42:"Chapelle Sixtine, Vatican, Rome, Italie",
  43:"Marignan (Melegnano), Lombardie, Italie",
  44:"Wittenberg, Saxe, Allemagne",
  45:"Séville → Détroit de Magellan → Moluques",
  46:"Frauenburg (Frombork), Pologne",47:"Paris, France",
  48:"Nantes, France",49:"Globe Theatre, Bankside, Londres, Angleterre",
  50:"Rue de la Ferronnerie, Paris, France",
  51:"Versailles et Paris, France",52:"Château de Versailles, France",
  53:"Trinity College, Cambridge, Angleterre",
  54:"Paris, France",55:"Genève, Suisse",
  56:"Philadelphie, Pennsylvanie, États-Unis",
  57:"Place de la Bastille, Paris, France",58:"Paris, France",
  59:"Place de la Révolution (Concorde), Paris, France",
  60:"Paris → Moscou → Waterloo, Belgique",61:"Vienne, Autriche",
  62:"Moscou → Vilnius (retraite)",63:"Waterloo, Belgique",
  64:"Paris, France",65:"Londres, Angleterre",
  66:"Paris, Vienne, Berlin, Rome, Budapest",
  67:"Down House, Bromley, Angleterre",
  68:"Fort Sumter, Caroline du Sud, États-Unis",
  69:"Paris, France",70:"Canal de Suez, Égypte",
  71:"Sedan et Paris, France",72:"Paris, France",
  73:"Boston, Massachusetts, États-Unis",
  74:"Institut Pasteur, Paris, France",
  75:"Mannheim, Bade-Wurtemberg, Allemagne",
  76:"Champ-de-Mars, Paris, France",
  77:"Grand Café, Boulevard des Capucines, Paris, France",
  78:"Stade Panathinaïko, Athènes, Grèce",79:"Paris, France",
  80:"Kill Devil Hills, Caroline du Nord, États-Unis",
  81:"Berne, Suisse",82:"Assemblée nationale, Paris, France",
  83:"Atlantique Nord (41°43'N 49°56'O)",
  84:"Sarajevo → tranchées de France et Belgique",
  85:"Verdun, Meuse, France",
  86:"Palais d'Hiver, Saint-Pétersbourg, Russie",
  87:"Forêt de Compiègne, Oise, France",
  88:"Wall Street, New York, États-Unis",89:"Berlin, Allemagne",
  90:"Paris, France",91:"Europe, Afrique du Nord, Pacifique",
  92:"BBC Broadcasting House, Londres, Angleterre",
  93:"Plage d'Omaha, Normandie, France",94:"Paris, France",
  95:"Hiroshima, Japon",96:"Nagasaki, Japon",
  97:"San Francisco, Californie, États-Unis",98:"New Delhi, Inde",
  99:"Palais de Chaillot, Paris, France",100:"Tel Aviv, Israël",
  101:"Péninsule coréenne",
  102:"Cavendish Laboratory, Cambridge, Angleterre",
  103:"Algérie (Batna, Aurès)",
  104:"Montgomery, Alabama, États-Unis",
  105:"Capitole de Rome, Rome, Italie",
  106:"Cosmodrome de Baïkonour, Kazakhstan",
  107:"Baïkonour → orbite terrestre basse",108:"Berlin, Allemagne",
  109:"Lincoln Memorial, Washington D.C., États-Unis",
  110:"Dealey Plaza, Dallas, Texas, États-Unis",
  111:"Groote Schuur Hospital, Le Cap, Afrique du Sud",
  112:"Sorbonne et rues de Paris, France",113:"Mer de la Tranquillité, Lune",
  114:"Bethel, New York, États-Unis",
  115:"National Mall, Washington D.C., États-Unis",
  116:"Robben Island, Le Cap, Afrique du Sud",
  117:"Paris CDG ↔ New York JFK (Atlantique Nord)",
  118:"Centre Pompidou, Paris, France",
  119:"Assemblée nationale, Paris, France",
  120:"Palais de l'Élysée, Paris, France",
  121:"Apple Campus, Cupertino, Californie, États-Unis",
  122:"Centrale nucléaire de Tchernobyl, Ukraine",
  123:"Checkpoint Charlie, Berlin, Allemagne",
  124:"Place Tian'anmen, Pékin, Chine",
  125:"Centre spatial Kennedy, Cap Canaveral, Floride, États-Unis",
  126:"Kremlin, Moscou, Russie",127:"CERN, Genève, Suisse",
  128:"Terminal Eurostar, Coquelles, Pas-de-Calais, France",
  129:"Kigali, Rwanda",130:"Srebrenica, Bosnie-Herzégovine",
  131:"Hong Kong, Chine",
  132:"Stade de France, Saint-Denis, France",
  133:"World Trade Center, Manhattan, New York, États-Unis",
  134:"Banque centrale européenne, Francfort, Allemagne",
  135:"Bethesda, Maryland, États-Unis",
  136:"Harvard University, Cambridge, Massachusetts, États-Unis",
  137:"San Mateo, Californie, États-Unis",
  138:"Moscone Center, San Francisco, Californie, États-Unis",
  139:"Lehman Brothers, 745 7th Avenue, New York, États-Unis",
  140:"Grant Park, Chicago, Illinois, États-Unis",
  141:"Tunis, Tunisie → Le Caire → Tripoli, Libye",
  142:"Abbottabad, Punjab, Pakistan",
  143:"Centrale nucléaire Fukushima Daiichi, Japon",
  144:"Charlie Hebdo, rue Nicolas-Appert, Paris, France",
  145:"Le Bataclan, Paris, France",
  146:"Le Bourget, Seine-Saint-Denis, France",
  147:"Parlement britannique, Westminster, Londres",
  148:"Palais de l'Élysée, Paris, France",
  149:"Stade Loujniki, Moscou, Russie",
  150:"Cathédrale Notre-Dame, Île de la Cité, Paris, France",
  151:"Wuhan, Chine → monde entier",152:"Bruxelles, Belgique",
  153:"Kyiv et est de l'Ukraine",
  154:"Stade de Lusail, Doha, Qatar",
  155:"San Francisco, Californie, États-Unis",
  156:"Kahramanmaraş, Turquie du Sud-Est",157:"Bagdad, Irak",
  158:"Port-au-Prince, Haïti",
  159:"Centers for Disease Control, Atlanta, Géorgie, États-Unis",
  160:"Cap Canaveral, Floride, États-Unis",
  161:"Station spatiale internationale, orbite terrestre basse",
  162:"Estádio do Maracanã, Rio de Janeiro, Brésil",
  163:"Maison-Blanche, Washington D.C., États-Unis",
  164:"Hollywood, Los Angeles, Californie, États-Unis",
  165:"Trocadéro et Seine, Paris, France",
  166:"Cathédrale Notre-Dame, Île de la Cité, Paris, France",
  167:"Tell el-Amarna, Haute-Égypte",168:"Athènes, Grèce",
  169:"Bodh Gaya, Bihar, Inde",170:"Forum romain, Rome, Italie",
  171:"Carthage, Tunisie",172:"Zama, Tunisie",
  173:"Jérusalem et Terre Sainte, Moyen-Orient",
  174:"Saint-Jean-d'Acre (Akko), Israël",175:"Bagdad, Irak",
  176:"Champ de Koulikovo, Oblast de Toula, Russie",
  177:"Tenochtitlan (Mexico City), Mexique",178:"Cajamarca → Cuzco, Pérou",
  180:"Prague → Breitenfeld → Nördlingen, Europe centrale",
  181:"Taj Mahal, Agra, Uttar Pradesh, Inde",
  183:"Gonaïves, Haïti",184:"Hong Kong, Chine",
  185:"Baie d'Edo (Tokyo), Japon",187:"Paris, France",
  188:"Santiago de Cuba, Cuba",
  189:"Place du Palais d'Hiver, Saint-Pétersbourg, Russie",
  190:"St Mary's Hospital, Paddington, Londres, Angleterre",
  193:"Léopoldville (Kinshasa), Congo",194:"La Havane, Cuba",
  195:"Canal de Suez, Sinaï, Égypte",
  196:"Hô Chi Minh-Ville (Saïgon), Vietnam",
  197:"Banda Aceh, Sumatra, Indonésie",
  198:"Maison-Blanche, Washington D.C., États-Unis",
  199:"Kibboutz Réïm, Néguev, Israël",
  200:"Capitole des États-Unis, Washington D.C.",
  201:"L'Écluse (Sluis), Flandre, Belgique",
  202:"Poitiers, Vienne, France",
  203:"Azincourt, Pas-de-Calais, France",
  204:"Troyes, Aube, France",
  205:"Assemblée nationale, Paris, France",
  206:"Varennes-en-Argonne, Meuse, France",
  207:"Paris, France (place de la Révolution)",208:"Paris, France",
  209:"Château de Saint-Cloud, Hauts-de-Seine, France",
  210:"Cathédrale Notre-Dame, Paris, France",
  211:"Austerlitz (Slavkov u Brna), Tchéquie",
  212:"Île d'Elbe → Waterloo, Belgique",213:"Gare de l'Est, Paris, France",
  214:"Vallée de la Marne, France",215:"Washington D.C., États-Unis",
  216:"Amiens → Cambrai → Mons (France-Belgique)",
  217:"Westerplatte, Gdansk, Pologne",
  218:"Plages de Dunkerque, Nord, France",
  219:"Wagon de Rethondes, Forêt de Compiègne, France",
  220:"Londres, Angleterre",
  221:"Front de l'Est — Brest → Moscou, Russie",
  222:"Pearl Harbor, Oahu, Hawaï, États-Unis",
  223:"Stalingrad (Volgograd), Russie",
  224:"Champs-Élysées, Paris, France",
  225:"École militaire de Karlshorst, Berlin, Allemagne",
  226:"Cosmodrome de Baïkonour, Kazakhstan",
  227:"Cosmodrome de Baïkonour → orbite terrestre",
  228:"Orbite terrestre (222 km) — Apollo-Soyouz",
  229:"Centre spatial Kennedy, Cap Canaveral, Floride, États-Unis",
  230:"Mojave Air and Space Port, Californie, États-Unis",
  231:"Van Horn, Texas, États-Unis",232:"La Havane, Cuba",
  233:"Porte de Brandebourg, Berlin, Allemagne",
  234:"Porte de Brandebourg, Berlin, Allemagne",
  235:"Karl-Marx-Platz, Leipzig, Saxe, Allemagne",
  236:"Pentagone, Arlington, Virginie, États-Unis",
  237:"Kaboul, Afghanistan",238:"Gare d'Atocha, Madrid, Espagne",
  239:"Station King's Cross Saint Pancras, Londres, Angleterre",
  240:"Kaboul, Afghanistan",241:"Jérusalem, Israël",
  242:"Damas, Syrie",243:"Jérusalem, Israël",
  244:"Constantinople (Istanbul), Turquie",
  245:"Saint-Jean-d'Acre (Akko), Israël",
  246:"Osnabrück, Basse-Saxe, Allemagne",247:"Paris, France",
  248:"Fontainebleau, Seine-et-Marne, France",
  249:"Espagne, Pays-Bas, Italie, Allemagne",
  250:"Lahore, Punjab, Pakistan",251:"Canal de Suez, Ismaïlia, Égypte",
  252:"Alger, Algérie",253:"Luanda, Angola",
  254:"Palerme, Sicile, Italie",
  255:"Col du Mont-Cenis, Alpes, Italie",
  256:"Cannae, Apulie, Italie",257:"Carthage, Tunisie",
  258:"Athènes, Grèce",259:"Athènes, Grèce",
  260:"Chios, Grèce",261:"Qadesh (Tell Nebi Mend), Homs, Syrie",
  262:"Milet, côte égéenne, Turquie",263:"Athènes, Grèce",
  264:"Bologne, Émilie-Romagne, Italie",
  265:"Ravenne, Émilie-Romagne, Italie",
  266:"Cathédrale Santa Maria del Fiore, Florence, Italie",
  267:"Trente, Trentin-Haut-Adige, Italie",
  268:"Golfe de Patras, Grèce",270:"Londres, Angleterre",
  271:"Stockton-on-Tees, Comté de Durham, Angleterre",
  272:"Crystal Palace, Hyde Park, Londres, Angleterre",
  273:"Washington D.C., États-Unis",
  274:"Menlo Park, New Jersey, États-Unis",
  275:"Mafeking (Mahikeng), Afrique du Sud",
  276:"Galerie des Glaces, Versailles, France",
  277:"Palais royal du Quirinal, Rome, Italie",
  278:"Nankin, Jiangsu, Chine",279:"Yalta, Crimée, Ukraine",
  280:"Jaffa, Tel Aviv, Israël",
  281:"Điện Biên Phủ, Province de Lai Châu, Vietnam",
  282:"Budapest, Hongrie",283:"Canal de Suez, Sinaï, Égypte",
  284:"Téhéran, Iran",285:"Kaboul, Afghanistan",
  286:"Bassora, Irak",287:"Pyongyang, Corée du Nord",
  288:"Chapelle Sixtine, Vatican, Rome, Italie",
  289:"Simferopol, Crimée, Ukraine",
  290:"Pulse Nightclub, Orlando, Floride, États-Unis",
  291:"Hôtel Ritz-Carlton, Riyad, Arabie Saoudite",
  292:"Observatoire du Mauna Kea, Hawaï, États-Unis",
  293:"Minneapolis, Minnesota, États-Unis",
  294:"Capitole des États-Unis, Washington D.C.",
  295:"Ankara, Turquie",296:"Maison-Blanche, Washington D.C., États-Unis",
  297:"Gaza City, Palestine",298:"Damas, Syrie",
  299:"Pénitencier de Kharp, Oblast de Yamalo-Nénétsie, Russie",
  300:"Washington D.C., États-Unis",
  301:"Afrique de l'Est (Éthiopie, Kenya, Tanzanie)",
  302:"Hiérakonpolis, Haute-Égypte",
  303:"Babylone (Al-Hillah, Irak)",
  304:"Palais de Cnossos, Héraklion, Crète, Grèce",
  305:"Byblos (Jbeil), Liban",306:"Marathon, Attique, Grèce",
  307:"Thermopyles, Phocide, Grèce",
  308:"Détroit de Salamine, Attique, Grèce",
  309:"Aigai (Vergina), Macédoine, Grèce",
  310:"Rivière Hydaspe (Jhelum), Punjab, Pakistan",
  311:"Babylone, Irak",312:"Rosette (Rachid), delta du Nil, Égypte",
  313:"Forum romain, Rome, Italie",314:"Sénat romain, Rome, Italie",
  315:"Mont du Temple, Jérusalem",316:"Nicomédie (İzmit), Turquie",
  317:"Rome, Italie",318:"La Mecque, Arabie Saoudite",
  319:"Détroit de Gibraltar, Espagne",320:"Verdun, Meuse, France",
  321:"L'Anse aux Meadows, Terre-Neuve, Canada",
  322:"Jérusalem, Israël",323:"Oxford, Oxfordshire, Angleterre",
  324:"Westminster, Londres, Angleterre",325:"Avignon, Vaucluse, France",
  326:"Ankara, Turquie",327:"Constantinople (Istanbul), Turquie",
  328:"Tolède, Castille-La Manche, Espagne",
  329:"Bosworth Field, Leicestershire, Angleterre",
  330:"Tordesillas, Valladolid, Espagne",331:"Porto Seguro, Bahia, Brésil",
  332:"Clos-Lucé, Amboise, Indre-et-Loire, France",
  333:"Gaspé, Québec, Canada",334:"Université de Louvain, Belgique",
  335:"Wassy, Amboise et Paris, France",
  336:"Gravelines, Nord, France",337:"Padoue, Vénétie, Italie",
  338:"Plymouth Rock, Plymouth, Massachusetts, États-Unis",
  339:"Westminster Hall, Londres, Angleterre",
  340:"Threadneedle Street, City of London, Angleterre",
  341:"Versailles, Île-de-France, France",
  342:"Rossbach, Saxe-Anhalt, Allemagne",
  343:"Soho, Birmingham, Angleterre",
  344:"Botany Bay, Nouvelle-Galles du Sud, Australie",
  345:"Versailles, Île-de-France, France",346:"Paris, France",
  347:"Côme, Lombardie, Italie",
  348:"Nouvelle-Orléans, Louisiane, États-Unis",
  349:"Westminster, Londres, Angleterre",
  350:"Saragosse, Aragon, Espagne",
  351:"Fontainebleau, Seine-et-Marne, France",
  352:"Musée du Louvre, Paris, France",
  353:"Rainhill, Merseyside, Angleterre",
  354:"Westminster, Londres, Angleterre",
  355:"Buckingham Palace, Londres, Angleterre",
  356:"Académie des sciences, Paris, France",357:"Paris, France",
  358:"Sébastopol, Crimée, Ukraine",359:"Meerut, Uttar Pradesh, Inde",
  360:"Genève, Suisse",361:"Ottawa, Ontario, Canada",
  362:"Galerie des Glaces, Versailles, France",
  363:"Liberty Island, New York, États-Unis",
  364:"Wounded Knee, South Dakota, États-Unis",
  365:"Champ de Mars, Paris, France",
  366:"San Francisco, Californie, États-Unis",
  367:"Cap Gris-Nez, Pas-de-Calais, France",
  368:"Pretoria, Gauteng, Afrique du Sud",
  369:"Pôle Sud, Antarctique",370:"Ankara, Turquie",
  371:"Foreign Office, Whitehall, Londres, Angleterre",
  372:"Washington D.C., États-Unis",
  373:"Vallée des Rois, Louxor, Haute-Égypte",
  374:"Kremlin, Moscou, Russie",
  375:"Aéroport du Bourget, Seine-Saint-Denis, France",
  376:"Empire State Building, Midtown Manhattan, New York, États-Unis",
  377:"Maison-Blanche, Washington D.C., États-Unis",
  378:"Nuremberg, Bavière, Allemagne",
  379:"Guernica, Pays basque, Espagne",380:"Vienne, Autriche",
  381:"Trinity Site, Jornada del Muerto, Nouveau-Mexique, États-Unis",
  382:"Westminster College, Fulton, Missouri, États-Unis",
  383:"Paris, France",384:"Aéroport de Tempelhof, Berlin, Allemagne",
  385:"Washington D.C., États-Unis",
  386:"Place Tian'anmen, Pékin, Chine",
  387:"Sommet de l'Everest, Sagarmatha, Népal",
  388:"Bandung, Java occidental, Indonésie",
  389:"Palais de l'Élysée, Paris, France",390:"La Havane, Cuba",
  391:"Reggane, Adrar, Algérie",
  392:"Bernauer Strasse, Berlin-Mitte, Allemagne",
  393:"Audubon Ballroom, Harlem, New York, États-Unis",
  394:"Pékin, Chine",395:"La Higuera, Vallegrande, Bolivie",
  396:"Lorraine Motel, Memphis, Tennessee, États-Unis",
  397:"Stonewall Inn, Greenwich Village, New York, États-Unis",
  398:"Complexe Watergate, Washington D.C., États-Unis",
  399:"Maison-Blanche, Washington D.C., États-Unis",
  400:"Zhongnanhai, Pékin, Chine",
  401:"Oldham Maternity Hospital, Greater Manchester, Angleterre",
  402:"Chapelle Sixtine, Vatican, Rome, Italie",
  403:"10 Downing Street, Westminster, Londres, Angleterre",
  404:"DARPA, Arlington, Virginie, États-Unis",
  405:"Bhopal, Madhya Pradesh, Inde",406:"Kremlin, Moscou, Russie",
  407:"Prison de Victor Verster, Paarl, Afrique du Sud",
  408:"Koweït City, Koweït",
  409:"Rose Garden, Maison-Blanche, Washington D.C.",
  410:"Esplanade des Rois d'Israël, Tel Aviv, Israël",
  411:"Times Square, Midtown Manhattan, New York, États-Unis",
  412:"Paris, France",
  413:"Centre spatial Kennedy, Cap Canaveral, Floride, États-Unis",
  414:"Nouvelle-Orléans, Louisiane, États-Unis",
  415:"Moscone Center, San Francisco, Californie, États-Unis",
  416:"Hôtel de Ville d'Oslo, Norvège",417:"Golfe du Mexique, États-Unis",
  418:"State Capitol, Albany, New York, États-Unis",
  419:"Sandy Hook Elementary School, Newtown, Connecticut, États-Unis",
  420:"Honolulu, Oahu, Hawaï, États-Unis",
  421:"Mossoul, Ninive, Irak",422:"Paris, France",
  423:"Château de Windsor, Berkshire, Angleterre",
  424:"Al Noor Mosque, Christchurch, Nouvelle-Zélande",
  425:"Scottish Event Campus, Glasgow, Écosse",
  426:"Yamato-Saidaiji, Nara, Japon",
  427:"Château de Balmoral, Aberdeenshire, Écosse",
  428:"Pôle Sud de la Lune (86°S, 32°E)",
  429:"Crocus City Hall, Krasnogorsk, Oblast de Moscou, Russie",
  430:"Miyazaki City, Préfecture de Miyazaki, Kyushu, Japon",
  431:"Académie de Platon, Athènes, Grèce",
  432:"Ravenne, Émilie-Romagne, Italie",433:"Londres, Angleterre",
  434:"Alcalá de Henares, Communauté de Madrid, Espagne",
  435:"Londres, Angleterre",436:"Maison Diodati, Genève, Suisse",
  437:"Iasnaia Poliana, Oblast de Toula, Russie",
  438:"Shakespeare and Company, Paris, France",
  439:"Barnhill, île de Jura, Écosse",440:"Oxford, Angleterre",
  441:"Londres, Angleterre",442:"Berkeley, Gloucestershire, Angleterre",
  443:"Varsovie, Pologne",
  444:"Université Julius-Maximilians, Würzburg, Bavière, Allemagne",
  445:"Université catholique de Louvain, Belgique",
  446:"Institut Kaiser Wilhelm de chimie, Berlin, Allemagne",
  447:"Groote Schuur Hospital, Le Cap, Afrique du Sud",
  448:"Institut Roslin, Université d'Édimbourg, Écosse",
  449:"CERN, Meyrin, Genève, Suisse",
  450:"LIGO Hanford Observatory, Richland, Washington, États-Unis",
  451:"Estadio Centenario, Montevideo, Uruguay",
  452:"Stade olympique, Berlin, Allemagne",
  453:"Estádio do Maracanã, Rio de Janeiro, Brésil",
  454:"Wembley Stadium, Londres, Angleterre",
  455:"Estadio Azteca, Mexico City, Mexique",
  456:"Olympiastadion, Munich, Bavière, Allemagne",
  457:"Estadio Azteca, Mexico City, Mexique",
  458:"Rose Bowl Stadium, Pasadena, Californie, États-Unis",
  459:"FNB Stadium (Soccer City), Johannesburg, Afrique du Sud",
  460:"International Stadium Yokohama, Kanagawa, Japon",
  461:"Kirkcaldy, Fife, Écosse",462:"Londres, Angleterre",
  463:"Ford Motor Company, Highland Park, Michigan, États-Unis",
  464:"Mount Washington Hotel, Bretton Woods, New Hampshire, États-Unis",
  465:"Camp David, Catoctin Mountain Park, Maryland, États-Unis",
  466:"Seattle, Washington, États-Unis",
  467:"Menlo Park, Californie, États-Unis",
  468:"Internet (livre blanc publié en ligne)",
  469:"OpenAI HQ, San Francisco, Californie, États-Unis",
  470:"Hangzhou, Zhejiang, Chine",471:"Silver Spring, Maryland, États-Unis",
  472:"Stockholm, Suède",
  473:"Three Mile Island, Dauphin County, Pennsylvanie, États-Unis",
  474:"Palais des congrès, Montréal, Québec, Canada",
  475:"Genève, Suisse",476:"Kyoto, Japon",477:"Paris, France",
  478:"Riksdag de Suède, Stockholm",
  479:"38e parallèle Nord, Zone démilitarisée de Corée",
  480:"Port d'Inchon, Gyeonggi-do, Corée du Sud",
  481:"Điện Biên Phủ, Province de Điện Biên, Vietnam",
  482:"Hô Chi Minh-Ville, Vietnam",
  483:"Golfe du Tonkin, Mer de Chine méridionale",
  484:"Saïgon (Hô Chi Minh-Ville), Vietnam",
  485:"Kent State University, Kent, Ohio, États-Unis",
  486:"Ambassade des États-Unis, Téhéran, Iran",
  487:"Chatt al-Arab, Bassora, Irak",488:"Téhéran, Iran",
  489:"Sidi Bouzid, Tunisie",490:"Place Tahrir, Le Caire, Égypte",
  491:"Benghazi, Cyrénaïque, Libye",
  492:"Deraa, Gouvernorat de Deraa, Syrie",
  493:"Wuhan, Hubei, Chine",494:"Paris, France",
  495:"University Hospital Coventry and Warwickshire, Angleterre",
  496:"Capitole des États-Unis, Washington D.C.",
  497:"Kimberley, Cap-du-Nord, Afrique du Sud",498:"Berlin, Allemagne",
  499:"Johannesburg, Gauteng, Afrique du Sud",500:"Juba, Soudan du Sud",
  501:"Mohenjo-Daro, Sindh, Pakistan",502:"Île de la Cité, Paris, France",
  503:"Cité Interdite, Pékin, Chine",504:"Florence, Toscane, Italie",
  505:"Palais des Tuileries, Paris, France",
  506:"Hô Chi Minh-Ville, Vietnam",
};

function applyLieuxPatch() {
  let n = 0;
  events.forEach(ev => {
    if (__LP[ev.id] && !ev.lieu) {
      ev.lieu = __LP[ev.id];
      n++;
    }
  });
  if (n > 0) console.log(`📍 ${n} lieux injectés automatiquement.`);
}

/* ── Storage ── */
const SK = 'frise_v13';
function loadLocal() { try { const s=localStorage.getItem(SK); return s?JSON.parse(s):null; } catch { return null; } }
function saveLocal() { try { localStorage.setItem(SK,JSON.stringify(events)); } catch(e) {} }

/* ── État global ── */
let events = [];
let baseIds = new Set();
let nextId = 1;
let favorites = new Set(JSON.parse(localStorage.getItem('frise_favs')||'[]'));
function saveFavs() { localStorage.setItem('frise_favs',JSON.stringify([...favorites])); }

function startApp(defaults, cats) {
  if (cats) CATS = cats;
  baseIds = new Set(defaults.map(e=>e.id));
  const saved = loadLocal()||[];
  const userAdded = saved.filter(e=>!baseIds.has(e.id));
  const merged = defaults.map(base => {
    const loc = saved.find(e=>e.id===base.id);
    return (loc&&(loc.updatedAt||0)>0)?loc:base;
  });
  userAdded.forEach(ev=>merged.push(ev));
  events = merged;
  nextId = Math.max(...events.map(e=>e.id),0)+1;
  applyLieuxPatch();
  saveLocal();
  buildCatPick('autre');
  renderLegend();
  buildEraStrip();
  updateEvCount();
}

window.__mergeRemote = function(remote) {
  if (!remote||remote.length===0) return;
  let changed=false;
  remote.forEach(r => {
    if (!r||!r.id) return;
    const loc=events.find(e=>e.id===r.id);
    if (!loc) { events.push(r); changed=true; }
    else if ((r.updatedAt||0)>(loc.updatedAt||0)) { Object.assign(loc,r); changed=true; }
  });
  if (changed) {
    saveLocal();
    nextId=Math.max(...events.map(e=>e.id),0)+1;
    render(); buildEraStrip(); updateEvCount();
  }
};

function saveSt() { saveLocal(); if (window.__firebaseSave) window.__firebaseSave(events); }
function updateEvCount() { const ec=document.getElementById('ev-count'); if (ec) ec.textContent=events.length+' événements'; }

/* ── Chargement data.json depuis GitHub ── */
fetch('https://raw.githubusercontent.com/Alexanime1/frise-chronologique/main/data.json')
  .then(r=>{ if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(d=>{
    const data=d.record||d;
    if (!data.events||!Array.isArray(data.events)||data.events.length===0) throw new Error('no events');
    startApp(data.events, data.categories);
  })
  .catch(err=>{
    console.warn('Données indisponibles:',err.message);
    const saved=loadLocal();
    events=saved&&saved.length>0?saved:[];
    nextId=Math.max(...events.map(e=>e.id),0)+1;
    buildCatPick('autre'); renderLegend(); buildEraStrip(); updateEvCount();
    if (events.length===0) {
      const h=document.getElementById('era-hint');
      if (h) h.innerHTML='<strong>⚠️ Données non chargées</strong><br>Vérifiez votre connexion internet et rechargez la page.';
    }
  });

/* ── State ── */
let scale=1, offsetX=0, svgW=900;
let H=340, AY=175;
let editId=null, activeId=null, hlId=null;
let currentEra=null;
let dragging=false, dsx=0, dsox=0;
let hiddenCats=new Set();
let activeRegion=null;
let showOnlyFavs=false;

const svgEl  = document.getElementById('tl-svg');
const wrap   = document.getElementById('tl-wrap');
const tipEl  = document.getElementById('tip');
const cpop   = document.getElementById('cpop');
const clList = document.getElementById('cluster-list');

/* ── Cat picker ── */
function buildCatPick(sel) {
  document.getElementById('cpick').innerHTML = Object.entries(CATS).map(([k,v])=>
    `<div class="csw${k===sel?' sel':''}" style="background:${v.bg};color:${v.c};border-color:${k===sel?v.c:'transparent'}" onclick="pickCat('${k}',this)">${v.e} ${v.l}</div>`
  ).join('');
  document.getElementById('fc').value=sel||Object.keys(CATS)[0]||'autre';
}
function pickCat(k,el) {
  document.getElementById('fc').value=k;
  document.querySelectorAll('.csw').forEach(s=>{ s.classList.remove('sel'); s.style.borderColor='transparent'; });
  el.classList.add('sel'); el.style.borderColor=CATS[k].c;
}

/* ── Dates ── */
const MN=['','Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
function fmtY(y) { return y<0?Math.abs(y)+' av. J.-C.':String(y); }
function fmtDate(ev) {
  let s='';
  if (ev.d) s+=ev.d+' ';
  if (ev.m) s+=MN[ev.m]+' ';
  return s+fmtY(ev.y);
}
function fmtDateEnd(ev) {
  if (ev.ongoing) return "Aujourd'hui";
  if (!ev.ye||ev.ye===ev.y) return null;
  let s='';
  if (ev.de) s+=ev.de+' ';
  if (ev.me) s+=MN[ev.me]+' ';
  return s+fmtY(ev.ye);
}

/*
  FIX "événement jusqu'à aujourd'hui" invisible :
  Pour les ères xxi/all, on utilise TODAY_Y+1 comme borne haute du filtre
  afin qu'un événement dont y=2024 ou y=TODAY_Y soit bien inclus.
  midY plafonne ye à TODAY_Y pour ne pas dépasser la frise.
*/
function midY(ev) {
  if (!ev.ye||ev.ye===ev.y) return ev.y;
  const ye=ev.ongoing?TODAY_Y:Math.min(ev.ye,TODAY_Y);
  return (ev.y+ye)/2;
}

function yearFrac(y,m,d) {
  if (!m) return y;
  const days=new Date(Math.abs(y),m,0).getDate();
  return y+(m-1)/12+(d?(d-1)/days/12:0);
}
function wikiUrl(ev) { return 'https://fr.wikipedia.org/wiki/'+encodeURIComponent((ev.wiki||ev.title).replace(/ /g,'_')); }
function mapsUrl(lieu) { return 'https://www.google.com/maps/search/'+encodeURIComponent(lieu); }

/* ── Filtre région ── */
function eventMatchesRegion(ev) {
  if (!activeRegion) return true;
  const text=((ev.title||'')+' '+(ev.desc||'')+' '+(ev.region||'')+' '+(ev.lieu||'')).toLowerCase();
  const q=activeRegion.toLowerCase();
  if (text.includes(q)) return true;
  const continent=CONTINENTS[activeRegion];
  if (continent) return continent.some(k=>text.includes(k.toLowerCase()));
  return false;
}

/* ── Era strip ── */
function buildEraStrip() {
  document.getElementById('era-strip').innerHTML=ERAS.map(era=>{
    const eT=(era.key==='xxi'||era.key==='all')?TODAY_Y+1:era.to;
    const count=events.filter(e=>
      midY(e)>=era.from&&midY(e)<eT&&
      !hiddenCats.has(e.cat)&&eventMatchesRegion(e)&&
      (!showOnlyFavs||favorites.has(e.id))
    ).length;
    const active=currentEra&&currentEra.key===era.key;
    const fromS=era.from<0?Math.abs(era.from)+' av. J.-C.':era.from;
    const toS=era.key==='xxi'||era.key==='all'?"Aujourd'hui":(era.to<0?Math.abs(era.to)+' av. J.-C.':era.to);
    return `<div class="era-card${active?' active':''}${era.key==='all'?' era-all':''}" style="--era-color:${era.color}" onclick="selectEra('${era.key}')">
      <div class="ec-dot" style="background:${era.color}"></div>
      <div class="ec-name">${era.name}</div>
      <div class="ec-range">${fromS} → ${toS}</div>
      <div class="ec-count">${count} événement${count>1?'s':''}</div>
    </div>`;
  }).join('');
}

function selectEra(key) {
  currentEra=ERAS.find(e=>e.key===key);
  buildEraStrip();
  document.getElementById('era-hint').style.display='none';
  document.getElementById('tl-outer').classList.add('show');
  document.getElementById('tl-dot').style.background=currentEra.color;
  const eT=eraToY();
  const toS=key==='xxi'||key==='all'?"Aujourd'hui":(eT<0?Math.abs(eT)+' av. J.-C.':eT);
  const fromS=currentEra.from<0?Math.abs(currentEra.from)+' av. J.-C.':currentEra.from;
  document.getElementById('tl-era-name').textContent=currentEra.name+' ('+fromS+' – '+toS+')';
  scale=1; offsetX=0;
  setTimeout(resetView,60);
  document.getElementById('tl-outer').scrollIntoView({behavior:'smooth',block:'start'});
}

function closeEra() {
  currentEra=null; buildEraStrip();
  document.getElementById('tl-outer').classList.remove('show');
  document.getElementById('era-hint').style.display='block';
}

function eraToY() { return currentEra.key==='xxi'||currentEra.key==='all'?TODAY_Y:currentEra.to; }

function eraEvents() {
  if (!currentEra) return [];
  const to=(currentEra.key==='xxi'||currentEra.key==='all')?TODAY_Y+1:currentEra.to;
  return events.filter(e=>
    midY(e)>=currentEra.from&&midY(e)<to&&
    !hiddenCats.has(e.cat)&&eventMatchesRegion(e)&&
    (!showOnlyFavs||favorites.has(e.id))
  );
}

function getRange() {
  if (!currentEra) return {minY:0,maxY:TODAY_Y};
  const from=currentEra.from, to=eraToY();
  const pad=(to-from)*0.04;
  return {minY:from-pad, maxY:to+pad};
}

function yearToX(y) { const{minY}=getRange(); return 80+(y-minY)*scale+offsetX; }
function xToYear(x) { const{minY}=getRange(); return (x-80-offsetX)/scale+minY; }
function defScale() { const{minY,maxY}=getRange(); return Math.max(0.0001,(svgW-160)/Math.max(1,maxY-minY)); }

function resetView() {
  H=window.innerWidth<640?260:340;
  AY=Math.round(H*0.515);
  svgW=wrap.clientWidth||window.innerWidth-20;
  scale=defScale(); offsetX=0;
  render(); updZoom();
}

function zoom(dir) {
  const midX=svgW/2, yAtMid=xToYear(midX);
  scale*=dir>0?1.5:1/1.5;
  const ds=defScale(); if (scale<ds*0.98) scale=ds;
  offsetX=midX-80-(yAtMid-getRange().minY)*scale;
  render(); updZoom();
}

function updZoom() {
  const p=Math.round(scale/defScale()*100)+'%';
  ['zlbl','zlbl2','zlbl3'].forEach(id=>{ const el=document.getElementById(id); if (el) el.textContent=p; });
}

function getVisibleRange() {
  const{minY,maxY}=getRange();
  return {visMin:Math.max(minY,xToYear(0)), visMax:Math.min(maxY,xToYear(svgW))};
}
function getTickMode() {
  const{visMin,visMax}=getVisibleRange(); const span=visMax-visMin;
  if (span<2) return 'days'; if (span<10) return 'months'; return 'years';
}
function pickYearIv(span) {
  for (const iv of [1,2,5,10,25,50,100,200,500,1000,2000,5000,10000,50000,100000])
    if (span/iv<=14) return iv;
  return 100000;
}

/* ── Render principal ── */
function render() {
  H=window.innerWidth<640?260:340; AY=Math.round(H*0.515);
  svgW=wrap.clientWidth||window.innerWidth-20;
  if (svgW<10) return;
  svgEl.setAttribute('width',svgW); svgEl.setAttribute('height',H);
  if (!currentEra) { svgEl.innerHTML=''; clearClusters(); return; }

  const{minY,maxY}=getRange();
  const{visMin,visMax}=getVisibleRange(); const visSpan=visMax-visMin;
  const bg=ERA_BG[currentEra.key]||ERA_BG.xx;
  const mode=getTickMode();
  let h='';

  h+=`<defs>
    <linearGradient id="bgv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".09"/>
      <stop offset="100%" stop-color="${bg.c1}" stop-opacity=".02"/>
    </linearGradient>
    <linearGradient id="bgh" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".06"/>
      <stop offset="100%" stop-color="${bg.c3}" stop-opacity=".06"/>
    </linearGradient>
    <radialGradient id="bgr1" cx="12%" cy="28%" r="45%">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".08"/>
      <stop offset="100%" stop-color="${bg.c1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bgr2" cx="88%" cy="72%" r="45%">
      <stop offset="0%" stop-color="${bg.c3}" stop-opacity=".07"/>
      <stop offset="100%" stop-color="${bg.c3}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bgv)"/>
  <rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bgh)"/>
  <rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bgr1)"/>
  <rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bgr2)"/>`;

  h+=`<line x1="0" y1="${AY}" x2="${svgW}" y2="${AY}" stroke="${currentEra.color}" stroke-width="2" opacity=".3"/>`;

  if (mode==='years') {
    const iv=pickYearIv(visSpan), st=Math.floor(visMin/iv)*iv, en=Math.ceil(visMax/iv)*iv;
    for (let y=st;y<=en;y+=iv) {
      if (y<minY||y>maxY) continue;
      const x=yearToX(y); if (x<25||x>svgW-10) continue;
      h+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${bg.c1}" stroke-width=".5" opacity=".18"/>`;
      h+=`<circle cx="${x}" cy="${AY}" r="3" fill="${currentEra.color}" opacity=".5"/>`;
      const lbl=y<0?Math.abs(y)+' av.':y===0?'0':String(y);
      h+=`<text x="${x}" y="${AY+20}" text-anchor="middle" font-size="10" fill="var(--ink3)" font-family="'DM Sans',sans-serif">${lbl}</text>`;
    }
  } else if (mode==='months') {
    const startY=Math.max(Math.floor(visMin),currentEra.from), endY=Math.min(Math.ceil(visMax)+1,eraToY());
    const mIv=visSpan<=3?1:visSpan<=7?2:3;
    for (let y=startY;y<=endY;y++) {
      for (let m=1;m<=12;m+=mIv) {
        const yf=yearFrac(y,m,1); if (yf<visMin-0.15||yf>visMax+0.15) continue;
        const x=yearToX(yf); if (x<15||x>svgW-10) continue;
        const isMaj=m===1;
        h+=`<line x1="${x}" y1="${isMaj?0:AY-18}" x2="${x}" y2="${AY+6}" stroke="${bg.c1}" stroke-width="${isMaj?.8:.35}" opacity="${isMaj?.32:.14}"/>`;
        h+=`<circle cx="${x}" cy="${AY}" r="${isMaj?3.5:2}" fill="${currentEra.color}" opacity="${isMaj?.55:.3}"/>`;
        h+=`<text x="${x}" y="${AY+20}" text-anchor="middle" font-size="${isMaj?10:9}" fill="var(--ink3)" font-family="'DM Sans',sans-serif" font-weight="${isMaj?'500':'400'}">${isMaj?String(y):MN[m]}</text>`;
      }
    }
  } else {
    const startY=Math.max(Math.floor(visMin),currentEra.from), endY=Math.min(Math.ceil(visMax)+1,eraToY());
    const totalDays=visSpan*365, dIv=totalDays<=25?1:totalDays<=70?2:totalDays<=120?5:7;
    for (let y=startY;y<=endY;y++) {
      for (let m=1;m<=12;m++) {
        const dim=new Date(Math.abs(y),m,0).getDate();
        for (let dd=1;dd<=dim;dd+=dIv) {
          const yf=yearFrac(y,m,dd); if (yf<visMin-0.02||yf>visMax+0.02) continue;
          const x=yearToX(yf); if (x<15||x>svgW-10) continue;
          const isFM=dd===1&&m===1, isFirst=dd===1;
          h+=`<line x1="${x}" y1="${isFM?0:isFirst?AY-14:AY-7}" x2="${x}" y2="${AY+5}" stroke="${bg.c1}" stroke-width="${isFM?.9:isFirst?.5:.25}" opacity="${isFM?.38:isFirst?.2:.1}"/>`;
          h+=`<circle cx="${x}" cy="${AY}" r="${isFM?3.5:isFirst?2.5:1.5}" fill="${currentEra.color}" opacity="${isFM?.55:isFirst?.38:.22}"/>`;
          h+=`<text x="${x}" y="${AY+20}" text-anchor="middle" font-size="${isFM?10:isFirst?9.5:9}" fill="var(--ink3)" font-family="'DM Sans',sans-serif">${isFM?String(y):isFirst?MN[m]:String(dd)}</text>`;
        }
      }
    }
  }

  /* Marqueur aujourd'hui */
  if (currentEra.key==='xxi'||currentEra.key==='all') {
    const tx=yearToX(yearFrac(TODAY_Y,TODAY_M,TODAY_D));
    if (tx>=20&&tx<=svgW-20) {
      h+=`<line x1="${tx}" y1="0" x2="${tx}" y2="${H}" stroke="${currentEra.color}" stroke-width="1.5" stroke-dasharray="4 3" opacity=".5"/>`;
      const lx=Math.min(tx+4,svgW-72);
      h+=`<rect x="${lx}" y="5" width="66" height="16" rx="8" fill="${currentEra.color}" opacity=".14"/>`;
      h+=`<text x="${lx+33}" y="17" text-anchor="middle" font-size="9.5" fill="${currentEra.color}" font-family="'DM Sans',sans-serif" font-weight="500">Aujourd'hui</text>`;
    }
  }

  /* Placement événements */
  const visible=eraEvents().sort((a,b)=>a.y-b.y);
  const raw=[], rowLast={};
  visible.forEach((ev,i)=>{
    const px=yearToX(yearFrac(ev.y,ev.m,ev.d));
    let row=i%2===0?-1:1, found=false;
    for (let depth=1;depth<=8&&!found;depth++) {
      for (const r of [-depth,depth]) {
        if (!rowLast[r]||px-rowLast[r]>95) { row=r; found=true; break; }
      }
    }
    rowLast[row]=px; raw.push({...ev,row,px});
  });

  function stemLen(row) {
    const depth=Math.abs(row), above=row<0;
    const maxLen=above?AY-50:H-AY-50;
    return Math.max(0,Math.min(30+depth*20,maxLen));
  }

  /* Barres de période */
  raw.forEach(ev=>{
    const yeDisplay=ev.ongoing?TODAY_Y:ev.ye;
    if (!yeDisplay||yeDisplay===ev.y) return;
    const x1=Math.max(0,yearToX(ev.y)), x2=Math.min(svgW,yearToX(yeDisplay));
    if (x2<0||x1>svgW) return;
    const c=(CATS[ev.cat]||CATS.autre).c, sl=stemLen(ev.row);
    if (sl<5) return;
    const above=ev.row<0, barY=above?AY-sl-5:AY+sl+4;
    if (barY<4||barY>H-6) return;
    h+=`<rect x="${x1}" y="${barY}" width="${Math.max(1,x2-x1)}" height="5" rx="2.5" fill="${c}" opacity=".17"/>`;
    if (x1>=0) h+=`<line x1="${x1}" y1="${AY}" x2="${x1}" y2="${barY+2}" stroke="${c}" stroke-width=".7" opacity=".25"/>`;
    if (x2<=svgW) h+=`<line x1="${x2}" y1="${AY}" x2="${x2}" y2="${barY+2}" stroke="${c}" stroke-width=".7" opacity=".25"/>`;
  });

  const clusters=clusterEv(raw);
  const singles=new Set(clusters.filter(g=>g.length===1).flatMap(g=>g.map(e=>e.id)));

  raw.filter(ev=>singles.has(ev.id)).forEach(ev=>{
    const px=ev.px; if (px<-80||px>svgW+80) return;
    const c=(CATS[ev.cat]||CATS.autre).c, above=ev.row<0, sl=stemLen(ev.row);
    if (sl<5) return;
    const tipY=above?AY-sl:AY+sl;
    const cardTop=above?tipY-38:tipY, cardBot=above?tipY:tipY+38;
    if (cardTop<4||cardBot>H-4) return;
    const isFav=favorites.has(ev.id);
    h+=`<circle cx="${px}" cy="${AY}" r="5.5" fill="${c}" opacity=".15" data-id="${ev.id}"/>`;
    h+=`<circle cx="${px}" cy="${AY}" r="${activeId===ev.id?4.5:3.5}" fill="${c}" stroke="var(--paper2)" stroke-width="1.5" style="cursor:pointer" data-id="${ev.id}"/>`;
    if (isFav) h+=`<text x="${px+5}" y="${AY-5}" font-size="9" fill="#f59e0b" style="pointer-events:none">★</text>`;
    if (ev.ongoing) h+=`<circle cx="${px+7}" cy="${AY-7}" r="4" fill="#f03060" opacity=".85" style="pointer-events:none"/>`;
    if (ev.lieu) h+=`<text x="${px}" y="${AY+14}" font-size="9" text-anchor="middle" fill="${c}" opacity=".7" style="pointer-events:none">📍</text>`;
    h+=`<line x1="${px}" y1="${AY+(above?-3:3)}" x2="${px}" y2="${tipY}" stroke="${c}" stroke-width="1" stroke-dasharray="2 3" opacity=".35"/>`;
  });

  raw.filter(ev=>singles.has(ev.id)).forEach(ev=>{ h+=buildCard(ev,stemLen); });

  svgEl.setAttribute('height',H); svgEl.innerHTML=h;
  svgEl.querySelectorAll('[data-id]').forEach(el=>{
    const id=parseInt(el.dataset.id);
    el.addEventListener('click',e=>{ e.stopPropagation(); openCard(id,e); });
    el.addEventListener('mousemove',e=>showTip(e,id));
    el.addEventListener('mouseleave',()=>{ tipEl.style.display='none'; });
  });
  clearClusters();
  clusters.filter(g=>g.length>=3).forEach(g=>buildClusterOv(g));
  renderLegend(); buildEraStrip();
}

function buildCard(ev, stemLen) {
  const cat=CATS[ev.cat]||CATS.autre, c=cat.c;
  const px=ev.px; if (px<-80||px>svgW+80) return '';
  const above=ev.row<0, sl=stemLen(ev.row);
  if (sl<5) return '';
  const tipY=above?AY-sl:AY+sl;
  const label=ev.title.length>25?ev.title.slice(0,24)+'…':ev.title;
  const bw=Math.min(label.length*7+32,190), bh=38;
  const bx=Math.max(6,Math.min(px-bw/2,svgW-bw-6));
  const by=above?tipY-bh:tipY;
  if (by<3||by+bh>H-3) return '';
  const isHL=ev.id===hlId, isFav=favorites.has(ev.id);
  let s='';
  if (ev.id===activeId||isHL)
    s+=`<rect x="${bx-4}" y="${by-4}" width="${bw+8}" height="${bh+8}" rx="12" fill="${c}" opacity="${isHL?.2:.12}"/>`;
  s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="9" fill="var(--paper)" stroke="${c}" stroke-width="${activeId===ev.id?1.75:.75}" style="cursor:pointer" data-id="${ev.id}"/>`;
  s+=`<rect x="${bx}" y="${by}" width="${bw}" height="4" rx="4" fill="${c}" opacity=".85" style="pointer-events:none"/>`;
  s+=`<rect x="${bx}" y="${by+2}" width="${bw}" height="2" fill="${c}" opacity=".85" style="pointer-events:none"/>`;
  if (ev.ongoing) s+=`<circle cx="${bx+bw-8}" cy="${by+8}" r="4" fill="#f03060" opacity=".85" style="pointer-events:none"/>`;
  if (isFav) s+=`<text x="${bx+bw-6}" y="${by+bh-5}" font-size="9" fill="#f59e0b" text-anchor="middle" style="pointer-events:none">★</text>`;
  s+=`<text x="${bx+8}" y="${by+18}" font-size="11" font-weight="500" fill="${c}" font-family="'Playfair Display',serif" style="cursor:pointer" data-id="${ev.id}">${label}</text>`;
  const dateSuffix=ev.ongoing?' → Auj.':ev.ye&&ev.ye!==ev.y?' →':'';
  s+=`<text x="${bx+8}" y="${by+30}" font-size="9" fill="${c}" opacity=".65" font-family="'DM Sans',sans-serif" data-id="${ev.id}" style="cursor:pointer">${fmtDate(ev)}${dateSuffix}</text>`;
  return s;
}

/* ── Clusters ── */
function clusterEv(placed) {
  const sorted=[...placed].sort((a,b)=>a.px-b.px);
  const clusters=[], used=new Set();
  for (let i=0;i<sorted.length;i++) {
    if (used.has(i)) continue;
    const grp=[sorted[i]]; used.add(i);
    for (let j=i+1;j<sorted.length;j++) {
      if (used.has(j)) continue;
      if (sorted[j].px-sorted[i].px<68) { grp.push(sorted[j]); used.add(j); }
    }
    if (grp.length>=3) clusters.push(grp);
    else grp.forEach(ev=>clusters.push([ev]));
  }
  return clusters;
}

function clearClusters() { document.querySelectorAll('.cluster-ov').forEach(e=>e.remove()); }
function buildClusterOv(grp) {
  const avgX=grp.reduce((s,e)=>s+e.px,0)/grp.length;
  if (avgX<-30||avgX>svgW+30) return;
  const catC={}; grp.forEach(e=>{ catC[e.cat]=(catC[e.cat]||0)+1; });
  const dc=Object.entries(catC).sort((a,b)=>b[1]-a[1])[0][0];
  const c=(CATS[dc]||CATS.autre).c;
  const sz=window.innerWidth<640?Math.min(56+grp.length*4,82):Math.min(48+grp.length*4,74);
  const hasFav=grp.some(ev=>favorites.has(ev.id));
  const hasOngoing=grp.some(ev=>ev.ongoing);
  const div=document.createElement('div');
  div.className='cluster-ov';
  div.style.cssText=`position:absolute;left:${avgX}px;top:${AY}px;transform:translate(-50%,-50%);
    width:${sz}px;height:${sz}px;border-radius:50%;background:var(--paper);
    border:2.5px solid ${c};display:flex;flex-direction:column;align-items:center;justify-content:center;
    cursor:pointer;transition:transform .15s;box-shadow:0 2px 12px ${c}30;font-family:var(--fb);z-index:10`;
  div.innerHTML=`<span style="font-size:${sz>60?15:13}px;font-weight:600;color:${c};line-height:1">${grp.length}</span>
    <span style="font-size:9px;color:${c};opacity:.7;margin-top:2px">évts${hasFav?' ★':''}${hasOngoing?' 🔴':''}</span>`;
  div.addEventListener('click',e=>{ e.stopPropagation(); openClusterList(grp,e); });
  div.addEventListener('mouseenter',()=>div.style.transform='translate(-50%,-50%) scale(1.1)');
  div.addEventListener('mouseleave',()=>div.style.transform='translate(-50%,-50%)');
  wrap.style.position='relative'; wrap.appendChild(div);
}

function openClusterList(grp,e) {
  closeCard();
  document.getElementById('cl-title-span').textContent=grp.length+' événements groupés';
  document.getElementById('cl-items').innerHTML=grp.sort((a,b)=>a.y-b.y).map(ev=>{
    const cat=CATS[ev.cat]||CATS.autre, isFav=favorites.has(ev.id);
    return `<div class="cl-item" onclick="zoomToEv(${ev.id})">
      <div class="cl-dot" style="background:${cat.c}"></div>
      <div style="flex:1">
        <div class="cl-name">${ev.title}${isFav?' <span style="color:#f59e0b">★</span>':''}${ev.ongoing?' <span style="color:#f03060;font-size:9px">EN COURS</span>':''}${ev.lieu?' <span style="color:var(--cp);font-size:9px">📍</span>':''}</div>
        <div class="cl-yr">${fmtDate(ev)} · ${cat.e} ${cat.l}</div>
      </div>
    </div>`;
  }).join('');
  clList.style.display='block';
  if (window.innerWidth<640) {
    clList.style.cssText='display:block;position:fixed;bottom:0;left:0;right:0;top:auto;width:100%;border-radius:var(--rxl) var(--rxl) 0 0;z-index:260';
  } else {
    const vw=window.innerWidth, vh=window.innerHeight;
    clList.style.cssText=`display:block;position:fixed;z-index:260;width:300px;left:${Math.min(e.clientX+10,vw-310)}px;top:${Math.min(e.clientY-40,vh-380)}px`;
  }
}
function closeClusterList() { clList.style.display='none'; }

function zoomToEv(id) {
  closeClusterList();
  const ev=events.find(e=>e.id===id); if (!ev) return;
  const{minY}=getRange(); scale=defScale()*7;
  offsetX=(svgW/2)-80-(yearFrac(ev.y,ev.m,ev.d)-minY)*scale;
  render(); updZoom(); hlId=id;
  setTimeout(()=>{ hlId=null; render(); },2200);
}

/* ── Tooltip ── */
function showTip(e,id) {
  const ev=events.find(x=>x.id===id); if (!ev) return;
  const cat=CATS[ev.cat]||CATS.autre;
  tipEl.style.display='block';
  tipEl.style.left=(e.clientX+16)+'px'; tipEl.style.top=(e.clientY-22)+'px';
  const endStr=fmtDateEnd(ev);
  tipEl.innerHTML=`<strong>${ev.title}${favorites.has(ev.id)?' ★':''}${ev.ongoing?' 🔴':''}</strong>
    <div class="ty" style="color:${cat.c}">${fmtDate(ev)}${endStr?' → '+endStr:''} · ${cat.e} ${cat.l}${ev.region?' · '+ev.region:''}</div>
    ${ev.lieu?`<div class="td">📍 ${ev.lieu}</div>`:''}
    ${ev.desc?`<div class="td">${ev.desc.slice(0,100)}${ev.desc.length>100?'…':''}</div>`:''}`;
}

/* ── Card popup ── */
function openCard(id,e) {
  const ev=events.find(x=>x.id===id); if (!ev) return;
  const cat=CATS[ev.cat]||CATS.autre;
  const endS=fmtDateEnd(ev);
  const isFav=favorites.has(ev.id);

  document.getElementById('cp-img-w').innerHTML=ev.img
    ?`<img class="cp-img" src="${ev.img}" alt="${ev.title}" loading="lazy"
        onerror="this.parentNode.innerHTML='<div style=\\'width:100%;height:72px;display:flex;align-items:center;justify-content:center;font-size:40px;background:${cat.bg}\\'>${cat.e}</div>'">`
    :`<div style="width:100%;height:72px;display:flex;align-items:center;justify-content:center;font-size:40px;background:${cat.bg}">${cat.e}</div>`;

  document.getElementById('cp-stripe').style.cssText=`height:5px;background:linear-gradient(90deg,${cat.c},${cat.c}66)`;
  const ce=document.getElementById('cp-cat');
  ce.textContent=`${cat.e} ${cat.l}`; ce.style.background=cat.bg; ce.style.color=cat.c;

  /* Dates — badge "EN COURS" si ongoing */
  const ongoingBadge=ev.ongoing
    ?` <span style="display:inline-block;background:#f03060;color:#fff;font-size:9px;font-weight:600;padding:2px 7px;border-radius:100px;margin-left:4px;font-family:var(--fb)">EN COURS</span>`:'';
  document.getElementById('cp-dates').innerHTML=endS
    ?`<strong style="color:${cat.c}">${fmtDate(ev)}</strong><br>→ ${endS}${ongoingBadge}`
    :fmtDate(ev)+ongoingBadge;

  document.getElementById('cp-title').textContent=ev.title;

  /* Région */
  if (ev.region) {
    document.getElementById('cp-region').textContent='📍 '+ev.region;
    document.getElementById('cp-region').style.display='block';
  } else { document.getElementById('cp-region').style.display='none'; }

  /* Lieu précis → bouton Google Maps */
  const cpLieu=document.getElementById('cp-lieu');
  if (cpLieu) {
    if (ev.lieu) {
      cpLieu.innerHTML=`<a href="${mapsUrl(ev.lieu)}" target="_blank" rel="noopener"
        style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--cp);
        text-decoration:none;padding:6px 12px;border:1px solid var(--cp);border-radius:100px;
        font-family:var(--fb);white-space:nowrap;margin-top:2px">
        🗺️ <strong style="font-weight:500">${ev.lieu}</strong> — Voir sur Google Maps</a>`;
      cpLieu.style.display='block';
    } else { cpLieu.style.display='none'; }
  }

  /* Barre de durée */
  const pbw=document.getElementById('cp-period-wrap');
  if (ev.ye&&ev.ye!==ev.y&&currentEra) {
    const span=(ev.ongoing?TODAY_Y:ev.ye)-ev.y;
    const eraSpan=eraToY()-currentEra.from;
    const pct=Math.min(100,Math.round(span/eraSpan*100));
    pbw.style.display='block';
    document.getElementById('cp-period-label').textContent=`Durée : ${span} an${span>1?'s':''}${ev.ongoing?' (en cours)':''} (${pct}% de l'époque)`;
    document.getElementById('cp-period-fill').style.cssText=`width:${pct}%;background:${cat.c}`;
  } else pbw.style.display='none';

  document.getElementById('cp-desc').textContent=ev.desc||'Aucune description.';

  const fbtn=document.getElementById('cp-fav');
  fbtn.textContent=isFav?'★ Favori':'☆ Favori';
  fbtn.style.cssText=`background:${isFav?'#f59e0b':'transparent'};color:${isFav?'#fff':'#f59e0b'};border:1.5px solid #f59e0b;border-radius:100px;padding:7px 12px;font-size:12px;cursor:pointer;font-family:var(--fb)`;
  fbtn.onclick=()=>toggleFav(id);
  document.getElementById('cp-edit').onclick=()=>{ closeCard(); openEdit(id); };
  document.getElementById('cp-edit').style.cssText=`background:linear-gradient(135deg,${cat.c},${cat.c}bb);color:#fff;flex:1;min-width:70px;font-family:var(--fb);font-size:12px;font-weight:500;padding:8px;border-radius:100px;cursor:pointer;border:none`;
  document.getElementById('cp-wiki').href=wikiUrl(ev);
  const sfBtn=document.getElementById('cp-subfrise');
  if (sfBtn) sfBtn.onclick=()=>{ closeCard(); openSubFrise(id); };

  cpop.style.display='block';
  if (window.innerWidth<640) {
    cpop.style.cssText='display:block;position:fixed;bottom:0;left:0;right:0;top:auto;width:100%;border-radius:24px 24px 0 0;max-height:88vh;overflow-y:auto;z-index:250';
  } else {
    const vw=window.innerWidth, vh=window.innerHeight;
    cpop.style.cssText=`display:block;position:fixed;border-radius:var(--rxl);width:min(360px,90vw);z-index:250;top:${Math.min(e.clientY-60,vh-590)}px;left:${Math.min(e.clientX+16,vw-376)}px`;
  }
  activeId=id; render();
}
function closeCard() { cpop.style.display='none'; activeId=null; render(); }
document.addEventListener('click',e=>{
  if (!cpop.contains(e.target)&&!e.target.dataset.id) closeCard();
  if (clList.style.display!=='none'&&!clList.contains(e.target)&&!e.target.closest('.cluster-ov')) closeClusterList();
});

/* ── Favoris ── */
function toggleFav(id) {
  if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
  saveFavs();
  const fbtn=document.getElementById('cp-fav');
  if (fbtn) {
    const isFav=favorites.has(id);
    fbtn.textContent=isFav?'★ Favori':'☆ Favori';
    fbtn.style.background=isFav?'#f59e0b':'transparent';
    fbtn.style.color=isFav?'#fff':'#f59e0b';
  }
  render(); buildEraStrip();
}
function toggleFavsFilter() {
  showOnlyFavs=!showOnlyFavs;
  const btn=document.getElementById('fav-filter-btn');
  if (btn) {
    btn.style.background=showOnlyFavs?'#f59e0b':'';
    btn.style.color=showOnlyFavs?'#fff':'';
    btn.textContent=showOnlyFavs?'★ Favoris (actif)':'☆ Favoris';
  }
  render(); buildEraStrip();
}

/* ── Legend ── */
function renderLegend() {
  document.getElementById('legend').innerHTML=Object.entries(CATS).map(([k,v])=>{
    const on=!hiddenCats.has(k);
    return `<div class="leg-item" style="background:${on?v.bg:'var(--paper2)'};color:${on?v.c:'var(--ink3)'};border-color:${on?v.c:'var(--paper4)'};opacity:${on?1:.45}" onclick="toggleCat('${k}')">${v.e} ${v.l}</div>`;
  }).join('');
}
function toggleCat(k) { hiddenCats.has(k)?hiddenCats.delete(k):hiddenCats.add(k); render(); buildEraStrip(); }

/* ── Recherche région ── */
function onRegionSearch(q) {
  const res=document.getElementById('region-results');
  if (!q.trim()) { res.style.display='none'; return; }
  const ql=q.toLowerCase(), matches=new Set();
  Object.entries(CONTINENTS).forEach(([continent,keywords])=>{
    if (continent.toLowerCase().includes(ql)) matches.add(continent);
    keywords.forEach(k=>{ if (k.toLowerCase().includes(ql)) matches.add(k); });
  });
  events.forEach(ev=>{
    if (ev.region&&ev.region.toLowerCase().includes(ql)) matches.add(ev.region);
    if (ev.lieu&&ev.lieu.toLowerCase().includes(ql)) matches.add(ev.lieu);
  });
  if (!matches.size) { res.innerHTML='<div class="rr-item" style="color:var(--ink3);padding:8px 12px">Aucun résultat</div>'; res.style.display='block'; return; }
  res.innerHTML=[...matches].slice(0,10).map(m=>
    `<div class="rr-item" onclick="setRegionFilter('${m.replace(/'/g,"\\'")}')">${Object.keys(CONTINENTS).includes(m)?'🌍':'📍'} ${m}</div>`
  ).join('');
  res.style.display='block';
}
function setRegionFilter(region) {
  activeRegion=region;
  document.getElementById('region-input').value=region;
  document.getElementById('region-results').style.display='none';
  document.getElementById('region-clear').style.display='inline';
  render(); buildEraStrip();
}
function clearRegionFilter() {
  activeRegion=null;
  document.getElementById('region-input').value='';
  document.getElementById('region-results').style.display='none';
  document.getElementById('region-clear').style.display='none';
  render(); buildEraStrip();
}

/* ── Search ── */
function hl(str,q) {
  if (!q) return str;
  return String(str).replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'),'<mark>$1</mark>');
}
function onSearch(q) {
  document.getElementById('scl').classList.toggle('on',q.length>0);
  const res=document.getElementById('sres');
  if (!q.trim()) { res.classList.remove('open'); hlId=null; render(); return; }
  const ql=q.toLowerCase(), yn=parseInt(q);
  const matched=events.filter(ev=>
    ev.title.toLowerCase().includes(ql)||
    (ev.desc||'').toLowerCase().includes(ql)||
    (ev.wiki||'').toLowerCase().includes(ql)||
    (ev.region||'').toLowerCase().includes(ql)||
    (ev.lieu||'').toLowerCase().includes(ql)||
    (CATS[ev.cat]?CATS[ev.cat].l.toLowerCase().includes(ql):false)||
    String(Math.abs(ev.y)).includes(q)||
    (!isNaN(yn)&&Math.abs(ev.y-yn)<30)
  ).sort((a,b)=>!isNaN(yn)?Math.abs(a.y-yn)-Math.abs(b.y-yn):a.y-b.y);
  if (!matched.length) { res.innerHTML=`<div class="sr-empty">Aucun résultat pour « ${q} »</div>`; res.classList.add('open'); return; }
  res.innerHTML=matched.slice(0,10).map(ev=>{
    const cat=CATS[ev.cat]||CATS.autre, endS=fmtDateEnd(ev), isFav=favorites.has(ev.id);
    return `<div class="sri" onclick="goToEv(${ev.id})">
      <div class="sri-dot" style="background:${cat.c}"></div>
      <div style="min-width:0">
        <div class="sri-title">${hl(ev.title,q)}${isFav?' <span style="color:#f59e0b">★</span>':''}${ev.ongoing?' <span style="color:#f03060;font-size:9px">EN COURS</span>':''}${ev.lieu?' <span style="font-size:10px">📍</span>':''}</div>
        <div class="sri-meta">${fmtDate(ev)}${endS?' → '+endS:''} · ${cat.e} ${cat.l}${ev.region?' · '+ev.region:''}${ev.lieu?' · '+ev.lieu:''}</div>
      </div>
    </div>`;
  }).join('');
  res.classList.add('open');
}
function clearSearch() {
  document.getElementById('si').value='';
  document.getElementById('sres').classList.remove('open');
  document.getElementById('scl').classList.remove('on');
  hlId=null; render();
}
function goToEv(id) {
  const ev=events.find(e=>e.id===id); if (!ev) return;
  document.getElementById('sres').classList.remove('open');
  const era=ERAS.find(er=>er.key!=='all'&&midY(ev)>=er.from&&midY(ev)<(er.key==='xxi'?TODAY_Y+1:er.to));
  if (era&&(!currentEra||currentEra.key!==era.key)) selectEra(era.key);
  hlId=id;
  setTimeout(()=>{
    const{minY}=getRange(); scale=defScale()*7;
    offsetX=(svgW/2)-80-(yearFrac(ev.y,ev.m,ev.d)-minY)*scale;
    render(); updZoom();
    setTimeout(()=>{ hlId=null; render(); },2500);
  },200);
}

/* ── Image ── */
function applyImgUrl() {
  const url=document.getElementById('f-img-url').value.trim(); if (!url) return;
  document.getElementById('ipr').style.display='block';
  document.getElementById('iprel').src=url;
}
function removeImg() {
  document.getElementById('ipr').style.display='none';
  document.getElementById('iprel').src='';
  document.getElementById('f-img-url').value='';
}

/* ── Détection de doublons ── */
function levenshtein(a,b) {
  const m=a.length, n=b.length;
  const dp=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i?j?0:i:j));
  for (let i=1;i<=m;i++) for (let j=1;j<=n;j++)
    dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  return dp[m][n];
}
function findDuplicates(title,y,m,d,excludeId) {
  const tl=title.toLowerCase().trim();
  return events.filter(ev=>{
    if (ev.id===excludeId) return false;
    const evTl=(ev.title||'').toLowerCase().trim();
    const dist=levenshtein(tl,evTl), maxLen=Math.max(tl.length,evTl.length);
    const similar=maxLen>0&&dist/maxLen<0.3;
    const sameYear=ev.y===y, sameMonth=!m||!ev.m||ev.m===m, sameDay=!d||!ev.d||ev.d===d;
    return similar||(sameYear&&sameMonth&&sameDay&&tl.length>=5&&evTl.includes(tl.slice(0,5)));
  });
}

/* ── Toggle "Jusqu'à aujourd'hui" ── */
function toggleOngoing(checked) {
  const fyeEl=document.getElementById('fye');
  const fmeEl=document.getElementById('fme');
  const fdeEl=document.getElementById('fde');
  if (checked) {
    fyeEl.value=TODAY_Y; fyeEl.disabled=true; fmeEl.disabled=true; fdeEl.disabled=true;
    fyeEl.style.opacity='.4'; fmeEl.style.opacity='.4'; fdeEl.style.opacity='.4';
  } else {
    fyeEl.value=''; fyeEl.disabled=false; fmeEl.disabled=false; fdeEl.disabled=false;
    fyeEl.style.opacity=''; fmeEl.style.opacity=''; fdeEl.style.opacity='';
  }
}

/* ── Toggle "Lieu précis" ── */
function toggleLieu(checked) {
  const lw=document.getElementById('lieu-wrap');
  if (lw) lw.style.display=checked?'block':'none';
  if (!checked) { const el=document.getElementById('f-lieu'); if (el) el.value=''; }
}

/* ── Modal ── */
function resetForm() {
  ['ft','fy','fm','fd2','fye','fme','fde','fdesc','fwiki','f-img-url','f-region','f-lieu'].forEach(id=>{
    const el=document.getElementById(id);
    if (el) { el.value=''; el.disabled=false; el.style.opacity=''; }
  });
  const cbO=document.getElementById('cb-ongoing'); if (cbO) cbO.checked=false;
  const cbL=document.getElementById('cb-lieu'); if (cbL) cbL.checked=false;
  const lw=document.getElementById('lieu-wrap'); if (lw) lw.style.display='none';
  removeImg();
}

function openAdd() {
  editId=null; resetForm();
  document.getElementById('mtitle').textContent='Nouvel événement';
  if (currentEra) {
    const mid=Math.round((currentEra.from+Math.min(eraToY(),TODAY_Y))/2);
    document.getElementById('fy').value=mid;
  }
  buildCatPick('autre');
  document.getElementById('bdel').style.display='none';
  document.getElementById('mbg').classList.add('open');
  setTimeout(()=>document.getElementById('ft').focus(),80);
}

function openEdit(id) {
  const ev=events.find(e=>e.id===id); if (!ev) return;
  editId=id; resetForm();
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
  document.getElementById('f-region').value=ev.region||'';
  /* Restaurer "Jusqu'à aujourd'hui" */
  const cbO=document.getElementById('cb-ongoing');
  if (cbO) { cbO.checked=!!ev.ongoing; if (ev.ongoing) toggleOngoing(true); }
  /* Restaurer "Lieu précis" */
  const cbL=document.getElementById('cb-lieu');
  if (cbL&&ev.lieu) { cbL.checked=true; toggleLieu(true); document.getElementById('f-lieu').value=ev.lieu; }
  if (ev.img) {
    document.getElementById('f-img-url').value=ev.img;
    document.getElementById('ipr').style.display='block';
    document.getElementById('iprel').src=ev.img;
  }
  buildCatPick(ev.cat||'autre');
  document.getElementById('bdel').style.display='inline-block';
  document.getElementById('mbg').classList.add('open');
}

function closeMod() { document.getElementById('mbg').classList.remove('open'); }

function saveEv() {
  const title=(document.getElementById('ft').value||'').trim();
  const yv   =(document.getElementById('fy').value||'').trim();
  if (!title) { document.getElementById('ft').style.borderColor='#f03060'; document.getElementById('ft').focus(); return; }
  if (!yv)   { document.getElementById('fy').style.borderColor='#f03060'; document.getElementById('fy').focus(); return; }
  const y=parseInt(yv);
  if (isNaN(y)) { document.getElementById('fy').style.borderColor='#f03060'; return; }
  const mRaw=document.getElementById('fm').value; const m=mRaw?parseInt(mRaw):undefined;
  const dRaw=document.getElementById('fd2').value; const d=dRaw?parseInt(dRaw):undefined;

  /* Vérification doublon */
  const dupes=findDuplicates(title,y,m,d,editId);
  if (dupes.length>0) {
    const names=dupes.slice(0,3).map(e=>`• ${e.title} (${fmtY(e.y)})`).join('\n');
    if (!confirm(`⚠️ Événement similaire déjà existant :\n\n${names}\n\nVoulez-vous quand même l'enregistrer ?`)) return;
  }
  document.getElementById('ft').style.borderColor='';
  document.getElementById('fy').style.borderColor='';

  const ongoing=!!(document.getElementById('cb-ongoing')&&document.getElementById('cb-ongoing').checked);
  const yeRaw=(document.getElementById('fye').value||'').trim();
  const ye=ongoing?TODAY_Y:(yeRaw?parseInt(yeRaw):y);
  const meRaw=document.getElementById('fme').value; const me=meRaw?parseInt(meRaw):undefined;
  const deRaw=document.getElementById('fde').value; const de=deRaw?parseInt(deRaw):undefined;
  const desc=document.getElementById('fdesc').value.trim();
  const cat=document.getElementById('fc').value||'autre';
  const wiki=document.getElementById('fwiki').value.trim();
  const img=document.getElementById('f-img-url').value.trim();
  const region=document.getElementById('f-region').value.trim();
  const cbL=document.getElementById('cb-lieu');
  const lieuEl=document.getElementById('f-lieu');
  const lieu=(cbL&&cbL.checked&&lieuEl)?lieuEl.value.trim():'';

  const obj={id:editId||nextId,title,y,ye,cat,desc,wiki,img,region,updatedAt:Date.now()};
  if (ongoing) obj.ongoing=true;
  if (lieu) obj.lieu=lieu;
  if (m) obj.m=m; if (d) obj.d=d;
  if (me) obj.me=me; if (de) obj.de=de;

  if (editId) { const i=events.findIndex(e=>e.id===editId); if (i>=0) events[i]=obj; }
  else { nextId++; events.push(obj); }
  saveSt(); closeMod(); updateEvCount();

  const mid=Math.round((y+ye)/2);
  const era=ERAS.find(er=>er.key!=='all'&&mid>=er.from&&mid<(er.key==='xxi'?TODAY_Y+1:er.to));
  if (era&&(!currentEra||currentEra.key!==era.key)) selectEra(era.key);
  else { render(); updZoom(); }
  setTimeout(()=>{ hlId=obj.id; render(); setTimeout(()=>{ hlId=null; render(); },2000); },300);
}

function deleteEv() {
  if (!editId||!confirm('Supprimer cet événement ?')) return;
  if (window.__firebaseDelete) window.__firebaseDelete(editId);
  favorites.delete(editId); saveFavs();
  events=events.filter(e=>e.id!==editId);
  saveSt(); closeMod(); render(); updZoom(); updateEvCount();
}

document.getElementById('mbg').addEventListener('click',e=>{ if (e.target===e.currentTarget) closeMod(); });

/* ── Partager ── */
function shareApp() {
  const url=window.location.href;
  if (navigator.share) {
    navigator.share({title:'Ma Frise Chronologique',text:'500 événements historiques interactifs !',url});
  } else {
    navigator.clipboard.writeText(url).then(()=>{
      const btn=document.querySelector('[onclick="shareApp()"]');
      if (btn) { btn.textContent='✓ Copié !'; setTimeout(()=>btn.textContent='🔗 Partager',2000); }
    });
  }
}

/* ── Mobile nav ── */
function panLeft()  { offsetX+=svgW*0.4; render(); }
function panRight() { offsetX-=svgW*0.4; render(); }

/* ── Drag ── */
wrap.addEventListener('mousedown',e=>{
  if (e.target.dataset.id||e.target.closest('.cluster-ov')) return;
  dragging=true; dsx=e.clientX; dsox=offsetX; wrap.classList.add('dragging');
});
window.addEventListener('mousemove',e=>{ if (!dragging) return; offsetX=dsox+(e.clientX-dsx); render(); });
window.addEventListener('mouseup',()=>{ dragging=false; wrap.classList.remove('dragging'); });

wrap.addEventListener('wheel',e=>{
  e.preventDefault();
  const f=e.deltaY<0?1.18:1/1.18, mx=e.clientX-wrap.getBoundingClientRect().left, yAtMouse=xToYear(mx);
  scale*=f; const ds=defScale(); if (scale<ds*0.98) scale=ds;
  offsetX=mx-80-(yAtMouse-getRange().minY)*scale;
  render(); updZoom();
},{passive:false});

let ltx=null,ltd=null,ltcx=null;
wrap.addEventListener('touchstart',e=>{
  if (e.touches.length===2) {
    ltd=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
    ltcx=(e.touches[0].clientX+e.touches[1].clientX)/2-wrap.getBoundingClientRect().left; ltx=null;
  } else { ltx=e.touches[0].clientX; ltd=null; }
},{passive:true});
wrap.addEventListener('touchmove',e=>{
  if (e.touches.length===2&&ltd!==null) {
    const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
    const cx=(e.touches[0].clientX+e.touches[1].clientX)/2-wrap.getBoundingClientRect().left;
    const yAC=xToYear(ltcx);
    scale*=d/ltd; const ds=defScale(); if (scale<ds*0.98) scale=ds;
    ltd=d; ltcx=cx; offsetX=cx-80-(yAC-getRange().minY)*scale;
    render(); updZoom();
  } else if (ltx!==null&&e.touches.length===1) {
    offsetX+=e.touches[0].clientX-ltx; ltx=e.touches[0].clientX; render();
  }
},{passive:true});
wrap.addEventListener('touchend',()=>{ ltx=null; ltd=null; ltcx=null; });

document.addEventListener('keydown',e=>{
  if (e.key==='Escape') { closeMod(); closeCard(); closeClusterList(); clearSearch(); }
  if ((e.metaKey||e.ctrlKey)&&e.key==='k') { e.preventDefault(); document.getElementById('si').focus(); }
  if ((e.metaKey||e.ctrlKey)&&e.key==='Enter'&&document.getElementById('mbg').classList.contains('open')) saveEv();
});
document.addEventListener('click',e=>{
  if (!document.getElementById('sres').contains(e.target)&&e.target!==document.getElementById('si'))
    document.getElementById('sres').classList.remove('open');
  if (!document.getElementById('region-results').contains(e.target)&&e.target!==document.getElementById('region-input'))
    document.getElementById('region-results').style.display='none';
});
window.addEventListener('resize',()=>{ if (currentEra) resetView(); });

/* ═══════════════════════════════════════════════
   SOUS-FRISES INLINE
   ═══════════════════════════════════════════════ */
let sfParentId=null, sfScale=1, sfOffsetX=0, sfW=900;
const SF_H=220, SF_AY=110;
let sfDragging=false, sfDsx=0, sfDsox=0;
let sfLtx=null, sfLtd=null, sfLtcx=null;
let sfActiveId=null;
const sfWrap=document.getElementById('sf-wrap');
const sfSvgEl=document.getElementById('sf-svg');

function openSubFrise(parentId) {
  const parent=events.find(e=>e.id===parentId); if (!parent) return;
  sfParentId=parentId;
  const cat=CATS[parent.cat]||CATS.autre;
  const badge=document.getElementById('sf-inline-badge');
  const endLabel=parent.ongoing?"Aujourd'hui":(parent.ye&&parent.ye!==parent.y?fmtY(parent.ye):'');
  badge.textContent=`${cat.e} ${fmtDate(parent)}${endLabel?' → '+endLabel:''}`;
  badge.style.cssText=`background:${cat.bg};color:${cat.c};font-size:10px;padding:3px 10px;border-radius:100px;font-family:var(--fb);font-weight:500;flex-shrink:0`;
  document.getElementById('sf-inline-name').textContent=parent.title;
  sfScale=1; sfOffsetX=0;
  const sfEl=document.getElementById('sf-inline');
  sfEl.style.display='block';
  setTimeout(()=>{ sfResetView(); sfEl.scrollIntoView({behavior:'smooth',block:'nearest'}); },50);
}
function closeInlineSubFrise() { document.getElementById('sf-inline').style.display='none'; sfParentId=null; sfActiveId=null; }
function getSubEvents(parentId) { return events.filter(e=>e.parentId===parentId).sort((a,b)=>a.y-b.y); }
function sfGetRange() {
  const parent=events.find(e=>e.id===sfParentId); if (!parent) return{minY:0,maxY:10};
  const fromY=parent.y, toY=parent.ongoing?TODAY_Y:(parent.ye&&parent.ye!==parent.y?parent.ye:parent.y+1);
  const span=Math.max(1,toY-fromY), pad=span*0.06;
  return{minY:fromY-pad,maxY:toY+pad};
}
function sfYearToX(y) { const{minY}=sfGetRange(); return 60+(y-minY)*sfScale+sfOffsetX; }
function sfXToYear(x) { const{minY}=sfGetRange(); return (x-60-sfOffsetX)/sfScale+minY; }
function sfDefScale() {
  const{minY,maxY}=sfGetRange(); sfW=sfWrap.clientWidth||window.innerWidth-20;
  return Math.max(0.0001,(sfW-120)/Math.max(1,maxY-minY));
}
function sfResetView() { sfW=sfWrap.clientWidth||window.innerWidth-20; sfScale=sfDefScale(); sfOffsetX=0; renderSubFrise(); sfUpdZoom(); }
function sfZoom(dir) {
  const midX=sfW/2, yAtMid=sfXToYear(midX);
  sfScale*=dir>0?1.5:1/1.5; const ds=sfDefScale(); if (sfScale<ds*0.98) sfScale=ds;
  sfOffsetX=midX-60-(yAtMid-sfGetRange().minY)*sfScale;
  renderSubFrise(); sfUpdZoom();
}
function sfUpdZoom() {
  const p=Math.round(sfScale/sfDefScale()*100)+'%';
  ['sf-zlbl','sf-zlbl2'].forEach(id=>{ const el=document.getElementById(id); if (el) el.textContent=p; });
}
function sfPanLeft()  { sfOffsetX+=sfW*0.4; renderSubFrise(); }
function sfPanRight() { sfOffsetX-=sfW*0.4; renderSubFrise(); }
function pickSfIv(span) {
  for (const iv of [1,2,5,10,25,50,100,200,500,1000,2000,5000,10000,50000,100000])
    if (span/iv<=12) return iv;
  return 100000;
}

function renderSubFrise() {
  if (!sfParentId) return;
  const parent=events.find(e=>e.id===sfParentId); if (!parent) return;
  const cat=CATS[parent.cat]||CATS.autre;
  const subEvs=getSubEvents(sfParentId);
  sfW=sfWrap.clientWidth||window.innerWidth-20; if (sfW<10) return;
  sfSvgEl.setAttribute('width',sfW); sfSvgEl.setAttribute('height',SF_H);
  const{minY,maxY}=sfGetRange();
  const sfVisMin=Math.max(minY,sfXToYear(0)), sfVisMax=Math.min(maxY,sfXToYear(sfW));
  const sfVisSpan=sfVisMax-sfVisMin;
  let h='';
  h+=`<defs><linearGradient id="sf-bgv" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${cat.c}" stop-opacity=".07"/>
    <stop offset="100%" stop-color="${cat.c}" stop-opacity=".02"/>
  </linearGradient></defs>
  <rect x="0" y="0" width="${sfW}" height="${SF_H}" fill="url(#sf-bgv)"/>`;
  h+=`<line x1="0" y1="${SF_AY}" x2="${sfW}" y2="${SF_AY}" stroke="${cat.c}" stroke-width="2" opacity=".35"/>`;
  const px1=sfYearToX(parent.y);
  const yeEnd=parent.ongoing?TODAY_Y:(parent.ye&&parent.ye!==parent.y?parent.ye:parent.y);
  const px2=sfYearToX(yeEnd);
  if (px1>=0&&px1<=sfW) {
    h+=`<circle cx="${px1}" cy="${SF_AY}" r="6" fill="${cat.c}" opacity=".8"/>`;
    h+=`<text x="${px1}" y="${SF_AY+20}" text-anchor="middle" font-size="10" fill="${cat.c}" font-family="'DM Sans',sans-serif" font-weight="600">${fmtY(parent.y)}</text>`;
  }
  if (yeEnd!==parent.y&&px2>=0&&px2<=sfW) {
    h+=`<circle cx="${px2}" cy="${SF_AY}" r="6" fill="${cat.c}" opacity=".8"/>`;
    h+=`<text x="${px2}" y="${SF_AY+20}" text-anchor="middle" font-size="10" fill="${cat.c}" font-family="'DM Sans',sans-serif" font-weight="600">${parent.ongoing?'Auj.':fmtY(yeEnd)}</text>`;
    if (px1>=0&&px2>=0) h+=`<rect x="${Math.max(0,px1)}" y="${SF_AY-2}" width="${Math.max(0,Math.min(sfW,px2)-Math.max(0,px1))}" height="4" fill="${cat.c}" opacity=".2"/>`;
  }
  const iv=pickSfIv(sfVisSpan), st=Math.floor(sfVisMin/iv)*iv;
  for (let y=st;y<=sfVisMax;y+=iv) {
    if (y<minY||y>maxY) continue;
    const x=sfYearToX(y); if (x<30||x>sfW-10) continue;
    h+=`<line x1="${x}" y1="${SF_AY-8}" x2="${x}" y2="${SF_AY+8}" stroke="${cat.c}" stroke-width=".6" opacity=".3"/>`;
    h+=`<text x="${x}" y="${SF_AY+20}" text-anchor="middle" font-size="9" fill="var(--ink3)" font-family="'DM Sans',sans-serif">${y<0?Math.abs(y)+' av.':y}</text>`;
  }
  const raw=[], rowLast={};
  subEvs.forEach((ev,i)=>{
    const px=sfYearToX(yearFrac(ev.y,ev.m,ev.d));
    let row=i%2===0?-1:1, found=false;
    for (let depth=1;depth<=6&&!found;depth++) {
      for (const r of [-depth,depth]) { if (!rowLast[r]||px-rowLast[r]>80) { row=r; found=true; break; } }
    }
    rowLast[row]=px; raw.push({...ev,row,px});
  });
  raw.forEach(ev=>{
    const px=ev.px; if (px<-60||px>sfW+60) return;
    const evCat=CATS[ev.cat]||CATS.autre, above=ev.row<0, depth=Math.abs(ev.row);
    const maxSl=above?SF_AY-46:SF_H-SF_AY-46, sl=Math.max(0,Math.min(28+depth*18,maxSl));
    if (sl<5) return;
    const tipY=above?SF_AY-sl:SF_AY+sl, by=above?tipY-36:tipY;
    if (by<3||by+36>SF_H-3) return;
    const isFav=favorites.has(ev.id), isActive=ev.id===sfActiveId;
    const label=ev.title.length>22?ev.title.slice(0,21)+'…':ev.title;
    const bw=Math.min(label.length*6.8+28,180), bx=Math.max(4,Math.min(px-bw/2,sfW-bw-4));
    if (isActive) h+=`<rect x="${bx-4}" y="${by-4}" width="${bw+8}" height="44" rx="12" fill="${evCat.c}" opacity=".15"/>`;
    h+=`<circle cx="${px}" cy="${SF_AY}" r="5" fill="${evCat.c}" opacity=".17" data-sfid="${ev.id}"/>`;
    h+=`<circle cx="${px}" cy="${SF_AY}" r="3.5" fill="${evCat.c}" stroke="var(--paper2)" stroke-width="1.5" style="cursor:pointer" data-sfid="${ev.id}"/>`;
    if (isFav) h+=`<text x="${px+5}" y="${SF_AY-4}" font-size="8" fill="#f59e0b" style="pointer-events:none">★</text>`;
    h+=`<line x1="${px}" y1="${SF_AY+(above?-3:3)}" x2="${px}" y2="${tipY}" stroke="${evCat.c}" stroke-width=".9" stroke-dasharray="2 2.5" opacity=".4"/>`;
    h+=`<rect x="${bx}" y="${by}" width="${bw}" height="36" rx="8" fill="var(--paper)" stroke="${evCat.c}" stroke-width="${isActive?1.75:.7}" style="cursor:pointer" data-sfid="${ev.id}"/>`;
    h+=`<rect x="${bx}" y="${by}" width="${bw}" height="4" rx="4" fill="${evCat.c}" opacity=".8" style="pointer-events:none"/>`;
    if (isFav) h+=`<text x="${bx+bw-8}" y="${by+29}" font-size="8" fill="#f59e0b" text-anchor="middle" style="pointer-events:none">★</text>`;
    h+=`<text x="${bx+8}" y="${by+17}" font-size="10.5" font-weight="500" fill="${evCat.c}" font-family="'Playfair Display',serif" style="cursor:pointer" data-sfid="${ev.id}">${label}</text>`;
    h+=`<text x="${bx+8}" y="${by+28}" font-size="9" fill="${evCat.c}" opacity=".65" font-family="'DM Sans',sans-serif" data-sfid="${ev.id}" style="cursor:pointer">${fmtDate(ev)}</text>`;
  });
  if (subEvs.length===0)
    h+=`<text x="${sfW/2}" y="${SF_AY-15}" text-anchor="middle" font-size="13" fill="${cat.c}" opacity=".5" font-family="'DM Sans',sans-serif">Aucun sous-événement — cliquez ＋ pour en ajouter</text>`;
  sfSvgEl.innerHTML=h;
  sfSvgEl.querySelectorAll('[data-sfid]').forEach(el=>{
    const id=parseInt(el.dataset.sfid);
    el.addEventListener('click',e=>{ e.stopPropagation(); sfOpenCard(id,e); });
  });
  clearSubClusters();
}

function sfOpenCard(id,e) { sfActiveId=id; renderSubFrise(); openCard(id,e); }
function clearSubClusters() { document.querySelectorAll('.sf-cluster-ov').forEach(e=>e.remove()); }

sfWrap.addEventListener('mousedown',e=>{
  if (e.target.dataset.sfid) return;
  sfDragging=true; sfDsx=e.clientX; sfDsox=sfOffsetX; sfWrap.classList.add('dragging');
});
window.addEventListener('mousemove',e=>{ if (!sfDragging) return; sfOffsetX=sfDsox+(e.clientX-sfDsx); renderSubFrise(); });
window.addEventListener('mouseup',()=>{ sfDragging=false; sfWrap.classList.remove('dragging'); });
sfWrap.addEventListener('wheel',e=>{
  e.preventDefault();
  const f=e.deltaY<0?1.18:1/1.18, mx=e.clientX-sfWrap.getBoundingClientRect().left, yAM=sfXToYear(mx);
  sfScale*=f; const ds=sfDefScale(); if (sfScale<ds*0.98) sfScale=ds;
  sfOffsetX=mx-60-(yAM-sfGetRange().minY)*sfScale;
  renderSubFrise(); sfUpdZoom();
},{passive:false});
sfWrap.addEventListener('touchstart',e=>{
  if (e.touches.length===2) {
    sfLtd=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
    sfLtcx=(e.touches[0].clientX+e.touches[1].clientX)/2-sfWrap.getBoundingClientRect().left; sfLtx=null;
  } else { sfLtx=e.touches[0].clientX; sfLtd=null; }
},{passive:true});
sfWrap.addEventListener('touchmove',e=>{
  if (e.touches.length===2&&sfLtd!==null) {
    const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
    const cx=(e.touches[0].clientX+e.touches[1].clientX)/2-sfWrap.getBoundingClientRect().left;
    const yAC=sfXToYear(sfLtcx);
    sfScale*=d/sfLtd; const ds=sfDefScale(); if (sfScale<ds*0.98) sfScale=ds;
    sfLtd=d; sfLtcx=cx; sfOffsetX=cx-60-(yAC-sfGetRange().minY)*sfScale;
    renderSubFrise(); sfUpdZoom();
  } else if (sfLtx!==null&&e.touches.length===1) {
    sfOffsetX+=e.touches[0].clientX-sfLtx; sfLtx=e.touches[0].clientX; renderSubFrise();
  }
},{passive:true});
sfWrap.addEventListener('touchend',()=>{ sfLtx=null; sfLtd=null; sfLtcx=null; });
window.addEventListener('resize',()=>{ if (sfParentId) renderSubFrise(); });

function openAddSubEvent() {
  const parent=events.find(e=>e.id===sfParentId); if (!parent) return;
  openAdd();
  const midYr=Math.round((parent.y+(parent.ongoing?TODAY_Y:(parent.ye||parent.y)))/2);
  document.getElementById('fy').value=midYr;
  document.getElementById('fc').value=parent.cat;
  buildCatPick(parent.cat);
  document.getElementById('mbg').dataset.parentId=parent.id;
}
function saveEvWithParent() {
  const parentId=document.getElementById('mbg').dataset.parentId;
  const wasEdit=!!editId;
  saveEv();
  if (!wasEdit&&parentId) {
    const newEv=[...events].reverse().find(e=>!e.parentId&&e.updatedAt);
    if (newEv) { newEv.parentId=parseInt(parentId); saveSt(); }
    delete document.getElementById('mbg').dataset.parentId;
    setTimeout(()=>{
      if (sfParentId===parseInt(parentId)) renderSubFrise();
      else openSubFrise(parseInt(parentId));
    },400);
  }
}
