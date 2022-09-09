import classnames from 'classnames';

import { Button, PokemonShortCard, Spinner, Typography, UserCard } from '@common';
import { INITIAL_STORE, useStore } from '@utils/contexts';
import { useAuthState, useLogoutMutation } from '@utils/firebase';

import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  const { setStore } = useStore();
  const authState = useAuthState();
  const logoutMutation = useLogoutMutation();

  if (!authState.data) return <Spinner />;
  const user = authState.data;

  return (
    <div className={classnames('page', styles.profile_container)}>
      <UserCard user={user} />
      <div>
        <Typography variant='title'>Team</Typography>
        <div className={styles.team}>
          {user.pokemons.map((pokemon) => (
            <PokemonShortCard key={pokemon.id} name={pokemon.name} />
          ))}
        </div>
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
