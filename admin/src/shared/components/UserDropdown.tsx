import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function UserDropdown({ user, onLogout }: { user: any; onLogout: () => void }) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { fullName, email, avatar } = user;

  const handleClickOutside = (event: any) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="user-dropdown">
      <button
        className="user-dropdown-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          style={{
            width: "40px",
            height: "40px",
            overflow: "hidden",
            borderRadius: "50%",
            border: "1px solid #eee",
          }}
          src={avatar}
          alt={fullName?.toString()}
          loading="lazy"
        />
      </button>
      {isOpen && (
        <div className="user-dropdown-div p-4" ref={componentRef}>
          <div className="d-flex gap-4">
            <div className="mb-3">
              <img
                className="user-drop-avatar"
                src={avatar}
                alt={fullName?.toString()}
                loading="lazy"
              />
            </div>
            <div>
              <div>
                <strong>{fullName}</strong>
              </div>
              <div className="mt-2">{email}</div>
              <div className="mt-2">
                <Link
                  to="/u/profile"
                  className="link-primary text-decoration-none"
                >
                  Profile settings
                </Link>
              </div>
              <div className="mt-2">
                <Link
                  to="/u/change-password"
                  className="link-primary text-decoration-none"
                >
                  Change password
                </Link>
              </div>
              <div className="mt-5">
                <a
                  className="link-danger cursor-pointer text-decoration-none fw-bold"
                  onClick={onLogout}
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
