import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, resetPassword, update } from "../firebase";
import { loginHandle, logoutHandle } from "../redux/authSlice";

function UpdateProfile() {
  const [displayName, setDisplayName] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await update({
      displayName,
      photoURL: avatar,
    });
    console.log(auth.currentUser);
    // dispatch(loginHandle(auth.currentUser));
    dispatch(
      loginHandle({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const updated = await resetPassword(password);
    if (updated) {
      setPassword("");
    }
  };

  return (
    <div className="grid gap-y-10">
      <form className="grid gap-y-4" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-4">Update Profile</h1>
        <div className="mt-1">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>

          <input
            type="text"
            placeholder="name"
            className="shadow-sm focus:ring-indigo-500 focus: border-indigo-500 block w-full sm:text-sm border-gray"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="mt-1">
          <label className="block text-sm font-medium text-gray-700">
            Photo
          </label>

          <input
            type="text"
            placeholder="name"
            className="shadow-sm focus:ring-indigo-500 focus: border-indigo-500 block w-full sm:text-sm border-gray"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className=" cursor-pointer disabled:opacity-20 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            update
          </button>
        </div>
      </form>
      <form className="grid gap-y-4" onSubmit={handleReset}>
        <h1 className="text-xl font-bold mb-4">Update PAssword</h1>
        <div className="mt-1">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="text"
            placeholder="password"
            className="shadow-sm focus:ring-indigo-500 focus: border-indigo-500 block w-full sm:text-sm border-gray"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={!password}
            className=" cursor-pointer disabled:opacity-20 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;

{
  /* <div className="mt-1">
          <label className="block text-sm font-medium text-gray-700">
            PAssword
          </label>

          
        </div> */
}
