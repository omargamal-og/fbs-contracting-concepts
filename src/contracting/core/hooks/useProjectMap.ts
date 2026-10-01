import { useState } from 'react'

import type {
  Project,
  ProjectRegion,
} from '../types/project'

type RegionFilter = 'All' | ProjectRegion

export function useProjectMap(projects: Project[]) {
  const [activeRegion, setActiveRegion] =
    useState<RegionFilter>('All')

  const [activeProjectId, setActiveProjectId] =
    useState<string | null>(null)

  const filteredProjects =
    activeRegion === 'All'
      ? projects
      : projects.filter(
          (project) => project.region === activeRegion,
        )

  const activeProject =
    projects.find(
      (project) => project.id === activeProjectId,
    ) ?? null

  return {
    activeRegion,
    setActiveRegion,

    activeProjectId,
    setActiveProjectId,

    activeProject,
    filteredProjects,
  }
}