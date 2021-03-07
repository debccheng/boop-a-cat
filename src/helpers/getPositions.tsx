
import getRandomInt from './getRandomInt';

const getPositions = (totalPositions: Array<number>): Array<number> => {
  const positions: Array<number> = [];
  const popupMax: number = getRandomInt(1, Math.floor(totalPositions.length/2));
  while (positions.length < popupMax) {
    const position: number = getRandomInt(1, 9)
    if (positions.includes(position)) {
      continue;
    } else {
      positions.push(position);
    }
  }
  return positions;
};

export default getPositions;
