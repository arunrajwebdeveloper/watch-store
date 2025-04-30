"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { addAddress } from "@/store/slices/authSlice";
import { AddressInput } from "@/types";

function Profile() {
  const [address, setAddress] = useState<AddressInput>({
    fullname: "",
    contact: "",
    address: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    tag: "",
  });

  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const onHandleAddress = (e: any) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onHandleDefault = (e: any) => {
    const { name, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="container">
      <div className="profile-wrapper" style={{ padding: "40px 0" }}>
        <div className="page-header">
          <h2>Profile</h2>
        </div>
        {user ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "40px",
            }}
          >
            <div style={{ width: "50%" }}>
              <img
                src={user.avatar}
                style={{
                  width: "300px",
                  height: "300px",
                  marginBottom: "40px",
                }}
              />
              <h3>{user.name}</h3>
              <h4>{user.email}</h4>

              <div style={{ marginTop: "30px" }}>
                <h3 style={{ marginBottom: "10px" }}>Address List</h3>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {user?.addressList?.map((ads: any) => {
                    const {
                      _id,
                      fullname,
                      contact,
                      address,
                      street,
                      city,
                      state,
                      postalCode,
                      country,
                      isDefault,
                      tag,
                    } = ads;

                    return (
                      <div
                        key={_id}
                        style={{
                          width: "calc(50% - 10px)",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "10px",
                        }}
                      >
                        <div>
                          <strong>Full name: </strong>
                          <span>{fullname}</span>
                        </div>
                        <div>
                          <strong>Address: </strong>
                          <span>{`${address},
                           ${street}, ${city}
                           ${state}, ${country}
                           ${postalCode}
                           `}</span>
                        </div>
                        <div>
                          <strong>Phone: </strong>
                          <span>{contact}</span>
                        </div>
                        <div>
                          <strong>Tag: </strong>
                          <span>{tag}</span>
                        </div>
                        {isDefault && (
                          <div style={{ color: "green" }}>Default</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div style={{ width: "50%" }}>
              <h3 style={{ marginBottom: "30px" }}>Create Address</h3>
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  className="input-element"
                  onChange={onHandleAddress}
                />
              </div>
              <div>
                <label>Contact</label>
                <input
                  type="text"
                  name="contact"
                  className="input-element"
                  onChange={onHandleAddress}
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  className="input-element"
                  onChange={onHandleAddress}
                />
              </div>
              <div>
                <label>Street</label>
                <input
                  type="text"
                  name="street"
                  className="input-element"
                  onChange={onHandleAddress}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  className="input-element"
                  onChange={onHandleAddress}
                />
              </div>
              <div>
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  className="input-element"
                  onChange={onHandleAddress}
                />
              </div>
              <div>
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  className="input-element"
                  onChange={onHandleAddress}
                />
              </div>
              <div>
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  className="input-element"
                  onChange={onHandleAddress}
                />
              </div>
              <div style={{ marginTop: "30px" }}>
                <div>
                  <input
                    type="radio"
                    name="tag"
                    id="home"
                    value="home"
                    onChange={onHandleAddress}
                  />
                  <label htmlFor="home">Home</label>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="radio"
                    name="tag"
                    id="office"
                    value="office"
                    onChange={onHandleAddress}
                  />
                  <label htmlFor="office">Office</label>
                </div>
              </div>
              <div style={{ marginTop: "30px" }}>
                <input
                  type="checkbox"
                  name="isDefault"
                  id="default"
                  onChange={onHandleDefault}
                />
                <label htmlFor="default">Make default address</label>
              </div>
              <div style={{ marginTop: "30px" }}>
                <button
                  onClick={() => dispatch(addAddress(address))}
                  className="btn secondary"
                >
                  Add address
                </button>
              </div>
            </div>
          </div>
        ) : (
          <span>Fetching...</span>
        )}
      </div>
    </div>
  );
}

export default Profile;
