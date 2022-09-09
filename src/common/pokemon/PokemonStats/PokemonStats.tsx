import React from 'react';

import styles from './PokemonStats.module.css';

interface PokemonStatsProps {
  title: string;
  stats: string[];
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({ title, stats }) => (
  <div className='card'>
    <div className={styles.title}>{title}</div>
    <ul className={styles.stats}>
      {stats.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  </div>
);
