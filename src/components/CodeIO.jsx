export const CodeIO = ({ inputValue, setInputValue, output, runCode }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Input Section */}
      <div className="flex-1 p-4 border-b border-gray-700 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h3 className="text-sm font-semibold text-gray-200">Input</h3>
          </div>
          <button 
            onClick={runCode} 
            className="flex items-center px-2 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl text-xs flex-shrink-0"
          >
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Run
          </button>
        </div>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 w-full p-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-0 overflow-auto"
          placeholder="Enter inputs..."
        />
      </div>

      {/* Output Section */}
      <div className="flex-1 p-4 flex flex-col min-h-0">
        <div className="flex items-center mb-3 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h3 className="text-sm font-semibold text-gray-200">Output</h3>
          </div>
        </div>
        <div className="flex-1 bg-gray-900 border border-gray-600 rounded-lg overflow-hidden min-h-0">
          <pre className="h-full p-2 text-green-400 font-mono text-xs overflow-auto whitespace-pre-wrap break-words">
            {output || (
              <span className="text-gray-500 italic">
                // Output will appear here...
              </span>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
};