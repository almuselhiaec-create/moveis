import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="header">
      <nav>
        <ul>
          {!user && (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}

          {user && (
            <>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/User">Profile</Link></li>

              <li><Link to="/movies">Movies</Link></li>

              {/* Admin only */}
              {user.role === "admin" && (
                <li><Link to="/addmovie">Add Movie</Link></li>
              )}

              <li>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
