import { useState, useEffect } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let call = setTimeout(() => {
      setDebouncedValue(value);
    }, delay)

    return () => clearTimeout(call);
  }, [value, delay])

  return debouncedValue;
}

export default useDebounce;