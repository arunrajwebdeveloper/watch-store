import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { CartInput, CartState } from "@/types";
import { logoutUser } from "./authSlice";

const initialState: CartState = {
  cartItems: [],
  cartItemCount: 0,
  cartTotalAmount: 0,
  cartFinalTotalAmount: 0,
  cartDiscountAmount: 0,
  appliedCoupon: null,
  isLoading: false,
  isUpdatingCart: false,
  isCartEmpty: true,
  gstPercentage: 0,
  gstAmount: 0,
  shippingFee: 0,
  couponError: null,
  isApplyingCoupon: false,
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

export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async (couponCode: string, { rejectWithValue }) => {
    try {
      const res = await api.post("/cart/apply-coupon", { couponCode });
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Something went wrong" });
    }
  }
);

export const removeAppliedCoupon = createAsyncThunk(
  "cart/removeCoupon",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.patch("/cart/remove-coupon");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to remove coupon"
      );
    }
  }
);

const calculateCartLength = (cartItems: any) => {
  return cartItems?.reduce((acc: number, item: any) => acc + item.quantity, 0);
};

const setState = (state: any, response: any) => {
  if (response) {
    state.cartItems = response.items;
    state.cartItemCount = calculateCartLength(response.items);
    state.cartTotalAmount = response.cartTotal;
    state.cartFinalTotalAmount = response.finalTotal;
    state.cartDiscountAmount = response.discount;
    state.appliedCoupon = response.appliedCoupon || null;
    state.isCartEmpty = response.items.length === 0;
    state.gstPercentage = response.gstPercentage;
    state.gstAmount = response.gstAmount;
    state.shippingFee = response.shippingFee;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCouponError(state) {
      state.couponError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        setState(state, action.payload);
        state.isLoading = false;
      })
      .addCase(getCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        setState(state, action.payload);
        state.isLoading = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.isUpdatingCart = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        setState(state, action.payload);
        state.isUpdatingCart = false;
      })
      .addCase(updateCartItem.rejected, (state) => {
        state.isUpdatingCart = false;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        setState(state, action.payload);
        state.isLoading = false;
      })
      .addCase(removeCartItem.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.cartItemCount = 0;
      })
      .addCase(applyCoupon.pending, (state, action) => {
        setState(state, action.payload);
        state.isApplyingCoupon = true;
        state.couponError = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        setState(state, action.payload);
        state.isApplyingCoupon = false;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.isApplyingCoupon = false;
        state.couponError = action.payload;
      })

      .addCase(removeAppliedCoupon.pending, (state, action) => {
        setState(state, action.payload);
        state.isApplyingCoupon = true;
        state.couponError = null;
      })
      .addCase(removeAppliedCoupon.fulfilled, (state, action) => {
        setState(state, action.payload);
        state.isApplyingCoupon = false;
      })
      .addCase(removeAppliedCoupon.rejected, (state, action) => {
        state.isApplyingCoupon = false;
        state.couponError = action.payload;
      })

      // ✅ Clear cart when user logs out
      .addCase(logoutUser.fulfilled, (state) => {
        state.cartItems = [];
        state.cartItemCount = 0;
      });
  },
});
export const { clearCouponError } = cartSlice.actions;
export default cartSlice.reducer;
