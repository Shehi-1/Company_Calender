import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  Plus,
  ShieldCheck,
  User,
  CheckCircle2,
  Calendar,
  X,
  Lock,
  Unlock
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

export default function Header({ setMobileOpen, onOpenNewEvent }) {
  const {
    currentUser,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    isAdmin,
    lockToStaff,
    setIsAdminModalOpen
  } = useCalendar();
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.is_read);

  const todayFormatted = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Date Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-white p-1 border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
              <img src="/robotz-logo.png" alt="Robotz Academy" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Lagos, Nigeria (WAT)
              </p>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {todayFormatted}
              </h2>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action, Notifications & User Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin vs Staff Badge / Trigger */}
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenNewEvent}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm shadow-blue-600/20 transition-all hover:shadow"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Event</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button
                onClick={lockToStaff}
                title="Lock admin session"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 text-xs font-bold rounded-lg transition-colors"
              >
                <Lock className="h-3.5 w-3.5 text-amber-600" />
                <span>Admin Active</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold rounded-lg border border-slate-200 hover:border-blue-300 transition-all shadow-xs"
            >
              <Unlock className="h-3.5 w-3.5 text-amber-500" />
              <span>Admin PIN Login</span>
            </button>
          )}

          {/* In-App Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notification Center"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Dropdown Menu */}
            {showNotificationsDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotificationsDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                  <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-800">Notifications</span>
                      {unreadNotifications.length > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-700 rounded-full">
                          {unreadNotifications.length} New
                        </span>
                      )}
                    </div>
                    {unreadNotifications.length > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-sm">
                        No notifications at the moment
                      </div>
                    ) : (
                      notifications.slice(0, 8).map(notif => (
                        <div
                          key={notif.id}
                          className={`p-3 text-left transition-colors flex items-start gap-3 hover:bg-slate-50 ${
                            notif.is_read ? 'opacity-70' : 'bg-blue-50/40'
                          }`}
                        >
                          <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${notif.is_read ? 'bg-slate-300' : 'bg-blue-600'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900">{notif.title}</p>
                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{notif.message}</p>
                            <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                              <span>{new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              {!notif.is_read && (
                                <button
                                  onClick={() => markNotificationAsRead(notif.id)}
                                  className="text-blue-600 hover:text-blue-800 font-semibold"
                                >
                                  Read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${
              isAdmin ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {isAdmin ? 'A' : 'S'}
            </div>
            <div className="text-left text-xs leading-none">
              <p className="font-bold text-slate-800">{currentUser.name.split(' ')[0]}</p>
              <p className="text-[10px] text-slate-500 capitalize">{currentUser.role} mode</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
