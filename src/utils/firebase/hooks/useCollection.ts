import { onSnapshot, Query } from 'firebase/firestore';
import React from 'react';

import { usePromise } from '../../hooks/usePromise';

export const useCollection = <T>(query: Query<T>) => {
  const { data, setData, isLoading, isError, setError, error } = usePromise<T[]>();

  React.useEffect(() => {
    const unsub = onSnapshot(
      query,
      (querySnapshot) => {
        const data: T[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });

        setData(data);
      },
      (error) => setError(error.message)
    );

    return () => unsub();
  }, []);

  return { data, isLoading, isError, error };
};
