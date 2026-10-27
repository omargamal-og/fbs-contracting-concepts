import * as THREE from 'three'
import boundary from '../geography/saudi-boundary.json'
import { projectPoint } from './model'

// Uniform shared-edge subdivision avoids T-junction cracks when relief is raised.
function subdivide(source:THREE.BufferGeometry){
 const attribute=source.getAttribute('position'),points=Array.from({length:attribute.count},(_,index)=>new THREE.Vector3().fromBufferAttribute(attribute,index))
 let indices=Array.from(source.index!.array)
 for(let step=0;step<3;step++){
  const midpoints=new Map<string,number>(),next:number[]=[]
  const midpoint=(a:number,b:number)=>{const key=Math.min(a,b)+':'+Math.max(a,b),found=midpoints.get(key);if(found!==undefined)return found;const index=points.length;points.push(points[a].clone().add(points[b]).multiplyScalar(.5));midpoints.set(key,index);return index}
  for(let index=0;index<indices.length;index+=3){const a=indices[index],b=indices[index+1],c=indices[index+2],ab=midpoint(a,b),bc=midpoint(b,c),ca=midpoint(c,a);next.push(a,ab,ca,ab,b,bc,ca,bc,c,ab,bc,ca)}
  indices=next
 }
 const geometry=new THREE.BufferGeometry().setFromPoints(points);geometry.setIndex(indices);return geometry
}

// An architectural relief model, explicitly not surveyed terrain or elevation.
export function createDioramaLand(){
 const group=new THREE.Group();group.name='saudi-architectural-relief'
 const polygons=(boundary.geometry.type==='MultiPolygon'?boundary.geometry.coordinates:[boundary.geometry.coordinates]) as number[][][][]
 const outline=polygons.flatMap(polygon=>polygon[0].map(point=>{const[x,z]=projectPoint(point);return new THREE.Vector3(x,.2,z)}))
 const edges=polygons.flatMap(polygon=>polygon.flatMap(ring=>ring.slice(1).flatMap((point,index)=>{const[a,z]=projectPoint(ring[index]),[b,w]=projectPoint(point),dx=b-a,dz=w-z;return[a,z,dx,dz,1/(dx*dx+dz*dz||1)]})))
 const heightCache=new Map<string,number>(),base=.18
 function heightAt(x:number,z:number){
  const key=x.toFixed(4)+':'+z.toFixed(4),cached=heightCache.get(key);if(cached!==undefined)return cached
  let distanceSquared=Infinity
  for(let edge=0;edge<edges.length;edge+=5){const px=x-edges[edge],pz=z-edges[edge+1],dx=edges[edge+2],dz=edges[edge+3],t=Math.max(0,Math.min(1,(px*dx+pz*dz)*edges[edge+4])),ex=px-t*dx,ez=pz-t*dz;distanceSquared=Math.min(distanceSquared,ex*ex+ez*ez)}
  const taper=THREE.MathUtils.smoothstep(Math.sqrt(distanceSquared),0,.65)
  const fold=Math.exp(-Math.pow(x+z*.22+2,2)/4)*(.22+.36*Math.pow(Math.sin(z*.55+.8),2))
  const relief=(.07+.15*Math.pow(Math.sin(x*.8+Math.sin(z*.55)),2)+fold)*taper
  const result=base+.018+relief;heightCache.set(key,result);return result
 }
 const top=new THREE.MeshPhysicalMaterial({color:'#DBD8C8',roughness:.83,metalness:.025,clearcoat:.08,vertexColors:true})
 top.onBeforeCompile=shader=>{
  shader.vertexShader='varying vec3 vDioramaPoint;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvDioramaPoint=position;')
  shader.fragmentShader='varying vec3 vDioramaPoint;\n'+shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\nfloat grain=sin(vDioramaPoint.x*79.0+sin(vDioramaPoint.z*71.0))*sin(vDioramaPoint.z*83.0);\nfloat strata=pow(sin(vDioramaPoint.y*65.0)*.5+.5,16.0);\ndiffuseColor.rgb*=1.0+grain*.024-strata*.045;')
 }
 top.customProgramCacheKey=()=> 'fbs-stylized-mineral-relief-v1'
 const side=new THREE.MeshStandardMaterial({color:'#ADBDB9',roughness:.88})
 const hiddenCap=new THREE.MeshBasicMaterial({visible:false})
 const coastline=new THREE.LineBasicMaterial({color:'#F7FAEF',transparent:true,opacity:.92})
 for(const polygon of polygons){
  const shape=new THREE.Shape()
  polygon.forEach((ring,index)=>{const path=index?new THREE.Path():shape;ring.forEach((point,i)=>{const[x,z]=projectPoint(point);if(i)path.lineTo(x,-z);else path.moveTo(x,-z)});path.closePath();if(index)shape.holes.push(path)})
  const source=new THREE.ShapeGeometry(shape),tessellated=subdivide(source);source.dispose();tessellated.rotateX(-Math.PI/2)
  const positions=tessellated.getAttribute('position'),colors=new Float32Array(positions.count*3),mineral=new THREE.Color('#FFFFFF'),low=new THREE.Color('#BCC8C0')
  for(let index=0;index<positions.count;index++){const x=positions.getX(index),z=positions.getZ(index),y=heightAt(x,z);positions.setY(index,y);const color=low.clone().lerp(mineral,.5+Math.min(.5,(y-base)*.75));color.toArray(colors,index*3)}
  tessellated.setAttribute('color',new THREE.BufferAttribute(colors,3));const geometry=tessellated;geometry.computeVertexNormals()
  const land=new THREE.Mesh(geometry,top);land.castShadow=true;land.receiveShadow=true;group.add(land)
  const edgeGeometry=new THREE.ExtrudeGeometry(shape,{depth:base,bevelEnabled:true,bevelThickness:.018,bevelSize:.012,bevelSegments:2,steps:1,curveSegments:1});edgeGeometry.rotateX(-Math.PI/2)
  const edge=new THREE.Mesh(edgeGeometry,[hiddenCap,side]);edge.castShadow=true;edge.receiveShadow=true;group.add(edge)
  for(const ring of polygon){const points=ring.map(point=>{const[x,z]=projectPoint(point);return new THREE.Vector3(x,base+.026,z)});group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points),coastline))}
 }
 return{group,heightAt,outline,dispose(){group.removeFromParent();group.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.Line)object.geometry.dispose()});top.dispose();side.dispose();hiddenCap.dispose();coastline.dispose()}}
}
