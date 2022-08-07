import { User } from 'firebase/auth';
import React from 'react';

export type Store = {
  session: {
    isLoginIn: boolean;
  };
  user: User;
};

export interface StoreContextProps {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
}

export const INITIAL_STORE = {
  session: {
    isLoginIn: false
  },
  user: {} as User
};

export const StoreContext = React.createContext<StoreContextProps>({
  store: INITIAL_STORE,
  setStore: () => {}
});
