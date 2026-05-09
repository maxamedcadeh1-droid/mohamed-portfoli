import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nzvqimifxhyowtcoeacw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_xJjlyrtNGsHv867FYDrqKw_x1tDVs_a';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Form submissions may fail.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
