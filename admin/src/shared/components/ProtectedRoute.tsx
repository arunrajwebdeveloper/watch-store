import { Navigate } from "react-router-dom";
import { useAuthenticateScopeContext } from "../../master";
import type { ReactNode } from "react";

export const ProtectedRoute = ({
  children,
  redirectUrl,
}: {
  children: ReactNode;
  redirectUrl: string;
}) => {
  const { authenticateState } = useAuthenticateScopeContext();

  return authenticateState?.accessToken ? (
    children
  ) : (
    <Navigate to={redirectUrl} />
  );
};
