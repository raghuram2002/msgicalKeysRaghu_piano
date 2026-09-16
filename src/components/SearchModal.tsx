import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Music, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { blogs } from '../data/blogs';
import { products } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'courses' | 'blogs' | 'store'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle handled by caller
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(normalizedQuery) ||
      c.category.toLowerCase().includes(normalizedQuery) ||
      c.description.toLowerCase().includes(normalizedQuery) ||
      c.instructor.name.toLowerCase().includes(normalizedQuery)
  );

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(normalizedQuery) ||
      b.category.toLowerCase().includes(normalizedQuery) ||
      b.excerpt.toLowerCase().includes(normalizedQuery)
  );

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(normalizedQuery) ||
      p.category.toLowerCase().includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery)
  );

  const hasQuery = normalizedQuery.length > 0;
  const totalResults =
    (activeFilter === 'all' || activeFilter === 'courses' ? filteredCourses.length : 0) +
    (activeFilter === 'all' || activeFilter === 'blogs' ? filteredBlogs.length : 0) +
    (activeFilter === 'all' || activeFilter === 'store' ? filteredProducts.length : 0);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        className="w-full max-w-2xl bg-[#13151b] border border-[#2b303d] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#222634] gap-3">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Search piano courses, song tutorials, articles, guitar packs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-500 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider px-2 py-1 bg-zinc-800 text-zinc-400 hover:text-white rounded border border-zinc-700/50"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0f1015] border-b border-[#222634] text-xs">
          <span className="text-zinc-500 font-medium">Filter:</span>
          {(['all', 'courses', 'blogs', 'store'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full font-medium transition-colors capitalize ${
                activeFilter === filter
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {filter === 'all' ? 'All Results' : filter}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {!hasQuery ? (
            <div className="py-8 text-center text-zinc-500 text-sm">
              <p className="font-medium text-zinc-400 mb-1">Popular searches</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Piano Fundamentals', 'Bollywood Masterclass', 'Jalsa Tutorial', 'Acoustic Guitar', 'Chord Progressions'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-[#1a1d26] hover:bg-zinc-800 text-zinc-300 border border-[#2c3140] transition-colors"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-zinc-500">
              <p className="text-base text-zinc-400 mb-1">No matches found for "{query}"</p>
              <p className="text-xs">Try searching for keywords like piano, guitar, chords, or specific songs.</p>
            </div>
          ) : (
            <>
              {/* Courses Matches */}
              {(activeFilter === 'all' || activeFilter === 'courses') && filteredCourses.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400/90 mb-2.5">
                    <Music className="w-3.5 h-3.5" /> Courses ({filteredCourses.length})
                  </div>
                  <div className="space-y-2">
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => handleSelect(`/courses/${course.id}`)}
                        className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#1c202b] border border-transparent hover:border-[#2e3444] cursor-pointer transition-all"
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-14 h-11 object-cover rounded-lg shrink-0 border border-zinc-700/40"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-zinc-200 group-hover:text-amber-300 truncate">
                            {course.title}
                          </h4>
                          <p className="text-xs text-zinc-500 truncate">
                            {course.instructor.name} · {course.level} · {course.duration}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-amber-400 shrink-0">
                          ${course.price}
                        </span>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Store Products Matches */}
              {(activeFilter === 'all' || activeFilter === 'store') && filteredProducts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400/90 mb-2.5">
                    <ShoppingBag className="w-3.5 h-3.5" /> Store Products ({filteredProducts.length})
                  </div>
                  <div className="space-y-2">
                    {filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleSelect(`/store/${prod.id}`)}
                        className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#1c202b] border border-transparent hover:border-[#2e3444] cursor-pointer transition-all"
                      >
                        <img
                          src={prod.thumbnail}
                          alt={prod.title}
                          className="w-14 h-11 object-cover rounded-lg shrink-0 border border-zinc-700/40"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-zinc-200 group-hover:text-amber-300 truncate">
                            {prod.title}
                          </h4>
                          <p className="text-xs text-zinc-500 truncate">
                            {prod.category} · {prod.fileFormat}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-amber-400 shrink-0">
                          ${prod.price}
                        </span>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blogs Matches */}
              {(activeFilter === 'all' || activeFilter === 'blogs') && filteredBlogs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400/90 mb-2.5">
                    <BookOpen className="w-3.5 h-3.5" /> Articles & Guides ({filteredBlogs.length})
                  </div>
                  <div className="space-y-2">
                    {filteredBlogs.map((blog) => (
                      <div
                        key={blog.id}
                        onClick={() => handleSelect(`/blogs/${blog.id}`)}
                        className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#1c202b] border border-transparent hover:border-[#2e3444] cursor-pointer transition-all"
                      >
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-14 h-11 object-cover rounded-lg shrink-0 border border-zinc-700/40"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-zinc-200 group-hover:text-amber-300 truncate">
                            {blog.title}
                          </h4>
                          <p className="text-xs text-zinc-500 truncate">
                            {blog.category} · {blog.readTime}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
