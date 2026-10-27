import { useEffect, useState } from 'react'
import { getReleasedMediaUrl } from '../../content/publicContent'
import type { MediaRef } from './model'
// Delivery/query logic stays out of visual components. Re-sign visible media before its URL expires.
export function useMediaSource(media: MediaRef | undefined, enabled=true) {
  const [delivery,setDelivery]=useState<{id:string;url:string;srcSet:string;failed:boolean}>()
  useEffect(()=>{
    if(!enabled || !media?.record) return
    let cancelled=false
    const deliver=async()=>{
      // Longer public-video leases avoid interrupting playback with frequent source swaps.
      const main=await getReleasedMediaUrl(media.record!,undefined,media.type==='video'?900:60)
      const variants=await Promise.all((media.variants??[]).filter(row=>row.width && row.mime.startsWith('image/')).map(async variant=>{
        const result=await getReleasedMediaUrl(variant.record)
        return result.status === 'ready'?result.data+' '+variant.width+'w':null
      }))
      if(!cancelled)setDelivery({id:media.id,url:main.status === 'ready'?main.data:'',srcSet:variants.filter(Boolean).join(', '),failed:main.status !== 'ready'})
    }
    void deliver()
    const timer=window.setInterval(()=>{if(document.visibilityState === 'visible')void deliver()},media.type==='video'?840000:45000)
    return ()=>{cancelled=true;window.clearInterval(timer)}
  },[media,enabled])
  if(import.meta.env.DEV && media?.developmentUrl)return {url:media.developmentUrl,srcSet:'',failed:false}
  return delivery && delivery.id === media?.id?delivery:{url:'',srcSet:'',failed:false}
}

