import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Music,
  ArrowRight,
  Play,
  CheckCircle2,
  Sparkles,
  Award,
  BookOpen,
  Headphones,
  Compass,
  Sliders,
  Flame,
  Star,
  Users
} from 'lucide-react';
import { courses } from '../data/courses';
import { blogs } from '../data/blogs';
import { instructors } from '../data/instructors';
import { CourseCard } from '../components/CourseCard';
import { BlogCard } from '../components/BlogCard';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { PreviewVideoModal } from '../components/PreviewVideoModal';
import { Course } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPreviewCourse, setSelectedPreviewCourse] = useState<Course | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredCourses = courses.slice(0, 6);
  const latestBlogs = blogs.slice(0, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 3500);
    }
  };

  const songCategories = [
    {
      title: 'Indian Melodies',
      genre: 'Bollywood & Classical Raags',
      count: '18 Songs & Tutorials',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      link: '/courses?category=Bollywood%20%26%20Indian'
    },
    {
      title: 'Modern Piano Covers',
      genre: 'Adele, Coldplay, Ludovico Einaudi',
      count: '24 Arrangements',
      image: 'https://images.unsplash.com/photo-1520523839898-507127053e14?auto=format&fit=crop&w=600&q=80',
      link: '/courses/learn-piano-through-songs'
    },
    {
      title: 'Fingerstyle Acoustic',
      genre: 'Folk, Ballads & Percussive Groove',
      count: '14 Song Packs',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80',
      link: '/store?category=Guitar%20Tutorials'
    },
    {
      title: 'High-Energy Bollywood',
      genre: 'Jalsa, Chuttamalle, Chartbusters',
      count: '20+ Digital Packs',
      image: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?auto=format&fit=crop&w=600&q=80',
      link: '/store'
    },
    {
      title: 'Western Ballads',
      genre: 'Pop, Soul & Film Themes',
      count: '32 Stems & Sheets',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      link: '/courses/piano-fundamentals'
    },
    {
      title: 'Beginner First Songs',
      genre: 'Zero-Frustration 3-Chord Pieces',
      count: '15 Guided Lessons',
      image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
      link: '/courses?level=Beginner'
    }
  ];

  const whyFeatures = [
    {
      title: 'Learn Through Songs',
      desc: 'No robotic exercises without musical context. We reverse-engineer the timeless songs you love so every practice session produces music.',
      icon: Music,
      badge: 'Song-First Pedagogy'
    },
    {
      title: 'Structured Step-by-Step Paths',
      desc: 'Every milestone connects naturally to the next. Avoid random YouTube rabbit holes with deliberate, progressive curricula.',
      icon: Compass,
      badge: 'Proven Roadmap'
    },
    {
      title: 'Designed for Busy Adults',
      desc: '15-to-20 minute focused lessons designed to deliver noticeable muscle memory breakthroughs without demanding 3 hours a day.',
      icon: Headphones,
      badge: 'Time-Efficient'
    },
    {
      title: 'Learn at Your Own Pace',
      desc: 'Lifetime access with multi-angle 4K videos, downloadable sheet music, synchronized overhead keys, and loopable practice audio.',
      icon: Sliders,
      badge: 'Lifetime Access'
    },
    {
      title: 'Practical Techniques & Voicing',
      desc: 'Master drop-2 voicings, grace notes, smooth voice-leading, and left-hand independence used by professional session artists.',
      icon: Sparkles,
      badge: 'Session-Grade'
    },
    {
      title: 'Personal Instructor Mentorship',
      desc: 'Get feedback on your playing from concert pianists and session arrangers. Ask questions directly inside course discussion modules.',
      icon: Award,
      badge: '1-on-1 Guidance'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb]">
      {/* 4. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden border-b border-[#1b1e2a]" id="hero-section">
        {/* Subtle Warm Amber Glow Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-amber-800/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-medium tracking-wide">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Modern Music Academy & Digital Store</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1]">
                Learn Music. <br className="hidden sm:block" />
                <span className="italic font-serif text-amber-300/95">Play What You Love.</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Master piano and guitar through practical lessons, structured courses, and song-based learning designed for real musicians.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/courses"
                  id="hero-explore-courses-cta"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm shadow-xl shadow-amber-500/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setSelectedPreviewCourse(courses[0])}
                  id="hero-free-preview-cta"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#171a25] hover:bg-[#202534] text-zinc-200 hover:text-white border border-[#2d3345] font-medium text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 ml-0.5 fill-amber-400" />
                  </div>
                  <span>Watch Free Lesson</span>
                </button>
              </div>

              {/* Quick trust pill */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>30-Day Money-Back</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Lifetime Access</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>4K Multi-Angle Lessons</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Studio Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#262c3e] shadow-2xl bg-[#12141c]">
                <img
                  src="https://images.unsplash.com/photo-1710282965041-8296adaf2403?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Piano keys in warm studio light"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Floating mini badge 1 */}
                <div className="absolute top-4 left-4 p-3 rounded-2xl bg-[#0e1017]/90 backdrop-blur-md border border-[#2b3040] shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Featured Masterclass</span>
                    <span className="text-xs font-semibold text-white">Piano Fundamentals</span>
                  </div>
                </div>

                {/* Floating mini badge 2 (Active students) */}
                <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-[#0e1017]/90 backdrop-blur-md border border-[#2b3040] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-2">
                      <img
                        className="w-7 h-7 rounded-full border border-zinc-700 object-cover"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                        alt="Student"
                      />
                      <img
                        className="w-7 h-7 rounded-full border border-zinc-700 object-cover"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                        alt="Student"
                      />
                      <img
                        className="w-7 h-7 rounded-full border border-zinc-700 object-cover"
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                        alt="Student"
                      />
                    </div>
                    <span className="text-xs text-zinc-300 font-medium">1,240+ Active Learners</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.96/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUST / STATISTICS SECTION */}
      <section className="py-12 bg-[#0e1017] border-b border-[#1b1e2a]" id="trust-stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="p-5 rounded-2xl bg-[#12141d] border border-[#212634] text-center space-y-1">
              <span className="font-editorial text-3xl sm:text-4xl text-amber-400 font-normal block">
                1,000+
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 font-medium">
                Students Reached
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#12141d] border border-[#212634] text-center space-y-1">
              <span className="font-editorial text-3xl sm:text-4xl text-amber-400 font-normal block">
                50+
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 font-medium">
                Songs & Tutorials
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#12141d] border border-[#212634] text-center space-y-1">
              <span className="font-editorial text-3xl sm:text-4xl text-amber-400 font-normal block">
                100+
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 font-medium">
                Lessons Created
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#12141d] border border-[#212634] text-center space-y-1">
              <span className="font-editorial text-3xl sm:text-4xl text-amber-400 font-normal block flex items-center justify-center gap-1">
                4.9<span className="text-lg text-amber-400/80">/5</span>
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 font-medium">
                Student Rating
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED COURSES SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-courses-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90 block mb-2">
              Structured Masterclasses
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
              Learn at Your Own Pace
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-lg">
              Explore step-by-step masterclasses designed to build natural muscle memory, harmonic instinct, and stage confidence.
            </p>
          </div>

          <Link
            to="/courses"
            id="view-all-courses-link"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group self-start md:self-auto"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onPreviewClick={(c) => setSelectedPreviewCourse(c)}
            />
          ))}
        </div>
      </section>

      {/* 7. WHY LEARN WITH US */}
      <section className="py-20 bg-[#0d0f15] border-y border-[#1c1f2b]" id="why-learn-with-us-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90">
              The Magical Keys Raghu Method
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
              More Than Just Lessons
            </h2>
            <p className="text-sm text-zinc-400">
              Traditional music pedagogy prioritizes dry rote memorization. Our approach starts with the songs you adore and connects theory intuitively to your hands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-[#12141d] border border-[#212634] hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-zinc-800/80 text-zinc-300">
                        {feat.badge}
                      </span>
                    </div>
                    <h3 className="font-editorial text-xl text-white font-normal">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. SONG-BASED LEARNING SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="song-based-learning-section">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90">
            Repertoire & Song Library
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
            Learn the Songs You Actually Love
          </h2>
          <p className="text-sm text-zinc-400">
            From vintage Bollywood and soulful raags to modern acoustic ballads and pop anthems. Click any style to dive right into its dedicated curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {songCategories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] border border-[#232736] hover:border-amber-500/50 shadow-lg transition-all duration-300 hover:-translate-y-1 block"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-4 inset-x-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400 block mb-1">
                    {cat.count}
                  </span>
                  <h3 className="font-editorial text-xl text-white font-normal group-hover:text-amber-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-1">{cat.genre}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. INSTRUCTOR SPOTLIGHT SECTION */}
      <section className="py-20 bg-[#0d0f15] border-y border-[#1c1f2b]" id="instructors-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90 block mb-2">
                Concert & Session Artists
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
                Meet Your Instructors
              </h2>
              <p className="text-sm text-zinc-400 mt-2 max-w-lg">
                Learn directly from working arrangers, concert pianists, and fingerstyle innovators who demystify professional technique.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group"
            >
              <span>Our Pedagogy & Faculty</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((inst) => (
              <div
                key={inst.id}
                className="rounded-2xl bg-[#12141c] border border-[#212634] p-6 space-y-4 hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-[#2a2f3f]">
                    <img
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded bg-black/80 text-amber-300 border border-zinc-700/50 backdrop-blur-xs">
                      {inst.instrument}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-editorial text-xl text-white font-normal">
                      {inst.name}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-medium mb-2">
                      {inst.role}
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {inst.bio}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1e222f] flex items-center justify-between text-xs text-zinc-400">
                  <span>{inst.experience}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{inst.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS SLIDER SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="testimonials-section">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90">
            Student Transformations
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
            Real Musicians. Real Progress.
          </h2>
          <p className="text-sm text-zinc-400">
            From absolute adult beginners to aspiring producers, hear how our students unlocked real musical expression.
          </p>
        </div>

        <TestimonialSlider />
      </section>

      {/* 11. BLOG PREVIEW SECTION */}
      <section className="py-20 bg-[#0d0f15] border-y border-[#1c1f2b]" id="blog-preview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90 block mb-2">
                The Music Journal
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
                Lessons & Practice Tips
              </h2>
              <p className="text-sm text-zinc-400 mt-2 max-w-lg">
                Technique breakdowns, practice hacks, chord progression cheat sheets, and ear-training blueprints.
              </p>
            </div>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestBlogs.map((blog) => (
              <BlogCard key={blog.id} post={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* 12. NEWSLETTER / LEAD CAPTURE SECTION */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" id="newsletter-lead-section">
        <div className="rounded-3xl bg-gradient-to-br from-[#171a25] to-[#10121a] border border-[#2b3142] p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
              Get Better at Music, One Lesson at a Time.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Join our newsletter for piano tips, guitar lessons, new courses, song tutorials, and exclusive free practice stems.
            </p>
          </div>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-4 py-2.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you for subscribing! Your free beginner chord sheet is on its way.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#0d0e14] border border-[#2b3040] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl shadow-lg shadow-amber-500/15 transition-all cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-zinc-500">
            No spam. Unsubscribe anytime with a single click.
          </p>
        </div>
      </section>

      {/* 13. FINAL CTA */}
      <section className="py-24 bg-[#08090c] border-t border-[#1a1d26] text-center relative overflow-hidden" id="final-cta-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90">
            Begin Your Musical Journey
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-white font-normal tracking-tight">
            Your Next Song Starts Here.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Choose a course or song tutorial, sit at your instrument, and experience the thrill of playing real music from your very first session.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/courses"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm shadow-xl shadow-amber-500/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/store"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#151822] hover:bg-[#1f2332] text-zinc-200 border border-[#2b3040] font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Browse Digital Store</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Free Sample Lesson Preview Modal */}
      <PreviewVideoModal
        course={selectedPreviewCourse}
        isOpen={!!selectedPreviewCourse}
        onClose={() => setSelectedPreviewCourse(null)}
      />
    </div>
  );
};
