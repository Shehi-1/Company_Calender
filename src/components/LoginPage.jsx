import React, { useState } from 'react';
import {
  Lock,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
  Building,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

export default function LoginPage({ onLoginSuccess }) {
  const { adminPin, verifyAndElevateAdmin, staffMembers, loginStaffMember } = useCalendar();

  const [activeTab, setActiveTab] = useState('staff'); // 'staff' | 'admin'

  // Admin Login States
  const [pin, setPin] = useState('');
  const [adminError, setAdminError] = useState('');
  const [showAdminPin, setShowAdminPin] = useState(false);

  // Staff Login States
  const [identifier, setIdentifier] = useState(''); // email or 4-digit ID
  const [staffPassword, setStaffPassword] = useState('');
  const [showStaffPassword, setShowStaffPassword] = useState(false);
  const [staffError, setStaffError] = useState('');

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (pin.length !== 5) {
      setAdminError('PIN must be exactly 5 numeric digits.');
      return;
    }

    const success = verifyAndElevateAdmin(pin);
    if (success) {
      setAdminError('');
      if (onLoginSuccess) onLoginSuccess('admin');
    } else {
      setAdminError('Incorrect 5-digit PIN. Please try again.');
    }
  };

  const handleStaffSubmit = (e) => {
    e.preventDefault();
    setStaffError('');

    const res = loginStaffMember(identifier.trim(), staffPassword.trim());
    if (res.success) {
      if (onLoginSuccess) onLoginSuccess('staff');
    } else {
      setStaffError(res.message || 'Invalid staff credentials.');
    }
  };

  const handleKeyClick = (digit) => {
    if (pin.length < 5) {
      setPin(prev => prev + digit);
      setAdminError('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative z-10 backdrop-blur-md">
        {/* Brand Header */}
        <div className="p-8 text-center border-b border-slate-800/80 bg-slate-900/60">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-white p-2.5 shadow-xl flex items-center justify-center mb-4">
            <img src="/robotz-logo.png" alt="Robotz Academy" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">Robotz Academy</h1>
          <p className="text-xs text-slate-400 mt-1">Calendar & Operations Portal</p>

          {/* Tab Switcher: Staff Login vs Admin Login */}
          <div className="mt-6 p-1 bg-slate-800/90 rounded-2xl border border-slate-700/60 flex items-center">
            <button
              onClick={() => setActiveTab('staff')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'staff'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Staff Login</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Staff Login Form */}
        {activeTab === 'staff' && (
          <form onSubmit={handleStaffSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">Staff Member Sign In</h2>
              <p className="text-xs text-slate-400">
                Log in with your official corporate email or 4-digit ID and password to access your personalized schedule.
              </p>
            </div>

            {staffError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{staffError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Work Email or 4-Digit Company ID
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 1042 or name@robotzacademy.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowStaffPassword(!showStaffPassword)}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  {showStaffPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  <span>{showStaffPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <input
                type={showStaffPassword ? 'text' : 'password'}
                required
                placeholder="Enter your member password"
                value={staffPassword}
                onChange={(e) => setStaffPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Security note: 4-digit ID alone is not accepted as a password.
              </p>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In as Staff</span>
            </button>

            {/* Quick Demo Staff Helper */}
            <div className="pt-3 border-t border-slate-800/80 text-center">
              <span className="text-[11px] text-slate-500 block mb-2">Registered Demo Members</span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {staffMembers.slice(0, 3).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setIdentifier(m.email);
                      setStaffPassword(m.password || 'staff123');
                    }}
                    className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 font-medium transition-colors"
                  >
                    {m.full_name.split(' ')[0]} ({m.company_id || 'ID'})
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}

        {/* Tab 2: Admin Login Form (5-Digit PIN Gate) */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">Administrator Access</h2>
              <p className="text-xs text-slate-400">
                Enter your 5-digit security PIN to unlock full management privileges.
              </p>
            </div>

            {/* 5-Digit PIN Boxes */}
            <div className="flex justify-center items-center gap-2.5 my-3">
              {[0, 1, 2, 3, 4].map(idx => {
                const filled = pin.length > idx;
                return (
                  <div
                    key={idx}
                    className={`h-12 w-12 rounded-xl border-2 flex items-center justify-center text-lg font-black transition-all ${
                      filled
                        ? 'border-amber-400 bg-amber-400/10 text-amber-300 shadow-sm'
                        : 'border-slate-800 bg-slate-800/80 text-slate-500'
                    }`}
                  >
                    {filled ? (showAdminPin ? pin[idx] : '●') : ''}
                  </div>
                );
              })}
            </div>

            {adminError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2 justify-center">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{adminError}</span>
              </div>
            )}

            <div className="flex items-center justify-end text-xs text-slate-400">
              <button
                type="button"
                onClick={() => setShowAdminPin(!showAdminPin)}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
              >
                {showAdminPin ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                <span>{showAdminPin ? 'Hide PIN' : 'Show PIN'}</span>
              </button>
            </div>

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyClick(String(num))}
                  className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-bold text-base transition-colors"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setPin('');
                  setAdminError('');
                }}
                className="py-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 font-semibold text-xs transition-colors"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => handleKeyClick('0')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-bold text-base transition-colors"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => {
                  setPin(prev => prev.slice(0, -1));
                  setAdminError('');
                }}
                className="py-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 font-bold text-sm transition-colors"
              >
                ⌫
              </button>
            </div>

            <button
              type="submit"
              disabled={pin.length !== 5}
              className="w-full mt-2 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="h-4 w-4" />
              <span>Unlock Admin Controls</span>
            </button>
          </form>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center text-xs text-slate-500">
        <p>Robotz Academy Enterprise Calendar Portal • WAT (UTC+1)</p>
      </div>
    </div>
  );
}
