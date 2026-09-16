import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Music, ArrowRight, Sparkles, Lock, Mail, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const magicalKeysLogo = '/images/magicalKeysLogo.png';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = (location.state as any)?.from?.pathname ||
    new URLSearchParams(location.search).get('redirect') ||
    '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-28 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#12141c] border border-[#232838] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={magicalKeysLogo} alt="logo" className="w-15 h-15" />
            <div className="flex flex-col items-start">
              <span className="font-editorial text-xl tracking-wider text-white">
                MAGICAL KEYS
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-medium leading-none">
                Raghu
              </span>
            </div>
          </Link>
          <h1 className="font-editorial text-2xl text-white font-normal">
            Welcome Back, Musician
          </h1>
          <p className="text-xs text-zinc-400">
            Sign in to access your masterclasses, practice drills, and digital sheets.
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div className="p-3.5 rounded-2xl bg-[#171a25] border border-amber-500/30 flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
              Instant Access
            </span>
            <span className="text-xs text-zinc-200">
              Demo Student (Maya Chen)
            </span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
          >
            1-Click Demo Sign In
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs text-center">
            {error}
          </div>
        )}

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 block mb-1 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0e1016] border border-[#272c3d] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-zinc-400 font-medium">
                Password
              </label>
              <span className="text-[11px] text-zinc-500 hover:text-amber-400 cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0e1016] border border-[#272c3d] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/15 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#1e2230]">
          <p className="text-xs text-zinc-400">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-semibold text-amber-400 hover:underline">
              Create student account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
