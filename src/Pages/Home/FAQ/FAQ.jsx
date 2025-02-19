import { useContext } from "react";
import { ThemeContext } from "../../../Provider/ThemeProvider";

const FAQ = () => {
  const { darkTheme } = useContext(ThemeContext);
  const faqs = [
    { question: 'How do I register for Dorm Dish?', answer: 'Simply sign up using your university email and start exploring our features.' },
    { question: 'Can I change my meal preferences?', answer: 'Yes, you can update your meal preferences anytime from your dashboard.' },
    { question: 'How do food reviews work?', answer: 'You can rate and leave feedback on meals you’ve had, helping improve quality.' },
    { question: 'Is there a mobile app?', answer: 'Yes! Dorm Dish is accessible on mobile devices via our web app.' },
  ];

  return (
    <div className={`py-20 relative ${darkTheme ? "bg-gradient-to-b from-gray-800 to-gray-700" : "bg-gradient-to-b from-gray-100 to-white"}`}>
      <div className={`absolute top-0 left-0 w-full h-40 ${darkTheme ? "bg-gray-900" : "bg-blue-100"} rounded-b-3xl flex items-center justify-center`}>
        <h2 className={`text-4xl font-extrabold text-center ${darkTheme ? "text-white" : "text-gray-800"}`}>
          Frequently Asked Questions
        </h2>
      </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10 pt-32">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`collapse collapse-arrow rounded-lg shadow-lg p-5 ${darkTheme ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
            >
              <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
              <div className={`collapse-title text-2xl font-medium capitalize ${darkTheme ? "text-white" : "text-gray-800"}`}>
                {faq.question}
              </div>
              <div className={`collapse-content text-lg ${darkTheme ? "text-gray-300" : "text-gray-600"}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
