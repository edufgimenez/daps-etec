// supabase.js
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env file
const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
