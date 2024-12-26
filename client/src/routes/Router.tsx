import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import PageTransition from "@/components/app/PageTransition/index";
import { pages } from "@/config/routesConfig";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { Suspense } from "react";

const RoutesConfig: React.FC = () => {
  useAuth();
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PageTransition>
                  <pages.HomePage />
                </PageTransition>
              </Suspense>
            }
          />

          <Route
            path="/portfolio"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PageTransition>
                  <pages.PortfolioPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route path="/portfolio/:slug" element={<pages.ProjectDetail />} />
          <Route
            path="/design-process"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PageTransition>
                  <pages.DesignProcessPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PageTransition>
                  <pages.AboutPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PageTransition>
                  <pages.ContactPage />
                </PageTransition>
              </Suspense>
            }
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
