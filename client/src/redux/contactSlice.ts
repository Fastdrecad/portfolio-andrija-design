import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactState {
  isFormSubmitted: boolean;
  lastSubmissionTime: string | null;
}

const initialState: ContactState = {
  isFormSubmitted: false,
  lastSubmissionTime: null
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isFormSubmitted = action.payload;
      state.lastSubmissionTime = action.payload
        ? new Date().toISOString()
        : null;
    },
    resetContactForm: (state) => {
      state.isFormSubmitted = false;
      state.lastSubmissionTime = null;
    }
  }
});

export const { setFormSubmitted, resetContactForm } = contactSlice.actions;
export default contactSlice.reducer;
