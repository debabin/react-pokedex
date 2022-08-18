import { doc, DocumentData, WithFieldValue, updateDoc } from 'firebase/firestore';

import { Collection, database } from '../instance';

export const updateDocument = async <T extends WithFieldValue<DocumentData>>(
  collection: Collection,
  data: T,
  id: string
) => {
  const documentRef = doc(database, collection, id);
  console.log('@', documentRef, id);

  await updateDoc(documentRef, data);

  return data;
};
