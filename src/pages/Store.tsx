import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ShoppingBag, Music, RotateCcw, FileDown } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Store: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('Featured');

  const categories = ['All', 'Song Tutorials', 'Sheet Music', 'MIDI Packs', 'Backing Tracks', 'Guitar Tabs'];
  const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Highest Rated'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((prod) => {
        const matchesQuery =
          prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;

        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Highest Rated') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [searchQuery, selectedCategory, sortBy]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('Featured');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-28 pb-24">
      {/* Top Banner */}
      <div className="border-b border-[#1d212e] bg-[#0e1017] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" /> Digital Music Store
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
              Digital Music Store & Sound Repository
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Download studio-grade song arrangements, notation PDFs, multi-track MIDI stems, and backing tracks crafted for performance and practice.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Category Filter */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#12141c] border border-[#212634] shadow-xl mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by title, artist, or file type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0e1016] border border-[#282d3d] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="w-full md:w-56">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#0e1016] border border-[#282d3d] rounded-xl text-xs sm:text-sm text-zinc-300 focus:outline-none focus:border-amber-500"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    Sort: {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1d212d]">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-zinc-500 mr-1 hidden sm:inline">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-[#181a24] text-zinc-400 hover:text-white border border-[#262a38]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-amber-400 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-zinc-400">
          <p>
            Showing <span className="font-semibold text-white">{filteredProducts.length}</span> digital products
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-16 rounded-2xl bg-[#12141c] border border-[#222634] text-center space-y-4 max-w-lg mx-auto my-8">
            <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 mx-auto">
              <FileDown className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-white">No products found</h3>
            <p className="text-xs text-zinc-400">
              Try adjusting your search terms or selecting a different digital category.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
