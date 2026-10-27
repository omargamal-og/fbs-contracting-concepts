import type { SiteLanguage } from '../../i18n/types'
export function mapCopy(language: SiteLanguage) {
  return language === 'en' ? {
    eyebrow: 'A geographic perspective', title: 'Explore Saudi Arabia.',
    intro: 'Discover project stories through a geographic lens.',
    cities: 'Choose a city', noProjects: 'No published projects for this city yet.', reference: 'City reference', kingdom: 'Saudi Arabia / 3D', cityIndex: 'City index',
    layers:'Geographic context',country:'Saudi Arabia',regionalLand:'Regional land',water:'Water',cityProjects:'Projects by city',
    modelNote:'Architectural relief and city models are illustrative. City-level locations.',shortHelp:'Drag to explore · Pinch to zoom',redSea:'Red Sea',gulf:'Arabian Gulf',
    preview:'Company-profile preview · publication approval pending',previewIntro:'Explore company-profile projects, city by city.',cityPreview:'Selected city',pauseMotion:'Pause map motion',playMotion:'Play map motion',previous:'Previous project',next:'Next project',
    noProjectsNote: 'City markers provide geographic context. They do not indicate an FBS project or office.',
    project: 'View project details', all: 'All categories', filter: 'Project category',
    enable: 'Explore in 3D', done: 'Finish exploring', help: 'Drag to orbit. Pinch to zoom. Keyboard: arrows to orbit, + / − to zoom, 0 to reset, Escape to finish.',
    reset: 'Reset view', left: 'Orbit left', right: 'Orbit right', zoomIn: 'Zoom in', zoomOut: 'Zoom out',
    loading: 'Preparing the geographic view…', fallback: '3D view unavailable. Explore the cities and project information below.',
    credit: 'Made with Natural Earth', scope: 'City-level locations · generalized boundaries',
    canvas: 'Interactive three-dimensional map of Saudi Arabia', open: 'Published projects',
  } : {
    eyebrow: 'منظور جغرافي', title: 'اكتشف المملكة العربية السعودية.',
    intro: 'استكشف قصص المشاريع من منظور جغرافي.',
    cities: 'اختر مدينة', noProjects: 'لا توجد مشاريع منشورة لهذه المدينة حتى الآن.', reference: 'مرجع المدينة', kingdom: 'المملكة العربية السعودية / 3D', cityIndex: 'دليل المدن',
    layers:'السياق الجغرافي',country:'السعودية',regionalLand:'الأراضي المحيطة',water:'المياه',cityProjects:'المشاريع حسب المدينة',
    modelNote:'التضاريس والنماذج المعمارية توضيحية. المواقع على مستوى المدن.',shortHelp:'اسحب للاستكشاف · قرّب بإصبعين',redSea:'البحر الأحمر',gulf:'الخليج العربي',
    preview:'معاينة من ملف الشركة · بانتظار اعتماد النشر',previewIntro:'استكشف مشاريع ملف الشركة، مدينة تلو الأخرى.',cityPreview:'المدينة المختارة',pauseMotion:'إيقاف حركة الخريطة',playMotion:'تشغيل حركة الخريطة',previous:'المشروع السابق',next:'المشروع التالي',
    noProjectsNote: 'توفر علامات المدن سياقًا جغرافيًا، ولا تشير إلى وجود مشروع أو مكتب لشركة FBS.',
    project: 'عرض تفاصيل المشروع', all: 'جميع الفئات', filter: 'فئة المشروع',
    enable: 'استكشف بالأبعاد الثلاثة', done: 'إنهاء الاستكشاف', help: 'اسحب لتدوير العرض، وقرب بإصبعين. لوحة المفاتيح: الأسهم للتدوير، + / − للتقريب، 0 لإعادة الضبط، وEscape للإنهاء.',
    reset: 'إعادة ضبط العرض', left: 'تدوير لليسار', right: 'تدوير لليمين', zoomIn: 'تكبير', zoomOut: 'تصغير',
    loading: 'جارٍ تجهيز العرض الجغرافي…', fallback: 'العرض ثلاثي الأبعاد غير متاح. استكشف المدن ومعلومات المشاريع أدناه.',
    credit: 'البيانات الجغرافية: Natural Earth', scope: 'مواقع على مستوى المدينة · حدود معممة',
    canvas: 'خريطة تفاعلية ثلاثية الأبعاد للمملكة العربية السعودية', open: 'المشاريع المنشورة',
  }
}
