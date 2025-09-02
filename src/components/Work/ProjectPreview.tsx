import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectPreviewProps {
  onProjectClick: () => void;
}

const PreviewCard = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(255, 140, 0, 0.1) 0%, 
    rgba(255, 69, 0, 0.05) 100%);
  border: 1px solid rgba(255, 140, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  margin-bottom: 2rem;
  cursor: pointer;
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
      rgba(255, 140, 0, 0.1), 
      transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const ProjectLogo = styled.img`
  height: 60px;
  width: auto;
  max-width: 200px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.2);
  object-fit: contain;
  background: white;
  padding: 0.5rem;
`;

const ProjectInfo = styled.div`
  flex: 1;
`;

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 0.25rem 0;
  background: linear-gradient(135deg, #ff8c00, #ff4500);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProjectTagline = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  font-style: italic;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled(motion.button)`
  background: rgba(255, 140, 0, 0.1);
  border: 1px solid rgba(255, 140, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.75rem 1.25rem;
  color: #ff8c00;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  &:hover {
    background: rgba(255, 140, 0, 0.2);
    border-color: rgba(255, 140, 0, 0.5);
  }
`;

const ProjectDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 1rem;
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
        boxShadow: "0 8px 25px rgba(255, 140, 0, 0.15)"
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
        <ProjectActions>
          <ActionButton
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              window.open('https://www.getpantreat.com', '_blank');
            }}
          >
            <ExternalLink size={16} />
            Visit Site
          </ActionButton>
          <ActionButton
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onProjectClick}
          >
            <ArrowRight size={16} />
            Learn More
          </ActionButton>
        </ProjectActions>
      </ProjectHeader>
      
      <ProjectDescription>
        Your all-in-one AI Kitchen assistant. Unlike expensive meal services or smart fridges, 
        all you need is your phone and an appetite. Combines AI, community, and short-form content 
        to make cooking exciting again.
      </ProjectDescription>
    </PreviewCard>
  );
};