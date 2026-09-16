export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isFreePreview?: boolean;
  videoUrl?: string;
  notes?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  instrument: string;
  bio: string;
  avatar: string;
  experience: string;
  studentsCount: number;
  rating: number;
  socials?: {
    youtube?: string;
    instagram?: string;
    spotify?: string;
  };
}

export interface CourseReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: 'Piano' | 'Guitar' | 'Music Theory' | 'Bollywood & Indian' | 'Song Mastery';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  featured?: boolean;
  thumbnail: string;
  previewVideoUrl: string;
  instructor: Instructor;
  description: string;
  learningOutcomes: string[];
  requirements: string[];
  curriculum: Module[];
  reviews: CourseReview[];
  tags: string[];
}

export interface BlogAuthor {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Piano' | 'Guitar' | 'Music Theory' | 'Practice Tips' | 'Song Tutorials' | 'Beginner Guides';
  date: string;
  readTime: string;
  coverImage: string;
  author: BlogAuthor;
  tags: string[];
  featured?: boolean;
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: 'Piano Tutorials' | 'Guitar Tutorials' | 'Song Tutorials' | 'Backing Tracks' | 'Practice Resources' | 'Digital Downloads';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  thumbnail: string;
  sampleAudio?: string;
  includes: string[];
  fileFormat: string;
  fileSize: string;
  featured?: boolean;
  reviews: ProductReview[];
}

export interface CartItem {
  id: string;
  type: 'course' | 'product';
  title: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  category: string;
  quantity: number;
}

export interface EnrolledCourseProgress {
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  completedLessonIds: string[];
  lastAccessedLessonId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: EnrolledCourseProgress[];
  purchasedProductIds: string[];
  joinedDate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  courseTaken: string;
  highlight: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
