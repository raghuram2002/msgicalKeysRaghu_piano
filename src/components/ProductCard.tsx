import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Check, FileDown, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { Rating } from './Rating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const inCart = cart.some((item) => item.id === product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
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
      className="group flex flex-col bg-[#11131a] border border-[#222634] hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-[#0e1017]/90 text-amber-300 border border-amber-500/30 backdrop-blur-xs">
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
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
            wishlisted
              ? 'bg-rose-500/90 text-white'
              : 'bg-black/50 text-zinc-300 hover:text-white hover:bg-black/80'
          }`}
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
        </button>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[10px] text-zinc-300 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-zinc-700/40">
          <FileDown className="w-3 h-3 text-amber-400" />
          <span>{product.fileFormat}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="mb-2">
            <Rating rating={product.rating} count={product.reviewsCount} size="sm" />
          </div>

          <Link to={`/store/${product.id}`}>
            <h3 className="font-editorial text-lg font-normal text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-1.5">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#1c1f2b] space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-amber-400">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through text-zinc-500">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-medium text-xs transition-colors cursor-pointer ${
                inCart
                  ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-300'
                  : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/10'
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
              className="p-2 rounded-xl bg-[#1c202d] hover:bg-zinc-800 text-zinc-300 hover:text-white border border-[#2b3040] transition-colors"
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
