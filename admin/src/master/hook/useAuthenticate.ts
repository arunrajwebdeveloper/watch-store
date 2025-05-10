import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthenticateScopeContext, authenticate, userLogout } from "..";
import { setCookie, removeCookie } from "../../utils";

const COOKIE_EXPIRY_DAYS = 1;

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

  const { setAuthenticateState, isRemember, setIsRemember } =
    useAuthenticateScopeContext();

  const loginMutation = useMutation({
    mutationFn: (data) => authenticate(data),
    onSuccess: (data) => {
      if (data?.accessToken && data?.user?.role === "admin") {
        setAuthenticateState(data);

        if (isRemember) {
          setCookie(
            "watchstore__dashboard_user",
            JSON.stringify(data),
            COOKIE_EXPIRY_DAYS
          );
        } else {
          setCookie("watchstore__dashboard_user", JSON.stringify(data));
        }
        navigate("/dashboard", { replace: true });
      } else {
        alert("Only Admin user allowed here");
        removeCookie("watchstore__dashboard_user");
        setIsRemember(false);
        window.location.href = "/account/login";
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

  type MutateType = {
    refreshToken: string;
  };

  const signoutAccount = useMutation({
    mutationFn: (data: MutateType) => userLogout(data),
    onSuccess: () => {
      removeCookie("watchstore__dashboard_user");
      setIsRemember(false);
      window.location.href = "/account/login";
    },
    onError: (e) => {
      console.log("error :>> ", e);
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
