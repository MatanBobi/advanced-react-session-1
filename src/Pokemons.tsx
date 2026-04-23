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
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="spinner" />
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Loading Pokémon...</p>
      </div>
    );
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
    <div className="max-h-screen w-full max-w-lg flex flex-col border-x border-slate-200 dark:border-slate-700 dark:bg-gray-800 dark:text-white overflow-auto shadow-lg">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 px-5 py-4">
          <img src="/Pokedex.svg" alt="Pokédex" className="w-8 h-8" />
          <h1 className="text-xl font-bold tracking-tight">Pokédex</h1>
        </div>
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 dark:bg-opacity-50">
          <aside className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            Uncaught Pokemons: {pokemons.length - caughtPokemons.length}
          </aside>
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none">
            Show only uncaught
            <input
              className="toggle-checkbox"
              type="checkbox"
              checked={showOnlyUnacughtPokemons}
              onChange={() => setShowOnlyUncaughtPokemons((prev) => !prev)}
            />
          </label>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {visiblePokemons.map((pokemon) => (
          <PokemonItem
            key={pokemon.name}
            pokemon={pokemon}
            onChange={handlePokemonCaught}
            caught={caughtPokemons.includes(pokemon)}
          />
        ))}
      </div>
    </div>
  );
}
