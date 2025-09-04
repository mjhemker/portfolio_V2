import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Download, Instagram, Youtube } from 'lucide-react';
import { Button } from '../UI/Button';

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

const MainSection = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  margin-bottom: 6rem;
  min-height: 70vh;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 4rem;
    text-align: center;
    min-height: auto;
  }
`;

const TextSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1024px) {
    order: 2;
  }
`;

const ImageSection = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 100%;

  @media (max-width: 1024px) {
    order: 1;
    height: 500px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AboutTitle = styled.h1`
  font-size: 5rem;
  font-weight: 100;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.text.primary} 0%,
    rgba(138, 43, 226, 0.8) 50%,
    ${({ theme }) => theme.colors.text.primary} 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${shimmer} 3s ease-in-out infinite;
  margin-bottom: 3rem;
  letter-spacing: -0.04em;
  text-shadow: 0 0 50px rgba(138, 43, 226, 0.3);

  @media (max-width: 768px) {
    font-size: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoText = styled.p`
  font-size: 2rem;
  font-weight: 600;
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.text.primary} 0%,
    rgba(138, 43, 226, 0.9) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.3;
  margin: 0;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SubInfoText = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 300;
  line-height: 1.5;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BioText = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  margin: 0;
  max-width: 500px;
  position: relative;
  padding-left: 1.5rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(135deg, #8A2BE2, #1E90FF);
    border-radius: 2px;
  }
  

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PortraitImage = styled(motion.img)<{ $zIndex: number; $top: string; $left: string; $size: string; $rotation: number }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 20px;
  object-fit: cover;
  filter: grayscale(30%);
  transition: all 0.4s ease;
  z-index: ${({ $zIndex }) => $zIndex};
  transform: rotate(${({ $rotation }) => $rotation}deg);
  border: 2px solid rgba(138, 43, 226, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  &:hover {
    filter: grayscale(0%) brightness(1.1);
    transform: rotate(${({ $rotation }) => $rotation}deg) scale(1.05);
    z-index: 10;
    border-color: rgba(138, 43, 226, 0.6);
    box-shadow: 0 20px 50px rgba(138, 43, 226, 0.4);
  }

  @media (max-width: 768px) {
    width: calc(${({ $size }) => $size} * 0.8);
    height: calc(${({ $size }) => $size} * 0.8);
  }
`;

const ContactSection = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(138, 43, 226, 0.1) 0%,
    rgba(30, 144, 255, 0.1) 100%);
  border: 2px solid rgba(138, 43, 226, 0.3);
  border-radius: 25px;
  padding: 4rem 3rem;
  text-align: center;
  backdrop-filter: blur(20px);
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
      transparent 30%,
      rgba(138, 43, 226, 0.1) 50%,
      transparent 70%);
    background-size: 200% 200%;
    animation: ${shimmer} 4s ease-in-out infinite;
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const ConnectTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ConnectText = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }
`;

const ContactButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
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
    transform: translateY(-8px) scale(1.15);
    border-color: rgba(138, 43, 226, 0.6);
    box-shadow: 0 15px 35px rgba(138, 43, 226, 0.4);
    
    &::before {
      opacity: 1;
    }
    
    svg {
      color: white;
      z-index: 1;
      position: relative;
    }
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
  }
`;

export const AboutTab: React.FC = () => {
  return (
    <AboutContainer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <MainSection>
        <TextSection
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <AboutTitle>About me</AboutTitle>
          
          <PersonalInfo>
            <InfoText>Michael Hemker, 21</InfoText>
            <SubInfoText>Based in Palo Alto, CA and Baltimore, MD</SubInfoText>
            <SubInfoText>Attending Stanford University, Class of 2026</SubInfoText>
            <SubInfoText>Product Designer: Specializing in AI and Digital Design</SubInfoText>
            
            <BioText>
              I come from an extensive visual arts background. I have been drawing since I 
              was two and painting since 8th grade. Making art sparked my love for design 
              and creating things is a passion that will never be satiated.
            </BioText>
          </PersonalInfo>
        </TextSection>

        <ImageSection
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          <ImageContainer>
            <PortraitImage
              src="/images/about/red-light-portrait-1.jpeg"
              alt="Michael Hemker portrait 1"
              $zIndex={3}
              $top="10%"
              $left="20%"
              $size="280px"
              $rotation={-8}
              initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            />
            <PortraitImage
              src="/images/about/red-light-portrait-2.png"
              alt="Michael Hemker portrait 2"
              $zIndex={2}
              $top="40%"
              $left="45%"
              $size="260px"
              $rotation={5}
              initial={{ scale: 0.8, opacity: 0, rotate: 12 }}
              animate={{ scale: 1, opacity: 1, rotate: 5 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            />
            <PortraitImage
              src="/images/about/red-light-portrait-3.png"
              alt="Michael Hemker portrait 3"
              $zIndex={1}
              $top="15%"
              $left="60%"
              $size="240px"
              $rotation={12}
              initial={{ scale: 0.8, opacity: 0, rotate: 20 }}
              animate={{ scale: 1, opacity: 1, rotate: 12 }}
              transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
            />
          </ImageContainer>
        </ImageSection>
      </MainSection>

      <ContactSection
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
      >
        <ConnectTitle>Let's Connect</ConnectTitle>
        <ConnectText>
          I'm always open to discussing new opportunities, collaborating on interesting 
          projects, or just having a conversation about design, technology, and art.
        </ConnectText>
        
        <ContactButtons>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="primary"
              icon={<Mail size={18} />}
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
              icon={<Download size={18} />}
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
            whileHover={{ scale: 1.15, y: -8 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin size={26} />
          </SocialLink>
          <SocialLink
            href="https://www.instagram.com/hemkerart/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -8 }}
            whileTap={{ scale: 0.9 }}
          >
            <Instagram size={26} />
          </SocialLink>
          <SocialLink
            href="https://www.youtube.com/channel/UCFDWSmJpxUSYHJZe-68t6fQ"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -8 }}
            whileTap={{ scale: 0.9 }}
          >
            <Youtube size={26} />
          </SocialLink>
        </SocialLinks>
      </ContactSection>
    </AboutContainer>
  );
};