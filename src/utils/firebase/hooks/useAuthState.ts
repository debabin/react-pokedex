import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React from 'react';

import { usePromise } from '@utils/hooks';

import { auth, database } from '../instance';

export const useAuthState = () => {
  const { isLoading, setIsLoading, isError, setError, error, setData, data } = usePromise<User>();

  React.useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      if (!user) return setIsLoading(false);
      const q = query(collection(database, 'users'), where('uid', '==', user?.uid));

      const unsub = onSnapshot(
        q,
        (querySnapshot) => {
          const data: User[] = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data() as User);
          });

          setData(data[0]);
          setIsLoading(false);
        },
        (error) => setError(error.message)
      );

      return () => unsub();
    });

    return () => {
      listener();
    };
  }, [auth]);

  return { data, isLoading, isError, error };
};
