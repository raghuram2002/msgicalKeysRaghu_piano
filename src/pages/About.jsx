import React from 'react';
import { Link } from 'react-router-dom';
import {
  Music,
  Award,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Compass,
  Star
} from 'lucide-react';
import { instructors } from '../data/instructors';

export const About = () => {
  const values = [
    {
      title: 'Song-First Pedagogy',
      desc: 'Music is an expressive language, not an abstract calculation. We teach harmony, rhythm, and touch through the songs that move your soul.',
      icon: Music
    },
    {
      title: 'Session-Grade Nuance',
      desc: 'We don’t settle for mechanical chord bashers. We reveal the micro-dynamics, subtle pedal sweeps, and voicing secrets used in real recording studios.',
      icon: Sparkles
    },
    {
      title: 'Lifelong Guidance',
      desc: 'We view learning an instrument as a relationship, not a transactional checkout. Our instructors answer your questions directly.',
      icon: Compass
    },
    {
      title: 'Zero Risk Learning',
      desc: 'Every masterclass is protected by our transparent 30-day refund policy. If it doesn’t elevate your playing, you don’t pay.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 pt-28 pb-24">
      {/* Hero Header */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#637894] inline-block">
            Our Purpose & Heritage
          </span>
          <h1 className="font-bold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Designed for the Love of Music.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Signal House was founded on a simple truth: anyone can learn to play real, breathtaking music when the curriculum connects immediately to their emotions.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#637894]">
              The Origin Story
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Why We Rejected the Outdated Classical Method
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                For generations, instrumental education was locked behind robotic Hanon drills, stiff recitals, and years of dry scale repetitions before a student was ever allowed to touch a song they actually loved.
              </p>
              <p>
                The consequence? More than 80% of aspiring adult pianists and guitarists quit within their first six months out of pure creative exhaustion.
              </p>
              <p>
                Signal House was created by concert pianists and session arrangers who asked: <em>What if we taught music the way real composers and studio musicians play it?</em> By reverse-engineering popular melodies, identifying recurring chord archetypes, and teaching the emotional mechanics behind every note.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
                alt="Musician playing in recording studio"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
                <p className="font-serif italic text-xs sm:text-sm text-slate-700">
                  "The piano ceased to be an intimidating piece of furniture and became my emotional outlet within four weeks."
                </p>
                <span className="text-[11px] text-[#7388a5] font-semibold block mt-1">
                  — Priya Sharma, Mumbai (Student Cohort 2025)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#637894]">
              Our Core Principles
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              The Four Pillars of Signal House
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#eef3f9] text-[#7388a5] flex items-center justify-center border border-[#cbd8e8]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {v.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#637894]">
            Teaching Artists
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Meet the Signal House Faculty
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Each instructor at Signal House is an active performer, composer, or arranger dedicated to clear, empathetic pedagogy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructors.map((inst) => (
            <div
              key={inst.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border border-slate-200">
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-bold text-xl text-slate-900">
                  {inst.name}
                </h3>
                <p className="text-xs text-[#7388a5] font-semibold mb-2">
                  {inst.role}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {inst.bio}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{inst.experience}</span>
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{inst.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 30-Day Guarantee Callout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" id="refunds">
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#eef3f9] text-[#7388a5] flex items-center justify-center border border-[#cbd8e8] shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-2xl text-slate-900">
              Our 30-Day Happiness Guarantee
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We stand completely behind every course we produce. If you follow the first module and don't feel a marked transformation in your playing confidence, simply email us within 30 days for a prompt, 100% refund. No questions asked.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
