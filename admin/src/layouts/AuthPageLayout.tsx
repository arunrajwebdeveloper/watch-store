import type { ReactNode } from "react";
import "./styles/layouts.styles.css";
export const AuthPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="auth-wrapper">
      <div className="auth-row d-flex">
        <div className="col-8">
          <div className="h-100 landing-banner d-flex align-items-center justify-content-start">
            <div className="banner-content">
              <h1 className="banner-xl-text mb-0">
                Welcome back. Let’s make every second count.
              </h1>
            </div>
          </div>
        </div>
        <div className="col-4">{children}</div>
      </div>
    </section>
  );
};
