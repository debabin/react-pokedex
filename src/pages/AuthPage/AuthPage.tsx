import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Divider, GoogleButton } from '@common';
import { ROUTES } from '@utils/constants';
import { useStore } from '@utils/contexts';
import { useLogInWithGoogleMutation } from '@utils/firebase';

import { SignInForm } from './components/SignInForm/SignInForm';
import { SignUpForm } from './components/SignUpForm/SignUpForm';

import styles from './AuthPage.module.css';

export const AuthPage = () => {
  const { setStore } = useStore();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = React.useState(false);

  const { mutate: logInWithGoogleMutate } = useLogInWithGoogleMutation({
    options: {
      onSuccess: () => {
        setStore({ session: { isLoginIn: true } });
        navigate(ROUTES.POKEMONS);
      }
    }
  });

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.images_container}>
          <div className={styles.logo} />
          <div className={styles.cover} />
        </div>

        <div className={styles.content}>
          <div className={styles.form_container}>
            {!isSignUp && <SignInForm />}
            {isSignUp && <SignUpForm />}
            <Button variant='text' onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'already have account' : 'create new account'}
            </Button>
          </div>

          <div className={styles.authWith_container}>
            <Divider title='OR' />
            <GoogleButton onClick={() => logInWithGoogleMutate({})}>Login with GOOGLE</GoogleButton>
          </div>
        </div>
      </div>
    </section>
  );
};
