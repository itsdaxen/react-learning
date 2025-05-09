export default function Item({ obj, onRemoveItem, onPackingItem }) {
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
