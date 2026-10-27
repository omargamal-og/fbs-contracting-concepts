export type PublicSupabaseEnv = { VITE_SUPABASE_URL?: string; VITE_SUPABASE_PUBLISHABLE_KEY?: string }
export type PublicSupabaseConfig = { url: string; key: string }
export type ConfigResult =
  | { status: 'ready'; config: PublicSupabaseConfig }
  | { status: 'unavailable'; reason: 'not_configured' }
  | { status: 'error'; message: string; retryable: false }
export function resolveSupabaseConfig(env: PublicSupabaseEnv): ConfigResult {
  const url = env.VITE_SUPABASE_URL?.trim()
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()
  if (!url || !key) return { status: 'unavailable', reason: 'not_configured' }
  try {
    const parsed = new URL(url)
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname)
    if (parsed.protocol !== 'https:' && !(local && parsed.protocol === 'http:')) throw new Error('URL')
    if (parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== '/') throw new Error('URL')
    let publicKey = key.startsWith('sb_publishable_')
    if (!publicKey && key.split('.').length === 3) {
      const payload: unknown = JSON.parse(atob(key.split('.')[1].replaceAll('-', '+').replaceAll('_', '/')))
      publicKey = typeof payload === 'object' && payload !== null && 'role' in payload && payload.role === 'anon'
    }
    if (!publicKey) throw new Error('Key')
    return { status: 'ready', config: { url: parsed.origin, key } }
  } catch {
    return { status: 'error', message: 'Invalid public Supabase configuration. Use a project URL and publishable or legacy anon key.', retryable: false }
  }
}

