import React from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa"; // user icon
import Location from "./Location";

const User = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <p>No user logged in</p>;
  }

  return (
    <div className="user-profile-box">
      <FaUserCircle size={60} color="#555" />
      <p>
        <b>{user.name}</b>
        <br />
        {user.email}
                <Location />
      </p>
    </div>
  );
};

export default User;
