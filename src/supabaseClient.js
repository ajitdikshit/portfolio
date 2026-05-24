import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgwiztqlvsvdjztszhss.supabase.co';
const supabaseAnonKey = 'sb_publishable_mdhFBDxD6ya0oujpY8Gh2g_yKdTkkha'; // From your Project Settings > API

export const supabase = createClient(supabaseUrl, supabaseAnonKey);