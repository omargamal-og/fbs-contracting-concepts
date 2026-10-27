// This module is imported ONLY behind import.meta.env.DEV. Never publish these source records.
import { translations } from '../../i18n/translations'
import type { Language } from '../../content/database.types'
import { projects } from '../../data/projects'
import heroArtwork from '../../assets/images/home/fbs-hero-architecture.webp'
import type { HomepageView, MediaRef } from './model'
export function developmentHomepage(language: Language): HomepageView {
  const t = translations[language]
  const h = t.home
  const editorial = (section: { titleLine1: string; titleLine2: string; description: string }) => ({ title: section.titleLine1 + '\n' + section.titleLine2, summary: section.description })
  const image = (id: string,url: string,alt: string): MediaRef => ({ id, type:'image',developmentUrl:url,alt })
  return {
    language, source:'development', hero:editorial(h.hero),
    heroMedia:[{id:'development-artwork',media:image('development-artwork',heroArtwork,language === 'ar' ? 'تصور معماري من ملفات العرض الحالية، بانتظار الاعتماد' : 'Architectural presentation artwork from the repository; approval pending'),focalPoint:{x:65,y:50}}],
    company:{...editorial(h.companyIntroduction),body:h.companyIntroduction.secondaryText}, expertise:editorial(h.capabilities),
    services:h.capabilities.items.map((title,index)=>({id:'service-'+index,title,summary:h.capabilities.description})),
    // Existing artwork figures, explicitly marked as unapproved by the preview UI.
    statistics:[
      {id:'projectValue',label:h.hero.statistics.labels.projectValue,value:1200000000,unit:h.hero.statistics.currencyUnit,qualifier:'plus',divisor:1000000000,referenceDate:null},
      {id:'residentialUnits',label:h.hero.statistics.labels.residentialUnits,value:3000,unit:null,qualifier:'plus',divisor:1,referenceDate:null},
      {id:'builtUpArea',label:h.hero.statistics.labels.builtUpArea,value:800000,unit:'m²',qualifier:'plus',divisor:1000,referenceDate:null},
    ],
    projects:projects.map(project=>{
      const media = project.image ? image(project.slug,project.image,project.name[language]) : undefined
      return {id:project.slug,slug:project.slug,name:project.name[language],location:project.location[language],
        category:t.home.projectCategories[project.category].title,summary:null,image:media,gallery:media?[media]:[],
        deliveryStatus:'unspecified',period:project.constructionPeriod??null,units:project.units??null,coordinates:null,published:false}
    }),
    news:[], sustainability:editorial(h.sustainability), vision:editorial(h.vision2030),
    contact:{email:null,phone:null,socials:[]},
  }
}

