// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  createdAt?: string;
}

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          withCredentials: true,
        },
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  },
);

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
