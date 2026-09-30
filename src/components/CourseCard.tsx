import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Users, PlayCircle, Heart, ArrowRight } from 'lucide-react';
import { Course } from '../types';
import { Rating } from './Rating';
import { useWishlist } from '../context/WishlistContext';

interface CourseCardProps {
  course: Course;
  onPreviewClick?: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onPreviewClick }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const wishlisted = isWishlisted(course.id);

  const discountPercent = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <div
      id={`course-card-${course.id}`}
      className="group flex flex-col bg-white border border-slate-200 hover:border-[#7388a5] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badges on image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-white/95 text-[#475e7d] border border-slate-200/80 shadow-2xs">
            {course.category}
          </span>
          <span className="px-2.5 py-1 text-[10px] font-medium rounded-md bg-white/90 text-slate-600 border border-slate-200/80 shadow-2xs">
            {course.level}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist({
              id: course.id,
              type: 'course',
              title: course.title,
              category: course.category,
              price: course.price,
              originalPrice: course.originalPrice,
              thumbnail: course.thumbnail,
              rating: course.rating
            });
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 shadow-xs ${
            wishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-slate-500 hover:text-rose-500 hover:bg-white'
          }`}
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Free Preview Trigger Pill */}
        {onPreviewClick && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onPreviewClick(course);
            }}
            className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 hover:bg-white text-emerald-700 border border-emerald-300 text-[11px] font-medium shadow-xs transition-colors cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Free Sample Lesson</span>
          </button>
        )}
      </div>

      {/* Course Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <Rating rating={course.rating} count={course.reviewsCount} size="sm" />
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {course.studentsCount.toLocaleString()}
            </span>
          </div>

          {/* Title & Subtitle */}
          <Link to={`/courses/${course.id}`}>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-[#5a718f] transition-colors line-clamp-2 mb-1.5">
              {course.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {course.subtitle}
          </p>
        </div>

        {/* Meta & Instructor */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-5 h-5 rounded-full object-cover border border-slate-200"
              />
              <span className="truncate max-w-[130px] font-medium text-slate-700">
                {course.instructor.name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Price & CTA Row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">
                ${course.price}
              </span>
              {course.originalPrice && (
                <span className="text-xs line-through text-slate-400">
                  ${course.originalPrice}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-[10px] font-bold text-emerald-700 px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <button
              onClick={() => navigate(`/courses/${course.id}`)}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#edf2f8] hover:bg-[#7388a5] text-[#475e7d] hover:text-white font-medium text-xs transition-colors cursor-pointer"
            >
              <span>View Course</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
