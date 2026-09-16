import { courses } from '../data/courses';
import { blogs } from '../data/blogs';
import { products } from '../data/products';
import { instructors } from '../data/instructors';
import { faqs } from '../data/faqs';
import { testimonials } from '../data/testimonials';
import { Course, BlogPost, Product, User, Instructor, FAQItem, Testimonial } from '../types';

// Simulated network latency helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // Courses API
  async getCourses(): Promise<Course[]> {
    await delay(100);
    return [...courses];
  },

  async getCourseById(id: string): Promise<Course | null> {
    await delay(80);
    const course = courses.find((c) => c.id === id || c.slug === id);
    return course ? { ...course } : null;
  },

  async getFeaturedCourses(): Promise<Course[]> {
    await delay(80);
    return courses.filter((c) => c.featured);
  },

  // Blogs API
  async getBlogs(): Promise<BlogPost[]> {
    await delay(100);
    return [...blogs];
  },

  async getBlogById(id: string): Promise<BlogPost | null> {
    await delay(80);
    const blog = blogs.find((b) => b.id === id || b.slug === id);
    return blog ? { ...blog } : null;
  },

  // Products API
  async getProducts(): Promise<Product[]> {
    await delay(100);
    return [...products];
  },

  async getProductById(id: string): Promise<Product | null> {
    await delay(80);
    const product = products.find((p) => p.id === id || p.slug === id);
    return product ? { ...product } : null;
  },

  // Instructors, FAQs, Testimonials
  async getInstructors(): Promise<Instructor[]> {
    return [...instructors];
  },

  async getFAQs(): Promise<FAQItem[]> {
    return [...faqs];
  },

  async getTestimonials(): Promise<Testimonial[]> {
    return [...testimonials];
  },

  // Auth API
  async loginUser(email: string, _password?: string): Promise<User> {
    await delay(300);
    const stored = localStorage.getItem('music_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.email === email) return parsed;
    }
    const defaultUser: User = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'Student Musician',
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      enrolledCourses: [
        {
          courseId: 'piano-fundamentals',
          enrolledAt: '2026-03-01',
          progressPercent: 68,
          completedLessonIds: ['pf-1', 'pf-2', 'pf-3', 'pf-5'],
          lastAccessedLessonId: 'pf-4'
        }
      ],
      purchasedProductIds: ['jalsa-piano-tutorial'],
      joinedDate: 'March 2026'
    };
    return defaultUser;
  },

  async registerUser(name: string, email: string, _password?: string): Promise<User> {
    await delay(300);
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      enrolledCourses: [],
      purchasedProductIds: [],
      joinedDate: 'March 2026'
    };
    return newUser;
  },

  // Payment & Enrollment simulation
  async processPayment(_paymentDetails: {
    method: string;
    amount: number;
    itemType: 'course' | 'cart';
    itemIds: string[];
  }): Promise<{ success: boolean; transactionId: string }> {
    await delay(1200); // realistic payment gateway delay
    return {
      success: true,
      transactionId: 'TXN-' + Math.random().toString(36).substring(2, 9).toUpperCase()
    };
  }
};
