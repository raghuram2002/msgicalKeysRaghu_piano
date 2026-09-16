import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  BookOpen,
  Users,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Lock,
  Heart,
  Share2,
  ShieldCheck,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { courses } from '../data/courses';
import { faqs } from '../data/faqs';
import { Course } from '../types';
import { Rating } from '../components/Rating';
import { CourseCard } from '../components/CourseCard';
import { PreviewVideoModal } from '../components/PreviewVideoModal';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

export const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isEnrolled } = useAuth();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();

  const [course, setCourse] = useState<Course | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ 'mod-1': true });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const found = courses.find((c) => c.id === courseId || c.slug === courseId);
    if (found) {
      setCourse(found);
      addRecentlyViewed({
        id: found.id,
        type: 'course',
        title: found.title,
        category: found.category,
        price: found.price,
        thumbnail: found.thumbnail
      });
      // Expand first module by default
      if (found.curriculum.length > 0) {
        setExpandedModules({ [found.curriculum[0].id]: true });
      }
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-32 pb-24 flex items-center justify-center">
        <div className="text-center p-8 bg-[#12141c] border border-[#212634] rounded-2xl max-w-md">
          <h2 className="font-editorial text-2xl text-white mb-2">Course Not Found</h2>
          <p className="text-xs text-zinc-400 mb-6">
            The course you are looking for does not exist or may have been updated.
          </p>
          <Link
            to="/courses"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const wishlisted = isWishlisted(course.id);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleEnrollClick = () => {
    if (enrolled) {
      navigate('/dashboard?tab=courses');
      return;
    }
    if (!isAuthenticated) {
      navigate(`/login?redirect=/checkout?courseId=${course.id}`);
    } else {
      navigate(`/checkout?courseId=${course.id}`);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const recommendedCourses = courses.filter((c) => c.id !== course.id).slice(0, 3);

  const discountPercent = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-28 pb-24">
      {/* 16. COURSE HERO SECTION */}
      <section className="bg-[#0e1017] border-b border-[#1f2331] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-5">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {course.category}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-md bg-[#181a24] text-zinc-300 border border-[#2c3140]">
                  {course.level}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-md bg-[#181a24] text-zinc-300 border border-[#2c3140]">
                  {course.duration}
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                {course.subtitle}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-zinc-400">
                <Rating rating={course.rating} count={course.reviewsCount} size="md" />

                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-zinc-500" />
                  <span>{course.studentsCount.toLocaleString()} musicians enrolled</span>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-6 h-6 rounded-full object-cover border border-zinc-700"
                  />
                  <span>Taught by <strong className="text-zinc-200">{course.instructor.name}</strong></span>
                </div>
              </div>
            </div>

            {/* Right Card / Enrollment Box */}
            <div className="lg:col-span-5">
              <div className="bg-[#13151e] border border-[#252b3a] rounded-3xl p-6 shadow-2xl space-y-6 sticky top-24">
                {/* Thumbnail with free preview trigger */}
                <div className="relative aspect-video rounded-2xl overflow-hidden group border border-[#242838] bg-black">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 flex items-center justify-center shadow-xl transform hover:scale-110 transition-all cursor-pointer"
                    >
                      <PlayCircle className="w-8 h-8 fill-zinc-950 text-amber-500" />
                    </button>
                  </div>
                  <span className="absolute bottom-3 left-3 text-[11px] font-medium bg-black/70 px-2.5 py-1 rounded text-emerald-300 border border-emerald-500/40 backdrop-blur-xs">
                    Free Sample Lesson Preview
                  </span>
                </div>

                {/* Price and Guarantee */}
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-bold text-amber-400">
                        ${course.price}
                      </span>
                      {course.originalPrice && (
                        <span className="text-base line-through text-zinc-500">
                          ${course.originalPrice}
                        </span>
                      )}
                      {discountPercent > 0 && (
                        <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400">One-time payment</span>
                  </div>

                  {/* Enroll CTA */}
                  <button
                    onClick={handleEnrollClick}
                    id="course-hero-enroll-button"
                    className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm shadow-xl shadow-amber-500/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {enrolled ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Go to Enrolled Course</span>
                      </>
                    ) : (
                      <>
                        <span>Enroll in Masterclass</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <button
                      onClick={() =>
                        toggleWishlist({
                          id: course.id,
                          type: 'course',
                          title: course.title,
                          category: course.category,
                          price: course.price,
                          originalPrice: course.originalPrice,
                          thumbnail: course.thumbnail,
                          rating: course.rating
                        })
                      }
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        wishlisted
                          ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                          : 'bg-[#181a24] text-zinc-300 hover:text-white border-[#2b3040]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-400 text-rose-400' : ''}`} />
                      <span>{wishlisted ? 'Saved' : 'Wishlist'}</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="py-2 px-3 rounded-xl bg-[#181a24] hover:bg-zinc-800 text-zinc-300 border border-[#2b3040] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                    </button>
                  </div>

                  {/* Course inclusions bullet list */}
                  <div className="pt-4 border-t border-[#202534] space-y-2 text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{course.duration} on-demand 4K video</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>{course.lessonsCount} lessons & comprehensive downloadable sheets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full lifetime access with 30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Certificate of completion upon finishing capstone</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-16">
            {/* What You'll Learn */}
            <div className="p-7 rounded-3xl bg-[#12141d] border border-[#212634] space-y-6" id="what-you-will-learn">
              <h3 className="font-editorial text-2xl text-white font-normal">
                What You'll Learn in This Course
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Overview Description */}
            <div className="space-y-4">
              <h3 className="font-editorial text-2xl text-white font-normal">
                Course Overview
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {course.description}
              </p>
              <div className="p-4 rounded-xl bg-[#141620] border border-[#232736] text-xs text-zinc-400 space-y-2">
                <span className="font-semibold text-zinc-200 block uppercase tracking-wider text-[11px]">
                  Requirements & Prerequisites:
                </span>
                <ul className="list-disc list-inside space-y-1 text-zinc-400">
                  {course.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Course Curriculum Accordion */}
            <div className="space-y-6" id="course-curriculum">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-2xl text-white font-normal">
                    Course Curriculum
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {course.curriculum.length} Modules · {course.lessonsCount} Lessons · {course.duration} Total Length
                  </p>
                </div>
                <button
                  onClick={() => {
                    const allOpen = Object.keys(expandedModules).length === course.curriculum.length;
                    if (allOpen) {
                      setExpandedModules({});
                    } else {
                      const all: Record<string, boolean> = {};
                      course.curriculum.forEach((m) => (all[m.id] = true));
                      setExpandedModules(all);
                    }
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                >
                  Toggle All Modules
                </button>
              </div>

              <div className="space-y-3">
                {course.curriculum.map((mod) => {
                  const isOpen = !!expandedModules[mod.id];
                  return (
                    <div
                      key={mod.id}
                      className="rounded-2xl bg-[#12141c] border border-[#212634] overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#161924] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-sm text-white">
                            {mod.title}
                          </span>
                          <span className="text-xs text-zinc-500">
                            ({mod.lessons.length} lessons)
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-zinc-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-400" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 border-t border-[#1d222e] divide-y divide-[#1b1f2b]">
                          {mod.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="py-3 flex items-center justify-between text-xs gap-3"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {lesson.isFreePreview ? (
                                  <PlayCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <Lock className="w-4 h-4 text-zinc-600 shrink-0" />
                                )}
                                <span className="text-zinc-300 truncate">
                                  {lesson.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                {lesson.isFreePreview && (
                                  <button
                                    onClick={() => setIsPreviewOpen(true)}
                                    className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-semibold text-[10px] hover:bg-emerald-900/80 cursor-pointer"
                                  >
                                    Preview
                                  </button>
                                )}
                                <span className="text-zinc-500 font-mono">
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor Profile Card */}
            <div className="p-7 rounded-3xl bg-[#12141d] border border-[#212634] space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90">
                Your Instructor
              </span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400/30 shrink-0"
                />
                <div>
                  <h4 className="font-editorial text-xl text-white font-normal">
                    {course.instructor.name}
                  </h4>
                  <p className="text-xs text-amber-400/90 font-medium mb-1">
                    {course.instructor.role}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {course.instructor.bio}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                    <span>{course.instructor.experience}</span>
                    <span>·</span>
                    <span>{course.instructor.studentsCount.toLocaleString()} Students</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6">
              <h3 className="font-editorial text-2xl text-white font-normal">
                Student Reviews & Ratings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-[#12141c] border border-[#212634] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs text-white">{rev.userName}</span>
                      <span className="text-[10px] text-zinc-500">{rev.date}</span>
                    </div>
                    <Rating rating={rev.rating} showCount={false} size="sm" />
                    <p className="text-xs text-zinc-300 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-4">
              <h3 className="font-editorial text-2xl text-white font-normal flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {faqs.slice(0, 4).map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#12141c] border border-[#212634] space-y-2"
                  >
                    <h5 className="text-xs sm:text-sm font-semibold text-white">
                      {faq.question}
                    </h5>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Courses Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-editorial text-xl text-white font-normal">
              You May Also Like
            </h4>
            <div className="space-y-5">
              {recommendedCourses.map((recCourse) => (
                <CourseCard
                  key={recCourse.id}
                  course={recCourse}
                  onPreviewClick={(c) => {
                    setCourse(c);
                    setIsPreviewOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Free Sample Lesson Preview Modal */}
      <PreviewVideoModal
        course={course}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};
