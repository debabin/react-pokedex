import { AxiosRequestConfig } from 'axios';

import { api } from '../../../instance';

interface RequestPokemonParams {
  params: { id: number };
  config?: AxiosRequestConfig;
}

export const requestPokemonById = ({ params, config }: RequestPokemonParams) =>
  api.get<Pokemon>(`pokemon/${params.id}`, { ...config });
