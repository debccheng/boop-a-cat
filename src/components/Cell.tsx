import React, { useState } from 'react';
import cat from '../assets/cat.png';
import clickedCat from '../assets/cat_petted.png';
import box from '../assets/box.png'

const Cell = ({
  popup,
  id,
  clicked,
  escaped,
  handleClick,
  setEscaped }:
  {
    popup: number,
    id: number,
    clicked: boolean,
    escaped: boolean,
    handleClick: () => void,
    setEscaped: React.Dispatch<React.SetStateAction<boolean>>
  }) => {

  const animateBox = {
    "WebkitAnimation": "shake 0.4s linear both",
    "animation": "shake 0.4s linear both"
  };

  setTimeout(() => {
    setEscaped(true);
  }, 2500);

  return (
    <div className="cell" id={`cell-${id}`}>
      <div className="media" >
        {popup === id
          ?
          <>
          {console.log(escaped)}
          <img
            src={clicked ? clickedCat : cat}
            alt="cat"
            className={`cat ${clicked ? 'catOut' : null} ${escaped ? 'catEscape' : null}`}
            onClick={handleClick}
          />
          </>
          :
          null
        }
        <img
          src={box}
          alt="box"
          className="box"
          style={popup === id ? animateBox : undefined}
        />
      </div>
    </div>
  );
}

export default Cell;
