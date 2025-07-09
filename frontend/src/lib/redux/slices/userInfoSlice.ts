import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfoI {
  id: string;
  email: string;
  name: string;
  phone: string;
  storeName: string;
}

const initialState: UserInfoI = {
  id: "",
  email: "",
  name: "",
  phone: "",
  storeName: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoI>) => {
      return action.payload;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
