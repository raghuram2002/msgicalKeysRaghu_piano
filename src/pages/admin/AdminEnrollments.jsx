import React, { useState } from 'react';
import {
  Search,
  GraduationCap,
  ChevronDown
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockEnrollments } from '../../data/adminData';

export const AdminEnrollments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = mockEnrollments.filter(e => {
    const matchSearch = e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = !filterStatus || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Enrollment Management</h1>
          <p className="text-sm text-slate-500 mt-1">{mockEnrollments.length} total enrollments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1">Total</p>
            <p className="text-xl font-bold text-slate-900">{mockEnrollments.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1">Active</p>
            <p className="text-xl font-bold text-blue-600">{mockEnrollments.filter(e => e.status === 'active').length}</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1">Completed</p>
            <p className="text-xl font-bold text-emerald-600">{mockEnrollments.filter(e => e.status === 'completed').length}</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1">Avg. Progress</p>
            <p className="text-xl font-bold text-[#7388a5]">
              {Math.round(mockEnrollments.reduce((s, e) => s + e.progressPercent, 0) / mockEnrollments.length)}%
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search by student or course..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5]" />
          </div>
          <div className="relative">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#7388a5] cursor-pointer">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Student</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">Course</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden md:table-cell">Enrolled</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 hidden sm:table-cell">Progress</th>
                  <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((enr) => (
                  <tr key={enr.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{enr.studentName}</p>
                        <p className="text-[10px] text-slate-400">{enr.studentEmail}</p>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="text-xs text-slate-700 truncate max-w-[200px]">{enr.courseTitle}</p>
                    </td>
                    <td className="px-3 py-3.5 hidden md:table-cell">
                      <span className="text-xs text-slate-500">{enr.enrolledAt}</span>
                    </td>
                    <td className="px-3 py-3.5 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#7388a5] rounded-full" style={{ width: `${enr.progressPercent}%` }} />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600">{enr.progressPercent}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${
                        enr.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>{enr.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-12 text-center">
              <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No enrollments found</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
