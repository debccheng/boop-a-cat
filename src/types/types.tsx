export interface InitState {
  session: string,
  popupPositions: Array<number>,
  score: number,
  missed: number,
  timeLimit: number,
  catsEscaped: Array<number>,
  catsTouched: Array<number>,
  gameFinished: boolean,
}

export type Actions =
  | { type: 'CAT_ESCAPED' }
  | { type: 'CAT_TOUCHED' }
  | { type: 'CLEANUP' }
  | { type: 'NEXT' }
  | { type: 'GAME_FINISHED' }
  | { type: 'RESTART' }

export interface TimerProps {
  timeLimit: number,
  handleTimesUp: () => void,
}

export interface CellProps {
  popup: boolean,
  id: number,
  clicked: Array<number>,
  escaped: Array<number>,
  handleClick: (e: any) => void,
  timesup: boolean,
}