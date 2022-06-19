import React from 'react';

import { useRequestPokemonQueries } from '@utils/api';

import { Pokemon } from './Pokemon/Pokemon';

export const PokemonsPage = () => {
  const [offset, setOffset] = React.useState(20);
  const results = useRequestPokemonQueries({ offset });
  const isLoading = results.some((result) => result.isLoading);

  if (isLoading) return null;

  const pokemons = results.map((result) => result.data!.data);

  return (
    <div className='container'>
      <button onClick={() => setOffset(offset + 20)}>load more </button>
      <div className='grid grid-cols-4 gap-10'>
        {pokemons.map((pokemon, index) => (
          <Pokemon pokemon={pokemon} key={index} />
        ))}
      </div>
    </div>
  );
};
