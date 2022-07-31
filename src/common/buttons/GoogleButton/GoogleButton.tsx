import { ReactComponent as GoogleIcon } from '@assets/img/icons/google.svg';

import { Button, ButtonProps } from '../Button/Button';

type GoogleButtonProps = ButtonProps;

export const GoogleButton: React.FC<GoogleButtonProps> = ({ children, ...props }) => (
  <Button {...props} variant='text' startIcon={<GoogleIcon />}>
    {children}
  </Button>
);
