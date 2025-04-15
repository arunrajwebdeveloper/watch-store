"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLogin = name === "login";
  const isRegister = name === "register";
  const isResetPassword = name === "reset-password";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await dispatch(loginUser(form)).unwrap();
      } else if (isRegister) {
        await dispatch(registerUser(form)).unwrap();
      } else if (isResetPassword) {
        await dispatch(resetPassword(form)).unwrap();
      }
      router.push("/home");
    } catch (err) {
      alert("Auth failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth__main-form">
      {isRegister && (
        <div className="form-controller">
          <input
            className="input-element"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
