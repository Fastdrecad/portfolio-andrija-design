import { lazy } from "react";

export const pages = {
  HomePage: lazy(() => import("@/pages/Home")),
  PortfolioPage: lazy(() => import("@/pages/Portfolio")),
  DesignProcessPage: lazy(() => import("@/pages/DesignProcess")),
  AboutPage: lazy(() => import("@/pages/About")),
  ContactPage: lazy(() => import("@/pages/Contact")),
  SuccessPage: lazy(() => import("@/pages/Success")),
  NotFoundPage: lazy(() => import("@/pages/NotFound")),
  AdminLogin: lazy(() => import("@/pages/admin/Login")),
  AdminDashboard: lazy(() => import("@/pages/admin/Dashboard")),
  PortfolioManager: lazy(() => import("@/pages/admin/PortfolioManager")),
  EditPortfolioPage: lazy(() => import("@/pages/admin/EditPortfolioPage")),
  ProjectDetail: lazy(() => import("@/pages/ProjectDetail"))
};
