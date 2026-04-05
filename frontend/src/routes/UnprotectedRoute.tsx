import { useTypedSelector } from "@/store/hooks";
import { Loader } from "@/ui/Loader";
import { Navigate, Outlet } from "react-router-dom";

export const UnprotectedRoute = () => {
  const { isAuth, isInitLoading } = useTypedSelector((state) => state.auth);

  if (isInitLoading) {
    return <Loader />;
  }

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
