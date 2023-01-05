import { async } from "@firebase/util";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UpdateProfile from "../components/UpdateProfile";
import { emailVerification, logout } from "../firebase";
import { logoutHandle } from "../redux/authSlice";

function Home() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/", {
      replace: true,
    });
  };

  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="max-w-2xl mx-auto py-5">
        {user.photoURL && (
          <img src={user.photoURL} className="w-7 h-7 rounded-full" />
        )}
        <h1>
          Welcome ({user.email})
          <button
            onClick={handleLogout}
            className="h-8 rounded px-4 text-sm text-white bg-indigo-700"
          >
            Log out
          </button>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="h-8 rounded px-4 text-sm text-white bg-indigo-700"
            >
              Send to e- post
            </button>
          )}
        </h1>

        <UpdateProfile />
      </div>
    );
  }

  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Home;
