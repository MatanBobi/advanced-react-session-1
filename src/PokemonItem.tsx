import { Pokemon } from "./types";

export function PokemonItem({
  pokemon,
  onChange,
  isCaught,
}: {
  pokemon: Pokemon;
  onChange: (pokemon: Pokemon, caught: boolean) => void;
  isCaught: boolean;
}) {
  return (
    <div className="pokemon-row">
      <span
        onClick={() => {
          onChange(pokemon, !isCaught);
        }}
      >
        {pokemon.name}
      </span>
      <input
        type="checkbox"
        checked={isCaught}
        onChange={() => {
          onChange(pokemon, !isCaught);
        }}
      />
    </div>
  );
}
