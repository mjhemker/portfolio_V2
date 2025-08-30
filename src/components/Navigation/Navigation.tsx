import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../contexts/AppContext';
import type { Tab } from '../../types';

const tabs: Tab[] = [
  { id: 'art', label: 'Art' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' }
];

const lightModeGlow = keyframes`
  0%, 100% { box-shadow: 0 8px 32px rgba(0, 123, 255, 0.15); }
  50% { box-shadow: 0 12px 48px rgba(0, 123, 255, 0.25); }
`;

const NavigationContainer = styled(motion.nav)<{ $isArtTab: boolean }>`
  position: fixed;
  top: 2rem;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  
  > div {
    pointer-events: all;
    background: ${({ $isArtTab }) => 
      $isArtTab 
        ? 'rgba(255, 255, 255, 0.95)' 
        : 'rgba(26, 26, 26, 0.9)'
    };
    backdrop-filter: blur(20px);
    border: 1px solid ${({ $isArtTab, theme }) => 
      $isArtTab 
        ? 'rgba(0, 123, 255, 0.2)' 
        : theme.colors.border
    };
    border-radius: ${({ theme }) => theme.borderRadius.full};
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    
    ${({ $isArtTab }) => $isArtTab && `
      animation: ${lightModeGlow} 4s ease-in-out infinite;
      box-shadow: 0 8px 32px rgba(0, 123, 255, 0.2);
    `}
  }
`;

const TabButton = styled(motion.button)<{ 
  $isActive: boolean;
  $isArtTab: boolean;
}>`
  position: relative;
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ $isActive, $isArtTab, theme }) => {
    if ($isArtTab) {
      return $isActive ? '#007bff' : '#6c757d';
    }
    return $isActive ? theme.colors.text.primary : theme.colors.text.secondary;
  }};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  white-space: nowrap;
  margin: 0;
  box-sizing: border-box;

  &:hover {
    color: ${({ $isArtTab, theme }) => 
      $isArtTab ? '#007bff' : theme.colors.text.primary
    };
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

const ActiveIndicator = styled(motion.div)<{ $isArtTab: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ $isArtTab, theme }) => 
    $isArtTab 
      ? 'linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 123, 255, 0.05))'
      : theme.colors.surface
  };
  border: ${({ $isArtTab }) => 
    $isArtTab ? '1px solid rgba(0, 123, 255, 0.2)' : 'none'
  };
  border-radius: ${({ theme }) => theme.borderRadius.full};
  z-index: -1;
  box-shadow: ${({ $isArtTab }) => 
    $isArtTab 
      ? '0 4px 16px rgba(0, 123, 255, 0.15)'
      : 'none'
  };
`;

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab } = useAppContext();
  const isArtTab = activeTab === 'art';

  return (
    <NavigationContainer
      $isArtTab={isArtTab}
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1, 
        y: 0
      }}
      transition={{ 
        duration: 0.6, 
        type: 'spring' as const, 
        stiffness: 100,
        damping: 15
      }}
    >
      <motion.div
        animate={{
          background: isArtTab 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(26, 26, 26, 0.9)'
        }}
        transition={{ duration: 0.6 }}
      >
        
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            $isActive={activeTab === tab.id}
            $isArtTab={isArtTab}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ 
              scale: 1.02,
              y: -1
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
          >
            <AnimatePresence>
              {activeTab === tab.id && (
                <ActiveIndicator
                  $isArtTab={isArtTab}
                  layoutId="activeTab"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: 'spring' as const, 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.4
                  }}
                />
              )}
            </AnimatePresence>
            <motion.span
              animate={{
                color: isArtTab 
                  ? (activeTab === tab.id ? '#007bff' : '#6c757d')
                  : (activeTab === tab.id ? '#ffffff' : '#a0a0a0')
              }}
              transition={{ duration: 0.4 }}
            >
              {tab.label}
            </motion.span>
          </TabButton>
        ))}
      </motion.div>
    </NavigationContainer>
  );
};