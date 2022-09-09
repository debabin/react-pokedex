import classnames from 'classnames';

import { KEYS } from '@utils/constants';

import styles from './Burger.module.css';

interface BurgerProps {
  onClick: () => void;
  isActive: boolean;
}

export const Burger: React.FC<BurgerProps> = ({ onClick, isActive }) => (
  <div
    tabIndex={0}
    role='button'
    onKeyPress={(event) => {
      if (event.key === KEYS.ENTER) onClick();
    }}
    onClick={onClick}
    className={classnames(styles.burger, { [styles.active]: isActive })}
  >
    <div />
    <div />
    <div />
  </div>
);
