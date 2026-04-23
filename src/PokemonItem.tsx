import { useEffect, useState } from "react";
import { Pokemon } from "./types";
import { getMainImageUrl } from "./utils";

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
    <div className="pokemon-card px-5 py-3 border-b border-slate-100 hover:bg-slate-50 font-medium dark:border-gray-700 dark:text-white dark:hover:bg-gray-700/50 dark:bg-gray-800 flex items-center gap-3 transition-colors duration-150">
      <img
        className="w-12 h-12 object-contain"
        src={getMainImageUrl(pokemon.name)}
        alt={pokemon.name}
      />
      <span className="capitalize flex-1 text-sm">{pokemon.name}</span>
      <input
        type="checkbox"
        className="pokeball-checkbox"
        checked={isCaught}
        onChange={() => {
          setCaught((prevCaught) => !prevCaught);
        }}
      />
    </div>
  );
}
