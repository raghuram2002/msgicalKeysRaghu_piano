import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Music, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { blogs } from '../data/blogs';
import { products } from '../data/products';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
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

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-slate-900/40 backdrop-blur-xs px-4"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-[#7388a5] shrink-0" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Search piano courses, song tutorials, articles, guitar packs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider px-2 py-1 bg-slate-100 text-slate-500 hover:text-slate-800 rounded border border-slate-200 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-xs">
          <span className="text-slate-500 font-medium">Filter:</span>
          {['all', 'courses', 'blogs', 'store'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full font-medium transition-colors capitalize cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#eef3f9] text-[#475e7d] border border-[#cbd8e8]'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
              }`}
            >
              {filter === 'all' ? 'All Results' : filter}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {!hasQuery ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              <p className="font-medium text-slate-700 mb-1">Popular searches</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Piano Fundamentals', 'Bollywood Masterclass', 'Jalsa Tutorial', 'Acoustic Guitar', 'Chord Progressions'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-base text-slate-700 mb-1">No matches found for "{query}"</p>
              <p className="text-xs">Try searching for keywords like piano, guitar, chords, or specific songs.</p>
            </div>
          ) : (
            <>
              {/* Courses Matches */}
              {(activeFilter === 'all' || activeFilter === 'courses') && filteredCourses.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#475e7d] mb-2.5">
                    <Music className="w-3.5 h-3.5" /> Courses ({filteredCourses.length})
                  </div>
                  <div className="space-y-2">
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => handleSelect(`/courses/${course.id}`)}
                        className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-all"
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-14 h-11 object-cover rounded-lg shrink-0 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-slate-800 group-hover:text-[#475e7d] truncate">
                            {course.title}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">
                            {course.instructor.name} · {course.level} · {course.duration}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-slate-900 shrink-0">
                          ${course.price}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#475e7d] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Store Products Matches */}
              {(activeFilter === 'all' || activeFilter === 'store') && filteredProducts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#475e7d] mb-2.5">
                    <ShoppingBag className="w-3.5 h-3.5" /> Store Products ({filteredProducts.length})
                  </div>
                  <div className="space-y-2">
                    {filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleSelect(`/store/${prod.id}`)}
                        className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-all"
                      >
                        <img
                          src={prod.thumbnail}
                          alt={prod.title}
                          className="w-14 h-11 object-cover rounded-lg shrink-0 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-slate-800 group-hover:text-[#475e7d] truncate">
                            {prod.title}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">
                            {prod.category} · {prod.fileFormat}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-slate-900 shrink-0">
                          ${prod.price}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#475e7d] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blogs Matches */}
              {(activeFilter === 'all' || activeFilter === 'blogs') && filteredBlogs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#475e7d] mb-2.5">
                    <BookOpen className="w-3.5 h-3.5" /> Articles & Guides ({filteredBlogs.length})
                  </div>
                  <div className="space-y-2">
                    {filteredBlogs.map((blog) => (
                      <div
                        key={blog.id}
                        onClick={() => handleSelect(`/blogs/${blog.id}`)}
                        className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-all"
                      >
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-14 h-11 object-cover rounded-lg shrink-0 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-slate-800 group-hover:text-[#475e7d] truncate">
                            {blog.title}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">
                            {blog.category} · {blog.readTime}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#475e7d] shrink-0 group-hover:translate-x-0.5 transition-transform" />
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
