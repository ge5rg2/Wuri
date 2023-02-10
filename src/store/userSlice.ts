import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userState } from "../interface/tpyes";

const initialState: userState = {
  isLoading: false,
  isLoggedIn: false,
  userUid: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn(
      state,
      action: PayloadAction<{
        isLoggedIn: boolean;
        userUid: string;
      }>
    ) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userUid = action.payload.userUid;
    },
    /*     setOpptLoad(
      state,
      action: PayloadAction<{
        isOpptLoading: boolean;
      }>
    ) {
      state.isOpptLoading = action.payload.isOpptLoading;
    }, */
  },
});

export const userActions = { ...userSlice.actions };

export default userSlice;
