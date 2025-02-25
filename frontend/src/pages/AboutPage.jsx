import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Slider from "react-slick"; // Import React Slick

const AboutPage = () => {
  return (
    <div>
    <Header activeHeading={5} />
      <About/>
      <Footer />
      </div>
  )
}



const About = () => {
  // Example state for the company founders and directors
  const foundersAndDirectors = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      image: "/path/to/john-doe.jpg", // replace with actual image paths
    },
    {
      name: "Jane Smith",
      role: "Co-Founder & CTO",
      image: "/path/to/jane-smith.jpg", // replace with actual image paths
    },
    {
      name: "Robert Brown",
      role: "Director of Marketing",
      image: "/path/to/robert-brown.jpg", // replace with actual image paths
    },
  ];

  // Example images for the photo gallery
  const galleryImages = [
    "/path/to/photo1.jpg",
    "/path/to/photo2.jpg",
    "/path/to/photo3.jpg",
    "/path/to/photo4.jpg",
  ];

  // Slick slider settings
  const sliderSettings = {
    dots: true, // show navigation dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2, // show 2 images on small screens
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // show 3 images on medium screens
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 pt-6 mt-20 mb-20">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center mb-8">
          <div className="w-full md:w-1/2 xl:w-1/3 p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
            </p>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
            </p>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
            </p>
          </div>
        </div>

        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-8">
          Learn More
        </button>

        {/* Gallery Section */}
        <div className="w-full mb-8">
          <h2 className="text-3xl font-bold text-center mb-6">Our Gallery</h2>
          <Slider {...sliderSettings}>
            {galleryImages.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-auto rounded-lg shadow-lg" />
              </div>
            ))}
          </Slider>
        </div>

        {/* Founders and Directors Section */}
        <div className="w-full mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">Meet Our Founders & Directors</h2>
          <div className="flex flex-wrap justify-center">
            {foundersAndDirectors.map((person, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-6 text-center">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-xl font-bold mb-2">{person.name}</h3>
                <p className="text-gray-600">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



export default AboutPage