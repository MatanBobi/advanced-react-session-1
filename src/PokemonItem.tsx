import { useEffect, useState } from "react";
import { Pokemon } from "./types";

export function PokemonItem({
  pokemon,
  onChange,
  caught,
}: {
  pokemon: Pokemon;
  onChange: (pokemon: Pokemon, caught: boolean) => void;
  caught: boolean;
}) {
  const [isCaught, setCaught] = useState(caught);

  useEffect(() => {
    onChange(pokemon, isCaught);
  }, [isCaught]);

  return (
    <div className="pokemon-row">
      <span
        onClick={() => {
          setCaught((prevCaught) => !prevCaught);
        }}
      >
        {pokemon.name}
      </span>
      <input
        type="checkbox"
        checked={isCaught}
        onChange={() => {
          setCaught((prevCaught) => !prevCaught);
        }}
      />
    </div>
  );
}
