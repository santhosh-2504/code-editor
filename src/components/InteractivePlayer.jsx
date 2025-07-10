import { useEffect, useState } from 'react';
import { usePlaybackControl } from '../hooks/usePlaybackControl';
import { useEditMode } from '../hooks/useEditMode';
import { useMonacoEditor } from '../hooks/useMonacoEditor';
import { useAudio } from '../hooks/useAudio';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useCodeRunner } from '../hooks/useCodeRunner';
import { ProgressBar } from './ProgressBar';
import { PlayerControls } from './PlayerControls';
import { CodeIO } from './CodeIO';
import { StatusIndicator } from './StatusIndicator';

export const InteractivePlayer = ({ jsonData }) => {
  const { starterCode, events = [] } = jsonData || {};
  const [totalDuration, setTotalDuration] = useState(0);

  // Initialize hooks
  const editMode = useEditMode();
  const playbackControl = usePlaybackControl(events, totalDuration, editMode.isEditMode);
  const monacoEditor = useMonacoEditor(starterCode, editMode.isEditMode, () =>
    editMode.enterEditMode(playbackControl.currentIndex, monacoEditor.editorRef)
  );
  const audio = useAudio();
  const codeRunner = useCodeRunner();

  const keyboardControls = useKeyboardControls(
    editMode.isEditMode,
    playbackControl.isPlaying,
    playbackControl.handlePlay,
    playbackControl.handlePause,
    playbackControl.skipForward,
    playbackControl.skipBackward
  );

  // Calculate total duration
  useEffect(() => {
    if (events.length > 0) {
      const duration = events[events.length - 1].time;
      setTotalDuration(duration);
    }
  }, [events]);

  // Main playback logic
  useEffect(() => {
    if (!playbackControl.isPlaying || playbackControl.currentIndex >= events.length || editMode.isEditMode) return;

    const nextEvent = events[playbackControl.currentIndex];
    const delay =
      playbackControl.currentIndex === 0
        ? 0
        : (nextEvent.time - events[playbackControl.currentIndex - 1].time) / playbackControl.playbackSpeed;

    const timeout = setTimeout(() => {
      if (nextEvent.type === 'code' || nextEvent.type === 'run') {
        if (nextEvent.code && monacoEditor.editorRef.current.getValue() !== nextEvent.code) {
          audio.playKeystrokeSound();
          monacoEditor.editorRef.current.setValue(nextEvent.code);
        }

        if (nextEvent.cursor) {
          monacoEditor.editorRef.current.setPosition({
            lineNumber: nextEvent.cursor.line + 1,
            column: nextEvent.cursor.ch + 1,
          });

          // 👇 Only auto-scroll if viewer is NOT manually scrolling
          if (!monacoEditor.viewerScrollRef.current) {
            monacoEditor.editorRef.current.revealPositionInCenter(
              monacoEditor.editorRef.current.getPosition()
            );
          }
        }

        if (nextEvent.input !== undefined) codeRunner.setInputValue(nextEvent.input);
        if (nextEvent.output !== undefined) codeRunner.setOutput(nextEvent.output);
      }

      if (nextEvent.type === 'zoom') {
        monacoEditor.editorRef.current.updateOptions({ fontSize: nextEvent.fontSize });
      }

      if (nextEvent.type === 'scroll') {
        monacoEditor.editorRef.current.setScrollTop(nextEvent.scrollTop);
        monacoEditor.editorRef.current.setScrollLeft(nextEvent.scrollLeft);
      }

      playbackControl.setCurrentIndex((i) => i + 1);
    }, delay);

    playbackControl.setTimer(timeout);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    playbackControl.isPlaying,
    playbackControl.currentIndex,
    audio.audioEnabled,
    editMode.isEditMode,
    playbackControl.playbackSpeed,
  ]);

  // Handle progress bar scrubbing
  const handleSkipToPercent = (percent) => {
    const targetIndex = playbackControl.skipToPercent(percent);

    if (targetIndex > 0 && targetIndex <= events.length) {
      const targetEvent = events[targetIndex - 1];

      if (targetEvent.code) {
        monacoEditor.editorRef.current.setValue(targetEvent.code);
      }

      if (targetEvent.cursor) {
        monacoEditor.editorRef.current.setPosition({
          lineNumber: targetEvent.cursor.line + 1,
          column: targetEvent.cursor.ch + 1,
        });

        // 👇 Only auto-scroll if viewer isn’t scrolling manually
        if (!monacoEditor.viewerScrollRef.current) {
          monacoEditor.editorRef.current.revealPositionInCenter(
            monacoEditor.editorRef.current.getPosition()
          );
        }
      }

      if (targetEvent.input !== undefined) codeRunner.setInputValue(targetEvent.input);
      if (targetEvent.output !== undefined) codeRunner.setOutput(targetEvent.output);

      if (targetEvent.type === 'zoom') {
        monacoEditor.editorRef.current.updateOptions({ fontSize: targetEvent.fontSize });
      }

      if (targetEvent.type === 'scroll') {
        monacoEditor.editorRef.current.setScrollTop(targetEvent.scrollTop);
        monacoEditor.editorRef.current.setScrollLeft(targetEvent.scrollLeft);
      }
    } else if (targetIndex === 0) {
      monacoEditor.editorRef.current.setValue(starterCode || '');
      codeRunner.setInputValue('');
      codeRunner.setOutput('');
    }
  };

  const handleReset = () => {
    playbackControl.reset();
    monacoEditor.resetEditor(starterCode);
    codeRunner.resetCodeRunner();
    editMode.resetEditMode(monacoEditor.editorRef);
  };

  const handleContinuePlayback = () => {
    editMode.continuePlayback(
      monacoEditor.editorRef,
      events,
      starterCode,
      codeRunner.setInputValue,
      codeRunner.setOutput,
      playbackControl.setCurrentIndex,
      playbackControl.setIsPlaying
    );
  };

  const handleRunCode = () => {
    codeRunner.runCode(monacoEditor.editorRef.current.getValue());
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            🎥 Interactive Code Player
          </h1>
          <p className="text-gray-400">Modern code learning experience</p>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="grid grid-cols-4 h-[600px]">
            <div className="col-span-3 relative">
              <div className="h-full bg-gray-900" ref={monacoEditor.containerRef}></div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <ProgressBar
                  currentTime={playbackControl.currentTime}
                  totalDuration={totalDuration}
                  progressPercent={playbackControl.progressPercent}
                  isEditMode={editMode.isEditMode}
                  isDragging={playbackControl.isDragging}
                  setIsDragging={playbackControl.setIsDragging}
                  skipToPercent={handleSkipToPercent}
                />

                <PlayerControls
                  isEditMode={editMode.isEditMode}
                  isPlaying={playbackControl.isPlaying}
                  editModeEntryIndex={editMode.editModeEntryIndex}
                  handlePlay={playbackControl.handlePlay}
                  handlePause={playbackControl.handlePause}
                  handleReset={handleReset}
                  continuePlayback={handleContinuePlayback}
                  zoomIn={monacoEditor.zoomIn}
                  zoomOut={monacoEditor.zoomOut}
                  audioEnabled={audio.audioEnabled}
                  setAudioEnabled={audio.setAudioEnabled}
                  playbackSpeed={playbackControl.playbackSpeed}
                  setPlaybackSpeed={playbackControl.setPlaybackSpeed}
                  getSkipAmountDisplay={keyboardControls.getSkipAmountDisplay}
                />
              </div>
            </div>

            <div className="col-span-1 bg-gray-800 border-l border-gray-700 overflow-hidden">
              <CodeIO
                inputValue={codeRunner.inputValue}
                setInputValue={codeRunner.setInputValue}
                output={codeRunner.output}
                runCode={handleRunCode}
              />
            </div>
          </div>

          <div className="bg-gray-800 border-t border-gray-700 p-4">
            <StatusIndicator
              isEditMode={editMode.isEditMode}
              editModeEntryIndex={editMode.editModeEntryIndex}
              isPlaying={playbackControl.isPlaying}
              currentIndex={playbackControl.currentIndex}
              events={events}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
