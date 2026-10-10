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

  companyIntroduction: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
    secondaryText: string
    cta: string
  }

  capabilities: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
  
    items: {
      construction: {
        title: string
        description: string
      }
  
      management: {
        title: string
        description: string
      }
  
      quality: {
        title: string
        description: string
      }
  
      coordination: {
        title: string
        description: string
      }
    }
  }

  projectCategories: ProjectCategoriesDictionary

  projectMap: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
    viewProject: string
  
    projects: {
      riyadh: {
        title: string
        type: string
        location: string
      }
  
      jeddah: {
        title: string
        type: string
        location: string
      }
  
      dammam: {
        title: string
        type: string
        location: string
      }
    }
  }

  vision2030: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
    cta: string
  }

  values: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
  
    items: {
      integrity: {
        title: string
        description: string
      }
  
      quality: {
        title: string
        description: string
      }
  
      collaboration: {
        title: string
        description: string
      }
  
      responsibility: {
        title: string
        description: string
      }
    }
  }

  sustainability: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
    cta: string
  
    items: {
      environmental: {
        title: string
        description: string
      }
  
      social: {
        title: string
        description: string
      }
  
      economic: {
        title: string
        description: string
      }
    }
  }

  contactCta: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
    primaryCta: string
  }
}

export type FooterDictionary = {
  description: string

  companyTitle: string
  projectsTitle: string
  connectTitle: string

  whoWeAre: string
  visionMission: string
  values: string

  residential: string
  commercial: string
  sustainability: string

  careers: string
  suppliers: string
  contact: string

  copyright: string
}

export type SiteDictionary = {
  navigation: NavigationDictionary

  home: HomeDictionary

  footer: FooterDictionary

  language: {
    english: string
    arabic: string
  }
}

