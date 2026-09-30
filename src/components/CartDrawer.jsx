import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    originalTotal,
    savingsTotal,
    itemsCount
  } = useCart();

  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'MAGICALKEYS20' || coupon.trim().toUpperCase() === 'MK20') {
      setCouponApplied(true);
      setCouponDiscount(Math.round(cartTotal * 0.2));
    } else {
      alert('Invalid coupon code. Try MAGICALKEYS20 for 20% off!');
    }
  };

  const finalTotal = Math.max(0, cartTotal - couponDiscount);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-container"
        className="w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#7388a5]" />
            <h3 className="text-lg font-semibold text-slate-900">
              Your Cart ({itemsCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            id="close-cart-button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center" id="empty-cart-state">
            <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h4 className="text-base font-semibold text-slate-800 mb-1">Your cart is empty</h4>
            <p className="text-sm text-slate-500 max-w-xs mb-6">
              Explore our structured music courses and digital sheet music packs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/courses');
                }}
                className="px-4 py-2 bg-[#7388a5] hover:bg-[#5f7491] text-white font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                Browse Courses
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/store');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                Explore Store
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                className="flex gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg shrink-0 border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-white text-[#475e7d] border border-slate-200 inline-block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-semibold text-slate-800 truncate mb-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        ${item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs line-through text-slate-400">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {item.type === 'product' && (
                        <div className="flex items-center border border-slate-300 rounded-md bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-slate-500 hover:text-slate-800"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs px-2 font-medium text-slate-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-slate-500 hover:text-slate-800"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon Code Input */}
            <div className="pt-2">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. MAGICALKEYS20)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    disabled={couponApplied}
                    className="w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5] disabled:opacity-60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponApplied || !coupon.trim()}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  {couponApplied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : 'Apply'}
                </button>
              </form>
              {couponApplied && (
                <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" /> 20% Discount applied! Saved ${couponDiscount}.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Original Value</span>
                <span className="line-through text-slate-400">${originalTotal}</span>
              </div>
              {savingsTotal > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Academy Bundle Savings</span>
                  <span>-${savingsTotal}</span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#475e7d] font-medium">
                  <span>Coupon Discount</span>
                  <span>-${couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-semibold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-[#3a5273] text-lg font-bold">${finalTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              id="proceed-to-checkout-button"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#7388a5] hover:bg-[#5f7491] text-white font-medium text-sm rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-400 text-center">
              Instant digital delivery & lifetime course access. 30-day money-back guarantee.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
