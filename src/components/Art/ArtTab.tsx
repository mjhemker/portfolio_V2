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
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const SidebarTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
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
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.accent : theme.colors.text.secondary
  };
  background: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.surface : 'transparent'
  };
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  transition: all ${({ theme }) => theme.animations.fast};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.accent};
    transform: translateX(4px);
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
`;

const ArtTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;

const ArtSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
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
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.fast};
  display: flex;
  flex-direction: column;
  break-inside: avoid;
  margin-bottom: 1.5rem;
  width: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
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
  color: ${({ theme }) => theme.colors.text.primary};
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ArtTitle>Art Gallery</ArtTitle>
            <ArtSubtitle>
              A curated collection of my artistic works exploring various mediums and themes, 
              from digital paintings to traditional canvas works.
            </ArtSubtitle>
          </ArtHeader>

          {years.map((year) => (
            <YearSection
              key={year}
              id={`section-${year}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <YearHeader>{year}</YearHeader>
              <ArtworkGrid>
                {artworkByYear[year].map((artwork) => (
                  <ArtworkCard
                    key={artwork.id}
                    onClick={() => handleArtworkClick(artwork)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
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

          {Object.entries(drawingsByCategory).map(([category, artworks]) => (
            <YearSection
              key={category}
              id={`section-drawings`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <YearHeader>{category}</YearHeader>
              <ArtworkGrid>
                {artworks.map((artwork) => (
                  <ArtworkCard
                    key={artwork.id}
                    onClick={() => handleArtworkClick(artwork)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
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