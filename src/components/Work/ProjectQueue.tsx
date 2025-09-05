import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Zap } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { projects } from '../../data/projects';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const slideIn = keyframes`
  0% { transform: translateX(20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const QueueContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  height: 100%;
  overflow-y: auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      transparent 0%, 
      rgba(138, 43, 226, 0.02) 50%, 
      transparent 100%);
    pointer-events: none;
  }
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #8A2BE2, #1E90FF);
    border-radius: 3px;
  }
`;

const QueueHeader = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #8A2BE2, #1E90FF, #8A2BE2);
    border-radius: 1px;
    opacity: 0.6;
  }
`;

const QueueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const QueueItem = styled(motion.div)<{ $isActive: boolean; $isPlaying: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  background: ${({ $isActive }) => 
    $isActive ? 'linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(30, 144, 255, 0.1))' : 'transparent'
  };
  border: 1px solid ${({ $isActive }) => 
    $isActive ? 'rgba(138, 43, 226, 0.5)' : 'transparent'
  };
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${({ $isActive, $isPlaying }) => $isActive && $isPlaying && css`
    animation: ${pulse} 2s ease-in-out infinite;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      background: linear-gradient(180deg, #8A2BE2, #1E90FF);
      animation: ${slideIn} 0.3s ease;
    }
  `}

  &:hover {
    background: ${({ $isActive }) => 
      $isActive 
        ? 'linear-gradient(135deg, rgba(138, 43, 226, 0.15), rgba(30, 144, 255, 0.15))' 
        : 'rgba(138, 43, 226, 0.05)'
    };
    transform: translateX(5px) scale(1.02);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ThumbnailContainer = styled(motion.div)<{ $isActive: boolean; $isPlaying: boolean }>`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  flex-shrink: 0;
  
  ${({ $isActive, $isPlaying }) => $isActive && $isPlaying && css`
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(138, 43, 226, 0.3);
      backdrop-filter: blur(1px);
    }
  `}

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const ProjectThumbnail = styled(motion.img)<{ $isActive: boolean; $isPlaying: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  
  ${({ $isActive, $isPlaying }) => $isActive && $isPlaying && css`
    filter: brightness(1.2) saturate(1.3);
    transform: scale(1.1);
  `}
`;

const ProjectInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProjectTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProjectDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProjectDuration = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  flex-shrink: 0;
`;

const PlayIndicator = styled(motion.div)<{ $isPlaying: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent};
  background: rgba(138, 43, 226, 0.1);
  border-radius: 50%;
  border: 2px solid currentColor;
  
  ${({ $isPlaying }) => $isPlaying && css`
    animation: ${pulse} 1.5s ease-in-out infinite;
  `}
`;

const WaveIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1px;
  margin-right: 0.5rem;
`;

const WaveBar = styled(motion.div)`
  width: 2px;
  height: 12px;
  background: linear-gradient(180deg, #8A2BE2, #1E90FF);
  border-radius: 1px;
`;

const NowPlayingText = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const QueueCounter = styled.span`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const ProjectQueue: React.FC = () => {
  const { playerState, setPlayerState } = useAppContext();

  const handleProjectClick = (index: number) => {
    setPlayerState((prev) => ({
      ...prev,
      currentProjectIndex: index,
      isPlaying: false
    }));
  };

  return (
    <QueueContainer
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
    >
      <QueueHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" as const }}
      >
        <Music size={20} />
        Queue
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' as const }}
        >
          <QueueCounter>{projects.length}</QueueCounter>
        </motion.div>
      </QueueHeader>
      
      <QueueList>
        {projects.map((project, index) => {
          const isActive = index === playerState.currentProjectIndex;
          const isCurrentlyPlaying = isActive && playerState.isPlaying;
          
          return (
            <QueueItem
              key={project.id}
              $isActive={isActive}
              $isPlaying={isCurrentlyPlaying}
              onClick={() => handleProjectClick(index)}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            >
              <ThumbnailContainer 
                $isActive={isActive} 
                $isPlaying={isCurrentlyPlaying}
                whileHover={{ scale: 1.1 }}
              >
                <ProjectThumbnail
                  src={project.id === '3' ? '/projects_assets/fizz/fizz_app_icon.jpeg' : project.image}
                  alt={project.title}
                  $isActive={isActive}
                  $isPlaying={isCurrentlyPlaying}
                  animate={isCurrentlyPlaying ? {
                    scale: [1, 1.05, 1]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </ThumbnailContainer>
              
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDetails>
                  <span>{project.technologies[0]}</span>
                  {project.technologies.length > 1 && (
                    <span>+{project.technologies.length - 1}</span>
                  )}
                  {isActive && (
                    <NowPlayingText>
                      {isCurrentlyPlaying ? 'Now Playing' : 'Selected'}
                    </NowPlayingText>
                  )}
                </ProjectDetails>
              </ProjectInfo>
              
              <ProjectDuration>{project.duration}</ProjectDuration>
              
              <AnimatePresence>
                {isCurrentlyPlaying && (
                  <>
                    <WaveIndicator
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" as const }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <WaveBar
                          key={i}
                          animate={{
                            height: [8, 16, 8, 12, 8]
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeInOut' as const
                          }}
                        />
                      ))}
                    </WaveIndicator>
                    <PlayIndicator
                      $isPlaying={isCurrentlyPlaying}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Zap size={12} fill="currentColor" />
                    </PlayIndicator>
                  </>
                )}
              </AnimatePresence>
            </QueueItem>
          );
        })}
      </QueueList>
    </QueueContainer>
  );
};