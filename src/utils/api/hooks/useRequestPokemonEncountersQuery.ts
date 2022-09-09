import { useQuery } from '@tanstack/react-query';

import { requestPokemonEncounters } from '../requests';

interface UseRequestPokemonEncountersQuery {
  id: Pokemon['id'];
}

export const useRequestPokemonEncountersQuery = (
  params: RequestParams<UseRequestPokemonEncountersQuery>,
  settings: RequestQuerySettings<typeof requestPokemonEncounters>
) =>
  useQuery(
    ['evolution-chain', params.id],
    () =>
      requestPokemonEncounters({ params, ...(settings?.config && { config: settings.config }) }),
    settings?.options && settings.options
  );
