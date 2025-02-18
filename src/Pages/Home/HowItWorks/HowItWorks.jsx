import { FaUserPlus, FaUtensils, FaStar } from "react-icons/fa";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus className="text-5xl text-blue-500 mb-4" />,
      title: "Sign Up",
      description: "Create an account to access meal plans, reviews, and more.",
    },
    {
      id: 2,
      icon: <FaUtensils className="text-5xl text-blue-500 mb-4" />,
      title: "Choose Your Meal",
      description:
        "View daily menus, select your preferred meals, and track your diet.",
    },
    {
      id: 3,
      icon: <FaStar className="text-5xl text-blue-500 mb-4" />,
      title: "Rate & Review",
      description:
        "Give feedback on meals to help improve quality and variety.",
    },
  ];

  return (
    <div className="bg-gray-100 pb-16 pt-5">
      <div className="max-w-6xl mx-auto text-center px-6">
        <div className="text-center m-6 mx-auto md:w-4/12">
          <h3 className="text-4xl pb-3 font-bold">
            How It Works
          </h3>
          <p className="italic text-xl mt-2">
            Follow these three steps to get started.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mt-4">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
