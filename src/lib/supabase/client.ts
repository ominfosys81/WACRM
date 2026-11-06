import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

// Singleton instance — one client shared across the whole browser session.
// Creating multiple clients causes auth-lock contention ("Lock was released
// because another request stole it") and intermittent fetch failures.
let browserClient: SupabaseClient | undefined

const DEFAULT_SUPABASE_URL = 'https://ljwqwltudcevzjiytnmd.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqd3F3bHR1ZGNldnpqaXl0bm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3NTk4MjMsImV4cCI6MjEwOTMzNTgyM30.uiEY09d71SrgyXxmwZGfDCCLixLo4n0pkvucSAXtpRM'

export function createClient() {
  if (browserClient) return browserClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY

  browserClient = createBrowserClient(url, key)

  return browserClient
}
