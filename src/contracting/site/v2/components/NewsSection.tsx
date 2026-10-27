import { Link } from 'react-router-dom'
import { v2Path, type HomepageView } from '../content/model'
import { v2Dictionary } from '../i18n'
import { Arrow, Eyebrow, MediaImage } from './primitives'
export function NewsSection({data}:{data:HomepageView}) {
  const t=v2Dictionary(data.language)
  return <section id="v2-news" className="v2-news v2-paper v2-section" aria-labelledby="v2-news-heading"><div className="v2-container">
    <div className="v2-section-heading" data-reveal><div><Eyebrow>{t.newsEyebrow}</Eyebrow><h2 id="v2-news-heading">{t.newsTitle}</h2></div></div>
    {data.news.length?<div className="v2-news-editorial">{data.news.slice(0,3).map((article,index)=><article key={article.id} className={'news-feature-'+index} data-reveal>
      {article.image&&<Link to={v2Path('news/'+article.slug)} className="v2-news-image"><MediaImage media={article.image}/></Link>}
      {article.date&&<time dateTime={article.date}>{new Intl.DateTimeFormat(data.language==='ar'?'ar-SA':'en-GB',{day:'numeric',month:'long',year:'numeric'}).format(new Date(article.date+'T00:00:00Z'))}</time>}
      <h3><Link to={v2Path('news/'+article.slug)}>{article.title}</Link></h3>{article.excerpt&&<p>{article.excerpt}</p>}
      <Link className="v2-text-link" to={v2Path('news/'+article.slug)}>{t.readArticle}<Arrow/></Link>
      {article.linkedinUrl&&<a href={article.linkedinUrl} target="_blank" rel="noopener noreferrer" className="v2-news-source">{t.originalPost} ↗</a>}
    </article>)}</div>:<div className="v2-news-empty" data-reveal><span className="v2-news-symbol" aria-hidden="true"><span/><span/><span/></span><div><h3>{t.newsEmpty}</h3><p>{t.newsEmptyNote}</p></div><Arrow diagonal/></div>}
  </div></section>
}

