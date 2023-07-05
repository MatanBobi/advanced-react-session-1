# Advanced React Session 1

To start, run `npm install` and then `npm run dev`.

## Step 1

The `Pokemons` component displays a list of Pokemons. When the "Show only uncaught Pokemons" checkbox is ticked, caught pokemons are not visible in the list.  
Regardless of which Pokemons are visible, the `aside` shows the number of uncaught Pokemons.

Simplify the `Pokemons` and `PokemonItem` components by removing the redundant states and effects.

## Step 2

Use a specific hook to prevent the visible Pokemons list from being re-calculated on every render.

## Step 3

Refactor our code to `useReducer` instead of the `useState` we currently have.  
You can choose which logic you'd want to extract.

## Step 4

Take a look at the network log and see that the request we initiate is being sent twice, remember why?  
Create a custom hook to fetch the data in a way that will be idempotent and won't cause issues if the component will be mounted twice.
