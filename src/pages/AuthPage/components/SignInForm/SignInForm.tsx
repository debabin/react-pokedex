import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from '@common';
import { AUTH_COOKIE, emailSchema, passwordSchema, ROUTES } from '@utils/constants';
import { useStore } from '@utils/contexts';
import { useLogInWithEmailAndPasswordMutation } from '@utils/firebase';
import { setCookie } from '@utils/helpers';

import styles from '../../AuthPage.module.css';

interface SignInFormValues {
  email: User['email'];
  password: string;
}

export const SignInForm: React.FC = () => {
  const { setStore } = useStore();
  const navigate = useNavigate();

  const { mutate: logInWithEmailAndPasswordMutate, isLoading: logInWithEmailAndPasswordIsLoding } =
    useLogInWithEmailAndPasswordMutation({
      options: {
        onSuccess: ({ user }) => {
          setCookie(AUTH_COOKIE, user.uid);
          setStore({ session: { isLoginIn: true }, user });
          navigate(ROUTES.POKEMONS);
        }
      }
    });

  const { register, handleSubmit, formState } = useForm<SignInFormValues>({ mode: 'onBlur' });
  const { isSubmitting, errors } = formState;
  const isLoading = isSubmitting || logInWithEmailAndPasswordIsLoding;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(async ({ password, email }) =>
        logInWithEmailAndPasswordMutate({
          email,
          password
        })
      )}
    >
      <h1 className={styles.title}>Login</h1>
      <Input
        {...register('email', emailSchema)}
        disabled={isLoading}
        placeholder='email'
        error={errors.email?.message}
      />
      <Input
        type='password'
        {...register('password', passwordSchema)}
        disabled={isLoading}
        placeholder='password'
        error={errors.password?.message}
      />

      <Button type='submit' variant='contained' loading={isLoading}>
        OK
      </Button>
    </form>
  );
};
