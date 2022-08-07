import { addDoc, collection as col, DocumentData,WithFieldValue } from 'firebase/firestore';

import { Collection, database } from '../instance';

export const addDocument = <T extends WithFieldValue<DocumentData>>(
  collection: Collection,
  data: T
) => addDoc(col(database, collection), data);
