import { useEffect, useState } from "react";

export function useDebounce(value, time) {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {

    let timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, time);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, time]);

  return {
    debouncedValue
  };
}
