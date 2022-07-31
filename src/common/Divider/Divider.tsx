import React from 'react';

import styles from './Divider.module.css';

interface DividerProps {
  title: string;
}

export const Divider: React.FC<DividerProps> = ({ title }) => (
  <div className={styles.container}>
    <div className={styles.line} />
    <span className={styles.title}>{title}</span>
    <div className={styles.line} />
  </div>
);
