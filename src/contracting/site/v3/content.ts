import { translations } from '../i18n/translations'
import type { SiteLanguage } from '../i18n/types'
export const V3_BASE='/contracting/v3'
export const MEDIA=V3_BASE+'/media/'
export const HERO_SCENE_SECONDS=4.8
export const films=[
 {id:'01',src:MEDIA+'hero-01-high-rise.mp4',poster:MEDIA+'hero-01-poster.jpg',label:{en:'Structure',ar:'الإنشاء'}},
 {id:'02',src:MEDIA+'hero-02-engineers.mp4',poster:MEDIA+'hero-02-poster.jpg',label:{en:'Collaboration',ar:'التعاون'}},
 {id:'03',src:MEDIA+'hero-03-excavator.mp4',poster:MEDIA+'hero-03-poster.jpg',label:{en:'Groundwork',ar:'الأعمال الأرضية'}},
] as const
export function copy(language:SiteLanguage){
 const source=translations[language],h=source.home
 const ui=language==='en'?{
  menu:'Open navigation',close:'Close navigation',navigation:'Main navigation',language:'العربية',
  company:'Company',expertise:'Expertise',projects:'Projects',connect:'Connect',news:'News',
  play:'Play videos',pause:'Pause videos',previous:'Previous scene',next:'Next scene',select:'Select scene',
  stock:'Licensed stock footage · Not FBS projects',imageStock:'Temporary stock photograph · Robert So / Pexels',
  preview:'Visual direction preview',scroll:'Discover FBS',still:'Still view',skip:'Skip to content',
  momentOne:'Every project starts with a vision.',momentTwo:'From concept to completion.',
  momentOneLabel:'A clear vision',momentTwoLabel:'A considered approach',
  contact:'Let’s build a conversation.',contactLink:'Contact FBS',careers:'Careers',suppliers:'Suppliers',
  profile:'Company profile',back:'Back to top',scene:'Scene',capabilities:'Our capabilities',
 }:{
  menu:'افتح القائمة',close:'أغلق القائمة',navigation:'التنقل الرئيسي',language:'English',
  company:'الشركة',expertise:'خبراتنا',projects:'المشاريع',connect:'تواصل معنا',news:'الأخبار',
  play:'تشغيل الفيديو',pause:'إيقاف الفيديو مؤقتًا',previous:'المشهد السابق',next:'المشهد التالي',select:'اختر المشهد',
  stock:'لقطات مرخصة من مكتبة فيديو · ليست مشاريع FBS',imageStock:'صورة مؤقتة مرخصة · روبرت سو / Pexels',
  preview:'معاينة التوجه البصري',scroll:'اكتشف FBS',still:'عرض ثابت',skip:'انتقل إلى المحتوى',
  momentOne:'كل مشروع يبدأ برؤية.',momentTwo:'من الفكرة إلى التنفيذ.',
  momentOneLabel:'رؤية واضحة',momentTwoLabel:'نهج متكامل',
  contact:'لنبدأ الحوار.',contactLink:'تواصل مع FBS',careers:'الوظائف',suppliers:'الموردون',
  profile:'ملف الشركة',back:'إلى الأعلى',scene:'المشهد',capabilities:'خدماتنا',
 }
 const refinement=language==='en'?{
  aboutTitle:'Built on understanding.',aboutLink:'Get to know FBS',expertiseTitle:'From the first idea.\nTo the final detail.',
  serviceVisual:'Illustrative construction footage',serviceLink:'Discuss your project',featured:'Featured projects',featuredTitle:'A closer look at our work.',
  previousProject:'Previous project',nextProject:'Next project',viewProject:'Project details',selectProject:'Select project',
  projectPreview:'Illustrative project categories · Licensed photography',projectsEmpty:'Explore the project directory.',projectsEmptyNote:'Browse residential and commercial projects, and view the Saudi Arabia project map.',
  impact:'Our impact',impactTitle:'Progress with perspective.',impactEmpty:'Company figures are being prepared.',impactEmptyNote:'Verified figures will be shared following publication approval.',
  newsTitle:'The latest from FBS.',newsEmpty:'Company news and perspectives.',newsEmptyNote:'For company updates and announcements, visit the official FBS LinkedIn page.',readArticle:'Read article',originalPost:'Original LinkedIn post',
  sustainability:'Sustainability',sustainabilityLink:'Our approach',sustainabilityLabel:'Thinking ahead',visionLink:'Saudi Vision 2030',
  closingTitle:'Your next project.\nOur next conversation.',closingNote:'Talk to the team at FBS Contracting.',careersNote:'Grow with us',supplierNote:'Work with us',
  imageContinuity:'Perspective in motion',unavailable:'Published content is being prepared.',error:'Some published content is temporarily unavailable.',retry:'Try again',loading:'Loading published content',
  explore:'Explore',menuNews:'Published company updates and insights.',menuCompany:'The people and principles behind FBS.',menuExpertise:'An integrated approach to the project lifecycle.',menuProjects:'Discover our residential and commercial work.',menuConnect:'Start a conversation with our team.',
  overview:'Overview',discoverProject:'Discover the project',stockShort:'Licensed stock image · Not an FBS project',
  projectInfo:'Project information',location:'Location',closeDetails:'Close details',backToProjects:'Back to projects',caption:'Construction in focus',
  revealTitle:'A clear vision.\nA considered approach.',revealTwoTitle:'Room for what comes next.',revealTwoLink:'Explore our projects',
 }:{
  aboutTitle:'نبني على فهم رؤيتك.',aboutLink:'تعرّف على FBS',expertiseTitle:'من الفكرة الأولى.\nإلى أدق التفاصيل.',
  serviceVisual:'لقطات توضيحية لأعمال البناء',serviceLink:'ناقش مشروعك معنا',featured:'مشاريع مختارة',featuredTitle:'نظرة أقرب إلى أعمالنا.',
  previousProject:'المشروع السابق',nextProject:'المشروع التالي',viewProject:'تفاصيل المشروع',selectProject:'اختر المشروع',
  projectPreview:'فئات مشاريع توضيحية · صور مرخصة',projectsEmpty:'اكتشف دليل المشاريع.',projectsEmptyNote:'تصفح المشاريع السكنية والتجارية، واطلع على خريطة المشاريع في السعودية.',
  impact:'أثرنا',impactTitle:'تقدّم نضعه في منظور واضح.',impactEmpty:'نعمل على إعداد أرقام الشركة.',impactEmptyNote:'ستُعرض الأرقام الموثقة بعد اعتمادها للنشر.',
  newsTitle:'آخر أخبار FBS.',newsEmpty:'أخبار الشركة ورؤاها.',newsEmptyNote:'للاطلاع على تحديثات الشركة وإعلاناتها، تفضل بزيارة صفحة FBS الرسمية على لينكدإن.',readArticle:'اقرأ الخبر',originalPost:'المنشور الأصلي على لينكدإن',
  sustainability:'الاستدامة',sustainabilityLink:'نهجنا',sustainabilityLabel:'نتطلع إلى المستقبل',visionLink:'رؤية السعودية ٢٠٣٠',
  closingTitle:'مشروعك القادم.\nحوارنا القادم.',closingNote:'تحدث مع فريق FBS للمقاولات.',careersNote:'انضم إلى فريقنا',supplierNote:'تعاون معنا',
  imageContinuity:'رؤية تتجدد',unavailable:'يجري إعداد المحتوى المعتمد للنشر.',error:'بعض المحتوى المنشور غير متاح مؤقتًا.',retry:'حاول مجددًا',loading:'جارٍ تحميل المحتوى المنشور',
  explore:'اكتشف',menuNews:'أخبار الشركة ورؤاها المعتمدة للنشر.',menuCompany:'تعرّف على فريق FBS ومبادئنا.',menuExpertise:'نهج متكامل عبر مراحل المشروع.',menuProjects:'اكتشف أعمالنا السكنية والتجارية.',menuConnect:'ابدأ حوارًا مع فريقنا.',
  overview:'نظرة عامة',discoverProject:'اكتشف المشروع',stockShort:'صورة مرخصة · ليست من مشاريع FBS',
  projectInfo:'معلومات المشروع',location:'الموقع',closeDetails:'أغلق التفاصيل',backToProjects:'العودة للمشاريع',caption:'البناء من منظور أقرب',
  revealTitle:'رؤية واضحة.\nونهج متكامل.',revealTwoTitle:'مساحة لما هو قادم.',revealTwoLink:'اكتشف مشاريعنا',
 }
 return {...ui,...refinement,sustainabilityContent:h.sustainability,visionContent:h.vision2030,headlineLines:[h.companyIntroduction.titleLine1,h.companyIntroduction.titleLine2],headline:h.companyIntroduction.titleLine1+' '+h.companyIntroduction.titleLine2,
  description:h.companyIntroduction.secondaryText,about:h.companyIntroduction.description,
  servicesDescription:h.capabilities.description,services:h.capabilities.items,nav:source.navigation,
  projectDescription:h.projectCategories.description}
}
export type V3Copy=ReturnType<typeof copy>
