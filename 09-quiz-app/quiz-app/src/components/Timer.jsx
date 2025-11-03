import { useEffect } from "react";

const Timer = ({ dispatch, secondsRemaining }) => {
  const mins = String(Math.floor(secondsRemaining / 60)).padStart(2, "0");
  const secs = String(secondsRemaining % 60).padStart(2, "0");

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "timeElapsing" });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {mins}:{secs}
    </div>
  );
};

export default Timer;
