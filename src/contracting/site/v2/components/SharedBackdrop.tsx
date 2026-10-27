import type { HeroEntry } from '../content/model'
import { MediaImage } from './primitives'
export function SharedBackdrop({entry}:{entry?:HeroEntry}) {
  return <div className="v2-shared-backdrop" aria-hidden="true">
    {(entry?.poster || entry?.media.type==='image') && <MediaImage media={entry.poster??entry.media} eager/>}
    <div className="v2-backdrop-shade"/><div className="v2-engineering-grid"/>
  </div>
}

