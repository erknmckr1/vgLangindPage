import { configureStore } from "@reduxjs/toolkit";
import onBoardingReducer from "./slices/onBoarding.Slice";

export const store = configureStore({
  reducer: {
    onBoarding: onBoardingReducer,
  },
});

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
