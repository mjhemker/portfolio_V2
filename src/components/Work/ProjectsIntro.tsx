import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Spline from '@splinetool/react-spline/next';

const IntroSection = styled(motion.div)`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  z-index: 20;
  pointer-events: auto;
`;

export const ProjectsIntro: React.FC = () => {
  return (
    <IntroSection>
      <Spline scene="https://prod.spline.design/kqVytWJ5TgSGdTbB/scene.splinecode" />
      
      <ScrollIndicator
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </ScrollIndicator>
    </IntroSection>
  );
};