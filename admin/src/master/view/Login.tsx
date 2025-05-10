import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticate, useAuthenticateScopeContext } from "..";
import { AuthPageLayout } from "../../layouts";
import { useImmer } from "use-immer";

type PasswordField = "password";

export const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useImmer({
    password: false,
  });

  const {
    onSubmit,
    loginMutation,
    register,
    handleSubmit,
    formState: { errors },
  } = useAuthenticate();
  const { setIsRemember, isRemember, authenticateState } =
    useAuthenticateScopeContext();

  useEffect(() => {
    if (authenticateState?.accessToken) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, authenticateState?.accessToken]);

  const showHidePassword = (field: PasswordField) => {
    setShowPass((draft) => {
      draft[field] = !draft[field];
      return draft;
    });
  };

  return (
    <AuthPageLayout>
      <div className="auth-form-holder">
        <h1 className="mb-5 form-title">Login to your account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="emailId" className="form-label">
              Email address<em>*</em>
            </label>
            <input
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="emailId"
              // name="email"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="form-error-message">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password<em>*</em>
            </label>
            <div className="input-group">
              <input
                type={!showPass.password ? "password" : "text"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                // name="password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <span
                className="input-group-text"
                onClick={() => showHidePassword("password")}
              >
                {showPass.password ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </span>
            </div>
            {errors.password && (
              <span className="form-error-message">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              checked={isRemember}
              onChange={() => setIsRemember((draft: any) => !draft)}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Keep me logged in
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary p-3 w-100 mt-2 fw-bold"
            disabled={loginMutation?.isPending}
          >
            Login
          </button>
        </form>
        <div className="mt-4 form-footer-text">
          <span>
            I don't have an account.
            <Link className="text-link primary ms-3" to="/account/signup">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </AuthPageLayout>
  );
};
