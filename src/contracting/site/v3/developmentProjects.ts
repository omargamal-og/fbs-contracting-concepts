// Imported only behind Vite's DEV boundary. No statistics or news fixtures.
import { projects } from '../data/projects'
import type { SiteLanguage } from '../i18n/types'
import type { MapProject } from './map/model'
export function developmentProjects(language:SiteLanguage):MapProject[]{return projects.map(project=>({
 id:project.slug,slug:project.slug,name:project.name[language],location:project.location[language],category:null,summary:null,
 image:project.image?{id:project.slug,type:'image',developmentUrl:project.image,alt:project.name[language]}:undefined,
 gallery:[],deliveryStatus:'unspecified',period:null,units:null,coordinates:null,published:false,cityKey:project.region,
}))}
