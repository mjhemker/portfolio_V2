import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectPreviewProps {
  onProjectClick: () => void;
}

const PreviewCard = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(255, 140, 0, 0.15) 0%, 
    rgba(255, 69, 0, 0.08) 50%,
    rgba(255, 140, 0, 0.05) 100%);
  border: 1px solid rgba(255, 140, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 0;
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
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 140, 0, 0.15), 
      transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 140, 0, 0.8) 50%, 
      transparent 100%);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 2rem 1rem;
  background: rgba(255, 140, 0, 0.05);
  border-bottom: 1px solid rgba(255, 140, 0, 0.1);
`;

const ProjectLogo = styled.img`
  height: 80px;
  width: auto;
  max-width: 250px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 8px 20px rgba(255, 140, 0, 0.3);
  object-fit: contain;
  background: white;
  padding: 0.75rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 30px rgba(255, 140, 0, 0.4);
  }
`;

const ProjectInfo = styled.div`
  flex: 1;
`;


const ProjectTagline = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  background: linear-gradient(135deg, #ff8c00, #ff4500);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(255, 140, 0, 0.2);
`;

const ProjectContent = styled.div`
  flex: 1;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProjectFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const FeatureTag = styled.span`
  background: rgba(255, 140, 0, 0.1);
  color: #ff8c00;
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: 1px solid rgba(255, 140, 0, 0.2);
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem 2rem;
  margin-top: auto;
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
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.7;
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ProjectHighlight = styled.div`
  background: rgba(255, 140, 0, 0.08);
  border-left: 4px solid #ff8c00;
  padding: 1rem;
  border-radius: 0 ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md} 0;
  font-style: italic;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const ImageShowcase = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const ShowcaseImage = styled(motion.img)`
  height: 60px;
  width: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  object-fit: cover;
  border: 2px solid rgba(255, 140, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
    border-color: rgba(255, 140, 0, 0.5);
    box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
  }
`;

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({ onProjectClick }) => {
  return (
    <PreviewCard
      onClick={onProjectClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        y: -4,
        boxShadow: "0 12px 35px rgba(255, 140, 0, 0.2)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      <ProjectHeader>
        <ProjectLogo 
          src="/projects_assets/pantreat/app+name.png" 
          alt="Pantreat Logo"
        />
        <ProjectInfo>
          <ProjectTagline>AI-Kitchen assistant that makes cooking cool again</ProjectTagline>
        </ProjectInfo>
      </ProjectHeader>
      
      <ProjectContent>
        <ProjectDescription>
          Your all-in-one AI Kitchen assistant. Unlike expensive meal services or smart fridges, 
          all you need is your phone and an appetite. Combines AI, community, and short-form content 
          to make cooking exciting again.
        </ProjectDescription>
        
        <ProjectHighlight>
          "The future of cooking is here - intelligent, social, and accessible to everyone"
        </ProjectHighlight>
        
        <div style={{ position: 'relative', height: '120px', margin: '1rem 0', borderRadius: '12px', overflow: 'hidden' }}>
          <img 
            src="/projects_assets/pantreat/iphone_app_mockups/mockrocket-capture.png"
            alt="Pantreat App Mockup"
            style={{
              position: 'absolute',
              right: '-20px',
              top: '-10px',
              height: '140px',
              width: 'auto',
              opacity: 0.3,
              zIndex: 1
            }}
          />
          <div style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: '#ff8c00',
            fontWeight: 'bold'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>React Native + AI</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Cross-platform mobile experience</div>
          </div>
        </div>
        
        <ProjectFeatures>
          <FeatureTag>AI Recipe Generation</FeatureTag>
          <FeatureTag>Smart Inventory</FeatureTag>
          <FeatureTag>Social Cooking</FeatureTag>
          <FeatureTag>Video Content</FeatureTag>
          <FeatureTag>Mobile First</FeatureTag>
        </ProjectFeatures>
        
        <ImageShowcase>
          <ShowcaseImage 
            src="/projects_assets/pantreat/mockups/mockup_1.png" 
            alt="Pantreat App Interface"
            whileHover={{ rotate: 5 }}
          />
          <ShowcaseImage 
            src="/projects_assets/pantreat/mockups/mockup_2.png" 
            alt="Recipe Generation"
            whileHover={{ rotate: -5 }}
          />
          <ShowcaseImage 
            src="/projects_assets/pantreat/mockups/mockup_3.png" 
            alt="Social Features"
            whileHover={{ rotate: 5 }}
          />
        </ImageShowcase>
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
            window.open('https://www.getpantreat.com', '_blank');
          }}
        >
          <ExternalLink size={20} />
          Visit Site
        </ActionButton>
      </ProjectActions>
    </PreviewCard>
  );
};