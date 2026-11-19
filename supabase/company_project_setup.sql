-- ====================================================================
-- ROBOTZ ACADEMY / COMPANY CALENDAR SYSTEM
-- RUN THIS SCRIPT IN SUPABASE SQL EDITOR:
-- https://supabase.com/dashboard/project/jxssfiphhmontqnrrwgm/sql/new
-- ====================================================================

-- 1. Ensure members table has all columns matching the app & your schema
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id TEXT,
    first_name TEXT,
    last_name TEXT,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    position TEXT,
    department TEXT DEFAULT 'Robotics Academy',
    role TEXT DEFAULT 'staff',
    active BOOLEAN DEFAULT true,
    birthday DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add any missing columns if table already existed
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS department TEXT DEFAULT 'Robotics Academy';
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'staff';
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS birthday DATE;

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

-- 6. Drop any restrictive policies and recreate public read/write policies
DROP POLICY IF EXISTS "Allow public read access on members" ON public.members;
DROP POLICY IF EXISTS "Allow public insert/update on members" ON public.members;
CREATE POLICY "Allow public read access on members" ON public.members FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on members" ON public.members FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public read on events" ON public.events;
DROP POLICY IF EXISTS "Allow public insert/update/delete on events" ON public.events;
CREATE POLICY "Allow public read on events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on events" ON public.events FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public read on holidays" ON public.holidays;
DROP POLICY IF EXISTS "Allow public insert/update on holidays" ON public.holidays;
CREATE POLICY "Allow public read on holidays" ON public.holidays FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on holidays" ON public.holidays FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public read on notifications" ON public.notifications;
DROP POLICY IF EXISTS "Allow public insert/update on notifications" ON public.notifications;
CREATE POLICY "Allow public read on notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on notifications" ON public.notifications FOR ALL USING (true);
