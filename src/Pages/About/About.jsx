// About.js
import React from 'react';
import { FaUniversity, FaUtensils, FaStar, FaUsers } from 'react-icons/fa';
import SectionTitle from '../Shared/SectionTitle/SectionTitle';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-500 py-8 px-6 text-white">
          <SectionTitle heading="About Dorm Dish" subheading="Your Ultimate Hostel Management System" />
        </div>

        <div className="px-8 py-10">
          <div className="flex flex-col items-center mb-8">
            <FaUniversity className="text-6xl text-blue-500 mb-4" />
            <p className="text-gray-700 text-lg text-center max-w-2xl">
              Dorm Dish is a state-of-the-art Hostel Management System designed exclusively for university campuses.
              Our platform empowers administrators to efficiently manage student meals, monitor food reviews,
              and maintain high-quality dining services across hostels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
              <FaUtensils className="text-4xl text-orange-500 mb-3" />
              <h2 className="text-xl font-semibold text-orange-500 mb-2">Meal Management</h2>
              <p className="text-gray-600">
                Schedule and update meal plans in real time. Ensure students enjoy nutritious and delicious meals daily.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
              <FaStar className="text-4xl text-orange-500 mb-3" />
              <h2 className="text-xl font-semibold text-orange-500 mb-2">Food Reviews</h2>
              <p className="text-gray-600">
                Collect and analyze student feedback seamlessly. Address concerns promptly to continuously improve dining services.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
              <FaUsers className="text-4xl text-orange-500 mb-3" />
              <h2 className="text-xl font-semibold text-orange-500 mb-2">Community & Support</h2>
              <p className="text-gray-600">
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
