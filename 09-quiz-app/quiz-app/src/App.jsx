import { useEffect, useReducer } from "react";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import Loader from "./components/Loader.jsx";
import Start from "./components/Start.jsx";
import Questions from "./components/Questions.jsx";
import Error from "./components/Error.jsx";
import FinishScreen from "./components/FinishScreen.jsx";

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  currentIndex: 0,
  answer: null,
  score: 0,
  highscore: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataError":
      return {
        ...state,
        status: "Error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "next":
      return {
        ...state,
        answer: null,
        currentIndex:
          state.currentIndex + 1 < state.questions.length
            ? state.currentIndex + 1
            : state.currentIndex,
      };
    case "newAnswer": {
      const question = state.questions.at(state.currentIndex);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    }
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };
    case "timeElapsing":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
};

function App() {
  const [
    {
      questions,
      status,
      currentIndex,
      answer,
      score,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        data
          ? dispatch({ type: "dataRecieved", payload: data })
          : dispatch({ type: "dataError" });
      } catch (e) {
        console.log(e);
        dispatch({ type: "dataError" });
      }
    };
    fetchData();
  }, []);

  const questionsLength = questions.length;
  const maxPossibleScore = questions.reduce((acc, cur) => acc + cur.points, 0);

  return (
    <div className="app">
      <Header />
      <MainContent>
        {status === "Error" ? (
          <Error />
        ) : status === "loading" ? (
          <Loader />
        ) : status === "active" ? (
          <Questions
            question={questions[currentIndex]}
            dispatch={dispatch}
            answer={answer}
            score={score}
            questionsLength={questionsLength}
            currentIndex={currentIndex}
            maxPossibleScore={maxPossibleScore}
            secondsRemaining={secondsRemaining}
          />
        ) : status === "finished" ? (
          <FinishScreen
            score={score}
            maxPossibleScore={maxPossibleScore}
            dispatch={dispatch}
            highscore={highscore}
          />
        ) : (
          <Start questionsLength={questionsLength} dispatch={dispatch} />
        )}
      </MainContent>
    </div>
  );
}

export default App;
