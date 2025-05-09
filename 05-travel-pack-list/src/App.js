import "./index.css";
import { useState } from "react";

export default function App() {
  const [inventory, setInventory] = useState([]);
  function handleAddItem(newItem) {
    setInventory((curr) => [...curr, newItem]);
  }
  function handleRemoveItem(delItemID) {
    setInventory((inventory) =>
      inventory.filter((curr) => curr.id !== delItemID)
    );
  }
  function handlePackingItem(packedItemID) {
    setInventory((items) =>
      items.map((item) =>
        item.id === packedItemID ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} inventory={inventory} />
      <PackingList
        inventory={inventory}
        onRemoveItem={handleRemoveItem}
        onPackingItem={handlePackingItem}
      />
      <Stats inventory={inventory} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form({ onAddItem, inventory }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmitItem(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmitItem}>
      <h3>What do you need for your 😍 trip?</h3>
      <input
        type="number"
        value={quantity}
        min={1}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
        required
      />
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        required
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ inventory, onRemoveItem, onPackingItem }) {
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
      </div>
    </div>
  );
}

function Item({ obj, onRemoveItem, onPackingItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={obj.packed}
        onChange={() => onPackingItem(obj.id)}
      />
      <span style={obj.packed ? { textDecoration: "line-through" } : null}>
        {obj.quantity} {obj.description}
      </span>
      <button onClick={() => onRemoveItem(obj.id)}>❌</button>
    </li>
  );
}
function Stats({ inventory }) {
  if (!inventory.length) {
    return (
      <footer className="stats">
        Start adding some items to the list and get ready to go! 🚀
      </footer>
    );
  }
  const count = inventory.length;
  const packed = inventory.filter((item) => (item.packed ? item : null));
  const percentage = inventory.length
    ? (packed.length / inventory.length) * 100
    : 0;

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>You've got everything. Ready to go! ✈</em>
      ) : (
        <em>
          💼 You have {count} items on your list, and you have already packed{" "}
          {packed.length ? packed.length : 0} ({percentage.toFixed(0)} %)
        </em>
      )}
    </footer>
  );
}
