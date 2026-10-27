import { Link, useParams } from 'react-router-dom'
import type { HomepageView } from './content/model'
import { v2Path } from './content/model'
import { v2Dictionary } from './i18n'
import { Arrow, Eyebrow, MediaImage, TextLink } from './components/primitives'
import { Motion } from './motion/Motion'
export default function DetailPage({data,type}:{data:HomepageView;type:'project'|'news'|'notfound'}) {
  const {slug}=useParams(),t=v2Dictionary(data.language)
  const project=type==='project'?data.projects.find(row=>row.slug===slug):null
  const article=type==='news'?data.news.find(row=>row.slug===slug):null
  if(!project&&!article)return <main id="v2-main" className="v2-detail v2-paper v2-container"><Eyebrow>{t.heroEyebrow}</Eyebrow><h1>{t.notFound}</h1><TextLink to={v2Path()}>{t.backHome}</TextLink></main>
  return <Motion identity={data.language+':'+slug}><main id="v2-main" className="v2-detail v2-paper"><div className="v2-container">
    <Link className="v2-text-link" to={v2Path()+(project?'#v2-projects':'#v2-news')}><Arrow/>{project?t.projects:t.news}</Link>
    <Eyebrow>{project?.category??t.news}</Eyebrow><h1 data-reveal>{project?.name??article?.title}</h1>
    {data.source==='development'&&<p className="v2-detail-preview">{t.previewProject}</p>}
    <div className="v2-detail-image" data-image-mask><MediaImage media={project?.image??article?.image} eager/></div>
    {project&&<div className="v2-detail-information"><h2>{t.projectDetails}</h2><dl>
      {project.location&&<div><dt>{t.location}</dt><dd>{project.location}</dd></div>}
      {project.period&&<div><dt>{t.period}</dt><dd><bdi>{project.period.startYear} — {project.period.endYear}</bdi></dd></div>}
      {project.units&&<div><dt>{t.units}</dt><dd>{new Intl.NumberFormat(data.language).format(project.units.count)} {project.units.type==='apartments'?t.apartments:t.villas}</dd></div>}
    </dl>{project.summary&&<p>{project.summary}</p>}</div>}
    {article&&<article className="v2-article-copy">{article.date&&<time dateTime={article.date}>{new Intl.DateTimeFormat(data.language,{dateStyle:'long'}).format(new Date(article.date+'T00:00:00Z'))}</time>}
      <p className="v2-lead">{article.excerpt}</p>{article.body.split(/\n\s*\n/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}
      {article.linkedinUrl&&<a href={article.linkedinUrl} target="_blank" rel="noopener noreferrer" className="v2-text-link">{t.originalPost}<Arrow diagonal/></a>}</article>}
    {project&&project.gallery.length>1&&<div className="v2-detail-gallery">{project.gallery.slice(1).map(media=><MediaImage key={media.id} media={media}/>)}</div>}
  </div></main></Motion>
}

