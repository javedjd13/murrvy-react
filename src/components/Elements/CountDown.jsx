import { useEffect, useMemo, useState } from "react";
import { Days, Hour, Min, Sec } from "../../constant";

const getRemainingTime = (targetTimestamp) => {
  const difference = Math.max(targetTimestamp - Date.now(), 0);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hrs: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    sec: Math.floor((difference % (1000 * 60)) / 1000),
    completed: difference === 0,
  };
};

const CountDown = ({ customeclass, themeColor, targetDate }) => {
  const targetTimestamp = useMemo(() => {
    const parsedDate = new Date(targetDate).getTime();

    if (!Number.isNaN(parsedDate)) {
      return parsedDate;
    }

    return Date.now() + 3 * 24 * 60 * 60 * 1000;
  }, [targetDate]);

  const [countdowns, setCountDown] = useState(() => getRemainingTime(targetTimestamp));

  useEffect(() => {
    setCountDown(getRemainingTime(targetTimestamp));

    const intervalId = setInterval(() => {
      setCountDown(getRemainingTime(targetTimestamp));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [targetTimestamp]);

  return (
    <ul className={customeclass || ""}>
      <li>
        <div className="counter">
          <div>
            <h2 id="days1" className={themeColor ? "theme-color" : ""}>
              {countdowns.days}
            </h2>
            {Days}
          </div>
        </div>
      </li>
      <li>
        <div className="counter">
          <div>
            <h2 id="hours1" className={themeColor ? "theme-color" : ""}>
              {countdowns.hrs}
            </h2>
            {Hour}
          </div>
        </div>
      </li>
      <li>
        <div className="counter">
          <div>
            <h2 id="minutes1" className={themeColor ? "theme-color" : ""}>
              {countdowns.mins}
            </h2>
            {Min}
          </div>
        </div>
      </li>
      <li>
        <div className="counter">
          <div>
            <h2 id="seconds1" className={themeColor ? "theme-color" : ""}>
              {countdowns.sec}
            </h2>
            {Sec}
          </div>
        </div>
      </li>
    </ul>
  );
};
export default CountDown;
