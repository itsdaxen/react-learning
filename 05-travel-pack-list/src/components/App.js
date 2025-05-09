import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
  function handleClearAll() {
    const confirmed = window.confirm(
      "This will clear all items in the list. Are you sure you want to proceed?"
    );
    confirmed && setInventory([]);
  }

  function handleClearPacked() {
    setInventory((items) => inventory.filter((item) => !item.packed));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} inventory={inventory} />
      <PackingList
        inventory={inventory}
        onClearAll={handleClearAll}
        onClearPacked={handleClearPacked}
        onRemoveItem={handleRemoveItem}
        onPackingItem={handlePackingItem}
      />
      <Stats inventory={inventory} />
    </div>
  );
}
