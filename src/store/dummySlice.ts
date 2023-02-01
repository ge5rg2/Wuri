import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dummyDataState = {
  ExternalKey?: string;
  ObjectID?: string;
  RecordNumber?: string;
  zact_cont?: string;
  zcontract?: string;
  zcustomerID?: string;
  zcustomer_id?: string;
  zcustomer_name?: string;
  zexit?: string;
  zfinanc_proposal?: string;
  zint_model?: string;
  zint_series?: string;
  zopptID?: string;
  zpost_call?: string;
  zprovide_quote?: string;
  zsource?: string;
  zsroom?: string;
  zstatus?: string;
  zteam?: string;
  ztest_drive?: string;
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
        ObjectID?: string;
        RecordNumber?: string;
        zact_cont?: string;
        zcontract?: string;
        zcustomerID?: string;
        zcustomer_id?: string;
        zcustomer_name?: string;
        zexit?: string;
        zfinanc_proposal?: string;
        zint_model?: string;
        zint_series?: string;
        zopptID?: string;
        zpost_call?: string;
        zprovide_quote?: string;
        zsource?: string;
        zsroom?: string;
        zstatus?: string;
        zteam?: string;
        ztest_drive?: string;
      }>
    ) => {
      state.push(actions.payload);
    },
  },
});

export const { setDummyData } = dummySlice.actions;

export const dummyDataAction = { ...dummySlice.actions };

export default dummySlice;
