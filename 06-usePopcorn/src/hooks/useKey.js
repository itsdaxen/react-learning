import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [key, action]);
}
