import React, { useEffect, useReducer } from 'react';
import { InitState, Actions } from '../types/types';
import getPositions from '../helpers/getPositions';
import useViewport from '../helpers/useViewport';
import Cell from './Cell';


const Game2 = () => {
  const resize = useViewport();
  const [state, dispatch] = useReducer<React.Reducer<InitState, Actions>>(reducer, initialState);

  const handleClick = (e: any) => {
    dispatch({ type: 'CAT_TOUCHED' });
    const catID = e.target.id;
    const catTouched: HTMLElement = document.getElementById(catID)!;
    const top: string = window.getComputedStyle(catTouched).getPropertyValue('top');
    catTouched.setAttribute("style", `top: ${top}`);
    const touchedNum: number = parseInt(catID.replace(/\D/g, ''));
    if (!state.catsTouched.includes(touchedNum)) {
      state.catsTouched.push(touchedNum);
      state.touched += 1;
    }
  }

  // Game Loop
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeout(() => {
        dispatch({ type: 'CAT_ESCAPED' })
      }, 4000);
      dispatch({ type: 'CLEANUP' });
      dispatch({ type: 'NEXT' });
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      <div className="stats">
        {JSON.stringify(state)}
        <h2 className="score"> Boop: {state.score}</h2>
        <h2 className="countdown">Time: </h2>
      </div>
      <div
        className="grid"
        style={resize ? { width: '40vw', height: '40vw' } : { width: '40vh', height: '40vh' }}
      >
        {totalPositions.map((position) =>
          <Cell
            key={position}
            id={position}
            popup={state.popupPositions.includes(position)}
            clicked={state.catsTouched}
            escaped={state.catsEscaped}
            handleClick={handleClick}
          />
        )}
      </div>
    </>
  );
}

const totalPositions: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const initialState: InitState = {
  popupPositions: [],
  score: 0,
  missed: 0,
  touched: 0,
  catsEscaped: [],
  catsTouched: [],
};

const reducer: React.Reducer<InitState, Actions> = (state, action) => {
  switch (action.type) {
    case 'CAT_TOUCHED':
      return {
        ...state,
        score: state.score + 1,
      };

    case 'CAT_ESCAPED':
      const cats: HTMLCollection = document.getElementsByClassName('cat')
      const touchedCats: HTMLCollection = document.getElementsByClassName('catOut');
      const touched: Array<number> = [];
      const escaped: Array<number> = [];
      for (let i = 0; i < touchedCats.length; i += 1) {
        const id: string = touchedCats[i].getAttribute("id")!.replace(/\D/g, '');
        touched.push(parseInt(id));
      }
      for (let j = 0; j < cats.length; j += 1) {
        const id: number = parseInt(cats[j].getAttribute("id")!.replace(/\D/g, ''));
        if (!touched.includes(id)) {
          escaped.push(id);
        }
        document.getElementById(`box-${id}`)!.style.animation = '';
      }
      return {
        ...state,
        catsEscaped: escaped,
      };

    case 'CLEANUP':
      return {
        ...state,
        popupPositions: [],
        missed: state.missed + state.catsEscaped.length,
        catsEscaped: [],
        catsTouched: [],
      }

    case 'NEXT':
      return {
        ...state,
        popupPositions: getPositions(totalPositions),
        // popupPositions: [1],
      };

    default:
      throw new Error('Action undefined');
  }
}

export default Game2;
