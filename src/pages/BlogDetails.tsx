import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  Music,
  CheckCircle2
} from 'lucide-react';
import { blogs } from '../data/blogs';
import { BlogPost } from '../types';
import { BlogCard } from '../components/BlogCard';

export const BlogDetails: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const found = blogs.find((b) => b.id === blogId || b.slug === blogId);
    if (found) {
      setPost(found);
    }
  }, [blogId]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-32 pb-24 flex items-center justify-center">
        <div className="text-center p-8 bg-[#12141c] border border-[#212634] rounded-2xl max-w-md">
          <h2 className="font-editorial text-2xl text-white mb-2">Article Not Found</h2>
          <p className="text-xs text-zinc-400 mb-6">
            The article you requested could not be located.
          </p>
          <Link
            to="/blogs"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl"
          >
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogs.filter((b) => b.id !== post.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-28 pb-24">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
            {post.category}
          </span>
          <span className="text-zinc-600">·</span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            {post.date}
          </span>
          <span className="text-zinc-600">·</span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            {post.readTime}
          </span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-serif italic">
          "{post.excerpt}"
        </p>

        {/* Author Bio Bar */}
        <div className="pt-4 pb-6 border-y border-[#1d212d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
            />
            <div>
              <span className="text-xs font-semibold text-white block">
                {post.author.name}
              </span>
              <span className="text-[11px] text-zinc-400">
                {post.author.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl bg-[#141620] hover:bg-zinc-800 text-zinc-300 border border-[#262b3a] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="aspect-[16/9] rounded-3xl overflow-hidden border border-[#222736] shadow-2xl">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-zinc-300 text-base leading-relaxed">
        {post.content.split('\n\n').map((para, idx) => {
          if (para.startsWith('### ')) {
            return (
              <h3 key={idx} className="font-editorial text-2xl text-white pt-6 pb-1">
                {para.replace('### ', '')}
              </h3>
            );
          }
          if (para.startsWith('- ')) {
            const items = para.split('\n');
            return (
              <ul key={idx} className="space-y-2 pl-2">
                {items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item.replace('- ', '')}</span>
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-zinc-300 font-normal">
              {para}
            </p>
          );
        })}

        {/* Tags */}
        <div className="pt-8 border-t border-[#1d212d] flex flex-wrap gap-2">
          <span className="text-xs text-zinc-500 mr-2 py-1">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-lg bg-[#141722] text-amber-300 border border-[#262c3d]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Course CTA Banner */}
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#171a25] to-[#10121a] border border-[#2a3042] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400">
              Apply This Technique
            </span>
            <h4 className="font-editorial text-xl text-white font-normal">
              Want Hands-On Video Feedback?
            </h4>
            <p className="text-xs text-zinc-400 max-w-md">
              Learn these exact harmonic voicings in our structured courses with downloadable practice stems and overhead camera views.
            </p>
          </div>
          <Link
            to="/courses"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl shadow-lg shadow-amber-500/15 transition-colors whitespace-nowrap"
          >
            Explore Masterclasses
          </Link>
        </div>
      </main>

      {/* Related Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-[#1d212d]">
        <h3 className="font-editorial text-2xl text-white font-normal mb-8">
          Related Articles & Lessons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {relatedPosts.map((rel) => (
            <BlogCard key={rel.id} post={rel} />
          ))}
        </div>
      </section>
    </div>
  );
};
