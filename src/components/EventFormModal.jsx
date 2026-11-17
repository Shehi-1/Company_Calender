import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Bell,
  Tag,
  AlignLeft,
  CheckCircle,
  Mail
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

export default function EventFormModal({ isOpen, onClose, initialData = null }) {
  const { addEvent, updateEvent, isAdmin } = useCalendar();

  const [formData, setFormData] = useState({
    title: '',
    category: 'meeting',
    description: '',
    event_date: '2026-11-20',
    start_time: '10:00',
    end_time: '11:30',
    venue: '',
    participants: '',
    reminder_settings: '24 hours before'
  });

  const [sendEmailAlert, setSendEmailAlert] = useState(true);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || 'meeting',
        description: initialData.description || '',
        event_date: initialData.event_date || '2026-11-20',
        start_time: initialData.start_time || '10:00',
        end_time: initialData.end_time || '',
        venue: initialData.venue || '',
        participants: initialData.participants || '',
        reminder_settings: initialData.reminder_settings || '24 hours before'
      });
    } else {
      setFormData({
        title: '',
        category: 'meeting',
        description: '',
        event_date: '2026-11-20',
        start_time: '09:00',
        end_time: '10:00',
        venue: 'Main Office Conference Room & Teams',
        participants: 'All Department Staff',
        reminder_settings: '24 hours before'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Only administrators have permission to create or modify events.');
      return;
    }

    if (initialData && initialData.id) {
      updateEvent(initialData.id, formData);
    } else {
      addEvent(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">
              {initialData ? 'Edit Company Event' : 'Create New Company Event'}
            </h3>
            <p className="text-xs text-slate-400">
              Schedule corporate meetings, workshops, anniversaries or deadlines
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-sm">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Q4 Executive Strategy Alignment"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-medium"
            />
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
              >
                <option value="meeting">Company Meeting</option>
                <option value="training">Training and Workshop</option>
                <option value="anniversary">Company Anniversary</option>
                <option value="deadline">Project Deadline</option>
                <option value="announcement">General Announcement</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Event Date *
              </label>
              <input
                type="date"
                required
                value={formData.event_date}
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>

          {/* Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Start Time
              </label>
              <input
                type="time"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                End Time
              </label>
              <input
                type="time"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Venue / Virtual Link
            </label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              placeholder="e.g. Executive Boardroom / Zoom Meeting ID: 884-910"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Participants */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Participants / Target Audience
            </label>
            <input
              type="text"
              value={formData.participants}
              onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
              placeholder="e.g. All Staff, Engineering Department, Senior Managers"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Event Description & Agenda
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide context, meeting objectives, preparation notes or requirements..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Reminder Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Reminder Settings
              </label>
              <select
                value={formData.reminder_settings}
                onChange={(e) => setFormData({ ...formData, reminder_settings: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="1 hour before">1 hour before</option>
                <option value="24 hours before">24 hours before</option>
                <option value="2 days before">2 days before</option>
                <option value="1 week before">1 week before</option>
                <option value="Morning of event">Morning of event</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendEmailAlert}
                  onChange={(e) => setSendEmailAlert(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-blue-600" />
                  Email dispatch notification
                </span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/30 transition-all flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>{initialData ? 'Save Changes' : 'Publish Event'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
