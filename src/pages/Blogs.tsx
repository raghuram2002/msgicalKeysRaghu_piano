import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Calendar, Clock, ArrowRight, RotateCcw } from 'lucide-react';
import { blogs } from '../data/blogs';
import { BlogCard } from '../components/BlogCard';

export const Blogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Piano', 'Guitar', 'Music Theory', 'Practice Tips', 'Bollywood Music'];

  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) => {
      const matchesQuery =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = blogs[0];
  const gridPosts = filteredBlogs.filter((p) => selectedCategory !== 'All' || searchQuery ? true : p.id !== featuredPost.id);

  return (
    <div className="min-h-screen bg-white text-slate-800 pt-28 pb-24">
      {/* Top Banner */}
      <div className="border-b border-slate-200 bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#637894] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Editorial & Learning Journal
            </span>
            <h1 className="font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Music Insights & Practice Guides
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              In-depth musical analysis, fingerstyle mechanics, voicing breakdowns, and deliberate practice frameworks from working musicians.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search and Category Filter Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by title, topic, or tags (e.g., voicing, raag, barre)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5] focus:bg-white transition-colors"
              />
            </div>

            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-500 hover:text-[#5f7491] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500 mr-1 hidden sm:inline">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#7388a5] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post Banner (only on default view) */}
        {!searchQuery && selectedCategory === 'All' && featuredPost && (
          <div className="mb-12 rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 hover:border-[#7388a5] transition-all group shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-white/90 backdrop-blur-xs text-[#475e7d] border border-[#cbd8e8] shadow-xs">
                  Featured Masterclass Article
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {featuredPost.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <Link to={`/blogs/${featuredPost.id}`}>
                  <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight group-hover:text-[#5f7491] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-300"
                    />
                    <span className="text-xs text-slate-800 font-semibold">
                      {featuredPost.author.name}
                    </span>
                  </div>

                  <Link
                    to={`/blogs/${featuredPost.id}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#7388a5] hover:text-[#5f7491] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <p>
            Showing <span className="font-semibold text-slate-900">{filteredBlogs.length}</span> articles
          </p>
        </div>

        {/* Blog Grid */}
        {gridPosts.length === 0 ? (
          <div className="p-16 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 max-w-lg mx-auto my-8">
            <h3 className="text-base font-semibold text-slate-900">No articles found</h3>
            <p className="text-xs text-slate-500">
              Try modifying your search keywords or switching category filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
