import React from 'react';
import {
  Bell,
  CheckCircle2,
  Trash2,
  Calendar,
  Cake,
  Users2,
  Flag,
  Clock,
  Info,
  Send,
  Mail
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

export default function NotificationsCenter() {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotification,
    sentEmails
  } = useCalendar();

  const getNotifIcon = (type) => {
    switch (type) {
      case 'birthday':
        return <Cake className="h-4 w-4 text-pink-600" />;
      case 'holiday':
        return <Flag className="h-4 w-4 text-emerald-600" />;
      case 'meeting':
        return <Users2 className="h-4 w-4 text-indigo-600" />;
      case 'deadline':
        return <Clock className="h-4 w-4 text-rose-600" />;
      default:
        return <Calendar className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Notification & Dispatch Centre
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Real-time in-app alerts and simulated SMTP email notifications dispatch log
          </p>
        </div>

        {notifications.some(n => !n.is_read) && (
          <button
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition-all"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* In-App Notifications (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              In-App Notifications ({notifications.length})
            </h3>
            <span className="text-xs text-slate-400">
              {notifications.filter(n => !n.is_read).length} unread
            </span>
          </div>

          <div className="space-y-2.5">
            {notifications.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                No notifications logged.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 bg-white ${
                    notif.is_read ? 'border-slate-200 opacity-75' : 'border-blue-300 shadow-xs bg-blue-50/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                      {getNotifIcon(notif.type)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                        <span>{new Date(notif.created_at).toLocaleString('en-GB')}</span>
                        <span className="capitalize px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                          Audience: {notif.target_role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {!notif.is_read && (
                      <button
                        onClick={() => markNotificationAsRead(notif.id)}
                        className="p-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded-lg font-bold"
                        title="Mark as read"
                      >
                        Read
                      </button>
                    )}
                    <button
                      onClick={() => clearNotification(notif.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                      title="Clear"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Email Dispatch Audit Log (1 Column) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="h-4 w-4 text-blue-600" />
              <span>Dispatched Emails ({sentEmails.length})</span>
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm max-h-[600px] overflow-y-auto">
            {sentEmails.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No email notifications dispatched yet. Creating or modifying an event automatically triggers email notifications to registered staff.
              </div>
            ) : (
              sentEmails.map(mail => (
                <div key={mail.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {mail.status}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(mail.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-900 leading-snug">{mail.subject}</h5>
                  <p className="text-slate-600 line-clamp-3">{mail.body}</p>
                  <p className="text-[10px] text-slate-400 truncate">
                    <strong>To:</strong> {mail.recipients.join(', ')}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
