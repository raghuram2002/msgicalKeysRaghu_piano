/**
 * Lesson Resource Management & Secure Access Authorization Service
 * Magical Keys Cadence Music Platform
 */

export const SUPPORTED_RESOURCE_TYPES = {
  VIDEO: {
    id: 'VIDEO',
    name: 'Video',
    label: '4K/HD Video Lesson',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    allowedExtensions: ['.mp4', '.mov', '.webm', '.mkv'],
    maxSizeBytes: 5 * 1024 * 1024 * 1024, // 5 GB
    maxSizeLabel: '5 GB',
    defaultStorage: 'cloudflare_stream'
  },
  PDF: {
    id: 'PDF',
    name: 'PDF',
    label: 'PDF Notes & Sheet Music',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    allowedExtensions: ['.pdf'],
    maxSizeBytes: 50 * 1024 * 1024, // 50 MB
    maxSizeLabel: '50 MB',
    defaultStorage: 'aws_s3'
  },
  DOCUMENT: {
    id: 'DOCUMENT',
    name: 'Document',
    label: 'Lesson Summary (DOC/DOCX)',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    allowedExtensions: ['.doc', '.docx', '.txt', '.rtf', '.odt'],
    maxSizeBytes: 50 * 1024 * 1024, // 50 MB
    maxSizeLabel: '50 MB',
    defaultStorage: 'aws_s3'
  },
  AUDIO: {
    id: 'AUDIO',
    name: 'Audio',
    label: 'Audio Drill / Backing Track',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    allowedExtensions: ['.mp3', '.wav', '.aac', '.m4a', '.flac'],
    maxSizeBytes: 150 * 1024 * 1024, // 150 MB
    maxSizeLabel: '150 MB',
    defaultStorage: 'aws_s3'
  },
  IMAGE: {
    id: 'IMAGE',
    name: 'Image',
    label: 'Fingering Diagram / Score Image',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.svg'],
    maxSizeBytes: 25 * 1024 * 1024, // 25 MB
    maxSizeLabel: '25 MB',
    defaultStorage: 'aws_s3'
  },
  OTHER: {
    id: 'OTHER',
    name: 'Other',
    label: 'Practice Stems / MIDI Archive',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    allowedExtensions: ['.zip', '.mid', '.midi', '.musicxml'],
    maxSizeBytes: 100 * 1024 * 1024, // 100 MB
    maxSizeLabel: '100 MB',
    defaultStorage: 'aws_s3'
  }
};

export const DISALLOWED_EXTENSIONS = [
  '.exe', '.bat', '.sh', '.cmd', '.bin', '.js', '.vbs', '.msi',
  '.php', '.phtml', '.py', '.c', '.cpp', '.dll', '.scr', '.jar', '.com'
];

/**
 * Validates a file intended for upload against type restrictions, safety checks, and size limits
 */
export const validateResourceUpload = (file, resourceType) => {
  if (!file) {
    return { valid: false, error: 'No file provided for upload.' };
  }

  const fileName = file.name || '';
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return { valid: false, error: 'File must have a valid extension (e.g. .pdf, .mp4, .mp3).' };
  }

  const extension = fileName.substring(lastDotIndex).toLowerCase();

  // 1. Security Check: Reject dangerous executable extensions
  if (DISALLOWED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `Security violation: "${extension}" files are strictly blocked to protect students and platform integrity.`
    };
  }

  // 2. Type Check: Ensure extension is valid for the specified resourceType
  const typeConfig = SUPPORTED_RESOURCE_TYPES[resourceType] || SUPPORTED_RESOURCE_TYPES.OTHER;
  if (!typeConfig.allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `Invalid file format "${extension}" for ${typeConfig.label}. Supported: ${typeConfig.allowedExtensions.join(', ')}`
    };
  }

  // 3. Size Check
  if (file.size && file.size > typeConfig.maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds the allowable limit of ${typeConfig.maxSizeLabel} for ${typeConfig.label}.`
    };
  }

  return { valid: true };
};

/**
 * Authorization Checker:
 * Determines if a user (or guest) is permitted to access a specific lesson or attached resource
 */
export const canUserAccessResource = (user, courseId, resourceOrLesson) => {
  if (!resourceOrLesson) return false;

  // 1. If resource or lesson is explicitly configured as Free Preview → Allowed for all
  if (
    resourceOrLesson.access === 'free_preview' ||
    resourceOrLesson.isFreePreview === true
  ) {
    return true;
  }

  // 2. If user is an Administrator → Unrestricted full access
  if (user && user.role === 'admin') {
    return true;
  }

  // 3. If user is authenticated and enrolled in this course → Full access
  if (user && Array.isArray(user.enrolledCourses)) {
    const isEnrolledInCourse = user.enrolledCourses.some(
      (enrollment) => enrollment.courseId === courseId
    );
    if (isEnrolledInCourse) {
      return true;
    }
  }

  // Otherwise, access is restricted to enrolled students
  return false;
};

/**
 * Server-Simulated Secure Resource Access Token Generator
 * Does NOT reveal private storage URLs to unauthorized users
 */
export const requestSecureResourceAccess = async (user, courseId, resource) => {
  // Simulate 150ms authorization check delay
  await new Promise((r) => setTimeout(r, 150));

  const isAuthorized = canUserAccessResource(user, courseId, resource);

  if (!isAuthorized) {
    return {
      authorized: false,
      error: 'Access Denied: This learning material is restricted to enrolled students. Please enroll in the course to unlock.',
      secureUrl: null
    };
  }

  // Generate ephemeral signed token simulation
  const signature = Math.random().toString(36).substring(2, 12);
  const expiry = Math.floor(Date.now() / 1000) + 3600; // 1 hour token
  const storagePath = resource.storageKey || `courses/${courseId}/resources/${resource.id}`;

  return {
    authorized: true,
    secureUrl: `https://storage.magicalkeys.com/secure/${storagePath}?auth_sig=${signature}&expires=${expiry}`,
    token: signature,
    expiresAt: new Date(expiry * 1000).toISOString()
  };
};

/**
 * Format bytes to readable string (e.g. 4.2 MB)
 */
export const formatFileSize = (bytes) => {
  if (!bytes || isNaN(bytes)) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};
