// import { useEffect, useRef, useState } from "react";
// import * as monaco from "monaco-editor";

// export default function MonacoRecorder() {
//   const editorRef = useRef(null);
//   const containerRef = useRef(null);

//   const [isRecording, setIsRecording] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [pauseStart, setPauseStart] = useState(null);
//   const [pausedDuration, setPausedDuration] = useState(0);
//   const [events, setEvents] = useState([]);
//   const [starterCode, setStarterCode] = useState("");
//   const [inputValue, setInputValue] = useState("");
//   const [output, setOutput] = useState("");

//   useEffect(() => {
//     if (containerRef.current && !editorRef.current) {
//       editorRef.current = monaco.editor.create(containerRef.current, {
//         value: `// Start typing your JavaScript code here...\nfunction hello() {\n  console.log("Hello, World!");\n}`,
//         language: "javascript",
//         theme: "vs-dark",
//         fontSize: 14,
//         automaticLayout: true,
//         minimap: { enabled: false },
//       });
//     }

//     return () => {
//       if (editorRef.current) {
//         editorRef.current.dispose();
//         editorRef.current = null;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!editorRef.current || !isRecording) return;

//     const disposable = editorRef.current.onDidChangeModelContent(() => {
//       if (!isPaused && startTime) {
//         const now = Date.now();
//         const time = now - startTime - pausedDuration;

//         const code = editorRef.current.getValue();
//         const position = editorRef.current.getPosition();

//         setEvents((prev) => [
//           ...prev,
//           {
//             time,
//             code,
//             cursor: {
//               line: position.lineNumber - 1,
//               ch: position.column - 1,
//             },
//             timestamp: now,
//           },
//         ]);
//       }
//     });

//     return () => disposable.dispose();
//   }, [isRecording, isPaused, startTime, pausedDuration]);

//   const startRecording = () => {
//     const now = Date.now();
//     setStartTime(now);
//     setPausedDuration(0);
//     setEvents([]);
//     setStarterCode(editorRef.current.getValue());
//     setIsRecording(true);
//     setIsPaused(false);
//     console.log("Started recording");
//   };

//   const pauseRecording = () => {
//     setIsPaused(true);
//     setPauseStart(Date.now());
//     console.log("Paused recording");
//   };

//   const resumeRecording = () => {
//     const now = Date.now();
//     setPausedDuration((prev) => prev + (now - pauseStart));
//     setIsPaused(false);
//     setPauseStart(null);
//     console.log("Resumed recording");
//   };

//   const stopRecording = () => {
//     setIsRecording(false);
//     setIsPaused(false);
//     setPauseStart(null);
//     console.log("Stopped recording");
//   };

//   const downloadJSON = () => {
//     const data = {
//       starterCode,
//       events,
//       totalEvents: events.length,
//       duration: events.length > 0 ? events[events.length - 1].time : 0,
//       recordedAt: new Date().toISOString(),
//     };

//     const blob = new Blob([JSON.stringify(data, null, 2)], {
//       type: "application/json",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `lesson-${Date.now()}.json`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const runCode = () => {
//   const code = editorRef.current.getValue();
//   const logs = [];

//   try {
//     const fakeConsole = {
//       log: (...args) => logs.push(args.join(" ")),
//     };
//     const wrapped = new Function("input", "console", code);
//     wrapped(inputValue, fakeConsole);
//   } catch (err) {
//     logs.push("Error: " + err.message);
//   }

//   const outputResult = logs.join("\n");
//   setOutput(outputResult);

//   // Record input/output along with code and cursor
//   if (isRecording && !isPaused && startTime) {
//     const now = Date.now();
//     const time = now - startTime - pausedDuration;
//     const position = editorRef.current.getPosition();

//     setEvents((prev) => [
//       ...prev,
//       {
//         time,
//         code,
//         cursor: {
//           line: position.lineNumber - 1,
//           ch: position.column - 1,
//         },
//         input: inputValue,
//         output: outputResult,
//         runExecuted: true,
//         timestamp: now,
//       }
//     ]);
//   }
// };


//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="mb-4 flex flex-wrap gap-2">
//         {!isRecording && (
//           <button onClick={startRecording} className="bg-green-600 px-4 py-2 rounded text-white">Start</button>
//         )}
//         {isRecording && !isPaused && (
//           <button onClick={pauseRecording} className="bg-yellow-500 px-4 py-2 rounded text-white">Pause</button>
//         )}
//         {isRecording && isPaused && (
//           <button onClick={resumeRecording} className="bg-blue-500 px-4 py-2 rounded text-white">Resume</button>
//         )}
//         {isRecording && (
//           <button onClick={stopRecording} className="bg-red-600 px-4 py-2 rounded text-white">Stop</button>
//         )}
//         {!isRecording && events.length > 0 && (
//           <button onClick={downloadJSON} className="bg-purple-600 px-4 py-2 rounded text-white">Download JSON</button>
//         )}
//         <button onClick={runCode} className="bg-indigo-600 px-4 py-2 rounded text-white">▶️ Run Code</button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//         <div className="lg:col-span-3">
//           <div className="border rounded overflow-hidden h-[400px] shadow-md" ref={containerRef}></div>
//         </div>
//         <div className="lg:col-span-1 space-y-4">
//           <div>
//             <h2 className="font-semibold text-sm mb-1">📥 Input</h2>
//             <textarea
//               className="w-full border rounded p-2 text-sm"
//               rows={5}
//               placeholder="Enter input (used as 'input' variable)"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             />
//           </div>
//           <div>
//             <h2 className="font-semibold text-sm mb-1">📤 Output</h2>
//             <pre className="w-full h-40 bg-black text-green-400 rounded p-2 overflow-auto text-sm">
//               {output || "// Output will appear here"}
//             </pre>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6">
//         <h2 className="text-lg font-semibold mb-2">🧾 Events Preview (last 5)</h2>
//         <pre className="bg-gray-900 text-green-400 p-4 rounded-lg max-h-[300px] overflow-auto text-sm">
//           {events.length > 0 ? JSON.stringify(events.slice(-5), null, 2) : "// No events yet"}
//         </pre>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";

export default function MonacoRecorder() {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [pauseStart, setPauseStart] = useState(null);
  const [pausedDuration, setPausedDuration] = useState(0);
  const [events, setEvents] = useState([]);
  const [starterCode, setStarterCode] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = monaco.editor.create(containerRef.current, {
        value: `// Example: Try this code that takes inputs
// Fill the input box with: Santhosh 25 Developer
// Or put each input on a new line

let name = input(); // Will get "Santhosh"
let age = input();  // Will get "25"
let job = input();  // Will get "Developer"

console.log("Name:", name);
console.log("Age:", age);
console.log("Job:", job);
console.log("Hello " + name + "! You are " + age + " years old and work as a " + job);`,
        language: "javascript",
        theme: "vs-dark",
        fontSize: 14,
        automaticLayout: true,
        minimap: { enabled: false },
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!editorRef.current || !isRecording) return;

    const disposable = editorRef.current.onDidChangeModelContent(() => {
      if (!isPaused && startTime) {
        const now = Date.now();
        const time = now - startTime - pausedDuration;

        const code = editorRef.current.getValue();
        const position = editorRef.current.getPosition();

        setEvents((prev) => [
          ...prev,
          {
            time,
            code,
            cursor: {
              line: position.lineNumber - 1,
              ch: position.column - 1,
            },
            timestamp: now,
          },
        ]);
      }
    });

    return () => disposable.dispose();
  }, [isRecording, isPaused, startTime, pausedDuration]);

  const startRecording = () => {
    const now = Date.now();
    setStartTime(now);
    setPausedDuration(0);
    setEvents([]);
    setStarterCode(editorRef.current.getValue());
    setIsRecording(true);
    setIsPaused(false);
    console.log("Started recording");
  };

  const pauseRecording = () => {
    setIsPaused(true);
    setPauseStart(Date.now());
    console.log("Paused recording");
  };

  const resumeRecording = () => {
    const now = Date.now();
    setPausedDuration((prev) => prev + (now - pauseStart));
    setIsPaused(false);
    setPauseStart(null);
    console.log("Resumed recording");
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setPauseStart(null);
    console.log("Stopped recording");
  };

  const downloadJSON = () => {
    const data = {
      starterCode,
      events,
      totalEvents: events.length,
      duration: events.length > 0 ? events[events.length - 1].time : 0,
      recordedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lesson-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const runCode = () => {
    const code = editorRef.current.getValue();
    const logs = [];
    
    // Parse inputs from the input box
    const inputs = inputValue.trim() === '' ? [] : inputValue.trim().split(/\s+|\n+/);
    let inputIndex = 0;

    try {
      // Create a fake console and input function
      const fakeConsole = {
        log: (...args) => logs.push(args.join(" ")),
      };

      // Create input function that returns next input from the array
      const inputFunction = () => {
        if (inputIndex >= inputs.length) {
          throw new Error(`No more inputs available! Expected input #${inputIndex + 1}`);
        }
        const value = inputs[inputIndex];
        inputIndex++;
        logs.push(`> Input #${inputIndex}: ${value}`);
        return value;
      };

      // Execute the code with our custom input function
      const wrapped = new Function("input", "console", code);
      wrapped(inputFunction, fakeConsole);

      // Check if all inputs were consumed
      if (inputIndex < inputs.length) {
        logs.push(`Warning: ${inputs.length - inputIndex} unused inputs: ${inputs.slice(inputIndex).join(', ')}`);
      }

    } catch (err) {
      logs.push("Error: " + err.message);
    }

    const outputResult = logs.join("\n");
    setOutput(outputResult);

    // Record input/output along with code and cursor
    if (isRecording && !isPaused && startTime) {
      const now = Date.now();
      const time = now - startTime - pausedDuration;
      const position = editorRef.current.getPosition();

      setEvents((prev) => [
        ...prev,
        {
          time,
          code,
          cursor: {
            line: position.lineNumber - 1,
            ch: position.column - 1,
          },
          input: inputValue,
          output: outputResult,
          runExecuted: true,
          timestamp: now,
        }
      ]);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-4 flex flex-wrap gap-2">
        {!isRecording && (
          <button onClick={startRecording} className="bg-green-600 px-4 py-2 rounded text-white">Start</button>
        )}
        {isRecording && !isPaused && (
          <button onClick={pauseRecording} className="bg-yellow-500 px-4 py-2 rounded text-white">Pause</button>
        )}
        {isRecording && isPaused && (
          <button onClick={resumeRecording} className="bg-blue-500 px-4 py-2 rounded text-white">Resume</button>
        )}
        {isRecording && (
          <button onClick={stopRecording} className="bg-red-600 px-4 py-2 rounded text-white">Stop</button>
        )}
        {!isRecording && events.length > 0 && (
          <button onClick={downloadJSON} className="bg-purple-600 px-4 py-2 rounded text-white">Download JSON</button>
        )}
        <button onClick={runCode} className="bg-indigo-600 px-4 py-2 rounded text-white">▶️ Run Code</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="border rounded overflow-hidden h-[400px] shadow-md" ref={containerRef}></div>
        </div>
        <div className="lg:col-span-1 space-y-4">
          <div>
            <h2 className="font-semibold text-sm mb-1">📥 Input</h2>
            <textarea
              className="w-full border rounded p-2 text-sm"
              rows={5}
              placeholder="Enter inputs separated by spaces or new lines:
Example: Santhosh 25 Developer
Or:
Santhosh
25
Developer"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Each input() call in your code will consume the next value
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-sm mb-1">📤 Output</h2>
            <pre className="w-full h-40 bg-black text-green-400 rounded p-2 overflow-auto text-sm">
              {output || "// Output will appear here"}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">🧾 Events Preview (last 5)</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg max-h-[300px] overflow-auto text-sm">
          {events.length > 0 ? JSON.stringify(events.slice(-5), null, 2) : "// No events yet"}
        </pre>
      </div>
    </div>
  );
}