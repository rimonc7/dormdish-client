import React, { useContext } from "react";
import { FaUniversity, FaUtensils, FaStar, FaUsers } from "react-icons/fa";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import { ThemeContext } from "../../Provider/ThemeProvider";

const About = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex flex-col items-center py-12 px-4 ${darkTheme ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={`w-full max-w-5xl rounded-lg shadow-xl overflow-hidden ${darkTheme ? "bg-gray-800" : "bg-white"}`}>
        <div className="bg-blue-500 py-8 px-6 text-white">
          <SectionTitle
            heading="About Dorm Dish"
            subheading="Your Ultimate Hostel Management System"
          />
        </div>

        <div className="px-8 py-10">
          <div className="flex flex-col items-center mb-8">
            <FaUniversity className="text-6xl text-blue-500 mb-4" />
            <p className={`text-center max-w-2xl text-lg ${darkTheme ? "text-gray-300" : "text-gray-700"}`}>
              Dorm Dish is a state-of-the-art Hostel Management System designed exclusively for university campuses.
              Our platform empowers administrators to efficiently manage student meals, monitor food reviews,
              and maintain high-quality dining services across hostels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition-shadow duration-300 ${
                darkTheme ? "bg-gray-700 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <FaUtensils className="text-4xl text-orange-500 mb-3" />
              <h2 className="text-xl font-semibold text-orange-500 mb-2">Meal Management</h2>
              <p className={`${darkTheme ? "text-gray-300" : "text-gray-600"}`}>
                Schedule and update meal plans in real time. Ensure students enjoy nutritious and delicious meals daily.
              </p>
            </div>

            <div
              className={`flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition-shadow duration-300 ${
                darkTheme ? "bg-gray-700 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <FaStar className="text-4xl text-orange-500 mb-3" />
              <h2 className="text-xl font-semibold text-orange-500 mb-2">Food Reviews</h2>
              <p className={`${darkTheme ? "text-gray-300" : "text-gray-600"}`}>
                Collect and analyze student feedback seamlessly. Address concerns promptly to continuously improve dining services.
              </p>
            </div>

            <div
              className={`flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition-shadow duration-300 ${
                darkTheme ? "bg-gray-700 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <FaUsers className="text-4xl text-orange-500 mb-3" />
              <h2 className="text-xl font-semibold text-orange-500 mb-2">Community & Support</h2>
              <p className={`${darkTheme ? "text-gray-300" : "text-gray-600"}`}>
                Foster a vibrant community among students and staff. Our support tools keep everyone connected and informed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
