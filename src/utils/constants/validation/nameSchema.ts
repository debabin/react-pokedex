import { minLength, required } from './rules';

export const nameSchema = {
  required,
  minLength: minLength(2)
};
