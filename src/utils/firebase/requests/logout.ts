import { signOut } from 'firebase/auth';

import { auth } from '../instance';

export const logout = () => signOut(auth);
