import { useState, useEffect, useRef } from "react";

export default function useTimer(onTimeout, initial = 10) {
  const [timeLeft, setTimeLeft] = useState(initial);
  const intervalRef = useRef(null);

  useEffect(() => {
    start();
    return () => clearInterval(intervalRef.current);
  }, []);

  function start() {
    clearInterval(intervalRef.current);
    setTimeLeft(initial);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onTimeout();
          return initial;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function resetTimer() {
    start();
  }

  function pauseTimer() {
    clearInterval(intervalRef.current);
  }

  return { timeLeft, resetTimer, pauseTimer };
}
