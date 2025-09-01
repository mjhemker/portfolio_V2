import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MusicPlayer } from './MusicPlayer';
import { ProjectQueue } from './ProjectQueue';
import { ProjectsIntro } from './ProjectsIntro';
import { ProjectModal } from './ProjectModal';
import { ProjectPreview } from './ProjectPreview';

const WorkContainer = styled(motion.div)`
  display: flex;
  height: 100vh;
  padding: 6rem 2rem 2rem;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
      >
        <PlayerSection>
          <ProjectPreview onProjectClick={handleProjectClick} />
          <MusicPlayer />
        </PlayerSection>
        <QueueSection>
          <ProjectQueue onProjectModalOpen={() => setIsProjectModalOpen(true)} />
        </QueueSection>
      </WorkContainer>
      
      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={handleCloseModal}
      />
    </>
  );
};