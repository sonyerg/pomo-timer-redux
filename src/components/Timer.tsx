import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Timer.module.css";

import {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
  reset,
  toggleRunning,
  tick,
  switchTimer,
} from "../store/timer";
import { RootState } from "../store";
import AlarmSound from "../assets/AlarmSound.mp3";
import { formatTime } from "../helper";
import Setters from "./Setters";
import Modal from "./ui/Modal";

export default function Timer() {
  const dispatch = useDispatch();
  const { breakLength, sessionLength, timerLabel, timeLeft, isRunning } =
    useSelector((state: RootState) => state.timer);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isRunning) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isRunning]);

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
      }, 90);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [dispatch, timeLeft, isRunning]);

  function handleReset() {
    dispatch(reset());
    const beep = document.getElementById("beep") as HTMLAudioElement;
    beep.pause();
    beep.currentTime = 0;
    setIsAnimating(false);
  }

  function handleModalOpen() {
    setModalOpen(true);
  }

  function handleConfirmReset() {
    handleReset();
    setModalOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
      <div
        className={`${classes.timer} ${
          isAnimating ? classes.timerRunning : classes.timerPaused
        }`}
      >
        <div className={classes.header}>
          <h1 className={classes.title}>Better Pomodoro</h1>
          <p className={classes.subtitle}>
            "Focus is the art of knowing what to ignore." - James Clear
          </p>
        </div>
        <div className={`${classes.setters}`}>
          <Setters
            type="break"
            decAct={() => dispatch(decrementBreak())}
            incAct={() => dispatch(incrementBreak())}
            timeLength={breakLength}
          />
          <Setters
            type="session"
            decAct={() => dispatch(decrementSession())}
            incAct={() => dispatch(incrementSession())}
            timeLength={sessionLength}
          />
        </div>
        <div className={classes.display}>
          <label id="timer-label">{timerLabel}</label>
          <div id="time-left">{formatTime(timeLeft)}</div>
          <button id="start_stop" onClick={() => dispatch(toggleRunning())}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button id="reset" onClick={handleModalOpen}>
            Reset
          </button>
        </div>
        {isRunning && (
          <p>{`Incoming ${timerLabel === "Session" ? "break" : "session"}: ${
            timerLabel === "Session" ? breakLength : sessionLength
          } minute/s`}</p>
        )}
        <audio id="beep" src={AlarmSound}></audio>
      </div>
    </>
  );
}
