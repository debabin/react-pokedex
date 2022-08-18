import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <div className={styles.card}>
    {user.photoURL && <img src={user.photoURL} alt='photoURL' />}

    <div>
      <div className={styles.display_name}>{user.displayName}</div>
      <div className={styles.data}>{user.email}</div>
    </div>
  </div>
);
