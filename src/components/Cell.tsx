import React from 'react';
import cat from '../assets/cat.png';
import clickedCat from '../assets/cat_petted.png';
import box from '../assets/box.png'

const Cell = ({
  popup,
  id,
  clicked,
  escaped,
  handleClick,
}:
  {
    popup: boolean,
    id: number,
    clicked: Array<number>,
    escaped: Array<number>,
    handleClick: (e: any) => void,
  }) => {

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
                  ${escaped.includes(id) ? 'catEscape' : null}
                `}
                onClick={clicked.includes(id) ? undefined : handleClick}
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
