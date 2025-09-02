import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import { TextExpander } from "./components/TextExpander";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <TextExpander>
      Lizards are a widespread group of squamate reptiles, with over 6,000
      species, ranging across all continents except Antarctica, to varying
      degrees of aquatic lifestyle. Lizards are a widespread group of squamate
      reptiles, with over 6,000 species, ranging across all continents except
      Antarctica, to varying degrees of aquatic lifestyle.
    </TextExpander>
  </React.StrictMode>
);
