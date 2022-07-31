import React from 'react';

import { AUTH_COOKIE } from '@utils/constants';
import { getCookie } from '@utils/helpers';

import type { StoreContextProps } from './StoreContext';
import { StoreContext } from './StoreContext';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [store, setStore] = React.useState<StoreContextProps['store']>({
    session: {
      isLoginIn: !!getCookie(AUTH_COOKIE)
    },
    user: {}
  });

  const value = React.useMemo(
    () => ({
      store,
      setStore
    }),
    [store]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
