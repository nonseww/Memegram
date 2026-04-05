import { useTypedDispatch, useTypedSelector } from "@/store/hooks";
import { checkAuthThunk, clearError } from "@/store/slices/authSlice";
import { Loader } from "@/ui/Loader";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const AuthWrapper = () => {
  const dispatch = useTypedDispatch();
  const location = useLocation();
  const { user, isAuth, isLoading, error } = useTypedSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (!isAuth && !isLoading) {
      dispatch(checkAuthThunk());
    }
  }, [dispatch, isAuth, isLoading]);

  if (isLoading && !user) {
    return <Loader />;
  }

  if (error && location.pathname !== "/login") {
    alert(`Cannot authenticate! ERROR: ${error}`);
    setTimeout(() => dispatch(clearError()), 2000);
  }

  return <Outlet />;
};
