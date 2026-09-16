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
      className="group flex flex-col bg-[#11131a] border border-[#222634] hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        <img
          src={course.thumbnail}
          alt={course.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges on image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-[#0e1017]/90 text-amber-300 border border-amber-500/30 backdrop-blur-xs">
            {course.category}
          </span>
          <span className="px-2.5 py-1 text-[10px] font-medium rounded-md bg-[#0e1017]/80 text-zinc-300 border border-zinc-700/50 backdrop-blur-xs">
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
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
            wishlisted
              ? 'bg-rose-500/90 text-white'
              : 'bg-black/50 text-zinc-300 hover:text-white hover:bg-black/80'
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
            className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 hover:bg-black/90 text-emerald-300 hover:text-emerald-200 border border-emerald-500/40 text-[11px] font-medium backdrop-blur-xs transition-colors cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5" />
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
            <span className="flex items-center gap-1 text-xs text-zinc-400">
              <Users className="w-3.5 h-3.5 text-zinc-500" />
              {course.studentsCount.toLocaleString()}
            </span>
          </div>

          {/* Title & Subtitle */}
          <Link to={`/courses/${course.id}`}>
            <h3 className="font-editorial text-lg font-normal text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-1.5">
              {course.title}
            </h3>
          </Link>
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {course.subtitle}
          </p>
        </div>

        {/* Meta & Instructor */}
        <div className="space-y-3 pt-2 border-t border-[#1c1f2b]">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-5 h-5 rounded-full object-cover border border-zinc-700"
              />
              <span className="truncate max-w-[130px] font-medium text-zinc-300">
                {course.instructor.name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Price & CTA Row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-amber-400">
                ${course.price}
              </span>
              {course.originalPrice && (
                <span className="text-xs line-through text-zinc-500">
                  ${course.originalPrice}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-[10px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <button
              onClick={() => navigate(`/courses/${course.id}`)}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#1c202d] hover:bg-amber-500 text-zinc-200 hover:text-zinc-950 font-medium text-xs transition-colors cursor-pointer"
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
