import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Banner from '../../components/ui/Banner';
import CarCategories from '../../components/ui/car-categories/CarCategories';
import OurVehicle from '../../components/ui/OurVehicle';
import FAQSSection from '../../components/ui/FAQSSection';
import FeaturesSection from '../../components/ui/FeaturesSection';
import AboutUs from '../../components/ui/AboutUs';
import Testimonial from '../../components/ui/Testimonial';
import { trackPlatform } from '../../utils/trackPlatform';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};


const Home = () => {
  


  useEffect(() => {
    trackPlatform();
  },[])
  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Banner />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <CarCategories />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <OurVehicle />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <FeaturesSection />
      </motion.div>

     

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <AboutUs />
      </motion.div>



      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Testimonial/>
      </motion.div>


      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <FAQSSection />
      </motion.div>
    </div>
  );
};

export default Home;
