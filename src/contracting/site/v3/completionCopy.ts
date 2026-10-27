import type { SiteLanguage } from '../i18n/types'
export function completionCopy(language: SiteLanguage) {
  return language === 'en' ? {
    impactTitle: 'A considered approach to lasting value.',
    impactIntro: 'Our capabilities connect the early decisions of a project with construction and ongoing care.',
    impactStages: [
      ['Plan with perspective.', 'Feasibility, land development and design management.'],
      ['Deliver with care.', 'Construction works, supported by our values and continuous improvement.'],
      ['Think beyond completion.', 'Maintenance and operations, with environmental responsibility in view.'],
    ],
    impactLink: 'Explore our capabilities', asOf: 'As of',
    newsIntro: 'For company news and announcements, visit our official LinkedIn page.',
    newsAvailability: 'For company updates, visit the official FBS LinkedIn page.',
    newsMore: 'More updates on LinkedIn',
  } : {
    impactTitle: 'نهج مدروس لقيمة مستدامة.',
    impactIntro: 'تربط قدراتنا بين القرارات الأولى للمشروع وأعمال البناء والرعاية المستمرة.',
    impactStages: [
      ['تخطيط بمنظور شامل.', 'دراسة الجدوى وتطوير الأراضي وإدارة التصميم.'],
      ['تنفيذ بعناية.', 'أعمال البناء، تدعمها قيمنا والتحسين المستمر.'],
      ['اهتمام يمتد بعد الإنجاز.', 'أعمال الصيانة والتشغيل مع مراعاة المسؤولية البيئية.'],
    ],
    impactLink: 'اكتشف قدراتنا', asOf: 'حتى تاريخ',
    newsIntro: 'للاطلاع على أخبار الشركة وإعلاناتها، تفضل بزيارة صفحتنا الرسمية على لينكدإن.',
    newsAvailability: 'للاطلاع على تحديثات الشركة، تفضل بزيارة صفحة FBS الرسمية على لينكدإن.',
    newsMore: 'المزيد من المستجدات على لينكدإن',
  }
}
