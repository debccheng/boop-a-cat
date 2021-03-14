import React, { useEffect, useReducer, useState, useCallback } from 'react';
import { InitState, Actions } from '../types/types';
import getPositions from '../helpers/getPositions';
import useViewport from '../helpers/useViewport';
import Cell from './Cell';
import Timer from './Timer';


const Game = () => {
  const resize = useViewport();
  const [start, setStart] = useState<boolean>(false);
  const [state, dispatch] = useReducer<React.Reducer<InitState, Actions>>(reducer, initialState);

  const getHighScore = (): number => {
    const oldScore: string | null = localStorage.getItem('boop-a-cat-high-score');
    if (!oldScore) {
      return 0;
    } else {
      return parseInt(oldScore);
    }
  }

  const [highScore, setHighScore] = useState<number>(getHighScore());
  useEffect(() => {
    window.addEventListener('storage', () => {
      setHighScore(JSON.parse(localStorage.getItem('boop-a-cat-high-score')!))
    });
  })

  const handleTimesUp = useCallback(() => {
    dispatch({ type: 'CLEANUP' });
    dispatch({ type: 'GAME_FINISHED' });
    if (state.score > highScore) {
      setHighScore(state.score);
      localStorage.setItem('boop-a-cat-high-score', state.score.toString());
    }
    const style = `
      background-color: gold;
      border-radius: 100rem;
    `;
    const elements = document.getElementsByClassName('media');
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].setAttribute("style", style);
    }
  }, [highScore, state.score]);

  const handleStart = () => {
    setStart(true);
  }

  const handleRestart = () => {
    dispatch({ type: 'RESTART' });
    const style = `
    background-color: inherit;
    border-radius: 0;
  `;
    const elements = document.getElementsByClassName('media');
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].setAttribute("style", style);
    }
  }

  const handleClick = (e: any) => {
    dispatch({ type: 'CAT_TOUCHED' });
    const catID = e.target.id;
    const catTouched: HTMLElement = document.getElementById(catID)!;
    const top: string = window.getComputedStyle(catTouched).getPropertyValue('top');
    catTouched.setAttribute("style", `top: ${top}`);
    const touchedNum: number = parseInt(catID.replace(/\D/g, ''));
    if (!state.catsTouched.includes(touchedNum)) {
      state.catsTouched.push(touchedNum);
    }
  }

  // Game Loop
  useEffect(() => {
    if (start) {
      const timer = setTimeout(() => {
        setTimeout(() => {
          dispatch({ type: 'CAT_ESCAPED' })
        }, 2500);
        dispatch({ type: 'CLEANUP' });
        dispatch({ type: 'NEXT' });
      }, 3000);

      if (state.gameFinished) {
        clearTimeout(timer);
      }

      return () => {
        clearTimeout(timer);
      };
    }
  });

  return (
    <>
      <div className="stats">
        {highScore > 0 ? <h2 className="score"> High Score: {highScore}</h2> : null}
        {start && <h2 className="score"> Boop: {state.score}</h2>}
        {!start && <button onClick={handleStart} className="startButton">Start</button>}
        {start && state.timeLimit
          ? <Timer handleTimesUp={handleTimesUp} timeLimit={state.timeLimit} />
          : null
        }
        {state.gameFinished &&
          <>
            <h2 className="timesup">Time's up!</h2>
            <button onClick={handleRestart} className="startButton">restart</button>
          </>
        }
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
            timesup={state.gameFinished}
          />
        )}
      </div>
    </>
  );
}

const totalPositions: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const initialState: InitState = {
  session: Date(),
  popupPositions: [],
  score: 0,
  missed: 0,
  timeLimit: 40,
  catsEscaped: [],
  catsTouched: [],
  gameFinished: false,
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
      };

    case 'GAME_FINISHED':
      return {
        ...state,
        timeLimit: 0,
        popupPositions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        catsEscaped: [],
        catsTouched: [],
        gameFinished: true,
      }

    case 'RESTART':
      return initialState;

    default:
      throw new Error('Action undefined');
  }
}

export default Game;
