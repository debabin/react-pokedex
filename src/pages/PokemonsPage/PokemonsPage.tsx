import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, PokemonStats, PokemonTypes } from '@common';
import { useRequestPokemonByIdQuery, useRequestPokemonInfiniteQuery } from '@utils/api';
import { useStore } from '@utils/contexts';
import { useAddDocumentMutation, useUserPokemonsCollection } from '@utils/firebase';
import { getPokemonId } from '@utils/helpers';
import { useInView } from '@utils/hooks';

import styles from './PokemonsPage.module.css';

interface PokemonInfoProps {
  id: Pokemon['id'];
  onClose: () => void;
}

export const PokemonInfo: React.FC<PokemonInfoProps> = ({ id, onClose }) => {
  const { session, user } = useStore();
  const userPokemonsCollection = useUserPokemonsCollection({ uid: user.uid });
  const addDocumentMutation = useAddDocumentMutation({
    options: {
      onSuccess: () => {
        onClose();
      }
    }
  });

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

        {session.isLoginIn &&
          userPokemonsCollection.documents &&
          userPokemonsCollection.documents.length < 6 && (
            <Button
              loading={addDocumentMutation.isLoading}
              onClick={() =>
                addDocumentMutation.mutate({
                  collection: 'pokemons',
                  data: { id: pokemon.id, name: pokemon.name, uid: user.uid }
                })
              }
            >
              ADD TO TEAM
            </Button>
          )}
        <Button onClick={() => navigate(`/pokemon/${id}`)}>OPEN</Button>
      </div>
    </div>
  );
};

export const PokemonsPage: React.FC = () => {
  const [pokemonId, setPokemonId] = React.useState<Pokemon['id'] | null>(null);
  // const ref: any = React.useRef<HTMLDivElement>();
  const { isInView, ref } = useInView();
  const { data, fetchNextPage, isLoading, hasNextPage } = useRequestPokemonInfiniteQuery();

  React.useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage();
    }
  }, [isInView, data]);

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
      </div>
      <div ref={ref} />
    </div>
  );
};
