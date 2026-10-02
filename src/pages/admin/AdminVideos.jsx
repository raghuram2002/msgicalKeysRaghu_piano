import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  X,
  Video,
  Save,
  Upload,
  ChevronDown,
  Film,
  Layers,
  FileText,
  Music,
  ExternalLink
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockVideos } from '../../data/adminData';
import { courses } from '../../data/courses';

export const AdminVideos = () => {
  const [videoList, setVideoList] = useState([...mockVideos]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    title: '', courseId: '', module: '', lessonOrder: 1,
    duration: '', resolution: '4K', status: 'draft'
  });

  const resetForm = () => {
    setFormData({ title: '', courseId: '', module: '', lessonOrder: 1, duration: '', resolution: '4K', status: 'draft' });
    setEditingVideo(null);
  };

  const openCreateModal = () => { resetForm(); setShowModal(true); };

  const openEditModal = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title, courseId: video.courseId, module: video.module,
      lessonOrder: video.lessonOrder, duration: video.duration,
      resolution: video.resolution, status: video.status
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) return;
    const courseMatch = courses.find(c => c.id === formData.courseId);
    if (editingVideo) {
      setVideoList(prev => prev.map(v =>
        v.id === editingVideo.id ? {
          ...v, ...formData,
          lessonOrder: Number(formData.lessonOrder),
          courseTitle: courseMatch?.title || v.courseTitle
        } : v
      ));
    } else {
      const newVideo = {
        id: 'vid_' + Date.now(),
        ...formData,
        lessonOrder: Number(formData.lessonOrder),
        courseTitle: courseMatch?.title || 'Unassigned',
        uploadedAt: new Date().toISOString().split('T')[0],
        fileSize: 'Pending Upload',
        storageUrl: '',
        views: 0,
      };
      setVideoList(prev => [newVideo, ...prev]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (videoId) => {
    setVideoList(prev => prev.filter(v => v.id !== videoId));
    setDeleteConfirm(null);
  };

  const toggleStatus = (videoId) => {
    setVideoList(prev => prev.map(v =>
      v.id === videoId ? { ...v, status: v.status === 'published' ? 'draft' : 'published' } : v
    ));
  };

  const filtered = videoList.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCourse = !filterCourse || v.courseId === filterCourse;
    return matchSearch && matchCourse;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Video & Media Management</h1>
            <p className="text-sm text-slate-500 mt-1">
              {videoList.length} masterclass video lectures mapped to modules and lesson topics
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              to="/admin/courses"
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#7388a5]" />
              <span>Lesson Curriculum & Materials Studio</span>
            </Link>
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 bg-[#7388a5] hover:bg-[#5f7491] text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Upload className="w-4 h-4" /> Upload Video
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search videos..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5]" />
          </div>
          <div className="relative">
            <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#7388a5] cursor-pointer">
              <option value="">All Courses</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Videos Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Video</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden md:table-cell">Course</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden lg:table-cell">Module</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden sm:table-cell">Duration</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden lg:table-cell">Size</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">Status</th>
                  <th className="text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((video) => (
                  <tr key={video.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                          <Film className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate max-w-[180px] lg:max-w-xs">{video.title}</p>
                          <p className="text-[10px] text-slate-400">Order: {video.lessonOrder} · {video.resolution}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 hidden md:table-cell">
                      <span className="text-xs text-slate-600 truncate block max-w-[150px]">{video.courseTitle}</span>
                    </td>
                    <td className="px-3 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-slate-600">{video.module}</span>
                    </td>
                    <td className="px-3 py-3.5 hidden sm:table-cell">
                      <span className="text-xs text-slate-600 font-mono">{video.duration}</span>
                    </td>
                    <td className="px-3 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-slate-500">{video.fileSize}</span>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${
                        video.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>{video.status}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => toggleStatus(video.id)} title={video.status === 'published' ? 'Unpublish' : 'Publish'}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#7388a5] hover:bg-slate-100 cursor-pointer transition-colors">
                          {video.status === 'published' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => openEditModal(video)} title="Edit"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#7388a5] hover:bg-slate-100 cursor-pointer transition-colors">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteConfirm(video.id)} title="Delete"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors">
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
              <Video className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No videos found</p>
            </div>
          )}
        </div>

        {/* Note about video & multi-format resource architecture */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-1">
          <p className="font-semibold flex items-center gap-1.5 text-blue-950">
            <Layers className="w-4 h-4 text-blue-600" /> Lesson Content & External Storage Architecture:
          </p>
          <p className="text-blue-800">
            Every lesson topic supports <strong>Video lectures</strong> along with <strong>PDF notes, practice sheet music, audio practice stems, and diagrams</strong>. Large media files are hosted on external CDNs (Cloudflare Stream & AWS S3) while lesson metadata, access rules (Free Preview vs Enrolled Only), and streaming manifests are secured in the database.
          </p>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="font-bold text-lg text-slate-900">{editingVideo ? 'Edit Video' : 'Upload New Video'}</h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {!editingVideo && (
                <div className="p-8 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-2 bg-slate-50">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-600 font-medium">Drag and drop video file or click to browse</p>
                  <p className="text-[10px] text-slate-400">MP4, MOV, AVI up to 5GB</p>
                  <button className="px-4 py-2 bg-[#7388a5] hover:bg-[#5f7491] text-white text-xs font-semibold rounded-xl cursor-pointer mt-2 shadow-xs">
                    Choose File
                  </button>
                </div>
              )}
              <div>
                <label className="text-xs text-slate-600 block mb-1 font-medium">Video Title *</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5]"
                  placeholder="e.g. Lesson 1: Keyboard Anatomy" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-medium">Course</label>
                  <select value={formData.courseId} onChange={e => setFormData({...formData, courseId: e.target.value})}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#7388a5] cursor-pointer">
                    <option value="">Select course...</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-medium">Module</label>
                  <input type="text" value={formData.module} onChange={e => setFormData({...formData, module: e.target.value})}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5]"
                    placeholder="Module 1" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-medium">Lesson Order</label>
                  <input type="number" value={formData.lessonOrder} onChange={e => setFormData({...formData, lessonOrder: e.target.value})}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5]" />
                </div>
                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-medium">Duration</label>
                  <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5]"
                    placeholder="14:20" />
                </div>
                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-medium">Resolution</label>
                  <select value={formData.resolution} onChange={e => setFormData({...formData, resolution: e.target.value})}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#7388a5] cursor-pointer">
                    <option>4K</option><option>1080p</option><option>720p</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-100">
              <button onClick={() => { setShowModal(false); resetForm(); }}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleSave}
                className="px-5 py-2.5 bg-[#7388a5] hover:bg-[#5f7491] text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-xs">
                <Save className="w-3.5 h-3.5" />
                {editingVideo ? 'Save Changes' : 'Upload Video'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Delete Video?</h3>
            <p className="text-xs text-slate-500">This will permanently remove the video file and all associated metadata.</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-xs">Delete Permanently</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
