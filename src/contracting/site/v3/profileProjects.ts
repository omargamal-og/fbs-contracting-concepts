import type { SiteLanguage } from '../i18n/types'
import type { MapProject } from './map/model'
import { projects as existingProjectRecords } from '../data/projects'

type ProfileProject = {
  slug: string
  name: Record<SiteLanguage, string>
  location: Record<SiteLanguage, string>
  cityKey: string
  category: 'residential' | 'commercial'
  period: { startYear: number; endYear: number }
  units?: { count: number; type: 'apartments' | 'villas' }
  summary: Record<SiteLanguage, string>
  image?: string
}

const oldImages = new Map(existingProjectRecords.map(project => [project.slug, project.image]))
const profilePhoto = (file: string) => `/contracting/v3/projects/${file}.webp`
const residential: ProfileProject[] = [
  { slug:'jawhart-al-sahab-riyadh',name:{en:'Jawhart Al-Sahab',ar:'جوهرة السحاب'},location:{en:'Riyadh',ar:'الرياض'},cityKey:'riyadh',category:'residential',period:{startYear:2020,endYear:2022},units:{count:171,type:'apartments'},summary:{en:'Profile p. 24 · Project value: SAR 48.9M · Land area: 14,169 m² · Built-up area: 34,100 m² · 9 buildings (G+2) · 171 apartments.',ar:'الملف التعريفي، ص. ٢٤ · قيمة المشروع: ٤٨٫٩ مليون ريال · مساحة الأرض: ١٤٬١٦٩ م² · مساحة البناء: ٣٤٬١٠٠ م² · ٩ مبانٍ (أرضي + طابقان) · ١٧١ شقة.'} },
  { slug:'jawhrat-al-ghuroob-riyadh',name:{en:'Jawhrat Al-Ghuroob',ar:'جوهرة الغروب'},location:{en:'Riyadh',ar:'الرياض'},cityKey:'riyadh',category:'residential',period:{startYear:2021,endYear:2023},units:{count:70,type:'apartments'},summary:{en:'Profile p. 25 · Project value: SAR 18.6M · Land area: 6,836 m² · Built-up area: 13,203 m² · 5 buildings (G+2) · 70 apartments.',ar:'الملف التعريفي، ص. ٢٥ · قيمة المشروع: ١٨٫٦ مليون ريال · مساحة الأرض: ٦٬٨٣٦ م² · مساحة البناء: ١٣٬٢٠٣ م² · ٥ مبانٍ (أرضي + طابقان) · ٧٠ شقة.'},image:profilePhoto('jawhrat-al-ghuroob-riyadh') },
  { slug:'nozol-ishbilia-riyadh',name:{en:'Nozol Ishbilia',ar:'نزل إشبيلية'},location:{en:'Riyadh',ar:'الرياض'},cityKey:'riyadh',category:'residential',period:{startYear:2021,endYear:2022},units:{count:34,type:'apartments'},summary:{en:'Profile p. 26 · Project value: SAR 9.0M · Land area: 3,000 m² · Built-up area: 6,618 m² · 1 building (G+2) · 34 apartments.',ar:'الملف التعريفي، ص. ٢٦ · قيمة المشروع: ٩ ملايين ريال · مساحة الأرض: ٣٬٠٠٠ م² · مساحة البناء: ٦٬٦١٨ م² · مبنى واحد (أرضي + طابقان) · ٣٤ شقة.'},image:profilePhoto('nozol-ishbilia-riyadh') },
  { slug:'nozol-al-hazm-riyadh',name:{en:'Nozol Al-Hazm',ar:'نزل الحزم'},location:{en:'Riyadh',ar:'الرياض'},cityKey:'riyadh',category:'residential',period:{startYear:2022,endYear:2025},units:{count:176,type:'apartments'},summary:{en:'Profile p. 27 · Project value: SAR 53.7M · Land area: 17,997 m² · Built-up area: 43,169 m² · 15 buildings (G+2) · 176 apartments.',ar:'الملف التعريفي، ص. ٢٧ · قيمة المشروع: ٥٣٫٧ مليون ريال · مساحة الأرض: ١٧٬٩٩٧ م² · مساحة البناء: ٤٣٬١٦٩ م² · ١٥ مبنى (أرضي + طابقان) · ١٧٦ شقة.'},image:profilePhoto('nozol-al-hazm-riyadh') },
  { slug:'nozol-al-dar-madinah',name:{en:'Nozol Al-Dar',ar:'نزل الدار'},location:{en:'Al Madinah Al Munawwarah',ar:'المدينة المنورة'},cityKey:'madinah',category:'residential',period:{startYear:2024,endYear:2026},units:{count:256,type:'apartments'},summary:{en:'Profile p. 28 · Project value: SAR 101.4M · Land area: 27,722 m² · Built-up area: 62,799 m² · 16 buildings (G+7) · 256 apartments.',ar:'الملف التعريفي، ص. ٢٨ · قيمة المشروع: ١٠١٫٤ مليون ريال · مساحة الأرض: ٢٧٬٧٢٢ م² · مساحة البناء: ٦٢٬٧٩٩ م² · ١٦ مبنى (أرضي + ٧ طوابق) · ٢٥٦ شقة.'} },
  { slug:'malfa-al-asala-riyadh',name:{en:'Malfa Al-Asala',ar:'ملفى الأصالة'},location:{en:'Riyadh',ar:'الرياض'},cityKey:'riyadh',category:'residential',period:{startYear:2024,endYear:2026},units:{count:166,type:'villas'},summary:{en:'Profile p. 29 · Project value: SAR 80.4M · Land area: 60,907 m² · Built-up area: 44,820 m² · 166 buildings (G+1) · 166 villas.',ar:'الملف التعريفي، ص. ٢٩ · قيمة المشروع: ٨٠٫٤ مليون ريال · مساحة الأرض: ٦٠٬٩٠٧ م² · مساحة البناء: ٤٤٬٨٢٠ م² · ١٦٦ مبنى (أرضي + طابق) · ١٦٦ فيلا.'},image:profilePhoto('malfa-al-asala-riyadh') },
  { slug:'nozol-khayala-jeddah',name:{en:'Nozol Khayala',ar:'نزل خيالا'},location:{en:'Jeddah',ar:'جدة'},cityKey:'jeddah',category:'residential',period:{startYear:2024,endYear:2026},units:{count:312,type:'apartments'},summary:{en:'Profile p. 30 · Project value: SAR 137.8M · Land area: 56,088 m² · Built-up area: 79,140 m² · 18 buildings (G+4) · 312 apartments.',ar:'الملف التعريفي، ص. ٣٠ · قيمة المشروع: ١٣٧٫٨ مليون ريال · مساحة الأرض: ٥٦٬٠٨٨ م² · مساحة البناء: ٧٩٬١٤٠ م² · ١٨ مبنى (أرضي + ٤ طوابق) · ٣١٢ شقة.'} },
  { slug:'malfa-al-hawya-taif',name:{en:'Malfa Al-Hawya',ar:'ملفى الحوية'},location:{en:'Taif',ar:'الطائف'},cityKey:'taif',category:'residential',period:{startYear:2025,endYear:2028},units:{count:524,type:'villas'},summary:{en:'Profile p. 31 · Project value: SAR 211.3M · Land area: 137,338.20 m² · Built-up area: 119,352 m² · 524 buildings (G+1) · 524 villas.',ar:'الملف التعريفي، ص. ٣١ · قيمة المشروع: ٢١١٫٣ مليون ريال · مساحة الأرض: ١٣٧٬٣٣٨٫٢٠ م² · مساحة البناء: ١١٩٬٣٥٢ م² · ٥٢٤ مبنى (أرضي + طابق) · ٥٢٤ فيلا.'} },
  { slug:'malfa-al-mokaymen-madinah',name:{en:'Malfa Al-Mokaymen',ar:'ملفى المكيمين'},location:{en:'Al Madinah Al Munawwarah',ar:'المدينة المنورة'},cityKey:'madinah',category:'residential',period:{startYear:2025,endYear:2029},units:{count:687,type:'villas'},summary:{en:'Profile p. 32 · Project value: SAR 286.8M · Land area: 178,544.00 m² · Built-up area: 164,255.13 m² · 687 buildings (G+1) · 687 villas.',ar:'الملف التعريفي، ص. ٣٢ · قيمة المشروع: ٢٨٦٫٨ مليون ريال · مساحة الأرض: ١٧٨٬٥٤٤ م² · مساحة البناء: ١٦٤٬٢٥٥٫١٣ م² · ٦٨٧ مبنى (أرضي + طابق) · ٦٨٧ فيلا.'},image:profilePhoto('malfa-al-mokaymen-madinah') },
  { slug:'malfa-jeddah-jeddah',name:{en:'Malfa Jeddah',ar:'ملفى جدة'},location:{en:'Jeddah',ar:'جدة'},cityKey:'jeddah',category:'residential',period:{startYear:2025,endYear:2029},units:{count:602,type:'villas'},summary:{en:'Profile p. 33 · Project value: SAR 249.9M · Land area: 190,391.91 m² · Built-up area: 14,780.00 m² · 602 buildings (G+1) · 602 villas.',ar:'الملف التعريفي، ص. ٣٣ · قيمة المشروع: ٢٤٩٫٩ مليون ريال · مساحة الأرض: ١٩٠٬٣٩١٫٩١ م² · مساحة البناء: ١٤٬٧٨٠ م² · ٦٠٢ مبنى (أرضي + طابق) · ٦٠٢ فيلا.'},image:profilePhoto('malfa-jeddah-jeddah') },
  { slug:'malfa-al-asala-2-riyadh',name:{en:'Malfa Al-Asala (2)',ar:'ملفى الأصالة (٢)'},location:{en:'Riyadh',ar:'الرياض'},cityKey:'riyadh',category:'residential',period:{startYear:2025,endYear:2029},units:{count:154,type:'villas'},summary:{en:'Profile p. 34 · Project value: SAR 74.3M · Land area: 52,019.80 m² · Built-up area: 42,984.00 m² · 154 buildings (G+1) · 154 villas.',ar:'الملف التعريفي، ص. ٣٤ · قيمة المشروع: ٧٤٫٣ مليون ريال · مساحة الأرض: ٥٢٬٠١٩٫٨٠ م² · مساحة البناء: ٤٢٬٩٨٤ م² · ١٥٤ مبنى (أرضي + طابق) · ١٥٤ فيلا.'},image:profilePhoto('malfa-al-asala-2-riyadh') },
  { slug:'malfa-tabuk-hills',name:{en:'Malfa Tabuk Hills',ar:'ملفى تبوك هيلز'},location:{en:'Tabuk',ar:'تبوك'},cityKey:'tabuk',category:'residential',period:{startYear:2025,endYear:2029},units:{count:340,type:'villas'},summary:{en:'Profile p. 35 · Project value: SAR 148.8M · Land area: 104,576.12 m² · Built-up area: 83,718.43 m² · 340 buildings (G+1) · 340 villas.',ar:'الملف التعريفي، ص. ٣٥ · قيمة المشروع: ١٤٨٫٨ مليون ريال · مساحة الأرض: ١٠٤٬٥٧٦٫١٢ م² · مساحة البناء: ٨٣٬٧١٨٫٤٣ م² · ٣٤٠ مبنى (أرضي + طابق) · ٣٤٠ فيلا.'} },
]

type CommercialRow = [string,string,string,string,string,number,number,number,string]
const commercialRows: CommercialRow[] = [
 ['king-abdullah-road-starbucks-riyadh','King Abdullah Road Project','مشروع طريق الملك عبدالله','Al-Mughrazat, Riyadh','حي المغرزات، الرياض',2021,2021,1907000,'(1) Coffee shop — Starbucks|مقهى واحد — ستاربكس'],
 ['najm-al-din-al-ayoubi-road-starbucks-tuwaiq','Najm Al-Din Al-Ayoubi Road Project','مشروع طريق نجم الدين الأيوبي','Tuwaiq, Riyadh','حي طويق، الرياض',2020,2020,1772000,'Coffee shop — Starbucks|مقهى — ستاربكس'],
 ['western-ring-road-starbucks-al-uraija','Western Ring Road Project','مشروع الطريق الدائري الغربي','Al-Uraija, Riyadh','حي العريجاء، الرياض',2020,2020,956000,'Coffee shop — Starbucks|مقهى — ستاربكس'],
 ['prince-mohammed-bin-salman-starbucks-al-aqiq','Prince Mohammed bin Salman Road Project','مشروع طريق الأمير محمد بن سلمان','Al-Aqiq, Riyadh','حي العقيق، الرياض',2020,2020,1834000,'Coffee shop — Starbucks|مقهى — ستاربكس'],
 ['salah-al-din-al-ayyubi-road-nahdi-rabwa','Salah al-Din al-Ayyubi Road Project','مشروع طريق صلاح الدين الأيوبي','Rabwa, Riyadh','حي الربوة، الرياض',2021,2021,1050000,'Nahdi Pharmacy|صيدلية النهدي'],
 ['king-abdulaziz-road-wendys-al-arid','King Abdulaziz Road Project','مشروع طريق الملك عبدالعزيز','Al-Arid, Riyadh','حي العارض، الرياض',2022,2022,638750,'Restaurant — Wendy’s Burger|مطعم — وينديز برجر'],
 ['prince-saud-road-coffee-address-al-quds','Prince Saud Road Project','مشروع طريق الأمير سعود','Al-Quds, Riyadh','حي القدس، الرياض',2022,2022,760000,'(2) Cafes — Coffee Address|(٢) مقهيان — كوفي أدرس'],
 ['abu-bakr-al-siddiq-road-starbucks-al-waha','Abu Bakr Al-Siddiq Road Project','مشروع طريق أبي بكر الصديق','Al-Waha, Riyadh','حي الواحة، الرياض',2022,2022,500000,'Coffee shop — Starbucks|مقهى — ستاربكس'],
 ['king-fahd-branch-road-starbucks-al-sahafa','King Fahd Branch Road Project','مشروع طريق الملك فهد الفرعي','Al-Sahafa, Riyadh','حي الصحافة، الرياض',2022,2022,595000,'Coffee shop — Starbucks|مقهى — ستاربكس'],
 ['imam-abdullah-bin-saud-road-starbucks-ishbiliya','Imam Abdullah bin Saud Road Project','مشروع طريق الإمام عبدالله بن سعود','Ishbiliya, Riyadh','حي إشبيلية، الرياض',2022,2022,550000,'Coffee shop — Starbucks|مقهى — ستاربكس'],
 ['imam-abdullah-bin-saud-road-tim-hortons-ishbiliya','Imam Abdullah bin Saud Road Project — Tim Hortons','مشروع طريق الإمام عبدالله بن سعود — تيم هورتنز','Ishbiliya, Riyadh','حي إشبيلية، الرياض',2023,2023,530000,'Cafe — Tim Hortons|مقهى — تيم هورتنز'],
 ['al-suwaidi-main-road-starbucks-sign-burger','Al-Suwaidi Main Road Project','مشروع طريق السويدي الرئيسي','Al-Suwaidi, Riyadh','حي السويدي، الرياض',2022,2022,1365000,'(1) Starbucks cafe and (1) Sign Burger restaurant|مقهى ستاربكس واحد ومطعم ساين برجر واحد'],
 ['southern-ring-road-starbucks-namar','Southern Ring Road Branch Project','مشروع فرع الطريق الدائري الجنوبي','Namar, Riyadh','حي نمار، الرياض',2022,2022,490000,'Coffee shop — Starbucks|مقهى — ستاربكس'],
 ['al-takhassusi-street-starbucks-al-sahafa','Al-Takhassusi Street Project','مشروع شارع التخصصي','Al-Sahafa, Riyadh','حي الصحافة، الرياض',2023,2023,650000,'Coffee shop — Starbucks|مقهى — ستاربكس'],
 ['abu-bakr-al-siddiq-road-starbucks-al-murasalat','Abu Bakr Al-Siddiq Road Project — Al-Murasalat','مشروع طريق أبي بكر الصديق — حي المرسلات','Al-Murasalat, Riyadh','حي المرسلات، الرياض',2023,2023,650000,'Coffee shop — Starbucks|مقهى — ستاربكس'],
 ['taif-road-ken-dhahrat-laban','Taif Road Project — Ken Restaurant','مشروع طريق الطائف — مطعم كين','Dhahrat Laban, Riyadh','ظهرة لبن، الرياض',2023,2023,650000,'Restaurant — Ken|مطعم — كين'],
 ['taif-road-starbucks-dhahrat-laban','Taif Road Project — Starbucks','مشروع طريق الطائف — ستاربكس','Dhahrat Laban, Riyadh','ظهرة لبن، الرياض',2023,2023,650000,'Cafe — Starbucks|مقهى — ستاربكس'],
 ['najd-road-starbucks-dhahrat-laban','Najd Road Project — Starbucks','مشروع طريق نجد — ستاربكس','Dhahrat Laban, Riyadh','ظهرة لبن، الرياض',2023,2023,650000,'Cafe — Starbucks|مقهى — ستاربكس'],
 ['king-abdullah-road-five-retail-gulf','King Abdullah Road Project — Gulf District','مشروع طريق الملك عبدالله — حي الخليج','Gulf District, Riyadh','حي الخليج، الرياض',2023,2024,3900000,'(5) cafes and restaurants|(٥) مقاهٍ ومطاعم'],
 ['southern-ring-road-retail-shubra','Southern Ring Road Project — Shubra','مشروع الطريق الدائري الجنوبي — شبرا','Shubra, Riyadh','حي شبرا، الرياض',2023,2024,5095748,'(2) showrooms and (2) cafes|(٢) معرضان و(٢) مقهيان'],
 ['imam-muslim-road-starbucks-badr','Imam Muslim Road Project','مشروع طريق الإمام مسلم','Badr, Riyadh','حي بدر، الرياض',2023,2023,650000,'Cafe — Starbucks|مقهى — ستاربكس'],
 ['ibn-taymiyyah-road-starbucks-badr','Ibn Taymiyyah Road Project','مشروع طريق ابن تيمية','Badr, Riyadh','حي بدر، الرياض',2023,2024,650000,'Cafe — Starbucks|مقهى — ستاربكس'],
 ['king-salman-road-starbucks-al-qayrawan','King Salman Road Project','مشروع طريق الملك سلمان','Al-Qayrawan, Riyadh','حي القيروان، الرياض',2023,2024,1365000,'Cafe — Starbucks|مقهى — ستاربكس'],
]
const commercial: ProfileProject[] = commercialRows.map(([slug,en,ar,locEn,locAr,startYear,endYear,value,work]) => {
  const [workEn,workAr] = work.split('|')
  const valueLabel = new Intl.NumberFormat('en-US').format(value)
  const valueAr = new Intl.NumberFormat('ar-SA').format(value)
  return { slug,name:{en,ar},location:{en:locEn,ar:locAr},cityKey:'riyadh',category:'commercial',period:{startYear,endYear},summary:{en:`Profile p. 36–37 · Work: ${workEn} · Contract value: SAR ${valueLabel}.`,ar:`الملف التعريفي، ص. ٣٦–٣٧ · الأعمال: ${workAr} · قيمة العقد: ${valueAr} ريال.`} }
})

const records: ProfileProject[] = [...residential,...commercial]

export function profileProjects(language: SiteLanguage): MapProject[] {
  return records.map(project => {
    const image = oldImages.get(project.slug) ?? project.image
    return {
      id:project.slug,slug:project.slug,name:project.name[language],location:project.location[language],category:project.category,
      summary:project.summary[language],image:image?{id:project.slug,type:'image',developmentUrl:image,alt:project.name[language]}:undefined,
      gallery:[],deliveryStatus:'unspecified',period:project.period,units:project.units??null,coordinates:null,published:false,cityKey:project.cityKey,
    }
  })
}

export const featuredProfileProjectSlugs = [
  'jawhart-al-sahab-riyadh','nozol-al-dar-madinah','nozol-khayala-jeddah','malfa-al-hawya-taif','malfa-tabuk-hills',
  'king-abdullah-road-starbucks-riyadh','western-ring-road-starbucks-al-uraija','prince-mohammed-bin-salman-starbucks-al-aqiq',
]
