import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
import { tokenService } from "../../utils/tokenService";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const getUser = createAsyncThunk(
  "users/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/me");
      return res.data;
    } catch (error: any) {
      return rejectWithValue({ message: "Something went wrong" });
    }
  }
);

export const loginUser = createAsyncThunk(
  "client-auth/login",
  async (data: LoginInput, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/client-auth/login", data);

      await dispatch(getUser());
      await dispatch(getCart());
      await dispatch(getWishlist());

      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Something went wrong" });
    }
  }
);

export const registerUser = createAsyncThunk(
  "client-auth/register",
  async (data: RegisterInput) => {
    const res = await api.post("/client-auth/register", data);
    return res.data;
  }
);

export const resetPassword = createAsyncThunk(
  "client-auth/reset-password",
  async (data: ResetInput) => {
    const res = await api.post("/client-auth/reset-password", data);
    return res.data;
  }
);

export const refreshToken = createAsyncThunk(
  "client-auth/refresh",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.get("/client-auth/refresh");
      await dispatch(getUser());
      await dispatch(getCart());
      await dispatch(getWishlist());
      return res.data;
    } catch (error) {
      await dispatch(logoutUser());
      return rejectWithValue({ message: "Refresh failed" });
    }
  }
);

export const logoutUser = createAsyncThunk("client-auth/logout", async () => {
  const res = await api.post("/client-auth/logout");
  return res.data;
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
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      tokenService.setAccessToken(action.payload);
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      });
  },
});
export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;
