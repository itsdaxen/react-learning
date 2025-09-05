const style = {
  fontSize: "2.4rem",
  fontWeight: 500,
  color: "#f8f9fa",
  textAlign: "center",
  margin: "6rem 0",
  letterSpacing: "0.05em",
};
export function Feedback({ children }) {
  return <p style={style}>{children}</p>;
}
