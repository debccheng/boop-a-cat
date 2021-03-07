import React, { useState, useEffect } from 'react'
import { TimerProps } from '../types/types';

const Timer: React.FC<TimerProps> = ({ timeLimit, handleTimesUp}) => {
  const [counter, setCounter] = useState<number>(timeLimit);

  useEffect(() => {
    const countdown = () => {
      if (counter >0) {
        setCounter(state => state -1)
      } else {
        setCounter(0)
        clearInterval(interval)
        handleTimesUp();
      }
    }
    const interval = setInterval(countdown, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [counter, handleTimesUp, timeLimit])

  return (
    <h2 className="countdown">
      Time: {counter}
    </h2>
  );
}

export default Timer;
