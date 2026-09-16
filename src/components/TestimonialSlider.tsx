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
      <div className="bg-gradient-to-br from-[#12141d] to-[#0e1017] border border-[#222736] rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
        <Quote className="absolute top-6 right-8 w-20 h-20 text-amber-500/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Avatar and details */}
          <div className="flex flex-col items-center text-center shrink-0">
            <div className="relative mb-3">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-amber-400/40 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#0b0c10] border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Quote className="w-3.5 h-3.5" />
              </div>
            </div>
            <h4 className="font-editorial text-lg text-white font-normal">
              {current.name}
            </h4>
            <p className="text-xs text-zinc-400 max-w-[170px]">{current.role}</p>
            <div className="mt-2">
              <Rating rating={current.rating} size="sm" showCount={false} />
            </div>
          </div>

          {/* Quote Content */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-medium text-amber-300">
              {current.highlight}
            </div>

            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-serif italic">
              "{current.quote}"
            </p>

            <div className="pt-2">
              <span className="text-xs text-zinc-500 block">Enrolled Course:</span>
              <span className="text-xs font-semibold text-zinc-300">
                {current.courseTaken}
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Buttons & Dots */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1d222f]">
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-[#171a24] hover:bg-[#202534] text-zinc-300 hover:text-white border border-[#2b3142] transition-colors"
              title="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-[#171a24] hover:bg-[#202534] text-zinc-300 hover:text-white border border-[#2b3142] transition-colors"
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
