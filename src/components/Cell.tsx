import React, { useState } from 'react';
import cat from '../assets/cat.png';
import pettedCat from '../assets/cat_petted.png';
import box from '../assets/box.png'

const Cell = ({ popup, id }: { popup: number, id: number }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setClicked(true);
    const catImg: Element = document.getElementsByClassName('cat')[0];
    if (catImg) {
      const top = window.getComputedStyle(catImg).getPropertyValue('top');
      console.log(top);
      catImg.setAttribute("style", `top: ${top}`);
    }
  };

  return (
    <div className="cell" id={`cell-${id}`}>
      <div className="media" onClick={handleClick}>
        {popup === id
          ?
          <img
            src={clicked ? pettedCat : cat}
            alt="cat"
            className={`cat ${clicked? 'catOut' : null}`}
          />
          :
          null
        }
        <img src={box} alt="box" className="box" />
      </div>
    </div>
  );
}

export default Cell;
