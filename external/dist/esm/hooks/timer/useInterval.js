import { useEffect, useRef } from "react";
export function useInterval(callback, delay) {
  const callbackRef = useRef(callback);
  // update callback function with current render callback that has access to latest props and state
  useEffect(() => {
    callbackRef.current = callback;
  });
  useEffect(() => {
    if (!delay) {
      return () => {};
    }
    const interval = setInterval(() => {
      callbackRef?.current?.();
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);
}
//# sourceMappingURL=useInterval.js.map
