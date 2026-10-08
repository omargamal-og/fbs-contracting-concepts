export type SiteLanguage = 'en' | 'ar'

export type NavigationDictionary = {
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

export type SiteDictionary = {
  navigation: NavigationDictionary

  language: {
    english: string
    arabic: string
  }
}