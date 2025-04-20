"use client";
import { useAppSelector } from "@/store";
import React from "react";

function Profile() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <img
            src={user.avatar}
            style={{
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              marginBottom: "40px",
            }}
          />
          <h4>{user.name}</h4>
          <h5>{user.email}</h5>
        </div>
      ) : (
        <span>User not found</span>
      )}
    </div>
  );
}

export default Profile;
