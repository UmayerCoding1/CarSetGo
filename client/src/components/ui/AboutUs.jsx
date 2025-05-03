import React, { useState } from "react";
import { asset } from "../../assets/asser";
const AboutUs = () => {
  const [openTab, setOpenTab] = useState("luxury");
  return (
    <>
      <div className="flex items-center gap-5 bg-gray-100 p-2 h-[350px]">
        <section className="hidden lg:block w-1/2 h-full">
          <img className=" w-full h-full" src={asset.aboutImg} alt="" />
        </section>

        <section className="w-1/2">
          <h2 className="text-4xl font-bold">Only Quality For Clients</h2>

          <div>
            <div className="mt-10 flex items-center gap-2">
              <button
                onClick={() => setOpenTab("luxury")}
                className={`uppercase ${
                  openTab === "luxury" ? "bg-black text-white" : "bg-gray-200"
                }  font-medium text-sm py-2 px-5 rounded-lg cursor-pointer `}
              >
                luxury
              </button>
              <button
                onClick={() => setOpenTab("comfort")}
                className={`uppercase ${
                  openTab === "comfort" ? "bg-black text-white" : "bg-gray-200"
                }  font-medium text-sm py-2 px-5 rounded-lg cursor-pointer `}
              >
                comfort
              </button>
              <button
                onClick={() => setOpenTab("prestige")}
                className={`uppercase ${
                  openTab === "prestige" ? "bg-black text-white" : "bg-gray-200"
                }  font-medium text-sm py-2 px-5 rounded-lg cursor-pointer `}
              >
                prestige
              </button>
            </div>

            <div className="w-[60%] mt-3 text-gray-700">
              {openTab === "luxury" && (
                <p>
                  We offer a meticulously curated collection of the most
                  sought-after luxury vehicles on the market. Whether you prefer
                  the sporty allure of a high-performance sports car, the
                  sophistication of a sleek and luxurious sedan, or the
                  versatility of a premium SUV, we have the perfect car to match
                  your discerning taste.
                </p>
              )}
              {openTab === "comfort" && (
                <p>
                  We prioritize your comfort and convenience throughout your
                  journey. We understand that a comfortable ride can make a
                  world of difference, whether you're embarking on a business
                  trip or enjoying a leisurely vacation. That's why we offer a
                  wide range of well-maintained, comfortable cars that cater to
                  your specific needs.
                </p>
              )}
              {openTab === "prestige" && (
                <p>
                  We understand that prestige goes beyond luxury. It's about
                  making a statement, embracing sophistication, and indulging in
                  the finer things in life. That's why we offer an exclusive
                  selection of prestigious cars that exude elegance, style, and
                  status.
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
