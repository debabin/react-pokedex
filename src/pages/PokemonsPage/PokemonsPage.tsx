import React from 'react';

import { PokemonModal, Spinner } from '@common';
import { useRequestPokemonInfiniteQuery } from '@utils/api';
import { KEYS } from '@utils/constants';
import { getPokemonId } from '@utils/helpers';
import { useInView } from '@utils/hooks';

import styles from './PokemonsPage.module.css';

export const PokemonsPage: React.FC = () => {
  const { isInView, ref } = useInView();
  const [selectedPokemonId, setSelectedPokemonId] = React.useState<Pokemon['id'] | null>(null);
  const { data, fetchNextPage, isLoading, hasNextPage } = useRequestPokemonInfiniteQuery();

  React.useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage();
    }
  }, [isInView, data]);

  if (isLoading || !data) return <Spinner />;

  const pokemons = data.pages.reduce(
    (pokemons: NamedAPIResource[], { data }) => [...pokemons, ...data.results],
    []
  );

  return (
    <div className='page'>
      <div className={styles.pokemons_container}>
        {pokemons.map((pokemon, index) => {
          const id = index + 1;

          return (
            <div
              key={id}
              className='card'
              role='button'
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === KEYS.ENTER) setSelectedPokemonId(id);
              }}
              onClick={() => setSelectedPokemonId(id)}
            >
              <div key={index} className={styles.pokemon}>
                <div className={styles.pokemon_name}>{pokemon.name}</div>
                <div className={styles.pokemon_number}>{getPokemonId(id)}</div>
              </div>
            </div>
          );
        })}
      </div>

      <PokemonModal
        isShowing={!!selectedPokemonId}
        pokemonId={selectedPokemonId}
        onClose={() => setSelectedPokemonId(null)}
      />

      <div ref={ref} />
    </div>
  );
};
