import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Globe } from 'lucide-react';

interface LimboPreviewProps {
  onProjectClick: () => void;
}

const PreviewCard = styled(motion.div)`
  background: radial-gradient(circle at 20% 30%,
    rgba(255, 215, 0, 0.2) 0%,
    rgba(255, 193, 7, 0.1) 40%,
    rgba(0, 0, 0, 0.8) 100%);
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  flex: 1;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
      rgba(255, 215, 0, 0.1) 0%,
      transparent 40%,
      transparent 60%,
      rgba(255, 193, 7, 0.05) 100%);
    pointer-events: none;
    z-index: 2;
  }

  @media (max-width: 1100px) and (min-width: 950px) {
    height: auto;
    min-height: 750px;
  }

  @media (max-width: 950px) and (min-width: 850px) {
    height: auto;
    min-height: 800px;
  }

  @media (max-width: 850px) and (min-width: 769px) {
    height: auto;
    min-height: 660px;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 500px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};

    &::before {
      width: 100%;
      background-position: center top;
      opacity: 0.08;
    }

    &:hover::before {
      transform: scale(1.02);
      opacity: 0.12;
    }
  }

  @media (max-width: 480px) {
    min-height: 450px;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 2rem 0;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem 1.5rem 0;
    gap: 1rem;
  }
`;

const ProjectLogo = styled.img`
  height: 100px;
  width: auto;
  max-width: 300px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 12px 30px rgba(255, 215, 0, 0.4);
  object-fit: contain;
  background: rgba(0, 0, 0, 0.95);
  padding: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(255, 215, 0, 0.2);

  &:hover {
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 20px 40px rgba(255, 215, 0, 0.5);
    border-color: rgba(255, 215, 0, 0.6);
  }

  @media (max-width: 768px) {
    height: 80px;
    max-width: 250px;
    padding: 0.75rem;

    &:hover {
      transform: scale(1.05);
    }
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
  background: linear-gradient(135deg, #fff, #ffd700);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    letter-spacing: 0.5px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const ProjectContent = styled.div`
  padding: 1.5rem 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 3;
  max-width: 65%;

  @media (max-width: 1200px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem 0 1.5rem;
    gap: 1rem;
  }
`;

const ProjectFeatures = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.75rem;
  margin: 1rem 0 4rem 0;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    margin: 1rem 0 5rem 0;
  }

  @media (max-width: 950px) {
    margin: 1rem 0 4rem 0;
  }

  @media (max-width: 768px) {
    margin: 1rem 0 3rem 0;
    flex-wrap: wrap;
  }
`;

const FeatureTag = styled(motion.span)`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 193, 7, 0.1));
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  border: 2px solid rgba(255, 215, 0, 0.4);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 1rem;
  padding: 2rem;
  position: relative;
  z-index: 3;
  margin-top: auto;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 0.75rem;
    flex-direction: column;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    gap: 0.5rem;
  }
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(135deg, #ffd700, #ffc107);
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem 2rem;
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  flex: 1;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    min-height: 48px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryActionButton = styled(ActionButton)`
  background: rgba(255, 215, 0, 0.1);
  color: #ffd700;
  border: 2px solid rgba(255, 215, 0, 0.3);

  &:hover {
    background: rgba(255, 215, 0, 0.2);
    border-color: rgba(255, 215, 0, 0.5);
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

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: 1.5;
  }
`;


export const LimboPreview: React.FC<LimboPreviewProps> = ({ onProjectClick }) => {
  return (
    <PreviewCard
      onClick={onProjectClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 35px rgba(255, 215, 0, 0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: "radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.2) 0%, rgba(255, 193, 7, 0.1) 40%, rgba(0, 0, 0, 0.8) 100%)",
        border: "2px solid rgba(255, 215, 0, 0.4)",
        '--background-image': "url('/projects_assets/limbo/screen_shots/additional_features.webp')"
      } as React.CSSProperties & { '--background-image': string }}
    >
      <MainContent>
        <ProjectHeader>
          <ProjectLogo
            src="/projects_assets/limbo/limbo_icon.webp"
            alt="Limbo Logo"
            style={{
              boxShadow: "0 12px 30px rgba(255, 215, 0, 0.4)",
              borderColor: "rgba(255, 215, 0, 0.2)"
            }}
          />
          <ProjectInfo>
            <ProjectTagline
              style={{
                background: "linear-gradient(135deg, #fff, #ffd700)",
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Spark Real Conversations
            </ProjectTagline>
          </ProjectInfo>
        </ProjectHeader>

        <ProjectContent>
          <ProjectDescription>
            A social app that uses AI-personalized daily prompts to spark authentic conversations within friend groups. Co-founded as part of my Stanford Design Capstone, launched on the App Store in May 2026.
          </ProjectDescription>

          <ProjectFeatures>
            <FeatureTag
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              AI Prompts
            </FeatureTag>
            <FeatureTag
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Friend Circles
            </FeatureTag>
            <FeatureTag
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              iOS App
            </FeatureTag>
          </ProjectFeatures>
        </ProjectContent>
      </MainContent>

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
        <SecondaryActionButton
          as={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            window.open("https://www.limbo.social/feed", '_blank');
          }}
        >
          <Globe size={20} />
          Web App
        </SecondaryActionButton>
        <ActionButton
          as={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            window.open("https://apps.apple.com/us/app/limbo-social/id6761860053", '_blank');
          }}
        >
          <ExternalLink size={20} />
          App Store
        </ActionButton>
      </ProjectActions>
    </PreviewCard>
  );
};
