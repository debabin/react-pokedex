import { User } from 'firebase/auth';

export const getUserFieldsFromFireBase = (user: User) => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  photoURL: user.photoURL,
  phoneNumber: user.phoneNumber
});
