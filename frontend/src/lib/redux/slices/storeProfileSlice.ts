import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StoreProfileI {
  slogan: string;
  category: string;
  bio: string;
  logo: string;
}

const initialState: { storeProfile: StoreProfileI | null } = {
  storeProfile: null,
};

const storeProfileSlice = createSlice({
  name: "storeProfile",
  initialState,
  reducers: {
    setStoreProfile: (state, action: PayloadAction<StoreProfileI>) => {
      state.storeProfile = action.payload;
    },
  },
});

export const { setStoreProfile } = storeProfileSlice.actions;
export default storeProfileSlice.reducer;
