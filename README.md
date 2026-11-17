# Company Calendar Management System

A modern, responsive, corporate calendar management system designed for organisations to schedule and monitor company events, staff birthdays, statutory Nigerian public holidays, executive meetings, deadlines, and announcements.

---

## 🌟 Key Features

1. **Role-Based Access Control (RBAC)**:
   - **Administrator**: Full privileges to add, edit, or delete events, staff records, Nigerian holidays, and configure notification settings.
   - **Staff Member**: View-only permissions across events, holidays, meetings, and announcements with protected employee data.
   - **Interactive Role Switcher**: Directly switch roles in the header/sidebar to test permissions.

2. **Interactive Multi-View Calendar**:
   - Monthly, Weekly, and Yearly views.
   - Previous/Next navigation and 'Today' quick-return.
   - 7 distinct corporate color badges (Meetings, Birthdays, Holidays, Training, Anniversaries, Deadlines, Announcements).
   - Clickable date cells and interactive event detail modal.

3. **Nigerian Public Holidays Management**:
   - Pre-configured with Nigerian national holidays (New Year's Day, Good Friday, Easter Monday, Workers' Day, Democracy Day, Independence Day, Christmas Day, Boxing Day).
   - Dynamic lunar estimation flags for Islamic observances (Eid-el-Fitr, Eid-el-Kabir, Eid-el-Maulud) with administrative date modification tools upon official NSCIA / Federal Government gazette publication.

4. **Staff Birthday Management**:
   - Directory with staff names, departments, birth dates, and contact emails.
   - Automatic synchronization onto the company calendar.
   - Direct 'Send Birthday Wish' trigger simulating corporate email dispatch.

5. **Notification System**:
   - **In-App Notification Centre**: Live unread badges, filterable notifications by type (meeting, birthday, holiday, deadline).
   - **Email Dispatch Simulation**: Outgoing email audit log tracking notifications sent to staff upon event creation or cancellation.

6. **Progressive Web App (PWA)**:
   - Built-in service worker and Web App Manifest for mobile installation on Android and iOS.

7. **Database Architecture & Security (Supabase & PostgreSQL)**:
   - Clean SQL schema with Row Level Security (RLS) policies located in `supabase/schema.sql`.
   - Seamless dual mode: works with remote Supabase or offline local persistence.

---

## 💻 Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **State & Persistence**: React Context API, LocalStorage, Supabase Client
- **PWA**: `vite-plugin-pwa`
- **Database**: PostgreSQL (Supabase schema with RLS)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Installation
Clone the repository or navigate to the project directory:

```bash
cd "Office Calender"
npm install
```

### 3. Running Locally
Start the Vite development server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 4. Production Build
Generate optimized production assets:

```bash
npm run build
npm run preview
```

---

## 🗄️ Supabase Configuration & RLS Setup

1. Create a new project in [Supabase](https://supabase.com).
2. Go to the **SQL Editor** tab in your Supabase project dashboard.
3. Copy the contents of [`supabase/schema.sql`](supabase/schema.sql) and execute the query.
4. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

5. Restart the development server. The application will automatically connect to your PostgreSQL tables.

---

## 📁 Project Structure

```
├── public/                 # Static assets, SVG calendar icons & PWA manifest
├── src/
│   ├── components/         # Reusable corporate UI components
│   │   ├── BirthdaysManagement.jsx # Staff birthdays directory & wishes
│   │   ├── CalendarView.jsx        # Month, Week & Year calendar views
│   │   ├── Dashboard.jsx           # 5 metric cards, schedule & announcements
│   │   ├── EventDetailModal.jsx    # Pop-up for event details
│   │   ├── EventFormModal.jsx      # Create/edit event form modal
│   │   ├── EventsManagement.jsx    # Event list, filter & search
│   │   ├── Header.jsx              # Navigation header & quick notifications
│   │   ├── HolidaysManagement.jsx  # Nigerian public holidays manager
│   │   ├── MeetingsView.jsx        # Dedicated corporate meetings view
│   │   ├── NotificationsCenter.jsx # In-app notifications & email audit log
│   │   ├── SettingsView.jsx        # Organisation settings & RBAC switch
│   │   ├── Sidebar.jsx             # Corporate responsive sidebar
│   │   └── StaffManagement.jsx     # Staff directory & employee records
│   ├── context/
│   │   └── CalendarContext.jsx     # Global state, RBAC, dispatch & storage
│   ├── data/
│   │   └── initialData.js          # Nigerian holidays, demo staff & events
│   ├── lib/
│   │   └── supabase.js             # Supabase client setup
│   ├── App.jsx                     # Root application container
│   ├── index.css                   # Tailwind CSS styling & scrollbars
│   └── main.jsx                    # Application entry point
├── supabase/
│   └── schema.sql                  # PostgreSQL tables & RLS policies
├── package.json
├── tailwind.config.js
└── vite.config.js
```
