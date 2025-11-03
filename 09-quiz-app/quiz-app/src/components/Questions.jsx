import React from "react";
import Options from "./Options";
import Progress from "./Progress";
import Timer from "./Timer";

const Questions = ({
  question,
  dispatch,
  answer,
  score,
  questionsLength,
  currentIndex,
  maxPossibleScore,
  secondsRemaining,
}) => {
  return (
    <div>
      <Progress
        questionsLength={questionsLength}
        currentIndex={currentIndex}
        score={score}
        maxPossibleScore={maxPossibleScore}
        answer={answer}
      />
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
      {answer !== null && (
        <button
          className="btn  btn-ui"
          onClick={() =>
            dispatch({
              type: currentIndex < questionsLength - 1 ? "next" : "finished",
            })
          }
        >
          {currentIndex < questionsLength - 1 ? "Next" : "Finish"}
        </button>
      )}
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
    </div>
  );
};

export default Questions;
