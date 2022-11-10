import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRef } from "react";
import classes from "../styles/Home.module.css";

const Timer = () => {
  const [display, setDisplay] = useState(false);
  function createTimer() {
    const startTime = Date.now();
    return () => {
      return Math.round(Date.now() - startTime) / 1000;
    };
  }

  const timerRef = useRef(createTimer);
  const { data: time } = useQuery("time", timerRef.current, {
    refetchInterval: 10,
  });
  function startHelper() {
    setDisplay(true);
    timerRef.current = createTimer();
  }
  return (
    <div>
      <button className={classes.timerStart} onClick={startHelper}>
        Start
      </button>
      <button
        className={classes.timerStop}
        onClick={() => (timerRef.current = () => time)}
      >
        Stop
      </button>

      <button
        className={classes.timerReset}
        onClick={() => (timerRef.current = () => 0)}
      >
        Reset
      </button>
      <h1>{display ? <>Timer : {time}</> : <>Timer : 0 </>}</h1>
    </div>
  );
};

export default Timer;
