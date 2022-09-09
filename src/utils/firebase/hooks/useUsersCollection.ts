import { collection, Query, query } from 'firebase/firestore';

import { database } from '../instance';

import { useCollection } from './useCollection';

export const useUsersCollection = () => {
  const q = query(collection(database, 'users')) as Query<UserDocument>;

  return useCollection<UserDocument>(q);
};
