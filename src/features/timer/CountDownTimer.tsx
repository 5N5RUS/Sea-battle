import "./CountDownTimer.css";

import React from "react";

interface ICountdown {
  minutes: number;
  seconds: number;
}

const CountDownTimer = ({ minutes = 1, seconds = 0 }: ICountdown) => {
  const [time, setTime] = React.useState<ICountdown>({ minutes, seconds });

  const tick = () => {
    if (time.minutes === 0 && time.seconds === 0) reset();
    else if (time.seconds === 0) {
      setTime({ minutes: time.minutes - 1, seconds: 59 });
    } else {
      setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
    }
  };

  const reset = () => setTime({ minutes: 1, seconds: 0 });

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div className="timer_wrapper">
      <svg
        width="84"
        height="84"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="80" height="80" rx="18" fill="white" />
        <rect
          x="2"
          y="2"
          width="80"
          height="80"
          rx="18"
          stroke="#1F1F1F"
          strokeWidth="4"
        />
        <path
          d="M42 65.0634C39.0657 65.0634 36.3173 64.5059 33.7547 63.3908C31.1921 62.2758 28.9621 60.7696 27.0646 58.8721C25.1671 56.9746 23.6608 54.7445 22.5458 52.1819C21.4308 49.6193 20.8732 46.8709 20.8732 43.9366C20.8732 41.0023 21.4308 38.2539 22.5458 35.6913C23.6608 33.1287 25.1671 30.8987 27.0646 29.0012C28.9621 27.1037 31.1921 25.5974 33.7547 24.4824C36.3173 23.3674 39.0657 22.8099 42 22.8099C44.9343 22.8099 47.6827 23.3674 50.2453 24.4824C52.8079 25.5974 55.038 27.1037 56.9354 29.0012C58.8329 30.8987 60.3392 33.1287 61.4542 35.6913C62.5693 38.2539 63.1268 41.0023 63.1268 43.9366C63.1268 46.8709 62.5693 49.6193 61.4542 52.1819C60.3392 54.7445 58.8329 56.9746 56.9354 58.8721C55.038 60.7696 52.8079 62.2758 50.2453 63.3908C47.6827 64.5059 44.9343 65.0634 42 65.0634ZM48.5728 53.7958L51.8592 50.5094L44.3474 42.9977V32.1995H39.6526V44.8756L48.5728 53.7958ZM26.9765 18.9366L30.2629 22.223L20.2864 32.1995L17 28.9131L26.9765 18.9366ZM57.0235 18.9366L67 28.9131L63.7136 32.1995L53.7371 22.223L57.0235 18.9366ZM42 60.3685C46.5775 60.3685 50.4605 58.7743 53.6491 55.5857C56.8376 52.3971 58.4319 48.5141 58.4319 43.9366C58.4319 39.3592 56.8376 35.4761 53.6491 32.2876C50.4605 29.099 46.5775 27.5047 42 27.5047C37.4225 27.5047 33.5395 29.099 30.3509 32.2876C27.1624 35.4761 25.5681 39.3592 25.5681 43.9366C25.5681 48.5141 27.1624 52.3971 30.3509 55.5857C33.5395 58.7743 37.4225 60.3685 42 60.3685Z"
          fill="#1C1B1F"
        />
      </svg>

      <p className="timer">{`${time.minutes
        .toString()
        .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}</p>
    </div>
  );
};

export default CountDownTimer;
