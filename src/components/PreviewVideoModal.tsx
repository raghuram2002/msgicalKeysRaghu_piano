import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, CheckCircle, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../types';

interface PreviewVideoModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewVideoModal: React.FC<PreviewVideoModalProps> = ({
  course,
  isOpen,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const navigate = useNavigate();

  if (!isOpen || !course) return null;

  const previewLessons = course.curriculum.flatMap((m) =>
    m.lessons.filter((l) => l.isFreePreview)
  );

  const currentLesson = previewLessons[activeLessonIndex] || {
    id: 'intro',
    title: `${course.title} – Masterclass Overview & Demo`,
    duration: '04:15',
    isFreePreview: true
  };

  const handleEnrollClick = () => {
    onClose();
    navigate(`/courses/${course.id}`);
  };

  return (
    <div
      id="preview-video-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        id="preview-video-modal-container"
        className="w-full max-w-4xl bg-[#11131a] border border-[#262b3a] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#212533] bg-[#0e0f15]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
              Free Sample Lesson Preview
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs text-zinc-400 truncate max-w-xs sm:max-w-md">
              {course.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas & Controls */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          <img
            src={course.thumbnail}
            alt={course.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isPlaying ? 'opacity-80 scale-105 filter brightness-90' : 'opacity-50'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Playing Simulation Overlay */}
          <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-lg">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 flex items-center justify-center shadow-xl shadow-amber-500/20 transform hover:scale-110 transition-all mb-4 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
            </button>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1 drop-shadow-md">
              {currentLesson.title}
            </h3>
            <p className="text-xs text-zinc-300 drop-shadow">
              With {course.instructor.name} · {currentLesson.duration} Free Preview
            </p>
          </div>

          {/* Simulated Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between gap-4 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-amber-400 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-amber-400 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-xs text-zinc-300 font-mono">01:45 / {currentLesson.duration}</span>
            </div>

            {/* Fake progress bar */}
            <div className="flex-1 max-w-md h-1.5 bg-zinc-700/60 rounded-full overflow-hidden cursor-pointer">
              <div className="h-full bg-amber-400 w-2/5 rounded-full" />
            </div>

            <span className="text-xs px-2 py-0.5 rounded bg-zinc-800/80 text-amber-300 border border-zinc-700">
              1080p HD
            </span>
          </div>
        </div>

        {/* Free Preview Lessons Selector + Course CTA */}
        <div className="p-5 bg-[#0d0e13] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#222634]">
          <div className="w-full sm:w-auto">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400 block mb-1.5">
              Available Free Previews ({previewLessons.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {previewLessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonIndex(idx)}
                  className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                    activeLessonIndex === idx
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-[#161822] text-zinc-400 hover:text-zinc-200 border-[#2b3040]'
                  }`}
                >
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span className="truncate max-w-[140px]">{lesson.title.split(':')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="text-right hidden md:block">
              <span className="text-xs text-zinc-400 block">Full Course Access</span>
              <span className="text-base font-bold text-amber-400">${course.price}</span>
            </div>
            <button
              onClick={handleEnrollClick}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm rounded-xl transition-colors cursor-pointer w-full sm:w-auto"
            >
              <span>Enroll to Unlock All Lessons</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
