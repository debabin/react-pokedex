import classnames from 'classnames';

import styles from './PokemonType.module.css';

interface PokemonTypeProps {
  type: PokemonType['type'];
}

export const PokemonType: React.FC<PokemonTypeProps> = ({ type }) => (
  <div className={classnames(styles[type.name], styles.type)}>{type.name}</div>
);
