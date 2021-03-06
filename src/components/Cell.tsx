import React from 'react';
import cat from '../assets/cat.png';
import clickedCat from '../assets/cat_petted.png';
import box from '../assets/box.png'
import { CellProps } from '../types/types';

const Cell: React.FC<CellProps> = ({ popup, id, clicked, escaped, handleClick, timesup }) => {
  const animateBox = {
    "animation": "shake 0.4s linear both"
  };

  return (
    <>
      <div className="cell" id={`cell-${id}`}>
        <div className="media" >
          {popup
            ?
            <>
              <img
                id={`cat-${id}`}
                src={clicked.includes(id) ? clickedCat : cat}
                alt="cat"
                className={
                  `cat
                  ${clicked.includes(id) ? 'catOut' : null}
                  ${escaped.includes(id) && !timesup ? 'catEscape' : null}
                `}
                onClick={!clicked.includes(id) && !timesup ? handleClick : undefined}
              />
            </>
            :
            null
          }
          <img
            id={`box-${id}`}
            src={box}
            alt="box"
            className="box"
            style={popup ? animateBox : undefined}
          />
        </div>
      </div>
    </>
  );
}

export default Cell;
