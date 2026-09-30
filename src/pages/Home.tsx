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
const grandPiano = '/images/grandPiano.png';

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
    <div className="min-h-screen bg-white text-slate-800">
      {/* 4. HERO SECTION - MATCHING SCREENSHOT EXACTLY */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-28 overflow-hidden bg-white" id="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[520px] lg:min-h-[620px]">
            {/* Left Column: Giant "Piano" typography + Subtext + CTAs */}
            <div className="lg:col-span-6 z-20 flex flex-col justify-center text-left space-y-6 pt-4 lg:pt-0">
              {/* Giant "Piano" display title identical to screenshot */}
              <div className="relative">
                <h1 className="text-[84px] sm:text-[120px] md:text-[145px] lg:text-[150px] xl:text-[185px] font-bold tracking-tight text-[#8598b0] leading-[0.88] select-none">
                  Piano
                </h1>
              </div>

              {/* Subtext matching screenshot */}
              <div className="space-y-4 max-w-lg">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                </p>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Master piano and guitar through practical lessons, structured courses, and song-based learning designed for real musicians.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/courses"
                  id="hero-explore-courses-cta"
                  className="px-7 py-3.5 rounded-xl bg-[#7388a5] hover:bg-[#5f7491] text-white font-medium text-sm shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setSelectedPreviewCourse(courses[0])}
                  id="hero-free-preview-cta"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-2xs"
                >
                  <div className="w-5 h-5 rounded-full bg-[#8598b0]/20 text-[#546b89] flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 ml-0.5 fill-[#546b89]" />
                  </div>
                  <span>Watch Free Lesson</span>
                </button>
              </div>

              {/* Quick trust pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>30-Day Money-Back</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Lifetime Access</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>4K Multi-Angle Lessons</span>
                </div>
              </div>
            </div>

            {/* Right Column: Slate Blue Circle + Glossy Concert Grand Piano */}
            <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end min-h-[380px] sm:min-h-[460px] lg:min-h-[580px]">
              {/* Slate Blue Solid Circle from the Screenshot */}
              <div
                className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] lg:w-[460px] lg:h-[460px] rounded-full bg-[#8598b0] z-0 pointer-events-none transition-transform duration-700 hover:scale-105"
                style={{
                  boxShadow: '0 20px 40px -15px rgba(133, 152, 176, 0.4)'
                }}
              />

              {/* Concert Grand Piano positioned in front */}
              <div className="relative z-10 w-full max-w-[560px] sm:max-w-[620px] lg:max-w-[680px] -ml-4 sm:-ml-12 lg:-ml-16">
                <img
                  src={grandPiano}
                  alt="Glossy Concert Grand Piano"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.tried) {
                      target.dataset.tried = '1';
                      target.src = '/images/piano.png';
                    }
                  }}
                  className="w-full h-auto object-contain select-none mix-blend-multiply drop-shadow-2xl transform lg:-rotate-1 hover:scale-102 transition-transform duration-500"
                />

                {/* Subtle floating badge */}
                {/* <div className="absolute bottom-4 left-6 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg hidden sm:flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#eef3f9] text-[#475e7d] flex items-center justify-center font-bold">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Concert Quality</span>
                    <span className="text-xs font-semibold text-slate-900">Grand Piano & Indian Melodies</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUST / STATISTICS SECTION */}
      <section className="py-12 bg-slate-50 border-y border-slate-200" id="trust-stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-2xs">
              <span className="text-3xl sm:text-4xl text-[#475e7d] font-bold block">
                1,000+
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
                Students Reached
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-2xs">
              <span className="text-3xl sm:text-4xl text-[#475e7d] font-bold block">
                50+
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
                Songs & Tutorials
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-2xs">
              <span className="text-3xl sm:text-4xl text-[#475e7d] font-bold block">
                100+
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
                Lessons Created
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-2xs">
              <span className="text-3xl sm:text-4xl text-[#475e7d] font-bold block flex items-center justify-center gap-1">
                4.9<span className="text-lg text-slate-400">/5</span>
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
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
            <span className="text-xs uppercase tracking-widest font-semibold text-[#7388a5] block mb-2">
              Structured Masterclasses
            </span>
            <h2 className="text-3xl sm:text-4xl text-slate-900 font-bold">
              Learn at Your Own Pace
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-lg">
              Explore step-by-step masterclasses designed to build natural muscle memory, harmonic instinct, and stage confidence.
            </p>
          </div>

          <Link
            to="/courses"
            id="view-all-courses-link"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#7388a5] hover:text-slate-900 transition-colors group self-start md:self-auto"
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
      <section className="py-20 bg-slate-50 border-y border-slate-200" id="why-learn-with-us-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#7388a5]">
              The Signal House Method
            </span>
            <h2 className="text-3xl sm:text-4xl text-slate-900 font-bold">
              More Than Just Lessons
            </h2>
            <p className="text-sm text-slate-600">
              Traditional music pedagogy prioritizes dry rote memorization. Our approach starts with the songs you adore and connects theory intuitively to your hands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#7388a5] shadow-xs transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#eef3f9] text-[#475e7d] flex items-center justify-center border border-[#cbd8e8]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                        {feat.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
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
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7388a5]">
            Repertoire & Song Library
          </span>
          <h2 className="text-3xl sm:text-4xl text-slate-900 font-bold">
            Learn the Songs You Actually Love
          </h2>
          <p className="text-sm text-slate-600">
            From vintage Bollywood and soulful raags to modern acoustic ballads and pop anthems. Click any style to dive right into its dedicated curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {songCategories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] border border-slate-200 hover:border-[#7388a5] shadow-md transition-all duration-300 hover:-translate-y-1 block"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute bottom-4 inset-x-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-200 block mb-1">
                    {cat.count}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-slate-200 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1">{cat.genre}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. INSTRUCTOR SPOTLIGHT SECTION */}
      <section className="py-20 bg-slate-50 border-y border-slate-200" id="instructors-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#7388a5] block mb-2">
                Concert & Session Artists
              </span>
              <h2 className="text-3xl sm:text-4xl text-slate-900 font-bold">
                Meet Your Instructors
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-lg">
                Learn directly from working arrangers, concert pianists, and fingerstyle innovators who demystify professional technique.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7388a5] hover:text-slate-900 transition-colors group"
            >
              <span>Our Pedagogy & Faculty</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((inst) => (
              <div
                key={inst.id}
                className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 hover:border-[#7388a5] shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-200">
                    <img
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded bg-white/95 text-[#475e7d] border border-slate-200 shadow-2xs">
                      {inst.instrument}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {inst.name}
                    </h3>
                    <p className="text-xs text-[#7388a5] font-medium mb-2">
                      {inst.role}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {inst.bio}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{inst.experience}</span>
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
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
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7388a5]">
            Student Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl text-slate-900 font-bold">
            Real Musicians. Real Progress.
          </h2>
          <p className="text-sm text-slate-600">
            From absolute adult beginners to aspiring producers, hear how our students unlocked real musical expression.
          </p>
        </div>

        <TestimonialSlider />
      </section>

      {/* 11. BLOG PREVIEW SECTION */}
      <section className="py-20 bg-slate-50 border-y border-slate-200" id="blog-preview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#7388a5] block mb-2">
                The Music Journal
              </span>
              <h2 className="text-3xl sm:text-4xl text-slate-900 font-bold">
                Lessons & Practice Tips
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-lg">
                Technique breakdowns, practice hacks, chord progression cheat sheets, and ear-training blueprints.
              </p>
            </div>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7388a5] hover:text-slate-900 transition-colors group"
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
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-[#eef3f9] text-[#475e7d] border border-[#cbd8e8] flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl text-slate-900 font-bold">
              Get Better at Music, One Lesson at a Time.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Join our newsletter for piano tips, guitar lessons, new courses, song tutorials, and exclusive free practice stems.
            </p>
          </div>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl">
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
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#7388a5] hover:bg-[#5f7491] text-white font-medium text-xs rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-400">
            No spam. Unsubscribe anytime with a single click.
          </p>
        </div>
      </section>

      {/* 13. FINAL CTA */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 text-center relative overflow-hidden" id="final-cta-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7388a5]">
            Begin Your Musical Journey
          </span>
          <h2 className="text-3xl sm:text-5xl text-slate-900 font-bold tracking-tight">
            Your Next Song Starts Here.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            Choose a course or song tutorial, sit at your instrument, and experience the thrill of playing real music from your very first session.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/courses"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#7388a5] hover:bg-[#5f7491] text-white font-medium text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/store"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
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
