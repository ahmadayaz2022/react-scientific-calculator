import { useState, useEffect, useRef } from "react";
import { evaluate } from "mathjs";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [isDegree, setIsDegree] = useState(true);
  const [memory, setMemory] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [animatingButton, setAnimatingButton] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      
      if (key >= '0' && key <= '9') handleClick(key);
      else if (key === '.') handleClick('.');
      else if (key === '+') handleClick('+');
      else if (key === '-') handleClick('-');
      else if (key === '*') handleClick('*');
      else if (key === '/') handleClick('/');
      else if (key === '(') handleClick('(');
      else if (key === ')') handleClick(')');
      else if (key === 'Enter' || key === '=') calculate();
      else if (key === 'Backspace') backspace();
      else if (key === 'Escape') clear();
      else if (key === '^') handleClick('^');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [value]);

  const handleClick = (text) => {
    setValue(prev => prev + text);
    animateButton(text);
  };

  const animateButton = (text) => {
    setAnimatingButton(text);
    setTimeout(() => setAnimatingButton(null), 200);
  };

  const clear = () => {
    setValue("");
    animateButton('C');
  };

  const backspace = () => {
    setValue(prev => prev.slice(0, -1));
    animateButton('⌫');
  };

  const toggleDegree = () => {
    setIsDegree(!isDegree);
    animateButton('DEG');
  };

  const memoryAdd = () => {
    try {
      const result = evaluate(value || "0");
      setMemory(prev => prev + result);
    } catch {
      setMemory(prev => prev);
    }
  };

  const memoryRecall = () => {
    setValue(prev => prev + memory.toString());
    animateButton('MR');
  };

  const memoryClear = () => {
    setMemory(0);
    animateButton('MC');
  };

  const calculate = () => {
    try {
      let expression = value;
      
      if (isDegree) {
        expression = expression
          .replace(/sin\(/g, "sin(pi/180*")
          .replace(/cos\(/g, "cos(pi/180*")
          .replace(/tan\(/g, "tan(pi/180*");
      }
      
      expression = expression.replace(/pi/g, "3.141592653589793");

      const result = evaluate(expression);
      const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(10));
      
      setHistory(prev => [{ exp: value, res: formattedResult.toString() }, ...prev.slice(0, 9)]);
      setValue(formattedResult.toString());
      animateButton('=');
    } catch {
      setValue("Error");
      setTimeout(() => setValue(""), 1500);
    }
  };

  const applyFunction = (func) => {
    try {
      let expression = value || "0";
      let displayExp = value || "0";
      
      if (isDegree) {
        expression = expression.replace(/pi/g, "3.141592653589793");
      }
      
      const num = evaluate(expression);
      let result;
      
      switch(func) {
        case 'square':
          result = Math.pow(num, 2);
          displayExp = `(${displayExp})²`;
          break;
        case 'cube':
          result = Math.pow(num, 3);
          displayExp = `(${displayExp})³`;
          break;
        case 'sqrt':
          result = Math.sqrt(num);
          displayExp = `√(${displayExp})`;
          break;
        case 'log':
          result = Math.log10(num);
          displayExp = `log(${displayExp})`;
          break;
        case 'ln':
          result = Math.log(num);
          displayExp = `ln(${displayExp})`;
          break;
        case 'factorial':
          result = factorial(num);
          displayExp = `(${displayExp})!`;
          break;
        case 'reciprocal':
          result = 1 / num;
          displayExp = `1/(${displayExp})`;
          break;
        case 'abs':
          result = Math.abs(num);
          displayExp = `|${displayExp}|`;
          break;
        default:
          return;
      }
      
      if (!isFinite(result)) {
        setValue("Error");
        return;
      }
      
      setValue(result.toString());
      setHistory(prev => [{ exp: displayExp, res: result.toString() }, ...prev.slice(0, 9)]);
      animateButton(func);
    } catch {
      setValue("Error");
      setTimeout(() => setValue(""), 1500);
    }
  };

  const factorial = (n) => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const clearHistory = () => {
    setHistory([]);
  };

  // This is a regular function, not a hook
  const handleHistoryItemClick = (result) => {
    setValue(result);
    setShowHistory(false);
  };

  const buttons = [
    // Row 1: Advanced functions
    { label: '2nd', action: () => {}, class: 'func' },
    { label: 'π', action: () => handleClick('pi'), class: 'func' },
    { label: 'e', action: () => handleClick('e'), class: 'func' },
    { label: 'C', action: clear, class: 'danger' },
    
    // Row 2: More functions
    { label: 'x²', action: () => applyFunction('square'), class: 'func' },
    { label: 'x³', action: () => applyFunction('cube'), class: 'func' },
    { label: 'xⁿ', action: () => handleClick('^'), class: 'func' },
    { label: '⌫', action: backspace, class: 'warning' },
    
    // Row 3: Trig functions
    { label: 'sin', action: () => handleClick('sin('), class: 'func' },
    { label: 'cos', action: () => handleClick('cos('), class: 'func' },
    { label: 'tan', action: () => handleClick('tan('), class: 'func' },
    { label: 'log', action: () => applyFunction('log'), class: 'func' },
    
    // Row 4: Math functions
    { label: '√', action: () => applyFunction('sqrt'), class: 'func' },
    { label: '(', action: () => handleClick('('), class: 'func' },
    { label: ')', action: () => handleClick(')'), class: 'func' },
    { label: 'ln', action: () => applyFunction('ln'), class: 'func' },
    
    // Row 5: Numbers and operations
    { label: '7', action: () => handleClick('7'), class: 'num' },
    { label: '8', action: () => handleClick('8'), class: 'num' },
    { label: '9', action: () => handleClick('9'), class: 'num' },
    { label: '÷', action: () => handleClick('/'), class: 'operator' },
    
    // Row 6: Numbers and operations
    { label: '4', action: () => handleClick('4'), class: 'num' },
    { label: '5', action: () => handleClick('5'), class: 'num' },
    { label: '6', action: () => handleClick('6'), class: 'num' },
    { label: '×', action: () => handleClick('*'), class: 'operator' },
    
    // Row 7: Numbers and operations
    { label: '1', action: () => handleClick('1'), class: 'num' },
    { label: '2', action: () => handleClick('2'), class: 'num' },
    { label: '3', action: () => handleClick('3'), class: 'num' },
    { label: '−', action: () => handleClick('-'), class: 'operator' },
    
    // Row 8: Numbers and operations
    { label: '±', action: () => handleClick('(-'), class: 'func' },
    { label: '0', action: () => handleClick('0'), class: 'num' },
    { label: '.', action: () => handleClick('.'), class: 'num' },
    { label: '+', action: () => handleClick('+'), class: 'operator' },
    
    // Row 9: Special functions
    { label: '!', action: () => applyFunction('factorial'), class: 'func' },
    { label: '1/x', action: () => applyFunction('reciprocal'), class: 'func' },
    { label: '|x|', action: () => applyFunction('abs'), class: 'func' },
    { label: '=', action: calculate, class: 'equal' },
  ];

  return (
    <div className="app">
      <div className="calculator">
        <div className="calculator-header">
          <div className="header-left">
            <div className="mode-indicator">
              <button 
                className={`mode-btn ${isDegree ? 'active' : ''}`} 
                onClick={toggleDegree}
              >
                {isDegree ? 'DEG' : 'RAD'}
              </button>
            </div>
            <div className="memory-display">
              {memory !== 0 && <span>M: {memory}</span>}
            </div>
          </div>
          <div className="header-right">
            <button className="history-toggle" onClick={() => setShowHistory(!showHistory)}>
              📜
            </button>
          </div>
        </div>

        <div className="display">
          <input 
            ref={inputRef}
            type="text" 
            value={value || "0"} 
            readOnly 
            className={value.includes('Error') ? 'error' : ''}
          />
        </div>

        <div className="buttons">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`btn btn-${btn.class} ${animatingButton === btn.label ? 'animate' : ''}`}
              onClick={btn.action}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="memory-buttons">
          <button className="btn btn-memory" onClick={memoryClear}>MC</button>
          <button className="btn btn-memory" onClick={memoryRecall}>MR</button>
          <button className="btn btn-memory" onClick={memoryAdd}>M+</button>
          <button className="btn btn-memory" onClick={() => setValue(prev => prev + memory)}>M-</button>
        </div>
      </div>

      {showHistory && (
        <div className="history">
          <div className="history-header">
            <h3>History</h3>
            <button className="clear-history" onClick={clearHistory}>Clear</button>
          </div>
          {history.length === 0 ? (
            <div className="no-history">
              <span className="no-history-icon">📝</span>
              <p>No history yet</p>
            </div>
          ) : (
            history.map((item, index) => (
              <div 
                key={index} 
                className="history-item"
                onClick={() => handleHistoryItemClick(item.res)}
              >
                <p className="history-expression">{item.exp}</p>
                <strong className="history-result">= {item.res}</strong>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;