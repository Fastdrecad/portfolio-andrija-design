import { useContext } from "react";

import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { DarkModeContext } from "@/context/darkModeContext";

import useLoading from "@/hooks/useLoader";

import Router from "@/routes/Router";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import ScrollToTop from "@/components/app/ScrollToTop";
import NavigateToTop from "@/components/app/NavigateToTop";
import Sidebar from "@/components/layout/Sidebar";
import Loader from "@/components/animations/Loader";
import VisibilityControl from "@/components/app/VisibilityControl";

const App: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);

  const loaded = useLoading(true, 2000); // Hook managing the loader state

  return (
    <div className={`theme-${darkMode ? "dark" : "light"} app`}>
      <BrowserRouter>
        <NavigateToTop />
        <AnimatePresence mode="wait">
          {loaded && <Loader active={loaded} />}
        </AnimatePresence>
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
    </div>
  );
};

export default App;
