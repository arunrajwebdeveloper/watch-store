import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateAccount, useAuthenticateScopeContext } from "..";
import { LandingPageLayout } from "../../layouts";
import { useImmer } from "use-immer";

type PasswordField = "password" | "confirmPassword";

export const SignUp = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useImmer({
    password: false,
    confirmPassword: false,
  });

  const {
    onSubmit,
    createAccount,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useCreateAccount();
  const { authenticateState } = useAuthenticateScopeContext();

  const password = watch("password", "");
  var passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  useEffect(() => {
    if (authenticateState?.accessToken) {
      navigate("/dashboard", { replace: true });
    }
  }, [authenticateState?.accessToken]);

  const showHidePassword = (field: PasswordField) => {
    setShowPass((draft) => {
      draft[field] = !draft[field];
      return draft;
    });
  };

  return (
    <LandingPageLayout>
      <div className="auth-form-holder">
        <h1 className="mb-5 form-title">Create an account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="firstName" className="form-label">
                First name<em>*</em>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstname ? "is-invalid" : ""
                }`}
                id="firstName"
                // name="firstname"
                {...register("firstname", {
                  required: "First name is required",
                  minLength: {
                    value: 3,
                    message: "First name must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "First name limited to 20 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Only alphabetic characters allowed",
                  },
                })}
              />
              {errors.firstname && (
                <span className="form-error-message">
                  {errors.firstname.message}
                </span>
              )}
            </div>
            <div className="col-6">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.lastname ? "is-invalid" : ""
                }`}
                id="lastName"
                // name="lastname"
                {...register("lastname", {
                  maxLength: {
                    value: 20,
                    message: "Last name limited to 20 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Only alphabetic characters allowed",
                  },
                })}
              />
              {errors.lastname && (
                <span className="form-error-message">
                  {errors.lastname.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address<em>*</em>
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="exampleInputEmail1"
              // name="email"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
            {errors.email && (
              <span className="form-error-message">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password<em>*</em>
            </label>
            <div className="input-group">
              <input
                type={!showPass.password ? "password" : "text"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="exampleInputPassword1"
                // name="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  maxLength: {
                    value: 50,
                    message: "Password limited to 50 characters",
                  },
                  pattern: {
                    value: passwordPattern,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@ $ ! % * ? &)",
                  },
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
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password<em>*</em>
            </label>
            <div className="input-group">
              <input
                type={!showPass.confirmPassword ? "password" : "text"}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                id="exampleInputPassword2"
                // name="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords does not match",
                })}
              />
              <span
                className="input-group-text"
                onClick={() => showHidePassword("confirmPassword")}
              >
                {showPass.confirmPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="form-error-message">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary p-3 w-100 mt-2 fw-bold"
            disabled={createAccount?.isPending}
          >
            Create account
          </button>
        </form>
        <div className="mt-4 form-footer-text">
          <span>
            Already i have an account.
            <Link className="text-link primary ms-3" to="/account/login">
              Login
            </Link>
          </span>
        </div>
      </div>
    </LandingPageLayout>
  );
};
