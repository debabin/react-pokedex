import { onAuthStateChanged, User } from 'firebase/auth';
import React from 'react';

import { auth } from '../instance';

export const useAuthState = () => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      setUser(user);
    });

    return () => {
      listener();
    };
  }, [auth]);

  return { user };
};
