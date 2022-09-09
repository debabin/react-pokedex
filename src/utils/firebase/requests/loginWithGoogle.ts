import { signInWithPopup } from 'firebase/auth';

import { getUserFieldsFromFireBase } from '@utils/helpers';

import { auth, googleProvider } from '../instance';

import { addDocument } from './addDocument';
import { checkDocumentExist } from './checkDocumentExist';

export const loginWithGoogle = async () => {
  const response = await signInWithPopup(auth, googleProvider);
  const userExist = await checkDocumentExist('users', response.user.uid);

  if (!userExist) {
    await addDocument(
      'users',
      { ...getUserFieldsFromFireBase(response.user), pokemons: [] },
      response.user.uid
    );
  }

  return response;
};
