import { BrowserRouter as Router } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DarkModeContext } from "./context/darkModeContext";
import RoutesConfig from "./routes/routes";
import Header from "@components/Header";
import Footer from "@components/Footer";
import ScrollToTop from "@components/ScrollToTop";
import NavigateToTop from "@components/NavigateToTop";
import VisibilityControl from "@components/VisibilityControl";
import Sidebar from "@components/Sidebar";
import Loader from "@components/Loader";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    // (async () => {
    //   const LocomotiveScroll = (await import("locomotive-scroll")).default;
    //   new LocomotiveScroll();

    // })();
    setTimeout(() => {
      setLoaded(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);
  }, []);

  return (
    <div className={`theme-${darkMode ? "dark" : "light"} app`}>
      <Router>
        <NavigateToTop />
        <AnimatePresence mode="wait">
          {loaded && <Loader active={loaded} />}
        </AnimatePresence>
        <VisibilityControl>
          <Header />
          <Sidebar />
        </VisibilityControl>
        <RoutesConfig />
        <VisibilityControl>
          <Footer />
        </VisibilityControl>
        <ScrollToTop />
      </Router>
    </div>
  );
}

export default App;
