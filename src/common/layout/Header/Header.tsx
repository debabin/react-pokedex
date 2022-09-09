import { DesktopHeader } from './components/DesktopHeader/DesktopHeader';
import { MobileMenu } from './components/MobileMenu/MobileMenu';

import styles from './Header.module.css';

export const Header = () => (
  <div className={styles.header}>
    <div className={styles.header_container}>
      <MobileMenu />
      <DesktopHeader />
    </div>
  </div>
);
