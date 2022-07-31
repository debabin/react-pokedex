import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../instance';

export const logInWithEmailAndPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
