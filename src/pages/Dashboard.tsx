import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Heart,
  Award,
  Play,
  CheckCircle2,
  Clock,
  User,
  ShoppingBag,
  Sparkles,
  ExternalLink,
  ChevronRight,
  X,
  FileText,
  Volume2,
  Maximize2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { courses } from '../data/courses';
import { Course } from '../types';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') || 'courses';
  const [activePlayingCourse, setActivePlayingCourse] = useState<Course | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['p-101', 'p-102']);

  const enrolledCourseIds = user?.enrolledCourses?.map((e) => e.courseId) ?? [];
  const enrolledCourseDetails = courses.filter((c) => enrolledCourseIds.includes(c.id));
  const enrolledList = enrolledCourseDetails.length > 0 ? enrolledCourseDetails : [courses[0], courses[1]];

  const handleTabChange = (tabName: string) => {
    setSearchParams({ tab: tabName });
  };

  const toggleLessonComplete = (lessonId: string) => {
    if (completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds(completedLessonIds.filter((id) => id !== lessonId));
    } else {
      setCompletedLessonIds([...completedLessonIds, lessonId]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-28 pb-24">
      {/* Top Banner with Student Profile Greeting */}
      <div className="border-b border-[#1d212e] bg-[#0e1017] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={user?.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0e1017] flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-zinc-950" />
                </span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-amber-400">
                  Magical Keys Raghu Student Campus
                </span>
                <h1 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
                  Welcome back, {user?.name || 'Musician'}
                </h1>
                <p className="text-xs text-zinc-400">{user?.email}</p>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-[#141622] border border-[#262c3f] text-center">
                <span className="text-base font-bold text-amber-400 block">
                  {enrolledList.length}
                </span>
                <span className="text-[10px] text-zinc-400 uppercase font-medium">Courses</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#141622] border border-[#262c3f] text-center">
                <span className="text-base font-bold text-emerald-400 block">
                  18.5 hrs
                </span>
                <span className="text-[10px] text-zinc-400 uppercase font-medium">Practice</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#141622] border border-[#262c3f] text-center">
                <span className="text-base font-bold text-sky-400 block">
                  1
                </span>
                <span className="text-[10px] text-zinc-400 uppercase font-medium">Certificates</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-[#1d212d] overflow-x-auto">
            <button
              onClick={() => handleTabChange('courses')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'courses'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>My Enrolled Masterclasses</span>
            </button>

            <button
              onClick={() => handleTabChange('wishlist')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'wishlist'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={() => handleTabChange('certificates')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'certificates'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certificates & Capstones</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* TAB 1: MY COURSES */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-xl text-white font-normal">
                Enrolled Masterclasses ({enrolledList.length})
              </h2>
              <Link
                to="/courses"
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
              >
                + Browse More Courses
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledList.map((course, idx) => {
                const progress = idx === 0 ? 45 : 15;
                return (
                  <div
                    key={course.id}
                    className="p-5 rounded-3xl bg-[#12141c] border border-[#212634] space-y-4 shadow-xl flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-amber-400 font-mono">
                          {course.category}
                        </span>
                      </div>

                      <h3 className="font-editorial text-lg text-white font-normal line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-1">
                        Instructor: {course.instructor.name}
                      </p>

                      {/* Progress bar */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] text-zinc-400">
                          <span>Progress</span>
                          <span className="font-semibold text-amber-400">{progress}% Complete</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActivePlayingCourse(course)}
                      className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-zinc-950" />
                      <span>Continue Learning</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h2 className="font-editorial text-xl text-white font-normal">
              Your Saved Items ({wishlist.length})
            </h2>

            {wishlist.length === 0 ? (
              <div className="p-16 rounded-2xl bg-[#12141c] border border-[#212634] text-center space-y-3 max-w-md mx-auto">
                <Heart className="w-10 h-10 text-zinc-600 mx-auto" />
                <h3 className="text-base font-semibold text-white">Your wishlist is empty</h3>
                <p className="text-xs text-zinc-400">
                  Explore our courses and digital store and tap the heart icon to save items for later.
                </p>
                <Link
                  to="/courses"
                  className="inline-block px-4 py-2 bg-amber-500 text-zinc-950 font-semibold text-xs rounded-xl"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#12141c] border border-[#212634] flex gap-4 items-center justify-between"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover border border-zinc-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] uppercase text-amber-400 block font-medium">
                        {item.category}
                      </span>
                      <span className="text-xs font-bold text-white block mt-1">
                        ${item.price}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link
                        to={item.type === 'course' ? `/courses/${item.id}` : `/store/${item.id}`}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 text-zinc-950 font-semibold text-[11px] text-center"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-[10px] text-zinc-500 hover:text-rose-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="font-editorial text-xl text-white font-normal">
              Accredited Masterclass Certificates
            </h2>

            <div className="p-6 rounded-3xl bg-[#12141c] border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    Verified Credential
                  </span>
                  <h3 className="font-editorial text-lg text-white">
                    Foundations of Modern Piano & Harmonic Voicings
                  </h3>
                  <p className="text-xs text-zinc-400">Awarded to {user?.name} · Issued Feb 2026</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1d212d] flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono">Verification ID: CAD-CERT-88192</span>
                <button
                  onClick={() => alert('Certificate downloaded as high-resolution PDF!')}
                  className="px-3 py-1.5 bg-[#171a25] hover:bg-zinc-800 text-amber-400 border border-amber-500/30 rounded-xl font-medium cursor-pointer"
                >
                  Download Certificate PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FULL-FEATURED IN-APP STUDENT VIDEO LEARNING PLAYER MODAL */}
      {activePlayingCourse && (
        <div
          id="student-player-modal"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-6"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#11131a] rounded-t-2xl border border-b-0 border-[#242938]">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
                {activePlayingCourse.title}
              </h3>
            </div>
            <button
              onClick={() => setActivePlayingCourse(null)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Player + Curriculum Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 bg-[#0e1017] border border-[#242938] rounded-b-2xl overflow-hidden">
            {/* Player Canvas (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col bg-black">
              <div className="relative flex-1 min-h-[300px] flex items-center justify-center overflow-hidden">
                <img
                  src={activePlayingCourse.thumbnail}
                  alt="Lesson view"
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shadow-2xl mb-3 cursor-pointer hover:scale-105 transition-transform">
                    <Play className="w-8 h-8 ml-1 fill-zinc-950" />
                  </div>
                  <h4 className="font-editorial text-xl sm:text-2xl text-white drop-shadow">
                    Lesson {activeLessonIndex + 1}: Hands Coordination & Key Synchronization
                  </h4>
                  <p className="text-xs text-zinc-300 drop-shadow">
                    Overhead Synthesia camera + Sheet music overlay
                  </p>
                </div>
              </div>

              {/* Lesson Controls */}
              <div className="p-4 bg-[#12141c] border-t border-[#202534] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLessonComplete(`lesson-${activeLessonIndex}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-semibold cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark Lesson Complete</span>
                  </button>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <span className="font-mono">1080p 60fps</span>
                  <span>Playback Speed: 1.0x</span>
                </div>
              </div>
            </div>

            {/* Curriculum Checklist Sidebar (4 Cols) */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#242938] bg-[#11131a] flex flex-col overflow-y-auto max-h-[600px]">
              <div className="p-4 border-b border-[#202534]">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-zinc-400">
                  Course Modules & Lessons
                </h4>
              </div>

              <div className="divide-y divide-[#1e2230] p-2 space-y-1">
                {activePlayingCourse.curriculum.flatMap((m) => m.lessons).map((lesson, idx) => {
                  const isCurrent = activeLessonIndex === idx;
                  const isComplete = completedLessonIds.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonIndex(idx)}
                      className={`w-full p-3 rounded-xl text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${isCurrent
                          ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                          : 'hover:bg-zinc-800/50 text-zinc-300'
                        }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isComplete ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <span className="text-[11px] text-zinc-500 font-mono shrink-0">
                        {lesson.duration}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
