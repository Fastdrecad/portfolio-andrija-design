import { checkAuth } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    const isAdminRoute = location.pathname.startsWith("/admin");
    const isLoginPage = location.pathname === "/admin/login";

    if (isAdminRoute && !isAuthenticated && !isLoginPage) {
      navigate("/admin/login");
    } else if (isAuthenticated && isLoginPage) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return { isAuthenticated, token };
};
