
const FAQ = () => {
  const faqs = [
    { question: 'How do I register for Dorm Dish?', answer: 'Simply sign up using your university email and start exploring our features.' },
    { question: 'Can I change my meal preferences?', answer: 'Yes, you can update your meal preferences anytime from your dashboard.' },
    { question: 'How do food reviews work?', answer: 'You can rate and leave feedback on meals you’ve had, helping improve quality.' },
    { question: 'Is there a mobile app?', answer: 'Yes! Dorm Dish is accessible on mobile devices via our web app.' },
  ];

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow bg-white shadow-md rounded-lg">
              <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
              <div className="collapse-title text-xl font-medium text-gray-800 capitalize">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-600">
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
