// supabase.js
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const { supabaseUrl, supabaseAnonKey } = Constants.expoConfig.extra;
//console.log(Constants.expoConfig.extra);
// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
