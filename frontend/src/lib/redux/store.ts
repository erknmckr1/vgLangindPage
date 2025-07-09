import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./slices/userInfoSlice";
import storeProfileReducer from "./slices/storeProfileSlice";
import billingInfoReducer from "./slices/billingInfoSlice";
import themeReducer from "./slices/themeSlice";
import onBoarding from "./slices/onBoarding.Slice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    storeProfile: storeProfileReducer,
    billingInfo: billingInfoReducer,
    theme: themeReducer,
    onBoarding: onBoarding,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
