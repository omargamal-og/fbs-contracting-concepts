import type { SiteLanguage } from '../i18n/types'

// DEMO ONLY: editorial examples for the V3 prototype. These records never
// enter the Supabase adapters, approved homepage model, or publication pipeline.
const demo = {
 en: {
  services: [
   { id: 'engineering', title: 'Engineering', summary: 'Technical planning and design coordination help define a clear path from project brief to delivery.' },
   { id: 'procurement', title: 'Procurement', summary: 'Scope, specifications and supply planning bring project requirements into one coordinated view.' },
   { id: 'construction', title: 'Construction', summary: 'Sequencing, site coordination and clear communication support the move from plans to built work.' },
   { id: 'project-management', title: 'Project Management', summary: 'Planning, communication and project controls help teams keep decisions connected.' },
   { id: 'safety-quality', title: 'Safety & Quality', summary: 'Practical review routines help teams keep safety and quality visible throughout delivery.' },
   { id: 'operations', title: 'Operations & Maintenance', summary: 'Handover planning connects project delivery with the needs of ongoing operation.' },
  ],
  governance: [
   { id: 'governance-framework', title: 'Governance Framework', summary: 'An overview can explain oversight, responsibilities and how decisions are reviewed.' },
   { id: 'code-of-ethics', title: 'Code of Ethics', summary: 'This topic commonly describes principles for professional conduct and decision-making.' },
   { id: 'whistleblowing-policy', title: 'Whistleblowing', summary: 'An informational section can explain how organizations structure reporting and follow-up.' },
   { id: 'privacy-policy', title: 'Privacy', summary: 'A privacy topic can introduce how information handling and personal-data guidance are organized.' },
   { id: 'data-protection-officer', title: 'Data Protection', summary: 'This topic can describe data-protection roles and the types of guidance a policy hub may contain.' },
  ],
  news: [
   { id: 'coordination', title: 'Coordination across a project lifecycle', category: 'Project delivery', excerpt: 'A short editorial look at how planning, communication and review connect across project stages.', body: 'A coordinated project brings many disciplines into one shared plan. Clear scope, timely communication and regular review help teams understand how decisions relate to one another.\n\nThis sample article illustrates an editorial format for future approved company updates.' },
   { id: 'built-environment', title: 'Thinking about the built environment', category: 'Perspectives', excerpt: 'Design, construction and long-term operation each shape how a place works for the people who use it.', body: 'The built environment is shaped by many connected choices. Considering how spaces will be used, maintained and experienced can support more thoughtful project conversations.\n\nThis sample article is general editorial content for the prototype.' },
   { id: 'site-practice', title: 'A closer look at site coordination', category: 'Construction insights', excerpt: 'A practical overview of information flow and sequencing on a complex construction site.', body: 'Construction sites bring people, materials and planned activities together. Shared information and thoughtful sequencing help make dependencies easier to see.\n\nThis sample article contains no project-specific claim or performance result.' },
  ],
 },
 ar: {
  services: [
   { id: 'engineering', title: 'الهندسة', summary: 'يساعد التخطيط الفني وتنسيق التصميم على تحديد مسار واضح من موجز المشروع إلى التنفيذ.' },
   { id: 'procurement', title: 'المشتريات', summary: 'يجمع تخطيط النطاق والمواصفات والتوريد متطلبات المشروع ضمن رؤية منسقة.' },
   { id: 'construction', title: 'الإنشاءات', summary: 'يدعم ترتيب الأعمال والتنسيق في الموقع والتواصل الواضح الانتقال من الخطط إلى التنفيذ.' },
   { id: 'project-management', title: 'إدارة المشاريع', summary: 'يساعد التخطيط والتواصل وضوابط المشروع على ربط قرارات الفرق المختلفة.' },
   { id: 'safety-quality', title: 'السلامة والجودة', summary: 'تساعد إجراءات المراجعة العملية على إبقاء السلامة والجودة حاضرتين طوال مراحل التنفيذ.' },
   { id: 'operations', title: 'التشغيل والصيانة', summary: 'يربط تخطيط التسليم بين تنفيذ المشروع واحتياجات التشغيل المستمر.' },
  ],
  governance: [
   { id: 'governance-framework', title: 'إطار الحوكمة', summary: 'يمكن أن يوضح العرض نظرة عامة على الرقابة والمسؤوليات وآليات مراجعة القرارات.' },
   { id: 'code-of-ethics', title: 'مدونة الأخلاقيات', summary: 'يتناول هذا الموضوع عادةً مبادئ السلوك المهني واتخاذ القرارات.' },
   { id: 'whistleblowing-policy', title: 'الإبلاغ عن المخالفات', summary: 'يمكن للقسم التعريفي شرح كيفية تنظيم قنوات الإبلاغ والمتابعة في المؤسسات.' },
   { id: 'privacy-policy', title: 'الخصوصية', summary: 'يقدم موضوع الخصوصية تنظيم المعلومات والإرشادات المتعلقة بالبيانات الشخصية.' },
   { id: 'data-protection-officer', title: 'حماية البيانات', summary: 'يمكن أن يشرح هذا الموضوع أدوار حماية البيانات وأنواع الإرشادات التي قد يتضمنها مركز السياسات.' },
  ],
  news: [
   { id: 'coordination', title: 'التنسيق عبر مراحل المشروع', category: 'تنفيذ المشاريع', excerpt: 'نظرة تحريرية موجزة على ترابط التخطيط والتواصل والمراجعة عبر مراحل المشروع.', body: 'يجمع المشروع المنسق تخصصات متعددة ضمن خطة مشتركة. ويساعد وضوح النطاق والتواصل في الوقت المناسب والمراجعة المنتظمة على فهم صلة القرارات ببعضها.\n\nيوضح هذا الخبر النموذجي شكل المحتوى التحريري للتحديثات المعتمدة مستقبلًا.' },
   { id: 'built-environment', title: 'التفكير في البيئة المبنية', category: 'رؤى', excerpt: 'يسهم التصميم والإنشاء والتشغيل طويل الأمد في تشكيل الأماكن التي يستخدمها الناس.', body: 'تتشكل البيئة المبنية من خيارات مترابطة. ويساعد التفكير في استخدام الأماكن وصيانتها وتجربتها على إثراء النقاش حول المشاريع.\n\nهذا مثال تحريري عام ضمن النموذج الأولي.' },
   { id: 'site-practice', title: 'نظرة على تنسيق الموقع', category: 'رؤى إنشائية', excerpt: 'عرض عملي لتدفق المعلومات وترتيب الأعمال في موقع إنشائي متعدد التخصصات.', body: 'تجمع مواقع الإنشاء الأشخاص والمواد والأنشطة المخططة. ويساعد تبادل المعلومات وترتيب الأعمال بعناية على إظهار الاعتماد المتبادل بينها.\n\nلا يتضمن هذا المثال ادعاءً عن مشروع أو نتيجة أداء محددة.' },
  ],
 },
} as const

export function getConsolidationDemo(language: SiteLanguage) {
 return demo[language]
}
