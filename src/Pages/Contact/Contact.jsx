import React from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const Contact = () => {
  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle
          heading="Contact Us"
          subheading="Have questions or need support?"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">

          <div className="space-y-8">
            <p className="text-gray-700 text-lg">
              Reach out to us using the contact details below, or send us a message
              directly using the form.
            </p>
            <div className="flex items-center gap-4">
              <FiPhone className="text-orange-500 text-2xl" />
              <span className="text-gray-800 text-lg">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-4">
              <FiMail className="text-orange-500 text-2xl" />
              <span className="text-gray-800 text-lg">support@dormdish.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FiMapPin className="text-orange-500 text-2xl" />
              <span className="text-gray-800 text-lg">
                123 University Ave, City, State
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered w-full mt-4 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="textarea textarea-bordered w-full mt-4 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button
              type="button"
              className="btn bg-orange-500 hover:bg-orange-400 text-white w-full mt-6 px-4 py-2 rounded-md font-semibold transition-all duration-200"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
