import {
  addDoc,
  collection as col,
  doc,
  DocumentData,
  setDoc,
  WithFieldValue
} from 'firebase/firestore';

import { Collection, database } from '../instance';

export const addDocument = async <T extends WithFieldValue<DocumentData>>(
  collection: Collection,
  data: T,
  id?: string
) => {
  if (id) {
    const documentRef = doc(database, collection, id);
    await setDoc(documentRef, data);
    return data;
  }

  await addDoc(col(database, collection), data);
  return data;
};
