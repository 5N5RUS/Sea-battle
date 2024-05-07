import "./CountDownTimer.css";

import { useEffect, useState } from "react";

type timerProps = {
  startDate: Date;
  time: number;
};


const CountDownTimer = ({ startDate, time }: timerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(time);

  useEffect(() => {
    const startUnixTime = Math.floor(new Date(startDate).getTime() / 1000);
    const intervalId = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const elapsedTime = currentTime - startUnixTime;
      const remainingTime = time - elapsedTime;

      if (remainingTime <= 0) {
        clearInterval(intervalId);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(remainingTime);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startDate, time]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="timer_wrapper">
      <div className="timer__icon">
        <img src="src/assets/svgs/alarm.svg" alt="alarm icon" />
      </div>

      <p className="timer">{formatTime(timeRemaining)}</p>
    </div>
  );
};

export default CountDownTimer;
