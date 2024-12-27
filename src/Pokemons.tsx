import React, { ReactElement, useEffect, useState } from "react";
import { PokemonItem } from "./PokemonItem";
import { Pokemon } from "./types";

let numberOfTimes = 0;

export function Pokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);
  const [visiblePokemons, setVisiblePokemons] = useState<Pokemon[]>([]);
  const [showOnlyUnacughtPokemons, setShowOnlyUncaughtPokemons] =
    useState(false);
  const [aside, setAside] = useState<ReactElement | undefined>();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(`I've been called ${numberOfTimes} times`);
    if (showOnlyUnacughtPokemons) {
      setVisiblePokemons(
        pokemons.filter((pokemon) => !caughtPokemons.includes(pokemon))
      );
    } else {
      setVisiblePokemons(pokemons);
    }
  }, [caughtPokemons, pokemons, showOnlyUnacughtPokemons]);

  useEffect(() => {
    setAside(
      <aside>
        Uncaught Pokemons: {pokemons.length - caughtPokemons.length}
      </aside>
    );
  }, [pokemons, caughtPokemons]);

  if (loading) {
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
      {aside}
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
          caught={caughtPokemons.includes(pokemon)}
        />
      ))}
    </div>
  );
}
