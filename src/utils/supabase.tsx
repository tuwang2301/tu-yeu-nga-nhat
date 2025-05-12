import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zpvrucesxlelteoydzcp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdnJ1Y2VzeGxlbHRlb3lkemNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMzcyNzgsImV4cCI6MjA2MjYxMzI3OH0.LeyVsyzjAnkiSGEpbWbA7HYOcm1lmJRIwVkT5rcbDkc"
);

export default supabase;
