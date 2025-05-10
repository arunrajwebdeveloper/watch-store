import { useEffect, createContext, type ReactNode } from "react";
import { useImmer } from "use-immer";
import { getCookie } from "../../utils";

export interface AuthenticateState {
  accessToken: string | null;
  user: any | null;
}

export const AuthenticateContext = createContext<any | null>(null);

export const AuthenticateScope = ({ children }: { children: ReactNode }) => {
  const localCookie = getCookie("watchstore__dashboard_user");

  const cookieData: AuthenticateState = localCookie
    ? JSON.parse(localCookie)
    : {
        accessToken: null,
        user: null,
      };

  const [authenticateState, setAuthenticateState] =
    useImmer<AuthenticateState>(cookieData);

  const isRememberLocal = localStorage.getItem(
    "watchstore__dashboard_user__remember"
  );

  const [isRemember, setIsRemember] = useImmer<boolean>(
    isRememberLocal ? JSON.parse(isRememberLocal) : false
  );

  useEffect(() => {
    localStorage.setItem(
      "watchstore__dashboard_user__remember",
      JSON.stringify(isRemember)
    );
  }, [isRemember]);

  return (
    <AuthenticateContext.Provider
      value={{
        authenticateState,
        isRemember,
        setAuthenticateState,
        setIsRemember,
      }}
    >
      {children}
    </AuthenticateContext.Provider>
  );
};
