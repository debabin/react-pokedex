import classnames from 'classnames';
import React from 'react';

import styles from './Button.module.css';

type ButtonVariant = 'contained' | 'outlined';
interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  isLoading = false,
  ...props
}) => {
  const classes = classnames(styles.button, styles[variant]);

  return (
    <button className={classes} disabled={isLoading} {...props}>
      {!isLoading && children}
      {isLoading && <div className={styles['dot-flashing']} />}
    </button>
  );
};
