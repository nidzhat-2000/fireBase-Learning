import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../firebase";
// import { useDispatch } from "react-redux";
import { loginHandle } from "../redux/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    // console.log(user);
    if (user) {
      // dispatch(loginRedux(user));
      navigate("/", {
        replace: true,
      });
    }
  };

  return (
    <form
      className="max-w-xl mx-auto grid gap-y-4 py-4"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="mt-1">
          <label className="block text-sm font-medium text-gray-700">
            email
          </label>

          <input
            type="email"
            placeholder="email"
            className="shadow-sm focus:ring-indigo-500 focus: border-indigo-500 block w-full sm:text-sm border-gray"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="mt-1">
          <label className="block text-sm font-medium text-gray-700">
            password
          </label>
          <input
            type="password"
            placeholder="password"
            className="shadow-sm focus:ring-indigo-500 focus: border-indigo-500 block w-full sm:text-sm border-gray"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          disabled={!(email || password)}
          type="submit"
          className=" cursor-pointer disabled:opacity-20 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Log in
        </button>
      </div>
      <Link to="/">Home</Link>
    </form>
  );
}

export default Login;
