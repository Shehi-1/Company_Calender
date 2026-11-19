import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Building,
  Clock,
  Mail,
  Bell,
  Database,
  ShieldCheck,
  CheckCircle,
  KeyRound,
  Lock,
  Unlock,
  Save,
  AlertCircle
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';
import { isSupabaseConfigured } from '../lib/supabase';

export default function SettingsView() {
  const {
    companySettings,
    setCompanySettings,
    isAdmin,
    currentUser,
    lockToStaff,
    setIsAdminModalOpen,
    adminPin,
    changeAdminPin
  } = useCalendar();

  const [settingsState, setSettingsState] = useState(companySettings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Change PIN states
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinMessage, setPinMessage] = useState(null);

  const isConfigured = isSupabaseConfigured();

  const handleSave = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Only administrators can update organisation settings.');
      return;
    }
    setCompanySettings(settingsState);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleUpdatePin = (e) => {
    e.preventDefault();
    const res = changeAdminPin(oldPin, newPin);
    setPinMessage(res);
    if (res.success) {
      setOldPin('');
      setNewPin('');
    }
    setTimeout(() => setPinMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <SettingsIcon className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Company & Security Settings
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Configure organisation identity, notification dispatch rules, and 5-digit Admin Security PIN
          </p>
        </div>

        {isAdmin ? (
          <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-lg border border-amber-200 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-amber-600" />
            <span>Administrator Privileges Active</span>
          </span>
        ) : (
          <span className="px-3 py-1 bg-slate-100 text-slate-600 font-medium text-xs rounded-lg border border-slate-200 flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-slate-400" />
            <span>Staff Mode (Read Only)</span>
          </span>
        )}
      </div>

      {/* Role State Banner & PIN Trigger */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-amber-400" />
            <h3 className="text-sm font-bold">Role-Based Security Gate</h3>
          </div>
          <p className="text-xs text-blue-200 max-w-xl">
            Currently active: <strong className="text-white capitalize">{currentUser.name} ({currentUser.role} mode)</strong>. Staff dashboard is free for all members to view, while admin features require entering a 5-digit PIN.
          </p>
        </div>

        <div>
          {isAdmin ? (
            <button
              onClick={lockToStaff}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md flex items-center gap-1.5 transition-all"
            >
              <Lock className="h-4 w-4" />
              <span>Lock Admin Session</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-blue-900 hover:bg-blue-50 shadow-md flex items-center gap-1.5 transition-all"
            >
              <Unlock className="h-4 w-4 text-amber-600" />
              <span>Unlock with 5-Digit PIN</span>
            </button>
          )}
        </div>
      </div>

      {/* Section: Change 5-Digit Admin PIN (Only accessible by Admin) */}
      {isAdmin && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <KeyRound className="h-5 w-5 text-amber-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Change Admin Security PIN</h3>
              <p className="text-xs text-slate-400">Update the 5-digit numeric passcode used to unlock Administrator access</p>
            </div>
          </div>

          <form onSubmit={handleUpdatePin} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Current 5-Digit PIN
              </label>
              <input
                type="password"
                maxLength={5}
                required
                placeholder="Current PIN"
                value={oldPin}
                onChange={(e) => setOldPin(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-center text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                New 5-Digit PIN
              </label>
              <input
                type="password"
                maxLength={5}
                required
                placeholder="5 digits"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-center text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Update PIN
            </button>
          </form>

          {pinMessage && (
            <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              pinMessage.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {pinMessage.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <span>{pinMessage.message}</span>
            </div>
          )}
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Section 1: Organisation Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
            <Building className="h-4 w-4 text-blue-600" />
            <span>Organisation Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Company Legal Name
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settingsState.companyName}
                onChange={(e) => setSettingsState({ ...settingsState, companyName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Standard Business Hours
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settingsState.workHours}
                onChange={(e) => setSettingsState({ ...settingsState, workHours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Notifications Dispatch Preferences */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
            <Bell className="h-4 w-4 text-blue-600" />
            <span>Automated Notification Settings</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                disabled={!isAdmin}
                checked={settingsState.emailNotifications}
                onChange={(e) => setSettingsState({ ...settingsState, emailNotifications: e.target.checked })}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  Enable Email Notifications
                </span>
                <span className="text-slate-500">
                  Send emails to registered staff when events are created, updated, or when reminders are due.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                disabled={!isAdmin}
                checked={settingsState.inAppNotifications}
                onChange={(e) => setSettingsState({ ...settingsState, inAppNotifications: e.target.checked })}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  Enable In-App Notification Center
                </span>
                <span className="text-slate-500">
                  Surface real-time top-bar alerts for birthdays, meeting start notices, and holidays.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Section 3: Supabase & Cloud Database Status */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
            <Database className="h-4 w-4 text-blue-600" />
            <span>Database Storage & Supabase Status</span>
          </h3>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Supabase Connection State:</span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                isConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {isConfigured ? 'Connected to Remote Supabase' : 'Active Local Storage Simulation'}
              </span>
            </div>
            <p className="text-slate-500">
              The application is configured to your Supabase project (URL: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono text-[11px]">https://fplyywguwpuaaakiwgbq.supabase.co</code>).
            </p>
          </div>
        </div>

        {/* Save Button */}
        {isAdmin && (
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {saveSuccess ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" />
                Settings saved successfully!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
