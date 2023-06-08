import "./App.css";
import { Wheel } from "./components/wheel";

function App() {
  return (
    <div className="App">
      <section style={{ minWidth: "90vw", minHeight: "90vh" }}>
        <h1>Coffee Wheel</h1>
        <div className="bg-red-200">test</div>
        <Wheel />
      </section>
    </div>
  );
}

export default App;
