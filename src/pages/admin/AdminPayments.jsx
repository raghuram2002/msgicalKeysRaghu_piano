import React, { useState } from 'react';
import {
  Search,
  CreditCard,
  IndianRupee,
  Calendar,
  Download,
  Filter,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  X,
  ArrowUpRight,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockPayments } from '../../data/adminData';

export const AdminPayments = () => {
  const [paymentsList, setPaymentsList] = useState([...mockPayments]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Computed summary metrics
  const totalRevenue = paymentsList
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const courseRevenue = paymentsList
    .filter((p) => p.status === 'completed' && p.itemType === 'course')
    .reduce((sum, p) => sum + p.amount, 0);

  const productRevenue = paymentsList
    .filter((p) => p.status === 'completed' && p.itemType === 'product')
    .reduce((sum, p) => sum + p.amount, 0);

  const avgOrderValue = paymentsList.length > 0 ? Math.round(totalRevenue / paymentsList.length) : 0;

  // Filtered transactions
  const filtered = paymentsList.filter((p) => {
    const matchSearch =
      p.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.itemTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType = !filterType || p.itemType === filterType;
    const matchMethod = !filterMethod || p.method === filterMethod;
    const matchStatus = !filterStatus || p.status === filterStatus;

    return matchSearch && matchType && matchMethod && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Payments & Revenue
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track student transactions, payment gateways, and platform earnings
            </p>
          </div>
          <button
            onClick={() => {
              // Simulated CSV export
              const csvContent =
                'data:text/csv;charset=utf-8,' +
                ['Transaction ID,Student,Email,Item,Amount,Method,Status,Date']
                  .concat(
                    paymentsList.map(
                      (p) =>
                        `"${p.transactionId}","${p.studentName}","${p.studentEmail}","${p.itemTitle}",${p.amount},"${p.method}","${p.status}","${p.date}"`
                    )
                  )
                  .join('\n');
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement('a');
              link.setAttribute('href', encodedUri);
              link.setAttribute('download', `magical_keys_payments_${new Date().toISOString().split('T')[0]}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export CSV
          </button>
        </div>

        {/* Revenue Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Total Revenue
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 100% verified settlement
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Course Sales
              </span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              ₹{courseRevenue.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-slate-500">
              {paymentsList.filter((p) => p.itemType === 'course').length} course enrollments
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Digital Store Sales
              </span>
              <div className="w-7 h-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              ₹{productRevenue.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-slate-500">
              {paymentsList.filter((p) => p.itemType === 'product').length} sheets & presets sold
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Avg. Order Value
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              ₹{avgOrderValue.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-slate-500">
              Across {paymentsList.length} transactions
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Txn ID, student name, email, or item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter by Item Type */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#7388a5] cursor-pointer"
              >
                <option value="">All Items</option>
                <option value="course">Courses</option>
                <option value="product">Digital Store</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter by Payment Method */}
            <div className="relative">
              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#7388a5] cursor-pointer"
              >
                <option value="">All Methods</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter by Status */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#7388a5] cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-5">
                    Transaction ID
                  </th>
                  <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                    Student
                  </th>
                  <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                    Item Purchased
                  </th>
                  <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                    Method
                  </th>
                  <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                    Date
                  </th>
                  <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                    Amount
                  </th>
                  <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                    Status
                  </th>
                  <th className="text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-5">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-5">
                      <span className="font-mono text-xs font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                        {payment.transactionId}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {payment.studentName}
                        </p>
                        <p className="text-[11px] text-slate-400">{payment.studentEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                            payment.itemType === 'course'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-violet-50 text-violet-700 border border-violet-200'
                          }`}
                        >
                          {payment.itemType}
                        </span>
                        <p className="text-xs text-slate-700 font-medium truncate">
                          {payment.itemTitle}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs text-slate-600 font-medium bg-slate-100 px-2 py-1 rounded-lg">
                        {payment.method}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs text-slate-500">{payment.date}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs font-bold text-slate-900">
                        ₹{payment.amount.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${
                          payment.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : payment.status === 'refunded'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {payment.status === 'completed' && <CheckCircle2 className="w-2.5 h-2.5" />}
                        {payment.status === 'pending' && <Clock className="w-2.5 h-2.5" />}
                        {payment.status === 'refunded' && <AlertCircle className="w-2.5 h-2.5" />}
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="text-xs text-[#7388a5] hover:text-[#5f7491] font-semibold cursor-pointer hover:underline"
                      >
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-xs text-slate-400">
                      No payment transactions found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Receipt / Invoice Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#7388a5] tracking-wider">
                    Official Tax Invoice & Receipt
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {selectedPayment.transactionId}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Status & Date */}
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">
                      Payment Date
                    </p>
                    <p className="font-semibold text-slate-800">{selectedPayment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">
                      Gateway Status
                    </p>
                    <span className="inline-block mt-0.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {selectedPayment.status}
                    </span>
                  </div>
                </div>

                {/* Billed To */}
                <div className="p-3.5 rounded-xl border border-slate-100 space-y-1">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Billed To</p>
                  <p className="font-bold text-slate-900">{selectedPayment.studentName}</p>
                  <p className="text-slate-500">{selectedPayment.studentEmail}</p>
                  <p className="text-slate-400 text-[11px]">ID: {selectedPayment.studentId}</p>
                </div>

                {/* Item Details */}
                <div className="p-3.5 rounded-xl border border-slate-100 space-y-2">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">
                    Purchased Item
                  </p>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#7388a5] bg-blue-50 px-1.5 py-0.5 rounded mr-1.5">
                        {selectedPayment.itemType}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {selectedPayment.itemTitle}
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 shrink-0">
                      ₹{selectedPayment.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Payment Breakdown */}
                <div className="space-y-1.5 border-t border-slate-100 pt-3">
                  <div className="flex justify-between text-slate-500">
                    <span>Payment Gateway</span>
                    <span className="font-medium text-slate-700">
                      Razorpay ({selectedPayment.method})
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>GST (18% inclusive)</span>
                    <span className="font-medium text-slate-700">
                      ₹{Math.round((selectedPayment.amount * 18) / 118).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-100 pt-2">
                    <span>Total Paid</span>
                    <span className="text-[#7388a5]">
                      ₹{selectedPayment.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedPayment(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Receipt downloaded for ${selectedPayment.transactionId}`);
                    setSelectedPayment(null);
                  }}
                  className="px-4 py-2 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
