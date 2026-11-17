// Nigerian Public Holidays Database (Fixed & Estimated Lunar Observances)
// Lunar holidays (Eid-el-Fitr, Eid-el-Kabir, Eid-el-Maulud) are subject to Islamic moon sightings and official FG declaration.

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

export const INITIAL_STAFF = [
  {
    id: 'staff-1',
    full_name: 'Chinedu Eze',
    email: 'chinedu.eze@company.ng',
    department: 'Engineering & Technology',
    birthday: '1992-03-15',
    phone_number: '+234 803 111 2233',
    status: 'active'
  },
  {
    id: 'staff-2',
    full_name: 'Amina Bello',
    email: 'amina.bello@company.ng',
    department: 'Human Resources',
    birthday: '1995-11-20',
    phone_number: '+234 802 444 5566',
    status: 'active'
  },
  {
    id: 'staff-3',
    full_name: 'Babajide Adeleke',
    email: 'babajide.adeleke@company.ng',
    department: 'Finance & Accounts',
    birthday: '1989-11-28',
    phone_number: '+234 818 777 8899',
    status: 'active'
  },
  {
    id: 'staff-4',
    full_name: 'Ngozi Okonjo-Nwosu',
    email: 'ngozi.nwosu@company.ng',
    department: 'Operations & Strategy',
    birthday: '1991-01-14',
    phone_number: '+234 805 999 0011',
    status: 'active'
  },
  {
    id: 'staff-5',
    full_name: 'Yusuf Danjuma',
    email: 'yusuf.danjuma@company.ng',
    department: 'Sales & Marketing',
    birthday: '1994-12-05',
    phone_number: '+234 809 333 4455',
    status: 'active'
  },
  {
    id: 'staff-6',
    full_name: 'Fatima Abubakar',
    email: 'fatima.abubakar@company.ng',
    department: 'Product & Design',
    birthday: '1996-11-18',
    phone_number: '+234 812 666 7788',
    status: 'active'
  },
  {
    id: 'staff-7',
    full_name: 'Oluwaseun Balogun',
    email: 'oluwaseun.balogun@company.ng',
    department: 'Engineering & Technology',
    birthday: '1990-07-22',
    phone_number: '+234 807 555 4433',
    status: 'active'
  }
];

export const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    title: 'Q4 Strategic Planning & Review',
    category: 'meeting',
    description: 'Executive committee and department heads quarterly business review & Q1 target alignment.',
    event_date: '2026-11-24',
    start_time: '10:00',
    end_time: '13:00',
    venue: 'Executive Boardroom & Microsoft Teams',
    participants: 'Executive Board, Department Leads, Project Managers',
    reminder_settings: '24 hours before'
  },
  {
    id: 'evt-2',
    title: 'Enterprise Cyber Security Awareness Workshop',
    category: 'training',
    description: 'Mandatory training for all staff on phishing defence, remote access security and credential safeguards.',
    event_date: '2026-11-26',
    start_time: '14:00',
    end_time: '16:00',
    venue: 'Training Hall & Zoom Webinar',
    participants: 'All Company Staff',
    reminder_settings: '2 days before'
  },
  {
    id: 'evt-3',
    title: 'Company 12th Anniversary Gala & Staff Awards',
    category: 'anniversary',
    description: 'Celebration of our company founding, service milestones, award recognitions and dinner.',
    event_date: '2026-12-10',
    start_time: '17:00',
    end_time: '21:30',
    venue: 'Eko Hotels Grand Ballroom, Victoria Island, Lagos',
    participants: 'All Staff, Partners & Board Members',
    reminder_settings: '1 week before'
  },
  {
    id: 'evt-4',
    title: 'Final Budget Submission Deadline FY2027',
    category: 'deadline',
    description: 'Submission of finalised departmental operating budgets to the Chief Financial Officer.',
    event_date: '2026-11-30',
    start_time: '17:00',
    end_time: '17:00',
    venue: 'Finance Portal',
    participants: 'Department Heads & Financial Analysts',
    reminder_settings: '3 days before'
  },
  {
    id: 'evt-5',
    title: 'Annual Health & Wellness Checkup Initiative',
    category: 'announcement',
    description: 'HMO on-site physical evaluations and medical consultation clinics in the Lagos and Abuja offices.',
    event_date: '2026-12-02',
    start_time: '09:00',
    end_time: '16:00',
    venue: 'Office Wellness Clinic Suite',
    participants: 'All Staff Members',
    reminder_settings: '1 day before'
  },
  {
    id: 'evt-6',
    title: 'Weekly All-Hands Operational Standup',
    category: 'meeting',
    description: 'Weekly synchronisation call across engineering, customer success, marketing, and operations.',
    event_date: '2026-11-23',
    start_time: '09:30',
    end_time: '10:15',
    venue: 'Main Auditorium & Google Meet',
    participants: 'All Organisation Staff',
    reminder_settings: '1 hour before'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Upcoming Meeting: Q4 Strategic Review',
    message: 'Q4 Strategic Planning & Review is scheduled for Nov 24, 2026 at 10:00 AM in the Boardroom.',
    type: 'meeting',
    target_role: 'all',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: 'notif-2',
    title: 'Staff Birthday: Fatima Abubakar',
    message: 'Today is Fatima Abubakar’s birthday (Product & Design). Wish her a joyful day!',
    type: 'birthday',
    target_role: 'all',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString()
  },
  {
    id: 'notif-3',
    title: 'Holiday Update Notice',
    message: 'Official reminder regarding Nigerian Democracy Day and Federal Government public gazette alignment.',
    type: 'holiday',
    target_role: 'all',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: 'notif-4',
    title: 'Urgent Deadline: Budget Submission FY2027',
    message: 'Final budget submission closes on Nov 30, 2026 at 5:00 PM. Please ensure all line items are validated.',
    type: 'deadline',
    target_role: 'admin',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
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
