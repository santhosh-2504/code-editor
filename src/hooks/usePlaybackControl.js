import { useState, useEffect } from 'react';

export const usePlaybackControl = (events, totalDuration, isEditMode) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackStartTime, setPlaybackStartTime] = useState(null);
  const [playbackStartRealTime, setPlaybackStartRealTime] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Update playback start time when events change
  useEffect(() => {
    if (events.length > 0 && !isEditMode) {
      const currentEventTime = currentIndex > 0 ? events[currentIndex - 1].time : 0;
      setPlaybackStartTime(currentEventTime);
      setPlaybackStartRealTime(Date.now());
      setCurrentTime(currentEventTime);
      
      if (totalDuration > 0) {
        setProgressPercent((currentEventTime / totalDuration) * 100);
      }
    }
  }, [currentIndex, events, totalDuration, isEditMode]);

  // Smooth time progression effect
  useEffect(() => {
    if (!isPlaying || isEditMode || isDragging) return;
    
    const interval = setInterval(() => {
      if (playbackStartTime !== null && playbackStartRealTime !== null) {
        const elapsed = (Date.now() - playbackStartRealTime) * playbackSpeed;
        const newCurrentTime = Math.min(playbackStartTime + elapsed, totalDuration);
        
        setCurrentTime(newCurrentTime);
        
        if (totalDuration > 0) {
          setProgressPercent((newCurrentTime / totalDuration) * 100);
        }
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [isPlaying, isEditMode, isDragging, playbackStartTime, playbackStartRealTime, playbackSpeed, totalDuration]);

  const handlePlay = () => {
    if (isEditMode) return;
    
    if (currentIndex >= events.length) {
      setCurrentIndex(0);
      setPlaybackStartTime(0);
      setCurrentTime(0);
    } else {
      setPlaybackStartTime(currentTime);
    }
    
    setPlaybackStartRealTime(Date.now());
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (timer) clearTimeout(timer);
  };

  const skipToPercent = (percent) => {
    if (events.length === 0) return;
    
    const wasPlaying = isPlaying;
    const targetTime = (percent / 100) * totalDuration;
    
    let targetIndex = 0;
    for (let i = 0; i < events.length; i++) {
      if (events[i].time <= targetTime) {
        targetIndex = i + 1;
      } else {
        break;
      }
    }
    
    setIsPlaying(false);
    if (timer) clearTimeout(timer);
    
    setCurrentIndex(targetIndex);
    setCurrentTime(targetTime);
    setPlaybackStartTime(targetTime);
    setPlaybackStartRealTime(Date.now());
    
    if (wasPlaying && !isDragging) {
      setTimeout(() => setIsPlaying(true), 100);
    }
    
    return targetIndex;
  };

  const skipForward = (skipAmount = 5000) => {
    if (isEditMode || events.length === 0) return;
    
    const newTime = Math.min(currentTime + skipAmount, totalDuration);
    const newPercent = (newTime / totalDuration) * 100;
    skipToPercent(newPercent);
  };

  const skipBackward = (skipAmount = 5000) => {
    if (isEditMode || events.length === 0) return;
    
    const newTime = Math.max(currentTime - skipAmount, 0);
    const newPercent = (newTime / totalDuration) * 100;
    skipToPercent(newPercent);
  };

  const reset = () => {
    setIsPlaying(false);
    if (timer) clearTimeout(timer);
    setCurrentIndex(0);
    setCurrentTime(0);
    setPlaybackStartTime(0);
    setPlaybackStartRealTime(null);
    setProgressPercent(0);
  };

  return {
    currentIndex,
    setCurrentIndex,
    isPlaying,
    setIsPlaying,
    timer,
    setTimer,
    playbackSpeed,
    setPlaybackSpeed,
    currentTime,
    progressPercent,
    isDragging,
    setIsDragging,
    handlePlay,
    handlePause,
    skipToPercent,
    skipForward,
    skipBackward,
    reset
  };
};