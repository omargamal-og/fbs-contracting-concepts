import assert from 'node:assert/strict'
import { test } from 'node:test'
import { emptyHomepage, verifiedMapProjects, safeLinkedInUrl, v2Path } from '../../src/contracting/site/v2/content/model.ts'
import { publishedMedia } from '../../src/contracting/site/v2/content/loadHomepage.ts'
import { v2Dictionary } from '../../src/contracting/site/v2/i18n.ts'
const project={id:'test',published:true,coordinates:{latitude:24,longitude:46,precision:'site'}}
test('map eligibility requires published projects and bounded verified coordinates',()=>{
  const invalid=[{...project,published:false},{...project,coordinates:null},{...project,coordinates:{latitude:91,longitude:46,precision:'site'}},{...project,coordinates:{latitude:24,longitude:181,precision:'site'}},{...project,coordinates:{latitude:NaN,longitude:46,precision:'site'}},{...project,coordinates:{latitude:24,longitude:46,precision:'unknown'}}]
  assert.deepEqual(verifiedMapProjects(invalid),[])
  assert.equal(verifiedMapProjects([project]).length,1)
  assert.equal(verifiedMapProjects([{...project,coordinates:{latitude:0,longitude:0,precision:'site'}}]).length,1)
})
test('unavailable production presentation contains no company claims, statistics, media, or coordinates',()=>{
  for(const language of ['ar','en']){
    const empty=emptyHomepage(language)
    assert.equal(empty.source,'unavailable')
    for(const key of ['statistics','projects','news','heroMedia','services'])assert.deepEqual(empty[key],[])
    assert.equal(empty.company.summary,'')
    assert.equal(empty.contact.email,null)
  }
})
test('public media adapter rejects drafts, unapproved records, and absent objects',()=>{
  const row={item:{id:'asset',publication_status:'published',approval_status:'approved'},translation:{title:'Approved asset',alt_text:null},details:{media_type:'image',object_path:'asset/image.webp',width:1600,height:900}}
  assert.equal(publishedMedia(row).type,'image')
  assert.equal(publishedMedia({...row,item:{...row.item,publication_status:'draft'}}),undefined)
  assert.equal(publishedMedia({...row,item:{...row.item,approval_status:'unreviewed'}}),undefined)
  assert.equal(publishedMedia({...row,details:{...row.details,object_path:null}}),undefined)
})
test('LinkedIn original links accept only HTTPS LinkedIn URLs',()=>{
  for(const value of ['https://linkedin.com.evil.test/post','javascript:alert(1)','http://linkedin.com/post','https://evil.test/post'])assert.equal(safeLinkedInUrl(value),null)
  assert.equal(safeLinkedInUrl('https://www.linkedin.com/posts/test'),'https://www.linkedin.com/posts/test')
})
test('bilingual interface keys match and Arabic strings retain Unicode',()=>{
  const en=v2Dictionary('en'),ar=v2Dictionary('ar')
  assert.deepEqual(Object.keys(en).sort(),Object.keys(ar).sort())
  assert.ok(Object.values(ar).every(value=>value==='English'||/[\u0600-\u06ff]/.test(value)))
  assert.ok(!Object.values(ar).some(value=>/\?{3,}/.test(value)))
  assert.ok(ar.mapTitle.includes('\n'))
})
test('V2 routes are isolated from the current build route',()=>{
  assert.equal(v2Path(),'/contracting/v2')
  assert.equal(v2Path('/projects/test'),'/contracting/v2/projects/test')
})

