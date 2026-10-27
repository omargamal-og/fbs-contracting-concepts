import type { HomepageView } from './content/model'
import { CinematicHero } from './components/CinematicHero'
import { ImpactSection, CompanySection, ExpertiseSection, ProjectsSection, SustainabilitySection, ConnectSection } from './components/EditorialSections'
import { ProjectMapSection } from './components/ProjectMapSection'
import { NewsSection } from './components/NewsSection'
import { Motion } from './motion/Motion'
export default function HomePage({data}:{data:HomepageView}) {
  return <Motion identity={data.language+':'+data.source+':'+data.projects.length}><main id="v2-main">
    <CinematicHero data={data}/><ImpactSection data={data}/><CompanySection data={data}/><ExpertiseSection data={data}/>
    <ProjectsSection data={data}/><ProjectMapSection data={data}/><NewsSection data={data}/><SustainabilitySection data={data}/><ConnectSection data={data}/>
  </main></Motion>
}

