import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Music, ArrowRight, CheckCircle2, Youtube, Instagram, Facebook } from 'lucide-react';
const magicalKeysLogo = '/images/magicalKeysLogo.png';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#f8fafc] border-t border-slate-200 text-slate-500 text-sm" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-200">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={magicalKeysLogo} alt="logo" className="w-10 h-10 object-contain rounded-lg" />
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-[#637894]">
                  Signal House
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-medium leading-none">
                  Magical Keys Raghu
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              Premium modern music academy and digital sound repository. Mastering piano, guitar, Indian melodies, and contemporary repertoire through structured, song-first pedagogy.
            </p>

            {/* Newsletter Mini */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2">
                Join our private newsletter
              </span>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome! Free piano voicing handbook sent to your email.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email for free tabs & drills"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#7388a5] hover:bg-[#5f7491] text-white font-medium text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Learn Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">
              Learn
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/courses" className="hover:text-slate-900 transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Piano" className="hover:text-slate-900 transition-colors">
                  Piano Lessons
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Guitar" className="hover:text-slate-900 transition-colors">
                  Guitar Lessons
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Bollywood%20%26%20Indian" className="hover:text-slate-900 transition-colors">
                  Indian & Bollywood Melodies
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-slate-900 transition-colors">
                  Song Tutorials & Stems
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/blogs" className="hover:text-slate-900 transition-colors">
                  Music Journal & Guides
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-slate-900 transition-colors">
                  Digital Music Store
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-slate-900 transition-colors">
                  Our Faculty & Method
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-slate-900 transition-colors">
                  Contact & Mentorship
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-slate-900 transition-colors">
                  Student Campus Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/contact" className="hover:text-slate-900 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-slate-900 transition-colors">
                  30-Day Refund Guarantee
                </Link>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">Terms of Service</span>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">Privacy Policy</span>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
                Connect
              </h5>
              <div className="flex items-center gap-3">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-300 transition-colors shadow-2xs"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-pink-500 hover:border-pink-300 transition-colors shadow-2xs"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-500 hover:border-blue-300 transition-colors shadow-2xs"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Signal House / Magical Keys Raghu. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Crafted for true instrumentalists</span>
            <span>·</span>
            <span>Song-First Method</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
