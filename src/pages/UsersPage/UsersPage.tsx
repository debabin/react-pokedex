import { UserCard } from '@common';
import { useUsersCollection } from '@utils/firebase';

import styles from './UsersPage.module.css';

export const UsersPage = () => {
  const usersCollection = useUsersCollection();

  if (usersCollection.isLoading || !usersCollection.data) return null;
  const { data: users } = usersCollection;

  return (
    <div className='page'>
      <div className={styles.users}>
        {users.map((user) => (
          <UserCard user={user} />
        ))}
      </div>
    </div>
  );
};
