import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userState } from "../interface/tpyes";

const initialState: userState = {
  isLoading: false,
  isLoggedIn: false,
  userUid: "",
  userName: "",
  userUrl: "",
  coupleId: "",
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
        userName: string | null;
        userUrl: string | null;
        coupleId: string | null;
      }>
    ) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userUid = action.payload.userUid;
      state.userName = action.payload.userName;
      state.userUrl = action.payload.userUrl;
      state.coupleId = action.payload.coupleId;
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
