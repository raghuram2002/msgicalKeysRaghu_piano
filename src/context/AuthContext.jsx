import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext(undefined);

const DEMO_USER = {
  id: 'usr_demo_101',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  enrolledCourses: [
    {
      courseId: 'piano-fundamentals',
      enrolledAt: '2026-03-01',
      progressPercent: 68,
      completedLessonIds: ['pf-1', 'pf-2', 'pf-3', 'pf-5'],
      lastAccessedLessonId: 'pf-4'
    },
    {
      courseId: 'learn-piano-through-songs',
      enrolledAt: '2026-03-05',
      progressPercent: 25,
      completedLessonIds: ['lps-1'],
      lastAccessedLessonId: 'lps-2'
    }
  ],
  purchasedProductIds: ['jalsa-piano-tutorial'],
  joinedDate: 'February 2026'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('music_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEMO_USER;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('music_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('music_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const loggedUser = await apiService.loginUser(email, password);
      setUser(loggedUser);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const registeredUser = await apiService.registerUser(name, email, password);
      setUser(registeredUser);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = async () => {
    setIsLoading(true);
    try {
      setUser(DEMO_USER);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isEnrolled = (courseId) => {
    if (!user) return false;
    return user.enrolledCourses.some((item) => item.courseId === courseId);
  };

  const enrollInCourse = (courseId) => {
    if (!user) return;
    if (isEnrolled(courseId)) return;

    const newEnrollment = {
      courseId,
      enrolledAt: new Date().toISOString().split('T')[0],
      progressPercent: 0,
      completedLessonIds: [],
      lastAccessedLessonId: undefined
    };

    setUser({
      ...user,
      enrolledCourses: [newEnrollment, ...user.enrolledCourses]
    });
  };

  const updateCourseProgress = (courseId, completedLessonId, totalLessonsInCourse) => {
    if (!user) return;

    const updated = user.enrolledCourses.map((c) => {
      if (c.courseId === courseId) {
        const completed = new Set(c.completedLessonIds);
        completed.add(completedLessonId);
        const percent = Math.min(100, Math.round((completed.size / Math.max(1, totalLessonsInCourse)) * 100));
        return {
          ...c,
          completedLessonIds: Array.from(completed),
          progressPercent: percent,
          lastAccessedLessonId: completedLessonId
        };
      }
      return c;
    });

    setUser({
      ...user,
      enrolledCourses: updated
    });
  };

  const addPurchasedProduct = (productId) => {
    if (!user) return;
    if (user.purchasedProductIds.includes(productId)) return;
    setUser({
      ...user,
      purchasedProductIds: [...user.purchasedProductIds, productId]
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        loginAsDemo,
        logout,
        enrollInCourse,
        enrollCourse: enrollInCourse,
        updateCourseProgress,
        isEnrolled,
        addPurchasedProduct
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
