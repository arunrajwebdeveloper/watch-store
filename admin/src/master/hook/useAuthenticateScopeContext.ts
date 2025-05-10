import { useContext } from "react";
import { AuthenticateContext } from "../../master";

export const useAuthenticateScopeContext = () =>
  useContext(AuthenticateContext);
