export const StatusIndicator = ({ 
  isEditMode, 
  editModeEntryIndex, 
  isPlaying, 
  currentIndex, 
  events 
}) => {
  const getModeIndicator = () => {
    if (isEditMode) {
      return (
        <div className="flex items-center space-x-2 text-orange-400">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            Edit Mode Active - Event {editModeEntryIndex} of {events.length}
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-2 text-green-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            Playback Mode - Click editor to edit
          </span>
        </div>
      );
    }
  };

  const getStatusText = () => {
    if (isEditMode) {
      return `Make your changes and test with the Run button`;
    } else if (isPlaying) {
      return `Playing event ${currentIndex + 1} of ${events.length}`;
    } else {
      return `Paused at event ${currentIndex} of ${events.length}`;
    }
  };

  const getProgressBar = () => {
    const progress = events.length > 0 ? (currentIndex / events.length) * 100 : 0;
    return (
      <div className="w-full bg-gray-700 rounded-full h-1 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* Mode and Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {getModeIndicator()}
          <div className="text-gray-400 text-sm">
            {getStatusText()}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>{currentIndex}</span>
          <span>/</span>
          <span>{events.length}</span>
          <span>events</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        {getProgressBar()}
      </div>
    </div>
  );
};