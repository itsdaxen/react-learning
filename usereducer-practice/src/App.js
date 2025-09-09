import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState("1");

  const date = new Date();
  date.setDate(date.getDate() + count);

  function addDate() {
    let validateStep = parseInt(step, 10);
    validateStep = !Number.isNaN(validateStep) ? validateStep : 0;
    setCount((cur) => cur + validateStep);
  }

  function reduceDate() {
    let validateStep = parseInt(step, 10);
    validateStep = !Number.isNaN(validateStep) ? validateStep : 0;
    setCount((cur) => cur - validateStep);
  }

  return (
    <div>
      <p>Date Counter</p>
      <button onClick={reduceDate}>-</button>
      <input
        type="text"
        value={step}
        onChange={(e) => setStep(e.target.value)}
      />
      <button onClick={addDate}>+</button>
      <p>Date is: {date.toDateString()}</p>
    </div>
  );
}

export default App;
