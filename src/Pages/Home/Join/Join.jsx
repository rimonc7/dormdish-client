import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../Provider/ThemeProvider';

const Join = () => {
  const { darkTheme } = useContext(ThemeContext);
  
  return (
    <div className={`${darkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} py-16 text-center`}>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">Join Dorm Dish Today!</h2>
        <p className="text-lg mb-6">
          Experience seamless meal management and make your hostel dining better.
        </p>
        <Link
          to="/joinUs"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center"
        >
          Get Started <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Join;
