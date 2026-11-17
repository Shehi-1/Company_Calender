import React, { useState } from 'react';
import {
  Users2,
  Plus,
  Clock,
  MapPin,
  Calendar,
  Video,
  Search,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

export default function MeetingsView({ onOpenNewEvent, onSelectEvent }) {
  const { events, isAdmin } = useCalendar();
  const [searchTerm, setSearchTerm] = useState('');

  const meetingEvents = events.filter(e => e.category === 'meeting');

  const filteredMeetings = meetingEvents.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.venue && m.venue.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (m.participants && m.participants.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users2 className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Corporate Meetings & Standups
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Executive sessions, department synchronizations, steering committees and townhalls
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={onOpenNewEvent}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow shadow-indigo-500/20 text-xs sm:text-sm transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Schedule Meeting</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search meetings by subject, attendees or virtual venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Meetings List */}
      <div className="space-y-3">
        {filteredMeetings.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-2xl border border-slate-200 p-6">
            <Users2 className="h-10 w-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No scheduled meetings found</h3>
            <p className="text-xs text-slate-400 mt-1">Schedule an executive session or department standup.</p>
          </div>
        ) : (
          filteredMeetings.map(meeting => (
            <div
              key={meeting.id}
              onClick={() => onSelectEvent(meeting)}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-center bg-indigo-50 text-indigo-700 px-3.5 py-2.5 rounded-xl border border-indigo-100 shrink-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider">
                    {new Date(meeting.event_date).toLocaleDateString('en-GB', { month: 'short' })}
                  </span>
                  <span className="block text-xl font-black leading-tight">
                    {new Date(meeting.event_date).toLocaleDateString('en-GB', { day: 'numeric' })}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {meeting.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Clock className="h-3.5 w-3.5 text-indigo-600" />
                      {meeting.start_time} {meeting.end_time ? `– ${meeting.end_time}` : ''}
                    </span>
                    {meeting.venue && (
                      <span className="flex items-center gap-1 text-slate-600">
                        <MapPin className="h-3.5 w-3.5 text-rose-500" />
                        {meeting.venue}
                      </span>
                    )}
                  </div>
                  {meeting.participants && (
                    <p className="text-xs text-slate-500">
                      <strong className="text-slate-700">Participants:</strong> {meeting.participants}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectEvent(meeting);
                }}
                className="self-end md:self-center px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors"
              >
                Session Briefing
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
