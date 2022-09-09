import React from 'react';

import { Typography } from '@common';
import { useRequestEvolutionChainQuery } from '@utils/api';
import { generatePokemonChain } from '@utils/helpers';

import { PokemonShortCard } from '../PokemonShortCard/PokemonShortCard';

import styles from './PokemonEvolutionChain.module.css';

interface PokemonEvolutionChainProps {
  chainId: number;
  pokemonName: Pokemon['name'];
}

export const PokemonEvolutionChain: React.FC<PokemonEvolutionChainProps> = ({
  chainId,
  pokemonName
}) => {
  const { data: evolutionChainData, isLoading: evolutionChainLoading } =
    useRequestEvolutionChainQuery({
      id: chainId
    });

  const isEvolutionChainData = !!evolutionChainData && !evolutionChainLoading;
  if (!isEvolutionChainData) return null;

  const evolutionChain = evolutionChainData.data.chain;
  const pokemonChain = generatePokemonChain(pokemonName, evolutionChain);

  return (
    <div className={styles.container}>
      {!!pokemonChain.prev && (
        <>
          <Typography variant='title'>Previos evolution</Typography>
          <div className={styles.evolutions_container}>
            <PokemonShortCard name={pokemonChain.prev.species.name} />{' '}
          </div>
        </>
      )}
      {!!pokemonChain.next.length && (
        <>
          <Typography variant='title'>Next evolution(s)</Typography>
          <div className={styles.evolutions_container}>
            {pokemonChain.next.map((evolution: any) => (
              <PokemonShortCard key={evolution.species.name} name={evolution.species.name} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
