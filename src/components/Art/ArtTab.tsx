import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { artworkByYear, drawingsByCategory } from '../../data/artwork';
import type { Artwork } from '../../types/index';
import { ArtworkModal } from './ArtworkModal';

const ArtContainer = styled(motion.div)`
  padding: 6rem 0 2rem;
  min-height: 100vh;
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
  background: #ffffff;
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
    z-index: -10;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 6rem 1rem 1rem;
    gap: 1rem;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  height: fit-content;
  position: sticky;
  top: 8rem;
  padding: 2rem 1rem;

  @media (max-width: 1024px) {
    width: 100%;
    position: static;
    padding: 1rem;
  }
`;

const SidebarNav = styled.nav`
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #007bff, #40a9ff, #007bff);
    border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;
  }
`;

const SidebarTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: #212529;
  margin-bottom: 1rem;
  text-align: center;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  margin-bottom: 0.5rem;
`;

const SidebarLink = styled.a<{ $isActive?: boolean }>`
  display: block;
  padding: 0.875rem 1.25rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ $isActive }) => 
    $isActive ? '#007bff' : '#6c757d'
  };
  background: ${({ $isActive }) => 
    $isActive ? 'linear-gradient(135deg, #e3f2fd, #f0f8ff)' : 'transparent'
  };
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid ${({ $isActive }) => 
    $isActive ? '#b3d9ff' : 'transparent'
  };
  font-weight: ${({ $isActive }) => $isActive ? '500' : '400'};
  position: relative;
  
  ${({ $isActive }) => $isActive && `
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.15);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 60%;
      background: #007bff;
      border-radius: 0 2px 2px 0;
    }
  `}

  &:hover {
    background: ${({ $isActive }) => 
      $isActive 
        ? 'linear-gradient(135deg, #d6edff, #e8f4ff)' 
        : '#f8f9fa'
    };
    color: #007bff;
    border-color: #b3d9ff;
    transform: translateX(6px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 0 2rem;

  @media (max-width: 1024px) {
    padding: 0;
  }
`;

const ArtHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #007bff, #40a9ff, #007bff);
    border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;
  }
`;

const ArtTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #212529;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;

const ArtSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: #6c757d;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const YearSection = styled(motion.section)`
  margin-bottom: 4rem;
`;

const YearHeader = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: #212529;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
`;

const ArtworkGrid = styled.div`
  columns: 3;
  column-gap: 1.5rem;
  break-inside: avoid;

  @media (max-width: 1024px) {
    columns: 2;
    column-gap: 1rem;
  }

  @media (max-width: 768px) {
    columns: 1;
    column-gap: 1rem;
  }
`;

const ArtworkCard = styled(motion.div)`
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.fast};
  display: flex;
  flex-direction: column;
  break-inside: avoid;
  margin-bottom: 1.5rem;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #007bff;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const ArtworkImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform ${({ theme }) => theme.animations.normal};

  ${ArtworkCard}:hover & {
    transform: scale(1.02);
  }
`;

const ArtworkInfo = styled.div`
  padding: 1rem 1.5rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const ArtworkTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: #212529;
  margin: 0;
  text-align: center;
`;

export const ArtTab: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  
  const years = Object.keys(artworkByYear)
    .map(Number)
    .sort((a, b) => b - a); // Sort descending (newest first)
  
  const allSections = [
    ...years.map(year => ({ id: year.toString(), label: year.toString() })),
    { id: 'drawings', label: 'Drawings' }
  ];

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleCloseModal = () => {
    setSelectedArtwork(null);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const offset = 120; // Account for fixed nav
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const getAllArtworks = () => {
    const yearArtworks = years.flatMap(year => artworkByYear[year]);
    const drawingArtworks = Object.values(drawingsByCategory).flat();
    return [...yearArtworks, ...drawingArtworks];
  };

  const findAdjacentArtwork = (currentId: string, direction: 'prev' | 'next') => {
    const allArtworks = getAllArtworks();
    const currentIndex = allArtworks.findIndex(art => art.id === currentId);
    
    if (direction === 'prev') {
      return currentIndex > 0 ? allArtworks[currentIndex - 1] : allArtworks[allArtworks.length - 1];
    } else {
      return currentIndex < allArtworks.length - 1 ? allArtworks[currentIndex + 1] : allArtworks[0];
    }
  };

  return (
    <>
      <ArtContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
      >
        <Sidebar>
          <SidebarNav>
            <SidebarTitle>Navigate Gallery</SidebarTitle>
            <SidebarList>
              {allSections.map((section) => (
                <SidebarItem key={section.id}>
                  <SidebarLink
                    $isActive={activeSection === section.id}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.label}
                  </SidebarLink>
                </SidebarItem>
              ))}
            </SidebarList>
          </SidebarNav>
        </Sidebar>

        <MainContent>
          <ArtHeader
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ArtTitle>Art Gallery</ArtTitle>
            <ArtSubtitle>
              A curated collection of my artistic works exploring various mediums and themes, 
              from digital paintings to traditional canvas works.
            </ArtSubtitle>
          </ArtHeader>

          {years.map((year, yearIndex) => (
            <YearSection
              key={year}
              id={`section-${year}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: yearIndex * 0.1 }}
            >
              <YearHeader>{year}</YearHeader>
              <ArtworkGrid>
                {artworkByYear[year].map((artwork, index) => (
                  <ArtworkCard
                    key={artwork.id}
                    onClick={() => handleArtworkClick(artwork)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: (yearIndex * 0.1) + (index * 0.05),
                      duration: 0.3 
                    }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArtworkImage
                      src={artwork.image}
                      alt={artwork.title}
                    />
                    <ArtworkInfo>
                      <ArtworkTitle>{artwork.title}</ArtworkTitle>
                    </ArtworkInfo>
                  </ArtworkCard>
                ))}
              </ArtworkGrid>
            </YearSection>
          ))}

          {Object.entries(drawingsByCategory).map(([category, artworks], categoryIndex) => (
            <YearSection
              key={category}
              id={`section-drawings`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (years.length + categoryIndex) * 0.1 }}
            >
              <YearHeader>{category}</YearHeader>
              <ArtworkGrid>
                {artworks.map((artwork, index) => (
                  <ArtworkCard
                    key={artwork.id}
                    onClick={() => handleArtworkClick(artwork)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: ((years.length + categoryIndex) * 0.1) + (index * 0.05),
                      duration: 0.3 
                    }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArtworkImage
                      src={artwork.image}
                      alt={artwork.title}
                    />
                    <ArtworkInfo>
                      <ArtworkTitle>{artwork.title}</ArtworkTitle>
                    </ArtworkInfo>
                  </ArtworkCard>
                ))}
              </ArtworkGrid>
            </YearSection>
          ))}
        </MainContent>
      </ArtContainer>

      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={handleCloseModal}
          onPrevious={() => {
            const prevArtwork = findAdjacentArtwork(selectedArtwork.id, 'prev');
            setSelectedArtwork(prevArtwork);
          }}
          onNext={() => {
            const nextArtwork = findAdjacentArtwork(selectedArtwork.id, 'next');
            setSelectedArtwork(nextArtwork);
          }}
        />
      )}
    </>
  );
};