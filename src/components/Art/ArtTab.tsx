import React from 'react';
import { artworkByYear } from '../../data/artwork';



export const ArtTab: React.FC = () => {
  console.log('ArtTab component rendering...'); // Debug log
  
  // Test with minimal component first
  return (
    <div style={{ 
      padding: '6rem 2rem 2rem', 
      minHeight: '100vh', 
      background: '#ffffff',
      color: '#000000',
      position: 'relative',
      zIndex: 1
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Art Gallery</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        A curated collection of my artistic works exploring various mediums and themes.
      </p>
      
      {/* Test with just a few sample artworks */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {Object.entries(artworkByYear).slice(0, 2).map(([year, artworks]) => (
          <div key={year} style={{ 
            background: '#f8f9fa', 
            padding: '1.5rem', 
            borderRadius: '12px',
            border: '1px solid #e9ecef'
          }}>
            <h2 style={{ marginBottom: '1rem', color: '#212529' }}>{year}</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem'
            }}>
              {artworks.slice(0, 3).map((artwork) => (
                <div key={artwork.id} style={{ 
                  background: '#ffffff', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  border: '1px solid #dee2e6'
                }}>
                  <img 
                    src={artwork.image} 
                    alt={artwork.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      console.log('Image failed to load:', artwork.image);
                      (e.target as HTMLImageElement).style.background = '#f8f9fa';
                      (e.target as HTMLImageElement).alt = 'Image not found';
                    }}
                  />
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>{artwork.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};