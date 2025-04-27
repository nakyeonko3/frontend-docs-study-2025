import { useState } from "react";

function AutomaticBatching() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleClick = () => {
    setText("handleClick");
    console.log("setText");
    console.log("setCount");
  };

  const handleTimeout = () => {
    setTimeout(() => {
      setCount(count + 1);
      setText("timeout");
      console.log("setText");
      console.log("setCount");
    }, 1000);
  };

  const handleFetch = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const data = await response.json();

      setCount(count + 1);
      setText(`Fetched: ${data.title}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="automatic-batching-demo">
      <h2>자동 배칭 데모</h2>
      <div className="state-display">
        <p>카운트: {count}</p>
        <p>텍스트: {text}</p>
      </div>

      <div className="controls">
        <button onClick={handleClick}>onClick</button>

        <button onClick={handleTimeout}>setTimeout</button>

        <button onClick={handleFetch}>Fetch</button>
      </div>
    </div>
  );
}

export default AutomaticBatching;
