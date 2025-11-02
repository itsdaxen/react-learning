import { useEffect, useReducer } from "react";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import Loader from "./components/Loader.jsx";
import Start from "./components/Start.jsx";
import Questions from "./components/Questions.jsx";
import Error from "./components/Error.jsx";

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  currentIndex: 0,
  answer: null,
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
    case "[prev]":
      return {
        ...state,
        answer: null,
        currentIndex:
          state.currentIndex - 1 >= 0
            ? state.currentIndex - 1
            : state.currentIndex,
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
      };
    default:
      throw new Error("Action unknown");
  }
};

function App() {
  const [{ questions, status, currentIndex, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
          />
        ) : (
          <Start count={questions.length} dispatch={dispatch} />
        )}
      </MainContent>
    </div>
  );
}

export default App;
