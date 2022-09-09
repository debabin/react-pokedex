import { useQuery } from '@tanstack/react-query';

import { requestPokemonSpecies } from '../requests';

interface UseRequestPokemonSpeciesQueryParams {
  id: Pokemon['id'];
}

export const useRequestPokemonSpeciesQuery = (
  params: RequestParams<UseRequestPokemonSpeciesQueryParams>,
  settings?: RequestQuerySettings<typeof requestPokemonSpecies>
) =>
  useQuery(
    ['pokemon-species', params.id],
    () => requestPokemonSpecies({ params, ...(settings?.config && { config: settings.config }) }),
    settings?.options && settings.options
  );
