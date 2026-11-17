import React, { useState } from 'react';
import {
  CalendarCheck2,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  Clock,
  MapPin,
  Users,
  AlertCircle
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';
import { CATEGORY_CONFIG } from '../data/initialData';

export default function EventsManagement({ onOpenNewEvent, onSelectEvent, onEditEvent }) {
  const { events, deleteEvent, isAdmin } = useCalendar();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredEvents = events.filter(e => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.description && e.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (e.venue && e.venue.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarCheck2 className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Events Management</h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Create, update and track corporate meetings, workshops, anniversaries and project deadlines
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={onOpenNewEvent}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow shadow-blue-500/20 text-xs sm:text-sm transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Event</span>
          </button>
        )}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by title, description or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Event Categories</option>
            <option value="meeting">Company Meeting</option>
            <option value="training">Training and Workshop</option>
            <option value="anniversary">Company Anniversary</option>
            <option value="deadline">Project Deadline</option>
            <option value="announcement">General Announcement</option>
          </select>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 p-6">
            <AlertCircle className="h-10 w-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No events found</h3>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search criteria or create a new event.</p>
          </div>
        ) : (
          filteredEvents.map(evt => {
            const cfg = CATEGORY_CONFIG[evt.category] || CATEGORY_CONFIG.announcement;
            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {evt.event_date}
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectEvent(evt)}
                    className="text-base font-bold text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors leading-snug line-clamp-2"
                  >
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {evt.description || 'No extended description provided.'}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    <span>{evt.start_time || 'All Day'} {evt.end_time ? `– ${evt.end_time}` : ''}</span>
                  </div>
                  {evt.venue && (
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                  )}
                  {evt.participants && (
                    <div className="flex items-center gap-2 truncate">
                      <Users className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{evt.participants}</span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => onSelectEvent(evt)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </button>

                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditEvent(evt)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit event"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${evt.title}"?`)) {
                            deleteEvent(evt.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete event"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
