import { useEffect, useReducer } from "react";
import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import Loader from "./Loader.jsx";
import Start from "./Start.jsx";

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
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
    default:
      throw new Error("Action unknown");
  }
};

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

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
        ) : (
          <Start count={questions.length} />
        )}
      </MainContent>
    </div>
  );
}

export default App;
