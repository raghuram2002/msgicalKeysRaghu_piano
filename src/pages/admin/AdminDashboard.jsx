import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Video,
  CreditCard,
  TrendingUp,
  GraduationCap,
  ArrowUpRight,
  IndianRupee,
  ShoppingBag
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getAdminStats, mockEnrollments, mockPayments } from '../../data/adminData';

export const AdminDashboard = () => {
  const stats = getAdminStats();

  const statCards = [
    { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'bg-blue-50 text-blue-600 border-blue-200', link: '/admin/students' },
    { label: 'Active Enrollments', value: stats.totalEnrollments, icon: GraduationCap, color: 'bg-emerald-50 text-emerald-600 border-emerald-200', link: '/admin/enrollments' },
    { label: 'Total Courses', value: stats.totalCourses, icon: BookOpen, color: 'bg-violet-50 text-violet-600 border-violet-200', link: '/admin/courses' },
    { label: 'Total Videos', value: stats.totalVideos, icon: Video, color: 'bg-amber-50 text-amber-600 border-amber-200', link: '/admin/videos' },
    { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'bg-emerald-50 text-emerald-700 border-emerald-200', link: '/admin/payments' },
    { label: 'Store Products', value: stats.totalProducts, icon: ShoppingBag, color: 'bg-rose-50 text-rose-600 border-rose-200', link: '/admin/courses' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back! Here's what's happening on Magical Keys.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((card) => (
            <Link
              key={card.label}
              to={card.link}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#7388a5]/40 transition-all shadow-xs group flex items-start justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{card.label}</span>
                <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${card.color} border flex items-center justify-center shrink-0`}>
                <card.icon className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Two-column layout for recent activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Enrollments */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="font-semibold text-sm text-slate-900">Recent Enrollments</h2>
              <Link to="/admin/enrollments" className="text-xs text-[#7388a5] hover:text-[#5f7491] font-medium flex items-center gap-1">
                View All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {stats.recentEnrollments.map((enr) => (
                <div key={enr.id} className="px-5 py-3.5 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{enr.studentName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{enr.courseTitle}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${
                      enr.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {enr.status}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">{enr.enrolledAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="font-semibold text-sm text-slate-900">Recent Payments</h2>
              <Link to="/admin/payments" className="text-xs text-[#7388a5] hover:text-[#5f7491] font-medium flex items-center gap-1">
                View All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {stats.recentPayments.map((pay) => (
                <div key={pay.id} className="px-5 py-3.5 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{pay.studentName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{pay.itemTitle}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-sm font-bold text-emerald-700">₹{pay.amount}</p>
                    <p className="text-[10px] text-slate-400">{pay.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Trend (Placeholder) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm text-slate-900">Revenue Summary</h2>
            <div className="flex items-center gap-1 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold">+24% this month</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-500 mb-1">Course Revenue</p>
              <p className="text-lg font-bold text-slate-900">
                ₹{mockPayments.filter(p => p.itemType === 'course').reduce((s, p) => s + p.amount, 0).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-500 mb-1">Product Revenue</p>
              <p className="text-lg font-bold text-slate-900">
                ₹{mockPayments.filter(p => p.itemType === 'product').reduce((s, p) => s + p.amount, 0).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-500 mb-1">Avg. Order Value</p>
              <p className="text-lg font-bold text-slate-900">
                ₹{Math.round(stats.totalRevenue / mockPayments.length).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-500 mb-1">Total Transactions</p>
              <p className="text-lg font-bold text-slate-900">{mockPayments.length}</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
