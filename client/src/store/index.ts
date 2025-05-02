import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import paymentReducer from "./slices/paymentSlice";
import ordersReducer from "./slices/ordersSlice";
// import loadingReducer from "./slices/loadingSlice";

export const store = configureStore({
  reducer: {
    // loading: loadingReducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    payment: paymentReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
