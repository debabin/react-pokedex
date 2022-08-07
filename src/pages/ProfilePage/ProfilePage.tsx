import { collection, orderBy, query, where } from 'firebase/firestore';
import React from 'react';

import { Button } from '@common';
import { PokemonEvolutionChainItem } from '@common/pokemon/PokemonEvolutionChain/PokemonEvolutionChainItem/PokemonEvolutionChainItem';
import { INITIAL_STORE, useStore } from '@utils/contexts';
import { useUserPokemonsCollection, useLogoutMutation } from '@utils/firebase';

import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  const { user, setStore } = useStore();
  const logoutMutation = useLogoutMutation();
  const userPokemonsCollection = useUserPokemonsCollection({ uid: user.uid });

  return (
    <div className={styles.page}>
      <div>name: {user.displayName}</div>
      <div>uid: {user.uid}</div>
      <div>email: {user.email}</div>
      {user.photoURL && <img src={user.photoURL} alt='photoURL' />}
      <Button
        onClick={() => {
          logoutMutation.mutate({});
          setStore(INITIAL_STORE);
        }}
      >
        Logout
      </Button>

      {!!userPokemonsCollection.documents && (
        <>
          <div>Team</div>
          <div>
            {userPokemonsCollection.documents.map((document) => (
              <PokemonEvolutionChainItem name={document.name} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
