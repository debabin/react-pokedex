import { onSnapshot, Query } from 'firebase/firestore';
import React from 'react';

export const useCollection = <T>(query: Query<T>) => {
  const [documents, setDocuments] = React.useState<T[] | null>(null);

  React.useEffect(() => {
    const unsub = onSnapshot(query, (querySnapshot) => {
      const data: T[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setDocuments(data);
    });

    return () => unsub();
  }, []);

  return { documents };
};
