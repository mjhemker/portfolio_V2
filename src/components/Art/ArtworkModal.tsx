import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import type { Artwork } from '../../types/index';

interface ArtworkModalProps {
  artwork: Artwork;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ModalContent = styled.div`
  display: flex;
  max-width: 90vw;
  max-height: 90vh;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.xl};

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 95vw;
  }
`;

const ImageSection = styled.div`
  flex: 2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface};
  min-height: 400px;

  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const ArtworkImage = styled(motion.img)`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  @media (max-width: 768px) {
    max-height: 50vh;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 300px;
  background: ${({ theme }) => theme.colors.secondary};

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-width: unset;
  }
`;

const ArtworkTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const ArtworkMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const MetaLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const MetaValue = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ArtworkDescription = styled.div`
  flex: 1;
`;

const DescriptionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const DescriptionText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const NavButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ImageNavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
  z-index: 10;
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const LeftNavButton = styled(ImageNavButton)`
  left: 1rem;
`;

const RightNavButton = styled(ImageNavButton)`
  right: 1rem;
`;

export const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  onClose,
  onPrevious,
  onNext
}) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalContent>
        <ImageSection>
          <LeftNavButton
            onClick={onPrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </LeftNavButton>
          
          <ArtworkImage
            src={artwork.image}
            alt={artwork.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <RightNavButton
            onClick={onNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </RightNavButton>
        </ImageSection>
        
        <InfoSection>
          <ArtworkTitle>{artwork.title}</ArtworkTitle>
          
          <ArtworkMeta>
            <MetaItem>
              <MetaLabel>Year</MetaLabel>
              <MetaValue>{artwork.year}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Medium</MetaLabel>
              <MetaValue>{artwork.medium}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Dimensions</MetaLabel>
              <MetaValue>{artwork.dimensions}</MetaValue>
            </MetaItem>
          </ArtworkMeta>
          
          <ArtworkDescription>
            <DescriptionTitle>About this work</DescriptionTitle>
            <DescriptionText>{artwork.description}</DescriptionText>
          </ArtworkDescription>
          
          <NavigationButtons>
            <NavButton
              onClick={onPrevious}
              icon={<ChevronLeft size={16} />}
            >
              Previous
            </NavButton>
            <NavButton
              onClick={onNext}
              icon={<ChevronRight size={16} />}
            >
              Next
            </NavButton>
          </NavigationButtons>
        </InfoSection>
      </ModalContent>
    </Modal>
  );
};