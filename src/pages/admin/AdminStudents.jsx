import React, { useState } from 'react';
import {
  Search,
  Users,
  Mail,
  ChevronDown,
  Eye,
  X,
  BookOpen,
  Calendar,
  CreditCard
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockStudents } from '../../data/adminData';

export const AdminStudents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filtered = mockStudents.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = !filterStatus || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Management</h1>
          <p className="text-sm text-slate-500 mt-1">{mockStudents.length} registered students</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search by name or email..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5]" />
          </div>
          <div className="relative">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#7388a5] cursor-pointer">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Student</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden md:table-cell">Email</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden lg:table-cell">Joined</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden sm:table-cell">Courses</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden lg:table-cell">Total Spent</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">Status</th>
                  <th className="text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={student.avatar} alt="" className="w-8 h-8 rounded-xl object-cover border border-slate-200 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 hidden md:table-cell">
                      <span className="text-xs text-slate-600">{student.email}</span>
                    </td>
                    <td className="px-3 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-slate-500">{student.joinedDate}</span>
                    </td>
                    <td className="px-3 py-3.5 hidden sm:table-cell">
                      <span className="text-xs font-semibold text-slate-700">{student.enrolledCourseIds.length}</span>
                    </td>
                    <td className="px-3 py-3.5 hidden lg:table-cell">
                      <span className="text-xs font-bold text-slate-900">₹{student.totalSpent.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${
                        student.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>{student.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button onClick={() => setSelectedStudent(student)} title="View Details"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#7388a5] hover:bg-slate-100 cursor-pointer transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No students found</p>
            </div>
          )}
        </div>
      </div>

      {/* Student Detail Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-end">
          <div className="w-full max-w-md h-full bg-white border-l border-slate-200 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h2 className="font-bold text-lg text-slate-900">Student Details</h2>
              <button onClick={() => setSelectedStudent(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-6">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <img src={selectedStudent.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover border-2 border-[#7388a5]" />
                <div>
                  <h3 className="font-bold text-base text-slate-900">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-500">{selectedStudent.email}</p>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md mt-1 inline-block ${
                    selectedStudent.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>{selectedStudent.status}</span>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-medium">Joined</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800">{selectedStudent.joinedDate}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-medium">Total Spent</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-700">₹{selectedStudent.totalSpent.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-medium">Enrolled</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800">{selectedStudent.enrolledCourseIds.length} courses</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-medium">Last Active</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800">{selectedStudent.lastActive}</p>
                </div>
              </div>

              {/* Enrolled Courses */}
              <div>
                <h4 className="text-xs font-semibold text-slate-900 mb-3 uppercase tracking-wider">Enrolled Courses</h4>
                <div className="space-y-2">
                  {selectedStudent.enrolledCourseIds.length === 0 ? (
                    <p className="text-xs text-slate-400">No courses enrolled</p>
                  ) : (
                    selectedStudent.enrolledCourseIds.map(id => (
                      <div key={id} className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-medium">
                        {id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Purchased Products */}
              <div>
                <h4 className="text-xs font-semibold text-slate-900 mb-3 uppercase tracking-wider">Purchased Products</h4>
                <div className="space-y-2">
                  {selectedStudent.purchasedProductIds.length === 0 ? (
                    <p className="text-xs text-slate-400">No products purchased</p>
                  ) : (
                    selectedStudent.purchasedProductIds.map(id => (
                      <div key={id} className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-medium">
                        {id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
