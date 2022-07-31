import React from 'react';

import { useStore } from '@utils/contexts';

import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  const { profile } = useStore();

  return (
    <div className={styles.page}>
      <div>name: {profile.displayName}</div>
      <div>uid: {profile.uid}</div>
      <div>email: {profile.email}</div>
      <img src={profile.photoURL} alt='photoURL' />
    </div>
  );
};
