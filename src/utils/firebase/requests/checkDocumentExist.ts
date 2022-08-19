import { doc, getDoc } from 'firebase/firestore';

import { Collection, database } from '../instance';

export const checkDocumentExist = async (collection: Collection, id: string) => {
  const docRef = doc(database, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return true;
  return false;
};
