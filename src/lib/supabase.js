import { createClient } from '@supabase/supabase-js';

// Environment variables or fallback local simulation credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-company-calendar.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.demo-placeholder-key';

export const isSupabaseConfigured = () => {
  return (
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY &&
    import.meta.env.VITE_SUPABASE_URL !== 'https://demo-company-calendar.supabase.co'
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
