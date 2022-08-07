import { User } from 'firebase/auth';
import { collection, orderBy, query, where } from 'firebase/firestore';

import { database } from '../instance';

import { PokemonDocument } from './useAddDocumentMutation';
import { useCollection } from './useCollection';

interface UseUserPokemonsCollectionParams {
  uid: User['uid'];
}

export const useUserPokemonsCollection = ({ uid }: UseUserPokemonsCollectionParams) => {
  const q = query<$TSFixMe>(
    collection(database, 'pokemons'),
    orderBy('name'),
    where('uid', '==', uid)
  );
  return useCollection<PokemonDocument>(q);
};
