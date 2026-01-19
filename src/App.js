import { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const handleClick = (text) => {
    setValue(value + text);
  };

  const clear = () => setValue("");
  const backspace = () => setValue(value.slice(0, -1));

const calculate = () => {
  try {
    let expression = value
      .replace(/sin\(/g, "sin(pi/180*")
      .replace(/cos\(/g, "cos(pi/180*")
      .replace(/tan\(/g, "tan(pi/180*")
      .replace(/pi/g, "3.141592653589793");

    const result = evaluate(expression).toString();
    setHistory([{ exp: value, res: result }, ...history]);
    setValue(result);
  } catch {
    setValue("Error");
  }
};
// Apply square or cube safely
const applyPower = (power) => {
  try {
    let expression = value
      .replace(/pi/g, "3.141592653589793")  // convert pi to number
      .replace(/sin\(/g, "sin(pi/180*")
      .replace(/cos\(/g, "cos(pi/180*")
      .replace(/tan\(/g, "tan(pi/180*");

    const result = evaluate(expression);
    setValue(Math.pow(result, power).toString());
    setHistory([{ exp: `${value}^${power}`, res: Math.pow(result, power) }, ...history]);
  } catch {
    setValue("Error");
  }
};
  return (
    <div className="app">
      <div className="calculator">
        <h2>Scientific Calculator</h2>

        <input type="text" value={value} readOnly />

        {/* Buttons */}
        <div className="buttons">
        <button className="red" onClick={clear}>C</button>
        <button className="orange" onClick={backspace}>⌫</button>

        <button onClick={() => handleClick("(")}>(</button>
        <button onClick={() => handleClick(")")}>)</button>

          <button onClick={() => handleClick("sin(")}>sin</button>
          <button onClick={() => handleClick("cos(")}>cos</button>
          <button onClick={() => handleClick("tan(")}>tan</button>
          <button onClick={() => handleClick("/")}>/</button>

          <button onClick={() => handleClick("pi")}>π</button>
          <button onClick={() => applyPower(2)}>x²</button>
          <button onClick={() => applyPower(3)}>x³</button>
  
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("-")}>-</button>

          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("+")}>+</button>

          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button className="equal" onClick={calculate}>=</button>

          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={() => handleClick("sqrt(")}>√</button>
        </div>
      </div>

      {/* History Panel */}
      <div className="history">
        <h3>History</h3>
        {history.length === 0 && <p>No history yet</p>}
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <p>{item.exp}</p>
            <strong>= {item.res}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
