import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://votre-projet.supabase.c"
const SUPABASE_ANON_KEY = "votre-cle-anonyme";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: false,
    }
});

