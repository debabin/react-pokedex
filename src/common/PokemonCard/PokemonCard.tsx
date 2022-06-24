import React from 'react';

import { getPokemonId } from '@utils/helpers';

import styles from './PokemonCard.module.css';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => (
  <div className={styles.card}>
    <div className={styles.card_title}>
      <div className={styles.card_title_name}>{pokemon.name}</div>
      <div>{getPokemonId(pokemon.id)}</div>
    </div>
    <div className={styles.card_types}>
      {pokemon.types.map(({ type }) => (
        <div className={styles.card_type}>{type.name}</div>
      ))}
    </div>
    <div>
      <img src={pokemon.sprites.front_default ?? ''} alt='' />
    </div>
    <div className={styles.card_info}>
      <div>
        <div className={styles.card_info_title}>Stats</div>
        <ul>
          {pokemon.stats.map((stat) => (
            <li className={styles.card_info_item}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className={styles.card_info_title}>Abilities</div>
        <ul>
          {pokemon.abilities.map(({ ability }) => (
            <li className={styles.card_info_item}>{ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
