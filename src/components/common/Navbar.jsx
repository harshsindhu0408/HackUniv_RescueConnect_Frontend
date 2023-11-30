import React from "react";
import logo from "../../assets/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../redux/Actions/authAction";

const Navbar = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(authLogout());
    navigate('/');
  };

  const Links = [
    { id: 1, name: "Resources", link: "/resources" },
    { id: 2, name: "Disasters", link: "/disasters" },
    { id: 3, name: "Agencies", link: "/agencies" },
    // { id: 4, name: "About Us", link: "/about" },
    { id: 5, name: "Contact Us", link: "/contact" },
    { id: 6, name: "Alerts", link: "/alert" },
  ];

  return (
    <nav className="w-full z-10 relative bg-gray-800 h-20 flex items-center justify-center shadow-lg">
      <div className="w-11/12  flex flex-row items-center justify-between">
        {/* left part with name and logo */}
        <div className="flex flex-row items-center justify-center gap-2">
          <Link
            className="flex flex-row items-center justify-center gap-2"
            to="/"
          >
            <img src={logo} alt="logo" width="45px" className="hidden md:block" />
            <p className="md:text-2xl sm:text-xl text-white font-Roberto font-bold">
              RescueConnect
            </p>
          </Link>
        </div>

        {/* mid part with links */}
        <div className="hidden md:block">
          <ul className="flex items-center justify-center gap-6">
            {Links.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.link}
                  className="text-white font-bold font-Roborto hover:text-indigo-500 duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* right part with login and logout buttons */}
        <div className="flex flex-row items-center justify-center gap-4">
          {/* Signup button */}
          {!state.isLoggedin && (
            <NavLink to="/signup">
              <button className="bg-indigo-500 hover:bg-indigo-600 hover:scale-95 block font-bold text-white shadow-sm rounded-full px-4 py-2 duration-300 w-24">
                Sign Up
              </button>
            </NavLink>
          )}

          {/* Profile button */}
          {
            state.isLoggedin && <div>
              <NavLink to="/profile" className="nav-link">
                <button className="bg-indigo-500 hover:bg-indigo-600 hover:scale-95 block font-bold text-white shadow-sm rounded-full px-4 py-2 duration-300 w-24">
                  Profile
                </button>
              </NavLink>
            </div>
          }

          {/* Login and Logout Button */}
          <div>
            {state.isLoggedin ? (
              <button
                className="bg-indigo-500 hover:bg-indigo-600 hover:scale-95 block font-bold text-white shadow-sm rounded-full px-4 py-2 duration-300 w-24"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="nav-link">
                <button className="bg-indigo-500 hover:bg-indigo-600 hover:scale-95 block font-bold text-white shadow-sm rounded-full px-4 py-2 duration-300 w-24">
                  Login
                </button>
              </NavLink>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
