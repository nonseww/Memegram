import { useTypedSelector } from "@/store/hooks";
import { Loader } from "@/ui/Loader";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface Roles {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: Roles) => {
  const { isAuth, isInitLoading, user } = useTypedSelector(
    (state) => state.auth,
  );
  const location = useLocation();

  if (isInitLoading) {
    return <Loader />;
  }

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user) {
    const isRoleOkay = allowedRoles.includes(user.role);
    if (!isRoleOkay) {
      return <Navigate to="/forbidden" replace />;
    }
  }

  return <Outlet />;
};
