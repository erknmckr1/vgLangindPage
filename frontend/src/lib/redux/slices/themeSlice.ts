import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeI {
  name: string;
  previewImage: string | null;
}

const initialState: { theme: ThemeI | null } = {
  theme: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeI>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
