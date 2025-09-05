import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Pantreat',
    description: 'AI-Kitchen assistant that makes cooking cool again. Your all-in-one solution for recipe discovery, pantry management, and culinary inspiration.',
    technologies: ['React Native', 'TypeScript', 'Supabase', 'OpenAI API', 'Expo'],
    image: '/projects_assets/pantreat/app_cover.png',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/example',
    duration: '4:28'
  },
  {
    id: '2',
    title: 'INKD',
    description: 'Social platform connecting tattoo artists and enthusiasts. Discover artists, explore designs, and book appointments in your local area.',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Google Maps', 'Stripe'],
    image: '/projects_assets/inkd/INKD_app_version1.png',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/example',
    duration: '4:12'
  },
  {
    id: '3',
    title: 'Fizz Redesign',
    description: 'Reimagining the student social network for growth and new opportunities. A comprehensive UI redesign with new features for project collaboration and job opportunities.',
    technologies: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research', 'Design Systems'],
    image: '/projects_assets/fizz/fizz_redesign.png',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/example',
    duration: '3:45'
  },
  {
    id: '4',
    title: 'Portfolio Website',
    description: 'Creative portfolio website with smooth animations, dark mode support, and optimized performance using modern web technologies.',
    technologies: ['Next.js', 'Framer Motion', 'Styled Components', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/example',
    duration: '3:21'
  },
  {
    id: '5',
    title: 'AI Chat Interface',
    description: 'Modern chat interface for AI interactions with syntax highlighting, message history, and customizable themes.',
    technologies: ['React', 'OpenAI API', 'WebSocket', 'Prism.js', 'Context API'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/example',
    duration: '4:33'
  },
  {
    id: '6',
    title: 'Music Streaming UI',
    description: 'Spotify-inspired music streaming interface with playlist management, audio visualization, and responsive design.',
    technologies: ['React', 'Web Audio API', 'Canvas', 'CSS Grid', 'Local Storage'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/example',
    duration: '5:17'
  }
];