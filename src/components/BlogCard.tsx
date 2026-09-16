import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article
      id={`blog-card-${post.id}`}
      className="group flex flex-col bg-[#11131a] border border-[#222634] hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-[#0e1017]/90 text-amber-300 border border-amber-500/30 backdrop-blur-xs">
          {post.category}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-3 text-xs text-zinc-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              {post.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              {post.readTime}
            </span>
          </div>

          <Link to={`/blogs/${post.id}`}>
            <h3 className="font-editorial text-lg font-normal text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-[#1c1f2b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover border border-zinc-700"
            />
            <span className="text-xs text-zinc-300 font-medium">
              {post.author.name}
            </span>
          </div>

          <Link
            to={`/blogs/${post.id}`}
            className="flex items-center gap-1 text-xs font-medium text-amber-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
