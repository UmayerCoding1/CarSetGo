import React, { useState } from "react";
import { asset } from "../../assets/asser";
const AboutUs = () => {
  const [openTab, setOpenTab] = useState("luxury");
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-8 bg-gray-50 p-4 md:p-8 rounded-3xl shadow-lg min-h-[380px]">
        <section className="hidden lg:flex w-1/2 h-full items-center justify-center">
          <img className="w-[300xp] h-96 object-cover rounded-2xl shadow-xl border border-gray-200" src={asset.aboutImg} alt="About CarSetGo" />
        </section>

        <section className="w-full lg:w-1/2 flex flex-col items-start">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-gray-900">Only Quality For Clients</h2>
          <p className="text-lg text-gray-600 mb-4">Experience the best in luxury, comfort, and prestige with CarSetGo. Our commitment is to deliver excellence and satisfaction for every client.</p>

          <div className="w-full">
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setOpenTab("luxury")}
                className={`uppercase transition-all duration-200 border font-semibold text-sm py-2 px-6 rounded-full cursor-pointer shadow-sm ${openTab === "luxury" ? "bg-black text-white border-black scale-105" : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"}`}
              >
                luxury
              </button>
              <button
                onClick={() => setOpenTab("comfort")}
                className={`uppercase transition-all duration-200 border font-semibold text-sm py-2 px-6 rounded-full cursor-pointer shadow-sm ${openTab === "comfort" ? "bg-black text-white border-black scale-105" : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"}`}
              >
                comfort
              </button>
              <button
                onClick={() => setOpenTab("prestige")}
                className={`uppercase transition-all duration-200 border font-semibold text-sm py-2 px-6 rounded-full cursor-pointer shadow-sm ${openTab === "prestige" ? "bg-black text-white border-black scale-105" : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"}`}
              >
                prestige
              </button>
            </div>

            <div className="w-full lg:w-[70%] mt-5 text-gray-700 min-h-[110px] animate-fade-in-up">
              {openTab === "luxury" && (
                <p>
                  We offer a meticulously curated collection of the most sought-after luxury vehicles on the market. Whether you prefer the sporty allure of a high-performance sports car, the sophistication of a sleek and luxurious sedan, or the versatility of a premium SUV, we have the perfect car to match your discerning taste.
                </p>
              )}
              {openTab === "comfort" && (
                <p>
                  We prioritize your comfort and convenience throughout your journey. We understand that a comfortable ride can make a world of difference, whether you're embarking on a business trip or enjoying a leisurely vacation. That's why we offer a wide range of well-maintained, comfortable cars that cater to your specific needs.
                </p>
              )}
              {openTab === "prestige" && (
                <p>
                  We understand that prestige goes beyond luxury. It's about making a statement, embracing sophistication, and indulging in the finer things in life. That's why we offer an exclusive selection of prestigious cars that exude elegance, style, and status.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
