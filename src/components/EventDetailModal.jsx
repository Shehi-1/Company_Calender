import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Bell,
  Trash2,
  Edit3,
  X,
  Share2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';
import { CATEGORY_CONFIG } from '../data/initialData';

export default function EventDetailModal({ event, onClose, onEdit }) {
  const { deleteEvent, isAdmin } = useCalendar();
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const cfg = CATEGORY_CONFIG[event.category] || CATEGORY_CONFIG.announcement;

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete event "${event.title}"?`)) {
      deleteEvent(event.id);
      onClose();
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `Event: ${event.title}\nDate: ${event.event_date}\nTime: ${event.start_time || 'All Day'}\nVenue: ${event.venue || 'TBD'}\nCategory: ${cfg.label}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className={`p-6 ${cfg.lightBg} border-b border-slate-200/80 flex items-start justify-between relative`}>
          <div className="space-y-2 pr-6">
            <span className={`inline-block px-2.5 py-1 text-xs font-bold uppercase rounded-lg border ${cfg.badge}`}>
              {cfg.label}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
              {event.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-sm">
          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2.5 text-slate-700">
              <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Date</p>
                <p className="font-semibold">{event.event_date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Clock className="h-4 w-4 text-indigo-600 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Schedule</p>
                <p className="font-semibold">{event.start_time || 'All Day'} {event.end_time ? `– ${event.end_time}` : ''}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">About Event</p>
              <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                {event.description}
              </p>
            </div>
          )}

          {/* Venue & Participants */}
          <div className="space-y-2.5">
            {event.venue && (
              <div className="flex items-start gap-2.5 text-slate-700">
                <MapPin className="h-4 w-4 text-rose-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Venue / Location: </span>
                  <span className="text-slate-600">{event.venue}</span>
                </div>
              </div>
            )}

            {event.participants && (
              <div className="flex items-start gap-2.5 text-slate-700">
                <Users className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Target Participants: </span>
                  <span className="text-slate-600">{event.participants}</span>
                </div>
              </div>
            )}

            {event.reminder_settings && (
              <div className="flex items-center gap-2.5 text-slate-700">
                <Bell className="h-4 w-4 text-amber-500 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Reminder Timing: </span>
                  <span className="text-slate-600">{event.reminder_settings}</span>
                </div>
              </div>
            )}
          </div>

          {/* Derived Item Notice (Birthdays & Holidays) */}
          {(event.isBirthdayDerived || event.isHolidayDerived) && (
            <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-xs text-blue-800 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-blue-600 shrink-0" />
              <span>
                {event.isBirthdayDerived
                  ? 'This item is automatically linked to the Staff Birthdays registry.'
                  : 'This item is synchronized with Nigerian Statutory Public Holidays.'}
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
            <span>{copied ? 'Copied' : 'Copy Summary'}</span>
          </button>

          <div className="flex items-center gap-2">
            {isAdmin && !event.isBirthdayDerived && !event.isHolidayDerived ? (
              <>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onEdit(event);
                  }}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Event</span>
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
