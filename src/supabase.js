import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vaogmfkmgiwurwhyybnr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhb2dtZmttZ2l3dXJ3aHl5Ym5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNzE1OTgsImV4cCI6MjA2Mjg0NzU5OH0.ZRL-SQmdz3Ss4ahp2rjlUhJEcKGLJTyeHpsrQwbilXI';
export const supabase = createClient(supabaseUrl, supabaseKey);