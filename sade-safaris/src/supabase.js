import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tavzrippckuzibpsbgiy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhdnpyaXBwY2t1emlicHNiZ2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NTUzODUsImV4cCI6MjA4ODEzMTM4NX0.HLQK8kIO3-CBmyfQxw3DkTfU29BEqVidVERo-XTh2SQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);