import type { ProjectView } from '../../v2/content/model'
import cities from '../geography/saudi-cities.json'

export { cities }
export type City = typeof cities[number]
export type MapProject = ProjectView & { cityKey?: string | null }
export type ProjectStatusFilter = 'all' | 'in_progress' | 'completed' | 'upcoming'
// Only persisted status drives the filter. Planned maps to Upcoming; missing
// and on-hold projects remain visible under All.
export function matchesProjectStatus(project: MapProject, filter: ProjectStatusFilter) {
  if (filter === 'all') return true
  if (filter === 'upcoming') return project.deliveryStatus === 'planned'
  return project.deliveryStatus === filter
}
export function projectStatusForDisplay(status: string): Exclude<ProjectStatusFilter, 'all'> | null {
  if (status === 'planned') return 'upcoming'
  if (status === 'in_progress' || status === 'completed') return status
  return null
}
// City membership comes from the CMS city_key, never inferred from a project name
// or an unverified site coordinate. Geographic pins always remain city-level.
export function approvedCityProjects(projects: MapProject[], city: string, category = '') {
  return projects.filter(project => project.published && project.cityKey === city && (!category || project.category === category))
}
export function projectPoint(coordinates: number[]) {
  return [(coordinates[0] - 45) * Math.cos(25 * Math.PI / 180), -(coordinates[1] - 24)] as const
}
