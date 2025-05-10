import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createAccounts } from "../api";

type AuthState = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
};

export const useCreateAccount = () => {
  const navigate = useNavigate();

  const { register, watch, handleSubmit, formState } = useForm<AuthState>({
    defaultValues: {
      firstname: "Admin",
      lastname: "",
      email: "admin@gmail.com",
      password: "Admin@1234",
      confirmPassword: "Admin@1234",
      isAdmin: false,
    },
  });

  const createAccount = useMutation({
    mutationFn: (data) => createAccounts(data),
    onSuccess: (data) => {
      if (data) {
        navigate("/login", { replace: true });
      }
    },
    onError: (e) => {
      console.log(e);
    },
    onSettled: () => {},
  });

  const onSubmit = (evt: any) => {
    const { confirmPassword, ...payload } = evt;

    createAccount.mutate(payload);
  };

  return {
    onSubmit,
    createAccount,
    register,
    watch,
    handleSubmit,
    formState,
  };
};
