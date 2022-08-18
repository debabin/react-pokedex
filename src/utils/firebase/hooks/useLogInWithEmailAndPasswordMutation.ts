import { useMutation } from '@tanstack/react-query';

import { logInWithEmailAndPassword } from '../requests';

interface UseLogInWithEmailAndPasswordMutationParams {
  email: string;
  password: string;
}

export const useLogInWithEmailAndPasswordMutation = (
  settings?: RequestMutationSettings<typeof logInWithEmailAndPassword>
) =>
  useMutation(
    ['logInWithEmailAndPassword'],
    (params: RequestParams<UseLogInWithEmailAndPasswordMutationParams>) =>
      logInWithEmailAndPassword(params.email, params.password),
    settings?.options && settings.options
  );
