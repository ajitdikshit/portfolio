import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgwiztqlvsvdjztszbhss.supabase.co'; // From your Project Settings > API
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnd2l6dHFsdnN2ZGp6dHN6aHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MjUyMjYsImV4cCI6MjA5NTIwMTIyNn0.b-fDmEvUGnbXY1kg4yGXvyCToDL2ZWTkCDWFyHctOFc'; // From your Project Settings > API

export const supabase = createClient(supabaseUrl, supabaseAnonKey);