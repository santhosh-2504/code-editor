import { useState } from 'react';

export const useEditMode = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editModeEntryIndex, setEditModeEntryIndex] = useState(0);
  const [userEditedCode, setUserEditedCode] = useState("");

  const enterEditMode = (currentIndex, editorRef) => {
    if (isEditMode) return;

    console.log("Entering edit mode at event:", currentIndex);
    setEditModeEntryIndex(currentIndex);
    setIsEditMode(true);
    setUserEditedCode(editorRef.current.getValue());
    editorRef.current.updateOptions({ readOnly: false });
  };

  const exitEditMode = (editorRef) => {
    setIsEditMode(false);
    setUserEditedCode("");
    editorRef.current.updateOptions({ readOnly: true });
  };

  const continuePlayback = (editorRef, events, starterCode, setInputValue, setOutput, setCurrentIndex, setIsPlaying) => {
    console.log("Continuing playback from event:", editModeEntryIndex);
    
    if (editModeEntryIndex < events.length) {
      const eventAtEntry = editModeEntryIndex > 0 ? events[editModeEntryIndex - 1] : null;
      
      if (eventAtEntry) {
        editorRef.current.setValue(eventAtEntry.code);
        editorRef.current.setPosition({
          lineNumber: eventAtEntry.cursor.line + 1,
          column: eventAtEntry.cursor.ch + 1,
        });
        if (eventAtEntry.input !== undefined) setInputValue(eventAtEntry.input);
        if (eventAtEntry.output !== undefined) setOutput(eventAtEntry.output);
      } else {
        editorRef.current.setValue(starterCode || "");
        setInputValue("");
        setOutput("");
      }
    }
    
    exitEditMode(editorRef);
    setCurrentIndex(editModeEntryIndex);
    
    if (editModeEntryIndex < events.length) {
      setIsPlaying(true);
    }
  };

  const resetEditMode = (editorRef) => {
    if (isEditMode) {
      exitEditMode(editorRef);
    }
    setEditModeEntryIndex(0);
    setUserEditedCode("");
  };

  return {
    isEditMode,
    editModeEntryIndex,
    userEditedCode,
    enterEditMode,
    exitEditMode,
    continuePlayback,
    resetEditMode
  };
};