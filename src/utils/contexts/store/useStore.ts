import React from 'react';

import { Store, StoreContext } from './StoreContext';

export const useStore = () => {
  const { setStore, ...storeContext } = React.useContext(StoreContext);

  return {
    setStore: (data: Partial<Store>) => setStore({ ...storeContext.store, ...data }),
    ...storeContext.store
  };
};
