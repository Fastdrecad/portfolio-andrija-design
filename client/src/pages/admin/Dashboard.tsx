import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <div className="admin-dashboard__content">
        <AdminSidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
