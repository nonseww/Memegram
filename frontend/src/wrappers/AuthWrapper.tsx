import { useTypedDispatch, useTypedSelector } from "@/store/hooks";
import { checkAuthThunk } from "@/store/slices/authSlice";
import { Loader } from "@/ui/Loader";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const AuthWrapper = () => {
  const dispatch = useTypedDispatch();
  const { isLoading } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return <Outlet />;
};
