import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">
      <div className="admin-header__container">
        <h1>Admin Dashboard</h1>
        <Button variant="secondary" onClick={handleLogout}>
          LOGOUT
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
