import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, PokemonStats, PokemonEvolutionChain } from '@common';
import { useRequestPokemonSpeciesQuery, useRequestPokemonByIdQuery } from '@utils/api';
import { getPokemonId } from '@utils/helpers';

import styles from './PokemonPage.module.css';

export const PokemonPage: React.FC = () => {
  const navigate = useNavigate();
  const { pokemonId } = useParams();
  const id = +(pokemonId as string);

  const { data: pokemonData, isLoading: pokemonLoading } = useRequestPokemonByIdQuery({
    id
  });
  const { data: pokemonSpeciesData, isLoading: pokemonSpeciesLoading } =
    useRequestPokemonSpeciesQuery({
      id
    });

  const isPokemonData = !!pokemonData && !pokemonLoading;
  const isPokemonSpeciesData = !!pokemonSpeciesData && !pokemonSpeciesLoading;

  console.log('!isPokemonData || !isPokemonSpeciesData', isPokemonData, isPokemonSpeciesData);
  if (!isPokemonData || !isPokemonSpeciesData) return null;

  const chainId = pokemonSpeciesData!.data.evolution_chain.url
    .replace('https://pokeapi.co/api/v2/evolution-chain/', '')
    .replace('/', '');

  return (
    <div className={styles.page}>
      {isPokemonData && (
        <>
          <div className={styles.name_container}>
            <div className={styles.number}>{getPokemonId(id)}</div>
            <div>{pokemonData.data.name}</div>
          </div>

          <div className={styles.content}>
            <div className={styles.image_container}>
              <img src={pokemonData.data.sprites.front_default ?? ''} alt='' />
            </div>

            <PokemonStats
              title='Stats'
              stats={pokemonData.data.stats.map((item) => `${item.stat.name}: ${item.base_stat}`)}
            />
            <PokemonStats
              title='Abilities'
              stats={pokemonData.data.abilities.map(({ ability }) => ability.name)}
            />
          </div>
        </>
      )}
      <PokemonEvolutionChain chainId={+chainId} pokemonName={pokemonData.data.name} />
      <div className={styles.button_container}>
        {id > 1 && (
          <Button variant='outlined' onClick={() => navigate(`/pokemon/${id - 1}`)}>
            Back
          </Button>
        )}
        <Button onClick={() => navigate(`/pokemon/${id + 1}`)}>Next</Button>
      </div>
    </div>
  );
};
