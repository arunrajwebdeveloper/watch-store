import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useAuthenticateScopeContext,
  authenticate,
  userLogout,
  getCurrentUser,
} from "..";
import { useEffect } from "react";

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

  const { setAuthenticateState, authenticateState } =
    useAuthenticateScopeContext();

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        if (!authenticateState?.user) {
          const user = await getCurrentUser();
          if (user) {
            setAuthenticateState({ user });
            navigate("/dashboard", { replace: true });
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        window.location.href = "/account/login";
      }
    };

    fetchAndSetUser();
  }, []);

  const loginMutation = useMutation({
    mutationFn: (data) => authenticate(data),
    onSuccess: async (data) => {
      if (data) {
        const user = await getCurrentUser();
        if (user && user?.role === "admin") {
          setAuthenticateState({ user });
          navigate("/dashboard", { replace: true });
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
    mutationFn: () => userLogout(),
    onSuccess: () => {
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
