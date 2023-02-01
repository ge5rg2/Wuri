import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useTypedDispatch,
  useSelector as useTypedSelector,
} from "react-redux";
import dummySlice from "./dummySlice";
import loadSlice from "./loadSlice";

//useSelector, useDispatch 등을 react-redux에서 가져온 후 state에 저장해서 사용할 수 있게 index.ts로 저장
export const store = configureStore({
  reducer: {
    //quiz: quizSlice.reducer,
    dummy: dummySlice.reducer,
    load: loadSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useTypedDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useTypedSelector;
