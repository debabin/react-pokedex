import { useQuery } from 'react-query';

import { requestPokemon } from '../../../requests';

interface UseRequestPokemonQueryParams {
  id: number;
}

export const useRequestPokemonQuery = ({
  params
}: RequestQueryParams<UseRequestPokemonQueryParams>) =>
  useQuery(['pokemon', params.id], () => requestPokemon({ params }));
