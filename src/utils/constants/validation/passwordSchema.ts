import { maxLength, minLength, required } from './rules';

export const passwordSchema = {
  required,
  minLength: minLength(2),
  maxLength: maxLength(15)
};
