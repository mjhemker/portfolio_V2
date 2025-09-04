import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Download, MapPin, Calendar, Instagram, Youtube, Palette, Code, Lightbulb } from 'lucide-react';
import { Button } from '../UI/Button';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 30px rgba(138, 43, 226, 0.3); }
  50% { box-shadow: 0 0 60px rgba(138, 43, 226, 0.6); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const AboutContainer = styled(motion.div)`
  padding: 6rem 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    padding: 6rem 1rem 1rem;
  }
`;

const HeroSection = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  margin-bottom: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const ProfileSection = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileCard = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(138, 43, 226, 0.1) 0%,
    rgba(30, 144, 255, 0.1) 50%,
    rgba(138, 43, 226, 0.1) 100%);
  border: 2px solid rgba(138, 43, 226, 0.3);
  border-radius: 30px;
  padding: 3rem 2rem;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  text-align: center;
  width: 100%;
  max-width: 400px;
  animation: ${glow} 4s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      transparent 20%,
      rgba(138, 43, 226, 0.6) 50%,
      transparent 80%);
    background-size: 400% 400%;
    border-radius: 32px;
    z-index: -1;
    animation: ${shimmer} 3s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, 
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.7) 100%);
    border-radius: 28px;
    z-index: -1;
  }
`;

const NameTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #8A2BE2, #1E90FF, #8A2BE2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const RoleTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2rem;
`;

const LocationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const StorySection = styled(motion.div)`
  position: relative;
`;

const StoryCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 3rem;
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(138, 43, 226, 0.05) 0%,
      rgba(30, 144, 255, 0.05) 50%,
      rgba(138, 43, 226, 0.05) 100%);
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const StoryTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StoryText = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }

  &::first-letter {
    font-size: 3rem;
    font-weight: bold;
    float: left;
    line-height: 1;
    margin-right: 0.5rem;
    margin-top: 0.25rem;
    background: linear-gradient(135deg, #8A2BE2, #1E90FF);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SkillsShowcase = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const SkillCard = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.03) 0%,
    rgba(138, 43, 226, 0.08) 100%);
  border: 1px solid rgba(138, 43, 226, 0.2);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(138, 43, 226, 0.4);
    box-shadow: 0 20px 40px rgba(138, 43, 226, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(138, 43, 226, 0.1) 90deg,
      transparent 180deg,
      rgba(30, 144, 255, 0.1) 270deg,
      transparent 360deg
    );
    animation: ${float} 8s linear infinite;
    z-index: -1;
  }
`;

const SkillIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #8A2BE2, #1E90FF);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  animation: ${glow} 3s ease-in-out infinite;
`;

const SkillTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const SkillDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.span`
  background: rgba(138, 43, 226, 0.2);
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(138, 43, 226, 0.3);
`;

const ContactSection = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(138, 43, 226, 0.1) 0%,
    rgba(30, 144, 255, 0.1) 100%);
  border: 2px solid rgba(138, 43, 226, 0.3);
  border-radius: 25px;
  padding: 3rem;
  text-align: center;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  margin-top: 4rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      transparent 30%,
      rgba(138, 43, 226, 0.1) 50%,
      transparent 70%);
    background-size: 200% 200%;
    animation: ${shimmer} 4s ease-in-out infinite;
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ContactTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const ContactText = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ContactButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    rgba(138, 43, 226, 0.2) 0%,
    rgba(30, 144, 255, 0.2) 100%);
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.3s ease;
  border: 2px solid rgba(138, 43, 226, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #8A2BE2, #1E90FF);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 50%;
  }

  &:hover {
    transform: translateY(-5px) scale(1.1);
    border-color: rgba(138, 43, 226, 0.6);
    box-shadow: 0 10px 30px rgba(138, 43, 226, 0.4);
    
    &::before {
      opacity: 1;
    }
    
    svg {
      color: white;
      z-index: 1;
      position: relative;
    }
  }
`;

const skillsData = [
  {
    icon: <Palette size={24} />,
    title: 'Visual Arts',
    description: 'Drawing since age 2, painting since 8th grade. Traditional and digital art with deep understanding of color theory and composition.',
    tags: ['Drawing (19+ years)', 'Painting (8+ years)', 'Digital Art', 'Color Theory']
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Product Design',
    description: 'Specializing in AI-powered design solutions and creating intuitive user experiences that bridge technology and human needs.',
    tags: ['AI Integration', 'UX Design', 'Product Strategy', 'Prototyping']
  },
  {
    icon: <Code size={24} />,
    title: 'Technology',
    description: 'Combining design thinking with technical implementation to build functional, beautiful digital experiences.',
    tags: ['React & TypeScript', 'Design Systems', 'Frontend Dev', 'User Research']
  }
];

export const AboutTab: React.FC = () => {
  return (
    <AboutContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <HeroSection>
        <ProfileSection
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <ProfileCard
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <NameTitle>Michael Hemker</NameTitle>
            <RoleTitle>Product Designer</RoleTitle>
            <LocationInfo>
              <LocationItem>
                <MapPin size={16} />
                Palo Alto, CA • Baltimore, MD
              </LocationItem>
              <LocationItem>
                <Calendar size={16} />
                Stanford University, Class of 2026
              </LocationItem>
            </LocationInfo>
          </ProfileCard>
        </ProfileSection>

        <StorySection
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <StoryCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <StoryTitle>
              <Palette size={28} />
              My Story
            </StoryTitle>
            <StoryText>
              I come from an extensive visual arts background. I have been drawing since I was two and painting since 8th grade. Making art sparked my love for design and creating things is a passion that will never be satiated.
            </StoryText>
            <StoryText>
              Currently attending Stanford University, I specialize in AI and digital design, combining my artistic foundation with cutting-edge technology to create meaningful user experiences that bridge the gap between human creativity and technological innovation.
            </StoryText>
          </StoryCard>
        </StorySection>
      </HeroSection>

      <SkillsShowcase
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {skillsData.map((skill, index) => (
          <SkillCard
            key={skill.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <SkillIcon>{skill.icon}</SkillIcon>
            <SkillTitle>{skill.title}</SkillTitle>
            <SkillDescription>{skill.description}</SkillDescription>
            <SkillTags>
              {skill.tags.map((tag) => (
                <SkillTag key={tag}>{tag}</SkillTag>
              ))}
            </SkillTags>
          </SkillCard>
        ))}
      </SkillsShowcase>

      <ContactSection
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileHover={{ scale: 1.01 }}
      >
        <ContactTitle>
          <Mail size={28} />
          Let's Connect
        </ContactTitle>
        <ContactText>
          I'm always open to discussing new opportunities, collaborating on interesting 
          projects, or just having a conversation about design, technology, and art.
        </ContactText>
        
        <ContactButtons>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="primary"
              icon={<Mail size={16} />}
              onClick={() => window.location.href = 'mailto:hello@example.com'}
            >
              Send Email
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="secondary"
              icon={<Download size={16} />}
              onClick={() => {
                alert('Resume download would start here');
              }}
            >
              Download Resume
            </Button>
          </motion.div>
        </ContactButtons>

        <SocialLinks>
          <SocialLink
            href="https://www.linkedin.com/in/michael-hemker-71549425b/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin size={24} />
          </SocialLink>
          <SocialLink
            href="https://www.instagram.com/hemkerart/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Instagram size={24} />
          </SocialLink>
          <SocialLink
            href="https://www.youtube.com/channel/UCFDWSmJpxUSYHJZe-68t6fQ"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Youtube size={24} />
          </SocialLink>
        </SocialLinks>
      </ContactSection>
    </AboutContainer>
  );
};