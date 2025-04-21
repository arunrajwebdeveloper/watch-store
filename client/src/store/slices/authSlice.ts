import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { AuthState, LoginInput, RegisterInput, ResetInput } from "@/types";
import { getCart } from "./cartSlice";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginInput, { dispatch }) => {
    const res = await api.post("/auth/login", data); // sets cookies server-side

    // ✅ Trigger cart sync after login
    await dispatch(getCart());

    return res.data; // { user }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegisterInput) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data: ResetInput) => {
    const res = await api.post("/auth/reset-password", data);
    return res.data;
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { dispatch }) => {
    const res = await api.post("/auth/refresh"); // re-issues token in cookie

    // ✅ Trigger cart sync on refresh too
    await dispatch(getCart());

    return res.data;
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout"); // clears cookie
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
