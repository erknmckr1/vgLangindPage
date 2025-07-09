import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BillingInfoI {
  id:string,
  iban: string;
  bankName: string;
  taxId: string;
  invoiceTitle: string;
  isPrimary: boolean;
}

const initialState: { billingInfo: BillingInfoI[] | null } = {
  billingInfo: null,
};
const billingInfoSlice = createSlice({
  name: "billingInfo",
  initialState,
  reducers: {
    setBillingInfo: (state, action: PayloadAction<BillingInfoI[]>) => {
      state.billingInfo = action.payload;
    },
  },
});

export const { setBillingInfo } = billingInfoSlice.actions;
export default billingInfoSlice.reducer;
