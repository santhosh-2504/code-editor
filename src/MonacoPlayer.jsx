// import React, { useEffect, useRef, useState } from "react";
// import * as monaco from "monaco-editor";

// export default function MonacoPlayer({ jsonData }) {
//   const containerRef = useRef(null);
//   const editorRef = useRef(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [timer, setTimer] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [output, setOutput] = useState("");
//   const [fontSize, setFontSize] = useState(14);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);



//   const { starterCode, events = [] } = jsonData || {};

//   const zoomIn = () => {
//   const newSize = fontSize + 2;
//   setFontSize(newSize);
//   editorRef.current?.updateOptions({ fontSize: newSize });
// };

// const zoomOut = () => {
//   const newSize = Math.max(10, fontSize - 2);
//   setFontSize(newSize);
//   editorRef.current?.updateOptions({ fontSize: newSize });
// };


//   // Setup Monaco
//   useEffect(() => {
//     if (containerRef.current && !editorRef.current) {
//       editorRef.current = monaco.editor.create(containerRef.current, {
//         value: starterCode || "",
//         language: "javascript",
//         theme: "vs-dark",
//         fontSize: fontSize,
//         readOnly: true,
//         minimap: { enabled: false },
//         automaticLayout: true,
//       });
//     }

//     return () => {
//       if (editorRef.current) {
//         editorRef.current.dispose();
//         editorRef.current = null;
//       }
//     };
//   }, [starterCode]);

//   // Playback logic
//   useEffect(() => {
//     if (!isPlaying || currentIndex >= events.length) return;

//     const nextEvent = events[currentIndex];
//     const delay = currentIndex === 0 ? 0 : (nextEvent.time - events[currentIndex - 1].time) / playbackSpeed;


//     const timeout = setTimeout(() => {
//       editorRef.current.setValue(nextEvent.code);
//       editorRef.current.setPosition({
//         lineNumber: nextEvent.cursor.line + 1,
//         column: nextEvent.cursor.ch + 1,
//       });
//       editorRef.current.revealPositionInCenter(editorRef.current.getPosition());

//       if (nextEvent.input !== undefined) setInputValue(nextEvent.input);
//       if (nextEvent.output !== undefined) setOutput(nextEvent.output);

//       setCurrentIndex((i) => i + 1);
//     }, delay);

//     setTimer(timeout);

//     return () => clearTimeout(timeout);
//   }, [isPlaying, currentIndex]);

//   // Run Code manually
//   const runCode = () => {
//     const code = editorRef.current.getValue();
//     const logs = [];

//     try {
//       const fakeConsole = {
//         log: (...args) => logs.push(args.join(" ")),
//       };
//       const wrapped = new Function("input", "console", code);
//       wrapped(inputValue, fakeConsole);
//     } catch (err) {
//       logs.push("Error: " + err.message);
//     }

//     setOutput(logs.join("\n"));
//   };

//   const handlePlay = () => {
//     if (currentIndex >= events.length) {
//       setCurrentIndex(0);
//     }
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//   };

//   const handleReset = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//     editorRef.current.setValue(starterCode || "");
//     setCurrentIndex(0);
//     setInputValue("");
//     setOutput("");
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🎥 Monaco Lesson Player</h1>

// <div className="mb-4 flex flex-wrap gap-2">
//   <button onClick={handlePlay} className="bg-green-600 px-4 py-2 rounded text-white">▶️ Play</button>
//   <button onClick={handlePause} className="bg-yellow-500 px-4 py-2 rounded text-white">⏸ Pause</button>
//   <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded text-white">🔁 Reset</button>
//   <button onClick={runCode} className="bg-blue-600 px-4 py-2 rounded text-white">⚙️ Run</button>
//   <button onClick={zoomIn} className="bg-gray-700 px-4 py-2 rounded text-white">🔍 Z+</button>
//   <button onClick={zoomOut} className="bg-gray-700 px-4 py-2 rounded text-white">🔎 Z-</button>
// </div>
// <div className="mt-2 text-sm text-gray-600">
//   Current Speed: {playbackSpeed}x
// </div>


// <div className="flex gap-2 mt-2 flex-wrap">
//   {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
//     <button
//       key={speed}
//       onClick={() => setPlaybackSpeed(speed)}
//       className={`px-3 py-1 rounded text-white ${
//         playbackSpeed === speed ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
//       }`}
//     >
//       {speed}x
//     </button>
//   ))}
// </div>



//       <div className="grid grid-cols-4 gap-4">
//         {/* Left 1/4 for input/output */}
//         <div className="col-span-1 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">📝 Input</label>
//             <textarea
//               rows={5}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full p-2 border rounded bg-white text-black"
//               placeholder="Enter input here..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">📤 Output</label>
//             <pre className="w-full min-h-[120px] p-2 bg-black text-green-400 rounded overflow-auto">
//               {output || "// Output will appear here..."}
//             </pre>
//           </div>
//         </div>

//         {/* Right 3/4 for Monaco Editor */}
//         <div className="col-span-3 border rounded overflow-hidden h-[400px] shadow-md" ref={containerRef}></div>
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         {isPlaying ? `Playing event ${currentIndex + 1} / ${events.length}` : "⏸ Paused"}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import * as monaco from "monaco-editor";

// export default function MonacoPlayer({ jsonData }) {
//   const containerRef = useRef(null);
//   const editorRef = useRef(null);
//   const audioRef = useRef(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [timer, setTimer] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [output, setOutput] = useState("");
//   const [fontSize, setFontSize] = useState(14);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [audioEnabled, setAudioEnabled] = useState(true);

//   const { starterCode, events = [] } = jsonData || {};

//   // Initialize audio
//   useEffect(() => {
//     audioRef.current = new Audio("/click-sound.mp3");
//     audioRef.current.preload = "auto";
    
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//     };
//   }, []);

//   const playKeystrokeSound = () => {
//     if (audioEnabled && audioRef.current) {
//       try {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play().catch(e => {
//           console.log("Audio playback failed:", e);
//         });
//       } catch (e) {
//         console.log("Audio error:", e);
//       }
//     }
//   };

//   const zoomIn = () => {
//     const newSize = fontSize + 2;
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };

//   const zoomOut = () => {
//     const newSize = Math.max(10, fontSize - 2);
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };

//   // Setup Monaco
//   useEffect(() => {
//     if (containerRef.current && !editorRef.current) {
//       editorRef.current = monaco.editor.create(containerRef.current, {
//         value: starterCode || "",
//         language: "javascript",
//         theme: "vs-dark",
//         fontSize: fontSize,
//         readOnly: true,
//         minimap: { enabled: false },
//         automaticLayout: true,
//       });
//     }

//     return () => {
//       if (editorRef.current) {
//         editorRef.current.dispose();
//         editorRef.current = null;
//       }
//     };
//   }, [starterCode]);

//   // Playback logic
//   useEffect(() => {
//     if (!isPlaying || currentIndex >= events.length) return;

//     const nextEvent = events[currentIndex];
//     const delay = currentIndex === 0 ? 0 : (nextEvent.time - events[currentIndex - 1].time) / playbackSpeed;

//     const timeout = setTimeout(() => {
//       const previousCode = editorRef.current.getValue();
//       const newCode = nextEvent.code;
      
//       // Check if there's an actual code change (keystroke)
//       if (previousCode !== newCode) {
//         playKeystrokeSound();
//       }
      
//       editorRef.current.setValue(newCode);
//       editorRef.current.setPosition({
//         lineNumber: nextEvent.cursor.line + 1,
//         column: nextEvent.cursor.ch + 1,
//       });
//       editorRef.current.revealPositionInCenter(editorRef.current.getPosition());

//       if (nextEvent.input !== undefined) setInputValue(nextEvent.input);
//       if (nextEvent.output !== undefined) setOutput(nextEvent.output);

//       setCurrentIndex((i) => i + 1);
//     }, delay);

//     setTimer(timeout);

//     return () => clearTimeout(timeout);
//   }, [isPlaying, currentIndex, audioEnabled]);

//   // Run Code manually
//   const runCode = () => {
//     const code = editorRef.current.getValue();
//     const logs = [];

//     try {
//       const fakeConsole = {
//         log: (...args) => logs.push(args.join(" ")),
//       };
//       const wrapped = new Function("input", "console", code);
//       wrapped(inputValue, fakeConsole);
//     } catch (err) {
//       logs.push("Error: " + err.message);
//     }

//     setOutput(logs.join("\n"));
//   };

//   const handlePlay = () => {
//     if (currentIndex >= events.length) {
//       setCurrentIndex(0);
//     }
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//   };

//   const handleReset = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//     editorRef.current.setValue(starterCode || "");
//     setCurrentIndex(0);
//     setInputValue("");
//     setOutput("");
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🎥 Monaco Lesson Player</h1>

//       <div className="mb-4 flex flex-wrap gap-2">
//         <button onClick={handlePlay} className="bg-green-600 px-4 py-2 rounded text-white">▶️ Play</button>
//         <button onClick={handlePause} className="bg-yellow-500 px-4 py-2 rounded text-white">⏸ Pause</button>
//         <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded text-white">🔁 Reset</button>
//         <button onClick={runCode} className="bg-blue-600 px-4 py-2 rounded text-white">⚙️ Run</button>
//         <button onClick={zoomIn} className="bg-gray-700 px-4 py-2 rounded text-white">🔍 Z+</button>
//         <button onClick={zoomOut} className="bg-gray-700 px-4 py-2 rounded text-white">🔎 Z-</button>
//         <button 
//           onClick={() => setAudioEnabled(!audioEnabled)} 
//           className={`px-4 py-2 rounded text-white ${audioEnabled ? 'bg-purple-600' : 'bg-gray-600'}`}
//         >
//           {audioEnabled ? '🔊' : '🔇'} Audio
//         </button>
//       </div>

//       <div className="mt-2 text-sm text-gray-600">
//         Current Speed: {playbackSpeed}x | Audio: {audioEnabled ? 'ON' : 'OFF'}
//       </div>

//       <div className="flex gap-2 mt-2 flex-wrap">
//         {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
//           <button
//             key={speed}
//             onClick={() => setPlaybackSpeed(speed)}
//             className={`px-3 py-1 rounded text-white ${
//               playbackSpeed === speed ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {speed}x
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-4 gap-4">
//         {/* Left 1/4 for input/output */}
//         <div className="col-span-1 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">📝 Input</label>
//             <textarea
//               rows={5}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full p-2 border rounded bg-white text-black"
//               placeholder="Enter input here..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">📤 Output</label>
//             <pre className="w-full min-h-[120px] p-2 bg-black text-green-400 rounded overflow-auto">
//               {output || "// Output will appear here..."}
//             </pre>
//           </div>
//         </div>

//         {/* Right 3/4 for Monaco Editor */}
//         <div className="col-span-3 border rounded overflow-hidden h-[400px] shadow-md" ref={containerRef}></div>
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         {isPlaying ? `Playing event ${currentIndex + 1} / ${events.length}` : "⏸ Paused"}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useRef, useState } from "react";
// import * as monaco from "monaco-editor";

// export default function MonacoPlayer({ jsonData }) {
//   const containerRef = useRef(null);
//   const editorRef = useRef(null);
//   const audioRef = useRef(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [timer, setTimer] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [output, setOutput] = useState("");
//   const [fontSize, setFontSize] = useState(14);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [audioEnabled, setAudioEnabled] = useState(true);
  
//   // New states for edit mode
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [savedPlaybackState, setSavedPlaybackState] = useState(null);
//   const [userEditedCode, setUserEditedCode] = useState("");

//   const { starterCode, events = [] } = jsonData || {};

//   // Initialize audio
//   useEffect(() => {
//     audioRef.current = new Audio("/click-sound.mp3");
//     audioRef.current.preload = "auto";
    
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//     };
//   }, []);

//   const playKeystrokeSound = () => {
//     if (audioEnabled && audioRef.current) {
//       try {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play().catch(e => {
//           console.log("Audio playback failed:", e);
//         });
//       } catch (e) {
//         console.log("Audio error:", e);
//       }
//     }
//   };

//   const zoomIn = () => {
//     const newSize = fontSize + 2;
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };

//   const zoomOut = () => {
//     const newSize = Math.max(10, fontSize - 2);
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };

//   // Setup Monaco
//   useEffect(() => {
//     if (containerRef.current && !editorRef.current) {
//       editorRef.current = monaco.editor.create(containerRef.current, {
//         value: starterCode || "",
//         language: "javascript",
//         theme: "vs-dark",
//         fontSize: fontSize,
//         readOnly: !isEditMode,
//         minimap: { enabled: false },
//         automaticLayout: true,
//       });

//       // Add key down listener to detect user keypresses (not programmatic changes)
//       editorRef.current.onKeyDown((e) => {
//         if (!isEditMode && !isPlaying) {
//           // User pressed a key while in read-only mode and not playing
//           enterEditMode();
//         }
//       });

//       // Add mouse click listener to detect when user tries to edit
//       editorRef.current.onMouseDown((e) => {
//         if (!isEditMode && !isPlaying) {
//           // Small delay to allow click to register, then enter edit mode
//           setTimeout(() => {
//             enterEditMode();
//           }, 100);
//         }
//       });
//     }

//     return () => {
//       if (editorRef.current) {
//         editorRef.current.dispose();
//         editorRef.current = null;
//       }
//     };
//   }, [starterCode]);

//   // Update editor read-only mode when isEditMode changes
//   useEffect(() => {
//     if (editorRef.current) {
//       editorRef.current.updateOptions({ readOnly: !isEditMode });
//     }
//   }, [isEditMode]);

//   // Enter edit mode
//   const enterEditMode = () => {
//     if (isEditMode || isPlaying) return;
    
//     console.log("Entering edit mode");
    
//     // Save current state
//     setSavedPlaybackState({
//       currentIndex,
//       currentCode: editorRef.current.getValue(),
//       currentInput: inputValue,
//       currentOutput: output
//     });
    
//     setIsEditMode(true);
//     setUserEditedCode(editorRef.current.getValue());
    
//     // Update editor to be editable
//     editorRef.current.updateOptions({ readOnly: false });
//   };

//   // Continue playback (exit edit mode)
//   const continuePlayback = () => {
//     if (!savedPlaybackState) return;
    
//     console.log("Continuing playback from index:", savedPlaybackState.currentIndex);
    
//     // Restore the saved state
//     editorRef.current.setValue(savedPlaybackState.currentCode);
//     setInputValue(savedPlaybackState.currentInput);
//     setOutput(savedPlaybackState.currentOutput);
//     setCurrentIndex(savedPlaybackState.currentIndex);
    
//     // Exit edit mode
//     setIsEditMode(false);
//     setSavedPlaybackState(null);
//     setUserEditedCode("");
    
//     // Update editor to be read-only
//     editorRef.current.updateOptions({ readOnly: true });
    
//     // Auto-resume playback
//     if (savedPlaybackState.currentIndex < events.length) {
//       setIsPlaying(true);
//     }
//   };

//   // Playback logic
//   useEffect(() => {
//     if (!isPlaying || currentIndex >= events.length || isEditMode) return;

//     const nextEvent = events[currentIndex];
//     const delay = currentIndex === 0 ? 0 : (nextEvent.time - events[currentIndex - 1].time) / playbackSpeed;

//     const timeout = setTimeout(() => {
//       const previousCode = editorRef.current.getValue();
//       const newCode = nextEvent.code;
      
//       // Check if there's an actual code change (keystroke)
//       if (previousCode !== newCode) {
//         playKeystrokeSound();
//       }
      
//       editorRef.current.setValue(newCode);
//       editorRef.current.setPosition({
//         lineNumber: nextEvent.cursor.line + 1,
//         column: nextEvent.cursor.ch + 1,
//       });
//       editorRef.current.revealPositionInCenter(editorRef.current.getPosition());

//       if (nextEvent.input !== undefined) setInputValue(nextEvent.input);
//       if (nextEvent.output !== undefined) setOutput(nextEvent.output);

//       setCurrentIndex((i) => i + 1);
//     }, delay);

//     setTimer(timeout);

//     return () => clearTimeout(timeout);
//   }, [isPlaying, currentIndex, audioEnabled, isEditMode]);

//   // Run Code manually (works in both modes)
//   const runCode = () => {
//     const code = editorRef.current.getValue();
//     const logs = [];
    
//     // Parse inputs from the input box (same as recorder)
//     const inputs = inputValue.trim() === '' ? [] : inputValue.trim().split(/\s+|\n+/);
//     let inputIndex = 0;

//     try {
//       // Create a fake console and input function
//       const fakeConsole = {
//         log: (...args) => logs.push(args.join(" ")),
//       };

//       // Create input function that returns next input from the array
//       const inputFunction = () => {
//         if (inputIndex >= inputs.length) {
//           throw new Error(`No more inputs available! Expected input #${inputIndex + 1}`);
//         }
//         const value = inputs[inputIndex];
//         inputIndex++;
//         logs.push(`> Input #${inputIndex}: ${value}`);
//         return value;
//       };

//       // Execute the code with our custom input function
//       const wrapped = new Function("input", "console", code);
//       wrapped(inputFunction, fakeConsole);

//       // Check if all inputs were consumed
//       if (inputIndex < inputs.length) {
//         logs.push(`Warning: ${inputs.length - inputIndex} unused inputs: ${inputs.slice(inputIndex).join(', ')}`);
//       }

//     } catch (err) {
//       logs.push("Error: " + err.message);
//     }

//     setOutput(logs.join("\n"));
//   };

//   const handlePlay = () => {
//     if (isEditMode) {
//       // Can't play while in edit mode
//       return;
//     }
    
//     if (currentIndex >= events.length) {
//       setCurrentIndex(0);
//     }
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//   };

//   const handleReset = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//     editorRef.current.setValue(starterCode || "");
//     setCurrentIndex(0);
//     setInputValue("");
//     setOutput("");
    
//     // Exit edit mode if active
//     if (isEditMode) {
//       setIsEditMode(false);
//       setSavedPlaybackState(null);
//       setUserEditedCode("");
//       editorRef.current.updateOptions({ readOnly: true });
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🎥 Interactive Monaco Lesson Player</h1>

//       <div className="mb-4 flex flex-wrap gap-2">
//         <button 
//           onClick={handlePlay} 
//           disabled={isEditMode}
//           className={`px-4 py-2 rounded text-white ${
//             isEditMode ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           ▶️ Play
//         </button>
//         <button onClick={handlePause} className="bg-yellow-500 px-4 py-2 rounded text-white">⏸ Pause</button>
//         <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded text-white">🔁 Reset</button>
//         <button onClick={runCode} className="bg-blue-600 px-4 py-2 rounded text-white">⚙️ Run</button>
        
//         {/* Edit mode specific buttons */}
//         {isEditMode && (
//           <button 
//             onClick={continuePlayback} 
//             className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
//           >
//             🔄 Continue Playback
//           </button>
//         )}
        
//         <button onClick={zoomIn} className="bg-gray-700 px-4 py-2 rounded text-white">🔍 Z+</button>
//         <button onClick={zoomOut} className="bg-gray-700 px-4 py-2 rounded text-white">🔎 Z-</button>
//         <button 
//           onClick={() => setAudioEnabled(!audioEnabled)} 
//           className={`px-4 py-2 rounded text-white ${audioEnabled ? 'bg-purple-600' : 'bg-gray-600'}`}
//         >
//           {audioEnabled ? '🔊' : '🔇'} Audio
//         </button>
//       </div>

//       {/* Mode indicator */}
//       <div className="mb-2 p-2 rounded text-sm font-medium">
//         {isEditMode ? (
//           <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded">
//             ✏️ EDIT MODE - You can modify the code. Click "Continue Playback" to resume lesson.
//           </span>
//         ) : (
//           <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
//             📺 PLAYBACK MODE - Press any key to enter edit mode
//           </span>
//         )}
//       </div>

//       <div className="mt-2 text-sm text-gray-600">
//         Current Speed: {playbackSpeed}x | Audio: {audioEnabled ? 'ON' : 'OFF'}
//       </div>

//       <div className="flex gap-2 mt-2 flex-wrap">
//         {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
//           <button
//             key={speed}
//             onClick={() => setPlaybackSpeed(speed)}
//             className={`px-3 py-1 rounded text-white ${
//               playbackSpeed === speed ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {speed}x
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-4 gap-4">
//         {/* Left 1/4 for input/output */}
//         <div className="col-span-1 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">📝 Input</label>
//             <textarea
//               rows={5}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full p-2 border rounded bg-white text-black"
//               placeholder="Enter inputs separated by spaces or new lines..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">📤 Output</label>
//             <pre className="w-full min-h-[120px] p-2 bg-black text-green-400 rounded overflow-auto">
//               {output || "// Output will appear here..."}
//             </pre>
//           </div>
//         </div>

//         {/* Right 3/4 for Monaco Editor */}
//         <div className="col-span-3 border rounded overflow-hidden h-[400px] shadow-md" ref={containerRef}></div>
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         {isEditMode ? (
//           <span>✏️ Edit Mode Active - Make your changes and test with Run button</span>
//         ) : isPlaying ? (
//           <span>Playing event {currentIndex + 1} / {events.length}</span>
//         ) : (
//           <span>⏸ Paused - Press any key in editor to enter edit mode</span>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useRef, useState } from "react";
// import * as monaco from "monaco-editor";

// export default function MonacoPlayer({ jsonData }) {
//   const containerRef = useRef(null);
//   const editorRef = useRef(null);
//   const audioRef = useRef(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [timer, setTimer] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [output, setOutput] = useState("");
//   const [fontSize, setFontSize] = useState(14);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [audioEnabled, setAudioEnabled] = useState(true);
  
//   // New states for edit mode
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [savedPlaybackState, setSavedPlaybackState] = useState(null);
//   const [userEditedCode, setUserEditedCode] = useState("");

//   const { starterCode, events = [] } = jsonData || {};

//   // Initialize audio
//   useEffect(() => {
//     audioRef.current = new Audio("/click-sound.mp3");
//     audioRef.current.preload = "auto";
    
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//     };
//   }, []);

//   const playKeystrokeSound = () => {
//     if (audioEnabled && audioRef.current) {
//       try {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play().catch(e => {
//           console.log("Audio playback failed:", e);
//         });
//       } catch (e) {
//         console.log("Audio error:", e);
//       }
//     }
//   };

//   const zoomIn = () => {
//     const newSize = fontSize + 2;
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };

//   const zoomOut = () => {
//     const newSize = Math.max(10, fontSize - 2);
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };

//   // Setup Monaco
//   useEffect(() => {
//     if (containerRef.current && !editorRef.current) {
//       editorRef.current = monaco.editor.create(containerRef.current, {
//         value: starterCode || "",
//         language: "javascript",
//         theme: "vs-dark",
//         fontSize: fontSize,
//         readOnly: !isEditMode,
//         minimap: { enabled: false },
//         automaticLayout: true,
//       });

//       // Add key down listener to detect user keypresses (not programmatic changes)
//       editorRef.current.onKeyDown((e) => {
//         if (!isEditMode) {
//           // User pressed a key while in read-only mode
//           enterEditMode();
//         }
//       });

//       // Add mouse click listener to detect when user tries to edit
//       editorRef.current.onMouseDown((e) => {
//         if (!isEditMode) {
//           // Small delay to allow click to register, then enter edit mode
//           setTimeout(() => {
//             enterEditMode();
//           }, 100);
//         }
//       });
//     }

//     return () => {
//       if (editorRef.current) {
//         editorRef.current.dispose();
//         editorRef.current = null;
//       }
//     };
//   }, [starterCode]);

//   // Update editor read-only mode when isEditMode changes
//   useEffect(() => {
//     if (editorRef.current) {
//       editorRef.current.updateOptions({ readOnly: !isEditMode });
//     }
//   }, [isEditMode]);

//   // Enter edit mode
//   const enterEditMode = () => {
//     if (isEditMode) return;
    
//     console.log("Entering edit mode at index:", currentIndex);
    
//     // Pause playback if it's running
//     if (isPlaying) {
//       setIsPlaying(false);
//       if (timer) clearTimeout(timer);
//     }
    
//     // Save current state
//     setSavedPlaybackState({
//       currentIndex: currentIndex,
//       currentCode: editorRef.current.getValue(),
//       currentInput: inputValue,
//       currentOutput: output
//     });
    
//     setIsEditMode(true);
//     setUserEditedCode(editorRef.current.getValue());
    
//     // Update editor to be editable
//     editorRef.current.updateOptions({ readOnly: false });
//   };

//   // Continue playback (exit edit mode)
//   const continuePlayback = () => {
//     if (!savedPlaybackState) return;
    
//     console.log("Continuing playback from index:", savedPlaybackState.currentIndex);
    
//     // Restore the saved state
//     editorRef.current.setValue(savedPlaybackState.currentCode);
//     setInputValue(savedPlaybackState.currentInput);
//     setOutput(savedPlaybackState.currentOutput);
    
//     // Exit edit mode first
//     setIsEditMode(false);
//     setUserEditedCode("");
    
//     // Update editor to be read-only
//     editorRef.current.updateOptions({ readOnly: true });
    
//     // Set the index and start playing from where we left off
//     const resumeIndex = savedPlaybackState.currentIndex;
//     setCurrentIndex(resumeIndex);
//     setSavedPlaybackState(null);
    
//     // Auto-resume playback if there are more events
//     if (resumeIndex < events.length) {
//       setIsPlaying(true);
//     }
//   };

//   // Playback logic
//   useEffect(() => {
//     if (!isPlaying || currentIndex >= events.length || isEditMode) return;

//     const nextEvent = events[currentIndex];
//     const delay = currentIndex === 0 ? 0 : (nextEvent.time - events[currentIndex - 1].time) / playbackSpeed;

//     const timeout = setTimeout(() => {
//       const previousCode = editorRef.current.getValue();
//       const newCode = nextEvent.code;
      
//       // Check if there's an actual code change (keystroke)
//       if (previousCode !== newCode) {
//         playKeystrokeSound();
//       }
      
//       editorRef.current.setValue(newCode);
//       editorRef.current.setPosition({
//         lineNumber: nextEvent.cursor.line + 1,
//         column: nextEvent.cursor.ch + 1,
//       });
//       editorRef.current.revealPositionInCenter(editorRef.current.getPosition());

//       if (nextEvent.input !== undefined) setInputValue(nextEvent.input);
//       if (nextEvent.output !== undefined) setOutput(nextEvent.output);

//       setCurrentIndex((i) => i + 1);
//     }, delay);

//     setTimer(timeout);

//     return () => clearTimeout(timeout);
//   }, [isPlaying, currentIndex, audioEnabled, isEditMode]);

//   // Run Code manually (works in both modes)
//   const runCode = () => {
//     const code = editorRef.current.getValue();
//     const logs = [];
    
//     // Parse inputs from the input box (same as recorder)
//     const inputs = inputValue.trim() === '' ? [] : inputValue.trim().split(/\s+|\n+/);
//     let inputIndex = 0;

//     try {
//       // Create a fake console and input function
//       const fakeConsole = {
//         log: (...args) => logs.push(args.join(" ")),
//       };

//       // Create input function that returns next input from the array
//       const inputFunction = () => {
//         if (inputIndex >= inputs.length) {
//           throw new Error(`No more inputs available! Expected input #${inputIndex + 1}`);
//         }
//         const value = inputs[inputIndex];
//         inputIndex++;
//         logs.push(`> Input #${inputIndex}: ${value}`);
//         return value;
//       };

//       // Execute the code with our custom input function
//       const wrapped = new Function("input", "console", code);
//       wrapped(inputFunction, fakeConsole);

//       // Check if all inputs were consumed
//       if (inputIndex < inputs.length) {
//         logs.push(`Warning: ${inputs.length - inputIndex} unused inputs: ${inputs.slice(inputIndex).join(', ')}`);
//       }

//     } catch (err) {
//       logs.push("Error: " + err.message);
//     }

//     setOutput(logs.join("\n"));
//   };

//   const handlePlay = () => {
//     if (isEditMode) {
//       // Can't play while in edit mode
//       return;
//     }
    
//     if (currentIndex >= events.length) {
//       setCurrentIndex(0);
//     }
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//   };

//   const handleReset = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//     editorRef.current.setValue(starterCode || "");
//     setCurrentIndex(0);
//     setInputValue("");
//     setOutput("");
    
//     // Exit edit mode if active
//     if (isEditMode) {
//       setIsEditMode(false);
//       setSavedPlaybackState(null);
//       setUserEditedCode("");
//       editorRef.current.updateOptions({ readOnly: true });
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🎥 Interactive Monaco Lesson Player</h1>

//       <div className="mb-4 flex flex-wrap gap-2">
//         <button 
//           onClick={handlePlay} 
//           disabled={isEditMode}
//           className={`px-4 py-2 rounded text-white ${
//             isEditMode ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           ▶️ Play
//         </button>
//         <button onClick={handlePause} className="bg-yellow-500 px-4 py-2 rounded text-white">⏸ Pause</button>
//         <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded text-white">🔁 Reset</button>
//         <button onClick={runCode} className="bg-blue-600 px-4 py-2 rounded text-white">⚙️ Run</button>
        
//         {/* Edit mode specific buttons */}
//         {isEditMode && (
//           <button 
//             onClick={continuePlayback} 
//             className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
//           >
//             🔄 Continue Playback
//           </button>
//         )}
        
//         <button onClick={zoomIn} className="bg-gray-700 px-4 py-2 rounded text-white">🔍 Z+</button>
//         <button onClick={zoomOut} className="bg-gray-700 px-4 py-2 rounded text-white">🔎 Z-</button>
//         <button 
//           onClick={() => setAudioEnabled(!audioEnabled)} 
//           className={`px-4 py-2 rounded text-white ${audioEnabled ? 'bg-purple-600' : 'bg-gray-600'}`}
//         >
//           {audioEnabled ? '🔊' : '🔇'} Audio
//         </button>
//       </div>

//       {/* Mode indicator */}
//       <div className="mb-2 p-2 rounded text-sm font-medium">
//         {isEditMode ? (
//           <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded">
//             ✏️ EDIT MODE - You can modify the code. Click "Continue Playback" to resume lesson.
//           </span>
//         ) : (
//           <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
//             📺 PLAYBACK MODE - Press any key to enter edit mode
//           </span>
//         )}
//       </div>

//       <div className="mt-2 text-sm text-gray-600">
//         Current Speed: {playbackSpeed}x | Audio: {audioEnabled ? 'ON' : 'OFF'}
//       </div>

//       <div className="flex gap-2 mt-2 flex-wrap">
//         {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
//           <button
//             key={speed}
//             onClick={() => setPlaybackSpeed(speed)}
//             className={`px-3 py-1 rounded text-white ${
//               playbackSpeed === speed ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {speed}x
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-4 gap-4">
//         {/* Left 1/4 for input/output */}
//         <div className="col-span-1 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">📝 Input</label>
//             <textarea
//               rows={5}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full p-2 border rounded bg-white text-black"
//               placeholder="Enter inputs separated by spaces or new lines..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">📤 Output</label>
//             <pre className="w-full min-h-[120px] p-2 bg-black text-green-400 rounded overflow-auto">
//               {output || "// Output will appear here..."}
//             </pre>
//           </div>
//         </div>

//         {/* Right 3/4 for Monaco Editor */}
//         <div className="col-span-3 border rounded overflow-hidden h-[400px] shadow-md" ref={containerRef}></div>
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         {isEditMode ? (
//           <span>✏️ Edit Mode Active - Make your changes and test with Run button</span>
//         ) : isPlaying ? (
//           <span>Playing event {currentIndex + 1} / {events.length}</span>
//         ) : (
//           <span>⏸ Paused - Press any key in editor to enter edit mode</span>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import * as monaco from "monaco-editor";

// export default function MonacoPlayer({ jsonData }) {
//   const containerRef = useRef(null);
//   const editorRef = useRef(null);
//   const audioRef = useRef(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [timer, setTimer] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [output, setOutput] = useState("");
//   const [fontSize, setFontSize] = useState(14);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [audioEnabled, setAudioEnabled] = useState(true);
  
//   // New states for edit mode
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editModeEntryIndex, setEditModeEntryIndex] = useState(0); // Track where we entered edit mode
//   const [userEditedCode, setUserEditedCode] = useState("");

  
//   const { starterCode, events = [] } = jsonData || {};
  
//   // Initialize audio
//   useEffect(() => {
//     audioRef.current = new Audio("/click-sound.mp3");
//     audioRef.current.preload = "auto";
    
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//     };
//   }, []);
  
//   const playKeystrokeSound = () => {
//     if (audioEnabled && audioRef.current) {
//       try {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play().catch(e => {
//           console.log("Audio playback failed:", e);
//         });
//       } catch (e) {
//         console.log("Audio error:", e);
//       }
//     }
//   };
  
//   const zoomIn = () => {
//     const newSize = fontSize + 2;
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };
  
//   const zoomOut = () => {
//     const newSize = Math.max(10, fontSize - 2);
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };
//   const enterEditMode = () => {
//     if (isEditMode) return;
    
//     console.log("Entering edit mode at event:", currentIndex);
    
//     // Save the current event index where we entered edit mode
//     setEditModeEntryIndex(currentIndex);
    
//     // Pause playback if it's running
//     if (isPlaying) {
//       setIsPlaying(false);
//       if (timer) clearTimeout(timer);
//     }
    
//     setIsEditMode(true);
//     setUserEditedCode(editorRef.current.getValue());
    
//     // Update editor to be editable
//     editorRef.current.updateOptions({ readOnly: false });
//   };
  
//   const stateRef = useRef({
//   currentIndex,
//   isEditMode,
//   enterEditMode,
//   // Add other needed state variables
//   });

//   // Update ref on every render
//   useEffect(() => {
//     stateRef.current = {
//       currentIndex,
//       isEditMode,
//       enterEditMode,
//       // Update other values
//     };
//   });
//   // Setup Monaco
//   useEffect(() => {
//     if (containerRef.current && !editorRef.current) {
//       editorRef.current = monaco.editor.create(containerRef.current, {
//         value: starterCode || "",
//         language: "javascript",
//         theme: "vs-dark",
//         fontSize: fontSize,
//         readOnly: !isEditMode,
//         minimap: { enabled: false },
//         automaticLayout: true,
//       });
      
//       // Add key down listener to detect user keypresses (not programmatic changes)
//       // editorRef.current.onKeyDown((e) => {
//         //   if (!isEditMode) {
//           //     // User pressed a key while in read-only mode
//           //     enterEditMode();
//           //   }
//           // });
          
//           // // Add mouse click listener to detect when user tries to edit
//           // editorRef.current.onMouseDown((e) => {
//             //   if (!isEditMode) {
//               //     // Small delay to allow click to register, then enter edit mode
//               //     setTimeout(() => {
//                 //       enterEditMode();
//                 //     }, 100);
//                 //   }
//                 // });
                
//                 editorRef.current.onKeyDown((e) => {
//                   if (!stateRef.current.isEditMode) {
//                     stateRef.current.enterEditMode();
//                   }
//                 });
                
//                 editorRef.current.onMouseDown((e) => {
//                   if (!stateRef.current.isEditMode) {
//                     setTimeout(() => {
//                       stateRef.current.enterEditMode();
//                     }, 100);
//                   }
//                 });
                
//               }
              
//               return () => {
//                 if (editorRef.current) {
//                   editorRef.current.dispose();
//                   editorRef.current = null;
//                 }
//               };
//             }, [starterCode]);
            
//             // Update editor read-only mode when isEditMode changes
//             useEffect(() => {
//               if (editorRef.current) {
//                 editorRef.current.updateOptions({ readOnly: !isEditMode });
//               }
//             }, [isEditMode]);
            
//             // Enter edit mode
            
//             // Continue playback (exit edit mode)
//             const continuePlayback = () => {
//               console.log("Continuing playback from event:", editModeEntryIndex);
              
//               // If we haven't played all events yet, continue from where we left off
//               if (editModeEntryIndex < events.length) {
//                 // Reset to the state at the time we entered edit mode
//                 const eventAtEntry = editModeEntryIndex > 0 ? events[editModeEntryIndex - 1] : null;
                
//                 if (eventAtEntry) {
//                   // Restore the code state from the last played event
//                   editorRef.current.setValue(eventAtEntry.code);
//                   editorRef.current.setPosition({
//                     lineNumber: eventAtEntry.cursor.line + 1,
//                     column: eventAtEntry.cursor.ch + 1,
//                   });
//                   if (eventAtEntry.input !== undefined) setInputValue(eventAtEntry.input);
//                   if (eventAtEntry.output !== undefined) setOutput(eventAtEntry.output);
//                 } else {
//                   // If we're at the beginning, reset to starter code
//                   editorRef.current.setValue(starterCode || "");
//                   setInputValue("");
//                   setOutput("");
//                 }
//               }
              
//               // Exit edit mode
//               setIsEditMode(false);
//               setUserEditedCode("");
              
//               // Update editor to be read-only
//               editorRef.current.updateOptions({ readOnly: true });
              
//               // Resume playback from the saved index
//               setCurrentIndex(editModeEntryIndex);
              
//               // Auto-resume playback if there are more events
//               if (editModeEntryIndex < events.length) {
//                 setIsPlaying(true);
//               }
//             };
            
//             // Playback logic
//             useEffect(() => {
//               if (!isPlaying || currentIndex >= events.length || isEditMode) return;
              
//     const nextEvent = events[currentIndex];
//     const delay = currentIndex === 0 ? 0 : (nextEvent.time - events[currentIndex - 1].time) / playbackSpeed;

//     const timeout = setTimeout(() => {
//       const previousCode = editorRef.current.getValue();
//       const newCode = nextEvent.code;
      
//       // Check if there's an actual code change (keystroke)
//       if (previousCode !== newCode) {
//         playKeystrokeSound();
//       }
      
//       editorRef.current.setValue(newCode);
//       editorRef.current.setPosition({
//         lineNumber: nextEvent.cursor.line + 1,
//         column: nextEvent.cursor.ch + 1,
//       });
//       editorRef.current.revealPositionInCenter(editorRef.current.getPosition());

//       if (nextEvent.input !== undefined) setInputValue(nextEvent.input);
//       if (nextEvent.output !== undefined) setOutput(nextEvent.output);

//       setCurrentIndex((i) => i + 1);
//     }, delay);

//     setTimer(timeout);

//     return () => clearTimeout(timeout);
//   }, [isPlaying, currentIndex, audioEnabled, isEditMode]);

//   // Run Code manually (works in both modes)
//   const runCode = () => {
//     const code = editorRef.current.getValue();
//     const logs = [];
    
//     // Parse inputs from the input box (same as recorder)
//     const inputs = inputValue.trim() === '' ? [] : inputValue.trim().split(/\s+|\n+/);
//     let inputIndex = 0;

//     try {
//       // Create a fake console and input function
//       const fakeConsole = {
//         log: (...args) => logs.push(args.join(" ")),
//       };

//       // Create input function that returns next input from the array
//       const inputFunction = () => {
//         if (inputIndex >= inputs.length) {
//           throw new Error(`No more inputs available! Expected input #${inputIndex + 1}`);
//         }
//         const value = inputs[inputIndex];
//         inputIndex++;
//         logs.push(`> Input #${inputIndex}: ${value}`);
//         return value;
//       };

//       // Execute the code with our custom input function
//       const wrapped = new Function("input", "console", code);
//       wrapped(inputFunction, fakeConsole);

//       // Check if all inputs were consumed
//       if (inputIndex < inputs.length) {
//         logs.push(`Warning: ${inputs.length - inputIndex} unused inputs: ${inputs.slice(inputIndex).join(', ')}`);
//       }

//     } catch (err) {
//       logs.push("Error: " + err.message);
//     }

//     setOutput(logs.join("\n"));
//   };

//   const handlePlay = () => {
//     if (isEditMode) {
//       // Can't play while in edit mode
//       return;
//     }
    
//     if (currentIndex >= events.length) {
//       setCurrentIndex(0);
//     }
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//   };

//   const handleReset = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//     editorRef.current.setValue(starterCode || "");
//     setCurrentIndex(0);
//     setEditModeEntryIndex(0);
//     setInputValue("");
//     setOutput("");
    
//     // Exit edit mode if active
//     if (isEditMode) {
//       setIsEditMode(false);
//       setUserEditedCode("");
//       editorRef.current.updateOptions({ readOnly: true });
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🎥 Interactive Monaco Lesson Player</h1>

//       <div className="mb-4 flex flex-wrap gap-2">
//         <button 
//           onClick={handlePlay} 
//           disabled={isEditMode}
//           className={`px-4 py-2 rounded text-white ${
//             isEditMode ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           ▶️ Play
//         </button>
//         <button onClick={handlePause} className="bg-yellow-500 px-4 py-2 rounded text-white">⏸ Pause</button>
//         <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded text-white">🔁 Reset</button>
//         <button onClick={runCode} className="bg-blue-600 px-4 py-2 rounded text-white">⚙️ Run</button>
        
//         {/* Edit mode specific buttons */}
//         {isEditMode && (
//           <button 
//             onClick={continuePlayback} 
//             className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
//           >
//             🔄 Continue from Event {editModeEntryIndex}
//           </button>
//         )}
        
//         <button onClick={zoomIn} className="bg-gray-700 px-4 py-2 rounded text-white">🔍 Z+</button>
//         <button onClick={zoomOut} className="bg-gray-700 px-4 py-2 rounded text-white">🔎 Z-</button>
//         <button 
//           onClick={() => setAudioEnabled(!audioEnabled)} 
//           className={`px-4 py-2 rounded text-white ${audioEnabled ? 'bg-purple-600' : 'bg-gray-600'}`}
//         >
//           {audioEnabled ? '🔊' : '🔇'} Audio
//         </button>
//       </div>

//       {/* Mode indicator */}
//       <div className="mb-2 p-2 rounded text-sm font-medium">
//         {isEditMode ? (
//           <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded">
//             ✏️ EDIT MODE - Entered at event {editModeEntryIndex}. Click "Continue from Event {editModeEntryIndex}" to resume lesson.
//           </span>
//         ) : (
//           <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
//             📺 PLAYBACK MODE - Press any key to enter edit mode
//           </span>
//         )}
//       </div>

//       <div className="mt-2 text-sm text-gray-600">
//         Current Speed: {playbackSpeed}x | Audio: {audioEnabled ? 'ON' : 'OFF'}
//       </div>

//       <div className="flex gap-2 mt-2 flex-wrap">
//         {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
//           <button
//             key={speed}
//             onClick={() => setPlaybackSpeed(speed)}
//             className={`px-3 py-1 rounded text-white ${
//               playbackSpeed === speed ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {speed}x
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-4 gap-4">
//         {/* Left 1/4 for input/output */}
//         <div className="col-span-1 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">📝 Input</label>
//             <textarea
//               rows={5}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full p-2 border rounded bg-white text-black"
//               placeholder="Enter inputs separated by spaces or new lines..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">📤 Output</label>
//             <pre className="w-full min-h-[120px] p-2 bg-black text-green-400 rounded overflow-auto">
//               {output || "// Output will appear here..."}
//             </pre>
//           </div>
//         </div>

//         {/* Right 3/4 for Monaco Editor */}
//         <div className="col-span-3 border rounded overflow-hidden h-[400px] shadow-md" ref={containerRef}></div>
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         {isEditMode ? (
//           <span>✏️ Edit Mode Active - Event {editModeEntryIndex} / {events.length} - Make your changes and test with Run button</span>
//         ) : isPlaying ? (
//           <span>Playing event {currentIndex + 1} / {events.length}</span>
//         ) : (
//           <span>⏸ Paused at event {currentIndex} / {events.length} - Press any key in editor to enter edit mode</span>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import * as monaco from "monaco-editor";

// export default function MonacoPlayer({ jsonData }) {
//   const containerRef = useRef(null);
//   const editorRef = useRef(null);
//   const audioRef = useRef(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [timer, setTimer] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [output, setOutput] = useState("");
//   const [fontSize, setFontSize] = useState(14);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [audioEnabled, setAudioEnabled] = useState(true);
  
//   // New states for edit mode
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editModeEntryIndex, setEditModeEntryIndex] = useState(0);
//   const [userEditedCode, setUserEditedCode] = useState("");

//   // Progress bar states
//   const [progressPercent, setProgressPercent] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
  
//   const { starterCode, events = [] } = jsonData || {};
  
//   // Calculate total duration and current time
//   useEffect(() => {
//     if (events.length > 0) {
//       const duration = events[events.length - 1].time;
//       setTotalDuration(duration);
      
//       const currentEventTime = currentIndex > 0 ? events[currentIndex - 1].time : 0;
//       setCurrentTime(currentEventTime);
      
//       if (duration > 0) {
//         setProgressPercent((currentEventTime / duration) * 100);
//       }
//     }
//   }, [currentIndex, events]);
  
//   // Initialize audio
//   useEffect(() => {
//     audioRef.current = new Audio("/click-sound.mp3");
//     audioRef.current.preload = "auto";
    
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//     };
//   }, []);
  
//   const playKeystrokeSound = () => {
//     if (audioEnabled && audioRef.current) {
//       try {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play().catch(e => {
//           console.log("Audio playback failed:", e);
//         });
//       } catch (e) {
//         console.log("Audio error:", e);
//       }
//     }
//   };
  
//   const zoomIn = () => {
//     const newSize = fontSize + 2;
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };
  
//   const zoomOut = () => {
//     const newSize = Math.max(10, fontSize - 2);
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };

//   const enterEditMode = () => {
//     if (isEditMode) return;
    
//     console.log("Entering edit mode at event:", currentIndex);
    
//     setEditModeEntryIndex(currentIndex);
    
//     if (isPlaying) {
//       setIsPlaying(false);
//       if (timer) clearTimeout(timer);
//     }
    
//     setIsEditMode(true);
//     setUserEditedCode(editorRef.current.getValue());
    
//     editorRef.current.updateOptions({ readOnly: false });
//   };
  
//   const stateRef = useRef({
//     currentIndex,
//     isEditMode,
//     enterEditMode,
//   });

//   useEffect(() => {
//     stateRef.current = {
//       currentIndex,
//       isEditMode,
//       enterEditMode,
//     };
//   });

//   // Setup Monaco
//   useEffect(() => {
//     if (containerRef.current && !editorRef.current) {
//       editorRef.current = monaco.editor.create(containerRef.current, {
//         value: starterCode || "",
//         language: "javascript",
//         theme: "vs-dark",
//         fontSize: fontSize,
//         readOnly: !isEditMode,
//         minimap: { enabled: false },
//         automaticLayout: true,
//       });
      
//       editorRef.current.onKeyDown((e) => {
//         if (!stateRef.current.isEditMode) {
//           stateRef.current.enterEditMode();
//         }
//       });
      
//       editorRef.current.onMouseDown((e) => {
//         if (!stateRef.current.isEditMode) {
//           setTimeout(() => {
//             stateRef.current.enterEditMode();
//           }, 100);
//         }
//       });
//     }
    
//     return () => {
//       if (editorRef.current) {
//         editorRef.current.dispose();
//         editorRef.current = null;
//       }
//     };
//   }, [starterCode]);
  
//   useEffect(() => {
//     if (editorRef.current) {
//       editorRef.current.updateOptions({ readOnly: !isEditMode });
//     }
//   }, [isEditMode]);
  
//   const continuePlayback = () => {
//     console.log("Continuing playback from event:", editModeEntryIndex);
    
//     if (editModeEntryIndex < events.length) {
//       const eventAtEntry = editModeEntryIndex > 0 ? events[editModeEntryIndex - 1] : null;
      
//       if (eventAtEntry) {
//         editorRef.current.setValue(eventAtEntry.code);
//         editorRef.current.setPosition({
//           lineNumber: eventAtEntry.cursor.line + 1,
//           column: eventAtEntry.cursor.ch + 1,
//         });
//         if (eventAtEntry.input !== undefined) setInputValue(eventAtEntry.input);
//         if (eventAtEntry.output !== undefined) setOutput(eventAtEntry.output);
//       } else {
//         editorRef.current.setValue(starterCode || "");
//         setInputValue("");
//         setOutput("");
//       }
//     }
    
//     setIsEditMode(false);
//     setUserEditedCode("");
//     editorRef.current.updateOptions({ readOnly: true });
//     setCurrentIndex(editModeEntryIndex);
    
//     if (editModeEntryIndex < events.length) {
//       setIsPlaying(true);
//     }
//   };

//   // Progress bar scrubbing functionality
//   const handleProgressClick = (e) => {
//     if (isEditMode || events.length === 0) return;
    
//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickPercent = (clickX / rect.width) * 100;
    
//     skipToPercent(clickPercent);
//   };

//   const skipToPercent = (percent) => {
//     if (events.length === 0) return;
    
//     const targetTime = (percent / 100) * totalDuration;
    
//     // Find the closest event to the target time
//     let targetIndex = 0;
//     for (let i = 0; i < events.length; i++) {
//       if (events[i].time <= targetTime) {
//         targetIndex = i + 1;
//       } else {
//         break;
//       }
//     }
    
//     // Pause playback
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
    
//     // Update to the target event
//     setCurrentIndex(targetIndex);
    
//     // Apply the state at the target index
//     if (targetIndex > 0 && targetIndex <= events.length) {
//       const targetEvent = events[targetIndex - 1];
//       editorRef.current.setValue(targetEvent.code);
//       editorRef.current.setPosition({
//         lineNumber: targetEvent.cursor.line + 1,
//         column: targetEvent.cursor.ch + 1,
//       });
//       if (targetEvent.input !== undefined) setInputValue(targetEvent.input);
//       if (targetEvent.output !== undefined) setOutput(targetEvent.output);
//     } else if (targetIndex === 0) {
//       editorRef.current.setValue(starterCode || "");
//       setInputValue("");
//       setOutput("");
//     }
//   };

//   const handleProgressMouseDown = (e) => {
//     if (isEditMode) return;
//     setIsDragging(true);
//     handleProgressClick(e);
//   };

//   const handleProgressMouseMove = (e) => {
//     if (!isDragging || isEditMode) return;
    
//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
//     const clickPercent = (clickX / rect.width) * 100;
    
//     skipToPercent(clickPercent);
//   };

//   const handleProgressMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Add global mouse event listeners for dragging
//   useEffect(() => {
//     const handleGlobalMouseUp = () => setIsDragging(false);
    
//     if (isDragging) {
//       document.addEventListener('mouseup', handleGlobalMouseUp);
//       return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
//     }
//   }, [isDragging]);

//   // Format time display
//   const formatTime = (timeMs) => {
//     const seconds = Math.floor(timeMs / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   // Playback logic
//   useEffect(() => {
//     if (!isPlaying || currentIndex >= events.length || isEditMode) return;
    
//     const nextEvent = events[currentIndex];
//     const delay = currentIndex === 0 ? 0 : (nextEvent.time - events[currentIndex - 1].time) / playbackSpeed;

//     const timeout = setTimeout(() => {
//       const previousCode = editorRef.current.getValue();
//       const newCode = nextEvent.code;
      
//       if (previousCode !== newCode) {
//         playKeystrokeSound();
//       }
      
//       editorRef.current.setValue(newCode);
//       editorRef.current.setPosition({
//         lineNumber: nextEvent.cursor.line + 1,
//         column: nextEvent.cursor.ch + 1,
//       });
//       editorRef.current.revealPositionInCenter(editorRef.current.getPosition());

//       if (nextEvent.input !== undefined) setInputValue(nextEvent.input);
//       if (nextEvent.output !== undefined) setOutput(nextEvent.output);

//       setCurrentIndex((i) => i + 1);
//     }, delay);

//     setTimer(timeout);

//     return () => clearTimeout(timeout);
//   }, [isPlaying, currentIndex, audioEnabled, isEditMode, playbackSpeed]);

//   const runCode = () => {
//     const code = editorRef.current.getValue();
//     const logs = [];
    
//     const inputs = inputValue.trim() === '' ? [] : inputValue.trim().split(/\s+|\n+/);
//     let inputIndex = 0;

//     try {
//       const fakeConsole = {
//         log: (...args) => logs.push(args.join(" ")),
//       };

//       const inputFunction = () => {
//         if (inputIndex >= inputs.length) {
//           throw new Error(`No more inputs available! Expected input #${inputIndex + 1}`);
//         }
//         const value = inputs[inputIndex];
//         inputIndex++;
//         logs.push(`> Input #${inputIndex}: ${value}`);
//         return value;
//       };

//       const wrapped = new Function("input", "console", code);
//       wrapped(inputFunction, fakeConsole);

//       if (inputIndex < inputs.length) {
//         logs.push(`Warning: ${inputs.length - inputIndex} unused inputs: ${inputs.slice(inputIndex).join(', ')}`);
//       }

//     } catch (err) {
//       logs.push("Error: " + err.message);
//     }

//     setOutput(logs.join("\n"));
//   };

//   const handlePlay = () => {
//     if (isEditMode) return;
    
//     if (currentIndex >= events.length) {
//       setCurrentIndex(0);
//     }
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//   };

//   const handleReset = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//     editorRef.current.setValue(starterCode || "");
//     setCurrentIndex(0);
//     setEditModeEntryIndex(0);
//     setInputValue("");
//     setOutput("");
    
//     if (isEditMode) {
//       setIsEditMode(false);
//       setUserEditedCode("");
//       editorRef.current.updateOptions({ readOnly: true });
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🎥 Interactive Monaco Lesson Player</h1>

//       <div className="mb-4 flex flex-wrap gap-2">
//         <button 
//           onClick={handlePlay} 
//           disabled={isEditMode}
//           className={`px-4 py-2 rounded text-white ${
//             isEditMode ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           ▶️ Play
//         </button>
//         <button onClick={handlePause} className="bg-yellow-500 px-4 py-2 rounded text-white">⏸ Pause</button>
//         <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded text-white">🔁 Reset</button>
//         <button onClick={runCode} className="bg-blue-600 px-4 py-2 rounded text-white">⚙️ Run</button>
        
//         {isEditMode && (
//           <button 
//             onClick={continuePlayback} 
//             className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
//           >
//             🔄 Continue from Event {editModeEntryIndex}
//           </button>
//         )}
        
//         <button onClick={zoomIn} className="bg-gray-700 px-4 py-2 rounded text-white">🔍 Z+</button>
//         <button onClick={zoomOut} className="bg-gray-700 px-4 py-2 rounded text-white">🔎 Z-</button>
//         <button 
//           onClick={() => setAudioEnabled(!audioEnabled)} 
//           className={`px-4 py-2 rounded text-white ${audioEnabled ? 'bg-purple-600' : 'bg-gray-600'}`}
//         >
//           {audioEnabled ? '🔊' : '🔇'} Audio
//         </button>
//       </div>

//       {/* Progress Bar */}
//       <div className="mb-4">
//         <div className="flex items-center gap-2 mb-2">
//           <span className="text-sm text-gray-600 min-w-[40px]">
//             {formatTime(currentTime)}
//           </span>
//           <div 
//             className={`flex-1 h-2 bg-gray-300 rounded cursor-pointer relative ${
//               isEditMode ? 'cursor-not-allowed opacity-50' : ''
//             }`}
//             onClick={handleProgressClick}
//             onMouseDown={handleProgressMouseDown}
//             onMouseMove={handleProgressMouseMove}
//             onMouseUp={handleProgressMouseUp}
//           >
//             <div 
//               className="h-full bg-blue-600 rounded transition-all duration-75"
//               style={{ width: `${progressPercent}%` }}
//             />
//             {/* Scrubber handle */}
//             <div 
//               className="absolute top-0 w-4 h-4 bg-blue-800 rounded-full transform -translate-y-1 -translate-x-2 shadow-md"
//               style={{ left: `${progressPercent}%` }}
//             />
//           </div>
//           <span className="text-sm text-gray-600 min-w-[40px]">
//             {formatTime(totalDuration)}
//           </span>
//         </div>
//       </div>

//       {/* Mode indicator */}
//       <div className="mb-2 p-2 rounded text-sm font-medium">
//         {isEditMode ? (
//           <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded">
//             ✏️ EDIT MODE - Entered at event {editModeEntryIndex}. Click "Continue from Event {editModeEntryIndex}" to resume lesson.
//           </span>
//         ) : (
//           <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
//             📺 PLAYBACK MODE - Press any key to enter edit mode
//           </span>
//         )}
//       </div>

//       <div className="mt-2 text-sm text-gray-600">
//         Current Speed: {playbackSpeed}x | Audio: {audioEnabled ? 'ON' : 'OFF'}
//       </div>

//       <div className="flex gap-2 mt-2 flex-wrap">
//         {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
//           <button
//             key={speed}
//             onClick={() => setPlaybackSpeed(speed)}
//             className={`px-3 py-1 rounded text-white ${
//               playbackSpeed === speed ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {speed}x
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-4 gap-4 mt-4">
//         <div className="col-span-1 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">📝 Input</label>
//             <textarea
//               rows={5}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full p-2 border rounded bg-white text-black"
//               placeholder="Enter inputs separated by spaces or new lines..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">📤 Output</label>
//             <pre className="w-full min-h-[120px] p-2 bg-black text-green-400 rounded overflow-auto">
//               {output || "// Output will appear here..."}
//             </pre>
//           </div>
//         </div>

//         <div className="col-span-3 border rounded overflow-hidden h-[400px] shadow-md" ref={containerRef}></div>
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         {isEditMode ? (
//           <span>✏️ Edit Mode Active - Event {editModeEntryIndex} / {events.length} - Make your changes and test with Run button</span>
//         ) : isPlaying ? (
//           <span>Playing event {currentIndex + 1} / {events.length}</span>
//         ) : (
//           <span>⏸ Paused at event {currentIndex} / {events.length} - Press any key in editor to enter edit mode</span>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import * as monaco from "monaco-editor";

// export default function MonacoPlayer({ jsonData }) {
//   const containerRef = useRef(null);
//   const editorRef = useRef(null);
//   const audioRef = useRef(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [timer, setTimer] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [output, setOutput] = useState("");
//   const [fontSize, setFontSize] = useState(14);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [audioEnabled, setAudioEnabled] = useState(true);
  
//   // New states for edit mode
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editModeEntryIndex, setEditModeEntryIndex] = useState(0);
//   const [userEditedCode, setUserEditedCode] = useState("");

//   // Progress bar states
//   const [progressPercent, setProgressPercent] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [playbackStartTime, setPlaybackStartTime] = useState(null);
//   const [playbackStartRealTime, setPlaybackStartRealTime] = useState(null);
  
//   const { starterCode, events = [] } = jsonData || {};
  
//   // Calculate total duration and update smooth time progress
//   useEffect(() => {
//     if (events.length > 0) {
//       const duration = events[events.length - 1].time;
//       setTotalDuration(duration);
//     }
//   }, [events]);

//   // Smooth time progression effect
//   useEffect(() => {
//     if (!isPlaying || isEditMode || isDragging) return;
    
//     const interval = setInterval(() => {
//       if (playbackStartTime !== null && playbackStartRealTime !== null) {
//         const elapsed = (Date.now() - playbackStartRealTime) * playbackSpeed;
//         const newCurrentTime = Math.min(playbackStartTime + elapsed, totalDuration);
        
//         setCurrentTime(newCurrentTime);
        
//         if (totalDuration > 0) {
//           setProgressPercent((newCurrentTime / totalDuration) * 100);
//         }
//       }
//     }, 50); // Update every 50ms for smooth animation
    
//     return () => clearInterval(interval);
//   }, [isPlaying, isEditMode, isDragging, playbackStartTime, playbackStartRealTime, playbackSpeed, totalDuration]);

//   // Update playback start time when events change
//   useEffect(() => {
//     if (events.length > 0 && !isEditMode) {
//       const currentEventTime = currentIndex > 0 ? events[currentIndex - 1].time : 0;
//       setPlaybackStartTime(currentEventTime);
//       setPlaybackStartRealTime(Date.now());
//       setCurrentTime(currentEventTime);
      
//       if (totalDuration > 0) {
//         setProgressPercent((currentEventTime / totalDuration) * 100);
//       }
//     }
//   }, [currentIndex, events, totalDuration, isEditMode]);
  
//   // Initialize audio
//   useEffect(() => {
//     audioRef.current = new Audio("/click-sound.mp3");
//     audioRef.current.preload = "auto";
    
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//     };
//   }, []);
  
//   const playKeystrokeSound = () => {
//     if (audioEnabled && audioRef.current) {
//       try {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play().catch(e => {
//           console.log("Audio playback failed:", e);
//         });
//       } catch (e) {
//         console.log("Audio error:", e);
//       }
//     }
//   };
  
//   const zoomIn = () => {
//     const newSize = fontSize + 2;
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };
  
//   const zoomOut = () => {
//     const newSize = Math.max(10, fontSize - 2);
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };

//   const enterEditMode = () => {
//     if (isEditMode) return;
    
//     console.log("Entering edit mode at event:", currentIndex);
    
//     setEditModeEntryIndex(currentIndex);
    
//     if (isPlaying) {
//       setIsPlaying(false);
//       if (timer) clearTimeout(timer);
//     }
    
//     setIsEditMode(true);
//     setUserEditedCode(editorRef.current.getValue());
    
//     editorRef.current.updateOptions({ readOnly: false });
//   };
  
//   const stateRef = useRef({
//     currentIndex,
//     isEditMode,
//     enterEditMode,
//   });

//   useEffect(() => {
//     stateRef.current = {
//       currentIndex,
//       isEditMode,
//       enterEditMode,
//     };
//   });

//   // Setup Monaco
//   useEffect(() => {
//     if (containerRef.current && !editorRef.current) {
//       editorRef.current = monaco.editor.create(containerRef.current, {
//         value: starterCode || "",
//         language: "javascript",
//         theme: "vs-dark",
//         fontSize: fontSize,
//         readOnly: !isEditMode,
//         minimap: { enabled: false },
//         automaticLayout: true,
//       });
      
//       editorRef.current.onKeyDown((e) => {
//         if (!stateRef.current.isEditMode) {
//           stateRef.current.enterEditMode();
//         }
//       });
      
//       editorRef.current.onMouseDown((e) => {
//         if (!stateRef.current.isEditMode) {
//           setTimeout(() => {
//             stateRef.current.enterEditMode();
//           }, 100);
//         }
//       });
//     }
    
//     return () => {
//       if (editorRef.current) {
//         editorRef.current.dispose();
//         editorRef.current = null;
//       }
//     };
//   }, [starterCode]);
  
//   useEffect(() => {
//     if (editorRef.current) {
//       editorRef.current.updateOptions({ readOnly: !isEditMode });
//     }
//   }, [isEditMode]);
  
//   const continuePlayback = () => {
//     console.log("Continuing playback from event:", editModeEntryIndex);
    
//     if (editModeEntryIndex < events.length) {
//       const eventAtEntry = editModeEntryIndex > 0 ? events[editModeEntryIndex - 1] : null;
      
//       if (eventAtEntry) {
//         editorRef.current.setValue(eventAtEntry.code);
//         editorRef.current.setPosition({
//           lineNumber: eventAtEntry.cursor.line + 1,
//           column: eventAtEntry.cursor.ch + 1,
//         });
//         if (eventAtEntry.input !== undefined) setInputValue(eventAtEntry.input);
//         if (eventAtEntry.output !== undefined) setOutput(eventAtEntry.output);
//       } else {
//         editorRef.current.setValue(starterCode || "");
//         setInputValue("");
//         setOutput("");
//       }
//     }
    
//     setIsEditMode(false);
//     setUserEditedCode("");
//     editorRef.current.updateOptions({ readOnly: true });
//     setCurrentIndex(editModeEntryIndex);
    
//     if (editModeEntryIndex < events.length) {
//       setIsPlaying(true);
//     }
//   };

//   // Progress bar scrubbing functionality
//   const handleProgressClick = (e) => {
//     if (isEditMode || events.length === 0) return;
    
//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickPercent = (clickX / rect.width) * 100;
    
//     skipToPercent(clickPercent);
//   };

//   const skipToPercent = (percent) => {
//     if (events.length === 0) return;
    
//     const wasPlaying = isPlaying;  // Remember if we were playing
    
//     const targetTime = (percent / 100) * totalDuration;
    
//     // Find the closest event to the target time
//     let targetIndex = 0;
//     for (let i = 0; i < events.length; i++) {
//       if (events[i].time <= targetTime) {
//         targetIndex = i + 1;
//       } else {
//         break;
//       }
//     }
    
//     // Pause playback temporarily
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
    
//     // Update to the target event
//     setCurrentIndex(targetIndex);
    
//     // Update time tracking
//     setCurrentTime(targetTime);
//     setPlaybackStartTime(targetTime);
//     setPlaybackStartRealTime(Date.now());
    
//     // Apply the state at the target index
//     if (targetIndex > 0 && targetIndex <= events.length) {
//       const targetEvent = events[targetIndex - 1];
//       editorRef.current.setValue(targetEvent.code);
//       editorRef.current.setPosition({
//         lineNumber: targetEvent.cursor.line + 1,
//         column: targetEvent.cursor.ch + 1,
//       });
//       if (targetEvent.input !== undefined) setInputValue(targetEvent.input);
//       if (targetEvent.output !== undefined) setOutput(targetEvent.output);
//     } else if (targetIndex === 0) {
//       editorRef.current.setValue(starterCode || "");
//       setInputValue("");
//       setOutput("");
//     }
    
//     // Resume playback if we were playing before
//     if (wasPlaying && !isDragging) {
//       setTimeout(() => setIsPlaying(true), 100);
//     }
//   };

//   const handleProgressMouseDown = (e) => {
//     if (isEditMode) return;
//     setIsDragging(true);
//     handleProgressClick(e);
//   };

//   const handleProgressMouseMove = (e) => {
//     if (!isDragging || isEditMode) return;
    
//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
//     const clickPercent = (clickX / rect.width) * 100;
    
//     skipToPercent(clickPercent);
//   };

//   const handleProgressMouseUp = () => {
//     const wasPlaying = isPlaying;
//     setIsDragging(false);
    
//     // Resume playback if we were playing when dragging started
//     if (wasPlaying) {
//       setTimeout(() => setIsPlaying(true), 100);
//     }
//   };

//   // Add global mouse event listeners for dragging
//   useEffect(() => {
//     const handleGlobalMouseUp = () => setIsDragging(false);
    
//     if (isDragging) {
//       document.addEventListener('mouseup', handleGlobalMouseUp);
//       return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
//     }
//   }, [isDragging]);

//   // Format time display
//   const formatTime = (timeMs) => {
//     const seconds = Math.floor(timeMs / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   // Playback logic
//   useEffect(() => {
//     if (!isPlaying || currentIndex >= events.length || isEditMode) return;
    
//     const nextEvent = events[currentIndex];
//     const delay = currentIndex === 0 ? 0 : (nextEvent.time - events[currentIndex - 1].time) / playbackSpeed;

//     const timeout = setTimeout(() => {
//       const previousCode = editorRef.current.getValue();
//       const newCode = nextEvent.code;
      
//       if (previousCode !== newCode) {
//         playKeystrokeSound();
//       }
      
//       editorRef.current.setValue(newCode);
//       editorRef.current.setPosition({
//         lineNumber: nextEvent.cursor.line + 1,
//         column: nextEvent.cursor.ch + 1,
//       });
//       editorRef.current.revealPositionInCenter(editorRef.current.getPosition());

//       if (nextEvent.input !== undefined) setInputValue(nextEvent.input);
//       if (nextEvent.output !== undefined) setOutput(nextEvent.output);

//       setCurrentIndex((i) => i + 1);
//     }, delay);

//     setTimer(timeout);

//     return () => clearTimeout(timeout);
//   }, [isPlaying, currentIndex, audioEnabled, isEditMode, playbackSpeed]);

//   const runCode = () => {
//     const code = editorRef.current.getValue();
//     const logs = [];
    
//     const inputs = inputValue.trim() === '' ? [] : inputValue.trim().split(/\s+|\n+/);
//     let inputIndex = 0;

//     try {
//       const fakeConsole = {
//         log: (...args) => logs.push(args.join(" ")),
//       };

//       const inputFunction = () => {
//         if (inputIndex >= inputs.length) {
//           throw new Error(`No more inputs available! Expected input #${inputIndex + 1}`);
//         }
//         const value = inputs[inputIndex];
//         inputIndex++;
//         logs.push(`> Input #${inputIndex}: ${value}`);
//         return value;
//       };

//       const wrapped = new Function("input", "console", code);
//       wrapped(inputFunction, fakeConsole);

//       if (inputIndex < inputs.length) {
//         logs.push(`Warning: ${inputs.length - inputIndex} unused inputs: ${inputs.slice(inputIndex).join(', ')}`);
//       }

//     } catch (err) {
//       logs.push("Error: " + err.message);
//     }

//     setOutput(logs.join("\n"));
//   };

//   const handlePlay = () => {
//     if (isEditMode) return;
    
//     if (currentIndex >= events.length) {
//       setCurrentIndex(0);
//       setPlaybackStartTime(0);
//       setCurrentTime(0);
//     } else {
//       // Update playback start time for smooth progress
//       setPlaybackStartTime(currentTime);
//     }
    
//     setPlaybackStartRealTime(Date.now());
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//   };

//   const handleReset = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//     editorRef.current.setValue(starterCode || "");
//     setCurrentIndex(0);
//     setEditModeEntryIndex(0);
//     setInputValue("");
//     setOutput("");
//     setCurrentTime(0);
//     setPlaybackStartTime(0);
//     setPlaybackStartRealTime(null);
//     setProgressPercent(0);
    
//     if (isEditMode) {
//       setIsEditMode(false);
//       setUserEditedCode("");
//       editorRef.current.updateOptions({ readOnly: true });
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🎥 Interactive Monaco Lesson Player</h1>

//       <div className="mb-4 flex flex-wrap gap-2">
//         <button 
//           onClick={handlePlay} 
//           disabled={isEditMode}
//           className={`px-4 py-2 rounded text-white ${
//             isEditMode ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           ▶️ Play
//         </button>
//         <button onClick={handlePause} className="bg-yellow-500 px-4 py-2 rounded text-white">⏸ Pause</button>
//         <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded text-white">🔁 Reset</button>
//         <button onClick={runCode} className="bg-blue-600 px-4 py-2 rounded text-white">⚙️ Run</button>
        
//         {isEditMode && (
//           <button 
//             onClick={continuePlayback} 
//             className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
//           >
//             🔄 Continue from Event {editModeEntryIndex}
//           </button>
//         )}
        
//         <button onClick={zoomIn} className="bg-gray-700 px-4 py-2 rounded text-white">🔍 Z+</button>
//         <button onClick={zoomOut} className="bg-gray-700 px-4 py-2 rounded text-white">🔎 Z-</button>
//         <button 
//           onClick={() => setAudioEnabled(!audioEnabled)} 
//           className={`px-4 py-2 rounded text-white ${audioEnabled ? 'bg-purple-600' : 'bg-gray-600'}`}
//         >
//           {audioEnabled ? '🔊' : '🔇'} Audio
//         </button>
//       </div>

//       {/* Progress Bar */}
//       <div className="mb-4">
//         <div className="flex items-center gap-2 mb-2">
//           <span className="text-sm text-gray-600 min-w-[40px]">
//             {formatTime(currentTime)}
//           </span>
//           <div 
//             className={`flex-1 h-2 bg-gray-300 rounded cursor-pointer relative ${
//               isEditMode ? 'cursor-not-allowed opacity-50' : ''
//             }`}
//             onClick={handleProgressClick}
//             onMouseDown={handleProgressMouseDown}
//             onMouseMove={handleProgressMouseMove}
//             onMouseUp={handleProgressMouseUp}
//           >
//             <div 
//               className="h-full bg-blue-600 rounded transition-all duration-75"
//               style={{ width: `${progressPercent}%` }}
//             />
//             {/* Scrubber handle */}
//             <div 
//               className="absolute top-0 w-4 h-4 bg-blue-800 rounded-full transform -translate-y-1 -translate-x-2 shadow-md"
//               style={{ left: `${progressPercent}%` }}
//             />
//           </div>
//           <span className="text-sm text-gray-600 min-w-[40px]">
//             {formatTime(totalDuration)}
//           </span>
//         </div>
//       </div>

//       {/* Mode indicator */}
//       <div className="mb-2 p-2 rounded text-sm font-medium">
//         {isEditMode ? (
//           <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded">
//             ✏️ EDIT MODE - Entered at event {editModeEntryIndex}. Click "Continue from Event {editModeEntryIndex}" to resume lesson.
//           </span>
//         ) : (
//           <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
//             📺 PLAYBACK MODE - Press any key to enter edit mode
//           </span>
//         )}
//       </div>

//       <div className="mt-2 text-sm text-gray-600">
//         Current Speed: {playbackSpeed}x | Audio: {audioEnabled ? 'ON' : 'OFF'}
//       </div>

//       <div className="flex gap-2 mt-2 flex-wrap">
//         {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
//           <button
//             key={speed}
//             onClick={() => setPlaybackSpeed(speed)}
//             className={`px-3 py-1 rounded text-white ${
//               playbackSpeed === speed ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {speed}x
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-4 gap-4 mt-4">
//         <div className="col-span-1 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">📝 Input</label>
//             <textarea
//               rows={5}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full p-2 border rounded bg-white text-black"
//               placeholder="Enter inputs separated by spaces or new lines..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">📤 Output</label>
//             <pre className="w-full min-h-[120px] p-2 bg-black text-green-400 rounded overflow-auto">
//               {output || "// Output will appear here..."}
//             </pre>
//           </div>
//         </div>

//         <div className="col-span-3 border rounded overflow-hidden h-[400px] shadow-md" ref={containerRef}></div>
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         {isEditMode ? (
//           <span>✏️ Edit Mode Active - Event {editModeEntryIndex} / {events.length} - Make your changes and test with Run button</span>
//         ) : isPlaying ? (
//           <span>Playing event {currentIndex + 1} / {events.length}</span>
//         ) : (
//           <span>⏸ Paused at event {currentIndex} / {events.length} - Press any key in editor to enter edit mode</span>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import * as monaco from "monaco-editor";

// export default function MonacoPlayer({ jsonData }) {
//   const containerRef = useRef(null);
//   const editorRef = useRef(null);
//   const audioRef = useRef(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [timer, setTimer] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [output, setOutput] = useState("");
//   const [fontSize, setFontSize] = useState(14);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [audioEnabled, setAudioEnabled] = useState(true);
  
//   // New states for edit mode
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editModeEntryIndex, setEditModeEntryIndex] = useState(0);
//   const [userEditedCode, setUserEditedCode] = useState("");

//   // Progress bar states
//   const [progressPercent, setProgressPercent] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [playbackStartTime, setPlaybackStartTime] = useState(null);
//   const [playbackStartRealTime, setPlaybackStartRealTime] = useState(null);

//   const { starterCode, events = [] } = jsonData || {};

//   // Define enterEditMode function
//   const enterEditMode = () => {
//     if (isEditMode) return;

//     console.log("Entering edit mode at event:", currentIndex);

//     setEditModeEntryIndex(currentIndex);

//     if (isPlaying) {
//       setIsPlaying(false);
//       if (timer) clearTimeout(timer);
//     }

//     setIsEditMode(true);
//     setUserEditedCode(editorRef.current.getValue());

//     editorRef.current.updateOptions({ readOnly: false });
//   };
  
//   // Calculate total duration and update smooth time progress
//   useEffect(() => {
//     if (events.length > 0) {
//       const duration = events[events.length - 1].time;
//       setTotalDuration(duration);
//     }
//   }, [events]);

//   // Smooth time progression effect
//   useEffect(() => {
//     if (!isPlaying || isEditMode || isDragging) return;
    
//     const interval = setInterval(() => {
//       if (playbackStartTime !== null && playbackStartRealTime !== null) {
//         const elapsed = (Date.now() - playbackStartRealTime) * playbackSpeed;
//         const newCurrentTime = Math.min(playbackStartTime + elapsed, totalDuration);
        
//         setCurrentTime(newCurrentTime);
        
//         if (totalDuration > 0) {
//           setProgressPercent((newCurrentTime / totalDuration) * 100);
//         }
//       }
//     }, 50); // Update every 50ms for smooth animation
    
//     return () => clearInterval(interval);
//   }, [isPlaying, isEditMode, isDragging, playbackStartTime, playbackStartRealTime, playbackSpeed, totalDuration]);

//   // Update playback start time when events change
//   useEffect(() => {
//     if (events.length > 0 && !isEditMode) {
//       const currentEventTime = currentIndex > 0 ? events[currentIndex - 1].time : 0;
//       setPlaybackStartTime(currentEventTime);
//       setPlaybackStartRealTime(Date.now());
//       setCurrentTime(currentEventTime);
      
//       if (totalDuration > 0) {
//         setProgressPercent((currentEventTime / totalDuration) * 100);
//       }
//     }
//   }, [currentIndex, events, totalDuration, isEditMode]);
  
//   // Initialize audio
//   useEffect(() => {
//     audioRef.current = new Audio("/click-sound.mp3");
//     audioRef.current.preload = "auto";
    
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//     };
//   }, []);
  
//   const playKeystrokeSound = () => {
//     if (audioEnabled && audioRef.current) {
//       try {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play().catch(e => {
//           console.log("Audio playback failed:", e);
//         });
//       } catch (e) {
//         console.log("Audio error:", e);
//       }
//     }
//   };
  
//   const zoomIn = () => {
//     const newSize = fontSize + 2;
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };
  
//   const zoomOut = () => {
//     const newSize = Math.max(10, fontSize - 2);
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };

//   // Amount of time (in ms) to skip forward/backward with keyboard controls
//   const skipAmount = 2000; // 2 seconds

//   // Add keyboard navigation for progress bar
//   const skipForward = () => {
//     if (isEditMode || events.length === 0) return;
    
//     const newTime = Math.min(currentTime + skipAmount, totalDuration);
//     const newPercent = (newTime / totalDuration) * 100;
//     skipToPercent(newPercent);
//   };

//   const skipBackward = () => {
//     if (isEditMode || events.length === 0) return;
    
//     const newTime = Math.max(currentTime - skipAmount, 0);
//     const newPercent = (newTime / totalDuration) * 100;
//     skipToPercent(newPercent);
//   };

//   // Add keyboard event listener for skip controls
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       // Only handle these keys if we're not in edit mode and not typing in any input
//       if (isEditMode || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') return;
      
//       switch(e.key) {
//         case '<':
//         case ',':
//           e.preventDefault();
//           skipBackward();
//           break;
//         case '>':
//         case '.':
//           e.preventDefault();
//           skipForward();
//           break;
//         case ' ':
//           e.preventDefault();
//           if (isPlaying) {
//             handlePause();
//           } else {
//             handlePlay();
//           }
//           break;
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [isEditMode, isPlaying, currentTime, totalDuration, skipAmount]);

//   // Get readable skip amount for display
//   const getSkipAmountDisplay = () => {
//     if (skipAmount >= 1000) {
//       return `${skipAmount / 1000}s`;
//     }
//     return `${skipAmount}ms`;
//   };
  
//   const stateRef = useRef({
//     currentIndex,
//     isEditMode,
//     enterEditMode,
//   });

//   useEffect(() => {
//     stateRef.current = {
//       currentIndex,
//       isEditMode,
//       enterEditMode,
//     };
//   });

//   // Setup Monaco
//   useEffect(() => {
//     if (containerRef.current && !editorRef.current) {
//       editorRef.current = monaco.editor.create(containerRef.current, {
//         value: starterCode || "",
//         language: "javascript",
//         theme: "vs-dark",
//         fontSize: fontSize,
//         readOnly: !isEditMode,
//         minimap: { enabled: false },
//         automaticLayout: true,
//       });
      
//       editorRef.current.onKeyDown((e) => {
//         if (!stateRef.current.isEditMode) {
//           stateRef.current.enterEditMode();
//         }
//       });
      
//       editorRef.current.onMouseDown((e) => {
//         if (!stateRef.current.isEditMode) {
//           setTimeout(() => {
//             stateRef.current.enterEditMode();
//           }, 100);
//         }
//       });
//     }
    
//     return () => {
//       if (editorRef.current) {
//         editorRef.current.dispose();
//         editorRef.current = null;
//       }
//     };
//   }, [starterCode]);
  
//   useEffect(() => {
//     if (editorRef.current) {
//       editorRef.current.updateOptions({ readOnly: !isEditMode });
//     }
//   }, [isEditMode]);
  
//   const continuePlayback = () => {
//     console.log("Continuing playback from event:", editModeEntryIndex);
    
//     if (editModeEntryIndex < events.length) {
//       const eventAtEntry = editModeEntryIndex > 0 ? events[editModeEntryIndex - 1] : null;
      
//       if (eventAtEntry) {
//         editorRef.current.setValue(eventAtEntry.code);
//         editorRef.current.setPosition({
//           lineNumber: eventAtEntry.cursor.line + 1,
//           column: eventAtEntry.cursor.ch + 1,
//         });
//         if (eventAtEntry.input !== undefined) setInputValue(eventAtEntry.input);
//         if (eventAtEntry.output !== undefined) setOutput(eventAtEntry.output);
//       } else {
//         editorRef.current.setValue(starterCode || "");
//         setInputValue("");
//         setOutput("");
//       }
//     }
    
//     setIsEditMode(false);
//     setUserEditedCode("");
//     editorRef.current.updateOptions({ readOnly: true });
//     setCurrentIndex(editModeEntryIndex);
    
//     if (editModeEntryIndex < events.length) {
//       setIsPlaying(true);
//     }
//   };

//   // Progress bar scrubbing functionality
//   const handleProgressClick = (e) => {
//     if (isEditMode || events.length === 0) return;
    
//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickPercent = (clickX / rect.width) * 100;
    
//     skipToPercent(clickPercent);
//   };

//   const skipToPercent = (percent) => {
//     if (events.length === 0) return;
    
//     const wasPlaying = isPlaying;  // Remember if we were playing
    
//     const targetTime = (percent / 100) * totalDuration;
    
//     // Find the closest event to the target time
//     let targetIndex = 0;
//     for (let i = 0; i < events.length; i++) {
//       if (events[i].time <= targetTime) {
//         targetIndex = i + 1;
//       } else {
//         break;
//       }
//     }
    
//     // Pause playback temporarily
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
    
//     // Update to the target event
//     setCurrentIndex(targetIndex);
    
//     // Update time tracking
//     setCurrentTime(targetTime);
//     setPlaybackStartTime(targetTime);
//     setPlaybackStartRealTime(Date.now());
    
//     // Apply the state at the target index
//     if (targetIndex > 0 && targetIndex <= events.length) {
//       const targetEvent = events[targetIndex - 1];
//       editorRef.current.setValue(targetEvent.code);
//       editorRef.current.setPosition({
//         lineNumber: targetEvent.cursor.line + 1,
//         column: targetEvent.cursor.ch + 1,
//       });
//       if (targetEvent.input !== undefined) setInputValue(targetEvent.input);
//       if (targetEvent.output !== undefined) setOutput(targetEvent.output);
//     } else if (targetIndex === 0) {
//       editorRef.current.setValue(starterCode || "");
//       setInputValue("");
//       setOutput("");
//     }
    
//     // Resume playback if we were playing before
//     if (wasPlaying && !isDragging) {
//       setTimeout(() => setIsPlaying(true), 100);
//     }
//   };

//   const handleProgressMouseDown = (e) => {
//     if (isEditMode) return;
//     setIsDragging(true);
//     handleProgressClick(e);
//   };

//   const handleProgressMouseMove = (e) => {
//     if (!isDragging || isEditMode) return;
    
//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
//     const clickPercent = (clickX / rect.width) * 100;
    
//     skipToPercent(clickPercent);
//   };

//   const handleProgressMouseUp = () => {
//     const wasPlaying = isPlaying;
//     setIsDragging(false);
    
//     // Resume playback if we were playing when dragging started
//     if (wasPlaying) {
//       setTimeout(() => setIsPlaying(true), 100);
//     }
//   };

//   // Add global mouse event listeners for dragging
//   useEffect(() => {
//     const handleGlobalMouseUp = () => setIsDragging(false);
    
//     if (isDragging) {
//       document.addEventListener('mouseup', handleGlobalMouseUp);
//       return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
//     }
//   }, [isDragging]);

//   // Format time display
//   const formatTime = (timeMs) => {
//     const seconds = Math.floor(timeMs / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   // Playback logic
//   useEffect(() => {
//     if (!isPlaying || currentIndex >= events.length || isEditMode) return;
    
//     const nextEvent = events[currentIndex];
//     const delay = currentIndex === 0 ? 0 : (nextEvent.time - events[currentIndex - 1].time) / playbackSpeed;

//     const timeout = setTimeout(() => {
//       const previousCode = editorRef.current.getValue();
//       const newCode = nextEvent.code;
      
//       if (previousCode !== newCode) {
//         playKeystrokeSound();
//       }
      
//       editorRef.current.setValue(newCode);
//       editorRef.current.setPosition({
//         lineNumber: nextEvent.cursor.line + 1,
//         column: nextEvent.cursor.ch + 1,
//       });
//       editorRef.current.revealPositionInCenter(editorRef.current.getPosition());

//       if (nextEvent.input !== undefined) setInputValue(nextEvent.input);
//       if (nextEvent.output !== undefined) setOutput(nextEvent.output);

//       setCurrentIndex((i) => i + 1);
//     }, delay);

//     setTimer(timeout);

//     return () => clearTimeout(timeout);
//   }, [isPlaying, currentIndex, audioEnabled, isEditMode, playbackSpeed]);

//   const runCode = () => {
//     const code = editorRef.current.getValue();
//     const logs = [];
    
//     const inputs = inputValue.trim() === '' ? [] : inputValue.trim().split(/\s+|\n+/);
//     let inputIndex = 0;

//     try {
//       const fakeConsole = {
//         log: (...args) => logs.push(args.join(" ")),
//       };

//       const inputFunction = () => {
//         if (inputIndex >= inputs.length) {
//           throw new Error(`No more inputs available! Expected input #${inputIndex + 1}`);
//         }
//         const value = inputs[inputIndex];
//         inputIndex++;
//         logs.push(`> Input #${inputIndex}: ${value}`);
//         return value;
//       };

//       const wrapped = new Function("input", "console", code);
//       wrapped(inputFunction, fakeConsole);

//       if (inputIndex < inputs.length) {
//         logs.push(`Warning: ${inputs.length - inputIndex} unused inputs: ${inputs.slice(inputIndex).join(', ')}`);
//       }

//     } catch (err) {
//       logs.push("Error: " + err.message);
//     }

//     setOutput(logs.join("\n"));
//   };

//   const handlePlay = () => {
//     if (isEditMode) return;
    
//     if (currentIndex >= events.length) {
//       setCurrentIndex(0);
//       setPlaybackStartTime(0);
//       setCurrentTime(0);
//     } else {
//       // Update playback start time for smooth progress
//       setPlaybackStartTime(currentTime);
//     }
    
//     setPlaybackStartRealTime(Date.now());
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//   };

//   const handleReset = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//     editorRef.current.setValue(starterCode || "");
//     setCurrentIndex(0);
//     setEditModeEntryIndex(0);
//     setInputValue("");
//     setOutput("");
//     setCurrentTime(0);
//     setPlaybackStartTime(0);
//     setPlaybackStartRealTime(null);
//     setProgressPercent(0);
    
//     if (isEditMode) {
//       setIsEditMode(false);
//       setUserEditedCode("");
//       editorRef.current.updateOptions({ readOnly: true });
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🎥 Interactive Monaco Lesson Player</h1>

//       <div className="mb-4 flex flex-wrap gap-2">
//         <button 
//           onClick={handlePlay} 
//           disabled={isEditMode}
//           className={`px-4 py-2 rounded text-white ${
//             isEditMode ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           ▶️ Play
//         </button>
//         <button onClick={handlePause} className="bg-yellow-500 px-4 py-2 rounded text-white">⏸ Pause</button>
//         <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded text-white">🔁 Reset</button>
//         <button onClick={runCode} className="bg-blue-600 px-4 py-2 rounded text-white">⚙️ Run</button>
        
//         {isEditMode && (
//           <button 
//             onClick={continuePlayback} 
//             className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
//           >
//             🔄 Continue from Event {editModeEntryIndex}
//           </button>
//         )}
        
//         <button onClick={zoomIn} className="bg-gray-700 px-4 py-2 rounded text-white">🔍 Z+</button>
//         <button onClick={zoomOut} className="bg-gray-700 px-4 py-2 rounded text-white">🔎 Z-</button>
//         <button 
//           onClick={() => setAudioEnabled(!audioEnabled)} 
//           className={`px-4 py-2 rounded text-white ${audioEnabled ? 'bg-purple-600' : 'bg-gray-600'}`}
//         >
//           {audioEnabled ? '🔊' : '🔇'} Audio
//         </button>
//       </div>

//       {/* Progress Bar */}
//       <div className="mb-4">
//         <div className="flex items-center gap-2 mb-2">
//           <span className="text-sm text-gray-600 min-w-[40px]">
//             {formatTime(currentTime)}
//           </span>
//           <div 
//             className={`flex-1 h-2 bg-gray-300 rounded cursor-pointer relative ${
//               isEditMode ? 'cursor-not-allowed opacity-50' : ''
//             }`}
//             onClick={handleProgressClick}
//             onMouseDown={handleProgressMouseDown}
//             onMouseMove={handleProgressMouseMove}
//             onMouseUp={handleProgressMouseUp}
//           >
//             <div 
//               className="h-full bg-blue-600 rounded transition-all duration-75"
//               style={{ width: `${progressPercent}%` }}
//             />
//             {/* Scrubber handle */}
//             <div 
//               className="absolute top-0 w-4 h-4 bg-blue-800 rounded-full transform -translate-y-1 -translate-x-2 shadow-md"
//               style={{ left: `${progressPercent}%` }}
//             />
//           </div>
//           <span className="text-sm text-gray-600 min-w-[40px]">
//             {formatTime(totalDuration)}
//           </span>
//         </div>
//       </div>

//       {/* Mode indicator */}
//       <div className="mb-2 p-2 rounded text-sm font-medium">
//         {isEditMode ? (
//           <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded">
//             ✏️ EDIT MODE - Entered at event {editModeEntryIndex}. Click "Continue from Event {editModeEntryIndex}" to resume lesson.
//           </span>
//         ) : (
//           <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
//             📺 PLAYBACK MODE - Press any key to enter edit mode
//           </span>
//         )}
//       </div>

//       <div className="mt-2 text-sm text-gray-600">
//         Current Speed: {playbackSpeed}x | Audio: {audioEnabled ? 'ON' : 'OFF'} | Skip: {getSkipAmountDisplay()}
//       </div>
      
//       <div className="mt-1 text-xs text-gray-500">
//         <span>
//           ⌨️ Keyboard: Space = Play/Pause, {'<'} or , = Skip back, {'>'} or . = Skip forward
//         </span>
//       </div>

//       <div className="flex gap-2 mt-2 flex-wrap">
//         {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
//           <button
//             key={speed}
//             onClick={() => setPlaybackSpeed(speed)}
//             className={`px-3 py-1 rounded text-white ${
//               playbackSpeed === speed ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {speed}x
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-4 gap-4 mt-4">
//         <div className="col-span-1 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">📝 Input</label>
//             <textarea
//               rows={5}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full p-2 border rounded bg-white text-black"
//               placeholder="Enter inputs separated by spaces or new lines..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">📤 Output</label>
//             <pre className="w-full min-h-[120px] p-2 bg-black text-green-400 rounded overflow-auto">
//               {output || "// Output will appear here..."}
//             </pre>
//           </div>
//         </div>

//         <div className="col-span-3 border rounded overflow-hidden h-[400px] shadow-md" ref={containerRef}></div>
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         {isEditMode ? (
//           <span>✏️ Edit Mode Active - Event {editModeEntryIndex} / {events.length} - Make your changes and test with Run button</span>
//         ) : isPlaying ? (
//           <span>Playing event {currentIndex + 1} / {events.length}</span>
//         ) : (
//           <span>⏸ Paused at event {currentIndex} / {events.length} - Press any key in editor to enter edit mode</span>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useRef, useState } from "react";
// import * as monaco from "monaco-editor";

// export default function MonacoPlayer({ jsonData }) {
//   const containerRef = useRef(null);
//   const editorRef = useRef(null);
//   const audioRef = useRef(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [timer, setTimer] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [output, setOutput] = useState("");
//   const [fontSize, setFontSize] = useState(14);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [audioEnabled, setAudioEnabled] = useState(true);
  
//   // New states for edit mode
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editModeEntryIndex, setEditModeEntryIndex] = useState(0);
//   const [userEditedCode, setUserEditedCode] = useState("");

//   // Progress bar states
//   const [progressPercent, setProgressPercent] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [playbackStartTime, setPlaybackStartTime] = useState(null);
//   const [playbackStartRealTime, setPlaybackStartRealTime] = useState(null);

//   const { starterCode, events = [] } = jsonData || {};

//   // Define enterEditMode function
//   const enterEditMode = () => {
//     if (isEditMode) return;

//     console.log("Entering edit mode at event:", currentIndex);

//     setEditModeEntryIndex(currentIndex);

//     if (isPlaying) {
//       setIsPlaying(false);
//       if (timer) clearTimeout(timer);
//     }

//     setIsEditMode(true);
//     setUserEditedCode(editorRef.current.getValue());

//     editorRef.current.updateOptions({ readOnly: false });
//   };
  
//   // Calculate total duration and update smooth time progress
//   useEffect(() => {
//     if (events.length > 0) {
//       const duration = events[events.length - 1].time;
//       setTotalDuration(duration);
//     }
//   }, [events]);

//   // Smooth time progression effect
//   useEffect(() => {
//     if (!isPlaying || isEditMode || isDragging) return;
    
//     const interval = setInterval(() => {
//       if (playbackStartTime !== null && playbackStartRealTime !== null) {
//         const elapsed = (Date.now() - playbackStartRealTime) * playbackSpeed;
//         const newCurrentTime = Math.min(playbackStartTime + elapsed, totalDuration);
        
//         setCurrentTime(newCurrentTime);
        
//         if (totalDuration > 0) {
//           setProgressPercent((newCurrentTime / totalDuration) * 100);
//         }
//       }
//     }, 50); // Update every 50ms for smooth animation
    
//     return () => clearInterval(interval);
//   }, [isPlaying, isEditMode, isDragging, playbackStartTime, playbackStartRealTime, playbackSpeed, totalDuration]);

//   // Update playback start time when events change
//   useEffect(() => {
//     if (events.length > 0 && !isEditMode) {
//       const currentEventTime = currentIndex > 0 ? events[currentIndex - 1].time : 0;
//       setPlaybackStartTime(currentEventTime);
//       setPlaybackStartRealTime(Date.now());
//       setCurrentTime(currentEventTime);
      
//       if (totalDuration > 0) {
//         setProgressPercent((currentEventTime / totalDuration) * 100);
//       }
//     }
//   }, [currentIndex, events, totalDuration, isEditMode]);
  
//   // Initialize audio
//   useEffect(() => {
//     audioRef.current = new Audio("/click-sound.mp3");
//     audioRef.current.preload = "auto";
    
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//     };
//   }, []);
  
//   const playKeystrokeSound = () => {
//     if (audioEnabled && audioRef.current) {
//       try {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play().catch(e => {
//           console.log("Audio playback failed:", e);
//         });
//       } catch (e) {
//         console.log("Audio error:", e);
//       }
//     }
//   };
  
//   const zoomIn = () => {
//     const newSize = fontSize + 2;
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };
  
//   const zoomOut = () => {
//     const newSize = Math.max(10, fontSize - 2);
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };

//   // Amount of time (in ms) to skip forward/backward with keyboard controls
//   const skipAmount = 5000; // 5 seconds

//   // Add keyboard navigation for progress bar
//   const skipForward = () => {
//     if (isEditMode || events.length === 0) return;
    
//     const newTime = Math.min(currentTime + skipAmount, totalDuration);
//     const newPercent = (newTime / totalDuration) * 100;
//     skipToPercent(newPercent);
//   };

//   const skipBackward = () => {
//     if (isEditMode || events.length === 0) return;
    
//     const newTime = Math.max(currentTime - skipAmount, 0);
//     const newPercent = (newTime / totalDuration) * 100;
//     skipToPercent(newPercent);
//   };

//   // Add keyboard event listener for skip controls
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       // Only handle these keys if we're not in edit mode and not typing in any input
//       if (isEditMode || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') return;
      
//       // Check for shift key combinations for < and >
//       if (e.shiftKey) {
//         switch(e.key) {
//           case '<':
//             e.preventDefault();
//             skipBackward();
//             break;
//           case '>':
//             e.preventDefault();
//             skipForward();
//             break;
//         }
//       } else if (e.key === ' ') {
//         e.preventDefault();
//         if (isPlaying) {
//           handlePause();
//         } else {
//           handlePlay();
//         }
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [isEditMode, isPlaying, currentTime, totalDuration, skipAmount]);

//   // Get readable skip amount for display
//   const getSkipAmountDisplay = () => {
//     if (skipAmount >= 1000) {
//       return `${skipAmount / 1000}s`;
//     }
//     return `${skipAmount}ms`;
//   };
  
//   const stateRef = useRef({
//     currentIndex,
//     isEditMode,
//     enterEditMode,
//   });

//   useEffect(() => {
//     stateRef.current = {
//       currentIndex,
//       isEditMode,
//       enterEditMode,
//     };
//   });

//   // Setup Monaco
//   useEffect(() => {
//     if (containerRef.current && !editorRef.current) {
//       editorRef.current = monaco.editor.create(containerRef.current, {
//         value: starterCode || "",
//         language: "javascript",
//         theme: "vs-dark",
//         fontSize: fontSize,
//         readOnly: !isEditMode,
//         minimap: { enabled: false },
//         automaticLayout: true,
//       });
      
//       editorRef.current.onKeyDown((e) => {
//         if (!stateRef.current.isEditMode) {
//           stateRef.current.enterEditMode();
//         }
//       });
      
//       editorRef.current.onMouseDown((e) => {
//         if (!stateRef.current.isEditMode) {
//           setTimeout(() => {
//             stateRef.current.enterEditMode();
//           }, 100);
//         }
//       });
//     }
    
//     return () => {
//       if (editorRef.current) {
//         editorRef.current.dispose();
//         editorRef.current = null;
//       }
//     };
//   }, [starterCode]);
  
//   useEffect(() => {
//     if (editorRef.current) {
//       editorRef.current.updateOptions({ readOnly: !isEditMode });
//     }
//   }, [isEditMode]);
  
//   const continuePlayback = () => {
//     console.log("Continuing playback from event:", editModeEntryIndex);
    
//     if (editModeEntryIndex < events.length) {
//       const eventAtEntry = editModeEntryIndex > 0 ? events[editModeEntryIndex - 1] : null;
      
//       if (eventAtEntry) {
//         editorRef.current.setValue(eventAtEntry.code);
//         editorRef.current.setPosition({
//           lineNumber: eventAtEntry.cursor.line + 1,
//           column: eventAtEntry.cursor.ch + 1,
//         });
//         if (eventAtEntry.input !== undefined) setInputValue(eventAtEntry.input);
//         if (eventAtEntry.output !== undefined) setOutput(eventAtEntry.output);
//       } else {
//         editorRef.current.setValue(starterCode || "");
//         setInputValue("");
//         setOutput("");
//       }
//     }
    
//     setIsEditMode(false);
//     setUserEditedCode("");
//     editorRef.current.updateOptions({ readOnly: true });
//     setCurrentIndex(editModeEntryIndex);
    
//     if (editModeEntryIndex < events.length) {
//       setIsPlaying(true);
//     }
//   };

//   // Progress bar scrubbing functionality
//   const handleProgressClick = (e) => {
//     if (isEditMode || events.length === 0) return;
    
//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickPercent = (clickX / rect.width) * 100;
    
//     skipToPercent(clickPercent);
//   };

//   const skipToPercent = (percent) => {
//     if (events.length === 0) return;
    
//     const wasPlaying = isPlaying;  // Remember if we were playing
    
//     const targetTime = (percent / 100) * totalDuration;
    
//     // Find the closest event to the target time
//     let targetIndex = 0;
//     for (let i = 0; i < events.length; i++) {
//       if (events[i].time <= targetTime) {
//         targetIndex = i + 1;
//       } else {
//         break;
//       }
//     }
    
//     // Pause playback temporarily
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
    
//     // Update to the target event
//     setCurrentIndex(targetIndex);
    
//     // Update time tracking
//     setCurrentTime(targetTime);
//     setPlaybackStartTime(targetTime);
//     setPlaybackStartRealTime(Date.now());
    
//     // Apply the state at the target index
//     if (targetIndex > 0 && targetIndex <= events.length) {
//       const targetEvent = events[targetIndex - 1];
//       editorRef.current.setValue(targetEvent.code);
//       editorRef.current.setPosition({
//         lineNumber: targetEvent.cursor.line + 1,
//         column: targetEvent.cursor.ch + 1,
//       });
//       if (targetEvent.input !== undefined) setInputValue(targetEvent.input);
//       if (targetEvent.output !== undefined) setOutput(targetEvent.output);
//     } else if (targetIndex === 0) {
//       editorRef.current.setValue(starterCode || "");
//       setInputValue("");
//       setOutput("");
//     }
    
//     // Resume playback if we were playing before
//     if (wasPlaying && !isDragging) {
//       setTimeout(() => setIsPlaying(true), 100);
//     }
//   };

//   const handleProgressMouseDown = (e) => {
//     if (isEditMode) return;
//     setIsDragging(true);
//     handleProgressClick(e);
//   };

//   const handleProgressMouseMove = (e) => {
//     if (!isDragging || isEditMode) return;
    
//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
//     const clickPercent = (clickX / rect.width) * 100;
    
//     skipToPercent(clickPercent);
//   };

//   const handleProgressMouseUp = () => {
//     const wasPlaying = isPlaying;
//     setIsDragging(false);
    
//     // Resume playback if we were playing when dragging started
//     if (wasPlaying) {
//       setTimeout(() => setIsPlaying(true), 100);
//     }
//   };

//   // Add global mouse event listeners for dragging
//   useEffect(() => {
//     const handleGlobalMouseUp = () => setIsDragging(false);
    
//     if (isDragging) {
//       document.addEventListener('mouseup', handleGlobalMouseUp);
//       return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
//     }
//   }, [isDragging]);

//   // Format time display
//   const formatTime = (timeMs) => {
//     const seconds = Math.floor(timeMs / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   // Playback logic
//   useEffect(() => {
//     if (!isPlaying || currentIndex >= events.length || isEditMode) return;
    
//     const nextEvent = events[currentIndex];
//     const delay = currentIndex === 0 ? 0 : (nextEvent.time - events[currentIndex - 1].time) / playbackSpeed;

//     const timeout = setTimeout(() => {
//       const previousCode = editorRef.current.getValue();
//       const newCode = nextEvent.code;
      
//       if (previousCode !== newCode) {
//         playKeystrokeSound();
//       }
      
//       editorRef.current.setValue(newCode);
//       editorRef.current.setPosition({
//         lineNumber: nextEvent.cursor.line + 1,
//         column: nextEvent.cursor.ch + 1,
//       });
//       editorRef.current.revealPositionInCenter(editorRef.current.getPosition());

//       if (nextEvent.input !== undefined) setInputValue(nextEvent.input);
//       if (nextEvent.output !== undefined) setOutput(nextEvent.output);

//       setCurrentIndex((i) => i + 1);
//     }, delay);

//     setTimer(timeout);

//     return () => clearTimeout(timeout);
//   }, [isPlaying, currentIndex, audioEnabled, isEditMode, playbackSpeed]);

//   const runCode = () => {
//     const code = editorRef.current.getValue();
//     const logs = [];
    
//     const inputs = inputValue.trim() === '' ? [] : inputValue.trim().split(/\s+|\n+/);
//     let inputIndex = 0;

//     try {
//       const fakeConsole = {
//         log: (...args) => logs.push(args.join(" ")),
//       };

//       const inputFunction = () => {
//         if (inputIndex >= inputs.length) {
//           throw new Error(`No more inputs available! Expected input #${inputIndex + 1}`);
//         }
//         const value = inputs[inputIndex];
//         inputIndex++;
//         logs.push(`> Input #${inputIndex}: ${value}`);
//         return value;
//       };

//       const wrapped = new Function("input", "console", code);
//       wrapped(inputFunction, fakeConsole);

//       if (inputIndex < inputs.length) {
//         logs.push(`Warning: ${inputs.length - inputIndex} unused inputs: ${inputs.slice(inputIndex).join(', ')}`);
//       }

//     } catch (err) {
//       logs.push("Error: " + err.message);
//     }

//     setOutput(logs.join("\n"));
//   };

//   const handlePlay = () => {
//     if (isEditMode) return;
    
//     if (currentIndex >= events.length) {
//       setCurrentIndex(0);
//       setPlaybackStartTime(0);
//       setCurrentTime(0);
//     } else {
//       // Update playback start time for smooth progress
//       setPlaybackStartTime(currentTime);
//     }
    
//     setPlaybackStartRealTime(Date.now());
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//   };

//   const handleReset = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//     editorRef.current.setValue(starterCode || "");
//     setCurrentIndex(0);
//     setEditModeEntryIndex(0);
//     setInputValue("");
//     setOutput("");
//     setCurrentTime(0);
//     setPlaybackStartTime(0);
//     setPlaybackStartRealTime(null);
//     setProgressPercent(0);
    
//     if (isEditMode) {
//       setIsEditMode(false);
//       setUserEditedCode("");
//       editorRef.current.updateOptions({ readOnly: true });
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🎥 Interactive Monaco Lesson Player</h1>

//       <div className="mb-4 flex flex-wrap gap-2">
//         <button 
//           onClick={handlePlay} 
//           disabled={isEditMode}
//           className={`px-4 py-2 rounded text-white ${
//             isEditMode ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           ▶️ Play
//         </button>
//         <button onClick={handlePause} className="bg-yellow-500 px-4 py-2 rounded text-white">⏸ Pause</button>
//         <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded text-white">🔁 Reset</button>
//         <button onClick={runCode} className="bg-blue-600 px-4 py-2 rounded text-white">⚙️ Run</button>
        
//         {isEditMode && (
//           <button 
//             onClick={continuePlayback} 
//             className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
//           >
//             🔄 Continue from Event {editModeEntryIndex}
//           </button>
//         )}
        
//         <button onClick={zoomIn} className="bg-gray-700 px-4 py-2 rounded text-white">🔍 Z+</button>
//         <button onClick={zoomOut} className="bg-gray-700 px-4 py-2 rounded text-white">🔎 Z-</button>
//         <button 
//           onClick={() => setAudioEnabled(!audioEnabled)} 
//           className={`px-4 py-2 rounded text-white ${audioEnabled ? 'bg-purple-600' : 'bg-gray-600'}`}
//         >
//           {audioEnabled ? '🔊' : '🔇'} Audio
//         </button>
//       </div>

//       {/* Progress Bar */}
//       <div className="mb-4">
//         <div className="flex items-center gap-2 mb-2">
//           <span className="text-sm text-gray-600 min-w-[40px]">
//             {formatTime(currentTime)}
//           </span>
//           <div 
//             className={`flex-1 h-2 bg-gray-300 rounded cursor-pointer relative ${
//               isEditMode ? 'cursor-not-allowed opacity-50' : ''
//             }`}
//             onClick={handleProgressClick}
//             onMouseDown={handleProgressMouseDown}
//             onMouseMove={handleProgressMouseMove}
//             onMouseUp={handleProgressMouseUp}
//           >
//             <div 
//               className="h-full bg-blue-600 rounded transition-all duration-75"
//               style={{ width: `${progressPercent}%` }}
//             />
//             {/* Scrubber handle */}
//             <div 
//               className="absolute top-0 w-4 h-4 bg-blue-800 rounded-full transform -translate-y-1 -translate-x-2 shadow-md"
//               style={{ left: `${progressPercent}%` }}
//             />
//           </div>
//           <span className="text-sm text-gray-600 min-w-[40px]">
//             {formatTime(totalDuration)}
//           </span>
//         </div>
//       </div>

//       {/* Mode indicator */}
//       <div className="mb-2 p-2 rounded text-sm font-medium">
//         {isEditMode ? (
//           <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded">
//             ✏️ EDIT MODE - Entered at event {editModeEntryIndex}. Click "Continue from Event {editModeEntryIndex}" to resume lesson.
//           </span>
//         ) : (
//           <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
//             📺 PLAYBACK MODE - Press any key to enter edit mode
//           </span>
//         )}
//       </div>

//       <div className="mt-2 text-sm text-gray-600">
//         Current Speed: {playbackSpeed}x | Audio: {audioEnabled ? 'ON' : 'OFF'} | Skip: {getSkipAmountDisplay()}
//       </div>
      
//       <div className="mt-1 text-xs text-gray-500">
//         <span>
//           ⌨️ Keyboard: Space = Play/Pause, Shift+{'<'} = Skip back, Shift+{'>'} = Skip forward
//         </span>
//       </div>

//       <div className="flex gap-2 mt-2 flex-wrap">
//         {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
//           <button
//             key={speed}
//             onClick={() => setPlaybackSpeed(speed)}
//             className={`px-3 py-1 rounded text-white ${
//               playbackSpeed === speed ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {speed}x
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-4 gap-4 mt-4">
//         <div className="col-span-1 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">📝 Input</label>
//             <textarea
//               rows={5}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full p-2 border rounded bg-white text-black"
//               placeholder="Enter inputs separated by spaces or new lines..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">📤 Output</label>
//             <pre className="w-full min-h-[120px] p-2 bg-black text-green-400 rounded overflow-auto">
//               {output || "// Output will appear here..."}
//             </pre>
//           </div>
//         </div>

//         <div className="col-span-3 border rounded overflow-hidden h-[400px] shadow-md" ref={containerRef}></div>
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         {isEditMode ? (
//           <span>✏️ Edit Mode Active - Event {editModeEntryIndex} / {events.length} - Make your changes and test with Run button</span>
//         ) : isPlaying ? (
//           <span>Playing event {currentIndex + 1} / {events.length}</span>
//         ) : (
//           <span>⏸ Paused at event {currentIndex} / {events.length} - Press any key in editor to enter edit mode</span>
//         )}
//       </div>
//     </div>
//   );
// }






// import React, { useEffect, useRef, useState } from "react";
// import * as monaco from "monaco-editor";

// export default function MonacoPlayer({ jsonData }) {
//   const containerRef = useRef(null);
//   const editorRef = useRef(null);
//   const audioRef = useRef(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [timer, setTimer] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [output, setOutput] = useState("");
//   const [fontSize, setFontSize] = useState(14);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [audioEnabled, setAudioEnabled] = useState(true);
  
//   // New states for edit mode
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editModeEntryIndex, setEditModeEntryIndex] = useState(0);
//   const [userEditedCode, setUserEditedCode] = useState("");

//   // Progress bar states
//   const [progressPercent, setProgressPercent] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [playbackStartTime, setPlaybackStartTime] = useState(null);
//   const [playbackStartRealTime, setPlaybackStartRealTime] = useState(null);

//   const { starterCode, events = [] } = jsonData || {};

//   // Define enterEditMode function
//   const enterEditMode = () => {
//     if (isEditMode) return;

//     console.log("Entering edit mode at event:", currentIndex);

//     setEditModeEntryIndex(currentIndex);

//     if (isPlaying) {
//       setIsPlaying(false);
//       if (timer) clearTimeout(timer);
//     }

//     setIsEditMode(true);
//     setUserEditedCode(editorRef.current.getValue());

//     editorRef.current.updateOptions({ readOnly: false });
//   };
  
//   // Calculate total duration and update smooth time progress
//   useEffect(() => {
//     if (events.length > 0) {
//       const duration = events[events.length - 1].time;
//       setTotalDuration(duration);
//     }
//   }, [events]);

//   // Smooth time progression effect
//   useEffect(() => {
//     if (!isPlaying || isEditMode || isDragging) return;
    
//     const interval = setInterval(() => {
//       if (playbackStartTime !== null && playbackStartRealTime !== null) {
//         const elapsed = (Date.now() - playbackStartRealTime) * playbackSpeed;
//         const newCurrentTime = Math.min(playbackStartTime + elapsed, totalDuration);
        
//         setCurrentTime(newCurrentTime);
        
//         if (totalDuration > 0) {
//           setProgressPercent((newCurrentTime / totalDuration) * 100);
//         }
//       }
//     }, 50); // Update every 50ms for smooth animation
    
//     return () => clearInterval(interval);
//   }, [isPlaying, isEditMode, isDragging, playbackStartTime, playbackStartRealTime, playbackSpeed, totalDuration]);

//   // Update playback start time when events change
//   useEffect(() => {
//     if (events.length > 0 && !isEditMode) {
//       const currentEventTime = currentIndex > 0 ? events[currentIndex - 1].time : 0;
//       setPlaybackStartTime(currentEventTime);
//       setPlaybackStartRealTime(Date.now());
//       setCurrentTime(currentEventTime);
      
//       if (totalDuration > 0) {
//         setProgressPercent((currentEventTime / totalDuration) * 100);
//       }
//     }
//   }, [currentIndex, events, totalDuration, isEditMode]);
  
//   // Initialize audio
//   useEffect(() => {
//     audioRef.current = new Audio("/click-sound.mp3");
//     audioRef.current.preload = "auto";
    
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//     };
//   }, []);
  
//   const playKeystrokeSound = () => {
//     if (audioEnabled && audioRef.current) {
//       try {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play().catch(e => {
//           console.log("Audio playback failed:", e);
//         });
//       } catch (e) {
//         console.log("Audio error:", e);
//       }
//     }
//   };
  
//   const zoomIn = () => {
//     const newSize = fontSize + 2;
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };
  
//   const zoomOut = () => {
//     const newSize = Math.max(10, fontSize - 2);
//     setFontSize(newSize);
//     editorRef.current?.updateOptions({ fontSize: newSize });
//   };

//   // Amount of time (in ms) to skip forward/backward with keyboard controls
//   const skipAmount = 5000; // 5 seconds

//   // Add keyboard navigation for progress bar
//   const skipForward = () => {
//     if (isEditMode || events.length === 0) return;
    
//     const newTime = Math.min(currentTime + skipAmount, totalDuration);
//     const newPercent = (newTime / totalDuration) * 100;
//     skipToPercent(newPercent);
//   };

//   const skipBackward = () => {
//     if (isEditMode || events.length === 0) return;
    
//     const newTime = Math.max(currentTime - skipAmount, 0);
//     const newPercent = (newTime / totalDuration) * 100;
//     skipToPercent(newPercent);
//   };

//   // Add keyboard event listener for skip controls
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       // Only handle these keys if we're not in edit mode and not typing in any input
//       if (isEditMode || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') return;
      
//       switch(e.key) {
//         case 'ArrowLeft':
//           e.preventDefault();
//           skipBackward();
//           break;
//         case 'ArrowRight':
//           e.preventDefault();
//           skipForward();
//           break;
//         case ' ':
//           e.preventDefault();
//           if (isPlaying) {
//             handlePause();
//           } else {
//             handlePlay();
//           }
//           break;
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [isEditMode, isPlaying, currentTime, totalDuration, skipAmount]);

//   // Get readable skip amount for display
//   const getSkipAmountDisplay = () => {
//     if (skipAmount >= 1000) {
//       return `${skipAmount / 1000}s`;
//     }
//     return `${skipAmount}ms`;
//   };
  
//   const stateRef = useRef({
//     currentIndex,
//     isEditMode,
//     enterEditMode,
//   });

//   useEffect(() => {
//     stateRef.current = {
//       currentIndex,
//       isEditMode,
//       enterEditMode,
//     };
//   });

//   // Setup Monaco
//   useEffect(() => {
//     if (containerRef.current && !editorRef.current) {
//       editorRef.current = monaco.editor.create(containerRef.current, {
//         value: starterCode || "",
//         language: "javascript",
//         theme: "vs-dark",
//         fontSize: fontSize,
//         readOnly: !isEditMode,
//         minimap: { enabled: false },
//         automaticLayout: true,
//       });
      
//       editorRef.current.onKeyDown((e) => {
//         if (!stateRef.current.isEditMode) {
//           stateRef.current.enterEditMode();
//         }
//       });
      
//       editorRef.current.onMouseDown((e) => {
//         if (!stateRef.current.isEditMode) {
//           setTimeout(() => {
//             stateRef.current.enterEditMode();
//           }, 100);
//         }
//       });
//     }
    
//     return () => {
//       if (editorRef.current) {
//         editorRef.current.dispose();
//         editorRef.current = null;
//       }
//     };
//   }, [starterCode]);
  
//   useEffect(() => {
//     if (editorRef.current) {
//       editorRef.current.updateOptions({ readOnly: !isEditMode });
//     }
//   }, [isEditMode]);
  
//   const continuePlayback = () => {
//     console.log("Continuing playback from event:", editModeEntryIndex);
    
//     if (editModeEntryIndex < events.length) {
//       const eventAtEntry = editModeEntryIndex > 0 ? events[editModeEntryIndex - 1] : null;
      
//       if (eventAtEntry) {
//         editorRef.current.setValue(eventAtEntry.code);
//         editorRef.current.setPosition({
//           lineNumber: eventAtEntry.cursor.line + 1,
//           column: eventAtEntry.cursor.ch + 1,
//         });
//         if (eventAtEntry.input !== undefined) setInputValue(eventAtEntry.input);
//         if (eventAtEntry.output !== undefined) setOutput(eventAtEntry.output);
//       } else {
//         editorRef.current.setValue(starterCode || "");
//         setInputValue("");
//         setOutput("");
//       }
//     }
    
//     setIsEditMode(false);
//     setUserEditedCode("");
//     editorRef.current.updateOptions({ readOnly: true });
//     setCurrentIndex(editModeEntryIndex);
    
//     if (editModeEntryIndex < events.length) {
//       setIsPlaying(true);
//     }
//   };

//   // Progress bar scrubbing functionality
//   const handleProgressClick = (e) => {
//     if (isEditMode || events.length === 0) return;
    
//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickPercent = (clickX / rect.width) * 100;
    
//     skipToPercent(clickPercent);
//   };

//   const skipToPercent = (percent) => {
//     if (events.length === 0) return;
    
//     const wasPlaying = isPlaying;  // Remember if we were playing
    
//     const targetTime = (percent / 100) * totalDuration;
    
//     // Find the closest event to the target time
//     let targetIndex = 0;
//     for (let i = 0; i < events.length; i++) {
//       if (events[i].time <= targetTime) {
//         targetIndex = i + 1;
//       } else {
//         break;
//       }
//     }
    
//     // Pause playback temporarily
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
    
//     // Update to the target event
//     setCurrentIndex(targetIndex);
    
//     // Update time tracking
//     setCurrentTime(targetTime);
//     setPlaybackStartTime(targetTime);
//     setPlaybackStartRealTime(Date.now());
    
//     // Apply the state at the target index
//     if (targetIndex > 0 && targetIndex <= events.length) {
//       const targetEvent = events[targetIndex - 1];
//       editorRef.current.setValue(targetEvent.code);
//       editorRef.current.setPosition({
//         lineNumber: targetEvent.cursor.line + 1,
//         column: targetEvent.cursor.ch + 1,
//       });
//       if (targetEvent.input !== undefined) setInputValue(targetEvent.input);
//       if (targetEvent.output !== undefined) setOutput(targetEvent.output);
//     } else if (targetIndex === 0) {
//       editorRef.current.setValue(starterCode || "");
//       setInputValue("");
//       setOutput("");
//     }
    
//     // Resume playback if we were playing before
//     if (wasPlaying && !isDragging) {
//       setTimeout(() => setIsPlaying(true), 100);
//     }
//   };

//   const handleProgressMouseDown = (e) => {
//     if (isEditMode) return;
//     setIsDragging(true);
//     handleProgressClick(e);
//   };

//   const handleProgressMouseMove = (e) => {
//     if (!isDragging || isEditMode) return;
    
//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
//     const clickPercent = (clickX / rect.width) * 100;
    
//     skipToPercent(clickPercent);
//   };

//   const handleProgressMouseUp = () => {
//     const wasPlaying = isPlaying;
//     setIsDragging(false);
    
//     // Resume playback if we were playing when dragging started
//     if (wasPlaying) {
//       setTimeout(() => setIsPlaying(true), 100);
//     }
//   };

//   // Add global mouse event listeners for dragging
//   useEffect(() => {
//     const handleGlobalMouseUp = () => setIsDragging(false);
    
//     if (isDragging) {
//       document.addEventListener('mouseup', handleGlobalMouseUp);
//       return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
//     }
//   }, [isDragging]);

//   // Format time display
//   const formatTime = (timeMs) => {
//     const seconds = Math.floor(timeMs / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   // Playback logic
//   useEffect(() => {
//     if (!isPlaying || currentIndex >= events.length || isEditMode) return;
    
//     const nextEvent = events[currentIndex];
//     const delay = currentIndex === 0 ? 0 : (nextEvent.time - events[currentIndex - 1].time) / playbackSpeed;

//     const timeout = setTimeout(() => {
//       const previousCode = editorRef.current.getValue();
//       const newCode = nextEvent.code;
      
//       if (previousCode !== newCode) {
//         playKeystrokeSound();
//       }
      
//       editorRef.current.setValue(newCode);
//       editorRef.current.setPosition({
//         lineNumber: nextEvent.cursor.line + 1,
//         column: nextEvent.cursor.ch + 1,
//       });
//       editorRef.current.revealPositionInCenter(editorRef.current.getPosition());

//       if (nextEvent.input !== undefined) setInputValue(nextEvent.input);
//       if (nextEvent.output !== undefined) setOutput(nextEvent.output);

//       setCurrentIndex((i) => i + 1);
//     }, delay);

//     setTimer(timeout);

//     return () => clearTimeout(timeout);
//   }, [isPlaying, currentIndex, audioEnabled, isEditMode, playbackSpeed]);

//   const runCode = () => {
//     const code = editorRef.current.getValue();
//     const logs = [];
    
//     const inputs = inputValue.trim() === '' ? [] : inputValue.trim().split(/\s+|\n+/);
//     let inputIndex = 0;

//     try {
//       const fakeConsole = {
//         log: (...args) => logs.push(args.join(" ")),
//       };

//       const inputFunction = () => {
//         if (inputIndex >= inputs.length) {
//           throw new Error(`No more inputs available! Expected input #${inputIndex + 1}`);
//         }
//         const value = inputs[inputIndex];
//         inputIndex++;
//         logs.push(`> Input #${inputIndex}: ${value}`);
//         return value;
//       };

//       const wrapped = new Function("input", "console", code);
//       wrapped(inputFunction, fakeConsole);

//       if (inputIndex < inputs.length) {
//         logs.push(`Warning: ${inputs.length - inputIndex} unused inputs: ${inputs.slice(inputIndex).join(', ')}`);
//       }

//     } catch (err) {
//       logs.push("Error: " + err.message);
//     }

//     setOutput(logs.join("\n"));
//   };

//   const handlePlay = () => {
//     if (isEditMode) return;
    
//     if (currentIndex >= events.length) {
//       setCurrentIndex(0);
//       setPlaybackStartTime(0);
//       setCurrentTime(0);
//     } else {
//       // Update playback start time for smooth progress
//       setPlaybackStartTime(currentTime);
//     }
    
//     setPlaybackStartRealTime(Date.now());
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//   };

//   const handleReset = () => {
//     setIsPlaying(false);
//     if (timer) clearTimeout(timer);
//     editorRef.current.setValue(starterCode || "");
//     setCurrentIndex(0);
//     setEditModeEntryIndex(0);
//     setInputValue("");
//     setOutput("");
//     setCurrentTime(0);
//     setPlaybackStartTime(0);
//     setPlaybackStartRealTime(null);
//     setProgressPercent(0);
    
//     if (isEditMode) {
//       setIsEditMode(false);
//       setUserEditedCode("");
//       editorRef.current.updateOptions({ readOnly: true });
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🎥 Interactive Monaco Lesson Player</h1>

//       <div className="mb-4 flex flex-wrap gap-2">
//         <button 
//           onClick={handlePlay} 
//           disabled={isEditMode}
//           className={`px-4 py-2 rounded text-white ${
//             isEditMode ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           ▶️ Play
//         </button>
//         <button onClick={handlePause} className="bg-yellow-500 px-4 py-2 rounded text-white">⏸ Pause</button>
//         <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded text-white">🔁 Reset</button>
//         <button onClick={runCode} className="bg-blue-600 px-4 py-2 rounded text-white">⚙️ Run</button>
        
//         {isEditMode && (
//           <button 
//             onClick={continuePlayback} 
//             className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
//           >
//             🔄 Continue from Event {editModeEntryIndex}
//           </button>
//         )}
        
//         <button onClick={zoomIn} className="bg-gray-700 px-4 py-2 rounded text-white">🔍 Z+</button>
//         <button onClick={zoomOut} className="bg-gray-700 px-4 py-2 rounded text-white">🔎 Z-</button>
//         <button 
//           onClick={() => setAudioEnabled(!audioEnabled)} 
//           className={`px-4 py-2 rounded text-white ${audioEnabled ? 'bg-purple-600' : 'bg-gray-600'}`}
//         >
//           {audioEnabled ? '🔊' : '🔇'} Audio
//         </button>
//       </div>

//       {/* Progress Bar */}
//       <div className="mb-4">
//         <div className="flex items-center gap-2 mb-2">
//           <span className="text-sm text-gray-600 min-w-[40px]">
//             {formatTime(currentTime)}
//           </span>
//           <div 
//             className={`flex-1 h-2 bg-gray-300 rounded cursor-pointer relative ${
//               isEditMode ? 'cursor-not-allowed opacity-50' : ''
//             }`}
//             onClick={handleProgressClick}
//             onMouseDown={handleProgressMouseDown}
//             onMouseMove={handleProgressMouseMove}
//             onMouseUp={handleProgressMouseUp}
//           >
//             <div 
//               className="h-full bg-blue-600 rounded transition-all duration-75"
//               style={{ width: `${progressPercent}%` }}
//             />
//             {/* Scrubber handle */}
//             <div 
//               className="absolute top-0 w-4 h-4 bg-blue-800 rounded-full transform -translate-y-1 -translate-x-2 shadow-md"
//               style={{ left: `${progressPercent}%` }}
//             />
//           </div>
//           <span className="text-sm text-gray-600 min-w-[40px]">
//             {formatTime(totalDuration)}
//           </span>
//         </div>
//       </div>

//       {/* Mode indicator */}
//       <div className="mb-2 p-2 rounded text-sm font-medium">
//         {isEditMode ? (
//           <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded">
//             ✏️ EDIT MODE - Entered at event {editModeEntryIndex}. Click "Continue from Event {editModeEntryIndex}" to resume lesson.
//           </span>
//         ) : (
//           <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
//             📺 PLAYBACK MODE - Press any key to enter edit mode
//           </span>
//         )}
//       </div>

//       <div className="mt-2 text-sm text-gray-600">
//         Current Speed: {playbackSpeed}x | Audio: {audioEnabled ? 'ON' : 'OFF'} | Skip: {getSkipAmountDisplay()}
//       </div>
      
//       <div className="mt-1 text-xs text-gray-500">
//         <span>
//           ⌨️ Keyboard: Space = Play/Pause, ← = Skip back, → = Skip forward
//         </span>
//       </div>

//       <div className="flex gap-2 mt-2 flex-wrap">
//         {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
//           <button
//             key={speed}
//             onClick={() => setPlaybackSpeed(speed)}
//             className={`px-3 py-1 rounded text-white ${
//               playbackSpeed === speed ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {speed}x
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-4 gap-4 mt-4">
//         <div className="col-span-1 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">📝 Input</label>
//             <textarea
//               rows={5}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full p-2 border rounded bg-white text-black"
//               placeholder="Enter inputs separated by spaces or new lines..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">📤 Output</label>
//             <pre className="w-full min-h-[120px] p-2 bg-black text-green-400 rounded overflow-auto">
//               {output || "// Output will appear here..."}
//             </pre>
//           </div>
//         </div>

//         <div className="col-span-3 border rounded overflow-hidden h-[400px] shadow-md" ref={containerRef}></div>
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         {isEditMode ? (
//           <span>✏️ Edit Mode Active - Event {editModeEntryIndex} / {events.length} - Make your changes and test with Run button</span>
//         ) : isPlaying ? (
//           <span>Playing event {currentIndex + 1} / {events.length}</span>
//         ) : (
//           <span>⏸ Paused at event {currentIndex} / {events.length} - Press any key in editor to enter edit mode</span>
//         )}
//       </div>
//     </div>
//   );
// }

import { InteractivePlayer } from './components/InteractivePlayer';

export default function MonacoPlayer({ jsonData }) {
  return <InteractivePlayer jsonData={jsonData} />;
}