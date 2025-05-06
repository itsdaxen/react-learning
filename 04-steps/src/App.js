import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [winShow, setWinShow] = useState(true);

  function handlePreviousBtn() {
    setStep(step > 1 ? (step) => step - 1 : step);
  }

  function handleNextBtn() {
    setStep(step < 3 ? (step) => step + 1 : step);
  }

  return (
    <div className="steps">
      <button onClick={() => setWinShow((is) => !is)} className="close">
        &times;
      </button>
      {winShow ? (
        <>
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">{`Step: ${step}: ${messages[step - 1]}`}</p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#ffff" }}
              onClick={handlePreviousBtn}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#ffff" }}
              onClick={handleNextBtn}
            >
              Next
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
