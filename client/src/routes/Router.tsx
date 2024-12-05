import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import PageTransition from "@/components/app/PageTransition";
import { pages } from "@/config/routesConfig"; // Import the routes configuration
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/routes/ProtectedRoute";

// Helper function to wrap components with PageTransition
const withPageTransition = (Component: React.FC) => (
  <PageTransition>
    <Component />
  </PageTransition>
);

const RoutesConfig: React.FC = () => {
  useAuth();
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={withPageTransition(pages.HomePage)} />
          <Route
            path="/portfolio"
            element={withPageTransition(pages.PortfolioPage)}
          />
          <Route
            path="/design-process"
            element={withPageTransition(pages.DesignProcessPage)}
          />
          <Route path="/about" element={withPageTransition(pages.AboutPage)} />
          <Route
            path="/contact"
            element={withPageTransition(pages.ContactPage)}
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <pages.SuccessPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<pages.NotFoundPage />} />

          {/* Admin Routes */}
          <Route path="/admin">
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="login" element={<pages.AdminLogin />} />
            <Route
              path="dashboard"
              element={
                <AdminProtectedRoute>
                  <pages.AdminDashboard />
                </AdminProtectedRoute>
              }
            >
              <Route
                path="portfolio/edit/:slug"
                element={
                  <AdminProtectedRoute>
                    <pages.EditPortfolioPage />
                  </AdminProtectedRoute>
                }
              />
              <Route index element={<pages.PortfolioManager />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default RoutesConfig;
