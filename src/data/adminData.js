// Mock admin data store for the Admin Dashboard
// In a production app, this would come from a real backend/database

import { courses } from './courses';
import { products } from './products';

// ─── Mock Students ───────────────────────────────────────────────────────────
export const mockStudents = [
  {
    id: 'usr_demo_101',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    status: 'active',
    joinedDate: '2026-02-15',
    enrolledCourseIds: ['piano-fundamentals', 'learn-piano-through-songs'],
    purchasedProductIds: ['jalsa-piano-tutorial'],
    totalSpent: 2047,
    lastActive: '2026-10-01'
  },
  {
    id: 'usr_102',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    status: 'active',
    joinedDate: '2026-03-10',
    enrolledCourseIds: ['indian-melodies-piano', 'piano-fundamentals'],
    purchasedProductIds: ['popular-bollywood-piano-pack', 'indian-melody-piano-collection'],
    totalSpent: 2196,
    lastActive: '2026-09-30'
  },
  {
    id: 'usr_103',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    status: 'active',
    joinedDate: '2026-04-22',
    enrolledCourseIds: ['guitar-fundamentals'],
    purchasedProductIds: ['beginner-guitar-song-pack'],
    totalSpent: 1048,
    lastActive: '2026-09-28'
  },
  {
    id: 'usr_104',
    name: 'Ananya Gupta',
    email: 'ananya.gupta@example.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    status: 'active',
    joinedDate: '2026-05-08',
    enrolledCourseIds: ['learn-piano-through-songs', 'bollywood-hits-piano'],
    purchasedProductIds: ['jalsa-piano-tutorial', 'chuttamalle-piano-tutorial'],
    totalSpent: 2147,
    lastActive: '2026-10-02'
  },
  {
    id: 'usr_105',
    name: 'Marcus Johnson',
    email: 'marcus.j@example.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    status: 'active',
    joinedDate: '2026-06-14',
    enrolledCourseIds: ['chord-melody-mastery', 'piano-fundamentals'],
    purchasedProductIds: ['piano-voicing-handbook'],
    totalSpent: 2147,
    lastActive: '2026-09-29'
  },
  {
    id: 'usr_106',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    status: 'active',
    joinedDate: '2026-07-01',
    enrolledCourseIds: ['indian-melodies-piano'],
    purchasedProductIds: ['popular-bollywood-piano-pack'],
    totalSpent: 1098,
    lastActive: '2026-10-01'
  },
  {
    id: 'usr_107',
    name: 'David Park',
    email: 'david.park@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    status: 'inactive',
    joinedDate: '2026-03-20',
    enrolledCourseIds: ['piano-fundamentals'],
    purchasedProductIds: [],
    totalSpent: 999,
    lastActive: '2026-07-15'
  },
  {
    id: 'usr_108',
    name: 'Isha Patel',
    email: 'isha.patel@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    status: 'active',
    joinedDate: '2026-08-12',
    enrolledCourseIds: ['bollywood-hits-piano', 'learn-piano-through-songs'],
    purchasedProductIds: ['cinematic-ambient-backing-tracks'],
    totalSpent: 2097,
    lastActive: '2026-10-02'
  },
  {
    id: 'usr_109',
    name: 'Ryan Chen',
    email: 'ryan.chen@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    status: 'active',
    joinedDate: '2026-09-01',
    enrolledCourseIds: ['guitar-fundamentals'],
    purchasedProductIds: ['beginner-guitar-song-pack'],
    totalSpent: 1048,
    lastActive: '2026-09-30'
  },
  {
    id: 'usr_110',
    name: 'Kavya Nair',
    email: 'kavya.nair@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    status: 'active',
    joinedDate: '2026-09-15',
    enrolledCourseIds: ['indian-melodies-piano', 'chord-melody-mastery'],
    purchasedProductIds: ['indian-melody-piano-collection', 'piano-voicing-handbook'],
    totalSpent: 2246,
    lastActive: '2026-10-02'
  },
  {
    id: 'usr_111',
    name: 'Tom Anderson',
    email: 'tom.anderson@example.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    status: 'inactive',
    joinedDate: '2026-04-10',
    enrolledCourseIds: ['piano-fundamentals'],
    purchasedProductIds: [],
    totalSpent: 999,
    lastActive: '2026-06-20'
  },
  {
    id: 'usr_112',
    name: 'Meera Iyer',
    email: 'meera.iyer@example.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    status: 'active',
    joinedDate: '2026-09-25',
    enrolledCourseIds: ['learn-piano-through-songs'],
    purchasedProductIds: ['chuttamalle-piano-tutorial'],
    totalSpent: 1098,
    lastActive: '2026-10-01'
  }
];

// ─── Mock Enrollments ────────────────────────────────────────────────────────
export const mockEnrollments = [
  { id: 'enr_001', studentId: 'usr_demo_101', studentName: 'Alex Rivera', studentEmail: 'alex.rivera@example.com', courseId: 'piano-fundamentals', courseTitle: 'Piano Fundamentals – Beginner to Intermediate', enrolledAt: '2026-03-01', progressPercent: 68, status: 'active' },
  { id: 'enr_002', studentId: 'usr_demo_101', studentName: 'Alex Rivera', studentEmail: 'alex.rivera@example.com', courseId: 'learn-piano-through-songs', courseTitle: 'Learn Piano Through Popular Songs', enrolledAt: '2026-03-05', progressPercent: 25, status: 'active' },
  { id: 'enr_003', studentId: 'usr_102', studentName: 'Priya Sharma', studentEmail: 'priya.sharma@example.com', courseId: 'indian-melodies-piano', courseTitle: 'Indian Melodies on Piano – Raags & Bollywood', enrolledAt: '2026-03-15', progressPercent: 82, status: 'active' },
  { id: 'enr_004', studentId: 'usr_102', studentName: 'Priya Sharma', studentEmail: 'priya.sharma@example.com', courseId: 'piano-fundamentals', courseTitle: 'Piano Fundamentals – Beginner to Intermediate', enrolledAt: '2026-04-01', progressPercent: 100, status: 'completed' },
  { id: 'enr_005', studentId: 'usr_103', studentName: 'James Wilson', studentEmail: 'james.wilson@example.com', courseId: 'guitar-fundamentals', courseTitle: 'Guitar Fundamentals for Beginners', enrolledAt: '2026-04-25', progressPercent: 55, status: 'active' },
  { id: 'enr_006', studentId: 'usr_104', studentName: 'Ananya Gupta', studentEmail: 'ananya.gupta@example.com', courseId: 'learn-piano-through-songs', courseTitle: 'Learn Piano Through Popular Songs', enrolledAt: '2026-05-10', progressPercent: 40, status: 'active' },
  { id: 'enr_007', studentId: 'usr_104', studentName: 'Ananya Gupta', studentEmail: 'ananya.gupta@example.com', courseId: 'bollywood-hits-piano', courseTitle: 'Bollywood Hits on Piano – Chartbusters Edition', enrolledAt: '2026-06-01', progressPercent: 15, status: 'active' },
  { id: 'enr_008', studentId: 'usr_105', studentName: 'Marcus Johnson', studentEmail: 'marcus.j@example.com', courseId: 'chord-melody-mastery', courseTitle: 'Chord & Melody Mastery – Advanced Piano Arranging', enrolledAt: '2026-06-20', progressPercent: 30, status: 'active' },
  { id: 'enr_009', studentId: 'usr_105', studentName: 'Marcus Johnson', studentEmail: 'marcus.j@example.com', courseId: 'piano-fundamentals', courseTitle: 'Piano Fundamentals – Beginner to Intermediate', enrolledAt: '2026-05-01', progressPercent: 100, status: 'completed' },
  { id: 'enr_010', studentId: 'usr_106', studentName: 'Sneha Reddy', studentEmail: 'sneha.reddy@example.com', courseId: 'indian-melodies-piano', courseTitle: 'Indian Melodies on Piano – Raags & Bollywood', enrolledAt: '2026-07-05', progressPercent: 60, status: 'active' },
  { id: 'enr_011', studentId: 'usr_108', studentName: 'Isha Patel', studentEmail: 'isha.patel@example.com', courseId: 'bollywood-hits-piano', courseTitle: 'Bollywood Hits on Piano – Chartbusters Edition', enrolledAt: '2026-08-15', progressPercent: 20, status: 'active' },
  { id: 'enr_012', studentId: 'usr_108', studentName: 'Isha Patel', studentEmail: 'isha.patel@example.com', courseId: 'learn-piano-through-songs', courseTitle: 'Learn Piano Through Popular Songs', enrolledAt: '2026-09-01', progressPercent: 10, status: 'active' },
  { id: 'enr_013', studentId: 'usr_109', studentName: 'Ryan Chen', studentEmail: 'ryan.chen@example.com', courseId: 'guitar-fundamentals', courseTitle: 'Guitar Fundamentals for Beginners', enrolledAt: '2026-09-05', progressPercent: 35, status: 'active' },
  { id: 'enr_014', studentId: 'usr_110', studentName: 'Kavya Nair', studentEmail: 'kavya.nair@example.com', courseId: 'indian-melodies-piano', courseTitle: 'Indian Melodies on Piano – Raags & Bollywood', enrolledAt: '2026-09-18', progressPercent: 12, status: 'active' },
  { id: 'enr_015', studentId: 'usr_110', studentName: 'Kavya Nair', studentEmail: 'kavya.nair@example.com', courseId: 'chord-melody-mastery', courseTitle: 'Chord & Melody Mastery – Advanced Piano Arranging', enrolledAt: '2026-09-20', progressPercent: 5, status: 'active' },
  { id: 'enr_016', studentId: 'usr_112', studentName: 'Meera Iyer', studentEmail: 'meera.iyer@example.com', courseId: 'learn-piano-through-songs', courseTitle: 'Learn Piano Through Popular Songs', enrolledAt: '2026-09-28', progressPercent: 8, status: 'active' },
];

// ─── Mock Payments ───────────────────────────────────────────────────────────
export const mockPayments = [
  { id: 'pay_001', transactionId: 'TXN-MK8A2F1', studentId: 'usr_demo_101', studentName: 'Alex Rivera', studentEmail: 'alex.rivera@example.com', itemType: 'course', itemTitle: 'Piano Fundamentals – Beginner to Intermediate', amount: 999, method: 'UPI', status: 'completed', date: '2026-03-01' },
  { id: 'pay_002', transactionId: 'TXN-MK9B3G2', studentId: 'usr_demo_101', studentName: 'Alex Rivera', studentEmail: 'alex.rivera@example.com', itemType: 'course', itemTitle: 'Learn Piano Through Popular Songs', amount: 999, method: 'Card', status: 'completed', date: '2026-03-05' },
  { id: 'pay_003', transactionId: 'TXN-MK1C4H3', studentId: 'usr_demo_101', studentName: 'Alex Rivera', studentEmail: 'alex.rivera@example.com', itemType: 'product', itemTitle: 'Jalsa Piano Tutorial & Sheet Music Pack', amount: 49, method: 'UPI', status: 'completed', date: '2026-03-06' },
  { id: 'pay_004', transactionId: 'TXN-MK2D5I4', studentId: 'usr_102', studentName: 'Priya Sharma', studentEmail: 'priya.sharma@example.com', itemType: 'course', itemTitle: 'Indian Melodies on Piano – Raags & Bollywood', amount: 999, method: 'Net Banking', status: 'completed', date: '2026-03-15' },
  { id: 'pay_005', transactionId: 'TXN-MK3E6J5', studentId: 'usr_102', studentName: 'Priya Sharma', studentEmail: 'priya.sharma@example.com', itemType: 'course', itemTitle: 'Piano Fundamentals – Beginner to Intermediate', amount: 999, method: 'Card', status: 'completed', date: '2026-04-01' },
  { id: 'pay_006', transactionId: 'TXN-MK4F7K6', studentId: 'usr_102', studentName: 'Priya Sharma', studentEmail: 'priya.sharma@example.com', itemType: 'product', itemTitle: 'Popular Bollywood Piano Pack', amount: 99, method: 'UPI', status: 'completed', date: '2026-04-10' },
  { id: 'pay_007', transactionId: 'TXN-MK5G8L7', studentId: 'usr_102', studentName: 'Priya Sharma', studentEmail: 'priya.sharma@example.com', itemType: 'product', itemTitle: 'Indian Melody Piano Collection', amount: 99, method: 'UPI', status: 'completed', date: '2026-04-12' },
  { id: 'pay_008', transactionId: 'TXN-MK6H9M8', studentId: 'usr_103', studentName: 'James Wilson', studentEmail: 'james.wilson@example.com', itemType: 'course', itemTitle: 'Guitar Fundamentals for Beginners', amount: 999, method: 'Card', status: 'completed', date: '2026-04-25' },
  { id: 'pay_009', transactionId: 'TXN-MK7I0N9', studentId: 'usr_103', studentName: 'James Wilson', studentEmail: 'james.wilson@example.com', itemType: 'product', itemTitle: 'Beginner Guitar Song Pack', amount: 49, method: 'Card', status: 'completed', date: '2026-04-26' },
  { id: 'pay_010', transactionId: 'TXN-MK8J1O0', studentId: 'usr_104', studentName: 'Ananya Gupta', studentEmail: 'ananya.gupta@example.com', itemType: 'course', itemTitle: 'Learn Piano Through Popular Songs', amount: 999, method: 'UPI', status: 'completed', date: '2026-05-10' },
  { id: 'pay_011', transactionId: 'TXN-MK9K2P1', studentId: 'usr_104', studentName: 'Ananya Gupta', studentEmail: 'ananya.gupta@example.com', itemType: 'course', itemTitle: 'Bollywood Hits on Piano – Chartbusters Edition', amount: 999, method: 'Net Banking', status: 'completed', date: '2026-06-01' },
  { id: 'pay_012', transactionId: 'TXN-MKA3Q2R', studentId: 'usr_104', studentName: 'Ananya Gupta', studentEmail: 'ananya.gupta@example.com', itemType: 'product', itemTitle: 'Jalsa Piano Tutorial & Sheet Music Pack', amount: 49, method: 'UPI', status: 'completed', date: '2026-06-05' },
  { id: 'pay_013', transactionId: 'TXN-MKB4R3S', studentId: 'usr_104', studentName: 'Ananya Gupta', studentEmail: 'ananya.gupta@example.com', itemType: 'product', itemTitle: 'Chuttamalle Piano Tutorial & Stems', amount: 99, method: 'UPI', status: 'completed', date: '2026-06-06' },
  { id: 'pay_014', transactionId: 'TXN-MKC5S4T', studentId: 'usr_105', studentName: 'Marcus Johnson', studentEmail: 'marcus.j@example.com', itemType: 'course', itemTitle: 'Piano Fundamentals – Beginner to Intermediate', amount: 999, method: 'Card', status: 'completed', date: '2026-05-01' },
  { id: 'pay_015', transactionId: 'TXN-MKD6T5U', studentId: 'usr_105', studentName: 'Marcus Johnson', studentEmail: 'marcus.j@example.com', itemType: 'course', itemTitle: 'Chord & Melody Mastery – Advanced Piano Arranging', amount: 999, method: 'Card', status: 'completed', date: '2026-06-20' },
  { id: 'pay_016', transactionId: 'TXN-MKE7U6V', studentId: 'usr_105', studentName: 'Marcus Johnson', studentEmail: 'marcus.j@example.com', itemType: 'product', itemTitle: 'The Master Piano Voicing Handbook', amount: 149, method: 'UPI', status: 'completed', date: '2026-06-22' },
  { id: 'pay_017', transactionId: 'TXN-MKF8V7W', studentId: 'usr_106', studentName: 'Sneha Reddy', studentEmail: 'sneha.reddy@example.com', itemType: 'course', itemTitle: 'Indian Melodies on Piano – Raags & Bollywood', amount: 999, method: 'UPI', status: 'completed', date: '2026-07-05' },
  { id: 'pay_018', transactionId: 'TXN-MKG9W8X', studentId: 'usr_106', studentName: 'Sneha Reddy', studentEmail: 'sneha.reddy@example.com', itemType: 'product', itemTitle: 'Popular Bollywood Piano Pack', amount: 99, method: 'Net Banking', status: 'completed', date: '2026-07-08' },
  { id: 'pay_019', transactionId: 'TXN-MKH0X9Y', studentId: 'usr_107', studentName: 'David Park', studentEmail: 'david.park@example.com', itemType: 'course', itemTitle: 'Piano Fundamentals – Beginner to Intermediate', amount: 999, method: 'Card', status: 'completed', date: '2026-03-20' },
  { id: 'pay_020', transactionId: 'TXN-MKI1Y0Z', studentId: 'usr_108', studentName: 'Isha Patel', studentEmail: 'isha.patel@example.com', itemType: 'course', itemTitle: 'Bollywood Hits on Piano – Chartbusters Edition', amount: 999, method: 'UPI', status: 'completed', date: '2026-08-15' },
  { id: 'pay_021', transactionId: 'TXN-MKJ2Z1A', studentId: 'usr_108', studentName: 'Isha Patel', studentEmail: 'isha.patel@example.com', itemType: 'course', itemTitle: 'Learn Piano Through Popular Songs', amount: 999, method: 'Card', status: 'completed', date: '2026-09-01' },
  { id: 'pay_022', transactionId: 'TXN-MKK3A2B', studentId: 'usr_108', studentName: 'Isha Patel', studentEmail: 'isha.patel@example.com', itemType: 'product', itemTitle: 'Cinematic Ambient Backing Tracks', amount: 99, method: 'UPI', status: 'completed', date: '2026-09-03' },
  { id: 'pay_023', transactionId: 'TXN-MKL4B3C', studentId: 'usr_109', studentName: 'Ryan Chen', studentEmail: 'ryan.chen@example.com', itemType: 'course', itemTitle: 'Guitar Fundamentals for Beginners', amount: 999, method: 'Net Banking', status: 'completed', date: '2026-09-05' },
  { id: 'pay_024', transactionId: 'TXN-MKM5C4D', studentId: 'usr_109', studentName: 'Ryan Chen', studentEmail: 'ryan.chen@example.com', itemType: 'product', itemTitle: 'Beginner Guitar Song Pack', amount: 49, method: 'Card', status: 'completed', date: '2026-09-06' },
  { id: 'pay_025', transactionId: 'TXN-MKN6D5E', studentId: 'usr_110', studentName: 'Kavya Nair', studentEmail: 'kavya.nair@example.com', itemType: 'course', itemTitle: 'Indian Melodies on Piano – Raags & Bollywood', amount: 999, method: 'UPI', status: 'completed', date: '2026-09-18' },
  { id: 'pay_026', transactionId: 'TXN-MKO7E6F', studentId: 'usr_110', studentName: 'Kavya Nair', studentEmail: 'kavya.nair@example.com', itemType: 'course', itemTitle: 'Chord & Melody Mastery – Advanced Piano Arranging', amount: 999, method: 'Card', status: 'completed', date: '2026-09-20' },
  { id: 'pay_027', transactionId: 'TXN-MKP8F7G', studentId: 'usr_110', studentName: 'Kavya Nair', studentEmail: 'kavya.nair@example.com', itemType: 'product', itemTitle: 'Indian Melody Piano Collection', amount: 99, method: 'UPI', status: 'completed', date: '2026-09-22' },
  { id: 'pay_028', transactionId: 'TXN-MKQ9G8H', studentId: 'usr_110', studentName: 'Kavya Nair', studentEmail: 'kavya.nair@example.com', itemType: 'product', itemTitle: 'The Master Piano Voicing Handbook', amount: 149, method: 'Net Banking', status: 'completed', date: '2026-09-23' },
  { id: 'pay_029', transactionId: 'TXN-MKR0H9I', studentId: 'usr_111', studentName: 'Tom Anderson', studentEmail: 'tom.anderson@example.com', itemType: 'course', itemTitle: 'Piano Fundamentals – Beginner to Intermediate', amount: 999, method: 'Card', status: 'completed', date: '2026-04-10' },
  { id: 'pay_030', transactionId: 'TXN-MKS1I0J', studentId: 'usr_112', studentName: 'Meera Iyer', studentEmail: 'meera.iyer@example.com', itemType: 'course', itemTitle: 'Learn Piano Through Popular Songs', amount: 999, method: 'UPI', status: 'completed', date: '2026-09-28' },
  { id: 'pay_031', transactionId: 'TXN-MKT2J1K', studentId: 'usr_112', studentName: 'Meera Iyer', studentEmail: 'meera.iyer@example.com', itemType: 'product', itemTitle: 'Chuttamalle Piano Tutorial & Stems', amount: 99, method: 'UPI', status: 'completed', date: '2026-09-29' },
];

// ─── Mock Videos (course lesson videos) ──────────────────────────────────────
export const mockVideos = [
  { id: 'vid_001', title: 'Anatomy of the Keyboard & Finger Numbering', courseId: 'piano-fundamentals', courseTitle: 'Piano Fundamentals', module: 'Module 1', lessonOrder: 1, duration: '14:20', status: 'published', uploadedAt: '2026-01-15', fileSize: '820 MB', storageUrl: 'https://storage.example.com/videos/vid_001.mp4', resolution: '4K', views: 4210 },
  { id: 'vid_002', title: 'Ergonomic Posture & Avoiding Tendon Strain', courseId: 'piano-fundamentals', courseTitle: 'Piano Fundamentals', module: 'Module 1', lessonOrder: 2, duration: '11:45', status: 'published', uploadedAt: '2026-01-15', fileSize: '680 MB', storageUrl: 'https://storage.example.com/videos/vid_002.mp4', resolution: '4K', views: 3850 },
  { id: 'vid_003', title: 'The 5-Finger Pattern & Tone Production', courseId: 'piano-fundamentals', courseTitle: 'Piano Fundamentals', module: 'Module 1', lessonOrder: 3, duration: '18:10', status: 'published', uploadedAt: '2026-01-16', fileSize: '1.1 GB', storageUrl: 'https://storage.example.com/videos/vid_003.mp4', resolution: '4K', views: 3620 },
  { id: 'vid_004', title: 'Your First Two-Handed Musical Phrase', courseId: 'piano-fundamentals', courseTitle: 'Piano Fundamentals', module: 'Module 1', lessonOrder: 4, duration: '16:30', status: 'published', uploadedAt: '2026-01-17', fileSize: '950 MB', storageUrl: 'https://storage.example.com/videos/vid_004.mp4', resolution: '4K', views: 3410 },
  { id: 'vid_005', title: 'Major Triads Across All White Keys', courseId: 'piano-fundamentals', courseTitle: 'Piano Fundamentals', module: 'Module 2', lessonOrder: 5, duration: '22:15', status: 'published', uploadedAt: '2026-01-20', fileSize: '1.3 GB', storageUrl: 'https://storage.example.com/videos/vid_005.mp4', resolution: '4K', views: 3180 },
  { id: 'vid_006', title: 'Tum Hi Ho – Complete Breakdown', courseId: 'learn-piano-through-songs', courseTitle: 'Learn Piano Through Popular Songs', module: 'Module 1', lessonOrder: 1, duration: '25:30', status: 'published', uploadedAt: '2026-02-01', fileSize: '1.5 GB', storageUrl: 'https://storage.example.com/videos/vid_006.mp4', resolution: '4K', views: 5200 },
  { id: 'vid_007', title: 'Someone Like You – Left Hand Patterns', courseId: 'learn-piano-through-songs', courseTitle: 'Learn Piano Through Popular Songs', module: 'Module 1', lessonOrder: 2, duration: '20:45', status: 'published', uploadedAt: '2026-02-03', fileSize: '1.2 GB', storageUrl: 'https://storage.example.com/videos/vid_007.mp4', resolution: '4K', views: 4800 },
  { id: 'vid_008', title: 'Raag Yaman – Introduction & Aroha/Avroha', courseId: 'indian-melodies-piano', courseTitle: 'Indian Melodies on Piano', module: 'Module 1', lessonOrder: 1, duration: '28:00', status: 'published', uploadedAt: '2026-02-10', fileSize: '1.6 GB', storageUrl: 'https://storage.example.com/videos/vid_008.mp4', resolution: '4K', views: 4100 },
  { id: 'vid_009', title: 'Basic Open Chord Shapes', courseId: 'guitar-fundamentals', courseTitle: 'Guitar Fundamentals', module: 'Module 1', lessonOrder: 1, duration: '15:40', status: 'published', uploadedAt: '2026-03-01', fileSize: '900 MB', storageUrl: 'https://storage.example.com/videos/vid_009.mp4', resolution: '4K', views: 2900 },
  { id: 'vid_010', title: 'Jalsa Main Theme – Right Hand Melody', courseId: 'bollywood-hits-piano', courseTitle: 'Bollywood Hits on Piano', module: 'Module 1', lessonOrder: 1, duration: '22:10', status: 'published', uploadedAt: '2026-03-15', fileSize: '1.3 GB', storageUrl: 'https://storage.example.com/videos/vid_010.mp4', resolution: '4K', views: 3600 },
  { id: 'vid_011', title: 'Drop-2 Voicings Explained', courseId: 'chord-melody-mastery', courseTitle: 'Chord & Melody Mastery', module: 'Module 1', lessonOrder: 1, duration: '30:15', status: 'published', uploadedAt: '2026-04-01', fileSize: '1.8 GB', storageUrl: 'https://storage.example.com/videos/vid_011.mp4', resolution: '4K', views: 2100 },
  { id: 'vid_012', title: 'Walking Basslines with Chord Shells', courseId: 'chord-melody-mastery', courseTitle: 'Chord & Melody Mastery', module: 'Module 2', lessonOrder: 2, duration: '26:50', status: 'draft', uploadedAt: '2026-09-28', fileSize: '1.5 GB', storageUrl: 'https://storage.example.com/videos/vid_012.mp4', resolution: '4K', views: 0 },
];

// ─── Helper: Compute dashboard stats ─────────────────────────────────────────
export const getAdminStats = () => {
  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(s => s.status === 'active').length;
  const totalCourses = courses.length;
  const publishedCourses = courses.length; // all are published in mock
  const totalVideos = mockVideos.length;
  const totalEnrollments = mockEnrollments.length;
  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.amount, 0);
  const recentEnrollments = [...mockEnrollments].sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt)).slice(0, 5);
  const recentPayments = [...mockPayments].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return {
    totalStudents,
    activeStudents,
    totalCourses,
    publishedCourses,
    totalVideos,
    totalEnrollments,
    totalRevenue,
    recentEnrollments,
    recentPayments,
    totalProducts: products.length,
  };
};
