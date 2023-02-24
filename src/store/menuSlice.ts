import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { menuState } from "../interface/tpyes";

const initialState: menuState = {
  isMenu: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu(state) {
      state.isMenu = true;
    },
    closeMenu(state) {
      state.isMenu = false;
    },
  },
});

export const menuActions = { ...menuSlice.actions };

export default menuSlice;
