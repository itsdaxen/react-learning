const Options = ({ question, dispatch, answer }) => {
  return (
    <div className="options">
      {question.options.map((el, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            answer !== null &&
            (index === question.correctOption ? "correct" : "wrong")
          }`}
          key={el}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={answer !== null}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default Options;
