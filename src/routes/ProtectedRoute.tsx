import { useAuthStore } from "../store/auth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/signin" replace />;
  return children;
};
