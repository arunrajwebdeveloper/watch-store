import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { WishlistInput } from "@/types";

const initialState = {};

export const addToWishlist = createAsyncThunk(
  "users/add-to-wishlist",
  async (data: WishlistInput) => {
    const res = await api.post("/users/add-to-wishlist", data);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToWishlist.fulfilled, (state, action) => {});
  },
});

export default userSlice.reducer;
