import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_PROJ_URL || "";
const supabaseKey = process.env.SUPABSE_API_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
