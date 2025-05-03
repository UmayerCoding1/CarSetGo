import { motion } from 'framer-motion';
import { Construction, KeyRound, Tag, Trophy } from 'lucide-react';


const featuresLeft = [
  {
    icon: <Trophy className="text-white" size={20} />,
    title: 'First class services',
    desc: 'Where luxury meets exceptional care, creating unforgettable moments and exceeding your every expectation.',
  },
  {
    icon: <Construction className="text-white" size={20} />,
    title: '24/7 road assistance',
    desc: 'Reliable support when you need it most, keeping you on the move with confidence and peace of mind.',
  },
];

const featuresRight = [
  {
    icon: <Tag className="text-white" size={20} />,
    title: 'Quality at Minimum Expense',
    desc: 'Unlocking affordable brilliance while elevating quality and minimizing costs for maximum value.',
  },
  {
    icon: <KeyRound className="text-white" size={20} />,
    title: 'Free Pick-Up & Drop-Off',
    desc: 'Enjoy free pickup and drop-off services, adding an extra layer of ease to your car rental experience.',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-white text-[#0F172A]">
      <div className="text-center mb-10">
        <span className="text-white font-semibold text-sm bg-black px-3 py-1 rounded-full">Why Choose Us</span>
        <h2 className="text-4xl font-bold mt-4">Our Features</h2>
        <p className="text-gray-600 max-w-xl mx-auto mt-2">
          Discover a world of convenience, safety, and customization, paving the way for unforgettable adventures and seamless mobility solutions.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 max-w-7xl mx-auto">
        {/* Left Features */}
        <div className="flex flex-col gap-8">
          {featuresLeft.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="bg-black rounded-md p-3">{feature.icon}</div>
              <div>
                <h4 className="font-semibold text-lg">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Car Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://www.madebydesignesia.com/themes/rentaly/images/misc/car.png"
            alt="Car"
            className="w-[350px] md:w-[450px]"
          />
        </motion.div>

        {/* Right Features */}
        <div className="flex flex-col gap-8">
          {featuresRight.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-start gap-4 text-right"
            >
              <div className="bg-black rounded-md p-3 order-2">{feature.icon}</div>
              <div className="order-1">
                <h4 className="font-semibold text-lg">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
