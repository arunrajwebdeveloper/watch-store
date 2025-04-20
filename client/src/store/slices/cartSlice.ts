import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { CartInput, CartState, CartUpdateInput } from "@/types";

const initialState: CartState = {
  cartItems: [],
  cartItemCount: 0,
};

export const getCart = createAsyncThunk("cart/get", async () => {
  const res = await api.get("/cart");
  return res.data;
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async (data: CartInput) => {
    const res = await api.post("/cart/add", data);
    return res.data;
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/update",
  async (data: CartUpdateInput) => {
    const res = await api.patch("/cart/update", data);
    return res.data;
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/remove",
  async (productId: string) => {
    const res = await api.delete(`/cart/remove/${productId}`);
    return res.data;
  }
);

export const clearCart = createAsyncThunk("cart/clear", async () => {
  const res = await api.post("/cart/clear");
  return res.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartItems = action.payload?.items;
        state.cartItemCount = action.payload?.items?.length ?? 0;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload?.items;
        state.cartItemCount = action.payload?.items?.length;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.cartItemCount = action.payload?.items?.length ?? 0;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.cartItemCount = action.payload?.items?.length ?? 0;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.cartItemCount = 0;
      });
  },
});

export default cartSlice.reducer;
