import { AxiosRequestConfig } from 'axios';

import { api } from '../../../instance';

interface RequestStatParams {
  params: { id: number };
  config?: AxiosRequestConfig;
}

export const requestStat = ({ params, config }: RequestStatParams) =>
  api.get<PokemonStat>(`stat/${params.id}`, { ...config });
