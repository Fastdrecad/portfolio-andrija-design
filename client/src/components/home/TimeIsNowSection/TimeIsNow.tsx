import React, { useCallback, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { openModal, closeModal } from "@/redux/modalSlice";

import useViewportHeight from "@/hooks/useViewportHeight";

import AmHeroLogo from "@/components/home/TimeIsNowSection/AmHeroLogo";
import TitleSection from "@/components/home/TimeIsNowSection/TitleSection";
import Modal from "@/components/common/Modal/Modal";
import ScheduleMeetingButton from "@/components/home/TimeIsNowSection/ScheduleMeetingButton";

const TimeIsNow: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const isCalendlyOpen = useSelector(
    (state: RootState) => state.modal.calendly
  );

  useViewportHeight(); // Adjust viewport height for mobile devices

  const handleOpen = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      dispatch(openModal({ modalType: "calendly" }));
    }, 1000);
  }, [dispatch]);

  const handleClose = useCallback(() => {
    setIsLoading(false);
    dispatch(closeModal("calendly"));
  }, [dispatch]);

  // Z-index handling for Calendly modal
  const widgetRef = useRef<HTMLDivElement>(null);
  const body = document.body;

  useEffect(() => {
    body.style.overflow = isCalendlyOpen ? "hidden" : "visible";

    const handleClickOutside = (event: MouseEvent) => {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      body.style.overflow = "visible";
    };
  }, [isCalendlyOpen, handleClose, body.style]);

  return (
    <section className="time-is-now" id="time-is-now">
      <div className="time-is-now__ellipses" />
      <AmHeroLogo />
      <div className="time-is-now__content">
        <TitleSection />
        <ScheduleMeetingButton handleOpen={handleOpen} loading={isLoading} />
        <h3>Join 500+ happy clients who achieved success!</h3>
        {isCalendlyOpen && <Modal onClose={handleClose} modalType="calendly" />}
      </div>
    </section>
  );
};

export default React.memo(TimeIsNow);
