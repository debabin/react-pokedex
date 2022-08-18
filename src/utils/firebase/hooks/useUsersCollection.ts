import { User } from 'firebase/auth';
import { collection, query, where } from 'firebase/firestore';

import { database } from '../instance';

import { UserDocument } from './useAddDocumentMutation';
import { useCollection } from './useCollection';

interface UseUserPokemonsCollectionParams {
  uid: User['uid'];
}

export const useUsersCollection = ({ uid }: UseUserPokemonsCollectionParams) => {
  const q = query<$TSFixMe>(collection(database, 'users'), where('uid', '==', uid));

  return useCollection<UserDocument>(q);
};
