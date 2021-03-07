import getRandomInt from './getRandomInt';

const getRandomTime = (min: number, max: number): Array<number> => {
  let num1: number = 0;
  let num2: number = 0;

  while (num1 - num2 < 800 || num1 < num2) {
    num1 = getRandomInt(min, max);
    num2 = getRandomInt(min, max);
  }
  return [num1, num2];
}

export default getRandomTime;
