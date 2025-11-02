const FinishScreen = ({ score, maxPossibleScore, dispatch, highscore }) => {
  return (
    <>
      <p className="result">
        You Scored: <strong>{score}</strong> points out of {maxPossibleScore} (
        {Math.ceil((score / maxPossibleScore) * 100)}%)
      </p>
      <p className="highscore">Your Highscore: {highscore} </p>
      <button
        className="btn"
        style={{ margin: "0 auto" }}
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
};

export default FinishScreen;
