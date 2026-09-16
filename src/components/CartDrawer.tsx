import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
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

  const handleApplyCoupon = (e: React.FormEvent) => {
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
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex justify-end"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-container"
        className="w-full max-w-md bg-[#101218] border-l border-[#242834] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#202430]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-editorial text-lg text-white font-normal">
              Your Cart ({itemsCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            id="close-cart-button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center" id="empty-cart-state">
            <div className="w-16 h-16 rounded-full bg-[#181a22] border border-[#262a37] flex items-center justify-center text-zinc-500 mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h4 className="text-base font-medium text-zinc-200 mb-1">Your cart is empty</h4>
            <p className="text-sm text-zinc-500 max-w-xs mb-6">
              Explore our structured music courses and digital sheet music packs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/courses');
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-sm rounded-lg transition-colors"
              >
                Browse Courses
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/store');
                }}
                className="px-4 py-2 bg-[#1b1f2b] hover:bg-[#252a3a] text-zinc-300 font-medium text-sm rounded-lg border border-[#2b3040] transition-colors"
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
                className="flex gap-3.5 p-3 rounded-xl bg-[#151720] border border-[#222634]"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg shrink-0 border border-zinc-700/30"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-zinc-800 text-amber-400/90 inline-block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-medium text-zinc-200 truncate mb-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-amber-400">
                        ${item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs line-through text-zinc-500">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {item.type === 'product' && (
                        <div className="flex items-center border border-zinc-700/60 rounded-md bg-[#101218]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-zinc-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs px-2 font-medium text-zinc-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-zinc-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
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
                  <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. MAGICALKEYS20)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    disabled={couponApplied}
                    className="w-full pl-8 pr-3 py-2 bg-[#151720] border border-[#222634] rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 disabled:opacity-60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponApplied || !coupon.trim()}
                  className="px-3 py-2 bg-[#202534] hover:bg-[#2c3246] disabled:opacity-50 text-xs font-medium text-zinc-300 rounded-lg transition-colors"
                >
                  {couponApplied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Apply'}
                </button>
              </form>
              {couponApplied && (
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" /> 20% Discount applied! Saved ${couponDiscount}.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#202430] bg-[#0c0d12] space-y-3">
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Original Value</span>
                <span className="line-through">${originalTotal}</span>
              </div>
              {savingsTotal > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Academy Bundle Savings</span>
                  <span>-${savingsTotal}</span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="flex justify-between text-amber-400 font-medium">
                  <span>Coupon Discount</span>
                  <span>-${couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-zinc-800/80">
                <span>Total Amount</span>
                <span className="text-amber-400 text-lg">${finalTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              id="proceed-to-checkout-button"
              className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm rounded-xl shadow-lg shadow-amber-500/10 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-zinc-500 text-center">
              Instant digital delivery & lifetime course access. 30-day money-back guarantee.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
