import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { MusicPlayer } from './MusicPlayer';
import { ProjectQueue } from './ProjectQueue';
import { ProjectsIntro } from './ProjectsIntro';
import { ProjectModal } from './ProjectModal';
import { ProjectPreview } from './ProjectPreview';
import { INKDPreview } from './INKDPreview';
import { FizzPreview } from './FizzPreview';
import { useAppContext } from '../../contexts/AppContext';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const ripple = keyframes`
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.4); opacity: 0; }
`;

const WorkContainer = styled(motion.div)<{ $isPlaying: boolean }>`
  display: flex;
  height: 100vh;
  padding: 6rem 2rem 2rem;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  
  ${({ $isPlaying }) => $isPlaying && css`
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 30% 70%, 
        rgba(138, 43, 226, 0.05) 0%, 
        transparent 50%),
      radial-gradient(circle at 80% 20%, 
        rgba(30, 144, 255, 0.03) 0%, 
        transparent 50%);
      z-index: -1;
      animation: ${float} 8s ease-in-out infinite;
      pointer-events: none;
    }
    
    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, 
        transparent 0%,
        rgba(138, 43, 226, 0.02) 25%,
        transparent 50%,
        rgba(30, 144, 255, 0.02) 75%,
        transparent 100%);
      z-index: -1;
      animation: ${ripple} 6s ease-in-out infinite;
      pointer-events: none;
    }
  `}

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 6rem 1rem 1rem;
    gap: 1rem;
  }
`;

const PlayerSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 1.5rem;
`;

const QueueSection = styled.div`
  width: 350px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    order: -1;
    max-height: 200px;
  }
`;

export const WorkTab: React.FC = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const { playerState } = useAppContext();
  
  const getCurrentProjectId = () => {
    switch (playerState.currentProjectIndex) {
      case 0: return '1';
      case 1: return '2'; 
      case 2: return '3';
      default: return '1';
    }
  };

  const handleProjectClick = () => {
    setIsProjectModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsProjectModalOpen(false);
  };

  return (
    <>
      <ProjectsIntro />
      <WorkContainer
        $isPlaying={playerState.isPlaying}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
      >
        <PlayerSection>
          {playerState.currentProjectIndex === 0 ? (
            <ProjectPreview onProjectClick={handleProjectClick} />
          ) : playerState.currentProjectIndex === 1 ? (
            <INKDPreview onProjectClick={handleProjectClick} />
          ) : playerState.currentProjectIndex === 2 ? (
            <FizzPreview onProjectClick={handleProjectClick} />
          ) : (
            <MusicPlayer key={playerState.currentProjectIndex} />
          )}
          <MusicPlayer showControlsOnly={true} />
        </PlayerSection>
        <QueueSection>
          <ProjectQueue />
        </QueueSection>
      </WorkContainer>
      
      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={handleCloseModal}
        projectId={getCurrentProjectId()}
      />
    </>
  );
};