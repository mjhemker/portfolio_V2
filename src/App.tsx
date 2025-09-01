import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { AppProvider, useAppContext } from './contexts/AppContext';
import { Navigation } from './components/Navigation/Navigation';
import { WorkTab } from './components/Work/WorkTab';
import { ArtTab } from './components/Art/ArtTab';
import { AboutTab } from './components/About/AboutTab';
import { useKeyboardControls } from './hooks/useKeyboardControls';

const BackgroundTransition = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -20;
  background: #0a0a0a;
`;

const AppContent: React.FC = () => {
  const { activeTab } = useAppContext();
  
  // Initialize keyboard controls
  useKeyboardControls();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'work':
        return <WorkTab key="work" />;
      case 'art':
        return <ArtTab key="art" />;
      case 'about':
        return <AboutTab key="about" />;
      default:
        return <WorkTab key="work" />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <BackgroundTransition />
      <Navigation />
      <AnimatePresence mode="wait">
        {renderActiveTab()}
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
