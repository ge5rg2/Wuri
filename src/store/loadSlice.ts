import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface loadState {
  isLoading?: true | false;
  isOpptLoading?: true | false;
  isCamLoading?: true | false;
}

const initialState: loadState = {
  isLoading: true,
  isOpptLoading: true,
  isCamLoading: true,
};

export const loadSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoad(
      state,
      action: PayloadAction<{
        isLoading: boolean;
      }>
    ) {
      state.isLoading = action.payload.isLoading;
    },
    setOpptLoad(
      state,
      action: PayloadAction<{
        isOpptLoading: boolean;
      }>
    ) {
      state.isOpptLoading = action.payload.isOpptLoading;
    },
    setCamLoad(
      state,
      action: PayloadAction<{
        isCamLoading: boolean;
      }>
    ) {
      state.isCamLoading = action.payload.isCamLoading;
    },
  },
});

export const loadActions = { ...loadSlice.actions };

export default loadSlice;
