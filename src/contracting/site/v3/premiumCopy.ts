import type { SiteLanguage } from '../i18n/types'
export function premiumCopy(language: SiteLanguage) {
 return language === 'en' ? {
  governance:'Corporate Governance',login:'Login',administration:'Administration',
  supplierLogin:'Supplier Login',supplierLoginNote:'Supplier sign-in is handled separately from registration.',
  governanceIntro:'Company principles, accountability and policy information.',
  availableInformation:'Explore company information',portalStatus:'Public resources and information.',
  portalNote:'Choose a career or supplier resource, or view administration guidance.',
  adminNote:'For authorized site administration.',
  publicCareers:'Explore careers · public page',publicSuppliers:'Supplier information · public page',
  principles:'People. Principles. Perspective.',approach:'An integrated approach',
  aboutCaption:'Understanding the vision. Shaping the detail.',projectNote:'Residential & commercial',
  carousel:'carousel',
  pauseGallery:'Pause project gallery',playGallery:'Play project gallery',pause:'Pause',play:'Play',
  stationaryGallery:'Manual gallery · reduced motion',galleryHelp:'Hover a card or focus it to pause. Drag to browse, or use the arrows.',
 } : {
  governance:'حوكمة الشركات',login:'تسجيل الدخول',administration:'الإدارة',
  supplierLogin:'دخول الموردين',supplierLoginNote:'تسجيل دخول الموردين منفصل عن تسجيل الموردين.',
  governanceIntro:'مبادئ الشركة والمساءلة ومعلومات السياسات.',
  availableInformation:'اكتشف معلومات الشركة',portalStatus:'موارد ومعلومات عامة.',
  portalNote:'اختر موردًا للوظائف أو الموردين، أو اطّلع على إرشادات الإدارة.',
  adminNote:'مخصص لإدارة الموقع من الفرق المخولة.',
  publicCareers:'اكتشف الوظائف · صفحة عامة',publicSuppliers:'معلومات الموردين · صفحة عامة',
  principles:'الإنسان. المبادئ. الرؤية.',approach:'نهج متكامل',
  aboutCaption:'نفهم الرؤية. ونصوغ التفاصيل.',projectNote:'مشاريع سكنية وتجارية',
  carousel:'عارض شرائح',
  pauseGallery:'إيقاف حركة معرض المشاريع',playGallery:'تشغيل حركة معرض المشاريع',pause:'إيقاف مؤقت',play:'تشغيل',
  stationaryGallery:'تصفح يدوي · حركة مخفّضة',galleryHelp:'تتوقف الحركة عند تمرير المؤشر على بطاقة أو التركيز عليها. اسحب للتصفح أو استخدم الأسهم.',
 }
}
