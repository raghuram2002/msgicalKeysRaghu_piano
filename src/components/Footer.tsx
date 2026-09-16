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
    <footer className="bg-[#08090c] border-t border-[#1c1f2a] text-zinc-400 text-sm" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#1c1f2a]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={magicalKeysLogo} alt="logo" className="w-15 h-15" />
              <div className="flex flex-col ">
                <span className="font-editorial text-xl tracking-wider text-white">
                  MAGICAL KEYS
                </span>
                <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-medium leading-none">
                  Raghu
                </span>
              </div>
            </Link>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Premium modern music academy and digital sound repository. Mastering piano, guitar, Indian melodies, and contemporary repertoire through structured, song-first pedagogy.
            </p>

            {/* Newsletter Mini */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-2">
                Join our private newsletter
              </span>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-xl">
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
                    className="flex-1 px-3.5 py-2 bg-[#12141a] border border-[#232734] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/60"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
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
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-200 mb-4">
              Learn
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/courses" className="hover:text-amber-400 transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Piano" className="hover:text-amber-400 transition-colors">
                  Piano Lessons
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Guitar" className="hover:text-amber-400 transition-colors">
                  Guitar Lessons
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Bollywood%20%26%20Indian" className="hover:text-amber-400 transition-colors">
                  Indian & Bollywood Melodies
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-amber-400 transition-colors">
                  Song Tutorials & Stems
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/blogs" className="hover:text-amber-400 transition-colors">
                  Music Journal & Guides
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-amber-400 transition-colors">
                  Digital Music Store
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  Our Faculty & Method
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">
                  Contact & Mentorship
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-amber-400 transition-colors">
                  Student Campus Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-200 mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  30-Day Refund Guarantee
                </Link>
              </li>
              <li>
                <span className="text-zinc-500 cursor-not-allowed">Terms of Service</span>
              </li>
              <li>
                <span className="text-zinc-500 cursor-not-allowed">Privacy Policy</span>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                Connect
              </h5>
              <div className="flex items-center gap-3">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#14161f] border border-[#252937] flex items-center justify-center text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#14161f] border border-[#252937] flex items-center justify-center text-zinc-400 hover:text-pink-400 hover:border-pink-500/30 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#14161f] border border-[#252937] flex items-center justify-center text-zinc-400 hover:text-blue-400 hover:border-blue-500/30 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Magical Keys Raghu. All rights reserved.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Crafted for true instrumentalists</span>
            <span>·</span>
            <span>Song-First Method</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
