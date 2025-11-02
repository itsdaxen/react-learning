const Progress = ({
  questionsLength,
  currentIndex,
  score,
  maxPossibleScore,
  answer,
}) => {
  return (
    <header className="progress">
      <progress
        max={questionsLength}
        value={answer ? currentIndex + 1 : currentIndex}
        style={{ borderRadius: "10px" }}
      ></progress>
      <p>
        Question <strong>{currentIndex + 1}</strong> out of {questionsLength}
      </p>
      <p>
        {score}/{maxPossibleScore}
      </p>
    </header>
  );
};

export default Progress;
