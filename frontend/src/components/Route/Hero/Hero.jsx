import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Import Slider component from react-slick
import "slick-carousel/slick/slick.css"; // Import default styles
import "slick-carousel/slick/slick-theme.css"; // Import default theme styles

const Hero = () => {
  const sliderData = [
    {
      img: "https://themes.rslahmed.dev/rafcart/assets/images/banner-1.jpg",
      title: "Elegant Jewelry",
      description: "A fine collection of jewelry designed to complement your elegance.",
    },
    {
      img: "https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg",
      title: "Home Décor",
      description: "Transform your living space with stunning home décor pieces.",
    },
    {
      img: "https://themes.rslahmed.dev/rafcart/assets/images/banner-3.jpg",
      title: "Luxury & Style",
      description: "Indulge in luxury with our exclusive products that redefine style.",
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="relative w-full mb-4 ">
      <Slider {...sliderSettings}>
        {sliderData.map((item, index) => (
          <div key={index} className="relative w-100% h-full">
            {/* Background Image */}
            <img
              src={item.img}
              alt={`Slide showing ${item.title}`}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 p-5 sm:p-10">
              <h3 className="font-bold text-white text-2xl sm:text-4xl md:text-5xl mb-2 sm:mb-4">
                {item.title}
              </h3>
              <p className="text-white text-sm sm:text-lg md:text-xl mb-4 sm:mb-6">
                {item.description}
              </p>
              <Link to="/products">
                <div className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-yellow-500 rounded-md transition duration-300 hover:bg-yellow-400">
                  <span className="text-black font-semibold text-sm sm:text-base">
                    Shop Now
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;