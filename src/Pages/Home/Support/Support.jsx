import { FaPhoneAlt, FaEnvelope, FaHeadset } from 'react-icons/fa';
import { useContext } from 'react';
import { ThemeContext } from '../../../Provider/ThemeProvider';

const Support = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`${darkTheme ? 'bg-gray-800' : 'bg-gray-100'} py-16`}>
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className={`${darkTheme ? 'text-white' : 'text-gray-800'} text-3xl font-bold mb-4`}>
          Contact & Support
        </h2>
        <p className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} mb-12 text-lg`}>
          We're here to help! Reach out to us with any questions or concerns.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`${darkTheme ? 'bg-gray-700' : 'bg-white'} flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}>
            <FaPhoneAlt className="text-5xl text-blue-500 mb-4" />
            <h3 className={`${darkTheme ? 'text-white' : 'text-gray-800'} text-xl font-semibold mb-2`}>
              Phone
            </h3>
            <p className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              +1 (555) 123-4567
            </p>
          </div>
          <div className={`${darkTheme ? 'bg-gray-700' : 'bg-white'} flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}>
            <FaEnvelope className="text-5xl text-blue-500 mb-4" />
            <h3 className={`${darkTheme ? 'text-white' : 'text-gray-800'} text-xl font-semibold mb-2`}>
              Email
            </h3>
            <p className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              support@dormdish.com
            </p>
          </div>
          <div className={`${darkTheme ? 'bg-gray-700' : 'bg-white'} flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}>
            <FaHeadset className="text-5xl text-blue-500 mb-4" />
            <h3 className={`${darkTheme ? 'text-white' : 'text-gray-800'} text-xl font-semibold mb-2`}>
              Live Chat
            </h3>
            <p className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              Chat with us 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
