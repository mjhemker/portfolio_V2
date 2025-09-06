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
    } else if (projectId === '3') {
      return {
        logo: "/projects_assets/fizz/fizz_logo+name.jpeg",
        title: "Fizz Social Media Redesign",
        tagline: "Reimagining the student social network for growth and new opportunities. A comprehensive UI redesign with new features for project collaboration and job opportunities.",
        colors: {
          primary: "138, 92, 246",
          secondary: "99, 102, 241", 
          accent: "#8a5cf6"
        },
        siteUrl: "https://example.com",
        technologies: ["Figma", "UI/UX Design", "Prototyping", "User Research", "Design Systems", "Branding", "Visual Design"],
        content: {
          sections: [
            {
              title: "Problem",
              subtitle: "Inconsistent UI and Limited Scope",
              text: "While popular, Fizz's UI felt inconsistent and limited in scope. The existing design lacked a strong visual identity, and its feature set was focused narrowly on casual posting. Students looking for project collaborators or job opportunities had no dedicated space, leaving those needs unmet.",
              image: "/projects_assets/fizz/fizz_copy1.png",
              features: []
            }
          ]
        }
      };
    } else if (projectId === '4') {
      return {
        logo: "/projects_assets/pocketpeople/pocketpeople_home.png",
        title: "PocketPeople",
        tagline: "Because remembering the little things is what makes relationships matter. A personal relationship management app that helps you keep important details about the people you love.",
        colors: {
          primary: "34, 197, 94",
          secondary: "16, 185, 129", 
          accent: "#22c55e"
        },
        siteUrl: "https://example.com",
        technologies: ["React Native", "TypeScript", "Expo", "Tailwind CSS", "Figma", "AI Integration", "Mobile Development"],
        content: {
          sections: [
            {
              title: "Why It Matters",
              subtitle: "Thoughtful Relationships Without Perfect Memory",
              text: "Being thoughtful shouldn't depend on having a perfect memory. Relationships thrive when you remember the details that make people feel seen. Most apps focus on productivity or networking — PocketPeople is built purely for personal connection.",
              image: "/projects_assets/pocketpeople/pocketpeople_profile.png",
              features: []
            }
          ]
        }
      };
    } else if (projectId === '5') {
      return {
        logo: "/projects_assets/vinnie_hager/vinnie_square_closeup.jpg",
        title: "Vinnie Hager Rugs",
        tagline: "Custom large-scale rug and wall installations for Allied Apartments communal lounge spaces. Designs inspired by artist Vinnie Hager, scaled for architectural proportions.",
        colors: {
          primary: "184, 48, 143",
          secondary: "139, 69, 19", 
          accent: "#b8308f"
        },
        siteUrl: "https://example.com",
        technologies: ["AutoCAD", "Interior Design", "Color Theory", "Architectural Design", "Collaboration", "Material Testing", "Large Scale Installation"],
        content: {
          sections: [
            {
              title: "Allied Apartments Installation",
              subtitle: "Custom large-scale designs for communal lounge spaces",
              text: "I collaborated with Timothy Prieto and Nathalie Beatty to design custom rug and wall pieces for the 8th Floor Lounges of the to-be-built Allied Apartments in Harbor Point, Baltimore. The designs are heavily influenced by the doodle-like work of artist Vinnie Hager, scaled up to fit architectural proportions.",
              image: "/projects_assets/vinnie_hager/vinnie_carpet_full_room.JPG",
              features: [
                "28' x 18' floor rug rendered in AutoCAD",
                "18' x 14' decorative wall installation", 
                "2' x 3' strike-off sample by Kebabian's Rugs",
                "Color palette aligned with apartment's interior themes",
                "Bold focal point for lounge space"
              ]
            },
            {
              title: "Design Process",
              subtitle: "From artist inspiration to architectural scale",
              text: "The color palette was carefully selected to align with the apartment's diverse interior themes, ensuring each piece complements the building's overall aesthetic. Together, these pieces serve as vibrant, site-specific artworks that bring energy and identity to the Allied Apartments' communal areas.",
              image: "/projects_assets/vinnie_hager/vinnie_sample.jpg",
              features: [
                "Vinnie Hager inspired doodle-like designs",
                "Architectural proportion scaling",
                "Material and color accuracy testing",
                "Site-specific artwork creation",
                "Statement installations for shared environments"
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
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Need Finding</SectionTitle>
                <ContentGrid>
                  <AssetCard
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}
                  >
                    <MediaImage 
                      src="/projects_assets/pantreat/iphone_app_mockups/pantreat_mockup1.png" 
                      alt="App Mockups"
                      style={{ padding: '2rem', background: 'transparent' }}
                    />
                  </AssetCard>
                  <TextBlock>
                    <SubTitle style={{ color: project.colors.accent }}>Research Results</SubTitle>
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
                        Cooking is hard — and cooking consistently is even harder. Plans change, value packs pile up, and suddenly you're staring at a fridge full of half-used produce and forgotten sauces. On average, Americans throw away <strong>20% of their groceries.</strong>
                      </FeatureText>
                      <FeatureText style={{ marginTop: '1rem' }}>
                        • Helping you make meals with what you already have
                        <br />• Keeping you accountable and organized with reminders for expiration dates
                        <br />• Suggesting daily, personalized meals based on your schedule and dietary preferences
                        <br /><br /><strong>Result:</strong> More good food on the table, and extra cash in your pocket.
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <VideoWrapper onClick={() => handleVideoClick('/projects_assets/pantreat/demo_videos/MyPantry.mp4')}>
                        <VideoPlayer
                          src="/projects_assets/pantreat/demo_videos/MyPantry.mp4"
                          muted loop playsInline
                          style={{ maxHeight: '300px' }}
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
                              style={{ background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.9), rgba(${project.colors.secondary}, 0.9))` }}
                            >
                              <Play size={24} />
                            </PlayButton>
                          )}
                        </AnimatePresence>
                      </VideoWrapper>
                    </FeatureMedia>
                  </FeatureBlock>

                  <FeatureBlock>
                    <FeatureNumber style={{ 
                      color: project.colors.accent,
                      background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.2), rgba(${project.colors.secondary}, 0.1))`,
                      borderColor: `rgba(${project.colors.primary}, 0.3)`
                    }}>02</FeatureNumber>
                    <FeatureContent>
                      <FeatureTitle style={{ color: project.colors.accent }}>Anxiety</FeatureTitle>
                      <FeatureText>
                        People want to cook — they know the benefits — but friction and lack of confidence hold them back.
                      </FeatureText>
                      <FeatureText style={{ marginTop: '1rem' }}>
                        Pantreat's <strong>Cook Mode</strong> acts as your custom <strong>AI-sous chef</strong>, walking you through recipes step-by-step with:
                        <br />• Built-in timers
                        <br />• Voice responses
                        <br />• Smart substitutions
                        <br /><br />This helps beginners gain confidence while encouraging consistency. To keep motivation high, users can share creations with friends for <strong>group accountability</strong> — think <em>Strava, but for cooking.</em>
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <AssetCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                        <MediaImage 
                          src="/projects_assets/pantreat/screen_shots/App_preview_Cook.png" 
                          alt="Cook Mode"
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
                    }}>03</FeatureNumber>
                    <FeatureContent>
                      <FeatureTitle style={{ color: project.colors.accent }}>Excitement & Discovery</FeatureTitle>
                      <FeatureText>
                        Motivation alone isn't enough. Cooking needs excitement. That's where Pantreat's <strong>Feed</strong> comes in.
                      </FeatureText>
                      <FeatureText style={{ marginTop: '1rem' }}>
                        The feed features <strong>short-form cooking videos</strong> from:
                        <br />• Friends • Influencers • Creators • Other users
                        <br /><br />Unlike Instagram or TikTok, every video has an attached <strong>recipe and auto-adjusting grocery list.</strong> With Instacart's API, you can order ingredients instantly and have them delivered within the hour — making it easy to <em>literally cook what you see.</em>
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <VideoWrapper onClick={() => handleVideoClick('/projects_assets/pantreat/demo_videos/recipes.mp4')}>
                        <VideoPlayer
                          src="/projects_assets/pantreat/demo_videos/recipes.mp4"
                          muted loop playsInline
                          style={{ maxHeight: '300px' }}
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

              <BusinessSection style={{ background: `rgba(${project.colors.primary}, 0.05)` }}>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Business Model</SectionTitle>
                <ContentGrid>
                  <BusinessCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                    <BusinessTitle style={{ color: project.colors.accent }}>Revenue Streams</BusinessTitle>
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
                    style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}
                  >
                    <MediaImage 
                      src="/projects_assets/pantreat/screen_shots/App_preview_Profile.png" 
                      alt="Profile Screen"
                      style={{ padding: '1rem', background: 'transparent' }}
                    />
                  </AssetCard>
                </ContentGrid>
              </BusinessSection>

              <ContentSection>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Conclusion</SectionTitle>
                <ContentGrid>
                  <AssetCard
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}
                  >
                    <VideoWrapper onClick={() => handleVideoClick('/projects_assets/pantreat/demo_videos/input+filters.mp4')}>
                      <VideoPlayer
                        src="/projects_assets/pantreat/demo_videos/input+filters.mp4"
                        muted loop playsInline
                        style={{ maxHeight: '300px' }}
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
                            style={{ background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.9), rgba(${project.colors.secondary}, 0.9))` }}
                          >
                            <Play size={24} />
                          </PlayButton>
                        )}
                      </AnimatePresence>
                    </VideoWrapper>
                  </AssetCard>
                  <TextBlock>
                    <SubTitle style={{ color: project.colors.accent }}>Making Cooking Cool Again</SubTitle>
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
                      style={{ 
                        marginTop: '1rem',
                        background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.2), rgba(${project.colors.secondary}, 0.1))`,
                        borderColor: `rgba(${project.colors.primary}, 0.4)`,
                        color: project.colors.accent
                      }}
                    >
                      <ExternalLink size={18} />
                      Try Pantreat Now
                    </ActionButton>
                  </TextBlock>
                </ContentGrid>
              </ContentSection>
            </>
          ) : projectId === '2' ? (
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
          ) : projectId === '3' ? (
            // Fizz content
            <>
              <ContentSection>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Problem</SectionTitle>
                <ContentGrid>
                  <TextBlock>
                    <SubTitle style={{ color: project.colors.accent }}>Inconsistent UI and Limited Scope</SubTitle>
                    <ContentText>
                      While popular, Fizz's UI felt inconsistent and limited in scope. The existing design lacked a strong 
                      visual identity, and its feature set was focused narrowly on casual posting.
                    </ContentText>
                    <ContentText>
                      Students looking for project collaborators or job opportunities had no dedicated space, leaving those 
                      needs unmet.
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
                      src="/projects_assets/fizz/fizz_copy1.png" 
                      alt="Original Fizz UI"
                      style={{ padding: '1rem', background: 'transparent' }}
                    />
                  </AssetCard>
                </ContentGrid>
              </ContentSection>

              <ContentSection>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Process</SectionTitle>
                <ContentGrid>
                  <AssetCard
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}
                  >
                    <MediaImage 
                      src="/projects_assets/fizz/process_pic_fizz_copy.png" 
                      alt="Copy Process"
                      style={{ padding: '1rem', background: 'transparent' }}
                    />
                  </AssetCard>
                  <TextBlock>
                    <SubTitle style={{ color: project.colors.accent }}>Foundation & Exploration</SubTitle>
                    <ContentText>
                      I began by replicating the current Fizz UI to create a foundation for redesign. From there, I:
                    </ContentText>
                    <ContentText>
                      • Developed a <strong>universal color palette</strong> to unify branding and improve readability
                      <br />• Explored <strong>dramatic color usage, bold layouts, and restructured post/comment relationships</strong> to make the interface more engaging
                      <br />• Designed prototypes for two <strong>new feature concepts</strong>
                    </ContentText>
                  </TextBlock>
                </ContentGrid>
              </ContentSection>

              <ContentSection>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Design Evolution</SectionTitle>
                <FeatureShowcase>
                  <FeatureBlock>
                    <FeatureNumber style={{ 
                      color: project.colors.accent,
                      background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.2), rgba(${project.colors.secondary}, 0.1))`,
                      borderColor: `rgba(${project.colors.primary}, 0.3)`
                    }}>01</FeatureNumber>
                    <FeatureContent>
                      <FeatureTitle style={{ color: project.colors.accent }}>Full Redesign Exploration</FeatureTitle>
                      <FeatureText>
                        Through <strong>visual experimentation</strong> and <strong>functional expansion</strong>, I explored how 
                        Fizz could evolve with dramatic color usage and bold layouts while ensuring new ideas aligned with 
                        the student community's needs.
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <AssetCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                        <MediaImage 
                          src="/projects_assets/fizz/process_pic_fizz_full_redesign.png" 
                          alt="Full Redesign Process"
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
                      <FeatureTitle style={{ color: project.colors.accent }}>Final Design Direction</FeatureTitle>
                      <FeatureText>
                        The final design balances visual impact with usability, creating a cohesive experience that maintains 
                        Fizz's student-focused identity while expanding its capabilities.
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <AssetCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                        <MediaImage 
                          src="/projects_assets/fizz/process_pic_fizz_final_redesign.png" 
                          alt="Final Redesign Process"
                          style={{ padding: '1rem', background: 'transparent' }}
                        />
                      </AssetCard>
                    </FeatureMedia>
                  </FeatureBlock>
                </FeatureShowcase>
              </ContentSection>

              <ContentSection>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>New Features</SectionTitle>
                <FeatureShowcase>
                  <FeatureBlock>
                    <FeatureNumber style={{ 
                      color: project.colors.accent,
                      background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.2), rgba(${project.colors.secondary}, 0.1))`,
                      borderColor: `rgba(${project.colors.primary}, 0.3)`
                    }}>01</FeatureNumber>
                    <FeatureContent>
                      <FeatureTitle style={{ color: project.colors.accent }}>Project Tags</FeatureTitle>
                      <FeatureText>
                        <strong>Custom tags</strong> to help students promote or join campus projects. This feature addresses 
                        the need for collaboration and project discovery within the student community.
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <AssetCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                        <MediaImage 
                          src="/projects_assets/fizz/fizz_full_redesign1.png" 
                          alt="Project Tags Feature"
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
                      <FeatureTitle style={{ color: project.colors.accent }}>Job Section</FeatureTitle>
                      <FeatureText>
                        A <strong>dedicated post type and feed</strong> for campus and local job opportunities. This expansion 
                        helps students find relevant work opportunities while keeping them engaged with the platform.
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <AssetCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                        <MediaImage 
                          src="/projects_assets/fizz/fizz_full_redesign2.png" 
                          alt="Jobs Feature"
                          style={{ padding: '1rem', background: 'transparent' }}
                        />
                      </AssetCard>
                    </FeatureMedia>
                  </FeatureBlock>
                </FeatureShowcase>
              </ContentSection>

              <BusinessSection style={{ background: `rgba(${project.colors.primary}, 0.05)` }}>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Final Solution</SectionTitle>
                <ContentGrid>
                  <BusinessCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                    <BusinessTitle style={{ color: project.colors.accent }}>Visual Refresh & New Functionality</BusinessTitle>
                    <BusinessText>
                      The final redesign delivered both a <strong>visual refresh</strong> and <strong>new functionality</strong>:
                      <br /><br />
                      • A cohesive <strong>color palette</strong> and cleaner interface for a stronger brand presence
                      <br />• A redesigned <strong>post/comment flow</strong> with simplified hierarchies and clearer interactions
                      <br />• Fully realized <strong>Jobs and Projects features</strong>, offering students practical tools to advance their studies, careers, and collaborations
                      <br /><br />
                      By combining a modernized UI with new features, this redesign demonstrates how Fizz could evolve from a 
                      <strong>niche social app into a central hub for student life</strong> — connecting not only conversations, 
                      but also opportunities.
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
                      src="/projects_assets/fizz/fizz_final_redesign1.png" 
                      alt="Final Design"
                      style={{ padding: '1rem', background: 'transparent' }}
                    />
                  </AssetCard>
                </ContentGrid>
              </BusinessSection>
            </>
          ) : projectId === '4' ? (
            // PocketPeople content
            <>
              <ContentSection>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Why It Matters</SectionTitle>
                <ContentGrid>
                  <TextBlock>
                    <SubTitle style={{ color: project.colors.accent }}>Thoughtful Relationships Without Perfect Memory</SubTitle>
                    <ContentText>
                      We all want to be great friends, partners, and family members — but life (and our memory) doesn't always cooperate. 
                      I often found myself forgetting birthdays, favorite movies, or even how many pets a friend has.
                    </ContentText>
                    <ContentText>
                      Not because I don't care, but because it's hard to keep track of everything. <strong>PocketPeople</strong> was born 
                      out of that frustration: a fun, personal app that helps you keep all the important details about the people you love 
                      in one dedicated place.
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
                      src="/projects_assets/pocketpeople/pocketpeople_profile.png" 
                      alt="PocketPeople Profile"
                      style={{ padding: '1rem', background: 'transparent' }}
                    />
                  </AssetCard>
                </ContentGrid>
              </ContentSection>

              <ContentSection>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Concept & Design</SectionTitle>
                <ContentGrid>
                  <AssetCard
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}
                  >
                    <MediaImage 
                      src="/projects_assets/pocketpeople/pocketpeople_original_plan.png" 
                      alt="Original Plan"
                      style={{ padding: '1rem', background: 'transparent' }}
                    />
                  </AssetCard>
                  <TextBlock>
                    <SubTitle style={{ color: project.colors.accent }}>Digital Deck of Cards for Relationships</SubTitle>
                    <ContentText>
                      PocketPeople works like a digital deck of cards for your relationships. Each person gets their own customizable 
                      profile, where you can add notes, favorite things, important dates, and more.
                    </ContentText>
                    <ContentText>
                      From there, you can set reminders, sort your most important people into favorites, and even play memory games 
                      to test yourself on the details you've stored.
                    </ContentText>
                  </TextBlock>
                </ContentGrid>
              </ContentSection>

              <ContentSection>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Key Features</SectionTitle>
                <FeatureShowcase>
                  <FeatureBlock>
                    <FeatureNumber style={{ 
                      color: project.colors.accent,
                      background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.2), rgba(${project.colors.secondary}, 0.1))`,
                      borderColor: `rgba(${project.colors.primary}, 0.3)`
                    }}>01</FeatureNumber>
                    <FeatureContent>
                      <FeatureTitle style={{ color: project.colors.accent }}>Custom Cards</FeatureTitle>
                      <FeatureText>
                        Create <strong>personalized cards</strong> for each person, with editable details that grow over time. 
                        Track birthdays, favorite things, important dates, and meaningful memories all in one place.
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <AssetCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                        <MediaImage 
                          src="/projects_assets/pocketpeople/pocketpeople_adding.png" 
                          alt="Adding People Feature"
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
                      <FeatureTitle style={{ color: project.colors.accent }}>Memory Games</FeatureTitle>
                      <FeatureText>
                        Test yourself on friends' facts in a <strong>playful way</strong> that makes remembering effortless. 
                        Gamification helps turn relationship maintenance into an enjoyable experience.
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <AssetCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                        <MediaImage 
                          src="/projects_assets/pocketpeople/pocketpeople_memory.png" 
                          alt="Memory Games Feature"
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
                    }}>03</FeatureNumber>
                    <FeatureContent>
                      <FeatureTitle style={{ color: project.colors.accent }}>Smart Reminders & Favorites</FeatureTitle>
                      <FeatureText>
                        Never miss a birthday, anniversary, or big event again with intelligent reminders. 
                        Pin your closest connections as <strong>favorites</strong> for quick access to the people who matter most.
                      </FeatureText>
                    </FeatureContent>
                    <FeatureMedia>
                      <AssetCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                        <MediaImage 
                          src="/projects_assets/pocketpeople/pocketpeople_home.png" 
                          alt="Home Screen"
                          style={{ padding: '1rem', background: 'transparent' }}
                        />
                      </AssetCard>
                    </FeatureMedia>
                  </FeatureBlock>
                </FeatureShowcase>
              </ContentSection>

              <BusinessSection style={{ background: `rgba(${project.colors.primary}, 0.05)` }}>
                <SectionTitle $accent={project.colors.accent} style={{ color: project.colors.accent }}>Development & Design</SectionTitle>
                <ContentGrid>
                  <BusinessCard style={{ borderColor: `rgba(${project.colors.primary}, 0.2)` }}>
                    <BusinessTitle style={{ color: project.colors.accent }}>Technical Implementation</BusinessTitle>
                    <BusinessText>
                      PocketPeople was developed using <strong>Cursor, Expo, and React Native</strong>, styled with <strong>Tailwind CSS</strong> 
                      for a clean, modern interface.
                      <br /><br />
                      I designed the layout and flow in <strong>Figma</strong> before coding the final product. The playful <strong>32-bit stickers</strong> 
                      were created with AI and hand-touched for polish.
                      <br /><br />
                      <strong>Current Status:</strong> PocketPeople is awaiting App Store verification and will soon be available for download.
                      <br /><br />
                      <em>Being thoughtful shouldn't depend on having a perfect memory.</em> Relationships thrive when you remember the 
                      details that make people feel seen. Most apps focus on productivity or networking — PocketPeople is built purely 
                      for personal connection.
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
                      src="/projects_assets/pocketpeople/process_character_sheet.png" 
                      alt="Character Design Process"
                      style={{ padding: '1rem', background: 'transparent' }}
                    />
                  </AssetCard>
                </ContentGrid>
              </BusinessSection>
            </>
          ) : null}

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