import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import context from '../geography/regional-context.json'
import { projectPoint } from './model'

/** Cartographic context, not terrain/elevation or project coverage. */
export function createWorldEnvironment(){
 const group=new THREE.Group();group.name='regional-land-and-water'
 const time={value:0}
 const waterMaterial=new THREE.MeshPhysicalMaterial({color:'#B9DAF2',roughness:.36,metalness:.06,clearcoat:.25,toneMapped:false})
 waterMaterial.onBeforeCompile=shader=>{
  shader.uniforms.uWorldTime=time
  shader.uniforms.uWaterLight={value:new THREE.Color('#B9DAF2')};shader.uniforms.uWaterSky={value:new THREE.Color('#649ABD')}
  shader.vertexShader='varying vec2 vWaterPoint;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvWaterPoint=position.xy;')
  shader.fragmentShader='uniform float uWorldTime;\nuniform vec3 uWaterLight;\nuniform vec3 uWaterSky;\nvarying vec2 vWaterPoint;\n'+shader.fragmentShader
   .replace('#include <normal_fragment_begin>','#include <normal_fragment_begin>\nnormal=normalize(normal+vec3(sin(vWaterPoint.x*2.3+vWaterPoint.y*.7+uWorldTime*.38)*.018,cos(vWaterPoint.y*2.7-uWorldTime*.29)*.018,0.0));')
   .replace('#include <color_fragment>','#include <color_fragment>\nfloat fbsWaterSheen=sin(vWaterPoint.x*.65+vWaterPoint.y*.4-uWorldTime*.12)*.5+.5;')
   .replace('#include <opaque_fragment>','float fbsWaterRipple=pow(sin(vWaterPoint.x*2.4+sin(vWaterPoint.y*.7)-uWorldTime*.32)*.5+.5,20.0);\noutgoingLight=mix(uWaterSky,uWaterLight,.25+pow(fbsWaterSheen,5.0)*.13+fbsWaterRipple*.025)+totalSpecular*.1;\n#include <opaque_fragment>')
 }
 waterMaterial.customProgramCacheKey=()=> 'fbs-calm-water-v1'
 // Extend beyond the widest responsive frustum so the surface has no visible edge.
 const water=new THREE.Mesh(new THREE.PlaneGeometry(600,600),waterMaterial)
 water.name='water-surface';water.rotation.x=-Math.PI/2;water.position.y=-.09;group.add(water)
 const landMaterial=new THREE.MeshStandardMaterial({color:'#CED8CE',roughness:.92,metalness:0})
 landMaterial.onBeforeCompile=shader=>{
  shader.vertexShader='varying vec3 vContextPoint;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvContextPoint=position;')
  shader.fragmentShader='varying vec3 vContextPoint;\n'+shader.fragmentShader.replace('#include <normal_fragment_begin>','#include <normal_fragment_begin>\nnormal=normalize(normal+vec3(sin(vContextPoint.x*1.3+vContextPoint.z*.45)*.06,cos(vContextPoint.z*1.5)*.04,0.0));').replace('#include <color_fragment>','#include <color_fragment>\nfloat grain=sin(vContextPoint.x*47.0+sin(vContextPoint.z*53.0))*sin(vContextPoint.z*63.0);\ndiffuseColor.rgb*=.97+grain*.025;')
 }
 const coastMaterial=new THREE.LineBasicMaterial({color:'#A1B4BF',transparent:true,opacity:.22})
 const landGeometries:THREE.BufferGeometry[]=[],coastPoints:number[]=[]
 for(const feature of context.features){
  const polygons=feature.geometry.type==='MultiPolygon'?feature.geometry.coordinates:[feature.geometry.coordinates]
  for(const polygon of polygons as number[][][][]){
   const shape=new THREE.Shape()
   polygon.forEach((ring,index)=>{
    const path=index===0?shape:new THREE.Path()
    ring.forEach((point,i)=>{const [x,z]=projectPoint(point);if(i===0)path.moveTo(x,-z);else path.lineTo(x,-z)})
    path.closePath();if(index>0)shape.holes.push(path)
   })
   const geometry=new THREE.ExtrudeGeometry(shape,{depth:.055,bevelEnabled:false,curveSegments:1,steps:1});geometry.rotateX(-Math.PI/2)
   landGeometries.push(geometry)
   for(const ring of polygon){
    for(let index=1;index<ring.length;index++){const[a,b]=projectPoint(ring[index-1]),[x,z]=projectPoint(ring[index]);coastPoints.push(a,.06,b,x,.06,z)}
   }
  }
 }
 const land=new THREE.Mesh(mergeGeometries(landGeometries,false)!,landMaterial);land.name='regional-land';land.receiveShadow=true;group.add(land);landGeometries.forEach(geometry=>geometry.dispose())
 const coastGeometry=new THREE.BufferGeometry();coastGeometry.setAttribute('position',new THREE.Float32BufferAttribute(coastPoints,3));group.add(new THREE.LineSegments(coastGeometry,coastMaterial))
 return{
  group,
  animate(seconds:number){time.value=seconds},
  dispose(){
   group.removeFromParent();group.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.Line)object.geometry.dispose()})
   waterMaterial.dispose();landMaterial.dispose();coastMaterial.dispose()
  },
 }
}
