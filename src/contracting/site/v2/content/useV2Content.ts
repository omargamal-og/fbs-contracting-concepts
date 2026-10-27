import { useCallback, useEffect, useState } from 'react'
import { loadV2Homepage } from './loadHomepage'
import type { Language } from '../../content/database.types'
import type { HomepageState } from './model'
export function useV2Content(language: Language) {
  const [revision,setRevision]=useState(0)
  const key=language+':'+revision
  const [loaded,setLoaded]=useState<{key:string;state:HomepageState}>({key:'',state:{status:'loading'}})
  useEffect(()=>{
    const controller=new AbortController()
    // Bound SDK retries so a backend outage always produces a usable retry state.
    const deadline=window.setTimeout(()=>{
      controller.abort()
      setLoaded({key,state:{status:'error',message:'Content request timed out'}})
    },8000)
    void loadV2Homepage(language,controller.signal).then(state=>{if(!controller.signal.aborted)setLoaded({key,state})})
      .catch(()=>{if(!controller.signal.aborted)setLoaded({key,state:{status:'error',message:'Content unavailable'}})})
      .finally(()=>window.clearTimeout(deadline))
    return ()=>{window.clearTimeout(deadline);controller.abort()}
  },[language,key])
  return {state:loaded.key === key?loaded.state:{status:'loading'} as HomepageState,retry:useCallback(()=>setRevision(value=>value+1),[])}
}

