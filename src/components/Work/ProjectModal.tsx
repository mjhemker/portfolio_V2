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
    rgba(255, 140, 0, 0.1) 0%, 
    rgba(255, 69, 0, 0.05) 100%);
  padding: 3rem 2rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ProjectLogo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 8px 25px rgba(255, 140, 0, 0.2);
`;

const ProjectTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ff8c00, #ff4500);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProjectTagline = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2rem;
  font-style: italic;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)`
  background: rgba(255, 140, 0, 0.1);
  border: 1px solid rgba(255, 140, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0.75rem 1.5rem;
  color: #ff8c00;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 140, 0, 0.2);
    border-color: rgba(255, 140, 0, 0.5);
  }
`;

const ContentSection = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 140, 0, 0.2);
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const MediaCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
`;

const MediaImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MediaInfo = styled.div`
  padding: 1rem;
`;

const MediaTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const PlayButton = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  pointer-events: none;
`;

const VideoWrapper = styled.div`
  position: relative;
  cursor: pointer;
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
            <ProjectLogo 
              src="/projects_assets/pantreat/app+name.png" 
              alt="Pantreat Logo"
            />
            <ProjectTitle>Pantreat</ProjectTitle>
            <ProjectTagline>
              Your all-in-one AI-Kitchen assistant that makes cooking cool again
            </ProjectTagline>
            
            <ActionButtons>
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={18} />
                Watch Demo
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={18} />
                View Code
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} />
                Live Demo
              </ActionButton>
            </ActionButtons>
          </HeroSection>

          <ContentSection>
            <SectionTitle>Project Overview</SectionTitle>
            <DescriptionText
              dangerouslySetInnerHTML={{ 
                __html: description.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
              }}
            />

            <TechStackSection>
              <SectionTitle>Tech Stack</SectionTitle>
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

            <SectionTitle>Media Gallery</SectionTitle>
            <MediaGrid>
              {mediaItems.map((item, index) => (
                <MediaCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -4, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)" }}
                >
                  {item.type === 'image' ? (
                    <MediaImage src={item.src} alt={item.title} />
                  ) : (
                    <VideoWrapper onClick={() => handleVideoClick(item.src)}>
                      <VideoPlayer
                        src={item.src}
                        muted
                        loop
                        playsInline
                        ref={(video) => {
                          if (video) {
                            if (playingVideo === item.src) {
                              video.play();
                            } else {
                              video.pause();
                            }
                          }
                        }}
                      />
                      <AnimatePresence>
                        {playingVideo !== item.src && (
                          <PlayButton
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Play size={24} />
                          </PlayButton>
                        )}
                      </AnimatePresence>
                    </VideoWrapper>
                  )}
                  <MediaInfo>
                    <MediaTitle>{item.title}</MediaTitle>
                  </MediaInfo>
                </MediaCard>
              ))}
            </MediaGrid>
          </ContentSection>
        </ScrollContainer>
      </ModalContent>
    </Modal>
  );
};