import { createContext, type ReactNode } from "react";
import { useImmer } from "use-immer";

export interface AuthenticateState {
  user: any | null;
}

export const AuthenticateContext = createContext<any | null>(null);

export const AuthenticateScope = ({ children }: { children: ReactNode }) => {
  const [authenticateState, setAuthenticateState] = useImmer<AuthenticateState>(
    { user: null }
  );

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
