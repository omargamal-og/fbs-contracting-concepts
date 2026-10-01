import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    id: 'malfa-jeddah',
    slug: 'malfa-jeddah',
    name: 'Malfa Jeddah',
    city: 'Jeddah',
    region: 'Makkah',
    category: 'Residential',
    status: 'Completed',

    shortDescription:
      'A residential development delivered in Jeddah with a focus on efficient execution and quality.',

    mapPosition: {
      x: 22.3,
      y: 67.3,
    },
  },

  {
    id: 'malfa-tabuk',
    slug: 'malfa-tabuk',
    name: 'Malfa Tabuk',
    city: 'Tabuk',
    region: 'Tabuk',
    category: 'Residential',
    status: 'Completed',

    shortDescription:
      'A residential development representing FBS Contracting activity in northern Saudi Arabia.',

    mapPosition: {
      x: 9.9,
      y: 23.8,
    },
  },

  {
    id: 'jawharat-al-ghuroob',
    slug: 'jawharat-al-ghuroob',
    name: 'Jawharat Al-Ghuroob',
    city: 'Riyadh',
    region: 'Riyadh',
    category: 'Residential',
    status: 'Completed',

    shortDescription:
      'A residential project in Riyadh forming part of the company’s growing housing portfolio.',

    mapPosition: {
      x: 57.6,
      y: 46.9,
    },
  },

  {
    id: 'nuzl-al-dar',
    slug: 'nuzl-al-dar',
    name: 'Nuzl Al-Dar',
    city: 'Madinah',
    region: 'Madinah',
    category: 'Residential',
    status: 'Completed',

    shortDescription:
      'Residential development delivered in Madinah as part of the company’s regional portfolio.',

    mapPosition: {
      x: 24.1,
      y: 48.1,
    },
  },

  {
    id: 'malfa-al-asala',
    slug: 'malfa-al-asala',
    name: 'Malfa Al-Asala',
    city: 'Riyadh',
    region: 'Riyadh',
    category: 'Residential',
    status: 'Completed',

    mapPosition: {
      x: 59,
      y: 48.5,
    },
  },
]