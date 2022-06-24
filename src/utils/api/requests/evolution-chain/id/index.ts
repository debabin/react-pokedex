import { AxiosRequestConfig } from 'axios';

import { api } from '../../../instance';

interface RequestEvolutionChainParams {
  params: { id: number };
  config?: AxiosRequestConfig;
}

export const requestEvolutionChain = ({ params, config }: RequestEvolutionChainParams) =>
  api.get<Pokemon>(`evolution-chain/${params.id}`, { ...config });
