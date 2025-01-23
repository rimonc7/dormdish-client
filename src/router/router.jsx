import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import MealDetails from "../Pages/MealDetails/MealDetails";
import Login from "../Pages/Authetication/Login/Login";
import JoinUs from "../Pages/Authetication/JoinUs/JoinUs";
import Meals from "../Pages/Meals/Meals";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import UserProfile from "../Pages/Dashboard/UserDashboard/UserProfile";

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
                element: <UpcomingMeals></UpcomingMeals>
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
                element:<UserProfile></UserProfile>
            }
        ]
    }
]);

export default router;