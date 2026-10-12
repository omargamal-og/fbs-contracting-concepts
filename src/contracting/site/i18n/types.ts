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

export type ProjectRegionId =
  | 'riyadh'
  | 'jeddah'
  | 'madinah'
  | 'taif'
  | 'tabuk'

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
    items: string[]
  }

  projectCategories: ProjectCategoriesDictionary

  projectMap: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
    viewProject: string
  
    projects: Record<
  ProjectRegionId,
  {
    title: string
    type: string
    location: string
  }
  >
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

export type ManagementMemberId =
  | 'nawaf'
  | 'wael'
  | 'ahmed'
  | 'mashael'
  | 'nasser'
  | 'khaled'

export type BusinessContinuityPageContent = {
  eyebrow: string
  title: string
  introduction: string

  focusTitle: string

  focusAreas: {
    title: string
    description: string
  }[]

  closing: string
}

export type InnerPagesDictionary = {
  about: {
    whoWeAre: {
      eyebrow: string
      title: string
      introduction: string
      uniqueness: string
      values: string
      safety: string
      expertise: string
      closing: string
    },

    chairmanSpeech: {
      eyebrow: string
      title: string
      body: string[]
      name: string
      role: string
    },

    ceoSpeech: {
      eyebrow: string
      title: string
      body: string[]
      name: string
      role: string
    },

    ourTeam: {
      eyebrow: string
      title: string
      leadershipTitle: string
      managementTitle: string
    
      members: {
        id: ManagementMemberId
        name: string
        role: string
      }[]
    }

    whyFbs: {
      eyebrow: string
      title: string
      features: {
        title: string
        description: string
      }[]
    },

    visionMission: {
      eyebrow: string
      title: string
    
      vision: {
        title: string
        description: string
      }
    
      mission: {
        title: string
        description: string
      }
    
      objectives: {
        title: string
        items: string[]
      }
    },

    saudiVision2030: {
      eyebrow: string
      title: string
      statement: string
      description: string
      commitmentsTitle: string
      commitments: string[]
    }

    coreValues: {
      eyebrow: string
      title: string
      values: string[]
    },
  },
  sustainability: {
    environmental: {
      eyebrow: string
      title: string
      introduction: string
      commitmentsTitle: string
  
      commitments: {
        title: string
        description: string
      }[]
  
      closing: string
    },

    social: {
      eyebrow: string
      title: string
      introduction: string
      commitmentsTitle: string
    
      commitments: {
        title: string
        description: string
      }[]
    
      closing: string
    },

    economic: {
      eyebrow: string
      title: string
      introduction: string
      commitmentsTitle: string
    
      commitments: {
        title: string
        description: string
      }[]
    
      closing: string
    },

    continuousImprovement: {
      eyebrow: string
      title: string
      introduction: string
    
      systemsTitle: string
      systems: {
        title: string
        description: string
      }[]
    
      approachTitle: string
      steps: {
        title: string
        description: string
      }[]
    
      closing: string
    },
  },

  businessContinuity: {
    riskAssessment: BusinessContinuityPageContent
    businessImpactAnalysis: BusinessContinuityPageContent
    planDevelopment: BusinessContinuityPageContent
    recoveryRestoration: BusinessContinuityPageContent
    leadershipAccountability: BusinessContinuityPageContent
  }
}

export type ProjectDetailsDictionary = {
  eyebrow: string
  informationTitle: string

  locationLabel: string
  categoryLabel: string
  constructionPeriodLabel: string
  unitsLabel: string

  apartmentsLabel: string
  villasLabel: string

  backToProjects: string

  notFoundTitle: string
  notFoundDescription: string
}

export type SiteDictionary = {
  navigation: NavigationDictionary

  home: HomeDictionary

  innerPages: InnerPagesDictionary

  projectDetails: ProjectDetailsDictionary

  footer: FooterDictionary

  language: {
    english: string
    arabic: string
  }
}

