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
    <div className="px-4 py-5 border-t border-t-slate-300 cursor-pointer hover:bg-slate-200 font-medium dark:border-t-gray-600 dark:text-white dark:hover:bg-gray-700 dark:bg-gray-800">
      <span
        className="capitalize"
        onClick={() => {
          setCaught((prevCaught) => !prevCaught);
        }}
      >
        {pokemon.name}
      </span>
      <input
        type="checkbox"
        checked={isCaught}
        className="mx-2"
        onChange={() => {
          setCaught((prevCaught) => !prevCaught);
        }}
      />
    </div>
  );
}
