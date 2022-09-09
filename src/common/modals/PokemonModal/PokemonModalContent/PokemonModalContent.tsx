import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, ModalProps, PokemonTypes, Spinner, Typography } from '@common';
import { useRequestPokemonByIdQuery } from '@utils/api';
import { useStore } from '@utils/contexts';
import { useAuthState, useUpdateDocumentMutation } from '@utils/firebase';

import styles from './PokemonModalContent.module.css';

interface PokemonModalContentProps extends Pick<ModalProps, 'onClose'> {
  pokemonId: Pokemon['id'];
}

const MAX_USER_POKEMONS = 6;

export const PokemonModalContent: React.FC<PokemonModalContentProps> = ({ pokemonId, onClose }) => {
  const navigate = useNavigate();
  const { session } = useStore();
  const authState = useAuthState();
  const requestPokemonByIdQuery = useRequestPokemonByIdQuery({ id: pokemonId });
  const updateDocumentMutation = useUpdateDocumentMutation({
    options: {
      onSuccess: () => {
        onClose();
      }
    }
  });

  if (requestPokemonByIdQuery.isLoading || !requestPokemonByIdQuery.data?.data || !authState.data)
    return <Spinner />;

  const isShowAddButton =
    session.isLoginIn &&
    authState.data.pokemons.length < MAX_USER_POKEMONS &&
    !authState.data.pokemons.some((pokemon) => pokemonId === pokemon.id);

  const { data: pokemon } = requestPokemonByIdQuery.data;
  const user = authState.data;

  return (
    <div className={styles.pokemon_modal}>
      <Typography variant='title'>{pokemon.name}</Typography>
      <div className={styles.pokemon_image}>
        <img src={pokemon.sprites.front_default ?? ''} alt='' />
      </div>

      <PokemonTypes types={pokemon.types} />

      {isShowAddButton && (
        <Button
          loading={updateDocumentMutation.isLoading}
          onClick={() =>
            updateDocumentMutation.mutate({
              collection: 'users',
              data: {
                pokemons: [
                  ...user.pokemons,
                  { id: pokemon.id, name: pokemon.name, image: pokemon.sprites.front_default }
                ]
              },
              id: user.uid
            })
          }
        >
          ADD TO TEAM
        </Button>
      )}
      <div className={styles.button_container}>
        <Button variant='outlined' onClick={() => navigate(`/pokemon/${pokemonId}`)}>
          OPEN
        </Button>
        <Button onClick={onClose} loading={requestPokemonByIdQuery.isLoading}>
          CLOSE
        </Button>
      </div>
    </div>
  );
};
