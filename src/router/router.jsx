import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import MealDetails from "../Pages/MealDetails/MealDetails";
import Login from "../Pages/Authetication/Login/Login";
import JoinUs from "../Pages/Authetication/JoinUs/JoinUs";
import Meals from "../Pages/Meals/Meals";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import UserProfile from "../Pages/Dashboard/UserDashboard/UserProfile";
import RequestedMeals from "../Pages/Dashboard/UserDashboard/RequestedMeals";
import MyReviews from "../Pages/Dashboard/UserDashboard/MyReviews";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../Pages/Dashboard/AdminDashboard/AdminProfile";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers";
import AllMeals from "../Pages/Dashboard/AdminDashboard/AllMeals";
import AllReview from "../Pages/Dashboard/AdminDashboard/AllReview.JSX";
import AddMeal from "../Pages/Dashboard/AdminDashboard/AddMeal";
import ServeMeals from "../Pages/Dashboard/AdminDashboard/ServeMeals";
import UpcomingMealsAdmin from "../Pages/Dashboard/AdminDashboard/UpcomingMealsAdmin";
import UpComingMealPage from "../Pages/UpcomingMeals/UpComingMealPage";
import UpcomingMealDetails from "../Pages/UpcomingMeals/UpcomingMealDetails";
import Checkout from "../Pages/Checkout/Checkout";
import Payment from "../Pages/Checkout/Payment";
import PaymentHistory from "../Pages/Dashboard/UserDashboard/PaymentHistory";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/meal/:id',
                element: <MealDetails></MealDetails>
            },
            {
                path: '/meals',
                element: <Meals></Meals>
            },
            {
                path: '/upcomingMeals',
                element: <UpComingMealPage></UpComingMealPage>
            },
            {
                path: '/upcomingMeal/:id',
                element: <UpcomingMealDetails></UpcomingMealDetails>
            },
            {
                path: '/checkout/:packageName',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            }

        ],
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/joinUs",
        element: <JoinUs></JoinUs>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'user-profile',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'requested-meals',
                element: <RequestedMeals></RequestedMeals>
            },
            {
                path: 'my-reviews',
                element: <MyReviews></MyReviews>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },

            //admin route
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'manage-user',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'all-meals',
                element: <AdminRoute><AllMeals></AllMeals></AdminRoute>
            },
            {
                path: 'all-review',
                element: <AdminRoute><AllReview></AllReview></AdminRoute>
            },
            {
                path: 'add-meal',
                element: <AdminRoute><AddMeal></AddMeal></AdminRoute>
            },
            {
                path: 'serve-meals',
                element: <AdminRoute><ServeMeals></ServeMeals></AdminRoute>
            },
            {
                path: 'upcoming-meals',
                element: <AdminRoute><UpcomingMealsAdmin></UpcomingMealsAdmin></AdminRoute>
            },

        ]
    }
]);

export default router;