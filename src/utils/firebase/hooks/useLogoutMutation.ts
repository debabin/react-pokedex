import { useMutation } from '@tanstack/react-query';

import { logout } from '../requests';

export const useLogoutMutation = (settings?: RequestMutationSettings<typeof logout>) =>
  useMutation(['logoutMutation'], () => logout(), settings?.options && settings.options);
