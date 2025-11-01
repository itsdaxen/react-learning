import { useReducer, useState } from "react";

function App() {

  function reducer(state, action) {
    if (action.type === "add") return state + action.payload;
    if (action.type === "dec") return state - action.payload;

  }
  
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState("1");

  const date = new Date();
  date.setDate(date.getDate() + count);

  function addDate() {
    let validateStep = parseInt(step, 10);
    validateStep = !Number.isNaN(validateStep) ? validateStep : 0;
    dispatch({type: "add", payload: validateStep});
  }

  function reduceDate() {
    let validateStep = parseInt(step, 10);
    validateStep = !Number.isNaN(validateStep) ? validateStep : 0;
    dispatch({type: "dec", payload: validateStep});

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
