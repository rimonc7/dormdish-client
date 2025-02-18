
const FAQ = () => {
  const faqs = [
    { question: 'How do I register for Dorm Dish?', answer: 'Simply sign up using your university email and start exploring our features.' },
    { question: 'Can I change my meal preferences?', answer: 'Yes, you can update your meal preferences anytime from your dashboard.' },
    { question: 'How do food reviews work?', answer: 'You can rate and leave feedback on meals you’ve had, helping improve quality.' },
    { question: 'Is there a mobile app?', answer: 'Yes! Dorm Dish is accessible on mobile devices via our web app.' },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-100 to-white relative">
      <div className="absolute top-0 left-0 w-full h-40 bg-blue-100  rounded-b-3xl flex items-center justify-center">
        <h2 className="text-4xl font-extrabold text-center ">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10 pt-32">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-white rounded-lg shadow-lg border border-gray-200 p-5"
            >
              <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
              <div className="collapse-title text-2xl font-medium text-gray-800 capitalize">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-600 text-lg">
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
