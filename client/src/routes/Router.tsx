import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setCurrentRoute } from "@/redux/routeSlice";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";

import useViewportHeight from "@/hooks/useViewportHeight";

import HomePage from "@/pages/Home";
import PortfolioPage from "@/pages/Portfolio";
import AboutPage from "@/pages/About";
import ContactPage from "@/pages/Contact";
import NotFoundPage from "@/pages/NotFound";
import DesignProcessPage from "@/pages/DesignProcess";
import SuccessPage from "@/pages/Success";
import ProjectDetail from "@/pages/ProjectDetail";

const RoutesConfig: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useViewportHeight();

  // Dispatch the current route to Redux store when location changes
  useEffect(() => {
    const { pathname, state } = location;
    dispatch(setCurrentRoute({ pathname, isModal: state?.isModal || false }));
  }, [location, dispatch]);

  return (
    <HelmetProvider>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/design-process" element={<DesignProcessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </HelmetProvider>
  );
};

export default RoutesConfig;
