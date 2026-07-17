// ============================================================
// Données réelles — chaînes officielles et messages publics,
// catégorisés par thème (classification éditoriale) et,
// pour certains, regroupés en séries.
// ============================================================

// Date à partir de laquelle les messages sont considérés comme disponibles
// dans l'application (1 an en arrière).
const CONTENT_CUTOFF = "2025-07-17T00:00:00Z";

const THEMES = ["Foi", "Couple & Famille", "Finances", "Guérison", "Combat spirituel", "Prière", "Jeunesse"];

const PREACHERS = [
  // --- FRANCOPHONES ---
  {
    id: "raoul-wafo",
    name: "Dr Raoul Wafo",
    ministry: "Temple de la Foi",
    country: "Côte d'Ivoire",
    language: "fr",
    channelUrl: "https://www.youtube.com/@TempledelaFoiTV",
    channelName: "Raoul Wafo TV",
    bio: "Pasteur principal et fondateur du Temple de la Foi à Abidjan, ministère à impact international connu pour ses enseignements sur la foi et la transformation des mentalités.",
    messages: [
      { id: "m-wafo-6", videoId: "DHjAOiFSROo", title: "Le pouvoir de la décision !", theme: "Foi", publishedAt: "2026-01-21" },
      { id: "m-wafo-7", videoId: "7swbFEmXeI8", title: "1er culte d'adoration — 11 janvier 2026 / Temple de la Foi", theme: "Foi", publishedAt: "2026-01-11" },
      { id: "m-wafo-1", videoId: "4e0wZe2kuvc", title: "Veux-tu vivre libre ? Voici ce qu'il te faut savoir", theme: "Combat spirituel", publishedAt: "2025-11-10" },
      { id: "m-wafo-2", videoId: "4rfsm-ggHpk", title: "Une révélation sur la justice de Dieu qui va révolutionner ta vie", theme: "Foi", publishedAt: "2025-10-04" },
      { id: "m-wafo-3", videoId: "49YPGGHAW_Q", title: "Comprendre le monde spirituel (1ère partie)", theme: "Combat spirituel", publishedAt: "2025-10-04", seriesId: "s-wafo-monde-spirituel", episodeNumber: 1 },
      { id: "m-wafo-4", videoId: "v_52VuUmh-c", title: "Comment tout obtenir de Dieu par la foi ?", theme: "Foi", publishedAt: "2025-08-30" },
      { id: "m-wafo-5", videoId: "msRGA4Z5k7w", title: "Expérimenter la bonté de Dieu (1ère partie)", theme: "Foi", publishedAt: "2025-09-25" },
    ],
  },
  {
    id: "mamadou-karambiri",
    name: "Dr Mamadou Philippe Karambiri",
    ministry: "CIE / Impact Centre Chrétien",
    country: "Burkina Faso",
    language: "fr",
    channelUrl: "https://www.youtube.com/@rmcimpactv",
    channelName: "RMC Impact TV",
    bio: "Pasteur du Centre International d'Évangélisation (CIE/MIA), enseignant biblique reconnu pour ses messages multilingues (français/mooré) sur la foi et la direction divine.",
    messages: [
      { id: "m-karambiri-1", videoId: "qQSkaWO2xOA", title: "La leçon de la foi enseignée par Jésus", theme: "Foi", publishedAt: "2025-10-12" },
      { id: "m-karambiri-2", videoId: "Rqxv82SdZII", title: "Enseignement du 25/01/2023", theme: "Foi", publishedAt: "2023-01-25" },
      { id: "m-karambiri-3", videoId: "9Vd5EBPUTe4", title: "La foi courageuse du conquérant vainqueur", theme: "Foi", publishedAt: "2023-12-24" },
      { id: "m-karambiri-4", videoId: "RU9mnRKjHvc", title: "La vision / destinée", theme: "Jeunesse", publishedAt: "2023-12-20" },
      { id: "m-karambiri-5", videoId: "VWm_4z0SnOI", title: "Seigneur, étends mes limites", theme: "Prière", publishedAt: "2024-06-16" },
    ],
  },
  {
    id: "yvan-castanou",
    name: "Apôtre Yvan Castanou",
    ministry: "Impact Centre Chrétien (ICC)",
    country: "France",
    language: "fr",
    channelUrl: "https://www.youtube.com/c/YvanCASTANOUTV",
    channelName: "Yvan Castanou TV",
    bio: "Apôtre et pasteur principal d'Impact Centre Chrétien, une église de plus de 100 assemblées locales dans le monde. Auteur de plusieurs livres sur la prière et la vie chrétienne.",
    messages: [
      { id: "m-yvan-1", videoId: "sTO92Vtwc_Q", title: "J19 — 21 jours de jeûne & prières", theme: "Prière", publishedAt: "2026-06-24" },
      { id: "m-yvan-2", videoId: "uC47pH-Q3J0", title: "Soirée du Saint-Esprit", theme: "Foi", publishedAt: "2026-05-22" },
      { id: "m-yvan-3", videoId: "kN67LifFeAg", title: "La grande désillusion à venir : l'absence de l'image", theme: "Combat spirituel", publishedAt: "2026-06-07" },
      { id: "m-yvan-4", videoId: "2UE1zOrhAaw", title: "Consacrons le mois de mai 2026", theme: "Prière", publishedAt: "2026-04-30", seriesId: "s-yvan-consecration", episodeNumber: 1 },
      { id: "m-yvan-5", videoId: "VbwmgnQbOEQ", title: "Consacrons le mois de juin 2026", theme: "Prière", publishedAt: "2026-05-31", seriesId: "s-yvan-consecration", episodeNumber: 2 },
      { id: "m-yvan-6", videoId: "C6sSw6IkMP0", title: "Planifie ton caractère, ta consécration et ta prospérité en 2025", theme: "Finances", publishedAt: "2025-01-05" },
    ],
  },
  {
    id: "yves-castanou",
    name: "Apôtre Yves Castanou",
    ministry: "Impact Centre Chrétien (ICC)",
    country: "France",
    language: "fr",
    channelUrl: "https://www.youtube.com/@yves.castanou",
    channelName: "Yves Castanou TV",
    bio: "Pasteur associé et co-fondateur d'Impact Centre Chrétien, connu pour ses enseignements sur la prière sacrificielle et la vie de disciple.",
    messages: [
      { id: "m-yves-1", videoId: "fPqcyDleKjI", title: "Temps d'enseignement — CIC2026 / Jour 4", theme: "Foi", publishedAt: "2026-07-10" },
      { id: "m-yves-2", videoId: "HwezWNIXv1c", title: "Le réveil pour la royauté — Camp Impact Conférence 2026", theme: "Foi", publishedAt: "2026-07-09" },
      { id: "m-yves-3", videoId: "-gJd5Ptzw5o", title: "Croyant ou disciple de Christ ?", theme: "Foi", publishedAt: "2026-01-04" },
      { id: "m-yves-4", videoId: "TxpvORtSUw8", title: "Les ingrédients d'une vie de prière sacrificielle", theme: "Prière", publishedAt: "2024-10-18" },
    ],
  },
  {
    id: "mohammed-sanogo",
    name: "Apôtre Mohammed Sanogo",
    ministry: "Messages de Vie",
    country: "Côte d'Ivoire",
    language: "fr",
    channelUrl: "https://www.youtube.com/@MohammedSANOGO",
    channelName: "Pasteur Mohammed Sanogo",
    bio: "Fondateur du ministère Messages de Vie, converti de l'islam à 15 ans, connu pour ses croisades d'évangélisation (Tour 931, Impact Nations) et ses enseignements sur la puissance de Dieu.",
    messages: [
      { id: "m-sanogo-4", videoId: "8ZWWaYAUjDk", title: "Les 7 royaumes de Satan (1ère partie)", theme: "Combat spirituel", publishedAt: "2026-03-21" },
      { id: "m-sanogo-5", videoId: "ZEFUmiwNGhg", title: "Comment voir la face de Dieu", theme: "Prière", publishedAt: "2026-02-09" },
      { id: "m-sanogo-6", videoId: "50cuZlz-W4c", title: "Réussir 2026 — 7 jours de jeûne et prières (Jour 4)", theme: "Prière", publishedAt: "2026-02-05" },
      { id: "m-sanogo-7", videoId: "tuwJiJM5idY", title: "Matinale des miracles", theme: "Guérison", publishedAt: "2026-01-17" },
      { id: "m-sanogo-1", videoId: "-TfhDxbX4Ck", title: "L'onction pour faire des disciples", theme: "Foi", publishedAt: "2025-06-12" },
      { id: "m-sanogo-2", videoId: "CNmUzmaQPGk", title: "Lâchez prise et trouvez la paix", theme: "Guérison", publishedAt: "2023-09-21" },
      { id: "m-sanogo-3", videoId: "zwHIrok0TlE", title: "Un remède puissant pour une vie abondante en Christ", theme: "Guérison", publishedAt: "2023-07-11" },
    ],
  },
  {
    id: "chris-ndikumana",
    name: "Évangéliste Chris Ndikumana",
    ministry: "Kanguka",
    country: "Burundi",
    language: "fr",
    channelUrl: "https://www.youtube.com/@chrisndikumana",
    channelName: "Chris Ndikumana",
    bio: "Évangéliste burundais, animateur de l'émission \"Kanguka\" (\"Réveille-toi\"), connu pour ses grandes croisades rassemblant des centaines de milliers de personnes en Afrique.",
    messages: [
      { id: "m-chris-1", videoId: "K0sonIZMRHM", title: "Conférence Pentecôte 2026 — Soirée de feu et de puissance", theme: "Combat spirituel", publishedAt: "2026-05-24" },
      { id: "m-chris-2", videoId: "tM73S3KrvlI", title: "Kanguka Abidjan 2024 — Jésus a gagné", theme: "Foi", publishedAt: "2024-12-07" },
      { id: "m-chris-3", videoId: "yEI2G6Oythc", title: "Repose-toi en Christ", theme: "Guérison", publishedAt: "2025-07-26" },
    ],
  },

  // --- ANGLOPHONES ---
  {
    id: "joshua-selman",
    name: "Apostle Joshua Selman",
    ministry: "Koinonia (Eternity Network International)",
    country: "Nigeria",
    language: "en",
    channelUrl: "https://www.youtube.com/c/KoinoniaGlobal",
    channelName: "Koinonia Global",
    bio: "Founder of Koinonia and Eternity Network International, based in Abuja, Nigeria. Known for deep teachings on intimacy with God, the prophetic, and spiritual growth.",
    messages: [
      { id: "m-selman-1", videoId: "9WPdalJYx38", title: "Worship & Warfare Service — The Koinonia Experience", theme: "Combat spirituel", publishedAt: "2026-04-19" },
      { id: "m-selman-2", videoId: "nfes9VHzUgU", title: "April 2025 Miracle Service", theme: "Guérison", publishedAt: "2025-04-27" },
    ],
  },
  {
    id: "jerry-eze",
    name: "Pastor Jerry Eze",
    ministry: "Streams of Joy International / NSPPD",
    country: "Nigeria",
    language: "en",
    channelUrl: "https://www.youtube.com/channel/UCLg4NCAJxhIvD4IRV__LOFg",
    channelName: "Pastor Jerry Eze",
    bio: "Lead Pastor of Streams of Joy International and convener of the New Season Prophetic Prayers and Declarations (NSPPD), one of the most-watched prayer platforms in the world.",
    messages: [
      { id: "m-jerry-1", videoId: "kEwRVpiPWgY", title: "NSPPD — Morning Prophetic Prayers & Declarations", theme: "Prière", publishedAt: "2026-06-15" },
      { id: "m-jerry-2", videoId: "l0v_npx27bM", title: "NSPPD Live — Prophetic Prayers & Declarations", theme: "Prière", publishedAt: "2026-06-16" },
    ],
  },
  {
    id: "eno-jerry",
    name: "Pastor Dr Eno Jerry Eze",
    ministry: "Women on Fire Network (WOFN)",
    country: "Nigeria",
    language: "en",
    channelUrl: "https://www.youtube.com/@enojerry22",
    channelName: "Eno Jerry",
    bio: "Chief Steward of the Women on Fire Network, co-labourer with her husband Pastor Jerry Eze on NSPPD. Known for teachings on prayer, marriage, and womanhood.",
    messages: [
      { id: "m-eno-1", videoId: "gWLCxy3G0ps", title: "What God wants from men and women in relationship", theme: "Couple & Famille", publishedAt: "2020-10-24" },
      { id: "m-eno-2", videoId: "0vi2gulHOdc", title: "Memorize with me — Oil of gladness (Psalm 45:7)", theme: "Foi", publishedAt: "2025-06-09" },
    ],
  },
];

const SERIES = [
  {
    id: "s-wafo-monde-spirituel",
    preacherId: "raoul-wafo",
    title: "Comprendre le monde spirituel",
    theme: "Combat spirituel",
    description: "Une série d'enseignements du Dr Raoul Wafo pour comprendre les réalités du monde spirituel et marcher en victoire.",
  },
  {
    id: "s-yvan-consecration",
    preacherId: "yvan-castanou",
    title: "Consacrons le mois",
    theme: "Prière",
    description: "Les temps mensuels de consécration de l'Apôtre Yvan Castanou pour entrer dans chaque mois avec Dieu.",
  },
];

// Aide : retrouve tous les messages appartenant à une série, triés par épisode
function getSeriesMessages(seriesId) {
  const all = PREACHERS.flatMap((p) => p.messages.map((m) => ({ ...m, preacherId: p.id })));
  return all.filter((m) => m.seriesId === seriesId).sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0));
}
