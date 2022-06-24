export const getPokemonId = (id: number) => {
  const str = id.toString();
  const countOfZeroNumbers = 3 - str.length;

  return `#${'0'.repeat(countOfZeroNumbers)}${id}`;
};
