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

const particleDrift = keyframes`
  0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-10vh) translateX(200px) rotate(360deg); opacity: 0; }
`;

const energyPulse = keyframes`
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    filter: brightness(1) hue-rotate(0deg);
  }
  33% { 
    transform: scale(1.2) rotate(120deg);
    filter: brightness(1.3) hue-rotate(60deg);
  }
  66% { 
    transform: scale(0.8) rotate(240deg);
    filter: brightness(0.8) hue-rotate(120deg);
  }
`;

const heatWave = keyframes`
  0%, 100% { 
    transform: translateY(0px) scaleY(1);
    filter: blur(20px) hue-rotate(0deg);
  }
  50% { 
    transform: translateY(-20px) scaleY(1.1);
    filter: blur(30px) hue-rotate(180deg);
  }
`;

const ambientGlow = keyframes`
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    opacity: 0.4;
    filter: hue-rotate(0deg) brightness(1);
  }
  25% { 
    transform: scale(1.1) rotate(90deg);
    opacity: 0.7;
    filter: hue-rotate(90deg) brightness(1.2);
  }
  50% { 
    transform: scale(0.9) rotate(180deg);
    opacity: 0.3;
    filter: hue-rotate(180deg) brightness(0.8);
  }
  75% { 
    transform: scale(1.05) rotate(270deg);
    opacity: 0.6;
    filter: hue-rotate(270deg) brightness(1.1);
  }
`;

const BackgroundTransition = styled.div<{ $isPlaying: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: ${({ $isPlaying }) => $isPlaying ? 'transparent' : '#0a0a0a'};
  transition: all 0.5s ease;
  
  ${({ $isPlaying }) => $isPlaying && css`
    background: linear-gradient(-45deg, 
      #0a0a0a 0%,
      #2a1a3a 15%,
      #1a2a4a 35%,
      #3a1a2a 55%,
      #1a3a2a 75%,
      #2a1a4a 85%,
      #0a0a0a 100%);
    background-size: 600% 600%;
    animation: ${pulseGlow} 8s ease-in-out infinite;
    
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
  z-index: 1;
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
    background: radial-gradient(circle, rgba(138, 43, 226, 0.8) 0%, rgba(138, 43, 226, 0.4) 40%, transparent 80%);
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
    background: radial-gradient(circle, rgba(30, 144, 255, 0.8) 0%, rgba(30, 144, 255, 0.4) 40%, transparent 80%);
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
  z-index: 4;
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
      rgba(138, 43, 226, 0.3) 20%,
      rgba(30, 144, 255, 0.25) 40%,
      rgba(138, 43, 226, 0.3) 60%,
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
      rgba(30, 144, 255, 0.2) 30%,
      rgba(138, 43, 226, 0.15) 50%,
      rgba(30, 144, 255, 0.2) 70%,
      transparent 100%);
    animation: ${waveEffect} 12s ease-in-out infinite reverse;
  }
`;

const ParticleField = styled.div<{ $isPlaying: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
  opacity: ${({ $isPlaying }) => $isPlaying ? 1 : 0};
  transition: opacity 1.5s ease;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 10%;
    width: 12px;
    height: 12px;
    background: radial-gradient(circle, rgba(138, 43, 226, 1) 0%, rgba(138, 43, 226, 0.6) 50%, transparent 80%);
    border-radius: 50%;
    animation: ${particleDrift} 25s linear infinite;
    box-shadow: 
      200px 0 0 rgba(138, 43, 226, 0.9),
      400px -100px 0 rgba(30, 144, 255, 1),
      -100px -50px 0 rgba(138, 43, 226, 0.8),
      600px -200px 0 rgba(30, 144, 255, 0.7),
      800px -80px 0 rgba(138, 43, 226, 0.9),
      300px -300px 0 rgba(30, 144, 255, 1),
      500px -150px 0 rgba(138, 43, 226, 0.8),
      100px -250px 0 rgba(30, 144, 255, 0.9);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    right: 15%;
    width: 10px;
    height: 10px;
    background: radial-gradient(circle, rgba(30, 144, 255, 1) 0%, rgba(30, 144, 255, 0.6) 50%, transparent 80%);
    border-radius: 50%;
    animation: ${particleDrift} 20s linear infinite 5s;
    box-shadow: 
      -150px -50px 0 rgba(30, 144, 255, 1),
      -300px -100px 0 rgba(138, 43, 226, 0.9),
      100px -150px 0 rgba(30, 144, 255, 0.8),
      -500px -200px 0 rgba(138, 43, 226, 0.7),
      -250px -250px 0 rgba(30, 144, 255, 1),
      -50px -300px 0 rgba(138, 43, 226, 0.8),
      -400px -50px 0 rgba(30, 144, 255, 0.9);
  }
`;

const EnergyField = styled.div<{ $isPlaying: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  pointer-events: none;
  opacity: ${({ $isPlaying }) => $isPlaying ? 1 : 0};
  transition: opacity 2s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 25%;
    left: 5%;
    width: 180px;
    height: 180px;
    background: conic-gradient(
      from 0deg,
      rgba(138, 43, 226, 0.0) 0deg,
      rgba(138, 43, 226, 0.4) 90deg,
      rgba(30, 144, 255, 0.3) 180deg,
      rgba(138, 43, 226, 0.4) 270deg,
      rgba(138, 43, 226, 0.0) 360deg
    );
    border-radius: 50%;
    animation: ${energyPulse} 4s ease-in-out infinite;
    filter: blur(40px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 15%;
    right: 10%;
    width: 220px;
    height: 220px;
    background: conic-gradient(
      from 180deg,
      rgba(30, 144, 255, 0.0) 0deg,
      rgba(30, 144, 255, 0.5) 90deg,
      rgba(138, 43, 226, 0.4) 180deg,
      rgba(30, 144, 255, 0.3) 270deg,
      rgba(30, 144, 255, 0.0) 360deg
    );
    border-radius: 50%;
    animation: ${energyPulse} 5s ease-in-out infinite reverse 2s;
    filter: blur(35px);
  }
`;

const HeatShimmer = styled.div<{ $isPlaying: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
  opacity: ${({ $isPlaying }) => $isPlaying ? 0.6 : 0};
  transition: opacity 2.5s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 40%;
    left: 30%;
    width: 40%;
    height: 20%;
    background: linear-gradient(135deg, 
      rgba(138, 43, 226, 0.2) 0%,
      rgba(30, 144, 255, 0.15) 50%,
      rgba(138, 43, 226, 0.1) 100%);
    animation: ${heatWave} 3s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 60%;
    right: 25%;
    width: 35%;
    height: 15%;
    background: linear-gradient(-45deg, 
      rgba(30, 144, 255, 0.18) 0%,
      rgba(138, 43, 226, 0.12) 50%,
      rgba(30, 144, 255, 0.08) 100%);
    animation: ${heatWave} 4s ease-in-out infinite reverse 1.5s;
  }
`;

const AmbientGlow = styled.div<{ $isPlaying: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 6;
  pointer-events: none;
  opacity: ${({ $isPlaying }) => $isPlaying ? 0.8 : 0};
  transition: opacity 3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at 20% 30%, 
      rgba(138, 43, 226, 0.15) 0%, 
      transparent 50%),
    radial-gradient(ellipse at 80% 70%, 
      rgba(30, 144, 255, 0.12) 0%, 
      transparent 50%),
    radial-gradient(ellipse at 50% 10%, 
      rgba(138, 43, 226, 0.08) 0%, 
      transparent 40%);
    animation: ${ambientGlow} 20s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at 70% 20%, 
      rgba(30, 144, 255, 0.1) 0%, 
      transparent 45%),
    radial-gradient(ellipse at 10% 80%, 
      rgba(138, 43, 226, 0.12) 0%, 
      transparent 55%);
    animation: ${ambientGlow} 25s ease-in-out infinite reverse 10s;
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
      <AmbientGlow $isPlaying={playerState.isPlaying} />
      <BackgroundTransition $isPlaying={playerState.isPlaying} />
      <HeatShimmer $isPlaying={playerState.isPlaying} />
      <WaveOverlay $isPlaying={playerState.isPlaying} />
      <EnergyField $isPlaying={playerState.isPlaying} />
      <ParticleField $isPlaying={playerState.isPlaying} />
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
