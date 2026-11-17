import React, { useState } from 'react';
import {
  CalendarDays,
  Cake,
  Flag,
  Users2,
  Clock,
  ArrowUpRight,
  Plus,
  AlertCircle,
  Megaphone,
  Briefcase,
  ChevronRight,
  CalendarCheck
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';
import { CATEGORY_CONFIG } from '../data/initialData';

export default function Dashboard({ setActiveTab, onOpenNewEvent, onSelectEvent }) {
  const {
    currentUser,
    events,
    staff,
    holidays,
    notifications,
    getAllCalendarItems,
    isAdmin
  } = useCalendar();

  const allItems = getAllCalendarItems(2026);

  // Today reference string
  const todayStr = '2026-11-17'; // Based on context timestamp
  const now = new Date('2026-11-17T12:00:00');

  // Compute Statistics
  const upcomingEvents = allItems
    .filter(item => item.event_date >= todayStr)
    .sort((a, b) => a.event_date.localeCompare(b.event_date));

  const totalUpcomingEvents = upcomingEvents.length;

  // Upcoming Staff Birthdays (next 45 days)
  const currentMonth = 11; // November
  const upcomingBirthdays = staff.filter(s => {
    const parts = s.birthday.split('-');
    const month = parseInt(parts[1], 10);
    return month === 11 || month === 12;
  });

  // Upcoming Public Holidays
  const upcomingHolidays = holidays.filter(h => h.holiday_date >= todayStr);

  // Scheduled Meetings
  const scheduledMeetings = events.filter(e => e.category === 'meeting' && e.event_date >= todayStr);

  // Upcoming Deadlines
  const upcomingDeadlines = events.filter(e => e.category === 'deadline' && e.event_date >= todayStr);

  // Recent Announcements
  const recentAnnouncements = events.filter(e => e.category === 'announcement' || e.category === 'training');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/50 border border-blue-400/30 text-xs font-semibold text-blue-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Corporate Operations Portal • Nigeria HQ
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Stay synchronised with executive meetings, statutory Nigerian holidays, project deadlines and team milestones across the enterprise.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('calendar')}
              className="px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
            >
              <CalendarDays className="h-4 w-4 text-blue-700" />
              Open Full Calendar
            </button>
            {isAdmin && (
              <button
                onClick={onOpenNewEvent}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm shadow-md transition-all border border-blue-400/30 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Schedule Event
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 5 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Upcoming */}
        <div
          onClick={() => setActiveTab('calendar')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Upcoming
            </span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{totalUpcomingEvents}</span>
            <span className="text-xs font-semibold text-emerald-600">Active</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Scheduled across all units</p>
        </div>

        {/* Card 2: Staff Birthdays */}
        <div
          onClick={() => setActiveTab('birthdays')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Staff Birthdays
            </span>
            <div className="h-9 w-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cake className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{upcomingBirthdays.length}</span>
            <span className="text-xs font-semibold text-pink-600">Nov - Dec</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Team celebrants coming up</p>
        </div>

        {/* Card 3: Public Holidays */}
        <div
          onClick={() => setActiveTab('holidays')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Public Holidays
            </span>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Flag className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{upcomingHolidays.length}</span>
            <span className="text-xs font-semibold text-emerald-600">Nigerian 🇳🇬</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Official statutory holidays</p>
        </div>

        {/* Card 4: Scheduled Meetings */}
        <div
          onClick={() => setActiveTab('meetings')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Meetings
            </span>
            <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{scheduledMeetings.length}</span>
            <span className="text-xs font-semibold text-indigo-600">Booked</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Standups & board sessions</p>
        </div>

        {/* Card 5: Upcoming Deadlines */}
        <div
          onClick={() => setActiveTab('events')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Deadlines
            </span>
            <div className="h-9 w-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{upcomingDeadlines.length}</span>
            <span className="text-xs font-semibold text-rose-600">Priority</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Key deliverables & audits</p>
        </div>
      </div>

      {/* Main Grid: Upcoming Schedule & Announcements / Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Next Upcoming Events Timeline */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Upcoming Agenda & Activities</h2>
              <p className="text-xs text-slate-500">Events scheduled for the next 30 days</p>
            </div>
            <button
              onClick={() => setActiveTab('calendar')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              View Calendar <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {upcomingEvents.slice(0, 6).map((item) => {
              const cfg = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.announcement;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectEvent(item)}
                  className="p-4 rounded-xl border border-slate-200/70 hover:border-blue-300 hover:bg-slate-50/80 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="text-center bg-slate-100 px-3 py-2 rounded-xl shrink-0 group-hover:bg-blue-50 transition-colors">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase">
                        {new Date(item.event_date).toLocaleDateString('en-GB', { month: 'short' })}
                      </span>
                      <span className="block text-lg font-black text-slate-900">
                        {new Date(item.event_date).toLocaleDateString('en-GB', { day: 'numeric' })}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${cfg.badge}`}>
                          {cfg.label}
                        </span>
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.start_time || 'All Day'}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {item.venue ? `📍 ${item.venue}` : item.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="hidden sm:block h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Announcements & Notification Center */}
        <div className="space-y-6">
          {/* Announcements Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-cyan-600" />
                <h3 className="text-base font-bold text-slate-900">Company Announcements</h3>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {recentAnnouncements.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-cyan-700 bg-cyan-100/80 px-2 py-0.5 rounded">
                      Official Notice
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {item.event_date}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Notification Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Recent Alerts</h3>
              </div>
              <button
                onClick={() => setActiveTab('notifications')}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                View all
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {notifications.slice(0, 3).map(n => (
                <div
                  key={n.id}
                  className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 text-xs flex items-start gap-2.5"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">{n.title}</p>
                    <p className="text-[11px] text-slate-600 line-clamp-1">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
