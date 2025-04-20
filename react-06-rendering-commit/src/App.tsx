import Form from "./Form";
import Toolbar from "./Toolbar";

export default function App() {
  return (
    <>
      <div
        onClickCapture={() => {
          console.log("Div clicked!");
          alert("app div clicked!");
        }}
      >
        <Toolbar />
      </div>
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#e0e0e0",
          margin: "20px 0",
        }}
      ></div>
      <Form />
    </>
  );
}
