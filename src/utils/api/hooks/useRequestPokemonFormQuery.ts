import { useQuery } from '@tanstack/react-query';

import { requestPokemonForm } from '../requests';

interface UseRequestPokemonFromQueryParams {
  id: Pokemon['id'];
}

export const useRequestPokemonFormQuery = (
  params: RequestParams<UseRequestPokemonFromQueryParams>,
  settings?: RequestQuerySettings<typeof requestPokemonForm>
) =>
  useQuery(
    ['pokemon-form', params.id],
    () => requestPokemonForm({ params, ...(settings?.config && { config: settings.config }) }),
    settings?.options && settings.options
  );
