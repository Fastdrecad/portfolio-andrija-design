import { AnimatePresence } from "framer-motion";
import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// Lazy load admin routes
const Login = lazy(() => import("@/pages/admin/Login"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const PortfolioManager = lazy(() => import("@/pages/admin/PortfolioManager"));

import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import PageTransition from "@/components/app/PageTransition";
import { useAuth } from "@/hooks/useAuth";
import AboutPage from "@/pages/About";
import ContactPage from "@/pages/Contact";
import DesignProcessPage from "@/pages/DesignProcess";
import HomePage from "@/pages/Home";
import NotFoundPage from "@/pages/NotFound";
import PortfolioPage from "@/pages/Portfolio";
import SuccessPage from "@/pages/Success";
import ProtectedRoute from "@/routes/ProtectedRoute";

const RoutesConfig: React.FC = () => {
  useAuth();
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/portfolio"
            element={
              <PageTransition>
                <PortfolioPage />
              </PageTransition>
            }
          />

          <Route
            path="/design-process"
            element={
              <PageTransition>
                <DesignProcessPage />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <AboutPage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <SuccessPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />

          {/* Admin routes */}
          <Route path="/admin">
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="login" element={<Login />} />
            <Route
              path="dashboard"
              element={
                <AdminProtectedRoute>
                  <Dashboard />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<PortfolioManager />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default RoutesConfig;
