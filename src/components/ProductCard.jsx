import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Check, FileDown, ArrowRight } from 'lucide-react';
import { Rating } from './Rating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const inCart = cart.some((item) => item.id === product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      type: 'product',
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      thumbnail: product.thumbnail,
      category: product.category
    });
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group flex flex-col bg-white border border-slate-200 hover:border-[#7388a5] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-white/95 text-[#475e7d] border border-slate-200/80 shadow-2xs">
            {product.category}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist({
              id: product.id,
              type: 'product',
              title: product.title,
              category: product.category,
              price: product.price,
              originalPrice: product.originalPrice,
              thumbnail: product.thumbnail,
              rating: product.rating
            });
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 shadow-xs ${
            wishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-slate-500 hover:text-rose-500 hover:bg-white'
          }`}
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
        </button>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[10px] text-slate-700 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
          <FileDown className="w-3 h-3 text-[#7388a5]" />
          <span>{product.fileFormat}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="mb-2">
            <Rating rating={product.rating} count={product.reviewsCount} size="sm" />
          </div>

          <Link to={`/store/${product.id}`}>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-[#5a718f] transition-colors line-clamp-2 mb-1.5">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through text-slate-400">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-medium text-xs transition-colors cursor-pointer ${
                inCart
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-700'
                  : 'bg-[#7388a5] hover:bg-[#5f7491] text-white shadow-xs'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={() => navigate(`/store/${product.id}`)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
              title="View product details"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
