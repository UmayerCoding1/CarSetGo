import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const faqs = [
  {
    question: 'How do I get started with Car Rental?',
    answer:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque...',
  },
  {
    question: 'Can I rent a car with a debit card?',
    answer: 'Yes, most major car rental services accept debit cards with certain conditions.',
  },
  {
    question: 'What kind of Car Rental do I need?',
    answer: 'It depends on your trip needs. For city travel, compact cars work well. For off-roading, choose SUVs.',
  },
  {
    question: 'What is a rental car security deposit?',
    answer: 'A security deposit is a temporary hold placed on your card as assurance for the rental company.',
  },
  {
    question: 'Can I cancel or modify my reservation?',
    answer: 'Yes, cancellations and modifications are usually allowed based on the rental policy.',
  },
  {
    question: 'Is it possible to extend my rental period?',
    answer: 'Absolutely. Just contact the rental company before the end of your period.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Have Any Questions?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700 pb-4">
            <div
              onClick={() => toggle(index)}
              className="flex justify-between items-center cursor-pointer"
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <button className="bg-black text-white">
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-black/70 mt-2">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
