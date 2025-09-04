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
    background: linear-gradient(135deg, 
      rgba(26, 26, 26, 0.95) 0%,
      rgba(40, 40, 40, 0.9) 50%,
      rgba(26, 26, 26, 0.95) 100%);
    backdrop-filter: blur(25px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.full};
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, 
        rgba(138, 43, 226, 0.3) 0%,
        rgba(30, 144, 255, 0.2) 50%,
        rgba(138, 43, 226, 0.3) 100%);
      border-radius: ${({ theme }) => theme.borderRadius.full};
      z-index: -1;
      filter: blur(8px);
      opacity: 0.6;
    }
  }
`;

const TabButton = styled(motion.button)<{ 
  $isActive: boolean;
}>`
  position: relative;
  padding: 1.25rem 2.5rem;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.text.primary : theme.colors.text.secondary
  };
  transition: all ${({ theme }) => theme.animations.fast};
  cursor: pointer;
  white-space: nowrap;
  text-shadow: ${({ $isActive }) => 
    $isActive ? '0 0 10px rgba(255, 255, 255, 0.3)' : 'none'
  };

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    transform: scale(1.05);
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(138, 43, 226, 0.2) 0%,
    rgba(30, 144, 255, 0.15) 50%,
    rgba(138, 43, 226, 0.2) 100%);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  z-index: -1;
  border: 1px solid rgba(138, 43, 226, 0.3);
  box-shadow: 
    0 0 20px rgba(138, 43, 226, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
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