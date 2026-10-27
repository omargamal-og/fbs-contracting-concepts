// Navigation readiness only. No policy text or authentication capability is implied.
// Publish policy pages through the existing approved bilingual content pipeline.
export const governancePolicies = [
  { slug: 'whistleblowing-policy', en: 'Whistleblowing Policy', ar: 'سياسة الإبلاغ عن المخالفات' },
  { slug: 'code-of-ethics', en: 'Code of Ethics', ar: 'مدونة الأخلاقيات' },
  { slug: 'privacy-policy', en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  { slug: 'data-protection-officer', en: 'Data Protection Officer', ar: 'مسؤول حماية البيانات' },
  { slug: 'governance-framework', en: 'Corporate Governance Framework', ar: 'إطار حوكمة الشركات' },
] as const

// Reserved routes for a future approved document renderer. Deliberately not linked
// or mounted while no approved bilingual policy records/documents are available.
export const governanceRoutePlan = governancePolicies.map(policy => ({
  slug: policy.slug,
  path: '/contracting/v3/governance/' + policy.slug,
  availability: 'awaiting-approved-content' as const,
}))

export const loginPortals = [
  { id: 'careers', publicPath: 'careers' },
  { id: 'suppliers', publicPath: null },
  { id: 'administration', publicPath: null },
] as const
