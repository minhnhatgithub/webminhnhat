import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://oevwidhkrcvwhuwnlnsg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ldndpZGhrcmN2d2h1d25sbnNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTkxNDg0MywiZXhwIjoyMDc1NDkwODQzfQ.F6O3kIsqPN5OAtkAuCW4g-pqLvNtkbeeFbOVD9wNJjk'
);

