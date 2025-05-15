import { Link } from "react-router-dom";
import { useAuthenticateScopeContext, useAuthenticate } from "../../master";

export const Header = () => {
  const { authenticateState } = useAuthenticateScopeContext();
  const {
    user: { name, email, role },
  } = authenticateState;
  const { signoutAccount } = useAuthenticate();

  const userSignOut = () => {
    signoutAccount.mutate();
  };

  const isAdmin = role === "admin";

  return (
    <header className="w-100 border-bottom py-2">
      <div className="header-container">
        <div className="row">
          <div className="d-flex justify-content-between align-items-center col-12">
            <Link to="/u" className="main-logo">
              <h2>WatchStore</h2>
            </Link>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong className="d-flex align-items-center">
                  <span>{name || "Unknown"}</span>
                  {isAdmin && (
                    <svg
                      width="16"
                      height="16"
                      fill="#0049ff"
                      viewBox="0 0 16 16"
                      className="ms-1"
                    >
                      <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6zm11.386 3.785-1.806-2.41-.776 2.413zm-3.633.004.961-2.989H4.186l.963 2.995zM5.47 5.495 8 13.366l2.532-7.876zm-1.371-.999-.78-2.422-1.818 2.425zM1.499 5.5l5.113 6.817-2.192-6.82zm7.889 6.817 5.123-6.83-2.928.002z" />
                    </svg>
                  )}
                </strong>
                <div>{email}</div>
              </div>
              <div className="ms-3">
                <button className="btn btn-success" onClick={userSignOut}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
