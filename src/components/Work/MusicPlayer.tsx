import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, ExternalLink, Github } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { projects } from '../../data/projects';
import { Button } from '../UI/Button';

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
`;

// Keyframes for animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(138, 43, 226, 0.3); }
  50% { box-shadow: 0 0 40px rgba(138, 43, 226, 0.6); }
`;

const ripple = keyframes`
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.4); opacity: 0; }
`;



const ProjectDisplay = styled(motion.div)<{ $isPlaying: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${({ $isPlaying }) => $isPlaying && css`
    animation: ${glow} 3s ease-in-out infinite;
    border-color: rgba(138, 43, 226, 0.5);
  `}
  
  &:hover {
    transform: perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ProjectImageContainer = styled(motion.div)<{ $isPlaying: boolean }>`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: 1.5rem;
  overflow: hidden;
  
  ${({ $isPlaying }) => $isPlaying && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, 
        rgba(138, 43, 226, 0.2) 0%, 
        rgba(30, 144, 255, 0.2) 50%, 
        rgba(138, 43, 226, 0.2) 100%);
      z-index: 2;
      animation: ${ripple} 4s ease-in-out infinite;
    }
  `}

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ProjectImage = styled(motion.img)<{ $isPlaying: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  
  ${({ $isPlaying }) => $isPlaying && css`
    filter: brightness(1.1) saturate(1.2);
    transform: scale(1.05);
  `}
`;

const ProjectInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProjectTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const ProjectDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

const ProjectLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Controls = styled(motion.div)<{ $isPlaying: boolean }>`
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  
  ${({ $isPlaying }) => $isPlaying && css`
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.secondary} 0%, 
      rgba(138, 43, 226, 0.05) 100%);
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(138, 43, 226, 0.8) 50%, 
      transparent 100%);
    transform: translateX(-100%);
    ${({ $isPlaying }) => $isPlaying && css`
      animation: ${ripple} 2s ease-in-out infinite;
    `}
  }
`;

const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PlayButton = styled(motion.button)<{ $isPlaying: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
  overflow: hidden;
  
  ${({ $isPlaying }) => $isPlaying && css`
    animation: ${float} 2s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(138, 43, 226, 0.6);
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      border: 2px solid rgba(138, 43, 226, 0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: ${ripple} 2s ease-in-out infinite;
    }
  `}
  
  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    transform: scale(1.1);
    box-shadow: 0 0 25px rgba(138, 43, 226, 0.8);
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)<{ $isPlaying: boolean }>`
  height: 100%;
  background: ${({ $isPlaying }) => $isPlaying 
    ? 'linear-gradient(90deg, #8A2BE2, #1E90FF, #8A2BE2)' 
    : '${({ theme }) => theme.colors.accent}'};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  position: relative;
  
  ${({ $isPlaying }) => $isPlaying && css`
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.3) 50%, 
        transparent 100%);
      animation: ${ripple} 1.5s ease-in-out infinite;
    }
  `}
`;

const TimeDisplay = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-variant-numeric: tabular-nums;
  min-width: 40px;
`;

const NowPlayingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

// Audio Visualizer Component
const VisualizerContainer = styled.div<{ $isPlaying: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 40px;
  margin: 1rem 0;
  opacity: ${({ $isPlaying }) => $isPlaying ? 1 : 0.3};
  transition: opacity 0.3s ease;
`;

const VisualizerBar = styled(motion.div)<{ $height: number; $delay: number }>`
  width: 3px;
  background: linear-gradient(180deg, #8A2BE2, #1E90FF);
  border-radius: 2px;
  height: ${({ $height }) => $height}%;
`;

const AudioVisualizer: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  const bars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    height: Math.random() * 60 + 20,
    delay: i * 0.025
  }));

  return (
    <VisualizerContainer $isPlaying={isPlaying}>
      {bars.map((bar) => (
        <VisualizerBar
          key={bar.id}
          $height={bar.height}
          $delay={bar.delay}
          animate={isPlaying ? {
            height: [bar.height + '%', (Math.random() * 60 + 20) + '%', bar.height + '%']
          } : {}}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: bar.delay,
            ease: 'easeInOut' as const
          }}
        />
      ))}
    </VisualizerContainer>
  );
};

// Floating Particles Component
const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Particle = styled(motion.div)<{ $size: number; $color: string }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: ${({ $color }) => $color};
  border-radius: 50%;
  filter: blur(1px);
`;

const FloatingParticles: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    color: i % 2 === 0 ? 'rgba(138, 43, 226, 0.6)' : 'rgba(30, 144, 255, 0.6)',
    initialX: Math.random() * 100,
    initialY: Math.random() * 100
  }));

  if (!isPlaying) return null;

  return (
    <ParticlesContainer>
      <AnimatePresence>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            $size={particle.size}
            $color={particle.color}
            initial={{ 
              x: `${particle.initialX}%`, 
              y: `${particle.initialY}%`,
              opacity: 0
            }}
            animate={{
              x: [`${particle.initialX}%`, `${(particle.initialX + 50) % 100}%`],
              y: [`${particle.initialY}%`, `${(particle.initialY + 30) % 100}%`],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: particle.id * 0.5,
              ease: 'linear' as const
            }}
          />
        ))}
      </AnimatePresence>
    </ParticlesContainer>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds);
  const secs = Math.floor((seconds % 1) * 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface MusicPlayerProps {
  showControlsOnly?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ showControlsOnly = false }) => {
  const { playerState, setPlayerState } = useAppContext();
  const [localProgress, setLocalProgress] = useState(0);
  
  const currentProject = projects[playerState.currentProjectIndex];

  useEffect(() => {
    let interval: number;
    
    if (playerState.isPlaying) {
      interval = setInterval(() => {
        setLocalProgress((prev) => {
          const newProgress = prev + 0.1;
          if (newProgress >= playerState.duration) {
            // Auto-advance to next project
            setPlayerState((state) => ({
              ...state,
              currentProjectIndex: (state.currentProjectIndex + 1) % projects.length
            }));
            return 0;
          }
          return newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [playerState.isPlaying, playerState.duration, setPlayerState]);

  useEffect(() => {
    setLocalProgress(0);
  }, [playerState.currentProjectIndex]);

  const handlePlayPause = () => {
    setPlayerState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };

  const handlePrevious = () => {
    const newIndex = playerState.currentProjectIndex === 0 
      ? projects.length - 1 
      : playerState.currentProjectIndex - 1;
    setPlayerState((prev) => ({
      ...prev,
      currentProjectIndex: newIndex
    }));
    setLocalProgress(0);
  };

  const handleNext = () => {
    const newIndex = (playerState.currentProjectIndex + 1) % projects.length;
    setPlayerState((prev) => ({
      ...prev,
      currentProjectIndex: newIndex
    }));
    setLocalProgress(0);
  };

  const progressPercentage = (localProgress / playerState.duration) * 100;

  // For controls-only mode, just show the visualizer and controls
  if (showControlsOnly) {
    return (
      <Controls 
        $isPlaying={playerState.isPlaying}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <AudioVisualizer isPlaying={playerState.isPlaying} />
        
        <ControlButtons>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              icon={<SkipBack size={20} />} 
              onClick={handlePrevious}
            />
          </motion.div>
          <PlayButton 
            $isPlaying={playerState.isPlaying}
            onClick={handlePlayPause}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {playerState.isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Pause size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Play size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </PlayButton>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              icon={<SkipForward size={20} />} 
              onClick={handleNext}
            />
          </motion.div>
        </ControlButtons>
        
        <ProgressContainer>
          <TimeDisplay>{formatTime(localProgress)}</TimeDisplay>
          <ProgressBar>
            <ProgressFill
              $isPlaying={playerState.isPlaying}
              style={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.1 }}
            />
          </ProgressBar>
          <TimeDisplay>{formatTime(playerState.duration)}</TimeDisplay>
        </ProgressContainer>
        
        <NowPlayingInfo>
          <span>Now Playing:</span>
          <span>{currentProject.title}</span>
          <span>•</span>
          <span>{currentProject.duration}</span>
        </NowPlayingInfo>
      </Controls>
    );
  }

  // Don't render music player for Pantreat or INKD
  if (currentProject.id === '1' || currentProject.id === '2') {
    return null;
  }

  return (
    <PlayerContainer>
      <ProjectDisplay
        key={currentProject.id}
        $isPlaying={playerState.isPlaying}
        initial={{ opacity: 0, x: 50, rotateY: 15 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        exit={{ opacity: 0, x: -50, rotateY: -15 }}
        transition={{ duration: 0.5, type: 'spring' as const, stiffness: 100 }}
        whileHover={{ 
          rotateX: 2, 
          rotateY: 2, 
          scale: 1.02,
          transition: { duration: 0.2, ease: "easeOut" as const }
        }}
      >
        <ProjectImageContainer $isPlaying={playerState.isPlaying}>
          <ProjectImage
            src={currentProject.image}
            alt={currentProject.title}
            $isPlaying={playerState.isPlaying}
            initial={{ scale: 1.1 }}
            animate={{ scale: playerState.isPlaying ? 1.05 : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
          />
          <FloatingParticles isPlaying={playerState.isPlaying} />
        </ProjectImageContainer>
        
        <ProjectInfo>
          <ProjectTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {currentProject.title}
          </ProjectTitle>
          
          <ProjectDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentProject.description}
          </ProjectDescription>
          
          <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1rem 0' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentProject.technologies.map((tech) => (
              <span 
                key={tech}
                style={{
                  background: 'var(--theme-colors-surface)',
                  color: 'var(--theme-colors-text-primary)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: '1px solid var(--theme-colors-border)'
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>
          
          <ProjectLinks
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {currentProject.liveUrl && (
              <Button
                variant="primary"
                icon={<ExternalLink size={16} />}
                onClick={() => window.open(currentProject.liveUrl, '_blank')}
              >
                Live Demo
              </Button>
            )}
            {currentProject.repoUrl && (
              <Button
                variant="secondary"
                icon={<Github size={16} />}
                onClick={() => window.open(currentProject.repoUrl, '_blank')}
              >
                Source Code
              </Button>
            )}
          </ProjectLinks>
        </ProjectInfo>
      </ProjectDisplay>

      <Controls 
        $isPlaying={playerState.isPlaying}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AudioVisualizer isPlaying={playerState.isPlaying} />
        
        <ControlButtons>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              icon={<SkipBack size={20} />} 
              onClick={handlePrevious}
            />
          </motion.div>
          <PlayButton 
            $isPlaying={playerState.isPlaying}
            onClick={handlePlayPause}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {playerState.isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Pause size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Play size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </PlayButton>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              icon={<SkipForward size={20} />} 
              onClick={handleNext}
            />
          </motion.div>
        </ControlButtons>
        
        <ProgressContainer>
          <TimeDisplay>{formatTime(localProgress)}</TimeDisplay>
          <ProgressBar>
            <ProgressFill
              $isPlaying={playerState.isPlaying}
              style={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.1 }}
            />
          </ProgressBar>
          <TimeDisplay>{formatTime(playerState.duration)}</TimeDisplay>
        </ProgressContainer>
        
        <NowPlayingInfo>
          <span>Now Playing:</span>
          <span>{currentProject.title}</span>
          <span>•</span>
          <span>{currentProject.duration}</span>
        </NowPlayingInfo>
      </Controls>
    </PlayerContainer>
  );
};