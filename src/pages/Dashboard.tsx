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
    <div className="min-h-screen bg-white text-slate-800 pt-28 pb-24">
      {/* Top Banner with Student Profile Greeting */}
      <div className="border-b border-slate-200 bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={user?.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#7388a5] shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#637894]">
                  Signal House Student Campus
                </span>
                <h1 className="font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                  Welcome back, {user?.name || 'Musician'}
                </h1>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
                <span className="text-base font-bold text-slate-900 block">
                  {enrolledList.length}
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-medium">Courses</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
                <span className="text-base font-bold text-emerald-700 block">
                  18.5 hrs
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-medium">Practice</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
                <span className="text-base font-bold text-[#7388a5] block">
                  1
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-medium">Certificates</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-slate-200 overflow-x-auto">
            <button
              onClick={() => handleTabChange('courses')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'courses'
                  ? 'bg-[#7388a5] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>My Enrolled Masterclasses</span>
            </button>

            <button
              onClick={() => handleTabChange('wishlist')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'wishlist'
                  ? 'bg-[#7388a5] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={() => handleTabChange('certificates')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'certificates'
                  ? 'bg-[#7388a5] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
              <h2 className="font-bold text-xl text-slate-900 tracking-tight">
                Enrolled Masterclasses ({enrolledList.length})
              </h2>
              <Link
                to="/courses"
                className="text-xs text-[#7388a5] hover:text-[#5f7491] font-semibold"
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
                    className="p-5 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-md bg-white/95 text-[10px] text-[#475e7d] border border-[#cbd8e8] font-semibold shadow-2xs">
                          {course.category}
                        </span>
                      </div>

                      <h3 className="font-bold text-lg text-slate-900 line-clamp-1 tracking-tight">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        Instructor: {course.instructor.name}
                      </p>

                      {/* Progress bar */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] text-slate-500">
                          <span>Progress</span>
                          <span className="font-semibold text-slate-900">{progress}% Complete</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#7388a5] rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActivePlayingCourse(course)}
                      className="w-full py-2.5 bg-[#7388a5] hover:bg-[#5f7491] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
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
            <h2 className="font-bold text-xl text-slate-900 tracking-tight">
              Your Saved Items ({wishlist.length})
            </h2>

            {wishlist.length === 0 ? (
              <div className="p-16 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 max-w-md mx-auto">
                <Heart className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-base font-semibold text-slate-900">Your wishlist is empty</h3>
                <p className="text-xs text-slate-500">
                  Explore our courses and digital store and tap the heart icon to save items for later.
                </p>
                <Link
                  to="/courses"
                  className="inline-block px-4 py-2 bg-[#7388a5] hover:bg-[#5f7491] text-white font-semibold text-xs rounded-xl"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 flex gap-4 items-center justify-between shadow-xs"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-slate-900 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] uppercase text-[#7388a5] block font-semibold">
                        {item.category}
                      </span>
                      <span className="text-xs font-bold text-slate-900 block mt-1">
                        ${item.price}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link
                        to={item.type === 'course' ? `/courses/${item.id}` : `/store/${item.id}`}
                        className="px-2.5 py-1 rounded-lg bg-[#7388a5] hover:bg-[#5f7491] text-white font-semibold text-[11px] text-center shadow-2xs"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-[10px] text-slate-400 hover:text-rose-600 cursor-pointer"
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
            <h2 className="font-bold text-xl text-slate-900 tracking-tight">
              Accredited Masterclass Certificates
            </h2>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#eef3f9] text-[#7388a5] flex items-center justify-center border border-[#cbd8e8]">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#637894]">
                    Verified Credential
                  </span>
                  <h3 className="font-bold text-lg text-slate-900">
                    Foundations of Modern Piano & Harmonic Voicings
                  </h3>
                  <p className="text-xs text-slate-500">Awarded to {user?.name} · Issued Feb 2026</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Verification ID: SIG-CERT-88192</span>
                <button
                  onClick={() => alert('Certificate downloaded as high-resolution PDF!')}
                  className="px-3.5 py-1.5 bg-[#7388a5] hover:bg-[#5f7491] text-white border border-[#5f7491] rounded-xl font-medium cursor-pointer shadow-xs"
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
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex flex-col p-2 sm:p-6"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white rounded-t-2xl border border-b-0 border-slate-200">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                {activePlayingCourse.title}
              </h3>
            </div>
            <button
              onClick={() => setActivePlayingCourse(null)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Player + Curriculum Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 bg-white border border-slate-200 rounded-b-2xl overflow-hidden shadow-2xl">
            {/* Player Canvas (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col bg-slate-950">
              <div className="relative flex-1 min-h-[300px] flex items-center justify-center overflow-hidden">
                <img
                  src={activePlayingCourse.thumbnail}
                  alt="Lesson view"
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[#7388a5] text-white flex items-center justify-center shadow-2xl mb-3 cursor-pointer hover:scale-105 transition-transform">
                    <Play className="w-8 h-8 ml-1 fill-white" />
                  </div>
                  <h4 className="font-bold text-xl sm:text-2xl text-white drop-shadow">
                    Lesson {activeLessonIndex + 1}: Hands Coordination & Key Synchronization
                  </h4>
                  <p className="text-xs text-slate-300 drop-shadow">
                    Overhead Synthesia camera + Sheet music overlay
                  </p>
                </div>
              </div>

              {/* Lesson Controls */}
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLessonComplete(`lesson-${activeLessonIndex}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark Lesson Complete</span>
                  </button>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="font-mono">1080p 60fps</span>
                  <span>Playback Speed: 1.0x</span>
                </div>
              </div>
            </div>

            {/* Curriculum Checklist Sidebar (4 Cols) */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50 flex flex-col overflow-y-auto max-h-[600px]">
              <div className="p-4 border-b border-slate-200">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  Course Modules & Lessons
                </h4>
              </div>

              <div className="divide-y divide-slate-100 p-2 space-y-1">
                {activePlayingCourse.curriculum.flatMap((m) => m.lessons).map((lesson, idx) => {
                  const isCurrent = activeLessonIndex === idx;
                  const isComplete = completedLessonIds.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonIndex(idx)}
                      className={`w-full p-3 rounded-xl text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${isCurrent
                          ? 'bg-[#eef3f9] border border-[#cbd8e8] text-[#475e7d] font-semibold'
                          : 'hover:bg-slate-100 text-slate-700'
                        }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isComplete ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono shrink-0">
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
