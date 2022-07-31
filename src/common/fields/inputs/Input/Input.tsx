import classnames from 'classnames';
import React from 'react';

import styles from './Input.module.css';

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  isLoading?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = React.forwardRef(
  ({ id, placeholder, error, ...props }, inputRef) => (
    <label htmlFor={id}>
      <div className={styles.label}>{placeholder}</div>
      <input
        className={classnames(styles.input, { [styles.input_error]: !!error })}
        id={id}
        ref={inputRef}
        {...props}
      />
      <span className={styles.error}>{error}</span>
    </label>
  )
);
