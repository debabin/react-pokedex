import { FC } from 'react';
import { Link } from 'react-router-dom';

import logo from '@assets/img/pokemon_logo.png';
import { Typography } from '@common';
import { ROUTES } from '@utils/constants';

import { MobileMenu } from '../MobileMenu/MobileMenu';

import { Burger } from './components/Burger/Burger';

import styles from './Header.module.css';

export const Header: FC = () => (
  <div className={styles.header}>
    <div className={styles.header_container}>
      {/* <div className={styles.header_left}> */}
      {/* <img className={styles.header_logo} src={logo} alt='logo' /> */}
      {/* <div className={styles.header_quote}>Gotta Catch Em All!</div> */}
      {/* </div> */}

      <MobileMenu />

      {/* <div className={styles.header_navigation}>
        <Link to={ROUTES.POKEMONS}>Pokemons</Link>
        <Link to={ROUTES.POKEDEX}>Pokedex</Link>
        <Link to={ROUTES.PROFILE}>Profile</Link>
      </div> */}
    </div>
  </div>
);
