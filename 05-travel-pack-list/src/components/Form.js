import { useState } from "react";

export default function Form({ onAddItem, inventory }) {
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
