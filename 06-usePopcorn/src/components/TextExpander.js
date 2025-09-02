import { useState } from "react";

export function TextExpander({
  defaultExpansion = false,
  count = 10,
  color = "blue",
  children,
}) {
  const [expanded, setExpanded] = useState(defaultExpansion);

  const textAsList = children.split(" ");

  return (
    <div>
      <p>
        {textAsList.map((word, index) => {
          return !expanded && index > count ? null : !expanded &&
            index === count ? (
            "..."
          ) : (
            <span key={index}>{word} </span>
          );
        })}

        <span
          style={{ cursor: "pointer", marginLeft: "8px", color: color }}
          onClick={() => setExpanded((expanded) => !expanded)}
        >
          {expanded ? "See Less" : "Read More"}
        </span>
      </p>
    </div>
  );
}
