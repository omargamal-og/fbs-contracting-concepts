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

  mainNavigationLabel: string
  openMenuLabel: string
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
    imageAlt: string
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
    selectedProjectLabel: string
    photoPinHint: string
    photoPositionNote: string
    projectSingular: string
    projectPlural: string
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
    viewProject: string
    countryLabel: string
  
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

  careers: {
    eyebrow: string
    title: string
    introduction: string
  
    opportunitiesTitle: string
    noVacanciesTitle: string
    noVacanciesDescription: string
  
    formTitle: string
    formDescription: string
  
    nameLabel: string
    emailLabel: string
    subjectLabel: string
    messageLabel: string
    cvLabel: string
  
    submitLabel: string
    demoNotice: string

    cvHint: string
    invalidCvType: string
    invalidCvSize: string
    reviewTitle: string
    closeLabel: string
    notAttachedLabel: string
  },

  training: {
    eyebrow: string
    title: string
    leadTitle: string
    introduction: string
  
    visualEyebrow: string
    visualTitle: string
  
    prioritiesTitle: string
  
    priorities: {
      title: string
      description: string
    }[]
  
    closing: string
  },
  supplierRegistration: {
    eyebrow: string
    title: string
    introduction: string
  
    formTitle: string
    formDescription: string
  
    companyNameLabel: string
    contactNameLabel: string
    emailLabel: string
    phoneLabel: string
    categoryLabel: string
    categoryPlaceholder: string
    notesLabel: string
    profileLabel: string
    profileHint: string
  
    categories: {
      value: string
      label: string
    }[]
  
    submitLabel: string
    reviewTitle: string
    closeLabel: string
    notAttachedLabel: string
    invalidPhone: string
    invalidFileType: string
    invalidFileSize: string
    demoNotice: string
  },

  contact: {
    eyebrow: string
    title: string
    introduction: string
  
    detailsTitle: string
    phoneLabel: string
    emailLabel: string
    addressLabel: string
    address: string
  
    formTitle: string
    formDescription: string
  
    nameLabel: string
    subjectLabel: string
    messageLabel: string
  
    reviewButton: string
    reviewTitle: string
    closeLabel: string
    notProvidedLabel: string
    requiredError: string
    demoNotice: string
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
  loadingPage: string

  navigation: NavigationDictionary

  home: HomeDictionary

  innerPages: InnerPagesDictionary

  projectDetails: ProjectDetailsDictionary

  validation: {
    requiredField: string
    invalidEmail: string
    invalidCategory: string
  }

  notFound: {
    title: string
    description: string
    backToHome: string
  }

  footer: FooterDictionary

  language: {
    english: string
    arabic: string
  }
}

