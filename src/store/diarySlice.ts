import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { diaryState } from "../interface/tpyes";

const initialState: diaryState = {
  todayCouple: false,
  todaySingle: false,
};

export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    writenCouple(state) {
      state.todayCouple = true;
    },
    noneCouple(state) {
      state.todayCouple = false;
    },
    writenSingle(state) {
      state.todaySingle = true;
    },
    noneSingle(state) {
      state.todaySingle = false;
    },
  },
});

export const diaryActions = { ...diarySlice.actions };

export default diarySlice;
