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
import { Rating } from '../components/Rating';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

export const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();

  const [product, setProduct] = useState(null);
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
      <div className="min-h-screen bg-white text-slate-800 pt-32 pb-24 flex items-center justify-center">
        <div className="text-center p-8 bg-slate-50 border border-slate-200 rounded-2xl max-w-md shadow-xs">
          <h2 className="font-bold text-2xl text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-xs text-slate-500 mb-6">
            The requested digital product could not be located.
          </p>
          <Link
            to="/store"
            className="px-5 py-2.5 bg-[#7388a5] hover:bg-[#5f7491] text-white font-semibold text-xs rounded-xl"
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
    <div className="min-h-screen bg-white text-slate-800 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link to="/store" className="hover:text-[#7388a5] transition-colors">
            Store
          </Link>
          <span>/</span>
          <span className="text-slate-400">{product.category}</span>
          <span>/</span>
          <span className="text-slate-800 font-medium truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-white/90 backdrop-blur-xs text-[#475e7d] border border-[#cbd8e8] shadow-xs">
                {product.category}
              </span>
            </div>

            {/* Audio Preview Simulator Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingDemo(!isPlayingDemo)}
                  className="w-10 h-10 rounded-full bg-[#7388a5] hover:bg-[#5f7491] text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  {isPlayingDemo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">
                    {isPlayingDemo ? 'Playing Master Demo Track...' : 'Listen to Audio Sample'}
                  </span>
                  <span className="text-[11px] text-slate-500">00:45 Studio Snippet</span>
                </div>
              </div>

              {/* Progress track animation */}
              <div className="flex-1 max-w-xs h-1.5 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                <div
                  className={`h-full bg-[#7388a5] rounded-full transition-all duration-300 ${
                    isPlayingDemo ? 'w-2/3 animate-pulse' : 'w-0'
                  }`}
                />
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-600 font-medium">
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
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied' : 'Share'}</span>
                </button>
              </div>

              <h1 className="font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                {product.title}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price section */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-slate-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base line-through text-slate-400">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-semibold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                  Instant Download
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#7388a5] hover:bg-[#5f7491] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
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
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-white text-slate-500 hover:text-slate-800 border-slate-300'
                  }`}
                  title={wishlisted ? 'Saved in wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-4">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Lifetime download links
                </span>
                <span>·</span>
                <span>Royalty-free personal & performance license</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="space-y-3">
              <h3 className="font-bold text-xl text-slate-900 tracking-tight">
                What's Included in This Download
              </h3>
              <div className="space-y-2">
                {product.includes.map((inc, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#7388a5] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Format</span>
                <span className="text-slate-800 font-medium">{product.fileFormat}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Download Size</span>
                <span className="text-slate-800 font-medium">{product.fileSize}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="pt-16 border-t border-slate-200">
          <h3 className="font-bold text-2xl text-slate-900 tracking-tight mb-8">
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
