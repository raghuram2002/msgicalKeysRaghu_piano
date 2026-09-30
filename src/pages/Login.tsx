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
    <div className="min-h-screen bg-white text-slate-800 pt-28 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <span className="text-2xl font-bold tracking-tight text-[#637894]">
              Signal House
            </span>
          </Link>
          <h1 className="font-bold text-2xl text-slate-900 tracking-tight">
            Welcome Back, Musician
          </h1>
          <p className="text-xs text-slate-600">
            Sign in to access your masterclasses, practice drills, and digital sheets.
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-[#637894] tracking-wider block">
              Instant Access
            </span>
            <span className="text-xs text-slate-800 font-medium">
              Demo Student (Maya Chen)
            </span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="px-3.5 py-1.5 bg-[#7388a5] hover:bg-[#5f7491] text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            1-Click Demo Sign In
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-600 block mb-1 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-slate-600 font-medium">
                Password
              </label>
              <span className="text-[11px] text-slate-500 hover:text-[#7388a5] cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#7388a5] hover:bg-[#5f7491] text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-semibold text-[#7388a5] hover:underline">
              Create student account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
