import { User } from 'firebase/auth';
import React from 'react';

import { useAuthState } from '@utils/firebase';

import type { StoreContextProps } from './StoreContext';
import { StoreContext } from './StoreContext';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const { user } = useAuthState();
  const [store, setStore] = React.useState<StoreContextProps['store']>({
    session: {
      isLoginIn: false
    },
    user: {} as User
  });

  React.useEffect(() => {
    if (user) {
      setStore({
        ...store,
        session: {
          isLoginIn: true
        },
        user
      });
    }
  }, [user]);

  const value = React.useMemo(
    () => ({
      store,
      setStore
    }),
    [store]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
