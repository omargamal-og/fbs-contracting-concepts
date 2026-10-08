import type {
  NavigationDictionary,
} from '../i18n/types'

export type NavigationKey =
  keyof NavigationDictionary

export type NavigationChild = {
  labelKey: NavigationKey
  path: string
}

export type NavigationItem = {
  labelKey: NavigationKey
  path?: string
  children?: NavigationChild[]
}

export const mainNavigation: NavigationItem[] = [
  {
    labelKey: 'home',
    path: '',
  },

  {
    labelKey: 'aboutUs',

    children: [
      {
        labelKey: 'whoWeAre',
        path: 'about/who-we-are',
      },

      {
        labelKey: 'ceoMessage',
        path: 'about/ceo-message',
      },

      {
        labelKey: 'ourTeam',
        path: 'about/our-team',
      },

      {
        labelKey: 'whyFbsContracting',
        path: 'about/why-fbs-contracting',
      },

      {
        labelKey: 'visionMission',
        path: 'about/vision-mission',
      },

      {
        labelKey: 'saudiVision2030',
        path: 'about/saudi-vision-2030',
      },

      {
        labelKey: 'coreValues',
        path: 'about/core-values',
      },
    ],
  },

  {
    labelKey: 'ourProjects',

    children: [
      {
        labelKey: 'residential',
        path: 'projects/residential',
      },

      {
        labelKey: 'commercial',
        path: 'projects/commercial',
      },
    ],
  },

  {
    labelKey: 'sustainability',

    children: [
      {
        labelKey: 'environmentalResponsibility',
        path:
          'sustainability/environmental-responsibility',
      },

      {
        labelKey: 'socialResponsibility',
        path:
          'sustainability/social-responsibility',
      },

      {
        labelKey: 'economicResponsibility',
        path:
          'sustainability/economic-responsibility',
      },

      {
        labelKey: 'continuousImprovement',
        path:
          'sustainability/continuous-improvement',
      },
    ],
  },

  {
    labelKey: 'businessContinuity',

    children: [
      {
        labelKey:
          'riskAssessmentManagement',

        path:
          'business-continuity/risk-assessment-management',
      },

      {
        labelKey:
          'businessImpactAnalysis',

        path:
          'business-continuity/business-impact-analysis',
      },

      {
        labelKey: 'planDevelopment',

        path:
          'business-continuity/plan-development',
      },

      {
        labelKey:
          'recoveryRestoration',

        path:
          'business-continuity/recovery-restoration',
      },

      {
        labelKey:
          'leadershipAccountability',

        path:
          'business-continuity/leadership-accountability',
      },
    ],
  },

  {
    labelKey: 'careersTraining',

    children: [
      {
        labelKey: 'careers',
        path: 'careers',
      },

      {
        labelKey: 'training',
        path: 'training',
      },
    ],
  },

  {
    labelKey:
      'supplierRegistration',

    path: 'suppliers',
  },

  {
    labelKey: 'contact',
    path: 'contact',
  },
]