import React from 'react';
import { useParams } from 'react-router-dom';

import { useRequestPokemonQuery } from '@utils/api';

export const PokemonPage: React.FC = () => {
  const params = useParams();
  const { data } = useRequestPokemonQuery({ params: { id: +(params.pokemonId as string) } });
  console.log('@', data);

  return <div className='container'>{data?.data.name}</div>;
};
