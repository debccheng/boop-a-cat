export interface InitState {
  popupPositions: Array<number>,
  score: number,
  missed: number,
  catsEscaped: Array<number>,
  catsTouched: Array<number>,
}

export type Actions =
  | { type: 'CAT_ESCAPED' }
  | { type: 'CAT_TOUCHED' }
  | { type: 'CLEANUP'}
  | { type: 'NEXT'}
  | { type: 'GAMEOVER' }