import { FaUser, FaUsers, FaUtensils, FaListAlt, FaStar, FaConciergeBell, FaCalendarAlt, FaMoneyCheckAlt, FaHome } from 'react-icons/fa';
import logo from '../assets/dormdish-logo.png';
import { NavLink, Outlet } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const isAdmin = false;

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-gradient-to-t from-blue-500 to-orange-400 px-6">
                <img src={logo} alt="DormDish Logo" className="py-4" />
                {isAdmin ? (

                    //admin dashboard
                    <>
                        <ul className="space-y-3 text-white">
                            <li>
                                <NavLink to="/dashboard/admin-profile" className="flex items-center space-x-2 hover:text-black">
                                    <FaUser />
                                    <span>My Profile</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-user" className="flex items-center space-x-2 hover:text-black">
                                    <FaUsers />
                                    <span>Manage Users</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-meal" className="flex items-center space-x-2 hover:text-black">
                                    <FaUtensils />
                                    <span>Add Meal</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-meals" className="flex items-center space-x-2 hover:text-black">
                                    <FaListAlt />
                                    <span>All Meals</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-review" className="flex items-center space-x-2 hover:text-black">
                                    <FaStar />
                                    <span>All Reviews</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/serve-meals" className="flex items-center space-x-2 hover:text-black">
                                    <FaConciergeBell />
                                    <span>Serve Meals</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/upcoming-meals" className="flex items-center space-x-2 hover:text-black">
                                    <FaCalendarAlt />
                                    <span>Upcoming Meals</span>
                                </NavLink>
                            </li>
                        </ul>
                    </>
                ) : (
                    //user dashboard
                    <>
                        <ul className="space-y-3 text-white">
                            <li>
                                <NavLink to="/dashboard/user-profile" className="flex items-center space-x-2 hover:text-black">
                                    <FaUser />
                                    <span>My Profile</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/requested-meals" className="flex items-center space-x-2 hover:text-black">
                                    <FaUtensils />
                                    <span>Requested Meals</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-reviews" className="flex items-center space-x-2 hover:text-black">
                                    <FaStar />
                                    <span>My Reviews</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/payment-history" className="flex items-center space-x-2 hover:text-black">
                                    <FaMoneyCheckAlt />
                                    <span>Payment History</span>
                                </NavLink>
                            </li>
                        </ul>
                    </>
                )}
                <hr className="my-6 border-t border-white" />
                <ul className="space-y-3 text-white">
                    <li>
                        <NavLink to="/" className="flex items-center space-x-2 hover:text-black">
                            <FaHome />
                            <span>Home</span>
                        </NavLink>
                    </li>

                </ul>

            </div>
            <div className='flex-1 bg-gray-50'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
