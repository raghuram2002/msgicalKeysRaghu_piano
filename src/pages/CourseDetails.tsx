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
      <div className="min-h-screen bg-white text-slate-800 pt-32 pb-24 flex items-center justify-center">
        <div className="text-center p-8 bg-slate-50 border border-slate-200 rounded-2xl max-w-md shadow-xs">
          <h2 className="text-2xl text-slate-900 font-bold mb-2">Course Not Found</h2>
          <p className="text-xs text-slate-500 mb-6">
            The course you are looking for does not exist or may have been updated.
          </p>
          <Link
            to="/courses"
            className="px-5 py-2.5 bg-[#7388a5] hover:bg-[#5f7491] text-white font-medium text-xs rounded-xl shadow-xs"
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
    <div className="min-h-screen bg-white text-slate-800 pt-24 pb-24">
      {/* 16. COURSE HERO SECTION */}
      <section className="bg-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-5">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-[#eef3f9] text-[#475e7d] border border-[#cbd8e8]">
                  {course.category}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-md bg-white text-slate-600 border border-slate-200 shadow-2xs">
                  {course.level}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-md bg-white text-slate-600 border border-slate-200 shadow-2xs">
                  {course.duration}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {course.subtitle}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-slate-500">
                <Rating rating={course.rating} count={course.reviewsCount} size="md" />

                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{course.studentsCount.toLocaleString()} musicians enrolled</span>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-6 h-6 rounded-full object-cover border border-slate-200"
                  />
                  <span>Taught by <strong className="text-slate-800">{course.instructor.name}</strong></span>
                </div>
              </div>
            </div>

            {/* Right Card / Enrollment Box */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-6 sticky top-24">
                {/* Thumbnail with free preview trigger */}
                <div className="relative aspect-video rounded-2xl overflow-hidden group border border-slate-200 bg-black">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="w-14 h-14 rounded-full bg-[#7388a5] hover:bg-[#5f7491] text-white flex items-center justify-center shadow-xl transform hover:scale-110 transition-all cursor-pointer"
                    >
                      <PlayCircle className="w-8 h-8 fill-white text-[#7388a5]" />
                    </button>
                  </div>
                  <span className="absolute bottom-3 left-3 text-[11px] font-medium bg-white/95 px-2.5 py-1 rounded text-emerald-700 border border-emerald-300 shadow-2xs">
                    Free Sample Lesson Preview
                  </span>
                </div>

                {/* Price and Guarantee */}
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-bold text-slate-900">
                        ${course.price}
                      </span>
                      {course.originalPrice && (
                        <span className="text-base line-through text-slate-400">
                          ${course.originalPrice}
                        </span>
                      )}
                      {discountPercent > 0 && (
                        <span className="text-xs font-bold text-emerald-700 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">One-time payment</span>
                  </div>

                  {/* Enroll CTA */}
                  <button
                    onClick={handleEnrollClick}
                    id="course-hero-enroll-button"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#7388a5] hover:bg-[#5f7491] text-white font-medium text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
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
                          ? 'bg-rose-50 text-rose-600 border-rose-200'
                          : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{wishlisted ? 'Saved' : 'Wishlist'}</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                    </button>
                  </div>

                  {/* Course inclusions bullet list */}
                  <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#7388a5]" />
                      <span>{course.duration} on-demand 4K video</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#7388a5]" />
                      <span>{course.lessonsCount} lessons & comprehensive downloadable sheets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#7388a5]" />
                      <span>Full lifetime access with 30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-[#7388a5]" />
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
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-6" id="what-you-will-learn">
              <h3 className="text-2xl text-slate-900 font-bold">
                What You'll Learn in This Course
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#7388a5] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Overview Description */}
            <div className="space-y-4">
              <h3 className="text-2xl text-slate-900 font-bold">
                Course Overview
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {course.description}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <span className="font-semibold text-slate-800 block uppercase tracking-wider text-[11px]">
                  Requirements & Prerequisites:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
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
                  <h3 className="text-2xl text-slate-900 font-bold">
                    Course Curriculum
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
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
                  className="text-xs text-[#7388a5] hover:text-slate-900 font-medium cursor-pointer"
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
                      className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all shadow-2xs"
                    >
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-sm text-slate-900">
                            {mod.title}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({mod.lessons.length} lessons)
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 border-t border-slate-100 divide-y divide-slate-100">
                          {mod.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="py-3 flex items-center justify-between text-xs gap-3"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {lesson.isFreePreview ? (
                                  <PlayCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                ) : (
                                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                                )}
                                <span className="text-slate-700 truncate">
                                  {lesson.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                {lesson.isFreePreview && (
                                  <button
                                    onClick={() => setIsPreviewOpen(true)}
                                    className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-700 font-semibold text-[10px] hover:bg-emerald-100 cursor-pointer"
                                  >
                                    Preview
                                  </button>
                                )}
                                <span className="text-slate-400 font-mono">
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
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#7388a5]">
                Your Instructor
              </span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-200 shrink-0 shadow-sm"
                />
                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {course.instructor.name}
                  </h4>
                  <p className="text-xs text-[#7388a5] font-medium mb-1">
                    {course.instructor.role}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {course.instructor.bio}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span>{course.instructor.experience}</span>
                    <span>·</span>
                    <span>{course.instructor.studentsCount.toLocaleString()} Students</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6">
              <h3 className="text-2xl text-slate-900 font-bold">
                Student Reviews & Ratings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-800">{rev.userName}</span>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <Rating rating={rev.rating} showCount={false} size="sm" />
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-4">
              <h3 className="text-2xl text-slate-900 font-bold flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#7388a5]" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {faqs.slice(0, 4).map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-2xs"
                  >
                    <h5 className="text-xs sm:text-sm font-semibold text-slate-800">
                      {faq.question}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Courses Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-xl text-slate-900 font-bold">
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
