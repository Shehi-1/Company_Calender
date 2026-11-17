-- ============================================================
-- COMPANY CALENDAR MANAGEMENT SYSTEM
-- SUPABASE POSTGRESQL SCHEMA WITH ROW LEVEL SECURITY (RLS)
-- ============================================================

-- 1. Create Profiles / Users Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
    department TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Staff Table (Employee directory & birthdays)
CREATE TABLE IF NOT EXISTS public.staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    department TEXT NOT NULL,
    birthday DATE NOT NULL,
    phone_number TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Events Table
-- Categories: 'birthday', 'holiday', 'meeting', 'training', 'anniversary', 'deadline', 'announcement'
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'birthday', 'holiday', 'meeting', 'training', 'anniversary', 'deadline', 'announcement'
    )),
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME WITHOUT TIME ZONE,
    end_time TIME WITHOUT TIME ZONE,
    venue TEXT,
    participants TEXT,
    reminder_settings TEXT DEFAULT '1 day before',
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_company_wide BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Public Holidays Table (Nigerian national & declared holidays)
CREATE TABLE IF NOT EXISTS public.holidays (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    holiday_date DATE NOT NULL,
    year INTEGER NOT NULL,
    is_lunar_estimated BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create In-App Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('event', 'birthday', 'meeting', 'holiday', 'deadline', 'system')),
    target_role TEXT DEFAULT 'all' CHECK (target_role IN ('all', 'admin', 'staff')),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Company Settings Table
CREATE TABLE IF NOT EXISTS public.company_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL DEFAULT 'Apex Global Enterprise',
    work_start_time TIME WITHOUT TIME ZONE DEFAULT '08:00:00',
    work_end_time TIME WITHOUT TIME ZONE DEFAULT '17:00:00',
    default_reminder_timing TEXT DEFAULT '24_hours_prior',
    email_notifications_enabled BOOLEAN DEFAULT true,
    in_app_notifications_enabled BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user is an administrator
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by authenticated users"
ON public.profiles FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = id);

-- Staff Policies: Staff viewable by all authenticated employees; editable ONLY by admins
CREATE POLICY "Staff directory viewable by authenticated users"
ON public.staff FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Staff insertable by administrators only"
ON public.staff FOR INSERT TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Staff updatable by administrators only"
ON public.staff FOR UPDATE TO authenticated
USING (public.is_admin());

CREATE POLICY "Staff deletable by administrators only"
ON public.staff FOR DELETE TO authenticated
USING (public.is_admin());

-- Events Policies: Events viewable by all staff; modified ONLY by admins
CREATE POLICY "Events viewable by all authenticated users"
ON public.events FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Events insertable by administrators only"
ON public.events FOR INSERT TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Events updatable by administrators only"
ON public.events FOR UPDATE TO authenticated
USING (public.is_admin());

CREATE POLICY "Events deletable by administrators only"
ON public.events FOR DELETE TO authenticated
USING (public.is_admin());

-- Holidays Policies: Viewable by all; manageable by admins
CREATE POLICY "Holidays viewable by all authenticated users"
ON public.holidays FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Holidays manageable by administrators only"
ON public.holidays FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Notifications Policies
CREATE POLICY "Notifications viewable by all authenticated users"
ON public.notifications FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Notifications manageable by administrators"
ON public.notifications FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Settings Policies
CREATE POLICY "Settings viewable by all authenticated users"
ON public.company_settings FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Settings editable by administrators only"
ON public.company_settings FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
