import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const isAuth = localStorage.getItem("admin_logged_in");

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtected;
