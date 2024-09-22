import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import PortfolioPage from '@pages/PortfolioPage';
import AboutPage from '@pages/AboutPage';
import ContactPage from '@pages/ContactPage';
import NotFoundPage from '@pages/NotFoundPage';
import DesignProcessPage from '@pages/DesignProcessPage';
import SuccessPage from '@pages/SuccessPage';

const RoutesConfig: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait' initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<HomePage />} />
        <Route path='/portfolio' element={<PortfolioPage />} />
        <Route path='/design-process' element={<DesignProcessPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/success' element={<SuccessPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default RoutesConfig;
