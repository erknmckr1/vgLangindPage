// lib/redux/slices/user.Slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  email: string;
  name: string;
  storeProfile?: {
    slogan: string;
    category: string;
    bio: string;
    logo: string;
  };
  productTypes?: { id: string; name: string }[];
  theme?: {
    name: string;
    previewImage: string | null;
  };
  billingInfo?: [] | null; // daha sonra type detaylandırılabilir
}

const initialState: UserState = {
  id: "",
  email: "",
  name: "",
  storeProfile: undefined,
  productTypes: [],
  theme: undefined,
  billingInfo: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
