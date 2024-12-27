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
    <div className="px-4 py-5 border-t border-t-slate-300 hover:bg-slate-200 font-medium dark:border-t-gray-600 dark:text-white dark:hover:bg-gray-700 dark:bg-gray-800 flex items-center gap-2">
      <img
        className="w-10"
        src={getMainImageUrl(pokemon.name)}
        alt={pokemon.name}
      />
      <span className="capitalize">{pokemon.name}</span>
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={isCaught}
        onChange={() => {
          setCaught((prevCaught) => !prevCaught);
        }}
      />
    </div>
  );
}
