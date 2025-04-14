"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { loginUser, registerUser } from "@/store/slices/authSlice";

export default function AuthForm() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const isLogin = usePathname().includes("login");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await dispatch(loginUser(form)).unwrap();
      } else {
        await dispatch(registerUser(form)).unwrap();
      }
      router.push("/home");
    } catch (err) {
      alert("Auth failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
      {!isLogin && (
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">{isLogin ? "Login" : "Register"}</button>
    </form>
  );
}
