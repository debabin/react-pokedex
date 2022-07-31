import React from 'react';

export type Store = {
  session: {
    isLoginIn: boolean;
  };
  user: $TSFixMe;
};

export interface StoreContextProps {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
}

export const StoreContext = React.createContext<StoreContextProps>({
  store: {
    session: {
      isLoginIn: false
    },
    user: {}
  },
  setStore: () => {}
});
