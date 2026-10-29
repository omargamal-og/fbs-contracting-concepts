import type { SiteLanguage } from '../i18n/types'
import type { MapProject } from './map/model'
import { profileProjects } from './profileProjects'

// Public profile-derived records are available in both local and production V3 builds.
// They remain separate from CMS approval state and carry city membership only.
export function developmentProjects(language:SiteLanguage):MapProject[]{return profileProjects(language)}
