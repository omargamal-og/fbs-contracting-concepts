import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createDioramaLand } from './dioramaLand'
import { createCityArchitecture } from './cityArchitecture'
import { cities, projectPoint } from './model'
import { createWorldEnvironment } from './worldEnvironment'

export type SceneAction = 'reset' | 'left' | 'right' | 'in' | 'out'
export type SaudiScene = ReturnType<typeof createSaudiScene>

// One capped visible animation loop; static shadows are cached. No tiles or token.
export function createSaudiScene(host: HTMLElement, pins: HTMLElement[], reduced: boolean, onFailure: () => void) {
  const setupStarted=performance.now()
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.VSMShadowMap
  renderer.shadowMap.autoUpdate = false
  renderer.shadowMap.needsUpdate = true
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  renderer.setClearColor('#EEF4F6', 1)
  renderer.domElement.setAttribute('aria-hidden', 'true')
  host.prepend(renderer.domElement)
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(35, 1, 0.1, 500)
  const home = new THREE.Vector3(2.5, 23, 23), center = new THREE.Vector3(-0.7, 0.25, -0.5)
  scene.fog=new THREE.Fog('#EEF4F6',40,85)
  camera.position.copy(home)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.copy(center); controls.enablePan = false; controls.enableDamping = false
  // Keep the country legible instead of flattening it against an empty horizon.
  controls.minDistance = 30.5; controls.maxDistance = 37
  controls.minPolarAngle = 0.55; controls.maxPolarAngle = 0.92
  controls.minAzimuthAngle = -0.32; controls.maxAzimuthAngle = 0.45
  controls.enabled = false; controls.update()

  scene.add(new THREE.HemisphereLight('#FFFFFF', '#B9DAF2', 1.7))
  const fill = new THREE.DirectionalLight('#B9DAF2', .9); fill.position.set(14, 10, -8); scene.add(fill)
  const light = new THREE.DirectionalLight('#FFFFFF', 2.3)
  light.position.set(-8, 19, -7); light.castShadow = true
  light.shadow.mapSize.set(1024, 1024)
  Object.assign(light.shadow.camera, { left: -20, right: 20, top: 20, bottom: -20, near: 1, far: 65 })
  light.shadow.normalBias = 0.025; light.shadow.radius = 4; light.shadow.blurSamples = 8; scene.add(light)
  const world=createWorldEnvironment();scene.add(world.group)
  const land=createDioramaLand();scene.add(land.group)
  const architecture=createCityArchitecture(land.heightAt);scene.add(architecture.group)
  const positions=architecture.positions
  const highlight=(id:string)=>architecture.select(cities.findIndex(city=>city.id===id))

  let active = false, disposed = false, frame = 0,ambient=true,lastPaint=0,ambientTime=0,inTick=false,flight: { start: number; from: THREE.Vector3; to: THREE.Vector3; targetFrom: THREE.Vector3; targetTo: THREE.Vector3 } | undefined
  const idleAnchor=new THREE.Spherical(),idlePose=new THREE.Spherical();let idleTime=0
  const captureIdle=()=>{idleAnchor.setFromVector3(camera.position.clone().sub(controls.target));idleTime=0}
  captureIdle()
  let idleTimer=0,idleReady=false,dragging=false
  const canAnimate=()=>ambient&&!reduced&&(!controls.enabled||idleReady)
  const state=()=>{host.dataset.mapAmbient=reduced?'reduced':!active?'offscreen':document.hidden?'hidden':canAnimate()?'running':'paused'}
  const labelSizes=new Map<HTMLElement,{key:string;width:number;height:number}>()
  const render = () => {
    if (!active || disposed || document.hidden) return
    renderer.render(scene, camera)
    host.dataset.mapDrawCalls??=String(renderer.info.render.calls);host.dataset.mapTriangles??=String(renderer.info.render.triangles)
    host.querySelectorAll<HTMLElement>('[data-map-sea]').forEach(label=>{const coordinates=label.dataset.mapSea!.split(',').map(Number),[x,z]=projectPoint(coordinates),point=new THREE.Vector3(x,.04,z).project(camera);label.style.left=(point.x+1)*host.clientWidth/2+'px';label.style.top=(1-point.y)*host.clientHeight/2+'px'})
    host.dataset.renderCount = String(Number(host.dataset.renderCount || 0) + 1)
    const width=host.clientWidth,height=host.clientHeight
    const outline=land.outline.map(point=>point.clone().project(camera)),bounds=[Math.min(...outline.map(point=>(point.x+1)*width/2)),Math.min(...outline.map(point=>(1-point.y)*height/2)),Math.max(...outline.map(point=>(point.x+1)*width/2)),Math.max(...outline.map(point=>(1-point.y)*height/2))]
    host.dataset.mapBounds=JSON.stringify(bounds.map(value=>Math.round(value*10)/10))
    // Cache natural label sizes outside the per-frame style writes. At tight
    // viewpoints, retain a clickable photographic beacon instead of overlapping names.
    const labels=pins.map((pin,index)=>{
      const key=pin.textContent+':'+width;let size=labelSizes.get(pin)
      if(size?.key!==key){pin.classList.remove('is-condensed');size={key,width:pin.offsetWidth,height:pin.offsetHeight};labelSizes.set(pin,size)}
      return{pin,index,size}
    }).sort((a,b)=>Number(b.pin.classList.contains('is-selected'))-Number(a.pin.classList.contains('is-selected')))
    const occupied:{left:number;right:number;top:number;bottom:number}[]=[]
    labels.forEach(({pin,index,size}) => {
      const p = positions[index].clone().project(camera)
      const x = (p.x + 1) * width / 2, y = (1 - p.y) * height / 2
      const shift = cities[index].id === 'taif' ? 'translate(-5%, 0)' : cities[index].id === 'jeddah' ? 'translate(-95%, -100%)' : 'translate(-50%, -100%)'
      const left=x-size.width*(cities[index].id==='taif'?.05:cities[index].id==='jeddah'?.95:.5),top=y-(cities[index].id==='taif'?0:size.height)
      const box={left,right:left+size.width,top,bottom:top+size.height},visible=p.z<1&&x>0&&x<width&&y>0&&y<height
      const condensed=visible&&occupied.some(other=>box.left<other.right+4&&box.right>other.left-4&&box.top<other.bottom+4&&box.bottom>other.top-4)
      if(visible&&!condensed)occupied.push(box)
      pin.classList.toggle('is-condensed',condensed)
      pin.style.transform = `translate(${x}px, ${y}px) ${condensed?'translate(-50%, -50%)':shift}`
      pin.style.visibility = visible ? 'visible' : 'hidden'
    })
  }
  const schedule=()=>{state();if(!frame&&active&&!document.hidden&&!disposed&&(flight||canAnimate()))frame=requestAnimationFrame(tick)}
  const holdManual=()=>{idleReady=false;clearTimeout(idleTimer);captureIdle();if(controls.enabled&&!reduced)idleTimer=window.setTimeout(()=>{if(disposed||dragging)return;idleReady=true;captureIdle();schedule()},4000)}
  const tick = (now: number) => {
    frame = 0;if(!active||document.hidden||disposed)return
    const interval=host.clientWidth<768?50:1000/30
    if(!flight&&now-lastPaint<interval){schedule();return}
    inTick=true
    if(flight){const progress=Math.min(1,(now-flight.start)/850),eased=1-Math.pow(1-progress,3);camera.position.lerpVectors(flight.from,flight.to,eased);controls.target.lerpVectors(flight.targetFrom,flight.targetTo,eased);controls.update();if(progress===1){flight=undefined;captureIdle()}}
    if(canAnimate()){
      const delta=Math.min((now-lastPaint)/1000,.06);ambientTime+=delta;world.animate(ambientTime)
      if(!flight){idleTime+=delta;idlePose.copy(idleAnchor);idlePose.theta=THREE.MathUtils.clamp(idleAnchor.theta+Math.sin(idleTime*.22)*.06,controls.minAzimuthAngle,controls.maxAzimuthAngle);idlePose.phi=THREE.MathUtils.clamp(idleAnchor.phi+Math.sin(idleTime*.18)*.016,controls.minPolarAngle,controls.maxPolarAngle);camera.position.setFromSpherical(idlePose).add(controls.target);camera.lookAt(controls.target)}
      architecture.animate(ambientTime)
      fill.intensity=.9+Math.sin(ambientTime*.4)*.12
    }
    inTick=false;lastPaint=now;render();schedule()
  }
  const fly = (position: THREE.Vector3, target: THREE.Vector3) => {
    cancelAnimationFrame(frame);frame=0
    if (reduced) { camera.position.copy(position); controls.target.copy(target); if (!controls.update()) render(); return }
    flight = { start: performance.now(), from: camera.position.clone(), to: position, targetFrom: controls.target.clone(), targetTo: target }
    schedule()
  }
  const resize = () => { const width = host.clientWidth, height = host.clientHeight; if (!width || !height) return; renderer.setSize(width, height, false); camera.aspect = width / height; camera.fov = Math.max(40, 2 * Math.atan(.4 / camera.aspect) * 180 / Math.PI); const rtl=host.closest('[dir]')?.getAttribute('dir')==='rtl';const shift=width>=1000?width*.125:0;camera.setViewOffset(width,height,rtl?-shift:shift,0,width,height); camera.updateProjectionMatrix(); render() }
  const observer = new ResizeObserver(resize); observer.observe(host)
  const directionObserver=new MutationObserver(resize);const directionRoot=host.closest('[dir]');if(directionRoot)directionObserver.observe(directionRoot,{attributes:true,attributeFilter:['dir']})
  void document.fonts.ready.then(()=>{if(!disposed){labelSizes.clear();render()}})
  controls.addEventListener('change',()=>{if(!inTick)render()})
  const cancelFlight = () => { cancelAnimationFrame(frame); frame = 0; flight = undefined;dragging=true;idleReady=false;clearTimeout(idleTimer);captureIdle();state() }
  controls.addEventListener('start', cancelFlight)
  controls.addEventListener('end',()=>{dragging=false;holdManual()})
  const lost = (event: Event) => { event.preventDefault(); onFailure() }
  renderer.domElement.addEventListener('webglcontextlost', lost)
  const visibility = () => {cancelAnimationFrame(frame);frame=0;lastPaint=performance.now();captureIdle();if(flight){flight.start=performance.now();flight.from.copy(camera.position);flight.targetFrom.copy(controls.target)}state();if(!document.hidden&&active){render();schedule()}}
  document.addEventListener('visibilitychange', visibility)
  resize()
  host.dataset.mapSetupMs=(performance.now()-setupStarted).toFixed(1)
  return {
    setActive(value: boolean) {active=value;host.dataset.mapActive=String(value);cancelAnimationFrame(frame);frame=0;lastPaint=performance.now();captureIdle();if(flight){flight.start=performance.now();flight.from.copy(camera.position);flight.targetFrom.copy(controls.target)}state();if(value){resize();schedule()}},
    enable(value: boolean) {controls.enabled=value;holdManual();host.dataset.mapInteracting=String(value);if(!flight){cancelAnimationFrame(frame);frame=0}schedule()},
    setAmbient(value:boolean){ambient=value;captureIdle();lastPaint=performance.now();if(!flight){cancelAnimationFrame(frame);frame=0}state();schedule()},
    select(id: string) { const city = cities.findIndex(item => item.id === id); if (city < 0) return; highlight(id); const target = center.clone().lerp(positions[city],.08); target.y=.25; const offset=home.clone().sub(center); fly(target.clone().add(offset), target); host.dataset.cameraCity = id },
    entrance() { if (!reduced) { camera.position.copy(center).add(home.clone().sub(center).multiplyScalar(1.06)); fly(home, center) } else render() },
    action(action: SceneAction) {
      if(controls.enabled)holdManual()
      if (action === 'reset') { host.dataset.cameraCity = ''; fly(home, center); return }
      const offset = camera.position.clone().sub(controls.target)
      if (action === 'in' || action === 'out') offset.setLength(THREE.MathUtils.clamp(offset.length() * (action === 'in' ? 0.8 : 1.25), controls.minDistance, controls.maxDistance))
      else offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), action === 'left' ? -0.23 : 0.23)
      fly(controls.target.clone().add(offset), controls.target.clone())
    },
    dispose() {
      if (disposed) return
      disposed = true; cancelAnimationFrame(frame);clearTimeout(idleTimer); observer.disconnect();directionObserver.disconnect(); controls.dispose()
      world.dispose();land.dispose();architecture.dispose()
      document.removeEventListener('visibilitychange', visibility); renderer.domElement.removeEventListener('webglcontextlost', lost)
      scene.traverse(object => { if (object instanceof THREE.Mesh || object instanceof THREE.Line) object.geometry.dispose() })
      light.shadow.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove()
    },
  }
}
