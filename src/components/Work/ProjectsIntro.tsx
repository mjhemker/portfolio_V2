import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Sparkles, Zap, Cpu, Rocket, ChevronDown } from 'lucide-react';

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(5deg); }
  66% { transform: translateY(-10px) rotate(-3deg); }
`;

const orbit = keyframes`
  0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

// Styled components
const IntroSection = styled(motion.div)`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    rgba(138, 43, 226, 0.1) 0%, 
    rgba(0, 0, 0, 0.95) 70%,
    #000000 100%);
  overflow: hidden;
  z-index: 10;
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
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  z-index: 20;
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

export const ProjectsIntro: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

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


  return (
    <IntroSection
      ref={ref}
      style={{
        y,
        opacity,
        scale
      }}
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
      <OrbitingIcon $radius={120} $duration={15}>
        <Sparkles size={20} />
      </OrbitingIcon>
      <OrbitingIcon $radius={100} $duration={12}>
        <Zap size={16} />
      </OrbitingIcon>

      {/* Main Content */}
      <MainTitle
        data-text="Michael Hemker"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" as const }}
        whileHover={{ 
          scale: 1.02,
          textShadow: "0 0 50px rgba(138, 43, 226, 0.5)"
        }}
      >
        Michael Hemker
      </MainTitle>

      <Subtitle 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" as const }}
      >
        I like making <span className="highlight">cool</span> and{' '}
        <span className="highlight">practical tools</span> with{' '}
        <span className="highlight">AI</span>
      </Subtitle>

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
    </IntroSection>
  );
};