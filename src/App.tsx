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
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.1); }
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
      #1a0a1a 25%,
      #0a0a1a 50%,
      #1a0a0a 75%,
      #0a0a0a 100%);
    background-size: 400% 400%;
    animation: ${pulseGlow} 8s ease-in-out infinite;
    
    &::before {
      content: '';
      position: absolute;
      top: 10%;
      left: 20%;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      animation: ${floatingOrbs} 12s ease-in-out infinite;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 20%;
      right: 15%;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, rgba(30, 144, 255, 0.08) 0%, transparent 70%);
      border-radius: 50%;
      animation: ${floatingOrbs} 10s ease-in-out infinite reverse;
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
