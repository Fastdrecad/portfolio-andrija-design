import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  openModal as openModalAction,
  closeModal as closeModalAction,
  clearModalHistory,
  selectModalState,
  ModalType
} from "@/redux/modalSlice";

export const useModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const modalState = useSelector(selectModalState);

  const openModal = useCallback(
    (
      type: Exclude<ModalType, null>,
      data?: { projectId?: string; [key: string]: string | undefined }
    ) => {
      dispatch(
        openModalAction({
          type,
          data,
          previousLocation: location.pathname
        })
      );
    },
    [dispatch, location.pathname]
  );

  const closeModal = useCallback(() => {
    dispatch(closeModalAction());
  }, [dispatch]);

  const clearHistory = useCallback(() => {
    dispatch(clearModalHistory());
  }, [dispatch]);

  return {
    ...modalState,
    openModal,
    closeModal,
    clearHistory
  };
};
