import { createSlice } from "@reduxjs/toolkit";

export interface TimerStateProps {
  breakLength: number;
  sessionLength: number;
  timerLabel: string;
  timeLeft: number;
  isRunning: boolean;
  isSession: boolean;
}

const initialState: TimerStateProps = {
  breakLength: 5,
  sessionLength: 25,
  timerLabel: "Session",
  timeLeft: 1500, //25*60 convert to seconds
  isRunning: false,
  isSession: true,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    incrementBreak(state) {
      if (state.breakLength < 60) state.breakLength++;
    },
    decrementBreak(state) {
      if (state.breakLength > 1) state.breakLength--;
    },
    incrementSession(state) {
      if (state.sessionLength < 60) {
        state.sessionLength++;

        state.timeLeft = state.sessionLength * 60;
      }
    },
    decrementSession(state) {
      if (state.sessionLength > 1) {
        state.sessionLength--;

        state.timeLeft = state.sessionLength * 60;
      }
    },
    reset: () => initialState,
    toggleRunning(state) {
      state.isRunning = !state.isRunning;
    },
    tick(state) {
      state.timeLeft -= 1;
    },
    switchTimer(state) {
      if (state.isSession) {
        state.isSession = false;
        state.timerLabel = "Break";
        state.timeLeft = state.breakLength * 60;
      } else {
        state.isSession = true;
        state.timerLabel = "Session";
        state.timeLeft = state.sessionLength * 60;
      }
    },
  },
});

export const {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
  reset,
  toggleRunning,
  tick,
  switchTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
