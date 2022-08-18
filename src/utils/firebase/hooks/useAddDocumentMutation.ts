import { useMutation } from '@tanstack/react-query';

import { Collection } from '../instance';
import { addDocument } from '../requests';

export interface UserDocument extends User {}

export interface PokemonDocument {
  uid: User['uid'];
  name: Pokemon['name'];
  id: Pokemon['id'];
}

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
