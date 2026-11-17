import React, { useState } from 'react';
import {
  Flag,
  Plus,
  Calendar,
  AlertCircle,
  Moon,
  Trash2,
  Edit,
  ExternalLink,
  ShieldAlert,
  Info
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

export default function HolidaysManagement() {
  const { holidays, addHoliday, updateHoliday, deleteHoliday, isAdmin } = useCalendar();

  const [selectedYear, setSelectedYear] = useState(2026);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    holiday_date: '2026-10-01',
    year: 2026,
    is_lunar_estimated: false,
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingHoliday(null);
    setFormData({
      name: '',
      holiday_date: '2026-05-27',
      year: selectedYear,
      is_lunar_estimated: false,
      description: 'Official statutory public holiday gazetted by the Federal Ministry of Interior.'
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (hol) => {
    setEditingHoliday(hol);
    setFormData({
      name: hol.name,
      holiday_date: hol.holiday_date,
      year: hol.year,
      is_lunar_estimated: hol.is_lunar_estimated,
      description: hol.description || ''
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Only administrators have permission to declare or update public holidays.');
      return;
    }

    if (editingHoliday) {
      updateHoliday(editingHoliday.id, formData);
    } else {
      addHoliday(formData);
    }
    setShowAddModal(false);
  };

  const filteredHolidays = holidays
    .filter(h => h.year === selectedYear)
    .sort((a, b) => a.holiday_date.localeCompare(b.holiday_date));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Flag className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Nigerian Statutory Public Holidays
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Official federal gazette holidays, Christian & Islamic lunar observances with administrative override
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
            className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value={2025}>Year 2025</option>
            <option value={2026}>Year 2026</option>
            <option value={2027}>Year 2027</option>
          </select>

          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow shadow-emerald-500/20 text-xs sm:text-sm transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add / Gazette Holiday</span>
            </button>
          )}
        </div>
      </div>

      {/* Special Information Banner on Islamic Moonsighting & Federal Declarations */}
      <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Moon className="h-5 w-5 text-emerald-700 mt-0.5 shrink-0" />
          <div className="text-xs space-y-0.5">
            <p className="font-bold">
              Dynamic Lunar Observances (Eid-el-Fitr, Eid-el-Kabir, Eid-el-Maulud)
            </p>
            <p className="text-emerald-800">
              Islamic holiday dates are subject to the physical sighting of the crescent moon as confirmed by the Nigerian Supreme Council for Islamic Affairs (NSCIA) and the Federal Ministry of Interior. Administrators can modify confirmed dates instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Holidays List / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Declared Holidays ({filteredHolidays.length} Days)
          </span>
          <span className="text-xs text-slate-400">
            Federal Republic of Nigeria Official Observances
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredHolidays.map((hol) => (
            <div
              key={hol.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="text-center bg-emerald-50 text-emerald-800 px-3 py-2 rounded-xl border border-emerald-100 shrink-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider">
                    {new Date(hol.holiday_date).toLocaleDateString('en-GB', { month: 'short' })}
                  </span>
                  <span className="block text-xl font-black leading-tight">
                    {new Date(hol.holiday_date).toLocaleDateString('en-GB', { day: 'numeric' })}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {hol.name}
                    </h3>
                    {hol.is_lunar_estimated && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-md border border-amber-200">
                        <Moon className="h-3 w-3" />
                        Estimated Lunar Date
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 max-w-xl">
                    {hol.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {isAdmin && (
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleOpenEdit(hol)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    <span>Update Date</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove holiday "${hol.name}"?`)) {
                        deleteHoliday(hol.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete holiday"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Add / Update Public Holiday */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  {editingHoliday ? 'Update Gazetted Holiday' : 'Add New Public Holiday'}
                </h3>
                <p className="text-xs text-slate-400">Federal Government statutory declaration</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Holiday Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eid-el-Kabir (Feast of Sacrifice)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Holiday Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.holiday_date}
                  onChange={(e) => setFormData({ ...formData, holiday_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description / Federal Gazette Note
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Official gazette remarks, ministry directive..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_lunar_estimated}
                    onChange={(e) => setFormData({ ...formData, is_lunar_estimated: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                  />
                  <span className="text-xs font-bold text-amber-900">
                    Subject to Islamic Moon Sighting confirmation
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow"
                >
                  {editingHoliday ? 'Confirm Date' : 'Save Holiday'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
