import React, { useMemo } from 'react';

import { Button, PokemonStats } from '@common';
import { useRequestEvolutionChainQuery } from '@utils/api';

import { PokemonEvolutionChainItem } from './PokemonEvolutionChainItem/PokemonEvolutionChainItem';

import styles from './PokemonEvolutionChain.module.css';

interface PokemonEvolutionChainProps {
  chainId: number;
  pokemonName: Pokemon['name'];
}

const generatePokemonChain = (pokemonName: string, chainLink: ChainLink): any => {
  if (chainLink.species.name === pokemonName)
    return { prev: null, current: chainLink, next: chainLink.evolves_to };

  let chain;
  for (let i = 0; i < chainLink.evolves_to.length; i += 1) {
    const evolve = chainLink.evolves_to[i];
    if (evolve.species.name === pokemonName) {
      chain = { prev: chainLink, current: evolve, next: evolve.evolves_to };
      break;
    }

    chain = generatePokemonChain(pokemonName, evolve);
  }

  return chain;
};

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
          <div className='title'>Previos evolution</div>
          <div className={styles.evolutions_container}>
            <PokemonEvolutionChainItem name={pokemonChain.prev.species.name} />{' '}
          </div>
        </>
      )}
      {!!pokemonChain.next.length && (
        <>
          <div className='title'>Next evolution(s)</div>
          <div className={styles.evolutions_container}>
            {pokemonChain.next.map((evolution: any) => (
              <PokemonEvolutionChainItem
                key={evolution.species.name}
                name={evolution.species.name}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
