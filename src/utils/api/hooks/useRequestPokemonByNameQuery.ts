import { useQuery } from '@tanstack/react-query';

import { requestPokemonByName } from '../requests';

interface UseRequestPokemonQueryByNameParams {
  name: string;
}

export const useRequestPokemonByNameQuery = (
  params: RequestParams<UseRequestPokemonQueryByNameParams>,
  settings?: RequestQuerySettings<typeof requestPokemonByName>
) =>
  useQuery(
    ['pokemon', params.name],
    () => requestPokemonByName({ params, ...(settings?.config && { config: settings.config }) }),
    settings?.options && settings.options
  );
