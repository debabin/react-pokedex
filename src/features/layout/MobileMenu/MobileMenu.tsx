import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button, Divider, Typography, UserCard } from '@common';
import { ROUTES } from '@utils/constants';
import { INITIAL_STORE, useStore } from '@utils/contexts';
import { useLogoutMutation } from '@utils/firebase';

import { Burger } from '../Header/components/Burger/Burger';

import styles from './MobileMenu.module.css';

export const MobileMenu = () => {
  const { user, setStore } = useStore();
  const location = useLocation();
  const logoutMutation = useLogoutMutation();
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className={styles.mobile_header_container}>
      <div className={styles.mobile_header}>
        <Typography variant='title'>{location.pathname.replace('/', '')}</Typography>
        <Burger isActive={isActive} onClick={() => setIsActive(!isActive)} />
      </div>

      {isActive && (
        <div className={styles.navmenu}>
          <UserCard user={user} />
          <Divider title='NAVIGATION' />
          <div>
            <ul aria-hidden onClick={() => setIsActive(false)} className={styles.navigation}>
              <li>
                <Typography variant='title-regular'>
                  <Link to={ROUTES.POKEMONS}>Pokemons</Link>
                </Typography>
              </li>
              <li>
                <Typography variant='title-regular'>
                  <Link to={ROUTES.POKEDEX}>Pokedex</Link>
                </Typography>
              </li>
              <li>
                <Typography variant='title-regular'>
                  <Link to={ROUTES.PROFILE}>Profile</Link>
                </Typography>
              </li>
              <li>
                <Typography variant='title-regular'>
                  <Link to={ROUTES.SETTINGS}>Settings</Link>
                </Typography>
              </li>
            </ul>
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
      )}
    </div>
  );
};
