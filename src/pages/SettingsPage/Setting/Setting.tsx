import React from 'react';

import { IconButton, Typography } from '@common';
import { ArrowRigthIcon } from '@common/icons';

import styles from './Setting.module.css';

interface SettingProps {
  label: string;
  value: string;
  onClick?: () => void;
}

export const Setting: React.FC<SettingProps> = ({ label, value, onClick }) => (
  <div className={styles.setting}>
    <div>
      <Typography variant='sub-body'>{label}</Typography>
      <Typography variant='title-body'>{value}</Typography>
    </div>
    {onClick && <IconButton variant='icon' icon={<ArrowRigthIcon />} onClick={onClick} />}
  </div>
);
