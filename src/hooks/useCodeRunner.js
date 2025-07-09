import { useState } from 'react';

export const useCodeRunner = () => {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");

  const runCode = (code) => {
    const logs = [];
    
    const inputs = inputValue.trim() === '' ? [] : inputValue.trim().split(/\s+|\n+/);
    let inputIndex = 0;

    try {
      const fakeConsole = {
        log: (...args) => logs.push(args.join(" ")),
      };

      const inputFunction = () => {
        if (inputIndex >= inputs.length) {
          throw new Error(`No more inputs available! Expected input #${inputIndex + 1}`);
        }
        const value = inputs[inputIndex];
        inputIndex++;
        logs.push(`> Input #${inputIndex}: ${value}`);
        return value;
      };

      const wrapped = new Function("input", "console", code);
      wrapped(inputFunction, fakeConsole);

      if (inputIndex < inputs.length) {
        logs.push(`Warning: ${inputs.length - inputIndex} unused inputs: ${inputs.slice(inputIndex).join(', ')}`);
      }

    } catch (err) {
      logs.push("Error: " + err.message);
    }

    setOutput(logs.join("\n"));
  };

  const resetCodeRunner = () => {
    setInputValue("");
    setOutput("");
  };

  return {
    inputValue,
    setInputValue,
    output,
    setOutput,
    runCode,
    resetCodeRunner
  };
};