import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'
import { resolveSupabaseConfig, type PublicSupabaseConfig, type PublicSupabaseEnv } from './config'
export type PublicContentClient = SupabaseClient<Database>
// Dedicated anonymous content client. It must never inherit a future administrator session.
export function createPublicContentClient(config: PublicSupabaseConfig, fetcher?: typeof fetch): PublicContentClient {
  return createClient<Database>(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    ...(fetcher ? { global: { fetch: fetcher } } : {}),
  })
}
let cached: { config: PublicSupabaseConfig; client: PublicContentClient } | undefined
export function getPublicContentClient(env: PublicSupabaseEnv = { VITE_SUPABASE_URL: import.meta.env?.VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY }) {
  const result = resolveSupabaseConfig(env)
  if (result.status !== 'ready') return result
  if (!cached || cached.config.url !== result.config.url || cached.config.key !== result.config.key) {
    cached = { config: result.config, client: createPublicContentClient(result.config) }
  }
  return { status: 'ready' as const, client: cached.client }
}

