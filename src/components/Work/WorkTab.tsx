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
import { PocketPeoplePreview } from './PocketPeoplePreview';
import { VinnieHagerPreview } from './VinnieHagerPreview';
import { PeripheryPodcastPreview } from './PeripheryPodcastPreview';
import { MakeANotePreview } from './MakeANotePreview';
import { VideoEssaysPreview } from './VideoEssaysPreview';
import { useAppContext } from '../../contexts/AppContext';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const ripple = keyframes`
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.4); opacity: 0; }
`;

const TransitionSection = styled(motion.div)`
  position: relative;
  background: linear-gradient(180deg, 
    transparent 0%, 
    rgba(0, 0, 0, 0.1) 20%,
    rgba(10, 10, 10, 0.8) 60%,
    #0a0a0a 100%
  );
  min-height: 100vh;
  z-index: 2;
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
    height: auto;
    min-height: 100vh;
    padding: 2rem 1rem 4rem;
    gap: 2rem;
  }
`;

const PlayerSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
    order: 2;
  }
`;

const QueueSection = styled.div`
  width: 350px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    order: 1;
    max-height: none;
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
      case 3: return '4';
      case 4: return '5';
      case 5: return '6';
      case 6: return '7';
      case 7: return '8';
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
      <TransitionSection
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
      >
        <WorkContainer
          $isPlaying={playerState.isPlaying}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
        >
        <PlayerSection>
          {playerState.currentProjectIndex === 0 ? (
            <ProjectPreview onProjectClick={handleProjectClick} />
          ) : playerState.currentProjectIndex === 1 ? (
            <INKDPreview onProjectClick={handleProjectClick} />
          ) : playerState.currentProjectIndex === 2 ? (
            <FizzPreview onProjectClick={handleProjectClick} />
          ) : playerState.currentProjectIndex === 3 ? (
            <PocketPeoplePreview onProjectClick={handleProjectClick} />
          ) : playerState.currentProjectIndex === 4 ? (
            <VinnieHagerPreview onProjectClick={handleProjectClick} />
          ) : playerState.currentProjectIndex === 5 ? (
            <PeripheryPodcastPreview onProjectClick={handleProjectClick} />
          ) : playerState.currentProjectIndex === 6 ? (
            <MakeANotePreview onProjectClick={handleProjectClick} />
          ) : playerState.currentProjectIndex === 7 ? (
            <VideoEssaysPreview onProjectClick={handleProjectClick} />
          ) : (
            <MusicPlayer key={playerState.currentProjectIndex} />
          )}
          <MusicPlayer showControlsOnly={true} />
        </PlayerSection>
        <QueueSection>
          <ProjectQueue />
        </QueueSection>
        </WorkContainer>
      </TransitionSection>
      
      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={handleCloseModal}
        projectId={getCurrentProjectId()}
      />
    </>
  );
};