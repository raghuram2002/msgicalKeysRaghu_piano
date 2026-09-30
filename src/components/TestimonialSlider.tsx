import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { Rating } from './Rating';

export const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto" id="testimonials-slider">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-lg">
        <Quote className="absolute top-6 right-8 w-24 h-24 text-slate-100 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Avatar and details */}
          <div className="flex flex-col items-center text-center shrink-0">
            <div className="relative mb-3">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-slate-200 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#7388a5] shadow-xs">
                <Quote className="w-3.5 h-3.5" />
              </div>
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-slate-900">
              {current.name}
            </h4>
            <p className="text-xs text-slate-500 max-w-[170px]">{current.role}</p>
            <div className="mt-2">
              <Rating rating={current.rating} size="sm" showCount={false} />
            </div>
          </div>

          {/* Quote Content */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-[#eef3f9] border border-[#cbd8e8] text-[11px] font-medium text-[#475e7d]">
              {current.highlight}
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed italic">
              "{current.quote}"
            </p>

            <div className="pt-2">
              <span className="text-xs text-slate-400 block">Enrolled Course:</span>
              <span className="text-xs font-semibold text-slate-800">
                {current.courseTaken}
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Buttons & Dots */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-[#7388a5]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              title="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              title="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
