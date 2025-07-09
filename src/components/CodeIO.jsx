// export const CodeIO = ({ inputValue, setInputValue, output }) => {
//   return (
//     <div className="h-[600px] flex flex-col">
//       {/* Input Section */}
//       <div className="flex-1 p-4 border-b border-gray-700">
//         <div className="flex items-center mb-3">
//           <div className="flex items-center space-x-2">
//             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//             <h3 className="text-sm font-semibold text-gray-200">Input</h3>
//           </div>
//         </div>
//         <textarea
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//           placeholder="Enter inputs separated by spaces or new lines..."
//         />
//       </div>

//       {/* Output Section */}
//       <div className="flex-1 p-4">
//         <div className="flex items-center mb-3">
//           <div className="flex items-center space-x-2">
//             <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//             <h3 className="text-sm font-semibold text-gray-200">Output</h3>
//           </div>
//         </div>
//         <div className="h-full bg-gray-900 border border-gray-600 rounded-lg overflow-hidden">
//           <pre className="h-full p-3 text-green-400 font-mono text-sm overflow-auto whitespace-pre-wrap">
//             {output || (
//               <span className="text-gray-500 italic">
//                 // Output will appear here after running code...
//               </span>
//             )}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// };

export const CodeIO = ({ inputValue, setInputValue, output, runCode }) => {
  return (
    <div className="h-[600px] flex flex-col">
      {/* Input Section */}
      <div className="flex-1 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h3 className="text-sm font-semibold text-gray-200">Input</h3>
          </div>
          <button 
            onClick={runCode} 
            className="flex items-center px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
          >
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Run Code
          </button>
        </div>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter inputs separated by spaces or new lines..."
        />
      </div>

      {/* Output Section */}
      <div className="flex-1 p-4">
        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h3 className="text-sm font-semibold text-gray-200">Output</h3>
          </div>
        </div>
        <div className="h-full bg-gray-900 border border-gray-600 rounded-lg overflow-hidden">
          <pre className="h-full p-3 text-green-400 font-mono text-sm overflow-auto whitespace-pre-wrap">
            {output || (
              <span className="text-gray-500 italic">
                // Output will appear here after running code...
              </span>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
};