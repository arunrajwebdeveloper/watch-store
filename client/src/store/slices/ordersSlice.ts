import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axios";

interface OrdersState {
  orders: any[];
  isLoading: boolean;
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
};

export const getOrders = createAsyncThunk("order/get", async () => {
  const res = await api.get("/orders/my-orders");
  return res.data;
});

// export const updateCartItem = createAsyncThunk(
//   "cart/update",
//   async (data: CartInput) => {
//     const { productId, quantity } = data;
//     const res = await api.patch(`/cart/update/${productId}`, { quantity });
//     return res.data;
//   }
// );

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export default orderSlice.reducer;
