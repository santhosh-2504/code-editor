import { useState } from 'react';

export const PlayerControls = ({ 
  isEditMode, 
  isPlaying,
  // editModeEntryIndex,
  handlePlay, 
  handlePause, 
  handleReset, 
  continuePlayback, 
  zoomIn, 
  zoomOut, 
  audioEnabled, 
  setAudioEnabled,
  playbackSpeed,
  setPlaybackSpeed,
  getSkipAmountDisplay
}) => {
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      {/* Main Control Row */}
      <div className="flex items-center justify-between">
        {/* Left Controls */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={handlePlayPause} 
            disabled={isEditMode}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
              isEditMode 
                ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <button 
            onClick={handleReset} 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
            </svg>
          </button>
        </div>

        {/* Center Controls */}
        <div className="flex items-center space-x-2">
          {isEditMode && (
            <button 
              onClick={continuePlayback} 
              className="flex items-center px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>  Continue
              {/* from {editModeEntryIndex} */}
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={zoomOut} 
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
          
          <button 
            onClick={zoomIn} 
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          
          {/* Speed Control */}
          <div className="relative">
            <button
              onClick={() => setShowSpeedOptions(!showSpeedOptions)}
              className="flex items-center justify-center px-2 py-1 h-9 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200 text-sm min-w-12"
            >
              <span className="mr-1">{playbackSpeed}x</span>
              <svg 
                className={`w-3 h-3 transition-transform duration-200 ${showSpeedOptions ? 'rotate-180' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M7 14l5-5 5 5z"/>
              </svg>
            </button>
            
            {showSpeedOptions && (
              <div className="absolute bottom-full left-0 mb-1 bg-gray-800 rounded-md shadow-lg border border-gray-600 z-10 min-w-full">
                {speedOptions.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      setPlaybackSpeed(speed);
                      setShowSpeedOptions(false);
                    }}
                    className={`block w-full px-3 py-1 text-sm text-center transition-all duration-200 first:rounded-t-md last:rounded-b-md ${
                      playbackSpeed === speed 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setAudioEnabled(!audioEnabled)} 
            className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 ${
              audioEnabled 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
            }`}
          >
            {audioEnabled ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Info Row */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>Skip: {getSkipAmountDisplay()}</span>
        <span className="flex items-center space-x-4">
          <span>⌨️ Space: Play/Pause</span>
          <span>← → Skip</span>
          <span>Click editor to edit</span>
        </span>
      </div>
    </div>
  );
};