import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  inventory,
  onClearAll,
  onClearPacked,
  onRemoveItem,
  onPackingItem,
}) {
  const [sortBy, setSortby] = useState("recency");
  let sorted =
    sortBy === "name"
      ? inventory
          .slice()
          .sort((a, b) => a.description.localeCompare(b.description))
      : sortBy === "status"
      ? inventory.slice().sort((a, b) => Number(a.packed) - Number(b.packed))
      : [...inventory].sort((a, b) => b.id - a.id);

  return (
    <div className="list">
      <ul>
        {sorted.map((itemObj) => (
          <Item
            obj={itemObj}
            key={itemObj.id}
            onRemoveItem={onRemoveItem}
            onPackingItem={onPackingItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortby(e.target.value)}>
          <option value="recency">Sort by recency</option>
          <option value="name">Sort by name</option>
          <option value="status">Sort by status</option>
        </select>

        <button onClick={onClearPacked}>Clear packed</button>
        <button onClick={onClearAll}>Clear All</button>
      </div>
    </div>
  );
}
