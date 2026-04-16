import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import styled, { keyframes, css } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { AppProvider, useAppContext } from './contexts/AppContext';
import { Navigation } from './components/Navigation/Navigation';
import { WorkTab } from './components/Work/WorkTab';
import { ArtTab } from './components/Art/ArtTab';
import { AboutTab } from './components/About/AboutTab';
import { useKeyboardControls } from './hooks/useKeyboardControls';

// Consolidated to 3 key animations for better performance
const pulseGlow = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const floatingOrbs = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  50% { transform: translate(10px, -15px) scale(1.05); opacity: 0.8; }
`;

const ambientPulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
`;

// Main background with gradient animation - GPU accelerated
const BackgroundTransition = styled.div<{ $isPlaying: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: #0a0a0a;
  transition: background 0.5s ease;
  will-change: ${({ $isPlaying }) => $isPlaying ? 'background' : 'auto'};

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    &::before, &::after {
      animation: none !important;
    }
  }

  ${({ $isPlaying }) => $isPlaying && css`
    background: linear-gradient(-45deg,
      #0a0a0a 0%,
      #2a1a3a 25%,
      #1a2a4a 50%,
      #2a1a3a 75%,
      #0a0a0a 100%);
    background-size: 400% 400%;
    animation: ${pulseGlow} 12s ease-in-out infinite;

    &::before {
      content: '';
      position: absolute;
      top: 15%;
      left: 10%;
      width: 350px;
      height: 350px;
      background: radial-gradient(circle, rgba(138, 43, 226, 0.25) 0%, transparent 70%);
      border-radius: 50%;
      animation: ${floatingOrbs} 8s ease-in-out infinite;
      filter: blur(40px);
      will-change: transform, opacity;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 15%;
      right: 10%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(30, 144, 255, 0.2) 0%, transparent 70%);
      border-radius: 50%;
      animation: ${floatingOrbs} 10s ease-in-out infinite reverse;
      filter: blur(30px);
      will-change: transform, opacity;
    }
  `}
`;

// Simplified ambient glow layer - single element instead of multiple
const AmbientGlow = styled.div<{ $isPlaying: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
  opacity: ${({ $isPlaying }) => $isPlaying ? 1 : 0};
  transition: opacity 1s ease;
  will-change: opacity;

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    &::before {
      animation: none !important;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(ellipse at 20% 30%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(30, 144, 255, 0.08) 0%, transparent 50%);
    animation: ${ambientPulse} 6s ease-in-out infinite;
    will-change: opacity;
  }
`;

const AppContent: React.FC = () => {
  const { activeTab, playerState } = useAppContext();
  
  // Initialize keyboard controls
  useKeyboardControls();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'work':
        return <WorkTab key="work" />;
      case 'art':
        return <ArtTab key="art" />;
      case 'about':
        return <AboutTab key="about" />;
      default:
        return <WorkTab key="work" />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <BackgroundTransition $isPlaying={playerState.isPlaying} />
      <AmbientGlow $isPlaying={playerState.isPlaying} />
      <Navigation />
      <AnimatePresence mode="wait">
        {renderActiveTab()}
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
