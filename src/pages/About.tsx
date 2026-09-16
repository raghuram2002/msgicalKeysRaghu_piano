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

export const About: React.FC = () => {
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
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-28 pb-24">
      {/* Hero Header */}
      <section className="border-b border-[#1d212e] bg-[#0e1017] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90 inline-block">
            Our Purpose & Heritage
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl text-white font-normal leading-tight">
            Designed for the Love of Music.
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Magical Keys Raghu was founded on a simple truth: anyone can learn to play real, breathtaking music when the curriculum connects immediately to their emotions.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-400">
              The Origin Story
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal leading-tight">
              Why We Rejected the Outdated Classical Method
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>
                For generations, instrumental education was locked behind robotic Hanon drills, stiff recitals, and years of dry scale repetitions before a student was ever allowed to touch a song they actually loved.
              </p>
              <p>
                The consequence? More than 80% of aspiring adult pianists and guitarists quit within their first six months out of pure creative exhaustion.
              </p>
              <p>
                Magical Keys Raghu was created by concert pianists and session arrangers who asked: <em>What if we taught music the way real composers and studio musicians play it?</em> By reverse-engineering popular melodies, identifying recurring chord archetypes, and teaching the emotional mechanics behind every note.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#252b3b] shadow-2xl bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
                alt="Musician playing in recording studio"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0d0e14]/90 backdrop-blur-md border border-[#242838]">
                <p className="font-serif italic text-xs sm:text-sm text-zinc-200">
                  "The piano ceased to be an intimidating piece of furniture and became my emotional outlet within four weeks."
                </p>
                <span className="text-[11px] text-amber-400 font-semibold block mt-1">
                  — Priya Sharma, Mumbai (Student Cohort 2025)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#0e1017] border-y border-[#1d212e] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90">
              Our Core Principles
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
              The Four Pillars of Magical Keys Raghu
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#12141c] border border-[#212634] space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-editorial text-lg text-white font-normal">
                    {v.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
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
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90">
            Teaching Artists
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
            Meet the Magical Keys Raghu Faculty
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Each instructor at Magical Keys Raghu is an active performer, composer, or arranger dedicated to clear, empathetic pedagogy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructors.map((inst) => (
            <div
              key={inst.id}
              className="p-6 rounded-3xl bg-[#12141c] border border-[#212634] space-y-4"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border border-zinc-800">
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-editorial text-xl text-white font-normal">
                  {inst.name}
                </h3>
                <p className="text-xs text-amber-400 font-semibold mb-2">
                  {inst.role}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                  {inst.bio}
                </p>
                <div className="pt-3 border-t border-[#1d212d] flex items-center justify-between text-xs text-zinc-500">
                  <span>{inst.experience}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
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
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#161a25] to-[#0f1118] border border-[#2a3142] flex flex-col sm:flex-row items-center gap-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-editorial text-2xl text-white font-normal">
              Our 30-Day Happiness Guarantee
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              We stand completely behind every course we produce. If you follow the first module and don't feel a marked transformation in your playing confidence, simply email us within 30 days for a prompt, 100% refund. No questions asked.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
