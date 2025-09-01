import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../contexts/AppContext';
import type { Tab } from '../../types';

const tabs: Tab[] = [
  { id: 'art', label: 'Art' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' }
];

const NavigationContainer = styled(motion.nav)`
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
    background: rgba(26, 26, 26, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
  }
`;

const TabButton = styled(motion.button)<{ 
  $isActive: boolean;
}>`
  position: relative;
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.text.primary : theme.colors.text.secondary
  };
  transition: all ${({ theme }) => theme.animations.fast};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  z-index: -1;
`;

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <NavigationContainer
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
      <div>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            $isActive={activeTab === tab.id}
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
            <span>
              {tab.label}
            </span>
          </TabButton>
        ))}
      </div>
    </NavigationContainer>
  );
};