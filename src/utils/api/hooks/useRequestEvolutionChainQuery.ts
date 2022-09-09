import { useQuery } from '@tanstack/react-query';

import { requestEvolutionChain } from '../requests';

interface UseRequestEvolutionChainQueryParams {
  id: Pokemon['id'];
}

export const useRequestEvolutionChainQuery = (
  params: RequestParams<UseRequestEvolutionChainQueryParams>,
  settings?: RequestQuerySettings<typeof requestEvolutionChain>
) =>
  useQuery(
    ['evolution-chain', params.id],
    () => requestEvolutionChain({ params, ...(settings?.config && { config: settings.config }) }),
    settings?.options && settings.options
  );
