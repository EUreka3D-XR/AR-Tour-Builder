/**
 * @typedef {import('@/types/jsdoc-types').Asset} Asset
 * @typedef {import('@/types/jsdoc-types').PoiAsset} PoiAsset
 * @typedef {import('@/types/jsdoc-types').AssetType} AssetType
 */

/**
 * Array of 5 mock image assets
 * @type {Asset[]}
 */
export const mockImageAssets = [
  {
    id: "asset-001",
    title: {
      locales: {
        en: "Parthenon East Facade",
        fr: "Façade Est du Parthénon",
      },
    },
    description: {
      locales: {
        en: "High-resolution photograph of the Parthenon's eastern facade showcasing the iconic Doric columns and pediment sculptures.",
        fr: "Photographie haute résolution de la façade orientale du Parthénon présentant les colonnes doriques emblématiques et les sculptures du fronton.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&h=800&fit=crop",
        fr: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&h=800&fit=crop",
      },
    },
    filename: "parthenon_east_facade_4k.jpg",
    landingPage: "https://acropolis-museum.gr/parthenon-east-facade",
    source: "https://commons.wikimedia.org/wiki/File:Parthenon_east_facade.jpg",
    url: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&h=800&fit=crop",
    type: "image",
    metadata: {
      width: 1200,
      height: 800,
      format: "JPEG",
      photographer: "Archaeological Service of Greece",
      capturedAt: "2023-06-15T14:30:00Z",
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "asset-002",
    title: {
      locales: {
        en: "Ionic Capital Detail",
        fr: "Détail du Chapiteau Ionique",
      },
    },
    description: {
      locales: {
        en: "Close-up detail of an ancient Ionic capital showing the characteristic volutes and ornamental carving.",
        fr: "Détail rapproché d'un chapiteau ionique antique montrant les volutes caractéristiques et la sculpture ornementale.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop",
        fr: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop",
      },
    },
    filename: "ionic_capital_detail.jpg",
    landingPage: "https://acropolis-museum.gr/ionic-architecture",
    source: "https://commons.wikimedia.org/wiki/File:Ionic_capital_detail.jpg",
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop",
    type: "image",
    metadata: {
      width: 1200,
      height: 800,
      format: "JPEG",
      photographer: "Heritage Documentation Team",
      capturedAt: "2023-05-22T11:15:00Z",
    },
    createdAt: "2024-01-12T09:15:00Z",
    updatedAt: "2024-01-12T09:15:00Z",
  },
  {
    id: "asset-003",
    title: {
      locales: {
        en: "Ancient Greek Pottery Fragment",
        fr: "Fragment de Poterie Grecque Antique",
      },
    },
    description: {
      locales: {
        en: "Red-figure pottery fragment depicting mythological scenes, dating from the 5th century BCE.",
        fr: "Fragment de poterie à figures rouges représentant des scènes mythologiques, datant du Ve siècle avant J.-C.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://images.unsplash.com/photo-1594736797933-d0f06ba07c45?w=1200&h=800&fit=crop",
        fr: "https://images.unsplash.com/photo-1594736797933-d0f06ba07c45?w=1200&h=800&fit=crop",
      },
    },
    filename: "pottery_fragment_red_figure.jpg",
    landingPage: "https://acropolis-museum.gr/pottery-collection",
    source: "https://commons.wikimedia.org/wiki/File:Red_figure_pottery.jpg",
    url: "https://images.unsplash.com/photo-1594736797933-d0f06ba07c45?w=1200&h=800&fit=crop",
    type: "image",
    metadata: {
      width: 1200,
      height: 800,
      format: "JPEG",
      photographer: "Museum Documentation Team",
      capturedAt: "2023-04-10T13:45:00Z",
    },
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-10T14:20:00Z",
  },
  {
    id: "asset-004",
    title: {
      locales: {
        en: "Acropolis Panoramic View",
        fr: "Vue Panoramique de l'Acropole",
      },
    },
    description: {
      locales: {
        en: "Breathtaking panoramic view of the Acropolis hill showing the Parthenon, Propylaea, and surrounding ancient structures.",
        fr: "Vue panoramique époustouflante de la colline de l'Acropole montrant le Parthénon, les Propylées et les structures antiques environnantes.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop",
        fr: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop",
      },
    },
    filename: "acropolis_panorama_sunset.jpg",
    landingPage: "https://acropolis-museum.gr/acropolis-overview",
    source: "https://commons.wikimedia.org/wiki/File:Acropolis_panorama.jpg",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop",
    type: "image",
    metadata: {
      width: 1200,
      height: 600,
      format: "JPEG",
      photographer: "Athens Tourism Board",
      capturedAt: "2023-07-20T19:30:00Z",
    },
    createdAt: "2024-01-08T16:45:00Z",
    updatedAt: "2024-01-08T16:45:00Z",
  },
  {
    id: "asset-005",
    title: {
      locales: {
        en: "Marble Sculpture Detail",
        fr: "Détail de Sculpture en Marbre",
      },
    },
    description: {
      locales: {
        en: "Intricate marble sculpture detail from the Parthenon frieze showing classical Greek craftsmanship and artistic mastery.",
        fr: "Détail complexe de sculpture en marbre de la frise du Parthénon montrant l'artisanat grec classique et la maîtrise artistique.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=800&fit=crop",
        fr: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=800&fit=crop",
      },
    },
    filename: "marble_sculpture_frieze_detail.jpg",
    landingPage: "https://acropolis-museum.gr/parthenon-frieze",
    source:
      "https://commons.wikimedia.org/wiki/File:Parthenon_frieze_detail.jpg",
    url: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=800&fit=crop",
    type: "image",
    metadata: {
      width: 1200,
      height: 800,
      format: "JPEG",
      photographer: "Classical Art Institute",
      capturedAt: "2023-03-18T10:20:00Z",
    },
    createdAt: "2024-01-05T11:30:00Z",
    updatedAt: "2024-01-05T11:30:00Z",
  },
];

/**
 * Array of 5 mock video assets
 * @type {Asset[]}
 */
export const mockVideoAssets = [
  {
    id: "video-001",
    title: {
      locales: {
        en: "Parthenon Virtual Reconstruction",
        fr: "Reconstruction Virtuelle du Parthénon",
      },
    },
    description: {
      locales: {
        en: "A stunning 4K time-lapse video showing the virtual reconstruction of the Parthenon as it appeared in ancient times, complete with original colors and decorations.",
        fr: "Une vidéo time-lapse 4K époustouflante montrant la reconstruction virtuelle du Parthénon tel qu'il apparaissait dans l'Antiquité, avec les couleurs et décorations d'origine.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://leomav.github.io/demo-assets/rock_of_the_wivre/Palynologie-AV2.mp4",
        fr: "https://leomav.github.io/demo-assets/rock_of_the_wivre/Palynologie-AV2.mp4",
      },
    },
    filename: "parthenon_reconstruction_4k.mp4",
    landingPage: "https://acropolis-museum.gr/virtual-reconstruction",
    source:
      "https://commons.wikimedia.org/wiki/File:Parthenon_reconstruction.mp4",
    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    type: "video",
    metadata: {
      width: 1920,
      height: 1080,
      duration: 180,
      format: "MP4",
      photographer: "Digital Heritage Lab",
      capturedAt: "2023-08-10T16:00:00Z",
    },
    createdAt: "2024-01-20T14:30:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "video-002",
    title: {
      locales: {
        en: "Archaeological Excavation Documentary",
        fr: "Documentaire sur les Fouilles Archéologiques",
      },
    },
    description: {
      locales: {
        en: "Behind-the-scenes documentary footage of ongoing archaeological excavations around the Acropolis, showing modern archaeological techniques and discoveries.",
        fr: "Images documentaires des coulisses des fouilles archéologiques en cours autour de l'Acropole, montrant les techniques archéologiques modernes et les découvertes.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://leomav.github.io/demo-assets/rock_of_the_wivre/Palynologie-AV2.mp4",
        fr: "https://leomav.github.io/demo-assets/rock_of_the_wivre/Palynologie-AV2.mp4",
      },
    },
    filename: "archaeological_excavation_doc.mp4",
    landingPage: "https://acropolis-museum.gr/excavation-documentary",
    source: "https://commons.wikimedia.org/wiki/File:Acropolis_excavation.mp4",
    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    type: "video",
    metadata: {
      width: 1280,
      height: 720,
      duration: 420,
      format: "MP4",
      photographer: "Archaeological Service of Greece",
      capturedAt: "2023-09-05T10:15:00Z",
    },
    createdAt: "2024-01-18T11:45:00Z",
    updatedAt: "2024-01-18T11:45:00Z",
  },
  {
    id: "video-003",
    title: {
      locales: {
        en: "Ancient Greek Architecture Explained",
        fr: "Architecture Grecque Antique Expliquée",
      },
    },
    description: {
      locales: {
        en: "Educational video explaining the three classical orders of ancient Greek architecture: Doric, Ionic, and Corinthian, with detailed examples from the Acropolis.",
        fr: "Vidéo éducative expliquant les trois ordres classiques de l'architecture grecque antique : dorique, ionique et corinthien, avec des exemples détaillés de l'Acropole.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://leomav.github.io/demo-assets/rock_of_the_wivre/Palynologie-AV2.mp4",
        fr: "https://leomav.github.io/demo-assets/rock_of_the_wivre/Palynologie-AV2.mp4",
      },
    },
    filename: "greek_architecture_explained.mp4",
    landingPage: "https://acropolis-museum.gr/architecture-guide",
    source:
      "https://commons.wikimedia.org/wiki/File:Greek_architecture_orders.mp4",
    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    type: "video",
    metadata: {
      width: 1920,
      height: 1080,
      duration: 300,
      format: "MP4",
      photographer: "Educational Media Center",
      capturedAt: "2023-07-12T14:20:00Z",
    },
    createdAt: "2024-01-15T09:30:00Z",
    updatedAt: "2024-01-15T09:30:00Z",
  },
  {
    id: "video-004",
    title: {
      locales: {
        en: "Sunrise Over the Acropolis",
        fr: "Lever de Soleil sur l'Acropole",
      },
    },
    description: {
      locales: {
        en: "Breathtaking time-lapse video capturing the sunrise over the Acropolis, showcasing the golden hour lighting on ancient marble structures.",
        fr: "Vidéo time-lapse à couper le souffle capturant le lever du soleil sur l'Acropole, mettant en valeur l'éclairage de l'heure dorée sur les structures de marbre antiques.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://leomav.github.io/demo-assets/rock_of_the_wivre/Palynologie-AV2.mp4",
        fr: "https://leomav.github.io/demo-assets/rock_of_the_wivre/Palynologie-AV2.mp4",
      },
    },
    filename: "acropolis_sunrise_timelapse.mp4",
    landingPage: "https://acropolis-museum.gr/sunrise-gallery",
    source: "https://commons.wikimedia.org/wiki/File:Acropolis_sunrise.mp4",
    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1920x1080_1mb.mp4",
    type: "video",
    metadata: {
      width: 1920,
      height: 1080,
      duration: 90,
      format: "MP4",
      photographer: "Athens Cinematography Guild",
      capturedAt: "2023-06-21T05:30:00Z",
    },
    createdAt: "2024-01-12T16:20:00Z",
    updatedAt: "2024-01-12T16:20:00Z",
  },
  {
    id: "video-005",
    title: {
      locales: {
        en: "3D Laser Scanning Process",
        fr: "Processus de Numérisation Laser 3D",
      },
    },
    description: {
      locales: {
        en: "Technical documentation video showing the advanced 3D laser scanning process used to create digital preservation records of the Parthenon sculptures.",
        fr: "Vidéo de documentation technique montrant le processus avancé de numérisation laser 3D utilisé pour créer des archives de préservation numérique des sculptures du Parthénon.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://leomav.github.io/demo-assets/rock_of_the_wivre/Palynologie-AV2.mp4",
        fr: "https://leomav.github.io/demo-assets/rock_of_the_wivre/Palynologie-AV2.mp4",
      },
    },
    filename: "3d_laser_scanning_process.mp4",
    landingPage: "https://acropolis-museum.gr/digital-preservation",
    source: "https://commons.wikimedia.org/wiki/File:3D_laser_scanning.mp4",
    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
    type: "video",
    metadata: {
      width: 1280,
      height: 720,
      duration: 240,
      format: "MP4",
      photographer: "Digital Heritage Consortium",
      capturedAt: "2023-11-08T13:45:00Z",
    },
    createdAt: "2024-01-08T12:15:00Z",
    updatedAt: "2024-01-08T12:15:00Z",
  },
];

/**
 * Array of 5 mock audio assets
 * @type {Asset[]}
 */
export const mockAudioAssets = [
  {
    id: "audio-001",
    title: {
      locales: {
        en: "Audio Guide: Parthenon History",
        fr: "Guide Audio : Histoire du Parthénon",
      },
    },
    description: {
      locales: {
        en: "Professional audio guide narrating the complete history of the Parthenon, from its construction in 447 BCE to its current state, including its transformation through different periods.",
        fr: "Guide audio professionnel narrant l'histoire complète du Parthénon, de sa construction en 447 avant J.-C. à son état actuel, y compris sa transformation à travers différentes périodes.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        fr: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
    },
    filename: "parthenon_history_guide.mp3",
    landingPage: "https://acropolis-museum.gr/audio-guides",
    source: "https://commons.wikimedia.org/wiki/File:Parthenon_audio_guide.mp3",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    type: "audio",
    metadata: {
      duration: 480,
      format: "MP3",
      photographer: "Museum Audio Productions",
      capturedAt: "2023-10-15T14:00:00Z",
    },
    createdAt: "2024-01-22T10:30:00Z",
    updatedAt: "2024-01-22T10:30:00Z",
  },
  {
    id: "audio-002",
    title: {
      locales: {
        en: "Ancient Greek Music Reconstruction",
        fr: "Reconstruction de Musique Grecque Antique",
      },
    },
    description: {
      locales: {
        en: "Authentic reconstruction of ancient Greek music using period instruments and musical notation found on ancient tablets, performed by classical music scholars.",
        fr: "Reconstruction authentique de musique grecque antique utilisant des instruments d'époque et des notations musicales trouvées sur des tablettes anciennes, interprétée par des érudits en musique classique.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://www.soundjay.com/misc/sounds/wind-chimes-1.wav",
        fr: "https://www.soundjay.com/misc/sounds/wind-chimes-1.wav",
      },
    },
    filename: "ancient_greek_music_reconstruction.mp3",
    landingPage: "https://acropolis-museum.gr/ancient-music",
    source: "https://commons.wikimedia.org/wiki/File:Ancient_greek_music.mp3",
    url: "https://www.soundjay.com/misc/sounds/wind-chimes-1.wav",
    type: "audio",
    metadata: {
      duration: 360,
      format: "MP3",
      photographer: "Ancient Music Research Institute",
      capturedAt: "2023-09-28T16:30:00Z",
    },
    createdAt: "2024-01-20T11:15:00Z",
    updatedAt: "2024-01-20T11:15:00Z",
  },
  {
    id: "audio-003",
    title: {
      locales: {
        en: "Archaeologist Interview: Latest Discoveries",
        fr: "Entretien d'Archéologue : Dernières Découvertes",
      },
    },
    description: {
      locales: {
        en: "Exclusive interview with lead archaeologist Dr. Maria Stavros discussing recent discoveries around the Acropolis and their significance to our understanding of ancient Athens.",
        fr: "Entretien exclusif avec l'archéologue en chef Dr. Maria Stavros discutant des découvertes récentes autour de l'Acropole et de leur importance pour notre compréhension de l'Athènes antique.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://www.soundjay.com/misc/sounds/page-flip-01a.wav",
        fr: "https://www.soundjay.com/misc/sounds/page-flip-01a.wav",
      },
    },
    filename: "archaeologist_interview_discoveries.mp3",
    landingPage: "https://acropolis-museum.gr/expert-interviews",
    source:
      "https://commons.wikimedia.org/wiki/File:Archaeologist_interview.mp3",
    url: "https://www.soundjay.com/misc/sounds/page-flip-01a.wav",
    type: "audio",
    metadata: {
      duration: 1200,
      format: "MP3",
      photographer: "Heritage Radio Network",
      capturedAt: "2023-11-12T10:45:00Z",
    },
    createdAt: "2024-01-18T14:20:00Z",
    updatedAt: "2024-01-18T14:20:00Z",
  },
  {
    id: "audio-004",
    title: {
      locales: {
        en: "Ambient Sounds: Acropolis at Dawn",
        fr: "Sons Ambiants : Acropole à l'Aube",
      },
    },
    description: {
      locales: {
        en: "Immersive ambient audio recording capturing the natural sounds of the Acropolis at dawn - wind through ancient columns, distant city awakening, and bird songs.",
        fr: "Enregistrement audio ambiant immersif capturant les sons naturels de l'Acropole à l'aube - vent à travers les colonnes antiques, ville lointaine qui s'éveille et chants d'oiseaux.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://www.soundjay.com/nature/sounds/wind.wav",
        fr: "https://www.soundjay.com/nature/sounds/wind.wav",
      },
    },
    filename: "acropolis_dawn_ambient.mp3",
    landingPage: "https://acropolis-museum.gr/ambient-experiences",
    source: "https://commons.wikimedia.org/wiki/File:Acropolis_dawn_sounds.mp3",
    url: "https://www.soundjay.com/nature/sounds/wind.wav",
    type: "audio",
    metadata: {
      duration: 600,
      format: "MP3",
      photographer: "Athens Sound Recording Studio",
      capturedAt: "2023-06-21T05:45:00Z",
    },
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "audio-005",
    title: {
      locales: {
        en: "Poetry Reading: Ancient Greek Verses",
        fr: "Lecture de Poésie : Vers Grecs Anciens",
      },
    },
    description: {
      locales: {
        en: "Dramatic reading of ancient Greek poetry by renowned classical literature professor, featuring works by Homer, Sappho, and Pindar in original ancient Greek with English translation.",
        fr: "Lecture dramatique de poésie grecque antique par un professeur de littérature classique renommé, présentant des œuvres d'Homère, Sappho et Pindare en grec ancien original avec traduction anglaise.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://www.soundjay.com/misc/sounds/paper-flip-1.wav",
        fr: "https://www.soundjay.com/misc/sounds/paper-flip-1.wav",
      },
    },
    filename: "ancient_greek_poetry_reading.mp3",
    landingPage: "https://acropolis-museum.gr/literary-heritage",
    source: "https://commons.wikimedia.org/wiki/File:Greek_poetry_reading.mp3",
    url: "https://www.soundjay.com/misc/sounds/paper-flip-1.wav",
    type: "audio",
    metadata: {
      duration: 900,
      format: "MP3",
      photographer: "Classical Literature Society",
      capturedAt: "2023-08-05T19:15:00Z",
    },
    createdAt: "2024-01-10T15:45:00Z",
    updatedAt: "2024-01-10T15:45:00Z",
  },
];

/**
 * Array of 5 mock 3D model assets
 * @type {Asset[]}
 */
export const mockModelAssets = [
  {
    id: "model-001",
    title: {
      locales: {
        en: "3D Parthenon Complete Structure",
        fr: "Structure Complète du Parthénon 3D",
      },
    },
    description: {
      locales: {
        en: "High-detail 3D model of the complete Parthenon structure as it appeared in 447 BCE, featuring accurate architectural details, original colors, and decorative elements.",
        fr: "Modèle 3D haute définition de la structure complète du Parthénon tel qu'il apparaissait en 447 avant J.-C., avec des détails architecturaux précis, les couleurs d'origine et les éléments décoratifs.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://example.com/models/parthenon_complete.glb",
        fr: "https://example.com/models/parthenon_complete.glb",
      },
    },
    filename: "parthenon_complete_model.glb",
    landingPage: "https://acropolis-museum.gr/3d-models/parthenon",
    source: "https://commons.wikimedia.org/wiki/File:Parthenon_3D_model.glb",
    url: "https://example.com/models/parthenon_complete.glb",
    type: "3d",
    metadata: {
      format: "GLB",
      photographer: "Digital Heritage Lab",
      capturedAt: "2023-12-01T10:00:00Z",
    },
    createdAt: "2024-01-25T09:30:00Z",
    updatedAt: "2024-01-25T09:30:00Z",
  },
  {
    id: "model-002",
    title: {
      locales: {
        en: "3D Ionic Column Capital",
        fr: "Chapiteau de Colonne Ionique 3D",
      },
    },
    description: {
      locales: {
        en: "Detailed 3D scan of an authentic Ionic column capital from the Erechtheion, showcasing the intricate volutes and acanthus leaf decorations with museum-quality precision.",
        fr: "Scan 3D détaillé d'un chapiteau de colonne ionique authentique de l'Érechthéion, mettant en valeur les volutes complexes et les décorations de feuilles d'acanthe avec une précision de qualité muséale.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://example.com/models/ionic_capital.glb",
        fr: "https://example.com/models/ionic_capital.glb",
      },
    },
    filename: "ionic_capital_detailed.glb",
    landingPage: "https://acropolis-museum.gr/3d-models/ionic-capital",
    source: "https://commons.wikimedia.org/wiki/File:Ionic_capital_3D.glb",
    url: "https://example.com/models/ionic_capital.glb",
    type: "3d",
    metadata: {
      format: "GLB",
      photographer: "Archaeological 3D Scanning Unit",
      capturedAt: "2023-11-15T14:20:00Z",
    },
    createdAt: "2024-01-23T11:15:00Z",
    updatedAt: "2024-01-23T11:15:00Z",
  },
  {
    id: "model-003",
    title: {
      locales: {
        en: "3D Ancient Greek Amphora",
        fr: "Amphore Grecque Antique 3D",
      },
    },
    description: {
      locales: {
        en: "Meticulously reconstructed 3D model of a 5th century BCE red-figure amphora depicting scenes from Greek mythology, complete with authentic painting details and surface textures.",
        fr: "Modèle 3D méticuleusement reconstruit d'une amphore à figures rouges du Ve siècle avant J.-C. représentant des scènes de la mythologie grecque, avec des détails de peinture authentiques et des textures de surface.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://example.com/models/greek_amphora.glb",
        fr: "https://example.com/models/greek_amphora.glb",
      },
    },
    filename: "ancient_amphora_red_figure.glb",
    landingPage: "https://acropolis-museum.gr/3d-models/amphora",
    source: "https://commons.wikimedia.org/wiki/File:Greek_amphora_3D.glb",
    url: "https://example.com/models/greek_amphora.glb",
    type: "3d",
    metadata: {
      format: "GLB",
      photographer: "Museum Digital Archive Team",
      capturedAt: "2023-10-08T16:45:00Z",
    },
    createdAt: "2024-01-21T13:00:00Z",
    updatedAt: "2024-01-21T13:00:00Z",
  },
  {
    id: "model-004",
    title: {
      locales: {
        en: "3D Caryatid Statue from Erechtheion",
        fr: "Statue de Cariatide de l'Érechthéion 3D",
      },
    },
    description: {
      locales: {
        en: "High-fidelity 3D reproduction of one of the famous Caryatid statues from the Erechtheion, capturing every detail of the draped clothing and facial features of these architectural masterpieces.",
        fr: "Reproduction 3D haute fidélité de l'une des célèbres statues de Cariatides de l'Érechthéion, capturant chaque détail des vêtements drapés et des traits du visage de ces chefs-d'œuvre architecturaux.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://example.com/models/caryatid_statue.glb",
        fr: "https://example.com/models/caryatid_statue.glb",
      },
    },
    filename: "caryatid_erechtheion_statue.glb",
    landingPage: "https://acropolis-museum.gr/3d-models/caryatid",
    source: "https://commons.wikimedia.org/wiki/File:Caryatid_3D_model.glb",
    url: "https://example.com/models/caryatid_statue.glb",
    type: "3d",
    metadata: {
      format: "GLB",
      photographer: "Hellenic Ministry of Culture 3D Lab",
      capturedAt: "2023-09-20T12:30:00Z",
    },
    createdAt: "2024-01-19T10:45:00Z",
    updatedAt: "2024-01-19T10:45:00Z",
  },
  {
    id: "model-005",
    title: {
      locales: {
        en: "3D Parthenon Frieze Segment",
        fr: "Segment de la Frise du Parthénon 3D",
      },
    },
    description: {
      locales: {
        en: "Detailed 3D model of a section of the Parthenon frieze depicting the Panathenaic procession, showcasing the masterful relief carving techniques of ancient Greek sculptors.",
        fr: "Modèle 3D détaillé d'une section de la frise du Parthénon représentant la procession panathénaïque, mettant en valeur les techniques magistrales de sculpture en relief des sculpteurs grecs anciens.",
      },
    },
    contentUrl: {
      locales: {
        en: "https://example.com/models/parthenon_frieze.glb",
        fr: "https://example.com/models/parthenon_frieze.glb",
      },
    },
    filename: "parthenon_frieze_procession.glb",
    landingPage: "https://acropolis-museum.gr/3d-models/frieze",
    source: "https://commons.wikimedia.org/wiki/File:Parthenon_frieze_3D.glb",
    url: "https://example.com/models/parthenon_frieze.glb",
    type: "3d",
    metadata: {
      format: "GLB",
      photographer: "International Heritage Preservation Society",
      capturedAt: "2023-08-12T15:10:00Z",
    },
    createdAt: "2024-01-17T14:30:00Z",
    updatedAt: "2024-01-17T14:30:00Z",
  },
];

/**
 * Returns a random combination of mock assets (images, videos, audios, models).
 * @param {number} count
 * @returns {Asset[]}
 */
export function getMockAssets(count = 100) {
  const allAssets = [
    ...mockImageAssets,
    ...mockVideoAssets,
    ...mockAudioAssets,
    ...mockModelAssets,
  ];
  const shuffled = allAssets
    .map((asset) => ({ asset, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ asset }) => asset);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Returns a random combination of mock poi assets (images, videos, audios, models).
 * @param {number} count
 * @returns {PoiAsset[]}
 */
export function getMockPoiAssets(assets, count = 100) {
  let isModel3dIncluded = false;
  const poiAssets = getMockAssets(count).map((asset) => {
    const poiAsset = {
      ...asset,
      assetId: asset.id,
      priority: "normal",
      modelAssetAttributes: {},
    };
    if (asset.type === "3d") {
      poiAsset.modelAssetAttributes = { viewInAr: true };
      if (!isModel3dIncluded) {
        poiAsset.priority = "high";
        isModel3dIncluded = true;
      }
    }
    return poiAsset;
  });

  return poiAssets;
}
