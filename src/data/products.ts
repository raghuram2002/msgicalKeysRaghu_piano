import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'jalsa-piano-tutorial',
    slug: 'jalsa-piano-tutorial-pack',
    title: 'Jalsa Piano Tutorial & Sheet Music Pack',
    category: 'Song Tutorials',
    price: 14,
    originalPrice: 24,
    rating: 4.97,
    reviewsCount: 168,
    description: 'Master Devi Sri Prasad’s iconic high-energy rhythm track. Includes full two-handed note-for-note arrangement, Synthesia visualizer video, accurate sheet music (PDF), and MIDI files.',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    sampleAudio: 'High quality 320kbps WAV arrangement preview included',
    includes: [
      'Full 4K Video Breakdown (Slow & Normal Speeds)',
      'Accurate Standard Notation & Lead Sheet (PDF)',
      'Multi-track MIDI file for DAWs & Synthesia',
      'WAV Backing Track with Rhythm Percussion'
    ],
    fileFormat: 'ZIP (PDF, MIDI, MP4, WAV)',
    fileSize: '480 MB',
    featured: true,
    reviews: [
      { id: 'pr-1', userName: 'Karthik Rao', rating: 5, date: '1 week ago', comment: 'The left hand syncopation was explained so cleanly! Worth every penny.' },
      { id: 'pr-2', userName: 'Deepak V.', rating: 5, date: '2 weeks ago', comment: 'Accurate MIDI and sheet music. Loaded right into my iPad sheet reader.' }
    ]
  },
  {
    id: 'chuttamalle-piano-tutorial',
    slug: 'chuttamalle-piano-tutorial-pack',
    title: 'Chuttamalle Romantic Piano Tutorial & Stems',
    category: 'Piano Tutorials',
    price: 15,
    originalPrice: 26,
    rating: 4.98,
    reviewsCount: 210,
    description: 'Anirudh’s soulful romantic chartbuster arranged for emotional solo piano. Captures the breezy, intimate vocal embellishments with lush left-hand arpeggios.',
    thumbnail: 'https://images.unsplash.com/photo-1520523839898-507127053e14?auto=format&fit=crop&w=1000&q=80',
    sampleAudio: 'Emotive acoustic grand piano preview',
    includes: [
      'Step-by-step melodic phrasing masterclass video',
      'Studio Quality Sheet Music with pedaling notations',
      'Performance MIDI File with full touch velocity',
      'Isolated Piano Stems for practice'
    ],
    fileFormat: 'ZIP (PDF, MP4, MIDI, WAV)',
    fileSize: '520 MB',
    featured: true,
    reviews: [
      { id: 'pr-3', userName: 'Swathi Mohan', rating: 5, date: '3 days ago', comment: 'I played this at my sister’s engagement! Everyone was touched.' }
    ]
  },
  {
    id: 'popular-bollywood-piano-pack',
    slug: 'popular-bollywood-piano-pack',
    title: 'Popular Bollywood Piano Pack (10 Iconic Songs)',
    category: 'Piano Tutorials',
    price: 39,
    originalPrice: 79,
    rating: 4.99,
    reviewsCount: 385,
    description: 'A curated compilation of 10 legendary Bollywood romantic and acoustic tracks arranged across beginner and intermediate levels. From A.R. Rahman classics to modern Pritam hits.',
    thumbnail: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?auto=format&fit=crop&w=1000&q=80',
    sampleAudio: '10-song medley preview',
    includes: [
      '10 Comprehensive Video Tutorials with on-screen keys',
      '10 Professional PDF Sheet Music Booklets',
      'Individual MIDI Files for every song',
      'Audio Backing Tracks with Indian percussion accompaniment'
    ],
    fileFormat: 'ZIP (PDF, MIDI, Audio, Video)',
    fileSize: '2.4 GB',
    featured: true,
    reviews: [
      { id: 'pr-4', userName: 'Amitabh Sen', rating: 5, date: '1 month ago', comment: 'The best investment for any Indian piano student. Clear finger markings.' }
    ]
  },
  {
    id: 'beginner-guitar-song-pack',
    slug: 'beginner-guitar-song-pack',
    title: 'Beginner Guitar Song Pack (Tabs + Strumming Audio)',
    category: 'Guitar Tutorials',
    price: 24,
    originalPrice: 45,
    rating: 4.92,
    reviewsCount: 142,
    description: 'Start jamming immediately with 12 popular acoustic anthems arranged with simple open chords and verified strumming patterns.',
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80',
    sampleAudio: 'Acoustic guitar strumming preview',
    includes: [
      '12 Clean Chord & Tab Sheets (PDF)',
      'Click-track audio guide for strumming timing',
      'Slow-motion finger placement video tips',
      'Guitar Pro 7 & 8 companion files'
    ],
    fileFormat: 'ZIP (PDF, GPX, MP3)',
    fileSize: '320 MB',
    featured: true,
    reviews: [
      { id: 'pr-5', userName: 'Sarah Jenkins', rating: 5, date: '2 weeks ago', comment: 'The strumming audio loops made keeping time so simple.' }
    ]
  },
  {
    id: 'indian-melody-piano-collection',
    slug: 'indian-melody-piano-collection',
    title: 'Indian Melody Piano Collection: Raags & Rhythms',
    category: 'Digital Downloads',
    price: 34,
    originalPrice: 65,
    rating: 4.96,
    reviewsCount: 220,
    description: 'Comprehensive study package focusing on Raag Yaman, Bhairavi, and Bilawal motifs translated onto modern piano with left-hand tanpura and ambient sound beds.',
    thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1000&q=80',
    sampleAudio: 'Tanpura and grand piano ambient audio',
    includes: [
      'Raag Scale Charts & Western Transcriptions (PDF)',
      '25 Practice Audio Drone Tracks (High-Res Tanpura in all 12 keys)',
      'Exercise Etudes for grace notes and rapid finger rolls',
      'MIDI Etudes Collection'
    ],
    fileFormat: 'ZIP (PDF, WAV, MIDI)',
    fileSize: '1.1 GB',
    featured: false,
    reviews: [
      { id: 'pr-6', userName: 'Gaurav K.', rating: 5, date: '1 month ago', comment: 'The drone tracks in all 12 keys are indispensable for my daily morning practice.' }
    ]
  },
  {
    id: 'cinematic-ambient-backing-tracks',
    slug: 'cinematic-ambient-backing-tracks',
    title: 'Cinematic Ambient Backing Tracks for Solo Improvisation',
    category: 'Backing Tracks',
    price: 19,
    originalPrice: 35,
    rating: 4.94,
    reviewsCount: 95,
    description: '15 lush, orchestral and analog synthesizer soundscapes engineered specifically for piano and guitar solo improvisation without muddy frequencies.',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    sampleAudio: 'Lush atmospheric pad soundscape',
    includes: [
      '15 Extended Backing Tracks (5+ minutes each, lossless WAV)',
      'Scale and Mode Suggestion Guides for each track',
      'Tempo and Harmonic key cheat-sheet'
    ],
    fileFormat: 'ZIP (WAV, MP3, PDF)',
    fileSize: '850 MB',
    featured: false,
    reviews: [
      { id: 'pr-7', userName: 'Neil Armstrong Jr.', rating: 5, date: '3 weeks ago', comment: 'These atmospheric soundscapes make anything you play sound like Hans Zimmer.' }
    ]
  },
  {
    id: 'piano-voicing-handbook',
    slug: 'piano-voicing-handbook-pdf-midi',
    title: 'The Master Piano Voicing Handbook (PDF + 120 MIDI Files)',
    category: 'Practice Resources',
    price: 29,
    originalPrice: 50,
    rating: 4.95,
    reviewsCount: 178,
    description: 'Stop playing boring root-position chords. Master rich 7th, 9th, 11th voicings, two-handed quartal spreads, and neo-soul gospel passing chords.',
    thumbnail: 'https://images.unsplash.com/photo-1520523839898-507127053e14?auto=format&fit=crop&w=1000&q=80',
    sampleAudio: 'Neo-soul lush chord progression',
    includes: [
      '110-Page Illustrated Chord Voicing Compendium (PDF)',
      '120 Drag-and-drop MIDI Voicings for immediate study in your DAW',
      'Hand spacing diagrams and voice leading guidelines'
    ],
    fileFormat: 'ZIP (PDF, MIDI)',
    fileSize: '145 MB',
    featured: false,
    reviews: [
      { id: 'pr-8', userName: 'Zachary Cole', rating: 5, date: '1 month ago', comment: 'Instantly modernized my piano arrangements. Worth every cent.' }
    ]
  }
];
