import { NavLink, useNavigate } from "react-router-dom";
import Button from "../common/Button";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const handleNavLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <header className="admin-header">
      <div className="admin-header__container">
        <NavLink
          onClick={() => handleNavLinkClick("/")}
          to="/"
          className="underline"
        >
          <span>&larr;</span> Back to home
        </NavLink>
        <h1>Admin Dashboard</h1>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
