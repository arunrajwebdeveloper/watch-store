import { Link } from "react-router-dom";
import { useAuthenticateScopeContext, useAuthenticate } from "../../master";
import UserDropdown from "./UserDropdown";

export const Header = () => {
  const { authenticateState } = useAuthenticateScopeContext();
  const { user } = authenticateState;
  const { signoutAccount } = useAuthenticate();

  const userSignOut = () => {
    signoutAccount.mutate();
  };

  return (
    <header className="main-header w-100 border-bottom px-4 d-flex align-items-center">
      <div className="header-container w-100">
        <div className="row">
          <div className="d-flex justify-content-between align-items-center col-12">
            <Link to="/u/dashboard" className="main-logo ">
              <div className="d-flex justify-content-start align-items-center gap-2">
                <h2>WatchStore</h2>
                <span className="d-inline-block bg-primary text-white px-2 rounded small">
                  ADMIN
                </span>
              </div>
            </Link>
            <div className="d-flex justify-content-between align-items-center gap-3">
              <UserDropdown user={user} onLogout={userSignOut} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
