import { User } from 'firebase/auth';
import { collection, orderBy, Query, query, where } from 'firebase/firestore';

import { database } from '../instance';

import { useCollection } from './useCollection';

interface UseUserPokemonsCollectionParams {
  uid: User['uid'];
}

export const useUserPokemonsCollection = ({ uid }: UseUserPokemonsCollectionParams) => {
  const q = query(
    collection(database, 'pokemons'),
    orderBy('name'),
    where('uid', '==', uid)
  ) as Query<PokemonDocument>;

  return useCollection<PokemonDocument>(q);
};
