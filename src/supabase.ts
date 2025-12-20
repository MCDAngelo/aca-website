import { createClient } from '@supabase/supabase-js';

// These environment variables are set in .env file and accessed through React's env variable system
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

// Debug: Log config once on load
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Supabase URL:', supabaseUrl ? 'loaded' : 'MISSING');
  console.log('🔧 Supabase Key:', supabaseAnonKey ? 'loaded' : 'MISSING');
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ CRITICAL: Supabase environment variables are missing!');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
