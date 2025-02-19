import { useContext } from "react";
import { FaUserPlus, FaUtensils, FaStar } from "react-icons/fa";
import { ThemeContext } from "../../../Provider/ThemeProvider";

const HowItWorks = () => {
  const { darkTheme } = useContext(ThemeContext); 

  const steps = [
    {
      id: 1,
      icon: <FaUserPlus className="text-5xl mb-4" />,
      title: "Sign Up",
      description: "Create an account to access meal plans, reviews, and more.",
    },
    {
      id: 2,
      icon: <FaUtensils className="text-5xl mb-4" />,
      title: "Choose Your Meal",
      description:
        "View daily menus, select your preferred meals, and track your diet.",
    },
    {
      id: 3,
      icon: <FaStar className="text-5xl mb-4" />,
      title: "Rate & Review",
      description:
        "Give feedback on meals to help improve quality and variety.",
    },
  ];

  return (
    <div className={`pb-16 pt-5 ${darkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto text-center px-6">
        <div className={`text-center m-6 mx-auto md:w-4/12 ${darkTheme ? 'text-white' : 'text-gray-800'}`}>
          <h3 className="text-4xl pb-3 font-bold">
            How It Works
          </h3>
          <p className={`italic text-xl mt-2 ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            Follow these three steps to get started.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
            >
              <div className='flex justify-center text-blue-500'>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
              <p className={`mt-2 ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
