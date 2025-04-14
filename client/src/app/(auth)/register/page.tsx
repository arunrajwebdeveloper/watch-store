"use client";

import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <div className="auth__form-block">
      <h1 className="text-md">Create your account</h1>
      <h3 className="text-sm">Join us and unlock a world of possibilities.</h3>
      <AuthForm name="register" />
    </div>
  );
}
