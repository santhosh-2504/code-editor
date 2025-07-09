import { useEffect } from 'react';

export const useKeyboardControls = (
  isEditMode,
  isPlaying,
  handlePlay,
  handlePause,
  skipForward,
  skipBackward,
  skipAmount = 5000
) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle these keys if we're not in edit mode and not typing in any input
      if (isEditMode || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') return;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          skipBackward(skipAmount);
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipForward(skipAmount);
          break;
        case ' ':
          e.preventDefault();
          if (isPlaying) {
            handlePause();
          } else {
            handlePlay();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEditMode, isPlaying, handlePlay, handlePause, skipForward, skipBackward, skipAmount]);

  const getSkipAmountDisplay = () => {
    if (skipAmount >= 1000) {
      return `${skipAmount / 1000}s`;
    }
    return `${skipAmount}ms`;
  };

  return {
    getSkipAmountDisplay
  };
};