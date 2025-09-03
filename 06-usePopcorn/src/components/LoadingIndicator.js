export function LoadingIndicator() {
  return (
    <div
      className="loader"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.6rem",
      }}
    >
      <div
        style={{
          width: "3.2rem",
          height: "3.2rem",
          border: "4px solid #fff",
          borderTop: "4px solid #a259fa",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <span>Loading...</span>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}
