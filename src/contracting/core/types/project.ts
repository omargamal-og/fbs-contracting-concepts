export type ProjectCategory =
  | 'Residential'
  | 'Commercial'

export type ProjectRegion =
  | 'Riyadh'
  | 'Makkah'
  | 'Madinah'
  | 'Tabuk'

export type ProjectStatus =
  | 'Completed'
  | 'In Progress'
  | 'Active'

export type MapPosition = {
  x: number
  y: number
}

export type Project = {
  id: string

  slug: string

  name: string

  city: string

  region: ProjectRegion

  category: ProjectCategory

  status?: ProjectStatus

  shortDescription?: string

  mapPosition: MapPosition

  coverImage?: string

  gallery?: string[]
}