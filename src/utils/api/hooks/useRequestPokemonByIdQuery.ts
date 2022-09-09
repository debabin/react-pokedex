import { useQuery } from '@tanstack/react-query';

import { requestPokemonById } from '../requests';

interface UseRequestPokemonQueryByIdParams {
  id: number;
}

export const useRequestPokemonByIdQuery = (
  params: RequestParams<UseRequestPokemonQueryByIdParams>,
  settings?: RequestQuerySettings<typeof requestPokemonById>
) =>
  useQuery(
    ['pokemon', params.id],
    () => requestPokemonById({ params, ...(settings?.config && { config: settings.config }) }),
    settings?.options && settings.options
  );
