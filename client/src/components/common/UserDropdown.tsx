"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
        <div className="user-dropdown-div" ref={componentRef}>
          <div className="user-dropdown-block">
            <div className="dropdown-avatar">
              <img
                className="user-drop-avatar"
                src={avatar}
                alt={fullName?.toString()}
                loading="lazy"
              />
            </div>
            <div className="user-dropdown-content">
              <div className="drop-user-name">
                <strong>{fullName}</strong>
              </div>
              <div className="user-dropdown-email">{email}</div>
              <div className="user-dropdown-link">
                <Link href="/profile">View profile</Link>
              </div>
              <div className="user-dropdown-link">
                <Link href="/profile/change-password">Change password</Link>
              </div>
              <div className="dropdown-logout-btn">
                <a onClick={onLogout}>Logout</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
