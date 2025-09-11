export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  duration: string; // fake duration for music player simulation
  musicUrl?: string; // background music for each project
}

export interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  image: string;
  processVideo?: string; // Optional process video URL
}

export interface Tab {
  id: 'work' | 'art' | 'about';
  label: string;
}

export interface PlayerState {
  isPlaying: boolean;
  currentProjectIndex: number;
  progress: number;
  duration: number;
  volume: number; // 0-1 for volume control
  isMuted: boolean; // mute state
}

export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    surface: string;
    surfaceLight: string;
    accent: string;
    accentHover: string;
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    border: string;
    hover: string;
  };
  // ... other theme properties
};