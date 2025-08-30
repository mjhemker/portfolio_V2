import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sparkles, Zap, Cpu, Rocket, ChevronDown } from 'lucide-react';

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(5deg); }
  66% { transform: translateY(-10px) rotate(-3deg); }
`;



const orbit = keyframes`
  0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

// Styled components
const IntroContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, 
    rgba(138, 43, 226, 0.1) 0%, 
    rgba(0, 0, 0, 0.9) 70%,
    #000000 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
`;

const ParticleField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const Particle = styled(motion.div)<{ 
  $size: number; 
  $color: string; 
  $duration: number;
  $delay: number;
}>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: ${({ $color }) => $color};
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0.6;
`;

const OrbitingIcon = styled(motion.div)<{ $radius: number; $duration: number }>`
  position: absolute;
  color: rgba(138, 43, 226, 0.8);
  animation: ${orbit} ${({ $duration }) => $duration}s linear infinite;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 900;
  background: linear-gradient(135deg, 
    #8A2BE2 0%, 
    #1E90FF 50%, 
    #00CED1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 0 30px rgba(138, 43, 226, 0.3);
  position: relative;
  
  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, 
      rgba(138, 43, 226, 0.3) 0%, 
      rgba(30, 144, 255, 0.3) 50%, 
      rgba(0, 206, 209, 0.3) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: blur(20px);
    z-index: -1;
  }

  @media (max-width: 768px) {
    font-size: clamp(2rem, 10vw, 3.5rem);
    margin-bottom: 1.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 4vw, 2rem);
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  max-width: 800px;
  line-height: 1.4;
  margin-bottom: 3rem;
  position: relative;
  
  .highlight {
    background: linear-gradient(135deg, #8A2BE2, #1E90FF);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: clamp(1rem, 5vw, 1.5rem);
    margin-bottom: 2rem;
  }
`;

const IconCloud = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const FloatingIcon = styled(motion.div)<{ $x: number; $y: number }>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  color: rgba(138, 43, 226, 0.4);
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${() => Math.random() * 3}s;
`;

const ContinueButton = styled(motion.button)`
  background: linear-gradient(135deg, #8A2BE2, #1E90FF);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 10px 30px rgba(138, 43, 226, 0.3);
  
  &:hover {
    box-shadow: 0 15px 40px rgba(138, 43, 226, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const SkipButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 1);
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const TwinkleEffect = styled.div<{ $x: number; $y: number; $delay: number }>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  animation: ${twinkle} 2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

interface ProjectsIntroProps {
  onComplete: () => void;
}

export const ProjectsIntro: React.FC<ProjectsIntroProps> = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    onComplete();
  };

  const handleContinue = () => {
    onComplete();
  };

  // Generate particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    color: i % 3 === 0 
      ? 'rgba(138, 43, 226, 0.8)' 
      : i % 3 === 1 
        ? 'rgba(30, 144, 255, 0.8)' 
        : 'rgba(0, 206, 209, 0.8)',
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5
  }));

  // Generate floating icons
  const floatingIcons = [
    { Icon: Code2, x: 20, y: 30 },
    { Icon: Sparkles, x: 80, y: 25 },
    { Icon: Zap, x: 15, y: 70 },
    { Icon: Cpu, x: 85, y: 75 },
    { Icon: Rocket, x: 50, y: 20 },
  ];

  // Generate twinkles
  const twinkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut" as const
      }
    }
  };

  const titleVariants = {
    hidden: { 
      y: 100, 
      opacity: 0, 
      rotateX: -90 
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 1.2
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      y: 50, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12,
        duration: 0.8
      }
    }
  };

  return (
    <AnimatePresence>
      <IntroContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Background Particles */}
        <ParticleField>
          {particles.map((particle) => (
            <Particle
              key={particle.id}
              $size={particle.size}
              $color={particle.color}
              $duration={particle.duration}
              $delay={particle.delay}
              initial={{
                x: `${particle.x}%`,
                y: `${particle.y}%`,
                opacity: 0
              }}
              animate={{
                x: [`${particle.x}%`, `${(particle.x + 30) % 100}%`, `${particle.x}%`],
                y: [`${particle.y}%`, `${(particle.y + 20) % 100}%`, `${particle.y}%`],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear" as const
              }}
            />
          ))}
        </ParticleField>

        {/* Twinkle Effects */}
        {twinkles.map((twinkle) => (
          <TwinkleEffect
            key={twinkle.id}
            $x={twinkle.x}
            $y={twinkle.y}
            $delay={twinkle.delay}
          />
        ))}

        {/* Floating Icons */}
        <IconCloud>
          {floatingIcons.map(({ Icon, x, y }, index) => (
            <FloatingIcon
              key={index}
              $x={x}
              $y={y}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 1.5 + index * 0.2, duration: 0.5, ease: "easeOut" as const }}
            >
              <Icon size={24} />
            </FloatingIcon>
          ))}
        </IconCloud>

        {/* Orbiting Icons */}
        <OrbitingIcon $radius={150} $duration={15}>
          <Sparkles size={20} />
        </OrbitingIcon>
        <OrbitingIcon $radius={120} $duration={12}>
          <Zap size={16} />
        </OrbitingIcon>

        {/* Skip Button */}
        <SkipButton
          onClick={handleSkip}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, ease: "easeOut" as const }}
        >
          Skip Intro
        </SkipButton>

        {/* Main Content */}
        <AnimatePresence>
          {showContent && (
            <>
              <MainTitle
                data-text="Michael Hemker"
                variants={titleVariants}
                whileHover={{ 
                  scale: 1.02,
                  textShadow: "0 0 50px rgba(138, 43, 226, 0.5)"
                }}
              >
                Michael Hemker
              </MainTitle>

              <Subtitle variants={subtitleVariants}>
                I like making <span className="highlight">cool</span> and{' '}
                <span className="highlight">practical tools</span> with{' '}
                <span className="highlight">AI</span>
              </Subtitle>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6, ease: "easeOut" as const }}
              >
                <ContinueButton
                  onClick={handleContinue}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 50px rgba(138, 43, 226, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore My Work
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </ContinueButton>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </IntroContainer>
    </AnimatePresence>
  );
};