import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from '@common';
import { emailSchema, passwordSchema, ROUTES } from '@utils/constants';
import { useStore } from '@utils/contexts';
import { useLogInWithEmailAndPasswordMutation } from '@utils/firebase';

import styles from '../../AuthPage.module.css';

interface SignInFormValues {
  email: string;
  password: string;
}

export const SignInForm: React.FC = () => {
  const { setStore } = useStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<SignInFormValues>({ mode: 'onBlur' });
  const logInWithEmailAndPassword = useLogInWithEmailAndPasswordMutation({
    options: {
      onSuccess: () => {
        setStore({ session: { isLoginIn: true } });
        navigate(ROUTES.POKEMONS);
      }
    }
  });

  const { isSubmitting, errors } = formState;
  const loading = isSubmitting || logInWithEmailAndPassword.isLoading;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(async ({ password, email }) =>
        logInWithEmailAndPassword.mutate({
          email,
          password
        })
      )}
    >
      <h1 className={styles.title}>Login</h1>
      <Input
        {...register('email', emailSchema)}
        disabled={loading}
        placeholder='email'
        error={errors.email?.message}
      />
      <Input
        type='password'
        {...register('password', passwordSchema)}
        disabled={loading}
        placeholder='password'
        error={errors.password?.message}
      />

      <Button type='submit' variant='contained' loading={loading}>
        OK
      </Button>
    </form>
  );
};
