import { Outlet } from "react-router-dom";
import Nav from "../Pages/Shared/Nav/Nav";
import Footer from "../Pages/Shared/Footer/Footer";
import { useContext } from "react";
import { ThemeContext } from "../Provider/ThemeProvider";

const MainLayout = () => {
  const { darkTheme } = useContext(ThemeContext); 
  return (
    <div className={`flex flex-col min-h-screen ${darkTheme? 'bg-gray-900 text-white' : 'bg-white'} `}>
      <Nav></Nav>
      <main className="flex-grow">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
