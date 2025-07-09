import { useEffect } from 'react';

export const ProgressBar = ({ 
  currentTime, 
  totalDuration, 
  progressPercent, 
  isEditMode, 
  isDragging, 
  setIsDragging, 
  skipToPercent 
}) => {
  const formatTime = (timeMs) => {
    const seconds = Math.floor(timeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    if (isEditMode) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = (clickX / rect.width) * 100;
    
    skipToPercent(clickPercent);
  };

  const handleProgressMouseDown = (e) => {
    if (isEditMode) return;
    setIsDragging(true);
    handleProgressClick(e);
  };

  const handleProgressMouseMove = (e) => {
    if (!isDragging || isEditMode) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const clickPercent = (clickX / rect.width) * 100;
    
    skipToPercent(clickPercent);
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners for dragging
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging, setIsDragging]);

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-3">
        <span className="text-sm font-mono text-gray-300 min-w-[45px]">
          {formatTime(currentTime)}
        </span>
        
        <div className="flex-1 group">
          <div 
            className={`relative h-2 bg-gray-700 rounded-full overflow-hidden transition-all duration-200 ${
              isEditMode 
                ? 'cursor-not-allowed opacity-50' 
                : 'cursor-pointer hover:h-3'
            }`}
            onClick={handleProgressClick}
            onMouseDown={handleProgressMouseDown}
            onMouseMove={handleProgressMouseMove}
            onMouseUp={handleProgressMouseUp}
          >
            {/* Progress fill */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-100 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
            
            {/* Buffer/background glow */}
            <div 
              className="absolute top-0 left-0 h-full bg-blue-400 opacity-20 rounded-full"
              style={{ width: `${Math.min(progressPercent + 5, 100)}%` }}
            />
            
            {/* Scrubber handle */}
            <div 
              className={`absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2 -translate-x-2 transition-all duration-200 ${
                isDragging ? 'scale-125' : 'scale-100 group-hover:scale-110'
              }`}
              style={{ left: `${progressPercent}%` }}
            >
              <div className="absolute inset-1 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <span className="text-sm font-mono text-gray-300 min-w-[45px]">
          {formatTime(totalDuration)}
        </span>
      </div>
    </div>
  );
};