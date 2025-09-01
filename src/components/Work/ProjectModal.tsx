import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ExternalLink, Github } from 'lucide-react';
import { Modal } from '../UI/Modal';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  width: 95vw;
  max-width: 1200px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ScrollContainer = styled.div`
  max-height: 90vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 140, 0, 0.3) transparent;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 140, 0, 0.3);
    border-radius: 3px;
  }
`;

const HeroSection = styled.div`
  position: relative;
  background: linear-gradient(135deg, 
    rgba(255, 140, 0, 0.15) 0%, 
    rgba(255, 69, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.9) 100%);
  padding: 4rem 3rem;
  text-align: center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/projects_assets/pantreat/iphone_app_mockups/pantreat_mockup1.png') center/contain no-repeat;
    opacity: 0.1;
    filter: blur(2px);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ProjectLogo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 20px 40px rgba(255, 140, 0, 0.3);
  filter: drop-shadow(0 0 20px rgba(255, 140, 0, 0.4));
`;

const ProjectTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ff8c00, #ff4500, #ff6b35);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 140, 0, 0.3);
`;

const ProjectTagline = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 3rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.2), rgba(255, 69, 0, 0.1));
  border: 2px solid rgba(255, 140, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem 2rem;
  color: #ff8c00;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 140, 0, 0.3), rgba(255, 69, 0, 0.2));
    border-color: rgba(255, 140, 0, 0.6);
    box-shadow: 0 8px 25px rgba(255, 140, 0, 0.2);
  }
`;

const FeatureSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid rgba(255, 140, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff8c00, #ff4500);
  }
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #ff8c00;
  margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const MediaShowcase = styled.div`
  padding: 3rem;
  background: linear-gradient(135deg, 
    rgba(255, 140, 0, 0.05) 0%, 
    rgba(0, 0, 0, 0.95) 100%);
`;

const ShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainMediaCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid rgba(255, 140, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  position: relative;
`;

const SideMediaGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #ff8c00, #ff4500);
    border-radius: 2px;
  }
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const MediaCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid rgba(255, 140, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 140, 0, 0.5);
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(255, 140, 0, 0.15);
  }
`;

const MediaImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const MediaInfo = styled.div`
  padding: 1rem;
`;

const MediaTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const PlayButton = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.9), rgba(255, 69, 0, 0.9));
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  pointer-events: none;
  box-shadow: 0 8px 25px rgba(255, 140, 0, 0.3);
`;

const VideoWrapper = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const DescriptionText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  margin-bottom: 2rem;
  
  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin: 2rem 0 1rem 0;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const TechStackSection = styled.div`
  margin-bottom: 2rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TechTag = styled.span`
  background: rgba(255, 140, 0, 0.1);
  color: #ff8c00;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: 1px solid rgba(255, 140, 0, 0.2);
`;

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const mediaItems = [
    {
      type: 'image',
      src: '/projects_assets/pantreat/iphone_app_mockups/pantreat_mockup1.png',
      title: 'App Mockups',
      description: 'UI/UX design showcasing the main interface'
    },
    {
      type: 'video',
      src: '/projects_assets/pantreat/demo_videos/MyPantry.mp4',
      title: 'My Pantry Feature',
      description: 'Inventory management and organization'
    },
    {
      type: 'video',
      src: '/projects_assets/pantreat/demo_videos/recipes.mp4',
      title: 'Recipe Discovery',
      description: 'AI-powered recipe suggestions'
    },
    {
      type: 'video',
      src: '/projects_assets/pantreat/demo_videos/input+filters.mp4',
      title: 'Smart Filtering',
      description: 'Ingredient-based recipe filtering'
    }
  ];

  const handleVideoClick = (src: string) => {
    setPlayingVideo(playingVideo === src ? null : src);
  };

  const description = `
**Your all-in-one AI-Kitchen assistant that makes cooking cool again.**
Unlike other kitchen aids (meal services or smart fridges that cost a fortune), all you need is your **phone and an appetite.**

### Background
I grew up in a household where cooking was not just a task, but a way to bring people together — a way to prioritize health as well as the wallet. Sadly, this isn't the case for many younger generations today.

Society has set the narrative that *"Gen Z Can't Cook."* But what Gen Z **is** good at is learning from each other. Pantreat taps into this habit, giving Gen Z a platform to do what they do best — influence and inspire one another.

### How Pantreat Helps

**Organization:** Cooking consistently is hard. Plans change, value packs pile up, and suddenly you're staring at a fridge full of forgotten ingredients. Pantreat helps you make meals with what you already have and keeps you organized with expiration reminders.

**Reduces Anxiety:** Pantreat's Cook Mode acts as your custom AI-sous chef, walking you through recipes step-by-step with built-in timers, voice responses, and smart substitutions.

**Excitement & Discovery:** The feed features short-form cooking videos from friends, influencers, and creators. Unlike Instagram or TikTok, every video has an attached recipe and auto-adjusting grocery list.
  `;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <CloseButton
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </CloseButton>

        <ScrollContainer>
          <HeroSection>
            <LogoContainer>
              <ProjectLogo 
                src="/projects_assets/pantreat/app+name.png" 
                alt="Pantreat Logo"
              />
            </LogoContainer>
            <ProjectTitle>Pantreat</ProjectTitle>
            <ProjectTagline>
              Your all-in-one AI-Kitchen assistant that makes cooking cool again.
              Unlike expensive meal services or smart fridges, all you need is your phone and an appetite.
            </ProjectTagline>
            
            <ActionButtons>
              <ActionButton
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={20} />
                Watch Demo
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                View Code
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} />
                Live Demo
              </ActionButton>
            </ActionButtons>
          </HeroSection>

          <FeatureSection>
            <FeatureCard
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FeatureTitle>🎯 Problem</FeatureTitle>
              <FeatureText>
                Society has set the narrative that "Gen Z Can't Cook." But what Gen Z is good at 
                is learning from each other. After interviewing ~30 students and young adults, 
                the three biggest cooking struggles were: Organization, Anxiety, and Lack of Excitement.
              </FeatureText>
            </FeatureCard>
            
            <FeatureCard
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FeatureTitle>💡 Solution</FeatureTitle>
              <FeatureText>
                Pantreat taps into Gen Z's habit of learning from social media. It combines AI-powered 
                recipe suggestions, pantry management, and a TikTok-style feed where every cooking 
                video has an attached recipe and instant grocery ordering.
              </FeatureText>
            </FeatureCard>
          </FeatureSection>

          <MediaShowcase>
            <SectionTitle>Product Journey</SectionTitle>
            
            <ShowcaseGrid>
              <MainMediaCard
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <VideoWrapper onClick={() => handleVideoClick('/projects_assets/pantreat/demo_videos/MyPantry.mp4')}>
                  <VideoPlayer
                    src="/projects_assets/pantreat/demo_videos/MyPantry.mp4"
                    muted
                    loop
                    playsInline
                    ref={(video) => {
                      if (video) {
                        if (playingVideo === '/projects_assets/pantreat/demo_videos/MyPantry.mp4') {
                          video.play();
                        } else {
                          video.pause();
                        }
                      }
                    }}
                  />
                  <AnimatePresence>
                    {playingVideo !== '/projects_assets/pantreat/demo_videos/MyPantry.mp4' && (
                      <PlayButton
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Play size={32} />
                      </PlayButton>
                    )}
                  </AnimatePresence>
                </VideoWrapper>
              </MainMediaCard>
              
              <SideMediaGrid>
                <MediaCard
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <MediaImage src="/projects_assets/pantreat/iphone_app_mockups/pantreat_mockup1.png" alt="App Mockups" />
                  <MediaInfo>
                    <MediaTitle>UI/UX Design</MediaTitle>
                  </MediaInfo>
                </MediaCard>
                
                <MediaCard
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <VideoWrapper onClick={() => handleVideoClick('/projects_assets/pantreat/demo_videos/recipes.mp4')}>
                    <VideoPlayer
                      src="/projects_assets/pantreat/demo_videos/recipes.mp4"
                      muted
                      loop
                      playsInline
                      style={{ height: '120px' }}
                      ref={(video) => {
                        if (video) {
                          if (playingVideo === '/projects_assets/pantreat/demo_videos/recipes.mp4') {
                            video.play();
                          } else {
                            video.pause();
                          }
                        }
                      }}
                    />
                    <AnimatePresence>
                      {playingVideo !== '/projects_assets/pantreat/demo_videos/recipes.mp4' && (
                        <PlayButton
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Play size={20} />
                        </PlayButton>
                      )}
                    </AnimatePresence>
                  </VideoWrapper>
                  <MediaInfo>
                    <MediaTitle>Recipe Discovery</MediaTitle>
                  </MediaInfo>
                </MediaCard>
              </SideMediaGrid>
            </ShowcaseGrid>

            
            <MediaGrid>
              <MediaCard
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <VideoWrapper onClick={() => handleVideoClick('/projects_assets/pantreat/demo_videos/input+filters.mp4')}>
                  <VideoPlayer
                    src="/projects_assets/pantreat/demo_videos/input+filters.mp4"
                    muted
                    loop
                    playsInline
                    style={{ height: '150px' }}
                    ref={(video) => {
                      if (video) {
                        if (playingVideo === '/projects_assets/pantreat/demo_videos/input+filters.mp4') {
                          video.play();
                        } else {
                          video.pause();
                        }
                      }
                    }}
                  />
                  <AnimatePresence>
                    {playingVideo !== '/projects_assets/pantreat/demo_videos/input+filters.mp4' && (
                      <PlayButton
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Play size={20} />
                      </PlayButton>
                    )}
                  </AnimatePresence>
                </VideoWrapper>
                <MediaInfo>
                  <MediaTitle>Smart Filtering</MediaTitle>
                </MediaInfo>
              </MediaCard>
              
              <MediaCard
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <MediaImage src="/projects_assets/pantreat/screen_shots/App_preview_Cook.png" alt="Cook Mode" />
                <MediaInfo>
                  <MediaTitle>AI Cook Mode</MediaTitle>
                </MediaInfo>
              </MediaCard>
            </MediaGrid>
            
            <TechStackSection>
              <SectionTitle>Built With</SectionTitle>
              <TechStack>
                <TechTag>React Native</TechTag>
                <TechTag>TypeScript</TechTag>
                <TechTag>Expo</TechTag>
                <TechTag>Supabase</TechTag>
                <TechTag>OpenAI API</TechTag>
                <TechTag>Instacart API</TechTag>
                <TechTag>Real-time Chat</TechTag>
                <TechTag>AI/ML</TechTag>
              </TechStack>
            </TechStackSection>
          </MediaShowcase>
        </ScrollContainer>
      </ModalContent>
    </Modal>
  );
};