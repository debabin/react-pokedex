import React from 'react';

import styles from './Pokemon.module.css';

interface PokemonProps {
  pokemon: Pokemon;
}

export const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => (
  <div className={styles.pokemon_container}>
    <img className='h-72 w-full' src={pokemon.sprites.front_default ?? ''} alt='pokemon img' />

    <h2 className='w-full text-left text-2xl font-semibold capitalize'>{pokemon.name}</h2>
  </div>
);
