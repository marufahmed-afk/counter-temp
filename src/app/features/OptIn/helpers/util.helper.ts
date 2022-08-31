export const makeTwoDigit = (value: number) => {
  return value.toString().padStart(2, '0');
};
