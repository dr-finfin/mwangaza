import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://ozxcjiutjnjmfcyvodol.supabase.co'

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96eGNqaXV0am5qbWZjeXZvZG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjA4MzIsImV4cCI6MjA5MTI5NjgzMn0.C7hx6Xd9yyZ48HiBm8-0D5Q28eKPcIxT1PSfr-OvdtI'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)