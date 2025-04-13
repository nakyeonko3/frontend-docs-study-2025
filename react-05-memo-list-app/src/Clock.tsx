function getClassBasedOnHours(hours: number) {
  if (hours >= 0 && hours < 6) {
    return "night";
  } else {
    return "day";
  }
}

export default function Clock({ time }: { time: Date }) {
  return (
    <h1 id="time" className={getClassBasedOnHours(time.getHours())}>
      {time.toLocaleTimeString()}
    </h1>
  );
}
