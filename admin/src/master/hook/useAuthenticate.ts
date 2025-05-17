import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useAuthenticateScopeContext,
  authenticate,
  userLogout,
  getCurrentUser,
} from "..";

type AuthState = {
  email: string;
  password: string;
};

export const useAuthenticate = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<AuthState>({
    defaultValues: {
      email: "admin@gmail.com",
      password: "Admin@1234",
    },
  });

  const { setAuthenticateState } = useAuthenticateScopeContext();

  type UserState = {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };

  const ROLE = {
    ADMIN: "admin",
  };

  const setUserDataToLocalStorage = (user: UserState) => {
    const { name, email, role, avatar } = user;
    localStorage.setItem(
      "x__watch_dashboard_user",
      JSON.stringify({ user: { name, email, role, avatar } })
    );
  };

  const setAccessTokenToLocalStorage = (token: string) => {
    localStorage.setItem("x__watch_dashboard_token", token);
  };

  const loginMutation = useMutation({
    mutationFn: (data) => authenticate(data),
    onSuccess: async (data) => {
      if (data.accessToken) {
        const user = await getCurrentUser(data.accessToken);
        if (user && user?.role === ROLE.ADMIN) {
          setAccessTokenToLocalStorage(data.accessToken);
          setUserDataToLocalStorage(user);
          setAuthenticateState({ user });
          navigate("/u/dashboard", { replace: true });
        } else {
          alert("Only Admin user allowed here");
          window.location.href = "/account/login";
        }
      }
    },
    onError: (e) => {
      console.log(e);
    },
    onSettled: () => {},
  });

  const onSubmit = (payload: any) => {
    loginMutation.mutate(payload);
  };

  const signoutAccount = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      localStorage.removeItem("x__watch_dashboard_user");
      localStorage.removeItem("x__watch_dashboard_token");
      window.location.href = "/account/login";
    },
    onError: (e) => {
      console.error("Error: ", e);
    },
  });

  return {
    onSubmit,
    loginMutation,
    register,
    handleSubmit,
    formState,
    signoutAccount,
  };
};
