import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
  reset,
  toggleRunning,
  tick,
  switchTimer,
} from "./store/timer";
import { RootState } from "./store";
import AlarmSound from "./assets/AlarmSound.mp3";
import { formatTime } from "./helper";

function App() {
  const dispatch = useDispatch();
  const { breakLength, sessionLength, timerLabel, timeLeft, isRunning } =
    useSelector((state: RootState) => state.timer);

  useEffect(() => {
    let timer: number | undefined;
    if (isRunning) {
      timer = setInterval(() => {
        if (timeLeft === 0) {
          dispatch(switchTimer());
          const beep = document.getElementById("beep") as HTMLAudioElement;
          beep.play();
        } else {
          dispatch(tick());
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [dispatch, timeLeft, isRunning]);

  const beep = document.getElementById("beep") as HTMLAudioElement;

  function handleReset() {
    dispatch(reset());

    beep.pause();
    beep.currentTime = 0;
  }

  return (
    <>
      <h1>Pomodoro Timer</h1>
      <div id="break-label">
        Break Length
        <button id="break-decrement" onClick={() => dispatch(decrementBreak())}>
          -
        </button>
        <span id="break-length">{breakLength}</span>
        <button id="break-increment" onClick={() => dispatch(incrementBreak())}>
          +
        </button>
      </div>
      <div id="session-label">
        Session Length
        <button
          id="session-decrement"
          onClick={() => dispatch(decrementSession())}
        >
          -
        </button>
        <span id="session-length">{sessionLength}</span>
        <button
          id="session-increment"
          onClick={() => dispatch(incrementSession())}
        >
          +
        </button>
      </div>
      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <button id="start_stop" onClick={() => dispatch(toggleRunning())}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={handleReset}>
        Reset
      </button>
      <audio id="beep" src={AlarmSound}></audio>
    </>
  );
}

export default App;
