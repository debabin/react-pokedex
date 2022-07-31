import { minLength, required } from './rules';

export const citySchema = {
  required,
  minLength: minLength(2)
};
