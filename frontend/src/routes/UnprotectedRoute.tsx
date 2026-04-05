import { useTypedSelector } from "@/store/hooks";
import { Loader } from "@/ui/Loader";
import { Navigate, Outlet } from "react-router-dom";

export const UnprotectedRoute = () => {
  const { isAuth, isLoading } = useTypedSelector((state) => state.auth);

  if (isLoading) {
    return <Loader />;
  }

  if (isAuth) {
    <Navigate to="/" replace />;
  }

  return <Outlet />;
};
