import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('music_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'jalsa-piano-tutorial',
        type: 'product',
        title: 'Jalsa Piano Tutorial & Sheet Music Pack',
        price: 14,
        originalPrice: 24,
        thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
        category: 'Song Tutorials',
        quantity: 1
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('music_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (item, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p));
      }
      return [...prev, { ...item, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code) => {
    if (code.trim().toUpperCase() === 'MAGICALKEYS20' || code.trim().toUpperCase() === 'MK20') {
      setCouponCode('MAGICALKEYS20');
      return true;
    }
    return false;
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalTotal = cart.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const savingsTotal = Math.max(0, originalTotal - cartTotal);
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const discountPercent = couponCode ? 20 : 0;
  const couponDiscount = couponCode ? Math.round(cartTotal * 0.2) : 0;
  const total = Math.max(0, cartTotal - couponDiscount);
  const discount = savingsTotal + couponDiscount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        subtotal: cartTotal,
        originalTotal,
        savingsTotal,
        discount,
        total,
        itemsCount,
        isCartOpen,
        setIsCartOpen,
        applyCoupon,
        couponCode,
        discountPercent
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
