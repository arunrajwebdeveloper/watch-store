import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";
import { AuthState, LoginInput, RegisterInput } from "../../types";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginInput) => {
    const res = await api.post("/auth/login", data); // sets cookies server-side
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

export const refreshUser = createAsyncThunk("auth/refresh", async () => {
  const res = await api.get("/auth/refresh"); // re-issues token in cookie
  return res.data;
});

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
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
