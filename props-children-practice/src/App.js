import "./App.css";
import { useState } from "react";

const accordionData = [
  {
    id: Date.now() + 1,
    title: "Introduction to React",
    content:
      "React is a JavaScript library for building user interfaces, particularly single-page applications.",
  },
  {
    id: Date.now() + 2,
    title: "Understanding Props",
    content:
      "Props are read-only properties that are passed from parent components to child components.",
  },
  {
    id: Date.now() + 3,
    title: "State Management",
    content:
      "React components can maintain their state, which determines how a component renders and behaves.",
  },
  {
    id: Date.now() + 4,
    title: "Hooks in React",
    content:
      "Hooks are functions that let you use state and other React features without writing a class component.",
  },
];

export default function App() {
  return (
    <div>
      <Header />
      <Accordion />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>React Accordion</h1>
    </div>
  );
}

function Accordion() {
  const [activeNumber, setActiveNumber] = useState();
  function handleActiveNumber(number) {
    setActiveNumber(number);
  }

  return (
    <div className="accordion-container">
      {accordionData.map((item, index) => (
        <AccordionItem
          number={index + 1}
          title={item.title}
          content={item.content}
          activeNumber={activeNumber}
          onActiveNumber={handleActiveNumber}
          key={item.id}
        />
      ))}
    </div>
  );
}

function AccordionItem({
  number,
  title,
  content,
  activeNumber,
  onActiveNumber,
}) {
  return (
    <div
      className={`accordion-item ${activeNumber === number ? "active" : ""}`}
      onClick={() =>
        onActiveNumber(activeNumber !== number ? number : undefined)
      }
    >
      <div>
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      {activeNumber === number ? <p>{content}</p> : null}
    </div>
  );
}
