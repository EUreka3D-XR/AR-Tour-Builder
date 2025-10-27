/**
 * @typedef {import('@/types/jsdoc-types').Poi} Poi
 */

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
        en: "The Parthenon",
        fr: "Le Parthénon",
      },
    },
    description: {
      locales: {
        en: "The Parthenon is a former temple on the Athenian Acropolis, Greece, dedicated to the goddess Athena, whom the people of Athens considered their patron.",
        fr: "Le Parthénon est un ancien temple de l'Acropole d'Athènes, en Grèce, dédié à la déesse Athéna, que les Athéniens considéraient comme leur patronne.",
      },
    },
    coordinates: {
      lat: 37.9715,
      long: 23.7267,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&h=300&fit=crop",
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
        en: "The Erechtheion",
        fr: "L'Érechthéion",
      },
    },
    description: {
      locales: {
        en: "The Erechtheion is an ancient Greek temple on the north side of the Acropolis, famous for its Caryatid porch.",
        fr: "L'Érechthéion est un ancien temple grec du côté nord de l'Acropole, célèbre pour son portique des Cariatides.",
      },
    },
    coordinates: {
      lat: 37.9721,
      long: 23.7262,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
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
        en: "Temple of Athena Nike",
        fr: "Temple d'Athéna Niké",
      },
    },
    description: {
      locales: {
        en: "The Temple of Athena Nike is a temple on the Acropolis of Athens, dedicated to the goddesses Athena and Nike.",
        fr: "Le temple d'Athéna Niké est un temple de l'Acropole d'Athènes, dédié aux déesses Athéna et Niké.",
      },
    },
    coordinates: {
      lat: 37.9712,
      long: 23.7255,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1594736797933-d0f06ba07c45?w=400&h=300&fit=crop",
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
        en: "Propylaea",
        fr: "Propylées",
      },
    },
    description: {
      locales: {
        en: "The Propylaea is the classical Greek Doric building complex that functioned as the monumental ceremonial gateway to the Acropolis.",
        fr: "Les Propylées sont le complexe de bâtiments doriques grecs classiques qui servait d'entrée cérémonielle monumentale à l'Acropole.",
      },
    },
    coordinates: {
      lat: 37.9718,
      long: 23.7248,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
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
        en: "Theatre of Dionysus",
        fr: "Théâtre de Dionysos",
      },
    },
    description: {
      locales: {
        en: "The Theatre of Dionysus is an ancient Greek theatre built on the south slope of the Acropolis hill, considered the world's first theatre.",
        fr: "Le Théâtre de Dionysos est un ancien théâtre grec construit sur le versant sud de la colline de l'Acropole, considéré comme le premier théâtre du monde.",
      },
    },
    coordinates: {
      lat: 37.9697,
      long: 23.7286,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
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
      lat: 37.9693,
      long: 23.7244,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1571045034717-14cf9ffe1b69?w=400&h=300&fit=crop",
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
      lat: 37.9729,
      long: 23.7221,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=300&fit=crop",
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
      lat: 37.9753,
      long: 23.7214,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop",
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
      lat: 37.9755,
      long: 23.7196,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
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
      lat: 37.9748,
      long: 23.7225,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
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
