import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Tab, PlayerState } from '../types';

interface AppContextType {
  activeTab: Tab['id'];
  setActiveTab: (tab: Tab['id']) => void;
  playerState: PlayerState;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<Tab['id']>('work');
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentProjectIndex: 0,
    progress: 0,
    duration: 8, // 8 seconds per project cycle
    volume: 0.7, // Default volume at 70%
    isMuted: false // Not muted by default
  });

  const value = {
    activeTab,
    setActiveTab,
    playerState,
    setPlayerState
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};