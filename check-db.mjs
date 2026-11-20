import { createClient } from '@supabase/supabase-js';

const url = 'https://jxssfiphhmontqnrrwgm.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4c3NmaXBoaG1vbnRxbnJyd2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3MzYwNDcsImV4cCI6MjEwNTMxMjA0N30.9OLotXIEMP9vPuT6-_753WOvL0sX8goPf5aptA6SweI';

const supabase = createClient(url, anonKey);

async function inspect() {
  // Try to get all rows and show full structure
  const { data, error } = await supabase.from('members').select('*');
  console.log("ALL MEMBERS:", JSON.stringify({ count: data?.length, rows: data, error }, null, 2));

  // Also try common column name variants for ID
  const { data: d2, error: e2 } = await supabase.from('members').select('id, name, staff_id, member_id, company_id, full_name, email, role, department, password').limit(5);
  console.log("SPECIFIC COLS:", JSON.stringify({ data: d2, error: e2 }, null, 2));
}

inspect();
