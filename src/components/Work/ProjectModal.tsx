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
`;

const ProjectLogo = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 2rem;
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

const ContentSection = styled.div`
  padding: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextBlock = styled.div``;

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

const SubTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #ff8c00;
  margin-bottom: 1rem;
`;

const ContentText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  margin-bottom: 1.5rem;
  
  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const AssetCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid rgba(255, 140, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
`;

const MediaImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const FeatureShowcase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const FeatureBlock = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const FeatureNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #ff8c00;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.2), rgba(255, 69, 0, 0.1));
  border: 2px solid rgba(255, 140, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureContent = styled.div`
  max-width: 500px;
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
  margin-bottom: 1rem;
  
  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const FeatureList = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  margin-top: 1rem;
  
  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const FeatureMedia = styled.div`
  width: 300px;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
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

const BusinessSection = styled.div`
  padding: 3rem;
  background: ${({ theme }) => theme.colors.secondary};
`;

const BusinessGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BusinessCard = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid rgba(255, 140, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2rem;
`;

const BusinessTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #ff8c00;
  margin-bottom: 1.5rem;
`;

const BusinessText = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  
  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const TechStackSection = styled.div`
  padding: 3rem;
  text-align: center;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
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

  const handleVideoClick = (src: string) => {
    setPlayingVideo(playingVideo === src ? null : src);
  };

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
              Your all-in-one AI-Kitchen assistant that makes cooking cool again.
              Unlike expensive meal services or smart fridges, all you need is your phone and an appetite.
            </ProjectTagline>
            
            <ActionButtons>
              <ActionButton
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVideoClick('/projects_assets/pantreat/demo_videos/MyPantry.mp4')}
              >
                <Play size={20} />
                Watch Demo
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://github.com/mjhemker', '_blank')}
              >
                <Github size={20} />
                View Code
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.getpantreat.com', '_blank')}
              >
                <ExternalLink size={20} />
                Visit Pantreat
              </ActionButton>
            </ActionButtons>
          </HeroSection>

          <ContentSection>
            <SectionTitle>Background</SectionTitle>
            <ContentGrid>
              <TextBlock>
                <SubTitle>The Problem with Gen Z & Cooking</SubTitle>
                <ContentText>
                  I grew up in a household where cooking was not just a task, but a way to bring people together — 
                  a way to prioritize health as well as the wallet. Sadly, this isn't the case for many younger generations today.
                  Recipes are no longer passed down, and people spend more time in front of a screen than a stove.
                </ContentText>
                <ContentText>
                  Society has set the narrative that <strong>"Gen Z Can't Cook."</strong>
                  <br />• Gen Z doesn't want to spend 30 minutes watching a TV cooking show.
                  <br />• Home Ec classes no longer exist.
                  <br />• And flipping through cookbooks? Forget it.
                </ContentText>
                <ContentText>
                  But what Gen Z <strong>is</strong> good at is learning from each other. On social media, young people teach each other about nutrition, weight training, art, and more. Pantreat taps into this habit, giving Gen Z a platform to do what they do best — influence and inspire one another.
                </ContentText>
              </TextBlock>
              <AssetCard
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <MediaImage src="/projects_assets/pantreat/screen_shots/App_preview_Home.png" alt="Home Screen" />
              </AssetCard>
            </ContentGrid>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Need Finding</SectionTitle>
            <ContentGrid>
              <AssetCard
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <MediaImage src="/projects_assets/pantreat/iphone_app_mockups/pantreat_mockup1.png" alt="App Mockups" />
              </AssetCard>
              <TextBlock>
                <SubTitle>Research Results</SubTitle>
                <ContentText>
                  I interviewed ~30 students, parents, and young adults from <strong>Baltimore City</strong> and <strong>Stanford</strong>. 
                  Results were surprisingly consistent: <strong>everyone needs help in the kitchen.</strong>
                </ContentText>
                <ContentText>
                  The three biggest struggles were:
                  <br />1. <strong>Organization</strong>
                  <br />2. <strong>Anxiety</strong>
                  <br />3. <strong>Lack of Excitement / Discovery</strong>
                </ContentText>
              </TextBlock>
            </ContentGrid>
          </ContentSection>

          <ContentSection>
            <SectionTitle>How Pantreat Helps</SectionTitle>
            
            <FeatureShowcase>
              <FeatureBlock>
                <FeatureNumber>01</FeatureNumber>
                <FeatureContent>
                  <FeatureTitle>Organization</FeatureTitle>
                  <FeatureText>
                    Cooking is hard — and cooking consistently is even harder. Plans change, value packs pile up, and suddenly you're staring at a fridge full of half-used produce and forgotten sauces. On average, Americans throw away <strong>20% of their groceries.</strong>
                  </FeatureText>
                  <FeatureList>
                    • Helping you make meals with what you already have
                    <br />• Keeping you accountable and organized with reminders for expiration dates
                    <br />• Suggesting daily, personalized meals based on your schedule and dietary preferences
                    <br /><br /><strong>Result:</strong> More good food on the table, and extra cash in your pocket.
                  </FeatureList>
                </FeatureContent>
                <FeatureMedia>
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
                          <Play size={24} />
                        </PlayButton>
                      )}
                    </AnimatePresence>
                  </VideoWrapper>
                </FeatureMedia>
              </FeatureBlock>

              <FeatureBlock>
                <FeatureNumber>02</FeatureNumber>
                <FeatureContent>
                  <FeatureTitle>Anxiety</FeatureTitle>
                  <FeatureText>
                    People want to cook — they know the benefits — but friction and lack of confidence hold them back.
                  </FeatureText>
                  <FeatureList>
                    Pantreat's <strong>Cook Mode</strong> acts as your custom <strong>AI-sous chef</strong>, walking you through recipes step-by-step with:
                    <br />• Built-in timers
                    <br />• Voice responses
                    <br />• Smart substitutions
                    <br /><br />This helps beginners gain confidence while encouraging consistency. To keep motivation high, users can share creations with friends for <strong>group accountability</strong> — think <em>Strava, but for cooking.</em>
                  </FeatureList>
                </FeatureContent>
                <FeatureMedia>
                  <AssetCard>
                    <MediaImage src="/projects_assets/pantreat/screen_shots/App_preview_Cook.png" alt="Cook Mode" />
                  </AssetCard>
                </FeatureMedia>
              </FeatureBlock>

              <FeatureBlock>
                <FeatureNumber>03</FeatureNumber>
                <FeatureContent>
                  <FeatureTitle>Excitement & Discovery</FeatureTitle>
                  <FeatureText>
                    Motivation alone isn't enough. Cooking needs excitement. That's where Pantreat's <strong>Feed</strong> comes in.
                  </FeatureText>
                  <FeatureList>
                    The feed features <strong>short-form cooking videos</strong> from:
                    <br />• Friends • Influencers • Creators • Other users
                    <br /><br />Unlike Instagram or TikTok, every video has an attached <strong>recipe and auto-adjusting grocery list.</strong> With Instacart's API, you can order ingredients instantly and have them delivered within the hour — making it easy to <em>literally cook what you see.</em>
                  </FeatureList>
                </FeatureContent>
                <FeatureMedia>
                  <VideoWrapper onClick={() => handleVideoClick('/projects_assets/pantreat/demo_videos/recipes.mp4')}>
                    <VideoPlayer
                      src="/projects_assets/pantreat/demo_videos/recipes.mp4"
                      muted
                      loop
                      playsInline
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
                          <Play size={24} />
                        </PlayButton>
                      )}
                    </AnimatePresence>
                  </VideoWrapper>
                </FeatureMedia>
              </FeatureBlock>
            </FeatureShowcase>
          </ContentSection>

          <BusinessSection>
            <SectionTitle>Business Model</SectionTitle>
            <ContentGrid>
              <BusinessCard>
                <BusinessTitle>Revenue Streams</BusinessTitle>
                <BusinessText>
                  Pantreat is sticky because it integrates into <strong>daily routines</strong>, creating multiple natural revenue streams:
                  <br /><br />
                  • <strong>Grocery Affiliate Partnerships</strong> (Instacart, Amazon, Walmart)
                  <br />• U.S. Grocery Market Sales (2025): <strong>$1.6 trillion</strong> (+3.1% YoY growth)
                  <br />• Online U.S. Grocery Sales (May 2025): <strong>$8.7 billion</strong> (+27% YoY)
                  <br /><br />
                  • <strong>Advertisements & Algorithmic Product Suggestions</strong>
                  <br />• <strong>Long-Term:</strong> Data-driven personalization for health/fitness integrations
                  <br /><br />
                  <strong>Creator Incentive:</strong> Whenever a user orders groceries linked to a creator's recipe video, that creator gets a cut — encouraging more content and engagement.
                </BusinessText>
              </BusinessCard>
              <AssetCard
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <MediaImage src="/projects_assets/pantreat/screen_shots/App_preview_Profile.png" alt="Profile Screen" />
              </AssetCard>
            </ContentGrid>
          </BusinessSection>

          <ContentSection>
            <SectionTitle>Conclusion</SectionTitle>
            <ContentGrid>
              <AssetCard
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <VideoWrapper onClick={() => handleVideoClick('/projects_assets/pantreat/demo_videos/input+filters.mp4')}>
                  <VideoPlayer
                    src="/projects_assets/pantreat/demo_videos/input+filters.mp4"
                    muted
                    loop
                    playsInline
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
                        <Play size={24} />
                      </PlayButton>
                    )}
                  </AnimatePresence>
                </VideoWrapper>
              </AssetCard>
              <TextBlock>
                <SubTitle>Making Cooking Cool Again</SubTitle>
                <ContentText>
                  Pantreat combines <strong>AI, community, and short-form content</strong> to remove the friction of cooking, reduce waste, and make the kitchen exciting again.
                </ContentText>
                <ContentText>
                  With tools to organize, motivate, and inspire, Pantreat empowers a new generation to step away from delivery apps and rediscover the joy of home cooking.
                </ContentText>
                <ActionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://www.getpantreat.com', '_blank')}
                  style={{ marginTop: '1rem' }}
                >
                  <ExternalLink size={18} />
                  Try Pantreat Now
                </ActionButton>
              </TextBlock>
            </ContentGrid>
          </ContentSection>

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
        </ScrollContainer>
      </ModalContent>
    </Modal>
  );
};