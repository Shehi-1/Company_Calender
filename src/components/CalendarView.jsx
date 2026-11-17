import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Filter,
  Plus,
  Clock,
  MapPin,
  Users,
  Grid,
  Columns,
  CalendarRange
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';
import { CATEGORY_CONFIG } from '../data/initialData';

export default function CalendarView({ onSelectEvent, onOpenNewEvent }) {
  const { getAllCalendarItems, isAdmin } = useCalendar();

  // Navigation Date State
  const [currentDate, setCurrentDate] = useState(new Date('2026-11-17T00:00:00'));
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'week' | 'year'
  const [selectedCategory, setSelectedCategory] = useState('all');

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // All events for the current year
  const allItems = getAllCalendarItems(currentYear);

  // Filtered by Category
  const filteredItems = selectedCategory === 'all'
    ? allItems
    : allItems.filter(item => item.category === selectedCategory);

  // Month navigation helpers
  const handlePrev = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    } else if (viewMode === 'week') {
      const d = new Date(currentDate);
      d.setDate(d.getDate() - 7);
      setCurrentDate(d);
    } else {
      setCurrentDate(new Date(currentYear - 1, 0, 1));
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    } else if (viewMode === 'week') {
      const d = new Date(currentDate);
      d.setDate(d.getDate() + 7);
      setCurrentDate(d);
    } else {
      setCurrentDate(new Date(currentYear + 1, 0, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date('2026-11-17T00:00:00'));
  };

  // Month Grid Calculation
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = [];
  // Leading padding days from previous month
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const dateStr = `${currentMonth === 0 ? currentYear - 1 : currentYear}-${String(currentMonth === 0 ? 12 : currentMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({
      day: d,
      dateStr,
      isCurrentMonth: false
    });
  }

  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({
      day: d,
      dateStr,
      isCurrentMonth: true
    });
  }

  // Trailing padding days to make full 35 or 42 cells
  const remainingCells = (7 - (calendarDays.length % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    const dateStr = `${currentMonth === 11 ? currentYear + 1 : currentYear}-${String(currentMonth === 11 ? 1 : currentMonth + 2).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({
      day: d,
      dateStr,
      isCurrentMonth: false
    });
  }

  // Week Grid Calculation
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    weekDays.push({
      date: d,
      dateStr,
      dayName: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      dayNumber: d.getDate()
    });
  }

  const todayStr = '2026-11-17';

  return (
    <div className="space-y-6">
      {/* Calendar Controls & Top Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Navigation & Header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-all"
              title="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleToday}
              className="px-3 py-1 text-xs font-bold text-slate-700 hover:bg-white hover:shadow-xs rounded-lg transition-all"
            >
              Today
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-all"
              title="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
              {viewMode === 'year'
                ? currentYear
                : currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              West Africa Time • Enterprise Schedule
            </p>
          </div>
        </div>

        {/* View Switcher, Filter & Action */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Filter Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="meeting">Meetings</option>
              <option value="birthday">Staff Birthdays</option>
              <option value="holiday">Public Holidays</option>
              <option value="training">Training</option>
              <option value="deadline">Deadlines</option>
              <option value="anniversary">Anniversaries</option>
              <option value="announcement">Announcements</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'month' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'week' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('year')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'year' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Year
            </button>
          </div>

          {/* Schedule button */}
          {isAdmin && (
            <button
              onClick={onOpenNewEvent}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add Event</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Legend Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 text-xs">
        <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider">
          Legend:
        </span>
        {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot}`} />
            <span className="text-slate-600 font-medium">{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* Calendar Body: MONTH VIEW */}
      {viewMode === 'month' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Day Names Header */}
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center py-2.5">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <span key={day} className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {day}
              </span>
            ))}
          </div>

          {/* Month Cells Grid */}
          <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100">
            {calendarDays.map((cell, idx) => {
              const dayEvents = filteredItems.filter(item => item.event_date === cell.dateStr);
              const isToday = cell.dateStr === todayStr;

              return (
                <div
                  key={idx}
                  className={`min-h-[110px] sm:min-h-[130px] p-2 transition-colors flex flex-col justify-between ${
                    cell.isCurrentMonth ? 'bg-white hover:bg-slate-50/60' : 'bg-slate-50/40 text-slate-400'
                  }`}
                >
                  {/* Date number and today indicator */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center ${
                        isToday
                          ? 'bg-blue-600 text-white font-black shadow-sm shadow-blue-500/50'
                          : cell.isCurrentMonth
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {cell.day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-[10px] font-bold text-slate-400 sm:hidden">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>

                  {/* Events list within cell */}
                  <div className="mt-1 space-y-1 overflow-hidden flex-1">
                    {dayEvents.slice(0, 3).map((item) => {
                      const cfg = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.announcement;
                      return (
                        <div
                          key={item.id}
                          onClick={() => onSelectEvent(item)}
                          className={`px-1.5 py-0.5 rounded text-[11px] font-semibold truncate cursor-pointer transition-all hover:scale-[1.02] shadow-xs border-l-2 ${cfg.border} ${cfg.lightBg} text-slate-900`}
                          title={`${item.title} (${item.start_time || 'All Day'})`}
                        >
                          <span className="truncate">{item.title}</span>
                        </div>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <button
                        onClick={() => onSelectEvent(dayEvents[0])}
                        className="text-[10px] font-bold text-blue-600 hover:text-blue-800 block text-left"
                      >
                        +{dayEvents.length - 3} more
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Calendar Body: WEEK VIEW */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 divide-x divide-slate-200">
            {weekDays.map((col, idx) => {
              const dayEvents = filteredItems.filter(item => item.event_date === col.dateStr);
              const isToday = col.dateStr === todayStr;

              return (
                <div key={idx} className="min-h-[450px] flex flex-col">
                  {/* Day Column Header */}
                  <div className={`p-3 text-center border-b border-slate-200 ${isToday ? 'bg-blue-50' : 'bg-slate-50'}`}>
                    <span className="block text-xs font-bold text-slate-500 uppercase">
                      {col.dayName}
                    </span>
                    <span
                      className={`inline-block mt-1 text-base font-extrabold px-2 py-0.5 rounded-full ${
                        isToday ? 'bg-blue-600 text-white' : 'text-slate-800'
                      }`}
                    >
                      {col.dayNumber}
                    </span>
                  </div>

                  {/* Day Schedule Items */}
                  <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                    {dayEvents.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-slate-300 text-xs italic">
                        No events
                      </div>
                    ) : (
                      dayEvents.map(item => {
                        const cfg = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.announcement;
                        return (
                          <div
                            key={item.id}
                            onClick={() => onSelectEvent(item)}
                            className={`p-2.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:shadow-md transition-all ${cfg.lightBg}`}
                          >
                            <span className={`inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase rounded ${cfg.badge}`}>
                              {cfg.label}
                            </span>
                            <h4 className="mt-1 text-xs font-bold text-slate-900 leading-tight">
                              {item.title}
                            </h4>
                            <p className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.start_time || 'All Day'}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Calendar Body: YEAR VIEW */}
      {viewMode === 'year' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }, (_, monthIdx) => {
            const monthDate = new Date(currentYear, monthIdx, 1);
            const daysCount = new Date(currentYear, monthIdx + 1, 0).getDate();
            const startDay = monthDate.getDay();

            return (
              <div
                key={monthIdx}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    {monthDate.toLocaleDateString('en-GB', { month: 'long' })}
                  </h3>
                  <button
                    onClick={() => {
                      setCurrentDate(new Date(currentYear, monthIdx, 1));
                      setViewMode('month');
                    }}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800"
                  >
                    View Month
                  </button>
                </div>

                <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-1">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 text-center text-xs gap-y-1">
                  {Array.from({ length: startDay }, (_, i) => (
                    <span key={'empty-' + i} />
                  ))}
                  {Array.from({ length: daysCount }, (_, i) => {
                    const d = i + 1;
                    const dateStr = `${currentYear}-${String(monthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                    const hasEvent = filteredItems.some(item => item.event_date === dateStr);
                    const isToday = dateStr === todayStr;

                    return (
                      <div
                        key={d}
                        onClick={() => {
                          const evts = filteredItems.filter(item => item.event_date === dateStr);
                          if (evts.length > 0) onSelectEvent(evts[0]);
                        }}
                        className={`py-1 rounded text-center cursor-pointer transition-all ${
                          isToday
                            ? 'bg-blue-600 text-white font-black'
                            : hasEvent
                            ? 'bg-blue-100 text-blue-900 font-bold hover:bg-blue-200'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {d}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
