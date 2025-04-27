import "./App.css";
import AutomaticBatching from "./statequeue/AutomaticBatching";
import ProcessQueue from "./statequeue/ProcessQueue";

function App() {
  return (
    <>
      <div className="app-container">
        <AutomaticBatching />
        <hr />
        <ProcessQueue />
      </div>
    </>
  );
}

export default App;
