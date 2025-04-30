import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import {
  AddressInput,
  AuthState,
  LoginInput,
  RegisterInput,
  ResetInput,
} from "@/types";
import { getCart } from "./cartSlice";
import { getWishlist } from "./wishlistSlice";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginInput, { dispatch }) => {
    const res = await api.post("/auth/login", data); // sets cookies server-side

    // ✅ Trigger cart / wishlist sync after login
    await dispatch(getCart());
    await dispatch(getWishlist());

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

    //  Trigger cart / wishlist sync on refresh too
    await dispatch(getCart());
    await dispatch(getWishlist());

    return res.data;
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout"); // clears cookie
});

export const addAddress = createAsyncThunk(
  "address/add",
  async (data: AddressInput) => {
    const res = await api.post("/users/address/add", data);
    return res.data;
  }
);

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
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      });
  },
});

export default authSlice.reducer;
