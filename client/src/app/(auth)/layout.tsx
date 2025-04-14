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
          <div className="auth__banner-text">
            <div className="auth__banner-text-content">
              <h2>Where Every Second Counts.</h2>
              <span className="banner-sub-text">
                Explore our exclusive collection of premium watches.
              </span>
            </div>
          </div>
          <AuthBanner />
        </div>
        <div className="auth__form-wrap">{children}</div>
      </div>
    </div>
  );
}
