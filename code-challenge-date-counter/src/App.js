import "./App.css";
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + count);

  const label =
    count === 0
      ? "Today is: "
      : count > 0
      ? `${count} day${count !== 1 ? "s" : ""} from today is: `
      : `${Math.abs(count)} day${Math.abs(count) !== 1 ? "s" : ""} ago was: `;

  return (
    <div className="container">
      <h1>Date Counter</h1>
      <div className="add-sub">
        <button onClick={() => setStep((curr) => curr - 1)}>-</button>
        <span>Step: {step}</span>
        <button onClick={() => setStep((curr) => curr + 1)}>+</button>
      </div>
      <div className="add-sub">
        <button onClick={() => setCount((curr) => curr - step)}>-</button>
        <span>Count: {count}</span>
        <button onClick={() => setCount((curr) => curr + step)}>+</button>
      </div>
      <div className="output">
        <span>{label + targetDate.toDateString()}</span>
      </div>
    </div>
  );
}
