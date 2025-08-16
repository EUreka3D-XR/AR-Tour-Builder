/**
 * @typedef {import('@/types/jsdoc-types').Project} Project
 */

// import { getMockTours } from "./toursMocks.js";

/**
 * Array of mock projects
 * @type {Project[]}
 */
export const mockProjects = [
  {
    id: "1",
    title: {
      locales: {
        en: "Ancient Athens Acropolis",
        fr: "Acropole d'Athènes antique",
      },
    },
    description: {
      locales: {
        en: "Explore the iconic Acropolis of Athens, featuring the Parthenon and other ancient Greek monuments that showcase classical architecture and history.",
        fr: "Explorez l'iconique Acropole d'Athènes, avec le Parthénon et d'autres monuments grecs anciens qui mettent en valeur l'architecture et l'histoire classiques.",
      },
    },
    thumbnail:
      "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&h=250&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&h=600&fit=crop",
    // tours: getMockTours(Math.floor(Math.random() * 3) + 1), // Random 1-3
    totalTours: 5,
    totalPois: 12,
    totalAssets: 34,
    status: "published",
    lastUpdated: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: {
      locales: {
        en: "Roman Forum Discovery",
        fr: "Découverte du Forum Romain",
      },
    },
    description: {
      locales: {
        en: "Journey through the heart of ancient Rome, discovering the ruins of temples, basilicas, and public spaces that once formed the center of the Roman Empire.",
        fr: "Voyagez au cœur de la Rome antique, découvrant les ruines de temples, basiliques et espaces publics qui formaient autrefois le centre de l'Empire romain.",
      },
    },
    thumbnail:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&h=600&fit=crop",
    // tours: getMockTours(Math.floor(Math.random() * 3) + 1), // Random 1-3
    totalTours: 3,
    totalPois: 8,
    totalAssets: 22,
    status: "published",
    lastUpdated: "2024-01-10T14:15:00Z",
  },
  {
    id: "3",
    title: {
      locales: {
        en: "Egyptian Pyramids of Giza",
        fr: "Pyramides égyptiennes de Gizeh",
      },
    },
    description: {
      locales: {
        en: "Uncover the mysteries of the Great Pyramid and the Sphinx, marveling at these ancient wonders that have stood for over 4,500 years.",
        fr: "Découvrez les mystères de la Grande Pyramide et du Sphinx, émerveillez-vous devant ces merveilles anciennes qui existent depuis plus de 4 500 ans.",
      },
    },
    thumbnail:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=250&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1200&h=600&fit=crop",
    // tours: getMockTours(Math.floor(Math.random() * 3) + 1), // Random 1-3
    totalTours: 4,
    totalPois: 6,
    totalAssets: 18,
    status: "published",
    lastUpdated: "2024-01-08T09:45:00Z",
  },
];
