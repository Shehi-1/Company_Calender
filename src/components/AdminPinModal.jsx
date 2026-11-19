import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  KeyRound,
  X,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

export default function AdminPinModal({ isOpen, onClose }) {
  const { verifyAndElevateAdmin, adminPin } = useCalendar();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.length !== 5) {
      setError('PIN must be exactly 5 digits');
      return;
    }

    const success = verifyAndElevateAdmin(pin);
    if (success) {
      setError('');
      setPin('');
      onClose();
    } else {
      setError('Incorrect 5-digit PIN. Please try again.');
    }
  };

  const handleKeyClick = (digit) => {
    if (pin.length < 5) {
      setPin(prev => prev + digit);
      setError('');
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 text-center relative">
          <button
            onClick={() => {
              setError('');
              setPin('');
              onClose();
            }}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3 shadow-lg">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-extrabold text-white">Administrator Access</h3>
          <p className="text-xs text-slate-400 mt-1">
            Enter your 5-digit security PIN to unlock administrative controls
          </p>
        </div>

        {/* PIN Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* PIN Display */}
            <div className="flex justify-center items-center gap-2 mb-2">
              {[0, 1, 2, 3, 4].map(idx => {
                const filled = pin.length > idx;
                return (
                  <div
                    key={idx}
                    className={`h-11 w-11 rounded-xl border-2 flex items-center justify-center text-lg font-black transition-all ${
                      filled
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-400'
                    }`}
                  >
                    {filled ? (showPin ? pin[idx] : '●') : ''}
                  </div>
                );
              })}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-1.5 justify-center">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Toggle Visibility & Quick Helper */}
            <div className="flex items-center justify-end text-xs text-slate-500 pt-1">
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
              >
                {showPin ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                <span>{showPin ? 'Hide PIN' : 'Show PIN'}</span>
              </button>
            </div>

            {/* Numeric Keypad for fast desktop & mobile input */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyClick(String(num))}
                  className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-900 font-bold text-base transition-colors"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={handleClear}
                className="py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-semibold text-xs transition-colors"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => handleKeyClick('0')}
                className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-900 font-bold text-base transition-colors"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleBackspace}
                className="py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors"
              >
                ⌫
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={pin.length !== 5}
              className="w-full mt-3 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="h-4 w-4" />
              <span>Unlock Admin Access</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
