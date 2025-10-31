/**
 * @typedef {import('@/types/jsdoc-types').Tour} Tour
 */

import { getGithubBaseUrl } from "./assetsMocks";

// import { getMockPois } from "./poisMocks.js";

/**
 * Array of 10 mock tours
 * @type {Tour[]}
 */
export const mockTours = [
  {
    // id: "tour-001",
    title: {
      locales: {
        en: "Bibracte Highlights",
        fr: "Points Forts de Bibracte",
      },
    },
    description: {
      locales: {
        en: "A comprehensive tour covering all major monuments of Bibracte, including the PC2 domus, PC14 enclosure, and surrounding sites with detailed historical context.",
        fr: "Une visite complète couvrant tous les monuments majeurs de Bibracte, y compris la domus PC2, l'enclos PC14 et les sites environnants avec un contexte historique détaillé.",
      },
    },
    thumbnail: getGithubBaseUrl("tour_thumbnails/Tour1_Thumbnail.jpg"),
    // pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 180, // 3 hours
    distance: 1200, // 1.2 km
    guided: true,
    coordinates: {
      lat: 37.9715,
      long: 23.7275,
    },
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-01-20T09:00:00Z",
  },
  {
    // id: "tour-002",
    title: {
      locales: {
        en: "Bibracte Entrance Monuments Tour",
        fr: "Visite des Monuments d'Entrée de Bibracte",
      },
    },
    description: {
      locales: {
        en: "Explore the entrance monuments of Bibracte, including the impressive gates and fortifications that once protected this ancient site.",
        fr: "Explorez les monuments d'entrée de Bibracte, y compris les impressionnantes portes et fortifications qui protégeaient autrefois ce site antique.",
      },
    },
    thumbnail: getGithubBaseUrl("tour_thumbnails/Tour2_Thumbnail.jpg"),
    // pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 120, // 2 hours
    distance: 800, // 800m
    guided: false,
    coordinates: {
      lat: 37.9689,
      long: 23.7248,
    },
    createdAt: "2024-01-19T10:30:00Z",
    updatedAt: "2024-01-19T10:30:00Z",
  },
  {
    // id: "tour-003",
    title: {
      locales: {
        en: "Sacred Architecture Journey",
        fr: "Voyage d'Architecture Sacrée",
      },
    },
    description: {
      locales: {
        en: "A focused tour on the religious and architectural significance of ancient Greek temples, exploring different architectural orders and their meanings.",
        fr: "Une visite axée sur la signification religieuse et architecturale des temples grecs antiques, explorant différents ordres architecturaux et leurs significations.",
      },
    },
    thumbnail: getGithubBaseUrl("tour_thumbnails/Tour3_Thumbnail.jpg"),
    // pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 150, // 2.5 hours
    distance: 950, // 950m
    guided: false,
    coordinates: {
      lat: 37.9735,
      long: 23.7272,
    },
    createdAt: "2024-01-18T14:15:00Z",
    updatedAt: "2024-01-18T14:15:00Z",
  },
  {
    // id: "tour-004",
    title: {
      locales: {
        en: "Democracy and Politics in Ancient Athens",
        fr: "Démocratie et Politique dans l'Athènes Antique",
      },
    },
    description: {
      locales: {
        en: "Discover the birthplace of democracy by visiting the Ancient Agora, Areopagus Hill, and other sites where ancient Athenian politics took shape.",
        fr: "Découvrez le berceau de la démocratie en visitant l'Agora antique, la colline de l'Aréopage et d'autres sites où la politique athénienne antique a pris forme.",
      },
    },
    thumbnail: getGithubBaseUrl("tour_thumbnails/Tour2_Thumbnail.jpg"),
    // pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 135, // 2.25 hours
    distance: 1100, // 1.1 km
    guided: false,
    coordinates: {
      lat: 37.9678,
      long: 23.73,
    },
    createdAt: "2024-01-17T11:45:00Z",
    updatedAt: "2024-01-17T11:45:00Z",
  },
  {
    // id: "tour-005",
    title: {
      locales: {
        en: "Mythology and Legends Tour",
        fr: "Tour de Mythologie et Légendes",
      },
    },
    description: {
      locales: {
        en: "Journey through ancient Greek mythology by visiting sites connected to gods, goddesses, and legendary heroes of Athens.",
        fr: "Voyage à travers la mythologie grecque antique en visitant des sites liés aux dieux, déesses et héros légendaires d'Athènes.",
      },
    },
    thumbnail: getGithubBaseUrl("tour_thumbnails/Tour1_Thumbnail.jpg"),
    // pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 165, // 2.75 hours
    distance: 1350, // 1.35 km
    guided: false,
    coordinates: {
      lat: 37.9752,
      long: 23.7223,
    },
    createdAt: "2024-01-16T13:20:00Z",
    updatedAt: "2024-01-16T13:20:00Z",
  },
  {
    // id: "tour-006",
    title: {
      locales: {
        en: "Sunrise at the Acropolis",
        fr: "Lever de Soleil à l'Acropole",
      },
    },
    description: {
      locales: {
        en: "Experience the magic of sunrise at the Acropolis with early morning access to witness the golden light illuminating ancient marble.",
        fr: "Vivez la magie du lever du soleil à l'Acropole avec un accès matinal pour voir la lumière dorée illuminer le marbre antique.",
      },
    },
    thumbnail: getGithubBaseUrl("tour_thumbnails/Tour3_Thumbnail.jpg"),
    // pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 90, // 1.5 hours
    distance: 600, // 600m
    coordinates: {
      lat: 37.9701,
      long: 23.7205,
    },
    createdAt: "2024-01-15T16:30:00Z",
    updatedAt: "2024-01-15T16:30:00Z",
  },
  {
    // id: "tour-007",
    title: {
      locales: {
        en: "Archaeological Discoveries Walk",
        fr: "Promenade des Découvertes Archéologiques",
      },
    },
    description: {
      locales: {
        en: "Follow the footsteps of archaeologists and learn about recent discoveries, excavation techniques, and ongoing research in the area.",
        fr: "Suivez les traces des archéologues et apprenez les découvertes récentes, les techniques d'excavation et la recherche en cours dans la région.",
      },
    },
    thumbnail: getGithubBaseUrl("tour_thumbnails/Tour1_Thumbnail.jpg"),
    // pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "draft",
    duration: 195, // 3.25 hours
    distance: 1500, // 1.5 km
    coordinates: {
      lat: 37.9699,
      long: 23.7288,
    },
    createdAt: "2024-01-14T09:45:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
  },
  {
    // id: "tour-008",
    title: {
      locales: {
        en: "Family-Friendly Ancient Adventure",
        fr: "Aventure Antique Familiale",
      },
    },
    description: {
      locales: {
        en: "An engaging tour designed for families with children, featuring interactive storytelling and hands-on activities to bring ancient history to life.",
        fr: "Une visite engageante conçue pour les familles avec enfants, avec des récits interactifs et des activités pratiques pour donner vie à l'histoire ancienne.",
      },
    },
    thumbnail: getGithubBaseUrl("tour_thumbnails/Tour2_Thumbnail.jpg"),
    // pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 105, // 1.75 hours
    distance: 750, // 750m
    coordinates: {
      lat: 37.9748,
      long: 23.7249,
    },
    createdAt: "2024-01-13T12:00:00Z",
    updatedAt: "2024-01-13T12:00:00Z",
  },
  {
    // id: "tour-009",
    title: {
      locales: {
        en: "Art and Sculpture Masterpieces",
        fr: "Chefs-d'œuvre d'Art et de Sculpture",
      },
    },
    description: {
      locales: {
        en: "Focus on the artistic achievements of ancient Greece, exploring sculptures, friezes, and architectural decorations with expert art historical commentary.",
        fr: "Focus sur les réalisations artistiques de la Grèce antique, explorant sculptures, frises et décorations architecturales avec des commentaires d'expert en histoire de l'art.",
      },
    },
    thumbnail: getGithubBaseUrl("tour_thumbnails/Tour3_Thumbnail.jpg"),
    // pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 170, // 2.83 hours
    distance: 900, // 900m
    coordinates: {
      lat: 37.9729,
      long: 23.7236,
    },
    createdAt: "2024-01-12T15:15:00Z",
    updatedAt: "2024-01-12T15:15:00Z",
  },
  {
    // id: "tour-010",
    title: {
      locales: {
        en: "Evening Photography Tour",
        fr: "Tour de Photographie du Soir",
      },
    },
    description: {
      locales: {
        en: "Perfect for photography enthusiasts, this evening tour captures the golden hour and blue hour lighting at the most photogenic spots around the Acropolis.",
        fr: "Parfait pour les passionnés de photographie, cette visite du soir capture l'éclairage de l'heure dorée et de l'heure bleue aux endroits les plus photogéniques autour de l'Acropole.",
      },
    },
    thumbnail: getGithubBaseUrl("tour_thumbnails/Tour1_Thumbnail.jpg"),
    // pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 125, // 2.08 hours
    distance: 1000, // 1 km
    coordinates: {
      lat: 37.976,
      long: 23.7278,
    },
    createdAt: "2024-01-11T17:30:00Z",
    updatedAt: "2024-01-11T17:30:00Z",
  },
];

/**
 * Get a random selection of mock tours
 * @param {number} count - Number of tours to return
 * @returns {Tour[]}
 */
export function getMockTours(count) {
  const allTours = [...mockTours];
  const shuffled = allTours
    .map((tour) => ({ tour, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ tour }) => tour);
  return shuffled.slice(0, count);
}
