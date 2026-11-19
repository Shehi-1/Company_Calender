import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  CalendarCheck2,
  Cake,
  Flag,
  Users2,
  Bell,
  UserCheck,
  Settings,
  LogOut,
  ShieldCheck,
  User,
  ChevronRight,
  Briefcase,
  Lock,
  Unlock
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) {
  const {
    currentUser,
    isAdmin,
    lockToStaff,
    setIsAdminModalOpen,
    notifications
  } = useCalendar();

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'calendar', label: 'Company Calendar', icon: CalendarDays },
    { id: 'events', label: 'Events Management', icon: CalendarCheck2 },
    { id: 'birthdays', label: 'Staff Birthdays', icon: Cake },
    { id: 'holidays', label: 'Public Holidays', icon: Flag },
    { id: 'meetings', label: 'Meetings & Standups', icon: Users2 },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
    { id: 'staff', label: 'Staff Management', icon: UserCheck },
    { id: 'settings', label: 'Company Settings', icon: Settings }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white leading-tight">
                Apex Portal
              </h1>
              <p className="text-xs text-slate-400 font-medium">Calendar & Operations</p>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
            v1.0
          </span>
        </div>

        {/* Current User Card with Protected Admin PIN Unlock */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shadow ${
              isAdmin ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
            }`}>
              {isAdmin ? <ShieldCheck className="h-5 w-5 text-amber-400" /> : <User className="h-5 w-5 text-blue-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
              <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={`inline-block h-2 w-2 rounded-full ${isAdmin ? 'bg-amber-400 ring-2 ring-amber-400/30' : 'bg-emerald-400 ring-2 ring-emerald-400/30'}`} />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                {isAdmin ? 'Admin Mode' : 'Staff Mode'}
              </span>
            </div>

            {/* Secure Admin Gate Button */}
            {isAdmin ? (
              <button
                onClick={lockToStaff}
                title="Lock admin session and return to staff view"
                className="text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 px-2 py-1 rounded border border-amber-700/50 flex items-center gap-1 transition-colors"
              >
                <Lock className="h-3 w-3" />
                <span>Lock</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAdminModalOpen(true)}
                title="Enter 5-digit security PIN to unlock administrator access"
                className="text-[11px] font-bold text-blue-300 hover:text-white bg-blue-900/60 hover:bg-blue-800/80 px-2.5 py-1 rounded border border-blue-600/50 flex items-center gap-1 transition-colors shadow-xs"
              >
                <Unlock className="h-3 w-3 text-amber-400" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 pt-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Menu Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-rose-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="h-4 w-4 text-blue-200" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <div className="bg-slate-800/40 rounded-lg p-2.5 text-xs text-slate-400 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-slate-500 shrink-0" />
            <div className="truncate">
              <p className="text-slate-200 font-medium truncate">Nigeria Operations</p>
              <p className="text-[11px] text-slate-500">WAT (UTC+1) Zone</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm('Sign out session?')) {
                lockToStaff();
                setActiveTab('dashboard');
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
