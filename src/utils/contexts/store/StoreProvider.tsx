import React from 'react';

import { useAuthState } from '@utils/firebase';

import type { StoreContextProps } from './StoreContext';
import { StoreContext } from './StoreContext';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const authState = useAuthState();
  const [store, setStore] = React.useState<StoreContextProps['store']>({
    session: {
      isLoginIn: false
    }
  });

  React.useEffect(() => {
    if (authState.data) {
      setStore({
        ...store,
        session: {
          isLoginIn: true
        }
      });
    }
  }, [authState.data]);

  const value = React.useMemo(
    () => ({
      store,
      setStore
    }),
    [store]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
