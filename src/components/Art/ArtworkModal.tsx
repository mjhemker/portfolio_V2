import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import { VimeoEmbed } from '../UI';
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
  max-height: 88vh;
  background: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 95vw;
    max-height: 92vh;
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
  height: 100%;

  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #9333ea;
    border-radius: 4px;
    
    &:hover {
      background: #7c3aed;
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-width: unset;
    height: 100%;
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
  margin-top: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  border: 1px solid #dee2e6;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #9333ea, #7c3aed, #6366f1);
  }
`;

const VideoTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #9333ea;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #9333ea, #7c3aed);
    border-radius: 2px;
  }
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


const getVimeoIdForArtwork = (title: string): string | null => {
  const vimeoMapping: Record<string, string> = {
    // 2023 Art Videos
    "Bingo and Meow-Meow": "1120327909",
    "Duality": "1120327914", 
    "New": "1120327919",
    "Rusty": "1120327924",
    "The Campfire": "1120327933",
    "You Look Lonely, I Can Fix That": "1120327961",
    // 2024 Art Videos
    "Keeda": "1120329097",
    "Little Red": "1120329109",
    "We're All Chasing The Red Cape": "1120329145",
    "Walk Down Memory Lane": "1120329134",
    "Sage": "1120329118",
    "The Bat and the Cat": "1120329125",
    "Commander": "1120329090",
    "Mia": "1120329105",
    // 2025 Art Videos
    "If This World Were Mine": "1120335792",
    "Dancers Dance": "1120335781"
  };
  return vimeoMapping[title] || null;
};

export const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  onClose,
  onPrevious,
  onNext
}) => {
  // Debug logging for artwork data
  console.log(`🎨 [ART MODAL] Opened for artwork: "${artwork.title}"`);
  console.log(`🎨 [ART MODAL] Process video path: ${artwork.processVideo}`);
  console.log(`🎨 [ART MODAL] Has process video: ${!!artwork.processVideo}`);
  
  // Check for Vimeo video
  const vimeoId = getVimeoIdForArtwork(artwork.title);
  console.log(`🎨 [ART MODAL] Vimeo ID for "${artwork.title}": ${vimeoId}`);

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

          {(artwork.processVideo || vimeoId) && (
            <ProcessVideoSection>
              <VideoTitle>Painting Process</VideoTitle>
              <div style={{
                textAlign: 'center',
                color: '#6c757d',
                fontSize: '14px',
                marginBottom: '1.5rem',
                fontStyle: 'italic'
              }}>
                Watch the artistic journey from blank canvas to finished masterpiece
              </div>
              <VideoContainer>
                {vimeoId ? (
                  <div style={{
                    width: '300px',
                    maxWidth: '300px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 12px 40px rgba(147, 51, 234, 0.2)',
                    border: '2px solid rgba(147, 51, 234, 0.1)',
                    transition: 'all 0.3s ease',
                    background: '#000'
                  }}>
                    <VimeoEmbed
                      videoId={vimeoId}
                      aspectRatio="177.78%"
                      autoplay={true}
                      muted={true}
                      showTitle={false}
                      showByline={false}
                      showPortrait={false}
                      showBadge={false}
                      style={{
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ 
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    border: '2px solid #dee2e6'
                  }}>
                    <video 
                      controls 
                      width="300" 
                      height="533"
                      style={{ 
                        width: '300px', 
                        height: '533px',
                        backgroundColor: '#000',
                        borderRadius: '8px'
                      }}
                      playsInline
                      onLoadStart={() => {
                        const videoSrc = artwork.processVideo?.replace('/art_vods/', 'art_vods/');
                        console.log(`🔄 [ART VIDEO] Loading started for: ${videoSrc}`);
                        console.log(`🔄 [ART VIDEO] Original path: ${artwork.processVideo}`);
                        console.log(`🔄 [ART VIDEO] Processed path: ${videoSrc}`);
                      }}
                      onLoadedMetadata={(e) => {
                        const video = e.target as HTMLVideoElement;
                        console.log(`✅ [ART VIDEO] Metadata loaded successfully`);
                        console.log(`✅ [ART VIDEO] Duration: ${video.duration}s`);
                        console.log(`✅ [ART VIDEO] Dimensions: ${video.videoWidth}x${video.videoHeight}`);
                        console.log(`✅ [ART VIDEO] Current src: ${video.currentSrc}`);
                        console.log(`✅ [ART VIDEO] Ready state: ${video.readyState}`);
                        console.log(`✅ [ART VIDEO] Network state: ${video.networkState}`);
                      }}
                      onLoadedData={() => {
                        console.log(`✅ [ART VIDEO] Data loaded - ready to play`);
                      }}
                      onCanPlay={() => {
                        console.log(`✅ [ART VIDEO] Can start playing`);
                      }}
                      onCanPlayThrough={() => {
                        console.log(`✅ [ART VIDEO] Can play through without buffering`);
                      }}
                      onError={(e) => {
                        const video = e.target as HTMLVideoElement;
                        const error = video.error;
                        console.error(`❌ [ART VIDEO] Error occurred:`);
                        console.error(`❌ [ART VIDEO] Error code: ${error?.code}`);
                        console.error(`❌ [ART VIDEO] Error message: ${error?.message}`);
                        console.error(`❌ [ART VIDEO] Current src: ${video.currentSrc}`);
                        console.error(`❌ [ART VIDEO] Ready state: ${video.readyState}`);
                        console.error(`❌ [ART VIDEO] Network state: ${video.networkState}`);
                        
                        let errorDesc = 'Unknown error';
                        if (error) {
                          switch(error.code) {
                            case 1: errorDesc = 'MEDIA_ERR_ABORTED - Loading was aborted'; break;
                            case 2: errorDesc = 'MEDIA_ERR_NETWORK - Network error'; break;
                            case 3: errorDesc = 'MEDIA_ERR_DECODE - Decode error'; break;
                            case 4: errorDesc = 'MEDIA_ERR_SRC_NOT_SUPPORTED - Source not supported'; break;
                          }
                        }
                        console.error(`❌ [ART VIDEO] Error description: ${errorDesc}`);
                      }}
                      onAbort={() => {
                        console.warn(`⚠️ [ART VIDEO] Loading aborted`);
                      }}
                      onStalled={() => {
                        console.warn(`⚠️ [ART VIDEO] Loading stalled`);
                      }}
                      onSuspend={() => {
                        console.warn(`⚠️ [ART VIDEO] Loading suspended`);
                      }}
                    >
                      <source src={artwork.processVideo?.replace('/art_vods/', 'art_vods/')} type="video/mp4" />
                      Your browser doesn't support HTML5 video.
                    </video>
                  </div>
                )}
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