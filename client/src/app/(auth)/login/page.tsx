"use client";

import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="auth__form-block">
      <h1 className="text-md">Sign in to your account</h1>
      <h3 className="text-sm">
        Sign in to stay productive, informed, and connected.
      </h3>
      <AuthForm name="login" />
    </div>
  );
}
