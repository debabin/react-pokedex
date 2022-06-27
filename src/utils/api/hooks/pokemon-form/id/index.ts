import { useQuery } from 'react-query';

import { requestPokemonForm } from '../../../requests';

interface UseRequestPokemonFromQueryParams {
  id: number;
}

export const useRequestPokemonFormQuery = ({
  params,
  config
}: RequestQueryParams<UseRequestPokemonFromQueryParams>) =>
  useQuery(['pokemon-form', params.id], () => requestPokemonForm({ params }), config);
