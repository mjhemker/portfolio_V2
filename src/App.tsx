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

const pulseGlow = keyframes`
  0%, 100% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg) brightness(1);
  }
  50% { 
    background-position: 100% 50%;
    filter: hue-rotate(30deg) brightness(1.2);
  }
`;

const floatingOrbs = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -20px) scale(1.1); }
  50% { transform: translate(-10px, -30px) scale(0.9); }
  75% { transform: translate(-20px, 10px) scale(1.05); }
`;

const rhythmPulse = keyframes`
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const waveEffect = keyframes`
  0% { transform: translateX(-100%) skewX(0deg); }
  50% { transform: translateX(0%) skewX(10deg); }
  100% { transform: translateX(100%) skewX(0deg); }
`;

const BackgroundTransition = styled.div<{ $isPlaying: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -20;
  background: #0a0a0a;
  transition: all 0.5s ease;
  
  ${({ $isPlaying }) => $isPlaying && css`
    background: linear-gradient(-45deg, 
      #0a0a0a 0%,
      #2a1a3a 25%,
      #1a2a4a 50%,
      #3a1a2a 75%,
      #0a0a0a 100%);
    background-size: 400% 400%;
    animation: ${pulseGlow} 6s ease-in-out infinite;
    
    &::before {
      content: '';
      position: absolute;
      top: 15%;
      left: 10%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, rgba(138, 43, 226, 0.1) 40%, transparent 70%);
      border-radius: 50%;
      animation: ${floatingOrbs} 15s ease-in-out infinite;
      filter: blur(40px);
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 10%;
      right: 5%;
      width: 350px;
      height: 350px;
      background: radial-gradient(circle, rgba(30, 144, 255, 0.25) 0%, rgba(30, 144, 255, 0.08) 40%, transparent 70%);
      border-radius: 50%;
      animation: ${floatingOrbs} 12s ease-in-out infinite reverse;
      filter: blur(30px);
    }
  `}
  
  ${({ $isPlaying }) => $isPlaying && css`
    &::before {
      animation: ${floatingOrbs} 12s ease-in-out infinite, ${rhythmPulse} 2s ease-in-out infinite;
    }
    
    &::after {
      animation: ${floatingOrbs} 10s ease-in-out infinite reverse, ${rhythmPulse} 2.5s ease-in-out infinite;
    }
  `}
`;

const MusicEffects = styled.div<{ $isPlaying: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -15;
  pointer-events: none;
  opacity: ${({ $isPlaying }) => $isPlaying ? 1 : 0};
  transition: opacity 1s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    right: 10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(138, 43, 226, 0.4) 0%, transparent 60%);
    border-radius: 50%;
    animation: ${sparkle} 3s ease-in-out infinite;
    filter: blur(20px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 30%;
    left: 15%;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(30, 144, 255, 0.4) 0%, transparent 60%);
    border-radius: 50%;
    animation: ${sparkle} 2.5s ease-in-out infinite 1s;
    filter: blur(25px);
  }
`;

const WaveOverlay = styled.div<{ $isPlaying: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -18;
  pointer-events: none;
  opacity: ${({ $isPlaying }) => $isPlaying ? 1 : 0};
  transition: opacity 1s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%,
      rgba(138, 43, 226, 0.1) 20%,
      rgba(30, 144, 255, 0.08) 40%,
      rgba(138, 43, 226, 0.1) 60%,
      transparent 100%);
    animation: ${waveEffect} 8s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%,
      rgba(30, 144, 255, 0.06) 30%,
      rgba(138, 43, 226, 0.04) 50%,
      rgba(30, 144, 255, 0.06) 70%,
      transparent 100%);
    animation: ${waveEffect} 12s ease-in-out infinite reverse;
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
      <WaveOverlay $isPlaying={playerState.isPlaying} />
      <MusicEffects $isPlaying={playerState.isPlaying} />
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
