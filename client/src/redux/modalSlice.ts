import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "calendly" | "youtube" | "project" | null;

interface ModalData {
  projectId?: string;
  [key: string]: string | undefined;
}

interface ModalState {
  type: ModalType;
  data: ModalData | null;
  isOpen: boolean;
  previousLocation?: string;
  isModalNavigation: boolean;
}

const initialState: ModalState = {
  type: null,
  data: null,
  isOpen: false,
  previousLocation: undefined,
  isModalNavigation: false
};

interface OpenModalPayload {
  type: Exclude<ModalType, null>;
  data?: ModalData;
  previousLocation?: string;
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      state.type = action.payload.type;
      state.data = action.payload.data || null;
      state.isOpen = true;
      state.previousLocation = action.payload.previousLocation;
      state.isModalNavigation = true;
    },
    closeModal: (state) => {
      state.type = null;
      state.data = null;
      state.isOpen = false;
      state.isModalNavigation = false;
      // Keeping previousLocation for navigation purposes
    },
    clearModalHistory: (state) => {
      state.previousLocation = undefined;
    },
    setIsModalNavigation: (state, action: PayloadAction<boolean>) => {
      state.isModalNavigation = action.payload;
    }
  }
});

export const {
  openModal,
  closeModal,
  clearModalHistory,
  setIsModalNavigation
} = modalSlice.actions;

// Selectors
export const selectModalState = (state: { modal: ModalState }) => state.modal;
export const selectIsModalOpen = (state: { modal: ModalState }) =>
  state.modal.isOpen;
export const selectModalType = (state: { modal: ModalState }) =>
  state.modal.type;
export const selectModalData = (state: { modal: ModalState }) =>
  state.modal.data;
export const selectPreviousLocation = (state: { modal: ModalState }) =>
  state.modal.previousLocation;
export const selectIsModalNavigation = (state: { modal: ModalState }) =>
  state.modal.isModalNavigation;

export default modalSlice.reducer;
