import React, { useEffect, useState } from 'react';
import Cell from './Cell';

const Game = () => {

  // Resize Game Grid based on viewport
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

  let [score, setScore] = useState<number>(0);

  // Set animation for escaped cat in child component
  const [escaped, setEscaped] = useState<boolean>(false);

  // Determine random popup
  const getRandomInt = (min: number, max: number, currentNum?: number): number => {
    if (!currentNum) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const num: number = Math.floor(Math.random() * (max - min + 1)) + min;
    return num === currentNum ? getRandomInt(min, max, currentNum) : num;
  }
  const positions: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [popupPosition, setPopupPosition] = useState(getRandomInt(1, 9));

  // Handle clicking on cat
  const [clicked, setClicked] = useState<boolean>(false);
  const handleClick = () => {
    setClicked(true);
    setScore(score += 1);
    const catImg: Element = document.getElementsByClassName('cat')[0];
    if (catImg) {
      const top = window.getComputedStyle(catImg).getPropertyValue('top');
      catImg.setAttribute("style", `top: ${top}`);
    }
  };

  const popCat = () => {
    setPopupPosition(getRandomInt(1, 9, popupPosition));
  }
  const resetClick = () => {
    setClicked(false);
  }
  const resetEscaped = () => {
    setEscaped(false);
  }

  // Game Loop
  useEffect(() => {
    const timer = setTimeout(() => {
      popCat();
      resetClick();
      resetEscaped();
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      <div className="">
        <h2 className="score"> Boop: {score}</h2>
        <h2 className="countdown">Time: </h2>
      </div>
      <div
        className="grid"
        style={WidthMoreThanHeight ? { width: '40vw', height: '40vw' } : { width: '40vh', height: '40vh' }}
      >
        {positions.map((position) =>
          <Cell
            key={position}
            id={position}
            popup={popupPosition}
            clicked={clicked}
            escaped={escaped}
            handleClick={handleClick}
            setEscaped={setEscaped}
          />
        )}
      </div>
    </>
  );
}

export default Game;
