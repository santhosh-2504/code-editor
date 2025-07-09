import { useEffect, useRef, useState } from 'react';

export const useAudio = (soundFile = "/click-sound.mp3") => {
  const audioRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(soundFile);
    audioRef.current.preload = "auto";
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundFile]);

  const playKeystrokeSound = () => {
    if (audioEnabled && audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => {
          console.log("Audio playback failed:", e);
        });
      } catch (e) {
        console.log("Audio error:", e);
      }
    }
  };

  return {
    audioEnabled,
    setAudioEnabled,
    playKeystrokeSound
  };
};