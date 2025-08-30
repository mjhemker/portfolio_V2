import { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

export const useKeyboardControls = () => {
  const { activeTab, setPlayerState } = useAppContext();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't handle keyboard shortcuts when typing in inputs
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Only handle keyboard shortcuts on the work tab
      if (activeTab !== 'work') {
        return;
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
          break;
        case 'ArrowLeft':
          event.preventDefault();
          setPlayerState(prev => ({
            ...prev,
            currentProjectIndex: prev.currentProjectIndex === 0 
              ? 5 // Assuming 6 projects (0-5)
              : prev.currentProjectIndex - 1
          }));
          break;
        case 'ArrowRight':
          event.preventDefault();
          setPlayerState(prev => ({
            ...prev,
            currentProjectIndex: (prev.currentProjectIndex + 1) % 6 // Assuming 6 projects
          }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeTab, setPlayerState]);
};