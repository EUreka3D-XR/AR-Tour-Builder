/**
 * @typedef {import('@/types/jsdoc-types').Poi} Poi
 */

const getGithubBaseUrl = (filePath) =>
  // "https://raw.githubusercontent.com/leomav/demo-assets/main/" + filePath;
  "https://leomav.github.io/demo-assets/" + filePath;

// import { getMockAssets } from "./assetsMocks.js";

/**
 * Array of 10 mock POIs
 * @type {Poi[]}
 */
export const mockPOIs = [
  {
    id: "poi-001",
    title: {
      locales: {
        en: "The PC2 domus",
        fr: "La domus PC2",
      },
    },
    description: {
      locales: {
        en: "Built on nearly 1,500 m2 during the last days of the oppidum, this house is organized according to a typically Roman plan, like many prestigious residences of Bibracte. It stands out, however, for the mastery and care taken in its construction. Built on a vast artificial terrace, it rests on imposing masonry foundations that have allowed the preservation of remains prior to its construction. Its extensive exploration, undertaken since 2016 by the Bibracte school site, reveals a complex stratigraphic scenario that spans the entire duration of the 1st century BC…",
        fr: "Construite sur près de 1 500 m2 durant les derniers temps de l’oppidum, cette maison est organisée selon un plan typiquement romain, à l’instar de nombreuses demeures de prestige de Bibracte. Elle s’en démarque cependant par la maîtrise et le soin portés à sa construction. Édifiée sur une vaste terrasse artificielle, elle repose sur d’imposants soubassements maçonnés qui ont permis la conservation de vestiges antérieurs à sa construction. Son exploration extensive, engagée depuis 2016 par le chantier école de Bibracte, révèle un scénario stratigraphique complexe qui s’échelonne sur toute la durée du Ier siècle avant notre ère…",
      },
    },
    coordinates: {
      lat: 46.92406,
      long: 4.03447,
    },
    thumbnail: getGithubBaseUrl("pc14/PC14_Thumbnail.jpg"),
    // assets: getMockAssets(Math.floor(Math.random() * 5) + 4), // Random 4-8
    externalLinks: {
      locales: {
        en: [
          {
            title: "UNESCO World Heritage",
            url: "https://whc.unesco.org/en/list/404",
          },
        ],
        fr: [
          {
            title: "Patrimoine mondial de l'UNESCO",
            url: "https://whc.unesco.org/en/list/404",
          },
        ],
      },
    },
    quizLinks: {
      locales: {
        en: [
          {
            title: "Parthenon Architecture Quiz",
            url: "https://example.com/quiz/parthenon",
          },
        ],
        fr: [
          {
            title: "Quiz sur l'architecture du Parthénon",
            url: "https://example.com/quiz/parthenon",
          },
        ],
      },
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "poi-002",
    title: {
      locales: {
        en: "The PC14 enclosure",
        fr: "L’enclos PC14",
      },
    },
    description: {
      locales: {
        en: "PC 14 forms a large artificial terrace, 80 m long and of unknown width, whose precise purpose eludes us. It belongs to the last developments in this sector, contemporary with the last restructuring of the neighboring platform PC15, at the end of the 1st century BC. It yielded a large number of remains, including an amphorae dumping pit that you can discover in 3D and several stampswhich indicate the name of the wine producer or the amphora maker. The example presented here, also in 3D, is one of more than 1,000 stamps of Dressel 1 type wine amphorae. This is the largest collection recorded in the Roman world for this type of amphora! This bears witness to the importance of wine in Bibracte, which was the hub of this trade between the Saône, the Loire and the Seine.",
        fr: "PC 14 forme une grande terrasse artificielle longue de 80 m et de largeur inconnue, dont la destination précise nous échappe. Elle appartient aux derniers aménagements de ce secteur, contemporains de la dernière restructuration de la plateforme voisine PC15, à la fin du Ier siècle avant notre ère. Elle a livré un grand nombre de vestige, dont une fosse dépotoir d’amphores que vous pouvez découvrir en 3D et plusieurs timbres qui indiquent le nom du producteur du vin ou celui du fabriquant de l’amphore. L’exemplaires présentés ici, également en 3D, fait partie des plus de 1000 timbres d’amphores à vin de type Dressel 1. C’est la plus importante collection recensée à l’échelle du monde romain pour ce type d’amphore ! Ce qui témoignent de l’importance du vin à Bibracte, qui était la plaque tournante de ce commerce entre la Saône, la Loire et la Seine.",
      },
    },
    coordinates: {
      lat: 46.92633,
      long: 4.03447,
    },
    thumbnail: getGithubBaseUrl("pc2/PC2_Thumbnail.jpg"),
    // assets: getMockAssets(Math.floor(Math.random() * 5) + 4), // Random 4-8
    externalLinks: {
      locales: {
        en: [
          {
            title: "Ancient History Encyclopedia",
            url: "https://www.worldhistory.org/Erechtheion/",
          },
        ],
        fr: [
          {
            title: "Encyclopédie d'Histoire Ancienne",
            url: "https://www.worldhistory.org/Erechtheion/",
          },
        ],
      },
    },
    quizLinks: {
      locales: {
        en: [
          {
            title: "Caryatids Knowledge Test",
            url: "https://example.com/quiz/caryatids",
          },
        ],
        fr: [
          {
            title: "Test de Connaissance sur les Cariatides",
            url: "https://example.com/quiz/caryatids",
          },
        ],
      },
    },
    createdAt: "2024-01-14T11:30:00Z",
    updatedAt: "2024-01-14T11:30:00Z",
  },
  {
    id: "poi-003",
    title: {
      locales: {
        en: "PC15",
        fr: "PC15",
      },
    },
    description: {
      locales: {
        en: "PC 15 was an exceptional architectural ensemble. Rebuilt several times, it initially took the form of a square courtyard surrounded by a gallery, before an imposing central building replaced them. In its final form, stone replaced wood, including in the boundary wall. This is undoubtedly Bibracte's first public space, which operated until the town was abandoned.",
        fr: "PC 15 était un ensemble architectural exceptionnel. Reconstruit plusieurs fois, il prend d'abord la forme d'une cour carrée entourée d’une galerie, avant qu'un bâtiment central imposant ne les remplace. Dans le dernier état, la pierre se substitue au bois, y compris dans le mur de clôture. Il faut sans doute voir ici le premier espace public de Bibracte, qui fonctionna jusqu'à l'abandon de la ville.",
      },
    },
    coordinates: {
      lat: 46.926887,
      long: 4.032669,
    },
    thumbnail: getGithubBaseUrl("pc15/PC15_Thumbnail.jpg"),
    // assets: getMockAssets(Math.floor(Math.random() * 5) + 4), // Random 4-8
    externalLinks: {
      locales: {
        en: [
          {
            title: "Greek Ministry of Culture",
            url: "https://www.culture.gr/en/monument/SitePages/view.aspx?nID=1348",
          },
        ],
        fr: [
          {
            title: "Ministère grec de la Culture",
            url: "https://www.culture.gr/en/monument/SitePages/view.aspx?nID=1348",
          },
        ],
      },
    },
    quizLinks: {
      locales: {
        en: [
          {
            title: "Victory Goddess Quiz",
            url: "https://example.com/quiz/athena-nike",
          },
        ],
        fr: [
          {
            title: "Quiz sur la Déesse de la Victoire",
            url: "https://example.com/quiz/athena-nike",
          },
        ],
      },
    },
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
  },
  {
    id: "poi-004",
    title: {
      locales: {
        en: "The Rock of the Wire",
        fr: "The Rock of the Wire",
      },
    },
    description: {
      locales: {
        en: "This is one of the oldest preserved photographs of Mount Beuvray, whose excavations received little attention from photographers before the very end of the 19th century. The old view invites us to remove the curtain of conifers to discover the vast panorama towards Mount Préneley, whose slope visible in the background was almost entirely cultivated in the 19th century, whereas it has now almost completely reverted to forest. The open space in the foreground is characteristic of the basic maintenance of the rangelands occupying the peaks of the Morvan, where herds found occasional pasture.",
        fr: "Il s’agit d’un des plus anciens clichés conservés du mont Beuvray, dont les fouilles ont peu bénéficié de l’attention des photographes avant la toute fin du XIXe siècle. La vue ancienne invite à supprimer le rideau de résineux pour retrouver le vaste panorama vers le mont Préneley dont le versant visible à l’arrière-plan était presque entièrement cultivé au XIXe siècle, alors qu’il est quasi complètement retourné à la forêt. L’espace ouvert du premier plan est caractéristique de l’entretien sommaire des terrains de parcours occupant les sommets du Morvan, où les troupeaux trouvaient un pâturage occasionnel.",
      },
    },
    coordinates: {
      lat: 46.9318528,
      long: 4.0357166,
    },
    thumbnail: getGithubBaseUrl("rock_of_the_wivre/Wivre_Rock_Thumbnail.jpg"),
    // assets: getMockAssets(Math.floor(Math.random() * 5) + 4), // Random 4-8
    externalLinks: {
      locales: {
        en: [
          {
            title: "Acropolis Museum",
            url: "https://www.theacropolismuseum.gr/en/propylaia",
          },
        ],
        fr: [
          {
            title: "Musée de l'Acropole",
            url: "https://www.theacropolismuseum.gr/en/propylaia",
          },
        ],
      },
    },
    quizLinks: {
      locales: {
        en: [
          {
            title: "Ancient Gateways Quiz",
            url: "https://example.com/quiz/propylaea",
          },
        ],
        fr: [
          {
            title: "Quiz sur les Portails Anciens",
            url: "https://example.com/quiz/propylaea",
          },
        ],
      },
    },
    createdAt: "2024-01-12T14:45:00Z",
    updatedAt: "2024-01-12T14:45:00Z",
  },
  {
    id: "poi-005",
    title: {
      locales: {
        en: "The Theurot de la Roche",
        fr: "Le Theurot de la Roche",
      },
    },
    description: {
      locales: {
        en: "This rocky hillock was once the site of significant mining activity. This is evidenced by two extraction shafts approximately 8 m deep, dug in steps into the rock to extract silver ore. They are now filled in, but you can explore the depths of one of them using its 3D model. This discovery, and that of another silver mine on the oppidum, has raised questions on potential outlets of this silver production by the inhabitants of Bibracte. The study of Aedui coins and the discovery of at least two monetary dies on the site suggest that a monetary workshop operated on the very site of Bibracte.",
        fr: "Cette butte rocheuse a été le terrain d’une activité minière importante. En attestent deux puits d'extraction profonds d'environ 8 m qui ont été creusés en gradins dans la roche pour extraire du minerai d’argent. Ils sont aujourd’hui comblés mais vous pouvez explorer les profondeurs de l’un d’eux grâce à son modèle 3D. Cette découverte, et celle d’une autre minière d’argent sur l’oppidum, a permis de s’interroger sur les débouchés potentiels de cette production d’argent par les habitants de Bibracte. L’étude des monnaies éduennes et la découverte d’au moins deux coins monétaires sur le site suggèrent qu’un atelier monétaire a fonctionné sur le site même de Bibracte.",
      },
    },
    coordinates: {
      lat: 46.92678,
      long: 4.03221,
    },
    thumbnail: getGithubBaseUrl("theurot_mines/Theurot_Tumbnail.jpg"),
    // assets: getMockAssets(Math.floor(Math.random() * 5) + 4), // Random 4-8
    externalLinks: {
      locales: {
        en: [
          {
            title: "Ancient Theatre Archive",
            url: "https://www.ancient-theatre.com/greece/athens-theatre-dionysus",
          },
        ],
        fr: [
          {
            title: "Archives du Théâtre Ancien",
            url: "https://www.ancient-theatre.com/greece/athens-theatre-dionysus",
          },
        ],
      },
    },
    quizLinks: {
      locales: {
        en: [
          {
            title: "Greek Drama Quiz",
            url: "https://example.com/quiz/dionysus-theatre",
          },
        ],
        fr: [
          {
            title: "Quiz sur le Drame Grec",
            url: "https://example.com/quiz/dionysus-theatre",
          },
        ],
      },
    },
    createdAt: "2024-01-11T16:20:00Z",
    updatedAt: "2024-01-11T16:20:00Z",
  },
  {
    id: "poi-006",
    title: {
      locales: {
        en: "Odeon of Herodes Atticus",
        fr: "Odéon d'Hérode Atticus",
      },
    },
    description: {
      locales: {
        en: "The Odeon of Herodes Atticus is a stone Roman theatre structure located on the southwest slope of the Acropolis, still used for performances today.",
        fr: "L'Odéon d'Hérode Atticus est une structure de théâtre romain en pierre située sur le versant sud-ouest de l'Acropole, encore utilisée pour des représentations aujourd'hui.",
      },
    },
    coordinates: {
      lat: 46.92306,
      long: 4.03347,
    },
    thumbnail: getGithubBaseUrl("pc14/PC14_Thumbnail.jpg"),
    // assets: getMockAssets(Math.floor(Math.random() * 5) + 4), // Random 4-8
    externalLinks: {
      locales: {
        en: [
          {
            title: "Athens Festival",
            url: "https://www.greekfestival.gr/en/venues/odeon-herodes-atticus",
          },
        ],
        fr: [
          {
            title: "Festival d'Athènes",
            url: "https://www.greekfestival.gr/en/venues/odeon-herodes-atticus",
          },
        ],
      },
    },
    quizLinks: {
      locales: {
        en: [
          {
            title: "Roman Architecture Quiz",
            url: "https://example.com/quiz/odeon",
          },
        ],
        fr: [
          {
            title: "Quiz sur l'Architecture Romaine",
            url: "https://example.com/quiz/odeon",
          },
        ],
      },
    },
    createdAt: "2024-01-10T12:30:00Z",
    updatedAt: "2024-01-10T12:30:00Z",
  },
  {
    id: "poi-007",
    title: {
      locales: {
        en: "Areopagus Hill",
        fr: "Colline de l'Aréopage",
      },
    },
    description: {
      locales: {
        en: "The Areopagus is a prominent rock outcropping located northwest of the Acropolis, historically the meeting place of the Athenian council.",
        fr: "L'Aréopage est un affleurement rocheux proéminent situé au nord-ouest de l'Acropole, historiquement le lieu de réunion du conseil athénien.",
      },
    },
    coordinates: {
      lat: 46.92206,
      long: 4.03247,
    },
    thumbnail: getGithubBaseUrl("pc2/PC2_Thumbnail.jpg"),
    // assets: getMockAssets(Math.floor(Math.random() * 5) + 4), // Random 4-8
    externalLinks: {
      locales: {
        en: [
          {
            title: "Ancient Agora Museum",
            url: "https://www.agathe.gr/areopagus.html",
          },
        ],
        fr: [
          {
            title: "Musée de l'Agora Antique",
            url: "https://www.agathe.gr/areopagus.html",
          },
        ],
      },
    },
    quizLinks: {
      locales: {
        en: [
          {
            title: "Ancient Democracy Quiz",
            url: "https://example.com/quiz/areopagus",
          },
        ],
        fr: [
          {
            title: "Quiz sur la Démocratie Ancienne",
            url: "https://example.com/quiz/areopagus",
          },
        ],
      },
    },
    createdAt: "2024-01-09T08:45:00Z",
    updatedAt: "2024-01-09T08:45:00Z",
  },
  {
    id: "poi-008",
    title: {
      locales: {
        en: "Ancient Agora of Athens",
        fr: "Agora Antique d'Athènes",
      },
    },
    description: {
      locales: {
        en: "The Ancient Agora of Athens was the heart of ancient Athens, the focus of political, commercial, administrative and social activity.",
        fr: "L'Agora antique d'Athènes était le cœur de l'Athènes antique, le centre de l'activité politique, commerciale, administrative et sociale.",
      },
    },
    coordinates: {
      lat: 46.93206,
      long: 4.04247,
    },
    thumbnail: getGithubBaseUrl("pc15/PC15_Thumbnail.jpg"),
    // assets: getMockAssets(Math.floor(Math.random() * 5) + 4), // Random 4-8
    externalLinks: {
      locales: {
        en: [
          {
            title: "American School of Classical Studies",
            url: "https://www.agathe.gr/",
          },
        ],
        fr: [
          {
            title: "École Américaine d'Études Classiques",
            url: "https://www.agathe.gr/",
          },
        ],
      },
    },
    quizLinks: {
      locales: {
        en: [
          {
            title: "Ancient Marketplace Quiz",
            url: "https://example.com/quiz/agora",
          },
        ],
        fr: [
          {
            title: "Quiz sur le Marché Ancien",
            url: "https://example.com/quiz/agora",
          },
        ],
      },
    },
    createdAt: "2024-01-08T13:15:00Z",
    updatedAt: "2024-01-08T13:15:00Z",
  },
  {
    id: "poi-009",
    title: {
      locales: {
        en: "Temple of Hephaestus",
        fr: "Temple d'Héphaïstos",
      },
    },
    description: {
      locales: {
        en: "The Temple of Hephaestus is a well-preserved Greek temple dedicated to Hephaestus, the ancient Greek god of fire and metalworking.",
        fr: "Le Temple d'Héphaïstos est un temple grec bien conservé dédié à Héphaïstos, l'ancien dieu grec du feu et de la métallurgie.",
      },
    },
    coordinates: {
      lat: 46.93606,
      long: 4.02247,
    },
    thumbnail: getGithubBaseUrl("rock_of_the_wivre/Wivre_Rock_Thumbnail.jpg"),
    // assets: getMockAssets(Math.floor(Math.random() * 5) + 4), // Random 4-8
    externalLinks: {
      locales: {
        en: [
          {
            title: "Hellenic Ministry of Culture",
            url: "https://www.culture.gr/en/monument/SitePages/view.aspx?nID=1347",
          },
        ],
        fr: [
          {
            title: "Ministère Hellénique de la Culture",
            url: "https://www.culture.gr/en/monument/SitePages/view.aspx?nID=1347",
          },
        ],
      },
    },
    quizLinks: {
      locales: {
        en: [
          {
            title: "Greek Gods Quiz",
            url: "https://example.com/quiz/hephaestus",
          },
        ],
        fr: [
          {
            title: "Quiz sur les Dieux Grecs",
            url: "https://example.com/quiz/hephaestus",
          },
        ],
      },
    },
    createdAt: "2024-01-07T15:00:00Z",
    updatedAt: "2024-01-07T15:00:00Z",
  },
  {
    id: "poi-010",
    title: {
      locales: {
        en: "Stoa of Attalos",
        fr: "Stoa d'Attale",
      },
    },
    description: {
      locales: {
        en: "The Stoa of Attalos was a covered walkway or portico in the Ancient Agora of Athens, reconstructed and now houses the Museum of the Ancient Agora.",
        fr: "La Stoa d'Attale était une promenade couverte ou un portique dans l'Agora antique d'Athènes, reconstruit et abrite maintenant le Musée de l'Agora antique.",
      },
    },
    coordinates: {
      lat: 46.92606,
      long: 4.02347,
    },
    thumbnail: getGithubBaseUrl("theurot_mines/Theurot_Tumbnail.jpg"),
    // assets: getMockAssets(Math.floor(Math.random() * 5) + 4), // Random 4-8
    externalLinks: {
      locales: {
        en: [
          { title: "Agora Museum", url: "https://www.agathe.gr/museum.html" },
        ],
        fr: [
          {
            title: "Musée de l'Agora",
            url: "https://www.agathe.gr/museum.html",
          },
        ],
      },
    },
    quizLinks: {
      locales: {
        en: [
          {
            title: "Ancient Architecture Quiz",
            url: "https://example.com/quiz/stoa",
          },
        ],
        fr: [
          {
            title: "Quiz sur l'Architecture Ancienne",
            url: "https://example.com/quiz/stoa",
          },
        ],
      },
    },
    createdAt: "2024-01-06T10:30:00Z",
    updatedAt: "2024-01-06T10:30:00Z",
  },
];

/**
 * Returns a random combination of mock points of interest (POIs).
 * @param {number} count
 * @returns {Poi[]}
 */
export function getMockPois(count) {
  const allPois = [...mockPOIs];
  const shuffled = allPois
    .map((poi) => ({ poi, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ poi }) => poi);
  return shuffled.slice(0, count);
}
