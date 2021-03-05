import React, { useEffect, useState } from 'react';
import Cell from './Cell';

const Game = () => {
  const [WidthMoreThanHeight, setWidthMoreThanHeight] = useState<boolean>(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= window.innerHeight) {
        setWidthMoreThanHeight(true);
      } else {
        setWidthMoreThanHeight(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const positions: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [popupPosition, setPopupPosition] = useState(getRandomInt(1, 9));

  return (
    <div
      className="grid"
      style={WidthMoreThanHeight ? { width: '40vw', height: '40vw' } : { width: '40vh', height: '40vh' }}
    >
      {console.log(WidthMoreThanHeight)}
      {positions.map((position) =>
        <Cell key={position} id={position} popup={popupPosition}/>
      )}
    </div>
  );
}

export default Game;
