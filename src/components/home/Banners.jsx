import React from "react";
import img_1 from "../../assets/banner/banner_first.png";
import img_2 from "../../assets/banner/banner_second.png";
import img_3 from "../../assets/banner/banner_third.png";
import { Link } from "react-router-dom";

const Banner = () => {
  const banners = [
    {
      id: 1,
      right: false,
      title: "Disaster",
      img: img_1,
      link: "/disasters",
      description:
        "Get real-time updates on ongoing disasters, including their type, location, and severity. Stay one step ahead with our comprehensive disaster information.",
    },
    {
      id: 2,
      right: true,
      title: "Resources",
      img: img_2,
      link: "/resources",
      description:
        "Access a wide range of essential resources, from medical equipment to transportation, to effectively respond to disasters. Ensure you have the tools you need when it matters most.",
    },
    {
      id: 3,
      right: false,
      title: "Agencies",
      img: img_3,
      link: "/agencies",
      description:
        "Explore our network of registered rescue agencies, each with unique expertise. Collaborate, coordinate, and make a difference when communities need it most.",
    },
  ];

  return (
    <div className="flex flex-col mb-10 gap-y-16">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className={`banner px-4 md:px-20 w-full flex flex-wrap justify-center ${
            banner.right ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          <div className="w-full md:w-1/2">
            <img
              className="w-full md:max-h-full"
              src={banner.img}
              alt=""
            />
          </div>
          <div className="w-full flex flex-col justify-center md:w-1/2 mt-4 md:mt-0 md:pl-8">
            <p className="font-Roberto overflow-hidden h-auto font-bold text-2xl md:text-4xl mb-2">
              {banner.title}
            </p>
            <p className="font-bold opacity-60 mb-4 md:w-[32rem]">
              {banner.description}
            </p>
            <Link to={banner.link}>
              <button
                className={`w-full md:w-[150px] ${
                  banner.right ? "md:ml-auto" : "md:mr-auto"
                } bg-indigo-500 hover:bg-blue-600 transition-all duration-200 text-white font-bold py-2 px-4 rounded-md`}
              >
                Explore More
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
