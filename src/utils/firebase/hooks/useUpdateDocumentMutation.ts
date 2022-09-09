import { useMutation } from '@tanstack/react-query';

import { Collection } from '../instance';
import { updateDocument } from '../requests';

interface UseUpdateDocumentPokemonMutationParams {
  collection: Extract<Collection, 'pokemons'>;
  data: Partial<PokemonDocument>;
  id: string;
}

interface UseUpdateDocumentUserMutationParams {
  collection: Extract<Collection, 'users'>;
  data: Partial<UserDocument>;
  id: string;
}

type UseUpdateDocumentMutationParams =
  | UseUpdateDocumentPokemonMutationParams
  | UseUpdateDocumentUserMutationParams;

export const useUpdateDocumentMutation = (
  settings?: RequestMutationSettings<typeof updateDocument>
) =>
  useMutation(
    ['updateDocumentMutation'],
    (params: RequestParams<UseUpdateDocumentMutationParams>) =>
      updateDocument(params.collection, params.data, params.id),
    settings?.options && settings.options
  );
