import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { CartInput, CartState } from "@/types";
import { logoutUser } from "./authSlice";

const initialState: CartState = {
  cartItems: [],
  cartItemCount: 0,
  isLoading: false,
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
  async (data: CartInput) => {
    const { productId, quantity } = data;
    const res = await api.patch(`/cart/update/${productId}`, { quantity });
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

const calculateCartLength = (cart: any) => {
  return cart.reduce((acc: number, curr: any) => acc + curr.quantity, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        const cartList = action.payload?.items;

        state.cartItems = cartList;
        state.cartItemCount = calculateCartLength(cartList) ?? 0;
        state.isLoading = false;
      })
      .addCase(getCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const cartList = action.payload?.items;

        state.cartItems = cartList;
        state.cartItemCount = calculateCartLength(cartList) ?? 0;
        state.isLoading = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const cartList = action.payload?.items;

        state.cartItems = cartList;
        state.cartItemCount = calculateCartLength(cartList) ?? 0;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const cartList = action.payload?.items;

        state.cartItems = cartList;
        state.cartItemCount = calculateCartLength(cartList) ?? 0;
        state.isLoading = false;
      })
      .addCase(removeCartItem.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.cartItemCount = 0;
      })

      // ✅ Clear cart when user logs out
      .addCase(logoutUser.fulfilled, (state) => {
        state.cartItems = [];
        state.cartItemCount = 0;
      });
  },
});

export default cartSlice.reducer;
