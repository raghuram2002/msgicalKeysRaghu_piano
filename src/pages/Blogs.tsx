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
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-28 pb-24">
      {/* Top Banner */}
      <div className="border-b border-[#1d212e] bg-[#0e1017] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Editorial & Learning Journal
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
              Music Insights & Practice Guides
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              In-depth musical analysis, fingerstyle mechanics, voicing breakdowns, and deliberate practice frameworks from working musicians.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search and Category Filter Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#12141c] border border-[#212634] shadow-xl mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by title, topic, or tags (e.g., voicing, raag, barre)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0e1016] border border-[#282d3d] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs text-zinc-400 hover:text-amber-400 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#1d212d]">
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
        </div>

        {/* Featured Post Banner (only on default view) */}
        {!searchQuery && selectedCategory === 'All' && featuredPost && (
          <div className="mb-12 rounded-3xl overflow-hidden bg-[#12141d] border border-[#222736] hover:border-amber-500/40 transition-all group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-black/80 text-amber-300 border border-amber-500/40">
                  Featured Masterclass Article
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {featuredPost.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <Link to={`/blogs/${featuredPost.id}`}>
                  <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal group-hover:text-amber-300 transition-colors">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                    />
                    <span className="text-xs text-zinc-300 font-medium">
                      {featuredPost.author.name}
                    </span>
                  </div>

                  <Link
                    to={`/blogs/${featuredPost.id}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
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
        <div className="flex items-center justify-between mb-6 text-xs text-zinc-400">
          <p>
            Showing <span className="font-semibold text-white">{filteredBlogs.length}</span> articles
          </p>
        </div>

        {/* Blog Grid */}
        {gridPosts.length === 0 ? (
          <div className="p-16 rounded-2xl bg-[#12141c] border border-[#222634] text-center space-y-3 max-w-lg mx-auto my-8">
            <h3 className="text-base font-semibold text-white">No articles found</h3>
            <p className="text-xs text-zinc-400">
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
