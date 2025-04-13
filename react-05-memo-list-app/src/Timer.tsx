import { useEffect, useRef, useState } from "react";
import Clock from "./Clock";

export default function Timer() {
  const [time, setTime] = useState(new Date());
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      const newTime = new Date();
      setTime(newTime);
    }, 1000);
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  return <Clock time={time} />;
}
