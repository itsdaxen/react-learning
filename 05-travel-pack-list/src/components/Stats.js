export default function Stats({ inventory }) {
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
