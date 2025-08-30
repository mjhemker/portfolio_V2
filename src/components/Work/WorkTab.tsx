import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicPlayer } from './MusicPlayer';
import { ProjectQueue } from './ProjectQueue';
import { ProjectsIntro } from './ProjectsIntro';

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
  const [showIntro, setShowIntro] = useState(() => {
    // Check if user has seen the intro before (stored in localStorage)
    return localStorage.getItem('hasSeenProjectsIntro') !== 'true';
  });

  const handleIntroComplete = () => {
    localStorage.setItem('hasSeenProjectsIntro', 'true');
    setShowIntro(false);
  };

  // Reset intro visibility for development/testing (remove in production)
  useEffect(() => {
    const resetIntro = () => {
      if (window.location.search.includes('reset-intro')) {
        localStorage.removeItem('hasSeenProjectsIntro');
        setShowIntro(true);
      }
    };
    resetIntro();
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <ProjectsIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
      
      <WorkContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: showIntro ? 0 : 0 }}
        style={{ pointerEvents: showIntro ? 'none' : 'auto' }}
      >
        <PlayerSection>
          <MusicPlayer />
        </PlayerSection>
        <QueueSection>
          <ProjectQueue />
        </QueueSection>
      </WorkContainer>
    </>
  );
};