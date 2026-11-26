import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, Eye, EyeOff } from 'lucide-react';
import { UserRole } from '../../types';

interface DealerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole, username: string) => void;
}

export const DealerLoginModal: React.FC<DealerLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanUser = username.trim().toLowerCase();
    const validUsername = cleanUser === 'autosale2660' || cleanUser === 'admin' || cleanUser === 'dealer';
    const validPassword = password === 'Linkerbaan.40' || password === 'autosale2026' || password === 'admin';

    if (!validUsername || !validPassword) {
      setError('Ongeldige gebruikersnaam of wachtwoord. Probeer het opnieuw.');
      return;
    }

    onLoginSuccess('admin', username.trim() || 'Michel / Beheerder');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#1A1A1A] text-white rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 p-1 flex items-center justify-center shadow-md shrink-0">
            <img src="/logo2.png" alt="Auto Sale" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-xl font-black font-['Outfit',sans-serif]">
              Dealer Beheerportaal
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Beveiligde toegang voor directie & beheer
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">

          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
              Gebruikersnaam
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="bv. admin"
              className="w-full min-h-[44px] bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-base sm:text-sm text-white focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
              Wachtwoord
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full min-h-[44px] bg-zinc-900 border border-zinc-800 rounded-2xl pl-4 pr-12 py-3 text-base sm:text-sm text-white focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                  showPassword ? '' : 'tracking-wider'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Wachtwoord verbergen' : 'Wachtwoord tonen'}
                title={showPassword ? 'Wachtwoord verbergen' : 'Wachtwoord tonen'}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full min-h-[46px] py-3.5 px-4 rounded-2xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Inloggen op Dashboard</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-800/80 text-[11px] text-gray-500 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Beveiligde verbinding
          </span>
          <span className="text-gray-400">Directie &amp; Beheer</span>
        </div>
      </div>
    </div>
  );
};
