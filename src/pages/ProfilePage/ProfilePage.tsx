import { Button, PokemonShortCard, UserCard } from '@common';
import { INITIAL_STORE, useStore } from '@utils/contexts';
import { useUsersCollection, useLogoutMutation, useUserPokemonsCollection } from '@utils/firebase';

import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  const { user, setStore } = useStore();
  const userDocument = useUsersCollection({ uid: user.uid });
  const logoutMutation = useLogoutMutation();
  const userPokemonsCollection = useUserPokemonsCollection({ uid: user.uid });

  if (!userDocument.data) return null;

  console.log('userDocument', userDocument.data[0]);

  return (
    <div className={styles.page}>
      <UserCard user={userDocument.data[0]} />

      <div>
        {!!userPokemonsCollection.data && (
          <>
            <div className='title'>Team</div>
            <div className={styles.team}>
              {userPokemonsCollection.data.map((document) => (
                <PokemonShortCard name={document.name} />
              ))}
            </div>
          </>
        )}
      </div>

      <Button
        onClick={() => {
          logoutMutation.mutate({});
          setStore(INITIAL_STORE);
        }}
      >
        LOGOUT
      </Button>
    </div>
  );
};
