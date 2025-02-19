import { useContext } from "react";
import { FaUser, FaUsers, FaUtensils, FaListAlt, FaStar, FaConciergeBell, FaCalendarAlt, FaMoneyCheckAlt, FaHome } from "react-icons/fa";
import logo from "../assets/dormdish-logo.png";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
import useAdmin from "../Hook/useAdmin";
import { ThemeContext } from "../Provider/ThemeProvider";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`flex ${darkTheme ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
      {/* Sidebar */}
      <div className={`w-64 min-h-screen px-6 ${darkTheme ? "bg-gradient-to-t from-gray-800 to-gray-600" : "bg-gradient-to-t from-blue-500 to-orange-400"}`}>
        <img src={logo} alt="DormDish Logo" className="py-4" />

        {isAdmin ? (
          // Admin Dashboard
          <>
            <ul className="space-y-3">
              <li>
                <NavLink to="/dashboard/admin-profile" className="flex items-center space-x-2 hover:text-gray-300">
                  <FaUser />
                  <span>My Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-user" className="flex items-center space-x-2 hover:text-gray-300">
                  <FaUsers />
                  <span>Manage Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-meal" className="flex items-center space-x-2 hover:text-gray-300">
                  <FaUtensils />
                  <span>Add Meal</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-meals" className="flex items-center space-x-2 hover:text-gray-300">
                  <FaListAlt />
                  <span>All Meals</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-review" className="flex items-center space-x-2 hover:text-gray-300">
                  <FaStar />
                  <span>All Reviews</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/serve-meals" className="flex items-center space-x-2 hover:text-gray-300">
                  <FaConciergeBell />
                  <span>Serve Meals</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/upcoming-meals" className="flex items-center space-x-2 hover:text-gray-300">
                  <FaCalendarAlt />
                  <span>Upcoming Meals</span>
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          // User Dashboard
          <>
            <ul className="space-y-3">
              <li>
                <NavLink to="/dashboard/user-profile" className="flex items-center space-x-2 hover:text-gray-300">
                  <FaUser />
                  <span>My Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requested-meals" className="flex items-center space-x-2 hover:text-gray-300">
                  <FaUtensils />
                  <span>Requested Meals</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-reviews" className="flex items-center space-x-2 hover:text-gray-300">
                  <FaStar />
                  <span>My Reviews</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history" className="flex items-center space-x-2 hover:text-gray-300">
                  <FaMoneyCheckAlt />
                  <span>Payment History</span>
                </NavLink>
              </li>
            </ul>
          </>
        )}

        <hr className="my-6 border-t border-gray-300" />

        <ul className="space-y-3">
          <li>
            <NavLink to="/" className="flex items-center space-x-2 hover:text-gray-300">
              <FaHome />
              <span>Home</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 p-6 transition-all duration-300 ${darkTheme ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-900"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
