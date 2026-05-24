import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgwiztqlvsvdjztszhss.supabase.co'; 
// Paste the new publishable key inside the quotes below!
const supabaseAnonKey = 'sb_publishable_mdhFBDxD6ya0oujpY8Gh2g_yKdTkkha'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);