"use client";

import AuthForm from "@/components/auth/AuthForm";

export default function ResetPasswordPage() {
  return (
    <div className="auth__form-block">
      <h1 className="text-md">Reset your account password</h1>
      <h3 className="text-sm">
        Enter your email and we’ll send you reset link.
      </h3>
      <AuthForm name="reset-password" />
    </div>
  );
}
