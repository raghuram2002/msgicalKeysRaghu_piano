import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RecentItem {
  id: string;
  type: 'course' | 'product';
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  viewedAt: number;
}

interface RecentlyViewedContextType {
  recentlyViewed: RecentItem[];
  addRecentlyViewed: (item: Omit<RecentItem, 'viewedAt'>) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export const RecentlyViewedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentItem[]>(() => {
    try {
      const saved = localStorage.getItem('music_recently_viewed');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('music_recently_viewed', JSON.stringify(recentlyViewed));
    } catch {
      // ignore
    }
  }, [recentlyViewed]);

  const addRecentlyViewed = (item: Omit<RecentItem, 'viewedAt'>) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      return [{ ...item, viewedAt: Date.now() }, ...filtered].slice(0, 8);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};
