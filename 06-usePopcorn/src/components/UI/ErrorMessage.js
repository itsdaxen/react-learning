export function ErrorMessage({ errorType }) {
  return (
    <div
      style={{
        background: "rgba(220, 53, 69, 0.1)",
        color: "#dc3545",
        border: "1px solid #dc3545",
        borderRadius: "8px",
        padding: "2rem",
        margin: "4rem 0",
        textAlign: "center",
        fontSize: "1.6rem",
        fontWeight: 500,
        letterSpacing: "0.03em",
        boxShadow: "0 2px 8px rgba(220,53,69,0.08)",
        maxWidth: "420px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: "2.2rem" }}>⚠️</span>
      <span>{errorType}</span>
    </div>
  );
}
