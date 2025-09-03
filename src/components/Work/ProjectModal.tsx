import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ExternalLink } from 'lucide-react';
import { Modal } from '../UI/Modal';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
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

const SectionTitle = styled.h2<{ $accent?: string }>`
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
    background: ${({ $accent }) => $accent ? `linear-gradient(90deg, ${$accent}, ${$accent}aa)` : 'linear-gradient(90deg, #ff8c00, #ff4500)'};
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
  object-fit: contain;
  max-height: 400px;
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
  height: auto;
  aspect-ratio: 16/9;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(0, 0, 0, 0.1);
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

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projectId }) => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const handleVideoClick = (src: string) => {
    setPlayingVideo(playingVideo === src ? null : src);
  };

  const getProjectData = () => {
    if (projectId === '1') {
      return {
        logo: "/projects_assets/pantreat/app_cover.png",
        title: "Pantreat",
        tagline: "Your all-in-one AI-Kitchen assistant that makes cooking cool again. Unlike expensive meal services or smart fridges, all you need is your phone and an appetite.",
        colors: {
          primary: "255, 140, 0",
          secondary: "255, 69, 0",
          accent: "#ff8c00"
        },
        siteUrl: "https://www.getpantreat.com",
        technologies: ["React Native", "TypeScript", "Expo", "Supabase", "OpenAI API", "Instacart API", "Real-time Chat", "AI/ML"],
        content: {
          sections: [
            {
              title: "Background",
              subtitle: "The Problem with Gen Z & Cooking",
              text: "I grew up in a household where cooking was not just a task, but a way to bring people together — a way to prioritize health as well as the wallet. Sadly, this isn't the case for many younger generations today. Recipes are no longer passed down, and people spend more time in front of a screen than a stove.",
              image: "/projects_assets/pantreat/screen_shots/App_preview_Home.png",
              features: [
                {
                  number: "01",
                  title: "Organization",
                  description: "Cooking is hard — and cooking consistently is even harder. Plans change, value packs pile up, and suddenly you're staring at a fridge full of half-used produce and forgotten sauces.",
                  video: "/projects_assets/pantreat/demo_videos/MyPantry.mp4"
                }
              ]
            }
          ]
        }
      };
    } else if (projectId === '2') {
      return {
        logo: "/projects_assets/inkd/INKD_app_logo_v2.png",
        title: "INKD",
        tagline: "The modern hub for tattoos. Connect artists and enthusiasts, discover local talent, and modernize the tattoo booking experience with AR visualization and smart discovery.",
        colors: {
          primary: "138, 43, 226",
          secondary: "75, 0, 130", 
          accent: "#8a2be2"
        },
        siteUrl: "https://www.getinkd.co",
        technologies: ["React Native", "TypeScript", "Firebase", "Google Maps", "Stripe", "AR Kit", "Real-time Chat"],
        content: {
          sections: [
            {
              title: "Mission",
              subtitle: "Modernizing the Tattoo Industry",
              text: "Today, tattoo culture is scattered across Instagram, TikTok, Pinterest, and outdated forums. Artists juggle a dozen tools for design, booking, promotion, and community, while clients struggle to find local artists who match their style, price, and availability.",
              image: "/projects_assets/inkd/INKD_Home_page.png",
              features: [
                {
                  number: "01",
                  title: "Local Discovery", 
                  description: "Find nearby artists that match your style through smart location-based search and AR visualization to preview designs on your body.",
                  video: null
                },
                {
                  number: "02",
                  title: "Artist Tools",
                  description: "Portfolio showcase, AI business assistant for scheduling, and comprehensive client management all in one platform.",
                  video: null
                }
              ]
            }
          ]
        }
      };
    }
    return null;
  };

  const project = getProjectData();
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          '--scrollbar-color': `rgba(${project.colors.primary}, 0.3)`
        } as React.CSSProperties & { '--scrollbar-color': string }}
      >
        <CloseButton
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </CloseButton>

        <ScrollContainer style={{ scrollbarColor: `rgba(${project.colors.primary}, 0.3) transparent` }}>
          <HeroSection 
            style={{
              background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.15) 0%, rgba(${project.colors.secondary}, 0.1) 50%, rgba(0, 0, 0, 0.9) 100%)`
            }}
          >
            <ProjectLogo 
              src={project.logo}
              alt={`${project.title} Logo`}
              style={{
                boxShadow: `0 20px 40px rgba(${project.colors.primary}, 0.3)`,
                filter: `drop-shadow(0 0 20px rgba(${project.colors.primary}, 0.4))`
              }}
            />
            <ProjectTitle 
              style={{
                background: `linear-gradient(135deg, ${project.colors.accent}, rgba(${project.colors.secondary}, 0.8))`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 0 30px rgba(${project.colors.primary}, 0.3)`
              }}
            >
              {project.title}
            </ProjectTitle>
            <ProjectTagline>
              {project.tagline}
            </ProjectTagline>
            
            <ActionButtons>
              <ActionButton
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(project.siteUrl, '_blank')}
                style={{
                  background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.2), rgba(${project.colors.secondary}, 0.1))`,
                  borderColor: `rgba(${project.colors.primary}, 0.4)`,
                  color: project.colors.accent
                }}
              >
                <ExternalLink size={20} />
                Visit {project.title}
              </ActionButton>
            </ActionButtons>
          </HeroSection>

          {projectId === '1' ? (
            // Pantreat content
            <>
              <ContentSection>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Background</SectionTitle>
                <ContentGrid>
                  <TextBlock>
                    <SubTitle style={{ color: project.colors.accent }}>The Problem with Gen Z & Cooking</SubTitle>
                    <ContentText>
                      I grew up in a household where cooking was not just a task, but a way to bring people together — 
                      a way to prioritize health as well as the wallet. Sadly, this isn't the case for many younger generations today.
                      Recipes are no longer passed down, and people spend more time in front of a screen than a stove.
                    </ContentText>
                  </TextBlock>
                  <AssetCard
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}
                  >
                    <MediaImage 
                      src="/projects_assets/pantreat/screen_shots/App_preview_Home.png" 
                      alt="Home Screen"
                      style={{ padding: '1rem', background: 'transparent' }}
                    />
                  </AssetCard>
                </ContentGrid>
              </ContentSection>
              
              <ContentSection>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>How Pantreat Helps</SectionTitle>
                <FeatureShowcase>
                  <FeatureBlock>
                    <FeatureNumber style={{ 
                      color: project.colors.accent,
                      background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.2), rgba(${project.colors.secondary}, 0.1))`,
                      borderColor: `rgba(${project.colors.primary}, 0.3)`
                    }}>01</FeatureNumber>
                    <FeatureContent>
                      <FeatureTitle style={{ color: project.colors.accent }}>Organization</FeatureTitle>
                      <FeatureText>
                        Cooking is hard — and cooking consistently is even harder. On average, Americans throw away <strong>20% of their groceries.</strong>
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <VideoWrapper onClick={() => handleVideoClick('/projects_assets/pantreat/demo_videos/MyPantry.mp4')}>
                        <VideoPlayer
                          src="/projects_assets/pantreat/demo_videos/MyPantry.mp4"
                          muted loop playsInline
                          ref={(video) => {
                            if (video && playingVideo === '/projects_assets/pantreat/demo_videos/MyPantry.mp4') {
                              video.play();
                            }
                          }}
                        />
                        <AnimatePresence>
                          {playingVideo !== '/projects_assets/pantreat/demo_videos/MyPantry.mp4' && (
                            <PlayButton
                              style={{ background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.9), rgba(${project.colors.secondary}, 0.9))` }}
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
            </>
          ) : (
            // INKD content
            <>
              <ContentSection>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Mission</SectionTitle>
                <ContentGrid>
                  <TextBlock>
                    <SubTitle style={{ color: project.colors.accent }}>Modernizing the Tattoo Industry</SubTitle>
                    <ContentText>
                      Today, tattoo culture is scattered across Instagram, TikTok, Pinterest, and outdated forums. 
                      Artists juggle a dozen tools for design, booking, promotion, and community, while clients struggle 
                      to find local artists who match their style, price, and availability.
                    </ContentText>
                    <ContentText>
                      With the U.S. tattoo market valued at <strong>$1.75B in 2023</strong> and growing, 
                      INKD addresses a clear gap: a modern, centralized, tattoo-first platform.
                    </ContentText>
                  </TextBlock>
                  <AssetCard
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}
                  >
                    <MediaImage 
                      src="/projects_assets/inkd/INKD_Home_page.png" 
                      alt="INKD Home"
                      style={{ padding: '1rem', background: 'transparent' }}
                    />
                  </AssetCard>
                </ContentGrid>
              </ContentSection>
              
              <ContentSection>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>For Everyone</SectionTitle>
                <FeatureShowcase>
                  <FeatureBlock>
                    <FeatureNumber style={{ 
                      color: project.colors.accent,
                      background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.2), rgba(${project.colors.secondary}, 0.1))`,
                      borderColor: `rgba(${project.colors.primary}, 0.3)`
                    }}>01</FeatureNumber>
                    <FeatureContent>
                      <FeatureTitle style={{ color: project.colors.accent }}>For Tattoo Enthusiasts</FeatureTitle>
                      <FeatureText>
                        <strong>Local Discovery</strong> — Find nearby artists that match your style through smart location-based search.
                        <br /><br />
                        <strong>AR Visualization</strong> — Preview designs on your body with augmented reality before committing.
                        <br /><br />
                        <strong>Smart Booking</strong> — Book instantly with artists whose calendars sync seamlessly.
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <AssetCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                        <MediaImage 
                          src="/projects_assets/inkd/INKD_Local_page.png" 
                          alt="Local Discovery"
                          style={{ padding: '1rem', background: 'transparent' }}
                        />
                      </AssetCard>
                    </FeatureMedia>
                  </FeatureBlock>

                  <FeatureBlock>
                    <FeatureNumber style={{ 
                      color: project.colors.accent,
                      background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.2), rgba(${project.colors.secondary}, 0.1))`,
                      borderColor: `rgba(${project.colors.primary}, 0.3)`
                    }}>02</FeatureNumber>
                    <FeatureContent>
                      <FeatureTitle style={{ color: project.colors.accent }}>For Tattoo Artists</FeatureTitle>
                      <FeatureText>
                        <strong>Portfolio Showcase</strong> — Present your work beautifully and professionally.
                        <br /><br />
                        <strong>AI Business Assistant</strong> — Automate scheduling, follow-ups, and admin tasks so you can focus on your art.
                        <br /><br />
                        <strong>Client Management</strong> — Track relationships, consultations, and payments all in one place.
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <AssetCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                        <MediaImage 
                          src="/projects_assets/inkd/INKD_3_profile_tabs.png" 
                          alt="Artist Profile"
                          style={{ padding: '1rem', background: 'transparent' }}
                        />
                      </AssetCard>
                    </FeatureMedia>
                  </FeatureBlock>
                </FeatureShowcase>
              </ContentSection>
              
              <BusinessSection style={{ background: `rgba(${project.colors.primary}, 0.05)` }}>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Market Opportunity</SectionTitle>
                <ContentGrid>
                  <BusinessCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                    <BusinessTitle style={{ color: project.colors.accent }}>Target Market</BusinessTitle>
                    <BusinessText>
                      INKD addresses a clear gap in a growing market:
                      <br /><br />
                      • U.S. tattoo market: <strong>$1.75B in 2023</strong> and growing
                      <br />• Over <strong>107M tattooed Americans</strong>
                      <br />• <strong>64% are Millennials and Gen Z</strong> — digital natives seeking modern solutions
                      <br /><br />
                      <strong>INKD isn't just another social platform</strong> — it's a dedicated ecosystem built for tattoos.
                    </BusinessText>
                  </BusinessCard>
                  <AssetCard
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}
                  >
                    <MediaImage 
                      src="/projects_assets/inkd/INKD_onboarding_page.png" 
                      alt="Onboarding"
                      style={{ padding: '1rem', background: 'transparent' }}
                    />
                  </AssetCard>
                </ContentGrid>
              </BusinessSection>
            </>
          )}

          <TechStackSection>
            <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Built With</SectionTitle>
            <TechStack>
              {project.technologies.map((tech) => (
                <TechTag 
                  key={tech}
                  style={{
                    background: `rgba(${project.colors.primary}, 0.1)`,
                    color: project.colors.accent,
                    borderColor: `rgba(${project.colors.primary}, 0.2)`
                  }}
                >
                  {tech}
                </TechTag>
              ))}
            </TechStack>
          </TechStackSection>
        </ScrollContainer>
      </ModalContent>
    </Modal>
  );
};