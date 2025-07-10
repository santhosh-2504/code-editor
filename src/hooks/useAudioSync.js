import { useEffect, useRef, useState } from 'react';

export const useAudioSync = (audioFile = null) => {
  const audioRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(audioFile);
  const syncTimeoutRef = useRef(null);

  // Initialize audio when audioUrl changes
  useEffect(() => {
    if (!audioUrl) {
      setAudioLoaded(false);
      setAudioError(null);
      return;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const handleLoadedData = () => {
      setAudioLoaded(true);
      setAudioError(null);
    };

    const handleError = (e) => {
      setAudioError(`Failed to load audio: ${e.message || 'Unknown error'}`);
      setAudioLoaded(false);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('error', handleError);
    audio.preload = "auto";

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl]);

  // Sync audio to specific time with smooth seeking
  const syncAudioToTime = (targetTimeMs) => {
    if (!audioRef.current || !audioEnabled || !audioLoaded) return;

    const targetTimeSec = targetTimeMs / 1000;
    const currentTime = audioRef.current.currentTime;
    const timeDiff = Math.abs(targetTimeSec - currentTime);

    // Only sync if there's a significant difference (more than 0.1 seconds)
    if (timeDiff > 0.1) {
      try {
        audioRef.current.currentTime = Math.max(0, targetTimeSec);
      } catch (e) {
        console.warn('Audio sync failed:', e);
      }
    }
  };

  // Start audio playback
  const startAudio = (currentTimeMs = 0) => {
    if (!audioRef.current || !audioEnabled || !audioLoaded) return;

    try {
      syncAudioToTime(currentTimeMs);
      
      // Small delay to ensure sync before playing
      syncTimeoutRef.current = setTimeout(() => {
        audioRef.current?.play().catch(e => {
          console.warn('Audio playback failed:', e);
        });
      }, 50);
    } catch (e) {
      console.warn('Audio start failed:', e);
    }
  };

  // Pause audio playback
  const pauseAudio = () => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  };

  // Reset audio to beginning
  const resetAudio = () => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Seek to specific time
  const seekAudio = (targetTimeMs) => {
    if (!audioRef.current || !audioEnabled || !audioLoaded) return;
    
    const wasPlaying = !audioRef.current.paused;
    pauseAudio();
    syncAudioToTime(targetTimeMs);
    
    if (wasPlaying) {
      // Resume playback after a short delay
      syncTimeoutRef.current = setTimeout(() => {
        audioRef.current?.play().catch(e => {
          console.warn('Audio resume failed:', e);
        });
      }, 100);
    }
  };

  // Set playback speed
  const setAudioPlaybackRate = (speed) => {
    if (audioRef.current && audioLoaded) {
      audioRef.current.playbackRate = speed;
    }
  };

  // Load new audio file
  const loadAudioFile = (file) => {
    setAudioUrl(file);
  };

  // Get audio duration
  const getAudioDuration = () => {
    if (audioRef.current && audioLoaded) {
      return audioRef.current.duration * 1000; // Convert to milliseconds
    }
    return 0;
  };

  // Get current audio time
  const getCurrentAudioTime = () => {
    if (audioRef.current && audioLoaded) {
      return audioRef.current.currentTime * 1000; // Convert to milliseconds
    }
    return 0;
  };

  return {
    audioEnabled,
    setAudioEnabled,
    audioLoaded,
    audioError,
    audioUrl,
    startAudio,
    pauseAudio,
    resetAudio,
    seekAudio,
    syncAudioToTime,
    setAudioPlaybackRate,
    loadAudioFile,
    getAudioDuration,
    getCurrentAudioTime
  };
};