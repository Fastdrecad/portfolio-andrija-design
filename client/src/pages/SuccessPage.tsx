import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Confetti from "react-confetti";
import pageTransition from "@components/pageTransition";
import { useDispatch } from "react-redux";
import { setCurrentRoute } from "../redux/routeSlice";

const SuccessPage: React.FC = () => {
  useEffect(() => {
    document.title = "Submission Successful | Andrija Mićunović Design";
    return () => {
      document.title = "Default Title";
    };
  }, []);

  const [pieces, setPieces] = useState<number>(200);
  const dispatch = useDispatch();

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 3000);
  };

  useEffect(() => {
    stopConfetti();
  }, []);

  return (
    <div className="success">
      <div className="success__wrapper">
        <div className="success__message">
          <h1 className="success__title">Thank you! ✨</h1>
          <p>Your form submission has been received.</p>
          <NavLink
            onClick={() => handleNavLinkClick("/")}
            to="/"
            className="success__back-to"
          >
            <span>&larr;</span> Back to home
          </NavLink>
        </div>
      </div>
      <Confetti gravity={0.3} numberOfPieces={pieces} />
    </div>
  );
};

const SuccessPageWithTransition = pageTransition(SuccessPage);

export default SuccessPageWithTransition;
