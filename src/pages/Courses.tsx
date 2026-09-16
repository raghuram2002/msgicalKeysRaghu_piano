import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Music, RotateCcw } from 'lucide-react';
import { courses } from '../data/courses';
import { CourseCard } from '../components/CourseCard';
import { PreviewVideoModal } from '../components/PreviewVideoModal';
import { Course } from '../types';

export const Courses: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPreviewCourse, setSelectedPreviewCourse] = useState<Course | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || 'All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const lvl = searchParams.get('level');
    if (lvl) setSelectedLevel(lvl);
  }, [searchParams]);

  const categories = ['All', 'Piano', 'Guitar', 'Bollywood & Indian', 'Song Mastery', 'Music Theory'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Highest Rated', 'Most Popular'];

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Search
        const matchesQuery =
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Category
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

        // Level
        const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel || course.level === 'All Levels';

        // Price
        let matchesPrice = true;
        if (priceRange === 'under70') matchesPrice = course.price < 70;
        else if (priceRange === '70to90') matchesPrice = course.price >= 70 && course.price <= 90;
        else if (priceRange === 'over90') matchesPrice = course.price > 90;

        return matchesQuery && matchesCategory && matchesLevel && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Highest Rated') return b.rating - a.rating;
        if (sortBy === 'Most Popular') return b.studentsCount - a.studentsCount;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [searchQuery, selectedCategory, selectedLevel, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setPriceRange('All');
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
              <Music className="w-3.5 h-3.5" /> Academy Course Catalog
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
              Learn. Practice. Play.
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Browse our complete library of structured piano and guitar masterclasses, step-by-step song curricula, and Indian melody blueprints.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#12141c] border border-[#212634] shadow-xl mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title, instructor, or technique..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0e1016] border border-[#282d3d] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Level selector */}
            <div className="md:col-span-3">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#0e1016] border border-[#282d3d] rounded-xl text-xs sm:text-sm text-zinc-300 focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Skill Levels</option>
                <option value="Beginner">Beginner Only</option>
                <option value="Intermediate">Intermediate Only</option>
                <option value="Advanced">Advanced Only</option>
              </select>
            </div>

            {/* Sort selector */}
            <div className="md:col-span-3">
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

          {/* Category Chips & Price Filter */}
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

            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-500">Price:</span>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-[#181a24] border border-[#262a38] rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none"
              >
                <option value="All">All Prices</option>
                <option value="under70">Under $70</option>
                <option value="70to90">$70 - $90</option>
                <option value="over90">$90+</option>
              </select>

              {(searchQuery || selectedCategory !== 'All' || selectedLevel !== 'All' || priceRange !== 'All') && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-zinc-400 hover:text-amber-400 transition-colors ml-2"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-zinc-400">
          <p>
            Showing <span className="font-semibold text-white">{filteredCourses.length}</span> courses
            {selectedCategory !== 'All' && <span> in "{selectedCategory}"</span>}
          </p>
        </div>

        {/* Course Grid or Empty State */}
        {filteredCourses.length === 0 ? (
          <div className="p-16 rounded-2xl bg-[#12141c] border border-[#222634] text-center space-y-4 max-w-lg mx-auto my-8">
            <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 mx-auto">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-white">No courses match your filters</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We couldn't find any courses matching your specific criteria. Try resetting the filters or searching for terms like "piano", "guitar", or "chords".
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onPreviewClick={(c) => setSelectedPreviewCourse(c)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Free Sample Lesson Preview Modal */}
      <PreviewVideoModal
        course={selectedPreviewCourse}
        isOpen={!!selectedPreviewCourse}
        onClose={() => setSelectedPreviewCourse(null)}
      />
    </div>
  );
};
