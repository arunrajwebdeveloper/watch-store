import AuthBanner from "@/components/auth/AuthBanner";
import "@/styles/auth/auth.style.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="auth-section">
      <div className="auth__wrapper">
        <div className="auth__banner">
          <AuthBanner />
        </div>
        <div className="auth__form-wrap">{children}</div>
      </div>
    </div>
  );
}
