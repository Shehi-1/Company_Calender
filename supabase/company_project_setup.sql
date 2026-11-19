-- ====================================================================
-- ROBOTZ ACADEMY / COMPANY CALENDAR SYSTEM
-- RUN THIS SCRIPT IN SUPABASE SQL EDITOR:
-- https://supabase.com/dashboard/project/jxssfiphhmontqnrrwgm/sql/new
-- ====================================================================

-- 1. Ensure members table has required fields (or create it if needed)
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id TEXT, -- 4-digit company ID
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT,   -- Custom member password (never 4-digit ID alone)
    department TEXT NOT NULL DEFAULT 'General Staff',
    role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
    birthday DATE,
    phone_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the missing events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'birthday', 'holiday', 'meeting', 'training', 'anniversary', 'deadline', 'announcement'
    )),
    description TEXT,
    event_date DATE NOT NULL,
    start_time TEXT DEFAULT '09:00',
    end_time TEXT DEFAULT '10:00',
    venue TEXT,
    participants TEXT,
    reminder_settings TEXT DEFAULT '24 hours before',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create holidays table for Nigerian statutory holidays
CREATE TABLE IF NOT EXISTS public.holidays (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    holiday_date DATE NOT NULL,
    year INTEGER NOT NULL,
    is_lunar_estimated BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create in-app notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    target_role TEXT DEFAULT 'all',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 6. Access Policies:
-- Anyone can view members (to display names), events, holidays, notifications
CREATE POLICY "Allow public read access on members" ON public.members FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on members" ON public.members FOR ALL USING (true);

CREATE POLICY "Allow public read on events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on events" ON public.events FOR ALL USING (true);

CREATE POLICY "Allow public read on holidays" ON public.holidays FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on holidays" ON public.holidays FOR ALL USING (true);

CREATE POLICY "Allow public read on notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on notifications" ON public.notifications FOR ALL USING (true);
