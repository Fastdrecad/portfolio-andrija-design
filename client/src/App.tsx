import { RootState } from "@/redux/store";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { AnimatePresence } from "framer-motion";
import { BrowserRouter } from "react-router-dom";

import { DarkModeContext } from "@/context/darkModeContext";

import useLoading from "@/hooks/useLoading";

import Router from "@/routes/Router";

import Loader from "@/components/animations/Loader";
import NavigateToTop from "@/components/app/NavigateToTop";
import ScrollToTop from "@/components/app/ScrollToTop";
import VisibilityControl from "@/components/app/VisibilityControl";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);

  // 'useLoading' returns true when loading is ongoing
  const loading = useLoading(true, 2000);

  // Use Redux state to track if Calendly modal is open
  const isCalendlyOpen = useSelector(
    (state: RootState) => state.modal.calendly
  );

  // State to manage the extended loading state (for an additional 1000ms)
  const [isLoadingWithDelay, setIsLoadingWithDelay] = useState(true);

  useEffect(() => {
    let delayTimer: NodeJS.Timeout | null = null;

    // If loading is complete, start the additional 1000ms delay
    if (!loading) {
      delayTimer = setTimeout(() => {
        setIsLoadingWithDelay(false); // Set to false after the extended delay
      }, 1200);
    } else {
      // If loading is ongoing, set to true
      setIsLoadingWithDelay(true);
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, [loading]);

  useEffect(() => {
    // Disable scrolling during the entire loading period (including additional delay) or when Calendly modal is open
    if (isLoadingWithDelay || isCalendlyOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoadingWithDelay, isCalendlyOpen]);

  return (
    <HelmetProvider>
      <div className={`theme-${darkMode ? "dark" : "light"} app`}>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            {loading && <Loader active={loading} />}
          </AnimatePresence>
          <NavigateToTop />
          <VisibilityControl>
            <Header />
            <Sidebar />
          </VisibilityControl>
          <Router />
          <VisibilityControl>
            <Footer />
          </VisibilityControl>
          <ScrollToTop />
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </HelmetProvider>
  );
};

export default App;
