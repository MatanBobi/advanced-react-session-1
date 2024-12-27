import React, { useState } from "react";
import { PokemonItem } from "./PokemonItem";
import { Pokemon } from "./types";
import { useData } from "./useData";

export function Pokemons() {
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);
  const [showOnlyUnacughtPokemons, setShowOnlyUncaughtPokemons] =
    useState(false);

  const {
    isLoading,
    data: { results: pokemons = [] },
  } = useData<{ results: Pokemon[] }>(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  const visiblePokemons = React.useMemo(() => {
    if (showOnlyUnacughtPokemons) {
      return pokemons.filter((pokemon) => !caughtPokemons.includes(pokemon));
    }

    return pokemons;
  }, [caughtPokemons, pokemons, showOnlyUnacughtPokemons]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlePokemonCaught = (pokemon: Pokemon, caught: boolean) => {
    setCaughtPokemons((prev) => {
      if (caught) {
        if (prev.includes(pokemon)) {
          return prev;
        }

        return [...prev, pokemon];
      } else {
        return prev.filter((item) => item !== pokemon);
      }
    });
  };

  return (
    <div className="max-h-screen flex flex-col border-r border-r-slate-300 dark:border-r-slate-600 dark:bg-gray-800 dark:text-white overflow-auto">
      <aside>
        Uncaught Pokemons: {pokemons.length - caughtPokemons.length}
      </aside>
      <div>
        <label>
          Show only uncaught pokemons
          <input
            className="mx-2 cursor-pointer"
            type="checkbox"
            checked={showOnlyUnacughtPokemons}
            onChange={() => setShowOnlyUncaughtPokemons((prev) => !prev)}
          />
        </label>
      </div>
      {visiblePokemons.map((pokemon) => (
        <PokemonItem
          key={pokemon.name}
          pokemon={pokemon}
          onChange={handlePokemonCaught}
          isCaught={caughtPokemons.includes(pokemon)}
        />
      ))}
    </div>
  );
}
