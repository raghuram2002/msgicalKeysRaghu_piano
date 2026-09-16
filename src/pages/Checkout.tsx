import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  QrCode,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Tag,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { courses } from '../data/courses';
import { products } from '../data/products';
import { Course, Product } from '../types';

export const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, enrollCourse } = useAuth();
  const { cart, clearCart, subtotal, discount, total, applyCoupon, couponCode, discountPercent } = useCart();

  const directCourseId = searchParams.get('courseId');
  const directProductId = searchParams.get('productId');

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  // Form fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('884');
  const [cardName, setCardName] = useState(user?.name || 'Maya Chen');
  const [upiId, setUpiId] = useState('student@okhdfcbank');

  // Determine items to checkout
  const directCourse = directCourseId ? courses.find((c) => c.id === directCourseId) : null;
  const directProduct = directProductId ? products.find((p) => p.id === directProductId) : null;

  const checkoutItems = directCourse
    ? [{ id: directCourse.id, type: 'course' as const, title: directCourse.title, price: directCourse.price, thumbnail: directCourse.thumbnail }]
    : directProduct
      ? [{ id: directProduct.id, type: 'product' as const, title: directProduct.title, price: directProduct.price, thumbnail: directProduct.thumbnail }]
      : cart;

  const checkoutSubtotal = directCourse
    ? directCourse.price
    : directProduct
      ? directProduct.price
      : subtotal;

  const checkoutDiscount = couponCode === 'MAGICALKEYS20'
    ? Math.round(checkoutSubtotal * 0.2)
    : directCourse || directProduct
      ? 0
      : discount;

  const finalTotal = Math.max(0, checkoutSubtotal - checkoutDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (couponInput.trim().toUpperCase() === 'MAGICALKEYS20') {
      applyCoupon('MAGICALKEYS20');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try MAGICALKEYS20 for 20% off.');
    }
  };

  const handlePayNow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Auto enroll courses in auth context
      checkoutItems.forEach((item) => {
        if (item.type === 'course') {
          enrollCourse(item.id);
        }
      });

      if (!directCourse && !directProduct) {
        clearCart();
      }

      setIsProcessing(false);
      setStep('success');

      // Auto redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard?tab=courses');
      }, 2500);
    }, 2000);
  };

  if (checkoutItems.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-32 pb-24 flex items-center justify-center">
        <div className="text-center p-8 bg-[#12141c] border border-[#212634] rounded-2xl max-w-md">
          <h2 className="font-editorial text-2xl text-white mb-2">Your Cart is Empty</h2>
          <p className="text-xs text-zinc-400 mb-6">
            You don't have any courses or products in checkout right now.
          </p>
          <Link
            to="/courses"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-32 pb-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#12141c] border border-emerald-500/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
              Payment Successful
            </span>
            <h1 className="font-editorial text-3xl text-white font-normal">
              Enrollment Confirmed!
            </h1>
            <p className="text-xs text-zinc-300">
              Welcome to the Magical Keys Raghu music community. Your course materials and video player are now fully unlocked.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0e1016] border border-[#202534] text-xs text-zinc-400 space-y-1">
            <div className="flex justify-between">
              <span>Receipt Number:</span>
              <span className="text-white font-mono">CAD-994821</span>
            </div>
            <div className="flex justify-between">
              <span>Amount Paid:</span>
              <span className="text-emerald-400 font-bold">${finalTotal}</span>
            </div>
          </div>

          <p className="text-xs text-zinc-500">
            Redirecting to your Student Dashboard in a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-28 pb-24">
      {/* Top Banner */}
      <div className="border-b border-[#1d212e] bg-[#0e1017] py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted Checkout
            </span>
            <h1 className="font-editorial text-2xl sm:text-3xl text-white font-normal mt-1">
              Complete Your Enrollment
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Payment Method & Card Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Payment Method Selector */}
            <div className="p-6 rounded-3xl bg-[#12141c] border border-[#212634] space-y-4">
              <h3 className="font-editorial text-lg text-white font-normal">
                1. Select Payment Method
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${paymentMethod === 'card'
                    ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                    : 'bg-[#181a24] border-[#292e3e] text-zinc-400 hover:text-white'
                    }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs font-semibold">Credit/Debit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${paymentMethod === 'upi'
                    ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                    : 'bg-[#181a24] border-[#292e3e] text-zinc-400 hover:text-white'
                    }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="text-xs font-semibold">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${paymentMethod === 'netbanking'
                    ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                    : 'bg-[#181a24] border-[#292e3e] text-zinc-400 hover:text-white'
                    }`}
                >
                  <Building2 className="w-5 h-5" />
                  <span className="text-xs font-semibold">Net Banking</span>
                </button>
              </div>

              {/* Dynamic Payment Details */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-3 border-t border-[#1e222f]">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0e1016] border border-[#272c3d] rounded-xl text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0e1016] border border-[#272c3d] rounded-xl text-xs sm:text-sm text-white font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#0e1016] border border-[#272c3d] rounded-xl text-xs sm:text-sm text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Security Code (CVV)</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#0e1016] border border-[#272c3d] rounded-xl text-xs sm:text-sm text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-3 pt-3 border-t border-[#1e222f]">
                  <p className="text-xs text-zinc-400">
                    Enter your Virtual Payment Address (VPA) or Google Pay / PhonePe UPI ID:
                  </p>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@okhdfcbank"
                    className="w-full px-4 py-2.5 bg-[#0e1016] border border-[#272c3d] rounded-xl text-xs sm:text-sm text-white font-mono"
                  />
                  <span className="text-[11px] text-zinc-500 block">
                    A collect request will be sent to your UPI app upon clicking Pay.
                  </span>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-3 pt-3 border-t border-[#1e222f]">
                  <label className="text-xs text-zinc-400 block">Select Your Bank</label>
                  <select className="w-full px-4 py-2.5 bg-[#0e1016] border border-[#272c3d] rounded-xl text-xs sm:text-sm text-zinc-200">
                    <option>HDFC Bank</option>
                    <option>State Bank of India</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>JPMorgan Chase / US International</option>
                  </select>
                </div>
              )}
            </div>

            {/* Student Details Guarantee */}
            <div className="p-5 rounded-2xl bg-[#12141c] border border-[#212634] flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant access granted to {user?.email || 'your registered account'}</span>
              </div>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#13151e] border border-[#252b3a] shadow-2xl space-y-6">
              <h3 className="font-editorial text-lg text-white font-normal">
                Order Summary ({checkoutItems.length} {checkoutItems.length === 1 ? 'item' : 'items'})
              </h3>

              {/* Items List */}
              <div className="space-y-3 divide-y divide-[#1e222f]">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover border border-zinc-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-zinc-400 uppercase">
                        {item.type}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-400">
                      ${item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Code Input */}
              <div className="pt-4 border-t border-[#1e222f] space-y-2">
                <label className="text-xs text-zinc-400 block font-medium">
                  Have a Coupon Code? (Try: MAGICALKEYS20)
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MAGICALKEYS20"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-[#0e1016] border border-[#272c3d] rounded-xl text-xs text-white uppercase focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1b1f2b] hover:bg-zinc-800 text-zinc-200 text-xs font-semibold rounded-xl border border-[#2c3243]"
                  >
                    Apply
                  </button>
                </form>
                {couponError && (
                  <p className="text-[11px] text-rose-400">{couponError}</p>
                )}
                {couponCode && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{couponCode}</strong> applied (20% OFF)</span>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-[#1e222f] space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>${checkoutSubtotal}</span>
                </div>
                {checkoutDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-${checkoutDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#1e222f]">
                  <span>Total Due</span>
                  <span className="text-amber-400">${finalTotal}</span>
                </div>
              </div>

              {/* Pay Now CTA */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePayNow}
                id="pay-and-complete-enrollment-button"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-amber-500/15 transition-all cursor-pointer disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ${finalTotal} & Unlock Instant Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-zinc-500 text-center">
                Guaranteed safe checkout. We do not store your raw card credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
