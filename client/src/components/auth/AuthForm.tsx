"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store";
import {
  loginUser,
  registerUser,
  resetPassword,
} from "@/store/slices/authSlice";
import Link from "next/link";

type PropType = {
  name: string;
};

export default function AuthForm({ name }: PropType) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/home";

  const isLogin = name === "login";
  const isRegister = name === "register";
  const isResetPassword = name === "reset-password";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { email, password } = form;
        await dispatch(loginUser({ email, password })).unwrap();
        return router.push(redirectPath);
      } else if (isRegister) {
        await dispatch(registerUser(form)).unwrap();
      } else if (isResetPassword) {
        const { email } = form;
        await dispatch(resetPassword({ email })).unwrap();
      }
      router.push("/home");
    } catch (err) {
      alert("Auth failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth__main-form">
      {isRegister && (
        <div className="row" style={{ display: "flex", gap: "10px" }}>
          <div className="col-6">
            <div className="form-controller">
              <input
                className="input-element"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-controller">
              <input
                className="input-element"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}
      <div className="form-controller">
        <input
          className="input-element"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      {(isLogin || isRegister) && (
        <div className="form-controller">
          <input
            className="input-element"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
      )}

      <div className="form-controller">
        <button className="btn primary" type="submit">
          {isLogin ? "Login" : isResetPassword ? "Get reset link" : "Register"}
        </button>
      </div>

      {isRegister && (
        <div className="form__row">
          <span className="inline-text">
            Already have an account? <Link href="/login">Login</Link>
          </span>
        </div>
      )}

      {isLogin && (
        <div className="form__row">
          <span className="inline-text">
            Don’t have an account? <Link href="/register">Register now</Link>
          </span>
          <span className="inline-text">
            Forgot password? <Link href="/reset-password">Reset password</Link>
          </span>
        </div>
      )}

      {isResetPassword && (
        <div className="form__row">
          <span className="inline-text">
            Remembered your password? <Link href="/login">Login</Link>
          </span>
        </div>
      )}
    </form>
  );
}
