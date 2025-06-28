import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OnboardingState = {
  name: string;
  email: string;
  password: string;
  storeName: string;
  slogan: string;
  category: string;
  bio: string;
  logo: File | null;
  productTypes: string[];
  theme: string;
  accountType: "individual" | "corporate" | null;
  iban: string;
  bankName: string;
  taxId: string;
  profileType: string;
  invoiceTitle: string;
  isCompany: boolean;
};

const initialState: OnboardingState = {
  name: "",
  email: "",
  password: "",
  storeName: "",
  slogan: "",
  category: "",
  bio: "",
  logo: null,
  productTypes: [],
  theme: "",
  accountType: null,
  iban: "",
  bankName: "",
  taxId: "",
  profileType: "",
  invoiceTitle: "",
  isCompany: false,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setField: <K extends keyof OnboardingState>(
      state: OnboardingState,
      action: PayloadAction<{ key: K; value: OnboardingState[K] }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    resetOnboarding: () => initialState,
  },
});

export const { setField, resetOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
