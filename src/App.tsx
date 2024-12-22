import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Pokemons } from "./Pokemons";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="layout dark:bg-gray-800 h-full">
      <Pokemons />
    </div>
  );
}

export default App;
