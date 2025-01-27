import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Import Slider component from react-slick
 // Optional: Include additional CSS file

const Hero = () => {
  const sliderData = [
    {
      img: "https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg",
      title: "Elegant Jewelry",
      description: "A fine collection of jewelry designed to complement your elegance.",
    },
    {
      img: "https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg",
      title: "Home Décor",
      description: "Transform your living space with stunning home décor pieces.",
    },
    {
      img: "https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg",
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
  };

  return (
    <>
      {/* Full-Screen Image Slider */}
      <div className="relative w-full mb-4">
        <Slider {...sliderSettings}>
          {sliderData.map((item, index) => (
            <div key={index} className="relative w-full h-full">
              {/* Background Image */}
              <img
                src={item.img}
                alt={`Slide showing ${item.title}`}
                className="object-cover w-full h-full"
              />
              {/* Overlay Content */}
              <div className="absolute bottom-10 left-5 sm:bottom-32 sm:left-16 text-[#143d59] w-4/5 sm:w-2/3">
                <h3 className="font-bold text-xl sm:text-3xl md:text-4xl mb-2 sm:mb-4">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-base md:text-lg mb-4 sm:mb-6">
                  {item.description}
                </p>
                <Link to="/products">
                  <div className="inline-block px-3 py-2 sm:px-5 sm:py-3 bg-black rounded-md">
                    <span className="text-white font-[Poppins] text-xs sm:text-sm md:text-base">
                      Shop Now
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Hero;
