import fs from 'node:fs'
import {createHash} from 'node:crypto'
const source=fs.readFileSync('supabase/seed.sql','utf8'),rows=[]
const text="'((?:[^']|'')*)'"
for(const match of source.matchAll(/insert into public\.statistics .*? select '([^']+)',([\d.]+),(null|'[^']*'),'([^']+)',([\d.]+),null where/g)){
 const [,id,value,unit,qualifier,divisor]=match,labels={}
 for(const language of ['en','ar']){
  const translated=source.match(new RegExp('insert into public\\.content_translations .*? select '+"'"+id+"','"+language+"',"+text))
  if(!translated?.[1])throw new Error('Missing '+language+' label for '+id)
  labels[language]=translated[1].replaceAll("''", "'")
 }
 if(!Number.isFinite(+value)||!Number.isFinite(+divisor)||+divisor<=0)throw new Error('Invalid draft statistic '+id)
 rows.push({id,value:+value,unit:unit==='null'?null:unit.slice(1,-1),qualifier,divisor:+divisor,referenceDate:null,labels})
}
if(rows.length!==7)throw new Error('Expected exactly seven stored draft metrics; found '+rows.length)
const file='src/contracting/site/v3/reviewStatistics.development.ts'
const code="// Generated from the existing draft SQL seed, for local visual review only.\n// Never imported outside import.meta.env.DEV; no approval state is changed.\nimport type { SiteLanguage } from '../i18n/types'\nimport type { StatisticView } from '../v2/content/model'\nconst records="+JSON.stringify(rows,null,2)+"\nexport function reviewStatistics(language:SiteLanguage):StatisticView[]{return records.map(({labels,...record})=>({...record,label:labels[language]}))}\n"
if(process.argv.includes('--check')){if(fs.readFileSync(file,'utf8')!==code)throw new Error('Review metrics differ from SQL seed')}else fs.writeFileSync(file,code)
console.log('Verified seven stored draft metrics; seed SHA-256 '+createHash('sha256').update(source).digest('hex'))
