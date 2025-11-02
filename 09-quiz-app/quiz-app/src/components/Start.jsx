import React from "react";

const Start = ({ questionsLength, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsLength} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
};

export default Start;
