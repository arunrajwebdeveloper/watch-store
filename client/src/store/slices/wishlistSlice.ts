import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { WishlistInput, WishlistState } from "@/types";
import { logoutUser } from "./authSlice";

const initialState: WishlistState = {
  wishlistItems: [],
  isLoading: false,
};

export const getWishlist = createAsyncThunk("wishlist/get", async () => {
  const res = await api.get("/wishlist");
  return res.data;
});

export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (data: WishlistInput) => {
    const res = await api.post("/wishlist/add", data);
    return res.data;
  }
);

export const removeWishlistItem = createAsyncThunk(
  "wishlist/remove",
  async (productId: string) => {
    const res = await api.delete(`/wishlist/remove/${productId}`);
    return res.data;
  }
);

export const clearWishlist = createAsyncThunk("wishlist/clear", async () => {
  const res = await api.post("/wishlist/clear");
  return res.data;
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlistItems = action.payload?.items;
        state.isLoading = false;
      })
      .addCase(getWishlist.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlistItems = action.payload?.items;
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.wishlistItems = action.payload?.items;
      })
      .addCase(clearWishlist.fulfilled, (state) => {
        state.wishlistItems = [];
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.wishlistItems = [];
      });
  },
});

export default wishlistSlice.reducer;
