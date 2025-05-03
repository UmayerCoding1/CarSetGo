import React from 'react';
const testimonials = [
    {
      name: "Stepanie Hutchkiss",
      message:
        "I have been using Rentaly for my Car Rental needs for over 5 years now. I have never had any problems with their service. Their customer support is always responsive and helpful. I would recommend Rentaly to anyone looking for a reliable Car Rental provider.",
      image: "https://www.madebydesignesia.com/themes/rentaly/images/testimonial/1.jpg",
    },
    {
      name: "Jovan Reels",
      message:
        "We have been using Rentaly for our trips needs for several years now and have always been happy with their service. Their customer support is Excellent Service! and they are always available to help with any issues we have. Their prices are also very competitive.",
      image: "https://www.madebydesignesia.com/themes/rentaly/images/testimonial/2.jpg",
    },
    {
      name: "Kanesha Keyton",
      message:
        "Endorsed by industry experts, Rentaly is the Car Rental solution you can trust. With years of experience in the field, we provide fast, reliable and secure Car Rental services.",
      image: "https://www.madebydesignesia.com/themes/rentaly/images/testimonial/3.jpg",
    },
  ];
const Testimonial = () => {
    return (
        <section className="bg-white py-12 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden shadow-lg text-white h-[400px] "
            >
              <img
                src={t.image}
                alt={t.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="relative p-6 bg-gradient-to-t from-black via-black/50 to-transparent h-full flex flex-col justify-end">
                <svg
                  className="w-8 h-8 text-green-500 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.17 6A5.001 5.001 0 0 1 12 1a5.001 5.001 0 0 1 4.83 6H19a1 1 0 0 1 0 2h-2.17A5.001 5.001 0 0 1 12 17a5.001 5.001 0 0 1-4.83-6H5a1 1 0 1 1 0-2h2.17z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Excellent Service! Car Rent Service!</h3>
                <p className="mb-4">{t.message}</p>
                <p className="font-semibold">— {t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
};

export default Testimonial;