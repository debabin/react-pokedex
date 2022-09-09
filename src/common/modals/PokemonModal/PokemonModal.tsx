import React from 'react';

import type { ModalProps } from '../Modal/Modal';
import { Modal } from '../Modal/Modal';

import { PokemonModalContent } from './PokemonModalContent/PokemonModalContent';

interface PokemonModalProps extends Omit<ModalProps, 'children' | 'loading'> {
  pokemonId: Pokemon['id'] | null;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({ pokemonId, onClose, ...props }) => (
  <Modal {...props} onClose={onClose}>
    {pokemonId && <PokemonModalContent pokemonId={pokemonId} onClose={onClose} />}
  </Modal>
);
