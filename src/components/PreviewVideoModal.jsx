import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle,
  ArrowRight,
  FileText,
  Music,
  Image as ImageIcon,
  Lock,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { requestSecureResourceAccess } from '../services/resourceService';

export const PreviewVideoModal = ({
  course,
  isOpen,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [downloadNotice, setDownloadNotice] = useState('');
  const [downloadError, setDownloadError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!isOpen || !course) return null;

  const previewLessons = course.curriculum.flatMap((m) =>
    m.lessons.filter((l) => l.isFreePreview)
  );

  const currentLesson = previewLessons[activeLessonIndex] || {
    id: 'intro',
    title: `${course.title} – Masterclass Overview & Demo`,
    duration: '04:15',
    isFreePreview: true,
    resources: []
  };

  const handleEnrollClick = () => {
    onClose();
    navigate(`/courses/${course.id}`);
  };

  const handleResourceClick = async (resource) => {
    setDownloadNotice('');
    setDownloadError('');

    const accessResult = await requestSecureResourceAccess(user, course.id, resource);
    if (accessResult.authorized) {
      setDownloadNotice(`Downloading authorized sample: ${resource.title}`);
      setTimeout(() => setDownloadNotice(''), 3500);
    } else {
      setDownloadError(accessResult.error);
      setTimeout(() => setDownloadError(''), 4000);
    }
  };

  return (
    <div
      id="preview-video-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="preview-video-modal-container"
        className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-700">
              Free Sample Masterclass Preview
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-600 truncate max-w-xs sm:max-w-md">
              {course.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas & Controls */}
        <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden group shrink-0">
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
              className="w-16 h-16 rounded-full bg-[#7388a5] hover:bg-[#5f7491] text-white flex items-center justify-center shadow-xl shadow-black/30 transform hover:scale-110 transition-all mb-4 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
            </button>
            <h3 className="text-xl sm:text-2xl text-white font-semibold mb-1 drop-shadow-md">
              {currentLesson.title}
            </h3>
            <p className="text-xs text-slate-200 drop-shadow">
              With {course.instructor?.name || 'Raghuram'} · {currentLesson.duration} Free Preview
            </p>
          </div>

          {/* Simulated Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between gap-4 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-slate-300 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-slate-300 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-xs text-slate-300 font-mono">01:45 / {currentLesson.duration}</span>
            </div>

            {/* Progress bar */}
            <div className="flex-1 max-w-md h-1.5 bg-slate-700/60 rounded-full overflow-hidden cursor-pointer">
              <div className="h-full bg-[#8598b0] w-2/5 rounded-full" />
            </div>

            <span className="text-xs px-2 py-0.5 rounded bg-black/60 text-slate-200 border border-slate-700">
              4K 60fps
            </span>
          </div>
        </div>

        {/* Notices */}
        {downloadNotice && (
          <div className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-100 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{downloadNotice}</span>
          </div>
        )}
        {downloadError && (
          <div className="px-5 py-2.5 bg-rose-50 border-b border-rose-100 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{downloadError}</span>
          </div>
        )}

        {/* Learning Materials Section */}
        {currentLesson.resources && currentLesson.resources.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-white overflow-y-auto max-h-48">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                Lesson Learning Materials & Attachments
              </span>
              <span className="text-[10px] text-slate-400">
                {currentLesson.resources.length} files available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentLesson.resources.map((res) => {
                const isFree = res.access === 'free_preview';
                return (
                  <div
                    key={res.id}
                    onClick={() => handleResourceClick(res)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                      isFree
                        ? 'bg-slate-50 hover:bg-[#eef3f9] border-slate-200 hover:border-[#cbd8e8]'
                        : 'bg-slate-50/60 border-slate-200 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          res.type === 'PDF'
                            ? 'bg-rose-100 text-rose-700'
                            : res.type === 'AUDIO'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {res.type === 'PDF' && <FileText className="w-3.5 h-3.5" />}
                        {res.type === 'AUDIO' && <Music className="w-3.5 h-3.5" />}
                        {res.type !== 'PDF' && res.type !== 'AUDIO' && <ImageIcon className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{res.title}</p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {res.type} • {res.fileSize}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isFree ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <Download className="w-3 h-3" /> Free Sample
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          <Lock className="w-3 h-3 text-slate-400" /> Enrolled Only
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Free Preview Lessons Selector + Course CTA */}
        <div className="p-4 sm:p-5 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 shrink-0">
          <div className="w-full sm:w-auto">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 block mb-1.5">
              Available Free Previews ({previewLessons.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {previewLessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonIndex(idx)}
                  className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeLessonIndex === idx
                      ? 'bg-[#eef3f9] text-[#475e7d] border-[#cbd8e8] font-semibold'
                      : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
                  }`}
                >
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span className="truncate max-w-[140px]">{lesson.title.split(':')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="text-right hidden md:block">
              <span className="text-xs text-slate-400 block">Full Masterclass Access</span>
              <span className="text-base font-bold text-slate-900">₹{course.price}</span>
            </div>
            <button
              onClick={handleEnrollClick}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#7388a5] hover:bg-[#5f7491] text-white font-medium text-sm rounded-xl transition-colors cursor-pointer w-full sm:w-auto shadow-xs"
            >
              <span>Enroll to Unlock All Materials</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
