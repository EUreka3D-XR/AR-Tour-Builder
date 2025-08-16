/**
 * @typedef {import('@/types/jsdoc-types').Tour} Tour
 */

import { getMockPois } from "./poisMocks.js";

/**
 * Array of 10 mock tours
 * @type {Tour[]}
 */
export const mockTours = [
  {
    id: "tour-001",
    title: {
      locales: {
        en: "Complete Acropolis Experience",
        fr: "Expérience Complète de l'Acropole",
      },
    },
    description: {
      locales: {
        en: "A comprehensive tour covering all major monuments of the Acropolis, including the Parthenon, Erechtheion, and surrounding temples with detailed historical context.",
        fr: "Une visite complète couvrant tous les monuments majeurs de l'Acropole, y compris le Parthénon, l'Érechthéion et les temples environnants avec un contexte historique détaillé.",
      },
    },
    thumbnail:
      "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&h=400&fit=crop",
    pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 180, // 3 hours
    distance: 1200, // 1.2 km
    coordinates: {
      lat: 37.9715,
      long: 23.7267,
    },
    boundBox: [
      { lat: 37.9693, long: 23.7196 },
      { lat: 37.9755, long: 23.7286 },
    ],
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-01-20T09:00:00Z",
  },
  {
    id: "tour-002",
    title: {
      locales: {
        en: "Ancient Theatres of Athens",
        fr: "Théâtres Antiques d'Athènes",
      },
    },
    description: {
      locales: {
        en: "Explore the birthplace of drama and theatre, visiting the Theatre of Dionysus and Odeon of Herodes Atticus with insights into ancient Greek performances.",
        fr: "Explorez le berceau du drame et du théâtre, en visitant le Théâtre de Dionysos et l'Odéon d'Hérode Atticus avec des aperçus des représentations grecques antiques.",
      },
    },
    thumbnail:
      "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&h=400&fit=crop",
    pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 120, // 2 hours
    distance: 800, // 800m
    coordinates: {
      lat: 37.9695,
      long: 23.7265,
    },
    boundBox: [
      { lat: 37.969, long: 23.724 },
      { lat: 37.97, long: 23.729 },
    ],
    createdAt: "2024-01-19T10:30:00Z",
    updatedAt: "2024-01-19T10:30:00Z",
  },
  {
    id: "tour-003",
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
    thumbnail:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 150, // 2.5 hours
    distance: 950, // 950m
    coordinates: {
      lat: 37.972,
      long: 23.725,
    },
    boundBox: [
      { lat: 37.971, long: 23.724 },
      { lat: 37.973, long: 23.727 },
    ],
    createdAt: "2024-01-18T14:15:00Z",
    updatedAt: "2024-01-18T14:15:00Z",
  },
  {
    id: "tour-004",
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
    thumbnail:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=400&fit=crop",
    pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 135, // 2.25 hours
    distance: 1100, // 1.1 km
    coordinates: {
      lat: 37.974,
      long: 23.722,
    },
    boundBox: [
      { lat: 37.972, long: 23.719 },
      { lat: 37.976, long: 23.725 },
    ],
    createdAt: "2024-01-17T11:45:00Z",
    updatedAt: "2024-01-17T11:45:00Z",
  },
  {
    id: "tour-005",
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
    thumbnail:
      "https://images.unsplash.com/photo-1594736797933-d0f06ba07c45?w=600&h=400&fit=crop",
    pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 165, // 2.75 hours
    distance: 1350, // 1.35 km
    coordinates: {
      lat: 37.971,
      long: 23.726,
    },
    boundBox: [
      { lat: 37.969, long: 23.719 },
      { lat: 37.976, long: 23.729 },
    ],
    createdAt: "2024-01-16T13:20:00Z",
    updatedAt: "2024-01-16T13:20:00Z",
  },
  {
    id: "tour-006",
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
    thumbnail:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 90, // 1.5 hours
    distance: 600, // 600m
    coordinates: {
      lat: 37.9715,
      long: 23.7267,
    },
    boundBox: [
      { lat: 37.971, long: 23.725 },
      { lat: 37.972, long: 23.728 },
    ],
    createdAt: "2024-01-15T16:30:00Z",
    updatedAt: "2024-01-15T16:30:00Z",
  },
  {
    id: "tour-007",
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
    thumbnail:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=600&h=400&fit=crop",
    pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "draft",
    duration: 195, // 3.25 hours
    distance: 1500, // 1.5 km
    coordinates: {
      lat: 37.973,
      long: 23.724,
    },
    boundBox: [
      { lat: 37.969, long: 23.719 },
      { lat: 37.977, long: 23.729 },
    ],
    createdAt: "2024-01-14T09:45:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "tour-008",
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
    thumbnail:
      "https://images.unsplash.com/photo-1571045034717-14cf9ffe1b69?w=600&h=400&fit=crop",
    pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 105, // 1.75 hours
    distance: 750, // 750m
    coordinates: {
      lat: 37.9705,
      long: 23.7255,
    },
    boundBox: [
      { lat: 37.9695, long: 23.724 },
      { lat: 37.972, long: 23.727 },
    ],
    createdAt: "2024-01-13T12:00:00Z",
    updatedAt: "2024-01-13T12:00:00Z",
  },
  {
    id: "tour-009",
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
    thumbnail:
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop",
    pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 170, // 2.83 hours
    distance: 900, // 900m
    coordinates: {
      lat: 37.9718,
      long: 23.7263,
    },
    boundBox: [
      { lat: 37.971, long: 23.725 },
      { lat: 37.9725, long: 23.7275 },
    ],
    createdAt: "2024-01-12T15:15:00Z",
    updatedAt: "2024-01-12T15:15:00Z",
  },
  {
    id: "tour-010",
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
    thumbnail:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    pois: getMockPois(Math.floor(Math.random() * 6) + 5), // Random 5-10
    status: "published",
    duration: 125, // 2.08 hours
    distance: 1000, // 1 km
    coordinates: {
      lat: 37.9722,
      long: 23.7245,
    },
    boundBox: [
      { lat: 37.97, long: 23.722 },
      { lat: 37.9745, long: 23.727 },
    ],
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
