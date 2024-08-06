import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./timer";

const store = configureStore({
  reducer: { timer: timerReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
