import React from 'react';
import { Star } from 'lucide-react';

export const Rating = ({
  rating,
  count,
  size = 'sm',
  showCount = true
}) => {
  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-semibold'
  };

  return (
    <div className="flex items-center gap-1.5" id={`rating-${rating}`}>
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSizes[size]} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-300 fill-slate-100'
            }`}
          />
        ))}
      </div>
      <span className={`font-medium text-amber-600 ${textSizes[size]}`}>
        {rating.toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span className="text-xs text-slate-500">({count})</span>
      )}
    </div>
  );
};
