import React, { useState, useEffect } from 'react'
import { TimerProps } from '../types/types';

const Timer: React.FC<TimerProps> = ({ timeLimit, handleTimesUp}) => {
  const [counter, setCounter] = useState<number>(timeLimit);
  // TODO: Figure out a better way to restart timer

  let interval: any = null;

  useEffect(() => {
    const countDown = () => {
      if (counter > 0) {
        setCounter((state) => state -1)
      } else {
        setCounter(0);
        clearInterval(interval);
        handleTimesUp();
      }
    };
    interval = setInterval(countDown, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [counter])

  useEffect(() => {
    if (!interval) {
      setCounter(timeLimit);
    }
  }, [interval, timeLimit]);

  return (
    <h2 className="countdown">
      Time: {counter}
    </h2>
  );

}

export default Timer;
