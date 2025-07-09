import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';

export const useMonacoEditor = (starterCode, isEditMode, enterEditMode) => {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState(14);
  
  const stateRef = useRef({
    isEditMode,
    enterEditMode,
  });

  useEffect(() => {
    stateRef.current = {
      isEditMode,
      enterEditMode,
    };
  });

  // Setup Monaco Editor
  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = monaco.editor.create(containerRef.current, {
        value: starterCode || "",
        language: "javascript",
        theme: "vs-dark",
        fontSize: fontSize,
        readOnly: !isEditMode,
        minimap: { enabled: false },
        automaticLayout: true,
      });
      
      editorRef.current.onKeyDown(() => {
        if (!stateRef.current.isEditMode) {
          stateRef.current.enterEditMode();
        }
      });
      
      editorRef.current.onMouseDown(() => {
        if (!stateRef.current.isEditMode) {
          setTimeout(() => {
            stateRef.current.enterEditMode();
          }, 100);
        }
      });
    }
    
    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starterCode]);

  // Update editor readonly state
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ readOnly: !isEditMode });
    }
  }, [isEditMode]);

  const zoomIn = () => {
    const newSize = fontSize + 2;
    setFontSize(newSize);
    editorRef.current?.updateOptions({ fontSize: newSize });
  };
  
  const zoomOut = () => {
    const newSize = Math.max(10, fontSize - 2);
    setFontSize(newSize);
    editorRef.current?.updateOptions({ fontSize: newSize });
  };

  const resetEditor = (starterCode) => {
    if (editorRef.current) {
      editorRef.current.setValue(starterCode || "");
    }
  };

  return {
    containerRef,
    editorRef,
    fontSize,
    zoomIn,
    zoomOut,
    resetEditor
  };
};