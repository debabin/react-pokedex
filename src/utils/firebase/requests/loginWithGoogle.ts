import { getAuth, GoogleAuthProvider,signInWithPopup } from 'firebase/auth';

import { auth,googleProvider } from '../instance';

export const loginWithGoogle = async () => {
  const response = await signInWithPopup(auth, googleProvider);

  return response;
};
