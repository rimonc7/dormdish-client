// Support.js
import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaHeadset } from 'react-icons/fa';

const Support = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact & Support</h2>
        <p className="mb-12 text-lg text-gray-600">
          We're here to help! Reach out to us with any questions or concerns.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Phone Support */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaPhoneAlt className="text-5xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Phone</h3>
            <p className="text-lg text-gray-600">+1 (555) 123-4567</p>
          </div>
          {/* Email Support */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaEnvelope className="text-5xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Email</h3>
            <p className="text-lg text-gray-600">support@dormdish.com</p>
          </div>
          {/* Live Chat Support */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaHeadset className="text-5xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Live Chat</h3>
            <p className="text-lg text-gray-600">Chat with us 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
