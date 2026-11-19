// Nigerian Public Holidays Database & Sample Members for Robotz Academy

export const DEFAULT_NIGERIAN_HOLIDAYS = [
  {
    id: 'hol-1',
    name: "New Year's Day",
    holiday_date: '2026-01-01',
    year: 2026,
    is_lunar_estimated: false,
    description: 'First day of the Gregorian new year, celebrated nationwide in Nigeria.'
  },
  {
    id: 'hol-2',
    name: 'Good Friday',
    holiday_date: '2026-04-03',
    year: 2026,
    is_lunar_estimated: false,
    description: 'Christian commemoration of the crucifixion of Jesus Christ.'
  },
  {
    id: 'hol-3',
    name: 'Easter Monday',
    holiday_date: '2026-04-06',
    year: 2026,
    is_lunar_estimated: false,
    description: 'Public holiday following Easter Sunday.'
  },
  {
    id: 'hol-4',
    name: 'Eid-el-Fitr (Estimated)',
    holiday_date: '2026-03-20',
    year: 2026,
    is_lunar_estimated: true,
    description: 'Islamic festival marking the end of the sacred month of Ramadan. Subject to moon sighting.'
  },
  {
    id: 'hol-5',
    name: 'Eid-el-Fitr Additional Holiday (Estimated)',
    holiday_date: '2026-03-21',
    year: 2026,
    is_lunar_estimated: true,
    description: 'Federal government second declared holiday for Eid-el-Fitr.'
  },
  {
    id: 'hol-6',
    name: "Workers' Day (May Day)",
    holiday_date: '2026-05-01',
    year: 2026,
    is_lunar_estimated: false,
    description: 'International celebration of the labour movement and workers across Nigeria.'
  },
  {
    id: 'hol-7',
    name: 'Eid-el-Kabir (Feast of Sacrifice - Estimated)',
    holiday_date: '2026-05-27',
    year: 2026,
    is_lunar_estimated: true,
    description: 'Major Islamic feast honoring the willingness of Ibrahim. Subject to moon sighting.'
  },
  {
    id: 'hol-8',
    name: 'Eid-el-Kabir Additional Holiday (Estimated)',
    holiday_date: '2026-05-28',
    year: 2026,
    is_lunar_estimated: true,
    description: 'Second day public holiday for Eid-el-Kabir celebrations.'
  },
  {
    id: 'hol-9',
    name: 'Democracy Day',
    holiday_date: '2026-06-12',
    year: 2026,
    is_lunar_estimated: false,
    description: 'Commemoration of the restoration of Nigerian democracy and honouring Chief M.K.O. Abiola.'
  },
  {
    id: 'hol-10',
    name: 'Eid-el-Maulud (Mawlid - Estimated)',
    holiday_date: '2026-08-26',
    year: 2026,
    is_lunar_estimated: true,
    description: 'Observance of the birthday of the Islamic prophet Muhammad. Subject to moon sighting.'
  },
  {
    id: 'hol-11',
    name: 'Independence Day',
    holiday_date: '2026-10-01',
    year: 2026,
    is_lunar_estimated: false,
    description: 'Celebration of Nigeria’s independence from British colonial rule on October 1, 1960.'
  },
  {
    id: 'hol-12',
    name: 'Christmas Day',
    holiday_date: '2026-12-25',
    year: 2026,
    is_lunar_estimated: false,
    description: 'Christian celebration commemorating the birth of Jesus Christ.'
  },
  {
    id: 'hol-13',
    name: 'Boxing Day',
    holiday_date: '2026-12-26',
    year: 2026,
    is_lunar_estimated: false,
    description: 'Public holiday following Christmas Day.'
  }
];

// Members table initial records with 4-digit Company IDs and secure passwords
export const INITIAL_STAFF = [
  {
    id: 'mem-6104',
    company_id: '6104',
    full_name: 'Robotz Academy Staff',
    email: 'staff6104@robotzacademy.com',
    department: 'Robotics & STEM Operations',
    birthday: '1995-06-15',
    phone_number: '+234 800 000 6104',
    role: 'staff',
    status: 'active'
  },
  {
    id: 'mem-1021',
    company_id: '1021',
    full_name: 'Chinedu Eze',
    email: 'chinedu.eze@robotzacademy.com',
    password: 'Chinedu@2026',
    department: 'Robotics & AI Engineering',
    birthday: '1992-03-15',
    phone_number: '+234 803 111 2233',
    role: 'staff',
    status: 'active'
  },
  {
    id: 'mem-1042',
    company_id: '1042',
    full_name: 'Amina Bello',
    email: 'amina.bello@robotzacademy.com',
    password: 'Amina@Pass2026',
    department: 'Academic Operations',
    birthday: '1995-11-20',
    phone_number: '+234 802 444 5566',
    role: 'staff',
    status: 'active'
  },
  {
    id: 'mem-1088',
    company_id: '1088',
    full_name: 'Babajide Adeleke',
    email: 'babajide.adeleke@robotzacademy.com',
    password: 'JideSecure#88',
    department: 'Finance & Curriculum',
    birthday: '1989-11-28',
    phone_number: '+234 818 777 8899',
    role: 'staff',
    status: 'active'
  },
  {
    id: 'mem-1105',
    company_id: '1105',
    full_name: 'Fatima Abubakar',
    email: 'fatima.abubakar@robotzacademy.com',
    password: 'Fatima#Design26',
    department: 'STEM Product Design',
    birthday: '1996-11-18',
    phone_number: '+234 812 666 7788',
    role: 'staff',
    status: 'active'
  },
  {
    id: 'mem-1150',
    company_id: '1150',
    full_name: 'Ngozi Okonjo-Nwosu',
    email: 'ngozi.nwosu@robotzacademy.com',
    password: 'Ngozi@Strategy26',
    department: 'Strategy & Innovation',
    birthday: '1991-01-14',
    phone_number: '+234 805 999 0011',
    role: 'staff',
    status: 'active'
  }
];

export const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    title: 'Q4 Strategic Planning & Curriculum Alignment',
    category: 'meeting',
    description: 'Executive committee and department leads quarterly review and curriculum milestone check.',
    event_date: '2026-11-24',
    start_time: '10:00',
    end_time: '13:00',
    venue: 'Executive Innovation Lab & Microsoft Teams',
    participants: 'Executive Board, Department Leads, Project Managers',
    reminder_settings: '24 hours before'
  },
  {
    id: 'evt-2',
    title: 'STEM Robotics & Cyber Security Awareness Workshop',
    category: 'training',
    description: 'Mandatory workshop for all instructors on safety protocols, AI toolchains and remote access.',
    event_date: '2026-11-26',
    start_time: '14:00',
    end_time: '16:00',
    venue: 'Training Hall & Zoom Webinar',
    participants: 'All Academy Instructors & Staff',
    reminder_settings: '2 days before'
  },
  {
    id: 'evt-3',
    title: 'Robotz Academy Annual Innovation Showcase & Awards',
    category: 'anniversary',
    description: 'Annual showcase of student projects, service milestones, instructor awards and gala.',
    event_date: '2026-12-10',
    start_time: '17:00',
    end_time: '21:30',
    venue: 'Eko Hotels Grand Ballroom, Victoria Island, Lagos',
    participants: 'All Staff, Partners & Board Members',
    reminder_settings: '1 week before'
  },
  {
    id: 'evt-4',
    title: 'Final Budget & Hardware Inventory Submission FY2027',
    category: 'deadline',
    description: 'Submission of finalised departmental operating budgets to the Academy Director.',
    event_date: '2026-11-30',
    start_time: '17:00',
    end_time: '17:00',
    venue: 'Finance Portal',
    participants: 'Department Heads & Financial Analysts',
    reminder_settings: '3 days before'
  },
  {
    id: 'evt-5',
    title: 'Weekly All-Hands Operational Standup',
    category: 'meeting',
    description: 'Weekly synchronisation call across engineering, faculty, and operations.',
    event_date: '2026-11-23',
    start_time: '09:30',
    end_time: '10:15',
    venue: 'Main Auditorium & Google Meet',
    participants: 'All Academy Staff',
    reminder_settings: '1 hour before'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Upcoming Meeting: Q4 Strategic Review',
    message: 'Q4 Strategic Planning is scheduled for Nov 24, 2026 at 10:00 AM.',
    type: 'meeting',
    target_role: 'all',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: 'notif-2',
    title: 'Staff Birthday: Fatima Abubakar',
    message: 'Today is Fatima Abubakar’s birthday (STEM Product Design). Wish her a joyful day!',
    type: 'birthday',
    target_role: 'all',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString()
  },
  {
    id: 'notif-3',
    title: 'Public Holiday Alert: Nigerian Democracy Day',
    message: 'Official gazetted holiday observance for all team members.',
    type: 'holiday',
    target_role: 'all',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  }
];

export const CATEGORY_CONFIG = {
  meeting: {
    label: 'Company Meeting',
    color: 'bg-blue-600 text-white',
    badge: 'bg-blue-100 text-blue-800 border-blue-200',
    dot: 'bg-blue-600',
    border: 'border-l-blue-600',
    lightBg: 'bg-blue-50/70'
  },
  birthday: {
    label: 'Staff Birthday',
    color: 'bg-pink-600 text-white',
    badge: 'bg-pink-100 text-pink-800 border-pink-200',
    dot: 'bg-pink-500',
    border: 'border-l-pink-500',
    lightBg: 'bg-pink-50/70'
  },
  holiday: {
    label: 'Public Holiday',
    color: 'bg-emerald-600 text-white',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    dot: 'bg-emerald-600',
    border: 'border-l-emerald-600',
    lightBg: 'bg-emerald-50/70'
  },
  training: {
    label: 'Training & Workshop',
    color: 'bg-purple-600 text-white',
    badge: 'bg-purple-100 text-purple-800 border-purple-200',
    dot: 'bg-purple-600',
    border: 'border-l-purple-600',
    lightBg: 'bg-purple-50/70'
  },
  anniversary: {
    label: 'Anniversary & Milestone',
    color: 'bg-amber-600 text-white',
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    dot: 'bg-amber-500',
    border: 'border-l-amber-500',
    lightBg: 'bg-amber-50/70'
  },
  deadline: {
    label: 'Project Deadline',
    color: 'bg-rose-600 text-white',
    badge: 'bg-rose-100 text-rose-800 border-rose-200',
    dot: 'bg-rose-600',
    border: 'border-l-rose-600',
    lightBg: 'bg-rose-50/70'
  },
  announcement: {
    label: 'General Announcement',
    color: 'bg-cyan-600 text-white',
    badge: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    dot: 'bg-cyan-600',
    border: 'border-l-cyan-600',
    lightBg: 'bg-cyan-50/70'
  }
};
