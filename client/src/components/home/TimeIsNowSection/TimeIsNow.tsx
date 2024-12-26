import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { openModal, closeModal, selectModalType } from "@/redux/modalSlice";

import AmHeroLogo from "@/components/home/TimeIsNowSection/AmHeroLogo";
import TitleSection from "@/components/home/TimeIsNowSection/TitleSection";
import Modal from "@/components/common/Modal/Modal";
import ScheduleMeetingButton from "@/components/home/TimeIsNowSection/ScheduleMeetingButton";

const TimeIsNow: React.FC = () => {
  const dispatch = useDispatch();
  const modalType = useSelector(selectModalType);
  const isCalendlyOpen = modalType === "calendly";

  const handleClick = useCallback(() => {
    dispatch(openModal({ type: "calendly" }));
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <section className="time-is-now" id="time-is-now">
      <div className="time-is-now__ellipses" />
      <AmHeroLogo />
      <div className="time-is-now__content">
        <TitleSection />
        <ScheduleMeetingButton handleOpen={handleClick} loading={false} />
        <h3>Join 500+ happy clients who achieved success!</h3>
      </div>
      {isCalendlyOpen && <Modal onClose={handleClose} modalType="calendly" />}
    </section>
  );
};

export default TimeIsNow;
