import { useMutation } from '@tanstack/react-query';

import { Collection } from '../instance';
import { addDocument } from '../requests';

interface UseAddDocumentPokemonMutationParams {
  collection: Extract<Collection, 'pokemons'>;
  data: PokemonDocument;
  id?: string;
}

type UseAddDocumentMutationParams = UseAddDocumentPokemonMutationParams;

export const useAddDocumentMutation = (settings?: RequestMutationSettings<typeof addDocument>) =>
  useMutation(
    ['addDocumentMutation'],
    (params: RequestParams<UseAddDocumentMutationParams>) =>
      addDocument(params.collection, params.data),
    settings?.options && settings.options
  );
