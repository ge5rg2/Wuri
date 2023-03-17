import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { menuState } from "../interface/tpyes";

const initialState: menuState = {
  isProfile: false,
  isMenu: false,
  isCouple: false,
  isDiary: false,
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
    openDiary(state) {
      state.isDiary = true;
    },
    closeDiary(state) {
      state.isDiary = false;
    },
    openCouple(state) {
      state.isCouple = true;
    },
    closeCouple(state) {
      state.isCouple = false;
    },
    openProfile(state) {
      state.isProfile = true;
    },
    closeProfile(state) {
      state.isProfile = false;
    },
  },
});

export const menuActions = { ...menuSlice.actions };

export default menuSlice;
