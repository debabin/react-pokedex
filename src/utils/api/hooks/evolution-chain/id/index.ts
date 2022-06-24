import { useQuery } from 'react-query';

import { requestEvolutionChain } from '../../../requests';

interface UseRequestPokemonFromQueryParams {
  id: number;
}

export const useRequestEvolutionChainQuery = ({
  params,
  config
}: RequestQueryParams<UseRequestPokemonFromQueryParams>) =>
  useQuery(['evolution-chain', params.id], () => requestEvolutionChain({ params }), config);
