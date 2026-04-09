import { createClient } from '@supabase/supabase-js';

// Provide placeholders during build time if environment variables are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Server-side client (use service role key for admin operations)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Public client — safe for client-side use (RLS enforced)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client — bypasses RLS, server-side only
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey
);
