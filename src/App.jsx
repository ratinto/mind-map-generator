import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div
        id="canvas"
        style={{
          marginTop: "20px",
          width: "93%",
          height: "90vh",
          border: "2px dashed gray",
          position: "relative",
          backgroundColor: "#fbf5f1",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        this canvas
      </div>
    </>
  );
}

export default App;
