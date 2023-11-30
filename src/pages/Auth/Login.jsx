import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgimg from "../../assets/vecteezy_3d-male-character-happy-working-on-a-laptop_24387907_314.png";
import { authLogin } from "../../redux/Actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State variable to store user login data (email and password)
  const [user, setUser] = useState({ email: "", password: "" });

  // navigate to home if user is logged
  useEffect(() => {
    if (authState.isLoggedin) {
      navigate("/");
    }
  }, [authState.isLoggedin,navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authLogin(user, navigate));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <div className="w-11/12 flex flex-col items-center justify-center lg:flex-row xl:flex-row 2xl:flex-row sm:flex-col flex-wrap">
        {/* Left Section (Login Form) */}
        <div className="lg:w-7/12  sm:w-full p-8">
          <h2 className="text-4xl xl:h-12 overflow-hidden font-extrabold text-gray-900">
            Login to Your Account
          </h2>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Don't have an account */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign Up
                </Link>
              </p>
            </div>

            {/* Submit Button */}
            <div>
              {!authState.loading ? (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              ) : (
                <center>
                  <b>Loading...</b>
                </center>
              )}
            </div>
          </form>
        </div>

        {/* Right Section (Image) */}
        <div className="lg:w-5/12  sm:w-full flex items-center justify-center">
          <img
            src={bgimg} // Replace with the actual image path
            alt="Agency"
            width="1000px"
            className="object-cover ml-10 object-center sm:h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
