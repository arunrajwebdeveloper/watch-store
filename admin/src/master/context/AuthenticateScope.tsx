import { createContext, type ReactNode } from "react";
import { useImmer } from "use-immer";

export interface AuthenticateState {
  user: any | null;
}

export const AuthenticateContext = createContext<any | null>(null);

export const AuthenticateScope = ({ children }: { children: ReactNode }) => {
  const localUser = localStorage.getItem("x__watch_dashboard_user");
  const localUserState = localUser ? JSON.parse(localUser) : { user: null };

  const [authenticateState, setAuthenticateState] =
    useImmer<AuthenticateState>(localUserState);

  return (
    <AuthenticateContext.Provider
      value={{
        authenticateState,
        setAuthenticateState,
      }}
    >
      {children}
    </AuthenticateContext.Provider>
  );
};
