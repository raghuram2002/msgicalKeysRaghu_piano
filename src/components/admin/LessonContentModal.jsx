import React, { useState, useRef } from 'react';
import {
  Video,
  FileText,
  Music,
  Image as ImageIcon,
  File,
  Upload,
  Trash2,
  Edit3,
  Eye,
  Download,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  Lock,
  Globe,
  AlertCircle,
  Play,
  Pause,
  RefreshCw,
  Plus,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import {
  SUPPORTED_RESOURCE_TYPES,
  validateResourceUpload,
  formatFileSize
} from '../../services/resourceService';

export const LessonContentModal = ({
  isOpen,
  onClose,
  course,
  module,
  lesson,
  onSaveLesson
}) => {
  if (!isOpen || !lesson) return null;

  // Local working copy of lesson data
  const [currentLesson, setCurrentLesson] = useState({
    ...lesson,
    video: lesson.video ? { ...lesson.video } : null,
    resources: lesson.resources ? lesson.resources.map((r) => ({ ...r })) : []
  });

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'video' | 'docs' | 'additional'
  const [uploadingState, setUploadingState] = useState(null); // { type, progress, fileName }
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editingResource, setEditingResource] = useState(null); // resource being edited
  const [previewItem, setPreviewItem] = useState(null); // resource or video preview
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Hidden file inputs
  const videoInputRef = useRef(null);
  const docInputRef = useRef(null);
  const additionalInputRef = useRef(null);
  const [additionalUploadType, setAdditionalUploadType] = useState('AUDIO');

  const showNotification = (msg, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(''), 4000);
    } else {
      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // ─── 1. VIDEO MANAGEMENT HANDLERS ───────────────────────────────────────────
  const handleVideoFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateResourceUpload(file, 'VIDEO');
    if (!validation.valid) {
      showNotification(validation.error, true);
      return;
    }

    // Simulate progress
    setUploadingState({ type: 'video', progress: 15, fileName: file.name });
    const interval = setInterval(() => {
      setUploadingState((prev) => {
        if (!prev) {
          clearInterval(interval);
          return null;
        }
        if (prev.progress >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            const newVideo = {
              id: `vid_${Date.now()}`,
              title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
              fileName: file.name,
              fileSize: formatFileSize(file.size),
              duration: currentLesson.duration || '18:30',
              resolution: '4K 60fps',
              uploadStatus: 'ready',
              access: currentLesson.isFreePreview ? 'free_preview' : 'enrolled_only',
              uploadedAt: new Date().toISOString().split('T')[0],
              storageKey: `courses/${course?.id || 'course'}/videos/${file.name}`,
              storageProvider: 'cloudflare_stream'
            };
            setCurrentLesson((cur) => ({ ...cur, video: newVideo }));
            setUploadingState(null);
            showNotification('4K Video uploaded successfully to Cloudflare Stream!');
          }, 300);
          return { ...prev, progress: 100 };
        }
        return { ...prev, progress: prev.progress + 25 };
      });
    }, 150);
  };

  const handleRemoveVideo = () => {
    if (confirm('Are you sure you want to remove this video from the lesson?')) {
      setCurrentLesson((prev) => ({ ...prev, video: null }));
      showNotification('Video removed from lesson.');
    }
  };

  // ─── 2. NOTES & DOCUMENTS HANDLERS ──────────────────────────────────────────
  const handleDocFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const targetType = ext === '.pdf' ? 'PDF' : 'DOCUMENT';

    const validation = validateResourceUpload(file, targetType);
    if (!validation.valid) {
      showNotification(validation.error, true);
      return;
    }

    setUploadingState({ type: 'doc', progress: 20, fileName: file.name });
    const interval = setInterval(() => {
      setUploadingState((prev) => {
        if (!prev) {
          clearInterval(interval);
          return null;
        }
        if (prev.progress >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            const newResource = {
              id: `res_${Date.now()}`,
              title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
              type: targetType,
              category: targetType === 'PDF' ? 'notes' : 'document',
              fileName: file.name,
              fileSize: formatFileSize(file.size),
              mimeType: file.type || (targetType === 'PDF' ? 'application/pdf' : 'application/msword'),
              description: `Uploaded lecture notes and reference materials for ${currentLesson.title}.`,
              uploadStatus: 'ready',
              access: 'enrolled_only',
              uploadedAt: new Date().toISOString().split('T')[0],
              storageKey: `courses/${course?.id || 'course'}/docs/${file.name}`,
              storageProvider: 'aws_s3'
            };
            setCurrentLesson((cur) => ({
              ...cur,
              resources: [...cur.resources, newResource]
            }));
            setUploadingState(null);
            showNotification(`${targetType} document uploaded securely.`);
          }, 300);
          return { ...prev, progress: 100 };
        }
        return { ...prev, progress: prev.progress + 30 };
      });
    }, 120);
  };

  // ─── 3. ADDITIONAL RESOURCES HANDLERS ───────────────────────────────────────
  const handleAdditionalFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateResourceUpload(file, additionalUploadType);
    if (!validation.valid) {
      showNotification(validation.error, true);
      return;
    }

    setUploadingState({ type: additionalUploadType.toLowerCase(), progress: 20, fileName: file.name });
    const interval = setInterval(() => {
      setUploadingState((prev) => {
        if (!prev) {
          clearInterval(interval);
          return null;
        }
        if (prev.progress >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            const newResource = {
              id: `res_${Date.now()}`,
              title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
              type: additionalUploadType,
              category: additionalUploadType.toLowerCase(),
              fileName: file.name,
              fileSize: formatFileSize(file.size),
              duration: additionalUploadType === 'AUDIO' ? '05:30' : undefined,
              mimeType: file.type || 'application/octet-stream',
              description: `Supplementary practice resource for ${currentLesson.title}.`,
              uploadStatus: 'ready',
              access: 'enrolled_only',
              uploadedAt: new Date().toISOString().split('T')[0],
              storageKey: `courses/${course?.id || 'course'}/${additionalUploadType.toLowerCase()}/${file.name}`,
              storageProvider: 'aws_s3'
            };
            setCurrentLesson((cur) => ({
              ...cur,
              resources: [...cur.resources, newResource]
            }));
            setUploadingState(null);
            showNotification(`${additionalUploadType} resource attached to lesson.`);
          }, 300);
          return { ...prev, progress: 100 };
        }
        return { ...prev, progress: prev.progress + 30 };
      });
    }, 120);
  };

  // ─── REORDER RESOURCES ──────────────────────────────────────────────────────
  const moveResource = (index, direction) => {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= currentLesson.resources.length) return;
    const updated = [...currentLesson.resources];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    setCurrentLesson((prev) => ({ ...prev, resources: updated }));
  };

  // ─── DELETE RESOURCE ────────────────────────────────────────────────────────
  const handleDeleteResource = (resourceId) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      setCurrentLesson((prev) => ({
        ...prev,
        resources: prev.resources.filter((r) => r.id !== resourceId)
      }));
      showNotification('Resource deleted.');
    }
  };

  // ─── TOGGLE RESOURCE ACCESS (Free Preview vs Enrolled Only) ──────────────────
  const toggleResourceAccess = (resourceId) => {
    setCurrentLesson((prev) => ({
      ...prev,
      resources: prev.resources.map((r) => {
        if (r.id === resourceId) {
          const nextAccess = r.access === 'free_preview' ? 'enrolled_only' : 'free_preview';
          return { ...r, access: nextAccess };
        }
        return r;
      })
    }));
  };

  // ─── SAVE MODAL EDITS ────────────────────────────────────────────────────────
  const handleSaveAll = () => {
    onSaveLesson(currentLesson);
    onClose();
  };

  // Grouped resources
  const documentResources = currentLesson.resources.filter(
    (r) => r.type === 'PDF' || r.type === 'DOCUMENT'
  );
  const additionalResources = currentLesson.resources.filter(
    (r) => r.type !== 'PDF' && r.type !== 'DOCUMENT' && r.type !== 'VIDEO'
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <span>{course?.title}</span>
              <ChevronRight className="w-3 h-3" />
              <span>{module?.title}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#7388a5]" />
              {currentLesson.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Upload Progress Bar if any active upload */}
        {uploadingState && (
          <div className="mx-6 mt-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-blue-900">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                Uploading {uploadingState.fileName}...
              </span>
              <span>{uploadingState.progress}%</span>
            </div>
            <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7388a5] rounded-full transition-all duration-200"
                style={{ width: `${uploadingState.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Tab Controls & General Settings */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#7388a5] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Content ({1 + currentLesson.resources.length})
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-[#7388a5] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Video Lesson {currentLesson.video ? '✓' : '(0)'}
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'docs'
                  ? 'bg-[#7388a5] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Notes & PDFs ({documentResources.length})
            </button>
            <button
              onClick={() => setActiveTab('additional')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'additional'
                  ? 'bg-[#7388a5] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Additional Materials ({additionalResources.length})
            </button>
          </div>

          {/* Lesson-level Free Preview Switch */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Lesson Access:</span>
            <button
              type="button"
              onClick={() =>
                setCurrentLesson((prev) => ({
                  ...prev,
                  isFreePreview: !prev.isFreePreview
                }))
              }
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentLesson.isFreePreview
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {currentLesson.isFreePreview ? (
                <>
                  <Globe className="w-3 h-3 text-emerald-600" /> Free Preview
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 text-slate-400" /> Enrolled Only
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* SECTION 1: VIDEO CONTENT */}
          {(activeTab === 'all' || activeTab === 'video') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Video className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">1. Video Masterclass</h3>
                    <p className="text-[11px] text-slate-400">
                      High-bitrate video stream stored externally on Cloudflare Stream / AWS S3
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={videoInputRef}
                    onChange={handleVideoFileSelect}
                    accept=".mp4,.mov,.webm,.mkv"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {currentLesson.video ? 'Replace Video' : 'Upload Video'}
                  </button>
                </div>
              </div>

              {currentLesson.video ? (
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
                        <Video className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {currentLesson.video.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="font-mono text-slate-600">
                            {currentLesson.video.fileName}
                          </span>
                          <span>•</span>
                          <span>{currentLesson.video.fileSize}</span>
                          <span>•</span>
                          <span className="font-mono">{currentLesson.video.duration}</span>
                          <span>•</span>
                          <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded text-[10px]">
                            {currentLesson.video.resolution || '4K'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewItem({
                            type: 'video',
                            title: currentLesson.video.title,
                            videoUrl: currentLesson.video.storageKey
                          })
                        }
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1 cursor-pointer"
                        title="Preview Video"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        Preview
                      </button>

                      <button
                        type="button"
                        onClick={handleRemoveVideo}
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-medium flex items-center gap-1 cursor-pointer"
                        title="Remove Video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span>Status:</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Transcoded & Ready (HLS adaptive)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Access:</span>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentLesson((prev) => ({
                            ...prev,
                            video: {
                              ...prev.video,
                              access:
                                prev.video.access === 'free_preview'
                                  ? 'enrolled_only'
                                  : 'free_preview'
                            }
                          }))
                        }
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded cursor-pointer ${
                          currentLesson.video.access === 'free_preview'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {currentLesson.video.access === 'free_preview'
                          ? 'Free Preview'
                          : 'Enrolled Only'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => videoInputRef.current?.click()}
                  className="p-8 border-2 border-dashed border-slate-200 hover:border-[#7388a5] rounded-2xl text-center space-y-2 cursor-pointer transition-colors bg-slate-50/50"
                >
                  <Video className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-semibold text-slate-700">No video uploaded yet</p>
                  <p className="text-[11px] text-slate-400">
                    Click to select .mp4, .mov, or .webm up to 5 GB. Streaming manifest will be created automatically.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: NOTES & DOCUMENTS */}
          {(activeTab === 'all' || activeTab === 'docs') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">2. Notes, PDFs & Documents</h3>
                    <p className="text-[11px] text-slate-400">
                      Handouts, PDF sheet music, and DOC/DOCX theory guides
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={docInputRef}
                    onChange={handleDocFileSelect}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => docInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#7388a5]" />
                    Upload PDF / Doc
                  </button>
                </div>
              </div>

              {documentResources.length > 0 ? (
                <div className="space-y-2.5">
                  {documentResources.map((res, index) => (
                    <div
                      key={res.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7388a5]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                            res.type === 'PDF'
                              ? 'bg-rose-50 text-rose-600 border-rose-200'
                              : 'bg-indigo-50 text-indigo-600 border-indigo-200'
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                res.type === 'PDF'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              }`}
                            >
                              {res.type}
                            </span>
                            <h4 className="text-xs font-bold text-slate-800 truncate">
                              {res.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {res.description}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1 font-mono">
                            <span>{res.fileName}</span>
                            <span>•</span>
                            <span>{res.fileSize}</span>
                            <span>•</span>
                            <span>{res.uploadedAt}</span>
                          </div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => toggleResourceAccess(res.id)}
                          className={`text-[10px] font-bold uppercase px-2 py-1 rounded cursor-pointer ${
                            res.access === 'free_preview'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                          title="Toggle Free Preview vs Enrolled Only"
                        >
                          {res.access === 'free_preview' ? 'Free Preview' : 'Enrolled Only'}
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingResource(res)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                          title="Edit Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setPreviewItem({
                              type: 'document',
                              title: res.title,
                              fileName: res.fileName,
                              fileSize: res.fileSize
                            })
                          }
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                          title="Preview Document"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteResource(res.id)}
                          className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Delete Resource"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  onClick={() => docInputRef.current?.click()}
                  className="p-6 border-2 border-dashed border-slate-200 hover:border-[#7388a5] rounded-2xl text-center space-y-1.5 cursor-pointer transition-colors bg-slate-50/50"
                >
                  <FileText className="w-7 h-7 text-slate-400 mx-auto" />
                  <p className="text-xs font-semibold text-slate-700">No documents attached</p>
                  <p className="text-[11px] text-slate-400">
                    Add PDF notes, chord charts, worksheets, or DOCX lesson summaries.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: ADDITIONAL RESOURCES (Audio, Images, Stems, Worksheets) */}
          {(activeTab === 'all' || activeTab === 'additional') && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Music className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      3. Additional Learning Materials
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Audio practice tracks, fingering graphics, MIDI files, and practice packs
                    </p>
                  </div>
                </div>

                {/* Upload Picker */}
                <div className="flex items-center gap-2">
                  <select
                    value={additionalUploadType}
                    onChange={(e) => setAdditionalUploadType(e.target.value)}
                    className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none"
                  >
                    <option value="AUDIO">Audio Track (.mp3, .wav)</option>
                    <option value="IMAGE">Diagram / Image (.png, .jpg)</option>
                    <option value="OTHER">ZIP / MIDI Archive</option>
                  </select>

                  <input
                    type="file"
                    ref={additionalInputRef}
                    onChange={handleAdditionalFileSelect}
                    accept={
                      additionalUploadType === 'AUDIO'
                        ? '.mp3,.wav,.aac,.m4a'
                        : additionalUploadType === 'IMAGE'
                        ? '.jpg,.jpeg,.png,.webp'
                        : '.zip,.mid,.midi'
                    }
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => additionalInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Attach Material
                  </button>
                </div>
              </div>

              {additionalResources.length > 0 ? (
                <div className="space-y-2.5">
                  {additionalResources.map((res, index) => (
                    <div
                      key={res.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7388a5]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        {/* Order controls */}
                        <div className="flex flex-col gap-0.5 pt-0.5">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => moveResource(index, -1)}
                            className="p-0.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === additionalResources.length - 1}
                            onClick={() => moveResource(index, 1)}
                            className="p-0.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>

                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                            res.type === 'AUDIO'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                              : res.type === 'IMAGE'
                              ? 'bg-amber-50 text-amber-600 border-amber-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {res.type === 'AUDIO' && <Music className="w-4 h-4" />}
                          {res.type === 'IMAGE' && <ImageIcon className="w-4 h-4" />}
                          {res.type === 'OTHER' && <File className="w-4 h-4" />}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                res.type === 'AUDIO'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : res.type === 'IMAGE'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {res.type}
                            </span>
                            <h4 className="text-xs font-bold text-slate-800 truncate">
                              {res.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {res.description}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1 font-mono">
                            <span>{res.fileName}</span>
                            <span>•</span>
                            <span>{res.fileSize}</span>
                            {res.duration && (
                              <>
                                <span>•</span>
                                <span>{res.duration}</span>
                              </>
                            )}
                            <span>•</span>
                            <span>{res.uploadedAt}</span>
                          </div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => toggleResourceAccess(res.id)}
                          className={`text-[10px] font-bold uppercase px-2 py-1 rounded cursor-pointer ${
                            res.access === 'free_preview'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                          title="Toggle Free Preview vs Enrolled Only"
                        >
                          {res.access === 'free_preview' ? 'Free Preview' : 'Enrolled Only'}
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingResource(res)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                          title="Edit Title & Description"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setPreviewItem({
                              type: res.type.toLowerCase(),
                              title: res.title,
                              fileName: res.fileName,
                              fileSize: res.fileSize,
                              duration: res.duration
                            })
                          }
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteResource(res.id)}
                          className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  onClick={() => additionalInputRef.current?.click()}
                  className="p-6 border-2 border-dashed border-slate-200 hover:border-[#7388a5] rounded-2xl text-center space-y-1.5 cursor-pointer transition-colors bg-slate-50/50"
                >
                  <Music className="w-7 h-7 text-slate-400 mx-auto" />
                  <p className="text-xs font-semibold text-slate-700">No additional media attached</p>
                  <p className="text-[11px] text-slate-400">
                    Upload audio ear drills, rhythm loops, keyboard placement diagrams, or ZIP stems.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Save & Close Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-3xl flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            <span>
              Total: {currentLesson.video ? 1 : 0} Video, {currentLesson.resources.length} Materials
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 hover:bg-white text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-5 py-2 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save Content Changes
            </button>
          </div>
        </div>
      </div>

      {/* Sub-modal: Edit Resource Metadata */}
      {editingResource && (
        <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Edit Resource Metadata</h3>
              <button
                onClick={() => setEditingResource(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Resource Title</label>
                <input
                  type="text"
                  value={editingResource.title}
                  onChange={(e) =>
                    setEditingResource({ ...editingResource, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7388a5]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingResource.description || ''}
                  onChange={(e) =>
                    setEditingResource({ ...editingResource, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7388a5]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Access Level</label>
                <select
                  value={editingResource.access}
                  onChange={(e) =>
                    setEditingResource({ ...editingResource, access: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7388a5]"
                >
                  <option value="enrolled_only">Enrolled Students Only (Protected)</option>
                  <option value="free_preview">Free Preview (Public Prospective Students)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingResource(null)}
                className="px-3.5 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentLesson((prev) => ({
                    ...prev,
                    resources: prev.resources.map((r) =>
                      r.id === editingResource.id ? editingResource : r
                    )
                  }));
                  setEditingResource(null);
                  showNotification('Resource updated.');
                }}
                className="px-4 py-1.5 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-modal: Resource Preview Player */}
      {previewItem && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7388a5] tracking-wider">
                  Resource Preview
                </span>
                <h3 className="font-bold text-sm text-slate-900">{previewItem.title}</h3>
              </div>
              <button
                onClick={() => {
                  setPreviewItem(null);
                  setIsPlayingAudio(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Preview */}
            {previewItem.type === 'video' && (
              <div className="rounded-2xl overflow-hidden aspect-video bg-slate-950 flex flex-col items-center justify-center relative shadow-inner">
                <Play className="w-12 h-12 text-white/80" />
                <p className="text-white text-xs mt-2 font-medium">
                  Simulated 4K Stream: {previewItem.title}
                </p>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  Resolution: 3840x2160 · 60fps · HLS Transcoded
                </span>
              </div>
            )}

            {/* Audio Preview */}
            {previewItem.type === 'audio' && (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col items-center text-center space-y-3">
                <div
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shadow-md"
                >
                  {isPlayingAudio ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{previewItem.title}</p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {previewItem.fileName} ({previewItem.duration || '05:30'})
                  </p>
                </div>
                {isPlayingAudio && (
                  <div className="flex items-center gap-1">
                    {[12, 24, 18, 30, 16, 28, 22, 14, 26, 18].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-emerald-600 rounded-full animate-pulse"
                        style={{ height: `${h}px`, animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Document Preview */}
            {previewItem.type === 'document' && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <FileText className="w-12 h-12 text-[#7388a5] mx-auto" />
                <p className="text-xs font-bold text-slate-900">{previewItem.title}</p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {previewItem.fileName} • {previewItem.fileSize}
                </p>
                <p className="text-[11px] text-slate-400">
                  Ready for encrypted PDF streaming and authorized student download.
                </p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setPreviewItem(null);
                  setIsPlayingAudio(false);
                }}
                className="px-4 py-2 bg-[#7388a5] text-white rounded-xl text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
