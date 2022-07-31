import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../instance';

export const registerWithEmailAndPassword = async (user: User, password: string) => {
  const response = await createUserWithEmailAndPassword(auth, user.email, password);

  // await addDoc(collection(db, 'users'), {
  //   uid: response.user.uid,
  //   ...user,
  //   authProvider: 'local'
  // });

  return response;
};
