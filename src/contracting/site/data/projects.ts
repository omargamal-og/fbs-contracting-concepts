import jawhartImage from '../assets/images/projects/jawhart-al-sahab-riyadh.jpg'
import khayalaImage from '../assets/images/projects/nozol-khayala-jeddah.jpg'
import aldarImage from '../assets/images/projects/nozol-al-dar-madinah.jpg'
import hawyaImage from '../assets/images/projects/malfa-al-hawya-taif.jpg'
import tabukImage from '../assets/images/projects/malfa-tabuk-hills.jpg'

import mughrzatImage from '../assets/images/projects/king-abdullah-road-starbucks-riyadh.jpg'
import aqiqImage from '../assets/images/projects/prince-mohammed-bin-salman-starbucks-al-aqiq.jpg'
import uraijaImage from '../assets/images/projects/western-ring-road-starbucks-al-uraija.jpg'

import type {
  ProjectRegionId,
  SiteLanguage,
} from '../i18n/types'

export type ProjectCategory =
  | 'residential'
  | 'commercial'

export type ProjectUnitType =
  | 'apartments'
  | 'villas'

type LocalizedText = Record<SiteLanguage, string>

export type ContractingProject = {
  image?: string

  slug: string

  category: ProjectCategory

  region: ProjectRegionId

  name: LocalizedText

  location: LocalizedText

  constructionPeriod?: {
    startYear: number
    endYear: number
  }

  units?: {
    count: number
    type: ProjectUnitType
  }

  sourcePage: number
}

export const projects: ContractingProject[] = [
  {
    slug: 'jawhart-al-sahab-riyadh',

    category: 'residential',

    region: 'riyadh',

    image: jawhartImage,

    name: {
      en: 'Jawhart Al-Sahab',
      ar: 'جوهرة السحاب',
    },

    location: {
      en: 'Riyadh',
      ar: 'الرياض',
    },

    constructionPeriod: {
      startYear: 2020,
      endYear: 2022,
    },

    units: {
      count: 171,
      type: 'apartments',
    },

    sourcePage: 24,
  },

  {
    slug: 'nozol-khayala-jeddah',

    category: 'residential',

    region: 'jeddah',

    image: khayalaImage,

    name: {
      en: 'Nozol Khayala',
      ar: 'نزل خيالا',
    },

    location: {
      en: 'Jeddah',
      ar: 'جدة',
    },

    constructionPeriod: {
      startYear: 2024,
      endYear: 2026,
    },

    units: {
      count: 312,
      type: 'apartments',
    },

    sourcePage: 30,
  },

  {
    slug: 'nozol-al-dar-madinah',

    category: 'residential',

    region: 'madinah',

    image: aldarImage,

    name: {
      en: 'Nozol Al-Dar',
      ar: 'نزل الدار',
    },

    location: {
      en: 'Al Madinah Al Munawwarah',
      ar: 'المدينة المنورة',
    },

    constructionPeriod: {
      startYear: 2024,
      endYear: 2026,
    },

    units: {
      count: 256,
      type: 'apartments',
    },

    sourcePage: 28,
  },

  {
    slug: 'malfa-al-hawya-taif',

    category: 'residential',

    region: 'taif',

    image: hawyaImage,

    name: {
      en: 'Malfa Al-Hawya',
      ar: 'ملفى الحوية',
    },

    location: {
      en: 'Taif',
      ar: 'الطائف',
    },

    constructionPeriod: {
      startYear: 2025,
      endYear: 2028,
    },

    units: {
      count: 524,
      type: 'villas',
    },

    sourcePage: 31,
  },

  {
    slug: 'malfa-tabuk-hills',

    category: 'residential',

    region: 'tabuk',

    image: tabukImage,

    name: {
      en: 'Malfa Tabuk Hills',
      ar: 'ملفى تبوك هيلز',
    },

    location: {
      en: 'Tabuk',
      ar: 'تبوك',
    },

    constructionPeriod: {
      startYear: 2025,
      endYear: 2029,
    },

    units: {
      count: 340,
      type: 'villas',
    },

    sourcePage: 35,
  },

  {
    slug: 'king-abdullah-road-starbucks-riyadh',

    category: 'commercial',

    region: 'riyadh',

    image: mughrzatImage,

    name: {
      en: 'King Abdullah Road - Starbucks',
      ar: 'مشروع طريق الملك عبدالله - ستاربكس',
    },

    location: {
      en: 'Al-Mughrazat, Riyadh',
      ar: 'حي المغرزات، الرياض',
    },

    sourcePage: 36,
  },
  {
    slug: 'prince-mohammed-bin-salman-starbucks-al-aqiq',
  
    category: 'commercial',
  
    region: 'riyadh',
  
    name: {
      en: 'Prince Mohammed bin Salman Road - Starbucks',
      ar: 'مشروع طريق الأمير محمد بن سلمان - ستاربكس',
    },
  
    location: {
      en: 'Al-Aqiq, Riyadh',
      ar: 'حي العقيق، الرياض',
    },
  
    image: aqiqImage,
  
    sourcePage: 36,
  },
  
  {
    slug: 'western-ring-road-starbucks-al-uraija',
  
    category: 'commercial',
  
    region: 'riyadh',
  
    name: {
      en: 'Western Ring Road - Starbucks',
      ar: 'مشروع الطريق الدائري الغربي - ستاربكس',
    },
  
    location: {
      en: 'Al-Uraija, Riyadh',
      ar: 'حي العريجاء، الرياض',
    },
  
    image: uraijaImage,
  
    sourcePage: 36,
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find(
    (project) => project.slug === slug,
  )
}

export function getProjectsByCategory(
  category: ProjectCategory,
) {
  return projects.filter(
    (project) => project.category === category,
  )
}

export const featuredProjectSlugsByRegion: Record<
  ProjectRegionId,
  string
> = {
  riyadh: 'jawhart-al-sahab-riyadh',
  jeddah: 'nozol-khayala-jeddah',
  madinah: 'nozol-al-dar-madinah',
  taif: 'malfa-al-hawya-taif',
  tabuk: 'malfa-tabuk-hills',
}

export function getFeaturedProjectByRegion(
  region: ProjectRegionId,
) {
  return getProjectBySlug(
    featuredProjectSlugsByRegion[region],
  )
}