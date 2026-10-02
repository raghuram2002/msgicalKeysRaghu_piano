import { instructors } from './instructors';

const rawCourses = [
  {
    id: 'piano-fundamentals',
    slug: 'piano-fundamentals-beginner-to-intermediate',
    title: 'Piano Fundamentals – Beginner to Intermediate',
    subtitle: 'From sitting at the piano with proper posture to playing two-handed pieces with confidence.',
    category: 'Piano',
    level: 'Beginner',
    price: 999,
    originalPrice: 2499,
    rating: 4.95,
    reviewsCount: 382,
    studentsCount: 2430,
    duration: '14 Hours',
    lessonsCount: 42,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    instructor: instructors[0],
    description: 'A comprehensive, zero-fluff blueprint designed to take you from a complete novice to a fluid, expressive piano player. Master proper keyboard geography, essential scales, two-hand coordination, dynamic phrasing, and fundamental music notation without dry academic grind.',
    learningOutcomes: [
      'Understand the keyboard layout, octave numbering, and proper posture',
      'Play major and minor chords with smooth voice leading',
      'Develop genuine two-handed independence through progressive micro-drills',
      'Read basic sheet music and play by ear with functional chord progressions',
      'Perform 6 complete pieces across classical, contemporary, and ballad styles'
    ],
    requirements: [
      'A piano or 61+ key digital keyboard (touch sensitivity recommended)',
      '15–30 minutes of daily dedicated practice time',
      'No prior musical experience or sight-reading ability required'
    ],
    curriculum: [
      {
        id: 'mod-1',
        title: 'Module 1: Orientation & Keyboard Topography',
        lessons: [
          { id: 'pf-1', title: 'Lesson 1: Anatomy of the Keyboard & Finger Numbering', duration: '14:20', isFreePreview: true },
          { id: 'pf-2', title: 'Lesson 2: Ergonomic Posture & Avoiding Tendon Strain', duration: '11:45', isFreePreview: true },
          { id: 'pf-3', title: 'Lesson 3: The 5-Finger Pattern & Tone Production', duration: '18:10' },
          { id: 'pf-4', title: 'Lesson 4: Your First Two-Handed Musical Phrase', duration: '16:30' }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: The Architecture of Chords',
        lessons: [
          { id: 'pf-5', title: 'Lesson 1: Major Triads Across All White Keys', duration: '22:15', isFreePreview: true },
          { id: 'pf-6', title: 'Lesson 2: Minor Triads and the Emotion of Thirds', duration: '19:40' },
          { id: 'pf-7', title: 'Lesson 3: Root Inversions for Smooth Transitions', duration: '25:10' },
          { id: 'pf-8', title: 'Lesson 4: The Legendary I - V - vi - IV Progression', duration: '21:00' }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Rhythm, Syncopation & Arpeggios',
        lessons: [
          { id: 'pf-9', title: 'Lesson 1: Left-Hand Broken Chords & Rolling Bass', duration: '17:50' },
          { id: 'pf-10', title: 'Lesson 2: Ballad Arpeggio Patterns (4/4 & 6/8)', duration: '24:30' },
          { id: 'pf-11', title: 'Lesson 3: Syncopated Accompaniment Techniques', duration: '20:15' }
        ]
      },
      {
        id: 'mod-4',
        title: 'Module 4: Repertoire Masterclasses & Capstone',
        lessons: [
          { id: 'pf-12', title: 'Lesson 1: Complete Repertoire Breakdown: Moonlight Theme', duration: '32:00' },
          { id: 'pf-13', title: 'Lesson 2: Modern Acoustic Pop Anthem Arrangement', duration: '28:40' },
          { id: 'pf-14', title: 'Lesson 3: Final Performance Evaluation & Practice Routine', duration: '15:10' }
        ]
      }
    ],
    reviews: [
      { id: 'rev-1', userName: 'Marcus Sterling', rating: 5, date: '2 weeks ago', comment: 'Julian’s approach to hand independence made something that felt impossible click within 10 days. The lesson design is immaculate.' },
      { id: 'rev-2', userName: 'Sophia Lindqvist', rating: 5, date: '1 month ago', comment: 'Structured, respectful of adult beginner time, and musically rewarding from Day 1.' }
    ],
    tags: ['Piano', 'Beginner', 'Foundations', 'Chords']
  },
  {
    id: 'learn-piano-through-songs',
    slug: 'learn-piano-through-popular-songs',
    title: 'Learn Piano Through Popular Songs',
    subtitle: 'Skip dry theoretical drills and unlock muscle memory playing timeless contemporary tracks.',
    category: 'Song Mastery',
    level: 'All Levels',
    price: 999,
    originalPrice: 2999,
    rating: 4.97,
    reviewsCount: 512,
    studentsCount: 3180,
    duration: '16.5 Hours',
    lessonsCount: 38,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    instructor: instructors[0],
    description: 'Why spend months on abstract scales before playing music? This course teaches you modern harmonic principles by breaking down 15 iconic songs by Adele, Coldplay, Elton John, and Ludovico Einaudi. Learn to dissect chords, groove in the left hand, and carry vocal melodies cleanly.',
    learningOutcomes: [
      'Deconstruct any popular song chord sheet in under 5 minutes',
      'Apply 7 rhythmic left-hand accompaniment patterns to any 4-chord progression',
      'Learn full arrangements of 15 signature songs ranging from slow ballads to upbeat grooves',
      'Sing while playing without losing tempo or rhythmic groove',
      'Create custom intros, outros, and stylistic fills'
    ],
    requirements: [
      'Basic familiarity with keyboard notes (or having taken Piano Fundamentals)',
      'Any 61 or 88 key piano or synthesizer'
    ],
    curriculum: [
      {
        id: 'mod-1',
        title: 'Module 1: The Pop Song Harmonic Blueprint',
        lessons: [
          { id: 'lps-1', title: 'Lesson 1: The 4 Chords Behind 50+ Global Hits', duration: '18:40', isFreePreview: true },
          { id: 'lps-2', title: 'Lesson 2: Left-Hand Rhythmic Ostinatos vs Root Octaves', duration: '14:50', isFreePreview: true },
          { id: 'lps-3', title: 'Lesson 3: Inverting Chords Under the Right Hand Melody', duration: '20:30' }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Emotional Ballads Breakdown',
        lessons: [
          { id: 'lps-4', title: 'Lesson 1: "Someone Like You" Arpeggiated Figuration', duration: '26:15' },
          { id: 'lps-5', title: 'Lesson 2: "Let It Be" Melodic Left-to-Right Handoff', duration: '22:40' },
          { id: 'lps-6', title: 'Lesson 3: "All of Me" Voicing and Pedaling Nuance', duration: '25:50' }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Cinematic & Ambient Pop Styles',
        lessons: [
          { id: 'lps-7', title: 'Lesson 1: Einaudi Minimalist Looping Method', duration: '28:10' },
          { id: 'lps-8', title: 'Lesson 2: Coldplay Driving 8th-Note Pulse', duration: '24:00' }
        ]
      }
    ],
    reviews: [
      { id: 'rev-3', userName: 'David Chen', rating: 5, date: '3 weeks ago', comment: 'I played my first complete Coldplay arrangement in 4 days. Absolutely brilliant method!' },
      { id: 'rev-4', userName: 'Priya N.', rating: 5, date: '1 month ago', comment: 'The breakdown of left hand rhythms is so clear and immediately usable.' }
    ],
    tags: ['Song-Based', 'Pop', 'Chords', 'Repertoire']
  },
  {
    id: 'indian-melodies-piano',
    slug: 'indian-melodies-on-piano',
    title: 'Indian Melodies on Piano',
    subtitle: 'Decode microtonal ornamentations, raag-inspired phrasing, and soulful Bollywood motifs.',
    category: 'Bollywood & Indian',
    level: 'Intermediate',
    price: 999,
    originalPrice: 1999,
    rating: 4.99,
    reviewsCount: 640,
    studentsCount: 3950,
    duration: '18 Hours',
    lessonsCount: 46,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    instructor: instructors[1],
    description: 'Western piano keyboard meets the lyrical, fluid soul of Indian classical raags and golden-era cinematic compositions. Master grace notes (kan-swaras), glides (meends simulated on keyboard), and rhythmic taal structures that give Indian music its emotional depth.',
    learningOutcomes: [
      'Translate classical Raag frameworks (Yaman, Bhairavi, Kafi, Bilawal) to standard keys',
      'Master ornamentation techniques: grace notes, quick finger rolls, and subtle tremolos',
      'Arrange legendary songs by A.R. Rahman, Ilaiyaraaja, and R.D. Burman with left hand drone harmonies',
      'Develop intuitive play-by-ear ear training for Eastern melodic contours',
      'Blend Indian melodic phrasing over western chord progressions'
    ],
    requirements: [
      'Intermediate keyboard proficiency (comfortable with scales and chords)',
      'Eagerness to listen actively and decode subtle emotional inflections'
    ],
    curriculum: [
      {
        id: 'mod-1',
        title: 'Module 1: The Soul of the Indian Scale',
        lessons: [
          { id: 'imp-1', title: 'Lesson 1: Swara to Western Note Mapping & Microtones', duration: '21:10', isFreePreview: true },
          { id: 'imp-2', title: 'Lesson 2: Raag Yaman: The Sunset Melody Architecture', duration: '24:50', isFreePreview: true },
          { id: 'imp-3', title: 'Lesson 3: The Art of Kan-Swaras (Grace Notes) on Ivory', duration: '19:30' }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: A.R. Rahman Harmonic Landscape',
        lessons: [
          { id: 'imp-4', title: 'Lesson 1: Modal Shifts & Sus Chords in Indian Cinema', duration: '27:15' },
          { id: 'imp-5', title: 'Lesson 2: Arranging "Tu Hi Re" - Layer by Layer', duration: '31:40' },
          { id: 'imp-6', title: 'Lesson 3: Cinematic Piano Interludes & Left Hand Drones', duration: '23:00' }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Fast-Paced Semi-Classical Compositions',
        lessons: [
          { id: 'imp-7', title: 'Lesson 1: Rhythmic Taals (Keherwa & Dadra) on Piano', duration: '25:20' },
          { id: 'imp-8', title: 'Lesson 2: Full Song Project: Romantic Medley', duration: '34:00' }
        ]
      }
    ],
    reviews: [
      { id: 'rev-5', userName: 'Rohan Deshmukh', rating: 5, date: '1 week ago', comment: 'Aarav sir explains the nuances of Indian ornamentation in a way no Western tutorial ever could.' },
      { id: 'rev-6', userName: 'Ananya Sharma', rating: 5, date: '3 weeks ago', comment: 'This course alone made buying a digital piano completely worth it. Incredible depth.' }
    ],
    tags: ['Indian Melodies', 'Bollywood', 'Piano', 'Raags']
  },
  {
    id: 'guitar-fundamentals',
    slug: 'guitar-fundamentals-for-beginners',
    title: 'Guitar Fundamentals for Beginners',
    subtitle: 'From picking up the guitar cleanly to clean fretboard fingering, strumming grooves, and open chords.',
    category: 'Guitar',
    level: 'Beginner',
    price: 999,
    originalPrice: 1999,
    rating: 4.93,
    reviewsCount: 310,
    studentsCount: 2190,
    duration: '12 Hours',
    lessonsCount: 36,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    instructor: instructors[2],
    description: 'Eliminate buzzing strings, muted chords, and painful fingertips with Elena’s biomechanically verified guitar fundamentals method. Master open chords, seamless switching, rhythm dynamics, and foundational fingerpicking patterns.',
    learningOutcomes: [
      'Hold the guitar with zero posture strain and proper fretting thumb placement',
      'Play 8 essential open chords (E, Em, A, Am, C, G, D, Dm) without buzzing',
      'Switch chords on the fly without stopping your strumming arm',
      'Master the universal "Down, Down-Up, Up-Down-Up" rhythm pattern',
      'Play 10 acoustic classics with clean dynamic touch'
    ],
    requirements: [
      'An acoustic or electric guitar (nylon or steel string)',
      'Guitar tuner (or smartphone tuning app) and a few guitar picks'
    ],
    curriculum: [
      {
        id: 'mod-1',
        title: 'Module 1: The Frictionless Start',
        lessons: [
          { id: 'gf-1', title: 'Lesson 1: Guitar Anatomy, Holding & Tuning by Ear', duration: '15:20', isFreePreview: true },
          { id: 'gf-2', title: 'Lesson 2: Fretting Hand Mechanics & Callus Building Tips', duration: '12:45', isFreePreview: true },
          { id: 'gf-3', title: 'Lesson 3: Your First Two Chords: Em & A7', duration: '16:10' }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Open Chords & Strumming Mastery',
        lessons: [
          { id: 'gf-4', title: 'Lesson 1: The Anchor Finger Chord Switch Hack', duration: '20:15' },
          { id: 'gf-5', title: 'Lesson 2: The Mother of All Strumming Patterns', duration: '22:30' },
          { id: 'gf-6', title: 'Lesson 3: Conquering the Dreaded F Chord Alternative', duration: '19:40' }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Fingerstyle Fundamentals',
        lessons: [
          { id: 'gf-7', title: 'Lesson 1: PIMA Fingerpicking Notation & Technique', duration: '24:10' },
          { id: 'gf-8', title: 'Lesson 2: Acoustic Ballad Fingerstyle Repertoire', duration: '27:50' }
        ]
      }
    ],
    reviews: [
      { id: 'rev-7', userName: 'Liam Gallagher', rating: 5, date: '1 month ago', comment: 'Elena’s anchor finger technique saved my guitar journey. Chords finally make sense.' }
    ],
    tags: ['Guitar', 'Acoustic', 'Beginner', 'Chords']
  },
  {
    id: 'bollywood-piano-masterclass',
    slug: 'bollywood-piano-masterclass',
    title: 'Bollywood Piano Masterclass',
    subtitle: 'Arranging vintage golden hits to modern chartbusters with cinematic orchestration.',
    category: 'Bollywood & Indian',
    level: 'Intermediate',
    price: 999,
    originalPrice: 1499,
    rating: 4.98,
    reviewsCount: 420,
    studentsCount: 2800,
    duration: '15 Hours',
    lessonsCount: 40,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    instructor: instructors[1],
    description: 'Step inside the mindset of a high-end Bollywood soundtrack arranger. Learn how to convert complex orchestral tracks into full-sounding, expressive solo piano arrangements with signature interludes, rhythmic fills, and emotional chord extensions.',
    learningOutcomes: [
      'Master the 5 signature Bollywood chord progressions',
      'Play lush chord voicings with 9ths, 11ths, and suspended chords',
      'Execute blazing right-hand runs and glissandos used in cinematic climax scenes',
      'Structure complete arrangements with intro, verse, bridge, interlude, and finale'
    ],
    requirements: [
      'Knowledge of major and minor scales and basic triads',
      'Piano or touch-sensitive keyboard with sustain pedal'
    ],
    curriculum: [
      {
        id: 'mod-1',
        title: 'Module 1: The Harmonic Sound of Bollywood',
        lessons: [
          { id: 'bpm-1', title: 'Lesson 1: Minor 9th and Major 7th Voicings', duration: '21:00', isFreePreview: true },
          { id: 'bpm-2', title: 'Lesson 2: Decoding Signature Interludes by Ear', duration: '24:30', isFreePreview: true }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Complete Song Arrangements',
        lessons: [
          { id: 'bpm-3', title: 'Lesson 1: "Kesariya" Cinematic Solo Arrangement', duration: '32:00' },
          { id: 'bpm-4', title: 'Lesson 2: "Kal Ho Naa Ho" Tender Ballad Voicing', duration: '29:40' },
          { id: 'bpm-5', title: 'Lesson 3: Upbeat Dance Numbers Transposed for Solo Keys', duration: '27:10' }
        ]
      }
    ],
    reviews: [
      { id: 'rev-8', userName: 'Kavita Menon', rating: 5, date: '2 weeks ago', comment: 'The arrangement breakdown of Kesariya and Kal Ho Naa Ho is worth ten times the price.' }
    ],
    tags: ['Bollywood', 'Piano', 'Cinematic', 'Arranging']
  },
  {
    id: 'chord-melody-mastery',
    slug: 'chord-melody-mastery',
    title: 'Chord & Melody Mastery',
    subtitle: 'Weave harmony, walking basslines, and melodic leads into a unified solo performance.',
    category: 'Music Theory',
    level: 'Advanced',
    price: 999,
    originalPrice: 1499,
    rating: 4.96,
    reviewsCount: 290,
    studentsCount: 1750,
    duration: '17 Hours',
    lessonsCount: 44,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    instructor: instructors[0],
    description: 'Transform your musicianship from basic accompaniment into captivating solo performances. Learn the secret architecture of voicing leads on the highest finger while keeping rich harmonic chords and walking basslines singing beneath.',
    learningOutcomes: [
      'Master drop-2 voicings and upper structure triads',
      'Isolate the pinky finger to articulate the singing melody with volume control',
      'Integrate walking basslines and syncopated counter-melodies simultaneously',
      'Arrange jazz standards, cinematic themes, and indie ballads effortlessly'
    ],
    requirements: [
      'Confident knowledge of all 12 major and minor chords',
      'Intermediate to advanced hand independence'
    ],
    curriculum: [
      {
        id: 'mod-1',
        title: 'Module 1: The Inner Mechanics of Voice Leading',
        lessons: [
          { id: 'cm-1', title: 'Lesson 1: Melody on Top: The Pinky Dominance Technique', duration: '23:10', isFreePreview: true },
          { id: 'cm-2', title: 'Lesson 2: Drop-2 Voicings Explained Practically', duration: '26:40', isFreePreview: true }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Counterpoint and Walking Bass',
        lessons: [
          { id: 'cm-3', title: 'Lesson 1: Adding Movement Under Held Chords', duration: '25:15' },
          { id: 'cm-4', title: 'Lesson 2: Modal Re-harmonization of Classic Melodies', duration: '31:20' }
        ]
      }
    ],
    reviews: [
      { id: 'rev-9', userName: 'Alexander Wright', rating: 5, date: '3 weeks ago', comment: 'Julian takes university-level jazz harmony and turns it into intuitive muscle memory.' }
    ],
    tags: ['Theory', 'Advanced', 'Harmony', 'Solo Performance']
  }
];

// Enrich curriculum lessons with rich multi-format learning resources
function enrichCurriculumWithResources(courseList) {
  return courseList.map((course) => ({
    ...course,
    curriculum: (course.curriculum || []).map((mod) => ({
      ...mod,
      lessons: (mod.lessons || []).map((lesson) => {
        const cleanTitle = lesson.title.replace(/^Lesson \d+:\s*/, '');
        const slug = lesson.id;
        const isFree = !!lesson.isFreePreview;

        const defaultVideo = lesson.video || {
          id: `vid_${slug}`,
          title: lesson.title,
          fileName: `${slug}-4k-lecture-video.mp4`,
          fileSize: '820 MB',
          duration: lesson.duration || '15:00',
          resolution: '4K',
          uploadStatus: 'ready',
          access: isFree ? 'free_preview' : 'enrolled_only',
          uploadedAt: '2026-02-15',
          storageKey: `courses/${course.id}/videos/${slug}.mp4`,
          storageProvider: 'cloudflare_stream'
        };

        const defaultResources = lesson.resources || [
          {
            id: `res_${slug}_pdf`,
            title: `${cleanTitle} – Masterclass Notes`,
            type: 'PDF',
            category: 'notes',
            fileName: `${slug}-masterclass-notes.pdf`,
            fileSize: '4.2 MB',
            mimeType: 'application/pdf',
            description: `Official comprehensive printable lecture notes, harmonic theory, and practice recommendations for ${cleanTitle}.`,
            uploadStatus: 'ready',
            access: isFree ? 'free_preview' : 'enrolled_only',
            uploadedAt: '2026-02-16',
            storageKey: `courses/${course.id}/docs/${slug}-notes.pdf`,
            storageProvider: 'aws_s3'
          },
          {
            id: `res_${slug}_sheet`,
            title: `${cleanTitle} – Practice Sheet Music`,
            type: 'PDF',
            category: 'practice_sheet',
            fileName: `${slug}-sheet-music.pdf`,
            fileSize: '2.8 MB',
            mimeType: 'application/pdf',
            description: `Engraved musical notation with fingering annotations, pedal markings, and tempo benchmarks.`,
            uploadStatus: 'ready',
            access: 'enrolled_only',
            uploadedAt: '2026-02-16',
            storageKey: `courses/${course.id}/docs/${slug}-sheet.pdf`,
            storageProvider: 'aws_s3'
          },
          {
            id: `res_${slug}_audio`,
            title: `${cleanTitle} – Ear Training & Practice Audio`,
            type: 'AUDIO',
            category: 'audio',
            fileName: `${slug}-audio-practice-stem.mp3`,
            fileSize: '7.9 MB',
            duration: '06:45',
            mimeType: 'audio/mpeg',
            description: `High-fidelity audio track recorded on Steinway D concert grand for pitch reference and play-along practice.`,
            uploadStatus: 'ready',
            access: 'enrolled_only',
            uploadedAt: '2026-02-17',
            storageKey: `courses/${course.id}/audio/${slug}-stem.mp3`,
            storageProvider: 'aws_s3'
          },
          {
            id: `res_${slug}_diagram`,
            title: `${cleanTitle} – Key & Finger Placement Diagram`,
            type: 'IMAGE',
            category: 'image',
            fileName: `${slug}-keyboard-diagram.png`,
            fileSize: '1.4 MB',
            mimeType: 'image/png',
            description: `Visual reference graphic highlighting key positions, interval distances, and wrist angles.`,
            uploadStatus: 'ready',
            access: isFree ? 'free_preview' : 'enrolled_only',
            uploadedAt: '2026-02-17',
            storageKey: `courses/${course.id}/images/${slug}-diagram.png`,
            storageProvider: 'aws_s3'
          }
        ];

        return {
          ...lesson,
          video: defaultVideo,
          resources: defaultResources
        };
      })
    }))
  }));
}

export const courses = enrichCurriculumWithResources(rawCourses);

