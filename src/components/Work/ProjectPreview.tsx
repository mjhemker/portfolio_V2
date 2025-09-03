import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectPreviewProps {
  onProjectClick: () => void;
  projectId: string;
}

const PreviewCard = styled(motion.div)`
  background: radial-gradient(circle at 20% 30%, 
    rgba(255, 140, 0, 0.2) 0%, 
    rgba(255, 69, 0, 0.1) 40%,
    rgba(0, 0, 0, 0.8) 100%);
  border: 2px solid rgba(255, 140, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  flex: 1;
  height: 500px;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    background-image: var(--background-image);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center right;
    opacity: 0.15;
    z-index: 1;
    transition: all 0.5s ease;
  }
  
  &:hover::before {
    opacity: 0.25;
    transform: scale(1.05) rotate(3deg);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 140, 0, 0.1) 0%, 
      transparent 40%,
      transparent 60%,
      rgba(255, 69, 0, 0.05) 100%);
    pointer-events: none;
    z-index: 2;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 2rem 0;
  position: relative;
  z-index: 3;
`;

const ProjectLogo = styled.img`
  height: 100px;
  width: auto;
  max-width: 300px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 12px 30px rgba(255, 140, 0, 0.4);
  object-fit: contain;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(255, 140, 0, 0.2);
  
  &:hover {
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 20px 40px rgba(255, 140, 0, 0.5);
    border-color: rgba(255, 140, 0, 0.6);
  }
`;

const ProjectInfo = styled.div`
  flex: 1;
`;


const ProjectTagline = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  color: #fff;
  margin: 0;
  font-weight: 900;
  text-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
  background: linear-gradient(135deg, #fff, #ff8c00);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectContent = styled.div`
  flex: 1;
  padding: 1.5rem 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 3;
  min-height: 0;
`;

const ProjectFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1rem 0;
`;

const FeatureTag = styled(motion.span)`
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.2), rgba(255, 69, 0, 0.1));
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  border: 2px solid rgba(255, 140, 0, 0.4);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 1rem;
  padding: 2rem;
  position: relative;
  z-index: 3;
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(135deg, #ff8c00, #ff4500);
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem 2rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  flex: 1;
  box-shadow: 0 4px 15px rgba(255, 140, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 140, 0, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryActionButton = styled(ActionButton)`
  background: rgba(255, 140, 0, 0.1);
  color: #ff8c00;
  border: 2px solid rgba(255, 140, 0, 0.3);
  
  &:hover {
    background: rgba(255, 140, 0, 0.2);
    border-color: rgba(255, 140, 0, 0.5);
    color: #fff;
  }
`;

const ProjectDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;


export const ProjectPreview: React.FC<ProjectPreviewProps> = ({ onProjectClick, projectId }) => {
  const getProjectData = () => {
    if (projectId === '1') {
      return {
        logo: "/projects_assets/pantreat/app+name.png",
        tagline: "Make Cooking Cool Again",
        description: "Your all-in-one AI Kitchen assistant. Unlike expensive meal services or smart fridges, all you need is your phone and an appetite. Combines AI, community, and short-form content to make cooking exciting again.",
        features: ["AI Recipe Generation", "Smart Inventory", "Social Cooking", "Video Content", "Mobile First"],
        backgroundImage: "/projects_assets/pantreat/iphone_app_mockups/mockrocket-capture.png",
        colors: {
          primary: "255, 140, 0",
          secondary: "255, 69, 0",
          accent: "#ff8c00"
        },
        siteUrl: "https://www.getpantreat.com"
      };
    } else if (projectId === '2') {
      return {
        logo: "/projects_assets/inkd/INKD_app_logo_v2.png",
        tagline: "Where Ink Meets Inspiration",
        description: "The modern hub for tattoos. Connect tattoo artists and enthusiasts, discover local talent, and modernize the tattoo booking experience with AR visualization and smart discovery.",
        features: ["Local Discovery", "AR Visualization", "Smart Booking", "Artist Showcase", "Community Hub"],
        backgroundImage: "/projects_assets/inkd/INKD_Home_page.png",
        colors: {
          primary: "138, 43, 226",
          secondary: "75, 0, 130",
          accent: "#8a2be2"
        },
        siteUrl: "https://www.getinkd.co"
      };
    }
    return null;
  };

  const project = getProjectData();
  if (!project) return null;

  const cardStyles = {
    background: `radial-gradient(circle at 20% 30%, rgba(${project.colors.primary}, 0.2) 0%, rgba(${project.colors.secondary}, 0.1) 40%, rgba(0, 0, 0, 0.8) 100%)`,
    border: `2px solid rgba(${project.colors.primary}, 0.4)`,
    beforeBackground: `url('${project.backgroundImage}')`,
    hoverBoxShadow: `0 12px 35px rgba(${project.colors.primary}, 0.2)`
  };

  return (
    <PreviewCard
      onClick={onProjectClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        y: -4,
        boxShadow: cardStyles.hoverBoxShadow
      }}
      whileTap={{ scale: 0.98 }}
      style={{ 
        background: cardStyles.background,
        border: cardStyles.border,
        '--background-image': `url('${project.backgroundImage}')`
      } as React.CSSProperties & { '--background-image': string }}
    >
      <ProjectHeader>
        <ProjectLogo 
          src={project.logo}
          alt={`${projectId === '1' ? 'Pantreat' : 'INKD'} Logo`}
          style={{ 
            boxShadow: `0 12px 30px rgba(${project.colors.primary}, 0.4)`,
            borderColor: `rgba(${project.colors.primary}, 0.2)`
          }}
        />
        <ProjectInfo>
          <ProjectTagline 
            style={{ 
              background: `linear-gradient(135deg, #fff, ${project.colors.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {project.tagline}
          </ProjectTagline>
        </ProjectInfo>
      </ProjectHeader>
      
      <ProjectContent>
        <ProjectDescription>
          {project.description}
        </ProjectDescription>
        
        <ProjectFeatures>
          {project.features.map((feature) => (
            <FeatureTag
              key={feature}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.2), rgba(${project.colors.secondary}, 0.1))`,
                borderColor: `rgba(${project.colors.primary}, 0.4)`,
                boxShadow: `0 4px 12px rgba(${project.colors.primary}, 0.2)`
              }}
            >
              {feature}
            </FeatureTag>
          ))}
        </ProjectFeatures>
        
      </ProjectContent>
      
      <ProjectActions>
        <SecondaryActionButton
          as={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onProjectClick();
          }}
          style={{
            background: `rgba(${project.colors.primary}, 0.1)`,
            color: project.colors.accent,
            borderColor: `rgba(${project.colors.primary}, 0.3)`
          }}
        >
          <ArrowRight size={20} />
          Learn More
        </SecondaryActionButton>
        <ActionButton
          as={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(project.siteUrl, '_blank');
          }}
          style={{
            background: `linear-gradient(135deg, ${project.colors.accent}, rgba(${project.colors.secondary}, 0.8))`
          }}
        >
          <ExternalLink size={20} />
          Visit Site
        </ActionButton>
      </ProjectActions>
    </PreviewCard>
  );
};