import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { RazorpayResult } from "@/types/payment";

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/payment/create");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (payload: RazorpayResult, thunkAPI) => {
    console.log("hello :>> ", "hello");
    const res = await api.post("/orders/place", payload);
    return res.data;
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    paymentData: null,
    orderSuccess: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.fulfilled, (state, action) => {
        state.paymentData = action.payload;
        state.loading = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderSuccess = action.payload;
        state.loading = false;
      });
  },
});

export default paymentSlice.reducer;
