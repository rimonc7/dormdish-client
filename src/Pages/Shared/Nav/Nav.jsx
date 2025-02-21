import { FaUserCircle, FaBell } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAdmin from "../../../Hook/useAdmin";
import { ThemeContext } from "../../../Provider/ThemeProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Nav = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const { toggleTheme, darkTheme } = useContext(ThemeContext);

  const links = (
    <div className="space-y-2 lg:space-x-4 lg:space-y-0 uppercase">
      <NavLink
        to="/"
        className="block lg:inline text-white hover:text-orange-300"
      >
        HOME
      </NavLink>
      <NavLink
        to="/meals"
        className="block lg:inline text-white hover:text-orange-300"
      >
        MEALS
      </NavLink>
      <NavLink
        to="/upcomingMeals"
        className="block lg:inline text-white hover:text-orange-300"
      >
        UPCOMING MEALS
      </NavLink>
      {user && isAdmin && (
        <NavLink
          to="/dashboard/admin-profile"
          className="block lg:inline text-white hover:text-orange-300"
        >
          DASHBOARD
        </NavLink>
      )}
      {user && !isAdmin && (
        <NavLink
          to="/dashboard/user-profile"
          className="block lg:inline text-white hover:text-orange-300"
        >
          DASHBOARD
        </NavLink>
      )}
      <NavLink
        to="/contact"
        className="block lg:inline text-white hover:text-orange-300"
      >
        CONTACT
      </NavLink>
      <NavLink
        to="/about"
        className="block lg:inline text-white hover:text-orange-300"
      >
        ABOUT
      </NavLink>
    </div>
  );

  const authLinks = (
    <div className="space-y-2 lg:space-x-4 lg:space-y-0 uppercase">
      {user ? (
        <button
          onClick={() => logOutUser()}
          className="block lg:inline btn btn-sm btn-outline border-white text-white hover:bg-orange-300"
        >
          Logout
        </button>
      ) : (
        <div className="flex flex-col gap-1 lg:block lg:space-x-2">
          <NavLink
            to="/login"
            className="lg:inline btn btn-sm btn-outline border-white text-white hover:bg-orange-300"
          >
            Login
          </NavLink>
          <NavLink
            to="/joinUs"
            className="lg:inline btn btn-sm btn-outline border-white text-white hover:bg-orange-300"
          >
            Join Us
          </NavLink>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`navbar fixed z-20 bg-gradient-to-r ${darkTheme ? 'from-gray-800 to-gray-900' : 'from-blue-500 to-orange-400'} bg-opacity-50 text-white shadow-lg px-3 lg:px-10`}
    >
      <div className="navbar-start">
        {/* Dropdown for small screens */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 bg-blue-500 text-white rounded-box shadow-lg"
          >
            {links}
            {authLinks}
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl font-bold uppercase">
          Dorm Dish
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-4">
        {/* notification icon */}
        <div className="relative">
          <FaBell className="text-2xl cursor-pointer hover:text-orange-300" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1"></span>
        </div>
        <div className="hidden lg:flex">{authLinks}</div>
        {user ? (
          <img
            className="w-12 h-12 mx-6 rounded-full border-2"
            src={user.photoURL}
            alt=""
            title={user.displayName || "User"}
          />
        ) : (
          <FaUserCircle className="text-4xl mx-6" title="Guest User" />
        )}
        <button
          onClick={toggleTheme}
          className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${darkTheme ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'} hover:bg-gray-600`}
        >
          {darkTheme ? (
            <MdLightMode size={24} />
          ) : (
            <MdDarkMode size={24} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Nav;
