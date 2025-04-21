import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoadingImmediate: (state) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, stopLoadingImmediate } = loadingSlice.actions;

// Custom thunk
export const stopLoading = () => (dispatch: any) => {
  setTimeout(() => {
    dispatch(stopLoadingImmediate());
  }, 200);
};

export default loadingSlice.reducer;
