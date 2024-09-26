import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  calendly: boolean;
  youtube: boolean;
  project: number | null; // Store project ID when the modal is open, null when closed
}

// Define a discriminated union for the payload
export type ModalPayload =
  | { modalType: "calendly" | "youtube"; projectId?: never }
  | { modalType: "project"; projectId: number };

const initialState: ModalState = {
  calendly: false,
  youtube: false,
  project: null
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalPayload>) => {
      const { modalType, projectId } = action.payload;

      // Handle opening of different modals
      if (modalType === "project" && projectId !== undefined) {
        state.project = projectId; // Store project ID when opening project modal
      } else if (modalType === "calendly") {
        state.calendly = true;
      } else if (modalType === "youtube") {
        state.youtube = true;
      }
    },
    closeModal: (state, action: PayloadAction<keyof ModalState>) => {
      // Handle closing of different modals
      if (action.payload === "project") {
        state.project = null; // Reset project ID when closing the project modal
      } else {
        state[action.payload] = false;
      }
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
