export const makeTwoDigit = (value: number) => {
  return value.toString().padStart(2, "0");
};

export const isOver = (countdown: [hour: number, minutes: number, seconds: number]) => {
  const sum = countdown.reduce((acc: number, curr: number) => acc + curr);
  return sum === 0;
};
