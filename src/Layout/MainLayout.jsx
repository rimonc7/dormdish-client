import { Outlet } from "react-router-dom";
import Nav from "../Pages/Shared/Nav/Nav";

const MainLayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;