import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import { useRequestPokemonInfiniteQuery, useRequestPokemonByIdQuery } from '@utils/api';
import { getPokemonId } from '@utils/helpers';
import { ROUTES } from '@utils/constants';

import styles from './PokemonsPage.module.css';
import { Button, PokemonStats, PokemonTypes } from '@common';

interface PokemonInfoProps {
  id: Pokemon['id'];
  onClose: () => void;
}

export const PokemonInfo: React.FC<PokemonInfoProps> = ({ id, onClose }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useRequestPokemonByIdQuery({ id });

  if (isLoading || !data) return null;

  const { data: pokemon } = data;

  return (
    <div className={styles.pokemon_info}>
      <div className={styles.pokemon_info_container}>
        <div className={styles.pokemon_info_title}>
          <div>
            <div className={styles.pokemon_name}>{pokemon.name}</div>
            <div className={styles.pokemon_number}>{getPokemonId(id)}</div>
          </div>
          <div
            tabIndex={0}
            role='button'
            onKeyPress={(event) => {
              if (event.key === 'Enter') onClose();
            }}
            className={styles.close}
            onClick={() => {
              console.log('@@@');
              onClose();
            }}
          >
            x
          </div>
        </div>
        <div className={styles.pokemon_info_image}>
          <img src={pokemon.sprites.front_default ?? ''} alt='' />
        </div>
        <PokemonTypes types={pokemon.types} />

        <PokemonStats
          title='Stats'
          stats={pokemon.stats.map((item) => `${item.stat.name}: ${item.base_stat}`)}
        />
        <PokemonStats
          title='Abilities'
          stats={pokemon.abilities.map(({ ability }) => ability.name)}
        />

        <Button onClick={() => navigate(`/pokemon/${id}`)}>OPEN</Button>
      </div>
    </div>
  );
};

export const PokemonsPage: React.FC = () => {
  const [pokemonId, setPokemonId] = React.useState<Pokemon['id'] | null>(null);
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isLoading, hasNextPage } = useRequestPokemonInfiniteQuery();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, data]);

  if (isLoading || !data) return null;

  const pokemons = data.pages.reduce(
    (pokemons: NamedAPIResource[], { data }) => [...pokemons, ...data.results],
    []
  );

  return (
    <div className={styles.page}>
      <div className={styles.pokemons_container}>
        {pokemons.map((pokemon, index) => {
          const id = index + 1;

          return (
            <>
              <div
                key={id}
                className={styles.pokemon_container}
                role='button'
                tabIndex={0}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') setPokemonId(id);
                }}
                onClick={() => setPokemonId(id)}
              >
                <div key={index} className={styles.pokemon}>
                  <div className={styles.pokemon_name}>{pokemon.name}</div>
                  <div className={styles.pokemon_number}>{getPokemonId(id)}</div>
                </div>
              </div>
              {pokemonId === id && <PokemonInfo id={id} onClose={() => setPokemonId(null)} />}
            </>
          );
        })}
        <div ref={ref} />
      </div>
    </div>
  );
};
