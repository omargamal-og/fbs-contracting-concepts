import * as THREE from 'three'
import { cities,projectPoint } from './model'

/** Abstract city models at reference-city positions; never actual project footprints. */
export function createCityArchitecture(heightAt:(x:number,z:number)=>number){
 const group=new THREE.Group();group.name='illustrative-city-architecture'
 const box=new THREE.BoxGeometry(1,1,1),disc=new THREE.CylinderGeometry(.35,.37,.035,48),ring=new THREE.RingGeometry(.36,.38,64)
 const stone=new THREE.MeshStandardMaterial({color:'#F4F5EB',roughness:.6}),glass=new THREE.MeshPhysicalMaterial({color:'#39718C',metalness:.22,roughness:.24,clearcoat:.6}),base=new THREE.MeshStandardMaterial({color:'#A8BEC0',roughness:.55})
 const rings:THREE.Mesh[]=[];const positions:THREE.Vector3[]=[]
 const stems:THREE.Mesh[]=[]
 cities.forEach((city,index)=>{
  const[x,z]=projectPoint(city.coordinates),y=heightAt(x,z)+.04,cityGroup=new THREE.Group();cityGroup.position.set(x,y,z);group.add(cityGroup)
  const plinth=new THREE.Mesh(disc,base);plinth.receiveShadow=true;cityGroup.add(plinth)
  for(const[dx,dz,width,depth,height]of [[-.14,.02,.15,.15,.35],[.055,-.07,.13,.15,.75],[.18,.1,.1,.12,.27]]){
   const building=new THREE.Mesh(box,stone);building.scale.set(width,height,depth);building.position.set(dx,height/2+.03,dz);building.castShadow=true;building.receiveShadow=true;cityGroup.add(building)
   const facade=new THREE.Mesh(box,glass);facade.scale.set(width+.004,height*.68,.006);facade.position.set(dx,height*.48+.03,dz+depth/2+.004);cityGroup.add(facade)
  }
  const stem=new THREE.Mesh(new THREE.CylinderGeometry(.012,.018,.64,8),new THREE.MeshBasicMaterial({color:'#B9DAF2',transparent:true,opacity:.75}));stem.position.set(0,.65,0);cityGroup.add(stem);stems.push(stem)
  const material=new THREE.MeshBasicMaterial({color:'#649ABD',side:THREE.DoubleSide,transparent:true,opacity:.5,depthWrite:false})
  const halo=new THREE.Mesh(ring,material);halo.rotation.x=-Math.PI/2;halo.position.y=.025;cityGroup.add(halo);rings.push(halo)
  positions.push(new THREE.Vector3(x,y+1.02,z));cityGroup.name=city.id;cityGroup.rotation.y=index*.3
 })
 let selected=0
 function select(index:number){selected=index;rings.forEach((ring,i)=>{(ring.material as THREE.MeshBasicMaterial).color.set(i===selected?'#082F4D':'#649ABD');ring.scale.setScalar(i===selected?1.25:1)})}
 select(0)
 return{group,positions,select,animate(seconds:number){rings.forEach((ring,index)=>{const phase=(seconds*.24+index*.18)%1;ring.scale.setScalar((index===selected?1.3:1)+phase*.9);(ring.material as THREE.MeshBasicMaterial).opacity=(1-phase)*(index===selected?.7:.35);stems[index].scale.y=1+Math.sin(seconds*1.35+index)*.06})},dispose(){group.removeFromParent();const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>();group.traverse(object=>{if(object instanceof THREE.Mesh){geometries.add(object.geometry);for(const material of Array.isArray(object.material)?object.material:[object.material])materials.add(material)}});geometries.forEach(geometry=>geometry.dispose());materials.forEach(material=>material.dispose())}}
}
