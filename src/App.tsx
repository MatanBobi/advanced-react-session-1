import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Pokemons } from "./Pokemons";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Pokemons />
    </div>
  );
}

export default App;
