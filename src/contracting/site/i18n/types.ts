export type SiteLanguage = 'en' | 'ar'

export type NavigationDictionary = {
  logo_t1: string
  logo_t2: string

  home: string

  aboutUs: string
  whoWeAre: string
  ceoMessage: string
  ourTeam: string
  whyFbsContracting: string
  visionMission: string
  saudiVision2030: string
  coreValues: string

  ourProjects: string
  residential: string
  commercial: string

  sustainability: string
  environmentalResponsibility: string
  socialResponsibility: string
  economicResponsibility: string
  continuousImprovement: string

  businessContinuity: string
  riskAssessmentManagement: string
  businessImpactAnalysis: string
  planDevelopment: string
  recoveryRestoration: string
  leadershipAccountability: string

  careersTraining: string
  careers: string
  training: string

  supplierRegistration: string
  contact: string

  menu: string
  close: string
}

export type ProjectCategoriesDictionary = {
  eyebrow: string
  titleLine1: string
  titleLine2: string
  description: string

  residential: {
    title: string
    description: string
  }

  commercial: {
    title: string
    description: string
  }
}

export type HomeDictionary = {
  hero: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
    primaryCta: string
    secondaryCta: string
    location: string
  }

  projectCategories: ProjectCategoriesDictionary
}

export type SiteDictionary = {
  navigation: NavigationDictionary

  home: HomeDictionary

  language: {
    english: string
    arabic: string
  }
}

