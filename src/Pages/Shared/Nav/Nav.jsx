import { FaUserCircle, FaBell } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import './Nav.css'
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const Nav = () => {
    const { user, logOutUser } = useContext(AuthContext);

    const links = (
        <div className="space-y-2 lg:space-x-4 lg:space-y-0 uppercase">
            <NavLink to="/" className="block lg:inline text-white hover:text-orange-300">
                HOME
            </NavLink>
            <NavLink to="/meals" className="block lg:inline text-white hover:text-orange-300">
                MEALS
            </NavLink>
            <NavLink to="/upcomingMeals" className="block lg:inline text-white hover:text-orange-300">
                UPCOMING MEALS
            </NavLink>
            <NavLink to="/shop/salad" className="block lg:inline text-white hover:text-orange-300">
                OUR SHOP
            </NavLink>
        </div>
    );

    const authLinks = (
        <div className="space-y-2 lg:space-x-4 lg:space-y-0 uppercase">
            {user ? (
                <button
                    onClick={() => logOutUser()}
                    className="block lg:inline btn btn-sm btn-outline border-white text-white hover:bg-orange-300">
                    Logout
                </button>
            ) : (
                <>
                    <NavLink
                        to="/login"
                        className="block lg:inline btn btn-sm btn-outline border-white text-white hover:bg-orange-300"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/joinUs"
                        className="block lg:inline btn btn-sm btn-outline border-white text-white hover:bg-orange-300"
                    >
                        Join Us
                    </NavLink>
                </>
            )}
        </div>
    );

    return (
        <div className="navbar fixed z-20 bg-gradient-to-r from-blue-500 to-orange-400 bg-opacity-50 text-white shadow-lg">
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
                        className="menu menu-sm dropdown-content mt-3 w-52 bg-white text-black rounded-box shadow-lg"
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
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                        3
                    </span>
                </div>
                <div className="hidden lg:flex">{authLinks}</div>
                {user ? (
                    <img
                        className="w-12 h-12 mx-6 rounded-full"
                        src={user.photoURL}
                        alt=""
                        title={user.displayName || "User"}
                    />
                ) : (
                    <FaUserCircle className="text-4xl mx-6" title="Guest User" />
                )}
            </div>
        </div>
    );
};

export default Nav;
