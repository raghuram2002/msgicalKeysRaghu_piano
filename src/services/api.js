import { courses } from '../data/courses';
import { blogs } from '../data/blogs';
import { products } from '../data/products';
import { instructors } from '../data/instructors';
import { faqs } from '../data/faqs';
import { testimonials } from '../data/testimonials';

// Simulated network latency helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // Courses API
  async getCourses() {
    await delay(100);
    return [...courses];
  },

  async getCourseById(id) {
    await delay(80);
    const course = courses.find((c) => c.id === id || c.slug === id);
    return course ? { ...course } : null;
  },

  async getFeaturedCourses() {
    await delay(80);
    return courses.filter((c) => c.featured);
  },

  // Blogs API
  async getBlogs() {
    await delay(100);
    return [...blogs];
  },

  async getBlogById(id) {
    await delay(80);
    const blog = blogs.find((b) => b.id === id || b.slug === id);
    return blog ? { ...blog } : null;
  },

  // Products API
  async getProducts() {
    await delay(100);
    return [...products];
  },

  async getProductById(id) {
    await delay(80);
    const product = products.find((p) => p.id === id || p.slug === id);
    return product ? { ...product } : null;
  },

  // Instructors, FAQs, Testimonials
  async getInstructors() {
    return [...instructors];
  },

  async getFAQs() {
    return [...faqs];
  },

  async getTestimonials() {
    return [...testimonials];
  },

  // Auth API
  async loginUser(email, _password) {
    await delay(300);
    const stored = localStorage.getItem('music_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.email === email) return parsed;
    }
    const defaultUser = {
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

  async registerUser(name, email, _password) {
    await delay(300);
    const newUser = {
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
  async processPayment(_paymentDetails) {
    await delay(1200); // realistic payment gateway delay
    return {
      success: true,
      transactionId: 'TXN-' + Math.random().toString(36).substring(2, 9).toUpperCase()
    };
  }
};
