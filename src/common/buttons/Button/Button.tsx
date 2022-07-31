import classnames from 'classnames';
import React from 'react';

import styles from './Button.module.css';

type ButtonVariant = 'contained' | 'outlined' | 'text';
export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  startIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  disabled,
  startIcon,
  isLoading = false,
  ...props
}) => {
  const classes = classnames(styles.button, styles[variant]);

  return (
    <button className={classes} disabled={isLoading || disabled} {...props}>
      {!!startIcon && <span className={styles.startIcon}>{startIcon}</span>}
      {!isLoading && children}
      {isLoading && <div className={styles['dot-flashing']} />}
    </button>
  );
};
