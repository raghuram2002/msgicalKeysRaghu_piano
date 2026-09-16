import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FileDown,
  ShoppingBag,
  Heart,
  CheckCircle2,
  Share2,
  ShieldCheck,
  Play,
  Pause,
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import { Rating } from '../components/Rating';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

export const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();

  const [product, setProduct] = useState<Product | null>(null);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const found = products.find((p) => p.id === productId || p.slug === productId);
    if (found) {
      setProduct(found);
      addRecentlyViewed({
        id: found.id,
        type: 'product',
        title: found.title,
        category: found.category,
        price: found.price,
        thumbnail: found.thumbnail
      });
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-32 pb-24 flex items-center justify-center">
        <div className="text-center p-8 bg-[#12141c] border border-[#212634] rounded-2xl max-w-md">
          <h2 className="font-editorial text-2xl text-white mb-2">Product Not Found</h2>
          <p className="text-xs text-zinc-400 mb-6">
            The requested digital product could not be located.
          </p>
          <Link
            to="/store"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      type: 'product',
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      thumbnail: product.thumbnail,
      category: product.category
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      type: 'product',
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      thumbnail: product.thumbnail,
      category: product.category
    });
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
          <Link to="/store" className="hover:text-amber-400">
            Store
          </Link>
          <span>/</span>
          <span className="text-zinc-500">{product.category}</span>
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#262c3e] bg-zinc-900 shadow-2xl">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-black/80 text-amber-300 border border-amber-500/40">
                {product.category}
              </span>
            </div>

            {/* Audio Preview Simulator Bar */}
            <div className="p-4 rounded-2xl bg-[#13151f] border border-[#252a3a] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingDemo(!isPlayingDemo)}
                  className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 flex items-center justify-center transition-all cursor-pointer shrink-0"
                >
                  {isPlayingDemo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div>
                  <span className="text-xs font-medium text-white block">
                    {isPlayingDemo ? 'Playing Master Demo Track...' : 'Listen to Audio Sample'}
                  </span>
                  <span className="text-[11px] text-zinc-400">00:45 Studio Snippet</span>
                </div>
              </div>

              {/* Progress track animation */}
              <div className="flex-1 max-w-xs h-1.5 bg-zinc-800 rounded-full overflow-hidden hidden sm:block">
                <div
                  className={`h-full bg-amber-400 rounded-full transition-all duration-300 ${
                    isPlayingDemo ? 'w-2/3 animate-pulse' : 'w-0'
                  }`}
                />
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                320kbps MP3
              </span>
            </div>
          </div>

          {/* Product Purchasing Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Rating rating={product.rating} count={product.reviewsCount} size="sm" />
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied' : 'Share'}</span>
                </button>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl text-white font-normal leading-tight">
                {product.title}
              </h1>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price section */}
            <div className="p-5 rounded-2xl bg-[#12141d] border border-[#212634] space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-amber-400">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base line-through text-zinc-500">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                  Instant Download
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#1d212f] hover:bg-[#272d3e] text-zinc-100 border border-[#2d3448] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Buy Now With 1-Click</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    toggleWishlist({
                      id: product.id,
                      type: 'product',
                      title: product.title,
                      category: product.category,
                      price: product.price,
                      originalPrice: product.originalPrice,
                      thumbnail: product.thumbnail,
                      rating: product.rating
                    })
                  }
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    wishlisted
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-[#181a24] text-zinc-400 hover:text-white border-[#2b3040]'
                  }`}
                  title={wishlisted ? 'Saved in wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-400' : ''}`} />
                </button>
              </div>

              <div className="pt-2 text-[11px] text-zinc-400 flex items-center gap-4">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Lifetime download links
                </span>
                <span>·</span>
                <span>Royalty-free personal & performance license</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="space-y-3">
              <h3 className="font-editorial text-xl text-white font-normal">
                What's Included in This Download
              </h3>
              <div className="space-y-2">
                {product.includes.map((inc, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div className="p-4 rounded-2xl bg-[#10121a] border border-[#202434] grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Format</span>
                <span className="text-zinc-200 font-medium">{product.fileFormat}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Download Size</span>
                <span className="text-zinc-200 font-medium">{product.fileSize}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="pt-16 border-t border-[#1d212d]">
          <h3 className="font-editorial text-2xl text-white font-normal mb-8">
            You May Also Enjoy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
