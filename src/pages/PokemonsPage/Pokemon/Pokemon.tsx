import React from 'react';

import styles from './Pokemon.module.css';

interface PokemonProps {
  pokemon: Pokemon;
}

export const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => (
  <div className={styles.pokemon_container}>
    <img className='w-full h-72' src={pokemon.sprites.front_default ?? ''} alt='pokemon img' />

    <h2 className='w-full text-left capitalize font-semibold text-2xl'>{pokemon.name}</h2>
  </div>
);
