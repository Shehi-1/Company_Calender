import React, { useState } from 'react';
import {
  Cake,
  Plus,
  Mail,
  Building2,
  Calendar,
  Search,
  Trash2,
  Edit,
  Heart,
  Gift,
  Send,
  AlertCircle
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

export default function BirthdaysManagement() {
  const { staff, addStaff, updateStaff, deleteStaff, sendEmailNotification, isAdmin } = useCalendar();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    department: 'Engineering & Technology',
    birthday: '1995-05-15',
    phone_number: ''
  });

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const handleOpenAdd = () => {
    setEditingStaff(null);
    setFormData({
      full_name: '',
      email: '',
      department: 'Engineering & Technology',
      birthday: '1995-11-20',
      phone_number: ''
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (member) => {
    setEditingStaff(member);
    setFormData({
      full_name: member.full_name,
      email: member.email,
      department: member.department,
      birthday: member.birthday,
      phone_number: member.phone_number || ''
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Only administrators have permission to register staff or update birthday records.');
      return;
    }

    if (editingStaff) {
      updateStaff(editingStaff.id, formData);
    } else {
      addStaff(formData);
    }
    setShowAddModal(false);
  };

  const handleSendWish = (member) => {
    sendEmailNotification(
      `Happy Birthday, ${member.full_name}! 🎂🎉`,
      `On behalf of the entire company, we wish ${member.full_name} (${member.department}) a joyous and prosperous birthday celebration!`,
      member.email
    );
    alert(`Birthday congratulations email simulated & dispatched to ${member.email}!`);
  };

  // Filter staff
  const filteredStaff = staff.filter(member => {
    const matchesSearch =
      member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const monthOfBirth = member.birthday.split('-')[1];
    const matchesMonth = selectedMonth === 'all' || monthOfBirth === selectedMonth;

    return matchesSearch && matchesMonth;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <Cake className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Staff Birthdays Directory</h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Celebrate colleagues, automatically synchronize birthdays with the calendar, and dispatch timely reminders
          </p>
        </div>

        {isAdmin ? (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow shadow-pink-500/20 text-xs sm:text-sm transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Register Employee Birthday</span>
          </button>
        ) : (
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Staff Viewing Mode (Protected Personal Info)
          </span>
        )}
      </div>

      {/* Filters and Month Picker */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee by name, department or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
          >
            <option value="all">All Birth Months</option>
            {months.map(m => (
              <option key={m.value} value={m.value}>
                {m.label} Celebrants
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Staff Birthdays Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 p-6">
            <Gift className="h-10 w-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No birthdays recorded for this filter</h3>
            <p className="text-xs text-slate-400 mt-1">Try selecting another month or register a new staff member.</p>
          </div>
        ) : (
          filteredStaff.map(member => {
            const dateParts = member.birthday.split('-');
            const monthNumber = dateParts[1];
            const dayNumber = dateParts[2];
            const monthName = months.find(m => m.value === monthNumber)?.label || 'Month';

            return (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold text-base shadow-md shadow-pink-500/20">
                      {member.full_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {member.full_name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <Building2 className="h-3.5 w-3.5 text-slate-400" />
                        <span>{member.department}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center bg-pink-50 text-pink-700 px-2.5 py-1.5 rounded-xl border border-pink-100">
                    <span className="block text-[10px] font-bold uppercase tracking-wider">{monthName.slice(0, 3)}</span>
                    <span className="block text-base font-black leading-tight">{dayNumber}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-pink-500" />
                    <span className="font-semibold text-slate-800">
                      Celebrates every {monthName} {dayNumber}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => handleSendWish(member)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg text-xs font-bold transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Birthday Wish</span>
                  </button>

                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(member)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                        title="Edit Record"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove birthday record for ${member.full_name}?`)) {
                            deleteStaff(member.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Record"
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

      {/* Modal: Add / Edit Staff Birthday */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  {editingStaff ? 'Edit Staff Birthday' : 'Register Staff Member'}
                </h3>
                <p className="text-xs text-slate-400">Personal records are protected and managed by admins</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Employee Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Babatunde Fashola"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-pink-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Corporate Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="babatunde@company.ng"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-pink-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Department *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-pink-500 bg-white font-medium"
                >
                  <option value="Engineering & Technology">Engineering & Technology</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Finance & Accounts">Finance & Accounts</option>
                  <option value="Operations & Strategy">Operations & Strategy</option>
                  <option value="Sales & Marketing">Sales & Marketing</option>
                  <option value="Product & Design">Product & Design</option>
                  <option value="Legal & Compliance">Legal & Compliance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  required
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-pink-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="+234 803 000 0000"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-pink-500"
                />
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
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold shadow"
                >
                  {editingStaff ? 'Save Changes' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
