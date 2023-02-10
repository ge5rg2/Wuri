import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dummyDataState = {
  ExternalKey?: string;
};

const initialState: dummyDataState[] = [];

export const dummySlice = createSlice({
  name: "dummyData",
  initialState,
  reducers: {
    setDummyData: (
      state,
      actions: PayloadAction<{
        ExternalKey?: string;
      }>
    ) => {
      state.push(actions.payload);
    },
  },
});

export const { setDummyData } = dummySlice.actions;

export const dummyDataAction = { ...dummySlice.actions };

export default dummySlice;
