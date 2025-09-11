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
  background: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 95vw;
    max-height: 95vh;
  }
`;

const ImageSection = styled.div`
  flex: 2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
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
  background: #ffffff;
  overflow-y: auto;
  max-height: 90vh;

  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-width: unset;
    max-height: 60vh;
  }
`;

const ArtworkTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #212529;
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
  color: #6c757d;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const MetaValue = styled.span`
  color: #212529;
`;

const ArtworkDescription = styled.div`
  flex: 1;
`;

const DescriptionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: #212529;
  margin-bottom: 1rem;
`;

const DescriptionText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
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
  background: rgba(255, 255, 255, 0.9);
  color: #212529;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background: #ffffff;
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

const ProcessVideoSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #dee2e6;
`;

const VideoTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: #212529;
  margin-bottom: 1rem;
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  
  video {
    width: 300px !important;
    height: 533px !important;
    
    @media (max-width: 768px) {
      width: 250px !important;
      height: 444px !important;
    }
  }
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

          {artwork.processVideo && (
            <ProcessVideoSection>
              <VideoTitle>Painting Process</VideoTitle>
              <VideoContainer>
                <div style={{ 
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  border: '2px solid #dee2e6'
                }}>
                  <video 
                    width="300" 
                    height="533"
                    controls 
                    preload="metadata"
                    style={{ 
                      width: '300px', 
                      height: '533px',
                      display: 'block',
                      backgroundColor: '#000',
                      borderRadius: '8px'
                    }}
                    onError={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                      const video = e.currentTarget;
                      const error = video.error;
                      let errorMessage = 'Video Error Details:\n';
                      
                      if (error) {
                        switch(error.code) {
                          case 1:
                            errorMessage += 'MEDIA_ERR_ABORTED: Video loading was aborted';
                            break;
                          case 2:
                            errorMessage += 'MEDIA_ERR_NETWORK: Network error occurred';
                            break;
                          case 3:
                            errorMessage += 'MEDIA_ERR_DECODE: Video decoding error';
                            break;
                          case 4:
                            errorMessage += 'MEDIA_ERR_SRC_NOT_SUPPORTED: Video format not supported';
                            break;
                          default:
                            errorMessage += 'Unknown error';
                        }
                        errorMessage += `\nAttempted URL: ${artwork.processVideo}`;
                        errorMessage += `\nVideo naturalWidth: ${video.naturalWidth}`;
                        errorMessage += `\nVideo naturalHeight: ${video.naturalHeight}`;
                        errorMessage += `\nVideo readyState: ${video.readyState}`;
                        errorMessage += `\nVideo networkState: ${video.networkState}`;
                        
                        console.error(errorMessage);
                      }}
                      onLoadedMetadata={() => {
                        console.log('✅ Video metadata loaded successfully');
                      }}
                      onCanPlay={() => {
                        console.log('✅ Video can start playing');
                      }}
                    >
                      <source src={`http://localhost:5173${artwork.processVideo}`} type="video/mp4" />
                      <source src={artwork.processVideo} type="video/mp4" />
                      Your browser doesn't support HTML5 video.
                    </video>
                </div>
              </VideoContainer>
            </ProcessVideoSection>
          )}
          
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