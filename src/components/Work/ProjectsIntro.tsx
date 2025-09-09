import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Spline from '@splinetool/react-spline';

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
  cursor: pointer;
`;

export const ProjectsIntro: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

  const scrollToProjects = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <IntroSection
      ref={ref}
      style={{
        y,
        opacity
      }}
    >
      <Spline 
        scene={`https://prod.spline.design/kqVytWJ5TgSGdTbB/scene.splinecode?t=${Date.now()}`}
        style={{ width: '100%', height: '100%' }}
      />
      
      <ScrollIndicator
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        onClick={scrollToProjects}
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