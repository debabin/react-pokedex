import { useNavigate } from 'react-router-dom';

import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();
  const { pokemons } = user;

  return (
    <div className='card'>
      <div className={styles.content}>
        <div className={styles.body}>
          {user.photoURL && <img src={user.photoURL} alt='photoURL' />}

          <div>
            <div className={styles.display_name}>{user.displayName}</div>
            <div className={styles.data}>{user.email}</div>
          </div>
        </div>

        {!!pokemons.length && (
          <div className={styles.pokemons}>
            {pokemons.map((pokemon) => (
              <div key={pokemon.id} className={styles.pokemon}>
                <div
                  role='button'
                  tabIndex={0}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') return navigate(`/pokemon/${pokemon.id}`);
                  }}
                  onClick={() => navigate(`/pokemon/${pokemon.id}`)}
                >
                  <img src={pokemon.image || ''} alt={pokemon.name} />{' '}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
