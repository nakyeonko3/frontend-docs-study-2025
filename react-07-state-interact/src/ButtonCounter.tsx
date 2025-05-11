import { useState } from "react";

function ButtonCounter() {
  const [count, setCount] = useState(0);

  // Directly update state
  const update = () => setCount(count + 1);

  // Directly update state after 3 sec
  const asyncUpdate = () => {
    setTimeout(() => {
      //   setCount((currentCount) => currentCount + 1);
      setCount(count + 1);
    }, 2000);
  };

  // Render UI
  return (
    <div className="ButtonCount">
      <div>Count {count}</div>
      <button onClick={update}>ADD + 1</button>
      <button onClick={asyncUpdate}>ADD +1 later</button>
    </div>
  );
}

export default ButtonCounter;
