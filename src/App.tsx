import React from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  const lang: string = window.navigator.language;

  return (
    <div className="App">
      {lang === "zh-TW" ? <h1 className="title">來和小貓玩</h1>:<h1 className="title">Boop a Cat!</h1> }
      <Game />
    </div>
  );
}

export default App;
