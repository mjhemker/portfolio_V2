import React, { useRef, Suspense } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Spline from '@splinetool/react-spline';

// Styled components
const IntroSection = styled(motion.div)`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000000;
  overflow: hidden;
  z-index: 10;
`;

const SplineContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ContentOverlay = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  pointer-events: none;
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  z-index: 5;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  z-index: 20;
  pointer-events: auto;
`;

export const ProjectsIntro: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

  return (
    <IntroSection
      ref={ref}
      style={{
        y,
        opacity
      }}
    >
      {/* Spline 3D Scene */}
      <SplineContainer>
        <Suspense fallback={
          <LoadingContainer>
            Loading 3D Scene...
          </LoadingContainer>
        }>
          <Spline
            scene="https://prod.spline.design/kqVytWJ5TgSGdTbB/scene.splinecode"
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent'
            }}
          />
        </Suspense>
      </SplineContainer>

      {/* Content Overlay */}
      <ContentOverlay>
        {/* Scroll Indicator */}
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
      </ContentOverlay>
    </IntroSection>
  );
};