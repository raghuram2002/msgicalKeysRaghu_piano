import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  X,
  BookOpen,
  Save,
  ChevronDown,
  Layers,
  ChevronRight,
  ArrowLeft,
  Video,
  FileText,
  Music,
  Image as ImageIcon,
  Lock,
  Globe,
  CheckCircle2,
  FolderPlus
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { courses as initialCourses } from '../../data/courses';
import { LessonContentModal } from '../../components/admin/LessonContentModal';

const CATEGORIES = ['Piano', 'Guitar', 'Song Mastery', 'Bollywood & Indian', 'Music Theory'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

export const AdminCourses = () => {
  const [courseList, setCourseList] = useState(initialCourses.map(c => ({ ...c, published: true })));
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Curriculum & Lesson Studio state
  const [curriculumCourse, setCurriculumCourse] = useState(null);
  const [activeEditingLessonData, setActiveEditingLessonData] = useState(null); // { course, module, lesson }
  const [newModuleName, setNewModuleName] = useState('');
  const [showAddModuleInput, setShowAddModuleInput] = useState(false);
  const [addingLessonModuleId, setAddingLessonModuleId] = useState(null);
  const [newLessonData, setNewLessonData] = useState({ title: '', duration: '15:00', isFreePreview: false });

  // Course Form state
  const [formData, setFormData] = useState({
    title: '', subtitle: '', category: 'Piano', level: 'Beginner',
    price: '', originalPrice: '', duration: '', description: '', thumbnail: ''
  });

  const resetForm = () => {
    setFormData({ title: '', subtitle: '', category: 'Piano', level: 'Beginner', price: '', originalPrice: '', duration: '', description: '', thumbnail: '' });
    setEditingCourse(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title, subtitle: course.subtitle || '', category: course.category,
      level: course.level, price: course.price, originalPrice: course.originalPrice || '',
      duration: course.duration, description: course.description, thumbnail: course.thumbnail || ''
    });
    setShowModal(true);
  };

  const handleSaveCourse = () => {
    if (!formData.title.trim()) return;
    if (editingCourse) {
      setCourseList(prev => prev.map(c =>
        c.id === editingCourse.id ? { ...c, ...formData, price: Number(formData.price), originalPrice: Number(formData.originalPrice) } : c
      ));
    } else {
      const newCourse = {
        id: 'course-' + Date.now(),
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        rating: 0, reviewsCount: 0, studentsCount: 0, lessonsCount: 0,
        featured: false, published: true,
        instructor: { name: 'Raghu Admin', role: 'Instructor' },
        learningOutcomes: [], requirements: [],
        curriculum: [
          {
            id: 'mod-' + Date.now(),
            title: 'Module 1: Getting Started',
            lessons: []
          }
        ]
      };
      setCourseList(prev => [newCourse, ...prev]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (courseId) => {
    setCourseList(prev => prev.filter(c => c.id !== courseId));
    setDeleteConfirm(null);
    if (curriculumCourse?.id === courseId) {
      setCurriculumCourse(null);
    }
  };

  const togglePublish = (courseId) => {
    setCourseList(prev => prev.map(c =>
      c.id === courseId ? { ...c, published: !c.published } : c
    ));
  };

  // ─── CURRICULUM & MODULE HANDLERS ───────────────────────────────────────────
  const handleAddModule = () => {
    if (!newModuleName.trim() || !curriculumCourse) return;
    const newMod = {
      id: `mod_${Date.now()}`,
      title: newModuleName.trim(),
      lessons: []
    };
    const updatedCurriculum = [...(curriculumCourse.curriculum || []), newMod];
    updateCourseCurriculum(curriculumCourse.id, updatedCurriculum);
    setNewModuleName('');
    setShowAddModuleInput(false);
  };

  const handleDeleteModule = (moduleId) => {
    if (!confirm('Are you sure you want to delete this module and all its lessons?')) return;
    const updatedCurriculum = curriculumCourse.curriculum.filter(m => m.id !== moduleId);
    updateCourseCurriculum(curriculumCourse.id, updatedCurriculum);
  };

  const handleAddLesson = (moduleId) => {
    if (!newLessonData.title.trim() || !curriculumCourse) return;
    const newId = `les_${Date.now()}`;
    const cleanTitle = newLessonData.title.trim();
    const isFree = newLessonData.isFreePreview;

    const newLesson = {
      id: newId,
      title: cleanTitle,
      duration: newLessonData.duration || '15:00',
      isFreePreview: isFree,
      video: {
        id: `vid_${newId}`,
        title: cleanTitle,
        fileName: `${newId}-lecture-video.mp4`,
        fileSize: '750 MB',
        duration: newLessonData.duration || '15:00',
        resolution: '4K',
        uploadStatus: 'ready',
        access: isFree ? 'free_preview' : 'enrolled_only',
        uploadedAt: new Date().toISOString().split('T')[0],
        storageKey: `courses/${curriculumCourse.id}/videos/${newId}.mp4`,
        storageProvider: 'cloudflare_stream'
      },
      resources: [
        {
          id: `res_${newId}_notes`,
          title: `${cleanTitle} – Masterclass Notes`,
          type: 'PDF',
          category: 'notes',
          fileName: `${newId}-notes.pdf`,
          fileSize: '3.5 MB',
          description: `Downloadable reference notes and harmonic theory breakdown for ${cleanTitle}.`,
          uploadStatus: 'ready',
          access: isFree ? 'free_preview' : 'enrolled_only',
          uploadedAt: new Date().toISOString().split('T')[0],
          storageKey: `courses/${curriculumCourse.id}/docs/${newId}-notes.pdf`,
          storageProvider: 'aws_s3'
        }
      ]
    };

    const updatedCurriculum = curriculumCourse.curriculum.map(m => {
      if (m.id === moduleId) {
        return { ...m, lessons: [...(m.lessons || []), newLesson] };
      }
      return m;
    });

    updateCourseCurriculum(curriculumCourse.id, updatedCurriculum);
    setAddingLessonModuleId(null);
    setNewLessonData({ title: '', duration: '15:00', isFreePreview: false });
  };

  const handleDeleteLesson = (moduleId, lessonId) => {
    if (!confirm('Are you sure you want to delete this lesson and its attached resources?')) return;
    const updatedCurriculum = curriculumCourse.curriculum.map(m => {
      if (m.id === moduleId) {
        return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) };
      }
      return m;
    });
    updateCourseCurriculum(curriculumCourse.id, updatedCurriculum);
  };

  const handleSaveLessonContent = (updatedLesson) => {
    if (!curriculumCourse || !activeEditingLessonData) return;
    const { module: targetModule } = activeEditingLessonData;

    const updatedCurriculum = curriculumCourse.curriculum.map(m => {
      if (m.id === targetModule.id) {
        return {
          ...m,
          lessons: m.lessons.map(l => (l.id === updatedLesson.id ? updatedLesson : l))
        };
      }
      return m;
    });

    updateCourseCurriculum(curriculumCourse.id, updatedCurriculum);
    setActiveEditingLessonData(null);
  };

  const updateCourseCurriculum = (courseId, newCurriculum) => {
    const totalLessons = newCurriculum.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
    const updatedCourses = courseList.map(c => {
      if (c.id === courseId) {
        return { ...c, curriculum: newCurriculum, lessonsCount: totalLessons };
      }
      return c;
    });

    setCourseList(updatedCourses);
    const updatedCurrent = updatedCourses.find(c => c.id === courseId);
    if (updatedCurrent) setCurriculumCourse(updatedCurrent);
  };

  const filtered = courseList.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = !filterCategory || c.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ─── CURRICULUM STUDIO VIEW (When a course is opened for curriculum editing) ─── */}
        {curriculumCourse ? (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setCurriculumCourse(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7388a5] hover:text-[#5f7491] cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to All Courses
                </button>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {curriculumCourse.title}
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#eef3f9] text-[#475e7d] border border-[#cbd8e8]">
                    {curriculumCourse.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {curriculumCourse.curriculum?.length || 0} Modules • {curriculumCourse.lessonsCount || 0} Lessons • Manage videos, PDF notes, sheet music, audio tracks, and worksheets
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModuleInput(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <FolderPlus className="w-3.5 h-3.5" /> Add Module
                </button>
              </div>
            </div>

            {/* Quick Add Module Form */}
            {showAddModuleInput && (
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3 animate-in fade-in">
                <input
                  type="text"
                  placeholder="Module Title (e.g. Module 3: Advanced Harmonic Voicings)..."
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5] w-full"
                />
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => { setShowAddModuleInput(false); setNewModuleName(''); }}
                    className="px-3 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddModule}
                    className="px-4 py-2 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
                  >
                    Save Module
                  </button>
                </div>
              </div>
            )}

            {/* Modules and Lessons List */}
            <div className="space-y-6">
              {(curriculumCourse.curriculum || []).map((mod, modIdx) => (
                <div
                  key={mod.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden"
                >
                  {/* Module Header */}
                  <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-[#eef3f9] border border-[#cbd8e8] text-[#475e7d] text-xs font-bold flex items-center justify-center shrink-0">
                        {modIdx + 1}
                      </span>
                      <div>
                        <h2 className="text-sm font-bold text-slate-900">{mod.title}</h2>
                        <span className="text-[11px] text-slate-400">
                          {mod.lessons?.length || 0} Lessons / Topics
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setAddingLessonModuleId(mod.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#7388a5]" /> Add Lesson
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteModule(mod.id)}
                        className="p-1.5 rounded-xl border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                        title="Delete Module"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Add Lesson Input Inline Panel */}
                  {addingLessonModuleId === mod.id && (
                    <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                      <input
                        type="text"
                        placeholder="Lesson title (e.g. C Major Scale Fingering & Posture)..."
                        value={newLessonData.title}
                        onChange={(e) => setNewLessonData({ ...newLessonData, title: e.target.value })}
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5] w-full"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g. 15:30)"
                        value={newLessonData.duration}
                        onChange={(e) => setNewLessonData({ ...newLessonData, duration: e.target.value })}
                        className="w-28 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5]"
                      />
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={newLessonData.isFreePreview}
                          onChange={(e) => setNewLessonData({ ...newLessonData, isFreePreview: e.target.checked })}
                          className="rounded text-[#7388a5] accent-[#7388a5]"
                        />
                        Free Preview
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAddingLessonModuleId(null)}
                          className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-white cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddLesson(mod.id)}
                          className="px-3.5 py-1.5 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Lessons List in Module */}
                  <div className="divide-y divide-slate-100">
                    {(mod.lessons || []).map((lesson, lessonIdx) => {
                      const docs = (lesson.resources || []).filter(r => r.type === 'PDF' || r.type === 'DOCUMENT');
                      const audios = (lesson.resources || []).filter(r => r.type === 'AUDIO');
                      const others = (lesson.resources || []).filter(r => r.type !== 'PDF' && r.type !== 'DOCUMENT' && r.type !== 'AUDIO' && r.type !== 'VIDEO');

                      return (
                        <div
                          key={lesson.id}
                          className="p-4 sm:px-5 sm:py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                        >
                          {/* Lesson Info */}
                          <div className="space-y-1.5 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold text-slate-800">
                                {lesson.title}
                              </span>
                              <span className="font-mono text-[11px] text-slate-400">
                                {lesson.duration}
                              </span>
                              <span
                                className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1 ${
                                  lesson.isFreePreview
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                                }`}
                              >
                                {lesson.isFreePreview ? <Globe className="w-2.5 h-2.5 text-emerald-600" /> : <Lock className="w-2.5 h-2.5 text-slate-400" />}
                                {lesson.isFreePreview ? 'Free Preview' : 'Enrolled Only'}
                              </span>
                            </div>

                            {/* Attached Content Breakdown Pills */}
                            <div className="flex flex-wrap items-center gap-2 pt-0.5">
                              {lesson.video ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-medium">
                                  <Video className="w-3 h-3" />
                                  <span>Video (4K)</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 text-[10px]">
                                  No Video
                                </span>
                              )}

                              {docs.length > 0 && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium">
                                  <FileText className="w-3 h-3" />
                                  <span>{docs.length} Notes/PDF{docs.length > 1 ? 's' : ''}</span>
                                </span>
                              )}

                              {audios.length > 0 && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium">
                                  <Music className="w-3 h-3" />
                                  <span>{audios.length} Audio Stem{audios.length > 1 ? 's' : ''}</span>
                                </span>
                              )}

                              {others.length > 0 && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium">
                                  <ImageIcon className="w-3 h-3" />
                                  <span>{others.length} Material{others.length > 1 ? 's' : ''}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0 self-end lg:self-auto">
                            <button
                              type="button"
                              onClick={() => setActiveEditingLessonData({
                                course: curriculumCourse,
                                module: mod,
                                lesson: lesson
                              })}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eef3f9] hover:bg-[#dfeaf6] border border-[#cbd8e8] text-[#475e7d] text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                            >
                              <Layers className="w-3.5 h-3.5 text-[#7388a5]" />
                              <span>Manage Content & Materials</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteLesson(mod.id, lesson.id)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                              title="Delete Lesson"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {(!mod.lessons || mod.lessons.length === 0) && (
                      <div className="p-8 text-center text-xs text-slate-400">
                        No lessons in this module yet. Click "+ Add Lesson" above.
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {(!curriculumCourse.curriculum || curriculumCourse.curriculum.length === 0) && (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                  <Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">No modules in this course yet</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Click "Add Module" at the top right to start structuring your lessons and materials.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ─── DEFAULT ALL COURSES TABLE VIEW ─── */
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Course Management</h1>
                <p className="text-sm text-slate-500 mt-1">
                  Manage masterclasses, pricing, modules, lessons, and multi-format learning materials
                </p>
              </div>
              <button
                onClick={openCreateModal}
                className="px-4 py-2.5 bg-[#7388a5] hover:bg-[#5f7491] text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" /> Add New Course
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search courses by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5]"
                />
              </div>
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#7388a5] cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Courses Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Course</th>
                      <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden md:table-cell">Category</th>
                      <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden lg:table-cell">Level</th>
                      <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">Price</th>
                      <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden sm:table-cell">Students</th>
                      <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">Status</th>
                      <th className="text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filtered.map((course) => (
                      <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={course.thumbnail}
                              alt=""
                              className="w-12 h-8 rounded-lg object-cover border border-slate-200 shrink-0 hidden sm:block"
                            />
                            <div className="min-w-0">
                              <p
                                onClick={() => setCurriculumCourse(course)}
                                className="text-xs font-semibold text-slate-800 hover:text-[#7388a5] cursor-pointer truncate max-w-[200px] lg:max-w-xs"
                              >
                                {course.title}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {course.curriculum?.length || 0} Modules • {course.lessonsCount} lessons
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 hidden md:table-cell">
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">{course.category}</span>
                        </td>
                        <td className="px-3 py-3.5 hidden lg:table-cell">
                          <span className="text-xs text-slate-600">{course.level}</span>
                        </td>
                        <td className="px-3 py-3.5">
                          <div>
                            <span className="text-xs font-bold text-slate-900">₹{course.price}</span>
                            {course.originalPrice && (
                              <span className="text-[10px] text-slate-400 line-through ml-1">₹{course.originalPrice}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-3.5 hidden sm:table-cell">
                          <span className="text-xs text-slate-600">{course.studentsCount?.toLocaleString() || 0}</span>
                        </td>
                        <td className="px-3 py-3.5">
                          <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${
                            course.published
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}>
                            {course.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setCurriculumCourse(course)}
                              title="Manage Curriculum & Lesson Materials"
                              className="px-2.5 py-1 rounded-lg bg-[#eef3f9] hover:bg-[#dfeaf6] text-[#475e7d] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                            >
                              <Layers className="w-3.5 h-3.5 text-[#7388a5]" />
                              <span className="hidden xl:inline">Curriculum</span>
                            </button>

                            <button
                              onClick={() => togglePublish(course.id)}
                              title={course.published ? 'Unpublish' : 'Publish'}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-[#7388a5] hover:bg-slate-100 cursor-pointer transition-colors"
                            >
                              {course.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => openEditModal(course)}
                              title="Edit"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-[#7388a5] hover:bg-slate-100 cursor-pointer transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(course.id)}
                              title="Delete"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filtered.length === 0 && (
                <div className="p-12 text-center">
                  <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No courses found matching your criteria</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Course Edit/Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="font-bold text-lg text-slate-900">
                {editingCourse ? 'Edit Course Details' : 'Create New Course'}
              </h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs text-slate-600 block mb-1 font-medium">Course Title *</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5]"
                  placeholder="e.g. Piano Fundamentals – Beginner to Intermediate" />
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1 font-medium">Subtitle</label>
                <input type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5]"
                  placeholder="Short compelling summary" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-medium">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5]">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-medium">Level</label>
                  <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5]">
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-medium">Price (₹) *</label>
                  <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5]"
                    placeholder="999" />
                </div>
                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-medium">Original (₹)</label>
                  <input type="number" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5]"
                    placeholder="2499" />
                </div>
                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-medium">Duration</label>
                  <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5]"
                    placeholder="14 Hours" />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1 font-medium">Thumbnail URL</label>
                <input type="text" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5]"
                  placeholder="https://images.unsplash.com/..." />
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1 font-medium">Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5]"
                  placeholder="Course overview and objectives..." />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100">
              <button onClick={() => { setShowModal(false); resetForm(); }}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSaveCourse}
                className="px-4 py-2 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5">
                <Save className="w-3.5 h-3.5" /> Save Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Delete Course</h3>
              <p className="text-xs text-slate-500 mt-1">Are you sure you want to delete this course? This action cannot be undone.</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer">
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Content & Multi-format Resource Modal */}
      {activeEditingLessonData && (
        <LessonContentModal
          isOpen={!!activeEditingLessonData}
          onClose={() => setActiveEditingLessonData(null)}
          course={activeEditingLessonData.course}
          module={activeEditingLessonData.module}
          lesson={activeEditingLessonData.lesson}
          onSaveLesson={handleSaveLessonContent}
        />
      )}
    </AdminLayout>
  );
};
